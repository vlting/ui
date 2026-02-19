# Component Spec — MatchList

## 1. Purpose

Renders a scrollable, ordered collection of mutual matches for the current user. It serves as the primary inbox-style interface where users browse who they have matched with and select someone to start or continue a conversation.

Use when: displaying the complete or filtered list of a user's mutual matches on the matches or messages screen.

Do NOT use for: displaying potential (un-matched) profiles, search results, or notifications outside the match context.

---

## 2. UX Intent

- Primary interaction goal: enable users to quickly scan and navigate to any of their matches.
- Expected user mental model: an inbox or contact list — items are ordered by recency or activity, and unread/new items are surfaced first (Jakob's Law).
- UX laws applied:
  - Serial position effect: the most recent or unread matches appear at the top, as users most likely want to engage with them.
  - Fitts's Law: each list item (MatchCard) is a large tap target spanning the full row width.
  - Miller's Law: the list may be sectioned (e.g., "New Matches" vs. "Messages") to chunked into manageable groups.
  - Doherty Threshold: the list must render its initial visible items within 400ms; virtualize for performance.

---

## 3. Visual Behavior

- Layout: a vertically scrollable list of MatchCard components.
- Optional section headers ("New Matches", "Conversations") separate categories within the list.
- An empty state is shown when no matches exist, with a friendly illustration and a prompt to keep swiping.
- A loading skeleton is shown while data is being provided by the parent.
- Spacing: consistent gap between items using a space token.
- Section headers use a label-scale type token; item spacing follows the design token scale.
- Token usage: background, separator, section header text, and skeleton colors from theme tokens.
- Responsive: single column on mobile; may expand to two columns on tablet or wide screens.

---

## 4. Interaction Behavior

- States: loading (skeleton), empty (empty state illustration and CTA), populated (list of cards), error (error message and retry action).
- The list itself is a scroll container; individual items handle their own press interactions.
- Pull-to-refresh behavior is supported via an `onRefresh` callback when the platform supports it.
- Keyboard behavior:
  - Tab moves focus sequentially through each MatchCard.
  - The scroll container does not trap focus.
- Screen reader behavior: the list is announced as a list; each MatchCard is a list item. Section headers are announced as group labels.
- Motion: skeleton shimmer respects `prefers-reduced-motion` (static placeholder instead of animation). List item entrance animations are not required but, if present, must respect reduced motion.

---

## 5. Accessibility Requirements

- The list container has `role="list"` or uses a semantic list element.
- Each MatchCard is wrapped in a `role="listitem"`.
- Section headers use an appropriate heading level or `role="group"` with `aria-label`.
- Empty state has a descriptive accessible label.
- Loading state skeleton items have `aria-hidden="true"` or a single `aria-label` on the container describing the loading status.
- Reduced motion: no shimmer animation on skeletons; no entrance animations on items.

---

## 6. Theming Rules

- Required tokens: `background` (list container), `color` (section headers), separator/border token, skeleton shimmer color token, empty-state illustration tint.
- Prohibited hardcoded values: no raw colors, no pixel gaps or padding outside the token scale.
- Dark mode: all surfaces, section headers, separators, and skeleton placeholders must resolve via theme tokens.

---

## 7. Composition Rules

- What can wrap it: a tab screen, a drawer panel, or a full-screen layout.
- What it may contain: MatchCard components, optional section header elements, empty state content, loading skeleton rows.
- Anti-patterns:
  - Do not fetch data inside MatchList — it is a pure presentation component; data is passed as props.
  - Do not mix SwipeCard or ProfilePreviewCard inside MatchList.
  - Do not render MatchList without handling the empty state.

---

## 8. Performance Constraints

- MatchList must virtualize when the match count exceeds a threshold (approximately 20 items) to avoid off-screen rendering costs.
- Memoize MatchCard instances; avoid full-list re-renders on single-item updates.
- Skeleton placeholders must not cause layout shift when real content loads.
- Image loading within MatchCard items must use deferred/lazy loading to avoid blocking the initial list render.

---

## 9. Test Requirements

- Renders a list of MatchCard components corresponding to provided match data.
- Renders empty state when the matches array is empty.
- Renders loading skeleton when `isLoading` is true.
- Renders error state and retry action when `isError` is true.
- Section headers are rendered when sections are provided.
- List container has `role="list"`.
- Each item is a `role="listitem"`.
- Empty state has a descriptive accessible label.
- Loading skeletons are hidden from or clearly labeled for screen readers.
- No shimmer animation when `prefers-reduced-motion` is active.
- Passes automated accessibility audit.
