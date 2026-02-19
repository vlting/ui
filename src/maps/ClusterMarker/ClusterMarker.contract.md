# Component Contract — ClusterMarker

## 1. Public API

### Base Props

`ClusterMarker` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

idle, hover, focus, active (pressed).

- Keyboard behavior: the marker is focusable when rendered in an accessible map context; Enter/Space activates the `onPress` callback.
- Screen reader behavior: the marker announces the count of grouped items and its actionable nature, e.g., "Cluster of 42 items. Press to zoom in."


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
- Animations are disabled when `prefers-reduced-motion` is set.

---

## 4. Styling Guarantees

- Required tokens: primary/brand color token for badge background, contrasting text color token for count label, opacity token for halo/ring, size tokens for badge diameter (per count tier), typography token for count label.
- No hardcoded color, spacing, or font-size values.
- Dark mode: badge background and text tokens must resolve correctly in dark map themes.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ClusterMarker.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
