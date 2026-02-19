# Component Contract — CommentThread

## 1. Public API

### Base Props

`CommentThread` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: A social feed (within PostCard), a document comment panel, a task comment section (as an alternative to PMCommentSidebar).

May contain: A root CommentItem, a list of reply CommentItems, a "View more replies" control, and optionally a reply compose area.

---

## 2. Behavioral Guarantees

- Collapsed: Only the root comment and a limited number of replies are visible.
  - Expanded: All replies are visible.
  - Loading more: A loading indicator appears while additional replies fetch.
  - Empty (no replies): Only the root comment is visible, with no reply controls (or with a "Be the first to reply" affordance).
- Controlled vs uncontrolled: The expanded/collapsed state may be controlled or uncontrolled. The list of visible replies is a controlled prop.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Expanding replies uses a brief height transition. Reduced motion makes the expansion instant.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: Focus moves through the thread in natural DOM order. Expanding replies should not move focus unexpectedly — new content is appended and focus remains on the expand control.
- Contrast expectations: Thread content inherits from CommentItem. The indent line must meet 3:1 contrast. "View more replies" text must meet 4.5:1.
- Reduced motion behavior: Reply expansion animation is instant.

---

## 4. Styling Guarantees

- Required tokens: thread container background, indent line color, "view more" text color, focus ring, space (for indentation), radius.
- Prohibited hardcoded values: No hardcoded hex colors, pixel indentation widths, or font sizes.
- Dark mode expectations: Thread background and indent line tokens resolve to dark-mode values. "View more replies" text maintains contrast in dark mode.
- Layout rules:
- Responsive behavior: On narrow viewports, reply indentation may be reduced to maintain readability. The "View more replies" control remains accessible at all widths.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `CommentThread.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
