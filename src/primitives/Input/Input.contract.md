# Component Contract — Input

## 1. Public API

### Base Props

`Input` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: forms, filter bars, search bars, dialog content, inline editors. The Label is either a sibling (wrapped in a form field container) or an `aria-label` on the input itself.

May contain: the input control itself; optionally a leading icon, trailing icon, or trailing action button (e.g., clear, reveal password) within the input container.

---

## 2. Behavioral Guarantees

- Empty: placeholder text visible.
  - Focused: accent/primary border or ring; placeholder remains until typing begins.
  - Filled: input contains text; focus border visible while focused.
  - Disabled: muted appearance; not interactive; value is visible but not editable.
  - Read-only: value is visible and selectable but not editable; appears similar to disabled but semantically distinct.
  - Error: error border; error message below.
  - Success: optional success border and message below.
- Controlled vs uncontrolled: supports both. Controlled via `value` / `onChange`. Uncontrolled via `defaultValue`.
- Keyboard behavior:
- Screen reader behavior: the input has an accessible name via an associated `<label>`. Helper text is associated via `aria-describedby`. Error messages are associated via `aria-describedby`. Error state uses `aria-invalid="true"`.
- Motion rules: border/ring color transition on focus uses a short duration from motion tokens. Suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: associated `<label>` element (or `aria-label`). `aria-invalid="true"` when in error state. `aria-describedby` for helper text and error messages. `aria-required="true"` for required fields.
- Focus rules: the input is in the tab order. Focus ring is clearly visible. Clicking the label focuses the input (label association).
- Contrast expectations: input text meets WCAG AA (4.5:1). Placeholder text meets a minimum of 3:1 (WCAG 1.4.3). Borders meet non-text contrast (3:1). Error border meets non-text contrast.
- Reduced motion behavior: focus border transition is instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: input surface, border (default, focus, error, disabled), primary text, muted text (placeholder, disabled), accent (focus border), destructive/error, space tokens (padding, label-to-input gap, input-to-helper gap), radius token, type scale (body for input, label scale, caption scale for helper/error).
- Prohibited hardcoded values: no raw hex colors, no pixel-based heights or paddings, no hardcoded font sizes.
- Dark mode expectations: input surface must be distinguishable from the form/page background in dark mode. Focus and error borders must remain clearly visible against dark surfaces.

- Responsive behavior: full-width within its container at all breakpoints. Font size does not change responsively (use `size` prop instead).
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Input.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
