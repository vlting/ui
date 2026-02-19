# Component Contract — AssignmentAvatarStack

## 1. Public API

### Base Props

`AssignmentAvatarStack` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: TaskCard, KanbanBoard card, table row cells, GanttChart row metadata, SprintHeader.

May contain: Individual Avatar components (from the primitives module) and an overflow count badge.

---

## 2. Behavioral Guarantees

- Idle: Static stack of avatars.
  - Hover (web, interactive variant): Subtle scale or opacity shift on the stack.
  - Focus: Visible focus ring on the stack container when interactive.
  - Pressed: Brief press feedback when interactive.
  - Non-interactive: Static display only.
- Controlled vs uncontrolled: All data (avatar list, max count) is supplied via props. The component is purely presentational.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Hover transitions are brief (under 150ms). Reduced motion suppresses all transitions.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: If interactive, the stack is a single Tab stop with a visible focus ring. Non-interactive stacks are excluded from the Tab order.
- Contrast expectations: Avatar border (for overlap separation) must be visible against surrounding backgrounds in both light and dark mode. Overflow badge text must meet 4.5:1 against its background.
- Reduced motion behavior: All hover/focus animations are instant.

---

## 4. Styling Guarantees

- Required tokens: avatar border color (used as separation ring), overflow badge background, overflow badge text color, focus ring color, radius (must be circular for avatars — use a 9999 or max radius token).
- Prohibited hardcoded values: No hardcoded hex colors, pixel sizes, or border widths.
- Dark mode expectations: Avatar border separation ring must be visible on dark backgrounds. Overflow badge must maintain contrast in dark mode.
- Layout rules:
- Responsive behavior: The stack does not wrap; it collapses into the overflow badge pattern at the configured limit. At very small sizes the avatars may reduce to a minimum size token.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `AssignmentAvatarStack.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
