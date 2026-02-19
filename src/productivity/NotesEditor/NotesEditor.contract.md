# Component Contract — NotesEditor

## 1. Public API

### Base Props

`NotesEditor` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: NotesEditor is typically placed within a full-screen or split-pane layout. It may be wrapped by a container that also houses a title input field above it.

May contain: The editor surface itself contains user-authored text content. An optional formatting toolbar may be composed alongside it as a sibling, not a child.

---

## 2. Behavioral Guarantees

- Idle/Unfocused: Displays content or placeholder; no visible cursor; optional subtle border.
  - Focused: Cursor is visible; border or focus ring becomes prominent.
  - Editing: Active text input; character-by-character render.
  - Empty: Placeholder text visible.
  - Disabled: Non-interactive; de-emphasized visual treatment; cursor is not-allowed (web).
  - Read-only: Content is visible and selectable but not editable.
- Controlled vs uncontrolled: Supports both. In uncontrolled mode, the editor manages its own content state. In controlled mode, the parent supplies the value and an onChange handler.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Focus transitions (border, glow) animate at under 150ms. No entrance animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: Tapping or clicking the editor surface places focus directly within the editable area. The editor must be reachable via Tab. On mobile, focus triggers the software keyboard.
- Contrast expectations: Body text must meet 4.5:1. Placeholder text must meet 3:1. Focus ring must be clearly visible.
- Reduced motion behavior: Focus transition animations are instant.

---

## 4. Styling Guarantees

- Required tokens: editor background, editor border (idle and focused), text primary, text placeholder, selection background, focus ring, radius, space (padding), line-height.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Background shifts to a dark surface token. Text and placeholder tokens resolve to dark-mode values. Selection highlight is distinguishable in dark mode.
- Layout rules:
- Responsive behavior: The editor adapts to its container width without horizontal scrolling. On mobile, the software keyboard must not obscure the active input line — the container must scroll or adjust when the keyboard is visible.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `NotesEditor.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
