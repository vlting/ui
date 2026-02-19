# Component Contract — LocationRadiusSelector

## 1. Public API

### Base Props

`LocationRadiusSelector` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a discovery preferences section, a profile editor section, a filter sheet or drawer.

May contain: a label, a numeric value display, the slider track and thumb, and optional boundary labels or unit toggle.

---

## 2. Behavioral Guarantees

idle, focused (thumb highlighted), dragging, disabled.
- The selector is controlled: the parent owns the value and receives an `onChange` callback.
- The value may be continuous or snapped to defined steps (e.g., every 5 km).
- A unit toggle (mi / km) may be presented as an adjacent control, with its own `onUnitChange` callback.

- Keyboard behavior:
- Screen reader behavior: slider uses `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` providing a human-readable description (e.g., "25 kilometers").


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
- Reduced motion: remove track fill and thumb position transition.

---

## 4. Styling Guarantees

- Required tokens: accent/primary token for filled track, muted token for unfilled track, surface token for thumb background, `borderColor`, `color` for labels and value readout, `borderRadius` from radius scale, shadow token for thumb elevation.
- Prohibited hardcoded values: no raw color values, no pixel-based track height or thumb size outside the token scale.
- Dark mode: track, thumb, and label colors must all resolve correctly from theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `LocationRadiusSelector.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
