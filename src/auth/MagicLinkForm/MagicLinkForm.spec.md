# Component Spec — MagicLinkForm

## 1. Purpose

MagicLinkForm presents the UI for passwordless authentication via a magic link sent to the user's email address. It collects the user's email, surfaces the send action, and then confirms that the link has been dispatched.

Use it as the primary entry point for passwordless email-based sign-in flows.

Do NOT use it for password-based login (use LoginForm), OTP/code entry (use MFAForm), or non-email passwordless methods.

---

## 2. UX Intent

- Primary interaction goal: reduce authentication friction by requiring only an email address and a single action.
- Expected user mental model: "Enter my email, click send, check my inbox." A single-field form with a clear confirmation state (Jakob's Law for minimal authentication forms).
- UX laws applied:
  - Hick's Law: one field, one action — eliminate all unnecessary choices.
  - Fitts's Law: the submit button is full-width or prominently sized; easy to tap on mobile.
  - Doherty Threshold: confirmation feedback (link sent state) appears immediately after submission, within 400ms.
  - Jakob's Law: the two-phase flow (input → sent confirmation) mirrors established magic link UX from tools like Notion and Slack.

---

## 3. Visual Behavior

- Phase 1 (input): single email field with label, a submit button, and an optional link to return to password login.
- Phase 2 (sent): a confirmation message replacing or appearing below the field, with an icon (envelope or checkmark) and instructional copy ("Check your inbox").
- An option to resend or use a different email is available in phase 2.
- Loading state on the submit button shows a spinner; field and button are disabled.
- Error state shows an inline error below the email field (for invalid format) or a banner (for send failure).
- Layout is single-column; max-width constrained for readability; centered on wide viewports.
- Spacing uses space tokens throughout.

---

## 4. Interaction Behavior

- States: idle, filling, submitting, sent (success), error, resending.
- Transitions between phases are driven by props (controlled pattern); the component does not manage auth state itself.
- Keyboard behavior:
  - `Enter` in the email field submits the form.
  - In the sent phase, "Resend" and "Use a different email" are keyboard-focusable.
  - `Tab` visits all interactive elements in document order.
- Screen reader behavior: phase transition is announced via a live region ("Magic link sent to [email]"). Error messages are announced via `role="alert"`. Submit button announces loading state.
- Motion: phase transition (input-to-confirmation) uses a short fade or slide; reduced motion suppresses animation.

---

## 5. Accessibility Requirements

- Email input has an associated label and `type="email"`.
- Required field has `aria-required="true"`.
- Email field format error is linked via `aria-describedby`.
- Submit button has `aria-busy="true"` while submitting.
- Phase 2 confirmation panel has `role="status"` or uses an `aria-live="polite"` region to announce the sent state.
- Error banner has `role="alert"`.
- All interactive elements meet WCAG AA contrast.
- Reduced motion: phase transition is instant when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- Required tokens: input background, input border, input border-focused, input border-error, label color, placeholder color, error text color, button background, button text, confirmation surface background, confirmation icon color, link color.
- Prohibited hardcoded values: no raw colors, no pixel font sizes or spacing.
- Dark mode: confirmation state and error state remain visually distinct in dark theme.

---

## 7. Composition Rules

- May be wrapped by: authentication page containers, modal dialogs, onboarding flows.
- May contain: email input field, submit button, confirmation message area, resend action, alternate sign-in link.
- Anti-patterns:
  - Do not perform email sending or authentication network requests inside this component.
  - Do not use this component for OTP code entry (that is MFAForm's responsibility).
  - Do not hide the sent confirmation inside a toast; it must be persistent inline feedback.

---

## 8. Performance Constraints

- The component is lightweight (single field); no virtualization or memoization concerns beyond standard props comparison.
- Avoid re-rendering the confirmation panel on every re-render of the parent; memoize the sent-state rendering.

---

## 9. Test Requirements

- Renders the email input and submit button in the initial state.
- Fires the submit callback with the email value on form submission (click or Enter).
- Submitting state disables the field and button and shows a loading indicator.
- Sent state renders the confirmation panel with the submitted email address.
- Resend action fires the resend callback from the sent state.
- "Use a different email" action returns the form to the initial state.
- Email format error renders inline below the field.
- Send failure error renders as a banner or form-level error.
- Accessibility: no axe violations; email input has accessible label; sent state is announced; errors are announced.
- Reduced motion: no animation on phase transition when `prefers-reduced-motion` is active.
