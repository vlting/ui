# Component Contract — ValidationMessage

## 1. Public API

### Base Props

`ValidationMessage` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: form field wrappers, inline form field layouts. Must be a descendant of the design system Provider. Typically placed as a sibling immediately below an input element.

May contain: an optional leading icon and message text only. No interactive elements, no nested inputs.

---

## 2. Behavioral Guarantees

- Error: red/danger semantic token color for text and icon; message describes the validation failure.
  - Warning: amber/warning semantic token color; message describes a non-blocking concern.
  - Success: green/success semantic token color; message confirms valid input.
  - Info: neutral/info semantic token color; message provides contextual guidance.
  - Hidden: component is not rendered (or rendered with display:none/visibility:hidden) when there is no validation state to communicate.
- Controlled vs uncontrolled: this is a pure display component. It renders based on the `message` and `variant` (or `intent`) props provided. No internal state.
- Keyboard behavior: none — this is a non-interactive presentational element. It must not receive focus.
- Screen reader behavior: the message is surfaced via an `aria-live` region so that it is announced to screen readers immediately when it appears or changes. For error messages, `aria-live="assertive"` is appropriate; for success and info, `aria-live="polite"`.
- Motion rules: appearance may use a short fade-in token animation suppressed under reduced motion preference. No exit animation is required.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: the element must not be focusable and must not interfere with Tab navigation.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress fade-in animation; display message immediately.

---

## 4. Styling Guarantees

- Required tokens: error text/icon color, warning text/icon color, success text/icon color, info text/icon color, typography scale token for message text, space tokens for margin and gap.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all semantic token aliases must resolve to accessible values in dark mode without manual color overrides.

- Responsive behavior: message text wraps on narrow screens. Icon remains fixed-size. No horizontal overflow.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ValidationMessage.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
