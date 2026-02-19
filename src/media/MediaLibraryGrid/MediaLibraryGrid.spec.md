# Component Spec — MediaLibraryGrid

## 1. Purpose

Renders a responsive grid of media assets, typically composed of `MediaCard` instances, for browsing and selecting items from a media library.

Use when: displaying a collection of media assets in a grid layout for selection, management, or browsing.

Do NOT use when: displaying a single media item (use `MediaCard` or `MediaViewerModal`) or a flat list (use a list component).

---

## 2. UX Intent

- Primary interaction goal: allow users to scan a large collection of media assets efficiently and select one or more items.
- Expected user mental model: a file browser grid — consistent column widths, uniform card sizes, scannable thumbnails.
- UX laws applied:
  - **Gestalt (Similarity, Proximity)** — uniform card sizes and spacing create a coherent grid that is easy to scan.
  - **Miller's Law** — pagination or infinite scroll limits the number of cards rendered at once.
  - **Hick's Law** — filters and sorting (provided externally) reduce the decision set.
  - **Fitts's Law** — cards must be large enough for comfortable tap targets.

---

## 3. Visual Behavior

- Layout: a CSS/flex grid with responsive column counts; column count adjusts based on viewport width via responsive tokens.
- All cells maintain a consistent width; card heights are determined by the `MediaCard` aspect ratio.
- An empty state is shown when no media items are provided.
- A loading state is shown while items are being fetched; skeleton cards occupy grid cells.
- Spacing: gutters between cards reference space tokens.
- Token usage: grid background and empty state text colors reference theme tokens only.
- Responsive behavior: 2 columns on narrow viewports, scaling up to 4+ columns on wider viewports; column count is configurable via props.

---

## 4. Interaction Behavior

- States:
  - **idle**: grid renders all provided media cards.
  - **loading**: skeleton cards fill the grid.
  - **empty**: a meaningful empty state message is displayed.
  - **error**: an error state communicates that media could not be loaded.
- Selection of individual items is managed by child `MediaCard` components; the grid passes selection state and callbacks down.
- Controlled/uncontrolled: selected item IDs are controlled externally.
- Keyboard behavior: focus moves through cards in reading order; arrow keys may navigate the grid in two dimensions if implemented.
- Screen reader behavior: the grid is announced as a list or grid with item count; each card is individually focusable.
- Motion rules: loading skeleton transitions and entrance animations respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA: grid container uses `role="grid"` or `role="list"` with appropriate child roles; item count communicated via `aria-label` or `aria-rowcount`/`aria-colcount`.
- Each grid cell is individually focusable and keyboard-navigable.
- Empty and error states must be announced to screen readers.
- Focus order matches visual reading order (left to right, top to bottom for LTR; right to left for RTL).
- Reduced motion: suppress grid entrance animations and skeleton shimmer.

---

## 6. Theming Rules

- Required tokens: `background`, `space` (gutter), `color` (empty state text), `colorMuted`.
- Prohibited hardcoded values: no literal column counts, pixel gutters, or color strings.
- Dark mode: empty state and background tokens must resolve correctly in dark themes.

---

## 7. Composition Rules

- Renders a collection of `MediaCard` instances passed as children or as a data array via props.
- Consumer is responsible for pagination, infinite scroll, and filtering; the grid only renders what it receives.
- `MediaTagFilter` may be composed above the grid by the consumer.
- Anti-patterns:
  - Do not fetch media data inside the grid component.
  - Do not implement filtering or search logic inside the grid.
  - Do not hardcode column counts without providing a responsive override mechanism.

---

## 8. Performance Constraints

- Virtualize long lists of media cards to avoid rendering off-screen DOM nodes; use windowing when the item count exceeds a defined threshold.
- Skeleton loading cards must not cause layout shift when real cards replace them.
- Memoize the grid when the item list is stable.

---

## 9. Test Requirements

- Renders the correct number of media cards from props.
- Renders skeleton cards in loading state.
- Renders an empty state message when no items are provided.
- Renders an error message when the error state is set.
- Grid responds to column count prop.
- Focus moves through cards in reading order.
- Screen reader announces the grid with correct item count.
- RTL layout renders cards in right-to-left order.
- Passes axe accessibility audit in idle, loading, and empty states.
