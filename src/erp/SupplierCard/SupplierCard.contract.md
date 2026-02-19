# Component Contract — SupplierCard

## 1. Public API

### Base Props

`SupplierCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: grid layout containers, list containers, sidebar panels.

May contain: avatar/logo slot, supplier name, contact detail slots, StockLevelIndicator, status badges, action button slots.

---

## 2. Behavioral Guarantees

- Idle: default card appearance.
  - Hover (web): card receives a subtle background or border color shift via tokens.
  - Focus: keyboard-focused card receives a visible focus ring.
  - Selected: selected card receives a distinct border or background token.
  - Disabled: non-selectable cards are visually de-emphasized.
- Controlled vs uncontrolled: selection state may be controlled (prop) or uncontrolled (internal).
- Keyboard behavior: if the card is interactive, it is focusable via Tab; Enter or Space triggers the primary action.
- Screen reader behavior: the card announces its name and key attributes. If interactive, it has an accessible label describing the action (e.g., "View supplier: Acme Corp").
- Motion rules: hover/focus transitions respect reduced-motion preferences.

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
- Reduced motion: hover and selection transitions are suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: card background, card border, card shadow, heading text, body text, caption text, status indicator tokens, focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, border radii, or font sizes.
- Dark mode: card background, border, and shadow tokens must resolve to visually distinct and accessible values in dark mode.

- Responsive behavior: cards in a grid collapse to a single-column stack on narrow viewports. Card minimum width is defined by a size token.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `SupplierCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
