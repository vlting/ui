# Component Spec — EmployeeDirectoryTable

## 1. Purpose

Presents a tabular listing of employees with columns for key identity and organizational attributes (e.g., name, department, role, location, status). Used in HR admin panels, org management dashboards, and people-ops reporting views where a scannable, sortable, and filterable list is needed.

Do NOT use this component for small employee lists of fewer than approximately five rows (use EmployeeCard grid instead), for displaying a single employee's details (use an EmployeeDetailPanel), or for read-only printed reports (use a dedicated report layout).

---

## 2. UX Intent

- Primary interaction goal: allow HR professionals and managers to quickly scan, sort, and locate employees by key attributes without leaving the directory screen.
- Expected user mental model: a standard data table with column headers that can be clicked to sort, rows that can be selected or tapped to navigate to a detail view, and optional search/filter controls above the table.
- UX laws applied:
  - Jakob's Law: sortable column headers with directional arrows, row hover highlight, and row-click navigation match established enterprise table conventions.
  - Hick's Law: expose only the most relevant columns by default; additional columns may be toggled via a column visibility control.
  - Fitts's Law: row tap targets must span the full row width; action menu triggers within rows must meet minimum touch target size.
  - Miller's Law: paginate or limit the default visible row count to approximately 25–50 rows to prevent cognitive overload.

---

## 3. Visual Behavior

- Layout: a scrollable table with a sticky header row. Rows alternate or are delineated by subtle divider lines. An optional toolbar above the table houses search, filter, and column controls.
- Spacing: cell padding (horizontal and vertical) uses space tokens. Row height is consistent and uses a size token.
- Typography: column header labels use a small, medium-weight body token. Cell content uses a regular body token. Secondary cell text (e.g., email below name) uses a caption token in muted color.
- Token usage: header background, row background, row hover background, divider color, selected row background, sort arrow color, and cell text colors must all use design tokens.
- Responsive behavior: on small screens, the table scrolls horizontally within its container. Columns may be deprioritized or hidden below certain breakpoints. A card-per-row layout may be offered as a mobile alternative prop variant.

---

## 4. Interaction Behavior

- States:
  - Default: all rows visible, no sort applied.
  - Sorted: the active sort column shows a directional indicator; rows reorder accordingly.
  - Row hover: row background changes to hover token color; cursor becomes a pointer if rows are clickable.
  - Row selected (if selection is enabled): row background changes to selected token color; checkbox or indicator is checked.
  - Loading: a skeleton loader replaces table rows while data is being fetched (data provided by parent).
  - Empty: an empty state illustration and message replaces the table body when no rows match.
  - Error: an error message replaces the table body when data cannot be displayed.
- Controlled vs uncontrolled: this is a presentation-only component. It accepts rows and column definitions as props. Sort state may be controlled (parent manages sort) or uncontrolled (component manages sort locally). Selection state follows the same pattern.
- Keyboard behavior:
  - Tab navigates to the table; Arrow keys navigate between rows and cells.
  - Enter or Space on a row activates it (navigation or selection, per configuration).
  - Click or Enter on a sortable column header changes sort order.
  - If row selection checkboxes are present, Space toggles the focused checkbox.
- Screen reader behavior:
  - The element uses a proper `<table>` (or ARIA table role equivalent) with `<thead>`, `<tbody>`, column headers marked `scope="col"`, and row headers if applicable.
  - Sort state is communicated via `aria-sort` on the active column header.
  - Selected rows communicate their state via `aria-selected`.
  - Empty and error states are announced via a live region or static `aria-label` on the table region.
- Motion rules: row hover background transition uses a short duration token suppressed under reduced motion. Sort transitions are immediate.

---

## 5. Accessibility Requirements

- ARIA: table uses `role="grid"` or native `<table>` semantics. Column headers have `scope="col"` and `aria-sort` when sortable. Rows have `aria-selected` if selection is enabled. Interactive rows have an appropriate accessible label.
- Focus rules: the table is reachable via Tab; interior navigation uses arrow keys. Row activation controls (checkboxes, action menus) are individually focusable.
- Contrast: header text, cell text, divider lines, and row hover states must meet WCAG AA contrast using design tokens.
- Reduced motion: suppress row hover background transition.

---

## 6. Theming Rules

- Required tokens: header background, header text, row background, row hover background, row selected background, divider color, cell text color, muted text color, sort arrow color, empty/error state text color, space tokens, size tokens (row height).
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; row separators and hover states must remain distinguishable against dark backgrounds.

---

## 7. Composition Rules

- What can wrap it: page-level admin views, tabbed content panels, modal drawers. Must be a descendant of the design system Provider.
- What it may contain: a column header row, data rows (each containing cells with employee data), optional inline action menus per row, optional selection checkboxes, and optional pagination controls below the table.
- Anti-patterns:
  - Do not fetch employee data inside this component — accept rows as props.
  - Do not embed sorting or filtering logic that bypasses props — keep the component controlled or clearly documented as uncontrolled.
  - Do not render interactive form elements (text inputs, selects) inline within cells unless the component explicitly supports inline editing.

---

## 8. Performance Constraints

- Memoization: individual row components should be memoized to prevent full-table re-render on single row data changes.
- Virtualization: for directories exceeding approximately 100 rows, the table must use row virtualization to maintain scroll performance. This is a hard requirement, not optional.
- Render boundaries: sorting and filtering computations that are O(n) or worse must be performed outside the component and passed as already-sorted/filtered row arrays.

---

## 9. Test Requirements

- Rendering: renders with a full set of rows, an empty data set, and an error state.
- Column sorting: clicking a sortable header changes sort direction and reorders rows; aria-sort reflects the active state.
- Row activation: clicking or pressing Enter on a row fires the onRowPress callback.
- Row selection: if enabled, checkboxes select/deselect rows; aria-selected reflects state.
- Loading state: skeleton rows appear when loading prop is true.
- Empty state: empty state message renders when no rows are provided.
- Keyboard navigation: Arrow keys navigate cells; Tab reaches the table; Enter activates rows.
- Accessibility: table/grid role, column header scope, aria-sort, aria-selected are all present and correct.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: no row hover animation when motion is reduced.
