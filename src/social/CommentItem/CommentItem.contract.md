# Component Contract — CommentItem

## 1. Public API

### Base Props

`CommentItem` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: CommentThread (as a list of CommentItems), PMCommentSidebar comment list, any flat or threaded comment list container.

May contain: - CommentItem.Avatar: user avatar image or fallback initials.

---

## 2. Behavioral Guarantees

- Idle: Comment displayed; actions hidden (hover-reveal pattern on web).
  - Hover (web): Action controls appear (reply, react, more menu).
  - Focus: Visible focus ring on the comment container or individual action controls.
  - Edited: An "edited" label appears near the timestamp.
  - Deleted: A "This comment was deleted" placeholder is displayed in place of the body.
  - Highlighted/Mentioned: A subtle background highlight indicates the current user was @mentioned.
- Controlled vs uncontrolled: CommentItem is purely presentational. All data and action callbacks are supplied via props.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Hover reveal of actions uses a brief fade (under 100ms). Reduced motion suppresses the fade — actions are always visible or toggle with a focus event instead.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: The comment frame and all action controls are in the Tab order. On mobile (where hover is not available), actions must always be visible or reachable via a tap on the comment.
- Contrast expectations: Author name must meet 4.5:1. Comment body must meet 4.5:1. Timestamp must meet 3:1. Action icon colors must meet 3:1 against the background.
- Reduced motion behavior: Action fade-in is instant. @mention highlight animation is disabled.

---

## 4. Styling Guarantees

- Required tokens: comment background (idle and highlighted), avatar border, author name text, body text, timestamp text (secondary), action icon color, hover action background, focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded hex values, pixel spacing, or font sizes.
- Dark mode expectations: Comment background, text, and action icon tokens shift to dark-mode values. @mention highlight remains distinguishable in dark mode.
- Layout rules:
- Responsive behavior: On narrow viewports, the avatar size may reduce to a smaller size token variant. The comment body wraps naturally. Actions remain accessible.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `CommentItem.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
