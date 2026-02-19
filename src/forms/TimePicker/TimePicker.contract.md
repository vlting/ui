# Component Contract — TimePicker

## 1. Public API

### Base Props

`TimePicker` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: form field wrappers, scheduling forms, modal date-time pickers, filter panels. Must be a descendant of the design system Provider.

May contain: individual time segment inputs, colon delimiters, and an optional AM/PM toggle. May be paired externally with a DatePicker for a combined DateTime entry experience.

---

## 2. Behavioral Guarantees

- Idle: segments display current value or placeholder (e.g., "--").
  - Focused (segment): active segment has a visible focus ring; selected digits are highlighted.
  - Editing: user types directly into the focused segment; the value updates in real time.
  - AM/PM toggle active: the selected period is visually active.
  - Error: segment borders take error token color; error message appears below.
  - Disabled: all segments and toggle non-interactive; reduced opacity.
- Controlled vs uncontrolled: supports both patterns. Controlled mode accepts a time value string and onChange callback. Uncontrolled mode manages internal time state.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: no animation required. AM/PM toggle state change may use a brief background transition suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: Tab enters at the first segment and cycles through segments and the AM/PM toggle before exiting. Arrow keys navigate within the control.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress any transition on toggle state change.

---

## 4. Styling Guarantees

- Required tokens: segment border, focused border, error border, segment background, delimiter text color, AM/PM toggle background, AM/PM toggle text, disabled opacity, space tokens, typography scale token.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; segment backgrounds and borders must remain legible against dark surfaces.

- Responsive behavior: the control maintains its compact horizontal layout on all screen sizes. On mobile, tapping a segment may open a native time picker overlay (platform-appropriate behavior) while preserving the same visual container on screen.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `TimePicker.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
