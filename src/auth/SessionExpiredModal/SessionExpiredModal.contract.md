# Component Contract — SessionExpiredModal

## 1. Public API

### Base Props

`SessionExpiredModal` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

visible, signing-in (primary button loading state).
- The modal blocks all interaction with content underneath while visible.
- Primary action fires the sign-in callback; during sign-in, the button shows a loading indicator and is disabled.
- Secondary action (if present) fires its callback without blocking.

- Keyboard behavior:
- Screen reader behavior: on appearance, focus moves into the modal and the heading is announced. The modal has `role="alertdialog"` with `aria-labelledby` (heading) and `aria-describedby` (body text). The dialog is announced as blocking/modal.


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
- Reduced motion: modal entrance is instant when `prefers-reduced-motion: reduce` is active.

---

## 4. Styling Guarantees

- Required tokens: modal surface background, backdrop overlay color and opacity, heading text color, body text color, primary button background, primary button text, secondary button/link color, border/shadow token for modal elevation, icon color.
- Prohibited hardcoded values: no raw colors, no pixel font sizes, no hardcoded z-index values (use zIndex tokens).
- Dark mode: backdrop, modal surface, and button colors all resolve correctly in dark theme.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `SessionExpiredModal.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
