# Component Spec — SprintHeader

## 1. Purpose

Displays summary information for a sprint or iteration at the top of a sprint view or board. Communicates the sprint name, date range, progress, and status at a glance without requiring the user to drill into individual tasks.

Use when: heading a sprint board, timeline section, or sprint detail view where high-level sprint metadata needs to be visible and scannable.

Do NOT use when: the user is viewing a task-level detail (use TaskDetailPanel), or when only a section heading without sprint metadata is needed (use a plain heading element).

---

## 2. UX Intent

- Primary interaction goal: Allow users to immediately understand which sprint is active, how much time remains, and overall sprint health — without reading every task.
- Expected user mental model: Users expect sprint headers to function like the top-of-board summary seen in Jira, Linear, and GitHub Projects (Jakob's Law) — a banner with sprint name, dates, and a progress bar.
- UX laws applied:
  - Jakob's Law: Follow the sprint summary header convention from Agile PM tools.
  - Miller's Law: Limit displayed metadata to sprint name, date range, progress, and status — no more.
  - Gestalt (Common Region): The header visually groups all sprint-level metadata into a distinct bounded zone, separated from the task content below.
  - Hick's Law: Keep sprint-level actions (start sprint, complete sprint) limited to clearly labeled controls — not cluttered in the header.

---

## 3. Visual Behavior

- Layout rules:
  - A horizontal container with the sprint name and status badge on the left, date range in the center or right, and a progress indicator (bar or percentage) on the right.
  - An optional set of action buttons (Start Sprint, Complete Sprint, Edit) aligned to the right edge.
  - The progress bar spans the full width below the metadata row, or appears inline.
- Spacing expectations: Internal header padding uses a medium space token. Gap between metadata elements uses a small space token.
- Typography rules: Sprint name uses a heading token. Status badge uses a caption token. Date range uses a body token in secondary color.
- Token usage: Background, text, status badge, progress fill, and borders must use design tokens.
- Responsive behavior: On narrow viewports, the metadata row wraps to multiple lines. Action buttons may collapse into an overflow menu. The progress bar always fills the full header width.

---

## 4. Interaction Behavior

- States:
  - Idle: Sprint data displayed; actions available.
  - Loading: Skeleton placeholders for name, dates, and progress.
  - No sprint: An empty state or "No active sprint" message.
- Controlled vs uncontrolled: All sprint data is supplied via props. The component is presentational. Action callbacks are provided by the parent.
- Keyboard behavior:
  - Tab moves focus through action buttons in the header.
  - Action buttons are activated with Enter or Space.
- Screen reader behavior:
  - Sprint name is announced as a heading.
  - Status, date range, and progress are announced together in the region description.
  - Action buttons have descriptive labels.
- Motion rules: Loading-to-content transition uses a brief fade. Progress bar fill may animate on first render. Reduced motion suppresses all animations.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - The header uses `role="banner"` if it is the page-level header, or `role="region"` with `aria-label` (e.g., "Sprint: Sprint 12") otherwise.
  - The sprint name uses a heading element at the appropriate level.
  - The progress bar uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label`.
  - Action buttons have descriptive `aria-label` values.
- Focus rules: All interactive elements (action buttons) are in the Tab order with visible focus rings. Non-interactive elements are not Tab stops.
- Contrast expectations: Sprint name must meet 4.5:1. Secondary text (date range, status) must meet 3:1. Progress bar fill must meet 3:1 against the track background.
- Reduced motion behavior: Progress bar fill animation and loading fade are disabled.

---

## 6. Theming Rules

- Required tokens: header background, sprint name text color, status badge background and text, date range text (secondary), progress bar track and fill, action button tokens, focus ring, space, radius.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Header background and all text tokens shift to dark-mode equivalents. Progress bar track and fill remain distinguishable in dark mode.

---

## 7. Composition Rules

- What can wrap it: The top of a KanbanBoard, a GanttChart section, or a sprint detail page layout.
- What it may contain: Sprint name, status badge, date range text, progress bar, and optional action buttons.
- Anti-patterns:
  - Do not embed task cards or lists inside SprintHeader.
  - Do not use SprintHeader as a generic section header without sprint-specific data.
  - Do not place more than 2–3 action buttons in the header; use an overflow menu for additional actions.

---

## 8. Performance Constraints

- Memoization rules: SprintHeader should be memoized. It only re-renders when sprint data props change.
- Virtualization: Not applicable.
- Render boundaries: SprintHeader is an isolated render boundary. Task count or progress changes in child components should not cause SprintHeader to re-render unless the aggregated progress value changes.

---

## 9. Test Requirements

- What must be tested:
  - Sprint name, date range, and status badge render from props.
  - Progress bar reflects the correct completion percentage.
  - Loading skeleton renders when the loading state is active.
  - No-sprint state renders the appropriate empty message.
  - Action buttons fire their respective callbacks.
- Interaction cases:
  - Tab moves focus through action buttons.
  - Enter/Space activates each action button.
- Accessibility checks:
  - Sprint name uses a heading element at the correct level.
  - Progress bar has `role="progressbar"` with correct ARIA attributes.
  - Action buttons have descriptive accessible labels.
  - Focus rings are visible on all interactive elements.
  - Contrast ratios pass in both themes.
  - Reduced motion suppresses all animations.
