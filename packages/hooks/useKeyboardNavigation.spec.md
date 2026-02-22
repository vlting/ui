# Component Spec -- useKeyboardNavigation

## 1. Purpose

- Provides a standard keyboard navigation handler for list-like and grid-like composite widgets (listboxes, menus, tabs, toolbars).
- Should be used when building any component that contains a set of navigable items requiring arrow key, Home/End, and Enter/Space support.
- Should NOT be used for free-form text input navigation. Should NOT be used for single interactive elements that do not belong to a collection.

---

## 2. UX Intent

- Enables keyboard-only users to navigate collections of items using familiar arrow key patterns, matching WAI-ARIA Authoring Practices for composite widgets.
- Supports three orientation modes (`vertical`, `horizontal`, `both`) so that the correct arrow keys are mapped based on the widget's visual layout.
- Loop behavior (enabled by default) prevents dead-ends: the user can cycle continuously through items without hitting a wall, reducing frustration.
- Home/End keys allow fast jumps to the first or last item, supporting efficient navigation in long lists (Miller's Law -- reducing cognitive load for large item sets).

---

## 3. Visual Behavior

N/A -- hook with no visual output.

---

## 4. Interaction Behavior

- **Vertical orientation** (default): `ArrowUp` moves to the previous item, `ArrowDown` moves to the next item.
- **Horizontal orientation**: `ArrowLeft` moves to the previous item, `ArrowRight` moves to the next item.
- **Both orientation**: All four arrow keys are active -- `ArrowUp`/`ArrowLeft` move backward, `ArrowDown`/`ArrowRight` move forward.
- **Loop enabled** (default): Moving backward from index 0 wraps to the last item. Moving forward from the last item wraps to the first.
- **Loop disabled**: Moving backward from index 0 stays at 0. Moving forward from the last item stays at the last item.
- **Home key**: Sets active index to 0 (first item).
- **End key**: Sets active index to `items - 1` (last item).
- **Enter and Space**: Invoke the `onSelect` callback with the current `activeIndex` and return early without changing the index.
- **Unhandled keys**: Pass through without side effects and without calling `preventDefault`.
- **preventDefault**: Called on all handled keys to prevent default browser behavior (e.g., page scrolling on arrow keys).

---

## 5. Accessibility Requirements

- **WAI-ARIA keyboard interaction pattern**: Must implement the standard arrow key navigation for composite widgets as described in WAI-ARIA Authoring Practices (listbox, menu, tabs, toolbar patterns).
- **Orientation-aware key mapping**: Arrow keys must match the widget's declared orientation so that screen reader users and keyboard users have consistent expectations.
- **Home/End support**: Required by WAI-ARIA for composite widgets to allow fast navigation.
- **Enter/Space activation**: Required by WAI-ARIA for item selection/activation in composite widgets.
- **preventDefault on handled keys**: Must prevent browser scrolling when arrow keys are used for widget navigation, so the page does not jump unexpectedly.

---

## 6. Theming Rules

N/A -- hook with no theming concerns.

---

## 7. Composition Rules

- Intended for use inside list and collection components: `Listbox`, `Menu`, `Tabs`, `Toolbar`, `Select`, `CommandPalette`.
- The returned handler must be attached as an `onKeyDown` prop on the container element.
- The consuming component is responsible for managing `activeIndex` state and passing it to this hook (along with `setActiveIndex`).
- Dependencies: React (`useCallback`). No external dependencies.
- Anti-patterns:
  - Do not use this hook for components where items are not sequentially indexed (e.g., tree views with nested depths).
  - Do not pass an `items` count of 0 -- the hook does not guard against division by zero in loop math.
  - Do not attach the handler to individual items; it must be on the container that receives keyboard events for the group.

---

## 8. Performance Constraints

- The returned `handleKeyDown` function is memoized via `useCallback` with dependencies on `activeIndex`, `items`, `loop`, `onSelect`, `orientation`, and `setActiveIndex`.
- Because `activeIndex` is a dependency, the handler identity changes on every index change. Consuming components should not rely on referential stability of the handler across index changes.
- The `onSelect` callback should be memoized by the consumer if referential stability of the handler is important.

---

## 9. Test Requirements

- **Vertical navigation**: Verify `ArrowDown` increments and `ArrowUp` decrements the active index.
- **Horizontal navigation**: Verify `ArrowRight` increments and `ArrowLeft` decrements the active index when orientation is `'horizontal'`.
- **Both orientation**: Verify all four arrow keys work when orientation is `'both'`.
- **Loop wrapping**: Verify moving past the last item wraps to the first, and moving before the first item wraps to the last.
- **Clamping without loop**: Verify that with `loop: false`, the index clamps at 0 and `items - 1`.
- **Home key**: Verify active index is set to 0.
- **End key**: Verify active index is set to `items - 1`.
- **Enter key**: Verify `onSelect` is called with the current `activeIndex` and that `setActiveIndex` is not called.
- **Space key**: Verify same behavior as Enter.
- **preventDefault**: Verify `e.preventDefault()` is called for all handled keys and not called for unhandled keys.
- **Unhandled keys**: Verify no state change or callback invocation for keys like `a`, `Escape`, etc.
- **Edge case -- single item**: Verify navigation with `items = 1` does not produce invalid indices.
