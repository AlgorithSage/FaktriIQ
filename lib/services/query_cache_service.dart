import 'dart:convert';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import '../main.dart';

class QueryCacheService {
  static final QueryCacheService _instance = QueryCacheService._internal();
  factory QueryCacheService() => _instance;
  QueryCacheService._internal();

  Map<String, Map<String, dynamic>> _cache = {};
  bool _isInitialized = false;

  Future<File> _getCacheFile() async {
    final dir = await getApplicationDocumentsDirectory();
    return File('${dir.path}/query_cache.json');
  }

  /// Load cached responses from phone storage
  Future<void> init() async {
    if (_isInitialized) return;
    try {
      final file = await _getCacheFile();
      if (await file.exists()) {
        final content = await file.readAsString();
        final Map<String, dynamic> jsonMap = jsonDecode(content);
        _cache = jsonMap.map((key, value) => MapEntry(key, Map<String, dynamic>.from(value)));
      }
    } catch (e) {
      _cache = {};
    }
    _isInitialized = true;
  }

  /// Normalizes query string for matching
  String _normalize(String q) {
    return q.trim().toLowerCase().replaceAll(RegExp(r'[^\w\s]'), '');
  }

  /// Save an AI response to local cache
  Future<void> saveResponse(String query, AnswerResult result) async {
    await init();
    final key = _normalize(query);
    _cache[key] = {
      'query': query,
      'answer': result.answer,
      'source': result.source,
      'section': result.section,
      'confidence': "Cached AI Response (Groq 120B)",
      'full_section_text': result.fullSectionText,
      'timestamp': DateTime.now().toIso8601String(),
    };

    try {
      final file = await _getCacheFile();
      await file.writeAsString(jsonEncode(_cache));
    } catch (e) {
      // Ignore write error
    }
  }

  /// Search for a cached response offline
  Future<AnswerResult?> getCachedResponse(String query) async {
    await init();
    final key = _normalize(query);

    // Direct match
    if (_cache.containsKey(key)) {
      final data = _cache[key]!;
      return AnswerResult(
        success: true,
        query: query,
        answer: data['answer'] ?? '',
        source: data['source'] ?? 'Local Cache',
        section: data['section'] ?? '',
        confidence: "Cached AI Answer",
        fullSectionText: data['full_section_text'],
      );
    }

    // Fuzzy query match among cached keys
    for (final cachedKey in _cache.keys) {
      if (key.contains(cachedKey) || cachedKey.contains(key)) {
        final data = _cache[cachedKey]!;
        return AnswerResult(
          success: true,
          query: query,
          answer: data['answer'] ?? '',
          source: data['source'] ?? 'Local Cache',
          section: data['section'] ?? '',
          confidence: "Cached AI Answer (Fuzzy Match)",
          fullSectionText: data['full_section_text'],
        );
      }
    }

    return null;
  }
}
