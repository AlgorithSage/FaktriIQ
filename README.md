# FaktriIQ 🏭💡

**FaktriIQ** is an Industrial Knowledge Intelligence Platform designed to serve as a Unified Asset & Operations Brain for industrial plants (Oil & Gas, Chemical, Pharma, and Process Manufacturing).

Built for technicians on the shop floor and safety officers at their desks, FaktriIQ provides a mobile-first, natural-language AI interface that unifies fragmented documentation systems and ensures proactive compliance with Indian statutory standards (Factories Act 1948, OISD, PESO).

---

## 🚀 Key Roles & Features

### 🧭 1. Field Technician (Knowledge Copilot)
* **Natural-Language Q&A**: Ask plain-language questions across the plant's operating manuals, safety SOPs, and maintenance records.
* **Verifiable Citations**: Every answer includes the exact source document, chapter, and section.
* **Confidence Indicators**: Shows match confidence (High/Medium/Low) for transparency.
* **Zero Hallucination Fallback**: Strictly responds with *"I don't know"* instead of generating fake/unsupported answers if no relevant documents are found.
* **Context Suggestions**: Offers quick suggestion chips for common plant queries.

### 👮‍♂️ 2. Compliance Agent (Safety Officer Station)
* **Clause-Mapping Lookup**: Automatically matches plant procedures to governing Indian regulations (**Factories Act 1948**, **OISD**, and **PESO** standards).
* **Compliance-Gap Flagging**: Identifies and flags gaps where plant procedures do not address statutory requirements.
* **Clause Drill-Down**: Deep-dive into specific regulatory text with human-in-the-loop validation.
* **Compliance Export**: View and track summary lists of flagged gaps for audit preparation.
* **Document Ingestion**: View ingested manuals, SOPs, and safety guidelines with metadata tags (equipment tags, dates, and clause references).

---

## 🛠️ Technology Stack & Design System

* **Framework**: Flutter (Dart) — cross-platform support for Web and Mobile.
* **Styling & UI**: Custom premium visual theme using the **Volt & Carbon** color palette (High-contrast industrial design).
* **Typography**: Beautiful custom typefaces:
  * **Satoshi**: Modern sans-serif for reading logs, content, and dashboard items.
  * **Striper**: Industrial-themed display font for titles and branding.
* **Component Library**: Enhanced with `getwidget` components.

---

## 📲 Download the Android App

The production-ready Android APK can be downloaded directly from our official landing page:

* **[FaktriIQ Landing Page](https://faktriiq.com)** (Visit the website to view the app UI screenshots, details, and click the **Download APK** button)

*Prerequisites for Mobile Installation:*
* Android 8.0 (Oreo) or higher.
* Enable "Install from Unknown Sources" in your device's settings to install the APK package.

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
   * **For Mobile / Emulator / Desktop**:
     ```bash
     flutter run
     ```

---

## 👥 Authors
* **Team AlgoZeniths**
