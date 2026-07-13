Master PRD — FaktriIQ



Industrial Knowledge Intelligence Platform (Full-Stack SaaS)

Document type: Father/context PRD — this is the single source of truth for the entire project. The landing page PRD, day-by-day build plan, architecture diagram, and any future briefs (to teammates, judges, or an AI coding assistant) should all be derivable from this document without contradiction. If any other document conflicts with this one, this one wins.

Version: v1.0 — MVP scope (12-day build) Owner: AlgoZeniths — Archisman "Zenith" Chakraborty and team, IEM Kolkata Status: Pre-build, active planning



1. Executive Summary

FaktriIQ is an AI platform for industrial plants (oil & gas, chemical, pharma, process manufacturing) that gives technicians and safety officers a growing team of specialized AI agents. The first two agents let users ask plain-language questions against the plant's own documents and get cited, trustworthy answers, and automatically flag gaps between plant procedures and Indian regulatory standards (Factories Act 1948, OISD, PESO).

It targets the "AI for Industrial Knowledge Intelligence: Unified Asset & Operations Brain" problem statement, scoped deliberately narrow: two working agents built deeply, rather than five agents built shallowly, within a 12-day MVP window, on free/open tooling, running on a 6–8GB GPU.



2. Problem Statement (source: official competition brief)

Professionals in asset-intensive industries spend a large share of working hours searching for information, clarifying instructions, or recreating documents that already exist somewhere in the organisation. Indian plants typically operate across 7–12 disconnected document systems — engineering drawings in one place, maintenance work orders in another, operating procedures in a third, inspection records in a fourth, regulatory submissions scattered across email archives. This fragmentation contributes materially to unplanned downtime, and a significant share of India's experienced industrial engineers and operators will retire within the next decade, taking undocumented operational knowledge with them.

This is not a filing problem. It is a safety problem, a quality problem, and an operational efficiency problem — and it compounds over time.



3. Project Brief (Standalone One-Pager)

This section is self-contained by design — it can be copied out and shared on its own (with a teammate, a mentor, a judge, or a potential pilot customer) without needing the rest of this document for context.

2.1 What it is

FaktriIQ is an AI platform for industrial plants (oil & gas, chemical, pharma, process manufacturing) that gives technicians and safety officers a growing team of specialized AI agents — starting with an agent that flags gaps between plant procedures and Indian regulatory standards (Factories Act 1948, OISD, PESO), and an agent that answers plain-language questions from the plant's own documents, always with a cited, verifiable source.

2.2 The problem

Indian industrial plants typically run on documentation scattered across 7–12 disconnected systems — engineering drawings in one place, maintenance logs in another, safety procedures in a third, regulatory filings in email archives. This causes three concrete, compounding problems:

Technicians waste time and risk safety. Workers spend a large share of their working hours searching for information instead of acting on it, sometimes making decisions without the right procedure in hand.

Compliance is reactive, not proactive. Safety officers typically discover gaps between plant procedures and regulatory requirements during an audit — after the fact, when it's already a finding against the plant, not before.

Institutional knowledge disappears. As experienced engineers retire, undocumented know-how leaves with them and cannot be recovered.

This is not a filing problem. It is a safety problem, a quality problem, and an operational efficiency problem — and it compounds every year it isn't solved.

2.3 The solution

FaktriIQ ingests a plant's own documents (manuals, SOPs, inspection records) and public Indian regulatory text (Factories Act, OISD standards, PESO rules), and gives two specialized AI agents access to that combined knowledge base:

The Compliance Agent checks plant procedures against real regulatory clauses and flags mismatches automatically — turning compliance from a once-a-year audit scramble into a continuous, proactive check.

The Knowledge Copilot answers any plant-related question in plain language, in seconds, always citing the exact source document and section — and says "I don't know" rather than guessing when nothing relevant exists in the documents.

Both agents are mobile-first (built in Flutter for one codebase across web and mobile), so a technician on the shop floor and a safety officer at a desk get the same trustworthy system, tailored to how each of them actually works.

2.4 Why now, and why this is different

A comparative analysis of 15 industrial AI platforms already in market — including major incumbents like IBM, Microsoft, SAP, Siemens, and AVEVA — found that not one of them supports Indian statutory frameworks (OISD, Factories Act, PESO), and none does automated regulation-to-procedure gap detection. Confidence scoring on answers and an honest "no answer found" fallback are also absent from nearly every competitor reviewed. FaktriIQ is built specifically to close these gaps — see Section 11 (Competitive Positioning) for the full analysis.

2.5 Full feature list

Available now (MVP, 12-day build):

Agent 1 — The Compliance Agent

Clause-mapping lookup (matches a procedure to governing OISD / Factories Act / PESO clauses)

Compliance-gap flagging (flags when a procedure doesn't address a matched requirement)

Clause drill-down (view the actual regulation text; human always makes the final call)

Compliance summary export (exportable list of flagged gaps)

Agent 2 — The Knowledge Copilot

Ask-anything document search (natural-language Q&A over the plant's own documents)

Cited answers, every time (exact source document + section shown)

Confidence indicator (high/medium/low match confidence per answer)

Honest "no answer found" fallback (never guesses)

Mobile-first interface (built for one-handed, on-the-floor use)

Automatic query logging (doubles as an audit trail)

Shared/supporting capabilities

Document ingestion pipeline (admin upload, text-native or scanned PDFs)

Structured metadata tagging (auto-extracted equipment tags, dates, clause references)

Time-to-answer comparison (manual search vs. agent, shown as a proof point)

Role-based authentication (technician / officer / admin via Firebase Auth)

Coming soon (explicitly roadmap, not built in MVP):

Agent 3 — The Knowledge Graph Agent (full equipment↔clause↔procedure relationship graph)

Agent 4 — The Maintenance & RCA Agent (predictive maintenance, root-cause analysis)

Agent 5 — The Lessons-Learned Agent (pattern detection across incident/near-miss history)

Multi-plant / multi-tenant accounts and billing

Auto-syncing document ingestion (watched folders/email)

Offline-first mode

2.6 Who it's for

Field technicians who need a fast, trustworthy answer on their phone, mid-task, without digging through binders or PDFs.

EHS / Safety officers who need to know where their plant's procedures fall short of regulatory requirements — before an inspector tells them.

2.7 Tech stack at a glance

Flutter (web + mobile) · FastAPI (Python backend) · Firebase Auth + Firestore · LangChain or Agno for agent orchestration (decision pending) · open-source embeddings + a locally-run quantized LLM for AI inference — zero paid API dependency, runs on a 6–8GB GPU.

2.8 Current stage

Pre-build, active planning, scoped for a 12-day MVP build. Two agents fully working, source-cited, and demo-ready is the bar for success — not a broad, shallow five-agent platform. See Section 6 for the full scope boundary and Section 18 for open decisions still being closed.



4. Goals

3.1 Product goals

Let any technician or safety officer get a trustworthy, cited answer to an operational question in seconds instead of minutes.

Make regulatory compliance checking proactive (before an audit) instead of reactive (during/after one).

Prove the core loop (ingest → retrieve → ground → cite → flag) works on one real vertical, with a clear, honest architecture for scaling to more.

3.2 Competition/demo goals (12-day window)

Ship two fully working agents (not five shallow ones).

Every claim on the demo/landing page must map to something actually built — no vaporware in the working prototype.

Deliver all four required artifacts: working prototype, architecture diagram, presentation deck, demo video.

3.3 Non-goals for this version

Not building a general-purpose enterprise document management system.

Not replacing human judgment on legal/regulatory compliance — the product surfaces information, humans decide.

Not attempting multi-plant, multi-tenant scale in the MVP — single-plant, single-vertical proof first.



5. Target Users & Personas

Persona 1 — Field Technician

Works on the shop floor, uses a phone, not a desktop.

Needs answers fast, mid-task, often one-handed.

Low tolerance for typing long queries or navigating menus.

Primary agent used: Knowledge Copilot.

Persona 2 — EHS / Safety & Compliance Officer

Desk-based, uses a laptop/tablet.

Responsible for audit readiness and regulatory adherence.

Wants to catch compliance gaps before an external inspector does.

Primary agent used: Compliance Agent.

Persona 3 (not built for, but informs architecture) — Plant Manager / Admin

Would manage document uploads, user roles, and see aggregate usage.

Represented in the MVP only as a basic "admin" role for document upload — no dashboard/analytics yet.



6. Scope Definition — MVP vs. Roadmap

This section is the single authoritative scope reference. All other documents (landing page PRD, pitch deck, demo script) must match this exactly.

5.1 In scope for MVP (12 days)

Agent 1 — The Knowledge Copilot

Natural-language Q&A over an ingested document corpus (OEM manuals, SOPs, regulatory text)

Source citation on every answer (document + section/page)

Confidence indicator (high/medium/low) per answer

Explicit "no answer found in documents" fallback — no hallucinated answers

Mobile-first chat interface (Flutter)

Automatic query/answer logging (doubles as audit trail)

Agent 2 — The Compliance Agent

Clause-mapping lookup: given a procedure, show matched OISD / Factories Act / PESO clauses

Compliance-gap flagging: keyword/rule-based mismatch detection between procedure text and matched clause requirements

Clause drill-down to actual regulation text

Exportable compliance-gap summary (simple table/list; not a formatted audit-ready PDF for v1)

Shared/supporting

Document ingestion pipeline (admin upload of PDFs, scanned or text-native)

Structured metadata tagging (equipment tags, dates, clause references) extracted at ingestion

Time-to-answer metric, surfaced for demo purposes

Basic authentication and two roles (technician, officer) via Firebase Auth

Single-plant document corpus (one vertical, e.g. a chemical/process plant)

5.2 Explicitly out of scope for MVP (state clearly as roadmap, never imply built)

Item

Reason for deferral

Agent 3 — Knowledge Graph Agent (full equipment↔clause↔procedure graph)

Needs significantly more data modeling and infrastructure than 12 days allows; MVP's metadata tagging is the direct foundation for this later

Agent 4 — Maintenance & RCA Agent

Requires historical work-order/failure data not available

Agent 5 — Lessons-Learned Agent

Requires incident/near-miss history at organizational scale, not available

Multi-plant / multi-tenant accounts & billing

Real auth/tenant isolation and billing is its own multi-day project

Auto-syncing ingestion (watched folders/email)

Integration work with no core-value payoff in the MVP window

Offline-first mode

Significant engineering effort; "works well enough online" is sufficient for a demo

Voice-only field mode

UX polish, not core to proving the concept — only attempt if time allows in final days

Formatted, audit-submission-ready compliance PDF export

A simple table/list export proves the concept; polished export formatting is a v1.1 item



7. Product Architecture Overview

6.1 Tech stack

Layer

Technology

Rationale

Frontend (web + mobile)

Flutter

Single codebase covers both technician-mobile and officer-web use cases

Backend API

FastAPI (Python)

Lightweight, async-friendly, integrates cleanly with the Python AI/ML pipeline

Auth

Firebase Auth

Fast to implement, handles role-based access (technician/officer/admin) out of the box

Database

Firestore

Document metadata, user data, query logs, compliance-flag records

Agent orchestration

LangChain or Agno (decision pending)

Framework-agnostic at the product level; final choice should be locked before Track B build days begin

Embeddings

BGE (BAAI) or Nomic Embed

Free, open-weight, runs locally, no API cost

Vector store

ChromaDB

Embedded, no server setup, fits the 12-day timeline

LLM inference

Quantized (Q4) 7–8B open-weight model (Qwen2.5-7B-Instruct or Llama-3.1-8B-Instruct) via Ollama/llama.cpp

Fits 6–8GB GPU budget, zero API cost, runs fully local

Document parsing

PyMuPDF/pdfplumber (text-native) + Tesseract/EasyOCR (scanned)

Covers both real-world document types in the corpus

6.2 High-level data flow

Admin uploads a document (PDF) via the FastAPI backend.

Parsing layer extracts text (OCR if scanned) and structured metadata (equipment tags, dates, clause references).

Text is chunked (structure-aware, not naive fixed-token) and embedded.

Embeddings stored in ChromaDB with metadata for filtering.

User query (from Flutter app) hits FastAPI → retrieval (hybrid: vector + keyword) → optional reranking → grounded generation via the local LLM → response with citation + confidence score returned to the client.

Query/response pair logged to Firestore.

For Compliance Agent: a procedure document's extracted keywords/entities are matched against a curated set of OISD/Factories Act/PESO clauses (rule-based mapping table maintained separately from the general document corpus); mismatches are flagged and surfaced in the officer-facing UI.

6.3 Roles & permissions (MVP)

Role

Permissions

Technician

Ask questions via Knowledge Copilot; view own query history

Safety Officer

All technician permissions + access to Compliance Agent, clause drill-down, export

Admin

All officer permissions + document upload/management



8. Functional Requirements (by agent)

7.1 Agent 1 — Knowledge Copilot

ID

Requirement

KC-1

User can submit a natural-language question via text (voice input optional/stretch)

KC-2

System retrieves relevant document chunks via hybrid (vector + keyword) search

KC-3

System generates an answer grounded only in retrieved chunks — no answer without supporting context

KC-4

Every answer displays the source document name and section/page

KC-5

Every answer displays a confidence indicator (high/medium/low), derived from retrieval similarity score

KC-6

If no relevant chunks are found above a similarity threshold, system returns an explicit "no answer found" message with a suggestion to escalate to a supervisor

KC-7

All questions and answers are logged with timestamp and user ID

KC-8

Interface is usable on a mobile screen with minimal typing (large touch targets, short input field)

7.2 Agent 2 — Compliance Agent

ID

Requirement

CA-1

Officer can select a procedure document from the corpus

CA-2

System displays OISD / Factories Act / PESO clauses matched to that procedure (via keyword/entity match against a maintained clause-reference table)

CA-3

System flags any matched clause whose requirement does not appear addressed in the procedure text

CA-4

Officer can click into a flagged clause to view the actual regulation text

CA-5

System never asserts final legal compliance — UI copy must always include a human-verification disclaimer

CA-6

Officer can export a summary list of flagged gaps for a selected document or document set

7.3 Shared

ID

Requirement

SH-1

Admin can upload PDF documents (text-native or scanned)

SH-2

System extracts and displays structured metadata (equipment tags, dates, clause references) per document

SH-3

System can display a time-to-answer metric comparing manual search estimate vs. actual agent response time

SH-4

Users authenticate via Firebase Auth; role is enforced on both frontend and backend



9. Non-Functional Requirements

Category

Requirement

Performance

Answer generation should return within a few seconds on the target 6–8GB GPU setup; acceptable to be slower in the very first demo build, but should not exceed ~15–20 seconds for a usable demo experience

Reliability

No hallucinated answers — the "no answer found" fallback (KC-6) is a hard requirement, not optional polish

Security

No hardcoded credentials; Firebase Auth handles user identity; document access respects role permissions

Privacy

No document content leaves the local/self-hosted environment — this is a selling point (data sovereignty) as well as a technical requirement given the local-LLM architecture

Cost

Zero paid API dependency for the MVP — embeddings, vector store, and LLM inference must all run on free/open-source tooling

Auditability

All queries and compliance flags must be logged with timestamps for later review

Accessibility

Mobile UI must be usable with gloves-on / low-precision touch in mind (large touch targets) — informed by the field-technician persona, not a formal WCAG audit for v1



10. User Workflows

9.1 Technician workflow

Open app (Flutter mobile) → authenticate via Firebase.

Land on a simple chat/search interface.

Type or speak a question.

Receive: short direct answer, source citation, confidence indicator.

If no match found: receive explicit fallback message, told to escalate.

Query automatically logged.

9.2 Safety officer workflow

Log in via web (Flutter web) or mobile.

Navigate to Compliance Agent section.

Select a procedure document from the corpus.

View matched clauses and flagged gaps.

Click into a flagged clause to view source regulation text.

Export a summary list of flags for the selected document(s).

9.3 Admin workflow (minimal, MVP)

Log in with admin role.

Upload PDF documents to the corpus.

View extracted metadata tags per document (confirm ingestion succeeded).



11. Competitive Positioning

This section synthesizes a comparative analysis of 15 competitor platforms (VSight Nova, Bear Creek AI/knowledgeXpert, Machine Pilot AI, Sitara AI Copilot/Dovient, ComplyChip AI, Augmentir, C3 AI Reliability, IBM Maximo AI Assistant, Microsoft Copilot for Field Service, Siemens Industrial Copilot, SAP Joule, AVEVA CONNECT AI Assistant, Hexagon ALI, IFS.ai, eQube AI) against FaktriIQ's product standards. It exists to keep positioning consistent across the pitch deck, landing page, and demo script — any claim of differentiation made externally should trace back to a row in this section.

11.1 The core finding

Across all 15 competitors analyzed, not one has documented support for Indian statutory frameworks (OISD, Factories Act 1948, PESO). This includes major enterprise incumbents — IBM, Microsoft, SAP, Siemens, AVEVA — not just smaller point-solution vendors. This is not an assumption; it is a consistent, unanimous finding across every dossier reviewed. It is the single clearest, most defensible market gap available to this product.

11.2 Capability gap matrix — what the market is missing

Capability

Competitors with confirmed support

What this means for FaktriIQ

Compliance gap detection (regulation-to-SOP delta)

None (0 of 15)

This is FaktriIQ's sharpest differentiator — even the most sophisticated competitors (Sitara's "MissingDots" verification) check factual grounding, not regulatory correctness against actual clause text

Automatic clause mapping

None (0 of 15)

No competitor maps a procedure to the specific regulatory clause that governs it

Clause drill-down to source regulation text

None (0 of 15)

No competitor lets a user click through to the actual external regulation — they cite internal documents only

Confidence score on answers

Only 1 of 15 (Sitara, partial)

Near-unique; should be marketed as a trust feature, not just technical hygiene

Honest "no answer found" fallback

None confirmed (0 of 15)

Every dossier reports "no public evidence" — this is a category-wide trust gap, not just a FaktriIQ feature

Mobile-first design, done well

Inconsistent — strong: VSight (9/10), Augmentir; weak: Bear Creek (2/10), Machine Pilot (2/10), Sitara (3/10)

Being consistently good at mobile — not just "has an app" — differentiates against roughly half the field

Non-enterprise-only pricing

None (0 of 15 — all "Enterprise pricing only" or quote-based)

No competitor serves a mid-size Indian plant without a six-figure procurement budget — a genuine market-access gap

Offline support

2 of 15 (Augmentir; ComplyChip trivially, as hardware)

Rare enough to be worth roadmap attention post-MVP

11.3 How FaktriIQ is positioned to win

Lead with the Compliance Agent, not the Knowledge Copilot. Every competitor markets itself primarily as a search/chat copilot, with compliance (if present at all) as a secondary bullet. FaktriIQ inverts this: the Compliance Agent is the headline capability in all external-facing materials (pitch deck, landing page, demo script), because it is the one capability class that is completely absent from the analyzed market — not just under-served.

Market the honesty features explicitly, not just implement them quietly. The confidence score and the "no answer found" fallback are cheap to build (already MVP scope, Section 6.1) and rare to claim publicly. Copy across all materials should state this directly: FaktriIQ tells you when it doesn't know, and shows you how confident it is when it does — a claim no competitor dossier supports making.

Protect the clause drill-down feature even under time pressure. If the 12-day build faces a scope cut, this feature should be one of the last things sacrificed — it is functionally unique across the entire 15-competitor set and is FaktriIQ's single most defensible claim.

Make mobile-first actually excellent, not just present. Since roughly half the competitor set scores 2–3/10 on mobile experience despite otherwise-strong products (Sitara: 9/10 architecture but 3/10 mobile), the Flutter-based single-codebase approach should be validated to feel genuinely field-usable in the technician workflow demo — not merely responsive.

Note pricing accessibility as a stated future intent, not an MVP deliverable. FaktriIQ does not need to solve pricing during the 12-day build, but pitch materials should note the intent to serve mid-size Indian industrial operators directly, rather than being enterprise-quote-only like all 15 analyzed competitors — this is an easily understood market-gap argument for judges.

11.4 What this does NOT change

This analysis does not expand MVP scope (Section 6.1) or contradict the two-agent focus. It sharpens emphasis and framing of the same two agents already scoped — particularly reordering which agent leads in external communication — rather than adding new build work.



12. Success Metrics (for the MVP demo, not production KPIs)

Metric

Target for demo credibility

Query answer quality

Correct, cited answer on a majority of a curated 20–30 question evaluation set

Time-to-answer

Clear, visible speed advantage vs. manual document search in the live demo

Hallucination rate

Zero confidently-wrong answers in the evaluation set — fallback triggers instead

Compliance flag accuracy

Flags should be manually verifiable as correct against the actual clause text for the curated demo document set

Deliverables completed

All four (prototype, architecture diagram, deck, demo video) shipped on time



13. Data Model (high-level, Firestore collections)

Collection

Key fields

users

uid, role (technician/officer/admin), name, plant_id

documents

doc_id, filename, upload_date, doc_type, extracted_metadata (equipment_tags[], dates[], clause_refs[])

queries

query_id, uid, question_text, answer_text, source_doc_id, confidence_score, timestamp

compliance_flags

flag_id, doc_id, matched_clause_id, flag_status (ok/gap), reviewed_by, timestamp

clause_reference

clause_id, source (OISD/Factories Act/PESO), clause_text, keywords[]

Note: raw document text and embeddings live in the vector store (ChromaDB), not Firestore — Firestore holds metadata and application state only.





14. Risks & Mitigations

Risk

Mitigation

Retrieval quality is poor on messy/scanned PDFs

Prioritize hybrid search + reranking early (Track A); keep the demo corpus curated and realistic rather than maximally messy

LLM inference too slow on 6–8GB GPU for a live demo

Pre-warm the model before the demo; have a pre-recorded fallback for the video deliverable regardless

Compliance-mapping logic is too simplistic to be credible

Keep it explicitly rule-based and framed honestly as v1; depth on 2–3 real, correctly cited clauses beats breadth across many

Team runs out of time before non-code deliverables (diagram, deck, video)

Budget these into the day-by-day plan explicitly, not left to the final day

Scope creep into Agents 3–5

This document is the enforcement mechanism — any deviation from Section 6.1 must be a conscious, discussed decision, not a drift



15. Legal & Compliance Disclaimer (must propagate to all user-facing surfaces)

FaktriIQ's Compliance Agent surfaces regulatory information and flags potential gaps for human review. It does not provide legal advice, does not guarantee regulatory compliance, and does not replace a qualified safety officer's judgment or a formal compliance audit. This disclaimer must appear in-app wherever compliance flags are shown, and should be referenced (not necessarily verbatim) on the landing page's trust section.



16. Relationship to Other Project Documents

Document

Relationship to this PRD

Landing Page PRD (FaktriIQ_Landing_Page_PRD.md)

Derived from Sections 1, 3 (Project Brief), 5, 6.1/6.2, 11, and 15 of this document — marketing framing only, must not contradict scope. Agent emphasis/ordering (Compliance Agent leading) must match Section 11.3

Research & Learning Plan PDF

Informs Section 7 (tech choices) and the day-by-day build sequencing

Day-by-day build plan (not yet created)

Should sequence the Section 8 functional requirements against the team's three learning tracks

Architecture diagram (not yet created)

Should visualize Section 7.2's data flow directly

Presentation deck (not yet created)

Should draw problem framing from Sections 2–3 (Problem Statement / Project Brief), scope honesty from Section 6, competitive differentiation from Section 11, and metrics from Section 12



17. Glossary

RAG (Retrieval-Augmented Generation): an AI technique where a model's answer is generated using retrieved document chunks as grounding context, rather than relying solely on what the model memorized during training.

Embedding: a numerical representation of text that captures semantic meaning, used to find similar content via vector search.

Hybrid search: combining keyword-based search with vector similarity search to catch both exact-match terms (e.g., clause numbers) and semantically related content.

Quantization: reducing a model's numerical precision to shrink its memory footprint, enabling large models to run on smaller GPUs.

OISD: Oil Industry Safety Directorate — India's safety standards body for the oil and gas sector.

PESO: Petroleum and Explosives Safety Organisation — India's regulatory body for explosives, petroleum, and compressed gases.



18. Open Decisions (to be closed before or during the build)

LangChain vs. Agno for agent orchestration — final call needed before Track B begins.

Final product/agent names (currently placeholders: "FaktriIQ," "The Knowledge Copilot," "The Compliance Agent").

Which specific vertical and document set to use for the MVP demo corpus (e.g., a specific chemical/process plant profile).

Whether voice input for the Knowledge Copilot is attempted as a stretch goal or deferred entirely.

