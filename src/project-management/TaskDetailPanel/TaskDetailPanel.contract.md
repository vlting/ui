# Component Contract — TaskDetailPanel

## 1. Public API

### Base Props

`TaskDetailPanel` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: A split-pane layout alongside a task list or KanbanBoard. May also be used as a full-screen view on mobile or as a modal dialog.

May contain: - A panel header (task title, breadcrumb, close button).

---

## 2. Behavioral Guarantees

- Idle: Full task detail rendered and readable.
  - Editing (inline): Individual fields (title, description, status, etc.) transition to an editable state when clicked or triggered by keyboard.
  - Loading: Skeleton placeholders fill the panel while task data is fetching.
  - Error: An error state is displayed if the task fails to load.
  - Empty sections: Subtasks and comments sections show empty state messages when no items exist.
- Controlled vs uncontrolled: The task data and field edit states are controlled by the parent. TaskDetailPanel fires callbacks for each field change and action.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Panel open/close uses a brief slide or fade. Inline edit field transitions are instant. Reduced motion suppresses the open/close animation.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: On open, focus moves to the task title or the first interactive element. On close, focus returns to the triggering TaskCard. All interactive elements are reachable via Tab.
- Contrast expectations: Task title must meet 4.5:1. Metadata field labels and values must meet 4.5:1. Section headings must meet 4.5:1. De-emphasized secondary text must meet 3:1.
- Reduced motion behavior: Panel open/close animation is instant.

---

## 4. Styling Guarantees

- Required tokens: panel background, section divider, metadata badge background and text, heading text, body text, secondary text, input background and border (for inline edit), focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Panel and section backgrounds shift to dark tokens. Metadata badges and inline edit inputs resolve to dark-mode values. All text tokens maintain contrast in dark mode.
- Layout rules:
- Responsive behavior: On wide viewports, the panel occupies a fixed-width side panel alongside the task list. On narrow viewports, the panel occupies the full screen. Metadata may reflow from two columns to one.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `TaskDetailPanel.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
