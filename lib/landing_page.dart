import 'package:flutter/material.dart';
import 'package:getwidget/getwidget.dart';
import 'package:google_fonts/google_fonts.dart';

class FaktriLandingPage extends StatefulWidget {
  final bool darkMode;
  final VoidCallback onToggleTheme;

  const FaktriLandingPage({
    super.key,
    required this.darkMode,
    required this.onToggleTheme,
  });

  @override
  State<FaktriLandingPage> createState() => _FaktriLandingPageState();
}

class _FaktriLandingPageState extends State<FaktriLandingPage> {
  final _emailController = TextEditingController();
  final _nameController = TextEditingController();
  final _plantController = TextEditingController();
  bool _pilotRequested = false;

  void _submitPilotRequest() {
    if (_emailController.text.trim().isEmpty || _nameController.text.trim().isEmpty) {
      GFToast.showToast("Please enter your name and email.", context);
      return;
    }
    setState(() {
      _pilotRequested = true;
    });
    GFToast.showToast("Pilot request submitted! We will reach out to you.", context);
  }

  @override
  void dispose() {
    _emailController.dispose();
    _nameController.dispose();
    _plantController.dispose();
    super.dispose();
  }

  Widget _responsiveWrapper({
    required bool isLargeScreen,
    required int flex,
    required Widget child,
  }) {
    if (isLargeScreen) {
      return Expanded(
        flex: flex,
        child: child,
      );
    }
    return child;
  }

  @override
  Widget build(BuildContext context) {
    final isDark = widget.darkMode;
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;
    final isLargeScreen = size.width > 900;

    // Color tokens
    final Color voltColor = const Color(0xFFFEE715);
    final Color carbonColor = const Color(0xFF101820);
    final Color paperColor = isDark ? const Color(0xFF1A242F) : const Color(0xFFFFFFFF);
    final Color textColor = isDark ? const Color(0xFFF3F4F6) : const Color(0xFF101820);
    final Color sectionBg = isDark ? const Color(0xFF101820) : voltColor;
    final Color sectionTextColor = isDark ? voltColor : carbonColor;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF101820) : const Color(0xFFFFFFFF),
      // NAVBAR
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(70),
        child: AppBar(
          backgroundColor: carbonColor,
          elevation: 0,
          leadingWidth: 50,
          leading: Container(
            margin: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: voltColor,
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Center(
              child: Text(
                "F",
                style: TextStyle(
                  fontFamily: 'Striper',
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF101820),
                ),
              ),
            ),
          ),
          title: const Text(
            "FaktriIQ",
            style: TextStyle(
              fontFamily: 'Striper',
              fontSize: 22,
              color: Color(0xFFFEE715),
            ),
          ),
          actions: [
            // Dark Mode toggle
            IconButton(
              icon: Icon(
                isDark ? Icons.light_mode : Icons.dark_mode,
                color: voltColor,
              ),
              onPressed: widget.onToggleTheme,
            ),
            const SizedBox(width: 8),
            // CTA button to enter app
            Container(
              margin: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
              child: GFButton(
                onPressed: () => Navigator.pushNamed(context, '/app'),
                text: "Launch App",
                textStyle: TextStyle(
                  fontFamily: 'Satoshi',
                  fontWeight: FontWeight.bold,
                  color: carbonColor,
                ),
                color: voltColor,
                shape: GFButtonShape.pills,
              ),
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // HERO SECTION
            Container(
              color: sectionBg,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 48),
              child: Center(
                child: Container(
                  constraints: const BoxConstraints(maxWidth: 1200),
                  child: Flex(
                    direction: isLargeScreen ? Axis.horizontal : Axis.vertical,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      // Text column
                      _responsiveWrapper(
                        isLargeScreen: isLargeScreen,
                        flex: 6,
                        child: Column(
                          crossAxisAlignment: isLargeScreen
                              ? CrossAxisAlignment.start
                              : CrossAxisAlignment.center,
                          children: [
                            Text(
                              "Catch compliance gaps before your next audit does.",
                              textAlign: isLargeScreen ? TextAlign.left : TextAlign.center,
                              style: GoogleFonts.poppins(
                                fontSize: isLargeScreen ? 44 : 30,
                                fontWeight: FontWeight.w900,
                                color: isDark ? const Color(0xFFFFFFFF) : carbonColor,
                                height: 1.1,
                              ),
                            ),
                            const SizedBox(height: 16),
                            Text(
                              "A growing team of specialized AI agents built for plant safety officers and technicians. Automatic OISD, Factories Act, and PESO gap-detection, plus instant cited answers from your own documentation on the shop floor.",
                              textAlign: isLargeScreen ? TextAlign.left : TextAlign.center,
                              style: TextStyle(
                                fontFamily: 'Satoshi',
                                fontSize: 16,
                                fontWeight: FontWeight.w500,
                                color: isDark ? const Color(0xFFD1D5DB) : carbonColor.withOpacity(0.85),
                                height: 1.4,
                              ),
                            ),
                            const SizedBox(height: 32),
                            // CTAs
                            Wrap(
                              spacing: 16,
                              runSpacing: 16,
                              alignment: isLargeScreen
                                  ? WrapAlignment.start
                                  : WrapAlignment.center,
                              children: [
                                GFButton(
                                  onPressed: () => Navigator.pushNamed(context, '/app'),
                                  text: "Enter Workspace",
                                  textStyle: TextStyle(
                                    fontFamily: 'Satoshi',
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15,
                                    color: voltColor,
                                  ),
                                  color: carbonColor,
                                  shape: GFButtonShape.pills,
                                  size: GFSize.LARGE,
                                ),
                                GFButton(
                                  onPressed: () {
                                    Scrollable.ensureVisible(
                                      _pilotFormKey.currentContext!,
                                      duration: const Duration(milliseconds: 500),
                                    );
                                  },
                                  text: "Request a Pilot",
                                  textStyle: TextStyle(
                                    fontFamily: 'Satoshi',
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15,
                                    color: isDark ? Colors.white : carbonColor,
                                  ),
                                  color: isDark ? Colors.grey.shade800 : Colors.white.withOpacity(0.9),
                                  shape: GFButtonShape.pills,
                                  size: GFSize.LARGE,
                                  borderSide: BorderSide(
                                    color: isDark ? Colors.transparent : carbonColor,
                                    width: 1.5,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      if (isLargeScreen) const SizedBox(width: 48) else const SizedBox(height: 48),
                      // Mockup Visual Container (Compliance Agent Mock)
                      _responsiveWrapper(
                        isLargeScreen: isLargeScreen,
                        flex: 5,
                        child: Container(
                          constraints: const BoxConstraints(maxWidth: 500),
                          decoration: BoxDecoration(
                            color: carbonColor,
                            borderRadius: BorderRadius.circular(24),
                            border: Border.all(color: isDark ? voltColor : carbonColor, width: 2),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.2),
                                blurRadius: 15,
                                offset: const Offset(0, 10),
                              )
                            ],
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              // Top Bar
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                                decoration: BoxDecoration(
                                  color: const Color(0xFF1E293B),
                                  borderRadius: const BorderRadius.only(
                                    topLeft: Radius.circular(22),
                                    topRight: Radius.circular(22),
                                  ),
                                  border: Border(
                                    bottom: BorderSide(color: Colors.grey.shade800),
                                  ),
                                ),
                                child: Row(
                                  children: [
                                    Container(
                                      width: 12,
                                      height: 12,
                                      decoration: const BoxDecoration(color: Colors.red, shape: BoxShape.circle),
                                    ),
                                    const SizedBox(width: 6),
                                    Container(
                                      width: 12,
                                      height: 12,
                                      decoration: const BoxDecoration(color: Colors.yellow, shape: BoxShape.circle),
                                    ),
                                    const SizedBox(width: 6),
                                    Container(
                                      width: 12,
                                      height: 12,
                                      decoration: const BoxDecoration(color: Colors.green, shape: BoxShape.circle),
                                    ),
                                    const SizedBox(width: 16),
                                    Text(
                                      "Compliance Agent | Active Workspace",
                                      style: GoogleFonts.poppins(
                                        color: Colors.white,
                                        fontSize: 11,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    )
                                  ],
                                ),
                              ),
                              // Content mock
                              Padding(
                                padding: const EdgeInsets.all(20.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          "SOP_Chemical_Tank_Cleaning.pdf",
                                          style: GoogleFonts.poppins(
                                            color: voltColor,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 12,
                                          ),
                                        ),
                                        const GFBadge(
                                          text: "GAP FLAGGED",
                                          color: Color(0xFFE8453C),
                                          shape: GFBadgeShape.pills,
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 12),
                                    const Text(
                                      "Governing Regulation:",
                                      style: TextStyle(
                                        fontFamily: 'Satoshi',
                                        fontSize: 9,
                                        color: Colors.grey,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    const Text(
                                      "Factories Act 1948 Sec 36(2) — Confined Space Safety Belt & Ropes",
                                      style: TextStyle(
                                        fontFamily: 'Satoshi',
                                        fontSize: 12,
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    const SizedBox(height: 12),
                                    Container(
                                      padding: const EdgeInsets.all(12),
                                      decoration: BoxDecoration(
                                        color: const Color(0xFF222E3B),
                                        borderRadius: BorderRadius.circular(20),
                                      ),
                                      child: const Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            "Audited SOP Requirement:",
                                            style: TextStyle(fontFamily: 'Satoshi', fontSize: 9, color: Colors.grey),
                                          ),
                                          SizedBox(height: 2),
                                          Text(
                                            "\"Safety harness is required for all operators entry.\"",
                                            style: TextStyle(fontFamily: 'Satoshi', fontSize: 11, color: Colors.white, fontStyle: FontStyle.italic),
                                          ),
                                          SizedBox(height: 8),
                                          Text(
                                            "Audit Gap Found by Compliance Agent:",
                                            style: TextStyle(fontFamily: 'Satoshi', fontSize: 9, color: Color(0xFFE8453C), fontWeight: FontWeight.bold),
                                          ),
                                          SizedBox(height: 2),
                                          Text(
                                            "\"No mention of breathing apparatus or oxygen mask requirements for confined space entry in the SOP text. Buddy line rope-end holding is also missing.\"",
                                            style: TextStyle(fontFamily: 'Satoshi', fontSize: 11, color: Color(0xFFE8453C)),
                                          ),
                                        ],
                                      ),
                                    ),
                                    const SizedBox(height: 12),
                                    // Monospace trust marker signature
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                      decoration: BoxDecoration(
                                        color: Colors.grey.shade900,
                                        borderRadius: BorderRadius.circular(20),
                                        border: Border.all(color: Colors.grey.shade800),
                                      ),
                                      child: const Text(
                                        "SOP-TC-042 §36(2) | High confidence",
                                        style: TextStyle(
                                          fontFamily: 'Satoshi',
                                          fontSize: 10,
                                          fontWeight: FontWeight.w500,
                                          color: Colors.white,
                                        ),
                                      ),
                                    )
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // PROBLEM SECTION
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 64),
              color: isDark ? const Color(0xFF1E293B) : Colors.grey.shade50,
              child: Center(
                child: Container(
                  constraints: const BoxConstraints(maxWidth: 1200),
                  child: Column(
                    children: [
                      Text(
                        "THE PROBLEM",
                        style: TextStyle(
                          fontFamily: 'Satoshi',
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: isDark ? voltColor : carbonColor,
                          letterSpacing: 2,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        "Plants run on undocumented know-how and fragmented manuals.",
                        textAlign: TextAlign.center,
                        style: GoogleFonts.poppins(
                          fontSize: 26,
                          fontWeight: FontWeight.bold,
                          color: textColor,
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        "Your plant's knowledge already exists. It's just scattered across a dozen systems, and nobody has time to dig for it — until something goes wrong.",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontFamily: 'Satoshi',
                          fontSize: 14,
                          color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
                        ),
                      ),
                      const SizedBox(height: 48),
                      // Three columns
                      Flex(
                        direction: isLargeScreen ? Axis.horizontal : Axis.vertical,
                        children: [
                          _responsiveWrapper(
                            isLargeScreen: isLargeScreen,
                            flex: 1,
                            child: _buildProblemCard(
                              icon: Icons.difference_outlined,
                              title: "Information Fragmentation",
                              desc: "SOPs, logs, manuals, and statutory acts are scattered in 7–12 disconnected files and email threads. Workers waste hours searching instead of acting.",
                              isDark: isDark,
                              paperColor: paperColor,
                            ),
                          ),
                          if (isLargeScreen) const SizedBox(width: 24) else const SizedBox(height: 24),
                          _responsiveWrapper(
                            isLargeScreen: isLargeScreen,
                            flex: 1,
                            child: _buildProblemCard(
                              icon: Icons.gavel_outlined,
                              title: "Reactive Compliance",
                              desc: "Safety gaps between actual operating procedures and strict Indian regulatory codes (Factories Act, OISD, PESO) are found only during audits or inspection audits.",
                              isDark: isDark,
                              paperColor: paperColor,
                            ),
                          ),
                          if (isLargeScreen) const SizedBox(width: 24) else const SizedBox(height: 24),
                          _responsiveWrapper(
                            isLargeScreen: isLargeScreen,
                            flex: 1,
                            child: _buildProblemCard(
                              icon: Icons.person_off_outlined,
                              title: "Institutional Knowledge Loss",
                              desc: "When experienced engineers and senior plant operators retire, their undocumented operational expertise is gone forever.",
                              isDark: isDark,
                              paperColor: paperColor,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // HOW IT WORKS SECTION
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 64),
              color: isDark ? const Color(0xFF101820) : Colors.white,
              child: Center(
                child: Container(
                  constraints: const BoxConstraints(maxWidth: 1200),
                  child: Column(
                    children: [
                      Text(
                        "THE WORKFLOW",
                        style: TextStyle(
                          fontFamily: 'Satoshi',
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: isDark ? voltColor : carbonColor,
                          letterSpacing: 2,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        "How FaktriIQ Secures Your Operations",
                        textAlign: TextAlign.center,
                        style: GoogleFonts.poppins(
                          fontSize: 26,
                          fontWeight: FontWeight.bold,
                          color: textColor,
                        ),
                      ),
                      const SizedBox(height: 48),
                      // Horizontal steps
                      LayoutBuilder(
                        builder: (context, constraints) {
                          final isNarrow = constraints.maxWidth < 750;
                          return Flex(
                            direction: isNarrow ? Axis.vertical : Axis.horizontal,
                            children: [
                              _buildStep(
                                step: "1",
                                title: "Upload Manuals & SOPs",
                                desc: "Ingest PDFs or standard operating procedures.",
                                isNarrow: isNarrow,
                              ),
                              if (!isNarrow) _buildStepArrow() else const SizedBox(height: 16),
                              _buildStep(
                                step: "2",
                                title: "Automated Compliance Audit",
                                desc: "Agents map rules to statutory OISD/PESO clauses.",
                                isNarrow: isNarrow,
                              ),
                              if (!isNarrow) _buildStepArrow() else const SizedBox(height: 16),
                              _buildStep(
                                step: "3",
                                title: "Plain-Language Ask",
                                desc: "Technicians ask safety guidelines on the floor.",
                                isNarrow: isNarrow,
                              ),
                              if (!isNarrow) _buildStepArrow() else const SizedBox(height: 16),
                              _buildStep(
                                step: "4",
                                title: "Traceable Answers",
                                desc: "Get confidence-scored responses with cited sources.",
                                isNarrow: isNarrow,
                              ),
                            ],
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // MEET THE AGENTS SECTION (AVAILABLE NOW)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 64),
              color: isDark ? const Color(0xFF1E293B) : Colors.grey.shade50,
              child: Center(
                child: Container(
                  constraints: const BoxConstraints(maxWidth: 1200),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Center(
                        child: Text(
                          "THE AI TEAM",
                          style: TextStyle(
                            fontFamily: 'Satoshi',
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                            color: isDark ? voltColor : carbonColor,
                            letterSpacing: 2,
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),
                      Center(
                        child: Text(
                          "Meet the agents on the job today.",
                          textAlign: TextAlign.center,
                          style: GoogleFonts.poppins(
                            fontSize: 26,
                            fontWeight: FontWeight.bold,
                            color: textColor,
                          ),
                        ),
                      ),
                      const SizedBox(height: 48),
                      // Two agents
                      Flex(
                        direction: isLargeScreen ? Axis.horizontal : Axis.vertical,
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          // Agent 1: Compliance Agent (Primary highlight card)
                          _responsiveWrapper(
                            isLargeScreen: isLargeScreen,
                            flex: 1,
                            child: Container(
                              padding: const EdgeInsets.all(32),
                              decoration: BoxDecoration(
                                color: paperColor,
                                borderRadius: BorderRadius.circular(24),
                                border: Border.all(color: voltColor, width: 3),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Container(
                                        padding: const EdgeInsets.all(10),
                                        decoration: BoxDecoration(
                                          color: carbonColor,
                                          shape: BoxShape.circle,
                                        ),
                                        child: Icon(Icons.shield_outlined, color: voltColor, size: 24),
                                      ),
                                      const GFBadge(
                                        text: "MARKET UNIQUE",
                                        color: Color(0xFF22C55E),
                                        shape: GFBadgeShape.pills,
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 24),
                                  Text(
                                    "Agent 01: Compliance Agent",
                                    style: GoogleFonts.poppins(
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold,
                                      color: textColor,
                                    ),
                                  ),
                                  const SizedBox(height: 8),
                                  Text(
                                    "Checks your procedures against real Indian regulations and flags what's missing — before an inspector does.",
                                    style: TextStyle(
                                      fontFamily: 'Satoshi',
                                      fontSize: 14,
                                      fontWeight: FontWeight.bold,
                                      color: isDark ? Colors.grey.shade300 : carbonColor.withOpacity(0.8),
                                    ),
                                  ),
                                  const SizedBox(height: 24),
                                  _buildAgentBullet("Clause-mapping lookup — Instantly identify which statutory clauses (OISD, Factories Act, PESO) govern a procedure."),
                                  _buildAgentBullet("Compliance-gap flagging — Spot missing sections, absent safety ropes, and breathing mask requirement gaps."),
                                  _buildAgentBullet("Clause drill-down — Direct clickable navigation to regulatory source text to double-check the agent's matches."),
                                  _buildAgentBullet("Compliance summary export — Simple copyable summaries detailing safety gaps for EHS team logs."),
                                ],
                              ),
                            ),
                          ),
                          if (isLargeScreen) const SizedBox(width: 32) else const SizedBox(height: 32),
                          // Agent 2: Knowledge Copilot
                          _responsiveWrapper(
                            isLargeScreen: isLargeScreen,
                            flex: 1,
                            child: Container(
                              padding: const EdgeInsets.all(32),
                              decoration: BoxDecoration(
                                color: paperColor,
                                borderRadius: BorderRadius.circular(24),
                                border: Border.all(color: isDark ? Colors.grey.shade800 : Colors.grey.shade300),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Container(
                                    padding: const EdgeInsets.all(10),
                                    decoration: BoxDecoration(
                                      color: isDark ? voltColor : carbonColor,
                                      shape: BoxShape.circle,
                                    ),
                                    child: Icon(
                                      Icons.question_answer_outlined,
                                      color: isDark ? carbonColor : voltColor,
                                      size: 24,
                                    ),
                                  ),
                                  const SizedBox(height: 24),
                                  Text(
                                    "Agent 02: Knowledge Copilot",
                                    style: GoogleFonts.poppins(
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold,
                                      color: textColor,
                                    ),
                                  ),
                                  const SizedBox(height: 8),
                                  Text(
                                    "Answers your questions from your plant's own documents — and shows you exactly where the answer came from.",
                                    style: TextStyle(
                                      fontFamily: 'Satoshi',
                                      fontSize: 14,
                                      fontWeight: FontWeight.bold,
                                      color: isDark ? Colors.grey.shade300 : carbonColor.withOpacity(0.8),
                                    ),
                                  ),
                                  const SizedBox(height: 24),
                                  _buildAgentBullet("Ask-anything document search — Natural-language RAG queries across plant operating manuals, safety booklets, and files."),
                                  _buildAgentBullet("Cited answers, every time — Every response shows the exact source document and sections, eliminating guesswork."),
                                  _buildAgentBullet("Confidence indicator — Match-confidence tags (high/medium/low) so you know how much to rely on a response."),
                                  _buildAgentBullet("Honest 'no answer found' — Explicitly tells the user when information doesn't exist, preventing unsafe hallucinations."),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // MEET THE REST OF THE TEAM (COMING SOON)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 64),
              color: isDark ? const Color(0xFF101820) : Colors.white,
              child: Center(
                child: Container(
                  constraints: const BoxConstraints(maxWidth: 1200),
                  child: Column(
                    children: [
                      Text(
                        "THE ROADMAP",
                        style: TextStyle(
                          fontFamily: 'Satoshi',
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: isDark ? voltColor : carbonColor,
                          letterSpacing: 2,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        "The team is growing.",
                        textAlign: TextAlign.center,
                        style: GoogleFonts.poppins(
                          fontSize: 26,
                          fontWeight: FontWeight.bold,
                          color: textColor,
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        "These specialized agents are currently training to join the FaktriIQ suite:",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontFamily: 'Satoshi',
                          fontSize: 14,
                          color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
                        ),
                      ),
                      const SizedBox(height: 48),
                      // 3 Columns (Muted)
                      Flex(
                        direction: isLargeScreen ? Axis.horizontal : Axis.vertical,
                        children: [
                          _responsiveWrapper(
                            isLargeScreen: isLargeScreen,
                            flex: 1,
                            child: _buildComingSoonCard(
                              title: "Agent 03: Knowledge Graph Agent",
                              desc: "Maps relationships between machinery assets, safety procedures, and legislative clauses so one lookup discovers everything related.",
                              isDark: isDark,
                            ),
                          ),
                          if (isLargeScreen) const SizedBox(width: 24) else const SizedBox(height: 24),
                          _responsiveWrapper(
                            isLargeScreen: isLargeScreen,
                            flex: 1,
                            child: _buildComingSoonCard(
                              title: "Agent 04: Maintenance & RCA Agent",
                              desc: "Audits equipment logs and work orders to suggest preventive repairs and assist engineering root-cause-analysis.",
                              isDark: isDark,
                            ),
                          ),
                          if (isLargeScreen) const SizedBox(width: 24) else const SizedBox(height: 24),
                          _responsiveWrapper(
                            isLargeScreen: isLargeScreen,
                            flex: 1,
                            child: _buildComingSoonCard(
                              title: "Agent 05: Lessons-Learned Agent",
                              desc: "Spots behavioral patterns in incident files and near-miss logs across plants, pre-warning crews before hazards repeat.",
                              isDark: isDark,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // AUDIENCE & PERSONAS
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 64),
              color: isDark ? const Color(0xFF1E293B) : Colors.grey.shade50,
              child: Center(
                child: Container(
                  constraints: const BoxConstraints(maxWidth: 1000),
                  child: Column(
                    children: [
                      Text(
                        "WHO IT'S FOR",
                        style: TextStyle(
                          fontFamily: 'Satoshi',
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: isDark ? voltColor : carbonColor,
                          letterSpacing: 2,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        "Built for the Shop Floor & EHS Desks",
                        textAlign: TextAlign.center,
                        style: GoogleFonts.poppins(
                          fontSize: 26,
                          fontWeight: FontWeight.bold,
                          color: textColor,
                        ),
                      ),
                      const SizedBox(height: 48),
                      Flex(
                        direction: isLargeScreen ? Axis.horizontal : Axis.vertical,
                        children: [
                          // Tech persona
                          _responsiveWrapper(
                            isLargeScreen: isLargeScreen,
                            flex: 1,
                            child: Card(
                              color: paperColor,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(24),
                                side: BorderSide(color: isDark ? Colors.grey.shade800 : Colors.grey.shade200),
                              ),
                              child: Padding(
                                padding: const EdgeInsets.all(24.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Icon(Icons.engineering_outlined, size: 32, color: Colors.blue),
                                    const SizedBox(height: 16),
                                    Text(
                                      "Field Plant Technicians",
                                      style: GoogleFonts.poppins(fontSize: 18, fontWeight: FontWeight.bold, color: textColor),
                                    ),
                                    const SizedBox(height: 8),
                                    const Text(
                                      "Standing near equipment, needing instant, simple answers. Large touch targets and minimal typing keep operators safe and efficient.",
                                      style: TextStyle(fontFamily: 'Satoshi', fontSize: 13, height: 1.4),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                          if (isLargeScreen) const SizedBox(width: 24) else const SizedBox(height: 24),
                          // Officer persona
                          _responsiveWrapper(
                            isLargeScreen: isLargeScreen,
                            flex: 1,
                            child: Card(
                              color: paperColor,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(24),
                                side: BorderSide(color: isDark ? Colors.grey.shade800 : Colors.grey.shade200),
                              ),
                              child: Padding(
                                padding: const EdgeInsets.all(24.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Icon(Icons.assignment_turned_in_outlined, size: 32, color: Colors.green),
                                    const SizedBox(height: 16),
                                    Text(
                                      "Safety & EHS Officers",
                                      style: GoogleFonts.poppins(fontSize: 18, fontWeight: FontWeight.bold, color: textColor),
                                    ),
                                    const SizedBox(height: 8),
                                    const Text(
                                      "Desk-based audits. Need visibility into procedure discrepancies before regulatory visits. They get gap checklists and quick references.",
                                      style: TextStyle(fontFamily: 'Satoshi', fontSize: 13, height: 1.4),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // TRUST & SOURCE CREDIBILITY
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 48),
              color: carbonColor,
              child: Center(
                child: Container(
                  constraints: const BoxConstraints(maxWidth: 800),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.gavel_rounded, color: voltColor, size: 20),
                          const SizedBox(width: 10),
                          Text(
                            "Statutory Compliance Baseline",
                            style: GoogleFonts.poppins(
                              color: voltColor,
                              fontSize: 15,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      const Text(
                        "FaktriIQ agents map queries directly against official regulatory text including the Factories Act 1948, OISD standards, and PESO guidelines. All compliance flags require EHS manager verification prior to final operational sign-off.",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontFamily: 'Satoshi',
                          fontSize: 12,
                          color: Colors.white,
                          height: 1.5,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // CTA PILOT REQUEST FORM
            Container(
              key: _pilotFormKey,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 64),
              color: isDark ? const Color(0xFF101820) : Colors.white,
              child: Center(
                child: Container(
                  constraints: const BoxConstraints(maxWidth: 600),
                  padding: const EdgeInsets.all(32),
                  decoration: BoxDecoration(
                    color: paperColor,
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: isDark ? Colors.grey.shade800 : Colors.grey.shade200),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Text(
                        "Request an Enterprise Pilot",
                        textAlign: TextAlign.center,
                        style: GoogleFonts.poppins(
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                          color: textColor,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        "See FaktriIQ run on your own manuals, SOPs, and facility equipment logs.",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontFamily: 'Satoshi',
                          fontSize: 12,
                          color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
                        ),
                      ),
                      const SizedBox(height: 24),
                      if (_pilotRequested) ...[
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: const Color(0xFF22C55E).withOpacity(0.15),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: const Color(0xFF22C55E)),
                          ),
                          child: const Column(
                            children: [
                              Icon(Icons.check_circle_outline, color: Color(0xFF22C55E), size: 36),
                              SizedBox(height: 12),
                              Text(
                                "Pilot Request Submitted Successfully!",
                                style: TextStyle(fontFamily: 'Satoshi', fontWeight: FontWeight.bold, fontSize: 14),
                              ),
                              SizedBox(height: 4),
                              Text(
                                "Our EHS alignment coordinator will email you within 24 hours.",
                                style: TextStyle(fontFamily: 'Satoshi', fontSize: 11),
                                textAlign: TextAlign.center,
                              ),
                            ],
                          ),
                        )
                      ] else ...[
                        TextField(
                          controller: _nameController,
                          decoration: InputDecoration(
                            labelText: "Your Name",
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                            isDense: true,
                          ),
                        ),
                        const SizedBox(height: 16),
                        TextField(
                          controller: _emailController,
                          decoration: InputDecoration(
                            labelText: "Email Address",
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                            isDense: true,
                          ),
                        ),
                        const SizedBox(height: 16),
                        TextField(
                          controller: _plantController,
                          decoration: InputDecoration(
                            labelText: "Plant Facility Name / Organization",
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                            isDense: true,
                          ),
                        ),
                        const SizedBox(height: 24),
                        GFButton(
                          onPressed: _submitPilotRequest,
                          text: "Submit Pilot Request",
                          textStyle: TextStyle(
                            fontFamily: 'Satoshi',
                            fontWeight: FontWeight.bold,
                            color: carbonColor,
                          ),
                          color: voltColor,
                          shape: GFButtonShape.pills,
                          size: GFSize.LARGE,
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ),

            // FOOTER
            Container(
              color: carbonColor,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
              child: Center(
                child: Container(
                  constraints: const BoxConstraints(maxWidth: 1200),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            "FaktriIQ",
                            style: TextStyle(
                              fontFamily: 'Striper',
                              fontSize: 16,
                              color: Color(0xFFFEE715),
                            ),
                          ),
                          Text(
                            "© 2026 FaktriIQ. All rights reserved.",
                            style: TextStyle(
                              fontFamily: 'Satoshi',
                              fontSize: 11,
                              color: Colors.grey.shade500,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      Divider(color: Colors.grey.shade800),
                      const SizedBox(height: 12),
                      Text(
                        "FaktriIQ is a pre-launch intelligence pilot platform. System-generated compliance flags and recommendations must be manually verified by EHS engineering coordinators prior to operational change.",
                        style: TextStyle(
                          fontFamily: 'Satoshi',
                          fontSize: 10,
                          color: Colors.grey.shade600,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }

  // HELPER WIDGETS
  Widget _buildProblemCard({
    required IconData icon,
    required String title,
    required String desc,
    required bool isDark,
    required Color paperColor,
  }) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: paperColor,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: isDark ? Colors.grey.shade800 : Colors.grey.shade200),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 28, color: const Color(0xFFFEE715)),
          const SizedBox(height: 16),
          Text(
            title,
            style: GoogleFonts.poppins(
              fontSize: 15,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            desc,
            style: const TextStyle(
              fontFamily: 'Satoshi',
              fontSize: 12,
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStep({
    required String step,
    required String title,
    required String desc,
    required bool isNarrow,
  }) {
    final child = Column(
      children: [
        Container(
          width: 36,
          height: 36,
          decoration: const BoxDecoration(
            color: Color(0xFF101820),
            shape: BoxShape.circle,
          ),
          child: Center(
            child: Text(
              step,
              style: const TextStyle(
                fontFamily: 'Satoshi',
                fontWeight: FontWeight.bold,
                color: Color(0xFFFEE715),
              ),
            ),
          ),
        ),
        const SizedBox(height: 12),
        Text(
          title,
          style: GoogleFonts.poppins(
            fontSize: 13,
            fontWeight: FontWeight.bold,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 4),
        Text(
          desc,
          style: const TextStyle(
            fontFamily: 'Satoshi',
            fontSize: 11,
            color: Colors.grey,
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
    if (isNarrow) {
      return child;
    }
    return Expanded(
      flex: 1,
      child: child,
    );
  }

  Widget _buildStepArrow() {
    return const Padding(
      padding: EdgeInsets.symmetric(horizontal: 8.0),
      child: Icon(Icons.arrow_forward_rounded, color: Colors.grey, size: 16),
    );
  }

  Widget _buildAgentBullet(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.only(top: 4.0),
            child: Icon(Icons.check_circle, size: 14, color: Color(0xFF22C55E)),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              text,
              style: const TextStyle(
                fontFamily: 'Satoshi',
                fontSize: 12,
                height: 1.3,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildComingSoonCard({
    required String title,
    required String desc,
    required bool isDark,
  }) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: isDark ? const Color(0xFFFEE715).withOpacity(0.3) : const Color(0xFF101820).withOpacity(0.3),
          width: 1.5,
          style: BorderStyle.solid,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: GoogleFonts.poppins(
                  fontSize: 13,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const GFBadge(
                text: "SOON",
                color: Color(0xFF6B7280),
                shape: GFBadgeShape.standard,
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            desc,
            style: const TextStyle(
              fontFamily: 'Satoshi',
              fontSize: 12,
              color: Colors.grey,
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }
}

final GlobalKey _pilotFormKey = GlobalKey();
