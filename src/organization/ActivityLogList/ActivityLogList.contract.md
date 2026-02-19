# Component Contract — ActivityLogList

## 1. Public API

### Base Props

`ActivityLogList` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: page sections, settings panels, dashboard cards, drawer/sheet bodies.

May contain: a repeating list of activity entry items. Each entry may contain text, an avatar, a timestamp, and optionally a link or badge.

---

## 2. Behavioral Guarantees

- Idle: list is populated and scrollable.
  - Empty: displays an empty-state message when no activity exists.
  - Loading: displays a skeleton or spinner while data is being provided by the parent.
  - Error: parent is responsible for error state; this component renders whatever items it receives.
- Controlled vs uncontrolled: display-only; accepts an array of activity items as props. No internal state for selection.
- Keyboard behavior: the list container is scrollable via keyboard if it has a fixed height. Individual entries are not focusable unless they contain interactive children (e.g., a link).
- Screen reader behavior: the list should be marked as a list (semantic list element or role="list"). Each entry is a list item with a complete readable description (actor + action + timestamp).
- Motion rules: new items appending to the top may use a brief fade-in; this animation must be suppressed when the user has reduced motion enabled.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: use semantic list markup or `role="list"` with `role="listitem"` for each entry. Timestamps should be rendered in a `<time>` element with a machine-readable `datetime` attribute.
- Focus rules: the list itself is not focusable. If entries contain links or buttons, those must be keyboard-reachable in source order.
- Contrast expectations: all text must meet WCAG AA contrast against their background tokens.
- Reduced motion behavior: suppress any entry-appear animations when `prefers-reduced-motion: reduce` is active.

---

## 4. Styling Guarantees

- Required tokens: surface background, primary text, secondary/muted text, border/divider, space (gap between entries), border-radius (for entry cards if card layout is used).
- Prohibited hardcoded values: no raw hex colors, no pixel-based margins or paddings, no hardcoded font sizes.
- Dark mode expectations: all token references must resolve correctly in dark mode. Divider lines and muted backgrounds must remain distinguishable without relying on color alone.

- Responsive behavior: full-width at all breakpoints. On narrow viewports, entry metadata (e.g., timestamp) may shift below the action text rather than inline.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ActivityLogList.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
