# FaktriIQ Desktop — Development Plan

## Goal

Ship a Windows-first desktop build of FaktriIQ (Flutter desktop target) reusing the existing mobile UI/logic, so plant engineers and safety officers can run FaktriIQ on a control-room PC/laptop, not just a phone.

## Current state (relevant to this work)

- Flutter project has no desktop platform folders yet — only `android/` and `ios/` exist. `windows/` (and optionally `macos/`, `linux/`) need to be scaffolded.
- API base URL is hardcoded in [lib/main.dart:86](../lib/main.dart#L86) as `http://192.168.1.4:8000` — a LAN IP tied to the current dev machine/phone setup. This needs to become configurable for desktop.
- Backend ([backend/main.py](../backend/main.py)) already binds `0.0.0.0:8000` with `allow_origins=["*"]`, so no backend changes are required for desktop networking.
- Existing services to carry over as-is: `lib/services/offline_search_service.dart` (on-device TF-IDF fallback), `lib/services/query_cache_service.dart` (local response cache via `path_provider`), `lib/services/ondevice_llm_service.dart`.
- UI (`lib/main.dart`, `lib/landing_page.dart`) was built mobile-first — layout, tap targets, and navigation assume a phone-sized portrait screen.

## Working assumptions (default decisions — revisit if wrong, but plan proceeds on these)

1. **Platform scope: Windows only.** Matches the current dev machine and typical control-room hardware. macOS/Linux are not in scope for this pass; the plan can extend to them later with `flutter create --platforms=macos,linux .` since Flutter's desktop plumbing is largely shared.
2. **Backend topology: bundled/local-first, LAN-capable as a fallback.** The desktop app defaults to talking to a backend on `127.0.0.1:8000` (same machine), but the server address stays overridable so one backend instance can still serve multiple desktop clients on a plant LAN, matching the existing mobile setup. This avoids forcing a decision between "single machine" and "shared server" — both are supported, local is just the default.
3. **Distribution: plain release folder first, installer later.** `flutter build windows` output (zipped) is enough for internal testing. An MSIX or NSIS installer is a Phase 4 stretch goal, not a blocker for a working desktop build.

## Phased plan

### Phase 1 — Scaffold the desktop target

- Run `flutter config --enable-windows-desktop`, then `flutter create --platforms=windows .` from the project root to generate the `windows/` runner project without touching existing `lib/` code.
- Run `flutter pub get` and confirm every current dependency resolves for Windows:
  - `http`, `google_fonts`, `cupertino_icons` — pure-Dart or have first-party desktop support, low risk.
  - `path_provider` — has a Windows federated implementation (`path_provider_windows`), should resolve automatically.
  - `connectivity_plus` — has Windows support since v5; confirm the installed version actually reports connectivity on Windows rather than silently returning "unknown."
  - `getwidget` — mobile-styled widget kit; check whether its components render acceptably at desktop sizes or need swapping for standard Material widgets in places.
- `flutter run -d windows` with zero code changes, to get a known-good baseline before any UI work starts.

### Phase 2 — Networking config for desktop

- Replace the hardcoded `kApiBaseUrl` constant in [lib/main.dart:86](../lib/main.dart#L86) with a resolvable value:
  - Default: `http://127.0.0.1:8000`.
  - Override path: a simple settings field (persisted via the existing `path_provider`-backed local storage pattern already used for the query cache) so a user can point the desktop client at a LAN backend without a rebuild.
- No backend changes needed — `0.0.0.0` binding and open CORS already support this.

### Phase 3 — Responsive/desktop UI pass

- Audit `lib/main.dart` and `lib/landing_page.dart` for fixed mobile-width assumptions (bottom nav, single-column layout, tap-sized touch targets).
- Add a responsive breakpoint via `LayoutBuilder`/`MediaQuery.size.width`: phone layout below ~600px, a wider layout above it (e.g. side nav instead of bottom nav, more breathing room for the statutory-citation highlighting).
- Desktop interaction basics: hover states on buttons/cards, Enter-to-submit on the query field, sensible default/minimum window size (via the `window_manager` package) so the app doesn't launch at a cramped mobile-esque size.

### Phase 4 — Packaging & distribution

- `flutter build windows` → verify the release bundle runs standalone, with `guidelines.json/` and bundled fonts correctly included (Flutter copies declared `assets:` automatically, but confirm on a clean machine/VM, not just the dev box).
- Stretch: wrap the build in an installer (`msix` package is the most native-feeling option for Windows) once the unpackaged build is verified.

### Phase 5 — Verification

- Manual pass on Windows: query with backend up (online path), backend down (offline TF-IDF fallback), and a repeated query (cache hit). Resize the window across the responsive breakpoint. Confirm statutory highlighting/markdown rendering look correct at desktop font sizes and window widths.

## Explicitly out of scope for this pass

- No changes to the RAG backend, BM25 indexing, or Groq integration — desktop work is client-side only.
- No production/cloud hosting of the backend — stays on-prem/LAN per current architecture.
- macOS/Linux builds, installer signing, and auto-update — deferred until the Windows build is validated.
