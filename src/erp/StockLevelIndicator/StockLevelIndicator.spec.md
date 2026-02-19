# Component Spec — StockLevelIndicator

## 1. Purpose

Communicates the current stock level of an inventory item relative to defined thresholds (e.g., out of stock, low stock, adequate, overstocked) using a compact visual indicator. It provides an at-a-glance status without requiring the operator to read numeric values.

Use when: displaying stock status inline within inventory tables, supplier cards, or product listings.

Do NOT use when: detailed numeric stock data must be conveyed (use a data cell or detail view), or when tracking progress toward a goal (use ProgressBar instead).

---

## 2. UX Intent

- Primary interaction goal: allow operators to assess stock health instantly without parsing numbers.
- Expected user mental model: a status badge or signal light — red means critical, yellow means caution, green means healthy.
- UX laws applied:
  - Gestalt (Similarity): consistent color and shape semantics across all stock level states so operators develop reliable pattern recognition.
  - Pre-attentive processing: color and iconography communicate status before conscious reading.
  - Miller's Law: limit status levels to a small, memorable set (typically 3–4 states).

---

## 3. Visual Behavior

- Layout: compact inline element; does not expand to fill its container. Typically rendered inline within a table cell or card.
- Visual form: a colored dot, pill, or icon+label combination conveying the stock status tier.
- Typography (if label is shown): uses a caption or label scale token; label is optional and may be hidden for compact layouts.
- Token usage: status colors (out of stock, low, adequate, overstock) use semantic color tokens (danger, warning, success, info) — not raw color values.
- Responsive behavior: on narrow viewports, the label may be hidden, leaving only the color indicator visible. Tooltip may surface the label on hover or long-press.

---

## 4. Interaction Behavior

- States:
  - Out of stock: danger semantic token applied.
  - Low stock: warning semantic token applied.
  - Adequate: success semantic token applied.
  - Overstock: info or neutral semantic token applied.
  - No data/Unknown: muted/neutral token applied.
- The indicator is non-interactive by default (display only).
- If made interactive (e.g., tappable to open stock detail), it must receive a hover and focus state.
- Keyboard behavior: if interactive, it is focusable via Tab and activatable via Enter or Space.
- Screen reader behavior: the status is communicated via an accessible label or `aria-label` (e.g., "Low stock"), not solely via color.
- Motion rules: no animation by default; if a transition between states is animated, it respects reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: when display-only, uses `role="img"` with an `aria-label` describing the stock status. When interactive, uses `role="button"` with an accessible label.
- Focus: if interactive, focus ring is visible and meets contrast requirements.
- Contrast: the indicator color must meet WCAG AA contrast ratios against its background.
- Color alone: status must never be communicated by color alone; an icon or text label must accompany color.
- Reduced motion: any state-change animation is suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: danger, warning, success, info, and muted semantic color tokens for each stock state; background token for the indicator surface (if pill/badge form).
- Prohibited hardcoded values: no hardcoded hex colors, pixel sizes, or font sizes.
- Dark mode: semantic tokens must resolve to accessible, distinguishable values in dark mode.

---

## 7. Composition Rules

- What can wrap it: table cells, list item rows, SupplierCard, product detail views, dashboard widgets.
- What it may contain: a color indicator (dot, bar, or icon) and an optional text label slot.
- Anti-patterns:
  - Do not use StockLevelIndicator to convey progress toward a numeric goal (use ProgressBar).
  - Do not use it as the sole mechanism for critical alerts (pair with ReorderAlertBanner for actionable urgency).
  - Do not stack multiple StockLevelIndicators for a single item.

---

## 8. Performance Constraints

- Memoization: the indicator should be memoized; it should only re-render when its status prop changes.
- Virtualization: not applicable; it is a leaf-level display element.
- Render boundaries: no internal state subscriptions; receive status as a prop.

---

## 9. Test Requirements

- Render: each status state (out of stock, low, adequate, overstock, unknown) renders the correct semantic color token and label.
- Accessibility: `aria-label` or equivalent is present and matches the current status; status is not communicated by color alone.
- Interactive variant: if interactive, focus ring is visible; Enter/Space activates the element.
- Theming: semantic tokens are applied; no hardcoded colors; dark mode tokens resolve correctly.
- Reduced motion: any transition animation is suppressed when reduced motion preference is active.
