# Component Contract — ReminderItem

## 1. Public API

### Base Props

`ReminderItem` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: A `role="list"` container within a PersonalDashboard section, a dedicated reminders panel, or a notification feed. ReminderItem must always appear inside an appropriate list container.

May contain: A checkbox indicator, a title label, a due time label, and an optional urgency icon.

---

## 2. Behavioral Guarantees

- Idle (pending): Normal display, checkbox unchecked.
  - Hover (web): Subtle background highlight on the row.
  - Focus: Visible focus ring around the row or the checkbox.
  - Completed: Checkbox checked, title struck through, row de-emphasized.
  - Overdue: Due time rendered in warning/error token color; optional urgency icon.
  - Disabled: Row is non-interactive, fully de-emphasized.
- Controlled vs uncontrolled: The completed state is a controlled prop. The parent manages state; ReminderItem fires a callback on completion toggle.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Completion toggle (strikethrough, opacity change) animates briefly (under 150ms). All motion is suppressed under reduced motion preference.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: The checkbox or the full row is included in the Tab order. Focus ring must be clearly visible.
- Contrast expectations: Title text must meet 4.5:1. Secondary text (due time) must meet 3:1. Overdue color must not be the sole indicator — an icon or label must also convey urgency.
- Reduced motion behavior: Completion animation is instant.

---

## 4. Styling Guarantees

- Required tokens: row background (idle, hover, completed), text primary (title), text secondary (due time), text strikethrough/de-emphasis, error/warning color token (overdue), checkbox foreground and background, focus ring, space, radius.
- Prohibited hardcoded values: No hardcoded hex values, spacing, or font sizes.
- Dark mode expectations: Row background, text, and urgency indicator tokens shift to dark-mode equivalents. Completed de-emphasis remains visible in dark mode.
- Layout rules:
- Responsive behavior: On narrow viewports, the due time may stack below the title rather than sitting inline.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ReminderItem.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
