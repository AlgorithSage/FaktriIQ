# Product Requirements Document — Landing Page
## Industrial Knowledge Intelligence Copilot (product name: "FaktriIQ")

**Purpose of this document:** This PRD is written to be handed directly to an AI website-builder (Claude Fable 5) to generate a landing page. It defines the product, the exact set of AI agents to represent (available now vs. coming soon), the narrative structure, tone, and constraints the landing page must follow. Everything stated here as "Available Now" must be presented as real and working. Everything stated as "Coming Soon" must be visually and textually distinguished as future roadmap — never implied to exist today.

---

## 1. Product Summary

**One-line description:** A mobile-first AI platform that gives plant technicians and safety officers a team of specialized AI agents — starting with an agent that answers plain-language questions from equipment manuals and regulations with cited sources, and an agent that flags compliance gaps against Indian regulatory standards (Factories Act 1948, OISD, PESO).

**Category:** Industrial Knowledge Intelligence / Enterprise AI for asset-intensive industries (oil & gas, chemical, pharma, process manufacturing).

**Product framing:** The product is presented to users as a **suite of AI agents**, each with a clear job. This is more intuitive for a non-technical user than a flat feature list, and it gives the product a natural growth story — new agents get added over time, without needing to re-explain the whole product.

**Target users (two personas — the landing page must speak to both, in this order of emphasis):**
1. **Field technician** — on the shop floor, needs fast answers on a phone, minimal typing, cares about "what do I do right now."
2. **EHS / Safety officer** — desk-based, cares about audit readiness, prepares for inspections, wants visibility into compliance gaps before an inspector finds them.

**Tertiary audience for the landing page (even though not a product persona):** hackathon/competition judges and potential pilot-customer plant managers evaluating credibility. The page must read as a real, scoped product — not a hackathon toy and not vaporware.

---

## 2. Tech Stack (for context — not shown on the landing page, but informs what claims are credible)

| Layer | Technology | Notes |
|---|---|---|
| Frontend (web + mobile) | Flutter | Single codebase for web and mobile app — landing page copy can truthfully say "available on web and mobile" once shipped |
| Backend API | FastAPI (Python) | Serves the agent orchestration layer and compliance logic |
| Auth & Database | Firebase Auth + Firestore | Handles user accounts, roles (technician/officer), and document metadata storage |
| Agent orchestration | LangChain or Agno (final choice pending) | Framework-agnostic on the landing page — describe agents by capability, never by framework name |
| AI/ML pipeline | Python (embeddings, retrieval, LLM inference) | Local quantized LLM + open embedding models |

This stack does not change the agent scope in Sections 4–5 below — it only determines *how* those are built. The landing page should never mention framework/library names (Flutter, FastAPI, Firebase, LangChain, etc.) — that's implementation detail, not user-facing value. Keep the page focused on what the agents *do*.

---

## 3. The Problem (use this for the landing page's problem/hero section)

Plants run on documentation scattered across 7–12 disconnected systems — engineering drawings in one place, maintenance logs in another, safety procedures in a third, regulatory filings in email archives. Three consequences:

1. **Technicians waste time and risk safety.** Workers spend a large share of their working hours searching for information instead of acting on it — sometimes making decisions without the right procedure in front of them.
2. **Compliance is reactive, not proactive.** Safety officers typically discover gaps between plant procedures and regulatory requirements (Factories Act, OISD, PESO) during an audit — after the fact, not before.
3. **Institutional knowledge disappears.** As experienced engineers retire, undocumented know-how leaves with them, and it isn't recoverable.

**The product's promise:** turn "where do I find this" into "just ask" — with every answer backed by a citation you can verify, not a guess you have to trust blindly, delivered by a growing team of purpose-built agents rather than one generic chatbot.

---

## 4. Agents — Available Now (build and present as real, working today)

Present each as a distinct "agent" with its own name, a one-line job description, and its capabilities listed underneath. This is the core of the features section on the landing page.

**Ordering note:** The Compliance Agent is presented first (Agent 1) and given primary visual emphasis (larger card, first in scroll order, featured in the hero visual alongside the Knowledge Copilot). This is a deliberate positioning decision, not arbitrary: competitive analysis across 15 industrial AI platforms found that automated regulatory compliance gap detection against Indian statutory frameworks (OISD, Factories Act, PESO) is not offered by any of them — this is FaktriIQ's sharpest, most defensible market differentiator, while document Q&A/RAG copilots are comparatively common in the category. Lead with what's rare.

### Agent 1: The Compliance Agent
**Job in one line:** *Checks your procedures against real Indian regulations and flags what's missing — before an inspector does.*

Capabilities:
1. **Clause-mapping lookup** — For any selected procedure, see which OISD / Factories Act / PESO clauses govern it.
2. **Compliance-gap flagging** — Flags when a procedure's text doesn't appear to address a matched regulatory requirement.
3. **Clause drill-down** — Officers can click through to the actual regulation text to verify manually. The agent surfaces information; a human always makes the final call — this is stated explicitly on the landing page as a trust/legal-safety point.
4. **Compliance summary export** — A simple exportable list of flagged gaps for a selected set of documents.

### Agent 2: The Knowledge Copilot
**Job in one line:** *Answers your questions from your plant's own documents — and shows you exactly where the answer came from.*

Capabilities:
5. **Ask-anything document search** — Natural-language Q&A over the plant's own manuals, SOPs, and regulatory text. Landing page framing: *"Stop searching. Start asking."*
6. **Cited answers, every time** — Every answer shows the exact source document and section it came from. Landing page framing: *"Every answer, traceable. Nothing invented."*
7. **Confidence indicator** — Each answer shows a match-confidence signal (high/medium/low) so users know how much to trust it before acting. Landing page framing: this is rare in the category — most competitor platforms show no public evidence of surfacing a confidence score at all.
8. **Honest "no answer found"** — If nothing relevant exists in the documents, the agent says so clearly instead of guessing. Landing page framing: *"If it doesn't know, it says so — not something you can say about a generic chatbot near hazardous equipment."*
9. **Mobile-first, built for the floor** — Large touch targets, minimal typing, usable one-handed. Not a desktop tool with a mobile afterthought.
10. **Automatic query logging** — Every question and answer is logged, doubling as an audit trail.

### Supporting capabilities (shared across both agents, not a separate agent)
11. **Structured document tagging** — Equipment tags, dates, and clause references are automatically extracted and shown as metadata on each document.
12. **Time-to-answer comparison** — A visible "manual search vs. agent" time comparison, used as a proof point on the landing page (e.g., "minutes → seconds").

---

## 5. Agents — Coming Soon (must be visually distinct, never implied as available)

Present these as upcoming teammates joining the agent suite — a separate, clearly-labeled "Meet the rest of the team (Coming Soon)" section, with a "Coming Soon" badge/pill and muted visual treatment on each card, so there is no ambiguity about what exists today.

### Agent 3 (Coming Soon): The Knowledge Graph Agent
**Job in one line:** *Maps how your equipment, procedures, and regulations connect — so one search surfaces everything related.*
Builds a full relationship graph (equipment ↔ clause ↔ procedure) on top of the metadata the Knowledge Copilot already tags today.

### Agent 4 (Coming Soon): The Maintenance & RCA Agent
**Job in one line:** *Looks at work-order history and failure records to recommend maintenance actions and support root-cause analysis.*

### Agent 5 (Coming Soon): The Lessons-Learned Agent
**Job in one line:** *Spots patterns across incident reports and near-misses that no single person would catch, and warns teams before similar conditions recur.*

### Platform capabilities (Coming Soon, not agent-specific)
- **Multi-plant / multi-tenant accounts** — Organization-level accounts, roles, and billing for managing more than one facility.
- **Auto-syncing ingestion** — Watched folders/email integration so new documents are ingested without manual upload.
- **Offline-first mode** — Full functionality without a live connection, for technicians in low-connectivity plant areas.

---

## 6. Landing Page Structure (section-by-section brief)

1. **Hero section**
   - Headline: benefit-led, plain language (not jargon-heavy). Example direction: *"Every answer your plant already knows — just ask. Every gap your next audit would find — flagged today."*
   - Subheadline: one sentence naming the two personas and introducing the "team of agents" framing, leading with compliance.
   - Primary CTA: "See it in action" / "Request a pilot" (this is a pre-launch/demo product — do NOT use a self-serve "Sign up free" CTA; this is enterprise/pilot-oriented).
   - Visual: should feature the Compliance Agent's clause-flagging view as the primary/first visual moment, with the Knowledge Copilot's cited chat answer as a secondary supporting visual (e.g., a second phone mockup or a tab). Compliance is the differentiator — it should be seen first, not discovered on scroll.

2. **Problem section**
   - 3 short problem statements (documentation fragmentation, reactive compliance, knowledge loss) pulled from Section 3 above. Do not fabricate statistics beyond what's stated in this PRD.

3. **How it works (3–4 step visual flow)**
   - Step 1: Upload your plant's documents
   - Step 2: The Compliance Agent maps them against OISD, Factories Act, and PESO clauses and flags gaps automatically
   - Step 3: Ask the Knowledge Copilot a question in plain language, anytime
   - Step 4: Get a cited, confidence-scored answer — every time, from either agent

4. **Meet the agents — Available Now**
   - Two agent cards (Compliance Agent first, Knowledge Copilot second) from Section 4, each with its one-line job description as the card headline and the capability list underneath as short bullets, not paragraphs. The Compliance Agent card should be visually first and may be given more prominence (e.g., larger card or featured position) given it is the primary market differentiator.

5. **Meet the rest of the team — Coming Soon**
   - Three agent cards (Knowledge Graph Agent, Maintenance & RCA Agent, Lessons-Learned Agent) from Section 5, visually distinct treatment (muted, "Coming Soon" badge). Frame positively as "the team is growing," not as missing functionality.

6. **Trust / credibility section**
   - Points to include: built on real, publicly available Indian regulatory sources (Factories Act 1948, OISD standards, PESO rules); answers are always source-cited; human verification is always the final step for compliance decisions — the agents never claim legal authority.

7. **Who it's for section**
   - Two persona cards: Field Technician / Safety & Compliance Officer, each with 2–3 bullet benefits specific to that role, framed as "which agents help you."

8. **CTA / closing section**
   - Restate the core promise briefly. CTA: "Request a pilot" or "Talk to us" with a simple contact form (name, plant/organization, role, email) — no payment or account-creation flow, since this is a pre-launch pilot-stage product.

9. **Footer**
   - Product name, one-line tagline, contact, and (if applicable) team/college affiliation line.

---

## 7. Tone & Copy Guidelines

- Plain, confident, non-hypey language. Avoid AI-marketing clichés ("revolutionary," "game-changing," "next-generation," "seamless").
- Every claim about capability must map to something in Section 4 (Available Now). Do not let copy imply Section 5 (Coming Soon) agents are live.
- Write for a plant safety officer or technician reading quickly on a phone — short sentences, concrete nouns (not "leverage synergistic intelligence," say "ask a question, get an answer with the source").
- The "agent" framing should feel like introducing team members, not listing software modules — e.g., "The Knowledge Copilot has your back on the floor" rather than "Module 1: Document Retrieval System."
- It's acceptable and encouraged to be explicit about scope: a short line like *"Two agents live today. More joining the team soon — built for one plant at a time, done right."* signals credibility rather than weakness.

---

## 8. Visual / Design Direction

Full design tokens, dark mode rules, and screen-level detail live in `FaktriIQ_Design_System.md` — this section is the landing-page-specific application of that system, not a separate palette.

- The landing page itself must be responsive with a mobile-first layout frame, reflecting the product's own design principle — this is a build requirement on the marketing site, not just the in-app product.
- **Yellow (`volt`, `#FEE715`) is the dominant color on this page** — full-bleed background across the navbar, hero, and features section, not used as a small accent. `carbon` (`#101820`) carries all text, the primary button fill, icon chips, and the footer bar. This is a deliberate, bold, poster-like treatment, not a muted enterprise-B2B look — yellow-and-black is the color language of hazard signage and floor-marking tape, turned up loud on purpose (see Design System Section 1).
- Structure stays clean and minimal even though the color is bold: a real functional navbar, a plain asymmetric grid (not a centered/symmetric template layout), generous whitespace, no gradients, no glow, no floating 3D elements, no futuristic abstract shapes. The boldness is spent entirely on color, not on visual effects.
- The hero's product visual is a dark (`carbon`) panel showing an actual sample Compliance Agent output — a flagged gap and an addressed clause, both with real-looking clause references — rather than an abstract graphic. This is the single most important visual on the page, since it makes the compliance-gap-flagging differentiator tangible instead of abstract, and it should visually anchor the primary agent (Compliance Agent leads per Section 4).
- Buttons are fully rounded pills in `carbon` fill with `volt` or white text, matching the Design System's shape language exactly.
- Each agent card (Available Now or Coming Soon) can have a simple `carbon`-chip icon mark to reinforce the "team" framing without needing illustrated characters.
- Coming Soon cards should use a visibly muted treatment (e.g., a lighter/desaturated version of the section background, or a `carbon`-on-`volt` outline-only card) with a small "Coming Soon" pill badge — clearly different from the solid, confident treatment of the Available Now agent cards.
- Dark mode, if implemented for this page, follows the Design System's token-flip rule exactly (Section 2.1.1): `volt` never changes hex, `carbon` becomes the page background, and buttons flip fill/text pairing.

---

## 9. Explicit Constraints for the Page Build

- No login/signup flow — this is a pre-launch landing page with a pilot-request contact form only.
- No pricing section — pricing model is not finalized; do not fabricate pricing tiers.
- No fabricated customer logos, testimonials, or usage statistics — this is a pre-launch product. If social proof is needed, use a "Built for Indian industrial plants" credibility line instead of fake testimonials.
- No claims of legal compliance authority — any compliance-related copy must include or imply human verification as the final step.
- No framework/tech-stack names anywhere in user-facing copy (Flutter, FastAPI, Firebase, LangChain, Agno, etc.) — Section 2 is internal context only.
- Single-page layout is sufficient for this stage — no need for multiple routed pages.

---

## 10. Sample Section Copy (starting point — Fable 5 may refine, but should not contradict scope)

**Hero:**
> Catch compliance gaps before your next audit does.
> A growing team of AI agents for safety officers and technicians: automatic OISD, Factories Act, and PESO gap-flagging, plus instant, cited answers from your own manuals and regulations.

**Problem section intro:**
> Your plant's knowledge already exists. It's just scattered across a dozen systems, and nobody has time to dig for it — until something goes wrong.

**Available Now intro:**
> Meet the agents on the job today.

**Coming Soon intro:**
> The team is growing.

**Closing CTA:**
> Built for one plant at a time, done right. Request a pilot to see it work on your own documents.

---

## 11. Summary Table for Quick Reference

| Agent | Status | Capabilities listed |
|---|---|---|
| Agent 1 — Compliance Agent | Available Now | 4 |
| Agent 2 — Knowledge Copilot | Available Now | 6 |
| Shared supporting capabilities | Available Now | 2 |
| Agent 3 — Knowledge Graph Agent | Coming Soon | — |
| Agent 4 — Maintenance & RCA Agent | Coming Soon | — |
| Agent 5 — Lessons-Learned Agent | Coming Soon | — |
| Platform capabilities (multi-tenant, auto-sync, offline) | Coming Soon | 3 |

**Total agents live today: 2 (12 combined capabilities)**
**Total agents/capabilities coming soon: 3 agents + 3 platform capabilities**