# Component Spec — TextArea

## 1. Purpose

Provides a multi-line text input control for collecting longer-form user text — descriptions, comments, messages, notes, and any content that may span multiple lines.

Use it when the expected input exceeds one line or when the user may benefit from seeing multiple lines of their text simultaneously.

Do NOT use it for single-line text (use Input), for rich text editing with formatting controls (use a RichText editor), or for code input (use a code editor component).

---

## 2. UX Intent

- Primary interaction goal: multi-line text entry — the user writes, edits, and reviews a block of text.
- Expected user mental model: a standard HTML textarea. The user expects wrapping text, a resizable or auto-growing area, and standard text editing behaviors.
- UX laws applied:
  - Tesler's Law: TextArea absorbs cross-platform complexity of multi-line input rendering, auto-grow behavior, and resize constraints so consumers need only configure rows and value.
  - Fitts's Law: the TextArea must have a minimum height sufficient for its purpose (at least 2–3 visible lines for the smallest `rows` setting). Touch target for the input itself is its full visible area.
  - Doherty Threshold: auto-grow height changes must animate or adjust within 400ms (or ideally instantly without animation for a seamless typing experience).

---

## 3. Visual Behavior

- Layout: full-width of its container by default. Height is either fixed (via `rows` prop) or auto-growing (via an `autoGrow` prop) to fit content, up to a configurable maximum height.
- Spacing: internal horizontal and vertical padding from space tokens. Label is above the TextArea. Helper/hint text and error text are below.
- Typography: input text uses a body scale. Placeholder text uses the same scale in a muted/secondary color. Label uses a label scale. Helper/error text uses a caption scale.
- Token usage:
  - Default border: border token.
  - Focus border: accent/primary token.
  - Error border: destructive/error token.
  - Input background: input-surface or surface token.
  - Placeholder text: secondary/muted foreground token.
  - Input text: primary foreground token.
  - Disabled background: muted surface token.
  - Disabled text: muted foreground token.
  - Resize handle (web): styled with secondary/muted foreground token. By default, resize is only vertical or disabled. Horizontal resize is disabled.
- Responsive behavior: full-width at all breakpoints. Auto-grow behavior is consistent regardless of viewport size.

---

## 4. Interaction Behavior

- States:
  - Empty: placeholder text visible.
  - Focused: accent/primary border or ring; placeholder remains until typing begins.
  - Filled: content visible; focus border visible while focused.
  - Auto-growing: height increases as the user types beyond the current height, up to a maximum (configurable).
  - Disabled: muted appearance; content visible but not editable.
  - Read-only: content visible and selectable but not editable.
  - Error: error border; error message below.
- Controlled vs uncontrolled: supports both. Controlled via `value` / `onChange`. Uncontrolled via `defaultValue`.
- Keyboard behavior:
  - Tab focuses the TextArea.
  - All standard text editing and selection keys work as expected.
  - Enter creates a new line (default behavior; does not submit).
  - Shift+Enter creates a new line in contexts where Enter may submit (consumer manages this via `onKeyPress`).
- Screen reader behavior: associated label via `<label>` element or `aria-label`. Helper text via `aria-describedby`. Error message via `aria-describedby`. `aria-invalid="true"` in error state. `aria-required="true"` for required fields. `aria-multiline="true"` is implied by the `role="textbox"` with multiline.
- Motion rules: auto-grow height change is instant (no animation) to avoid disrupting typing flow. Focus border transition uses a short color transition. Suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: associated `<label>` (or `aria-label`). `aria-invalid="true"` in error state. `aria-describedby` for helper and error text. `aria-required` for required fields. `aria-multiline="true"` is inherent to the textarea role.
- Focus rules: in the tab order. Focus ring clearly visible. Clicking the label focuses the TextArea.
- Contrast expectations: input text meets WCAG AA (4.5:1). Placeholder text meets 3:1 minimum. Border meets non-text contrast (3:1). Error border meets non-text contrast.
- Reduced motion behavior: focus border transition is instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: input surface, border (default, focus, error, disabled), primary text, muted text (placeholder, disabled), accent (focus border), destructive/error, space tokens (padding, label-to-input gap, input-to-helper gap), radius token, type scale (body for input, label scale, caption scale for helper/error).
- Prohibited hardcoded values: no raw hex colors, no pixel-based heights or paddings, no hardcoded font sizes, no hardcoded `resize` CSS values.
- Dark mode expectations: input surface must be distinguishable from the page background in dark mode. Focus and error borders must remain clearly visible against dark surfaces.

---

## 7. Composition Rules

- What can wrap it: forms, comment composers, description fields, note editors, settings pages.
- What it may contain: the textarea control itself; optionally a character/word count indicator below the field.
- Anti-patterns:
  - Do not use TextArea for single-line input — use Input.
  - Do not use TextArea without a visible or programmatic label.
  - Do not allow horizontal resize — it disrupts layout. Only vertical resize is permitted.
  - Do not rely on placeholder text as a substitute for a label.

---

## 8. Performance Constraints

- Memoization rules: memoize in forms where many TextArea instances render simultaneously. Debounce `onChange` for expensive consumers (e.g., real-time preview) — this is the consumer's responsibility.
- Virtualization: not applicable.
- Render boundaries: pure presentational primitive. No data fetching or side effects. Auto-grow height calculation is a side effect of content changes but is internal to the component.

---

## 9. Test Requirements

- What must be tested:
  - Renders with a label, placeholder, and empty value.
  - Typing updates the displayed value (controlled and uncontrolled modes).
  - Auto-grow: height increases when content exceeds `rows` height (when `autoGrow` is enabled).
  - Auto-grow: height does not exceed `maxRows` (when configured).
  - Error state renders error border and error message.
  - Disabled state: TextArea is not interactive; content is visible.
  - `onChange` is called with the correct value on each keystroke.
  - Character count indicator (if supported) updates correctly.
- Interaction cases:
  - Tab focuses the TextArea.
  - Clicking the label focuses the TextArea.
  - Enter creates a new line.
- Accessibility checks:
  - Associated label is present.
  - `aria-invalid="true"` in error state.
  - Error message associated via `aria-describedby`.
  - Helper text associated via `aria-describedby`.
  - `aria-required` is set when required.
  - Placeholder contrast meets 3:1 minimum.
  - Text contrast meets WCAG AA.
  - Focus ring is visible.
  - Focus border transition is suppressed under reduced motion.
