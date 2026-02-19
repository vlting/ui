# Component Spec — BillingSummary

## 1. Purpose

Displays a read-only summary of billing charges presented to the user at checkout or on an order confirmation screen. It breaks down the cost into line items (subtotal, taxes, discounts, shipping, and total) so the user can verify what they will be charged before completing a purchase.

Use when: surfacing a cost breakdown during checkout, on order confirmation pages, or in billing/invoice detail views.

Do NOT use for: editable cart management (use CartDrawer or CartItemRow), or for displaying account subscription pricing outside of a transaction context.

---

## 2. UX Intent

- Primary interaction goal: give users transparent, scannable cost information so they can confirm the total before paying.
- Expected user mental model: a receipt or invoice — a familiar structured list of labeled amounts with a clear total (Jakob's Law).
- UX laws applied:
  - Gestalt (proximity): related line items (subtotal, discount, tax) are grouped; the total is visually separated to signal finality.
  - Miller's Law: each line item is a single labeled value; the total count of rows is kept minimal.
  - Tesler's Law: the component absorbs formatting complexity (currency, locale, sign conventions for discounts) so the consumer only passes raw values.

---

## 3. Visual Behavior

- Layout: a vertical list of labeled rows; each row contains a left-aligned label and a right-aligned monetary value.
- A visual divider separates the line items from the final total row.
- The total row uses a heavier type weight or larger type token to create emphasis.
- Discount/promo rows display the value with a minus sign or in a semantic success/green token color.
- Tax and shipping rows are clearly labeled.
- Spacing: rows are evenly spaced using space tokens; the divider uses a border color token.
- Typography: all label and value text uses body or label type tokens; the total uses a heading-small or body-emphasis token.
- Token usage: all colors (label text, value text, discount color, divider) from theme tokens.
- Responsive: the component spans available width; label and value never wrap onto separate lines.

---

## 4. Interaction Behavior

- The component is entirely display-only — no interactive elements.
- No states beyond the rendered data — it reflects exactly the values passed via props.
- If a row is conditionally absent (e.g., no discount applied), it is not rendered.
- Keyboard behavior: not focusable; no interactive role.
- Screen reader behavior: the summary is read as a sequence of label-value pairs. The total row is identified by its label.
- Motion: none — this is a static display component.

---

## 5. Accessibility Requirements

- Line item rows should be rendered as a definition list (`dl`/`dt`/`dd`) or as a table with appropriate headers to convey the label-value relationship semantically.
- The total row is the most important row; it should be identifiable programmatically (e.g., via a summary or `aria-label`).
- Discount values that use color to convey a semantic meaning (savings) must also use a label or sign (e.g., "−$5.00") so color is not the sole indicator.
- All text meets 4.5:1 contrast against the background.
- No reduced motion requirements — the component has no animation.

---

## 6. Theming Rules

- Required tokens: `background`, `color` (label and value text), `borderColor` (divider), semantic success/savings token for discount rows, heading or emphasis token for total row.
- Prohibited hardcoded values: no raw color values, no hardcoded font weights or pixel sizes.
- Dark mode: label, value, divider, and discount colors must resolve via theme tokens.

---

## 7. Composition Rules

- What can wrap it: a checkout form layout, an order summary card, an order confirmation screen.
- What it may contain: labeled billing rows and a divider element. It does not contain interactive controls.
- Anti-patterns:
  - Do not use BillingSummary for editable or interactive cost breakdowns.
  - Do not embed input fields or buttons inside BillingSummary.
  - Do not merge BillingSummary with the action that submits payment — keep them separate.

---

## 8. Performance Constraints

- Purely presentational — no memoization requirements unless embedded in a high-frequency update context.
- No virtualization required; billing summaries have a small, bounded number of rows.
- Currency formatting should be performed outside the component and passed as pre-formatted strings, or via a stable formatting utility to avoid per-render computation.

---

## 9. Test Requirements

- Renders all provided line items with correct labels and formatted values.
- Does not render a row when the corresponding value prop is absent or null.
- Discount row is displayed with a negative sign or saved indicator.
- Total row is visually and semantically distinct from line item rows.
- Divider is present between line items and total.
- All text meets contrast requirements (audit).
- Passes automated accessibility audit.
- Snapshot test for a full summary (subtotal, discount, tax, shipping, total) and a minimal summary (subtotal and total only).
