# Component Contract — BarChart

## 1. Public API

### Base Props

`BarChart` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: `ChartWrapper` (for title, legend, and actions); a card or panel.

May contain: axis components, bar elements (grouped or stacked), a tooltip overlay, a legend, value annotation labels, and empty/error state slots.

---

## 2. Behavioral Guarantees

- In `idle` state: chart fully rendered.
- In `bar hover / focus` state: the hovered/focused bar is highlighted using a highlight token; a tooltip shows the category, series, and value.
- In `legend item toggle` state: a series is shown or hidden.
- In `loading` state: skeleton bars occupy the chart area.
- In `empty` state: a neutral empty-state message is displayed.
- In `error` state: an error-state message is displayed.
- Controlled vs uncontrolled: visible series may be controlled externally; hover state is uncontrolled.
- Keyboard behavior: Tab moves focus into the chart; arrow keys navigate between bars; Enter or Space shows the tooltip for the focused bar.
- Screen reader behavior: chart root has `aria-label`; each bar has an accessible description including category, series, and value; a visually hidden data table provides full data access.
- Motion rules: bar entrance animations (grow from baseline) use `duration.normal`; tooltip appearance uses `duration.fast`; reduced motion disables all animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="img"` with `aria-label` on the chart root; individual bars have `aria-label` with category and value; visually hidden data table present.
- Focus rules: focus ring is visible on focused bars; Tab navigates into and out of the chart cleanly.
- Contrast expectations: bar fills must meet WCAG AA 3:1 non-text contrast against the chart background; axis and grid line colors must meet 3:1; bar value annotation text meets 4.5:1.
- Reduced motion behavior: entrance growth animation is disabled; bars render at full height immediately.

---

## 4. Styling Guarantees

- Required tokens: chart background, axis line color, grid line color, bar fill tokens (per series), bar hover highlight token, tooltip background and text, legend text, skeleton background.
- Prohibited hardcoded values: no raw hex codes, numeric bar width ratios, or pixel font sizes.
- Dark mode expectations: bar fills and backgrounds must maintain sufficient contrast in dark mode; grid lines must remain visible.
- Layout rules: fills its container width; height determined by a size token or prop; the baseline is always visible; bars do not clip outside the chart area.
- Responsive behavior: on narrow viewports, switch to horizontal orientation if many categories are present; reduce label density on the category axis.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `BarChart.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
