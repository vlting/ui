# Component Spec — PMCommentSidebar

## 1. Purpose

Provides a persistent or slideable side panel within a project management context for viewing and composing comments on a specific task or project item. Facilitates inline discussion without navigating away from the task detail.

Use when: a task or project item requires threaded or chronological comment discussion accessible from within the task detail view. This is distinct from the collaboration-context CommentSidebar.

Do NOT use when: comments are unrelated to a project management context, or when a modal-based comment dialog is preferred over a persistent side panel.

---

## 2. UX Intent

- Primary interaction goal: Allow users to read and contribute to discussion about a specific task without losing context of the task detail content.
- Expected user mental model: Users expect a comment sidebar to behave like a familiar "activity" or "comments" panel in tools like Jira, Linear, or Notion (Jakob's Law) — a vertical list of comments with a compose area at the bottom.
- UX laws applied:
  - Jakob's Law: Follow the chronological comment panel pattern from PM tools.
  - Gestalt (Continuity): Comments flow from oldest to newest, top to bottom. The compose area is anchored at the bottom.
  - Hick's Law: Comment actions (reply, react, edit, delete) are contextual and revealed on hover — not all visible at once.
  - Fitts's Law: The compose input and submit button must be easily reachable at the bottom of the panel.
  - Tesler's Law: Formatting and @mention complexity should be absorbed progressively, not shown upfront.

---

## 3. Visual Behavior

- Layout rules:
  - A vertical panel with a scrollable comment list occupying the majority of the height.
  - A compose area (input + submit button) is pinned to the bottom of the panel.
  - An optional panel header shows the comment count and a close/collapse control.
  - Each comment entry includes an avatar, author name, timestamp, and comment body.
  - Replies may be visually indented or shown as threaded sub-items.
- Spacing expectations: Comment entries are separated by a consistent gap token. The compose area has generous padding using a medium space token. The panel has horizontal padding on both sides.
- Typography rules: Author name uses a label token at medium weight. Timestamp uses a caption token in secondary color. Comment body uses a body token.
- Token usage: Panel background, comment entry backgrounds, compose input background, and all text must use design tokens.
- Responsive behavior: On narrow viewports, the sidebar may transition from a persistent side panel to a bottom sheet or full-screen overlay.

---

## 4. Interaction Behavior

- States:
  - Idle: Comment list visible, compose area ready.
  - Focused compose: Compose input is focused; optional secondary formatting controls may appear.
  - Loading: Skeleton comment entries shown while fetching.
  - Empty: A "No comments yet" message is shown.
  - Submitting: Submit button is disabled/loading while a new comment is being posted.
  - Error: An inline error message appears near the compose area if submission fails.
- Controlled vs uncontrolled: The list of comments and the compose value are controlled props. The panel's open/closed state (if collapsible) is also controlled by the parent.
- Keyboard behavior:
  - Tab moves focus through all interactive elements in the panel in DOM order.
  - Within the compose area, Enter submits the comment (or Shift+Enter inserts a line break, depending on configuration).
  - Escape dismisses the compose focus or collapses the panel (if configured).
- Screen reader behavior:
  - The sidebar uses `role="region"` with `aria-label` (e.g., "Task comments").
  - New comments appended to the list are announced via a polite live region.
  - The compose input has an accessible label.
  - The comment count in the header is accessible.
- Motion rules: New comments animate in with a brief fade. The panel open/close animation uses a slide. All motion is suppressed under reduced motion preference.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - The sidebar uses `role="region"` with `aria-label`.
  - The comment list uses `role="list"` with each entry as `role="listitem"`.
  - New comment live region uses `aria-live="polite"`.
  - The compose input has `aria-label` or `aria-labelledby`.
  - Error message uses `role="alert"`.
- Focus rules: Focus flows naturally through the sidebar in DOM order. When the sidebar opens (if slideable), focus moves to the panel header or compose area. When it closes, focus returns to the trigger.
- Contrast expectations: Author names and comment bodies must meet 4.5:1. Timestamps must meet 3:1. Error text must meet 4.5:1 on its background.
- Reduced motion behavior: Comment enter animation and panel slide are disabled.

---

## 6. Theming Rules

- Required tokens: sidebar background, comment entry background, compose input background, compose input border, text primary, text secondary, error color, focus ring, space, radius.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Sidebar and comment backgrounds shift to dark tokens. Text and secondary text tokens resolve correctly. Error states remain distinguishable in dark mode.

---

## 7. Composition Rules

- What can wrap it: TaskDetailPanel (as a side panel), a project workspace split-pane layout.
- What it may contain: A panel header, a scrollable CommentItem or CommentThread list, and a compose area.
- Anti-patterns:
  - Do not use PMCommentSidebar for non-task discussions (use CollabCommentSidebar for collaboration contexts).
  - Do not embed other panels or modals inside PMCommentSidebar.
  - Do not hide the compose area — it must always be accessible.

---

## 8. Performance Constraints

- Memoization rules: Individual CommentItem components must be memoized. Adding a new comment must only update the comment list, not re-render the compose area or panel header.
- Virtualization: For long comment threads (> 50 items), the comment list must use virtualized rendering.
- Render boundaries: The comment list and compose area are independent render boundaries.

---

## 9. Test Requirements

- What must be tested:
  - Comment list renders all supplied comments correctly.
  - Empty state renders when no comments exist.
  - Loading skeleton renders during data fetch.
  - Typing in the compose area updates the input value.
  - Submitting a comment fires the correct callback.
  - Error message renders when submission fails.
- Interaction cases:
  - Enter (or Shift+Enter, per configuration) submits or inserts a line break in the compose area.
  - Tab moves focus through all interactive elements.
  - Escape dismisses compose focus or collapses the panel.
- Accessibility checks:
  - `role="region"` with `aria-label` is present.
  - Comment list and items have correct roles.
  - New comment live region is `aria-live="polite"`.
  - Compose input has an accessible label.
  - Error uses `role="alert"`.
  - Focus moves to panel on open; returns to trigger on close.
  - Contrast ratios pass in both themes.
  - Reduced motion suppresses animations.
