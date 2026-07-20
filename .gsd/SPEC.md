# SPEC.md — Project Specification

> **Status**: `FINALIZED`
>
> ⚠️ **Planning Lock**: No code may be written until this spec is marked `FINALIZED`.

## Vision
Improve the user experience, accessibility, and visual aesthetics of the mobile application's login and sign-up portal by refining interactive elements, cursor behaviors, and password input visibility.

## Goals
1. **Password Visibility Toggle** — Add an eye icon (visibility/visibility-off) in the Password field to toggle password text masking (obscureText).
2. **Email Link Hover Action & Styling** — Convert the "Sign in with an email link instead" button to change the cursor type on hover, remove the background overlay highlight (circle/pill) on hover, and only transition the text color on hover.
3. **Cursor Pointer Behavior** — Ensure all active buttons and interactive controls (including Google Sign-In, Phone tab controls, and action/navigation buttons) show a pointer (hand) cursor upon hover.

## Non-Goals (Out of Scope)
- Modifying backend authentication logic.
- Redesigning other parts of the Flutter app.

## Constraints
- Changes must compile and run on Windows Desktop (`flutter run -d windows`).
- No deprecation warnings should be introduced.

## Success Criteria
- [ ] Tapping the eye icon in the password field toggles between masking (`••••••••`) and plain text, showing the appropriate icon.
- [ ] Hovering over the "Sign in with an email link instead" text changes the cursor to a pointer, changes only the text color, and does not show any pill-shaped background highlight.
- [ ] Hovering over the Google Sign-In button, Email/Phone tab toggle buttons, Send OTP/Verify Code buttons, and other text links changes the mouse cursor to a click/pointer cursor.
