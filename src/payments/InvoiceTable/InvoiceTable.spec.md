# Component Spec — InvoiceTable

## 1. Purpose

Displays a paginated, sortable list of invoices for an organization or user, showing key details (invoice number, date, amount, status) and providing access to individual invoice details and download actions.

Use it on billing history pages and account settings sections where a user needs to review past invoices.

Do NOT use it for real-time transaction feeds (use ActivityLogList), for displaying non-invoice financial data, or inside constrained containers without adequate horizontal space.

---

## 2. UX Intent

- Primary interaction goal: finding and acting — the user locates a specific invoice by scanning or sorting the list, then opens it for detail or downloads it.
- Expected user mental model: a billing history table similar to those in Stripe, Shopify, or AWS billing consoles. Rows represent invoices and are selectable for detail view.
- UX laws applied:
  - Jakob's Law: follow standard billing table conventions — invoice number, date, amount, status, and action columns.
  - Hick's Law: limit per-row actions to two or three (View, Download) to keep choices simple.
  - Fitts's Law: per-row action buttons must have adequate minimum size.
  - Serial Position Effect: most recent invoices appear first (default sort by date descending).

---

## 3. Visual Behavior

- Layout: full-width table with columns for Invoice Number, Date, Amount, Status, and Actions. The Amount column right-aligns numeric values.
- Spacing: row height and cell padding from space tokens. Consistent horizontal alignment across cells.
- Typography: column headers use a label/overline scale. Invoice number uses a monospaced or tabular style. Date and amount use body scale with tabular numbers. Status uses a badge component.
- Token usage:
  - Header background: surface-raised/table-header token.
  - Row background: surface token; row hover uses hover-state token.
  - Status badges: semantic tokens (positive for paid, warning for pending, destructive for overdue).
  - Border: border token for row dividers.
  - Amount text: primary foreground with tabular-nums styling.
- Responsive behavior: on narrow viewports, secondary columns (e.g., due date) may be hidden. The Invoice Number, Amount, and Status columns are always visible. On mobile, a card-per-invoice layout may replace the table.

---

## 4. Interaction Behavior

- States:
  - Idle: table populated with invoice rows.
  - Empty: empty-state message when there are no invoices.
  - Loading: skeleton rows while data is loading.
  - Row hover: background shifts to hover token.
  - Downloading: the Download button for that row shows a brief loading state.
- Controlled vs uncontrolled: data, sort state, and pagination are controlled by the parent. Callbacks: `onRowClick(invoiceId)`, `onDownload(invoiceId)`, `onSortChange`, `onPageChange`.
- Keyboard behavior:
  - Tab navigates through interactive controls (sort headers, row action buttons, pagination).
  - Enter on a row (or View button) calls `onRowClick`.
  - Enter on a Download button calls `onDownload`.
- Screen reader behavior: proper table semantics (`<table>`, `<th scope="col">`). Sortable headers have `aria-sort`. Status badges convey status via text. Row action buttons have descriptive labels including the invoice number.
- Motion rules: row hover transition is a subtle background color shift. Suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: table has an accessible label. Sortable column headers have `aria-sort`. Per-row action buttons use `aria-label` that includes the invoice number (e.g., "Download invoice INV-001").
- Focus rules: tab order progresses through interactive elements in reading order. Pagination controls are keyboard-reachable.
- Contrast expectations: all text and status badge labels meet WCAG AA.
- Reduced motion behavior: row hover animation is instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: surface, surface-raised, hover state, border, primary text, secondary text, semantic status tokens, space tokens, radius tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based sizes, no hardcoded font sizes.
- Dark mode expectations: table header, row backgrounds, and border tokens resolve to appropriate dark-mode values. Status badge tokens maintain correct semantics and contrast in dark mode.

---

## 7. Composition Rules

- What can wrap it: billing settings pages, account management sections, admin dashboards.
- What it may contain: rows composed of invoice number, date, amount, status badge, and action buttons (View, Download).
- Anti-patterns:
  - Do not embed full InvoiceDetailView content inside table rows — use the detail view in a modal or separate page.
  - Do not use InvoiceTable for real-time transaction data.
  - Do not hardcode the number of visible rows; pagination is controlled by the parent.

---

## 8. Performance Constraints

- Memoization rules: memoize the component. Individual row components should be memoized.
- Virtualization: the parent supplies paginated data. The component renders only the current page.
- Render boundaries: pure render from props. No data fetching.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct number of rows from provided data.
  - Each row shows invoice number, date, amount, and status.
  - Status badge reflects the correct status for each invoice.
  - Clicking a row (or View button) calls `onRowClick` with the correct invoice ID.
  - Clicking Download calls `onDownload` with the correct invoice ID.
  - Sorting a column calls `onSortChange` with the correct column and direction.
  - Pagination calls `onPageChange` with the correct page.
  - Empty state renders when data is empty.
  - Loading skeleton renders when loading is true.
- Interaction cases:
  - Tab navigation reaches all interactive row controls and pagination.
- Accessibility checks:
  - Table has an accessible label.
  - Sortable headers have `aria-sort`.
  - Row action buttons have descriptive `aria-label` with invoice number.
  - Status badge text is present (not color-only).
  - Contrast passes in both themes.
