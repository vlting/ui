# Component Spec — ConversionStatCard

## 1. Purpose

Displays a single key conversion or performance metric — such as click-through rate, conversion rate, or revenue — in a compact, prominent card format.

Use when: summarizing a single quantitative marketing metric on dashboards or report summaries.

Do NOT use when: displaying multiple metrics that belong together as a group (use `CampaignCard.Metrics`) or displaying non-numeric descriptive data.

---

## 2. UX Intent

- Primary interaction goal: communicate a single metric value and its context (label, trend, comparison period) immediately and without ambiguity.
- Expected user mental model: a KPI tile — a value, a label, and optionally a trend indicator — familiar from analytics dashboards.
- UX laws applied:
  - **Doherty Threshold** — metric value must render immediately; no deferred or lazy content.
  - **Gestalt (Figure/Ground)** — the metric value is the visual focal point; the label and trend are secondary.
  - **Miller's Law** — one primary metric per card; do not add secondary metrics that compete for attention.

---

## 3. Visual Behavior

- Layout: vertical stack — label on top (or bottom), large metric value in center, optional trend indicator below the value.
- Trend indicator: an icon + percentage or absolute delta communicating improvement, decline, or neutral change; must not rely on color alone.
- Spacing: all padding and gap values reference space tokens.
- Typography: metric value uses a large numeric/data token; label uses a small muted token; trend uses a caption token.
- Token usage: background, border, trend color (positive/negative/neutral tokens), and text colors reference theme tokens only.
- Responsive behavior: card occupies full width in single-column layouts; fixed size in grid layouts.

---

## 4. Interaction Behavior

- States:
  - **idle**: renders metric value, label, and trend.
  - **hover** (pointer devices): subtle background shift if the card is pressable.
  - **focus**: visible focus ring if pressable.
  - **loading**: skeleton or placeholder visible while data is not yet available.
  - **error**: an error state communicates that the metric could not be loaded.
- The card is not interactive by default; pressable behavior is opt-in via consumer wrapping.
- Controlled/uncontrolled: no internal state; all data is provided via props.
- Keyboard behavior: if pressable, activates on `Enter` and `Space`.
- Screen reader behavior: announces label, value, and trend direction (e.g., "Conversion rate, 4.2%, up 0.8% from last period").
- Motion rules: trend icon or value change animations respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA: `role="figure"` or `role="img"` with an `aria-label` combining label and value when the card is purely presentational; `role="article"` in a list context.
- Trend direction must be communicated via text or `aria-label`, not color alone.
- Contrast: metric value and label text must meet WCAG 2.1 AA (4.5:1).
- Positive/negative trend tokens must achieve 3:1 contrast against their backgrounds.
- Reduced motion: suppress any counting animations or entrance animations.

---

## 6. Theming Rules

- Required tokens: `background`, `backgroundHover`, `borderColor`, `color`, `colorMuted`, `colorPositive`, `colorNegative`, `colorNeutral`, `space`, `borderRadius`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or font-size values.
- Dark mode: positive/negative/neutral tokens must maintain sufficient contrast in dark themes.

---

## 7. Composition Rules

- Stands alone as a self-contained metric display.
- May be placed inside a grid or flex container alongside other `ConversionStatCard` instances.
- Does not fetch data; all values, labels, and trends are provided externally.
- Anti-patterns:
  - Do not embed multiple primary metrics inside a single card; use `CampaignCard.Metrics` for grouped metrics.
  - Do not hardcode metric labels, values, or trend symbols.

---

## 8. Performance Constraints

- Memoize when rendered inside a frequently updating dashboard.
- No internal data fetching, subscriptions, or timers.
- Loading/skeleton state is rendered by the consumer; the component accepts a loading prop.

---

## 9. Test Requirements

- Renders label, value, and trend from props.
- Trend indicator shows correct direction icon and text (not color alone).
- Loading state renders a visible placeholder.
- Error state renders a meaningful error message.
- Focus ring is visible when focused via keyboard (if pressable).
- Trend direction is announced correctly by screen readers.
- No hardcoded color, spacing, or font-size values appear in rendered output.
- Passes axe accessibility audit in idle, loading, and error states.
