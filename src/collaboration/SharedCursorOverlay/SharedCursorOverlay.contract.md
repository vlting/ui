# Component Contract — SharedCursorOverlay

## 1. Public API

### Base Props

`SharedCursorOverlay` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Must be a direct child of the `DocumentEditor` or collaborative canvas component, rendered as an overlay sibling to the editable content.

May contain: One cursor element per remote participant. Each cursor element contains a cursor line (blinking caret) and a name label. May contain selection highlight rectangles for remote text selections.

---

## 2. Behavioral Guarantees

- Active: Displays one cursor element per remote participant with a current position.
  - Participant idle: Cursor may dim or hide after a period of inactivity, determined by parent.
  - Empty: No cursors rendered when no remote participants have active positions.
- Controlled vs uncontrolled: Fully controlled. Parent supplies an array of participant cursor objects (id, name, color, position coordinates, selection range if applicable).
- Keyboard behavior: The overlay itself is not keyboard interactive. It must not intercept keyboard events from the document editor beneath it.
- Screen reader behavior: Remote cursor positions are not announced to screen readers in real time (this would be disruptive). A separate summary of active participants is provided by `PresenceIndicator`.
- Motion rules: Cursor position changes animate with smooth interpolation (CSS transition or spring). Selection highlights fade in/out. Reduced motion: all position animations are instant; no interpolation.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: The overlay container must have `aria-hidden="true"` so screen readers ignore it entirely. Presence information is exposed through `PresenceIndicator` instead.
- Focus rules: The overlay must be non-focusable (`tabIndex={-1}` equivalent). No focus should ever land inside this component.
- Contrast expectations: Cursor name labels must be legible against their assigned color background. The label background color is participant-assigned; label text must be auto-selected (white or dark) to maintain WCAG AA contrast.
- Reduced motion behavior: Position transition animations are fully suppressed. Cursors teleport to new positions instantly.

---

## 4. Styling Guarantees

- Required tokens: label text color tokens (high-contrast light and dark), label border radius token, label padding spacing token, cursor line width token (fine, using a border/width token), overlay z-index token.
- Prohibited hardcoded values: No hardcoded participant colors (supplied by parent), no hardcoded z-index numbers, no hardcoded pixel offsets for label positioning.
- Dark mode expectations: Label text tokens switch between light and dark contexts automatically. The overlay itself remains transparent in all themes.

- Responsive behavior: The overlay scales with the document surface at all viewport sizes. On touch devices, cursor positions may not be meaningful (remote cursors are still displayed for pointer-capable remote participants).
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `SharedCursorOverlay.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
