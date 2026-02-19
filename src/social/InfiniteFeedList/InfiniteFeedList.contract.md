# Component Contract — InfiniteFeedList

## 1. Public API

### Base Props

`InfiniteFeedList` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: A full-page feed view, a tab panel within a social app, or a scrollable container within a larger layout.

May contain: A list of PostCard, CommentThread, or other feed-item components. A loading indicator. An end-of-feed message. An empty state. A "Load more" button.

---

## 2. Behavioral Guarantees

- Idle: Feed items visible, no load in progress.
  - Loading more: A loading indicator appears below the last item.
  - Empty: An empty state message is shown.
  - End of feed: An "You're all caught up" or similar terminal message is shown.
  - Error: An error message with a retry action appears when loading fails.
- Controlled vs uncontrolled: The list of items and loading state are controlled props. The parent manages data fetching; InfiniteFeedList fires a callback when the user approaches the end of the list.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Item entrance may use a brief fade-in. Loading skeleton uses a shimmer animation. All motion is suppressed under reduced motion preference.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: Focus flows through items in DOM order. When new items are appended, focus must not move unexpectedly. The "Load more" button is a clear Tab stop.
- Contrast expectations: All content within feed items inherits from the item component specs (PostCard, etc.). The end-of-feed message and "Load more" button must meet 4.5:1.
- Reduced motion behavior: Item entrance fade and skeleton shimmer are disabled.

---

## 4. Styling Guarantees

- Required tokens: list background, divider color, loading indicator color, end-of-feed text color, error text color, focus ring.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: List background and divider tokens shift to dark-mode values. Loading indicator and end-of-feed text tokens resolve correctly in dark mode.
- Layout rules:
- Responsive behavior: The list fills the full width of its container. On wide viewports, an optional max-width constraint may center the content. On narrow viewports, item padding adjusts using responsive token values.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `InfiniteFeedList.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
