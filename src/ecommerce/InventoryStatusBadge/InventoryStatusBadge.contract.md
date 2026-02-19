# Component Contract — InventoryStatusBadge

## 1. Public API

### Base Props

`InventoryStatusBadge` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: ProductCard, CartItemRow, a product detail page header, OrderHistoryTable rows.

May contain: an optional leading dot or icon, and a text label.

---

## 2. Behavioral Guarantees

states.
- No controlled/uncontrolled distinction; the status is determined entirely by a prop.

- Keyboard behavior: not independently focusable.
- Screen reader behavior: the badge text is read inline as part of the surrounding content. If the badge is the sole indicator of availability, its text must be present in the DOM (not icon-only).


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
- reduced motion requirements — no animation.

---

## 4. Styling Guarantees

- Required tokens: semantic status tokens — success (In Stock), warning (Low Stock), error/muted (Out of Stock), info/accent (Pre-Order) — for both background and text. Radius token for badge shape.
- Prohibited hardcoded values: no raw hex colors, no hardcoded font sizes or pixel padding.
- Dark mode: all status variant colors must resolve correctly via theme tokens in both light and dark contexts.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `InventoryStatusBadge.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
