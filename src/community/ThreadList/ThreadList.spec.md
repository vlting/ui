# Component Spec — ThreadList

## 1. Purpose

Renders an ordered or filtered list of community threads as a vertically stacked sequence of `ThreadCard` components. Supports sorting, loading states, empty states, and pagination or infinite scroll.

Use when: Displaying the main content feed of a community, a search result list of threads, or a filtered thread index.

Do NOT use when: Only a single thread is being shown (use the thread detail view), or the list contains non-thread content types.

---

## 2. UX Intent

- Primary interaction goal: Give users a clear, scannable overview of available community threads so they can quickly identify and open content relevant to their interests.
- Expected user mental model: A familiar forum index or feed list — similar to Reddit, Discourse, or Hacker News — with a linear, scannable layout where each item is a consistent preview card.
- UX laws applied:
  - Jakob's Law: Matches the standard community thread list pattern.
  - Serial Position Effect: Pinned threads appear at the top, followed by the sorted list, to ensure the most important content is immediately visible.
  - Doherty Threshold: Initial render and incremental loading of more threads must occur without perceptible delay.

---

## 3. Visual Behavior

- Layout: Vertical stack of `ThreadCard` items with consistent spacing. Pinned threads may have a distinct visual separator from the regular list. A sort/filter control may appear above the list.
- Spacing: Consistent vertical gap between cards using a spacing token. No gap variation between pinned and non-pinned groups beyond a section separator.
- Typography: The list itself has no typography of its own — it delegates to `ThreadCard`. Section headings (if any, e.g., "Pinned") use a small, secondary/muted label token.
- Token usage: List background, section separator color, section label text color — from theme tokens.
- Responsive behavior: Full-width on all breakpoints. Each `ThreadCard` adapts its own layout. The list does not impose a maximum width — that is the responsibility of the page layout.

---

## 4. Interaction Behavior

- States:
  - Idle with content: Displays thread cards.
  - Empty: Displays an empty state message (e.g., "No threads yet. Be the first to start a discussion.") with an optional call to action.
  - Loading (initial): Displays skeleton cards in place of content.
  - Loading more (pagination/infinite scroll): Displays a loading indicator at the bottom of the list.
  - Error: Displays an error state with a retry action.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the thread array, loading flags, and pagination callbacks.
- Keyboard behavior: Tab navigates through thread cards in DOM order. No special keyboard handling within the list itself — the cards handle their own keyboard interactions.
- Screen reader behavior: The list is a `<ul>` with `role="list"`. Each `ThreadCard` is a `<li>`. The list has an accessible label (e.g., "Community threads" or "Search results"). Empty and error states are announced via `aria-live`.
- Motion rules: New items loading in via infinite scroll fade in. Reduced motion: instant appearance.

---

## 5. Accessibility Requirements

- ARIA requirements: Container is a `<ul>` with `role="list"` and `aria-label`. Each item is a `<li>`. The empty state and error state are announced via an `aria-live="polite"` region. The loading more indicator has an `aria-label`.
- Focus rules: Tab order follows DOM order. No focus trapping. The load-more trigger (if a button) is focusable and reachable.
- Contrast expectations: Section labels and any list-level UI meet WCAG AA. Individual card contrast is the responsibility of `ThreadCard`.
- Reduced motion behavior: Item fade-in animations are suppressed.

---

## 6. Theming Rules

- Required tokens: list background, section separator border color, section label text color, empty state text color, loading indicator color, error state text and action colors.
- Prohibited hardcoded values: No hardcoded colors or spacing.
- Dark mode expectations: List background and section separators adapt to dark theme tokens.

---

## 7. Composition Rules

- What can wrap it: Placed below `CommunityHeader` and `TagFilterBar` within a community page layout.
- What it may contain: A sequence of `ThreadCard` items (pinned first, then sorted list). May contain a section label divider between pinned and regular threads. A load-more trigger or infinite scroll sentinel at the bottom. An empty state or error state.
- Anti-patterns:
  - Do not embed thread data-fetching inside this component.
  - Do not mix thread and non-thread content types within the same list.
  - Do not implement sorting/filtering logic inside this component — receive the sorted/filtered list from the parent.

---

## 8. Performance Constraints

- Memoization rules: The list should be memoized. Each `ThreadCard` must be memoized by thread ID. Only changed thread items should re-render on list updates.
- Virtualization: For large thread lists (50+ items), virtualized rendering is expected. The component must support being wrapped by a virtualized list context from the parent.
- Render boundaries: No data-fetching or sorting logic inside this component.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct number of `ThreadCard` items for the given data.
  - Renders pinned threads before non-pinned threads.
  - Renders the loading skeleton state.
  - Renders the empty state with the correct message.
  - Renders the error state with a retry action.
  - Renders the "loading more" indicator during pagination.
- Interaction cases:
  - Tab navigation moves through thread cards in order.
  - Load-more trigger fires the correct callback.
  - Retry button in error state fires the correct callback.
- Accessibility checks:
  - `<ul>` with `role="list"` and `aria-label` present.
  - `<li>` wrapper for each thread card.
  - Empty and error states announced via `aria-live`.
  - Reduced motion: item appearance animations suppressed.
