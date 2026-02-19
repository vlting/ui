# Component Spec — InfiniteFeedList

## 1. Purpose

Displays a continuously scrolling list of social feed items (posts, updates, activities) that loads additional content as the user approaches the end of the current list. Enables the exploration of a large or growing dataset without explicit pagination controls.

Use when: presenting a social feed, activity stream, or any content list that grows incrementally and should not require manual page navigation.

Do NOT use when: the dataset is finite and small (use a standard list), or when the user benefits from explicit pagination controls and the ability to navigate directly to a specific page (use a paginated list instead).

---

## 2. UX Intent

- Primary interaction goal: Allow users to scroll continuously through a feed of content without encountering a hard stop, while keeping load times imperceptible.
- Expected user mental model: Users expect infinite scroll to behave like Instagram, Twitter/X, or LinkedIn — new content appears seamlessly as they scroll down (Jakob's Law). There is no visible page boundary.
- UX laws applied:
  - Jakob's Law: Match the infinite scroll behavior from established social platforms.
  - Doherty Threshold: New content must load and render within 400ms of the trigger point. A loading indicator is shown if it takes longer to prevent the user from thinking they have reached the end.
  - Gestalt (Continuity): The feed flows as a single continuous stream. Items are visually consistent and evenly spaced.
  - Hick's Law: No pagination controls are shown; the only decision the user makes is whether to keep scrolling.

---

## 3. Visual Behavior

- Layout rules:
  - A vertical list of feed items, each occupying the full width of the container.
  - Items are separated by a consistent gap or divider using space tokens.
  - A loading indicator (spinner or skeleton) appears below the last item while new content is fetching.
  - An end-of-feed message is displayed when no more content is available.
  - An empty state is displayed when the feed has no items at all.
- Spacing expectations: Inter-item gap uses a medium space token. The loading indicator area has consistent padding above and below using a medium space token.
- Typography rules: Typography is determined by the content components (PostCard, etc.) rendered inside the list. The end-of-feed message uses a body or caption token in secondary color.
- Token usage: List background, divider, loading indicator, and end-of-feed text must use design tokens.
- Responsive behavior: The list fills the full width of its container. On wide viewports, an optional max-width constraint may center the content. On narrow viewports, item padding adjusts using responsive token values.

---

## 4. Interaction Behavior

- States:
  - Idle: Feed items visible, no load in progress.
  - Loading more: A loading indicator appears below the last item.
  - Empty: An empty state message is shown.
  - End of feed: An "You're all caught up" or similar terminal message is shown.
  - Error: An error message with a retry action appears when loading fails.
- Controlled vs uncontrolled: The list of items and loading state are controlled props. The parent manages data fetching; InfiniteFeedList fires a callback when the user approaches the end of the list.
- Keyboard behavior:
  - Tab moves focus through all interactive items in DOM order.
  - No special infinite scroll keyboard shortcuts; the user scrolls with Page Down or the scroll equivalent.
  - A "Load more" button must be available as a keyboard-accessible fallback for users who cannot scroll.
- Screen reader behavior:
  - The feed list uses `role="feed"` with `aria-label`.
  - New items appended to the feed are announced via `aria-live="polite"`.
  - The loading state is communicated via `aria-busy="true"` on the list.
  - The end-of-feed message is announced as a live region update.
  - A "Load more" button is the primary keyboard-accessible trigger, not the scroll event.
- Motion rules: Item entrance may use a brief fade-in. Loading skeleton uses a shimmer animation. All motion is suppressed under reduced motion preference.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - The list uses `role="feed"` with `aria-label` (e.g., "Social feed") and `aria-busy` reflecting loading state.
  - Each feed item uses `role="article"`.
  - A visible and keyboard-accessible "Load more" button serves as the fallback for infinite scroll trigger.
  - Error message uses `role="alert"`.
  - End-of-feed message uses `aria-live="polite"`.
- Focus rules: Focus flows through items in DOM order. When new items are appended, focus must not move unexpectedly. The "Load more" button is a clear Tab stop.
- Contrast expectations: All content within feed items inherits from the item component specs (PostCard, etc.). The end-of-feed message and "Load more" button must meet 4.5:1.
- Reduced motion behavior: Item entrance fade and skeleton shimmer are disabled.

---

## 6. Theming Rules

- Required tokens: list background, divider color, loading indicator color, end-of-feed text color, error text color, focus ring.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: List background and divider tokens shift to dark-mode values. Loading indicator and end-of-feed text tokens resolve correctly in dark mode.

---

## 7. Composition Rules

- What can wrap it: A full-page feed view, a tab panel within a social app, or a scrollable container within a larger layout.
- What it may contain: A list of PostCard, CommentThread, or other feed-item components. A loading indicator. An end-of-feed message. An empty state. A "Load more" button.
- Anti-patterns:
  - Do not use InfiniteFeedList for small finite datasets — use a standard list.
  - Do not rely solely on scroll position detection for loading; always provide a keyboard-accessible "Load more" button.
  - Do not nest InfiniteFeedList inside another scrollable container that conflicts with the outer scroll event.

---

## 8. Performance Constraints

- Memoization rules: Individual feed items must be memoized. Appending new items must not re-render existing items.
- Virtualization: InfiniteFeedList must use virtualized rendering. Items scrolled far out of view must be unmounted or recycled to prevent memory and rendering degradation.
- Render boundaries: The list container and the loading indicator are independent render boundaries. Loading state changes must not re-render existing feed items.

---

## 9. Test Requirements

- What must be tested:
  - Feed items render from the supplied data array.
  - Empty state renders when the data array is empty.
  - Loading indicator renders when the loading state is active.
  - End-of-feed message renders when no more items are available.
  - Error state renders with retry action when loading fails.
  - The "load more" callback fires when the user approaches the end of the list.
- Interaction cases:
  - The "Load more" button is Tab-accessible and activates with Enter/Space.
  - Retry button in error state fires the load callback.
  - Tab moves through all interactive items in DOM order.
- Accessibility checks:
  - `role="feed"` with `aria-label` and `aria-busy` are present.
  - Each item has `role="article"`.
  - New items are announced via `aria-live="polite"`.
  - Error uses `role="alert"`.
  - "Load more" button is keyboard-accessible.
  - Focus does not move unexpectedly when items are appended.
  - Reduced motion suppresses entrance and shimmer animations.
