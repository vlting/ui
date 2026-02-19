# Component Spec — CommentItem

## 1. Purpose

Displays a single comment as a structured entry including the author's avatar, name, timestamp, comment body, and contextual actions (reply, react, edit, delete). Serves as the atomic unit within a CommentThread or PMCommentSidebar.

Use when: rendering individual comments within any threaded or flat comment list in both social and project management contexts.

Do NOT use when: a full thread context is needed (use CommentThread), or when displaying a notification-style summary of a comment (use a notification item component).

---

## 2. UX Intent

- Primary interaction goal: Allow users to read a comment and access contextual actions (reply, react, edit, delete) with minimal friction.
- Expected user mental model: Users expect comment items to behave like entries in a social feed, GitHub PR review, or Slack message — a row with an avatar, name, time, and body, with actions revealed on hover (Jakob's Law).
- UX laws applied:
  - Jakob's Law: Follow the avatar-left, body-right layout familiar from social platforms and PM tools.
  - Gestalt (Figure/Ground): The comment body is the foreground; the avatar and metadata are supporting context.
  - Hick's Law: Comment actions (reply, react, edit, delete) are revealed on hover, not all visible simultaneously.
  - Fitts's Law: Action controls revealed on hover must be large enough to tap/click without precision.

---

## 3. Visual Behavior

- Layout rules:
  - CommentItem.Avatar on the left (circular avatar image).
  - CommentItem.Content on the right (vertically stacked: author name + timestamp on top, comment body below).
  - CommentItem.Actions below the body or revealed on hover (reply, react, edit, delete).
  - A reply indicator or indentation may be applied when the comment is a reply within a thread.
- Spacing expectations: Gap between Avatar and Content uses a small space token. Vertical gap between author/timestamp and body uses a small space token. Actions use a consistent small space token between each action.
- Typography rules: Author name uses a label token at medium weight. Timestamp uses a caption token in secondary color. Comment body uses a body token at regular weight.
- Token usage: All colors for background, text, avatar border, action icon, and hover states must use design tokens.
- Responsive behavior: On narrow viewports, the avatar size may reduce to a smaller size token variant. The comment body wraps naturally. Actions remain accessible.

---

## 4. Interaction Behavior

- States:
  - Idle: Comment displayed; actions hidden (hover-reveal pattern on web).
  - Hover (web): Action controls appear (reply, react, more menu).
  - Focus: Visible focus ring on the comment container or individual action controls.
  - Edited: An "edited" label appears near the timestamp.
  - Deleted: A "This comment was deleted" placeholder is displayed in place of the body.
  - Highlighted/Mentioned: A subtle background highlight indicates the current user was @mentioned.
- Controlled vs uncontrolled: CommentItem is purely presentational. All data and action callbacks are supplied via props.
- Keyboard behavior:
  - Tab moves focus to the comment and then through its action controls.
  - Enter or Space activates a focused action control.
  - Action controls that open menus (e.g., more menu) open on Enter/Space.
- Screen reader behavior:
  - The comment is announced as a group with the author name, timestamp, and body.
  - Edited and deleted states are announced.
  - Action controls have descriptive accessible labels (e.g., "Reply to Alice's comment").
  - @mention highlight is communicated via accessible text (e.g., "You were mentioned").
- Motion rules: Hover reveal of actions uses a brief fade (under 100ms). Reduced motion suppresses the fade — actions are always visible or toggle with a focus event instead.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - The comment uses `role="article"` with `aria-label` including author name and timestamp.
  - The timestamp uses a `time` element with a machine-readable `dateTime` attribute.
  - Action controls are `role="button"` with descriptive `aria-label` values.
  - Deleted comment state uses `aria-label` conveying the deletion.
  - @mention highlight uses `aria-description` or visually hidden text.
- Focus rules: The comment frame and all action controls are in the Tab order. On mobile (where hover is not available), actions must always be visible or reachable via a tap on the comment.
- Contrast expectations: Author name must meet 4.5:1. Comment body must meet 4.5:1. Timestamp must meet 3:1. Action icon colors must meet 3:1 against the background.
- Reduced motion behavior: Action fade-in is instant. @mention highlight animation is disabled.

---

## 6. Theming Rules

- Required tokens: comment background (idle and highlighted), avatar border, author name text, body text, timestamp text (secondary), action icon color, hover action background, focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded hex values, pixel spacing, or font sizes.
- Dark mode expectations: Comment background, text, and action icon tokens shift to dark-mode values. @mention highlight remains distinguishable in dark mode.

---

## 7. Composition Rules

- What can wrap it: CommentThread (as a list of CommentItems), PMCommentSidebar comment list, any flat or threaded comment list container.
- What it may contain:
  - CommentItem.Avatar: user avatar image or fallback initials.
  - CommentItem.Content: author name, timestamp, and body text.
  - CommentItem.Actions: reply, react, edit, delete controls.
- Anti-patterns:
  - Do not nest CommentItem inside another CommentItem.
  - Do not embed editable forms inside CommentItem — editing opens a separate inline editor or modal.
  - Do not display more than one action set per CommentItem.

---

## 8. Performance Constraints

- Memoization rules: CommentItem must be memoized. Adding a new comment or reacting to one comment must not re-render unaffected sibling CommentItems.
- Virtualization: In long comment threads, the parent CommentThread or sidebar handles virtualization. CommentItem does not.
- Render boundaries: CommentItem is a leaf component. Reaction or edit updates are isolated to the affected item.

---

## 9. Test Requirements

- What must be tested:
  - Author name, timestamp, and body render from props.
  - Edited label appears when the edited flag is set.
  - Deleted state renders the deletion placeholder.
  - @mention highlight applies when the mentioned flag is set.
  - Action controls render and fire their respective callbacks.
- Interaction cases:
  - Tab moves focus to the comment and through action controls.
  - Enter/Space activates a focused action.
  - Reply action fires the reply callback with the comment ID.
- Accessibility checks:
  - `role="article"` is present with an accessible label.
  - Timestamp has a `time` element with `dateTime`.
  - Action controls have descriptive accessible labels.
  - Deleted state is announced correctly.
  - @mention is communicated via text, not color alone.
  - Focus ring is visible on all interactive elements.
  - Contrast ratios pass in both themes.
  - Reduced motion suppresses all transitions.
