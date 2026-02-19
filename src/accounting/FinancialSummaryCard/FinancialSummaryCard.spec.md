# Component Spec — FinancialSummaryCard

## 1. Purpose

Displays a compact summary of a key financial metric or set of related metrics (e.g., total revenue, net income, outstanding payables) in a card format. Intended for dashboard and overview views where users need a quick, scannable snapshot of financial health.

Use when: presenting a single KPI or a small group of related financial figures with optional supporting context (period label, trend indicator, comparison value).

Do NOT use when: displaying detailed transaction lists or multi-dimensional data — use `LedgerTable` or a chart component instead. Do NOT use for non-financial metrics — prefer the analytics `MetricCard` for that purpose.

---

## 2. UX Intent

- Primary interaction goal: allow users to assess a financial figure instantly without reading prose or navigating deeper.
- Expected user mental model: users expect a self-contained card with a headline metric, a clear label describing what it measures, and optional supporting context (e.g., "vs. last period", trend arrow).
- UX laws applied:
  - **Gestalt Law of Proximity** — the metric value and its label are grouped tightly; contextual comparison data is visually separated.
  - **Doherty Threshold** — the card must render its placeholder/skeleton immediately if real data is not yet available, with the final state appearing within 400 ms.
  - **Jakob's Law** — card layout follows familiar KPI tile conventions (large number, small label, optional delta).

---

## 3. Visual Behavior

- Layout rules: fixed or fluid card container with defined min/max width tokens; internal layout is a vertical stack — label at top or bottom, metric value prominent in the center, delta/context line below.
- Spacing expectations: card padding uses space tokens (medium scale); gap between metric value and label uses a tight space token.
- Typography rules: metric value uses the largest numeric display type style token; the label uses the caption or label type style token; the delta/context line uses the caption token with semantic coloring.
- Token usage: card background, border, shadow, text, positive delta color, and negative delta color all reference design tokens.
- Responsive behavior: cards may be displayed in a responsive grid; each card maintains its internal layout regardless of grid column count.

---

## 4. Interaction Behavior

- States:
  - **idle**: fully rendered with data.
  - **loading**: a skeleton placeholder occupies the card area with animated shimmer (reduced to static if reduced motion is active).
  - **empty**: a neutral dash or em-dash is shown in place of the metric value with a muted label.
  - **error**: an error indicator (icon + short message) replaces the metric value.
  - **hover / focus** (if the card is interactive): a subtle elevation or border change using the hover token; focus ring visible on keyboard navigation.
  - **disabled**: not applicable for display-only usage.
- Controlled vs uncontrolled: the card is fully controlled — all data, loading, and error states are supplied via props.
- Keyboard behavior: if the card is interactive (e.g., navigates to a detail view on click), it must be focusable and activatable with Enter or Space.
- Screen reader behavior: the card exposes a descriptive accessible name combining the label and value; trend information (up/down) includes a text equivalent (e.g., "up 12% from last period").
- Motion rules: skeleton shimmer uses `duration.normal` tokens; state transitions (loading to loaded) use `duration.fast`; all animations respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA requirements: interactive cards use `role="button"` or are rendered as `<a>` elements; purely display cards use no interactive ARIA; trend icons are accompanied by visually hidden text equivalents.
- Focus rules: focus ring must be visible; focus must not be trapped within the card.
- Contrast expectations: metric value text meets WCAG AA (4.5:1) against the card background; delta text (positive/negative) meets AA in both light and dark themes.
- Reduced motion behavior: skeleton shimmer and transition animations are disabled; the card renders in its final visual state immediately.

---

## 6. Theming Rules

- Required tokens: card background, card border, card shadow, metric value text color, label text color, positive delta color token, negative delta color token, skeleton background token.
- Prohibited hardcoded values: no raw hex codes, numeric padding, or font sizes.
- Dark mode expectations: card background must be distinguishable from the page background in dark mode; positive and negative delta colors must remain semantically distinct without relying solely on hue.

---

## 7. Composition Rules

- What can wrap it: a dashboard grid, a summary row, a report header section.
- What it may contain: a label slot, a primary metric value slot, an optional delta/trend slot, an optional period/context label slot, an optional action slot (e.g., "View details" link).
- Anti-patterns:
  - Do not embed data fetching or computation inside this component.
  - Do not display more than one "primary" metric value — if multiple figures are needed, use multiple `FinancialSummaryCard` instances.
  - Do not use this component to replace a full accounting report table.

---

## 8. Performance Constraints

- Memoization rules: the card is stateless; memoization is warranted when rendered in a large dashboard grid that re-renders frequently.
- Virtualization: not applicable.
- Render boundaries: a feature-level error boundary should wrap the card; no internal error boundary is required.

---

## 9. Test Requirements

- What must be tested:
  - Renders the label and metric value from props.
  - Renders the loading skeleton when the loading prop is set.
  - Renders the empty state when no value is provided.
  - Renders the error state when an error prop is set.
  - Delta indicator displays the correct semantic color for positive and negative values.
- Interaction cases:
  - Interactive card is focusable and activatable with Enter or Space.
  - Hover state applies the correct token.
- Accessibility checks:
  - Accessible name is present and descriptive.
  - Trend icons have text equivalents.
  - No contrast violations in metric value, label, and delta text in both light and dark themes.
