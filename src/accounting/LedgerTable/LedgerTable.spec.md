# Component Spec — LedgerTable

## 1. Purpose

Displays a structured table of accounting ledger entries, enabling users to review, scan, and optionally interact with individual transaction records (e.g., debits, credits, balances, dates, descriptions, categories).

Use when: presenting a list of financial transactions or journal entries in a tabular format within an accounting context.

Do NOT use when: displaying a single financial summary — use `FinancialSummaryCard` instead. Do NOT use for non-financial tabular data — use a generic data table component for that.

---

## 2. UX Intent

- Primary interaction goal: enable users to scan a list of ledger transactions efficiently, identify individual entries, and take row-level actions if applicable.
- Expected user mental model: users expect a conventional accounting ledger layout — rows represent transactions, columns represent attributes (date, description, category, debit, credit, balance), with numeric columns right-aligned and currency-formatted.
- UX laws applied:
  - **Jakob's Law** — the table layout must match accounting conventions: date on the left, running balance on the right.
  - **Gestalt Law of Continuity** — alternating row shading or subtle row borders guide the eye horizontally across wide tables.
  - **Miller's Law** — paginate or virtually scroll when the entry count exceeds a manageable threshold; do not render hundreds of rows simultaneously.

---

## 3. Visual Behavior

- Layout rules: full-width table with defined column widths; numeric/currency columns are right-aligned; text description columns are left-aligned; date columns may be center or left-aligned per convention.
- Spacing expectations: cell padding uses space tokens (compact scale for dense data, medium for comfortable variants); row height is consistent and defined by a size token.
- Typography rules: column headers use the label or caption type style token in a medium weight; cell content uses the body type style token; numeric values use tabular/monospace numeric rendering where available via a font-variant token.
- Token usage: table background, header background, row hover background, row border, text, and numeric emphasis colors all reference design tokens.
- Responsive behavior: on narrow viewports, the table may scroll horizontally within its container; column priority determines which columns remain visible at each breakpoint; the description column is typically the last to be hidden.

---

## 4. Interaction Behavior

- States:
  - **idle**: rows fully rendered with data.
  - **row hover**: row background shifts to the hover token.
  - **row selected**: row background shifts to the selected token; a checkbox or indicator marks the row.
  - **row focus**: focus ring visible on the row or interactive cell.
  - **loading**: skeleton rows occupy the table body.
  - **empty**: an empty-state message spans the full table width.
  - **error**: an error-state message spans the full table width.
- Controlled vs uncontrolled: selected rows and sort state may be controlled externally via props; hover state is uncontrolled.
- Keyboard behavior: Tab moves between interactive rows or cells; arrow keys navigate between rows when the table has row-level focus; Enter or Space activates a row action.
- Screen reader behavior: the table uses semantic `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` roles (or ARIA equivalents for custom rendering); column headers have `scope="col"`; sortable headers announce the current sort direction via `aria-sort`.
- Motion rules: row hover transitions use `duration.fast` tokens; skeleton loading animation respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA requirements: `role="table"` (or native `<table>`) with `aria-label` describing the ledger context; sortable column headers expose `aria-sort`; row-level checkboxes have `aria-label` identifying the row.
- Focus rules: focus is visible on any interactive row or cell; focus order follows the visual left-to-right, top-to-bottom sequence.
- Contrast expectations: table header text meets WCAG AA (4.5:1) against the header background; body text meets AA against the row background; row borders meet 3:1 non-text contrast.
- Reduced motion behavior: skeleton shimmer and row hover transitions are disabled; static styles are applied immediately.

---

## 6. Theming Rules

- Required tokens: table background, header background, header text color, body text color, row border color, row hover background, row selected background, empty/error state text color, skeleton background.
- Prohibited hardcoded values: no raw hex codes, pixel values for cell padding, or hardcoded font sizes.
- Dark mode expectations: row borders and alternating backgrounds must remain distinguishable against the table background in dark mode; selected and hover states must be visually distinct from each other and from idle rows.

---

## 7. Composition Rules

- What can wrap it: a card, panel, page section, or the accounting module's main content area.
- What it may contain: a header row with column labels, data rows with cell content (text, currency values, badges, action buttons), a footer row for totals, empty/error state slots, and a pagination control slot.
- Anti-patterns:
  - Do not embed data fetching or business calculation logic inside this component.
  - Do not nest tables inside table cells.
  - Do not hard-code column definitions — all columns must be supplied via props.

---

## 8. Performance Constraints

- Memoization rules: row components should be memoized when the data array is large and the parent re-renders frequently.
- Virtualization: when the entry count exceeds a defined threshold (e.g., 100 rows), the consumer must enable virtual scrolling via a prop; the component exposes a virtualization mode but does not implement the scrolling engine itself.
- Render boundaries: a feature-level error boundary wraps the table; no internal error boundary is required.

---

## 9. Test Requirements

- What must be tested:
  - Renders all provided rows and columns correctly.
  - Renders the loading skeleton when the loading prop is set.
  - Renders the empty state when no rows are provided.
  - Renders the error state when an error prop is set.
  - Row selection updates the selected visual state.
  - Sortable column headers display the correct `aria-sort` value.
- Interaction cases:
  - Clicking a sortable column header calls the sort callback with the correct column key and direction.
  - Selecting a row triggers the selection callback.
  - Keyboard navigation moves focus between rows.
- Accessibility checks:
  - `aria-label` present on the table.
  - `scope="col"` on all header cells.
  - `aria-sort` present on sorted column header.
  - No contrast violations on header text, body text, or row borders in light and dark themes.
