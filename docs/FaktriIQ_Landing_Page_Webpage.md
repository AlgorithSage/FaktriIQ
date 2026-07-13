# website_landing_page_spec.md — React + Vite + Vanilla CSS

This document outlines the technical specification, design system integration, and component structure for building the **FaktriIQ Landing Page Website** in **React, Vite, and Vanilla CSS** for deployment on **Vercel**. 

The design takes direct inspiration from the quiet, credible, and trustworthy enterprise aesthetic defined in the [FaktriIQ UI/UX Design System (v2)](file:///c:/Users/USER/Desktop/FaktriIQ/docs/FaktriIQ_Design_System.md).

---

## 🎨 1. Design Tokens & CSS Variables

Create a root CSS file (e.g., `src/index.css`) containing the following variables to establish the Volt & Carbon v2 design theme:

```css
:root {
  /* Color Palette (Volt & Carbon v2 - Industrial Enterprise) */
  --color-ink: #0F172A;          /* Primary text, nav chrome, buttons */
  --color-slate: #1E293B;        /* Header bars, sidebars, secondary panels */
  --color-surface: #FFFFFF;      /* Default page background */
  --color-subtle: #F8FAFC;       /* Secondary background for card separation */
  --color-border: #E2E8F0;       /* Hairline borders, dividers */
  --color-muted: #64748B;        /* Metadata, disabled, quiet text */
  --color-accent: #CA8A04;       /* Brand gold — links, active states, focus */
  --color-accent-light: #FEF9C3; /* Pale yellow wash for highlighted cards/hover */
  --color-accent-mid: #FDE68A;   /* Badges, tags, progress bars */
  --color-flag: #DC2626;         /* Compliance gap flags, critical alerts */
  --color-verify: #16A34A;       /* Compliant / success status */
  --color-warn: #D97706;         /* Medium-confidence / advisory states */

  /* Typography */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'IBM Plex Mono', 'JetBrains Mono', monospace;

  /* Spacing Grid (8px base) */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-6: 48px;
  --space-8: 64px;

  /* Shape & Shadow */
  --radius-default: 8px;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.05);
}

/* Global Reset overrides */
body {
  margin: 0;
  font-family: var(--font-primary);
  background-color: var(--color-surface);
  color: var(--color-ink);
  -webkit-font-smoothing: antialiased;
}
```

---

## 🧱 2. React Component Structure

Deploy the single-page application using React (Vite) structured into the following modular components:

### 2.1 `Navbar.jsx`
* **Layout**: Full-width header, fixed to top. Minimal slate-gray top strip.
* **Left**: Branded circular monogram `F` in `var(--color-ink)` on `var(--color-accent-light)` background next to the bold "FaktriIQ" title.
* **Right**: Quick link targets (Features, Problem, Pilot Request) + a primary CTA button ("Request Pilot").
* **Behavior**: Responsive slide-down menu on mobile viewports.

### 2.2 `HeroSection.jsx`
* **Headline**: *"Catch compliance gaps before your next audit does."* (Inter Bold, large size).
* **Subheadline**: *"A unified AI asset & operations brain mapping plant procedures against Indian regulations—delivering traceable, cited answers for technicians on the floor and safety officers at their desks."*
* **CTA Buttons**: 
  * Primary: "Request a Plant Pilot" (Solid dark button with gold hover states).
  * Secondary: "Read PRD Specifications" (Bordered button).
* **Visual**: A split screen showing:
  * Left: A mock browser window demonstrating the Compliance Agent's two-pane triaging interface (document list on the left, OISD/Factories Act clause comparison on the right with a red compliance-gap flag).
  * Right: A mock mobile interface showing the Knowledge Copilot replying with a cited, source-tagged citation chip showing "High Confidence".

### 2.3 `ProblemSection.jsx`
* **Layout**: Clean 3-column grid on a `var(--color-subtle)` background.
* **Cards**:
  1. **Documentation Fragmentation**: Technicians wasting hours searching across 7–12 disconnected paper/scanned systems.
  2. **Reactive Compliance**: Discovering gaps during audits rather than continuously monitoring.
  3. **Knowledge Attrition**: Lost undocumented expertise when senior engineers retire.

### 2.4 `HowItWorks.jsx`
* **Flow**: 4 step timeline illustrating document ingestion and agent validation:
  * *Step 1*: Upload plant manuals, SOPs, and safety guidelines.
  * *Step 2*: Compliance Agent automatically extracts tags, dates, and maps them to governing Factories Act/OISD/PESO clauses.
  * *Step 3*: Knowledge Copilot parses text and prepares retrieval embeddings.
  * *Step 4*: Querying yields cited answers with source references and confidence indexes.

### 2.5 `AgentsSection.jsx`
* **Design**: Highlights the two live agents with prominent cards. The Compliance Agent is highlighted as the primary market differentiator.
* **Compliance Agent Card**: Matches plant operations to Indian standards. Displays tags for **OISD-STD-105**, **Factories Act Sec 36**, and **PESO Rules 2016**.
* **Knowledge Copilot Card**: Natural-language search with a sample trust badge (Citation Chip) showing: `SOP-TC-042 | Confined Space Sec 3.1 | High Confidence`.

### 2.6 `MeetTheRest.jsx` (Coming Soon Roadmap)
* **Design**: Muted card designs with subtle borders and clear "Coming Soon" indicators.
* **Items**:
  * *Agent 3: The Knowledge Graph Agent* (system relations).
  * *Agent 4: The Maintenance & RCA Agent* (failure logs & repair history).
  * *Agent 5: The Lessons-Learned Agent* (near-miss pattern analysis).

### 2.7 `PilotRequestForm.jsx`
* **Layout**: Centered, standard bordered card layout.
* **Form Inputs**: Name, Email, Organization/Plant Name, Role (Technician / Safety Officer / Plant Manager).
* **CTA**: "Submit Pilot Request" -> Shows a clean toast message stating *"Pilot request submitted! We will reach out to you."* (no databases/authentication needed for Vercel demo, local state handlers only).

---

## ⚡ 3. Vercel Deployment Instructions

1. **Initialize React Project**:
   ```bash
   npm create vite@latest faktriiq-landing -- --template react
   cd faktriiq-landing
   npm install
   ```
2. **Move Spec Code**: Replace the default `src/App.jsx` and `src/index.css` with the components above.
3. **Configure Vercel**: Ensure a `vercel.json` file is present in the root if custom routing is required (not needed for single-page apps).
4. **Deploy**:
   ```bash
   vercel --prod
   ```
