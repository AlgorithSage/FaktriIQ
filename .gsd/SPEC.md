# SPEC.md — Project Specification

> **Status**: `FINALIZED`
>
> ⚠️ **Planning Lock**: No code may be written until this spec is marked `FINALIZED`.

## Vision
Enhance the visual appeal and clarity of two critical parts of the FaktriIQ landing page: the statutory standards alignment bar in the Hero section and the day-one Value Pillars layout. This will demonstrate FaktriIQ's robustness and deep compliance integration in a highly premium, innovative, and interactive manner.

## Goals
1. **Interactive Statutory Standards Showcase** — Upgrade the static row of regulatory badges into an interactive list. Each badge will have custom vector icons, responsive hover cards detailing exactly how FaktriIQ validates each framework, and high-fidelity styling.
2. **Innovative Interlocking Grid Layout** — Replace the current two-column tabs layout in the Value Pillars section with an interlocking 2x2 grid wrapping around a central square star pattern modal.
3. **Corner-cut (L-Shaped) Quadrant Modals** — Modify the 4 corner cards so their inner corners are dynamically cut out to cradle the central square modal, forming a solid rectangular puzzle without symmetry loss.
4. **Context-Aware Visual Rotation** — Connect card interaction (hover/click) to the central star pattern SVG, causing the highlighted lead ray to rotate dynamically and point directly to the active quadrant.
5. **Global Mesh (Grained) Gradient Background** — Move the interactive WebGL mesh shader background to be a global backdrop fixed behind the entire landing page. Make the default section backgrounds transparent and the styled sections (e.g. subtle, warm) and the footer semi-transparent so the grained mesh gradient flows seamlessly behind all page elements.

## Non-Goals (Out of Scope)
- Creating new backend API endpoints or mock logic for these sections.
- Modifying other sections of the landing page or the Flutter mobile application.
- Changing the sibling project `website`.

## Constraints
- Must remain fully responsive on mobile/tablet layouts, falling back gracefully to simpler vertical flow when screen width is `< 1024px`.
- CSS custom layouts (e.g. clip-path) must preserve high-fidelity visual aesthetics including border lines and shadows without clipping issues.

## Success Criteria
- [ ] Hovering over a statutory badge displays a detailed card with descriptions, governing sections, and check protocols.
- [ ] Value Pillars are positioned in 4 corners (top-left, top-right, bottom-left, bottom-right) on screens `> 1024px`.
- [ ] Visual intersection of the 4 cards is perfectly cut out, accommodating the central square modal.
- [ ] Hovering/clicking any corner card highlights its border/background and rotates the central SVG's active line to point towards it.
- [ ] Mobile view renders a clean vertical list of features, disabling the complex 2x2 grid layout.
- [ ] Interactive WebGL mesh gradient is rendered as a fixed background covering the entire page.
- [ ] The duplicate shader context in Hero section is removed to optimize WebGL resources.
- [ ] Styled section backgrounds (subtle, warm) and the footer background are semi-transparent, letting the mesh gradient overlay show through.

---

*Last updated: 2026-07-15*
