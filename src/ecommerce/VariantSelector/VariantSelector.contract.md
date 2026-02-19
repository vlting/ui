# Component Contract — VariantSelector

## 1. Public API

### Base Props

`VariantSelector` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a product detail page, a quick-view modal, a CartItemRow variant display (read-only mode), or CheckoutForm variant confirmation.

May contain: one or more labeled option groups, each containing chip or swatch elements.

---

## 2. Behavioral Guarantees

unselected (idle), unselected (hover/focus), selected, unavailable/disabled.
- The selector is controlled: the parent owns the selected value for each variant dimension and receives an `onChange(dimension, value)` callback.
- Pressing an available option selects it; pressing a selected option may deselect it (if the dimension is optional) or remain selected.
- Unavailable options are non-interactive.

- Keyboard behavior:
- Screen reader behavior: the group has a `role="radiogroup"` or `role="group"` with an `aria-label` (the dimension name). Each option has `role="radio"` (or equivalent) with `aria-checked` reflecting selection and `aria-disabled` for unavailable options.


### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus must be visible and never trapped.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: no selected state transition animation.

---

## 4. Styling Guarantees

- Required tokens: chip background (default), accent/highlight token for selected border/background, muted token for unavailable state, `borderColor` (chip default and selected), `color` (chip label), `borderRadius` (chip shape), focus ring token.
- Prohibited hardcoded values: no raw colors (including swatch colors — they must be passed as data, not hardcoded), no hardcoded pixel chip sizes.
- Dark mode: chip backgrounds, borders, selected state, and muted state must all resolve via theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `VariantSelector.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
