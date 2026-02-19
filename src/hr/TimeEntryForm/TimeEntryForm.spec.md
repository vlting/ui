# Component Spec — TimeEntryForm

## 1. Purpose

Provides a structured form for recording time worked against a project, task, or work order — capturing date, start/end time or duration, and optional notes or category. Used in timesheet management, project tracking, and billing systems where employees log their working hours.

Do NOT use this component for payroll calculation display (use PayrollSummaryCard), for scheduling future shifts (use a scheduling form), or for tracking leave/absence (use a leave request form).

---

## 2. UX Intent

- Primary interaction goal: allow employees to record a single time entry quickly and accurately with minimal friction.
- Expected user mental model: a focused mini-form similar to a time tracking app's log dialog — select the date and project, enter start/end times or a duration, optionally add notes, and submit.
- UX laws applied:
  - Hick's Law: expose only the fields necessary for a time entry; avoid cluttering the form with optional advanced fields unless they are frequently used.
  - Tesler's Law: inherent complexity of time entry (date, time range, category, notes) is preserved but presented in the simplest possible layout.
  - Fitts's Law: all form controls (date pickers, time inputs, submit button) must meet minimum touch target size.
  - Doherty Threshold: form submission feedback (success or error) must appear within 400 ms of submit.
  - Jakob's Law: field order (date → time range → category → notes → submit) follows the expected top-to-bottom progression users know from other time tracking tools.

---

## 3. Visual Behavior

- Layout: a vertical stack of labeled form fields followed by a submit button. Optionally, date and time fields may be arranged in a compact horizontal row if space permits.
- Spacing: gap between fields and between field groups uses space tokens. Submit button margin top uses a space token.
- Typography: field labels use a small body or caption scale token. Input text uses the body text scale token. Helper/error text below inputs uses the caption scale token.
- Token usage: field background, border, focused border, error border, button colors, label text, helper text, and disabled colors must all use design tokens.
- Responsive behavior: form remains single-column on small screens. On wider screens, date and time fields may align horizontally in a row. The submit button is full-width on mobile.

---

## 4. Interaction Behavior

- States:
  - Idle: all fields empty or pre-populated with defaults (e.g., today's date).
  - Focused (field): focused field has a visible focus ring.
  - Filled: fields show entered values.
  - Validating: on submit, fields validate; errors surface immediately below the offending field.
  - Submitting: submit button enters loading state; form fields may be disabled during submission.
  - Success: form may reset or show a success message (behavior determined by parent callback).
  - Error (field-level): ValidationMessage appears below the offending field.
  - Error (form-level): a top-level error message appears above the submit button.
  - Disabled: all fields and button non-interactive; reduced opacity.
- Controlled vs uncontrolled: supports both patterns. Controlled mode accepts field values and change callbacks from the parent. Uncontrolled mode manages field state internally and reports the complete entry on submit.
- Keyboard behavior:
  - Tab advances focus through all fields in visual top-to-bottom order, then to the submit button.
  - Enter on the submit button (or within a single-line field) submits the form.
  - Escape does not submit; may trigger a cancel callback if provided.
- Screen reader behavior:
  - All fields have explicit labels associated via standard label/input relationships.
  - Validation errors are announced via `aria-live="assertive"` or equivalent.
  - Submit button state (loading, disabled) is communicated via `aria-disabled` and `aria-busy`.
- Motion rules: no animation required for form interactions. Optional success animation suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA: all inputs have associated labels. The form has a descriptive `aria-label` or heading. Error messages are linked to their inputs via `aria-describedby`. Submit button uses `aria-busy` during loading and `aria-disabled` when disabled.
- Focus rules: form receives focus on mount (or the first field receives focus). After submission error, focus moves to the first field with an error.
- Contrast: all field text, label text, and button text must meet WCAG AA contrast using design tokens.
- Reduced motion: suppress any success/completion animation.

---

## 6. Theming Rules

- Required tokens: field background, field border, focused border, error border, label text, input text, placeholder text, button primary color, button disabled color, error text color, space tokens, typography scale tokens, radius token.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; form fields must remain legible and clearly bounded against dark surfaces.

---

## 7. Composition Rules

- What can wrap it: timesheet management pages, modal dialogs, drawer panels, and dashboard widgets. Must be a descendant of the design system Provider.
- What it may contain: date field, start/end time fields or duration field, category/project selector, notes textarea, and a submit button. Each field uses the appropriate specialized input sub-component (DatePicker, TimePicker, Select, TextArea).
- Anti-patterns:
  - Do not embed time entry persistence API calls inside this component — delegate via onSubmit callback.
  - Do not mix time entry with leave request fields in the same form instance.
  - Do not add non-time-entry business logic fields (e.g., billing rate calculation) without a clearly scoped prop interface.

---

## 8. Performance Constraints

- Memoization: individual field sub-components should be memoized to prevent cross-field re-renders on each keystroke.
- Virtualization: not applicable; the form has a low fixed field count.
- Render boundaries: duration calculations (e.g., auto-computing duration from start/end time) should be performed in a controlled fashion via the parent or a stable callback, not on every render.

---

## 9. Test Requirements

- Rendering: renders correctly in empty state, with pre-populated values, and in disabled state.
- Field entry: entering values in each field updates the field state correctly.
- Validation: submitting with missing required fields surfaces the correct error messages.
- Submission: onSubmit callback fires with correctly structured data when validation passes.
- Loading state: submit button shows loading state during submission; fields are disabled.
- Error recovery: field errors clear when the user corrects the input.
- Keyboard navigation: Tab order follows visual layout; Enter on submit button triggers submission.
- Accessibility: labels, aria-describedby for errors, aria-busy on submit button, live region announcements.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: no success animation when motion is reduced.
