# FaktriIQ — UI/UX Design System
## Design Document for the Flutter App (Web + Mobile)
 
**What changed from v1:** the previous version leaned into a bold, poster-like safety-yellow-and-black identity. This version replaces that with the visual language technicians and safety officers already expect from serious industrial/compliance software — closer to what they'd see from SAP, Siemens, or AVEVA. Quiet, legible, credible. Boldness is now reserved entirely for the two colors that carry real meaning: compliance flags and confirmations.
 
---
 
## 1. Design Brief & Grounding
 
**Subject:** an AI copilot used inside a working industrial plant — by a technician glancing at a phone between tasks, and by a safety officer cross-referencing regulation text against real procedures before an audit.
 
**The job each surface has to do:**
- Mobile (technician): get a trustworthy answer, fast, with minimal input.
- Web (officer): see where a procedure falls short of a regulation, verify it, act on it.
**Visual direction (revised):** a calm, neutral enterprise palette — deep slate/navy as the anchor color, white and light-grey working surfaces, restrained typography, and standard rounded-rectangle components rather than pill shapes. The product should read as trustworthy and unremarkable at first glance, the way audit software, ERP dashboards, and compliance tools are expected to look — and only draw the eye where something actually needs attention (a flagged gap, a confidence signal).
 
**What this is not:** a consumer-facing brand moment, a safety-signage pastiche, or anything that competes visually with the content it's displaying. The interface should get out of the way.
 
---
 
## 2. Design Tokens
 
### 2.1 Color palette
 
| Token | Hex | Use |
|---|---|---|
| `ink` | `#0F172A` | Primary text, nav chrome, primary button fill — the anchor dark tone |
| `slate` | `#1E293B` | Secondary panels, header bars, sidebar backgrounds |
| `surface` | `#FFFFFF` | Default page background |
| `subtle` | `#F8FAFC` | Secondary background for cards/sections that need light separation from `surface` |
| `border` | `#E2E8F0` | Hairline borders, dividers, card outlines |
| `muted` | `#64748B` | Secondary/tertiary text, metadata, disabled states |
| `accent` | `#CA8A04` | Links, active states, selected nav items, focus rings, primary button fill — the brand color, muted to a dark gold rather than the raw safety-yellow of v1 |
| `accent-light` | `#FEF9C3` | Light tint background for selected rows, highlighted cards, subtle hover states — a pale yellow wash instead of a solid fill |
| `accent-mid` | `#FDE68A` | Secondary tint — badges, chips, tags, progress bars; one step darker than `accent-light` for a bit more presence without becoming loud |
| `flag` | `#DC2626` | Compliance gap flags, critical alerts — reserved exclusively for genuine issues |
| `verify` | `#16A34A` | Confirmation, "compliant," success states |
| `warn` | `#D97706` | Medium-confidence or advisory states (e.g. "review recommended") — distinct from `accent` even though both sit in the amber family; `warn` is reserved strictly for status, `accent` for brand/interactive |
 
**Rule:** `ink`, `slate`, `surface`, and `border` still do most of the structural work — panels, text, dividers stay neutral. Yellow now carries the brand identity, but as a family of tints rather than one flat block: `accent` for interactive elements and primary buttons, `accent-light`/`accent-mid` for backgrounds, highlights, and badges where a wash of color helps without shouting. `flag`, `verify`, and `warn` stay functional-only and never appear decoratively, so their meaning stays sharp the moment an officer scans a screen.
 
There is still no full-bleed saturated yellow background anywhere in the product — that was the loud, poster-like part of v1 this version moves away from. Yellow shows up instead as: a solid `accent` fill on primary buttons and active nav states, and pale `accent-light`/`accent-mid` washes behind cards, chips, and selected rows. This reads as "warm, branded, professional" rather than "hazard signage."
 
### 2.1.1 Dark mode
 
A conventional dark-mode flip, not a token gimmick:
 
| Token | Light mode | Dark mode |
|---|---|---|
| `surface` | `#FFFFFF` | `#0B1120` (near-black) |
| `subtle` | `#F8FAFC` | `#111827` |
| `ink` (text role) | `#0F172A` on light | `#E5E7EB` (off-white) on dark |
| `border` | `#E2E8F0` | `#1F2937` |
| `accent` | `#CA8A04` | `#FACC15` (brightened for contrast, closer to the original brand yellow) |
| `accent-light` / `accent-mid` | `#FEF9C3` / `#FDE68A` | `#3F3517` / `#544419` — dark, desaturated yellow-brown washes instead of pale tints, so the "highlighted card" role still reads on a near-black background |
| `flag` / `verify` / `warn` | as defined | same hue family, lightened slightly for AA contrast on dark backgrounds |
 
Standard practice: backgrounds and text invert, functional colors stay recognizable, no color changes role/meaning between modes.
 
### 2.2 Typography
 
| Role | Typeface direction | Notes |
|---|---|---|
| Display / headings | A single clean grotesque, semibold/bold weight (e.g. Inter, IBM Plex Sans) | No separate "display" family — headings are the same typeface as body, just heavier and larger. This is the biggest tonal change from v1: nothing shouts. |
| Body | Same family, regular/medium weight | Plain, highly legible, no personality of its own |
| Data / monospace | IBM Plex Mono or JetBrains Mono | Clause numbers, equipment tags, timestamps, confidence values — anywhere a precise value is shown |
 
**Type scale (mobile-first, logical px):** 12 / 14 / 16 / 18 / 22 / 28 — a standard, restrained scale. Nothing needs to compete for attention at poster size.
 
### 2.3 Spacing & shape
 
- Base spacing unit: 8px grid.
- Corner radius: 6–8px on cards, inputs, and buttons — a standard "enterprise SaaS" rounding, not fully pill-shaped.
- Panels: thin `border`-outlined cards on `surface`/`subtle` backgrounds, rather than large solid color blocks. Separation comes from a hairline border and a very light shadow, not color blocking.
- Elevation: a single subtle shadow level (`0 1px 2px rgba(0,0,0,0.06)`) for cards; a slightly stronger one for modals/overlays. Consistent and understated throughout.
---
 
## 3. The Trust Signal (replaces the v1 "Signature Element")
 
Every answer still ends in a small citation badge — but it's now a quiet, bordered chip rather than a bold branded pill: `subtle` background, `border` outline, `ink` text, source document and section in monospace, plus a text confidence label ("High confidence" in `verify`, "Medium" in `warn`, "Low" in `muted`). It should look like a standard metadata tag you'd see in any enterprise compliance tool — informative first, branded second.
 
It appears identically on both the Compliance Agent and Knowledge Copilot outputs, so it's still the product's one consistent, learnable element — it just no longer has to be the loudest thing on the screen.
 
---
 
## 4. Layout Patterns
 
### 4.1 Mobile (technician-facing — primary surface)
 
- Single-column, thumb-reachable layout. Primary input anchored near the bottom third of the screen, reachable one-handed while standing.
- Touch targets: minimum 48x48px, generous spacing (gloves, low precision).
- Minimal chrome: simple back affordance, single overflow menu — no dense icon row.
- Answers appear as a single focused card on `surface`, bordered in `border`, not a scrolling chat thread by default. History is accessible but tucked away.
### 4.2 Web (officer-facing — secondary surface)
 
- Two-pane layout: left-hand document/procedure list on `subtle`, right-hand detail pane on `surface` showing clause matches and flags.
- Denser information display is fine here — smaller type steps, more visible metadata, standard data-table conventions (zebra striping optional, `border` row dividers).
- Compliance-gap flags use `flag` red consistently as the one attention-grabbing color in this view — everything else stays neutral so flags are unmissable by contrast rather than by competing for volume.
### 4.3 Shared components across both surfaces
 
- Agent identity: a small monogram/initial mark in `ink` on a `subtle` circular badge — no color-blocked geometric shapes, no illustration. Understated enough to sit next to any enterprise logo.
- The citation chip (Section 3) appears identically wherever an agent answer is shown, on both mobile and web.
- Web top nav bar: `slate`-filled bar, small wordmark on the left, the two agent names on the right with the active agent in `ink`/bold and the inactive one in `muted`, plus a simple initials avatar circle for the logged-in user on the far right — standard enterprise nav conventions throughout.
---
 
## 5. Core Screens (mapped to Master PRD Section 8 functional requirements)
 
### 5.1 Technician — Mobile
 
1. **Home / Ask screen** — input field, 3–4 example questions as tappable suggestion chips (bordered, `accent-light` fill), minimal else. (Maps to KC-1, KC-8)
2. **Answer screen** — answer text, the citation chip, an expandable "view full section" affordance. (Maps to KC-3, KC-4, KC-5)
3. **No-answer state** — calm, direct message: what wasn't found, plus an explicit "escalate to your supervisor" affordance. (Maps to KC-6)
4. **Query history** — reverse-chronological list, secondary navigation. (Maps to KC-7)
### 5.2 Safety Officer — Web
 
5. **Document library** — list of ingested procedures with structured metadata tags (equipment, dates, clause refs). Each row carries a compact badge pair — a `flag`-red count of flagged gaps and a `verify`-green count of addressed clauses (e.g. "1 gap" / "3 ok") — for at-a-glance triage. Left-hand pane in the two-pane layout. (Maps to SH-1, SH-2)
6. **Compliance detail view** — selected procedure on the left, matched clauses and flags on the right; flags in `flag` red, compliant items in `verify` green, everything else in neutral tones. (Maps to CA-1, CA-2, CA-3)
7. **Clause drill-down (modal or side panel)** — the regulation text, with a persistent disclaimer strip ("System-generated flag. Confirm against the original regulation before acting.") rendered as a quiet bordered banner in `subtle`/`warn` text — present but not alarming, and it reappears each time a flag is opened. (Maps to CA-4, CA-5)
8. **Export view** — a plain list/table of flagged gaps, formatted for email or print, triggered from a standard secondary button ("Export summary") in the top-right of the detail view. (Maps to CA-6)
### 5.3 Admin — Web (minimal)
 
9. **Upload screen** — drag-and-drop or file-picker upload, a visible ingestion status (parsing → tagging → ready), confirmation view of extracted metadata tags. (Maps to SH-1, SH-2)
---
 
## 6. States & Content Voice
 
Unchanged in substance from v1 — plain, specific, never cute:
 
- **Loading states:** "Searching your plant's documents…" — not "Thinking…" or a spinner with personality.
- **Empty states:** an invitation to act. "No documents yet — upload your first manual or procedure to get started," with the upload action directly reachable.
- **Error/no-answer states:** state exactly what happened and what to do next. "No matching procedure found in the uploaded documents. Escalate to your supervisor if this is urgent."
- **Confirmation language:** consistent naming through the full flow — "Flag for review" produces "Flagged for review," never a mismatched synonym.
- **Legal/compliance disclaimer** (Master PRD Section 15) appears, in the same quiet but persistent treatment, on every screen where a compliance flag or clause match is shown.
---
 
## 7. Motion
 
Kept deliberately minimal — even more restrained than v1, since nothing here is meant to feel like a brand moment:
 
- The citation chip fades in over ~150ms on answer arrival — a small, functional cue that the answer has finished loading, not a celebratory animation.
- Screen transitions: simple, fast, directional (slide for forward/back) — standard platform-default transitions are acceptable here.
- Respect reduced-motion settings: all animation degrades to an instant state change when the OS-level reduce-motion preference is on.
---
 
## 8. Accessibility & Quality Floor
 
- Color is never the only signal: compliance flags pair `flag` red with an icon and text label ("Gap flagged"), not color alone.
- Minimum contrast ratio of 4.5:1 for body text against its background across all tokens — `muted` text usage stays restricted to non-critical metadata.
- All interactive elements have a visible keyboard focus state (`accent`-colored focus ring), especially on the web/officer surface.
- Mobile layout remains usable and legible down to a 360px-wide viewport without horizontal scrolling.
- Touch targets: 48x48px minimum on the mobile surface.
---
 
## 9. What This Design System Deliberately Does Not Include (12-day scope note)
 
- No custom illustration set or mascot artwork for agents — a small monogram mark only, to keep the design buildable in the available time.
- Dark mode specified as a straightforward token flip (Section 2.1.1) — not a hard MVP requirement; light mode is the default and the one polished for the demo.
- No animated onboarding sequence — a single static first-run screen explaining the two agents is sufficient for v1.
- No dedicated design system component library — this document plus the token table is the working reference for the build.
---
 
## 10. Quick Reference — Token Summary
 
```
Colors:
  ink          #0F172A   primary text, nav chrome
  slate        #1E293B   header bars, sidebar backgrounds
  surface      #FFFFFF   default page background
  subtle       #F8FAFC   secondary background for light separation
  border       #E2E8F0   hairlines, dividers, card outlines
  muted        #64748B   secondary/tertiary text, metadata, disabled
  accent       #CA8A04   brand color — primary buttons, links, active states, focus rings
  accent-light #FEF9C3   pale yellow wash — highlighted cards, chips, selected rows
  accent-mid   #FDE68A   one step darker — badges, tags, progress bars
  flag         #DC2626   compliance gap (reserved, never decorative)
  verify       #16A34A   compliant / success
  warn         #D97706   medium-confidence / advisory (amber, distinct role from accent)
 
Dark mode: standard background/text inversion (Section 2.1.1); accent brightens toward
the original brand yellow (#FACC15), accent-light/mid become dark yellow-brown washes,
flag/verify/warn keep their hue family, lightened for contrast.
 
Type:
  All roles — single clean grotesque (Inter / IBM Plex Sans), weight varies by role
  Data/Mono — IBM Plex Mono / JetBrains Mono (clause refs, tags, confidence)
 
Spacing: 8px base grid
Radius:  6–8px on cards, inputs, and buttons (no pill shapes)
Elevation: single subtle shadow level for cards, slightly stronger for modals/overlays
Touch target minimum: 48x48px
```