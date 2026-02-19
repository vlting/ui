# Component Spec — KanbanColumn

## 1. Purpose

Represents a single stage column within a Kanban pipeline board. Contains a column header (stage name, deal count, total value) and a scrollable list of deal cards assigned to that stage. Acts as a drop target for drag-and-drop deal movement.

Use when: Displaying a pipeline stage as part of a `PipelineBoard` Kanban layout.

Do NOT use when: The pipeline is being shown in a list view rather than a board view, or the context is not a CRM pipeline.

---

## 2. UX Intent

- Primary interaction goal: Give sales teams a clear view of all deals in a specific pipeline stage and enable them to move deals between stages with minimal effort.
- Expected user mental model: A Kanban column familiar from tools like Trello, Jira, HubSpot, or Salesforce — a labeled vertical lane containing cards that can be dragged to other lanes.
- UX laws applied:
  - Proximity (Gestalt): All cards within a column are visually contained in the lane, making stage membership immediately clear.
  - Fitts's Law: The column is a wide enough drop zone to land cards without precision; the header is a clearly visible label.
  - Miller's Law: Column headers summarize the aggregate (deal count, total value) to avoid counting individual cards.

---

## 3. Visual Behavior

- Layout: A fixed-width vertical column with a sticky header at the top and a scrollable card list below. The header contains the stage name, deal count badge, and aggregate value.
- Spacing: Consistent padding inside the column. Vertical gap between cards uses a spacing token. The header has a bottom border to separate it from the card list.
- Typography: Stage name in a bold/medium heading token. Deal count in a small badge. Aggregate value in a secondary text token.
- Token usage: Column background, column border, header background, header text, card list background (may differ from column background), drop target highlight color — all from theme tokens.
- Responsive behavior: On narrow viewports, columns scroll horizontally within the `PipelineBoard`. Each column has a minimum width enforced via a size token. On very narrow (mobile) viewports, the board may switch to a single-column list view (managed by the parent).

---

## 4. Interaction Behavior

- States:
  - Idle: Standard column appearance with cards.
  - Empty: Column shows an empty state within the card list (e.g., "No deals in this stage") with optional drag-target affordance.
  - Loading: Skeleton cards in the card list area.
  - Drop target active: When a deal card is being dragged over this column, a highlight border or background tint indicates it is an active drop zone.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the stage data, card list, loading state, and drag-and-drop event callbacks.
- Keyboard behavior: The column itself is not a primary keyboard navigation target. Card list items within it are focusable. For keyboard-accessible drag-and-drop, the parent provides a separate keyboard move mechanism.
- Screen reader behavior: The column is a `role="group"` with an `aria-label` of the stage name. The card list is a `<ul>`. The header announces stage name, deal count, and aggregate value. Drop target state is communicated via `aria-dropeffect` or an equivalent live region announcement.
- Motion rules: Drop target highlight animates in/out. Reduced motion: instant highlight change.

---

## 5. Accessibility Requirements

- ARIA requirements: Column container uses `role="group"` and `aria-label` with the stage name. Card list is a `<ul>` with `role="list"`. Drop target state uses `aria-dropeffect="move"` when drag is in progress. For full keyboard accessibility, each card should support a keyboard-triggered "Move to stage" menu as a complement to drag-and-drop.
- Focus rules: Tab enters the column and navigates through cards. The column header itself is not a focus stop unless it contains interactive controls (e.g., an "Add deal" button).
- Contrast expectations: Stage name, deal count, and aggregate value all meet WCAG AA. Drop target highlight meets contrast requirements against the column background.
- Reduced motion behavior: Drop target highlight transition is suppressed.

---

## 6. Theming Rules

- Required tokens: column background, column border color, header background, header border color, stage name text color, deal count text/badge color, aggregate value text color, drop target highlight background, spacing tokens, border radius token.
- Prohibited hardcoded values: No hardcoded colors, fixed pixel column widths, or stage-specific colors (stage colors are supplied by the parent via token-compatible values).
- Dark mode expectations: Column and header backgrounds use dark surface tokens. All text and border colors adapt.

---

## 7. Composition Rules

- What can wrap it: Placed inside a `PipelineBoard` as a horizontal sequence of columns.
- What it may contain: A column header (stage name, count, value), a scrollable `DealCard` list, an empty state, and optionally an "Add deal" action button in the header.
- Anti-patterns:
  - Do not embed drag-and-drop library logic inside this component — accept drag state via props.
  - Do not implement deal fetching inside this component.
  - Do not allow the column to grow unboundedly in width — enforce a fixed or max-width via a size token.

---

## 8. Performance Constraints

- Memoization rules: The column should be memoized by stage ID. Card list updates within one column must not re-render other columns.
- Virtualization: If a stage has many deals (20+), the card list within the column should support virtualized rendering. The column must not prevent virtualized children from functioning.
- Render boundaries: No data-fetching inside this component.

---

## 9. Test Requirements

- What must be tested:
  - Renders the stage header with name, deal count, and aggregate value.
  - Renders the correct number of deal cards.
  - Renders the empty state when no deals are present.
  - Renders the loading skeleton state.
  - Applies the drop target active visual state correctly.
- Interaction cases:
  - Tab navigation through deal cards within the column.
  - Drop target state activates and deactivates correctly on drag events.
  - "Add deal" button (if present) fires the correct callback.
- Accessibility checks:
  - `role="group"` and `aria-label` with stage name present.
  - Card list uses `role="list"`.
  - `aria-dropeffect` correctly reflects drag state.
  - Contrast passes for header text and drop target highlight.
  - Reduced motion: highlight transition suppressed.
