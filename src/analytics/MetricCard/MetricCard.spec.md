# Component Spec — MetricCard

## 1. Purpose

Displays a single key performance indicator (KPI) or metric value with its label, an optional trend indicator (delta vs. a previous period), and optional supporting context (period label, sparkline). Intended for dashboard and overview views requiring a quick, scannable snapshot of a metric.

Use when: surfacing a single analytics KPI on a dashboard, report header, or summary panel.

Do NOT use when: presenting financial accounting metrics — use `FinancialSummaryCard` for that. Do NOT use for displaying detailed tabular data or multi-dimensional breakdowns.

---

## 2. UX Intent

- Primary interaction goal: allow users to read the current value and trend of a metric at a glance without needing to navigate to a detail view.
- Expected user mental model: users expect a compact tile with a large, prominent number, a short descriptive label, and a delta indicator that communicates whether the metric is moving in a positive or negative direction.
- UX laws applied:
  - **Gestalt Law of Proximity** — the metric value and label are grouped tightly; the delta indicator is placed adjacent to the value; the period label is visually subordinated.
  - **Doherty Threshold** — the card must show a skeleton immediately if data is not yet available; the final state must appear within 400 ms.
  - **Jakob's Law** — metric card layout (large number + small label + delta arrow) is a well-established KPI tile pattern.

---

## 3. Visual Behavior

- Layout rules: fixed or fluid card container with defined min/max width tokens; internal layout is a vertical stack — label (above or below), metric value (prominent), delta row, optional sparkline area at the bottom.
- Spacing expectations: card padding uses space tokens (medium scale); gap between value and delta uses a tight space token.
- Typography rules: metric value uses the largest numeric display type style token; label uses the caption or label type style token; delta text uses the caption token with semantic coloring (positive/negative); period label uses the caption token in a muted color.
- Token usage: card background, border, shadow, metric text, label text, positive delta color, negative delta color, and sparkline stroke all reference design tokens.
- Responsive behavior: cards may be arranged in a responsive grid; each card maintains its internal layout regardless of grid column count.

---

## 4. Interaction Behavior

- States:
  - **idle**: fully rendered with the metric value and trend data.
  - **loading**: a skeleton placeholder with animated shimmer (disabled under reduced motion).
  - **empty**: a neutral dash or em-dash is shown in place of the metric value.
  - **error**: an error icon and a short message replace the metric value.
  - **hover / focus** (if the card is interactive): subtle elevation or border change using the hover token; focus ring visible on keyboard navigation.
- Controlled vs uncontrolled: fully controlled — all data, loading, and error states are supplied via props.
- Keyboard behavior: if the card is interactive (navigates to a detail view), it must be focusable and activatable with Enter or Space.
- Screen reader behavior: the card exposes a descriptive accessible name combining the label, value, and trend (e.g., "Monthly Active Users: 12,400, up 8% from last month").
- Motion rules: skeleton shimmer uses `duration.normal`; state transitions use `duration.fast`; all animations respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA requirements: interactive cards use `role="button"` or are rendered as `<a>` elements; display-only cards need no interactive ARIA; trend icons are accompanied by visually hidden text equivalents (e.g., "increased" or "decreased").
- Focus rules: focus ring must be visible; focus must not be trapped within the card.
- Contrast expectations: metric value meets WCAG AA (4.5:1) against the card background; delta text meets AA in both light and dark themes; sparkline stroke meets 3:1 non-text contrast.
- Reduced motion behavior: skeleton shimmer and transition animations are disabled; the card renders in its final state immediately.

---

## 6. Theming Rules

- Required tokens: card background, card border, card shadow, metric value text color, label text color, positive delta color token, negative delta color token, sparkline stroke token, skeleton background token.
- Prohibited hardcoded values: no raw hex codes, numeric padding, or font sizes.
- Dark mode expectations: card background must be distinguishable from the page background in dark mode; positive and negative delta colors must remain semantically distinct.

---

## 7. Composition Rules

- What can wrap it: a dashboard grid, a summary row, a report section header.
- What it may contain: a label slot, a primary metric value slot, an optional delta/trend slot, an optional period label slot, an optional sparkline slot, and an optional action slot (e.g., "See breakdown").
- Anti-patterns:
  - Do not embed data fetching or metric calculation inside this component.
  - Do not display more than one primary metric value — use multiple `MetricCard` instances instead.
  - Do not confuse this component with `FinancialSummaryCard` — this is for analytics KPIs, not accounting figures.

---

## 8. Performance Constraints

- Memoization rules: the card is stateless; memoization is warranted when rendered in a large dashboard grid that re-renders frequently.
- Virtualization: not applicable.
- Render boundaries: a feature-level error boundary should wrap the card; no internal boundary required.

---

## 9. Test Requirements

- What must be tested:
  - Renders the label and metric value from props.
  - Renders the loading skeleton when the loading prop is set.
  - Renders the empty state when no value is provided.
  - Renders the error state when an error prop is set.
  - Delta indicator displays the correct semantic color and icon for positive and negative deltas.
  - Sparkline is rendered when sparkline data is provided.
- Interaction cases:
  - Interactive card is focusable and activatable with Enter or Space.
  - Hover state applies the correct hover token.
- Accessibility checks:
  - Accessible name is present and descriptive (includes label, value, and trend).
  - Trend icons have text equivalents.
  - No contrast violations on metric value, label, and delta text in both light and dark themes.
