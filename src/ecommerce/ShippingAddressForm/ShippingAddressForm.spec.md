# Component Spec — ShippingAddressForm

## 1. Purpose

Provides the UI for collecting a shipping address — recipient name, address lines, city, state/region, postal code, and country — as part of the checkout flow or an address management screen.

Use when: a user must enter or edit a shipping address during checkout, or when managing saved addresses in their account.

Do NOT use for: billing address fields in isolation (though it may be reused for billing), profile contact info, or any non-address data entry.

---

## 2. UX Intent

- Primary interaction goal: collect a complete, valid postal address from the user with minimal effort and error.
- Expected user mental model: a standard address form — a familiar, stable UI pattern users encounter across commerce and government services (Jakob's Law).
- UX laws applied:
  - Tesler's Law: the component handles field ordering, label association, and validation messaging; the consumer provides values and callbacks.
  - Fitts's Law: each input field spans the full available width (or a defined portion on wider screens) to maximize the tap/click target.
  - Hick's Law: country/state selection uses a searchable select or pre-filtered list to reduce the number of visible options at once.
  - Progressive disclosure: address line 2 (apartment, suite) is optional and may be initially hidden behind a "Add line 2" link to reduce visual complexity.

---

## 3. Visual Behavior

- Layout: a vertically stacked set of form fields within a single column, with some fields sharing a row on wider layouts (e.g., city and postal code on the same row).
- Field order follows postal conventions for the selected country (e.g., city before state/province for US; different order for other locales).
- Country selector appears first or last depending on locale convention; changing it may reorder/relabel other fields dynamically.
- Address line 2 is optional; it may be collapsed behind a toggle link initially.
- Field labels are visible above each input; no placeholder-only labeling.
- Spacing: consistent field gap and label-to-input spacing using space tokens.
- Typography: labels use a body/label token; input values use a body token; helper text uses a body-small token; error messages use a body-small token with semantic error color.
- Token usage: all input surfaces, borders, label colors, error colors, and focus rings from theme tokens.
- Responsive: full-width single-column on mobile; some fields share rows on wider breakpoints.

---

## 4. Interaction Behavior

- States per field: idle, focused, filled, invalid (inline error shown on blur), disabled.
- Overall form state: idle, submitting (disabled, loading), error (submission or validation failure).
- The form is controlled: the parent owns all field values and receives `onChange` and `onSubmit` callbacks.
- Inline validation on blur; form-level validation on submit.
- Country change may cause other fields to update labels, ordering, or validation rules.
- Keyboard behavior:
  - Tab moves forward through fields in document order.
  - Shift+Tab moves backward.
  - Enter in a single-line field advances to the next field.
  - Country and state selects support keyboard navigation (arrow keys, type-to-search).
- Screen reader behavior: each field has a programmatically associated label; errors are announced via `aria-live="assertive"`.
- Motion: no transition animations on field interactions; reduced motion has no impact.

---

## 5. Accessibility Requirements

- Every input field has a visible label associated via `htmlFor` / `aria-labelledby`.
- Required fields are marked with `aria-required="true"` and a visible indicator.
- Validation errors are associated with their field via `aria-describedby` and announced via `aria-live="assertive"`.
- Country and state/region selects have accessible labels and support keyboard navigation.
- Optional "Add address line 2" toggle is focusable and announced as a button.
- Contrast: all labels, input text, placeholder text, and error messages meet WCAG AA.
- Reduced motion: no animated field effects.

---

## 6. Theming Rules

- Required tokens: `background` (input surface), `borderColor` (input border), `color` (label and value text), `placeholderColor`, semantic error token, focus ring token, body-small type token for helper/error text.
- Prohibited hardcoded values: no raw colors, no hardcoded pixel-based field heights or spacing outside the token scale.
- Dark mode: all input surfaces, labels, borders, and error states must resolve via theme tokens.

---

## 7. Composition Rules

- What can wrap it: CheckoutForm, an address management modal/screen, a registration flow.
- What it may contain: text input fields (name, address lines, city, postal code), country select, state/region select or input, and optional helper text elements.
- Anti-patterns:
  - Do not embed payment or non-address fields inside ShippingAddressForm.
  - Do not use placeholder text as the sole label for any field.
  - Do not hardcode country or state lists inside the component — accept them as props.

---

## 8. Performance Constraints

- Country and state lists may be large; use a virtualized or searchable select component to handle long lists without rendering all options.
- Memoize stable callbacks and field components to avoid full form re-renders on single field changes.
- Validation should not block the main thread — pure synchronous validation only, no async field checks.

---

## 9. Test Requirements

- Renders all expected fields: first name, last name, address line 1, optional address line 2, city, state/region, postal code, country.
- Address line 2 is hidden initially and revealed by pressing "Add address line 2".
- Controlled: changing any field calls `onChange` with the updated value.
- Blurring a required empty field shows an inline validation error associated with that field.
- Validation errors are announced via `aria-live`.
- Submitting with valid data calls `onSubmit` with the collected values.
- Submitting with invalid data shows validation errors and does not call `onSubmit`.
- All fields have programmatically associated visible labels.
- Country select updates available state/region options when changed.
- Tab order follows visual document order.
- Passes automated accessibility audit.
