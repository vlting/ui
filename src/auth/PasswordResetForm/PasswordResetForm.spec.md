# Component Spec — PasswordResetForm

## 1. Purpose

PasswordResetForm handles two distinct phases of the password reset flow: (1) requesting a reset link by entering an email address, and (2) setting a new password after arriving via a reset link. The component surfaces the appropriate phase based on props.

Use it on dedicated password reset pages or within an authentication modal flow.

Do NOT use it for initial login (use LoginForm), magic link sign-in (use MagicLinkForm), or general account settings password changes (which require the current password and belong in a settings panel).

---

## 2. UX Intent

- Primary interaction goal: enable a locked-out user to regain access with minimal steps and maximum clarity about what to do next.
- Expected user mental model:
  - Phase 1: "Enter my email to receive reset instructions."
  - Phase 2: "Enter and confirm my new password."
  - Both phases follow familiar web conventions (Jakob's Law).
- UX laws applied:
  - Tesler's Law: complexity of token validation and security rules is handled by the system; the user only needs to enter their new password.
  - Doherty Threshold: confirmation feedback (email sent) appears within 400ms; password strength feedback appears in real time.
  - Hick's Law: each phase presents exactly one clear task; no competing actions.
  - Fitts's Law: submit buttons are full-width or prominently sized.

---

## 3. Visual Behavior

- Phase 1 layout: email input with label, submit button ("Send reset link"), link back to login.
- Phase 1 sent state: confirmation message with envelope icon and instruction copy; option to resend.
- Phase 2 layout: new password field, confirm password field, submit button ("Set new password"), optional password strength indicator.
- Password strength indicator (if present) is a visual bar or label below the new password field, driven by strength tokens (weak/fair/strong/very strong).
- Both phases are single-column; max-width constrained; centered on wide viewports.
- Spacing uses space tokens; no hardcoded gaps.
- Error messages appear below the relevant field or as a form-level banner.

---

## 4. Interaction Behavior

- States per phase:
  - Phase 1: idle, filling, submitting, sent, error.
  - Phase 2: idle, filling (with optional real-time strength feedback), submitting, error, success.
- Password fields include show/hide toggles.
- Phase is controlled via props; the component does not manage routing or token state.
- Keyboard behavior:
  - `Enter` from any field submits the active phase.
  - `Tab` / `Shift+Tab` navigate through fields and action buttons in document order.
  - Show/hide toggle is keyboard-accessible and does not submit the form.
- Screen reader behavior: phase transition (to sent state) is announced via a live region. Field errors are linked via `aria-describedby`. Password strength updates are announced via `aria-live="polite"`. Form-level errors use `role="alert"`.
- Motion: phase transitions and error appearances use short durations; reduced motion suppresses them.

---

## 5. Accessibility Requirements

- Each input has an associated label linked via `for`/`id` or `aria-labelledby`.
- Password fields have `type="password"` by default; show/hide toggle changes to `type="text"` with `aria-label` update.
- Show/hide toggle has `aria-pressed` reflecting current state.
- Required fields have `aria-required="true"`.
- Confirm password field is linked to any mismatch error via `aria-describedby`.
- Password strength indicator has `aria-live="polite"` for real-time updates.
- Form-level errors use `role="alert"`.
- All elements meet WCAG AA contrast (4.5:1 text, 3:1 UI components).
- Reduced motion: no animated transitions when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- Required tokens: input background, input border, input border-focused, input border-error, label color, placeholder color, error text color, button background, button text, strength indicator color scale (weak through strong), link color, surface background.
- Prohibited hardcoded values: no raw colors, no pixel font sizes or spacing.
- Dark mode: strength indicator colors and error states remain visually distinct in dark theme.

---

## 7. Composition Rules

- May be wrapped by: standalone reset page containers, authentication modal flows, onboarding recovery screens.
- May contain: email input (phase 1), password inputs (phase 2), show/hide toggles, strength indicator, submit button, confirmation message area, back/cancel link.
- Anti-patterns:
  - Do not perform password reset API calls or token validation inside this component.
  - Do not combine this with the general account settings password change flow.
  - Do not embed unrelated marketing or promotional content.

---

## 8. Performance Constraints

- Password strength computation is the responsibility of the parent (passed as a prop or derived value); the component only renders the result.
- Field memoization to prevent full-form re-renders on each keystroke.
- No virtualization required.

---

## 9. Test Requirements

- Phase 1: renders email field and submit button; fires submit callback with email on submission.
- Phase 1 sent state: renders confirmation message with the submitted email.
- Phase 1 resend: fires resend callback from the sent state.
- Phase 2: renders new password and confirm password fields.
- Phase 2 submit: fires submit callback with the new password value.
- Mismatched passwords renders an error on the confirm field.
- Password strength indicator renders the correct level when provided.
- Show/hide toggles change input type and update aria-label.
- Submitting state disables inputs and shows loading indicator on the button.
- Error state renders field-level or form-level error messages.
- Keyboard: Enter submits; Tab order is correct; show/hide toggle does not submit.
- Accessibility: no axe violations; all inputs have accessible labels; errors are announced; strength is announced.
- Reduced motion: no animation when `prefers-reduced-motion` is active.
