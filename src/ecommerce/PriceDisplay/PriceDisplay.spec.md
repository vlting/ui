# Component Spec — PriceDisplay

## 1. Purpose

Renders a formatted monetary value for a product or line item. It handles display of current price, optional original (struck-through) price when discounted, and optional unit pricing (e.g., "per kg"). It is the single source of truth for how prices are visually rendered across the design system.

Use when: any monetary value needs to be displayed — on product cards, cart items, billing summaries, order reviews, or variant selectors.

Do NOT use for: non-monetary numeric values, inventory quantities, or promotional banner text that contains price but requires custom layout.

---

## 2. UX Intent

- Primary interaction goal: communicate the current price and any savings clearly and instantly.
- Expected user mental model: a price with an optional crossed-out original price and a discount label — a universally recognized pattern in ecommerce (Jakob's Law).
- UX laws applied:
  - Pre-attentive processing: the current price is the largest, most prominent element; the original price is subdued and struck through; the discount label uses an accent color.
  - Tesler's Law: formatting (currency symbol, locale-specific number format, rounding) is handled internally; the consumer passes raw numeric values and a currency code.
  - Doherty Threshold: renders synchronously — no async formatting.

---

## 3. Visual Behavior

- Layout: an inline or stacked arrangement depending on context.
  - Inline: current price, then original price struck-through beside it.
  - Stacked: current price on top, original price below or beside, discount percentage/amount label nearby.
- Current price: uses a heading-small or numeric-emphasis type token; text color from the primary/foreground token.
- Original price (when discounted): uses a body or body-small type token with a strikethrough decoration; color uses a muted/subdued text token.
- Discount label (e.g., "Save 20%" or "−$10"): uses a small label token with a semantic savings/success color token.
- Currency symbol and decimal formatting follow locale conventions; the component accepts a locale prop or inherits from a context.
- Token usage: all text colors, type scale, and spacing from design tokens.
- Responsive: inline on compact surfaces (product cards); may stack on larger detail views.

---

## 4. Interaction Behavior

- Display-only — not interactive.
- No hover, focus, or press states.
- No controlled/uncontrolled distinction.
- Keyboard behavior: not independently focusable.
- Screen reader behavior: the current price is read first; if a struck-through original price is present, it is read as "was [original price]" or via a visually-hidden label; the discount label is read as part of the flow.
- Motion: none.

---

## 5. Accessibility Requirements

- Struck-through original price must not rely solely on the `text-decoration: line-through` style for meaning — a visually-hidden text label (e.g., "Original price: $50.00") must be present for screen readers.
- Discount label uses text, not color alone, to convey savings.
- Current price text has `aria-label` or is read naturally from the DOM; if the currency symbol could be ambiguous (e.g., "$" vs. "US $"), an `aria-label` with the full currency name or formatted price is provided.
- Contrast: current price meets 4.5:1; original price (muted) meets 4.5:1 against its background; discount label meets 4.5:1.
- No reduced motion requirements.

---

## 6. Theming Rules

- Required tokens: primary/foreground text token for current price, muted/subdued token for struck-through original price, semantic savings/success token for discount label, numeric type scale token for current price size.
- Prohibited hardcoded values: no raw color values, no hardcoded currency symbols baked into style.
- Dark mode: all price text, original price muted color, and discount label must resolve correctly via theme tokens.

---

## 7. Composition Rules

- What can wrap it: ProductCard.Price, CartItemRow price area, BillingSummary rows, VariantSelector option labels, OrderSummaryCard items.
- What it may contain: the formatted current price string, an optional struck-through original price, and an optional discount label.
- Anti-patterns:
  - Do not embed a "Buy" button or any interactive control inside PriceDisplay.
  - Do not hardcode currency symbols or number formatting — always use locale-aware formatting.
  - Do not use PriceDisplay for non-monetary numbers.

---

## 8. Performance Constraints

- Currency formatting must be memoized or performed outside the component to prevent per-render `Intl.NumberFormat` instantiation.
- Renders synchronously — no async behavior.
- Memoize when used inside high-frequency-update lists.

---

## 9. Test Requirements

- Renders the formatted current price correctly for a given numeric value and currency code.
- Renders the struck-through original price when provided.
- Does not render an original price element when not provided.
- Renders the discount label when a discount amount or percentage is provided.
- Struck-through original price has a visually-hidden accessible label (e.g., "Original price: $50.00").
- Discount label uses text, not color alone, to convey savings.
- Price is formatted according to the provided locale (decimal and thousands separators, currency symbol position).
- Passes automated accessibility audit.
- Snapshot test for: current price only; discounted price with original and discount label; unit price.
