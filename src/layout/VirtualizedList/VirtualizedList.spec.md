# Component Spec — VirtualizedList

## 1. Purpose

Provides a scrollable list container that renders only the items currently visible in the viewport, enabling efficient display of large datasets without degrading performance.

Use when: a list contains more items than can be comfortably rendered simultaneously (typically hundreds or thousands of items).

Do NOT use when: the list is short (under ~50 items) and full rendering imposes no performance cost — use a standard mapped list instead.

---

## 2. UX Intent

- Primary interaction goal: deliver a seamless, fast-scrolling list experience regardless of dataset size.
- Expected user mental model: a normal scrollable list — users should not perceive any windowing mechanism; scrolling must feel native and continuous.
- UX laws applied:
  - Doherty Threshold: items must render fast enough during scroll that the user never sees blank space or layout shift.
  - Fitts's Law: scroll area and individual list items must have adequate touch targets.
  - Tesler's Law: the complexity of windowing and item recycling is absorbed by the component; consumers provide data and a render function.

---

## 3. Visual Behavior

- Renders as a scrollable container with a defined height (size token or `flex: 1` to fill available space).
- Only items within (and slightly outside) the visible viewport are rendered — a configurable overscan buffer prevents visible blank regions during fast scrolling.
- Item height may be fixed (uniform) or variable; the component handles layout calculation for both cases.
- A loading indicator (spinner or skeleton rows) is shown at the bottom when more items are being fetched (infinite scroll pattern).
- Empty state slot is shown when the data array is empty.
- Scroll position is preserved when items are added to the list without resetting to the top.
- No horizontal scrolling by default; horizontal virtualization is opt-in.

---

## 4. Interaction Behavior

- Scroll is the primary interaction; native scroll is used for performance (no custom scroll simulation).
- Supports pull-to-refresh on touch devices (opt-in via prop) — the refresh gesture triggers an `onRefresh` callback.
- Supports infinite scroll: an `onEndReached` callback fires when the user scrolls near the bottom threshold.
- Item press events are delegated to the rendered item component; VirtualizedList does not handle item selection itself.
- Keyboard behavior:
  - Arrow Up / Down moves focus between list items when focus is within the list.
  - Page Up / Page Down scrolls the list by a viewport-height increment.
  - Home / End scrolls to the top or bottom of the list.
- Screen reader behavior: the list carries `role="list"` (or equivalent); each rendered item carries `role="listitem"`. Only rendered items are in the accessibility tree — screen readers navigate the visible window.
- Motion: scroll animation respects native platform behavior; pull-to-refresh animation respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- The container carries `role="list"` or equivalent; rendered items carry `role="listitem"`.
- An `aria-label` or `aria-labelledby` describes the list content (e.g., "Search results", "User list").
- If items are selectable, selected items carry `aria-selected="true"`.
- Loading indicator at the bottom carries `aria-label="Loading more items"` and `aria-live="polite"`.
- Empty state carries descriptive text readable by screen readers.
- Focus management: if the list is refocused after an external action, focus returns to the last focused item or the first item.
- Pull-to-refresh trigger must have an accessible label if exposed as a visible affordance.

---

## 6. Theming Rules

- Required tokens: surface/background token for the list container, space tokens for item padding (applied to item wrappers), border/divider token for optional item separators.
- Loading indicator uses the same spinner or skeleton token as the rest of the design system.
- Prohibited: no hardcoded colors, pixel heights for the container, or raw padding values.
- Dark mode: container background and item separator tokens must resolve correctly in dark themes.

---

## 7. Composition Rules

- The consumer provides a data array and a `renderItem` render function; VirtualizedList does not dictate item structure.
- May be composed inside a Sidebar, main content area, or any scrollable region.
- Pull-to-refresh and infinite scroll are opt-in behaviors, not always-on.
- Anti-patterns:
  - Do not use VirtualizedList for short lists — the overhead of windowing is not justified.
  - Do not place VirtualizedList inside another scroll container on the same axis — nested scroll conflicts cause poor UX.
  - Do not manage item mounting/unmounting externally — let the component control the render window.

---

## 8. Performance Constraints

- Only visible items (plus overscan buffer) are mounted in the DOM/native tree at any time.
- Item components rendered via `renderItem` should be memoized by the consumer to prevent unnecessary re-renders during scroll.
- Key extraction must be stable and unique per item to prevent reconciliation issues.
- List-level state changes (selection, filter) must not reset scroll position unless explicitly required.
- `onEndReached` must be debounced internally to prevent multiple simultaneous fetch calls.

---

## 9. Test Requirements

- Renders only the visible items (plus overscan) for a large dataset.
- Renders an empty state when data is an empty array.
- Fires `onEndReached` when scrolled to the bottom threshold.
- Fires `onRefresh` when a pull-to-refresh gesture is performed.
- Scroll position is maintained when new items are appended to the list.
- `role="list"` is on the container; `role="listitem"` is on rendered item wrappers.
- `aria-label` is applied to the container.
- Loading indicator is visible and announced when `loading` prop is true.
- Keyboard arrow navigation moves focus through list items.
- Renders correctly in light and dark themes.
