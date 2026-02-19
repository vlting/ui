# Component Contract — ConversationListItem

## 1. Public API

### Base Props

`ConversationListItem` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `idle` state: row rendered with conversation data.
- In `selected/active` state: row highlighted.
- In `hover` state: subtle background shift.
- In `focus` state: visible focus ring on the row.
- In `loading` state: skeleton version of the row with placeholder shapes.
- In `muted/archived` state: visual treatment (e.g., reduced opacity or icon) indicating the conversation is muted or archived.

- Keyboard behavior: `Enter` or `Space` activates the row when focused.
- Screen reader behavior: the row announces the conversation name, preview snippet, timestamp, and unread count (e.g., "Alice, Hey are you free later?, 2 minutes ago, 3 unread messages").
- Motion rules: hover and selection transitions respect `prefers-reduced-motion`.

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
- Reduced motion: suppress hover and selection transitions.

---

## 4. Styling Guarantees

- Required tokens: `background`, `backgroundHover`, `backgroundSelected`, `color`, `colorMuted`, `colorBadge`, `backgroundBadge`, `focusStyle`, `space`, `size` (avatar).
- Prohibited hardcoded values: no literal color strings, pixel dimensions, or border-radius values.
- Dark mode: selected and hover tokens must maintain sufficient contrast in dark themes.

- Responsive behavior: row fills container width; avatar size and badge scale per size tokens.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ConversationListItem.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
