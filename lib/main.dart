import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:getwidget/getwidget.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:async';
import 'dart:convert';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:http/http.dart' as http;
import 'services/offline_search_service.dart';
import 'services/query_cache_service.dart';
import 'services/ondevice_llm_service.dart';



// ==========================================
// MODELS & DATA DEFINITIONS
// ==========================================

class DocumentModel {
  final String docId;
  final String filename;
  final String docType;
  final String title;
  final String uploadDate;
  final List<String> equipmentTags;
  final List<String> dates;
  final List<String> clauseRefs;
  final int gapCount;
  final int okCount;
  final String content;

  DocumentModel({
    required this.docId,
    required this.filename,
    required this.docType,
    required this.title,
    required this.uploadDate,
    required this.equipmentTags,
    required this.dates,
    required this.clauseRefs,
    required this.gapCount,
    required this.okCount,
    required this.content,
  });
}

class ClauseModel {
  final String clauseId;
  final String source;
  final String requirement;
  final String clauseText;
  final String status; // "ok" | "gap"
  final String matchedText;
  final String explanation;

  ClauseModel({
    required this.clauseId,
    required this.source,
    required this.requirement,
    required this.clauseText,
    required this.status,
    required this.matchedText,
    required this.explanation,
  });
}

class QueryLog {
  final String query;
  final String answer;
  final String timestamp;
  final String doc;

  QueryLog({
    required this.query,
    required this.answer,
    required this.timestamp,
    required this.doc,
  });
}

// ==========================================
// API CONFIGURATION
// ==========================================

/// Backend URL — set to your PC's Wi-Fi IPv4 address so your physical phone (RMX5051) can reach it.
const String kApiBaseUrl = "http://192.168.1.4:8000";


class AnswerResult {
  final bool success;
  final String query;
  final String answer;
  final String source;
  final String section;
  final String confidence;
  final String? fullSectionText;

  AnswerResult({
    required this.success,
    required this.query,
    required this.answer,
    this.source = "",
    this.section = "",
    this.confidence = "",
    this.fullSectionText,
  });

  /// Parse a JSON response from the Agno backend
  factory AnswerResult.fromJson(Map<String, dynamic> json) {
    return AnswerResult(
      success: json['success'] ?? true,
      query: json['query'] ?? '',
      answer: json['answer'] ?? '',
      source: json['source'] ?? '',
      section: json['section'] ?? '',
      confidence: json['confidence'] ?? '',
      fullSectionText: json['full_section_text'],
    );
  }
}

// ==========================================
// MAIN ENTRY POINT
// ==========================================

void main() {
  runApp(const FaktriApp());
}

class FaktriApp extends StatefulWidget {
  const FaktriApp({super.key});

  @override
  State<FaktriApp> createState() => _FaktriAppState();
}

class _FaktriAppState extends State<FaktriApp> {
  bool _darkMode = false;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FaktriIQ — Industrial Knowledge Intelligence Copilot',
      debugShowCheckedModeBanner: false,
      themeMode: _darkMode ? ThemeMode.dark : ThemeMode.light,
      // LIGHT MODE TOKEN MAP
      theme: ThemeData(
        brightness: Brightness.light,
        scaffoldBackgroundColor: const Color(0xFFFFFDF5), // cream
        primaryColor: const Color(0xFFFFD966), // soft gold
        cardColor: const Color(0xFFF9F6EE), // warm ecru
        dividerColor: const Color(0xFF3B3F46), // dark border/line
        hintColor: const Color(0xFF6B7280),
        colorScheme: const ColorScheme.light(
          primary: Color(0xFFFFD966),
          secondary: Color(0xFF1E2328), // ink
          surface: Color(0xFFF9F6EE),
          background: Color(0xFFFFFDF5),
        ),
        textTheme: const TextTheme(
          bodyLarge: TextStyle(fontFamily: 'Satoshi', fontWeight: FontWeight.w700, color: Color(0xFF1E2328)), // Satoshi-Bold / ink
          bodyMedium: TextStyle(fontFamily: 'Satoshi', fontWeight: FontWeight.w500, color: Color(0xFF1E2328)), // Satoshi-Medium / ink
          labelSmall: TextStyle(fontFamily: 'Satoshi', fontWeight: FontWeight.w500, color: Color(0xFF3B3F46)), // Satoshi-Medium / border/muted
        ),
      ),
      // DARK MODE TOKEN MAP
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0B1120), // near-black
        primaryColor: const Color(0xFFFACC15), // brightened gold
        cardColor: const Color(0xFF111827), // dark surface
        dividerColor: const Color(0xFF1F2937), // subtle dark border
        hintColor: const Color(0xFF9CA3AF),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFFFACC15),
          secondary: Color(0xFFE5E7EB),
          surface: Color(0xFF111827),
          background: Color(0xFF0B1120),
        ),
        textTheme: const TextTheme(
          bodyLarge: TextStyle(fontFamily: 'Satoshi', fontWeight: FontWeight.w700, color: Color(0xFFE5E7EB)), // off-white
          bodyMedium: TextStyle(fontFamily: 'Satoshi', fontWeight: FontWeight.w500, color: Color(0xFFE5E7EB)),
          labelSmall: TextStyle(fontFamily: 'Satoshi', fontWeight: FontWeight.w500, color: Color(0xFF9CA3AF)), // lightened mist
        ),
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => TechnicianAppHome(
              darkMode: _darkMode,
              onToggleTheme: () => setState(() => _darkMode = !_darkMode),
            ),
        '/officer': (context) => OfficerAppHome(
              darkMode: _darkMode,
              onToggleTheme: () => setState(() => _darkMode = !_darkMode),
            ),
      },
    );
  }
}

// ==========================================
// 1. PROFILE ENTRY GATEWAY
// ==========================================
// ==========================================
// 1. REUSABLE TACTILE PUSH BUTTON (LIGHTWEIGHT)
// ==========================================
class TactilePushButton extends StatefulWidget {
  final Widget child;
  final VoidCallback onTap;
  final Color? backgroundColor;
  final Color? textColor;

  const TactilePushButton({
    super.key,
    required this.child,
    required this.onTap,
    this.backgroundColor,
    this.textColor,
  });

  @override
  State<TactilePushButton> createState() => _TactilePushButtonState();
}

class _TactilePushButtonState extends State<TactilePushButton> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    final baseColor = widget.backgroundColor ?? (isDark ? const Color(0xFFFACC15) : const Color(0xFF1E2328));
    final labelColor = widget.textColor ?? (isDark ? Colors.black : Colors.white);
    final shadowColor = isDark ? const Color(0xFF020617) : const Color(0xFF0D1012);

    return GestureDetector(
      onTapDown: (_) => setState(() => _isPressed = true),
      onTapUp: (_) {
        setState(() => _isPressed = false);
        widget.onTap();
      },
      onTapCancel: () => setState(() => _isPressed = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 60),
        curve: Curves.easeOut,
        transform: Matrix4.translationValues(0, _isPressed ? 4 : 0, 0),
        padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 12),
        decoration: BoxDecoration(
          color: baseColor,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isDark ? const Color(0xFF1F2937) : const Color(0xFF3B3F46),
            width: 1.5,
          ),
          boxShadow: [
            BoxShadow(
              color: shadowColor,
              offset: Offset(0, _isPressed ? 1 : 5),
              blurRadius: 0,
            ),
          ],
        ),
        child: DefaultTextStyle(
          style: TextStyle(
            fontFamily: 'Satoshi',
            fontSize: 13,
            fontWeight: FontWeight.bold,
            color: labelColor,
          ),
          child: widget.child,
        ),
      ),
    );
  }
}

// ==========================================
// 2. PROFILE ENTRY GATEWAY
// ==========================================
class FaktriEntryGateway extends StatelessWidget {
  final bool darkMode;
  final VoidCallback onToggleTheme;

  const FaktriEntryGateway({
    super.key,
    required this.darkMode,
    required this.onToggleTheme,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = darkMode;
    final size = MediaQuery.of(context).size;
    final isLarge = size.width > 700;

    final techCard = _buildGatewayCard(
      context,
      title: "Field Technician",
      subtitle: "Knowledge Copilot",
      description: "Submit plain-language queries over plant operating manuals, safety SOPs, and check limits on the shop floor.",
      icon: Icons.engineering_outlined,
      onTap: () => Navigator.pushNamed(context, '/technician'),
    );

    final officerCard = _buildGatewayCard(
      context,
      title: "Compliance Agent",
      subtitle: "Safety Officer Station",
      description: "Map standards, inspect audit gaps against statutory Acts (OISD, Factories Act, PESO), and ingest new operating documents.",
      icon: Icons.shield_outlined,
      onTap: () => Navigator.pushNamed(context, '/officer'),
    );

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: AppBar(
        backgroundColor: isDark ? const Color(0xFF111827) : const Color(0xFF1E2328),
        elevation: 0,
        leadingWidth: 50,
        leading: Container(
          margin: const EdgeInsets.all(10),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(6),
            child: Image.asset(
              "assets/images/FaktriIQ_sq.png",
              fit: BoxFit.cover,
            ),
          ),
        ),
        title: Text(
          "FaktriIQ Gateway",
          style: GoogleFonts.newsreader(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            fontStyle: FontStyle.italic,
            color: theme.primaryColor,
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(
              isDark ? Icons.light_mode : Icons.dark_mode,
              color: theme.primaryColor,
            ),
            onPressed: onToggleTheme,
          ),
        ],
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Container(
            constraints: const BoxConstraints(maxWidth: 800),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  "SELECT PORTAL",
                  style: GoogleFonts.poppins(
                    fontSize: 26,
                    fontWeight: FontWeight.w900,
                    color: isDark ? Colors.white : const Color(0xFF1E2328),
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  "Decoupled industrial workflows for plant floor personnel and safety compliance managers.",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontFamily: 'Satoshi',
                    fontSize: 13,
                    fontWeight: FontWeight.w500,
                    color: isDark ? Colors.grey.shade400 : const Color(0xFF3B3F46),
                  ),
                ),
                const SizedBox(height: 40),
                Flex(
                  direction: isLarge ? Axis.horizontal : Axis.vertical,
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    isLarge ? Expanded(child: techCard) : techCard,
                    if (isLarge) const SizedBox(width: 24) else const SizedBox(height: 24),
                    isLarge ? Expanded(child: officerCard) : officerCard,
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildGatewayCard(
    BuildContext context, {
    required String title,
    required String subtitle,
    required String description,
    required IconData icon,
    required VoidCallback onTap,
  }) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.all(28),
      decoration: BoxDecoration(
        color: theme.cardColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: theme.dividerColor, width: 1.5),
        boxShadow: [
          BoxShadow(
            color: isDark ? Colors.black.withOpacity(0.3) : const Color(0x0C1E2328),
            blurRadius: 4,
            offset: const Offset(0, 2),
          )
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF1E293B) : const Color(0xFFFFFDF5),
              shape: BoxShape.circle,
              border: Border.all(color: theme.dividerColor, width: 1.5),
            ),
            child: Icon(icon, color: theme.primaryColor, size: 28),
          ),
          const SizedBox(height: 20),
          Text(
            subtitle.toUpperCase(),
            style: TextStyle(
              fontFamily: 'Satoshi',
              fontSize: 10,
              fontWeight: FontWeight.bold,
              color: isDark ? Colors.grey.shade400 : const Color(0xFF6B7280),
              letterSpacing: 1.5,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            title,
            style: GoogleFonts.poppins(
              fontSize: 19,
              fontWeight: FontWeight.bold,
              color: isDark ? Colors.white : const Color(0xFF1E2328),
            ),
          ),
          const SizedBox(height: 12),
          Text(
            description,
            style: TextStyle(
              fontFamily: 'Satoshi',
              fontSize: 12.5,
              color: isDark ? Colors.grey.shade300 : const Color(0xFF3B3F46),
              height: 1.4,
            ),
          ),
          const SizedBox(height: 28),
          Align(
            alignment: Alignment.centerRight,
            child: TactilePushButton(
              onTap: onTap,
              backgroundColor: isDark ? theme.primaryColor : const Color(0xFF1E2328),
              textColor: isDark ? Colors.black : Colors.white,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text("Enter Portal"),
                  const SizedBox(width: 6),
                  Icon(
                    Icons.arrow_forward_rounded,
                    color: isDark ? Colors.black : Colors.white,
                    size: 14,
                  ),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}

// ==========================================
// 2. TECHNICIAN PORTAL (MOBILE FIRST, FULL PORT)
// ==========================================
class TechnicianAppHome extends StatefulWidget {
  final bool darkMode;
  final VoidCallback onToggleTheme;

  const TechnicianAppHome({
    super.key,
    required this.darkMode,
    required this.onToggleTheme,
  });

  @override
  State<TechnicianAppHome> createState() => _TechnicianAppHomeState();
}

class _TechnicianAppHomeState extends State<TechnicianAppHome> {
  final TextEditingController _techSearchController = TextEditingController();
  AnswerResult? _techResponse;
  bool _techSearching = false;
  String _techTab = "ask"; // "ask" | "history"
  bool _showFullSection = false;
  late StreamSubscription<ConnectivityResult> _connectivitySubscription;
  bool _isOnline = true;

  @override
  void initState() {
    super.initState();
    _initConnectivity();
    _connectivitySubscription = Connectivity().onConnectivityChanged.listen((ConnectivityResult result) {
      setState(() {
        _isOnline = (result == ConnectivityResult.wifi || result == ConnectivityResult.mobile);
      });
    });
  }

  Future<void> _initConnectivity() async {
    try {
      final result = await Connectivity().checkConnectivity();
      setState(() {
        _isOnline = (result == ConnectivityResult.wifi || result == ConnectivityResult.mobile);
      });
    } catch (_) {}
  }

  final List<QueryLog> _techHistory = [];

  /// Calls the Agno backend API when online, or local cache / on-device RAG when offline
  Future<void> _runTechSearch(String queryText) async {
    if (queryText.trim().isEmpty) return;
    setState(() {
      _techSearching = true;
      _techResponse = null;
      _showFullSection = false;
    });

    // 1. If Offline -> Check Local AI Cache first, then fallback to On-Device Local AI / Statutory RAG
    if (!_isOnline) {
      final cachedResponse = await QueryCacheService().getCachedResponse(queryText);
      final finalResult = cachedResponse ??
          await OnDeviceLlmService().processQuery(
            query: queryText,
            offlineSearch: OfflineSearchService(),
          );

      setState(() {
        _techSearching = false;
        _techResponse = finalResult;
        if (finalResult.success) {
          _techHistory.insert(
            0,
            QueryLog(
              query: queryText,
              answer: finalResult.answer,
              timestamp: _formatTimestamp(),
              doc: finalResult.source,
            ),
          );
        }
      });
      return;
    }

    // 2. If Online -> Call Agno FastAPI Backend (Groq 120B)
    try {
      final response = await http.post(
        Uri.parse('$kApiBaseUrl/ask'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'query': queryText}),
      ).timeout(const Duration(seconds: 30));

      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);
        final result = AnswerResult.fromJson(json);

        // Save AI response to local phone cache for offline reuse
        await QueryCacheService().saveResponse(queryText, result);

        setState(() {
          _techSearching = false;
          _techResponse = result;
          _techHistory.insert(
            0,
            QueryLog(
              query: queryText,
              answer: result.answer,
              timestamp: _formatTimestamp(),
              doc: result.source,
            ),
          );
        });
      } else {
        // Fallback to cached response or on-device local AI if server responds with error
        final cachedResponse = await QueryCacheService().getCachedResponse(queryText);
        final offlineResult = cachedResponse ??
            await OnDeviceLlmService().processQuery(
              query: queryText,
              offlineSearch: OfflineSearchService(),
            );
        setState(() {
          _techSearching = false;
          _techResponse = offlineResult.success
              ? offlineResult
              : AnswerResult(
                  success: false,
                  query: queryText,
                  answer: "Server error (${response.statusCode}). Could not retrieve answer.",
                );
        });
      }
    } catch (e) {
      // Fallback to local AI response cache or on-device local AI if server is unreachable
      final cachedResponse = await QueryCacheService().getCachedResponse(queryText);
      final offlineResult = cachedResponse ??
          await OnDeviceLlmService().processQuery(
            query: queryText,
            offlineSearch: OfflineSearchService(),
          );
      setState(() {
        _techSearching = false;
        _techResponse = offlineResult.success
            ? offlineResult
            : AnswerResult(
                success: false,
                query: queryText,
                answer: "Could not reach backend API at $kApiBaseUrl and no offline match found.",
              );
      });
    }
  }

  String _formatTimestamp() {
    final now = DateTime.now();
    final months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return '${now.day}-${months[now.month - 1]}-${now.year} ${now.hour.toString().padLeft(2, '0')}:${now.minute.toString().padLeft(2, '0')}';
  }

  Widget _buildFormattedAnswerText(String text, bool isDark, ThemeData theme) {
    final lines = text.split('\n');
    List<Widget> children = [];

    for (var line in lines) {
      final trimmed = line.trim();
      if (trimmed.isEmpty) {
        children.add(const SizedBox(height: 8));
        continue;
      }

      // 1. Check for Section Headers (📌, 📜, 📋, ⚠️, ###)
      final isHeader = trimmed.startsWith('📌') ||
          trimmed.startsWith('📜') ||
          trimmed.startsWith('📋') ||
          trimmed.startsWith('⚠️') ||
          trimmed.startsWith('###') ||
          trimmed.startsWith('#');

      if (isHeader) {
        // Strip all '#' and '*' from header text
        final cleanHeader = trimmed.replaceAll('#', '').replaceAll('*', '').trim();

        // Determine section badge colors
        Color badgeBg;
        Color badgeBorder;
        Color badgeText;

        if (cleanHeader.contains('EXECUTIVE SUMMARY')) {
          badgeBg = isDark ? const Color(0xFF3F3517) : const Color(0xFFFFF4BD);
          badgeBorder = const Color(0xFFD97706);
          badgeText = isDark ? theme.primaryColor : const Color(0xFF92400E);
        } else if (cleanHeader.contains('STATUTORY MANDATE')) {
          badgeBg = isDark ? const Color(0xFF1E293B) : const Color(0xFFE2E8F0);
          badgeBorder = const Color(0xFF64748B);
          badgeText = isDark ? const Color(0xFF94A3B8) : const Color(0xFF334155);
        } else if (cleanHeader.contains('CHECKLIST') || cleanHeader.contains('ACTION')) {
          badgeBg = isDark ? const Color(0xFF064E3B) : const Color(0xFFD1FAE5);
          badgeBorder = const Color(0xFF10B981);
          badgeText = isDark ? const Color(0xFF34D399) : const Color(0xFF065F46);
        } else {
          badgeBg = isDark ? const Color(0xFF451A03) : const Color(0xFFFEE2E2);
          badgeBorder = const Color(0xFFEF4444);
          badgeText = isDark ? const Color(0xFFFCA5A5) : const Color(0xFF991B1B);
        }

        children.add(
          Container(
            margin: const EdgeInsets.only(top: 12, bottom: 6),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            decoration: BoxDecoration(
              color: badgeBg,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: badgeBorder.withOpacity(0.5), width: 1.2),
            ),
            child: Text(
              cleanHeader,
              style: GoogleFonts.poppins(
                fontSize: 11,
                fontWeight: FontWeight.w800,
                color: badgeText,
                letterSpacing: 0.5,
              ),
            ),
          ),
        );
        continue;
      }

      // 2. Check for Bullet Points (•, -, *, 1., 2.)
      final isBullet = trimmed.startsWith('•') ||
          trimmed.startsWith('- ') ||
          trimmed.startsWith('* ') ||
          RegExp(r'^\d+[\.\)]').hasMatch(trimmed);

      if (isBullet) {
        String bulletText = trimmed;
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          bulletText = trimmed.substring(2);
        } else if (trimmed.startsWith('•')) {
          bulletText = trimmed.substring(1).trim();
        }

        children.add(
          Padding(
            padding: const EdgeInsets.only(left: 4.0, top: 4.0, bottom: 4.0),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  margin: const EdgeInsets.only(top: 6, right: 8),
                  width: 5,
                  height: 5,
                  decoration: BoxDecoration(
                    color: isDark ? theme.primaryColor : const Color(0xFFD97706),
                    shape: BoxShape.circle,
                  ),
                ),
                Expanded(
                  child: _buildRichInlineText(bulletText, isDark, theme),
                ),
              ],
            ),
          ),
        );
        continue;
      }

      // 3. Normal paragraph text
      children.add(
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 3.0),
          child: _buildRichInlineText(trimmed, isDark, theme),
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: children,
    );
  }

  Widget _buildRichInlineText(String text, bool isDark, ThemeData theme) {
    final spans = <TextSpan>[];
    // Split by ** for bold
    final boldParts = text.split('**');

    for (int i = 0; i < boldParts.length; i++) {
      if (boldParts[i].isEmpty) continue;
      final isExplicitBold = (i % 2 == 1);

      // Sub-split by * for italics
      final italicParts = boldParts[i].split('*');

      for (int j = 0; j < italicParts.length; j++) {
        final cleanChunk = italicParts[j].replaceAll('*', '').replaceAll('^', '').replaceAll('_', '');
        if (cleanChunk.isEmpty) continue;
        final isItalic = (j % 2 == 1);

        if (isExplicitBold) {
          spans.add(
            TextSpan(
              text: cleanChunk,
              style: TextStyle(
                fontFamily: 'Satoshi',
                fontSize: 12.5,
                height: 1.45,
                fontWeight: FontWeight.w900,
                fontStyle: isItalic ? FontStyle.italic : FontStyle.normal,
                color: isDark ? theme.primaryColor : const Color(0xFFD97706),
              ),
            ),
          );
        } else {
          // Auto-highlight statutory sections, laws, and physical metrics
          _addAutoHighlightedSpans(cleanChunk, spans, isDark, theme, isItalic);
        }
      }
    }

    return RichText(
      text: TextSpan(children: spans),
    );
  }

  void _addAutoHighlightedSpans(String chunk, List<TextSpan> spans, bool isDark, ThemeData theme, bool isItalic) {
    final autoHighlightRegExp = RegExp(
      r'(\b(?:Section|Sec\.?|Chapter|CHAPTER)\s+[\w\(\)\d\-]+|\b(?:Factories Act \d*|DGMS Guidelines|DGMS|OISD[\-\w]*|PESO[\-\w]*|MSIHC[\-\w]*)\b|\b\d+(?:\.\d+)?\s*(?:kg/cm²|bar|PPM|ppm|%|× MOP|MOP)\b|\b\d+\s*×\s*\w+\b|^[A-Za-z0-9][\w\s\-\/\(\)]+—[\w\s\-\/\(\)]+:|^[A-Za-z0-9][\w\s\-\/\(\)]+:)',
      caseSensitive: false,
    );

    int lastIndex = 0;
    for (final match in autoHighlightRegExp.allMatches(chunk)) {
      if (match.start > lastIndex) {
        spans.add(TextSpan(
          text: chunk.substring(lastIndex, match.start),
          style: TextStyle(
            fontFamily: 'Satoshi',
            fontSize: 12.5,
            height: 1.45,
            fontWeight: FontWeight.w500,
            fontStyle: isItalic ? FontStyle.italic : FontStyle.normal,
            color: isDark ? Colors.white : const Color(0xFF1E2328),
          ),
        ));
      }

      spans.add(TextSpan(
        text: match.group(0),
        style: TextStyle(
          fontFamily: 'Satoshi',
          fontSize: 12.5,
          height: 1.45,
          fontWeight: FontWeight.w900,
          fontStyle: isItalic ? FontStyle.italic : FontStyle.normal,
          color: isDark ? theme.primaryColor : const Color(0xFFD97706),
        ),
      ));

      lastIndex = match.end;
    }

    if (lastIndex < chunk.length) {
      spans.add(TextSpan(
        text: chunk.substring(lastIndex),
        style: TextStyle(
          fontFamily: 'Satoshi',
          fontSize: 12.5,
          height: 1.45,
          fontWeight: FontWeight.w500,
          fontStyle: isItalic ? FontStyle.italic : FontStyle.normal,
          color: isDark ? Colors.white : const Color(0xFF1E2328),
        ),
      ));
    }
  }

  @override
  void dispose() {
    _techSearchController.dispose();
    _connectivitySubscription.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = widget.darkMode;
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: AppBar(
        backgroundColor: isDark ? const Color(0xFF111827) : const Color(0xFF1E2328),
        elevation: 0,
        toolbarHeight: 56,
        automaticallyImplyLeading: false,
        titleSpacing: 0,
        title: Padding(
          padding: const EdgeInsets.only(left: 14),
          child: Row(
            children: [
              // Logo
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.asset(
                  "assets/images/FaktriIQ_sq.png",
                  width: 32,
                  height: 32,
                  fit: BoxFit.cover,
                ),
              ),
              const SizedBox(width: 10),
              // Brand Name
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      "FaktriIQ",
                      style: GoogleFonts.newsreader(
                        fontSize: 17,
                        fontWeight: FontWeight.w700,
                        fontStyle: FontStyle.italic,
                        color: theme.primaryColor,
                        height: 1.1,
                      ),
                    ),
                    Row(
                      children: [
                        Text(
                          "Copilot",
                          style: GoogleFonts.poppins(
                            fontSize: 10,
                            fontWeight: FontWeight.w500,
                            color: (isDark ? Colors.white : const Color(0xFFD1D5DB)).withOpacity(0.6),
                            letterSpacing: 1.2,
                            height: 1.3,
                          ),
                        ),
                        const SizedBox(width: 8),
                        // Status dot
                        Container(
                          width: 6,
                          height: 6,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: _isOnline ? const Color(0xFF2FA36B) : const Color(0xFFE0483D),
                            boxShadow: [
                              BoxShadow(
                                color: (_isOnline ? const Color(0xFF2FA36B) : const Color(0xFFE0483D)).withOpacity(0.5),
                                blurRadius: 6,
                                spreadRadius: 1,
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 4),
                        Text(
                          _isOnline ? "Online" : "Offline",
                          style: GoogleFonts.poppins(
                            fontSize: 9,
                            fontWeight: FontWeight.w600,
                            color: _isOnline ? const Color(0xFF2FA36B) : const Color(0xFFE0483D),
                            height: 1.3,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        actions: [
          // Theme toggle
          IconButton(
            icon: Icon(
              widget.darkMode ? Icons.light_mode_rounded : Icons.dark_mode_rounded,
              color: theme.primaryColor,
              size: 20,
            ),
            onPressed: widget.onToggleTheme,
            splashRadius: 20,
          ),
          // Profile avatar
          Container(
            margin: const EdgeInsets.only(right: 14),
            width: 30,
            height: 30,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: theme.primaryColor,
              border: Border.all(
                color: theme.primaryColor.withOpacity(0.3),
                width: 2,
              ),
            ),
            child: Center(
              child: Text(
                "OP",
                style: TextStyle(
                  fontFamily: 'Satoshi',
                  fontSize: 10,
                  fontWeight: FontWeight.w800,
                  color: isDark ? Colors.black : const Color(0xFF1E2328),
                ),
              ),
            ),
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(42),
          child: Container(
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF0F172A) : const Color(0xFF161B22),
              border: Border(
                top: BorderSide(
                  color: theme.primaryColor.withOpacity(0.08),
                  width: 1,
                ),
              ),
            ),
            child: Row(
              children: [
                _buildNavTab("ask", "Ask Copilot", Icons.chat_bubble_outline_rounded, isDark, theme),
                _buildNavTab("history", "Query Log", Icons.history_rounded, isDark, theme),
              ],
            ),
          ),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: _techTab == "ask"
              ? _buildTechAskView(theme, isDark)
              : _buildTechHistoryView(theme, isDark),
        ),
      ),
    );
  }

  void _showModelDownloadDialog(ThemeData theme, bool isDark) {
    double downloadProgress = 0.0;
    String downloadedMbStr = "0";
    String totalMbStr = "2350";
    bool isDownloading = false;
    String? downloadError;
    final hfTokenController = TextEditingController();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: theme.cardColor,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return Padding(
              padding: EdgeInsets.only(
                left: 24.0,
                right: 24.0,
                top: 24.0,
                bottom: MediaQuery.of(context).viewInsets.bottom + 24.0,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: isDark ? const Color(0xFF3F3517) : const Color(0xFFFFF4BD),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: const Icon(Icons.memory, color: Color(0xFFD97706), size: 20),
                          ),
                          const SizedBox(width: 12),
                          Text(
                            "On-Device Local AI Model",
                            style: GoogleFonts.poppins(fontSize: 15, fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                      IconButton(
                        icon: const Icon(Icons.close, size: 20),
                        onPressed: () => Navigator.pop(ctx),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    "Microsoft Phi-4 Mini (3.8B Q4_K_M GGUF) · 2.3 GB",
                    style: GoogleFonts.poppins(fontSize: 11, fontWeight: FontWeight.w600, color: isDark ? theme.primaryColor : const Color(0xFFD97706)),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    "Enables 100% offline, zero-internet AI compliance reasoning directly on your mobile processor.",
                    style: TextStyle(fontSize: 11, color: isDark ? Colors.grey : const Color(0xFF6B7280)),
                  ),
                  const SizedBox(height: 14),

                  if (!isDownloading) ...[
                    TextField(
                      controller: hfTokenController,
                      style: const TextStyle(fontSize: 12),
                      decoration: InputDecoration(
                        labelText: "Hugging Face Access Token (hf_...)",
                        hintText: "Optional / Free token from huggingface.co/settings/tokens",
                        isDense: true,
                        prefixIcon: const Icon(Icons.key, size: 16),
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                    ),
                    const SizedBox(height: 14),
                  ],

                  if (isDownloading) ...[
                    LinearProgressIndicator(
                      value: downloadProgress > 0 ? downloadProgress : null,
                      backgroundColor: isDark ? Colors.grey[800] : Colors.grey[200],
                      valueColor: AlwaysStoppedAnimation<Color>(theme.primaryColor),
                      minHeight: 8,
                    ),
                    const SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          "${(downloadProgress * 100).toStringAsFixed(1)}% Completed",
                          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                        Text(
                          "$downloadedMbStr MB / $totalMbStr MB",
                          style: TextStyle(fontSize: 11, color: isDark ? Colors.grey : Colors.black54),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                  ],

                  if (downloadError != null) ...[
                    Text(
                      downloadError!,
                      style: const TextStyle(color: Colors.redAccent, fontSize: 11),
                    ),
                    const SizedBox(height: 10),
                  ],

                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton.icon(
                          icon: Icon(isDownloading ? Icons.cancel : Icons.download_for_offline, size: 18),
                          label: Text(isDownloading ? "Cancel Download" : "Start One-Click Download (2.3 GB)"),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: isDownloading ? Colors.redAccent : theme.primaryColor,
                            foregroundColor: isDark ? Colors.black : const Color(0xFF1E2328),
                            padding: const EdgeInsets.symmetric(vertical: 12),
                          ),
                          onPressed: () async {
                            if (isDownloading) {
                              OnDeviceLlmService().cancelDownload();
                              setModalState(() {
                                isDownloading = false;
                              });
                            } else {
                              setModalState(() {
                                isDownloading = true;
                                downloadError = null;
                              });

                              final success = await OnDeviceLlmService().downloadModel(
                                hfToken: hfTokenController.text,
                                onProgress: (progress, downloaded, total) {
                                  setModalState(() {
                                    downloadProgress = progress;
                                    downloadedMbStr = downloaded;
                                    totalMbStr = total;
                                  });
                                },
                                onError: (err) {
                                  setModalState(() {
                                    isDownloading = false;
                                    downloadError = err;
                                  });
                                },
                              );

                              if (success) {
                                setModalState(() {
                                  isDownloading = false;
                                });
                                setState(() {});
                                if (context.mounted) Navigator.pop(ctx);
                              }
                            }
                          },
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildNavTab(String tab, String label, IconData icon, bool isDark, ThemeData theme) {
    final isActive = _techTab == tab;
    return Expanded(
      child: InkWell(
        onTap: () => setState(() => _techTab = tab),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 10),
          decoration: BoxDecoration(
            border: Border(
              bottom: BorderSide(
                color: isActive ? theme.primaryColor : Colors.transparent,
                width: 2.5,
              ),
            ),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                icon,
                size: 15,
                color: isActive
                    ? theme.primaryColor
                    : (isDark ? const Color(0xFF6B7280) : const Color(0xFF9CA3AF)),
              ),
              const SizedBox(width: 6),
              Text(
                label,
                style: GoogleFonts.poppins(
                  fontSize: 12,
                  fontWeight: isActive ? FontWeight.w600 : FontWeight.w500,
                  color: isActive
                      ? (isDark ? Colors.white : const Color(0xFFE5E7EB))
                      : (isDark ? const Color(0xFF6B7280) : const Color(0xFF9CA3AF)),
                  letterSpacing: 0.3,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTechAskView(ThemeData theme, bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Expanded(
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                if (_techResponse == null && !_techSearching) ...[
                  // Offline AI Model Download Status Banner
                  FutureBuilder<bool>(
                    future: OnDeviceLlmService().checkModelAvailability(),
                    builder: (context, snapshot) {
                      final isLoaded = snapshot.data ?? false;
                      return Container(
                        margin: const EdgeInsets.only(top: 8, bottom: 16),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF1F2937) : const Color(0xFFFFFDF5),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color: isLoaded
                                ? const Color(0xFF10B981)
                                : (isDark ? const Color(0xFFD97706) : const Color(0xFFF59E0B)),
                            width: 1.2,
                          ),
                        ),
                        child: Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                color: isLoaded
                                    ? (isDark ? const Color(0xFF064E3B) : const Color(0xFFD1FAE5))
                                    : (isDark ? const Color(0xFF3F3517) : const Color(0xFFFFF4BD)),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Icon(
                                isLoaded ? Icons.check_circle : Icons.memory,
                                color: isLoaded
                                    ? const Color(0xFF10B981)
                                    : const Color(0xFFD97706),
                                size: 20,
                              ),
                            ),
                            const SizedBox(width: 10),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    isLoaded
                                        ? "On-Device Local AI (Phi-4 Mini): Active"
                                        : "On-Device Local AI: Model Optional",
                                    style: TextStyle(
                                      fontFamily: 'Satoshi',
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                      color: isDark ? Colors.white : const Color(0xFF1E2328),
                                    ),
                                  ),
                                  const SizedBox(height: 2),
                                  Text(
                                    isLoaded
                                        ? "100% offline local reasoning enabled on phone."
                                        : "Download Phi-4 Mini (2.3 GB) for 100% offline local AI.",
                                    style: TextStyle(
                                      fontFamily: 'Satoshi',
                                      fontSize: 10,
                                      color: isDark ? Colors.grey : const Color(0xFF6B7280),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            TextButton(
                              onPressed: () => _showModelDownloadDialog(theme, isDark),
                              child: Text(
                                isLoaded ? "Manage" : "Download",
                                style: TextStyle(
                                  fontFamily: 'Satoshi',
                                  fontSize: 11,
                                  fontWeight: FontWeight.w900,
                                  color: isDark ? theme.primaryColor : const Color(0xFFD97706),
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 30.0),
                    child: Column(
                      children: [
                        Container(
                          width: 56,
                          height: 56,
                          decoration: BoxDecoration(color: theme.primaryColor, shape: BoxShape.circle),
                          child: Icon(Icons.search, color: isDark ? Colors.black : const Color(0xFF1E2328), size: 28),
                        ),
                        const SizedBox(height: 16),
                        const Text(
                          "How can I assist on the floor?",
                          style: TextStyle(fontFamily: 'Satoshi', fontSize: 15, fontWeight: FontWeight.bold),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 8),
                        Text(
                          "Submit queries on purging, tank safety standards, OISD pressure parameters, or PESO rulebooks.",
                          style: TextStyle(fontFamily: 'Satoshi', fontSize: 11, color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280), fontWeight: FontWeight.w500),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  )
                ],
                if (_techSearching) ...[
                  Padding(
                    padding: const EdgeInsets.only(top: 80.0),
                    child: Column(
                      children: [
                        CircularProgressIndicator(valueColor: AlwaysStoppedAnimation<Color>(theme.primaryColor)),
                        const SizedBox(height: 16),
                        Text(
                          "Searching plant documents...",
                          style: TextStyle(fontFamily: 'Satoshi', fontSize: 12, color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280), fontWeight: FontWeight.w500),
                        )
                      ],
                    ),
                  )
                ],
                if (_techResponse != null && !_techSearching) ...[
                  // 1. Question Bubble (Right Aligned)
                  Align(
                    alignment: Alignment.centerRight,
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      margin: const EdgeInsets.only(bottom: 12, left: 32),
                      decoration: BoxDecoration(
                        color: isDark ? const Color(0xFF3F3517) : const Color(0xFFFFF4BD),
                        borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(12),
                          topRight: Radius.circular(12),
                          bottomLeft: Radius.circular(12),
                          bottomRight: Radius.circular(4),
                        ),
                        border: Border.all(color: theme.dividerColor, width: 1),
                      ),
                      child: Text(
                        _techResponse!.query,
                        style: TextStyle(
                          fontFamily: 'Satoshi',
                          fontSize: 13,
                          color: isDark ? Colors.white : const Color(0xFF1E2328),
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ),
                  
                  // 2. Answer Bubble (Left Aligned)
                  Align(
                    alignment: Alignment.centerLeft,
                    child: Container(
                      padding: const EdgeInsets.all(14),
                      margin: const EdgeInsets.only(bottom: 8, right: 24),
                      decoration: BoxDecoration(
                        color: theme.cardColor,
                        borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(12),
                          topRight: Radius.circular(12),
                          bottomLeft: Radius.circular(4),
                          bottomRight: Radius.circular(12),
                        ),
                        border: Border.all(color: theme.dividerColor, width: 1.5),
                        boxShadow: [
                          BoxShadow(
                            color: isDark ? Colors.black.withOpacity(0.3) : const Color(0x0C1E2328),
                            blurRadius: 4,
                            offset: const Offset(0, 2),
                          )
                        ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildFormattedAnswerText(_techResponse!.answer, isDark, theme),
                          const SizedBox(height: 12),
                          // Citation status chip
                          Wrap(
                            crossAxisAlignment: WrapCrossAlignment.center,
                            spacing: 6,
                            runSpacing: 4,
                            children: [
                              Container(
                                width: 8,
                                height: 8,
                                decoration: BoxDecoration(
                                  color: _techResponse!.success ? const Color(0xFF2FA36B) : const Color(0xFFE0483D),
                                  shape: BoxShape.circle,
                                ),
                              ),
                              Text(
                                _techResponse!.success ? "OK" : "GAP",
                                style: TextStyle(
                                  fontFamily: 'Satoshi',
                                  fontSize: 10,
                                  fontWeight: FontWeight.bold,
                                  color: _techResponse!.success ? const Color(0xFF2FA36B) : const Color(0xFFE0483D),
                                ),
                              ),
                              if (_techResponse!.success) ...[
                                Text(
                                  " · ${_techResponse!.source} §${_techResponse!.section}",
                                  style: TextStyle(
                                    fontFamily: 'Courier',
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                    color: isDark ? Colors.grey : const Color(0xFF6B7280),
                                  ),
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                  decoration: BoxDecoration(
                                    color: isDark ? const Color(0xFF1F2937) : const Color(0xFFFFF4BD),
                                    borderRadius: BorderRadius.circular(4),
                                    border: Border.all(color: theme.dividerColor, width: 0.5),
                                  ),
                                  child: Text(
                                    _techResponse!.confidence.toUpperCase(),
                                    style: TextStyle(
                                      fontFamily: 'Satoshi',
                                      fontSize: 8,
                                      fontWeight: FontWeight.w900,
                                      color: isDark ? Colors.white70 : const Color(0xFF1E2328),
                                    ),
                                  ),
                                ),
                              ]
                            ],
                          )
                        ],
                      ),
                    ),
                  ),

                  // 3. View Full Section Affordance
                  if (_techResponse!.success && _techResponse!.fullSectionText != null) ...[
                    Padding(
                      padding: const EdgeInsets.only(left: 4.0, bottom: 8.0),
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: InkWell(
                          onTap: () => setState(() => _showFullSection = !_showFullSection),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                _showFullSection ? "Hide Full Section" : "View Full Section",
                                style: TextStyle(
                                  fontFamily: 'Satoshi',
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                  color: isDark ? theme.primaryColor : const Color(0xFF1E2328),
                                  decoration: TextDecoration.underline,
                                ),
                              ),
                              const SizedBox(width: 2),
                              Icon(
                                _showFullSection ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_down,
                                color: isDark ? theme.primaryColor : const Color(0xFF1E2328),
                                size: 16,
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                    if (_showFullSection) ...[
                      Container(
                        width: double.infinity,
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF1F2937) : const Color(0xFFFFFDF5),
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: theme.dividerColor, width: 1),
                        ),
                        child: SingleChildScrollView(
                          child: Text(
                            _techResponse!.fullSectionText!,
                            style: TextStyle(
                              fontFamily: 'Courier',
                              fontSize: 11,
                              height: 1.35,
                              color: isDark ? Colors.white70 : const Color(0xFF3B3F46),
                            ),
                          ),
                        ),
                      )
                    ]
                  ],

                  // 4. Disclaimer or Safety Escalation Box
                  const SizedBox(height: 4),
                  if (_techResponse!.success) ...[
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: const Color(0xFFE0913A).withOpacity(0.08),
                        border: Border.all(color: const Color(0xFFE0913A).withOpacity(0.3)),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Text(
                        "Disclaimer: Confirm safety parameters against regulatory standards files before executing purging entry.",
                        style: TextStyle(fontFamily: 'Satoshi', fontSize: 10, color: Color(0xFFE0913A), fontWeight: FontWeight.w500),
                      ),
                    ),
                  ] else ...[
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: const Color(0xFFE0483D).withOpacity(0.1),
                        border: Border.all(color: const Color(0xFFE0483D).withOpacity(0.3)),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          const Row(
                            children: [
                              Icon(Icons.error_outline, color: Color(0xFFE0483D), size: 18),
                              SizedBox(width: 8),
                              Text(
                                "Safety Escalation Advised",
                                style: TextStyle(fontFamily: 'Satoshi', fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFFE0483D)),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Text(
                            "No matching safety procedure found in the uploaded documents. Escalation to supervisor is recommended.",
                            style: TextStyle(
                              fontFamily: 'Satoshi',
                              fontSize: 11.5,
                              color: isDark ? Colors.grey.shade300 : const Color(0xFF3B3F46),
                            ),
                          ),
                          const SizedBox(height: 16),
                          TactilePushButton(
                            onTap: () {
                              GFToast.showToast("Safety coordinator notified of out-of-scope query.", context);
                              setState(() => _techResponse = null);
                            },
                            backgroundColor: const Color(0xFFE0483D),
                            textColor: Colors.white,
                            child: const Center(child: Text("Notify Supervisor")),
                          ),
                        ],
                      ),
                    )
                  ]
                ],
              ],
            ),
          ),
        ),
        const SizedBox(height: 8),
        Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (!_techSearching) ...[
              Text(
                "Suggested Safety Queries:",
                style: TextStyle(fontFamily: 'Satoshi', fontSize: 10, color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF3B3F46), fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 6),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    "Tank cleaning safety procedure",
                    "Fire hydrant pressure rules",
                    "Pressure vessel inspection",
                    "Confined space entry rules",
                  ].map((s) => Padding(
                    padding: const EdgeInsets.only(right: 8.0),
                    child: InkWell(
                      onTap: () {
                        _techSearchController.text = s;
                        _runTechSearch(s);
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF3F3517) : const Color(0xFFFFF4BD),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: theme.dividerColor, width: 1.5),
                        ),
                        child: Text(
                          s,
                          style: TextStyle(
                            fontFamily: 'Satoshi', 
                            fontSize: 10, 
                            fontWeight: FontWeight.bold,
                            color: isDark ? Colors.white : const Color(0xFF1E2328),
                          ),
                        ),
                      ),
                    ),
                  )).toList(),
                ),
              ),
            ],
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: Container(
                    height: 48,
                    decoration: BoxDecoration(
                      color: theme.cardColor,
                      borderRadius: BorderRadius.circular(24),
                      border: Border.all(color: theme.dividerColor, width: 1.5),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    alignment: Alignment.center,
                    child: TextField(
                      controller: _techSearchController,
                      style: const TextStyle(fontSize: 13),
                      decoration: const InputDecoration(
                        hintText: "Type floor safety query...",
                        hintStyle: TextStyle(fontSize: 13),
                        border: InputBorder.none,
                        isDense: true,
                      ),
                      onSubmitted: _runTechSearch,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                InkWell(
                  onTap: () => _runTechSearch(_techSearchController.text),
                  child: Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      color: isDark ? theme.primaryColor : const Color(0xFF1E2328), 
                      shape: BoxShape.circle,
                      border: Border.all(color: theme.dividerColor, width: 1.5),
                    ),
                    child: Center(
                      child: Icon(
                        Icons.send, 
                        color: isDark ? Colors.black : theme.primaryColor, 
                        size: 16,
                      ),
                    ),
                  ),
                ),
              ],
            )
          ],
        )
      ],
    );
  }

  Widget _buildTechHistoryView(ThemeData theme, bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          "HISTORY SEARCH LOGS",
          style: TextStyle(fontFamily: 'Satoshi', fontSize: 11, fontWeight: FontWeight.bold, color: theme.textTheme.labelSmall?.color),
        ),
        const SizedBox(height: 12),
        Expanded(
          child: ListView.separated(
            itemCount: _techHistory.length,
            separatorBuilder: (_, __) => const SizedBox(height: 10),
            itemBuilder: (context, idx) {
              final item = _techHistory[idx];
              return Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: theme.cardColor,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: theme.dividerColor, width: 1.5),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(item.timestamp, style: TextStyle(fontFamily: 'Satoshi', fontSize: 10, color: isDark ? Colors.grey : const Color(0xFF6B7280))),
                        Text(item.doc, style: TextStyle(fontFamily: 'Satoshi', fontSize: 10, color: isDark ? Colors.grey : const Color(0xFF6B7280), fontWeight: FontWeight.bold)),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text("Q: \"${item.query}\"", style: TextStyle(fontFamily: 'Satoshi', fontSize: 11, fontWeight: FontWeight.bold, color: isDark ? Colors.white : const Color(0xFF1E2328))),
                    const SizedBox(height: 6),
                    _buildFormattedAnswerText(item.answer, isDark, theme),
                  ],
                ),
              );
            },
          ),
        )
      ],
    );
  }
}

// ==========================================
// 3. SAFETY OFFICER STATION (RESPONSIVE WEB + MOBILE)
// ==========================================
class OfficerAppHome extends StatefulWidget {
  final bool darkMode;
  final VoidCallback onToggleTheme;

  const OfficerAppHome({
    super.key,
    required this.darkMode,
    required this.onToggleTheme,
  });

  @override
  State<OfficerAppHome> createState() => _OfficerAppHomeState();
}

class _OfficerAppHomeState extends State<OfficerAppHome> {
  String _officerTab = "dashboard"; // "dashboard" | "ingest"
  String _selectedDocId = "SOP-TC-042";
  ClauseModel? _drillDownClause;

  // Ingestion state
  String _uploadState = "idle"; // "idle" | "parsing" | "tagging" | "ready"
  String? _uploadedFilename;
  Map<String, dynamic>? _extractedMetadata;

  void _startAdminUploadSim(String filename) {
    setState(() {
      _uploadedFilename = filename;
      _uploadState = "parsing";
    });

    Future.delayed(const Duration(milliseconds: 1200), () {
      setState(() => _uploadState = "tagging");

      Future.delayed(const Duration(milliseconds: 1200), () {
        setState(() {
          _uploadState = "ready";
          _extractedMetadata = {
            "filename": filename,
            "doc_id": "SOP-NEW-304",
            "equipment_tags": ["TK-102", "vent-valve"],
            "clause_refs": ["Factories Act Sec 36", "OISD-STD-105"],
            "dates": ["11-Jul-2026"]
          };
        });
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDark = widget.darkMode;
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;
    final isLarge = size.width > 900;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF101820) : const Color(0xFFFFFFFF),
      appBar: AppBar(
        backgroundColor: isDark ? const Color(0xFF111827) : const Color(0xFF1E2328),
        leading: IconButton(
          icon: Icon(Icons.arrow_back_rounded, color: theme.primaryColor),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          "FaktriIQ Compliance",
          style: GoogleFonts.newsreader(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            fontStyle: FontStyle.italic,
            color: theme.primaryColor,
          ),
        ),
        actions: [
          // Tab Toggle Segment inside AppBar actions
          _buildAppBarTab("dashboard", "Dashboard"),
          _buildAppBarTab("ingest", "Ingest"),
          const SizedBox(width: 8),
          IconButton(
            icon: Icon(
              widget.darkMode ? Icons.light_mode : Icons.dark_mode,
              color: const Color(0xFFFEE715),
            ),
            onPressed: widget.onToggleTheme,
          ),
          Container(
            margin: const EdgeInsets.only(right: 12, left: 4),
            child: GFAvatar(
              shape: GFAvatarShape.circle,
              size: GFSize.SMALL,
              backgroundColor: const Color(0xFFFEE715),
              child: const Text(
                "SO",
                style: TextStyle(fontFamily: 'Satoshi', fontWeight: FontWeight.bold, color: Color(0xFF101820)),
              ),
            ),
          )
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: _officerTab == "dashboard"
              ? _buildDashboardView(theme, isDark, isLarge)
              : _buildIngestView(theme, isDark, isLarge),
        ),
      ),
    );
  }

  Widget _buildAppBarTab(String tab, String label) {
    final isActive = _officerTab == tab;
    return TextButton(
      onPressed: () => setState(() {
        _officerTab = tab;
        _drillDownClause = null;
      }),
      child: Text(
        label,
        style: GoogleFonts.poppins(
          fontSize: 12,
          fontWeight: FontWeight.bold,
          color: isActive ? const Color(0xFFFEE715) : Colors.grey.shade400,
        ),
      ),
    );
  }

  Widget _buildDashboardView(ThemeData theme, bool isDark, bool isLarge) {
    // Documents will be loaded from the backend — currently empty
    final List<DocumentModel> documents = [];
    final List<ClauseModel> docClauses = [];
    if (documents.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.cloud_off_rounded, size: 64, color: theme.primaryColor.withOpacity(0.4)),
              const SizedBox(height: 16),
              Text(
                "No documents ingested yet",
                style: GoogleFonts.newsreader(
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                  fontStyle: FontStyle.italic,
                  color: theme.primaryColor,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                "Connect to the backend to load your compliance documents and clause analysis.",
                textAlign: TextAlign.center,
                style: GoogleFonts.poppins(
                  fontSize: 13,
                  color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
                ),
              ),
            ],
          ),
        ),
      );
    }

    final selectedDoc = documents.firstWhere((d) => d.docId == _selectedDocId, orElse: () => documents.first);

    Widget dashboardContent = Flex(
      direction: isLarge ? Axis.horizontal : Axis.vertical,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // Left Document Library
        _responsiveWrapper(
          isLarge: isLarge,
          flex: 5,
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: theme.cardColor,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: theme.dividerColor),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Icon(Icons.description, color: Color(0xFF6B7280)),
                    const SizedBox(width: 8),
                    Text(
                      "Ingested Document Library",
                      style: GoogleFonts.poppins(fontSize: 13, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Expanded(
                  child: ListView.separated(
                    shrinkWrap: !isLarge,
                    physics: isLarge ? const AlwaysScrollableScrollPhysics() : const NeverScrollableScrollPhysics(),
                    itemCount: documents.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 12),
                    itemBuilder: (context, idx) {
                      final doc = documents[idx];
                      final isSelected = doc.docId == _selectedDocId;

                      return InkWell(
                        onTap: () => setState(() {
                          _selectedDocId = doc.docId;
                          _drillDownClause = null;
                        }),
                        child: Container(
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: isSelected 
                                ? const Color(0xFFFEE715).withOpacity(0.15)
                                : (isDark ? const Color(0xFF222E3B) : Colors.grey.shade50),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(
                              color: isSelected ? const Color(0xFFFEE715) : Colors.transparent,
                              width: 2,
                            ),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: isDark ? Colors.grey.shade800 : Colors.grey.shade200,
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                    child: Text(
                                      doc.docType.toUpperCase(),
                                      style: const TextStyle(fontFamily: 'Satoshi', fontSize: 9, fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                  Row(
                                    children: [
                                      GFBadge(
                                        text: "${doc.gapCount} gap${doc.gapCount != 1 ? 's' : ''}",
                                        color: doc.gapCount > 0 ? const Color(0xFFE8453C) : const Color(0xFF6B7280),
                                        shape: GFBadgeShape.pills,
                                      ),
                                      const SizedBox(width: 4),
                                      const GFBadge(
                                        text: "compliant",
                                        color: Color(0xFF22C55E),
                                        shape: GFBadgeShape.pills,
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                              const SizedBox(height: 8),
                              Text(
                                doc.title,
                                style: const TextStyle(fontFamily: 'Satoshi', fontSize: 13, fontWeight: FontWeight.bold),
                              ),
                              const SizedBox(height: 8),
                              Wrap(
                                spacing: 6,
                                children: doc.equipmentTags.map((tag) => Text(
                                  "#$tag",
                                  style: TextStyle(fontFamily: 'Satoshi', fontSize: 10, color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF4B5563)),
                                )).toList(),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
        if (isLarge) const SizedBox(width: 16) else const SizedBox(height: 16),
        // Right Clauses Panel
        _responsiveWrapper(
          isLarge: isLarge,
          flex: 7,
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: theme.cardColor,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: theme.dividerColor),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  "GOVERNING REGULATORY CLAUSES",
                  style: TextStyle(fontFamily: 'Satoshi', fontSize: 10, fontWeight: FontWeight.bold, color: theme.textTheme.labelSmall?.color),
                ),
                const SizedBox(height: 6),
                Text(
                  selectedDoc.title,
                  style: GoogleFonts.poppins(fontSize: 15, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 12),
                Expanded(
                  child: ListView.separated(
                    shrinkWrap: !isLarge,
                    physics: isLarge ? const AlwaysScrollableScrollPhysics() : const NeverScrollableScrollPhysics(),
                    itemCount: docClauses.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 12),
                    itemBuilder: (context, idx) {
                      final clause = docClauses[idx];
                      final isSelected = _drillDownClause?.clauseId == clause.clauseId;

                      return InkWell(
                        onTap: () => setState(() => _drillDownClause = clause),
                        child: Container(
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: isDark ? const Color(0xFF222E3B).withOpacity(0.5) : Colors.grey.shade50.withOpacity(0.5),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(
                              color: isSelected 
                                  ? (isDark ? const Color(0xFFFEE715) : const Color(0xFF101820))
                                  : Colors.transparent,
                              width: 1.5,
                            ),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          clause.source,
                                          style: TextStyle(fontFamily: 'Satoshi', fontSize: 9, color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF4B5563), fontWeight: FontWeight.bold),
                                        ),
                                        Text(
                                          clause.requirement,
                                          style: const TextStyle(fontFamily: 'Satoshi', fontSize: 12, fontWeight: FontWeight.bold),
                                        ),
                                      ],
                                    ),
                                  ),
                                  GFBadge(
                                    text: clause.status == "gap" ? "GAP FLAGGED" : "COMPLIANT",
                                    color: clause.status == "gap" ? const Color(0xFFE8453C) : const Color(0xFF22C55E),
                                    shape: GFBadgeShape.pills,
                                  ),
                                ],
                              ),
                              const SizedBox(height: 8),
                              Text(
                                clause.status == "gap" 
                                    ? "Missing: ${clause.explanation}" 
                                    : "Found: \"${clause.matchedText}\"",
                                style: TextStyle(
                                  fontFamily: 'Satoshi',
                                  fontSize: 11,
                                  fontWeight: FontWeight.w500,
                                  color: clause.status == "gap" ? const Color(0xFFE8453C) : const Color(0xFF22C55E),
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: isDark ? Colors.grey.shade800.withOpacity(0.5) : Colors.grey.shade100,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.warning_amber_rounded, size: 16, color: Color(0xFFFEE715)),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          "Compliance Agent surfaces gaps for EHS inspection. System does not hold statutory legal authority.",
                          style: TextStyle(fontFamily: 'Satoshi', fontSize: 10, fontWeight: FontWeight.w500, color: theme.textTheme.labelSmall?.color),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // Top Banner block
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: const Color(0xFFFEE715),
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: const Color(0xFF101820), width: 2),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "Compliance Agent Station",
                    style: GoogleFonts.poppins(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: const Color(0xFF101820),
                    ),
                  ),
                  const SizedBox(height: 2),
                  const Text(
                    "Procedure mapping & gap inspection against national acts",
                    style: TextStyle(
                      fontFamily: 'Satoshi',
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF101820),
                    ),
                  ),
                ],
              ),
              GFButton(
                onPressed: _showExportDialog,
                text: "Export Gaps",
                textStyle: const TextStyle(fontFamily: 'Satoshi', fontWeight: FontWeight.bold, color: Colors.white),
                color: const Color(0xFF101820),
                shape: GFButtonShape.pills,
              )
            ],
          ),
        ),
        const SizedBox(height: 16),
        Expanded(
          child: isLarge
              ? dashboardContent
              : SingleChildScrollView(
                  child: SizedBox(
                    height: 1100, // Safe bound height for stacked views on mobile browsers
                    child: dashboardContent,
                  ),
                ),
        ),
        if (_drillDownClause != null) ...[
          const SizedBox(height: 16),
          _buildDrillDownPanel(theme, isDark),
        ],
      ],
    );
  }

  Widget _responsiveWrapper({
    required bool isLarge,
    required int flex,
    required Widget child,
  }) {
    if (isLarge) {
      return Expanded(
        flex: flex,
        child: child,
      );
    }
    return child;
  }

  Widget _buildDrillDownPanel(ThemeData theme, bool isDark) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF222E3B),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFF101820), width: 2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.all(12),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "DRILL-DOWN REGULATION SOURCE TEXT",
                      style: TextStyle(fontFamily: 'Satoshi', fontSize: 10, color: Colors.grey, fontWeight: FontWeight.bold),
                    ),
                    Text(
                      "${_drillDownClause!.source} — ${_drillDownClause!.requirement}",
                      style: GoogleFonts.poppins(fontSize: 13, fontWeight: FontWeight.bold, color: const Color(0xFFFEE715)),
                    ),
                  ],
                ),
                IconButton(
                  icon: const Icon(Icons.close, color: Colors.white, size: 18),
                  onPressed: () => setState(() => _drillDownClause = null),
                )
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: const Color(0xFF101820),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.grey.shade800),
              ),
              child: Text(
                _drillDownClause!.clauseText,
                style: const TextStyle(
                  fontFamily: 'Satoshi',
                  fontSize: 11,
                  fontWeight: FontWeight.w500,
                  color: Colors.white,
                  height: 1.4,
                ),
              ),
            ),
          ),
          Container(
            color: const Color(0xFF101820),
            padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.gavel_rounded, size: 14, color: Color(0xFFFEE715)),
                const SizedBox(width: 8),
                Text(
                  "System-generated flag. Confirm against the original regulation before acting.",
                  style: GoogleFonts.poppins(
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    color: const Color(0xFFFEE715),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _showExportDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: Theme.of(context).cardColor,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24), side: const BorderSide(color: Color(0xFF101820), width: 2)),
          title: Container(
            padding: const EdgeInsets.all(8),
            color: const Color(0xFF101820),
            child: Text(
              "Export Gaps Summary",
              style: GoogleFonts.poppins(color: const Color(0xFFFEE715), fontSize: 15, fontWeight: FontWeight.bold),
            ),
          ),
          content: SizedBox(
            width: 500,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Text(
                  "Copy this compliance gap report summary to your clipboard:",
                  style: TextStyle(fontFamily: 'Satoshi', fontSize: 12, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.grey.shade100,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: const Text(
                    "FaktriIQ Compliance Gap Export:\n"
                    "1. SOP-TC-042 - Confined Space Entry: Buddy ropes/breathing mask is missing. [Factories Act Sec 36(2)]\n"
                    "2. SOP-FF-005 - Fire Hydrant Inspection: Redundant backup engine pump missing. [OISD-STD-189 Sec 7.1]",
                    style: TextStyle(fontFamily: 'Satoshi', fontSize: 11, color: Color(0xFF101820), height: 1.4),
                  ),
                ),
              ],
            ),
          ),
          actions: [
            GFButton(
              onPressed: () {
                Clipboard.setData(const ClipboardData(text: 
                  "FaktriIQ Compliance Gap Export:\n"
                  "1. SOP-TC-042 - Confined Space Entry: Buddy ropes/breathing mask is missing. [Factories Act Sec 36(2)]\n"
                  "2. SOP-FF-005 - Fire Hydrant Inspection: Redundant backup engine pump missing. [OISD-STD-189 Sec 7.1]"
                ));
                GFToast.showToast("Copied to clipboard", context);
                Navigator.of(context).pop();
              },
              text: "Copy",
              color: const Color(0xFF101820),
              shape: GFButtonShape.pills,
            ),
            GFButton(
              onPressed: () => Navigator.of(context).pop(),
              text: "Close",
              textStyle: TextStyle(
                fontFamily: 'Satoshi',
                fontWeight: FontWeight.bold,
                color: widget.darkMode ? Colors.white : const Color(0xFF101820),
              ),
              color: widget.darkMode ? Colors.grey.shade700 : Colors.grey.shade300,
              shape: GFButtonShape.pills,
            ),
          ],
        );
      },
    );
  }

  Widget _buildIngestView(ThemeData theme, bool isDark, bool isLarge) {
    return Center(
      child: Container(
        constraints: const BoxConstraints(maxWidth: 500),
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: theme.cardColor,
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: theme.dividerColor),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                const Icon(Icons.cloud_upload_outlined, size: 24, color: Color(0xFF6B7280)),
                const SizedBox(width: 8),
                Text(
                  "Document Ingest Administration",
                  style: GoogleFonts.poppins(fontSize: 15, fontWeight: FontWeight.bold),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Text(
              "Ingest operating logs, safety SOPs, or statutory codes (text-native/scanned PDFs).",
              style: TextStyle(
                fontFamily: 'Satoshi',
                fontSize: 11,
                color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF4B5563),
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 24),
            InkWell(
              onTap: () => _startAdminUploadSim("SOP_Purging_Chamber_TK102.pdf"),
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 36, horizontal: 16),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF222E3B).withOpacity(0.5) : Colors.grey.shade50,
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: theme.dividerColor, style: BorderStyle.solid),
                ),
                child: Column(
                  children: [
                    const Icon(Icons.upload_file_rounded, size: 40, color: Colors.grey),
                    const SizedBox(height: 12),
                    const Text(
                      "Tap to choose PDF from manual folder...",
                      style: TextStyle(fontFamily: 'Satoshi', fontSize: 13, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      "Simulates automatic text parsing and tag indexing",
                      style: TextStyle(fontFamily: 'Satoshi', fontSize: 10, color: theme.textTheme.labelSmall?.color),
                    ),
                  ],
                ),
              ),
            ),
            if (_uploadState != "idle") ...[
              const SizedBox(height: 20),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF222E3B) : Colors.grey.shade100,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text("File: $_uploadedFilename", style: const TextStyle(fontFamily: 'Satoshi', fontSize: 11, fontWeight: FontWeight.bold)),
                        GFBadge(
                          text: _uploadState.toUpperCase(),
                          color: const Color(0xFF101820),
                          shape: GFBadgeShape.pills,
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    LinearProgressIndicator(
                      value: _uploadState == "parsing" ? 0.33 : _uploadState == "tagging" ? 0.66 : 1.0,
                      backgroundColor: Colors.grey.shade300,
                      valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFFFEE715)),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text("1. Gas Parsing", style: TextStyle(fontFamily: 'Satoshi', fontSize: 9, fontWeight: _uploadState == "parsing" ? FontWeight.bold : FontWeight.normal)),
                        Text("2. Extract Metadata", style: TextStyle(fontFamily: 'Satoshi', fontSize: 9, fontWeight: _uploadState == "tagging" ? FontWeight.bold : FontWeight.normal)),
                        Text("3. Indexed Complete", style: TextStyle(fontFamily: 'Satoshi', fontSize: 9, fontWeight: _uploadState == "ready" ? FontWeight.bold : FontWeight.normal)),
                      ],
                    ),
                  ],
                ),
              ),
            ],
            if (_uploadState == "ready" && _extractedMetadata != null) ...[
              const SizedBox(height: 20),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFF222E3B),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: const Color(0xFF101820), width: 1.5),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.check_circle, color: Color(0xFFFEE715), size: 18),
                        const SizedBox(width: 8),
                        Text(
                          "Pipeline Ingestion Success",
                          style: GoogleFonts.poppins(fontSize: 13, fontWeight: FontWeight.bold, color: const Color(0xFFFEE715)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    _buildMetadataRow("Assigned Doc ID", _extractedMetadata!["doc_id"]),
                    const SizedBox(height: 8),
                    _buildMetadataRow("Equipment Tags", (_extractedMetadata!["equipment_tags"] as List).join(", ")),
                    const SizedBox(height: 8),
                    _buildMetadataRow("Regulation Matches", (_extractedMetadata!["clause_refs"] as List).join(", ")),
                    const SizedBox(height: 12),
                    GFButton(
                      onPressed: () => setState(() {
                        _uploadState = "idle";
                        _uploadedFilename = null;
                        _extractedMetadata = null;
                      }),
                      text: "Clear and Ingest New",
                      color: const Color(0xFFFEE715),
                      textStyle: const TextStyle(fontFamily: 'Satoshi', fontWeight: FontWeight.bold, color: Color(0xFF101820)),
                      shape: GFButtonShape.pills,
                    ),
                  ],
                ),
              )
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildMetadataRow(String label, String val) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(fontFamily: 'Satoshi', fontSize: 10, color: Colors.grey, fontWeight: FontWeight.w500)),
        Text(val, style: const TextStyle(fontFamily: 'Satoshi', fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
      ],
    );
  }
}
