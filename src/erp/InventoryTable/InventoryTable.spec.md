# Component Spec — InventoryTable

## 1. Purpose

Displays a structured, tabular view of inventory items within an ERP context. It presents stock quantities, SKU identifiers, product names, locations, and related metadata in a scannable grid format.

Use when: rendering lists of inventory records for operational review, auditing, or reporting.

Do NOT use when: displaying a single inventory item in detail (use a detail card or detail view instead), or when fewer than two data dimensions are needed (use a simple list instead).

---

## 2. UX Intent

- Primary interaction goal: allow operators to quickly scan, sort, and identify inventory records at a glance.
- Expected user mental model: a familiar data table, analogous to a spreadsheet or ledger, where rows represent items and columns represent attributes.
- UX laws applied:
  - Jakob's Law: mirror the conventions of standard data tables (headers, rows, alternating row treatment).
  - Miller's Law: limit default visible columns to a manageable set; allow column configuration for advanced use.
  - Gestalt (Proximity, Similarity): group related columns visually; use consistent row height and dividers to chunk data.
  - Hick's Law: do not expose every available action inline; surface primary actions per row only.

---

## 3. Visual Behavior

- Layout: full-width by default; expands to fill its container horizontally. Vertical overflow scrolls.
- Column headers: fixed at top during vertical scroll on web; sticky header pattern on native.
- Row height: uniform per row; derived from size tokens (not hardcoded pixel values).
- Typography: column header text uses a label/caption scale token; row cell text uses a body scale token.
- Spacing: cell padding driven by space tokens; consistent horizontal and vertical padding per cell.
- Token usage: background, border, text, and hover/selected state colors all sourced from theme color tokens.
- Responsive behavior: on narrow viewports, non-essential columns may be hidden or collapsed into a detail disclosure pattern. Minimum touch target size observed for any interactive row or cell element.

---

## 4. Interaction Behavior

- States:
  - Idle: rows display default background.
  - Hover (web): row receives a distinct background token on pointer hover.
  - Focus: keyboard-focused row or cell receives a visible focus ring using the focus color token.
  - Selected: selected row receives a distinct background and/or indicator using selection color tokens.
  - Disabled: non-interactive rows are visually de-emphasized using muted color tokens.
  - Loading: the table body renders a skeleton or loading indicator while data is pending; column headers remain visible.
  - Empty: when no rows are present, an empty state message occupies the table body area.
- Controlled vs uncontrolled: selection state may be controlled (via props) or uncontrolled (internal state).
- Keyboard behavior:
  - Arrow keys navigate between rows and cells.
  - Enter or Space activates a selected row's primary action if present.
  - Tab moves focus to interactive elements within a cell.
- Screen reader behavior:
  - Rendered with appropriate table semantics (table, columnheader, row, cell roles).
  - Column headers are associated with their cells.
  - Sort state announced when columns are sortable.
- Motion rules: row transitions (selection highlight) respect reduced-motion preferences; no animation when `prefers-reduced-motion` is active.

---

## 5. Accessibility Requirements

- ARIA: `role="table"` with `role="rowgroup"`, `role="row"`, `role="columnheader"`, and `role="cell"` descendants. `aria-sort` on sortable column headers.
- Focus: focus must be visible on all interactive rows and cells; focus ring must meet contrast requirements.
- Contrast: all text and icon elements must meet WCAG AA contrast ratios against their background tokens.
- Reduced motion: suppress row highlight transitions and any animated loading states when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: background (default, hover, selected, striped), border color, text (primary, secondary, muted), focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve correctly in both light and dark themes; striped row treatment must maintain readable contrast in dark mode.

---

## 7. Composition Rules

- What can wrap it: page layout containers, dashboard panels, drawer/sheet bodies.
- What it may contain: column header cells, data rows, an empty state slot, a loading state slot, optional pagination controls below the table.
- Anti-patterns:
  - Do not nest tables within table cells.
  - Do not place InventoryTable inside another InventoryTable.
  - Do not use for non-tabular data (use a list or card grid instead).

---

## 8. Performance Constraints

- Memoization: row components should be memoized to prevent unnecessary re-renders when unrelated state changes.
- Virtualization: when row counts exceed a practical threshold (typically 100+ rows), the table body should support windowed/virtualized rendering.
- Render boundaries: the table itself is a render boundary; avoid placing global state subscriptions directly inside row components.

---

## 9. Test Requirements

- Render: table renders with given data; correct number of rows and columns appears.
- Empty state: empty state slot renders when no rows are provided.
- Loading state: loading indicator renders when loading prop is active; column headers remain visible.
- Selection: selecting a row updates selected state; controlled selection reflects prop changes.
- Keyboard navigation: arrow key navigation moves focus between rows; Enter activates primary action.
- Accessibility: table has correct ARIA roles; column headers are associated with cells; focus ring is visible on keyboard navigation.
- Theming: component renders without hardcoded color values; dark mode tokens apply correctly.
- Reduced motion: animated transitions are suppressed when reduced motion preference is active.
