import 'dart:convert';
import 'package:flutter/services.dart';
import '../main.dart';

class OfflineSearchService {
  static final OfflineSearchService _instance = OfflineSearchService._internal();
  factory OfflineSearchService() => _instance;
  OfflineSearchService._internal();

  List<Map<String, dynamic>> _clauseIndex = [];
  bool _isLoaded = false;

  final List<String> _guidelineFiles = [
    "guidelines.json/The Factories Act 1948.json",
    "guidelines.json/Oil Industry Safety Directorate (OISD).json",
    "guidelines.json/Petroleum and Explosives Safety Organization (PESO).json",
    "guidelines.json/Coal Mining - Directorate General Of Mines Safety (DGMS) Guidelines.json",
    "guidelines.json/Metal Mining - Directorate General Of Mines Safety (DGMS) Guidelines.json",
    "guidelines.json/Oil Mining - Directorate General Of Mines Safety (DGMS) Guidelines.json",
    "guidelines.json/Measures relating to Safety and Electric Supply - Directorate General Of Mines Safety (DGMS) Guidelines.json",
    "guidelines.json/The Occupational Safety, Health and Working - Directorate General Of Mines Safety (DGMS) Guidelines.json",
    "guidelines.json/Manufacture, Storage and Import of Hazardous Chemical Rules (MSIHC).json",
  ];

  /// Loads and caches all statutory JSON guidelines into memory for instant offline retrieval
  Future<void> init() async {
    if (_isLoaded) return;
    _clauseIndex.clear();

    for (final file in _guidelineFiles) {
      try {
        final jsonString = await rootBundle.loadString(file);
        final List<dynamic> data = jsonDecode(jsonString);
        for (final item in data) {
          if (item is Map<String, dynamic> && (item['text'] as String?)?.isNotEmpty == true) {
            _clauseIndex.add(item);
          }
        }
      } catch (e) {
        // Skip missing or invalid file
      }
    }
    _isLoaded = true;
  }

  /// Searches local statutory clauses when phone is offline
  Future<AnswerResult> search(String query) async {
    await init();

    if (_clauseIndex.isEmpty) {
      return AnswerResult(
        success: false,
        query: query,
        answer: "Offline statutory database is empty. Please reconnect to load safety rules.",
      );
    }

    final queryTokens = query.toLowerCase().replaceAll(RegExp(r'[^\w\s]'), '').split(RegExp(r'\s+'));
    double maxScore = 0.0;
    Map<String, dynamic>? bestMatch;

    for (final clause in _clauseIndex) {
      final text = (clause['text'] as String? ?? '').toLowerCase();
      final source = (clause['source_framework'] as String? ?? '').toLowerCase();
      final clauseId = (clause['clause_id'] as String? ?? '').toLowerCase();
      final keywords = (clause['equipment_keywords'] as List<dynamic>?)?.map((e) => e.toString().toLowerCase()).toList() ?? [];
      final headerPath = (clause['header_path'] as List<dynamic>?)?.map((e) => e.toString().toLowerCase()).join(' ') ?? '';

      double score = 0.0;
      for (final token in queryTokens) {
        if (token.length < 3) continue;
        if (source.contains(token)) score += 3.0;
        if (clauseId.contains(token)) score += 3.0;
        if (keywords.any((k) => k.contains(token))) score += 4.0;
        if (headerPath.contains(token)) score += 2.0;
        if (text.contains(token)) score += 1.0;
      }

      if (score > maxScore) {
        maxScore = score;
        bestMatch = clause;
      }
    }

    if (bestMatch != null && maxScore > 2.0) {
      final source = bestMatch['source_framework'] ?? 'Statutory Standard';
      final clauseId = bestMatch['clause_id'] ?? 'General';
      final headerPathList = (bestMatch['header_path'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [];
      final headerStr = headerPathList.isNotEmpty ? headerPathList.join(' > ') : clauseId.toString();
      final text = (bestMatch['text'] ?? '').toString();
      final cleanHeaderStr = headerStr.replaceAll('*', '').replaceAll('#', '').replaceAll('^', '').replaceAll('_', '').trim();
      final cleanText = text.replaceAll('*', '').replaceAll('^', '').trim();

      final formattedAnswer = "OFFLINE STATUTORY CITATION\n\n"
          "🏛 Framework: $source\n"
          "📜 Clause: $cleanHeaderStr\n\n"
          "Mandate Text:\n\"$cleanText\"";

      return AnswerResult(
        success: true,
        query: query,
        answer: formattedAnswer,
        source: source.toString(),
        section: clauseId.toString(),
        confidence: "Offline Statutory Match",
        fullSectionText: cleanText,
      );
    }

    return AnswerResult(
      success: false,
      query: query,
      answer: "No offline statutory match found for your query. Connect to internet for AI Copilot reasoning.",
    );
  }
}
