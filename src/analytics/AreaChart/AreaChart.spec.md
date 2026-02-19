# Component Spec — AreaChart

## 1. Purpose

Visualizes one or more data series over a continuous axis (typically time) using filled areas beneath line paths. Best suited for communicating volume, magnitude, and trend — particularly when comparing the relative size of multiple series stacked or overlaid.

Use when: displaying continuous data trends where the filled area conveys cumulative volume or relative proportion (e.g., page views over time, cumulative revenue).

Do NOT use when: comparing discrete categories — use `BarChart` instead. Do NOT use when exact data point values are the primary concern and area filling adds visual noise — use `LineChart` instead.

---

## 2. UX Intent

- Primary interaction goal: allow users to read trends and relative magnitudes across one or more data series at a glance.
- Expected user mental model: users expect a chart with a time axis (x), a value axis (y), and shaded fill areas beneath the lines; overlapping series should be distinguishable by color and optional transparency.
- UX laws applied:
  - **Gestalt Law of Figure/Ground** — filled areas must contrast clearly against the chart background; overlapping series use transparency to remain legible.
  - **Gestalt Law of Similarity** — each series has a consistent color and fill that matches its legend entry.
  - **Doherty Threshold** — tooltip responses to hover/focus must appear within 400 ms.
  - **Jakob's Law** — axis placement (x = time, y = value) and tooltip behavior follow established chart conventions.

---

## 3. Visual Behavior

- Layout rules: fills its container width; height is determined by a size token or explicit prop; axes are rendered within the container bounds.
- Spacing expectations: padding between the chart boundary and the data area is derived from space tokens; axis labels do not overlap data series.
- Typography rules: axis labels use the smallest readable type size token; tooltip text uses the caption or body type style token.
- Token usage: series fill colors, stroke colors, axis line color, grid line color, tooltip background and text, and legend item colors all reference design tokens.
- Responsive behavior: x-axis label density decreases gracefully on narrow viewports; the chart may switch to a horizontal scroll affordance rather than compressing data at very small widths.

---

## 4. Interaction Behavior

- States:
  - **idle**: chart fully rendered with data.
  - **hover / focus**: crosshair or vertical guide line appears; a tooltip shows values for all series at the hovered/focused x position.
  - **legend item hover**: the corresponding series is visually emphasized; other series are dimmed.
  - **legend item toggle**: a series is shown or hidden.
  - **loading**: a skeleton or placeholder occupies the chart area.
  - **empty**: a neutral empty-state message is displayed.
  - **error**: an error-state message is displayed.
- Controlled vs uncontrolled: visible series and active data point may be controlled externally; hover state is uncontrolled.
- Keyboard behavior: Tab moves focus into the chart; arrow keys move a focus indicator along the x axis data points; Enter or Space shows the tooltip for the focused point.
- Screen reader behavior: chart root has `aria-label` describing the chart title and data range; a visually hidden summary table or data list provides full data access.
- Motion rules: series entrance animations use `duration.normal`; tooltip appearance uses `duration.fast`; reduced motion disables all animations.

---

## 5. Accessibility Requirements

- ARIA requirements: `role="img"` with `aria-label` on the chart root; a visually hidden data table is provided as an accessible alternative.
- Focus rules: focus ring is visible on focused data points; Tab brings focus into the chart and out again.
- Contrast expectations: series stroke and fill colors must be distinguishable without relying solely on hue (pattern or brightness variation is required for multi-series); axis labels meet WCAG AA (4.5:1).
- Reduced motion behavior: entrance animations and tooltip transitions are disabled; chart renders in final state immediately.

---

## 6. Theming Rules

- Required tokens: chart background, axis line color, grid line color, series color tokens (one per series, extensible), fill opacity token, tooltip background, tooltip text, legend text.
- Prohibited hardcoded values: no raw hex codes, numeric opacity values, or pixel font sizes.
- Dark mode expectations: fill areas and strokes must remain distinguishable against the dark chart background; grid lines must not disappear.

---

## 7. Composition Rules

- What can wrap it: `ChartWrapper` (for title, legend, and action affordances); a card or panel.
- What it may contain: axis components, area path elements, a crosshair/tooltip overlay, a legend, and empty/error state slots.
- Anti-patterns:
  - Do not embed data fetching or data transformation inside this component.
  - Do not hard-code the number of series — accept series data via props.
  - Do not mix area and bar series within this component; use `ChartWrapper` to compose multiple chart types if needed.

---

## 8. Performance Constraints

- Memoization rules: data arrays and series configurations should be memoized by the caller; the component should not re-render when props are referentially stable.
- Virtualization: not applicable for typical series lengths (< 500 points); callers are responsible for downsampling large datasets before passing props.
- Render boundaries: feature-level error boundary; no internal boundary required.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct number of area series from the supplied data.
  - Renders the loading state when the loading prop is set.
  - Renders the empty state when no data is provided.
  - Renders the error state when an error prop is set.
  - Legend items correctly correspond to each series.
- Interaction cases:
  - Keyboard navigation moves the focus indicator across data points in sequence.
  - Tooltip appears on focus and disappears on blur.
  - Toggling a legend item hides/shows the corresponding series.
- Accessibility checks:
  - Chart root has a non-empty `aria-label`.
  - Visually hidden data table is present.
  - Series colors are distinguishable for color-blind users (not hue-only).
  - No contrast violations on axis labels in both light and dark themes.
