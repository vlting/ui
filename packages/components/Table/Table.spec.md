> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Table

## 1. Purpose

- Renders structured tabular data using native HTML table elements.
- Use for data grids, comparison tables, and any content with row/column relationships.
- Do NOT use for layout purposes — use Stack/Grid instead.

---

## 2. UX Intent

- **Primary interaction goal:** Scan and compare structured data across rows and columns.
- **Expected user mental model:** A standard data table with headers, rows, and cells.
- **UX laws applied:**
  - **Miller's Law** — columns chunk related data into scannable groups.
  - **Gestalt Proximity** — cell borders and alternating rows visually group data.
  - **Jakob's Law** — follows standard HTML table conventions.

---

## 3. Anatomy

- **Table** (Root) — `<table>` element.
- **Table.Header** — `<thead>` element.
- **Table.Body** — `<tbody>` element.
- **Table.Footer** — `<tfoot>` element.
- **Table.Row** — `<tr>` element.
- **Table.Head** — `<th>` element (column header).
- **Table.Cell** — `<td>` element.
- **Table.Caption** — `<caption>` element.

All sub-components render native HTML elements (not Tamagui styled components) to ensure correct table semantics.

> **TypeScript is the source of truth for props.** See the exported types in `Table.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Idle** — Static data display.
- **Hover** — Row hover highlight via CSS.

### Keyboard Interaction

- Native HTML table keyboard navigation (Tab between focusable cells, arrow keys where applicable).
- Follows the [WAI-ARIA Table pattern](https://www.w3.org/WAI/ARIA/apg/patterns/table/).

### Motion

- No animations.

---

## 5. Accessibility

- **Semantic element:** Native `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`, `<caption>`.
- **ARIA attributes:** Native table semantics are sufficient. `<th>` elements should include `scope="col"` or `scope="row"` (consumer responsibility).
- **Focus management:** Standard tab navigation for any focusable content within cells.
- **Screen reader announcements:** Table structure, headers, and caption announced natively.

---

## 6. Styling

- **Design tokens used:** CSS custom properties mapped from design tokens: `--borderColor`, `--f-body` (font family), `--f-size-*` (font sizes). Row borders use `borderBottom`. Header text is left-aligned with bold weight.
- **Responsive behavior:** Tables overflow horizontally when content exceeds container width; wrap in ScrollArea for horizontal scroll.
- **Dark mode:** CSS custom properties resolve from Tamagui theme tokens.
- **Note:** Uses native HTML elements with inline style objects (not Tamagui `styled()`) because the Tamagui `tag` prop does not change the rendered element.

---

## 7. Composition

- **What can contain this component:** Any layout — commonly inside cards or scroll containers.
- **What this component can contain:** Header, Body, Footer as direct children. Each contains Rows; Rows contain Head or Cell elements. Caption is a direct child of Table.
- **Anti-patterns:** Do not use `<td>` for headers. Do not omit `<thead>` when there are column headers. Do not nest tables.

---

## 8. Breaking Change Criteria

- Removing any sub-component (Header, Body, Footer, Row, Head, Cell, Caption).
- Changing from native HTML elements to Tamagui styled components.
- Removing the CSS custom property token mapping.
- Changing the rendered HTML element for any sub-component.

---

## 9. Test Requirements

- **Behavioral tests:** Renders correct HTML element hierarchy (`table > thead > tr > th`, `table > tbody > tr > td`); Caption renders `<caption>`.
- **Accessibility tests:** Native table semantics verified; `<th>` present in header rows; `<caption>` provides table name.
- **Visual regression:** Basic table, with caption, with footer, hover state on rows.
