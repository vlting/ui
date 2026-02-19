# Component Spec — LoginForm

## 1. Purpose

LoginForm presents the credential entry UI for password-based authentication. It collects an identifier (email or username) and a password, and surfaces the primary sign-in action along with supporting entry points (forgot password, alternate sign-in methods).

Use it as the primary authentication entry point for any screen or page requiring credential-based login.

Do NOT use it for social/OAuth-only flows (use a dedicated OAuth entry point), for MFA challenges (use MFAForm), or for account registration (use SignupForm).

---

## 2. UX Intent

- Primary interaction goal: minimize the time and steps required for a returning user to authenticate successfully.
- Expected user mental model: two fields (identifier + password) and a "Sign in" button — the most familiar authentication pattern in software (Jakob's Law).
- UX laws applied:
  - Jakob's Law: follow established login form conventions; do not invent non-standard layouts.
  - Hick's Law: minimize the number of choices on the form; secondary actions (forgot password, sign up) are visually de-emphasized.
  - Fitts's Law: the primary submit button spans full width or is at least 44pt tall for easy tapping.
  - Doherty Threshold: inline validation feedback appears within 400ms of blur; form-level errors appear immediately on submission failure.
  - Tesler's Law: complexity (credential validation, network errors) is handled by the system and surfaced clearly without burdening the user.

---

## 3. Visual Behavior

- Layout: single-column vertical stack — identifier field, password field, "Forgot password?" link, submit button, optional divider, alternate sign-in actions.
- Field labels sit above their inputs.
- The password field includes a show/hide toggle icon inside the input.
- The submit button is full-width or prominently wide.
- A form-level error banner appears above the fields (or below the heading) when authentication fails.
- Inline field errors appear below the relevant field.
- Loading state on the submit button shows a spinner and disables all inputs.
- Spacing between elements uses space tokens; no hardcoded gaps.
- Max-width is constrained for readability on wide screens; the form is centered on the page.

---

## 4. Interaction Behavior

- States: idle, filling, submitting, error (field-level and form-level), success.
- The password show/hide toggle is always reachable via keyboard and does not submit the form.
- Controlled: field values and error messages are passed as props; submission is delegated via callback.
- Keyboard behavior:
  - `Tab` / `Shift+Tab` navigate through identifier, password, show/hide toggle, "Forgot password?" link, submit button.
  - `Enter` in any field submits the form.
  - `Space` or `Enter` on show/hide toggle toggles password visibility without submitting.
- Screen reader behavior: each field announces label, value, and any error. The form-level error is announced via `role="alert"` on appearance. Submit button announces "Sign in" and its disabled state during loading.
- Motion: loading spinner entrance, error banner entrance use short transitions; respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- Each input has an associated label linked via `for`/`id` or `aria-labelledby`.
- Password field has `type="password"` by default; toggling to `type="text"` for show-mode.
- Show/hide toggle has `aria-label` ("Show password" / "Hide password") and `aria-pressed` reflecting state.
- Required fields have `aria-required="true"`.
- Field error messages are linked to their inputs via `aria-describedby`.
- Form-level error has `role="alert"` to announce on appearance.
- Submit button has `aria-busy="true"` and `aria-disabled="true"` while submitting.
- All elements meet WCAG AA contrast (4.5:1 for text, 3:1 for UI components).
- Reduced motion: no animated transitions when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- Required tokens: input background, input border, input border-focused, input border-error, label color, placeholder color, error text color, button background, button text, link color, form surface background, divider color.
- Prohibited hardcoded values: no raw colors, no pixel font sizes, no inline spacing values.
- Dark mode: all tokens resolve correctly; error states remain visually distinct in dark theme.

---

## 7. Composition Rules

- May be wrapped by: authentication page containers, modal dialogs presenting login inline, onboarding flows.
- May contain: text inputs (identifier, password), show/hide toggle, "Forgot password?" link, submit button, optional OAuth/alternate sign-in action area, optional sign-up prompt.
- Anti-patterns:
  - Do not perform authentication network requests inside this component.
  - Do not use this form for MFA or password reset steps.
  - Do not embed unrelated content (marketing copy, imagery) inside the form.

---

## 8. Performance Constraints

- Each field should be independently memoized to prevent full-form re-renders on every keystroke.
- Validation logic should be debounced on change events (minimum 300ms); always run immediately on blur.
- The component must not retain sensitive input values in component state beyond what is necessary for rendering.

---

## 9. Test Requirements

- Renders identifier and password fields with correct labels.
- Submit button is present and labeled "Sign in" (or equivalent).
- Fires the submit callback with identifier and password values on form submission.
- "Forgot password?" link fires its callback or navigates as configured.
- Password show/hide toggle changes input type and updates its own aria-label.
- Form-level error message renders and is announced when provided.
- Field-level error messages render adjacent to their fields when provided.
- Submitting state disables inputs and shows loading indicator on the button.
- Keyboard: Enter submits from any field; Tab order is correct.
- Accessibility: no axe violations; all inputs have accessible labels; error messages are announced.
- Reduced motion: no animation when `prefers-reduced-motion` is active.
