# Component Spec — DataTable

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Rich data table with sorting, filtering, pagination, and column visibility, built on `@tanstack/react-table`.
- **When to use:** Data exploration, admin panels, report views — any context needing interactive tabular data.
- **When NOT to use:** Simple static tables (use `Table`), non-tabular data (use List/Item), read-only key-value pairs (use description list).

---

## 2. UX Intent

- **Primary interaction goal:** Efficiently browse, sort, and filter structured data.
- **Expected user mental model:** A spreadsheet-like table with clickable column headers and page navigation.
- **UX laws applied:**
  - **Hick's Law** — sorting and filtering reduce visible choices to manageable sets
  - **Miller's Law** — pagination chunks data into digestible pages
  - **Fitts's Law** — column headers are full-width click targets for sorting

---

## 3. Anatomy

- `DataTable` — Root component, accepts `data`, `columns`, and feature flags
- Renders internally using `Table.Root`, `Table.Header`, `Table.Body`, `Table.Row`, `Table.Head`, `Table.Cell`, `Table.Caption`
- Optional pagination controls rendered below the table when `enablePagination` is true

> **TypeScript is the source of truth for props.** See `DataTableProps` in `DataTable.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

- **Idle** — table displays all data (or first page if paginated)
- **Sorted** — rows reorder based on clicked column; header shows arrow indicator
- **Filtered** — rows reduce based on global or column filters
- **Paginated** — rows split across pages; Previous/Next controls navigation
- **Empty** — "No results." shown when data is empty or all rows are filtered out

### Keyboard Interaction

- Column headers are clickable (mouse) to toggle sort direction
- Pagination buttons are standard `<button>` elements — focusable via Tab, activated via Enter/Space
- No custom arrow-key navigation — relies on native table semantics

### Motion

- None. State changes are immediate.

---

## 5. Accessibility

- **Semantic element:** Renders native `<table>` via the Table component, inheriting proper table semantics
- **ARIA attributes:** `aria-sort="ascending"` or `"descending"` on sorted column headers
- **Focus management:** Pagination buttons have `aria-label` ("Previous page", "Next page")
- **Screen reader announcements:** Sort direction changes reflected via `aria-sort`; empty state text announced naturally
- **Contrast:** Inherits Table component's token-based contrast (meets 4.5:1)

---

## 6. Styling

- **Design tokens used:** Inherits all Table component tokens (CSS custom properties)
- **Responsive behavior:** Full width via Table.Root; pagination controls flex-wrap naturally
- **Reduced motion:** No animations to degrade
- **Dark mode:** Automatic via Table's CSS custom property token system

---

## 7. Composition

- **What can contain this component:** Any layout container
- **What this component can contain:** Defined by `ColumnDef` — column cells can render any React node via `cell` render function
- **Anti-patterns:** Do not nest DataTable inside DataTable. Do not use for non-tabular layouts.
- **Platform note:** Web only. The Table component uses native HTML elements. For React Native, consumers should compose `@tanstack/react-table` with custom RN rendering.

---

## 8. Breaking Change Criteria

- Removing DataTable or any of its props
- Changing required props or their types
- Removing sorting/filtering/pagination support
- Changing from Table-based rendering to non-native elements
- Changing the `@tanstack/react-table` minimum version requirement

---

## 9. Test Requirements

- **Behavioral tests:** Renders data and columns; empty state; caption; sorting toggles; global filter; column filter; pagination controls; column visibility; controlled state props
- **Accessibility tests:** `aria-sort` on sorted headers; pagination button aria-labels; proper table semantic structure (table > thead > tr > th, table > tbody > tr > td)
- **Visual regression:** Default table, sorted state with arrow indicators, paginated state with controls
