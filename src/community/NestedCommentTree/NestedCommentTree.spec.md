# Component Spec — NestedCommentTree

## 1. Purpose

Renders a hierarchical, threaded comment structure for community posts or discussions. Supports multiple levels of reply nesting, with controls for collapsing/expanding branches and loading more replies.

Use when: A thread or post has a nested reply system where comments can be responded to at multiple levels of depth.

Do NOT use when: Comments are flat and non-hierarchical (use a flat list component), or the context does not support threaded replies.

---

## 2. UX Intent

- Primary interaction goal: Allow users to follow conversation threads contextually — understanding which comment a reply is responding to and navigating the discussion without losing context.
- Expected user mental model: Familiar from Reddit, Hacker News, or Discourse — indented comment branches with collapse controls and "load more replies" affordances.
- UX laws applied:
  - Proximity (Gestalt): Visual indentation and connecting lines make parent-child comment relationships immediately clear.
  - Miller's Law: Collapse deeply nested branches by default beyond a depth threshold (e.g., 3-4 levels) to limit cognitive load.
  - Hick's Law: Limit immediately visible actions per comment (reply, vote, report) to avoid overwhelming users.

---

## 3. Visual Behavior

- Layout: Vertical stack of comment nodes. Each reply level is indented using a consistent spacing token multiple. A vertical connecting line (using border token) visually links replies to their parent.
- Spacing: Consistent vertical gap between comment nodes at each level. Indentation is a fixed offset per depth level using a spacing token.
- Typography: Comment author name in bold/medium weight; comment body in regular body text; timestamp and metadata in muted secondary text.
- Token usage: Indent line color, node background (optional hover state), action button colors, metadata text color — all from theme tokens.
- Responsive behavior: On narrow viewports, maximum indent depth is reduced to prevent extreme narrowing of comment text. Beyond a maximum depth, additional replies are rendered without further indentation but with a visual cue (border accent).

---

## 4. Interaction Behavior

- States:
  - Expanded: All loaded children are visible.
  - Collapsed: Child branch is hidden; a "N replies" affordance is shown to expand.
  - Loading more: A "Load more replies" trigger is shown at the end of a partial branch; clicking it fires a parent callback.
  - Deleted comment: A placeholder is shown (e.g., "[deleted]") rather than the original content.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the comment tree data, collapsed state per node, and callbacks for expand/collapse, load-more, reply, and vote.
- Keyboard behavior: Tab navigates through comment nodes and their action buttons. Enter/Space activates collapse toggles and action buttons. The collapse toggle is reachable before the comment body.
- Screen reader behavior: Each comment is announced as a list item within a nested list structure. The depth level and parent author context should be communicated (e.g., "Reply to [Author Name], level 2 of 4"). Collapse state is communicated via `aria-expanded`.
- Motion rules: Collapse/expand branches animate with a height transition. Reduced motion: instant show/hide.

---

## 5. Accessibility Requirements

- ARIA requirements: The tree is rendered as a nested `<ul>` / `<li>` structure. Each comment node contains author, body, and action controls. Collapse toggles use `aria-expanded` and `aria-controls`. The "Load more" trigger is a button with a descriptive label.
- Focus rules: After collapsing a branch, focus returns to the collapse toggle. After expanding, focus remains on the toggle. Reply composer focus is managed by the parent.
- Contrast expectations: Comment text, metadata, and all interactive controls meet WCAG AA against the comment background.
- Reduced motion behavior: Collapse/expand height animations are suppressed; branches appear and disappear instantly.

---

## 6. Theming Rules

- Required tokens: comment body background (optional), indent line color, indent line width, indent spacing offset token, author name text color, body text color, metadata muted text color, action button colors, hover background color, border radius for comment containers, spacing tokens.
- Prohibited hardcoded values: No hardcoded depth pixel values, colors, or indent offsets.
- Dark mode expectations: Indent lines, text colors, and any comment container backgrounds adapt to dark theme tokens.

---

## 7. Composition Rules

- What can wrap it: Placed within a `ThreadCard` detail view or a full thread page. May include a `VoteControl` per comment node and a `ModeratorToolbar` for moderators.
- What it may contain: Comment node elements (author, body, metadata, actions). Each node may contain a `VoteControl`, a reply button, a collapse toggle, and optionally a `ModeratorToolbar`. Child nodes recurse into another level of the tree.
- Anti-patterns:
  - Do not embed data-fetching for replies inside this component.
  - Do not allow unlimited visual nesting depth — enforce a maximum indentation level.
  - Do not re-render the entire tree when a single branch changes — memoize nodes by ID.

---

## 8. Performance Constraints

- Memoization rules: Each comment node must be memoized by its ID. Expanding or collapsing one branch must not cause other branches to re-render.
- Virtualization: For very long flat sections (many top-level comments), the parent should supply virtualized list rendering. The tree component should support virtualized top-level nodes.
- Render boundaries: No data-fetching. All comment data is provided via props.

---

## 9. Test Requirements

- What must be tested:
  - Renders a multi-level nested comment tree correctly.
  - Renders collapsed branches with the correct reply count.
  - Renders a "Load more replies" trigger at partial branches.
  - Renders a deleted comment placeholder correctly.
- Interaction cases:
  - Collapse toggle collapses and expands a branch; fires correct callback.
  - "Load more replies" button fires the parent callback.
  - Tab navigation visits all interactive elements in logical order.
  - Keyboard activation of collapse toggle and action buttons.
- Accessibility checks:
  - Nested `ul`/`li` structure present.
  - `aria-expanded` reflects collapse state correctly.
  - Depth level is communicated to screen readers.
  - Reduced motion: collapse/expand animations suppressed.
