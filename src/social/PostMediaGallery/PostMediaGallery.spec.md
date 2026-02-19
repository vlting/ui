# Component Spec — PostMediaGallery

## 1. Purpose

Displays one or more media attachments (images, videos) associated with a social post in a responsive grid or carousel layout. Supports single-item full-width display, multi-item grid layouts, and overflow handling when more media items exist than the visible grid capacity.

Use when: a post contains media attachments that need to be displayed inline within a PostCard or a post detail view.

Do NOT use when: displaying documents or non-visual file attachments (use a file attachment component), or when media is unrelated to a social post context.

---

## 2. UX Intent

- Primary interaction goal: Allow users to preview attached media at a glance within the post, and activate individual items for a full-screen or expanded view.
- Expected user mental model: Users expect a social media gallery to behave like the photo grids on Instagram, Twitter/X, or Facebook — a responsive mosaic where tapping opens a lightbox or full-screen viewer (Jakob's Law).
- UX laws applied:
  - Jakob's Law: Follow the 1-4 item grid layout conventions established by major social platforms.
  - Gestalt (Similarity and Proximity): Gallery items form a cohesive group with consistent spacing and rounded corners.
  - Fitts's Law: Each media item must be a clear, large tap/click target. The "+N more" overlay must be large enough to tap without precision.
  - Hick's Law: Show a maximum of 4 items in the inline preview grid; collapse remaining items into a "+N" overflow indicator.

---

## 3. Visual Behavior

- Layout rules:
  - 1 item: Single item at full width with a fixed aspect ratio (16:9 or 4:3 recommended).
  - 2 items: Two equal-width items side by side.
  - 3 items: One wide item on the left, two stacked items on the right.
  - 4 items: 2x2 grid of equal-size items.
  - 5+ items: 4 visible items in a 2x2 grid; the 4th item has a "+N more" overlay indicating remaining items.
  - All items have rounded corners using a radius token and a consistent gap between items.
- Spacing expectations: Gap between gallery items uses a small space token. The gallery fills the full width of the PostCard content area.
- Typography rules: The "+N more" overlay text uses a heading or label token at medium weight, centered within the item.
- Token usage: Gap, radius, overlay background, overlay text color, and focus ring must use design tokens.
- Responsive behavior: On narrow viewports, items maintain their aspect ratios and scale down proportionally. The grid layout adapts: 2-column layouts may collapse to stacked on very narrow viewports.

---

## 4. Interaction Behavior

- States:
  - Idle: Gallery items displayed at their static sizes.
  - Hover (web): Individual item shows a subtle brightness overlay on hover.
  - Focus: Visible focus ring around the focused item.
  - Pressed: Brief opacity or scale feedback.
  - "+N more" overlay: The 4th item in an overflow gallery is partially obscured by a semi-transparent overlay with the count.
  - Loading: Items show a skeleton placeholder before the media loads.
  - Error: If a media item fails to load, a placeholder with an error icon is shown.
- Controlled vs uncontrolled: The media list and expand callback are controlled by the parent. PostMediaGallery fires a callback with the item index when a media item is activated.
- Keyboard behavior:
  - Tab moves focus through each gallery item.
  - Enter or Space activates the focused item (opens the expanded/lightbox view).
  - The "+N more" overlay item is a focusable, activatable control.
- Screen reader behavior:
  - The gallery uses `role="list"` with each item as `role="listitem"`.
  - Each media item has an `aria-label` describing the media (e.g., "Photo 1 of 5: [alt text]").
  - The "+N more" item has `aria-label` (e.g., "View 3 more photos").
  - Video items indicate they are videos in their accessible label.
- Motion rules: Loading skeleton uses a shimmer animation. Hover brightness transition is brief (under 100ms). Reduced motion suppresses shimmer and hover transition.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - Gallery: `role="list"` with `aria-label` (e.g., "Post photos").
  - Each item: `role="listitem"` containing an interactive element (`role="button"` or `<button>`).
  - Images must have descriptive `alt` text. If the author did not provide alt text, a fallback like "Photo by [author]" is used.
  - Videos must indicate they are videos in their accessible label.
  - "+N more" control: `aria-label` (e.g., "View 3 more media items").
- Focus rules: All gallery items and the "+N more" control are in the Tab order. Focus ring must be clearly visible.
- Contrast expectations: The "+N more" overlay text must meet 4.5:1 against the overlay background. Error state placeholder must be perceivable in both themes.
- Reduced motion behavior: Shimmer and hover transitions are disabled.

---

## 6. Theming Rules

- Required tokens: gallery gap, item radius, overlay background (semi-transparent), overlay text color, skeleton background, error placeholder background and icon color, focus ring.
- Prohibited hardcoded values: No hardcoded hex colors, pixel gaps, border radii, or overlay opacity values as hardcoded numbers outside the token system.
- Dark mode expectations: Overlay background and error placeholder adapt to dark mode. The gallery gap and radius tokens remain consistent. Focus ring is visible on dark backgrounds.

---

## 7. Composition Rules

- What can wrap it: PostCard.Media section. May also be used in a post detail page outside of a PostCard.
- What it may contain: Image items, video items, and a "+N more" overflow control.
- Anti-patterns:
  - Do not display more than 4 items in the inline gallery without an overflow control.
  - Do not use PostMediaGallery for non-media file attachments.
  - Do not hardcode grid layout ratios; all proportions must be derived from token-based design constraints.

---

## 8. Performance Constraints

- Memoization rules: The gallery must be memoized. Media item components must be individually memoized. Loading or error state updates to one item must not re-render siblings.
- Virtualization: Not applicable — galleries display at most 4 visible items.
- Render boundaries: Each media item is an independent render boundary. Loading state per item is isolated.

---

## 9. Test Requirements

- What must be tested:
  - 1-item layout renders a single full-width item.
  - 2-item layout renders two equal-width items.
  - 3-item layout renders one wide and two stacked items.
  - 4-item layout renders a 2x2 grid.
  - 5+-item layout renders 4 items with a "+N more" overlay on the 4th.
  - Each item fires the activate callback with the correct index.
  - Error state renders a placeholder when a media item fails to load.
  - Skeleton renders while items are loading.
- Interaction cases:
  - Tab moves focus through each gallery item and the "+N more" control.
  - Enter/Space on a focused item fires the activate callback.
- Accessibility checks:
  - Gallery has `role="list"` with accessible label.
  - Each item has an accessible label including alt text.
  - "+N more" has an accessible label with the count.
  - Focus ring is visible on all focusable items.
  - Overlay text contrast passes 4.5:1.
  - Reduced motion suppresses shimmer and hover animations.
