# FaktriIQ 🏭💡

**FaktriIQ** is an Industrial Knowledge Intelligence Platform (Full-Stack SaaS) designed to serve as a Unified Asset & Operations Brain for industrial plants (Oil & Gas, Chemical, Pharma, and Process Manufacturing).

Built for technicians on the shop floor and safety officers at their desks, FaktriIQ provides mobile-first, natural-language AI agents that unify fragmented documentation systems and ensure proactive compliance with Indian statutory standards.

---

## 🚀 Key Features

### 👮‍♂️ Agent 1: The Compliance Agent
* **Clause-Mapping Lookup**: Automatically matches plant procedures to governing Indian regulations (**Factories Act 1948**, **OISD**, and **PESO** standards).
* **Compliance-Gap Flagging**: Identifies and flags gaps where plant procedures do not address statutory requirements.
* **Clause Drill-Down**: Deep-dive into specific regulatory text with human-in-the-loop validation.
* **Compliance Export**: Export summary lists of flagged gaps for audit preparation.

### 🧭 Agent 2: The Knowledge Copilot
* **Natural-Language Q&A**: Ask plain-language questions across the plant's operating manuals, SOPs, and maintenance records.
* **Verifiable Citations**: Every answer includes the exact source document, chapter, and section.
* **Confidence Indicators**: Shows match confidence (High/Medium/Low) for transparency.
* **Zero Hallucination Fallback**: Strictly responds with *"I don't know"* instead of generating fake answers if no relevant documents are found.

### 🌐 Integrated Landing Page
* A responsive, high-fidelity landing page with theme switching (Volt & Carbon / Light Mode).
* Built-in pilot request form to capture user interest directly from the web app.

---

## 🛠️ Technology Stack & Design System

* **Framework**: Flutter (Dart) — one codebase for Web, Android, iOS, and Desktop.
* **Styling & UI**: Custom premium visual theme using the **Volt & Carbon** color palette.
* **Typography**: Beautiful custom typefaces:
  * **Satoshi**: Modern sans-serif for reading logs, content, and dashboard items.
  * **Striper**: Industrial-themed display font for titles and branding.
* **Component Library**: Enhanced with `getwidget` components.

---

## 📦 Getting Started

### Prerequisites
Ensure you have the Flutter SDK installed on your machine. You can verify this by running:
```bash
flutter --version
```

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/AlgorithSage/FaktriIQ.git
   cd FaktriIQ
   ```

2. Fetch the Flutter dependencies:
   ```bash
   flutter pub get
   ```

3. Run the application:
   * **For Web (Chrome)**:
     ```bash
     flutter run -d chrome
     ```
   * **For Mobile / Emulator**:
     ```bash
     flutter run
     ```

---

## 👥 Authors
* **Team AlgoZeniths** — IEM Kolkata
  * Archisman "Zenith" Chakraborty and Team
