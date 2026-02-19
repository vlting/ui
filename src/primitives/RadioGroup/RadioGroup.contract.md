# Component Contract — RadioGroup

## 1. Public API

### Base Props

`RadioGroup` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: forms, settings sections, wizard steps, filter panels, BillingCycleToggle (as an alternative pattern for two options).

May contain: a group label element and a set of RadioItem subcomponents. Each RadioItem contains the radio control and a label (plus optional description).

---

## 2. Behavioral Guarantees

- Unselected idle: empty circle with border.
  - Unselected hover: border shifts to hover token.
  - Selected idle: filled inner circle with accent ring.
  - Selected hover: slightly darker or lighter fill.
  - Focus (any item): focus ring visible.
  - Disabled (group or item): muted appearance; not interactive.
  - Error (group): error-state styling on controls; error message below group.
- Controlled vs uncontrolled: supports both. Controlled via `value` / `onValueChange`. Uncontrolled via `defaultValue`.
- Keyboard behavior:
- Screen reader behavior: the group uses `role="radiogroup"` with an accessible label (via `aria-labelledby` pointing to the group label or `aria-label`). Each option has `role="radio"` with `aria-checked` and an accessible name via its label. Error messages use `aria-describedby` on the group.
- Motion rules: selected state inner circle uses a short scale-in animation. Suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="radiogroup"` with `aria-label` or `aria-labelledby`. Each option `role="radio"` with `aria-checked` (true/false). Roving tabindex pattern. Error message associated via `aria-describedby` on the group. Required state via `aria-required` on the group.
- Focus rules: only the selected (or first, if none selected) item is in the tab order. Arrow keys move focus/selection within the group. Tab exits the group.
- Contrast expectations: unselected border meets non-text contrast (3:1). Selected fill/ring meets non-text contrast. Label text meets WCAG AA.
- Reduced motion behavior: selected indicator animation is instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: border (unselected), accent/primary (selected fill and ring), focus-ring token, disabled muted tokens, error/destructive token, space tokens (item gap, control-to-label gap, min row height), radius token (circular control), type scale (label, group label, helper/caption).
- Prohibited hardcoded values: no raw hex colors, no pixel-based control sizes, no hardcoded font sizes.
- Dark mode expectations: unselected border visible on dark backgrounds. Selected state clearly distinct from unselected in dark mode. Error state retains destructive semantics in dark mode.

- Responsive behavior: vertical layout is the default and works at all breakpoints. Horizontal layout may wrap on narrow viewports.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `RadioGroup.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
