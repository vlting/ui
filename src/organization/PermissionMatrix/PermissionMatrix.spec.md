# Component Spec — PermissionMatrix

## 1. Purpose

Displays a two-dimensional grid mapping roles (rows) to permissions or resources (columns), showing which combinations are granted, denied, or partially permitted.

Use it on permission management pages where administrators need to understand or configure the relationship between multiple roles and multiple capabilities simultaneously.

Do NOT use it for simple single-role permission views (use a list), for individual user permissions (use AccessControlBadge or RoleBadge inline), or for displaying fewer than three roles or three permissions (a simpler table suffices).

---

## 2. UX Intent

- Primary interaction goal: comprehension and comparison — the user scans the matrix to understand which roles have which permissions and identify gaps or conflicts.
- Expected user mental model: a spreadsheet-like grid where rows are roles and columns are permissions. Each cell shows a granted/denied indicator. Familiar from enterprise IAM tools and CMS permission editors.
- UX laws applied:
  - Gestalt Law of Continuity: aligned rows and columns create clear visual paths for scanning across a role's permissions or down a permission's role list.
  - Gestalt Law of Similarity: consistent cell indicators (checkmark, X, dash) across the entire matrix reinforce meaning without requiring re-learning per row.
  - Tesler's Law: the inherent complexity of a permission matrix cannot be simplified away; the component must present it clearly rather than hiding it.
  - Hick's Law: column headers and row labels must use clear, concise terminology to reduce decision time per cell.

---

## 3. Visual Behavior

- Layout: a table structure with sticky column headers and optionally sticky row headers. Cells are equal-width or content-driven per column.
- Spacing: cell padding from space tokens. Minimum cell size from size tokens (sufficient for a touch target if cells are interactive).
- Typography: column headers use a label/overline scale. Row labels use a body or label scale. Cell indicators (checkmark, X) are icon-scale.
- Token usage:
  - Header background: surface-raised or header surface token.
  - Cell background: alternating or uniform surface token; hover uses hover-state token (if interactive).
  - Granted indicator: semantic positive/success color token.
  - Denied indicator: semantic destructive/error color token.
  - Partial/inherited indicator: semantic warning or neutral token.
  - Border: border token for cell dividers.
- Responsive behavior: on narrow viewports, the matrix must scroll horizontally. Row labels remain sticky on the left. Column headers remain sticky at the top. Do not collapse the matrix to a different layout on mobile.

---

## 4. Interaction Behavior

- States:
  - Read-only (display): cells show granted/denied/partial without interactivity.
  - Editable (if supported): cells are toggleable; clicking a cell cycles through allowed states. Edit mode is signaled by the parent via a prop.
  - Hover (editable): cell highlights with a hover token.
  - Focus (editable): cell receives a visible focus ring.
  - Disabled cell: a cell that cannot be toggled is visually muted and not focusable.
  - Loading: skeleton cells while data is loading.
- Controlled vs uncontrolled: the permission state for each cell is controlled by the parent. The component emits change events via `onPermissionChange(role, permission, newValue)`.
- Keyboard behavior (editable mode):
  - Arrow keys navigate between cells.
  - Space or Enter toggles the focused cell.
  - Tab moves to the next interactive element outside the matrix.
- Screen reader behavior: the matrix uses `<table>` semantics (or ARIA equivalents). Each cell has a computed accessible label combining the row label and column header. Granted/denied state is conveyed via text, not color alone.
- Motion rules: cell toggle transitions use a brief background/icon transition from motion tokens. Suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: table must have an accessible label. Column headers use `<th scope="col">`. Row headers use `<th scope="row">`. In editable mode, interactive cells use `role="checkbox"` or `role="switch"` with `aria-checked` and `aria-label` combining row and column names.
- Focus rules: in editable mode, cells are focusable via keyboard. Focus ring must be clearly visible. Arrow-key navigation within the matrix must not require Tab through every cell.
- Contrast expectations: granted (positive) and denied (destructive) indicators must meet WCAG AA contrast. Color must not be the only differentiator — icon shape (checkmark vs X) is required.
- Reduced motion behavior: cell state change animations are disabled under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: surface, surface-raised, header surface, hover state, positive/success semantic, destructive/error semantic, warning/neutral semantic, border, space tokens, radius tokens (for cell or matrix border).
- Prohibited hardcoded values: no raw hex colors, no pixel-based cell dimensions, no hardcoded icon sizes.
- Dark mode expectations: all surface, border, and semantic color tokens must have dark-mode equivalents. Contrast of granted/denied indicators must hold in both modes.

---

## 7. Composition Rules

- What can wrap it: permission management pages, role configuration dialogs, settings sections. The component should be given adequate horizontal space.
- What it may contain: a table of cells; each cell may contain an icon indicator or a toggle control. Row labels may include RoleBadge components. Column headers may include tooltips explaining each permission.
- Anti-patterns:
  - Do not use PermissionMatrix for fewer than three roles or permissions — a simpler list is more appropriate.
  - Do not embed form controls other than permission toggles inside cells.
  - Do not use PermissionMatrix as a navigation element.

---

## 8. Performance Constraints

- Memoization rules: memoize the component. Individual rows should be memoized so that toggling one cell does not re-render all rows.
- Virtualization: for very large matrices (e.g., 20+ roles or 20+ permissions), the parent should provide windowing. The component must not force a full render of all cells simultaneously.
- Render boundaries: the component is purely presentational. Permission logic and state management live in the parent.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct number of rows (roles) and columns (permissions).
  - Each cell correctly shows granted, denied, or partial state for the provided data.
  - In editable mode, clicking a cell triggers `onPermissionChange` with the correct role, permission, and new value.
  - Disabled cells cannot be toggled.
  - Loading state renders skeleton cells.
- Interaction cases:
  - Arrow key navigation moves focus through cells in editable mode.
  - Space/Enter toggles the focused cell.
  - Read-only cells are not focusable or interactive.
- Accessibility checks:
  - Table has an accessible label.
  - Column and row headers use correct scope attributes.
  - Interactive cells have `role="checkbox"` or `role="switch"` with `aria-checked` and descriptive `aria-label`.
  - Granted/denied state is not communicated by color alone.
  - Contrast passes for all indicators in both themes.
  - Focus ring is visible on focused cells.
