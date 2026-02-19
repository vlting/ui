# Component Contract — ErrorBoundary

## 1. Public API

### Base Props

`ErrorBoundary` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: any section of the component tree that may produce rendering errors — list views, data tables, charts, complex interactive components.

May contain: an error icon slot, a heading slot, a description slot, a recovery action slot.

---

## 2. Behavioral Guarantees

- Error (fallback active): fallback UI is displayed in place of the failed subtree.
  - Recovery attempt: when the user activates a retry action, the boundary attempts to re-render the failed subtree.
  - Hover/Focus on action: action button receives hover and focus states.
- The ErrorBoundary is not interactive itself; only the recovery action slot is interactive.

- Keyboard behavior: Tab moves focus to the recovery action button (if present); Enter or Space activates it.
- Screen reader behavior: the error heading is announced; recovery action button is announced with its label.
- Motion rules: no entrance animation by default; if added, it respects reduced-motion preferences.

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
- Reduced motion: any transition to the fallback state is suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: error/danger icon color, heading text, body text, action button colors, fallback background (if distinct from page background), focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve to accessible, distinguishable values in dark mode.

- Responsive behavior: adapts gracefully to the size of the containing region; works in both small card contexts and full-page contexts.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ErrorBoundary.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
