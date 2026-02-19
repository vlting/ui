# Component Spec — CashFlowChart

## 1. Purpose

Visualizes cash inflows and outflows over time as a chart, allowing users to understand the net cash position of a business at a glance.

Use when: displaying time-series cash flow data in an accounting or financial context.

Do NOT use when: displaying non-financial data, categorical comparisons without a time axis, or when a simple numeric summary is sufficient — prefer `FinancialSummaryCard` for that.

---

## 2. UX Intent

- Primary interaction goal: give users an immediate read on cash flow trends — whether the business is gaining or losing liquidity over a period.
- Expected user mental model: users expect a chart with a clear time axis (x) and monetary value axis (y), with positive flow visually distinct from negative flow (e.g., different fill colors above/below a baseline).
- UX laws applied:
  - **Jakob's Law** — follow familiar chart conventions (x = time, y = value, zero baseline).
  - **Gestalt Law of Figure/Ground** — positive and negative regions must be perceptually distinct.
  - **Doherty Threshold** — chart rendering and any tooltip responses must appear within 400 ms to maintain engagement.

---

## 3. Visual Behavior

- Layout rules: fills its container width; height is determined by a size token or explicit prop; never clips data points.
- Spacing expectations: padding around the chart area uses space tokens to ensure data is not obscured by axes or labels.
- Typography rules: axis labels and value annotations use the smallest readable type size token; currency formatting should match the locale supplied via props.
- Token usage: all colors (fills, strokes, axes, grid lines) must reference design tokens — no hardcoded hex values. Positive and negative regions use semantically distinct color tokens (e.g., success and destructive palette entries).
- Responsive behavior: on narrow viewports the x-axis label density must reduce gracefully (fewer tick labels, no overlap); the chart container may switch to a horizontal scroll affordance rather than compressing data.

---

## 4. Interaction Behavior

- States:
  - **idle**: chart is fully rendered with data.
  - **hover / focus**: a tooltip or annotation appears near the nearest data point, showing the date and value.
  - **loading**: a skeleton or placeholder occupies the chart area while data is being supplied.
  - **empty**: a neutral empty-state message is displayed when no data is provided.
  - **error**: an error-state message is displayed when data cannot be rendered.
  - **disabled**: not applicable — the chart is a display-only element.
- Controlled vs uncontrolled: the active time range and selected data point may be controlled externally via props; internal hover state is uncontrolled.
- Keyboard behavior: focusable via Tab; arrow keys move focus between data points; Enter or Space reveals the tooltip for the focused point.
- Screen reader behavior: the chart container has a descriptive `aria-label` summarising the chart title and time range; individual data points expose their date and value via `aria-label` on focusable elements or a visually hidden summary table.
- Motion rules: transitions for tooltip appearance and data-point highlighting use `duration.fast` tokens; all motion respects the `prefers-reduced-motion` media query by disabling or minimising animations.

---

## 5. Accessibility Requirements

- ARIA requirements: `role="img"` with `aria-label` on the chart root when the chart is purely visual; alternatively expose a visually hidden data table as a fallback.
- Focus rules: focus ring must be visible and use the focus color token; focus must never be trapped inside the chart.
- Contrast expectations: all axis labels, grid lines, and data annotations must meet WCAG AA contrast ratio (4.5:1 for text, 3:1 for non-text graphical elements).
- Reduced motion behavior: all entrance animations and tooltip transitions are disabled; the chart renders in its final state immediately.

---

## 6. Theming Rules

- Required tokens: background color, border color, text color (axis labels), positive-value fill token, negative-value fill token, grid line color token, tooltip background and text tokens.
- Prohibited hardcoded values: no raw hex codes, pixel spacing values, or font-size numbers anywhere in the component.
- Dark mode expectations: positive and negative fill tokens must remain distinguishable in dark mode without relying solely on hue; luminosity contrast between the chart background and data series must remain sufficient.

---

## 7. Composition Rules

- What can wrap it: `ChartWrapper` (for consistent title, legend, and action affordances); a card or panel container.
- What it may contain: axis elements, data series paths/areas, grid lines, tooltip overlay, legend entries, an empty/error state slot.
- Anti-patterns:
  - Do not embed business logic (data fetching, calculations) inside this component.
  - Do not hard-code a fixed height — always accept a size token or prop.
  - Do not render more than one chart type within the same component instance.

---

## 8. Performance Constraints

- Memoization rules: the component should avoid re-rendering when props are referentially stable; data arrays should be memoized by the caller.
- Virtualization: not applicable for typical cash flow periods (12–24 data points); if the data series exceeds ~200 points, the caller is responsible for downsampling before passing props.
- Render boundaries: the chart should be wrapped in an error boundary at the feature level, not within this component itself.

---

## 9. Test Requirements

- What must be tested:
  - Renders without error when valid data props are supplied.
  - Renders the empty state when no data is provided.
  - Renders the error state when an error prop is set.
  - Positive and negative value regions are both present in the rendered output when data spans the zero baseline.
- Interaction cases:
  - Keyboard navigation moves focus between data points in sequence.
  - Tooltip appears on focus and disappears on blur.
- Accessibility checks:
  - Chart root has a non-empty `aria-label` or `aria-labelledby`.
  - All focusable data-point elements have descriptive `aria-label` values.
  - No contrast violations on axis labels or value annotations in both light and dark themes.
