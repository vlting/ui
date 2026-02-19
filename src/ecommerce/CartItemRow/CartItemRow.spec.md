# Component Spec — CartItemRow

## 1. Purpose

Displays a single line item within a shopping cart, showing the product image, name, variant details, unit price, quantity control, and line total. It allows the user to adjust the quantity of or remove the item directly within the cart view.

Use when: rendering individual items inside CartDrawer, a full cart page, or an order review section.

Do NOT use for: product listing cards (use ProductCard), order history line items (use OrderHistoryTable rows), or read-only order summaries.

---

## 2. UX Intent

- Primary interaction goal: allow users to review and adjust individual cart items without leaving the cart context.
- Expected user mental model: a line-item row in a receipt or form — name, details, quantity stepper, and price, with a clear remove option (Jakob's Law).
- UX laws applied:
  - Fitts's Law: quantity decrement/increment buttons and the remove button must have touch-friendly tap targets.
  - Hick's Law: per-row actions are limited to quantity adjustment and removal — no tertiary actions.
  - Gestalt (proximity): image, name, and variant details are grouped left; price and quantity controls are grouped right.

---

## 3. Visual Behavior

- Layout: a horizontal row with a product thumbnail on the left, product info (name, variant) in the center, and price/quantity/remove controls on the right or below on narrow viewports.
- Product thumbnail is a fixed small square with a defined aspect ratio.
- Variant details (e.g., "Size: M, Color: Red") are displayed in a smaller secondary type token beneath the product name.
- Quantity stepper shows decrement button, current quantity value, and increment button.
- Line total (unit price × quantity) is displayed right-aligned.
- A remove/trash button is present, either inline or revealed on hover/press.
- Spacing: padding and gap between columns use space tokens.
- Typography: product name uses a body token; variant uses a body-small token; price/total use a numeric body token; quantity value uses a body token.
- Token usage: all colors, borders, and background from theme tokens.
- Responsive: on narrow screens the layout may stack vertically (image top, details below), or shrink column widths.

---

## 4. Interaction Behavior

- States: idle, quantity-updating (stepper shows loading state briefly), remove-pending (confirm or immediate removal with undo toast), out-of-stock (quantity adjustment disabled, warning label shown).
- The row is controlled: `onQuantityChange(itemId, newQuantity)` and `onRemove(itemId)` are called by the parent.
- Decrementing to zero may trigger `onRemove` or show a confirmation; this behavior is controlled by a prop.
- Increment is disabled when the item is at maximum available quantity.
- Keyboard behavior:
  - Tab navigates: thumbnail (skip if non-interactive), product link (if present), decrement button, quantity field (if editable), increment button, remove button.
  - Enter or Space on decrement/increment adjusts quantity.
  - Enter or Space on remove triggers removal.
- Screen reader behavior: each row announces the product name, variant, quantity, and line total. Buttons announce their action and the item they apply to (e.g., "Decrease quantity of Blue T-Shirt, Size M").
- Motion: row removal uses a height-collapse exit animation. Respects `prefers-reduced-motion` — remove immediately.

---

## 5. Accessibility Requirements

- Decrement and increment buttons have `aria-label` values that include the product name (e.g., "Increase quantity of Blue T-Shirt").
- When a button is disabled (min/max reached), it has `aria-disabled="true"` and is visually distinct.
- Remove button has `aria-label` including the product name (e.g., "Remove Blue T-Shirt from cart").
- If quantity is an editable input, it has an `aria-label` and `aria-valuemin`/`aria-valuemax`.
- Out-of-stock state is communicated via text, not color alone.
- All interactive targets meet minimum touch size requirements.
- Contrast: all text, buttons, and indicators meet 4.5:1.
- Reduced motion: no collapse animation on removal.

---

## 6. Theming Rules

- Required tokens: `background`, `borderColor` (row separator), `color` (product name, variant, price), subdued/secondary token for variant text, semantic error/warning token for out-of-stock state, button tokens for stepper controls.
- Prohibited hardcoded values: no raw colors, no hardcoded pixel-based thumbnail size.
- Dark mode: all text, borders, and button states must resolve via theme tokens.

---

## 7. Composition Rules

- What can wrap it: CartDrawer, a cart page list, an order review section.
- What it may contain: a product image, product name and variant text, a quantity stepper (decrement button, quantity value, increment button), a line total price, and a remove button.
- Anti-patterns:
  - Do not embed product detail navigation (linking out) without a clearly labeled link element.
  - Do not add promotional or upsell UI inside the row.
  - Do not use CartItemRow for read-only order history display — the controls would be misleading.

---

## 8. Performance Constraints

- Memoize CartItemRow — it is rendered in a list where individual items update frequently.
- Product thumbnail uses lazy loading and a fixed-size placeholder to prevent layout shift.
- Quantity update callbacks may be throttled by the consumer; the UI must reflect the in-flight state with a loading indicator on the stepper.

---

## 9. Test Requirements

- Renders product image, name, variant, quantity, and line total with correct prop values.
- Pressing increment calls `onQuantityChange` with quantity + 1.
- Pressing decrement calls `onQuantityChange` with quantity - 1.
- Decrement button is disabled when quantity is at minimum (1 or configured min).
- Increment button is disabled when quantity is at maximum available stock.
- Pressing remove calls `onRemove` with the correct item ID.
- Decrement at quantity 1 triggers `onRemove` (or a confirmation) based on configured behavior.
- Increment and decrement buttons have accessible labels including the product name.
- Remove button has an accessible label including the product name.
- Out-of-stock state disables quantity controls and shows a text warning.
- No removal animation when `prefers-reduced-motion` is active.
- Passes automated accessibility audit.
- Snapshot test for idle, out-of-stock, and loading states.
