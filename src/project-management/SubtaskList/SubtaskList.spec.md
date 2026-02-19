# Component Spec — SubtaskList

## 1. Purpose

Displays an ordered list of subtasks belonging to a parent task. Each subtask row communicates its title and completion status, allowing users to track granular progress within a single task.

Use when: a task has been decomposed into multiple smaller subtasks that each need independent completion tracking, typically within a TaskDetailPanel.

Do NOT use when: the items to be listed are full independent tasks (use KanbanBoard or a task list instead), or when only a single completion checkbox is needed (use a standalone Checkbox).

---

## 2. UX Intent

- Primary interaction goal: Allow users to see the breakdown of a parent task into its components and mark individual subtasks as complete.
- Expected user mental model: Users expect a subtask list to behave like a nested checklist (Jakob's Law from Jira, Linear, Notion, and similar tools) — a compact list of checkbox rows under the parent task.
- UX laws applied:
  - Jakob's Law: Follow the nested checklist pattern used in popular task management tools.
  - Gestalt (Proximity and Continuity): Subtask rows are visually closer to each other than to surrounding task content, reinforcing their membership in the group.
  - Miller's Law: Subtask lists should ideally remain under 10 items; longer lists signal that the task should be split or that the list needs grouping.
  - Fitts's Law: Checkboxes and interactive row areas must meet minimum touch target sizes (44x44pt).

---

## 3. Visual Behavior

- Layout rules:
  - A vertical list of rows, each row containing a completion checkbox on the left, the subtask title in the center, and an optional action menu on the right.
  - Completed subtasks show a strikethrough on the title and de-emphasized text.
  - An optional progress summary (e.g., "3 of 5 complete") appears as a header or footer of the list.
  - An "Add subtask" input or button appears at the bottom of the list.
- Spacing expectations: Row height uses a size token to ensure adequate touch targets. Inter-row spacing uses a small space token. Internal row horizontal padding uses a medium space token.
- Typography rules: Subtask title uses a body token. Progress summary uses a caption token in secondary color.
- Token usage: Row background, checkbox, text, strikethrough, and dividers must use design tokens.
- Responsive behavior: Rows fill the full width of their container. On narrow viewports, the optional action menu collapses to a tap-to-reveal icon.

---

## 4. Interaction Behavior

- States:
  - Idle: All subtasks visible, none focused.
  - Hover (web): Hovered row shows a subtle background highlight.
  - Focus: Visible focus ring on the focused row's checkbox or row element.
  - Completed: Checkbox checked, title struck through, row de-emphasized.
  - Empty: A "No subtasks yet" message or the add-subtask affordance is shown.
  - Loading: Skeleton rows shown while data loads.
- Controlled vs uncontrolled: The completion state of each subtask is controlled. The parent manages state; SubtaskList fires callbacks on completion toggle and on add.
- Keyboard behavior:
  - Tab moves focus through each row's interactive elements in order.
  - Space or Enter toggles the completion checkbox for the focused row.
  - Arrow Up/Down navigate between rows.
- Screen reader behavior:
  - The list uses `role="list"` with each row as `role="listitem"`.
  - Each checkbox uses `role="checkbox"` with `aria-checked`.
  - Completion toggle announces "Subtask '[title]' marked as complete/incomplete."
  - The progress summary is available via an accessible label on the list container.
- Motion rules: Completion animation (strikethrough, opacity change) is brief (under 150ms). Reduced motion suppresses all animations.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - List container: `role="list"` with `aria-label` (e.g., "Subtasks, 3 of 5 complete").
  - Each row: `role="listitem"`.
  - Each checkbox: `role="checkbox"` with `aria-checked` and an accessible label equal to the subtask title.
  - Add subtask trigger: `aria-label` ("Add subtask").
- Focus rules: All interactive elements (checkboxes, action menus, add button) are in the Tab order. Focus ring must be clearly visible.
- Contrast expectations: Active subtask title must meet 4.5:1. Completed/de-emphasized title must meet 3:1. Checkbox contrast must meet 3:1 against its background.
- Reduced motion behavior: Completion animation is instant.

---

## 6. Theming Rules

- Required tokens: list background, row background (idle and hover), checkbox foreground and background, text primary, text de-emphasized (completed), strikethrough color, progress summary text (secondary), focus ring, space, radius.
- Prohibited hardcoded values: No hardcoded hex values, pixel spacing, or font sizes.
- Dark mode expectations: Row backgrounds and text tokens shift to dark-mode values. Completed state de-emphasis remains visible in dark mode.

---

## 7. Composition Rules

- What can wrap it: TaskDetailPanel (as a subsection). It may also appear within a task card's expanded state.
- What it may contain: Individual subtask rows (checkbox + title + optional action menu), a progress summary, and an add-subtask affordance.
- Anti-patterns:
  - Do not nest SubtaskList inside another SubtaskList (no recursive subtask trees in this component).
  - Do not use SubtaskList for independent top-level tasks.
  - Do not display more than ~20 subtasks without a collapse or pagination mechanism.

---

## 8. Performance Constraints

- Memoization rules: Individual subtask row items must be memoized. Toggling one subtask's completion must not re-render sibling rows.
- Virtualization: For lists exceeding approximately 30 items, the parent container should enable virtualized rendering.
- Render boundaries: SubtaskList is an isolated render boundary. Subtask completion updates must not trigger re-renders of the parent TaskDetailPanel.

---

## 9. Test Requirements

- What must be tested:
  - Correct number of subtask rows renders from the supplied data.
  - Empty state renders when the subtask array is empty.
  - Completed subtask renders with strikethrough and de-emphasized treatment.
  - Toggling a checkbox fires the completion callback with the correct subtask ID.
  - Progress summary reflects the correct count.
- Interaction cases:
  - Space/Enter on a focused checkbox toggles completion.
  - Arrow Up/Down navigate between rows.
  - Tab moves focus through all interactive elements in order.
- Accessibility checks:
  - `role="list"` with `aria-label` is present.
  - Each checkbox has `role="checkbox"` and `aria-checked`.
  - Completion toggle announces the change.
  - Focus ring is visible on all interactive elements.
  - Contrast ratios pass in both themes.
  - Reduced motion suppresses completion animations.
