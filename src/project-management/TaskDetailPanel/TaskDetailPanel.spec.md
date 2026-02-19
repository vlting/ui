# Component Spec — TaskDetailPanel

## 1. Purpose

Displays the full details of a single task in a structured panel view. Shows all task metadata, description, subtasks, comments, and actions in a readable, organized layout. This is the primary surface for viewing and editing an individual task.

Use when: the user has selected a task and needs to see its complete information — description, assignees, due date, status, subtasks, comments, and attachments — within a side panel or full-screen detail view.

Do NOT use when: only a summary-level view is needed (use TaskCard), or when the user is browsing a list of tasks (use a task list or KanbanBoard).

---

## 2. UX Intent

- Primary interaction goal: Allow the user to read and understand the full context of a task, make updates, and access related actions without navigating away.
- Expected user mental model: Users expect a task detail panel to behave like a Jira issue detail, a Linear task page, or a Notion card back — a rich metadata panel alongside or on top of the task list (Jakob's Law).
- UX laws applied:
  - Jakob's Law: Match the full task detail layout pattern from established PM tools.
  - Gestalt (Hierarchy and Proximity): Task title at the top, followed by metadata (status, assignee, dates) in a scannable grid, then the description, then subtasks, then comments.
  - Hick's Law: Primary actions (assign, change status, set due date) are immediately visible; secondary actions are in a more menu.
  - Tesler's Law: The complexity of managing metadata fields should be absorbed into clear inline edit controls, not offloaded to a separate settings page.
  - Miller's Law: Group metadata fields into logical clusters (Who, When, What) rather than displaying an undifferentiated column of fields.

---

## 3. Visual Behavior

- Layout rules:
  - A vertical panel with a header section (task title, breadcrumb, close action), a metadata section (status, assignee, due date, priority, labels), a description body section, a subtasks section, and a comments section at the bottom.
  - Metadata fields may be displayed as a two-column key-value grid or a labeled row of badges.
  - Each section has a clear heading and is visually separated from adjacent sections.
  - The panel is scrollable when content exceeds the viewport height.
- Spacing expectations: Section padding uses a large space token. Metadata key-value gap uses a medium space token. Internal section spacing uses a small space token.
- Typography rules: Task title uses a heading token. Section labels use a label/caption token at medium weight. Body content (description) uses a body token.
- Token usage: Panel background, section dividers, metadata badge backgrounds, text, and borders must all use design tokens.
- Responsive behavior: On wide viewports, the panel occupies a fixed-width side panel alongside the task list. On narrow viewports, the panel occupies the full screen. Metadata may reflow from two columns to one.

---

## 4. Interaction Behavior

- States:
  - Idle: Full task detail rendered and readable.
  - Editing (inline): Individual fields (title, description, status, etc.) transition to an editable state when clicked or triggered by keyboard.
  - Loading: Skeleton placeholders fill the panel while task data is fetching.
  - Error: An error state is displayed if the task fails to load.
  - Empty sections: Subtasks and comments sections show empty state messages when no items exist.
- Controlled vs uncontrolled: The task data and field edit states are controlled by the parent. TaskDetailPanel fires callbacks for each field change and action.
- Keyboard behavior:
  - Tab moves focus through all interactive elements in the panel in DOM order.
  - Entering an editable field activates it (Enter or a dedicated edit trigger).
  - Escape cancels an in-progress inline edit and reverts to the display state.
  - Action buttons activate with Enter or Space.
- Screen reader behavior:
  - The panel is announced as a region with the task title as its label.
  - Each section (Metadata, Description, Subtasks, Comments) is an individually labeled region.
  - Inline edit transitions announce the field name and new editable state.
  - Save/cancel actions in edit mode have clear accessible labels.
- Motion rules: Panel open/close uses a brief slide or fade. Inline edit field transitions are instant. Reduced motion suppresses the open/close animation.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - The panel uses `role="region"` with `aria-label` (e.g., "Task: Design homepage mockup").
  - If modal, `role="dialog"` with `aria-modal="true"` and `aria-labelledby` referencing the task title.
  - Section headings use appropriate heading level elements.
  - Inline edit fields have `aria-label` or `aria-labelledby` for their field name.
  - Loading state uses `aria-busy="true"` on the panel.
- Focus rules: On open, focus moves to the task title or the first interactive element. On close, focus returns to the triggering TaskCard. All interactive elements are reachable via Tab.
- Contrast expectations: Task title must meet 4.5:1. Metadata field labels and values must meet 4.5:1. Section headings must meet 4.5:1. De-emphasized secondary text must meet 3:1.
- Reduced motion behavior: Panel open/close animation is instant.

---

## 6. Theming Rules

- Required tokens: panel background, section divider, metadata badge background and text, heading text, body text, secondary text, input background and border (for inline edit), focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Panel and section backgrounds shift to dark tokens. Metadata badges and inline edit inputs resolve to dark-mode values. All text tokens maintain contrast in dark mode.

---

## 7. Composition Rules

- What can wrap it: A split-pane layout alongside a task list or KanbanBoard. May also be used as a full-screen view on mobile or as a modal dialog.
- What it may contain:
  - A panel header (task title, breadcrumb, close button).
  - A metadata section with status badge, AssignmentAvatarStack, DeadlineIndicator, and priority/label indicators.
  - A description body (rendered markdown or plain text).
  - A SubtaskList section.
  - A PMCommentSidebar or inline comment thread section.
  - An attachment section.
- Anti-patterns:
  - Do not embed another TaskDetailPanel inside this component.
  - Do not display more than one task's details within a single panel.
  - Do not require navigation away from the panel to edit any primary task field.

---

## 8. Performance Constraints

- Memoization rules: Individual sections (metadata, description, subtasks, comments) must be memoized. Updating one section must not re-render the entire panel.
- Virtualization: The comment section must handle its own virtualization for long threads. The subtask list must handle virtualization if subtask count is large.
- Render boundaries: Each section is an independent render boundary. Inline editing in one field must not trigger re-renders of unrelated sections.

---

## 9. Test Requirements

- What must be tested:
  - All metadata fields render correctly from the supplied task data.
  - Loading skeleton renders when task data is loading.
  - Error state renders when task data fails to load.
  - Inline edit fields activate on click and deactivate with Escape or save.
  - SubtaskList and comment sections render within the panel.
- Interaction cases:
  - Tab traverses all interactive elements in DOM order.
  - Escape cancels inline edit and restores the display value.
  - Close button fires the close callback and returns focus to the trigger.
- Accessibility checks:
  - Panel has `role="region"` or `role="dialog"` with an accessible label.
  - All sections have heading elements at the correct level.
  - Loading state uses `aria-busy="true"`.
  - Focus moves to the panel on open and returns to trigger on close.
  - Inline edit fields have accessible labels.
  - Contrast ratios pass in both themes.
  - Reduced motion suppresses open/close animation.
