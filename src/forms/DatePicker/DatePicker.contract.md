# Component Contract — DatePicker

## 1. Public API

### Base Props

`DatePicker` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: FieldWrapper, form sections, filter bars.

May contain: a text input slot, a calendar icon trigger slot, a calendar popover slot (with month grid, navigation, and day cells).

---

## 2. Behavioral Guarantees

- Idle (closed): input shows selected date or placeholder.
  - Open: calendar popover is visible.
  - Day hover: hovered day cell receives a background token shift.
  - Day focused: keyboard-focused day receives a visible focus ring.
  - Day selected: selected day receives a selected background token.
  - Today: today's date receives a distinct indicator (border or dot).
  - Day disabled: disabled dates are non-interactive and visually muted.
  - Input error: input displays error border and error token when an invalid date is entered.
- Controlled vs uncontrolled: selected date value may be controlled (via prop) or uncontrolled (internal state).
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: calendar open/close animation respects reduced-motion preferences.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus must be visible and never trapped.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: calendar open/close animation is suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: input background, input border (default, focus, error), calendar background, calendar shadow, header text, day label text, day cell (default background, hover background, selected background, today indicator, disabled text), focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel sizes, or font sizes.
- Dark mode: all tokens must resolve to accessible, distinguishable values in dark mode; selected and today indicators must remain distinguishable.

- Responsive behavior: on narrow viewports, the calendar may open as a bottom sheet. Minimum touch target size for day cells is observed.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `DatePicker.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
