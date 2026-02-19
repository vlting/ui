# Component Spec — ExpenseForm

## 1. Purpose

Provides a structured, accessible form layout for capturing the fields required to record a new expense or edit an existing one. This component is a presentation container — it arranges form fields and action controls but does not perform submission, validation logic, or data fetching.

Use when: the user needs to enter or edit expense data including amount, date, category, description, and any other standard accounting fields.

Do NOT use when: displaying a read-only expense detail view — use a card or detail panel instead. Do NOT embed data fetching or form-state management inside this component.

---

## 2. UX Intent

- Primary interaction goal: enable users to quickly and accurately record an expense with the minimum required keystrokes and decisions.
- Expected user mental model: users expect a vertical form with clearly labeled fields, logical tab order, and a prominent submit action at the bottom.
- UX laws applied:
  - **Hick's Law** — expose only the fields required for a typical expense; group advanced or optional fields behind a disclosure or secondary section.
  - **Fitts's Law** — primary action button (submit) must have a large tap/click target, placed at the bottom of the form in the natural reading direction.
  - **Tesler's Law** — the form must handle inherent complexity (e.g., currency formatting, date constraints) internally via field-level affordances so users are not burdened.
  - **Miller's Law** — limit the number of simultaneously visible fields to seven or fewer in the default state.

---

## 3. Visual Behavior

- Layout rules: vertical stack layout; each field occupies its own row with a label above the input; the form container has a defined maximum width token to prevent excessively wide inputs on large screens.
- Spacing expectations: vertical gap between field rows uses a space token from the medium scale; internal field padding is consistent with the design system's input sizing.
- Typography rules: field labels use the label type style token; helper text and error messages use the caption type style token; the form title (if present) uses the heading type style token.
- Token usage: all spacing, color, border radius, and typography reference design tokens exclusively.
- Responsive behavior: on mobile, the form occupies the full available width; on wider breakpoints, it respects the maximum width token and may be centered.

---

## 4. Interaction Behavior

- States:
  - **idle**: all fields in their default unfilled state.
  - **focused**: the active field shows a focus ring using the focus color token.
  - **filled**: fields display the entered value with appropriate formatting.
  - **error**: invalid fields display an error message below the input using the error color token.
  - **loading / submitting**: action button enters a loading state; form fields become non-interactive to prevent duplicate submissions.
  - **disabled**: the entire form may be disabled via a prop, rendering all fields and actions inert.
- Controlled vs uncontrolled: the form layout is uncontrolled — field values and validation state are managed externally and passed via props; this component renders the structure only.
- Keyboard behavior: Tab moves through fields in document order; Shift+Tab reverses; Enter within a single-line field should not submit unless the submit button is focused.
- Screen reader behavior: each field has a visible and programmatically associated label; error messages are announced via `aria-live` or linked via `aria-describedby`; the submit button has a descriptive accessible name.
- Motion rules: field-level error messages fade in using `duration.fast` tokens; form entrance animation (if any) uses `duration.normal` tokens; reduced motion disables all transitions.

---

## 5. Accessibility Requirements

- ARIA requirements: form element has `aria-labelledby` pointing to the form title; each input has an associated `<label>`; error states use `aria-invalid="true"` and `aria-describedby` linking to the error message element.
- Focus rules: on mount, focus is placed on the first field if the form is opened in a modal; focus order strictly follows the visual top-to-bottom layout.
- Contrast expectations: label text and helper text meet WCAG AA (4.5:1) against the form background; error message text meets AA contrast in both light and dark themes.
- Reduced motion behavior: all transitions (error message entrance, loading spinner) are disabled; the component renders in its final state immediately.

---

## 6. Theming Rules

- Required tokens: form background, input background, input border, input border (focus), label text color, error text color, disabled field background, action button tokens (background, text, border).
- Prohibited hardcoded values: no raw hex codes, pixel spacing, or font sizes anywhere in the form layout or field slots.
- Dark mode expectations: input backgrounds and borders must remain visually distinct from the form surface background in dark mode; error color tokens must maintain sufficient contrast.

---

## 7. Composition Rules

- What can wrap it: a modal, sheet, page section, or card.
- What it may contain: field slot components (text inputs, select controls, date pickers, amount inputs), a field group or section divider, a form action row (submit and cancel buttons), and a form-level error/alert slot.
- Anti-patterns:
  - Do not embed API calls, form state management, or validation logic inside this component.
  - Do not hard-code field names or labels — all labels must be supplied via props or slot composition.
  - Do not nest another `ExpenseForm` inside itself.

---

## 8. Performance Constraints

- Memoization rules: the form layout component itself is lightweight; memoization of individual field components is the caller's responsibility when the field list is large.
- Virtualization: not applicable for standard expense forms (field count is low).
- Render boundaries: an error boundary should be placed at the feature level, not inside this component.

---

## 9. Test Requirements

- What must be tested:
  - Renders all provided field slots in the correct visual order.
  - Applies the disabled state to all fields and actions when the `disabled` prop is set.
  - Displays error messages adjacent to the correct fields when error props are provided.
  - The submit action slot is rendered and callable.
- Interaction cases:
  - Tab order follows the visual field sequence.
  - Error messages appear without page scroll when a field is invalid.
- Accessibility checks:
  - All inputs have associated labels.
  - Error messages are linked via `aria-describedby`.
  - `aria-invalid` is set on fields with errors.
  - No contrast violations on labels or error text in light and dark themes.
