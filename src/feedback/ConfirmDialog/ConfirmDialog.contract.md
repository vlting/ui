# Component Contract — ConfirmDialog

## 1. Public API

### Base Props

`ConfirmDialog` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: app root, portal/overlay layer.

May contain: a title slot, a body/description slot, an actions slot (confirm and cancel buttons).

---

## 2. Behavioral Guarantees

- Open: dialog is visible and focused; backdrop prevents interaction with underlying content.
  - Closed: dialog is not rendered or is hidden.
  - Loading: confirm action is in progress; confirm button is disabled and shows a loading indicator; cancel is also disabled.
- Controlled vs uncontrolled: open/closed state is controlled externally; the dialog does not manage its own open state.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: dialog open/close animation (fade, scale) respects reduced-motion preferences.

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
- Reduced motion: open/close animations are suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: dialog background, dialog border, dialog shadow, backdrop/overlay color, title text, body text, confirm button (background, text, hover), cancel button (background, text, hover), focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, border radii, or font sizes.
- Dark mode: all tokens must resolve to accessible, distinguishable values in dark mode; backdrop must still provide sufficient contrast against dark page backgrounds.

- Responsive behavior: on narrow viewports, the dialog expands to near-full width; button stack may become vertical.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ConfirmDialog.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
