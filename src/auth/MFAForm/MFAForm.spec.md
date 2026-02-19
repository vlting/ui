# Component Spec — MFAForm

## 1. Purpose

MFAForm presents the UI for multi-factor authentication challenges. It collects a time-based or SMS one-time code from the user after their primary credentials have been verified, completing a second authentication factor.

Use it in the authentication flow immediately after successful first-factor verification when MFA is required.

Do NOT use it for initial credential entry (use LoginForm), magic link flows (use MagicLinkForm), or any non-OTP second factor UI.

---

## 2. UX Intent

- Primary interaction goal: allow the user to enter their OTP code quickly and accurately with minimal friction.
- Expected user mental model: a short numeric code entry — either a single grouped input or individual character boxes — followed by automatic or manual submission (Jakob's Law; mirrors Google, Apple, banking 2FA UIs).
- UX laws applied:
  - Hick's Law: the form presents exactly one task; no distracting choices.
  - Fitts's Law: each code input cell or the single input field is large enough to tap comfortably.
  - Doherty Threshold: auto-submission (if supported) triggers within 400ms of completing the final digit; error feedback appears immediately.
  - Miller's Law: 6-digit codes are within comfortable short-term memory span; display code inputs grouped (e.g., 3+3) if helpful.

---

## 3. Visual Behavior

- Layout: a heading ("Enter your code" or equivalent), the OTP input area, a submit button (if not auto-submitting), and a secondary action (e.g., "Use a backup code" or "Resend code").
- OTP input area may be rendered as: (a) a single numeric input field, or (b) individual character-box inputs — determined by props.
- Individual character boxes are evenly spaced, same size, and visually grouped.
- Error state shows a form-level error message and clears the input.
- Submitting state disables all inputs and shows a spinner on the submit button.
- Layout is single-column; centered on wide viewports.
- Spacing between elements uses space tokens.

---

## 4. Interaction Behavior

- States: idle, filling, submitting, error, success.
- For segmented (individual character-box) mode:
  - Focus automatically advances to the next box after each digit entry.
  - Backspace in an empty box moves focus to the previous box.
  - Pasting a complete code fills all boxes at once.
- For single-input mode: standard text input behavior; numeric keyboard hint on mobile.
- Auto-submission: optionally fires the submit callback automatically when all digits are filled, without requiring the user to press a button.
- Controlled via `value` and `onChange` props; submission via `onSubmit` callback.
- Keyboard behavior:
  - `Tab` navigates through code boxes (if segmented) and secondary actions.
  - `Enter` submits the code if the field is complete.
  - `Escape` or a back link fires a cancel/back callback.
- Screen reader behavior: each box (if segmented) announces its position (e.g., "Digit 1 of 6"). Form-level errors are announced via `role="alert"`. Auto-submit is announced via a live region.
- Motion: error state shake/clear animation is short; reduced motion suppresses it.

---

## 5. Accessibility Requirements

- Single input: `type="text"` or `type="number"` with `inputmode="numeric"`, labeled appropriately.
- Segmented inputs: each has an accessible label (e.g., `aria-label="Digit 1 of 6"`); they share a `role="group"` with a group label.
- Required field(s) have `aria-required="true"`.
- Error message is linked via `aria-describedby` and uses `role="alert"`.
- Submit button has `aria-busy="true"` while submitting.
- All interactive elements meet WCAG AA contrast.
- Paste handling does not require special keyboard access — the entire code can be entered via paste from a single focus point.
- Reduced motion: no shake or transition animation when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- Required tokens: input background, input border, input border-focused, input border-error, input text color, label color, error text color, button background, button text, surface background, focus ring color.
- Prohibited hardcoded values: no raw colors, no pixel sizes, no hardcoded border-radius.
- Dark mode: all token references resolve correctly; error and focus states remain visually distinct.

---

## 7. Composition Rules

- May be wrapped by: authentication page containers, modal dialogs in a step-up auth context, onboarding flows.
- May contain: OTP input field(s), submit button, "Use backup code" link, "Resend code" action, back/cancel link.
- Anti-patterns:
  - Do not perform authentication or code verification network requests inside this component.
  - Do not use this component for non-OTP authentication challenges.
  - Do not embed promotional content or unrelated actions within the form.

---

## 8. Performance Constraints

- Segmented input boxes must not trigger full-form re-renders on each keystroke; isolate each box's state update.
- Auto-focus management between boxes must be handled without layout thrashing.
- The component is lightweight; no virtualization required.

---

## 9. Test Requirements

- Renders the correct number of input boxes (segmented) or a single input field based on props.
- Entering digits advances focus in segmented mode.
- Backspace in an empty box moves focus backward in segmented mode.
- Pasting a complete code fills all fields.
- Auto-submission fires the submit callback when all digits are entered and auto-submit is enabled.
- Submit button fires the submit callback with the entered code.
- Submitting state disables inputs and shows a loading indicator.
- Error state displays the error message and clears inputs.
- Resend action fires the resend callback.
- Keyboard: Enter submits; Tab navigates correctly.
- Accessibility: no axe violations; inputs have accessible labels; errors are announced.
- Reduced motion: no animation on error state when `prefers-reduced-motion` is active.
