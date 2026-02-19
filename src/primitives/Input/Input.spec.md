# Component Spec — Input

## 1. Purpose

Provides a single-line text input control for collecting short-form user text — names, emails, search queries, codes, and other single-line values.

Use it as the foundational text field primitive inside forms, search bars, inline editors, and filter controls.

Do NOT use it for multi-line text (use TextArea), for rich text (use a rich text editor), for numeric-only inputs without text interpretation needs, or for passwords without the appropriate `type="password"` variant.

---

## 2. UX Intent

- Primary interaction goal: text entry — the user types a value into the field.
- Expected user mental model: a standard HTML text input. The user knows to tap/click, type, and expect visible text.
- UX laws applied:
  - Tesler's Law: the input absorbs complexity of focus management, placeholder behavior, error state rendering, and label association so consumers need only provide a label and value.
  - Fitts's Law: the input must have a minimum height meeting the 44pt touch target requirement on mobile.
  - Doherty Threshold: focus visual feedback (border color change) must appear immediately (within one animation frame).

---

## 3. Visual Behavior

- Layout: full-width of its container by default. A `size` variant adjusts height and font size proportionally.
- Spacing: internal horizontal and vertical padding from space tokens. Label is above the input (not inline/floating).
- Typography: input text uses a body scale. Placeholder text uses the same scale in a muted/secondary color. Label uses a label scale. Helper/hint text uses a caption scale below the input. Error text uses a caption scale in a destructive color.
- Token usage:
  - Default border: border token.
  - Focus border: accent/primary token (ring or border).
  - Error border: destructive/error token.
  - Input background: input-surface or surface token.
  - Placeholder text: secondary/muted foreground token.
  - Input text: primary foreground token.
  - Disabled background: muted surface token.
  - Disabled text: muted foreground token.
- Responsive behavior: full-width within its container at all breakpoints. Font size does not change responsively (use `size` prop instead).

---

## 4. Interaction Behavior

- States:
  - Empty: placeholder text visible.
  - Focused: accent/primary border or ring; placeholder remains until typing begins.
  - Filled: input contains text; focus border visible while focused.
  - Disabled: muted appearance; not interactive; value is visible but not editable.
  - Read-only: value is visible and selectable but not editable; appears similar to disabled but semantically distinct.
  - Error: error border; error message below.
  - Success: optional success border and message below.
- Controlled vs uncontrolled: supports both. Controlled via `value` / `onChange`. Uncontrolled via `defaultValue`.
- Keyboard behavior:
  - Tab focuses the input.
  - All standard text editing keys work as expected.
  - Escape does not clear the input by default.
  - Enter may submit an enclosing form (native browser behavior).
- Screen reader behavior: the input has an accessible name via an associated `<label>`. Helper text is associated via `aria-describedby`. Error messages are associated via `aria-describedby`. Error state uses `aria-invalid="true"`.
- Motion rules: border/ring color transition on focus uses a short duration from motion tokens. Suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: associated `<label>` element (or `aria-label`). `aria-invalid="true"` when in error state. `aria-describedby` for helper text and error messages. `aria-required="true"` for required fields.
- Focus rules: the input is in the tab order. Focus ring is clearly visible. Clicking the label focuses the input (label association).
- Contrast expectations: input text meets WCAG AA (4.5:1). Placeholder text meets a minimum of 3:1 (WCAG 1.4.3). Borders meet non-text contrast (3:1). Error border meets non-text contrast.
- Reduced motion behavior: focus border transition is instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: input surface, border (default, focus, error, disabled), primary text, muted text (placeholder, disabled), accent (focus border), destructive/error, space tokens (padding, label-to-input gap, input-to-helper gap), radius token, type scale (body for input, label scale, caption scale for helper/error).
- Prohibited hardcoded values: no raw hex colors, no pixel-based heights or paddings, no hardcoded font sizes.
- Dark mode expectations: input surface must be distinguishable from the form/page background in dark mode. Focus and error borders must remain clearly visible against dark surfaces.

---

## 7. Composition Rules

- What can wrap it: forms, filter bars, search bars, dialog content, inline editors. The Label is either a sibling (wrapped in a form field container) or an `aria-label` on the input itself.
- What it may contain: the input control itself; optionally a leading icon, trailing icon, or trailing action button (e.g., clear, reveal password) within the input container.
- Anti-patterns:
  - Do not use Input for multi-line text — use TextArea.
  - Do not use Input without a label (visible or programmatic).
  - Do not use multiple inputs inside a single Input component.
  - Do not rely on placeholder text as a substitute for a label.

---

## 8. Performance Constraints

- Memoization rules: memoize Input instances in large forms or lists of filters where many inputs render simultaneously. Debounce `onChange` handlers in search/filter contexts — this is the consumer's responsibility, not the component's.
- Virtualization: not applicable.
- Render boundaries: pure presentational primitive. No data fetching or side effects.

---

## 9. Test Requirements

- What must be tested:
  - Renders with a label, placeholder, and empty value.
  - Typing updates the displayed value (uncontrolled and controlled modes).
  - Error state renders the error border and error message.
  - Disabled state: input is not interactive, value is visible.
  - `onChange` / `onChangeText` is called with the correct value on each keystroke.
  - Leading and trailing icons render when provided.
- Interaction cases:
  - Tab focuses the input.
  - Clicking the label focuses the input.
  - Typing populates the field.
  - Shift+Tab moves focus backward.
- Accessibility checks:
  - Associated label is present.
  - `aria-invalid="true"` in error state.
  - Error message associated via `aria-describedby`.
  - Helper text associated via `aria-describedby`.
  - `aria-required` is set when required.
  - Placeholder contrast meets 3:1.
  - Text contrast meets WCAG AA.
  - Focus ring is visible.
  - Focus border transition is suppressed under reduced motion.
