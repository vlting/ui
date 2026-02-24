> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Pagination

## 1. Purpose

- Renders page navigation controls for paginated content.
- Use when content is split across multiple pages and the user needs to navigate between them.
- Do NOT use for infinite scroll or load-more patterns — those do not need page indicators.

---

## 2. UX Intent

- **Primary interaction goal:** Navigate to a specific page of results.
- **Expected user mental model:** A row of numbered page buttons with previous/next arrows, where the current page is visually highlighted.
- **UX laws applied:**
  - **Fitts's Law** — buttons are appropriately sized via `size` variant with minimum width maps.
  - **Hick's Law** — `siblingCount` limits visible page numbers; ellipsis signals hidden pages.
  - **Jakob's Law** — follows the standard pagination pattern (prev / 1 ... 4 5 6 ... 20 / next).

---

## 3. Anatomy

- **Pagination** (Root) — `<nav>` wrapper with `role="navigation"` and `aria-label`.
- **Pagination.Previous** — Button to go to the previous page.
- **Pagination.Next** — Button to go to the next page.
- **Pagination.Item** — Individual page number button.
- **Pagination.Ellipsis** — Non-interactive indicator for omitted page ranges.

All sub-components are required for a complete pagination UI; Ellipsis is auto-rendered based on page range logic.

> **TypeScript is the source of truth for props.** See `PaginationProps` in `Pagination.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Idle** — Page buttons displayed; current page highlighted with active variant styling.
- **Hover** — Individual page buttons show hover feedback via Tamagui Button hover styles.
- **Focus** — Standard focus ring on each focusable button (see QUALITY_BASELINE.md).
- **Disabled** — Previous button disabled on page 1; Next button disabled on last page (opacity reduction, no pointer events).

### Keyboard Interaction

- **Tab** — Moves focus between Previous, page items, and Next buttons.
- Native `<button>` semantics provide Enter/Space activation.

### Motion

- No animations defined. Stateless navigation.

---

## 5. Accessibility

- **Semantic element:** `<nav>` landmark via `role="navigation"`.
- **ARIA attributes:** `aria-label` on root (defaults to "Pagination"), `aria-current="page"` on the active page item, `aria-label` on Previous/Next buttons.
- **Focus management:** No programmatic focus movement; standard tab order.
- **Screen reader announcements:** Active page identified by `aria-current="page"`. Previous/Next buttons have descriptive labels.

---

## 6. Styling

- **Design tokens used:** Button styling via `navVariant`, `pageVariant`, `activePageVariant` props delegated to the Button component. Size variant maps (`sm`/`md`/`lg`) control minimum button width.
- **Responsive behavior:** XStack layout wraps naturally; size variant can be changed per breakpoint.
- **Dark mode:** Inherits from Button component theme tokens.

---

## 7. Composition

- **What can contain this component:** Any page layout, typically at the bottom of a list or table.
- **What this component can contain:** Only its own sub-components (Previous, Next, Item, Ellipsis).
- **Anti-patterns:** Do not nest Pagination inside another Pagination. Do not use as a tab bar or stepper.

---

## 8. Breaking Change Criteria

- Removing or renaming any sub-component (Previous, Next, Item, Ellipsis).
- Removing the `size`, `currentPage`, `totalPages`, or `onPageChange` props.
- Changing the root element from `<nav>`.
- Removing `aria-current="page"` from the active item.
- Changing the page range computation algorithm (siblingCount behavior).

---

## 9. Test Requirements

- **Behavioral tests:** Correct page range rendering with various `totalPages`/`siblingCount` combinations; Previous disabled on page 1; Next disabled on last page; `onPageChange` called with correct page number.
- **Accessibility tests:** `role="navigation"` on root; `aria-current="page"` on active item; Previous/Next have `aria-label`; disabled state prevents activation.
- **Visual regression:** Default, first page, last page, many pages with ellipsis.
