# Component Spec — PieChart

## 1. Purpose

Visualizes part-of-whole relationships by dividing a circle into segments proportional to each category's share of a total. Best suited for communicating proportional composition when there are a small number of distinct categories.

Use when: the primary question is "what share does each category represent?" and there are five or fewer meaningful segments.

Do NOT use when: comparing absolute values across categories — use `BarChart` instead. Do NOT use when there are more than five or six segments — the visual becomes unreadable; aggregate smaller slices into an "Other" category or switch to a `BarChart`. Do NOT use for time-series data — use `LineChart` or `AreaChart`.

---

## 2. UX Intent

- Primary interaction goal: allow users to quickly perceive relative proportions among a small set of categories without needing to read numeric values.
- Expected user mental model: users expect a circular chart divided into colored slices, with a legend identifying each category; hovering or focusing on a slice reveals the exact value and percentage.
- UX laws applied:
  - **Gestalt Law of Similarity** — each slice has a distinct color token that matches its legend entry, creating a consistent visual language.
  - **Gestalt Law of Figure/Ground** — slices must contrast clearly against the chart background; segment boundaries (thin strokes) separate adjacent slices.
  - **Doherty Threshold** — tooltip or annotation must appear within 400 ms of hover or focus.
  - **Hick's Law** — limit visible segments to five or fewer; provide an "Other" grouping for additional categories.

---

## 3. Visual Behavior

- Layout rules: the chart renders as a square or proportionally defined area; the pie/donut is centered within the container; optional center label (for donut variant) occupies the inner circle; the legend is placed below or to the right.
- Spacing expectations: gap between the chart and legend uses a space token; legend item spacing uses a tight space token; inner ring radius (donut variant) is defined by a ratio token.
- Typography rules: center label (donut variant) uses the large numeric display token for the total and the caption token for the label; legend item labels use the caption or label type style token; tooltip text uses the caption or body token.
- Token usage: segment fill colors, segment boundary stroke, chart background, legend text, tooltip background and text all reference design tokens.
- Responsive behavior: on narrow viewports, the chart size scales down proportionally; the legend stacks below the chart and may scroll if the item count requires it.

---

## 4. Interaction Behavior

- States:
  - **idle**: all segments rendered at full opacity.
  - **segment hover / focus**: the hovered/focused segment is visually emphasized (slight scale or pull-out effect); other segments are dimmed; a tooltip shows the category name, value, and percentage.
  - **legend item hover**: the corresponding segment is emphasized; others are dimmed.
  - **legend item toggle**: a segment is hidden and the remaining segments re-proportion to fill the total.
  - **loading**: a skeleton circle occupies the chart area.
  - **empty**: a neutral placeholder circle and an empty-state message are displayed.
  - **error**: an error message replaces the chart area.
- Controlled vs uncontrolled: visible segments may be controlled externally; hover state is uncontrolled.
- Keyboard behavior: Tab moves focus into the chart; arrow keys cycle through segments; Enter or Space reveals the tooltip for the focused segment; Escape exits chart focus.
- Screen reader behavior: chart root has `aria-label` describing the chart title and total; each segment has an accessible description with the category name, value, and percentage; a visually hidden data table provides full data access.
- Motion rules: segment entrance animation (expand from center) uses `duration.normal`; hover emphasis uses `duration.fast`; tooltip appearance uses `duration.fast`; reduced motion disables all animations.

---

## 5. Accessibility Requirements

- ARIA requirements: `role="img"` with `aria-label` on the chart root; individual segment paths have `aria-label` with category name, value, and percentage; a visually hidden data table provides a full accessible alternative.
- Focus rules: focus ring is visible on focused segments; Tab navigates into and out of the chart cleanly; focus cycles through segments with arrow keys.
- Contrast expectations: segment fills must be distinguishable from adjacent segments at 3:1 non-text contrast; segment boundary strokes ensure separation between similarly valued segments; legend label text meets WCAG AA (4.5:1).
- Reduced motion behavior: entrance and hover animations are disabled; segments render in their final state immediately; tooltip appears without transition.

---

## 6. Theming Rules

- Required tokens: segment color tokens (one per category slot, extensible), segment boundary stroke token, chart background, center label text tokens (donut variant), legend text color, tooltip background and text, skeleton background.
- Prohibited hardcoded values: no raw hex codes, numeric radii, or pixel font sizes.
- Dark mode expectations: segment fills must remain distinguishable against the dark chart background without relying solely on hue; legend items and tooltip text must maintain sufficient contrast.

---

## 7. Composition Rules

- What can wrap it: `ChartWrapper` (for title, legend, and action affordances); a card or panel; a dashboard grid cell.
- What it may contain: pie/donut path elements, segment boundary strokes, an optional center label slot (donut), a tooltip overlay, a legend, and empty/error state slots.
- Anti-patterns:
  - Do not embed data fetching or percentage calculations inside this component.
  - Do not display more than five to six segments — enforce an "Other" grouping at the data level before passing props.
  - Do not use this component for time-series or trended data.

---

## 8. Performance Constraints

- Memoization rules: data and segment configuration props should be memoized by the caller; the component should not re-render when props are referentially stable.
- Virtualization: not applicable (segment count is intentionally capped).
- Render boundaries: feature-level error boundary; no internal boundary required.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct number of segments from the supplied data.
  - Renders the loading skeleton when the loading prop is set.
  - Renders the empty state when no data is provided.
  - Renders the error state when an error prop is set.
  - Each segment fill color corresponds to the correct category token.
- Interaction cases:
  - Keyboard navigation cycles through segments with arrow keys.
  - Tooltip appears on focus and disappears on blur.
  - Toggling a legend item hides/shows the corresponding segment and re-proportions the chart.
- Accessibility checks:
  - Chart root has a non-empty `aria-label`.
  - Each segment has an `aria-label` with category, value, and percentage.
  - Visually hidden data table is present.
  - Segment fills are distinguishable for color-blind users (not hue-only).
  - No contrast violations on legend text or tooltip in light and dark themes.
