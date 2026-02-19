# Component Spec — LineChart

## 1. Purpose

Visualizes one or more continuous data series as line paths over a shared axis (typically time), emphasizing trend direction and the relationship between values at specific points. Most appropriate when the precise path of change between data points is the primary focus.

Use when: displaying trends in continuous data (e.g., daily active users, conversion rates over time) where the connecting line is meaningful.

Do NOT use when: communicating volume/magnitude through filled area is more important — use `AreaChart`. Do NOT use for categorical comparisons — use `BarChart`. Do NOT use when there are very few data points (three or fewer) — a text comparison is clearer.

---

## 2. UX Intent

- Primary interaction goal: allow users to follow the trajectory of one or more metrics over time and identify significant inflection points.
- Expected user mental model: users expect a time axis (x), a value axis (y), and one or more distinct line paths with associated legend entries; data points may be marked with dot indicators.
- UX laws applied:
  - **Jakob's Law** — time on x, value on y; legend at bottom or right; tooltip on hover — all match established chart conventions.
  - **Gestalt Law of Continuity** — line paths guide the eye naturally from left to right, encoding temporal progression.
  - **Gestalt Law of Similarity** — each series uses a unique color and/or dash pattern so lines remain distinguishable.
  - **Doherty Threshold** — tooltip must appear within 400 ms of hover/focus on a data point.

---

## 3. Visual Behavior

- Layout rules: fills its container width; height is determined by a size token or prop; axes are rendered inside the container bounds with sufficient padding to avoid clipping labels.
- Spacing expectations: chart padding uses space tokens so that extreme data points are not obscured by axis borders; axis label padding uses a tight space token.
- Typography rules: axis labels use the smallest readable type size token; tooltip text uses the caption or body type style token; data point annotations (if enabled) use the caption token.
- Token usage: line stroke colors, axis line and grid line colors, data point dot fill, tooltip background and text, and legend item colors all reference design tokens.
- Responsive behavior: on narrow viewports, the x-axis label density decreases; the chart may scroll horizontally for dense datasets rather than compressing the data.

---

## 4. Interaction Behavior

- States:
  - **idle**: chart fully rendered with all series lines.
  - **hover / focus**: a crosshair or vertical guide appears at the x position; a tooltip shows all series values at that point; the nearest data-point dot is enlarged.
  - **legend item hover**: the corresponding series line is visually emphasized; others are dimmed.
  - **legend item toggle**: a series is shown or hidden.
  - **loading**: a skeleton or placeholder occupies the chart area.
  - **empty**: a neutral empty-state message is displayed.
  - **error**: an error-state message is displayed.
- Controlled vs uncontrolled: visible series may be controlled externally; hover state is uncontrolled.
- Keyboard behavior: Tab moves focus into the chart; arrow keys move the focus indicator between data points along the x axis; Enter or Space reveals the tooltip for the focused point; Escape exits chart focus.
- Screen reader behavior: the chart root has `aria-label` describing the title and data range; each data point has an accessible description with the date/x value and numeric value; a visually hidden data table provides full data access.
- Motion rules: line entrance animation (draw from left to right) uses `duration.normal`; tooltip appearance uses `duration.fast`; reduced motion disables all animations.

---

## 5. Accessibility Requirements

- ARIA requirements: `role="img"` with `aria-label` on the chart root; a visually hidden data table is provided as a full-data alternative.
- Focus rules: focus ring is visible on focused data points; Tab navigates into and out of the chart without trapping focus.
- Contrast expectations: each line stroke must be distinguishable from the chart background at 3:1 non-text contrast; lines must be differentiable from each other without relying solely on hue (use dash patterns or thickness variation as a secondary encoding); axis label text meets WCAG AA (4.5:1).
- Reduced motion behavior: the line-draw entrance animation is disabled; lines render in their final state immediately.

---

## 6. Theming Rules

- Required tokens: chart background, axis line color, grid line color, series stroke color tokens (one per series, extensible), data-point dot fill, tooltip background and text, legend text, skeleton background.
- Prohibited hardcoded values: no raw hex codes, numeric stroke widths hardcoded outside of tokens, or pixel font sizes.
- Dark mode expectations: line strokes and grid lines must remain visible against the dark chart background; axis labels must maintain sufficient contrast.

---

## 7. Composition Rules

- What can wrap it: `ChartWrapper` (for title, legend, and action affordances); a card or panel.
- What it may contain: axis components, line path elements, data-point dot elements, a crosshair/tooltip overlay, a legend, and empty/error state slots.
- Anti-patterns:
  - Do not embed data fetching or data transformation inside this component.
  - Do not hard-code the number of series — accept series data via props.
  - Do not fill the area beneath a line within this component — use `AreaChart` for that.

---

## 8. Performance Constraints

- Memoization rules: data arrays and series configurations should be memoized by the caller; the component should not re-render when props are referentially stable.
- Virtualization: not applicable for typical dataset sizes (< 500 points per series); callers are responsible for downsampling large datasets before passing props.
- Render boundaries: feature-level error boundary; no internal boundary required.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct number of line series from the supplied data.
  - Renders the loading state when the loading prop is set.
  - Renders the empty state when no data is provided.
  - Renders the error state when an error prop is set.
  - Legend items correctly correspond to each series.
- Interaction cases:
  - Keyboard navigation moves the focus indicator across data points.
  - Tooltip appears on focus and disappears on blur.
  - Toggling a legend item hides/shows the corresponding line.
- Accessibility checks:
  - Chart root has a non-empty `aria-label`.
  - Visually hidden data table is present.
  - Series lines are distinguishable for color-blind users (not hue-only).
  - No contrast violations on axis labels and line strokes in light and dark themes.
