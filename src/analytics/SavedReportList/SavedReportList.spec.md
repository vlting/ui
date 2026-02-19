# Component Spec — SavedReportList

## 1. Purpose

Displays a list of user-saved or system-defined analytics reports, allowing users to identify, select, and manage (open, rename, delete, share) previously saved report configurations. Acts as a presentation component — it does not own report state or perform data fetching.

Use when: users need to access a collection of previously saved analytics reports within a report management panel, sidebar, or modal.

Do NOT use when: displaying live analytics data — use chart and metric card components for that. Do NOT use for accounting report exports — use `ExportReportButton` or `LedgerTable` in the accounting module.

---

## 2. UX Intent

- Primary interaction goal: allow users to quickly locate and open a previously saved report without rebuilding their filter and configuration choices from scratch.
- Expected user mental model: users expect a vertically scrolling list of report entries, each with a name, optional description or metadata (e.g., last modified date, created by), and contextual actions (open, rename, delete).
- UX laws applied:
  - **Jakob's Law** — a scrollable list with row-level actions matches the established pattern for saved items in analytics and productivity tools.
  - **Gestalt Law of Proximity** — the report name and metadata are tightly grouped within each row; the row-level actions are separated to the trailing edge.
  - **Miller's Law** — if the list exceeds seven to ten items, provide search/filter or pagination; do not render an unbounded list.
  - **Fitts's Law** — row tap targets must be sufficiently large; destructive actions (delete) must require confirmation to avoid Fitts-driven accidental activation.

---

## 3. Visual Behavior

- Layout rules: full-width vertical list; each row is a horizontally arranged flex item — report name and metadata on the leading side, actions on the trailing side; rows have a consistent height defined by a size token.
- Spacing expectations: row padding uses space tokens (medium scale); gap between rows uses a tight space token or row border; the list container has a defined maximum height with overflow scroll.
- Typography rules: report name uses the body or label type style token in medium weight; metadata text (date, author) uses the caption token in a muted color; row-level action labels use the caption token.
- Token usage: list background, row background, row hover background, row selected background, row border, text colors, and action icon colors all reference design tokens.
- Responsive behavior: on mobile, contextual actions collapse into a bottom sheet triggered by a row-level menu button; on desktop, actions are visible inline on hover or via a menu button.

---

## 4. Interaction Behavior

- States:
  - **idle**: rows fully rendered with report data.
  - **row hover**: row background shifts to the hover token; inline actions become visible.
  - **row selected / active**: row background shifts to the selected token.
  - **row focus**: focus ring visible on the row.
  - **loading**: skeleton rows occupy the list area.
  - **empty**: an empty-state message with a prompt to create the first report is displayed.
  - **error**: an error-state message spans the list area.
- Controlled vs uncontrolled: the selected report and the list data are always controlled externally via props; hover state is uncontrolled.
- Keyboard behavior: Tab moves focus to the list container; arrow keys navigate between rows; Enter or Space opens the focused report; the row-level actions menu is reachable via Tab within the row and activatable with Enter or Space.
- Screen reader behavior: the list has `role="list"` with `aria-label`; each row has `role="listitem"` and an accessible name including the report name and last modified date; row actions have descriptive `aria-label` values.
- Motion rules: row hover transitions use `duration.fast`; list entrance (if animated) uses `duration.normal`; reduced motion disables all animations.

---

## 5. Accessibility Requirements

- ARIA requirements: `role="list"` with `aria-label` on the list container; each item has `role="listitem"`; action buttons within each row have descriptive `aria-label` values (e.g., "Delete Q1 2025 Revenue Report"); destructive action dialogs have `role="alertdialog"`.
- Focus rules: focus is visible on rows and action buttons; focus order within a row is name → metadata → actions; after deleting a report, focus moves to the next row or the empty state.
- Contrast expectations: report name text meets WCAG AA (4.5:1) against the row background; metadata text meets AA in muted color; action icons meet 3:1 non-text contrast.
- Reduced motion behavior: row hover transitions and list entrance animations are disabled; state changes are reflected immediately.

---

## 6. Theming Rules

- Required tokens: list background, row background, row hover background, row selected background, row border color, report name text color, metadata text color, action icon color, empty-state text color, skeleton background.
- Prohibited hardcoded values: no raw hex codes, pixel row heights, or font sizes.
- Dark mode expectations: row borders and hover states must remain distinguishable against the dark list background; selected row must be visually distinct from hover in dark mode.

---

## 7. Composition Rules

- What can wrap it: a sidebar panel, a modal, a page section, a report management drawer.
- What it may contain: report rows (each with name, metadata, and actions slots), a list header with a search/filter input slot, a pagination or load-more control slot, and empty/error state slots.
- Anti-patterns:
  - Do not embed data fetching or report mutation logic inside this component.
  - Do not render an unbounded list without pagination or virtualization — enforce a maximum rendered row count.
  - Do not combine saved report listing and report editing within the same component.

---

## 8. Performance Constraints

- Memoization rules: row components should be memoized when the list is long and the parent re-renders frequently; the list data array should be memoized by the caller.
- Virtualization: when the report count exceeds a defined threshold (e.g., 50 items), the consumer must enable virtual scrolling via a prop; the component exposes a virtualization mode.
- Render boundaries: a feature-level error boundary wraps the list; the error state slot handles display of caught errors gracefully.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct number of report rows from the supplied data.
  - Renders the loading skeleton when the loading prop is set.
  - Renders the empty state when no reports are provided.
  - Renders the error state when an error prop is set.
  - The selected row has the selected visual state.
  - Row actions call the correct callbacks (open, rename, delete).
- Interaction cases:
  - Arrow key navigation moves focus between rows.
  - Enter or Space on a row triggers the open callback.
  - Delete action requires confirmation before calling the delete callback.
  - Focus moves to the next row or empty state after a report is deleted.
- Accessibility checks:
  - `role="list"` and `aria-label` present on the list container.
  - Each row has a descriptive accessible name.
  - Action buttons have non-empty `aria-label` values.
  - Confirmation dialog has `role="alertdialog"`.
  - No contrast violations on row text and action icons in light and dark themes.
