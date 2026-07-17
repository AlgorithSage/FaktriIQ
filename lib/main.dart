import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:getwidget/getwidget.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:async';
import 'package:connectivity_plus/connectivity_plus.dart';

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
// MOCK DATABASE STORES
// ==========================================

final List<DocumentModel> mockDocuments = [
  DocumentModel(
    docId: "SOP-TC-042",
    filename: "SOP_Chemical_Tank_Cleaning.pdf",
    docType: "Standard Operating Procedure",
    title: "TK-101 Storage Tank Cleansing Protocol",
    uploadDate: "2026-05-12",
    equipmentTags: ["TK-101", "storage-vessel"],
    dates: ["12-May-2026", "Revision: 15-Jun-2026"],
    clauseRefs: ["Factories Act Sec 36", "OISD-STD-105 Sec 4"],
    gapCount: 1,
    okCount: 2,
    content: "Standard operating procedure for purging and cleaning chemical storage tank TK-101. Prior to entry, the tank must be isolated, drained, and ventilated. Oxygen level must be checked using a calibrated gas detector. Safety harness is required for all operators entry."
  ),
  DocumentModel(
    docId: "SOP-PV-018",
    filename: "SOP_Pressure_Vessel_Maintenance.pdf",
    docType: "Maintenance Manual",
    title: "PV-202 Hydrostatic Maintenance & Inspection",
    uploadDate: "2026-01-08",
    equipmentTags: ["PV-202", "pressure-system"],
    dates: ["08-Jan-2026"],
    clauseRefs: ["PESO Rules 2016 Cl 18", "Factories Act Sec 31"],
    gapCount: 0,
    okCount: 3,
    content: "Operating manual for pressure vessel PV-202 maintenance. Visual inspections must be performed monthly. Pressure relief valves must be calibrated annually. Hydrostatic testing is scheduled every 2 years."
  ),
  DocumentModel(
    docId: "SOP-FF-005",
    filename: "SOP_Fire_Hydrant_Maintenance.pdf",
    docType: "Safety Guidelines",
    title: "Fire Hydrant Network Inspections",
    uploadDate: "2026-04-15",
    equipmentTags: ["FH-System", "fire-suppression"],
    dates: ["15-Apr-2026", "Quarterly check"],
    clauseRefs: ["OISD-STD-189 Sec 7"],
    gapCount: 1,
    okCount: 1,
    content: "Routine inspection of the fire hydrant loop across the chemical storage yards. Water pressure must exceed 7 kg/cm2. Inspections are quarterly. All staff must be trained on nozzle operation."
  )
];

final Map<String, List<ClauseModel>> mockClauses = {
  "SOP-TC-042": [
    ClauseModel(
      clauseId: "FAC-36-1",
      source: "Factories Act 1948 Sec 36(1)",
      requirement: "Confined Space Entry Gas Test",
      clauseText: "No person shall be allowed to enter any confined space until all practicable measures have been taken to remove gas, fumes or vapor, and it has been certified by a competent person based on a gas test that the space is free from dangerous fumes and fit for entry.",
      status: "ok",
      matchedText: "Oxygen level must be checked using a calibrated gas detector.",
      explanation: "The procedure explicitly mandates gas checking prior to entry."
    ),
    ClauseModel(
      clauseId: "FAC-36-2",
      source: "Factories Act 1948 Sec 36(2)",
      requirement: "Breathing Apparatus & Mask",
      clauseText: "No person shall be entry into confined space without wearing suitable breathing apparatus, a safety belt securely attached to a rope, the free end of which is held by a person outside.",
      status: "gap",
      matchedText: "",
      explanation: "No mention of breathing apparatus or oxygen mask requirements for confined space entry in the SOP text. Buddy line rope-end holding is also missing."
    ),
    ClauseModel(
      clauseId: "OISD-105-4.2",
      source: "OISD-STD-105 Sec 4.2",
      requirement: "Safety Harness and Anchor",
      clauseText: "All personnel entering chemical tanks shall wear a full-body safety harness anchored to a lifeline managed by an external standby buddy at all times.",
      status: "ok",
      matchedText: "Safety harness is required for all operators entry.",
      explanation: "Safety harness is required for entries."
    )
  ],
  "SOP-PV-018": [
    ClauseModel(
      clauseId: "PESO-18-2",
      source: "PESO Rules 2016 Clause 18",
      requirement: "Hydraulic Testing Schedule",
      clauseText: "Pressure vessels must undergo hydraulic testing by a competent person licensed under PESO at least once in every two years, and certificates must be filed in Form VIII.",
      status: "ok",
      matchedText: "Hydrostatic testing is scheduled every 2 years.",
      explanation: "Hydrostatic testing schedule is in line with the 2-year statutory requirement."
    ),
    ClauseModel(
      clauseId: "FAC-31-1",
      source: "Factories Act 1948 Sec 31",
      requirement: "Pressure Relief Safety Valve Calibration",
      clauseText: "Safe working pressure must be ensured on all machinery operating under pressure. Relief valves must be calibrated annually and kept free of obstruction.",
      status: "ok",
      matchedText: "Pressure relief valves must be calibrated annually.",
      explanation: "Valve calibration frequency complies with annual inspection requirements."
    ),
    ClauseModel(
      clauseId: "FAC-31-2",
      source: "Factories Act 1948 Sec 31(3)",
      requirement: "Monthly Visual Checks",
      clauseText: "Monthly visual inspection of gauges, valves, and structural integrity of the vessels must be recorded by the EHS team.",
      status: "ok",
      matchedText: "Visual inspections must be performed monthly.",
      explanation: "Monthly visual inspections are recorded and scheduled."
    )
  ],
  "SOP-FF-005": [
    ClauseModel(
      clauseId: "OISD-189-7.1",
      source: "OISD-STD-189 Sec 7.1",
      requirement: "Redundant Water Pumps Supply",
      clauseText: "The fire water hydrant system must be backed up by a redundant secondary pump set (standby diesel engine-driven pump) capable of starting automatically on pressure drop.",
      status: "gap",
      matchedText: "",
      explanation: "Dual-source water pump supply or standby diesel pump redundancy is not documented in the fire hydrant loop maintenance plan."
    ),
    ClauseModel(
      clauseId: "OISD-189-7.3",
      source: "OISD-STD-189 Sec 7.3",
      requirement: "Min Operating Pressure Level",
      clauseText: "The static pressure in the fire water hydrant network must be maintained at not less than 7.0 kg/cm2 at the farthest point of the loop.",
      status: "ok",
      matchedText: "Water pressure must exceed 7 kg/cm2.",
      explanation: "Pressure threshold matches the 7.0 kg/cm2 regulatory baseline."
    )
  ]
};

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
}

final Map<String, AnswerResult> mockSearchReplies = {
  "what is the safety procedure for tank cleaning?": AnswerResult(
    success: true,
    query: "what is the safety procedure for tank cleaning?",
    answer: "Prior to entering chemical storage tank TK-101, the vessel must be isolated, drained, and ventilated. The oxygen level must be checked using a calibrated gas detector. Operators are required to wear a safety harness for entry.",
    source: "SOP-TC-042",
    section: "Confined Space Sec 3.1",
    confidence: "High confidence",
    fullSectionText: "SOP-TC-042: CONFINED SPACE ENTRY & TANK CLEANING\n\n1. REGULATORY STANDARD\nThis procedure satisfies Section 36 of the Factories Act 1948 (Confined Space Entry) and OISD-STD-105.\n\n2. PRE-ENTRY PROTOCOLS\n- Vessel isolation: Blank or blind all inlet and outlet pipes.\n- Emptying & Draining: Remove all residues completely prior to entry.\n- Forced Ventilation: Keep mechanical exhaust running continuously.\n- Atmosphere Gas Test: Test oxygen level (19.5% - 23.5%), toxic vapors (H2S < 10 ppm), and explosive limits (< 1% LEL).\n\n3. PERSONAL SAFETY LIMITS\n- Harness: Double-lanyard safety harness anchored securely to a lifeline.\n- Standby Person: Station a certified operator outside the manhole to maintain visual contact and hold the lifeline.\n- Breathing Apparatus: Self-contained breathing apparatus (SCBA) required if toxic levels exceed permissible exposure limits.",
  ),
  "oisd rule for fire hydrant water pressure": AnswerResult(
    success: true,
    query: "oisd rule for fire hydrant water pressure",
    answer: "The static water pressure in the fire water network must be maintained at not less than 7 kg/cm2. This must be monitored during routine inspections of the fire hydrant loop.",
    source: "SOP-FF-005",
    section: "OISD-STD-189 Sec 7.3",
    confidence: "High confidence",
    fullSectionText: "SOP-FF-005: FIRE HYDRANT NETWORK SYSTEM\n\n1. REGULATORY STANDARD\nConforms to OISD-STD-189 Section 7.3 (Fire Water System Design).\n\n2. SYSTEM OPERATING CRITERIA\n- Minimum Static Pressure: 7.0 kg/cm2 at the remotest point of the hydrant network.\n- Design Flow: Hydrant water ring must maintain continuous flow under full emergency load.\n- Pump Auto-Start: Jockey pumps start at 7.5 kg/cm2, main pumps start automatically at 7.0 kg/cm2.\n\n3. MAINTENANCE & DRILLS\n- Log header pressure hourly in the central control room.\n- Test run main diesel and motor-driven fire water pumps weekly.\n- Inspect all hydrant boxes, valves, and nozzles monthly for scaling, rust, and physical blockages.",
  ),
  "peso pressure vessel inspection frequency": AnswerResult(
    success: true,
    query: "peso pressure vessel inspection frequency",
    answer: "For pressure vessel PV-202, visual inspections must be conducted monthly, safety relief valve calibration must occur annually, and hydrostatic testing is mandated once every 2 years.",
    source: "SOP-PV-018",
    section: "PESO Rules 2016 Cl 18",
    confidence: "High confidence",
    fullSectionText: "SOP-PV-018: PRESSURE VESSEL PV-202 TESTING FREQUENCY\n\n1. REGULATORY STANDARD\nConforms to Clause 18 of the Petroleum and Explosives Safety Organisation (PESO) Rules 2016.\n\n2. MANDATED INSPECTION SCHEDULE\n- Visual Inspection: Monthly check of external structure, mounts, and indicators.\n- Safety Relief Valve (SRV) Calibration: Conduct calibration and pop-testing annually. Tag with calibration dates.\n- Hydrostatic Test: Subject the vessel to a hydrotest at 1.5x design pressure once every 2 years.\n\n3. REPORTING REQUIREMENTS\n- Certification: Test reports must be signed by a PESO Competent Person.\n- Submissions: Submit structural integrity certificates online to the licensing authority within 14 days.",
  ),
  "oisd safety harness guideline": AnswerResult(
    success: true,
    query: "oisd safety harness guideline",
    answer: "Personnel entering chemical tanks like TK-101 must wear a safety harness anchored to a lifeline. This matches OISD-STD-105 requirements for confined entry.",
    source: "SOP-TC-042",
    section: "OISD-STD-105 Sec 4.2",
    confidence: "High confidence",
    fullSectionText: "SOP-TC-042: FALL PROTECTION & HARNESS GUIDELINES\n\n1. REGULATORY STANDARD\nConforms to OISD-STD-105 Section 4.2 (Safety in Confined Spaces).\n\n2. EQUIPMENT DESIGN REQUIREMENTS\n- Harness Type: Full-body safety harness with dual back-anchoring D-rings.\n- Lanyards: Double-shock-absorbing lifelines with automatic snap hooks.\n- Lifeline Load: Minimum tensile strength of 22.2 kN static weight load.\n\n3. OPERATION PROCEDURE\n- Verify anchoring structural integrity prior to worker attachment.\n- Station one attendant outside the manhole to maintain constant tension on the safety lifeline.\n- Clean harness strap webs weekly of any acidic chemical residues or grease accumulation.",
  )
};

final List<String> SUGGESTIONS = [
  "What is the safety procedure for tank cleaning?",
  "OISD rule for fire hydrant water pressure",
  "PESO pressure vessel inspection frequency",
  "OISD safety harness guideline"
];

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

  final List<QueryLog> _techHistory = [
    QueryLog(
      query: "How to clean TK-101?",
      answer: "TK-101 must be isolated, drained, and ventilated. Gas test is required prior to entry.",
      timestamp: "10-Jul-2026 14:35",
      doc: "SOP-TC-042"
    )
  ];

  void _runTechSearch(String queryText) {
    if (queryText.trim().isEmpty) return;
    setState(() {
      _techSearching = true;
      _techResponse = null;
      _showFullSection = false;
    });

    Future.delayed(const Duration(milliseconds: 1200), () {
      final normalized = queryText.toLowerCase().trim().replaceAll("?", "");
      AnswerResult? result;

      for (var key in mockSearchReplies.keys) {
        if (normalized.contains(key) || key.contains(normalized)) {
          result = mockSearchReplies[key];
          break;
        }
      }

      setState(() {
        _techSearching = false;
        if (result != null) {
          _techResponse = result;
          _techHistory.insert(
            0,
            QueryLog(
              query: queryText,
              answer: result.answer,
              timestamp: "Today",
              doc: result.source,
            ),
          );
        } else {
          _techResponse = AnswerResult(
            success: false,
            query: queryText,
            answer: "No matching safety procedure found in the uploaded documents. Escalate to your supervisor if this is urgent.",
          );
        }
      });
    });
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
        leading: Navigator.canPop(context)
            ? IconButton(
                icon: Icon(Icons.arrow_back_rounded, color: theme.primaryColor),
                onPressed: () => Navigator.pop(context),
              )
            : Container(
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
          "FaktriIQ Copilot",
          style: GoogleFonts.newsreader(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            fontStyle: FontStyle.italic,
            color: theme.primaryColor,
          ),
        ),
        actions: [
          Center(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: Colors.transparent,
                border: Border.all(
                  color: _isOnline 
                      ? const Color(0xFF2FA36B).withOpacity(0.6) 
                      : const Color(0xFFE0483D).withOpacity(0.6),
                ),
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(
                _isOnline ? "ONLINE" : "OFFLINE",
                style: TextStyle(
                  fontFamily: 'Satoshi', 
                  fontSize: 9, 
                  fontWeight: FontWeight.bold, 
                  color: _isOnline ? const Color(0xFF2FA36B) : const Color(0xFFE0483D),
                ),
              ),
            ),
          ),
          IconButton(
            icon: Icon(
              widget.darkMode ? Icons.light_mode : Icons.dark_mode,
              color: theme.primaryColor,
            ),
            onPressed: widget.onToggleTheme,
          ),
          Container(
            margin: const EdgeInsets.only(right: 12, left: 4),
            child: GFAvatar(
              shape: GFAvatarShape.circle,
              size: GFSize.SMALL,
              backgroundColor: theme.primaryColor,
              child: Text(
                "OP",
                style: TextStyle(fontFamily: 'Satoshi', fontWeight: FontWeight.bold, color: isDark ? Colors.black : const Color(0xFF1E2328)),
              ),
            ),
          )
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Tabs
            Container(
              decoration: BoxDecoration(
                color: theme.cardColor,
                border: Border(
                  bottom: BorderSide(color: theme.dividerColor, width: 1.5),
                ),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: _buildTechTabButton("ask", "Ask Copilot"),
                  ),
                  Expanded(
                    child: _buildTechTabButton("history", "Query Log"),
                  ),
                ],
              ),
            ),
            // Body Content
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: _techTab == "ask" 
                    ? _buildTechAskView(theme, isDark) 
                    : _buildTechHistoryView(theme, isDark),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTechTabButton(String tab, String label) {
    final isActive = _techTab == tab;
    final theme = Theme.of(context);
    return InkWell(
      onTap: () => setState(() => _techTab = tab),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: isActive ? theme.primaryColor : Colors.transparent,
              width: 3,
            ),
          ),
        ),
        child: Center(
          child: Text(
            label,
            style: GoogleFonts.poppins(
              fontSize: 13,
              fontWeight: FontWeight.bold,
              color: isActive 
                ? (widget.darkMode ? Colors.white : const Color(0xFF1E2328)) 
                : (widget.darkMode ? Colors.grey : const Color(0xFF6B7280)),
            ),
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
                  Padding(
                    padding: const EdgeInsets.only(top: 60.0),
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
                          Text(
                            _techResponse!.answer,
                            style: TextStyle(
                              fontFamily: 'Satoshi', 
                              fontSize: 13, 
                              height: 1.45,
                              color: isDark ? Colors.white : const Color(0xFF1E2328),
                            ),
                          ),
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
                  children: SUGGESTIONS.map((s) => Padding(
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
                    const SizedBox(height: 4),
                    Text("A: ${item.answer}", style: TextStyle(fontFamily: 'Satoshi', fontSize: 12, height: 1.3, color: isDark ? Colors.white70 : const Color(0xFF3B3F46))),
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
    final selectedDoc = mockDocuments.firstWhere((d) => d.docId == _selectedDocId);
    final docClauses = mockClauses[_selectedDocId] ?? [];

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
                    itemCount: mockDocuments.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 12),
                    itemBuilder: (context, idx) {
                      final doc = mockDocuments[idx];
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
