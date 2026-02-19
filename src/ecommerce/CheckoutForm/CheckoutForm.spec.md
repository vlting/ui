# Component Spec — CheckoutForm

## 1. Purpose

Provides the UI surface for collecting all information required to complete a purchase: shipping address, billing details, payment method, and any applicable promo codes. It is the final data-entry step before an order is placed.

Use when: a user is on the checkout screen and ready to provide or confirm their payment and delivery information.

Do NOT use for: account registration forms, shipping address management outside of checkout, or order confirmation display.

---

## 2. UX Intent

- Primary interaction goal: guide users through checkout data entry quickly and confidently, reducing abandonment.
- Expected user mental model: a structured multi-section form — shipping, billing, payment — that progresses linearly toward a final submit action (Jakob's Law).
- UX laws applied:
  - Tesler's Law: the component absorbs formatting complexity (card number masking, address autocomplete affordance, billing-same-as-shipping toggle) so users fill in minimal fields.
  - Miller's Law: sections are chunked into logical groups (shipping, payment, review) so no single view overwhelms.
  - Hick's Law: payment method options are clearly labeled with familiar logos/names to simplify choice.
  - Doherty Threshold: form validation feedback appears within 400ms of a field blur.

---

## 3. Visual Behavior

- Layout: a vertically scrollable single-column form with distinct labeled sections.
- Section headings use a heading-small type token; field labels use a body/label token.
- A "Billing address same as shipping" toggle reduces the form when enabled.
- Payment method selection presents radio-button-style cards for each available method.
- A promo code input with an "Apply" button may appear in a collapsible section.
- An order summary (BillingSummary) may be adjacent on wider layouts or collapsed behind a toggle on mobile.
- The submit ("Place Order") button is large, prominent, and positioned at the bottom; it must be reachable without scrolling past a sticky footer on mobile.
- Spacing: consistent field and section gaps using space tokens.
- Token usage: field background, border, label, placeholder, error, and button colors all from theme tokens.
- Responsive: single column on mobile; two-column layout (form + order summary sidebar) on tablet and desktop.

---

## 4. Interaction Behavior

- States per field: idle, focused, filled, invalid (with inline error), disabled.
- Overall form states: idle, submitting (Place Order button shows loading, form disabled), error (submission failed — surface a top-level error), success (navigates away or shows confirmation).
- The form is controlled: the parent owns all field values and receives change/submit callbacks.
- Inline field validation on blur; form-level validation on submit attempt.
- "Billing same as shipping" toggle prefills billing fields and hides them.
- Keyboard behavior:
  - Tab moves forward through all fields and controls in document order.
  - Shift+Tab moves backward.
  - Enter in a single-line field advances focus to the next field.
  - Payment method cards are selectable via Enter/Space.
- Screen reader behavior: each field has an associated label; errors are announced live via `aria-live="assertive"`. Success is announced after navigation or in a live region.
- Motion: section transitions (if stepped) respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- Every input has a programmatically associated visible label (`htmlFor` / `aria-labelledby`).
- Required fields have `aria-required="true"` and a visible indicator.
- Validation errors are associated with their field via `aria-describedby` and announced in an `aria-live="assertive"` region.
- The submit button communicates its loading state (`aria-busy="true"` or a descriptive label update).
- Payment method radio group uses `role="radiogroup"` with an `aria-legend` or `aria-label`.
- Contrast: all field labels, input text, placeholder text, and error messages meet WCAG AA.
- Reduced motion: no animated section transitions or field entrance effects.

---

## 6. Theming Rules

- Required tokens: `background`, `borderColor`, `color`, `placeholderColor`, semantic error token, focus ring token, success token, all spacing and radius tokens for field and section layout, primary button tokens for Place Order CTA.
- Prohibited hardcoded values: no raw colors, no hardcoded font sizes or pixel spacing.
- Dark mode: all field surfaces, labels, errors, and buttons must resolve correctly via theme tokens.

---

## 7. Composition Rules

- What can wrap it: a checkout screen layout; may sit alongside BillingSummary on wider breakpoints.
- What it may contain: ShippingAddressForm (or equivalent fields), billing address fields, payment method selector, promo code input, and a submit action button. May embed BillingSummary on wide layouts.
- Anti-patterns:
  - Do not process payments or call APIs inside CheckoutForm — delegate to `onSubmit`.
  - Do not merge cart management controls into CheckoutForm.
  - Do not display order history or confirmation inside CheckoutForm.

---

## 8. Performance Constraints

- Avoid re-rendering the entire form on every keystroke — each section or field should update independently.
- Memoize stable callbacks passed as props.
- Payment method UI (logos, icons) may lazy-load images; use placeholders to prevent layout shift.
- Promo code section may be lazy-rendered until opened.

---

## 9. Test Requirements

- Renders all form sections: shipping address, billing address (or same-as-shipping toggle), payment method, promo code, and submit button.
- Toggling "billing same as shipping" hides billing fields and pre-fills them.
- Submitting with empty required fields shows validation errors associated with the correct fields.
- Validation errors are announced via `aria-live`.
- Submitting with valid data calls `onSubmit` with the collected form values.
- Submit button shows loading state during submission and disables the form.
- Submission error surfaces a top-level error message.
- All fields have programmatically associated labels.
- Payment method group has `role="radiogroup"` with an accessible label.
- Tab order follows visual document order.
- Passes automated accessibility audit.
- No animated transitions when `prefers-reduced-motion` is active.
