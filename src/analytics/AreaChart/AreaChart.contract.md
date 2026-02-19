# Component Contract — AreaChart

## 1. Public API

### Base Props

`AreaChart` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: `ChartWrapper` (for title, legend, and action affordances); a card or panel.

May contain: axis components, area path elements, a crosshair/tooltip overlay, a legend, and empty/error state slots.

---

## 2. Behavioral Guarantees

- In `idle` state: chart fully rendered with data.
- In `hover / focus` state: crosshair or vertical guide line appears; a tooltip shows values for all series at the hovered/focused x position.
- In `legend item hover` state: the corresponding series is visually emphasized; other series are dimmed.
- In `legend item toggle` state: a series is shown or hidden.
- In `loading` state: a skeleton or placeholder occupies the chart area.
- In `empty` state: a neutral empty-state message is displayed.
- In `error` state: an error-state message is displayed.
- Controlled vs uncontrolled: visible series and active data point may be controlled externally; hover state is uncontrolled.
- Keyboard behavior: Tab moves focus into the chart; arrow keys move a focus indicator along the x axis data points; Enter or Space shows the tooltip for the focused point.
- Screen reader behavior: chart root has `aria-label` describing the chart title and data range; a visually hidden summary table or data list provides full data access.
- Motion rules: series entrance animations use `duration.normal`; tooltip appearance uses `duration.fast`; reduced motion disables all animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="img"` with `aria-label` on the chart root; a visually hidden data table is provided as an accessible alternative.
- Focus rules: focus ring is visible on focused data points; Tab brings focus into the chart and out again.
- Contrast expectations: series stroke and fill colors must be distinguishable without relying solely on hue (pattern or brightness variation is required for multi-series); axis labels meet WCAG AA (4.5:1).
- Reduced motion behavior: entrance animations and tooltip transitions are disabled; chart renders in final state immediately.

---

## 4. Styling Guarantees

- Required tokens: chart background, axis line color, grid line color, series color tokens (one per series, extensible), fill opacity token, tooltip background, tooltip text, legend text.
- Prohibited hardcoded values: no raw hex codes, numeric opacity values, or pixel font sizes.
- Dark mode expectations: fill areas and strokes must remain distinguishable against the dark chart background; grid lines must not disappear.
- Layout rules: fills its container width; height is determined by a size token or explicit prop; axes are rendered within the container bounds.
- Responsive behavior: x-axis label density decreases gracefully on narrow viewports; the chart may switch to a horizontal scroll affordance rather than compressing data at very small widths.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `AreaChart.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
