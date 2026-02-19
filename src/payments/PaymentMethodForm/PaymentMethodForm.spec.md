# Component Spec — PaymentMethodForm

## 1. Purpose

Provides a structured form layout for collecting payment method information (card number, expiry, CVC, billing address) to add or update a payment method on an account.

Use it when a user adds a new payment method or edits an existing one from billing settings or an upgrade flow.

Do NOT use it for processing payments directly (payment processing is handled by the parent/payment gateway), for read-only display of saved payment methods (use SavedPaymentMethodsList), or as an inline widget without form structure.

---

## 2. UX Intent

- Primary interaction goal: data entry — the user fills in payment details accurately and submits the form with confidence.
- Expected user mental model: a checkout form similar to those seen in Stripe Elements, PayPal, or Shopify checkout. The user expects clear field labels, inline validation, and a secure-feeling form.
- UX laws applied:
  - Tesler's Law: payment form complexity (card format, expiry format, CVC) is absorbed by the component with inline formatting hints and validation.
  - Hick's Law: present only the fields required for the payment method type; do not add optional fields unless necessary.
  - Doherty Threshold: validation feedback must appear within 400ms of field blur or submission attempt.
  - Fitts's Law: all input fields must have adequate tap height on mobile.

---

## 3. Visual Behavior

- Layout: a vertical stack of labeled input fields. Card number, expiry, and CVC may be laid out in a row on wider viewports. Billing address fields are stacked below.
- Spacing: consistent vertical gap between fields using space tokens. Label-to-input spacing uses space tokens.
- Typography: field labels use a label scale. Input text uses a body scale. Helper/hint text uses a caption scale. Validation error text uses a caption scale in a destructive/error color.
- Token usage:
  - Input borders: border token (default), accent token (focus), destructive token (error).
  - Input background: surface or input-surface token.
  - Label text: primary foreground token.
  - Helper/hint text: secondary foreground token.
  - Error text: destructive/error semantic token.
  - Submit button: primary accent token.
- Responsive behavior: on narrow viewports, all fields stack full-width. On wider viewports, card number/expiry/CVC may be in a multi-column row.

---

## 4. Interaction Behavior

- States:
  - Empty: all fields empty, submit disabled (or enabled with validation on submit).
  - Focused: the focused field shows an accent border.
  - Filled: field contains a valid value.
  - Invalid: field shows an error border and inline error message.
  - Submitting: all fields disabled, submit button shows loading state.
  - Success: form is reset or replaced by a success message (parent controls this).
  - Error (server): a banner or top-level error message displayed above the form.
- Controlled vs uncontrolled: the form may be uncontrolled (internal state) with an `onSubmit(values)` callback, or fully controlled via value/onChange props on each field. Validation is performed within the component for format rules (card number length, expiry format) with business validation left to the parent.
- Keyboard behavior: Tab progresses through each field in reading order. Shift+Tab reverses. Enter on the submit button submits the form.
- Screen reader behavior: each field has a visible and programmatic label. Error messages are associated with their field via `aria-describedby`. A global error (server error) is announced via `aria-live="assertive"`.
- Motion rules: field focus border transition uses a short color transition. Error message appearance uses a short fade-in. Suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: each input has an associated `<label>`. Error messages use `aria-describedby` on their input. The form has an accessible name via `aria-label` or a heading. Submit button has a descriptive label. Global error uses `aria-live="assertive"`.
- Focus rules: on mount, focus moves to the first empty required field (or remains on the trigger). On error, focus moves to the first invalid field.
- Contrast expectations: all labels, placeholder text, error text, and input text meet WCAG AA. Placeholder text meets a minimum contrast ratio (3:1 per WCAG 1.4.3 non-text contrast for UI components).
- Reduced motion behavior: all transitions on field focus and error appearance are instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: input surface, input border (default, focus, error), primary text, secondary text, destructive/error, primary accent (for submit button), space tokens (field gap, label-to-input spacing, padding), radius tokens (input border-radius).
- Prohibited hardcoded values: no raw hex colors, no pixel-based dimensions, no hardcoded font sizes.
- Dark mode expectations: input surfaces must be distinguishable from the form background in dark mode. Error and focus states must remain visually clear in dark mode.

---

## 7. Composition Rules

- What can wrap it: billing settings pages, UpgradeModal, add payment method dialogs/sheets.
- What it may contain: labeled Input primitives for card fields, a billing address section (country Select, postal code Input), and a submit button. An optional saved card selector may appear above the form.
- Anti-patterns:
  - Do not embed payment processing logic inside this component.
  - Do not add non-payment fields to this form.
  - Do not use PaymentMethodForm for displaying saved methods — use SavedPaymentMethodsList.

---

## 8. Performance Constraints

- Memoization rules: memoize field subcomponents to prevent full re-renders on each keystroke.
- Virtualization: not applicable.
- Render boundaries: the component does not perform API calls. Submission is handled by the `onSubmit` callback. Any tokenization of card data (e.g., Stripe.js) is the responsibility of the parent.

---

## 9. Test Requirements

- What must be tested:
  - All required fields render with visible labels.
  - Submitting with empty required fields shows validation errors.
  - Entering an invalid card number shows an inline error.
  - Entering a valid card number clears the error.
  - Submit button calls `onSubmit` with the correct field values when form is valid.
  - Submitting state disables all fields and shows a loading indicator.
  - Server error message renders when an error prop is provided.
- Interaction cases:
  - Tab navigation progresses through all fields in order.
  - Focus moves to the first invalid field after a failed submit.
- Accessibility checks:
  - Each input has an associated label.
  - Error messages are associated via `aria-describedby`.
  - Global error is announced via assertive live region.
  - Contrast passes for all states in both themes.
  - Focus moves correctly after validation failures.
