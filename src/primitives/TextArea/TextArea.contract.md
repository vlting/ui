# Component Contract — TextArea

## 1. Public API

### Base Props

`TextArea` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

| Category | Examples |
|----------|---------|
| Layout | `width`, `height`, `minWidth`, `maxWidth`, `flex`, `flexDirection` |
| Spacing | `padding`, `paddingHorizontal`, `margin`, `gap` (space tokens) |
| Visual | `backgroundColor`, `borderColor`, `borderRadius`, `opacity` |
| Theme | `theme`, `themeInverse` |
| Animation | `animation`, `enterStyle`, `exitStyle` |
| Accessibility | `accessible`, `accessibilityLabel`, `accessibilityRole`, `aria-*` |
| Events | `onPress`, `onHoverIn`, `onHoverOut`, `onFocus`, `onBlur` |

### Component-Specific Props

No additional props are defined in the current stub implementation. Props specific to the component's behavior (e.g., data, state, callbacks) are to be defined when behavioral logic is implemented per the `.spec.md`.

### Composition Context

Intended to be wrapped by: forms, comment composers, description fields, note editors, settings pages.

May contain: the textarea control itself; optionally a character/word count indicator below the field.

---

## 2. Behavioral Guarantees

- Empty: placeholder text visible.
  - Focused: accent/primary border or ring; placeholder remains until typing begins.
  - Filled: content visible; focus border visible while focused.
  - Auto-growing: height increases as the user types beyond the current height, up to a maximum (configurable).
  - Disabled: muted appearance; content visible but not editable.
  - Read-only: content visible and selectable but not editable.
  - Error: error border; error message below.
- Controlled vs uncontrolled: supports both. Controlled via `value` / `onChange`. Uncontrolled via `defaultValue`.
- Keyboard behavior:
- Screen reader behavior: associated label via `<label>` element or `aria-label`. Helper text via `aria-describedby`. Error message via `aria-describedby`. `aria-invalid="true"` in error state. `aria-required="true"` for required fields. `aria-multiline="true"` is implied by the `role="textbox"` with multiline.
- Motion rules: auto-grow height change is instant (no animation) to avoid disrupting typing flow. Focus border transition uses a short color transition. Suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: associated `<label>` (or `aria-label`). `aria-invalid="true"` in error state. `aria-describedby` for helper and error text. `aria-required` for required fields. `aria-multiline="true"` is inherent to the textarea role.
- Focus rules: in the tab order. Focus ring clearly visible. Clicking the label focuses the TextArea.
- Contrast expectations: input text meets WCAG AA (4.5:1). Placeholder text meets 3:1 minimum. Border meets non-text contrast (3:1). Error border meets non-text contrast.
- Reduced motion behavior: focus border transition is instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: input surface, border (default, focus, error, disabled), primary text, muted text (placeholder, disabled), accent (focus border), destructive/error, space tokens (padding, label-to-input gap, input-to-helper gap), radius token, type scale (body for input, label scale, caption scale for helper/error).
- Prohibited hardcoded values: no raw hex colors, no pixel-based heights or paddings, no hardcoded font sizes, no hardcoded `resize` CSS values.
- Dark mode expectations: input surface must be distinguishable from the page background in dark mode. Focus and error borders must remain clearly visible against dark surfaces.

- Responsive behavior: full-width at all breakpoints. Auto-grow behavior is consistent regardless of viewport size.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `TextArea.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
