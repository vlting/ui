# Component Contract — SubtaskList

## 1. Public API

### Base Props

`SubtaskList` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: TaskDetailPanel (as a subsection). It may also appear within a task card's expanded state.

May contain: Individual subtask rows (checkbox + title + optional action menu), a progress summary, and an add-subtask affordance.

---

## 2. Behavioral Guarantees

- Idle: All subtasks visible, none focused.
  - Hover (web): Hovered row shows a subtle background highlight.
  - Focus: Visible focus ring on the focused row's checkbox or row element.
  - Completed: Checkbox checked, title struck through, row de-emphasized.
  - Empty: A "No subtasks yet" message or the add-subtask affordance is shown.
  - Loading: Skeleton rows shown while data loads.
- Controlled vs uncontrolled: The completion state of each subtask is controlled. The parent manages state; SubtaskList fires callbacks on completion toggle and on add.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Completion animation (strikethrough, opacity change) is brief (under 150ms). Reduced motion suppresses all animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: All interactive elements (checkboxes, action menus, add button) are in the Tab order. Focus ring must be clearly visible.
- Contrast expectations: Active subtask title must meet 4.5:1. Completed/de-emphasized title must meet 3:1. Checkbox contrast must meet 3:1 against its background.
- Reduced motion behavior: Completion animation is instant.

---

## 4. Styling Guarantees

- Required tokens: list background, row background (idle and hover), checkbox foreground and background, text primary, text de-emphasized (completed), strikethrough color, progress summary text (secondary), focus ring, space, radius.
- Prohibited hardcoded values: No hardcoded hex values, pixel spacing, or font sizes.
- Dark mode expectations: Row backgrounds and text tokens shift to dark-mode values. Completed state de-emphasis remains visible in dark mode.
- Layout rules:
- Responsive behavior: Rows fill the full width of their container. On narrow viewports, the optional action menu collapses to a tap-to-reveal icon.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `SubtaskList.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
