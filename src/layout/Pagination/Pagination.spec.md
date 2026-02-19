# Component Spec — Pagination

## 1. Purpose

Provides a navigation control that allows users to move between discrete pages of a dataset or content list. It communicates the current page, total number of pages, and offers controls to move forward, backward, or jump to a specific page.

Use when: a dataset is split across multiple pages and the user needs to navigate between them (tables, search results, galleries).

Do NOT use when: content should load continuously (use infinite scroll / VirtualizedList), or when the total count is small enough to display all items at once.

---

## 2. UX Intent

- Primary interaction goal: allow users to navigate large datasets without overwhelming the current view.
- Expected user mental model: a book's page numbers — the user knows their position in a sequence and can jump to any page.
- UX laws applied:
  - Hick's Law: limit the number of page buttons visible at once (windowed pagination) to reduce decision time.
  - Fitts's Law: previous/next buttons and page number targets must be large enough to tap reliably on touch devices.
  - Miller's Law: show a limited window of page numbers (e.g., 5–7) rather than all pages simultaneously.

---

## 3. Visual Behavior

- Renders as a horizontal row of page controls: a previous button, a windowed set of page number buttons, and a next button.
- Ellipsis indicators are shown when the full page range is truncated.
- The current page button is visually distinguished (filled/highlighted background using a primary color token).
- Previous and next buttons are disabled when at the first and last page respectively; disabled state uses a muted token.
- Spacing between controls uses space tokens; button sizing uses size tokens.
- On small breakpoints, the page number window shrinks; only previous/next and the current page may be shown.
- Typography for page numbers uses a body/label scale token.

---

## 4. Interaction Behavior

- Controlled pattern: current page is driven by a `page` prop with an `onPageChange` callback. An uncontrolled `defaultPage` mode may be supported.
- Clicking a page number calls `onPageChange` with the target page number.
- Clicking previous/next calls `onPageChange` with `currentPage - 1` or `currentPage + 1`.
- Previous button is non-interactive (disabled) on page 1; next button is non-interactive on the last page.
- Keyboard behavior:
  - Tab moves focus through previous button, page number buttons, and next button in order.
  - Enter/Space activates the focused button.
  - Left/Right arrow keys may move focus between page buttons when focus is within the page number group.
- Screen reader behavior: the pagination region is wrapped in a `<nav>` with an accessible label. The current page button carries `aria-current="page"`. Previous/next buttons have descriptive accessible labels.
- Motion: no animation by default; page transitions are driven by the consumer.

---

## 5. Accessibility Requirements

- The root element carries `role="navigation"` (via `<nav>`) with `aria-label="Pagination"` or equivalent.
- The active page button carries `aria-current="page"`.
- Previous and next buttons must have accessible labels (not just arrow glyphs): "Previous page", "Next page".
- Disabled buttons carry `aria-disabled="true"` and are excluded from the tab order.
- Ellipsis indicators are hidden from the accessibility tree (`aria-hidden="true"`) or described as "more pages".
- Color contrast for all interactive and text elements must meet WCAG AA.
- Do not convey current page position through color alone.

---

## 6. Theming Rules

- Required tokens: primary color token for active page, background/surface token for inactive pages, border color, muted color for disabled state, space tokens for gap and padding, size tokens for button dimensions, typography token for page labels.
- Prohibited: no hardcoded colors, px dimensions for spacing or button size, or raw font-size values.
- Dark mode: all tokens must resolve to appropriate dark-theme values automatically.

---

## 7. Composition Rules

- Pagination is a standalone control placed outside the list or table it paginates.
- It does not manage or own the data — page state is lifted to the consumer.
- May be composed above or below a data table, list, or gallery.
- Anti-patterns:
  - Do not embed data fetching or list rendering inside Pagination.
  - Do not use Pagination for content that supports infinite scroll.
  - Do not hardcode page count — it must always be driven by a prop.

---

## 8. Performance Constraints

- Stateless when controlled; no memoization required by the component itself.
- The page number window calculation must be deterministic and not cause re-renders of unrelated components.
- No virtualization applicable to the pagination control itself.

---

## 9. Test Requirements

- Renders the correct number of visible page buttons for a given `totalPages` and `page`.
- Highlights the active page with `aria-current="page"`.
- Disables the previous button on page 1.
- Disables the next button on the last page.
- Calls `onPageChange` with the correct page number when a page button is clicked.
- Calls `onPageChange` with `page - 1` when previous is clicked.
- Calls `onPageChange` with `page + 1` when next is clicked.
- Does not call `onPageChange` when a disabled button is activated.
- Navigation element has correct `aria-label`.
- Ellipsis is present and `aria-hidden` when page range is truncated.
- Keyboard navigation moves focus through all interactive elements.
- Renders correctly in light and dark themes.
