import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';
import 'package:llamadart/llamadart.dart';
import '../main.dart';
import 'offline_search_service.dart';

/// Service managing optional On-Device Local LLM (Phi-4 Mini 3.8B GGUF) execution & download.
/// If the 2.3 GB GGUF model is not present, seamlessly falls back to Instant BM25/TF-IDF Statutory RAG (<10ms).
class OnDeviceLlmService {
  static final OnDeviceLlmService _instance = OnDeviceLlmService._internal();
  factory OnDeviceLlmService() => _instance;
  OnDeviceLlmService._internal();

  static const String kModelUrl =
      'https://huggingface.co/unsloth/Phi-4-mini-instruct-GGUF/resolve/main/Phi-4-mini-instruct-Q4_K_M.gguf';

  final ValueNotifier<bool> isModelLoadedNotifier = ValueNotifier<bool>(false);
  final ValueNotifier<bool> isDownloadingNotifier = ValueNotifier<bool>(false);
  final ValueNotifier<double> downloadProgressNotifier = ValueNotifier<double>(
    0.0,
  );
  final ValueNotifier<String> downloadedMbNotifier = ValueNotifier<String>("0");
  final ValueNotifier<String> totalMbNotifier = ValueNotifier<String>("2490");
  final ValueNotifier<String?> downloadErrorNotifier = ValueNotifier<String?>(
    null,
  );
  final ValueNotifier<String?> downloadStatusMessageNotifier =
      ValueNotifier<String?>(null);

  bool _isModelLoaded = false;
  bool _isDownloading = false;
  String? _modelPath;
  http.Client? _downloadClient;

  LlamaEngine? _engine;
  ChatSession? _session;

  static const String _systemPrompt =
      "You are FaktriIQ Copilot, an industrial safety compliance assistant. "
      "Answer using ONLY the statutory context provided below — do not invent "
      "clauses or numbers. Structure your reply with these exact section "
      "headers, each on its own line: 📌 EXECUTIVE SUMMARY, 📜 STATUTORY MANDATE, "
      "📋 TECHNICIAN ACTION CHECKLIST, ⚠️ SAFETY WARNING / THRESHOLD. Under each "
      "header use short bullet points. Wrap key terms, section numbers, and "
      "numeric limits in **double asterisks**. Be concise.";

  bool get isModelLoaded => _isModelLoaded;
  bool get isDownloading => _isDownloading;

  /// Check if the Phi-4 Mini GGUF model file exists (or partial download file exists)
  Future<bool> checkModelAvailability() async {
    try {
      final dir = await getApplicationDocumentsDirectory();
      final modelFile = File('${dir.path}/phi-4-mini-Q4_K_M.gguf');
      final tempFile = File('${dir.path}/phi-4-mini-Q4_K_M.tmp');

      if (await modelFile.exists() &&
          (await modelFile.length()) > 100 * 1024 * 1024) {
        _modelPath = modelFile.path;
        _isModelLoaded = true;
        isModelLoadedNotifier.value = true;
        final totalBytes = await modelFile.length();
        downloadedMbNotifier.value = (totalBytes / (1024 * 1024))
            .toStringAsFixed(0);
        downloadProgressNotifier.value = 1.0;
        downloadStatusMessageNotifier.value =
            "100% On-Device AI Model Installed";
        return true;
      }

      if (await tempFile.exists()) {
        final existingBytes = await tempFile.length();
        if (existingBytes > 0) {
          final downloadedMbStr = (existingBytes / (1024 * 1024))
              .toStringAsFixed(0);
          final totalExpected = (2.49 * 1024 * 1024 * 1024).toInt();
          final progress = (existingBytes / totalExpected).clamp(0.0, 1.0);

          downloadedMbNotifier.value = downloadedMbStr;
          downloadProgressNotifier.value = progress;
          downloadStatusMessageNotifier.value =
              "Partial download found: $downloadedMbStr MB / 2490 MB";
        }
      }
    } catch (e) {
      // Model not downloaded
    }
    _isModelLoaded = false;
    isModelLoadedNotifier.value = false;
    return false;
  }

  /// Get formatted file size of downloaded or partial model
  Future<String> getModelFileSize() async {
    try {
      final dir = await getApplicationDocumentsDirectory();
      final modelFile = File('${dir.path}/phi-4-mini-Q4_K_M.gguf');
      final tempFile = File('${dir.path}/phi-4-mini-Q4_K_M.tmp');

      if (await modelFile.exists()) {
        final bytes = await modelFile.length();
        final mb = bytes / (1024 * 1024);
        if (mb >= 1024) {
          return '${(mb / 1024).toStringAsFixed(2)} GB';
        }
        return '${mb.toStringAsFixed(1)} MB';
      }

      if (await tempFile.exists()) {
        final bytes = await tempFile.length();
        final mb = bytes / (1024 * 1024);
        return '${mb.toStringAsFixed(1)} MB (Partial)';
      }
    } catch (e) {
      // ignore
    }
    return '0 MB';
  }

  /// Resumable HTTP Range streaming download of Phi-4 Mini GGUF model file
  Future<bool> downloadModel({
    String? hfToken,
    void Function(double progress, String downloadedMb, String totalMb)?
    onProgress,
    void Function(String error)? onError,
  }) async {
    if (_isDownloading) return false;
    _isDownloading = true;
    isDownloadingNotifier.value = true;
    downloadErrorNotifier.value = null;

    try {
      final dir = await getApplicationDocumentsDirectory();
      final tempFile = File('${dir.path}/phi-4-mini-Q4_K_M.tmp');
      final finalFile = File('${dir.path}/phi-4-mini-Q4_K_M.gguf');

      int existingBytes = 0;
      if (await tempFile.exists()) {
        existingBytes = await tempFile.length();
      }

      _downloadClient = http.Client();
      String currentUrl = kModelUrl;
      http.StreamedResponse? response;

      for (int attempt = 0; attempt < 5; attempt++) {
        final request = http.Request('GET', Uri.parse(currentUrl));
        request.headers['User-Agent'] =
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
        if (hfToken != null && hfToken.trim().isNotEmpty) {
          request.headers['Authorization'] = 'Bearer ${hfToken.trim()}';
        }
        if (existingBytes > 0) {
          request.headers['Range'] = 'bytes=$existingBytes-';
        }
        request.followRedirects = false;

        response = await _downloadClient!.send(request);
        if (response.statusCode == 301 ||
            response.statusCode == 302 ||
            response.statusCode == 307 ||
            response.statusCode == 308) {
          final location = response.headers['location'];
          if (location != null && location.isNotEmpty) {
            currentUrl = location;
            continue;
          }
        }
        break;
      }

      if (response == null ||
          (response.statusCode != 200 && response.statusCode != 206)) {
        // If range request failed (416 Requested Range Not Satisfiable), restart clean from 0
        if (response?.statusCode == 416) {
          if (await tempFile.exists()) await tempFile.delete();
          existingBytes = 0;
          _isDownloading = false;
          return downloadModel(
            hfToken: hfToken,
            onProgress: onProgress,
            onError: onError,
          );
        }

        _isDownloading = false;
        isDownloadingNotifier.value = false;
        final err =
            'HTTP ${response?.statusCode ?? 500}: Failed to fetch model file.';
        downloadErrorNotifier.value = err;
        if (onError != null) onError(err);
        return false;
      }

      final isResuming = (response.statusCode == 206);
      if (!isResuming && existingBytes > 0) {
        existingBytes = 0;
      }

      final contentLength =
          (response.contentLength ?? (2.49 * 1024 * 1024 * 1024).toInt()) +
          existingBytes;
      final totalMbStr = (contentLength / (1024 * 1024)).toStringAsFixed(0);
      totalMbNotifier.value = totalMbStr;

      int downloadedBytes = existingBytes;
      final sink = tempFile.openWrite(
        mode: isResuming ? FileMode.append : FileMode.write,
      );

      await for (var chunk in response.stream) {
        sink.add(chunk);
        downloadedBytes += chunk.length;
        final progress = (downloadedBytes / contentLength).clamp(0.0, 1.0);
        final downloadedMbStr = (downloadedBytes / (1024 * 1024))
            .toStringAsFixed(0);

        downloadProgressNotifier.value = progress;
        downloadedMbNotifier.value = downloadedMbStr;

        if (onProgress != null) {
          onProgress(progress, downloadedMbStr, totalMbStr);
        }
      }

      await sink.flush();
      await sink.close();

      // Rename temp file to final GGUF
      if (await finalFile.exists()) await finalFile.delete();
      await tempFile.rename(finalFile.path);

      _modelPath = finalFile.path;
      _isModelLoaded = true;
      _isDownloading = false;
      isModelLoadedNotifier.value = true;
      isDownloadingNotifier.value = false;
      downloadStatusMessageNotifier.value =
          "Model download completed! Local AI active.";
      return true;
    } catch (e) {
      _isDownloading = false;
      isDownloadingNotifier.value = false;
      final err = 'Download interrupted: $e';
      downloadErrorNotifier.value = err;
      if (onError != null) onError(err);
      return false;
    }
  }

  /// Cancel running download
  void cancelDownload() {
    _downloadClient?.close();
    _isDownloading = false;
    isDownloadingNotifier.value = false;
  }

  /// Delete downloaded GGUF model to free storage
  Future<bool> deleteModel() async {
    try {
      final dir = await getApplicationDocumentsDirectory();
      final modelFile = File('${dir.path}/phi-4-mini-Q4_K_M.gguf');
      final tempFile = File('${dir.path}/phi-4-mini-Q4_K_M.tmp');

      if (await modelFile.exists()) await modelFile.delete();
      if (await tempFile.exists()) await tempFile.delete();

      _isModelLoaded = false;
      _modelPath = null;
      isModelLoadedNotifier.value = false;
      return true;
    } catch (e) {
      return false;
    }
  }

  /// Loads the GGUF model into a real llama.cpp inference engine, reusing the
  /// existing session across calls. Throws if no model file is present.
  Future<ChatSession> _ensureSessionLoaded() async {
    if (_session != null && _engine != null && _engine!.isReady) {
      return _session!;
    }
    final modelPath = _modelPath;
    if (modelPath == null) {
      throw StateError('No local model file available.');
    }
    final engine = LlamaEngine(LlamaBackend());
    await engine.loadModel(modelPath, modelParams: const ModelParams(contextSize: 2048));
    _engine = engine;
    _session = ChatSession(engine, systemPrompt: _systemPrompt);
    return _session!;
  }

  /// Execute real on-device LLM reasoning (Phi-4 Mini via llama.cpp), or
  /// fallback to BM25/TF-IDF Statutory Match if the model isn't downloaded or
  /// inference fails.
  Future<AnswerResult> processQuery({
    required String query,
    required OfflineSearchService offlineSearch,
  }) async {
    final bool modelExists = await checkModelAvailability();

    // Retrieve local BM25/TF-IDF statutory context (<10ms) — used as RAG
    // grounding for the local LLM, and as the fallback answer if inference
    // is unavailable or fails.
    final offlineResult = await offlineSearch.search(query);

    if (!modelExists || _modelPath == null) {
      return offlineResult;
    }

    try {
      final session = await _ensureSessionLoaded();
      final statutoryContext = offlineResult.fullSectionText ?? offlineResult.answer;
      final prompt = "STATUTORY CONTEXT:\n$statutoryContext\n\n"
          "TECHNICIAN QUESTION:\n\"$query\"\n\n"
          "Provide a structured safety answer based on the statutory context above.";

      final buffer = StringBuffer();
      await for (final chunk in session.create(
        [LlamaTextContent(prompt)],
        params: const GenerationParams(maxTokens: 400),
      )) {
        final text = chunk.choices.first.delta.content;
        if (text != null) buffer.write(text);
      }

      final answer = buffer.toString().trim();
      if (answer.isEmpty) return offlineResult;

      return AnswerResult(
        success: true,
        query: query,
        answer: answer,
        source: offlineResult.source,
        section: offlineResult.section,
        confidence: "On-Device Phi-4 Mini Local AI",
        fullSectionText: offlineResult.fullSectionText,
      );
    } catch (e) {
      // Inference failed (e.g. model load error, OOM) -> honest fallback,
      // not a fake "AI" answer.
      return offlineResult;
    }
  }
}
