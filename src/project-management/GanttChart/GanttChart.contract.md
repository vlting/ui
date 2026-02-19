# Component Contract — GanttChart

## 1. Public API

### Base Props

`GanttChart` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: A project detail view, a full-page timeline view, or a panel within a project management workspace.

May contain: Task rows (each with a name cell and a timeline bar cell), a time axis header, a today indicator, optional dependency connector lines, and optional row grouping headers.

---

## 2. Behavioral Guarantees

- Idle: Chart displays all tasks and timeline.
  - Hover (web): Hovered task row and/or task bar highlight.
  - Selected: A selected task bar or row is highlighted with an accent token.
  - Loading: Skeleton rows shown while data loads.
  - Empty: An empty state message is displayed when no tasks exist.
- Controlled vs uncontrolled: The visible date range and selected task are controlled props. The parent manages navigation state.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Horizontal scroll and zoom transitions animate smoothly. Reduced motion preference disables timeline animations; scrolling becomes instant.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: Focus is manageable within the grid using arrow key navigation. The left panel task list and timeline bars must be independently focusable.
- Contrast expectations: Task bar fill must meet 3:1 against the row background. Progress fill must be distinguishable from the base bar fill. Text in the left panel must meet 4.5:1.
- Reduced motion behavior: Timeline scroll and zoom animations are disabled. Interactions are instant.

---

## 4. Styling Guarantees

- Required tokens: chart background, row background (even and odd alternating), task bar fill, task bar progress fill, today indicator color, dependency line color, text primary (task names), text secondary (time axis labels), focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded colors, widths, or font sizes.
- Dark mode expectations: Row backgrounds, task bar fills, and today indicator must all shift to dark-mode token equivalents while maintaining distinguishable contrast.
- Layout rules:
- Responsive behavior: On narrow viewports, the left panel may collapse or the chart may switch to a simplified list view. Horizontal scrolling is always available for the timeline panel.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `GanttChart.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
