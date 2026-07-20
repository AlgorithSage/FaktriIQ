# Roadmap

> **Current Phase:** 1 - Authentication UI Polish (Desktop App)
> **Status:** completed

## Must-Haves (from SPEC)

- [x] Password visibility toggle with eye icon
- [x] Hover cursor change and splash background removal for the email link sign-in text
- [x] Hover cursor change to pointer for Google Sign-In and all other desktop buttons/links in the login screen

---

## Phases

### Phase 1: Authentication UI Polish (Desktop App)
**Status:** ✅ Completed
**Objective:** Refine the login screen interactive widgets in `lib/main.dart` with custom mouse region cursor changes, password toggle state, and custom hover text styling for Desktop Windows application.

**Plans:**
- [x] Plan 1.1: Add state variables `_obscurePassword` and `_isEmailLinkHovered` to `_LoginScreenState`.
- [x] Plan 1.2: Update password field to include visibility toggle suffix icon and state change handler.
- [x] Plan 1.3: Update "Sign in with an email link instead" widget to change text color on hover and remove background overlay by converting it to `MouseRegion` + `GestureDetector`.
- [x] Plan 1.4: Wrap Google Sign-In button, tab buttons, primary action buttons, and text link buttons in `MouseRegion` to enforce pointer mouse cursor on hover.
- [x] Plan 1.5: Verify layout compilation and test the interaction behaviors in the running Windows app.
