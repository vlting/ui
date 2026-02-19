# Component Contract — StockLevelIndicator

## 1. Public API

### Base Props

`StockLevelIndicator` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: table cells, list item rows, SupplierCard, product detail views, dashboard widgets.

May contain: a color indicator (dot, bar, or icon) and an optional text label slot.

---

## 2. Behavioral Guarantees

- Out of stock: danger semantic token applied.
  - Low stock: warning semantic token applied.
  - Adequate: success semantic token applied.
  - Overstock: info or neutral semantic token applied.
  - No data/Unknown: muted/neutral token applied.
- The indicator is non-interactive by default (display only).
- If made interactive (e.g., tappable to open stock detail), it must receive a hover and focus state.

- Keyboard behavior: if interactive, it is focusable via Tab and activatable via Enter or Space.
- Screen reader behavior: the status is communicated via an accessible label or `aria-label` (e.g., "Low stock"), not solely via color.
- Motion rules: no animation by default; if a transition between states is animated, it respects reduced-motion preferences.

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
- Reduced motion: any state-change animation is suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: danger, warning, success, info, and muted semantic color tokens for each stock state; background token for the indicator surface (if pill/badge form).
- Prohibited hardcoded values: no hardcoded hex colors, pixel sizes, or font sizes.
- Dark mode: semantic tokens must resolve to accessible, distinguishable values in dark mode.

- Responsive behavior: on narrow viewports, the label may be hidden, leaving only the color indicator visible. Tooltip may surface the label on hover or long-press.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `StockLevelIndicator.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
