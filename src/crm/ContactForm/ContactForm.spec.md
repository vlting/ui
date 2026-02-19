# Component Spec — ContactForm

## 1. Purpose

Provides a form for creating or editing a CRM contact record, with fields for name, company, email, phone, title, and other relevant contact attributes. Supports both create and edit modes.

Use when: A user needs to add a new contact or update the details of an existing contact in the CRM.

Do NOT use when: The contact record is being viewed in read-only mode (use a contact profile display), or the context is a different entity type (use `DealCard` form or lead form for those entities).

---

## 2. UX Intent

- Primary interaction goal: Minimize friction for capturing and updating contact information accurately, with clear field organization and inline validation feedback.
- Expected user mental model: A standard data entry form similar to contact forms in Salesforce, HubSpot, or a mobile contacts app — organized field groups (basic info, contact details, company info) with a clear save/cancel action.
- UX laws applied:
  - Tesler's Law: Required fields are clearly marked; optional fields are labeled as such to reduce user anxiety about completeness.
  - Hick's Law: Fields are organized into logical groups to reduce the cognitive cost of form completion.
  - Doherty Threshold: Validation feedback appears without perceptible delay after field interaction (on blur or on change).

---

## 3. Visual Behavior

- Layout: Vertical stack of labeled field groups. Fields within a group may be arranged in a two-column grid on wider viewports (e.g., First Name / Last Name side-by-side). A sticky or fixed action row at the bottom (or top) with Save and Cancel buttons.
- Spacing: Consistent vertical gap between fields and field groups using spacing tokens. Field groups may have a section heading and a slightly larger gap between groups.
- Typography: Field labels use a medium body weight token. Input values use a regular body token. Error messages use the error color token and a small text token. Section headings use a small heading or label token.
- Token usage: Input background, input border, input focus border, error color, label color, placeholder text color, section heading color — all from theme tokens.
- Responsive behavior: Two-column field layout collapses to single-column on narrow viewports. Form fills the available container width.

---

## 4. Interaction Behavior

- States:
  - Create mode: All fields empty; submit button labeled "Add Contact" or equivalent.
  - Edit mode: Fields pre-populated with existing contact data; submit button labeled "Save Changes" or equivalent.
  - Validation error: Invalid or missing required fields show inline error messages.
  - Submitting: All fields disabled; submit button shows a loading indicator.
  - Submit success: Handled by the parent (navigation or toast); the form does not manage its own success state.
- Controlled vs uncontrolled: May support both patterns. Uncontrolled by default; controlled mode available for edit scenarios where the parent manages field values.
- Keyboard behavior: Tab moves through fields and buttons in logical order (top to bottom, left to right in multi-column layouts). Enter in single-line fields moves to the next field. Enter in the submit button submits the form.
- Screen reader behavior: Each field has an explicit label. Required fields are communicated via `aria-required`. Error messages are linked to their fields via `aria-describedby` and announced via `aria-live`.
- Motion rules: Error messages fade in on validation. Reduced motion: instant appearance.

---

## 5. Accessibility Requirements

- ARIA requirements: Each input has an explicit `<label>`. Required fields use `aria-required="true"`. Error messages are linked via `aria-describedby` and enclosed in an `aria-live="polite"` region. The submit button communicates its disabled/pending state via `aria-disabled`.
- Focus rules: On mount (create mode), focus is placed on the first field. On validation error after submit attempt, focus moves to the first invalid field. On successful save, focus management is delegated to the parent.
- Contrast expectations: Labels, input text, placeholder text, and error messages all meet WCAG AA contrast against the form background.
- Reduced motion behavior: Error message fade-in animations are suppressed.

---

## 6. Theming Rules

- Required tokens: input background, input border color, input focus border color (accent), error color token, label text color, placeholder text color, section heading color, submit button primary colors, cancel button colors, spacing tokens, border radius token for inputs.
- Prohibited hardcoded values: No hardcoded colors, pixel sizes, or font sizes.
- Dark mode expectations: Input backgrounds use dark surface tokens. Focus and error color tokens adapt to dark mode variants.

---

## 7. Composition Rules

- What can wrap it: Placed on a dedicated "New Contact" or "Edit Contact" page, or within a modal/drawer triggered from a `ContactCard` action.
- What it may contain: Grouped labeled inputs for name, company, email, phone, title, and additional custom fields. An action row with Save and Cancel buttons.
- Anti-patterns:
  - Do not embed contact API submission logic inside this component.
  - Do not use placeholder text as the sole field label.
  - Do not make all fields required — respect the minimal required set (e.g., first name or email).
  - Do not use this form for deal or lead records.

---

## 8. Performance Constraints

- Memoization rules: Individual field components should be memoized to prevent unnecessary re-renders on unrelated field changes.
- Virtualization: Not applicable.
- Render boundaries: No API calls inside this component. All submission handling is via callbacks.

---

## 9. Test Requirements

- What must be tested:
  - Renders all expected fields in create mode (empty) and edit mode (pre-populated).
  - Required field validation shows inline errors when the form is submitted with empty required fields.
  - Submitting state disables all inputs and shows loading on the submit button.
  - Cancel button fires the cancel callback.
  - Submit button fires the submit callback with the correct form data.
- Interaction cases:
  - Tab moves through all fields in correct order.
  - Validation errors appear on blur and on submit attempt.
  - Focus moves to the first invalid field on submit error.
  - Enter on submit button triggers submission.
- Accessibility checks:
  - All inputs have explicit label associations.
  - Required fields have `aria-required="true"`.
  - Error messages are linked via `aria-describedby` and announced via `aria-live`.
  - Submit button `aria-disabled` reflects state correctly.
  - Contrast passes for all text elements.
  - Reduced motion: error animations suppressed.
