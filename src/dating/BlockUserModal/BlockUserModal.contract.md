# Component Contract — BlockUserModal

## 1. Public API

### Base Props

`BlockUserModal` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a modal/portal host, a screen-level layout, or a sheet primitive.

May contain: a title, a descriptive text block, and an action row with cancel and confirm buttons.

---

## 2. Behavioral Guarantees

idle (waiting for user input), loading (confirm action in flight — show spinner, disable buttons), error (action failed — surface inline error message).
- The modal is dismissible via the cancel button, a backdrop tap, and the Escape key.

- Keyboard behavior:
- Screen reader behavior: modal role announced on open; focus moves to the modal title or first interactive element.


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
- Reduced motion: skip all entrance/exit animations; show/hide immediately.

---

## 4. Styling Guarantees

- Required tokens: `background`, `borderColor`, `color` (for title and body text), `shadowColor`, semantic danger/destructive color token for the confirm action.
- Prohibited hardcoded values: no raw hex colors, no pixel-based padding or border-radius values outside the token scale.
- Dark mode: backdrop opacity, background surface, and text colors must all update via theme tokens automatically.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `BlockUserModal.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
