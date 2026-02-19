# Component Spec — BarChart

## 1. Purpose

Visualizes categorical or time-series data as a series of rectangular bars, where bar length encodes the magnitude of each value. Supports vertical (column) and horizontal bar orientations, as well as grouped and stacked variants.

Use when: comparing discrete values across categories or time periods where exact bar length is the primary visual encoding.

Do NOT use when: the data is continuous and trend/volume is more important than individual category comparison — use `AreaChart` or `LineChart`. Do NOT use for part-of-whole relationships where proportional area matters more — use `PieChart`.

---

## 2. UX Intent

- Primary interaction goal: allow users to compare values across categories quickly by reading bar lengths against a common baseline.
- Expected user mental model: users expect bars to start from a zero baseline, with a labeled category axis and a value axis; grouped bars share the same category; stacked bars show decomposition of a total.
- UX laws applied:
  - **Jakob's Law** — vertical bars (columns) are the default for time-series; horizontal bars are used for long category labels.
  - **Gestalt Law of Similarity** — bars belonging to the same series share a consistent color token.
  - **Gestalt Law of Proximity** — bars within the same category group are placed adjacent to each other with minimal gap.
  - **Doherty Threshold** — tooltip response must appear within 400 ms of hover or focus.

---

## 3. Visual Behavior

- Layout rules: fills its container width; height determined by a size token or prop; the baseline is always visible; bars do not clip outside the chart area.
- Spacing expectations: gap between category groups uses a space token; bar width and inter-bar gap within a group are derived from the available space and a configured ratio token.
- Typography rules: axis labels and category labels use the smallest readable type size token; value annotations (if shown on bars) use the caption token.
- Token usage: bar fill colors, axis colors, grid line colors, tooltip background and text, and legend item colors all reference design tokens.
- Responsive behavior: on narrow viewports, switch to horizontal orientation if many categories are present; reduce label density on the category axis.

---

## 4. Interaction Behavior

- States:
  - **idle**: chart fully rendered.
  - **bar hover / focus**: the hovered/focused bar is highlighted using a highlight token; a tooltip shows the category, series, and value.
  - **legend item toggle**: a series is shown or hidden.
  - **loading**: skeleton bars occupy the chart area.
  - **empty**: a neutral empty-state message is displayed.
  - **error**: an error-state message is displayed.
- Controlled vs uncontrolled: visible series may be controlled externally; hover state is uncontrolled.
- Keyboard behavior: Tab moves focus into the chart; arrow keys navigate between bars; Enter or Space shows the tooltip for the focused bar.
- Screen reader behavior: chart root has `aria-label`; each bar has an accessible description including category, series, and value; a visually hidden data table provides full data access.
- Motion rules: bar entrance animations (grow from baseline) use `duration.normal`; tooltip appearance uses `duration.fast`; reduced motion disables all animations.

---

## 5. Accessibility Requirements

- ARIA requirements: `role="img"` with `aria-label` on the chart root; individual bars have `aria-label` with category and value; visually hidden data table present.
- Focus rules: focus ring is visible on focused bars; Tab navigates into and out of the chart cleanly.
- Contrast expectations: bar fills must meet WCAG AA 3:1 non-text contrast against the chart background; axis and grid line colors must meet 3:1; bar value annotation text meets 4.5:1.
- Reduced motion behavior: entrance growth animation is disabled; bars render at full height immediately.

---

## 6. Theming Rules

- Required tokens: chart background, axis line color, grid line color, bar fill tokens (per series), bar hover highlight token, tooltip background and text, legend text, skeleton background.
- Prohibited hardcoded values: no raw hex codes, numeric bar width ratios, or pixel font sizes.
- Dark mode expectations: bar fills and backgrounds must maintain sufficient contrast in dark mode; grid lines must remain visible.

---

## 7. Composition Rules

- What can wrap it: `ChartWrapper` (for title, legend, and actions); a card or panel.
- What it may contain: axis components, bar elements (grouped or stacked), a tooltip overlay, a legend, value annotation labels, and empty/error state slots.
- Anti-patterns:
  - Do not embed data fetching or aggregation logic inside this component.
  - Do not hard-code the orientation — accept it via a prop.
  - Do not mix bar and line series in the same component; use `ChartWrapper` with multiple chart components for that.

---

## 8. Performance Constraints

- Memoization rules: data and series configuration props should be memoized by the caller; the component should not re-render when props are referentially stable.
- Virtualization: if the category count exceeds a threshold (> 50), the caller must pre-aggregate or paginate before passing props.
- Render boundaries: feature-level error boundary; no internal boundary required.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct number of bars for the supplied data and series.
  - Renders the loading skeleton when the loading prop is set.
  - Renders the empty state when no data is provided.
  - Renders the error state when an error prop is set.
  - Grouped and stacked variants render distinct bar positions.
- Interaction cases:
  - Keyboard navigation moves focus between bars in sequence.
  - Tooltip appears on focus and disappears on blur.
  - Toggling a legend item hides/shows the corresponding series bars.
- Accessibility checks:
  - Chart root has a non-empty `aria-label`.
  - Each bar has a descriptive `aria-label`.
  - Visually hidden data table is present.
  - No contrast violations on bar fills or axis labels in light and dark themes.
