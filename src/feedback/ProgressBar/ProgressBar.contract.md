# Component Contract — ProgressBar

## 1. Public API

### Base Props

`ProgressBar` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: form sections, upload UIs, multi-step wizard headers, LoadingOverlay bodies, card bodies.

May contain: a track (container) and a fill (value indicator); an optional label slot.

---

## 2. Behavioral Guarantees

- In progress (determinate): fill width reflects the current progress value (0–100).
  - Indeterminate: fill animates continuously; value is not displayed.
  - Complete: fill is at 100%; optional completion token (color change or icon) may be applied.
  - Error: fill uses an error/danger color token to indicate a failed operation.
- Motion rules:
  - The fill width transition uses a smooth animation token.
  - The indeterminate animation loops continuously.
  - Both animations respect reduced-motion preferences; when reduced motion is preferred, the fill snaps to the current value without animation, and the indeterminate variant shows a static partial fill.



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
- Reduced motion: fill transition animation and indeterminate animation are suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: track background, fill color (default, complete, error), label text color, corner radius, fill transition duration/easing.
- Prohibited hardcoded values: no hardcoded hex colors, pixel heights, border radii, or font sizes.
- Dark mode: track and fill tokens must resolve to accessible, distinguishable values in dark mode.

- Responsive behavior: bar fills the width of its container; label may be hidden on very narrow containers.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ProgressBar.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
