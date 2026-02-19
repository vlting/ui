# Component Contract — PostCard

## 1. Public API

### Base Props

`PostCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: InfiniteFeedList, a profile post grid, search results list.

May contain: - PostCard.Header: author avatar, name, @handle, timestamp, overflow menu.

---

## 2. Behavioral Guarantees

- Idle: Full card displayed; actions visible.
  - Hover (web, card level): Subtle background color shift on the card.
  - Liked/Reacted: The reaction button reflects the active reaction with an accent token.
  - Truncated content: "Read more" label is shown; activating it expands the full text.
  - Loading: Skeleton card with placeholder shapes for header, body, and actions.
- Controlled vs uncontrolled: PostCard is presentational. All data and action callbacks are supplied via props.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Reaction toggle uses a brief scale/bounce animation. Card entrance in a feed uses a brief fade. Reduced motion suppresses all animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: All interactive elements (author link, action buttons, overflow menu, "Read more") are in the Tab order. Focus ring must be clearly visible.
- Contrast expectations: Author name must meet 4.5:1. Post body text must meet 4.5:1. Secondary text (handle, timestamp, action labels) must meet 3:1.
- Reduced motion behavior: Reaction animation and card entrance fade are disabled.

---

## 4. Styling Guarantees

- Required tokens: card background, card border, author name text, secondary text (handle, timestamp), body text, action icon color, active reaction accent, overflow menu background, focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Card background, text, and action icon tokens shift to dark-mode equivalents. Active reaction accent remains distinguishable in dark mode.
- Layout rules:
- Responsive behavior: The card fills its container width. On narrow viewports, the author metadata row may truncate the @handle. Media adapts its aspect ratio responsively.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PostCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
