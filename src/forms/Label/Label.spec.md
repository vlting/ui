# Component Spec — Label

## 1. Purpose

Provides a visible, accessible text label for a form field, communicating the field's purpose to sighted users and programmatically associating that text with the corresponding input for assistive technologies.

Use when: labeling any form field (text input, select, checkbox, radio, date picker, file uploader, etc.).

Do NOT use when: the label is purely decorative and not associated with an input, or when a section heading (not a field label) is needed (use a heading element instead).

---

## 2. UX Intent

- Primary interaction goal: make every form field's purpose immediately clear, reducing input errors and eliminating the need for users to guess what a field requires.
- Expected user mental model: a field label — the text that appears above or beside an input, indicating what goes in that input.
- UX laws applied:
  - Jakob's Law: follows the universal convention of a label above or to the left of its input.
  - Gestalt (Proximity): the label is positioned immediately adjacent to its associated input, making the relationship obvious without additional explanation.
  - Fitts's Law: on web, the label is a click target that focuses its associated input, extending the effective tap/click area for the field.

---

## 3. Visual Behavior

- Layout: inline or block text element positioned above (default) or beside its associated input.
- Typography: uses a label scale token — slightly smaller than body text but with sufficient weight to distinguish it from helper text and input text.
- Optional required indicator: an asterisk or "required" text in an accent or danger token color when the field is required. This is a visual hint only; the required state must also be communicated programmatically.
- Optional optional indicator: "(optional)" text in a muted token color when explicitly marking optional fields.
- Spacing: bottom margin (from label to input) driven by a space token.
- Token usage: label text color, required indicator color, and optional indicator color sourced from theme tokens.
- Responsive behavior: no layout changes based on viewport; adapts to container width.

---

## 4. Interaction Behavior

- On web: clicking the Label focuses the associated input (native `<label>` behavior or equivalent implementation).
- On native: Label is a display element; it does not intercept touch events.
- Keyboard behavior: Tab does not stop on the Label itself; it moves directly to the associated input.
- Screen reader behavior: the label text is announced when the associated input receives focus. The required state is communicated via `aria-required="true"` on the input (not solely via the asterisk).
- Motion rules: no animation.

---

## 5. Accessibility Requirements

- ARIA: Label must be programmatically associated with its input via `htmlFor`/`id` pairing or `aria-labelledby`. The asterisk or required indicator is decorative (`aria-hidden="true"`); required state is communicated via `aria-required="true"` on the input.
- Focus: the Label itself is not a focus stop; focus goes to the associated input.
- Contrast: label text must meet WCAG AA contrast ratios (4.5:1 for normal text) against its background. Required indicator color must also meet contrast requirements.
- Reduced motion: no animation to suppress.

---

## 6. Theming Rules

- Required tokens: label text color (primary), required indicator color (danger/accent), optional indicator color (muted).
- Prohibited hardcoded values: no hardcoded hex colors, pixel font sizes, or margin values.
- Dark mode: label text and indicator tokens must resolve to accessible, legible values in dark mode.

---

## 7. Composition Rules

- What can wrap it: FieldWrapper.Label slot, or placed directly above a form input.
- What it may contain: the label text string; an optional required indicator slot; an optional tooltip trigger for additional context.
- Anti-patterns:
  - Do not use Label as a section heading (use a heading element).
  - Do not omit a Label for any visible form field; every interactive form field must have an associated label.
  - Do not use placeholder text as a substitute for a Label; placeholders disappear on input and are not reliably announced by all screen readers.
  - Do not place the Label below its associated input.

---

## 8. Performance Constraints

- Memoization: Label is a leaf display component; it should not re-render unless its text content or required state changes.
- Virtualization: not applicable.
- Render boundaries: no internal state or data subscriptions.

---

## 9. Test Requirements

- Render: Label renders with the provided text content.
- Required indicator: required indicator renders when the field is marked required; does not render otherwise.
- Optional indicator: "(optional)" text renders when explicitly provided.
- Association: Label is programmatically associated with its input (via `htmlFor`/`id` or `aria-labelledby`); clicking the Label on web focuses the input.
- Accessibility: label text is announced when the input receives focus; required indicator is `aria-hidden`; required state is on the input, not the label; text meets contrast requirements.
- Theming: label text, required, and optional indicator tokens apply; no hardcoded colors; dark mode tokens resolve correctly.
