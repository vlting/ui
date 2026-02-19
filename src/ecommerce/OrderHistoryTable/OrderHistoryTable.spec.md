# Component Spec — OrderHistoryTable

## 1. Purpose

Displays a chronological list of past orders for the current user, showing key details — order number, date, status, and total — so users can track their purchase history and access individual order details.

Use when: displaying a user's order history on an account, orders, or purchase history screen.

Do NOT use for: the cart view, real-time order tracking (use a dedicated tracking component), or product browsing.

---

## 2. UX Intent

- Primary interaction goal: allow users to quickly locate a specific past order and navigate to its detail.
- Expected user mental model: a data table or list — similar to bank statement history or an inbox — where rows are scannable and sortable/filterable (Jakob's Law).
- UX laws applied:
  - Serial position effect: most recent orders appear first by default.
  - Gestalt (alignment): columns are consistently aligned — date left, status center, total right — enabling rapid scanning.
  - Miller's Law: only the most critical columns per row are shown; full details are a tap/click away.
  - Fitts's Law: each row is a pressable/clickable target for navigating to the order detail.

---

## 3. Visual Behavior

- Layout: a table or list of rows; on mobile each row may collapse into a card-style layout showing order number, date, status badge, and total.
- Columns (desktop): Order Number, Date, Status, Items (count or thumbnail), Total, and a "View Details" action.
- Column headers are visible on wider layouts; hidden or replaced by inline labels on mobile card layout.
- Status is displayed using an InventoryStatusBadge-style indicator or an order-specific status badge (Processing, Shipped, Delivered, Cancelled, Returned).
- Rows are horizontally separated by a border or subtle background alternation using theme tokens.
- An empty state is shown when no orders exist.
- A loading skeleton is shown while data is being provided by the parent.
- Typography: order number uses a monospace or body token; date uses a body-small token; status badge uses its own type token; total uses a numeric body token.
- Token usage: all background, text, border, and status badge colors from theme tokens.
- Responsive: table columns collapse progressively at smaller widths; the card layout is used on mobile.

---

## 4. Interaction Behavior

- States: loading (skeleton rows), empty (no orders), populated (row list), error (load failed with retry).
- Each row is pressable and triggers an `onViewOrder(orderId)` callback.
- If a "View Details" link/button is present, it is the primary interactive element of the row.
- Sorting by column header (Date, Total) is optional; if present, the sorted column shows a direction indicator.
- Keyboard behavior:
  - Tab navigates through each row's "View Details" link or through the row itself if it is the press target.
  - Enter or Space on a row/link triggers navigation.
  - Column sort buttons (if present) are focusable and activated via Enter/Space.
- Screen reader behavior: table uses appropriate table semantics (caption, column headers); each row cell is associated with its column header.
- Motion: skeleton shimmer respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- On desktop, the component uses a semantic `table` element with a `caption`, `thead` with `th` elements (scope="col"), and `tbody` with `tr`/`td`.
- On mobile (card layout), each card is a list item with an `aria-label` including the order number and date.
- Sortable column headers have `aria-sort` reflecting the current sort direction.
- Empty state has a descriptive accessible label.
- Loading skeletons have `aria-hidden="true"` or the container has `aria-busy="true"`.
- Status badges use text, not color alone, to communicate order status.
- All interactive rows/links meet minimum touch target size.
- Contrast: all text, labels, and badges meet 4.5:1.
- Reduced motion: no shimmer animation on skeletons.

---

## 6. Theming Rules

- Required tokens: `background` (table/row), `borderColor` (row separator), `color` (all text), alternating row background token (if used), status badge tokens, heading type token for column headers.
- Prohibited hardcoded values: no raw colors, no hardcoded pixel padding outside the token scale.
- Dark mode: all table surfaces, separators, text, and status badges must resolve via theme tokens.

---

## 7. Composition Rules

- What can wrap it: an account screen, an order management page, a profile section.
- What it may contain: column header row, order rows (with status badges and links), empty state, and loading skeleton rows.
- Anti-patterns:
  - Do not fetch order data inside OrderHistoryTable — pass data from the parent.
  - Do not embed cart management or order creation UI inside the table.
  - Do not use OrderHistoryTable for real-time order tracking progress.

---

## 8. Performance Constraints

- Virtualize rows when the order count may exceed 50 to avoid rendering all rows at once.
- Memoize row components to avoid re-rendering unchanged rows on data updates.
- Skeleton rows must match the height of real rows to prevent layout shift when data loads.
- Images (product thumbnails in rows) use lazy loading.

---

## 9. Test Requirements

- Renders column headers and a row for each order in the provided data.
- Each row displays order number, date, status, and total correctly.
- Status badge matches the order status variant.
- Pressing a row or its "View Details" link calls `onViewOrder` with the correct order ID.
- Empty state is rendered when the orders array is empty.
- Loading skeleton is rendered when `isLoading` is true.
- Error state with retry is rendered when `isError` is true.
- Table has a caption or accessible label.
- Column headers have `scope="col"`.
- Sortable headers update `aria-sort` on activation.
- Mobile card layout provides accessible row labels.
- No skeleton shimmer animation when `prefers-reduced-motion` is active.
- Passes automated accessibility audit.
