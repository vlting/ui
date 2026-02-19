# Component Contract — Checkbox

## 1. Public API

### Base Props

`Checkbox` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: forms, filter panels, TeamMemberTable rows (multi-select), PermissionMatrix cells (if used as a cell toggle), settings lists.

May contain: the control square and a label text; optionally a description text below the label. No other interactive elements as siblings within the same Checkbox unit.

---

## 2. Behavioral Guarantees

- Unchecked idle: empty square with border.
  - Unchecked hover: border or background shifts to hover token.
  - Checked idle: filled with checkmark icon.
  - Checked hover: slightly darker or lighter fill.
  - Indeterminate: filled with a dash/minus icon.
  - Focus (any state): focus ring visible around the control.
  - Disabled (any state): muted appearance; not interactive.
  - Error: error border; error message below.
- Controlled vs uncontrolled: supports both. Controlled via `checked` / `onCheckedChange`. Uncontrolled via `defaultChecked`. Indeterminate is always externally controlled (`indeterminate` prop).
- Keyboard behavior:
- Screen reader behavior: the control has `role="checkbox"` (or is a native `<input type="checkbox">`), `aria-checked` reflecting the current state (true / false / mixed for indeterminate), and an accessible name via the associated label.
- Motion rules: the checkmark/dash icon appearance uses a short scale-in or draw-in animation from motion tokens. Suppressed under reduced motion (instant appearance).

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="checkbox"` with `aria-checked` (true / false / mixed). Associated label via `<label>` element or `aria-labelledby`. If there is a description, use `aria-describedby`. Error messages use `aria-describedby`.
- Focus rules: the checkbox control is in the tab order. Focus ring is clearly visible. Clicking the label also triggers the checkbox (label association).
- Contrast expectations: unchecked border must meet non-text contrast (3:1) against background. Checked fill must meet non-text contrast. Checkmark icon against checked fill must meet text contrast (4.5:1 or 3:1 for large icons per WCAG).
- Reduced motion behavior: checkmark animation is instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: border token (unchecked), accent/primary (checked fill), on-accent (checkmark color), focus ring token, disabled muted tokens, error/destructive token, space tokens (gap, min-height), radius token (slight rounding of the checkbox square), type scale (label).
- Prohibited hardcoded values: no raw hex colors, no pixel-based control sizes, no hardcoded font sizes.
- Dark mode expectations: unchecked border must be visible against dark backgrounds. Checked state must remain clearly different from unchecked. Disabled state must be distinguishable from enabled without relying on color alone.

- Responsive behavior: the checkbox size (control square) remains consistent across breakpoints. Label text may wrap on narrow viewports.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Checkbox.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
