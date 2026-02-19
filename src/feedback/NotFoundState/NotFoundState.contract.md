# Component Contract — NotFoundState

## 1. Public API

### Base Props

`NotFoundState` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: page layout containers, route-level views, section content areas.

May contain: an illustration/icon slot, a heading slot, a body/description slot, an action slot (optional).

---

## 2. Behavioral Guarantees

- Default: heading, body text, and optional action are visible.
  - Hover/Focus on action: action button receives hover and focus states via tokens.
- The NotFoundState itself is non-interactive; only the optional action slot is interactive.

- Keyboard behavior: Tab moves focus to the action button (if present); Enter or Space activates it.
- Screen reader behavior: heading is announced at the appropriate heading level; body text is read; action button is announced with its label.
- Motion rules: any entrance animation respects reduced-motion preferences.

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
- Reduced motion: entrance animations are suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: heading text, body text, illustration/icon color, action button colors, background (if the component provides its own background surface).
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve correctly in dark mode.

- Responsive behavior: scales gracefully within narrow containers; illustration may be smaller or omitted on very small screens.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `NotFoundState.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
