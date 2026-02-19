# Component Spec — StatCard

## 1. Purpose

Displays a single statistic with a label, a primary value, and a trend indicator (positive, negative, or neutral change). Used in dashboards and summary views where both the current value and its directional change are important.

Use when: a metric must convey not only its current state but also its direction of change over a reference period.

Do NOT use when: only the raw number is needed without trend context — use MetricTile. Do not use for navigation or as a clickable card unless explicitly extended.

---

## 2. UX Intent

- Primary interaction goal: allow users to assess both the current value of a KPI and whether it is improving, declining, or stable.
- Expected user mental model: a financial or analytics readout — a number with an arrow or percentage change that communicates direction.
- UX laws applied:
  - Gestalt (proximity): label, value, and trend are grouped as a single cognitive unit.
  - Doherty Threshold: the card renders immediately with available data; a skeleton state holds space while data loads.
  - Miller's Law: one StatCard = one metric; do not overload a single card with multiple metrics.

---

## 3. Visual Behavior

- Compound component with four sub-parts: `StatCard.Label`, `StatCard.Value`, `StatCard.Trend`.
- The card frame has a contained surface background, rounded corners (radius token), and consistent padding (space token).
- `StatCard.Label` renders in a small, muted typography token (caption/label scale).
- `StatCard.Value` renders in a large, prominent typography token (heading scale).
- `StatCard.Trend` renders a directional indicator (icon + percentage or absolute change) in a color that conveys direction: a success/positive token for increase, a destructive/negative token for decrease, and a muted token for neutral.
- The trend indicator must not rely solely on color to convey direction — an icon (arrow up, arrow down, dash) is required alongside the color.
- Cards are typically arranged in a grid; the parent layout controls spacing between cards.
- Responsive: card expands to fill its grid column; internal layout remains stable.

---

## 4. Interaction Behavior

- Default state: purely presentational, non-interactive.
- If made pressable, it supports idle, hover, focus, and active states using interactive color tokens.
- No controlled/uncontrolled state — this is a display-only component.
- Keyboard behavior: non-interactive by default; focusable only if wrapped in a pressable context.
- Screen reader behavior: all three sub-parts (label, value, trend) are read in document order. Trend direction must be conveyed textually, not only via icon color.
- Motion: no animation on the card shell. If a value count-up animation is applied, it respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- `StatCard.Trend` must include accessible text indicating direction: "Up 12%", "Down 5%", or "No change" — not just an icon and a number.
- Trend icon must have `aria-hidden="true"` since the adjacent text already conveys the direction.
- If the card represents a live-updating metric, the value region should carry `aria-live="polite"`.
- Color used for trend must not be the sole indicator of direction — icon shape is also required.
- All text contrast must meet WCAG AA (4.5:1).
- Positive/negative trend colors must meet 3:1 contrast ratio against the card background for UI component contrast.

---

## 6. Theming Rules

- Required tokens: surface/background token, radius token, space tokens for padding, typography scale tokens for label and value, success/positive color token, destructive/negative color token, muted/neutral color token, muted text token for label.
- Prohibited: no hardcoded colors, pixel padding, or raw font-size values.
- Dark mode: all surface, text, and trend color tokens must resolve correctly in dark themes without consumer overrides.

---

## 7. Composition Rules

- Sub-components (`StatCard.Label`, `StatCard.Value`, `StatCard.Trend`) must only be used inside `StatCard`.
- `StatCard.Trend` is optional — a stat without trend data may omit it.
- Multiple StatCard components are typically arranged using a layout grid or XStack — not nested.
- Anti-patterns:
  - Do not place a chart or sparkline directly inside StatCard — use a dedicated chart card component.
  - Do not nest StatCard inside StatCard.
  - Do not use StatCard for navigation.

---

## 8. Performance Constraints

- Stateless display component — no memoization required by the component itself.
- In dashboard grids with many StatCards, the parent is responsible for virtualization if needed.
- Icon assets used in `StatCard.Trend` must be lightweight (SVG, icon font glyph).

---

## 9. Test Requirements

- Renders `StatCard.Label` content correctly.
- Renders `StatCard.Value` content correctly.
- Renders `StatCard.Trend` with correct direction icon and accessible text when provided.
- Applies success color token for positive trend.
- Applies destructive color token for negative trend.
- Applies muted color token for neutral trend.
- Trend icon has `aria-hidden="true"`.
- Trend accessible text is readable by screen readers.
- Does not throw when `StatCard.Trend` is omitted.
- Renders correctly in light and dark themes.
