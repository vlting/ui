# Component Contract — OTPInput

## 1. Public API

### Base Props

`OTPInput` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: form fields, authentication screens, verification dialogs. Must be a descendant of the design system Provider.

May contain: individual character segment inputs and an optional hidden aggregated input for form submission compatibility.

---

## 2. Behavioral Guarantees

- Idle: all boxes show placeholder or are empty; first box may receive autofocus.
  - Focused (segment): active segment has a distinct focus ring or highlighted border using token-based focus color.
  - Filled: each segment transitions to a filled visual state as characters are entered.
  - Complete: all segments are filled; may trigger an onChange or onComplete callback automatically.
  - Error: all boxes take error border color; error message rendered below the row.
  - Disabled: no interaction permitted; reduced opacity applied.
- Controlled vs uncontrolled: supports both patterns. Controlled mode accepts a value string and onChange callback. Uncontrolled mode manages the entered value internally.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: no animation required for segment fill; subtle focus ring transition is acceptable but must be suppressed under reduced motion preference.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: focus starts on the first empty segment. After pasting a full code, focus moves to the last segment. After clearing with Backspace, focus moves back one position.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: no transitions or animations on character entry.

---

## 4. Styling Guarantees

- Required tokens: segment border color, focused border color, error border color, filled background or text color, disabled opacity, box size, gap, font size token.
- Prohibited hardcoded values: no hardcoded colors, dimensions, or font sizes.
- Dark mode: box backgrounds and border colors must resolve correctly in dark mode via token references.

- Responsive behavior: segment boxes scale with available space; minimum touch target size must be met on all screen sizes. On very small screens, segment count and box size must not overflow horizontally.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `OTPInput.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
