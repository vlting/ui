# Component Contract — LoadingOverlay

## 1. Public API

### Base Props

`LoadingOverlay` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: page layout containers, card bodies, form sections, modal bodies.

May contain: a backdrop slot, a spinner/loading indicator slot, an optional message text slot, an optional cancel action slot.

---

## 2. Behavioral Guarantees

- Active: overlay is visible; all underlying content is non-interactive (pointer events blocked).
  - Inactive: overlay is hidden; underlying content is interactive.
- The overlay is entirely non-interactive; no clickable elements within it (except optionally a cancel action).

- Keyboard behavior: while the overlay is active, keyboard focus is trapped within the overlay region (or the overlay prevents focus from reaching underlying elements).
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
- Reduced motion: spinner animation is replaced with a static indicator when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: overlay/scrim background color (with opacity), spinner color, message text color, focus ring color (if overlay contains any interactive element).
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, opacity values, or font sizes.
- Dark mode: overlay and spinner tokens must resolve to accessible values in dark mode; the overlay must provide sufficient contrast against dark backgrounds.

- Responsive behavior: always fills its container regardless of viewport size.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `LoadingOverlay.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
