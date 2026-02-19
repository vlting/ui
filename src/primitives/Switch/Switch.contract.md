# Component Contract — Switch

## 1. Public API

### Base Props

`Switch` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: settings pages, preference panels, onboarding option screens, permission toggles within lists.

May contain: the switch track and thumb. Externally, a label element and an optional description.

---

## 2. Behavioral Guarantees

- Off idle: muted track, thumb on the left.
  - On idle: accent track, thumb on the right.
  - Off hover: slight track background shift to hover token.
  - On hover: slight track darkening.
  - Focus (either state): focus ring visible around the track.
  - Disabled off: muted track and thumb; not interactive.
  - Disabled on: muted accent track and thumb; not interactive.
  - Loading: the switch may show a loading spinner on the thumb while the state change is processing; the control is non-interactive during loading.
- Controlled vs uncontrolled: controlled via `checked` / `onCheckedChange`. Uncontrolled via `defaultChecked`.
- Keyboard behavior:
- Screen reader behavior: `role="switch"` with `aria-checked` (true/false). Accessible name via associated label. If loading, `aria-busy="true"` may be set. Description associated via `aria-describedby`.
- Motion rules: thumb slides from one end to the other using a short spring or ease-out transition from motion tokens. Track color changes simultaneously. Suppressed under reduced motion (instant state change, no animation).

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="switch"` with `aria-checked` (true/false). Associated label via `<label>` element or `aria-labelledby`. Optional description via `aria-describedby`. `aria-disabled="true"` when disabled (or native `disabled` attribute). `aria-busy="true"` when loading.
- Focus rules: in the tab order. Focus ring clearly visible around the track. Clicking the label also toggles the switch.
- Contrast expectations: off-state track must meet non-text contrast (3:1) against background. On-state track must meet non-text contrast. Thumb must meet non-text contrast against track in both states.
- Reduced motion behavior: the thumb slide animation and track color transition are instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: off-track (muted surface), on-track (primary accent), thumb (on-accent or neutral foreground), disabled muted tokens, focus-ring token, space tokens (control size, label gap, row min-height), border-radius (pill/capsule for track, circle for thumb).
- Prohibited hardcoded values: no raw hex colors, no pixel-based switch dimensions, no hardcoded animation durations.
- Dark mode expectations: off-track must be visible against dark backgrounds. On-track accent must remain clearly distinct from the off-track. Thumb must be visible against both track states in dark mode.

- Responsive behavior: the switch control size remains consistent across breakpoints. The `size` prop adjusts the control proportionally using size tokens.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Switch.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
