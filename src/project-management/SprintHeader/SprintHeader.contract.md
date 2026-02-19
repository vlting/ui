# Component Contract — SprintHeader

## 1. Public API

### Base Props

`SprintHeader` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: The top of a KanbanBoard, a GanttChart section, or a sprint detail page layout.

May contain: Sprint name, status badge, date range text, progress bar, and optional action buttons.

---

## 2. Behavioral Guarantees

- Idle: Sprint data displayed; actions available.
  - Loading: Skeleton placeholders for name, dates, and progress.
  - No sprint: An empty state or "No active sprint" message.
- Controlled vs uncontrolled: All sprint data is supplied via props. The component is presentational. Action callbacks are provided by the parent.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Loading-to-content transition uses a brief fade. Progress bar fill may animate on first render. Reduced motion suppresses all animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: All interactive elements (action buttons) are in the Tab order with visible focus rings. Non-interactive elements are not Tab stops.
- Contrast expectations: Sprint name must meet 4.5:1. Secondary text (date range, status) must meet 3:1. Progress bar fill must meet 3:1 against the track background.
- Reduced motion behavior: Progress bar fill animation and loading fade are disabled.

---

## 4. Styling Guarantees

- Required tokens: header background, sprint name text color, status badge background and text, date range text (secondary), progress bar track and fill, action button tokens, focus ring, space, radius.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Header background and all text tokens shift to dark-mode equivalents. Progress bar track and fill remain distinguishable in dark mode.
- Layout rules:
- Responsive behavior: On narrow viewports, the metadata row wraps to multiple lines. Action buttons may collapse into an overflow menu. The progress bar always fills the full header width.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `SprintHeader.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
