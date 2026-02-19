# Component Spec — HelperText

## 1. Purpose

Displays supplementary guidance text beneath a form field to help users understand the expected input format, constraints, or context — without indicating an error condition.

Use when: a form field requires additional instruction beyond its label (e.g., format hints, length limits, example values, context notes).

Do NOT use when: communicating a validation error (use InlineError), or when the message is a global form-level notice (use Alert or Banner).

---

## 2. UX Intent

- Primary interaction goal: reduce form completion errors by proactively informing users about field expectations before they encounter validation failures.
- Expected user mental model: a hint or caption below a form field — familiar from signup forms, search filters, and settings pages.
- UX laws applied:
  - Tesler's Law: HelperText surfaces complexity (format rules, constraints) at the point of input, so users do not have to guess.
  - Gestalt (Proximity): positioned immediately below its associated input, clearly linking it to that field.
  - Doherty Threshold: visible from the moment the field is rendered, not only after interaction.

---

## 3. Visual Behavior

- Layout: single line or multi-line text block positioned directly below the associated input within a FieldWrapper.
- Typography: uses a caption scale token; smaller than the input text and field label.
- Color: uses a muted/secondary text color token — clearly readable but visually subordinate to the label and input.
- Spacing: top margin from the input driven by a space token; no bottom margin (controlled by the parent FieldWrapper gap).
- Token usage: text color, and optionally an icon color if an icon accompanies the text.
- Responsive behavior: wraps naturally within the container width; no truncation.

---

## 4. Interaction Behavior

- The HelperText is entirely non-interactive.
- It does not respond to hover, focus, or keyboard events.
- Screen reader behavior: read as plain text; associated with the input via `aria-describedby` on the input element so it is announced when the input receives focus.
- Motion rules: no animation; renders statically.

---

## 5. Accessibility Requirements

- ARIA: has an `id` so the associated input can reference it via `aria-describedby`. No additional ARIA roles are required.
- Focus: not focusable.
- Contrast: helper text color must meet WCAG AA contrast ratio (4.5:1 for small text) against its background.
- Reduced motion: no animation to suppress.

---

## 6. Theming Rules

- Required tokens: helper text color (muted/secondary), optional icon color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel font sizes, or margin values.
- Dark mode: muted text token must remain legible and distinct from error text in dark mode.

---

## 7. Composition Rules

- What can wrap it: FieldWrapper.Helper slot, or directly below a form input.
- What it may contain: plain text content; optionally an inline icon preceding the text.
- Anti-patterns:
  - Do not use HelperText to display validation errors (use InlineError).
  - Do not use HelperText for critical instructions that must not be missed (surface those in the Label or a tooltip instead).
  - Do not place HelperText above the input; it must be below.

---

## 8. Performance Constraints

- Memoization: HelperText is a leaf display component; it should not re-render unless its text content changes.
- Virtualization: not applicable.
- Render boundaries: no internal state or data subscriptions.

---

## 9. Test Requirements

- Render: HelperText renders with the provided text content.
- Accessibility: the element has an `id` that can be referenced by `aria-describedby` on its associated input; text meets contrast requirements.
- Theming: muted text color token applies; no hardcoded colors; dark mode token resolves correctly.
- No interaction: HelperText is not focusable and does not respond to pointer or keyboard events.
