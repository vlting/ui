# Component Contract — PasswordStrengthMeter

## 1. Public API

### Base Props

`PasswordStrengthMeter` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: form field wrappers, password input sub-sections, account creation forms. Must be a descendant of the design system Provider.

May contain: only the segmented bar and the strength label text. No interactive elements.

---

## 2. Behavioral Guarantees

- Empty: all segments unfilled; no label or a neutral placeholder label.
  - Weak: first segment fills with error/danger token color; label reads "Weak."
  - Fair: two segments fill with warning token color; label reads "Fair."
  - Strong: three segments fill with a positive/success-adjacent token color; label reads "Strong."
  - Very Strong: all segments fill with success token color; label reads "Very Strong."
- Controlled vs uncontrolled: this is a display-only component. It accepts a strength level (numeric or enum) or a raw password value as input and renders the corresponding visual state. It does not manage password state itself.
- Keyboard behavior: none — this is a presentational indicator. It does not receive keyboard focus.
- Screen reader behavior: the meter communicates strength level via an `aria-live` region so that each update as the user types is announced (e.g., "Password strength: Fair").
- Motion rules: segment fill transitions with a short duration token when strength level changes. Suppress transitions under reduced motion preference.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: the meter is not focusable. It must not intercept Tab navigation.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress fill transitions; apply segment state changes immediately.

---

## 4. Styling Guarantees

- Required tokens: segment fill colors per strength level (mapping to semantic error, warning, success token aliases), unfilled segment background, label text color, space tokens (gap, margin), typography scale token for label.
- Prohibited hardcoded values: no hardcoded colors (including strength-level specific hex values), spacing, or font sizes.
- Dark mode: all token references must resolve appropriately in dark mode; semantic color tokens for error, warning, and success must remain legible and meaningful against dark surfaces.

- Responsive behavior: the bar scales to fill the width of its container. On small screens, label text wraps if necessary.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PasswordStrengthMeter.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
