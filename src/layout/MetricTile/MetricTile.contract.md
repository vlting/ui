# Component Contract — MetricTile

## 1. Public API

### Base Props

`MetricTile` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

states; no pressed visual should be applied without an explicit interactive prop.
- No controlled/uncontrolled state — this is a pure display component.

- Keyboard behavior: non-interactive by default; if wrapped in a pressable context, it is focusable and activatable via Enter/Space.
- Screen reader behavior: the label and value are read in document order. The icon is decorative by default and hidden from the accessibility tree unless a meaningful label is provided.


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

- Required tokens: surface/background color, border color, radius token, space tokens for padding, typography scale tokens for value and label, icon color token, muted text color token for label.
- No hardcoded color, spacing, or font-size values.
- Dark mode: surface background, text, and icon color tokens must resolve correctly in dark themes without consumer overrides.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `MetricTile.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
