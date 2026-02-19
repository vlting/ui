# Component Contract — ReorderAlertBanner

## 1. Public API

### Base Props

`ReorderAlertBanner` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: page layout containers, dashboard headers, inventory view headers.

May contain: an icon slot, a message text slot, an optional action slot (link or button), an optional dismiss slot.

---

## 2. Behavioral Guarantees

- Visible: default state when the reorder condition is active.
  - Dismissed: banner is removed or hidden after the operator dismisses it (if dismissal is supported).
  - Hover (action element): action link/button receives a hover state via token-based style.
  - Focus: focused action element receives a visible focus ring.
- Controlled vs uncontrolled: visibility may be controlled externally (via prop) or managed internally with a dismiss callback.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: banner entrance animation (slide-down or fade-in) respects reduced-motion preferences; no animation when reduced motion is preferred.

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
- Reduced motion: entrance and exit animations are suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: warning background, warning border, warning text, icon color, action text/link color, focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: warning tokens must resolve to legible, accessible values in dark mode; do not assume a light background for the warning color.

- Responsive behavior: on narrow viewports, action link may stack below the message text. Touch targets meet minimum size requirements.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ReorderAlertBanner.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
