# Component Spec — DataGrid

## 1. Purpose

Provides a high-capability tabular data display surface supporting sortable columns, resizable columns, inline cell editing, row selection, row grouping, column pinning, and pagination or infinite scroll. Used in power-user admin interfaces, data-heavy reporting dashboards, and operational back-office tools where users need to work directly with large structured datasets.

Do NOT use this component for simple read-only tables with fewer than approximately 10 columns and no editing (use DataTable instead), for displaying unstructured content lists (use a List), or for charted/aggregated data (use chart components).

---

## 2. UX Intent

- Primary interaction goal: allow power users to view, sort, filter, and optionally edit large datasets in a spreadsheet-like interface with minimal navigation away from the grid.
- Expected user mental model: an advanced spreadsheet grid — columns can be resized and reordered, rows can be sorted and filtered, individual cells can be edited in-place, and large datasets are paged or lazily loaded.
- UX laws applied:
  - Jakob's Law: spreadsheet-like column resize handles, sort indicators, and cell edit-on-click behavior match established conventions from Excel, Google Sheets, Airtable, and AG Grid.
  - Hick's Law: column visibility and filter controls should be accessible but not permanently visible by default, to avoid overwhelming users with controls.
  - Miller's Law: show a manageable number of rows at once (pagination or virtual scrolling) rather than rendering thousands simultaneously.
  - Fitts's Law: column resize handles, sort headers, and row selection checkboxes must be easily targetable.
  - Doherty Threshold: sort and filter operations must re-render within 400 ms to feel immediate.

---

## 3. Visual Behavior

- Layout: a scrollable container with a fixed header row and a virtualized body of data rows. Optional column group headers may appear above the primary header row. A toolbar above the grid houses filter, column, and density controls.
- Spacing: cell padding (horizontal and vertical), column resize handle width, and row height all use size and space tokens. Row height may be configurable (compact, default, comfortable) via token-driven presets.
- Typography: column header labels use a small, medium-weight body token. Cell text uses a regular body token. Secondary/metadata cell content uses a caption token in muted color.
- Token usage: header background, row background, alternating row background (if enabled), row hover background, selected row background, editing cell background, divider colors (vertical and horizontal), sort arrow color, resize handle color, and focus ring must all use design tokens.
- Responsive behavior: on small screens, the grid scrolls horizontally within its container. Column pinning (first/last column fixed during horizontal scroll) is supported via a configuration prop. A card-per-row mobile alternative layout may be offered but is a separate concern from the grid itself.

---

## 4. Interaction Behavior

- States:
  - Default: rows visible, columns in their initial order, no sort applied.
  - Sorted: active sort column shows a directional arrow; rows reorder.
  - Filtered: rows not matching the active filter are hidden; filter indicator appears in the column header.
  - Selected row(s): row background changes to selected token; selection checkbox is checked.
  - Cell editing (if enabled): double-click or Enter on a cell opens an inline editor within the cell; cell border changes to focused/editing token.
  - Column resizing: resize handle is dragged; column width updates in real time.
  - Loading: skeleton rows replace data rows while initial data is fetched.
  - Empty: empty state message replaces the grid body when no rows exist or match filters.
  - Error: error message replaces the grid body when data cannot be displayed.
- Controlled vs uncontrolled: row data, column definitions, sort state, filter state, and selection state all support controlled and uncontrolled patterns. The grid emits change callbacks for each interactive concern.
- Keyboard behavior:
  - Tab moves focus to the grid; Arrow keys navigate between cells.
  - Enter on a header cell cycles sort direction.
  - Enter on a data cell opens the inline editor (if editable).
  - Escape cancels an active cell edit.
  - Space on a row or row checkbox toggles row selection.
  - Ctrl+A (or Cmd+A) selects all rows when the grid is focused (if selection is enabled).
- Screen reader behavior:
  - The grid uses `role="grid"` with `aria-rowcount` and `aria-colcount`. Column headers use `role="columnheader"` with `aria-sort`. Data cells use `role="gridcell"`. Row headers (if applicable) use `role="rowheader"`.
  - Editable cells have `aria-readonly="false"`. Selected rows have `aria-selected="true"`.
  - Sort and filter state changes are announced via live regions.
- Motion rules: row hover background transition uses a short duration token suppressed under reduced motion. Sort and filter transitions are immediate.

---

## 5. Accessibility Requirements

- ARIA: `role="grid"` on the container, `role="columnheader"` with `aria-sort` on headers, `role="gridcell"` on cells, `aria-rowcount`, `aria-colcount`, `aria-rowindex` on rows. Selection uses `aria-selected`. Editable cells use `aria-readonly="false"`. Column resize handles have `aria-label` and `role="separator"` with `aria-orientation="vertical"`.
- Focus rules: the grid manages focus with a roving tabindex pattern across cells. Focus is visible at all times. Inline cell editors capture focus when active.
- Contrast: header text, cell text, selected row background, and hover background must all meet WCAG AA contrast using design tokens.
- Reduced motion: suppress row hover transition.

---

## 6. Theming Rules

- Required tokens: header background, header text, row background, alternating row background (optional), row hover background, row selected background, cell editing background, divider color (horizontal and vertical), sort arrow color, resize handle color, focus ring, loading skeleton color, space tokens, size tokens (row height, cell padding), typography scale tokens.
- Prohibited hardcoded values: no hardcoded colors, spacing, pixel dimensions, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; row separators and selection/hover states must remain distinguishable against dark backgrounds.

---

## 7. Composition Rules

- What can wrap it: page-level admin views, full-screen data workbench layouts, panel sections with defined height constraints. Must be a descendant of the design system Provider. The grid must be placed in a container with explicit height or max-height to enable internal scrolling.
- What it may contain: a column header row (with sort, resize, and filter affordances), data rows with cells, optional row group headers, optional footer row for aggregations, and an optional toolbar above the grid.
- Anti-patterns:
  - Do not use DataGrid for simple read-only tables — use DataTable.
  - Do not fetch data inside the component — accept rows as props; emit pagination callbacks.
  - Do not embed business logic (calculations, transformations) inside the grid — compute in the parent and pass pre-computed values.
  - Do not render DataGrid without a defined container height; it must be given explicit vertical space.

---

## 8. Performance Constraints

- Memoization: row components must be memoized; a change to one row must not trigger re-renders of unaffected rows.
- Virtualization: row and optionally column virtualization is required for datasets exceeding approximately 100 rows. This is a hard requirement.
- Render boundaries: sorting, filtering, and pagination computations must be performed outside the component and provided as already-processed rows. The grid renders only what it is given.

---

## 9. Test Requirements

- Rendering: renders with a full dataset, empty dataset, and error state.
- Column sorting: clicking a sortable header changes sort direction and updates aria-sort.
- Column resizing: dragging a resize handle changes column width.
- Row selection: clicking a row or its checkbox toggles selection; aria-selected reflects state.
- Cell editing: double-clicking or pressing Enter on an editable cell opens the inline editor; Escape cancels; Enter confirms.
- Keyboard navigation: Arrow keys navigate cells; Tab enters the grid; roving tabindex works correctly.
- Virtualization: grid renders only the visible rows plus a buffer when the dataset is large.
- Loading state: skeleton rows appear when the loading prop is true.
- Accessibility: grid role, columnheader with aria-sort, gridcell, aria-selected, aria-rowcount, aria-colcount are all present.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: no row hover animation when motion is reduced.
