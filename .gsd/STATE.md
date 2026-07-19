# Project State

## Current Position

**Milestone:** Mobile App Branding & Feature Polish
**Phase:** 4 - Branding, Fonts, & Real-Time Status
**Status:** verified
**Plan:** Launcher icon replacement, premium typography layout, and real-time connectivity status implementation

## Last Action

1. **Branding & Logo**: Substituted default icons in all Android `mipmap` resource directories with the square `FaktriIQ_sq.png` logo.
2. **Anthropic Typography**: Re-styled all portal App Bars to display names in bold-italic **`GoogleFonts.newsreader`** format.
3. **Real-time Status**: Integrated `connectivity_plus` to dynamically detect and swap the App Bar badge between green **`ONLINE`** and red **`OFFLINE`** indicators.
4. **Gradle Compilation Fix**: Resolved compile SDK constraints by defining a safe `afterEvaluate` compile version override to Android SDK 35 inside root `build.gradle.kts`.
5. **Git Commit**: Successfully committed changes with hash `90cd4bb`.
6. **APK Release & Landing Page Integration**: Made `kApiBaseUrl` dynamic in `lib/main.dart` using build-mode fallbacks and compile-time overrides, compiled the production release APK (52.3MB), copied it to `landing/public/faktriiq.apk`, added the "Download APK" CTA button in `Hero.jsx` / `index.css`, and committed changes (commit `54c7c85`).

## Next Steps

1. Wait for user instructions on testing the release build or deploying the landing page.
