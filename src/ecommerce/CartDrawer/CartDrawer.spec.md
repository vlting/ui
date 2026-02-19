# Component Spec — CartDrawer

## 1. Purpose

Presents the user's shopping cart in a slide-in drawer panel that overlays the current page without navigating away. It allows users to review, adjust quantities of, and remove cart items, and provides a path to checkout — all without losing their place in the product browsing experience.

Use when: a user opens their cart from a persistent cart icon in the navigation, on any page where the user may want to review their cart without leaving the current context.

Do NOT use for: the dedicated cart page (a full-screen cart view), checkout screens, or order history.

---

## 2. UX Intent

- Primary interaction goal: let users review and adjust their cart quickly, then return to shopping or proceed to checkout with minimal friction.
- Expected user mental model: a slide-in panel (drawer/sheet) anchored to the right or bottom edge of the screen — a ubiquitous pattern in ecommerce (Jakob's Law).
- UX laws applied:
  - Hick's Law: the drawer focuses the user on a single decision — review and proceed or dismiss.
  - Fitts's Law: close, remove, and checkout controls must have adequate touch targets.
  - Tesler's Law: quantity adjustment and item removal are available inline so the user does not need to navigate to a separate cart page.

---

## 3. Visual Behavior

- Layout: a panel anchored to the trailing edge (right on LTR, left on RTL) or bottom of the viewport, overlaying the content with a dimmed backdrop.
- A header row contains a "Cart" title, an item count badge, and a close button.
- The body is a scrollable list of CartItemRow components.
- A footer contains the order total and a "Proceed to Checkout" button; the footer is sticky within the drawer.
- An empty state is shown when the cart has no items.
- Width on desktop: a fixed-width panel (e.g., a token-derived value); on mobile it expands to near full-screen or uses a bottom sheet.
- Spacing: internal padding, header/footer height, and item gap use space tokens.
- Typography: "Cart" heading uses a heading-small token; item count badge uses a label token; total uses a body-emphasis token.
- Token usage: background, border, backdrop overlay, and all text colors from theme tokens.

---

## 4. Interaction Behavior

- States: closed (not mounted or hidden), open (visible), empty (open but no cart items), loading (cart data loading — skeleton rows shown).
- Controlled: open/closed state is owned by the parent; the component exposes an `onClose` callback.
- The backdrop is pressable and triggers `onClose`.
- Escape key triggers `onClose`.
- Quantity increment/decrement and item removal within CartItemRow emit their own callbacks (`onQuantityChange`, `onRemove`).
- "Proceed to Checkout" button triggers an `onCheckout` callback.
- Keyboard behavior:
  - Focus is trapped inside the drawer while open.
  - Tab cycles through close button, item controls, and checkout button.
  - Escape closes the drawer.
- Screen reader behavior: drawer is announced as a dialog; title is announced on open; focus moves to the first interactive element or the drawer title on open.
- Motion: the drawer slides in from the edge; backdrop fades in. Respects `prefers-reduced-motion` — no slide or fade animation; show/hide immediately.

---

## 5. Accessibility Requirements

- Drawer container has `role="dialog"` and `aria-modal="true"`.
- `aria-labelledby` points to the "Cart" heading.
- Focus is trapped inside the drawer while open; returns to the triggering element on close.
- Empty state has a descriptive accessible label.
- Loading skeleton rows are `aria-hidden="true"` or the container has `aria-busy="true"`.
- Close button has `aria-label="Close cart"`.
- Checkout button has a descriptive label including the total if visible.
- Contrast: all text, buttons, and controls meet 4.5:1.
- Reduced motion: no slide or fade animation.

---

## 6. Theming Rules

- Required tokens: `background` (drawer panel), backdrop overlay token (semi-transparent surface), `borderColor`, `color` (all text), shadow token for panel elevation, heading and label type tokens, semantic button tokens for checkout CTA.
- Prohibited hardcoded values: no raw colors, no hardcoded panel widths outside the token/breakpoint system.
- Dark mode: panel, backdrop, text, and border colors must all resolve via theme tokens.

---

## 7. Composition Rules

- What can wrap it: a root layout portal or modal host at the application level.
- What it may contain: a header row, a scrollable CartItemRow list, an empty state view, and a sticky footer with total and checkout button.
- Anti-patterns:
  - Do not fetch cart data inside CartDrawer — data is passed from the parent.
  - Do not embed checkout form fields inside CartDrawer; that belongs in CheckoutForm.
  - Do not use CartDrawer for a full-page cart view.

---

## 8. Performance Constraints

- CartDrawer must not mount until it is opened for the first time (lazy mount on first open).
- After the first open, it may remain mounted and hidden to preserve scroll position.
- CartItemRow children are memoized to avoid full-list re-renders on single-item quantity changes.
- If the cart exceeds ~20 items, virtualize the item list.

---

## 9. Test Requirements

- Drawer is not visible when closed.
- Drawer renders with title, item list, and footer when open.
- Empty state renders when cart is empty.
- Pressing close button calls `onClose`.
- Pressing backdrop calls `onClose`.
- Escape key calls `onClose`.
- Focus is trapped inside drawer while open.
- Focus returns to trigger element on close.
- `role="dialog"` and `aria-modal="true"` are present.
- `aria-labelledby` points to the drawer heading.
- Loading state displays skeletons with `aria-busy="true"` or skeletons are `aria-hidden`.
- Pressing checkout button calls `onCheckout`.
- No slide/fade animation when `prefers-reduced-motion` is active.
- Passes automated accessibility audit.
