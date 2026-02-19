# Component Spec — PipelineBoard

## 1. Purpose

Provides the top-level Kanban board layout for a CRM sales pipeline, rendering a horizontal sequence of `KanbanColumn` stage lanes. Manages the overall board layout, horizontal scrolling, and the coordination surface for drag-and-drop deal movement between stages.

Use when: Displaying a full CRM pipeline in a visual Kanban board format where users can see all deals across all stages simultaneously.

Do NOT use when: The pipeline is being shown in a list/table view, or the context is a single-stage deal queue rather than a multi-stage pipeline.

---

## 2. UX Intent

- Primary interaction goal: Give sales teams a bird's-eye view of their entire pipeline so they can identify bottlenecks, move deals forward, and understand aggregate stage health at a glance.
- Expected user mental model: A multi-column Kanban board identical in mental model to Trello, Jira, HubSpot Pipeline, or Salesforce Kanban — horizontal lanes representing stages, cards representing deals.
- UX laws applied:
  - Jakob's Law: Matches the universally recognized Kanban board pattern.
  - Miller's Law: Column headers summarize stage totals (count, value) so users understand the shape of the pipeline without counting cards.
  - Fitts's Law: Drag-and-drop targets (column drop zones) are wide and forgiving.
  - Proximity (Gestalt): Columns are visually distinct lanes; cards within a lane clearly belong to that stage.

---

## 3. Visual Behavior

- Layout: Full-width horizontal row of `KanbanColumn` components. Horizontally scrollable when the total column width exceeds the viewport. Columns are evenly spaced or fixed-width.
- Spacing: Consistent horizontal gap between columns using a spacing token. The board has outer horizontal padding matching the page content padding.
- Typography: The board itself has no typography — it delegates to `KanbanColumn` headers and `DealCard` items.
- Token usage: Board background (canvas behind columns), column gap, outer padding, horizontal scrollbar styling — all from theme tokens.
- Responsive behavior: On wide viewports, all columns may be visible simultaneously. On narrower viewports, the board scrolls horizontally. On mobile, the board may switch to a single-column swipeable view or a list view (parent-determined).

---

## 4. Interaction Behavior

- States:
  - Idle: All columns rendered with their deal cards.
  - Loading: Skeleton columns and cards rendered while pipeline data is loading.
  - Empty pipeline: A full-board empty state shown when there are no stages or no deals at all.
  - Drag in progress: One card is being dragged; the source column shows a placeholder gap; the target column shows a drop zone highlight.
  - Error: An error state with retry action.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the pipeline stages array, deal data, loading state, and drag-and-drop event callbacks (onDragStart, onDrop, onDragEnd).
- Keyboard behavior: Tab navigates through the board column by column, then into cards within each column. A keyboard-accessible "Move deal" mechanism must be provided as a complement to mouse drag-and-drop (e.g., a context menu or keyboard shortcut to move a focused card to another stage).
- Screen reader behavior: The board is a `role="group"` with `aria-label="Pipeline board"` or equivalent. Each `KanbanColumn` is a named group within the board. Drag-and-drop state changes are announced via `aria-live` (e.g., "Moved Deal X to Proposal stage").
- Motion rules: Card drag animation follows pointer smoothly. Drop success animates card into place. Reduced motion: drag shadow and drop animation are suppressed; card position updates instantly.

---

## 5. Accessibility Requirements

- ARIA requirements: Board container uses `role="group"` and `aria-label="Pipeline board"`. Drag-and-drop state uses appropriate `aria-grabbed` and `aria-dropeffect`. An `aria-live="polite"` region announces successful deal moves. A keyboard-accessible alternative to drag-and-drop must exist.
- Focus rules: Tab order follows columns left to right, then cards top to bottom within each column. Focus is not trapped within the board.
- Contrast expectations: Board background provides sufficient contrast against column backgrounds. All column and card text meets WCAG AA.
- Reduced motion behavior: Card drag animation and drop placement animation are fully suppressed.

---

## 6. Theming Rules

- Required tokens: board background color, column gap spacing token, board outer padding token, horizontal scrollbar color, empty state text color.
- Prohibited hardcoded values: No hardcoded colors, fixed pixel widths for the board, or column counts.
- Dark mode expectations: Board background uses a dark canvas token (darker than column surfaces). Column and card backgrounds adapt accordingly.

---

## 7. Composition Rules

- What can wrap it: Placed on a dedicated pipeline or deals page, typically below a page header and filter/sort controls.
- What it may contain: A horizontal sequence of `KanbanColumn` components. An optional board-level empty state. An optional global loading overlay (skeleton columns).
- Anti-patterns:
  - Do not embed pipeline data-fetching inside this component.
  - Do not implement the drag-and-drop engine inside this component — accept drag state via props and callbacks.
  - Do not allow the board to use a fixed layout that prevents horizontal scrolling when columns overflow the viewport.
  - Do not omit the keyboard-accessible deal move mechanism — drag-and-drop alone is not accessible.

---

## 8. Performance Constraints

- Memoization rules: The board should be memoized. Column re-renders should be isolated to the columns affected by a drag event. Moving a deal between two columns must not re-render all other columns.
- Virtualization: Column virtualization is not typically needed (5-10 stages). Deal card virtualization within columns is the responsibility of `KanbanColumn`.
- Render boundaries: No data-fetching or drag library initialization inside this component.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct number of `KanbanColumn` components for the given stages.
  - Renders a loading state with skeleton columns.
  - Renders the empty pipeline state.
  - Renders an error state with retry action.
  - Drop event fires the correct callback with source and target stage IDs.
- Interaction cases:
  - Tab navigation through columns and cards in correct order.
  - Keyboard-accessible deal move triggers the correct callback.
  - Drag start, drag over, and drop events are handled correctly.
  - Retry button fires the correct callback in error state.
- Accessibility checks:
  - `role="group"` and `aria-label` on board container.
  - `aria-live` region announces deal moves.
  - `aria-grabbed` and `aria-dropeffect` reflect drag state.
  - Keyboard move alternative is accessible.
  - Reduced motion: drag and drop animations suppressed.
