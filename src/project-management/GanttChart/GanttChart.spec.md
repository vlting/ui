# Component Spec — GanttChart

## 1. Purpose

Displays a timeline-based visualization of tasks or project phases plotted against a horizontal time axis. Communicates task duration, sequencing, dependencies, and progress in a single, scannable view.

Use when: users need to understand project scheduling, track parallel workstreams, visualize dependencies between tasks, or assess overall project timeline at a glance.

Do NOT use when: the user needs a simple list of tasks with due dates (use SubtaskList or a task table), or when temporal relationships between tasks are irrelevant.

---

## 2. UX Intent

- Primary interaction goal: Allow users to scan the project timeline at a glance, identify scheduling conflicts or bottlenecks, and understand task sequencing.
- Expected user mental model: Users familiar with project management tools (Asana, Monday.com, MS Project, Notion timeline view) expect a horizontal bar chart where each row is a task and each bar represents its duration (Jakob's Law).
- UX laws applied:
  - Jakob's Law: Follow the canonical horizontal Gantt bar pattern from established PM tools.
  - Gestalt (Common Fate): Tasks within the same group or phase share a common visual treatment.
  - Gestalt (Continuity): The time axis flows continuously left-to-right (or right-to-left in RTL). Dependency lines connect task bars.
  - Hick's Law: Limit visible controls to essential timeline navigation (zoom, scroll) and avoid overwhelming toolbar options.
  - Fitts's Law: Task bars must be tall enough to be a reliable drag/resize target on touch (minimum 44pt row height).
  - Doherty Threshold: Timeline rendering and scrolling must be smooth (within 400ms for initial render; no perceptible lag during scroll).

---

## 3. Visual Behavior

- Layout rules:
  - Two-panel layout: a fixed-width left panel listing task names, and a scrollable right panel showing the timeline with horizontal task bars.
  - The time axis is a header row showing date intervals (days, weeks, months) that scrolls horizontally in sync with the task bars.
  - Each row corresponds to one task. Row height is uniform.
  - Task bars are plotted from their start date to their end date. Bar width is proportional to duration.
  - A "today" indicator is a vertical line on the current date in the timeline panel.
  - Dependency lines (if shown) connect the end of one task bar to the start of another using an elbow or straight connector.
  - Progress fill within a task bar communicates completion percentage using a distinct inner fill color token.
- Spacing expectations: Row height and task bar height use size tokens. Time axis cell width corresponds to the current zoom level. Left panel width is fixed or resizable.
- Typography rules: Task names in the left panel use a body/label token. Time axis labels use a small caption token.
- Token usage: Task bar fill, progress fill, today indicator, dependency line, row background (alternating), and text must all use design tokens.
- Responsive behavior: On narrow viewports, the left panel may collapse or the chart may switch to a simplified list view. Horizontal scrolling is always available for the timeline panel.

---

## 4. Interaction Behavior

- States:
  - Idle: Chart displays all tasks and timeline.
  - Hover (web): Hovered task row and/or task bar highlight.
  - Selected: A selected task bar or row is highlighted with an accent token.
  - Loading: Skeleton rows shown while data loads.
  - Empty: An empty state message is displayed when no tasks exist.
- Controlled vs uncontrolled: The visible date range and selected task are controlled props. The parent manages navigation state.
- Keyboard behavior:
  - Arrow keys navigate between task rows.
  - Left/Right arrow keys on a focused task bar may adjust the visible time window.
  - Enter selects the focused task.
  - Zoom controls (if present) are reachable via Tab.
- Screen reader behavior:
  - Each task row is announced with the task name, start date, end date, and progress percentage.
  - The today indicator has an accessible label ("Today, [date]").
  - Dependency relationships are communicated via accessible descriptions, not only by visual lines.
- Motion rules: Horizontal scroll and zoom transitions animate smoothly. Reduced motion preference disables timeline animations; scrolling becomes instant.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - The chart uses `role="grid"` or `role="treegrid"` (if tasks are grouped) with appropriate row/cell roles.
  - Each task row uses `role="row"` with cells for name, dates, and progress.
  - The today indicator uses `aria-label="Today, [date]"`.
  - Dependency relationships are described via `aria-describedby`.
- Focus rules: Focus is manageable within the grid using arrow key navigation. The left panel task list and timeline bars must be independently focusable.
- Contrast expectations: Task bar fill must meet 3:1 against the row background. Progress fill must be distinguishable from the base bar fill. Text in the left panel must meet 4.5:1.
- Reduced motion behavior: Timeline scroll and zoom animations are disabled. Interactions are instant.

---

## 6. Theming Rules

- Required tokens: chart background, row background (even and odd alternating), task bar fill, task bar progress fill, today indicator color, dependency line color, text primary (task names), text secondary (time axis labels), focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded colors, widths, or font sizes.
- Dark mode expectations: Row backgrounds, task bar fills, and today indicator must all shift to dark-mode token equivalents while maintaining distinguishable contrast.

---

## 7. Composition Rules

- What can wrap it: A project detail view, a full-page timeline view, or a panel within a project management workspace.
- What it may contain: Task rows (each with a name cell and a timeline bar cell), a time axis header, a today indicator, optional dependency connector lines, and optional row grouping headers.
- Anti-patterns:
  - Do not embed full TaskDetailPanel inside the GanttChart rows — rows are summaries only.
  - Do not render more than ~200 rows without virtualization.
  - Do not use GanttChart for non-temporal data.

---

## 8. Performance Constraints

- Memoization rules: Individual task rows must be memoized. Updates to one task must not re-render the entire chart.
- Virtualization: Both row virtualization (for long task lists) and column virtualization (for long time ranges) are required when the dataset exceeds approximately 50 tasks or 90 visible days.
- Render boundaries: The timeline panel and the task name panel are independent render boundaries. Scrolling the timeline must not cause re-renders of the task name list.

---

## 9. Test Requirements

- What must be tested:
  - Correct number of task rows renders from the supplied data.
  - Task bars are positioned and sized proportionally to their start/end dates.
  - The today indicator appears at the current date position.
  - Progress fill reflects the supplied completion percentage.
  - Empty state renders when the task list is empty.
- Interaction cases:
  - Arrow key navigation moves focus between rows.
  - Enter selects the focused task and fires the selection callback.
  - Zoom controls change the visible time range.
- Accessibility checks:
  - Grid/row/cell roles are present.
  - Today indicator has an accessible label.
  - Task rows announce name, dates, and progress.
  - Focus ring is visible on focused rows.
  - Contrast ratios pass for task bar, progress fill, and text in both themes.
  - Reduced motion suppresses scroll and zoom animations.
