# Component Spec — KanbanBoard

## 1. Purpose

Displays a multi-column board where task cards are organized by status or category. Each column represents a workflow stage, and cards within columns represent individual tasks or items that can be moved between stages.

Use when: visualizing workflow progression through stages (e.g., To Do, In Progress, Done), enabling users to understand task distribution and move items between stages.

Do NOT use when: a linear list view is sufficient, the task count is very small (use a simple list), or when temporal relationships between tasks are the primary concern (use GanttChart).

---

## 2. UX Intent

- Primary interaction goal: Allow users to understand the current distribution of work across workflow stages and to move items between stages with minimal friction.
- Expected user mental model: Users recognize the Kanban board pattern from tools like Trello, Linear, Jira, and GitHub Projects (Jakob's Law). Columns are workflow stages; cards are moveable units of work.
- UX laws applied:
  - Jakob's Law: Follow the column-based card layout established by Trello and similar tools.
  - Gestalt (Common Region): Cards within a column share a bounded container, reinforcing their membership in that stage.
  - Gestalt (Proximity): Cards within a column are close together; columns are separated by a larger gap.
  - Hick's Law: Column headers must be clearly labeled but not cluttered with too many controls.
  - Fitts's Law: Cards must have a sufficient drag handle and tap target. Column drag-and-drop zones must be wide enough to accept dropped cards without precision.
  - Doherty Threshold: Card movements and column re-ordering must appear responsive within 400ms.

---

## 3. Visual Behavior

- Layout rules:
  - A horizontal row of columns. Each column has a header (stage name, optional item count) and a scrollable body containing TaskCards.
  - Columns have a fixed or minimum width and scroll horizontally if they exceed the viewport.
  - An "Add card" affordance appears at the bottom of each column.
  - A drag placeholder (ghost) is displayed in the target position when a card is being dragged.
  - Empty columns display a visual drop zone to indicate they can receive cards.
- Spacing expectations: Gap between columns uses a large space token. Internal column padding uses a medium space token. Gap between cards within a column uses a small space token.
- Typography rules: Column headers use a label/heading token at medium weight. Card count badge uses a caption token.
- Token usage: Column background, card background, drag ghost, drop target highlight, and all text must use design tokens.
- Responsive behavior: On narrow viewports, columns stack vertically (single-column mode) or the board scrolls horizontally. The interaction mode may switch from drag-and-drop to a context menu or move action on mobile.

---

## 4. Interaction Behavior

- States:
  - Idle: All columns and cards displayed.
  - Dragging: A card is being dragged; a ghost placeholder shows the target position; the card's source position shows an empty slot.
  - Hover over drop zone: The target column or position highlights to indicate a valid drop target.
  - Loading: Skeleton column and card placeholders are displayed.
  - Empty board: An empty state with guidance text is displayed.
  - Empty column: A visual placeholder or "No items" label is shown within the column body.
- Controlled vs uncontrolled: Column order and card assignment are controlled props. The parent manages state; the board fires callbacks on card move and column reorder.
- Keyboard behavior:
  - Tab navigates between column headers and cards in DOM order.
  - A focused card can be moved between columns using keyboard shortcuts (e.g., Shift+Arrow Left/Right to move the card to the adjacent column).
  - The move action announces destination column to the screen reader.
- Screen reader behavior:
  - Each column has `role="region"` with an accessible label (column name and card count).
  - Each card has a description including its column membership.
  - When a card is moved, an announcement confirms the move (e.g., "Task 'Design mockup' moved to In Progress").
- Motion rules: Card drag animation is smooth. Drop confirmation may include a brief settle animation. All motion is suppressed under reduced motion preference.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - The board container uses `role="region"` or `role="application"` (if complex keyboard interaction is required) with an accessible label.
  - Each column uses `role="region"` or `role="group"` with `aria-label`.
  - Cards use `role="article"` or `role="listitem"` within a `role="list"` column body.
  - A live region announces card moves.
- Focus rules: Tab moves between all interactive elements in DOM order. Keyboard card movement must not trap focus. After a card move, focus remains on the moved card in its new position.
- Contrast expectations: Column headers must meet 4.5:1. Card content must meet 4.5:1. Drop zone highlights must be perceivable without relying on color alone.
- Reduced motion behavior: Drag animations and settle effects are disabled. Card moves are instant position changes.

---

## 6. Theming Rules

- Required tokens: board background, column background, column header background, card background, drag ghost background, drop target highlight color, text primary, text secondary (count badge), space, radius.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Board, column, and card backgrounds shift to dark tokens. Drag ghost and drop target highlights remain distinguishable on dark surfaces.

---

## 7. Composition Rules

- What can wrap it: A project workspace view, a sprint board page, or a full-screen layout.
- What it may contain: Column containers, each containing TaskCard components, an optional column header with controls, and an "Add card" affordance.
- Anti-patterns:
  - Do not embed complex forms or editors inside card bodies — cards are summaries only.
  - Do not show more than approximately 20 cards per column without an internal column scroll or collapse mechanism.
  - Do not nest KanbanBoard inside another KanbanBoard.

---

## 8. Performance Constraints

- Memoization rules: Individual columns and cards must be memoized. Moving a card should only re-render the affected columns, not the entire board.
- Virtualization: Columns with many cards should use a virtualized card list. The board itself should virtualize columns if the column count is very large.
- Render boundaries: Each column is an independent render boundary. Card moves must not trigger full-board re-renders.

---

## 9. Test Requirements

- What must be tested:
  - Correct columns and cards render from the supplied data.
  - Empty column renders the empty state correctly.
  - Empty board renders the empty board state.
  - Moving a card fires the correct callback with the card ID, source column, and target column.
- Interaction cases:
  - Keyboard card move (Shift+Arrow) moves the card to the adjacent column and announces the move.
  - Tab moves focus through all interactive elements in DOM order.
  - Drag-and-drop moves a card to the dragged-over position.
- Accessibility checks:
  - Column regions have accessible labels.
  - Live region announces card moves.
  - Focus remains on the card after a keyboard move.
  - Contrast ratios pass for headers and card content in both themes.
  - Reduced motion suppresses drag animations.
