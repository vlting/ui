# Component Contract — Alert

## 1. Public API

### Base Props

`Alert` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: form sections, page content areas, modal bodies, card bodies.

May contain: an icon slot, a title slot (optional), a message text slot, an action slot (optional), a dismiss slot (optional).

---

## 2. Behavioral Guarantees

- Visible: default display state.
  - Dismissed: alert is removed or hidden when dismissed (if dismissal is supported).
  - Hover (dismiss/action): interactive elements receive hover state via tokens.
  - Focus: focused interactive elements receive a visible focus ring.
- Controlled vs uncontrolled: visibility may be controlled externally or managed with internal dismiss state.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: entrance animation (if any) and dismiss animation respect reduced-motion preferences.

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
- Reduced motion: entrance/exit animations are suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: info/success/warning/error background, border, icon color, title text, body text, action text, focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all semantic variant tokens must resolve to accessible, distinguishable values in dark mode.

- Responsive behavior: on narrow viewports, action may stack below the message. Minimum touch target sizes respected.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Alert.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
