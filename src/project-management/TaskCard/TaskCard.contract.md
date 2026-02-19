# Component Contract — TaskCard

## 1. Public API

### Base Props

`TaskCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: KanbanBoard column lists, task search results lists, sprint backlog lists.

May contain: - TaskCard.Title: the task name.

---

## 2. Behavioral Guarantees

- Idle: Static display of task metadata.
  - Hover (web): Card elevates (shadow deepens) and contextual action trigger appears.
  - Focus: Visible focus ring around the card boundary.
  - Active/Pressed: Brief scale or opacity feedback on press.
  - Selected: Accent border or background token indicates selection.
  - Dragging (within KanbanBoard): Card becomes a ghost/drag image.
  - Disabled: Non-interactive, de-emphasized.
- Controlled vs uncontrolled: TaskCard is presentational. All data and action handlers are supplied via props.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Hover elevation change uses a brief transition (under 150ms). Drag start/end transitions are smooth. Reduced motion suppresses all transitions.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: The card frame is a single Tab stop for navigation. Interactive sub-elements (status, assignee) are reached via Tab within the card context (or via the detail panel). Focus ring must be clearly visible.
- Contrast expectations: Task title must meet 4.5:1. Status badge text must meet 4.5:1 against the badge background. Priority must not be conveyed through color alone.
- Reduced motion behavior: All hover, drag, and selection transitions are instant.

---

## 4. Styling Guarantees

- Required tokens: card background, card border, card shadow (idle and hover), status badge background and text (per status variant), priority indicator color tokens, text primary (title), text secondary (metadata), focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode expectations: Card background, border, and shadow tokens shift to dark-mode equivalents. Status and priority tokens remain distinguishable in dark mode.
- Layout rules:
- Responsive behavior: Cards fill the width of their container column. On narrow viewports, metadata may stack vertically. The minimum card width prevents metadata from being hidden.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `TaskCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
