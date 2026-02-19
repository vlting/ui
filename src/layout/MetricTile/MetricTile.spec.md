# Component Spec — MetricTile

## 1. Purpose

Displays a single key metric in a compact, scannable tile format, combining a label, a primary value, and an optional icon. Used in dashboards, summary views, and overview screens where multiple metrics are shown side by side.

Use when: presenting a single quantitative or qualitative measurement with a descriptive label, optionally accompanied by an icon for context.

Do NOT use when: the metric requires rich explanation, trend history, or comparison data — use StatCard instead. Do not use for navigation — use a Card with a link affordance.

---

## 2. UX Intent

- Primary interaction goal: allow users to quickly scan and comprehend a key number or status at a glance.
- Expected user mental model: a labeled readout — similar to a gauge or instrument panel tile.
- UX laws applied:
  - Miller's Law: tiles should each surface a single metric to keep working memory load low.
  - Gestalt (proximity/similarity): label, value, and icon are grouped visually to form a single cognitive unit.
  - Doherty Threshold: the tile renders immediately with available data; skeleton states or placeholders are shown while data loads.

---

## 3. Visual Behavior

- Compound component with three sub-parts: `MetricTile.Label`, `MetricTile.Value`, `MetricTile.Icon`.
- The frame is a contained block with a background surface, rounded corners (radius token), and consistent internal padding (space token).
- `MetricTile.Icon` is optional and may be positioned at the top-left, top-right, or leading edge depending on layout variant.
- `MetricTile.Value` displays the primary number or text in a large, prominent type size (typography scale token — heading level).
- `MetricTile.Label` displays a short descriptor in a smaller, muted type size (typography scale token — caption/label level).
- The tile does not scroll; content must fit within its bounds. Text truncation applies if content overflows.
- Tiles are typically arranged in a grid or row; spacing between tiles is the responsibility of the parent layout.
- Responsive: tile width adapts to its grid column; font sizes and padding remain token-driven.

---

## 4. Interaction Behavior

- Default state: static, non-interactive display element.
- If the tile is made interactive (e.g., pressable), it supports idle, hover, focus, and active states; no pressed visual should be applied without an explicit interactive prop.
- No controlled/uncontrolled state — this is a pure display component.
- Keyboard behavior: non-interactive by default; if wrapped in a pressable context, it is focusable and activatable via Enter/Space.
- Screen reader behavior: the label and value are read in document order. The icon is decorative by default and hidden from the accessibility tree unless a meaningful label is provided.
- Motion: no animation by default. If a value update is animated (count-up), motion respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- `MetricTile.Icon` must have `aria-hidden="true"` when decorative, or an `aria-label` when it conveys meaning.
- `MetricTile.Label` and `MetricTile.Value` must be rendered as text elements readable by screen readers.
- If the tile represents a live-updating metric, it should carry `aria-live="polite"` on the value region.
- Color contrast for the value text must meet WCAG AA (4.5:1).
- Color contrast for the label text must meet WCAG AA (4.5:1).
- Do not rely solely on color to distinguish metric states (positive/negative).

---

## 6. Theming Rules

- Required tokens: surface/background color, border color, radius token, space tokens for padding, typography scale tokens for value and label, icon color token, muted text color token for label.
- Prohibited: no hardcoded hex colors, px values for padding/font sizes, or inline styles.
- Dark mode: surface background, text, and icon color tokens must resolve correctly in dark themes without consumer overrides.

---

## 7. Composition Rules

- Sub-components (`MetricTile.Label`, `MetricTile.Value`, `MetricTile.Icon`) must only be used inside `MetricTile`.
- `MetricTile.Icon` accepts an icon element as a child; it does not render its own icon set.
- Multiple MetricTile components are typically arranged using a layout primitive (XStack, grid) — not nested inside each other.
- Anti-patterns:
  - Do not place trend graphs or sparklines inside MetricTile — use StatCard.
  - Do not nest MetricTile inside MetricTile.
  - Do not use MetricTile as a navigation element without an explicit interactive wrapper.

---

## 8. Performance Constraints

- MetricTile is a pure presentational component with no internal state — no memoization overhead.
- If used in a large dashboard grid with many tiles, the parent should consider list virtualization; MetricTile itself imposes no virtualization requirements.
- Icon content should be lightweight (SVG, icon font glyph) to avoid layout shifts.

---

## 9. Test Requirements

- Renders `MetricTile.Label` content correctly.
- Renders `MetricTile.Value` content correctly.
- Renders `MetricTile.Icon` when provided and hides it from accessibility tree when decorative.
- Does not render `MetricTile.Icon` region when no icon is supplied.
- Text content is accessible to screen readers.
- Applies correct token-based styles for light and dark themes.
- Does not throw when any optional sub-component is omitted.
