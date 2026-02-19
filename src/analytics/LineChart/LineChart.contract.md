# Component Contract — LineChart

## 1. Public API

### Base Props

`LineChart` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

May contain: axis components, line path elements, data-point dot elements, a crosshair/tooltip overlay, a legend, and empty/error state slots.

---

## 2. Behavioral Guarantees

- In `idle` state: chart fully rendered with all series lines.
- In `hover / focus` state: a crosshair or vertical guide appears at the x position; a tooltip shows all series values at that point; the nearest data-point dot is enlarged.
- In `legend item hover` state: the corresponding series line is visually emphasized; others are dimmed.
- In `legend item toggle` state: a series is shown or hidden.
- In `loading` state: a skeleton or placeholder occupies the chart area.
- In `empty` state: a neutral empty-state message is displayed.
- In `error` state: an error-state message is displayed.
- Controlled vs uncontrolled: visible series may be controlled externally; hover state is uncontrolled.
- Keyboard behavior: Tab moves focus into the chart; arrow keys move the focus indicator between data points along the x axis; Enter or Space reveals the tooltip for the focused point; Escape exits chart focus.
- Screen reader behavior: the chart root has `aria-label` describing the title and data range; each data point has an accessible description with the date/x value and numeric value; a visually hidden data table provides full data access.
- Motion rules: line entrance animation (draw from left to right) uses `duration.normal`; tooltip appearance uses `duration.fast`; reduced motion disables all animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="img"` with `aria-label` on the chart root; a visually hidden data table is provided as a full-data alternative.
- Focus rules: focus ring is visible on focused data points; Tab navigates into and out of the chart without trapping focus.
- Contrast expectations: each line stroke must be distinguishable from the chart background at 3:1 non-text contrast; lines must be differentiable from each other without relying solely on hue (use dash patterns or thickness variation as a secondary encoding); axis label text meets WCAG AA (4.5:1).
- Reduced motion behavior: the line-draw entrance animation is disabled; lines render in their final state immediately.

---

## 4. Styling Guarantees

- Required tokens: chart background, axis line color, grid line color, series stroke color tokens (one per series, extensible), data-point dot fill, tooltip background and text, legend text, skeleton background.
- Prohibited hardcoded values: no raw hex codes, numeric stroke widths hardcoded outside of tokens, or pixel font sizes.
- Dark mode expectations: line strokes and grid lines must remain visible against the dark chart background; axis labels must maintain sufficient contrast.
- Layout rules: fills its container width; height is determined by a size token or prop; axes are rendered inside the container bounds with sufficient padding to avoid clipping labels.
- Responsive behavior: on narrow viewports, the x-axis label density decreases; the chart may scroll horizontally for dense datasets rather than compressing the data.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `LineChart.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
