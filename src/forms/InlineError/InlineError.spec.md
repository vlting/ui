# Component Spec — InlineError

## 1. Purpose

Displays a field-level validation error message directly below a form input, communicating precisely which field is invalid and why, using error-semantic styling to draw attention.

Use when: a form field fails validation and the user needs immediate, specific feedback about the nature of the error.

Do NOT use when: communicating a general form-level error (use Alert), a non-error hint or instruction (use HelperText), or a system-level warning (use Banner or Alert).

---

## 2. UX Intent

- Primary interaction goal: pinpoint the exact field that has failed validation and explain what the user must do to correct it.
- Expected user mental model: a red error message below a field — universally understood from login forms, checkout flows, and sign-up pages.
- UX laws applied:
  - Gestalt (Proximity): the error message is placed immediately below its associated input so there is no ambiguity about which field it applies to.
  - Doherty Threshold: error messages appear promptly after field blur or form submission, not after a delay.
  - Pre-attentive processing: error color (danger semantic token) and an optional icon draw immediate attention before the user reads the message.

---

## 3. Visual Behavior

- Layout: single line or multi-line text block positioned directly below the associated input within a FieldWrapper.
- Optional icon: a small error/danger icon to the left of the text.
- Typography: uses a caption scale token; same size as HelperText but with error color token.
- Color: uses a danger/error text color token — clearly distinguishable from helper text and label text.
- Spacing: top margin from the input driven by a space token; no bottom margin (controlled by the parent FieldWrapper gap).
- Token usage: error text color, optional error icon color — both from the danger/error semantic token set.
- Responsive behavior: wraps naturally within the container width; no truncation.

---

## 4. Interaction Behavior

- The InlineError is entirely non-interactive.
- It does not respond to hover, focus, or keyboard events.
- Visibility: conditionally rendered; appears only when an error condition is active.
- Screen reader behavior: associated with the input via `aria-describedby` so the error is announced when the input receives focus. May also use `role="alert"` if the error appears dynamically after initial render to ensure immediate announcement.
- Motion rules: optional fade-in or slide-in animation on appearance; respects reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: has an `id` so the associated input can reference it via `aria-describedby`. When appearing dynamically after interaction, uses `role="alert"` or is placed in an `aria-live="assertive"` region to announce the error immediately.
- Focus: not focusable.
- Contrast: error text must meet WCAG AA contrast ratio (4.5:1 for small text) against its background. Error color must be distinguishable from HelperText color.
- Color alone: error must not be communicated by color alone; the text content itself must describe the error. An optional icon supplements but does not replace the text.
- Reduced motion: appearance animation is suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: error/danger text color, optional error/danger icon color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel font sizes, or margin values.
- Dark mode: error text token must remain legible and clearly distinct from helper text and label text in dark mode.

---

## 7. Composition Rules

- What can wrap it: FieldWrapper.Error slot, or directly below a form input.
- What it may contain: an optional icon slot and an error message text slot.
- Anti-patterns:
  - Do not use InlineError for non-error hints (use HelperText).
  - Do not place InlineError above the input; it must be below.
  - Do not use InlineError for form-level errors (use Alert).
  - Do not render InlineError when there is no error; it should be conditionally absent, not hidden with `display: none`, to avoid ghost ARIA announces.

---

## 8. Performance Constraints

- Memoization: InlineError is a leaf display component; it re-renders only when the error message changes.
- Virtualization: not applicable.
- Render boundaries: no internal state or data subscriptions; visibility is controlled by the parent.

---

## 9. Test Requirements

- Render: InlineError renders with the provided error message and optional icon when an error is present.
- Conditional: InlineError is not rendered (not just hidden) when no error is present.
- Accessibility: element has an `id`; input references it via `aria-describedby`; `role="alert"` or live region is present for dynamic appearance; error text meets contrast requirements.
- Theming: danger/error text token applies; no hardcoded colors; dark mode token resolves correctly and is distinguishable from HelperText.
- No interaction: InlineError is not focusable and does not respond to pointer or keyboard events.
- Reduced motion: appearance animation is suppressed when reduced motion preference is active.
