# Component Contract — PasswordResetForm

## 1. Public API

### Base Props

`PasswordResetForm` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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



---

## 2. Behavioral Guarantees

- Phase 1: idle, filling, submitting, sent, error.
  - Phase 2: idle, filling (with optional real-time strength feedback), submitting, error, success.
- Password fields include show/hide toggles.
- Phase is controlled via props; the component does not manage routing or token state.

- Keyboard behavior:
- Screen reader behavior: phase transition (to sent state) is announced via a live region. Field errors are linked via `aria-describedby`. Password strength updates are announced via `aria-live="polite"`. Form-level errors use `role="alert"`.


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
- Reduced motion: no animated transitions when `prefers-reduced-motion: reduce` is active.

---

## 4. Styling Guarantees

- Required tokens: input background, input border, input border-focused, input border-error, label color, placeholder color, error text color, button background, button text, strength indicator color scale (weak through strong), link color, surface background.
- Prohibited hardcoded values: no raw colors, no pixel font sizes or spacing.
- Dark mode: strength indicator colors and error states remain visually distinct in dark theme.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PasswordResetForm.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
