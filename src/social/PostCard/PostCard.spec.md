# Component Spec — PostCard

## 1. Purpose

Displays a single social post as a self-contained card, including the author's information, post body text, optional media, and social action controls (react, comment, share). Serves as the primary unit of content in a social feed.

Use when: rendering individual posts in a feed, profile page, or search results. PostCard is the standard presentation surface for any user-generated social post.

Do NOT use when: showing a detailed single-post view with full comment thread (use a post detail page layout), or when a compact notification-style summary of a post is needed.

---

## 2. UX Intent

- Primary interaction goal: Allow users to read a post, understand its author and context, and take social actions (react, comment, share) in a single, contained interaction.
- Expected user mental model: Users recognize the social post card pattern from Twitter/X, Facebook, LinkedIn, and Instagram (Jakob's Law). The card has a predictable structure: author at the top, content in the middle, actions at the bottom.
- UX laws applied:
  - Jakob's Law: Follow the header-body-actions layout of established social post cards.
  - Gestalt (Figure/Ground): The card's bounded surface separates the post from the feed background.
  - Gestalt (Hierarchy): Author and timestamp are at the top; the post body is the center of attention; actions are subordinate at the bottom.
  - Miller's Law: Limit visible action controls to the 3–4 most common (like, comment, share, more).
  - Fitts's Law: Action buttons at the bottom must have adequate touch target sizes.

---

## 3. Visual Behavior

- Layout rules:
  - PostCard.Header: Author avatar, author name, optional @handle, and timestamp at the top.
  - PostCard.Content: Post body text. Long text may truncate with a "Read more" control.
  - PostCard.Media: Optional media attachment area (images, videos) between Content and Actions.
  - PostCard.Actions: Reaction bar, comment count trigger, and share control at the bottom.
  - An optional overflow menu (three-dot) in the Header allows access to secondary actions (edit, delete, report).
- Spacing expectations: Internal card padding uses a medium space token. Vertical gap between Header, Content, Media, and Actions uses a medium space token.
- Typography rules: Author name uses a label token at medium weight. @handle and timestamp use a caption token in secondary color. Post body uses a body token.
- Token usage: Card background, border, text, and action icon colors must use design tokens.
- Responsive behavior: The card fills its container width. On narrow viewports, the author metadata row may truncate the @handle. Media adapts its aspect ratio responsively.

---

## 4. Interaction Behavior

- States:
  - Idle: Full card displayed; actions visible.
  - Hover (web, card level): Subtle background color shift on the card.
  - Liked/Reacted: The reaction button reflects the active reaction with an accent token.
  - Truncated content: "Read more" label is shown; activating it expands the full text.
  - Loading: Skeleton card with placeholder shapes for header, body, and actions.
- Controlled vs uncontrolled: PostCard is presentational. All data and action callbacks are supplied via props.
- Keyboard behavior:
  - Tab moves focus through all interactive elements in DOM order (author link, action buttons, overflow menu).
  - Enter or Space activates focused action controls.
  - "Read more" is Tab-accessible.
- Screen reader behavior:
  - The card uses `role="article"` with an accessible label (e.g., "Post by Alice, 2 hours ago").
  - The timestamp uses a `time` element with a machine-readable `dateTime` attribute.
  - Reaction button announces the current reaction and reaction count.
  - Action buttons have descriptive labels ("Like post", "Comment on post", "Share post").
- Motion rules: Reaction toggle uses a brief scale/bounce animation. Card entrance in a feed uses a brief fade. Reduced motion suppresses all animations.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - Card: `role="article"` with `aria-label` identifying the author and timestamp.
  - Timestamp: `time` element with `dateTime`.
  - Overflow menu trigger: `aria-label` ("More options for this post"), `aria-expanded`, `aria-haspopup="menu"`.
  - Reaction button: `aria-label` including the reaction name and count (e.g., "Like, 24 likes").
  - "Read more" button: `aria-expanded` reflecting the expanded state, `aria-controls` referencing the content area.
- Focus rules: All interactive elements (author link, action buttons, overflow menu, "Read more") are in the Tab order. Focus ring must be clearly visible.
- Contrast expectations: Author name must meet 4.5:1. Post body text must meet 4.5:1. Secondary text (handle, timestamp, action labels) must meet 3:1.
- Reduced motion behavior: Reaction animation and card entrance fade are disabled.

---

## 6. Theming Rules

- Required tokens: card background, card border, author name text, secondary text (handle, timestamp), body text, action icon color, active reaction accent, overflow menu background, focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Card background, text, and action icon tokens shift to dark-mode equivalents. Active reaction accent remains distinguishable in dark mode.

---

## 7. Composition Rules

- What can wrap it: InfiniteFeedList, a profile post grid, search results list.
- What it may contain:
  - PostCard.Header: author avatar, name, @handle, timestamp, overflow menu.
  - PostCard.Content: post body text with optional "Read more".
  - PostCard.Media: PostMediaGallery for image/video attachments.
  - PostCard.Actions: ReactionBar, comment count, share button.
- Anti-patterns:
  - Do not embed a full CommentThread inside PostCard — use a separate post detail view.
  - Do not show more than 4 primary action buttons in PostCard.Actions.
  - Do not nest PostCard inside another PostCard.

---

## 8. Performance Constraints

- Memoization rules: PostCard must be memoized. A reaction update on one card must not re-render sibling cards.
- Virtualization: PostCard instances within a feed are virtualized by the parent InfiniteFeedList. PostCard itself does not virtualize.
- Render boundaries: PostCard is a self-contained render boundary. Reaction, expand-text, and media state changes are isolated.

---

## 9. Test Requirements

- What must be tested:
  - Header renders author name, @handle, timestamp, and overflow menu.
  - Content renders post body text.
  - Media renders when attachments are supplied; is absent when none are provided.
  - Actions render reaction bar, comment count, and share button.
  - "Read more" expands truncated content.
  - Active reaction state renders with the correct visual treatment.
- Interaction cases:
  - Tab moves focus through all interactive elements.
  - Reaction button toggles the active reaction and fires the callback.
  - "Read more" expands content on Enter/Space.
  - Share and comment buttons fire their respective callbacks.
- Accessibility checks:
  - `role="article"` with accessible label is present.
  - Timestamp has `time` element with `dateTime`.
  - Reaction button has descriptive accessible label with count.
  - Overflow menu has `aria-expanded` and `aria-haspopup`.
  - Focus ring is visible on all interactive elements.
  - Contrast ratios pass in both themes.
  - Reduced motion suppresses all animations.
