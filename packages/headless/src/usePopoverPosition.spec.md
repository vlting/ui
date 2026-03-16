# Spec — usePopoverPosition

> This is a non-visual utility hook. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this hook.

## 1. Purpose

- Calculates absolute positioning for floating content relative to a trigger element.
- Supports 8 placements (`top`, `bottom`, `left`, `right`, plus `-start`/`-end` variants) with automatic viewport flipping.
- Use when building popovers, tooltips, dropdowns, hover cards, or any floating UI.
- Do NOT use for context menus (position from cursor, not trigger element).

---

## 2. UX Intent

Pure positioning utility — computes `{top, left}` coordinates for floating content so it aligns with a trigger element. Automatically flips placement when content would overflow the viewport.

---

## 4. Behavior

- **8 placements:** `top`, `bottom`, `left`, `right`, `top-start`, `top-end`, `bottom-start`, `bottom-end`.
- `offset` controls the gap (in px) between trigger and content. Default: `8`.
- `computePosition()` calculates `{top, left}` from trigger/content `getBoundingClientRect()`.
- **Auto-flip:** If computed position is outside viewport, tries the flipped placement (e.g., `bottom` → `top`). Uses flipped only if it fits.
- `actualPlacement` reflects the final placement used (may differ from requested if flipped).
- `update()` recalculates position manually.
- Auto-calls `update()` when `isOpen` becomes `true`.
- Default placement: `bottom`. Default offset: `8`.

> **TypeScript is the source of truth for the API.** See `usePopoverPosition.ts` for the full typed signature.

---

## 5. Accessibility

No a11y responsibility. Focus management, ARIA attributes, and keyboard navigation are handled by consuming components.

---

## 7. Composition

- Used by Popover, Tooltip, HoverCard, DropdownMenu.
- Dependencies: React (`useState`, `useCallback`, `useEffect`). No external dependencies.
- Requires refs to both trigger and content elements.
- **Anti-patterns:** Do not call `update()` in a render loop. Do not use for scroll-position-based layouts.

---

## 8. Breaking Change Criteria

- Changing the return type shape (`{ position, actualPlacement, update }`).
- Changing Placement string values.
- Removing auto-flip behavior.
- Changing default `placement` or `offset` values.
- Removing auto-update on `isOpen` change.

---

## 9. Test Requirements

- **Lifecycle:** Calls update when `isOpen` becomes true. Does not call update when `isOpen` is false. Manual `update()` recalculates.
- **Return shape:** Returns `position {top, left}`, `actualPlacement` string, `update` function.
- **Basic placement:** Bottom placement positions below trigger (with mocked rects). Top placement positions above trigger.
- **Offset:** Offset adds gap between trigger and content.
- **Defaults:** Default placement is `bottom`, default offset is `8`.

> Viewport-flip logic has limited jsdom coverage. Requires browser test for full verification.
