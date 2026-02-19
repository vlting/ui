# Component Spec — ProductCard

## 1. Purpose

Displays a single product in a scannable card format within a product grid or list. It surfaces the product image, title, price, and primary actions (e.g., add to cart, wishlist) so the user can evaluate and act on a product without navigating to its detail page.

Use when: displaying products in a catalog grid, a search results page, a recommendations carousel, or a related products section.

Do NOT use for: cart item rows (use CartItemRow), order history rows (use OrderHistoryTable), or detailed product pages.

---

## 2. UX Intent

- Primary interaction goal: help users quickly evaluate whether a product is worth exploring further or adding to their cart directly.
- Expected user mental model: a product tile in a grid — image dominant, name and price immediately below, actions accessible on hover or as persistent buttons (Jakob's Law, ecommerce convention).
- UX laws applied:
  - Gestalt (figure/ground): the product image is the primary visual anchor; text and actions are subordinate.
  - Fitts's Law: "Add to Cart" and wishlist buttons must have large touch targets, especially on mobile.
  - Hick's Law: per-card actions are limited to one or two primary actions to avoid decision paralysis.
  - Miller's Law: only the most critical product attributes (image, name, price, availability) are shown; details are on the product page.

---

## 3. Visual Behavior

- Layout: a vertical card with four composed sub-areas:
  - `ProductCard.Image` — product photo at a fixed aspect ratio (e.g., 4:3 or 1:1).
  - `ProductCard.Title` — product name, truncated to 2 lines with ellipsis.
  - `ProductCard.Price` — rendered using PriceDisplay conventions (current price, optional struck-through original, discount label).
  - `ProductCard.Actions` — primary action button(s) (e.g., "Add to Cart", wishlist icon).
- An InventoryStatusBadge may be overlaid on the image or placed below the title.
- Card has a surface background, border, and optional hover shadow elevation using theme tokens.
- On hover/focus, the card may elevate slightly (shadow increase) and show actions if they were hidden.
- Spacing: consistent internal padding and gap between sub-areas using space tokens.
- Typography: title uses a body token; price follows PriceDisplay spec; action button labels use a button token.
- Token usage: all background, border, shadow, text, and action colors from theme tokens.
- Responsive: card width is determined by the parent grid; minimum width enforced; image fills width proportionally.

---

## 4. Interaction Behavior

- States: idle, hovered/focused (elevated shadow, actions revealed), active/pressed (brief press feedback), out-of-stock (Add to Cart disabled, status badge shown), loading (image placeholder).
- The card itself may be pressable (navigates to product detail) with individual action buttons as secondary targets.
- `ProductCard.Actions` buttons emit `onAddToCart(productId)` and `onWishlist(productId)` callbacks.
- Keyboard behavior:
  - The card is focusable via Tab if it is a pressable navigation element.
  - Tab also navigates to individual action buttons within the card.
  - Enter/Space on the card navigates to the product detail.
  - Enter/Space on action buttons triggers the respective action.
- Screen reader behavior: the card has an accessible label including the product name. Actions have labels including the product name (e.g., "Add Blue T-Shirt to cart").
- Motion: hover elevation uses a short shadow transition. Respects `prefers-reduced-motion` — skip transition.

---

## 5. Accessibility Requirements

- If the card is a navigation element, it has `role="link"` or an anchor tag; its accessible label includes the product name and price.
- `ProductCard.Image` has a non-empty `alt` attribute (product name or descriptive alt text).
- Action buttons in `ProductCard.Actions` have `aria-label` values including the product name.
- Disabled "Add to Cart" for out-of-stock has `aria-disabled="true"` and a visible alternative label or badge.
- Contrast: all text (title, price, action labels) meets 4.5:1.
- Focus ring is visible on the card and on individual action buttons.
- Reduced motion: no hover elevation animation.

---

## 6. Theming Rules

- Required tokens: `background` (card surface), `borderColor`, shadow token (default and hover states), `color` (title, price), primary/CTA button tokens for Add to Cart, accent token for wishlist, radius token for card corners.
- Prohibited hardcoded values: no raw colors, no hardcoded image dimensions or pixel padding.
- Dark mode: card surface, border, shadow, text, and button states must resolve via theme tokens.

---

## 7. Composition Rules

- What can wrap it: ProductGallery, a search results grid, a recommendations carousel, or any grid/list layout.
- What it may contain (via sub-components): `ProductCard.Image`, `ProductCard.Title`, `ProductCard.Price`, `ProductCard.Actions`. May also host InventoryStatusBadge and SuperLikeIndicator-equivalent "Featured" badges.
- Anti-patterns:
  - Do not embed detailed product descriptions or spec sheets inside ProductCard.
  - Do not nest another card inside ProductCard.
  - Do not make `ProductCard.Image` a carousel — use ProductGallery on the detail page.

---

## 8. Performance Constraints

- Product images use lazy loading; a placeholder fills the slot until the image loads.
- Memoize ProductCard — it is rendered many times in a grid.
- ProductGallery (parent) is responsible for virtualization when the product count is large.
- Hover effects must use CSS/style transitions only — no JavaScript-driven layout recalculation.

---

## 9. Test Requirements

- Renders `ProductCard.Image`, `ProductCard.Title`, `ProductCard.Price`, and `ProductCard.Actions` with correct prop values.
- Image has a non-empty `alt` attribute.
- Title is truncated at the configured line count.
- Price reflects discounted and original values when both are provided.
- Pressing the card calls the navigation callback (if card-level press is configured).
- Pressing "Add to Cart" button calls `onAddToCart` with the correct product ID.
- Pressing wishlist button calls `onWishlist` with the correct product ID.
- Out-of-stock: Add to Cart is disabled with `aria-disabled="true"` and the inventory badge is shown.
- Action buttons have accessible labels including the product name.
- No hover animation when `prefers-reduced-motion` is active.
- Passes automated accessibility audit.
- Snapshot test for idle, out-of-stock, and discounted-price states.
