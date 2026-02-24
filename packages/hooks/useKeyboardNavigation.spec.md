# Spec — useKeyboardNavigation

> This is a non-visual utility hook. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this hook.

## 1. Purpose

- Standard keyboard navigation handler for list-like and grid-like composite widgets (listboxes, menus, tabs, toolbars).
- Use when building any component containing a set of navigable items requiring arrow key, Home/End, and Enter/Space support.
- Do NOT use for free-form text input navigation. Do NOT use for single interactive elements outside a collection.

---

## 2. UX Intent

- Enables keyboard-only users to navigate collections using familiar arrow key patterns, matching WAI-ARIA Authoring Practices for composite widgets.
- Three orientation modes (`vertical`, `horizontal`, `both`) map the correct arrow keys based on visual layout.
- Loop behavior (default) prevents dead-ends — users can cycle continuously through items.
- Home/End keys allow fast jumps, supporting efficient navigation in long lists.

---

## 4. Behavior

- **Vertical orientation** (default): ArrowUp = previous, ArrowDown = next.
- **Horizontal orientation:** ArrowLeft = previous, ArrowRight = next.
- **Both orientation:** All four arrow keys active — Up/Left = backward, Down/Right = forward.
- **Loop enabled** (default): Wraps from last to first and first to last.
- **Loop disabled:** Clamps at boundaries (0 and `items - 1`).
- **Home key:** Sets active index to 0.
- **End key:** Sets active index to `items - 1`.
- **Enter/Space:** Invokes `onSelect` callback with current `activeIndex`. Does not change index.
- **Unhandled keys:** Pass through without side effects or `preventDefault`.
- **preventDefault:** Called on all handled keys to prevent browser scrolling.

> **TypeScript is the source of truth for the API.** See `useKeyboardNavigation.ts` for the full typed signature. Do not duplicate type tables here.

---

## 5. Accessibility

- **WAI-ARIA keyboard interaction:** Implements standard arrow key navigation for composite widgets (listbox, menu, tabs, toolbar patterns).
- **Orientation-aware key mapping:** Arrow keys match the widget's declared orientation.
- **Home/End support:** Required by WAI-ARIA for composite widgets.
- **Enter/Space activation:** Required by WAI-ARIA for item selection/activation.
- **preventDefault on handled keys:** Prevents browser scrolling during widget navigation.

---

## 7. Composition

- Intended for use inside list and collection components: Listbox, Menu, Tabs, Toolbar, Select, CommandPalette.
- The returned handler must be attached as `onKeyDown` on the container element.
- The consuming component manages `activeIndex` state and passes it to this hook.
- Dependencies: React (`useCallback`). No external dependencies.
- **Anti-patterns:** Do not use for tree views with nested depths. Do not pass `items: 0`. Do not attach the handler to individual items — it must be on the container.

---

## 8. Breaking Change Criteria

- Changing the key mapping for any orientation.
- Removing Home/End or Enter/Space support.
- Changing loop default from `true`.
- Changing the return type from `(e: React.KeyboardEvent) => void`.
- Removing `preventDefault` on handled keys.

---

## 9. Test Requirements

- **Vertical navigation:** Verify ArrowDown increments and ArrowUp decrements.
- **Horizontal navigation:** Verify ArrowRight increments and ArrowLeft decrements.
- **Both orientation:** Verify all four arrow keys work.
- **Loop wrapping:** Verify wrap from last to first and first to last.
- **Clamping without loop:** Verify clamp at 0 and `items - 1` when `loop: false`.
- **Home/End:** Verify Home sets index to 0, End sets to `items - 1`.
- **Enter/Space:** Verify `onSelect` is called and `setActiveIndex` is not.
- **preventDefault:** Verify called for handled keys, not for unhandled.
- **Unhandled keys:** Verify no state change for keys like `a`, `Escape`.
- **Single item:** Verify `items = 1` does not produce invalid indices.
