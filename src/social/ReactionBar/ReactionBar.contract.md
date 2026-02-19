# Component Contract — ReactionBar

## 1. Public API

### Base Props

`ReactionBar` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: PostCard.Actions, a CommentItem.Actions area, or any content surface that supports emoji reactions.

May contain: A horizontal group of individual reaction buttons, each with an emoji/icon and an optional count. An optional "+"/more button that opens the reaction picker.

---

## 2. Behavioral Guarantees

- Idle: All reaction buttons visible; none active.
  - Active (user reacted): The selected reaction button shows the active state (accent color, optional animation).
  - Hover (web, over a button): Button shows hover state; active button may show "remove reaction" affordance.
  - Focus: Visible focus ring on the focused reaction button.
  - Picker open: A reaction picker popover is visible above the bar.
  - Disabled: All buttons are non-interactive and de-emphasized.
- Controlled vs uncontrolled: The active reaction and counts are controlled props. The parent manages state; ReactionBar fires a callback when a reaction is toggled.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Toggling a reaction may trigger a brief bounce or scale animation on the button. Reduced motion suppresses the animation; the toggle is instant.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: The reaction bar is a single Tab stop when treated as a toolbar; arrow keys navigate between buttons. Alternatively, each button is a Tab stop — the chosen model must be consistent. Focus ring must be clearly visible.
- Contrast expectations: Reaction emoji/icon must be distinguishable. Reaction count text must meet 4.5:1. Active state text must meet 4.5:1 against the active background. Reaction meaning must not rely solely on emoji color.
- Reduced motion behavior: Toggle animation is instant.

---

## 4. Styling Guarantees

- Required tokens: bar background (if any), idle button background, idle button text/icon, active button background (accent), active button text/icon, hover background, focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded hex colors, spacing, or font sizes.
- Dark mode expectations: Idle and active button backgrounds resolve to dark-mode values. Active accent must remain clearly distinguishable on dark surfaces.
- Layout rules:
- Responsive behavior: On narrow viewports, reaction buttons may reduce their label size or hide counts until tapped. The row must not overflow its container; it may truncate or scroll if the reaction set is very large.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ReactionBar.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
