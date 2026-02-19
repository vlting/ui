# Component Spec — InventoryStatusBadge

## 1. Purpose

Displays a compact, at-a-glance indicator of a product's current inventory status — such as "In Stock", "Low Stock", "Out of Stock", or "Pre-Order" — to help users make informed purchase decisions without reading detailed text.

Use when: a product listing, product card, or cart item needs to communicate availability status clearly and concisely.

Do NOT use for: price displays, promotional labels (use a separate badge component), or any status that is not directly related to inventory availability.

---

## 2. UX Intent

- Primary interaction goal: communicate product availability at a glance before the user invests time evaluating the product.
- Expected user mental model: a colored status chip or label — users recognize "In Stock" green and "Out of Stock" red from widespread ecommerce convention (Jakob's Law).
- UX laws applied:
  - Pre-attentive processing (Gestalt): color and label shape communicate status before the user reads the text.
  - Doherty Threshold: the badge renders synchronously; it is never async-loaded.
  - Hick's Law: the badge conveys a single piece of information — one status at a time.

---

## 3. Visual Behavior

- Layout: a compact inline pill or chip with a short text label and optionally a leading status dot or icon.
- Status variants: In Stock (semantic success color), Low Stock (semantic warning color), Out of Stock (semantic error/muted color), Pre-Order (semantic info/accent color).
- Shape: pill (fully rounded) or rounded-rectangle using a radius token.
- Typography: label uses a small body or label type token; no font size is hardcoded.
- Token usage: background, text, and optional dot/icon color are sourced from semantic status tokens.
- Responsive: the badge scales inline with surrounding text; it does not wrap.

---

## 4. Interaction Behavior

- The badge is display-only — it is not interactive.
- No hover, focus, or press states.
- No controlled/uncontrolled distinction; the status is determined entirely by a prop.
- Keyboard behavior: not independently focusable.
- Screen reader behavior: the badge text is read inline as part of the surrounding content. If the badge is the sole indicator of availability, its text must be present in the DOM (not icon-only).
- Motion: none — this is a static display component.

---

## 5. Accessibility Requirements

- The badge must not rely on color alone — the text label must always be present.
- If an icon or dot is used alongside the label, it must be `aria-hidden="true"`.
- The badge text must be readable by screen readers without an additional `aria-label` if it is visible text.
- If the badge is used in a context where it provides the only indication of availability (e.g., no surrounding text), the parent must provide additional context.
- Contrast: badge label text meets 4.5:1 against the badge background; badge background meets 3:1 against the surrounding surface.
- No reduced motion requirements — no animation.

---

## 6. Theming Rules

- Required tokens: semantic status tokens — success (In Stock), warning (Low Stock), error/muted (Out of Stock), info/accent (Pre-Order) — for both background and text. Radius token for badge shape.
- Prohibited hardcoded values: no raw hex colors, no hardcoded font sizes or pixel padding.
- Dark mode: all status variant colors must resolve correctly via theme tokens in both light and dark contexts.

---

## 7. Composition Rules

- What can wrap it: ProductCard, CartItemRow, a product detail page header, OrderHistoryTable rows.
- What it may contain: an optional leading dot or icon, and a text label.
- Anti-patterns:
  - Do not use InventoryStatusBadge to display prices, promotions, or non-inventory information.
  - Do not stack multiple InventoryStatusBadge components for the same product on the same surface.
  - Do not render a badge without a visible text label (icon-only is inaccessible).

---

## 8. Performance Constraints

- Renders synchronously — no lazy loading.
- Memoize when used inside a long product list.
- No virtualization required.

---

## 9. Test Requirements

- Renders the correct label and semantic variant for each status: In Stock, Low Stock, Out of Stock, Pre-Order.
- Badge background and text color correspond to the correct semantic status token for each variant.
- Color is not the sole differentiator — label text is always present.
- Any icon or dot has `aria-hidden="true"`.
- Badge is not focusable via keyboard.
- Passes automated accessibility audit.
- Snapshot test for each status variant in light and dark theme.
