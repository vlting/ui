# Component Contract — NotesList

## 1. Public API

### Base Props

`NotesList` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: A split-pane layout container where NotesList occupies the sidebar and NotesEditor occupies the main panel.

May contain: Individual note entry items (title, timestamp, preview), an empty state, a loading skeleton, and optionally a header with search/filter.

---

## 2. Behavioral Guarantees

- Idle: List visible, no item selected (or previously selected item highlighted).
  - Hover (web): Hovered entry shows a subtle background highlight.
  - Focus: Focused entry shows a visible focus ring.
  - Selected: The active note entry is highlighted with an accent background token.
  - Empty: An empty state message and optional call-to-action are displayed.
  - Loading: Skeleton placeholder entries are displayed while data loads.
- Controlled vs uncontrolled: The selected note ID is a controlled prop. The parent manages selection state.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Selection highlight transitions are brief (under 150ms). List entrance animations are suppressed under reduced motion preference.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: The list is a single Tab stop. Arrow keys move focus between entries. When the list gains focus, the previously selected entry or the first entry receives focus.
- Contrast expectations: Title text must meet 4.5:1. Preview and timestamp text must meet 3:1. Selected state background must preserve text contrast.
- Reduced motion behavior: All transition animations on selection or entry entrance are disabled.

---

## 4. Styling Guarantees

- Required tokens: list background, entry background (idle, hover, selected), text primary (title), text secondary (preview, timestamp), divider color, focus ring color, radius (for entry), space.
- Prohibited hardcoded values: No hardcoded hex values, pixel spacing, or font sizes.
- Dark mode expectations: Entry backgrounds and text tokens shift to dark-mode values. Selected state remains clearly distinct in dark mode.
- Layout rules:
- Responsive behavior: On narrow viewports the list fills the full width. On wider layouts it typically occupies a fixed-width sidebar column.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `NotesList.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
