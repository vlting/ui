# Component Contract — ChatSidebar

## 1. Public API

### Base Props

`ChatSidebar` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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



---

## 2. Behavioral Guarantees

- In `idle` state: conversation list rendered.
- In `active/selected` state: the currently open conversation is highlighted.
- In `hover` state: subtle row background shift.
- In `focus` state: visible focus ring on the focused row.
- In `loading` state: skeleton rows shown while conversations are loading.
- In `empty` state: a meaningful empty state when no conversations exist.

- Keyboard behavior: arrow keys navigate between rows; `Enter` or `Space` selects a conversation.
- Screen reader behavior: each row announces conversation name, last message preview, timestamp, and unread count.
- Motion rules: row transitions and scroll behavior respect `prefers-reduced-motion`.

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
- Reduced motion: suppress row entrance animations.

---

## 4. Styling Guarantees

- Required tokens: `background`, `backgroundHover`, `backgroundSelected`, `borderColor`, `color`, `colorMuted`, `colorUnread`, `backgroundBadge`, `focusStyle`, `space`, `size` (avatar).
- Prohibited hardcoded values: no literal color strings, pixel spacing, or avatar dimensions.
- Dark mode: selected row and unread badge tokens must maintain sufficient contrast in dark themes.

- Responsive behavior: on mobile the sidebar is a full-screen or drawer view.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ChatSidebar.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
