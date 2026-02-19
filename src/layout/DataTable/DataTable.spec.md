# Component Spec — DataTable

## 1. Purpose

Provides a structured, read-oriented tabular display for presenting datasets with sortable column headers, row-level selection, and optional pagination. Used in admin dashboards, report views, and content listing pages where data is presented for scanning and navigation rather than direct editing.

Do NOT use this component for complex data editing, column resizing, row grouping, or infinite scroll with very large datasets (use DataGrid for those requirements). Do not use for non-tabular content lists (use a List component).

---

## 2. UX Intent

- Primary interaction goal: allow users to scan, sort, and act on rows of structured data with minimal friction, using familiar table conventions.
- Expected user mental model: a standard web data table with sortable column headers, clearly delineated rows, and row-level actions — similar to GitHub's issue list, Stripe's dashboard tables, or any enterprise admin table.
- UX laws applied:
  - Jakob's Law: sortable column headers with directional sort arrows, row hover highlight, and row click for navigation match universal enterprise table conventions.
  - Miller's Law: paginate or limit visible rows to approximately 25–50 by default to avoid cognitive overload.
  - Gestalt (Similarity, Continuity): consistent row height, aligned columns, and alternating row backgrounds (optional) aid scanability.
  - Fitts's Law: row tap targets span full width; action buttons within rows meet minimum touch target size.
  - Hick's Law: show only the most essential columns by default; additional columns should be opt-in.

---

## 3. Visual Behavior

- Layout: a scrollable container with a sticky header row and a body of data rows. Optional column widths may be set as token-based or percentage values. An optional toolbar above the table contains search, filter, and pagination controls.
- Sub-components (compound pattern): `DataTable.Header`, `DataTable.Row`, `DataTable.Cell` are individually composable for custom rendering needs while maintaining consistent structure.
- Spacing: cell padding (horizontal and vertical) uses space tokens. Row height is consistent and driven by size tokens.
- Typography: column header labels use a small, medium-weight body token. Cell content uses a regular body token. Secondary cell text uses a caption token in muted color.
- Token usage: header background, header text, row background, alternating row background (if enabled), row hover background, selected row background, divider color (horizontal), sort arrow color, and focus ring must all use design tokens.
- Responsive behavior: on small screens, the table scrolls horizontally. Columns may be hidden below certain breakpoints. A card-per-row mobile variant may be offered as an explicit alternate prop mode.

---

## 4. Interaction Behavior

- States:
  - Default: all rows visible, no active sort.
  - Sorted: active sort column shows directional indicator; rows reorder.
  - Row hover: row background changes to hover token; cursor becomes pointer if rows are pressable.
  - Row selected (if selection enabled): row background changes to selected token; checkbox is checked.
  - Loading: skeleton rows appear while data is being fetched.
  - Empty: empty state message replaces the table body when no rows exist.
  - Error: error message replaces the table body when data cannot be displayed.
- Controlled vs uncontrolled: column sort state, row selection, and pagination state all support controlled and uncontrolled patterns via value props and change callbacks.
- Keyboard behavior:
  - Tab navigates to the table; Arrow keys navigate between rows and cells.
  - Enter or Space on a row activates it (navigation or selection).
  - Enter or Space on a sortable column header cycles sort direction.
  - If selection checkboxes are present, Space toggles the focused checkbox.
- Screen reader behavior:
  - The table uses native `<table>` semantics or equivalent ARIA roles (`role="table"`, `role="columnheader"` with `scope="col"`, `role="row"`, `role="cell"`).
  - Active sort column header has `aria-sort`.
  - Selected rows have `aria-selected`.
  - Empty and error states are communicated via a visible message and announced to screen readers.
- Motion rules: row hover background transition uses a short duration token suppressed under reduced motion. Sort transitions are immediate.

---

## 5. Accessibility Requirements

- ARIA: `role="table"` (or native `<table>`). Column headers use `scope="col"` and `aria-sort` when active. Rows use `aria-selected` when selection is enabled. Row actions have descriptive `aria-label` values.
- Focus rules: table is reachable via Tab; interior navigation uses arrow keys. Individual row action controls (checkboxes, action menus) are separately focusable.
- Contrast: header text, cell text, dividers, and row hover/selected states must meet WCAG AA contrast using design tokens.
- Reduced motion: suppress row hover background transition.

---

## 6. Theming Rules

- Required tokens: header background, header text, row background, alternating row background (optional), row hover background, selected row background, divider color, sort arrow color, empty/error state text, focus ring, space tokens, size tokens (row height, cell padding), typography scale tokens.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; row separators and hover/selected states must remain distinguishable against dark surfaces.

---

## 7. Composition Rules

- What can wrap it: page-level admin views, tabbed content panels, report sections. Must be a descendant of the design system Provider.
- What it may contain (compound pattern):
  - `DataTable.Header` — the header row containing column header cells with sort controls.
  - `DataTable.Row` — a data row containing an ordered set of cells.
  - `DataTable.Cell` — an individual data cell, supporting custom renderers for badges, avatars, action menus, etc.
  - Optional: pagination controls below the table, an optional toolbar above.
- Anti-patterns:
  - Do not fetch data inside the component — accept rows as props.
  - Do not use for inline cell editing — use DataGrid for editable data.
  - Do not render more than approximately 100 rows without pagination or virtualization.
  - Do not use DataTable as a navigation or command surface.

---

## 8. Performance Constraints

- Memoization: `DataTable.Row` and `DataTable.Cell` components should be memoized; changes to one row must not trigger re-renders of unaffected rows.
- Virtualization: for tables exceeding approximately 100 rows, row virtualization is strongly recommended. For typical paginated tables (25–50 rows per page), virtualization is not required.
- Render boundaries: sort and filter computations must be performed outside the component and passed as already-processed row arrays.

---

## 9. Test Requirements

- Rendering: renders with a full dataset, empty dataset, and error state.
- Column sorting: clicking a sortable header changes sort direction; rows reorder; aria-sort updates.
- Row activation: clicking or pressing Enter on a row fires the onRowPress callback.
- Row selection: if enabled, checkboxes select/deselect rows; aria-selected reflects state.
- Loading state: skeleton rows appear when the loading prop is true.
- Empty state: empty state message renders when no rows are provided.
- Keyboard navigation: Arrow keys navigate cells; Tab reaches the table; Enter activates rows and sort headers.
- Sub-component composition: Header, Row, and Cell render independently and in combination.
- Accessibility: table/grid role, column header scope, aria-sort, aria-selected are all present and correct.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: no row hover animation when motion is reduced.
