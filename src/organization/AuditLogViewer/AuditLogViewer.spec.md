# Component Spec — AuditLogViewer

## 1. Purpose

Presents a structured, filterable, and paginated view of an organization's audit trail — security-sensitive events such as permission changes, logins, deletions, and administrative actions.

Use it on dedicated audit or compliance pages where administrators need to review and verify historical actions.

Do NOT use it for general activity feeds (use ActivityLogList), for real-time event streams, or in contexts where users do not have administrative privileges.

---

## 2. UX Intent

- Primary interaction goal: investigation — an administrator searches, filters, and reads audit events to verify compliance or diagnose an incident.
- Expected user mental model: a security log viewer similar to those found in cloud consoles or enterprise admin dashboards. Events are immutable records.
- UX laws applied:
  - Jakob's Law: follow the visual conventions of well-known audit log tools (table layout, filter bar at top, timestamp column).
  - Hick's Law: filter controls should be minimal and progressive — start with the most common filters (date range, actor, event type) and hide advanced options.
  - Fitts's Law: filter controls and pagination actions must be large enough to target easily.
  - Tesler's Law: the inherent complexity of audit data cannot be eliminated; the component must absorb that complexity rather than exposing it raw.

---

## 3. Visual Behavior

- Layout: a full-width container with a filter/search bar at the top, a data table or list in the body, and pagination controls at the bottom.
- Spacing: structured grid alignment. Column widths should be consistent. Row height is determined by content but has a minimum height via space tokens.
- Typography: column headers use a label/overline style. Cell text uses a body or small-body style. Timestamps use a monospaced or tabular-numbers style for alignment.
- Token usage:
  - Table header background: surface-raised or header surface token.
  - Row backgrounds: alternating surface tokens or hover state token on row hover.
  - Text: primary foreground for main content, secondary foreground for metadata.
  - Severity/event type indicators: semantic color tokens (same palette as AccessControlBadge and RoleBadge).
- Responsive behavior: on narrow viewports, columns may be hidden progressively (least important first); a summary card layout may replace the table for mobile.

---

## 4. Interaction Behavior

- States:
  - Idle: table populated with audit events.
  - Loading: skeleton rows while data is being received from parent.
  - Empty: clear empty-state message when no events match the current filters.
  - Error: error state display provided by the parent; the component accepts an error prop.
- Controlled vs uncontrolled: filter state may be controlled (via props) or uncontrolled (internal state); both patterns must be supported.
- Keyboard behavior:
  - Filter inputs are reachable via Tab.
  - Table rows are navigable via arrow keys if they are interactive (e.g., expandable for detail).
  - Pagination controls are keyboard-reachable.
- Screen reader behavior: the table uses proper `<table>`, `<thead>`, `<th scope="col">`, and `<tbody>` semantics (or equivalent ARIA roles). Sort and filter state changes announce to assistive technology via live regions.
- Motion rules: row hover transitions use a subtle background color transition (duration from motion tokens). Suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: table must have an accessible label (via `aria-label` or `aria-labelledby`). Sortable columns must use `aria-sort`. Filter changes that update results must trigger an `aria-live` announcement of the result count.
- Focus rules: after applying a filter, focus remains on the filter control. After pagination, focus moves to the first row or table caption.
- Contrast expectations: all text and icon content meets WCAG AA. Severity color indicators must not rely on color alone — include text labels.
- Reduced motion behavior: row hover transitions and any expand/collapse animations are disabled under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: surface, surface-raised, header-surface, primary text, secondary text, border, semantic accent colors (positive, warning, destructive, neutral), space tokens, radius tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel padding, no hardcoded font sizes or weights.
- Dark mode expectations: table headers, row backgrounds, and borders must all resolve to legible dark-mode equivalents. Severity badges must maintain contrast in dark mode.

---

## 7. Composition Rules

- What can wrap it: page-level layout containers, admin settings sections, full-page routes.
- What it may contain: a filter bar (may use Input, Select, and DateRangePicker primitives), a data table of audit rows, expandable row detail panels, pagination controls.
- Anti-patterns:
  - Do not embed AuditLogViewer inside a small card or sidebar — it requires sufficient horizontal space.
  - Do not allow editing of audit records within this component; audit logs are read-only by definition.
  - Do not mix audit log events with non-audit activity in the same viewer instance.

---

## 8. Performance Constraints

- Memoization rules: memoize the component. Individual rows should be memoized to prevent re-renders when only pagination state changes.
- Virtualization: for large audit datasets, the parent should supply paginated data. The component itself renders only the current page; it must not attempt to render all records simultaneously.
- Render boundaries: the component must not trigger data fetching. All data, pagination state, and filter state are managed externally and passed as props.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct rows from the provided data.
  - Displays column headers for each defined column.
  - Empty state renders when data is empty.
  - Loading state renders skeleton rows when loading prop is true.
  - Filter controls are present and keyboard-accessible.
  - Pagination controls advance and regress the visible page when interacted with.
- Interaction cases:
  - Changing a filter triggers the onFilterChange callback.
  - Clicking a sortable column header triggers the onSortChange callback with the correct column and direction.
  - Expanding a row (if supported) reveals detail content.
- Accessibility checks:
  - Table has an accessible label.
  - Sortable columns expose `aria-sort`.
  - Filter result count is announced via live region.
  - All interactive controls are keyboard-reachable.
  - Contrast passes in both themes.
