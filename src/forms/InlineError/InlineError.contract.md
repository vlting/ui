# Component Contract — InlineError

## 1. Public API

### Base Props

`InlineError` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: FieldWrapper.Error slot, or directly below a form input.

May contain: an optional icon slot and an error message text slot.

---

## 2. Behavioral Guarantees

- Renders without error when valid props are supplied.


- Screen reader behavior: associated with the input via `aria-describedby` so the error is announced when the input receives focus. May also use `role="alert"` if the error appears dynamically after initial render to ensure immediate announcement.
- Motion rules: optional fade-in or slide-in animation on appearance; respects reduced-motion preferences.

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
- Reduced motion: appearance animation is suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: error/danger text color, optional error/danger icon color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel font sizes, or margin values.
- Dark mode: error text token must remain legible and clearly distinct from helper text and label text in dark mode.

- Responsive behavior: wraps naturally within the container width; no truncation.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `InlineError.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
