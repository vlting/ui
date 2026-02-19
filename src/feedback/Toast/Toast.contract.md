# Component Contract — Toast

## 1. Public API

### Base Props

`Toast` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a Toast provider or portal that manages the toast queue and positioning.

May contain: an icon slot, a message text slot, an action slot (optional), a dismiss slot (optional).

---

## 2. Behavioral Guarantees

- Entering: toast animates in (slide up or fade in).
  - Visible: toast is displayed and the auto-dismiss timer is running.
  - Paused: auto-dismiss timer pauses on hover or focus.
  - Exiting: toast animates out before removal.
  - Dismissed: toast is removed from the DOM.

- Keyboard behavior:
- Screen reader behavior:
- Motion rules:

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
- Reduced motion: enter/exit animations suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: background (per variant), border (if used), icon color, message text, action text, shadow, focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, animation durations, or font sizes.
- Dark mode: all variant tokens must resolve to accessible, distinguishable values in dark mode.

- Responsive behavior: on narrow viewports, toasts span full width or near-full width at the bottom.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Toast.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
