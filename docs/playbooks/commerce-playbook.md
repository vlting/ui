# Commerce Playbook

## 1. Problem Space

Commerce patterns cover the full purchase lifecycle: product discovery, selection, cart, checkout, and order management. Primary modules: `ecommerce` (product catalog, cart, checkout, orders), `payments` (subscriptions, invoices, billing). Secondary: `accounting` (financial summaries for internal use), `erp` (inventory, suppliers, purchase orders for B2B commerce).

---

## 2. UX Laws Applied

- **Hick's Law** — Reduce friction at every checkout step. One action per screen in multi-step checkout. Avoid offering too many payment methods or shipping options simultaneously.
- **Tesler's Law** — Payment and shipping complexity must be absorbed by the system. Smart defaults, saved addresses, and saved payment methods eliminate re-entry.
- **Fitts's Law** — "Add to Cart" and "Buy Now" must be large, high-contrast, and immediately visible on product pages — ideally sticky on mobile.
- **Gestalt Proximity** — Price, shipping estimate, and variant selector must be visually grouped near the primary add-to-cart action.
- **Peak-End Rule** — Order confirmation is the peak moment. It must be clear, satisfying, and include all key details (order number, estimated delivery, support contact). Checkout errors are painful; recovery must be immediate and clear.
- **Jakob's Law** — Follow established e-commerce conventions: cart icon in top-right, "Proceed to Checkout" at cart bottom, address before payment in checkout flow.
- **Doherty Threshold** — Cart updates (add, remove, quantity change) must be optimistically instant. Payment processing must show clear progress states.

---

## 3. Standard Layout Pattern

### Product Listing Page
```
<AppShell>
  <PageHeader title="Products" />
  <Section>
    {/* filter sidebar or filter bar */}
    <Stack flexDirection="row">
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </Stack>
    <Pagination />
  </Section>
</AppShell>
```

### Product Detail Page
```
<AppShell>
  <PageHeader breadcrumbs={<Breadcrumbs />} />
  <Section>
    <Stack flexDirection="row">
      <ProductGallery />
      <Stack>
        <PriceDisplay />
        <InventoryStatusBadge />
        <VariantSelector />
        <Button variant="primary">Add to Cart</Button>
      </Stack>
    </Stack>
  </Section>
</AppShell>
```

### Cart (Drawer Pattern)
```
<CartDrawer>
  <CartItemRow />
  <CartItemRow />
  <BillingSummary />
  <Button variant="primary">Proceed to Checkout</Button>
</CartDrawer>
```

### Checkout Flow (Multi-Step)
```
<MultiStepForm>
  {/* Step 1: Shipping */}
  <ShippingAddressForm />
  {/* Step 2: Payment */}
  <CheckoutForm />   {/* includes PaymentMethodForm */}
  {/* Step 3: Review */}
  <OrderSummaryCard />
  <BillingSummary />
  <Button variant="primary">Place Order</Button>
</MultiStepForm>
```

### Header Pattern
- Product listing: `PageHeader` with title and optional sort control.
- Product detail: `Breadcrumbs` for hierarchy (Category > Subcategory > Product).
- Checkout: Minimal header — logo only, no navigation (reduce distraction during checkout).

### Filters
- Product filtering belongs in a sidebar (desktop) or `Sheet` (mobile) — not inline with results.
- Use `AnalyticsFilterBar` pattern for filtering orders in `OrderHistoryTable`.

### Primary CTA
- "Add to Cart" on product detail — always visible, uses `Button` with `variant="primary"`.
- "Proceed to Checkout" at the bottom of `CartDrawer`.
- "Place Order" on the final checkout step — must be the only primary action on that screen.

### Secondary CTA
- "Save for Later" on `CartItemRow`.
- "Continue Shopping" after add-to-cart action.
- "View Order" link in confirmation state.

---

## 4. Component Mapping

| Need | Component |
|------|-----------|
| Product card in listing | `ProductCard` |
| Product images/carousel | `ProductGallery` |
| Size, color, variant selection | `VariantSelector` |
| Price display with formatting | `PriceDisplay` |
| In-stock / out-of-stock status | `InventoryStatusBadge` |
| Slide-in cart panel | `CartDrawer` |
| Single cart line item | `CartItemRow` |
| Multi-step checkout flow | `CheckoutForm` (+ `MultiStepForm`) |
| Order total / fees summary | `BillingSummary` |
| Order confirmation card | `OrderSummaryCard` |
| Order history list | `OrderHistoryTable` |
| Shipping address entry | `ShippingAddressForm` |
| Subscription plan picker | `SubscriptionSelector` |
| Monthly vs annual toggle | `BillingCycleToggle` |
| Cancel subscription flow | `CancellationFlowDialog` |
| Plan feature comparison | `PlanComparisonTable` |
| Upgrade plan modal | `UpgradeModal` |
| Add/edit payment method | `PaymentMethodForm` |
| Saved payment methods list | `SavedPaymentMethodsList` |
| Invoice line-item view | `InvoiceDetailView` |
| Invoice list | `InvoiceTable` |
| Usage-based billing meter | `UsageMeter` |

---

## 5. Accessibility Rules

- `ProductCard` must be keyboard-navigable with the product name as the accessible link text — not just "View Product".
- `VariantSelector` options must use `role="radio"` with `aria-checked`, not just visual styling.
- `CartDrawer` must trap focus when open and restore focus to the cart trigger on close.
- `PriceDisplay` must not convey sale pricing through color alone — use strikethrough text with `aria-label` describing the original and current price.
- `InventoryStatusBadge` must use text ("In Stock", "Only 3 left", "Out of Stock") alongside any color indicator.
- `CheckoutForm` payment fields must be associated with labels. Credit card fields must indicate format expectations via `HelperText`.
- `CancellationFlowDialog` must be a proper `Dialog` with focus trap, not a custom modal. Destructive actions (confirm cancel) must have explicit labels ("Yes, cancel my subscription" not "OK").
- `PlanComparisonTable` must use proper table semantics so screen readers can announce column headers when reading cell values.
- `OrderHistoryTable` must be navigable by keyboard with sortable column headers using `aria-sort`.

---

## 6. Anti-Patterns

- **Checkout with unexpected steps** — Never add a step to checkout that wasn't shown in the step progress indicator. Users must always know where they are in the flow.
- **Cart outside of `CartDrawer`** — Do not implement cart as a separate full page unless the order is complex (B2B, configurable products). Standard ecommerce uses `CartDrawer` for speed.
- **`VariantSelector` without inventory feedback** — If a variant is out of stock, disable it in `VariantSelector` immediately. Never let users add an OOS variant to cart.
- **`PriceDisplay` without currency** — Always include currency symbol and code. Never display a bare number as a price.
- **Hiding `BillingSummary` until final step** — Users must be able to see their running total at every checkout step. `BillingSummary` belongs as a persistent sidebar on desktop checkout.
- **Subscription upsell in checkout flow** — Do not interrupt a standard purchase checkout with a subscription upsell. `UpgradeModal` belongs on plan management pages, not mid-transaction.
- **`CancellationFlowDialog` with easy one-click cancel** — Cancellation flows must confirm intent and may include a "pause" alternative. They must never be so easy that accidental cancellation is likely.
- **Misusing `InvoiceDetailView` for cart** — `InvoiceDetailView` is for viewing past invoices, not active cart contents. Use `BillingSummary` + `CartItemRow` for the cart.

---

## 7. Variants

### Density Increase
- B2B purchase order flows (ERP context): use `DataTable` pattern for line items instead of individual `CartItemRow` cards.
- `PlanComparisonTable` in compact mode for mobile: stack plans vertically rather than column-per-plan.

### Mobile Behavior
- `CartDrawer` opens as a full-screen `Sheet` on mobile.
- `ProductGallery` uses a swipeable carousel on mobile.
- `VariantSelector` with many options uses a `Sheet` picker on mobile.
- Checkout is full-screen single-column on mobile; `BillingSummary` appears above the CTA at the bottom.
- `PaymentMethodForm` uses platform-native payment APIs (Apple Pay / Google Pay) where available.

### Edge Cases
- **Out of stock on add-to-cart**: Replace `Button` with a "Notify me when available" action. Never silently fail.
- **Price changes mid-session**: If price changes between product view and checkout, alert the user on the review step before they place the order.
- **Failed payment**: Do not clear the form. Highlight the failing field (if known), show the error from the payment processor in `InlineError`, and allow retry without re-entering all data.
- **Long product option lists**: `VariantSelector` with 20+ color/size options should paginate or use a searchable `Select`/`Combobox`.
- **B2B purchase orders**: Multi-line PO entry uses `DataGrid` pattern (see data-display-playbook) rather than item-by-item card UX.
