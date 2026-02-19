# Component Spec — TeamMemberTable

## 1. Purpose

Displays a structured, paginated table of team members in an organization, showing each member's identity, role, join date, status, and available management actions.

Use it on team management, settings, and admin pages where an administrator needs to view and manage the members of an organization or team.

Do NOT use it for general data display unrelated to people/members, for single-user contexts, or inside constrained containers where a table cannot receive adequate horizontal space.

---

## 2. UX Intent

- Primary interaction goal: management — the user scans the member list, identifies specific users, and initiates actions (change role, remove member, resend invite).
- Expected user mental model: a data table with rows for people, similar to admin UIs in GitHub, Google Workspace, or Vercel. Each row is a single member record.
- UX laws applied:
  - Jakob's Law: follow standard data table conventions — column headers, sorted rows, row actions on the right.
  - Hick's Law: limit per-row actions to a short list (2–3 items) and group additional actions in an overflow menu.
  - Fitts's Law: row action buttons must have adequate minimum tap/click size (from size tokens).
  - Tesler's Law: member management is inherently complex; the table absorbs that complexity through clear column structure and inline actions.

---

## 3. Visual Behavior

- Layout: full-width table with defined columns (e.g., Member, Role, Status, Joined, Actions). Column widths may be fixed or flexible, but the Member column should be the widest.
- Spacing: row height and cell padding from space tokens. Consistent horizontal padding across all cells.
- Typography: column headers use a label/overline scale. Member name uses a body/label scale. Metadata (email, date) uses a secondary/caption scale. Role and status use RoleBadge and AccessControlBadge components.
- Token usage:
  - Header background: surface-raised or table-header token.
  - Row background: surface token; alternating rows optional via token.
  - Row hover: hover-state background token.
  - Border: border token for row dividers.
  - Action buttons: secondary button token style.
- Responsive behavior: on narrow viewports, secondary columns (e.g., join date) may be hidden. On mobile, a card-per-member layout may replace the table. The Member and Role columns must always be visible.

---

## 4. Interaction Behavior

- States:
  - Idle: populated with member rows.
  - Empty: displays an empty-state message when there are no members.
  - Loading: skeleton rows while data is loading.
  - Row hover: row background shifts to hover token.
  - Row selected (if multi-select supported): row shows a selected state with a checkbox.
- Controlled vs uncontrolled: data, sorting, and pagination are controlled by the parent via props. The component emits callbacks for user actions (`onRoleChange`, `onRemoveMember`, `onResendInvite`, `onSortChange`, `onPageChange`).
- Keyboard behavior:
  - Tab navigates through interactive controls (checkboxes, sort headers, action buttons).
  - Arrow keys navigate between rows if the table supports row-level navigation.
  - Enter/Space activates the focused interactive element.
- Screen reader behavior: table uses `<table>`, `<thead>`, `<th scope="col">`, and `<tbody>` semantics. Sortable headers include `aria-sort`. Row action menus have `aria-label` describing the member they target. Status badges convey their meaning via text.
- Motion rules: row hover transition is a subtle background color change. Suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: table must have an accessible label. Sortable column headers have `aria-sort`. Action buttons within rows must have `aria-label` that includes the member's name (e.g., "Remove Alice Smith"). Multi-select checkboxes use `aria-label` with the member name.
- Focus rules: tab order progresses through all interactive controls in reading order (left-to-right, top-to-bottom). Row action menus trap focus while open.
- Contrast expectations: all text, badge labels, and icons must meet WCAG AA contrast against their background tokens.
- Reduced motion behavior: row hover and any row appear/disappear animations are disabled under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: surface, surface-raised, hover state, selected state, border, primary text, secondary text, space tokens (row height, cell padding), type scale tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based dimensions, no hardcoded font sizes.
- Dark mode expectations: table header, row backgrounds, hover states, and borders must all resolve to appropriate dark-mode token values. Badge components used inside rows handle their own dark-mode theming.

---

## 7. Composition Rules

- What can wrap it: page-level layout containers, settings sections, admin dashboard panels.
- What it may contain: rows composed of an Avatar, member name and email, RoleBadge, AccessControlBadge (if applicable), status indicator, join date, and row action controls (buttons or overflow menu).
- Anti-patterns:
  - Do not embed complex forms or multi-step flows directly inside table cells — use modals for editing.
  - Do not use TeamMemberTable for non-member data (e.g., product inventory, analytics).
  - Do not hardcode a visible row count; the parent controls pagination.

---

## 8. Performance Constraints

- Memoization rules: memoize the component. Individual row components must be memoized to prevent full re-renders when only one row's data changes.
- Virtualization: for teams with many members, the parent must supply paginated data. The component renders only the current page.
- Render boundaries: data fetching is the parent's responsibility. The component renders from props only.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct number of rows from the provided data.
  - Each row displays member name, email, role, and status.
  - Empty state renders when data is empty.
  - Loading state renders skeleton rows when loading is true.
  - Clicking a sortable column header calls `onSortChange` with the correct column and direction.
  - Row action (remove/role change) triggers the corresponding callback.
  - Pagination controls call `onPageChange` with the correct page number.
- Interaction cases:
  - Tab navigation reaches all interactive controls in each row.
  - Row action menu opens, is keyboard navigable, and closes on Escape.
  - Multi-select checkboxes (if present) update the selection state.
- Accessibility checks:
  - Table has an accessible label.
  - Column headers have `aria-sort` when sortable.
  - Row action buttons have descriptive `aria-label` including member name.
  - Contrast passes for all text and badge elements in both themes.
  - Focus trap works correctly inside row action menus.
