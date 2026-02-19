# Component Contract — Card

## 1. Public API

### Base Props

`Card` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: grid containers, list layouts, dashboard panels, feed components. Must be a descendant of the design system Provider.

May contain: - `Card.Header` — title, subtitle, leading icon, or action menu trigger.

---

## 2. Behavioral Guarantees

- Default (non-interactive): purely presentational container.
  - Hoverable/Pressable (if interactive): card surface shows hover shadow or background token change; cursor becomes a pointer.
  - Focused (if interactive): visible focus ring rendered around the card boundary.
  - Active/Pressed (if interactive): brief depression or background token change.
  - Disabled (if interactive): reduced opacity; non-interactive.
  - Loading (skeleton): card frame is visible but sub-regions show skeleton placeholder blocks.
- Controlled vs uncontrolled: the card is a layout primitive with no state of its own. Interactive behavior is provided via press/hover event props. No value or controlled state pattern applies.
- Keyboard behavior: if interactive, the card is a focusable element activated by Enter or Space. Non-interactive cards are not in the Tab order.
- Screen reader behavior: a non-interactive card uses `role="article"` or is a generic container. An interactive card uses `role="button"` or wraps its content in an anchor. Sub-regions are read in document order.
- Motion rules: hover shadow/background transition uses a short duration token suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: interactive cards are focusable via Tab and activated by Enter/Space. Non-interactive cards are excluded from Tab order.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress hover shadow/background transition.

---

## 4. Styling Guarantees

- Required tokens: card background, card border color, card border-radius, card shadow (resting and hover), hover background (interactive), focus ring color, sub-region divider color, disabled opacity.
- Prohibited hardcoded values: no hardcoded colors, spacing, border-radius values, or shadow definitions.
- Dark mode: card background, shadow, and border must all resolve to appropriate dark-mode token values, maintaining visual separation from the dark page background.

- Responsive behavior: card fills its container width by default. In a grid context, the parent grid controls card sizing. Card height is content-driven. No internal responsive logic.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Card.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
