# Component Spec — ThreadComposer

## 1. Purpose

Provides the interface for creating a new community thread, including fields for the thread title, body content, tag selection, and submission controls.

Use when: A user is authoring a new thread or post in a community context.

Do NOT use when: The user is replying to an existing thread (use a reply composer), or the context does not support user-generated thread creation.

---

## 2. UX Intent

- Primary interaction goal: Enable users to compose and submit a new thread with minimal friction, providing clear structure for required fields and helpful affordances for optional enrichment (tags).
- Expected user mental model: A familiar post-creation form similar to Reddit's post composer or Discourse's topic editor — a clear title field, a rich body area, and a tag selector before submitting.
- UX laws applied:
  - Tesler's Law: Complexity that cannot be eliminated (title required, tags optional) must be presented simply — required fields are visually prominent; optional fields are clearly labeled as optional.
  - Hick's Law: Minimize decision points at submission — the submit button should be the only primary action; secondary options (save draft, cancel) are secondary.
  - Doherty Threshold: Validation feedback (e.g., title too short) must appear without perceptible delay after the user interacts.

---

## 3. Visual Behavior

- Layout: Vertical stack. Title input at the top (full width). Body content area below (multi-line, expandable). Tag selector row. Action row at the bottom (Cancel, Submit).
- Spacing: Consistent vertical gap between form fields using spacing tokens. Action row has additional top spacing to separate it from the form fields.
- Typography: Field labels use body medium weight. Placeholder text uses muted/secondary text color token. Error messages use the error color token and small text token.
- Token usage: Input background, input border, input focus border, error border/text color, submit button colors, cancel button colors, tag chip colors — all from theme tokens.
- Responsive behavior: Full-width layout on all breakpoints. On mobile, the composer may occupy a modal or bottom sheet. The body textarea expands vertically as the user types (auto-grow).

---

## 4. Interaction Behavior

- States:
  - Idle (empty): All fields empty, submit button disabled.
  - Partially filled: Title has content, submit becomes enabled. Body and tags are optional.
  - Validation error: Required field missing or invalid input; inline error messages appear below the relevant field.
  - Submitting: Submit button shows a loading indicator; all fields are disabled.
  - Submit success: Form resets or the parent navigates away — no persistent success state in the component itself.
- Controlled vs uncontrolled: May support both patterns. Uncontrolled default with optional controlled overrides for title, body, and selected tags.
- Keyboard behavior: Tab moves through fields in logical order (title → body → tags → cancel → submit). Enter in the title field focuses the body. Shift+Enter in the body inserts a newline. Enter on the submit button submits the form.
- Screen reader behavior: All fields have associated labels (not just placeholders). Validation errors are announced via `aria-live` regions. The submit button communicates its disabled state.
- Motion rules: Textarea auto-grow animates smoothly. Error messages fade in. Reduced motion: instant transitions.

---

## 5. Accessibility Requirements

- ARIA requirements: Each input has an explicit `<label>` association (not placeholder-only). Error messages are linked to their inputs via `aria-describedby`. The submit button has `aria-disabled="true"` when the form is not submittable. A `role="alert"` or `aria-live="polite"` region announces validation feedback.
- Focus rules: On mount, focus is placed on the title input. On validation error, focus moves to the first invalid field. On successful submission, focus management is delegated to the parent.
- Contrast expectations: All input text, labels, placeholder text, and error messages meet WCAG AA contrast ratios.
- Reduced motion behavior: Auto-grow animation and error message fade are suppressed.

---

## 6. Theming Rules

- Required tokens: input background, input border color, input focus border color (accent), error color token, input text color, placeholder text color, label text color, submit button primary background, submit button primary text, cancel button background, cancel button text, spacing tokens, border radius token for inputs and buttons.
- Prohibited hardcoded values: No hardcoded colors, pixel dimensions, or font sizes.
- Dark mode expectations: Input backgrounds use dark surface tokens. Focus borders use dark accent tokens. Error color token remains semantically red/error in dark mode.

---

## 7. Composition Rules

- What can wrap it: Placed on a dedicated "New Thread" page, or within a modal/sheet triggered from a community page or `CommunityHeader` action.
- What it may contain: A title input, a body textarea (optionally rich text), a `TagFilterBar`-style tag selector (multi-select), and form action buttons.
- Anti-patterns:
  - Do not embed thread submission API calls inside this component.
  - Do not use placeholders as the only labeling mechanism for inputs.
  - Do not block the submit button based on body content length — only title is required.
  - Do not use this component for reply composers — it is for new thread creation only.

---

## 8. Performance Constraints

- Memoization rules: The composer does not need aggressive memoization as it is a single-instance form. The tag selector sub-component should be memoized.
- Virtualization: Not applicable.
- Render boundaries: No submission logic inside this component. All submission handling is delegated to the parent via a callback.

---

## 9. Test Requirements

- What must be tested:
  - Renders all form fields: title, body, tag selector, cancel, submit.
  - Submit button is disabled when title is empty.
  - Submit button is enabled when title has content.
  - Validation error messages appear for empty required fields on submit attempt.
  - Submitting state disables all inputs and shows loading on the submit button.
- Interaction cases:
  - Tab navigation flows through all fields and actions in correct order.
  - Enter in title field focuses body.
  - Shift+Enter in body inserts a newline.
  - Cancel button fires the cancel callback.
  - Submit button fires the submit callback with form data.
- Accessibility checks:
  - All inputs have explicit labels.
  - Error messages are linked via `aria-describedby`.
  - Validation errors are announced via `aria-live`.
  - Submit button `aria-disabled` reflects disabled state.
  - Focus moves to first invalid field on error.
  - Reduced motion: auto-grow and error animations suppressed.
