# Component Contract — AnalyticsFilterBar

## 1. Public API

### Base Props

`AnalyticsFilterBar` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a dashboard header, a report page header, an analytics module layout.

May contain: `DateRangeSelector`, dimension select controls, segment toggle groups, a filter chip list, and a reset/clear action.

---

## 2. Behavioral Guarantees

- In `idle / no active filters` state: all controls show their default/placeholder state.
- In `filter active` state: the affected control is visually highlighted using the active filter token; the reset action becomes prominent.
- In `loading` state: controls may show a subtle disabled state while data is loading in response to a filter change.
- In `disabled` state: all controls are visually dimmed and non-interactive.
- Controlled vs uncontrolled: all filter values are controlled externally; this component renders the provided state and calls change callbacks.
- Keyboard behavior: Tab navigates through each control in order; individual controls handle their own internal keyboard interaction; the reset action is reachable via Tab and activatable with Enter or Space.
- Screen reader behavior: the filter bar has `aria-label="Filters"` or equivalent; each control has a descriptive label; active filter count is announced via an `aria-live` region when filters change.
- Motion rules: filter chip appearance/disappearance uses `duration.fast` tokens; the mobile sheet open/close uses `duration.normal`; reduced motion disables all animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: the filter bar container has `role="toolbar"` with `aria-label`; each control within the toolbar is labelled; the active filter count summary is in an `aria-live="polite"` region.
- Focus rules: focus order follows the left-to-right visual order; after applying a filter, focus must remain on or return to the control that was changed.
- Contrast expectations: control labels, selected values, and placeholder text meet WCAG AA (4.5:1 for text, 3:1 for control boundaries) against their backgrounds.
- Reduced motion behavior: all transitions are disabled; filter state changes are reflected immediately in the static visual state.

---

## 4. Styling Guarantees

- Required tokens: bar background, bar border, control background (idle, active, hover, focus, disabled), control text color, active indicator color, reset action color.
- Prohibited hardcoded values: no raw hex codes, pixel gap values, or font sizes.
- Dark mode expectations: active filter highlights and control borders must remain distinguishable against the bar background in dark mode.
- Layout rules: horizontal flex row; controls are laid out left to right in order of conceptual importance; the "Reset" or "Clear all" action is pinned to the trailing end; the bar does not wrap to multiple lines on desktop — overflow is handled by horizontal scroll or a "More" affordance.
- Responsive behavior: on mobile, the bar collapses to a single "Filters" button that opens a sheet or modal containing the same controls in a vertical layout.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `AnalyticsFilterBar.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
