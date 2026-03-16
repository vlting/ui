# Spec — useRovingTabIndex

> This is a non-visual utility hook. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this hook.

## 1. Purpose

- Roving tabindex for composite widgets: tablists, toolbars, menus, listboxes.
- Only the active item has `tabIndex=0`; all others have `tabIndex=-1`. Arrow keys move DOM focus.
- Shared primitive that useTabs and useListState can compose for keyboard navigation.

---

## 2. UX Intent

Enables single-tab-stop navigation into composite widgets. Once inside, arrow keys move focus between items. This matches the WAI-ARIA composite widget interaction pattern and native OS behavior (e.g., radio groups, tab bars).

---

## 4. Behavior

- `getItemProps(index)` returns `{ tabIndex: 0 | -1, onFocus, 'data-roving-item': '' }`.
- Only the item at `activeIndex` has `tabIndex=0`.
- `getContainerProps()` returns `{ ref, onKeyDown }` — handles arrow keys, Home, End.
- **Vertical (default):** ArrowDown → next, ArrowUp → previous.
- **Horizontal:** ArrowRight → next, ArrowLeft → previous.
- **Both:** All four arrow keys active.
- Home → first item. End → last item.
- `loop` (default `true`): wraps from last to first and vice versa.
- `loop=false`: clamps at boundaries (no wrap).
- Arrow key press calls `onActiveIndexChange(nextIndex)` and moves DOM focus.
- `onFocus` on each item calls `onActiveIndexChange(index)` to sync state with DOM.
- Focus management: uses `data-roving-item` attribute + `querySelectorAll` to find items.

> **TypeScript is the source of truth for the API.** See `useRovingTabIndex.ts` for the full typed signature.

---

## 5. Accessibility

- **WCAG 2.1.1 Keyboard:** All items reachable via arrow keys.
- **WAI-ARIA composite widget pattern:** Single tab stop into the group, arrows within.
- Consumer sets appropriate role (`tablist`, `toolbar`, `menu`, `listbox`) — this hook manages focus, not semantics.

---

## 7. Composition

- Shared primitive for useTabs, useListState (future).
- Replaces baked-in keyboard nav in those hooks.
- Dependencies: React (`useCallback`, `useRef`). No external deps.
- Note: `useKeyboardNavigation` should be deprecated in favor of this hook.
- **Anti-patterns:** Do not use for flat lists that don't need composite widget behavior. Do not set `count` to 0.

---

## 8. Breaking Change Criteria

- Changing `getContainerProps()` return shape.
- Changing `getItemProps(index)` return shape.
- Changing `onActiveIndexChange` callback signature.
- Changing default `orientation` or `loop` values.
- Removing Home/End support.
- Changing `data-roving-item` attribute name.

---

## 9. Test Requirements

- **tabIndex management:** Active item has tabIndex=0, all others -1. Changing activeIndex updates tabIndex.
- **Keyboard navigation (vertical):** ArrowDown moves next. ArrowUp moves previous. Home to first. End to last.
- **Keyboard navigation (horizontal):** ArrowRight moves next. ArrowLeft moves previous (when orientation='horizontal').
- **Loop behavior:** loop=true wraps last→first and first→last. loop=false clamps at boundaries.
- **Focus management:** Arrow key focuses the target item. onFocus on item updates activeIndex.
- **Prop-getters:** getContainerProps returns ref + onKeyDown. getItemProps returns tabIndex + onFocus + data-roving-item.
