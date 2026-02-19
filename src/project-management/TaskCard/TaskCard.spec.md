# Component Spec — TaskCard

## 1. Purpose

Displays a single task as a structured card with its key metadata — title, assignee, status, and due date — in a compact, scannable format. Used as the primary unit of content within KanbanBoard columns, task lists, and search results.

Use when: rendering individual tasks that need to be browsed, compared, or interacted with in a list or board context.

Do NOT use when: a simple text label is sufficient, or when all task details need to be visible at once (use TaskDetailPanel).

---

## 2. UX Intent

- Primary interaction goal: Allow users to quickly identify, assess, and act on a task without needing to open its detail view.
- Expected user mental model: Users recognize the task card pattern from Jira, Linear, Trello, and GitHub Projects (Jakob's Law) — a bounded card with a title and a row of metadata badges.
- UX laws applied:
  - Jakob's Law: Follow the card-with-metadata pattern from established PM tools.
  - Miller's Law: Limit visible metadata to the most decision-critical fields (title, assignee, status, due date) — no more than 4–5 fields on the card surface.
  - Gestalt (Figure/Ground): The card's elevated surface and border create a clear separation from the background.
  - Fitts's Law: The entire card surface is a tap target for opening the detail view. Status and assignee interactive elements must have adequate touch target sizes.
  - Hick's Law: Contextual actions (edit, delete, move) should be revealed on hover or via a menu, not all visible simultaneously.

---

## 3. Visual Behavior

- Layout rules:
  - A vertical card container (TaskCard) with sub-sections:
    - TaskCard.Title: the task name at the top.
    - TaskCard.Assignee: avatar or avatar stack below the title.
    - TaskCard.Status: a status badge (e.g., "In Progress").
    - TaskCard.DueDate: a deadline indicator at the bottom of the card.
  - An optional priority indicator (color bar or icon) at the left edge or top of the card.
  - An optional contextual action trigger (three-dot menu) revealed on hover.
- Spacing expectations: Internal card padding uses a medium space token. Vertical gap between card sub-sections uses a small space token.
- Typography rules: TaskCard.Title uses a body token at medium weight. Status and DueDate use a caption token. TaskCard.Assignee uses the Avatar component sizing.
- Token usage: Card background, border, shadow, status badge, and all text must use design tokens. Priority colors use semantic design tokens (e.g., priority-high, priority-medium, priority-low).
- Responsive behavior: Cards fill the width of their container column. On narrow viewports, metadata may stack vertically. The minimum card width prevents metadata from being hidden.

---

## 4. Interaction Behavior

- States:
  - Idle: Static display of task metadata.
  - Hover (web): Card elevates (shadow deepens) and contextual action trigger appears.
  - Focus: Visible focus ring around the card boundary.
  - Active/Pressed: Brief scale or opacity feedback on press.
  - Selected: Accent border or background token indicates selection.
  - Dragging (within KanbanBoard): Card becomes a ghost/drag image.
  - Disabled: Non-interactive, de-emphasized.
- Controlled vs uncontrolled: TaskCard is presentational. All data and action handlers are supplied via props.
- Keyboard behavior:
  - The card is a single Tab stop when used as a navigation unit.
  - Enter opens the task detail.
  - A discoverable keyboard shortcut or arrow-key navigation allows moving the card (within KanbanBoard).
  - Interactive sub-components (status badge, assignee) are individually focusable within the card.
- Screen reader behavior:
  - The card has an accessible label summarizing: task title, status, assignee(s), and due date.
  - Priority is communicated in the accessible label, not only through color.
  - "Overdue" or "Due soon" is communicated in the due date accessible label.
- Motion rules: Hover elevation change uses a brief transition (under 150ms). Drag start/end transitions are smooth. Reduced motion suppresses all transitions.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - The card uses `role="article"` with an `aria-label` summarizing the task.
  - Status badge uses `aria-label` (e.g., "Status: In Progress").
  - Due date uses a `time` element with `dateTime` in HTML contexts.
  - Priority indicator uses a visually hidden text label.
  - Contextual action trigger uses `aria-label` ("Task actions for [title]").
- Focus rules: The card frame is a single Tab stop for navigation. Interactive sub-elements (status, assignee) are reached via Tab within the card context (or via the detail panel). Focus ring must be clearly visible.
- Contrast expectations: Task title must meet 4.5:1. Status badge text must meet 4.5:1 against the badge background. Priority must not be conveyed through color alone.
- Reduced motion behavior: All hover, drag, and selection transitions are instant.

---

## 6. Theming Rules

- Required tokens: card background, card border, card shadow (idle and hover), status badge background and text (per status variant), priority indicator color tokens, text primary (title), text secondary (metadata), focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode expectations: Card background, border, and shadow tokens shift to dark-mode equivalents. Status and priority tokens remain distinguishable in dark mode.

---

## 7. Composition Rules

- What can wrap it: KanbanBoard column lists, task search results lists, sprint backlog lists.
- What it may contain:
  - TaskCard.Title: the task name.
  - TaskCard.Assignee: one or more user avatars (AssignmentAvatarStack for multiple).
  - TaskCard.Status: a status badge component.
  - TaskCard.DueDate: a DeadlineIndicator component.
  - Optional: priority indicator, label/tag chips.
- Anti-patterns:
  - Do not embed editable form fields in the card surface — editing happens in TaskDetailPanel.
  - Do not show more than 4–5 metadata fields on the card surface.
  - Do not nest TaskCard inside another TaskCard.

---

## 8. Performance Constraints

- Memoization rules: TaskCard must be memoized. A status change on one card must not re-render sibling cards.
- Virtualization: When TaskCard instances appear in long lists, the parent container is responsible for virtualization.
- Render boundaries: TaskCard is a leaf component. Metadata updates must not propagate re-renders to sibling or parent board components.

---

## 9. Test Requirements

- What must be tested:
  - Title, Assignee, Status, and DueDate sub-components render their supplied content.
  - Priority indicator renders the correct visual treatment for each priority level.
  - Pressing the card triggers the selection/open callback.
  - Contextual action menu trigger renders on hover and fires the correct callbacks.
- Interaction cases:
  - Enter opens the task detail.
  - Tab includes the card in focus order.
  - Keyboard card movement (in board context) fires the move callback.
- Accessibility checks:
  - Card has `role="article"` with an accessible label.
  - Priority is communicated via text, not color alone.
  - Due date uses a `time` element with `dateTime`.
  - Focus ring is visible on keyboard focus.
  - Status badge text contrast passes 4.5:1.
  - Reduced motion suppresses all transitions.
