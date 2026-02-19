# Component Spec — SignupForm

## 1. Purpose

SignupForm presents the registration UI for creating a new account. It collects the minimum required identity and credential information (e.g., name, email, password) and surfaces the registration action along with links to existing-account sign-in.

Use it as the primary account creation entry point in an authentication flow.

Do NOT use it for existing-user login (use LoginForm), account profile editing after creation (use AuthProfileEditor), or invitation acceptance flows that pre-fill identity information in a separate UI.

---

## 2. UX Intent

- Primary interaction goal: minimize registration friction while collecting sufficient information to create a valid account.
- Expected user mental model: a short vertical form with labeled fields and a prominent create-account button; similar to any mainstream registration screen (Jakob's Law).
- UX laws applied:
  - Hick's Law: collect only the essential fields required at signup; defer optional profile details to post-registration.
  - Fitts's Law: the submit button is full-width or prominently sized; minimum 44pt touch target.
  - Tesler's Law: password strength rules and availability checks are handled by the system; the user only sees actionable feedback.
  - Doherty Threshold: inline validation (format, availability) appears within 400ms of blur or after sufficient input length.
  - Jakob's Law: field order and layout follow established sign-up conventions.

---

## 3. Visual Behavior

- Layout: single-column vertical stack — name field(s), email field, password field, optional terms acceptance checkbox, submit button, link to sign-in.
- Field labels sit above inputs; placeholders are supplementary (not a replacement for labels).
- Password field includes a show/hide toggle.
- An optional password strength indicator appears below the password field.
- A form-level error banner appears at the top of the form when registration fails.
- Inline field errors appear below the relevant input.
- Submitting state shows a spinner on the button and disables all inputs.
- Max-width is constrained; centered on wide viewports.
- Spacing uses space tokens throughout.

---

## 4. Interaction Behavior

- States: idle, filling, submitting, error (field-level and form-level), success.
- Controlled via field value props and `onSubmit` callback; the component does not perform auth.
- Keyboard behavior:
  - `Tab` / `Shift+Tab` navigate through all fields and the submit button in document order.
  - `Enter` in any field submits the form.
  - Show/hide toggle is keyboard-accessible and does not submit the form.
  - Checkbox for terms is toggled with `Space`.
- Screen reader behavior: each field announces label, value, and error. Form-level error is announced via `role="alert"`. Submit button announces loading state via `aria-busy`. Password strength is announced via `aria-live="polite"`.
- Motion: error banner entrance and field error appearances use short transitions; reduced motion suppresses them.

---

## 5. Accessibility Requirements

- Each input has an associated label linked via `for`/`id` or `aria-labelledby`.
- Password field has `type="password"` by default; show/hide toggle changes to `type="text"`.
- Show/hide toggle has `aria-label` ("Show password" / "Hide password") and `aria-pressed`.
- Required fields have `aria-required="true"`.
- Field errors are linked via `aria-describedby`; field in error has `aria-invalid="true"`.
- Password strength indicator uses `aria-live="polite"`.
- Terms checkbox has an associated label and is linked to any error via `aria-describedby`.
- Form-level error has `role="alert"`.
- All elements meet WCAG AA contrast.
- Reduced motion: no animated transitions when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- Required tokens: input background, input border, input border-focused, input border-error, label color, placeholder color, error text color, button background, button text, link color, strength indicator color scale, checkbox active color, surface background.
- Prohibited hardcoded values: no raw colors, no pixel font sizes or spacing.
- Dark mode: error states, strength indicator, and button styles resolve correctly in dark theme.

---

## 7. Composition Rules

- May be wrapped by: authentication page containers, modal dialogs, onboarding flows, invitation acceptance pages.
- May contain: name input(s), email input, password input with show/hide toggle, optional terms checkbox with label/link, submit button, sign-in link, optional OAuth entry points.
- Anti-patterns:
  - Do not perform account creation API calls inside this component.
  - Do not collect non-essential information at signup (defer to profile editors).
  - Do not embed the full terms-of-service content inline; link out instead.

---

## 8. Performance Constraints

- Each field should be independently memoized to prevent full-form re-renders on every keystroke.
- Async validation (e.g., email availability) must be debounced (minimum 300ms) and cancelled on unmount.
- The component must not retain plaintext passwords beyond what is needed for rendering the controlled input.

---

## 9. Test Requirements

- Renders all required fields with correct labels.
- Submit button is present and labeled appropriately ("Create account" or equivalent).
- Fires the submit callback with all field values on form submission.
- Password show/hide toggle changes input type and aria-label.
- Terms checkbox (if present) is toggled with click and Space; unchecked terms prevents submission.
- Field-level errors render adjacent to the relevant field and link via aria-describedby.
- Form-level error banner renders and is announced on registration failure.
- Submitting state disables all inputs and shows a loading indicator.
- Sign-in link is present and fires its navigation callback.
- Password strength indicator renders the correct level when provided.
- Keyboard: Enter submits; Tab order is correct.
- Accessibility: no axe violations; all inputs have accessible labels; errors are announced.
- Reduced motion: no animation when `prefers-reduced-motion` is active.
