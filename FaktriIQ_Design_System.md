# FaktriIQ — UI/UX Design System
## Design Document for the Flutter App (Web + Mobile)

**Scope of this document:** This defines the visual identity, design tokens, layout patterns, component behavior, and screen-by-screen structure for the actual FaktriIQ product (the Flutter app used by technicians and safety officers) — not the marketing landing page, which has its own PRD. This document should be handed to whoever is building the Flutter UI, or fed to an AI coding assistant alongside the Master PRD's functional requirements (Section 8).

---

## 1. Design Brief & Grounding

**Subject:** An AI copilot used inside a working industrial plant — by someone standing near machinery, possibly wearing gloves, glancing at a phone between tasks; and by a safety officer at a desk, cross-referencing regulation text against real procedures before an audit.

**The single job each surface has to do:**
- Mobile (technician): get a trustworthy answer, fast, with minimal input.
- Web (officer): see where a procedure falls short of a regulation, verify it, act on it.

**Visual direction (locked):** Bold, high-contrast, poster-like — a saturated safety-yellow paired with a near-black (`#101820`), heavy rounded display type, and fully-rounded pill buttons. This is a deliberate departure from a quiet "instrument panel" look toward something loud and unmistakable — which, for this subject, is not a contradiction. Yellow-and-black is the literal color language of hazard signage, machine guarding, and floor-marking tape on a real plant floor. Turning that volume up, instead of keeping it quiet, makes the product feel like it belongs on the same floor as the equipment it's describing.

**What this is not:** a generic AI-chatbot SaaS dashboard, a muted enterprise-grey B2B tool, or a soft consumer app palette. The boldness is the point — this should be instantly recognizable at a glance across a room, the way safety signage is designed to be.

---

## 2. Design Tokens

### 2.1 Color palette (named, with hex values)

| Token | Hex | Use |
|---|---|---|
| `volt` | `#FEE715` | Primary brand color — dominant background on hero/marketing surfaces and key highlight blocks in-app. Spent boldly, not sparingly — this is the brand, not just an accent |
| `carbon` | `#101820` | Secondary/anchor color — near-black, used for panels, primary buttons, nav chrome, and all body text on `volt` or `paper` backgrounds |
| `paper` | `#FFFFFF` | Working background for content-dense screens (document lists, chat threads, forms) where full-yellow would overwhelm reading |
| `mist` | `#6B7280` | Tertiary text, metadata, disabled states — the one muted, quiet tone in an otherwise loud palette |
| `line` | `#E5E1D3` | Hairline borders, dividers on `paper` backgrounds |
| `flag` | `#E8453C` | Compliance gap flags, critical alerts — reserved exclusively for genuine flagged issues, never decorative |
| `verify` | `#22C55E` | Confirmation, "compliant," success states — kept vivid to match the palette's overall boldness rather than muted |

**Rule:** `volt` and `carbon` are the brand — every screen should read as unmistakably "this app" from these two alone, the way the reference composition uses a full-bleed yellow block against a black panel. `flag` and `verify` are functional-only colors laid on top for status; they must never be used decoratively or the compliance-flag signal loses meaning.

**Where volt is full-bleed dominant vs. where it's an accent:** These are two different jobs for the same color, not a contradiction.
- **Marketing/landing surfaces** (the public landing page, any hero/pitch material): `volt` is the dominant background — full-bleed across nav bars, hero sections, and feature blocks, exactly as in the reference composition. This is where the brand needs to be loud and instantly recognizable at a glance.
- **In-app, content-dense screens** (document lists, chat threads, the compliance detail view): `paper`/`carbon` do the background work instead, with `volt` reserved for headers, primary buttons, chips, and the Confidence & Citation pill. A technician reading a long procedure answer, or an officer scanning a document library, needs a working surface — a full-bleed yellow background behind dense body text would fight readability rather than support it.

Both are "the brand," applied at the intensity each surface's job calls for — landing pages sell the product in a glance; in-app screens are used for minutes at a time and need to stay legible.

### 2.1.1 Dark mode (token flip)

Dark mode is a direct flip of the two brand anchors, not a separate palette:

| Token | Light mode | Dark mode |
|---|---|---|
| `volt` (`#FEE715`) | Used as accent/highlight | Stays exactly the same hex — never flips, it's the one color that must always read as "brand" in either mode |
| `carbon` (`#101820`) | Text and panels on light surfaces | Becomes the **page background** |
| `paper` (`#FFFFFF`) | Page background | Becomes a `carbon`-adjacent dark surface — content-dense screens sit on near-black instead of white |
| Primary button | `carbon` fill, `volt`/white text | `volt` fill, `carbon` text — the button flips fully so it stays the highest-contrast element on screen either way |
| Body text | `carbon` on light surfaces | `paper`/off-white on dark surfaces |
| `mist`, `line` | as defined | shift to their light-on-dark equivalents — the role stays "quietest tone in the palette" in both modes, exact value tuned in implementation |
| `flag`, `verify` | as defined | keep the same hue family, lightened slightly if needed for contrast against `carbon` — status colors stay recognizable across both modes, never flip meaning |

The practical build rule: **any surface that is `carbon`-on-`volt`-or-`paper` in light mode becomes `volt`-on-`carbon` in dark mode.** The relationship (which color is figure vs. ground) flips — the palette itself does not.

### 2.2 Typography

| Role | Typeface direction | Notes |
|---|---|---|
| Display / headings | A heavy, rounded-terminal grotesque, set in bold or extrabold weight (e.g. Poppins ExtraBold, Baloo 2, or similar rounded-geometric family) | This carries almost all of the brand's personality — big, confident, slightly playful-but-serious, matching the reference composition's headline treatment |
| Body | A clean, neutral grotesque (e.g. Inter or similar) at regular/medium weight | Kept plain so the display type and color blocking do the visual work, not competing typographic flourishes |
| Data / monospace | A monospace face (e.g. IBM Plex Mono or JetBrains Mono) | Reserved for clause numbers, equipment tags, timestamps, confidence values — anywhere a precise, verifiable value is shown |

**Type scale (mobile-first, in logical px):** 13 / 15 / 17 / 22 / 28 / 36 / 48 — headline sizes run larger than a typical enterprise app, matching the poster-like confidence of the reference composition.

### 2.3 Spacing & shape

- Base spacing unit: 4px grid.
- Corner radius: generous and consistent — 16–24px on cards and panels, fully rounded (pill) on all primary buttons, matching the reference composition exactly. This is a deliberate reversal from a tight-corner "instrument" look toward a warmer, bolder, more confident shape language.
- Panels: large solid-color blocks (full `volt` or full `carbon` sections) rather than many small bordered cards — the reference composition's two-panel structure (bold color block on top, dark anchor bar below) is a pattern to reuse throughout, not a one-off hero treatment.
- Elevation: flat color blocking does the separation work instead of shadows — a `carbon` panel next to a `paper` panel needs no drop shadow to read as distinct. Reserve soft shadow only for true floating/overlay elements (modals, the mobile chat input bar).

---

## 3. The Signature Element

Per the design brief, one deliberate, memorable element should carry the product's identity, with everything else quiet around it.

**Signature: the Confidence & Citation pill.** Every answer from either agent ends in a compact, bold pill-shaped badge — matching the reference composition's rounded pill button exactly in shape — set in `carbon` with white text, showing the source document and section in monospace, plus a short confidence word ("High confidence," "Medium," "Low") rather than a percentage or abstract meter. Where the reference composition uses a pill for a call-to-action, FaktriIQ reuses that exact same pill shape as its trust marker — so the one shape a user learns to associate with "primary action" elsewhere in the product also means "this is a verifiable, sourced claim" here. It appears identically on both the Compliance Agent and Knowledge Copilot outputs, becoming the product's visual signature.

Keep everything else — cards, navigation, inputs — quiet and disciplined so this element stands out on every screen it appears.

---

## 4. Layout Patterns

### 4.1 Mobile (technician-facing — primary surface)

- Single-column, thumb-reachable layout. Primary input (ask a question) is anchored near the bottom third of the screen, not the top — reachable one-handed while standing.
- Large touch targets: minimum 48x48px for any tappable element, generous spacing between them (gloves, low precision).
- Minimal chrome: no persistent top app bar with many icons — a simple back affordance and a single overflow menu is enough.
- Answers appear as a single focused card, not a scrolling chat thread by default — the technician usually wants one answer, not a conversation history in view. History is accessible but tucked away, not the default view.

### 4.2 Web (officer-facing — secondary surface)

- Two-pane layout: a left-hand document/procedure list, a right-hand detail pane showing clause matches and flags. This suits a desk-based, comparison-heavy workflow — the opposite of the mobile single-focus pattern.
- Denser information display is acceptable here (smaller type steps, more visible metadata) since the user is seated and deliberate, not standing and glancing.
- Compliance-gap flags use the `flag` red consistently in this view as the dominant visual signal — everything else recedes so flags are unmissable.

### 4.3 Shared components across both surfaces

- Agent identity: each agent (Compliance Agent, Knowledge Copilot) has a simple geometric mark — not an illustrated mascot — built from the same shape language (e.g., a small square/diamond motif with a one-letter or one-glyph mark), so the "team of agents" framing (per the Master PRD) is visually reinforced without adding illustration overhead in a 12-day build.
- The Confidence & Citation pill (Section 3) appears identically wherever an agent answer is shown, on both mobile and web.
- Web top nav bar: `carbon`-filled full-width bar, brand mark (a small `volt`-on-`carbon` square with a single letterform) on the left, the two agent names on the right with the currently-active agent shown in `volt` text and the inactive one in `mist`-on-dark, plus a simple initials avatar circle for the logged-in user on the far right. This is the one piece of persistent chrome shared across every web screen.

---

## 5. Core Screens (mapped to Master PRD Section 8 functional requirements)

### 5.1 Technician — Mobile

1. **Home / Ask screen** — large input field, 3–4 example questions as tappable suggestion chips, minimal else. (Maps to KC-1, KC-8)
2. **Answer screen** — the answer text, the Confidence & Citation pill, an expandable "view full section" affordance. (Maps to KC-3, KC-4, KC-5)
3. **No-answer state** — a clear, non-alarming illustration-free message: what wasn't found, and an explicit "escalate to your supervisor" affordance. This screen should feel calm and instructive, not like an error page. (Maps to KC-6)
4. **Query history** — a simple reverse-chronological list, secondary navigation, not a default view. (Maps to KC-7)

### 5.2 Safety Officer — Web

5. **Document library** — list of ingested procedures/documents with structured metadata tags visible (equipment, dates, clause refs). Each document row/card carries a compact summary badge pair — a `flag`-red pill showing the count of flagged gaps and a `verify`-green pill showing the count of addressed clauses (e.g. "1 gap" / "3 ok") — so an officer can triage across the whole library at a glance without opening every document. This is the left-hand pane in the two-pane web layout (Section 4.2). (Maps to SH-1, SH-2)
6. **Compliance detail view** — selected procedure on the left, matched clauses and flags on the right; flags rendered in `flag` red, verified/compliant items in `verify` green. (Maps to CA-1, CA-2, CA-3)
7. **Clause drill-down (modal or side panel)** — the actual regulation text, with a persistent disclaimer strip ("System-generated flag. Confirm against the original regulation before acting.") — never dismissible-and-forgotten; it should reappear each time a flag is opened. On the web surface this disclaimer is rendered as a full-width `carbon` bar rather than a quiet inline note, since the surrounding page is light and it needs to hold its own as the page's one serious, non-negotiable statement. (Maps to CA-4, CA-5)
8. **Export view** — a simple, clean list/table of flagged gaps for a document set, formatted plainly enough to paste into an email or print, triggered from a `carbon`-filled pill button ("Export summary") in the top-right of the detail view. (Maps to CA-6)

### 5.3 Admin — Web (minimal)

9. **Upload screen** — drag-and-drop or file-picker upload, a visible ingestion status (parsing → tagging → ready), and a confirmation view of extracted metadata tags. (Maps to SH-1, SH-2)

---

## 6. States & Content Voice

Per the frontend-design skill's writing guidance — words are functional material here, not decoration.

- **Loading states:** plain, specific, never cute. "Searching your plant's documents…" not "Thinking…" or a spinning generic AI orb.
- **Empty states:** an invitation to act, not a dead end. E.g., an empty document library says "No documents yet — upload your first manual or procedure to get started," with the upload action directly reachable from that message.
- **Error/no-answer states:** never apologetic, never vague. State exactly what happened and what to do next. "No matching procedure found in the uploaded documents. Escalate to your supervisor if this is urgent." — not "Sorry, I couldn't find that!"
- **Confirmation language:** actions keep consistent naming through the full flow — a button labeled "Flag for review" should produce a toast/confirmation that says "Flagged for review," never a mismatched synonym.
- **The legal/compliance disclaimer** (Master PRD Section 15) must appear, in the same quiet but persistent visual treatment, on every screen where a compliance flag or clause match is shown — not just once at first use.

---

## 7. Motion

Motion should be minimal and purposeful, not ambient or decorative — the confidence comes from bold color and shape, not from busy animation.

- The Confidence & Citation pill should animate a single quiet scale/fade-in on answer arrival (a few hundred milliseconds) — this is the one deliberate motion moment in the product, echoing the pill "arriving" the way a stamp or badge lands.
- Screen transitions: simple, fast, directional (slide for forward/back navigation) — no bouncy easing, no elaborate page-transition choreography. The boldness lives in color and shape, not in movement.
- Respect reduced-motion settings: all animation (including the signature pill fade-in) should degrade to an instant state change when the OS-level reduce-motion preference is on.

---

## 8. Accessibility & Quality Floor

- Color is never the only signal: compliance flags pair the `flag` red with an icon and text label ("Gap flagged"), not color alone — important given red/green color-vision deficiency is common enough to matter in a safety product.
- Minimum contrast ratio of 4.5:1 for body text against its background across all defined tokens — verify `mist` text usage stays restricted to non-critical metadata only, since it's a lower-contrast tone by design.
- All interactive elements have a visible keyboard focus state (relevant for the web/officer surface especially).
- Mobile layout must remain usable and legible down to a 360px-wide viewport without horizontal scrolling.
- Touch targets: 48x48px minimum, as stated in Section 4.1 — this is a hard floor for the mobile surface given the gloves/field-use context.

---

## 9. What This Design System Deliberately Does Not Include (12-day scope note)

- No custom illustration set or mascot artwork for agents — geometric marks only (Section 4.3), to keep the design buildable in the available time.
- Dark mode is now specified as a straight token flip (Section 2.1.1) rather than a separate design effort — cheap to implement if time allows, but still not a hard MVP requirement; light mode (`volt`/`paper`/`carbon`) is the default and the one that must be polished for the demo.
- No animated onboarding sequence — a single static first-run screen explaining the two agents is sufficient for v1.
- No dedicated design system component library (e.g., a full Figma kit) — this document plus the token table is the working reference for the 12-day build; a formal component library is a natural post-MVP investment, not a prerequisite to start building.

---

## 10. Quick Reference — Token Summary

```
Colors:
  volt    #FEE715   primary brand — spend boldly, not sparingly (never flips in dark mode)
  carbon  #101820   secondary/anchor — panels, primary buttons, body text (becomes bg in dark mode)
  paper   #FFFFFF   working background for content-dense screens (becomes dark surface in dark mode)
  mist    #6B7280   tertiary text / metadata (the one quiet tone)
  line    #E5E1D3   borders / dividers on paper backgrounds
  flag    #E8453C   compliance gap (reserved, never decorative)
  verify  #22C55E   compliant / success

Dark mode: flip carbon/paper roles — carbon becomes background, volt/white becomes
foreground on primary buttons. volt itself never changes hex. See Section 2.1.1.

Type:
  Display   — heavy rounded-terminal grotesque, bold/extrabold (e.g. Poppins ExtraBold, Baloo 2)
  Body      — clean neutral grotesque, regular/medium (e.g. Inter)
  Data/Mono — IBM Plex Mono / JetBrains Mono (clause refs, tags, confidence)

Spacing: 4px base grid
Radius:  16–24px cards/panels, fully rounded (pill) on all primary buttons
Elevation: flat color blocking over shadows; shadow reserved for floating/overlay only
Touch target minimum: 48x48px
```
