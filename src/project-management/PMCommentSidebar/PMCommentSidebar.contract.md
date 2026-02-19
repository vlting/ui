# Component Contract — PMCommentSidebar

## 1. Public API

### Base Props

`PMCommentSidebar` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: TaskDetailPanel (as a side panel), a project workspace split-pane layout.

May contain: A panel header, a scrollable CommentItem or CommentThread list, and a compose area.

---

## 2. Behavioral Guarantees

- Idle: Comment list visible, compose area ready.
  - Focused compose: Compose input is focused; optional secondary formatting controls may appear.
  - Loading: Skeleton comment entries shown while fetching.
  - Empty: A "No comments yet" message is shown.
  - Submitting: Submit button is disabled/loading while a new comment is being posted.
  - Error: An inline error message appears near the compose area if submission fails.
- Controlled vs uncontrolled: The list of comments and the compose value are controlled props. The panel's open/closed state (if collapsible) is also controlled by the parent.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: New comments animate in with a brief fade. The panel open/close animation uses a slide. All motion is suppressed under reduced motion preference.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: Focus flows naturally through the sidebar in DOM order. When the sidebar opens (if slideable), focus moves to the panel header or compose area. When it closes, focus returns to the trigger.
- Contrast expectations: Author names and comment bodies must meet 4.5:1. Timestamps must meet 3:1. Error text must meet 4.5:1 on its background.
- Reduced motion behavior: Comment enter animation and panel slide are disabled.

---

## 4. Styling Guarantees

- Required tokens: sidebar background, comment entry background, compose input background, compose input border, text primary, text secondary, error color, focus ring, space, radius.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Sidebar and comment backgrounds shift to dark tokens. Text and secondary text tokens resolve correctly. Error states remain distinguishable in dark mode.
- Layout rules:
- Responsive behavior: On narrow viewports, the sidebar may transition from a persistent side panel to a bottom sheet or full-screen overlay.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PMCommentSidebar.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
