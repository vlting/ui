# Component Spec — ThreadCard

## 1. Purpose

Displays a summary preview of a community thread in a list context, showing the thread title, author, timestamp, tag(s), vote count, comment count, and an optional excerpt. Serves as the primary list item in a `ThreadList`.

Use when: Rendering a thread preview within a community thread list or search results.

Do NOT use when: The full thread content is being shown (use a full thread page layout), or the context is a notification item rather than a content list.

---

## 2. UX Intent

- Primary interaction goal: Allow users to quickly scan threads, assess relevance from the summary, and decide which to open.
- Expected user mental model: A familiar forum or discussion list card — similar to Reddit posts, Hacker News stories, or Discourse topic rows — with a consistent layout that enables rapid scanning.
- UX laws applied:
  - Jakob's Law: Matches the widely recognized forum thread list item pattern.
  - Serial Position Effect: The most important information (title, vote count, comment count) should be the most prominent.
  - Fitts's Law: The entire card (or the title) should be a large, tappable target on mobile.
  - Proximity (Gestalt): Meta information (author, timestamp, tag) is grouped together, clearly separated from the title and engagement stats.

---

## 3. Visual Behavior

- Layout: Card container (vertical stack or horizontal layout with vote control on the left). Contains: title row, optional excerpt, meta row (author avatar + name, timestamp, tag chips), and engagement stats row (comment count).
- Spacing: Consistent internal padding using spacing tokens. Vertical gap between card sections uses a spacing token.
- Typography: Thread title is the largest and boldest text element. Excerpt (if present) is regular body text, truncated to 2-3 lines. Meta text is muted/secondary at a smaller size token.
- Token usage: Card background, card hover background, border/shadow, title text, body text, muted text, tag chip colors, engagement icon colors — all from theme tokens.
- Responsive behavior: On mobile, the layout stacks vertically. On wider viewports, a horizontal layout may be used with vote control on the left. Card width is fluid, filling the list container.

---

## 4. Interaction Behavior

- States:
  - Idle: Default appearance.
  - Hover: Subtle background color change or shadow elevation increase.
  - Focus: Visible focus ring on the card or the title link.
  - Visited: The title link may use a visited color token to indicate the user has already read this thread.
  - Pinned: A visual indicator (pin icon + distinct background or border) distinguishes pinned threads.
  - Locked: A lock icon indicates the thread is closed for new replies.
  - Loading: Skeleton card with placeholder blocks for title, meta, and stats.
- Controlled vs uncontrolled: Fully controlled. Parent supplies thread data and onPress/onClick callback.
- Keyboard behavior: The card or title is a single focusable element (link or button). Tab navigates to the card. Enter activates it. Secondary actions (VoteControl, bookmark) within the card are separately focusable.
- Screen reader behavior: The thread title is the primary accessible label. The card announces author, timestamp, vote count, and comment count as supplementary information. Pinned/locked status is announced.
- Motion rules: Hover state transitions animate subtly. Reduced motion: instant state change.

---

## 5. Accessibility Requirements

- ARIA requirements: The card acts as a list item (`role="listitem"` via its `<li>` parent). The thread title is a link (`<a>`) with a meaningful href. Vote and comment counts are announced with full labels (e.g., "42 votes, 15 comments"). Pin and lock status are communicated via accessible text or `aria-label`.
- Focus rules: The title link receives focus. Secondary interactive elements (VoteControl) are in natural tab order after the title.
- Contrast expectations: Title text, meta text, and all UI elements meet WCAG AA against the card background, in both default and hover states.
- Reduced motion behavior: Hover background transition is suppressed.

---

## 6. Theming Rules

- Required tokens: card background, card hover background, card border color, card shadow/elevation token, title text color, title visited text color, body/excerpt text color, muted/secondary text color, engagement icon color, pinned indicator color, spacing tokens, border radius token.
- Prohibited hardcoded values: No hardcoded colors, pixel shadows, or font sizes.
- Dark mode expectations: Card background uses a dark surface token. All text tokens adapt. Hover state uses a dark hover token.

---

## 7. Composition Rules

- What can wrap it: Placed inside a `ThreadList` as a list item. May be used in search results or featured thread sections.
- What it may contain: A `VoteControl`, tag chip elements, an author avatar, engagement stat icons, and optional `ModeratorToolbar` (for moderators). Title is a link. Optional excerpt is truncated text.
- Anti-patterns:
  - Do not embed thread data-fetching inside this component.
  - Do not place full thread body content inside the card — it is a preview/summary only.
  - Do not make the entire card a native link element if it contains multiple interactive children (use a primary link + separate interactive children instead).

---

## 8. Performance Constraints

- Memoization rules: Each `ThreadCard` in a list must be memoized by thread ID. Thread list updates for unrelated threads must not cause re-renders.
- Virtualization: Intended to be rendered as a virtualized list item inside `ThreadList` for long lists.
- Render boundaries: No data-fetching inside this component.

---

## 9. Test Requirements

- What must be tested:
  - Renders thread title, author, timestamp, tag, vote count, and comment count correctly.
  - Renders the loading skeleton state.
  - Pinned state renders the pin indicator.
  - Locked state renders the lock indicator.
  - Visited state applies the visited color to the title.
- Interaction cases:
  - Clicking/pressing the title fires the navigation callback.
  - Hover state applies correct visual change.
  - Tab navigation reaches the title link and then secondary actions.
  - VoteControl within the card operates independently.
- Accessibility checks:
  - Title is an accessible link with meaningful text.
  - Vote and comment counts have full accessible labels.
  - Pin and lock status are announced.
  - Contrast passes in default, hover, and dark modes.
  - Reduced motion: hover transition suppressed.
