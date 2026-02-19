# Component Spec — CommentThread

## 1. Purpose

Displays a hierarchical or flat thread of comments, grouping a root comment with its replies in a visually cohesive container. Enables users to follow a conversation and participate in it from a single, contained surface.

Use when: rendering a discussion thread on a post, task, document section, or any item that supports threaded replies.

Do NOT use when: only a flat list of unrelated comments is needed (use a CommentItem list directly), or when a full sidebar-based comment panel is required (use PMCommentSidebar).

---

## 2. UX Intent

- Primary interaction goal: Allow users to read an entire conversation in context and identify the relationship between root comments and replies.
- Expected user mental model: Users recognize the indented-reply pattern from platforms like Reddit, GitHub, Twitter/X threads, and YouTube comments (Jakob's Law). The root comment is visually prominent; replies are indented below.
- UX laws applied:
  - Jakob's Law: Follow the root-plus-replies threading pattern familiar from social platforms.
  - Gestalt (Continuity): A vertical connector line or indentation visually links replies to their parent comment.
  - Gestalt (Common Region): The thread is a bounded container, grouping the root comment and its replies as a single conversation unit.
  - Hick's Law: "Load more replies" is preferred over showing all replies upfront when the reply count is high.
  - Miller's Law: Show a limited number of replies initially (e.g., 3–5) before requiring expansion to reduce cognitive load.

---

## 3. Visual Behavior

- Layout rules:
  - A vertical container with the root CommentItem at the top.
  - Reply CommentItems are indented below the root, connected by a vertical line or consistent left padding.
  - A "View N more replies" expandable control appears when reply count exceeds the visible limit.
  - A reply compose area may appear at the bottom of the thread when in an expanded/active state.
- Spacing expectations: Indentation for replies uses a consistent space token (not a hardcoded pixel value). Gap between thread items uses a small-to-medium space token.
- Typography rules: Typography within each CommentItem follows CommentItem's spec. The "View more replies" label uses a caption or small body token.
- Token usage: Thread container background, indent line color, and "view more" text must use design tokens.
- Responsive behavior: On narrow viewports, reply indentation may be reduced to maintain readability. The "View more replies" control remains accessible at all widths.

---

## 4. Interaction Behavior

- States:
  - Collapsed: Only the root comment and a limited number of replies are visible.
  - Expanded: All replies are visible.
  - Loading more: A loading indicator appears while additional replies fetch.
  - Empty (no replies): Only the root comment is visible, with no reply controls (or with a "Be the first to reply" affordance).
- Controlled vs uncontrolled: The expanded/collapsed state may be controlled or uncontrolled. The list of visible replies is a controlled prop.
- Keyboard behavior:
  - Tab moves focus through the thread in DOM order (root comment, replies, actions, compose area).
  - The "View more replies" control is reachable via Tab and activated with Enter or Space.
- Screen reader behavior:
  - The thread uses `role="region"` or is wrapped in a group with an accessible label (e.g., "Thread started by Alice").
  - The reply count is available in the group's accessible description.
  - Expanding replies announces the number of replies loaded.
- Motion rules: Expanding replies uses a brief height transition. Reduced motion makes the expansion instant.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - The thread container uses `role="region"` or `role="group"` with `aria-label` (e.g., "Comment thread by [author]").
  - The "View more replies" button has `aria-expanded` reflecting the expanded state and `aria-controls` referencing the reply list.
  - The reply list uses `role="list"` with each reply as `role="listitem"`.
- Focus rules: Focus moves through the thread in natural DOM order. Expanding replies should not move focus unexpectedly — new content is appended and focus remains on the expand control.
- Contrast expectations: Thread content inherits from CommentItem. The indent line must meet 3:1 contrast. "View more replies" text must meet 4.5:1.
- Reduced motion behavior: Reply expansion animation is instant.

---

## 6. Theming Rules

- Required tokens: thread container background, indent line color, "view more" text color, focus ring, space (for indentation), radius.
- Prohibited hardcoded values: No hardcoded hex colors, pixel indentation widths, or font sizes.
- Dark mode expectations: Thread background and indent line tokens resolve to dark-mode values. "View more replies" text maintains contrast in dark mode.

---

## 7. Composition Rules

- What can wrap it: A social feed (within PostCard), a document comment panel, a task comment section (as an alternative to PMCommentSidebar).
- What it may contain: A root CommentItem, a list of reply CommentItems, a "View more replies" control, and optionally a reply compose area.
- Anti-patterns:
  - Do not deeply nest CommentThread instances (only one level of threading is recommended — root comment plus replies).
  - Do not load all replies upfront for threads with more than 5 replies.
  - Do not render a CommentThread without a root comment.

---

## 8. Performance Constraints

- Memoization rules: Individual CommentItem components within the thread must be memoized. Loading additional replies must only update the reply list, not re-render the root comment.
- Virtualization: For threads with many replies (> 20), virtualized reply list rendering is required.
- Render boundaries: The root comment and the reply list are independent render boundaries.

---

## 9. Test Requirements

- What must be tested:
  - Root comment renders at the top.
  - Reply items render indented below the root.
  - "View more replies" control renders when reply count exceeds the visible limit.
  - Activating "View more replies" expands the reply list and shows all replies.
  - Empty-replies state renders the root comment without a reply list.
- Interaction cases:
  - Enter/Space on "View more replies" expands the thread.
  - Tab moves focus through all CommentItems and controls in DOM order.
- Accessibility checks:
  - Thread container has `role="region"` or `role="group"` with an accessible label.
  - "View more replies" has `aria-expanded` and `aria-controls`.
  - Reply list has `role="list"`.
  - Indent line meets 3:1 contrast.
  - "View more" text meets 4.5:1.
  - Reduced motion suppresses expansion animation.
