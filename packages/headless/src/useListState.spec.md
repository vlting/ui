# Spec — useListState

> This is a non-visual utility hook. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this hook.

## 1. Purpose

- Manages highlight and selection state for list-like components (listboxes, menus, combobox dropdowns).
- Provides keyboard navigation (ArrowUp/Down, Home/End, Enter), mouse interaction (hover highlights, click selects), and ARIA prop-getters.
- Do NOT use for flat data display without selection. Do NOT use for tree structures (different keyboard model).

---

## 2. UX Intent

Gives list-like components consistent keyboard and pointer interaction. Users can navigate with arrows, jump with Home/End, and select with Enter or click — matching WAI-ARIA listbox expectations.

---

## 4. Behavior

- `highlightIndex` tracks the currently highlighted item (default: `defaultHighlightIndex ?? 0`).
- `highlightedItem` is derived: `items[highlightIndex]`.
- Keyboard navigation via `onKeyDown`:
  - **ArrowDown:** move highlight forward (+1)
  - **ArrowUp:** move highlight backward (-1)
  - **Home:** jump to first item (index 0)
  - **End:** jump to last item (index `items.length - 1`)
  - **Enter:** select the highlighted item (calls `onSelect(item, index)`)
- All keyboard events call `e.preventDefault()`.
- `loop` option (default `false`): when true, ArrowDown at last item wraps to first, ArrowUp at first wraps to last. When false, clamps at boundaries.
- Mouse: `onMouseEnter` on an item highlights it. `onClick` selects it.
- `getListProps()` returns container props: `{ role: 'listbox', onKeyDown }`.
- `getItemProps(index)` returns item props: `{ role: 'option', 'aria-selected', onMouseEnter, onClick }`.
- Standalone `onKeyDown` is kept for backwards compatibility but `getListProps` is the preferred API.

> **TypeScript is the source of truth for the API.** See `useListState.ts` for the full typed signature. Do not duplicate type tables here.

---

## 5. Accessibility

- Container: `role="listbox"` via `getListProps()`.
- Items: `role="option"` + `aria-selected` via `getItemProps(index)`.
- `aria-selected` is `true` only on the highlighted item (WCAG 4.1.2).
- Keyboard support follows WAI-ARIA Listbox pattern.

---

## 7. Composition

- Used by Select, Combobox, Menu components.
- Dependencies: React (`useState`, `useCallback`). No external dependencies.
- **DX Note / Tech Debt:** `onKeyDown` handler reimplements keyboard navigation logic that exists in `useKeyboardNavigation`. Should compose `useKeyboardNavigation` in a future refactor.
- **Anti-patterns:** Do not mutate `items` array between renders without resetting highlight index. Do not use for multi-select (not yet supported).

---

## 8. Breaking Change Criteria

- Changing `getItemProps` return shape (adding/removing keys).
- Changing `getListProps` return shape.
- Changing keyboard key bindings or removing `e.preventDefault()`.
- Removing `onSelect` callback or changing its signature.
- Changing loop boundary behavior.

---

## 9. Test Requirements

- **Highlight management:** Default highlight at index 0. `setHighlightIndex` updates highlight. `highlightedItem` reflects correct item.
- **Keyboard navigation:** ArrowDown moves forward, ArrowUp moves backward, Home goes to first, End goes to last, Enter selects highlighted item (calls onSelect).
- **Loop behavior:** `loop=false` clamps at boundaries. `loop=true` wraps around.
- **Mouse interaction:** mouseEnter highlights item. Click selects item.
- **Accessibility:** `getListProps` returns `role="listbox"`. `getItemProps` returns `role="option"`. `aria-selected` true only on highlighted item.
- **Prop-getters:** `getListProps` includes `onKeyDown`. `getItemProps` returns correct shape for each index.
