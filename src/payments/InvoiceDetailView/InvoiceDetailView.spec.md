# Component Spec — InvoiceDetailView

## 1. Purpose

Displays the complete details of a single invoice: line items, amounts, dates, payment status, billing address, and actions (download PDF, pay now).

Use it on a dedicated invoice detail page or inside a modal/sheet triggered from an InvoiceTable row.

Do NOT use it for summary-level invoice data (use InvoiceTable), for editing invoice details (invoices are read-only), or for displaying non-invoice financial documents.

---

## 2. UX Intent

- Primary interaction goal: review and action — the user reads the invoice details to verify correctness and optionally downloads or pays the invoice.
- Expected user mental model: a digital receipt or invoice document, similar to those seen in Stripe Dashboard, QuickBooks, or Shopify admin. The layout mirrors a physical invoice: header with parties and dates, a line-item table, and a total summary.
- UX laws applied:
  - Gestalt Law of Proximity: group related information — invoice header, line items, and totals — into clearly separated sections.
  - Jakob's Law: match the visual structure of well-known invoice documents. Users should not need to learn a new layout.
  - Fitts's Law: primary action buttons (Download, Pay Now) must be prominently placed with adequate target size.

---

## 3. Visual Behavior

- Layout: a document-like vertical layout divided into sections: (1) invoice header (invoice number, status, dates, parties), (2) line items table, (3) totals summary (subtotal, tax, total), (4) footer (payment method used, notes).
- Spacing: generous section padding using space tokens. Line items use a table layout with consistent column alignment.
- Typography: invoice number and total use a heading/display scale. Section labels use a label/overline scale. Line item descriptions use body scale. Amounts use tabular/monospaced numbers for alignment.
- Token usage:
  - Surface: document-surface or elevated surface token (distinct from page background).
  - Status badge: semantic tokens matching invoice status (paid = positive, overdue = destructive, pending = warning).
  - Text: primary foreground for amounts and descriptions; secondary foreground for labels and metadata.
  - Border: border tokens for section dividers and the line items table.
- Responsive behavior: on narrow viewports, the invoice header stacks vertically. The line items table scrolls horizontally if needed. Totals remain full-width at the bottom.

---

## 4. Interaction Behavior

- States:
  - Display: invoice is shown in full read-only detail.
  - Loading: skeleton layout while data is provided by the parent.
  - Error: error message when invoice data cannot be loaded (passed via prop).
  - Downloading: download action shows a brief loading state on the button.
  - Paying (if applicable): pay action shows a loading state while processing.
- Controlled vs uncontrolled: display-only. Accepts invoice data as props. Action callbacks (`onDownload`, `onPay`) are provided by the parent.
- Keyboard behavior: all action buttons are keyboard-reachable via Tab. No complex keyboard interactions within the read-only content.
- Screen reader behavior: the invoice structure uses semantic heading hierarchy. The line items table uses proper table semantics with column headers. Invoice status badge conveys status via text. Totals are clearly labeled.
- Motion rules: no animations on the static content. Button loading states use a spinner transition from motion tokens; suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: the line items table uses `<table>`, `<th scope="col">`, and `<tbody>` semantics. Invoice status is conveyed via text (not color alone). Action buttons have descriptive labels (e.g., "Download invoice #INV-001 as PDF").
- Focus rules: tab order follows reading order through the document sections and then to action buttons.
- Contrast expectations: all text, status badges, and amounts must meet WCAG AA contrast.
- Reduced motion behavior: button loading spinner animations are instant/minimal under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: document surface, primary text, secondary text, border, semantic status tokens (positive, warning, destructive), space tokens (section padding, table cell padding), radius tokens (card/document corners), shadow tokens (document elevation).
- Prohibited hardcoded values: no raw hex colors, no pixel-based spacing, no hardcoded font sizes.
- Dark mode expectations: the document surface must be visually elevated above the page background in dark mode. Status tokens must remain legible and correctly semantic in dark mode.

---

## 7. Composition Rules

- What can wrap it: a dedicated invoice detail page, a Sheet or Dialog triggered from InvoiceTable.
- What it may contain: an invoice header section, a line-items table, a totals summary section, a payment method/notes footer, and action buttons (Download, Pay Now).
- Anti-patterns:
  - Do not allow editing of invoice content within this component — invoices are immutable.
  - Do not use InvoiceDetailView to display non-invoice financial data.
  - Do not embed InvoiceDetailView inside another InvoiceDetailView.

---

## 8. Performance Constraints

- Memoization rules: memoize the component. The invoice data object should be a stable reference to avoid unnecessary re-renders.
- Virtualization: not applicable for typical invoice sizes (up to ~50 line items). For unusual cases with very many line items, the parent is responsible for providing a truncated or paginated data set.
- Render boundaries: the component does not perform data fetching. All data is received via props.

---

## 9. Test Requirements

- What must be tested:
  - Renders all invoice header fields (number, date, due date, status, parties).
  - Renders all line items with description, quantity, unit price, and total.
  - Renders the totals section with subtotal, tax, and grand total.
  - Status badge reflects the correct invoice status.
  - Download button calls `onDownload` with the invoice identifier.
  - Pay button calls `onPay` with the invoice identifier (if the invoice is payable).
  - Loading state renders a skeleton layout.
  - Error state renders an error message.
- Interaction cases:
  - Tab navigation reaches the Download and Pay buttons.
- Accessibility checks:
  - Line items table has column headers with correct scope.
  - Status badge text is present (not color-only).
  - Action buttons have descriptive labels.
  - Contrast passes in both themes.
