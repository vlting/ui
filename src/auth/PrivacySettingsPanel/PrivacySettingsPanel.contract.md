# Component Contract — PrivacySettingsPanel

## 1. Public API

### Base Props

`PrivacySettingsPanel` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

idle, focused, active (changing), disabled.
- Toggle controls switch between on/off immediately; select controls open a dropdown.
- Changes may be applied immediately (optimistic) or queued and saved via a global "Save changes" button — the pattern is controlled via props.

- Keyboard behavior:
- Screen reader behavior: each row announces label, current value, and any description. Toggle announces "on" or "off". Disabled settings announce "unavailable" or the reason.


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
- Reduced motion: no toggle slide animation when `prefers-reduced-motion: reduce` is active.

---

## 4. Styling Guarantees

- Required tokens: surface background, row background (hover/selected), section heading color, label color, hint/description color, divider color, toggle track color (off/on), toggle thumb color, select background, focus ring color, disabled opacity token.
- Prohibited hardcoded values: no raw colors, no pixel spacing, no hardcoded font sizes.
- Dark mode: toggle on/off states and section headings must remain visually distinct in dark theme.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PrivacySettingsPanel.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
