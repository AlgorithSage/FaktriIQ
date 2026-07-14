# website_landing_page_spec.md — React + Vite + Tailwind CSS + shadcn/ui

This document outlines the technical specification, design system integration, and component structure for building the **FaktriIQ Landing Page Website** using **React (Vite), Tailwind CSS, and shadcn/ui** for deployment on **Vercel**.

The design is driven by a high-credibility, industrial enterprise aesthetic using the **Volt & Carbon v2** color palette defined below.

---

## 🎨 1. Design System & Tailwind Configuration

### 1.1 Tailwind Theme Extension (`tailwind.config.js`)
Extend the default Tailwind theme to include the custom industrial color palette, fonts, and animation tokens:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        industrial: {
          ink: "#0F172A",          // Primary text, nav chrome, buttons
          slate: "#1E293B",        // Header bars, sidebars, secondary panels
          surface: "#FFFFFF",      // Default page background
          subtle: "#F8FAFC",       // Secondary background for card separation
          border: "#E2E8F0",       // Hairline borders, dividers
          muted: "#64748B",        // Metadata, disabled, quiet text
          accent: "#CA8A04",       // Brand gold — links, active states, focus
          "accent-light": "#FEF9C3", // Pale yellow wash for highlighted cards/hover
          "accent-mid": "#FDE68A",   // Badges, tags, progress bars
          flag: "#DC2626",         // Compliance gap flags, critical alerts
          verify: "#16A34A",       // Compliant / success status
          warn: "#D97706",         // Medium-confidence / advisory states
        }
      },
      fontFamily: {
        primary: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["IBM Plex Mono", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 1.2 Base Tailwind Styles (`src/index.css`)
Inject Radix UI color tokens and layout defaults:

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 43.1 96% 41%; /* Volt Accent */
    --accent-foreground: 210 40% 98%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }
}

body {
  font-family: var(--font-primary);
  background-color: theme('colors.industrial.surface');
  color: theme('colors.industrial.ink');
}
```

---

## 🧱 2. React Component Structure & shadcn/ui Mapping

### 2.1 Navigation & Shell
*   **`Navbar.jsx`**
    *   *shadcn Components*: `Button`, `Sheet` (for mobile drawer).
    *   *Layout*: Full-width header, fixed to top. Industrial slate-gray top accent line.
    *   *Features*: Branded circular monogram `F` in brand gold (`bg-industrial-accent-light`) next to bold "FaktriIQ" title. Dynamic responsive link items (Features, Live Sandbox, FAQ, Pilot Request).

### 2.2 Hero & Visual Trust
*   **`HeroSection.jsx`**
    *   *shadcn Components*: `Button`, `Badge`.
    *   *Headline*: *"Catch compliance gaps before your next audit does."*
    *   *Subheadline*: *"A unified AI asset & operations brain mapping plant procedures against Indian regulations—delivering traceable, cited answers for technicians on the floor and safety officers at their desks."*
    *   *CTA*: "Request a Plant Pilot" (solid industrial-ink background with gold hover state) & "Read PRD Specifications" (outline variant).
    *   *Visual Component*: Split screen:
        *   **Left (Compliance Agent)**: Mock browser card displaying the clause comparison interface: Left pane shows standard SOP document, Right pane shows regulation rules mapping (Factories Act 1948 Sec 36 vs SOP Clause 4.1), flagged with a blinking red gap indicator (`bg-industrial-flag`).
        *   **Right (Knowledge Copilot)**: Mock mobile panel with a conversational Q&A thread and a citation badge: `[SOP-TC-042 | Confined Space Sec 3.1 | High Confidence]`.

### 2.3 Interactive Sandbox (Crucial Premium Feature)
*   **`InteractiveDemo.jsx`**
    *   *shadcn Components*: `Card`, `Tabs`, `Button`, `Badge`, `ScrollArea`.
    *   *Description*: A live, interactive widget demonstrating how the AI reasons. Users click on different scenario tabs (e.g., "Confined Space Entry", "Pressure Vessel Test", "Chemical Storage Protection").
    *   *Functionality*: Selecting a scenario triggers a simulated AI inspection pipeline showing:
        1.  **Ingested SOP Text**: Snippet of plant procedure.
        2.  **Governing Regulation Clause**: Mapped standard (e.g., *Factories Act Sec 36* or *OISD-STD-105*).
        3.  **Real-Time Assessment**: Shows green `COMPLIANT` status with verified citations, or red `COMPLIANCE GAP` warning with exact missing safeguards explained.

### 2.4 Product & Value Sections
*   **`ProblemSection.jsx`**
    *   *shadcn Components*: `Card`.
    *   *Design*: 3-column clean layout over `bg-industrial-subtle`.
    *   *Details*: Highlight the core industrial pain points:
        *   *Documentation Fragmentation*: Technicians wasting hours searching across 7–12 disconnected systems.
        *   *Reactive Compliance*: Finding critical regulatory gaps only when audit failures occur.
        *   *Knowledge Attrition*: Critical operations knowledge lost as veteran plant engineers retire.
*   **`AgentsSection.jsx`**
    *   *shadcn Components*: `Card`, `Badge`, `Tabs`.
    *   *Design*: Highlight the two core AI agents in a side-by-side comparative layout.
        *   **Compliance Agent**: Dedicated to plant compliance mapping. Displays badges for Indian standards (OISD, Factories Act 1948, PESO).
        *   **Knowledge Copilot**: Natural-language plant manual assistant with highlighted confidence parameters and exact citation chips.

### 2.5 Future Roadmap
*   **`MeetTheRest.jsx`**
    *   *shadcn Components*: `Card`, `Badge`.
    *   *Details*: Muted, dashed-border cards for planned additions to the FaktriIQ suite:
        *   *Agent 3: Knowledge Graph Agent* (System interdependencies).
        *   *Agent 4: Maintenance & RCA Agent* (Equipment breakdown & logs analysis).
        *   *Agent 5: Lessons-Learned Agent* (Near-miss pattern auditing).

### 2.6 Customer FAQ & Onboarding
*   **`FAQSection.jsx`**
    *   *shadcn Components*: `Accordion` (with AccordionItem, AccordionTrigger, AccordionContent).
    *   *Items*:
        1.  *How does FaktriIQ ingest digitized or paper-based documentation?*
        2.  *Does it support custom proprietary SOPs and safety manuals?*
        3.  *What Indian statutory frameworks are pre-mapped into the database?*
        4.  *Is our plant operational data secure?* (Emphasize air-gapped / local instance capabilities).
*   **`PilotRequestForm.jsx`**
    *   *shadcn Components*: `Form`, `Input`, `Select`, `Button`, `Toast`.
    *   *Layout*: Compact, center-aligned card with form fields for Name, Email, Organization, and Role (e.g., Plant Manager, Safety Officer, Technician).
    *   *Success Action*: Shows a clean, stylized shadcn toast: *"Pilot Request Submitted! Team AlgoZeniths will contact you shortly."*

---

## ⚡ 3. Technical Setup & Deployment

### 3.1 Setup Commands
Initialize Vite, install Tailwind CSS, and populate shadcn dependencies:

```bash
# 1. Create Vite React App in current directory
npx -y create-vite@latest ./ --template react

# 2. Install Tailwind & PostCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Initialize shadcn/ui
npx -y shadcn-ui@latest init

# 4. Install required shadcn components
npx -y shadcn-ui@latest add button card accordion tabs sheet toast input select label scroll-area
```

### 3.2 Deployment
Deploy directly to Vercel via Git Integration or Vercel CLI:
```bash
npm run build
vercel --prod
```

