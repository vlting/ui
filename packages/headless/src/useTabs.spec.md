# Spec — useTabs

> This is a non-visual utility hook. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this hook.

## 1. Purpose

- Manages tab selection state with built-in keyboard navigation following the WAI-ARIA Tabs pattern.
- Supports controlled and uncontrolled modes, orientation-aware keyboard navigation, and automatic tab registration.
- Use when building tabbed interfaces (Tabs, TabBar, segmented controls).
- Do NOT use for accordion-style disclosures or navigation menus.

---

## 2. UX Intent

Provides a complete tabs primitive: selection, keyboard nav (arrows, Home/End), and ARIA plumbing. Consumer renders the UI, hook handles all state and accessibility.

---

## 4. Behavior

- **Controlled/uncontrolled:** When `value` is provided, selection follows `value` (controlled). When only `defaultValue` is provided, internal state manages selection (uncontrolled).
- **Tab registration:** `getTabProps(value)` has a hidden side effect — registers the tab value in a ref array for keyboard navigation order.
- **Keyboard navigation:** Orientation-aware arrow keys (`ArrowLeft`/`ArrowRight` for horizontal, `ArrowUp`/`ArrowDown` for vertical). `Home` goes to first tab, `End` goes to last. Always wraps around.
- `onValueChange` is called when selection changes (both modes).
- `getTabListProps()` returns `role="tablist"` and `aria-orientation`.
- `getTabProps(value)` returns `role="tab"`, `aria-selected`, `tabIndex`, `onPress`, `onKeyDown`, `id`, `aria-controls`.
- `getTabPanelProps(value)` returns `role="tabpanel"`, `hidden`, `tabIndex=0`, `id`, `aria-labelledby`.

> **TypeScript is the source of truth for the API.** See `useTabs.ts` for the full typed signature.

---

## 5. Accessibility

- Follows the WAI-ARIA [Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).
- `role="tablist"` on container with `aria-orientation`.
- `role="tab"` on each tab with `aria-selected`, `tabIndex` (0 for active, -1 for inactive).
- `role="tabpanel"` on each panel, hidden when inactive, `tabIndex=0`.
- `id` + `aria-controls` on tabs linking to their panel (WCAG 4.1.2).
- `id` + `aria-labelledby` on panels linking back to their tab (WCAG 1.3.1).
- Keyboard: arrow keys, Home, End with wrap-around.

---

## 7. Composition

- Used by Tabs component.
- Dependencies: React (`useState`, `useCallback`, `useRef`, `useId`). No external dependencies.
- DX Note: `getTabProps` has hidden `registerTab` side effect — tab values must be registered via render for keyboard nav to work.
- **Universal naming:** `onPress` (not `onClick`) — follows React Native conventions for cross-platform compatibility.
- Tech debt: Hand-rolls controlled/uncontrolled — should compose `useControllableState`.

---

## 8. Breaking Change Criteria

- Changing prop-getter return shapes.
- Removing keyboard navigation or changing key bindings.
- Removing tab registration side effect.
- Removing `id`/`aria-controls`/`aria-labelledby` linkage.
- Changing wrap-around behavior.

---

## 9. Test Requirements

- **Uncontrolled mode:** First tab active by default. Clicking tab changes active. `defaultValue` sets initial tab.
- **Controlled mode:** Follows `value` prop. `onValueChange` called on click. Value change doesn't affect internal state.
- **Keyboard navigation (horizontal):** ArrowRight moves to next tab. ArrowLeft moves to prev. Wraps from last to first. Wraps from first to last. Home goes to first. End goes to last.
- **Keyboard navigation (vertical):** ArrowDown moves to next. ArrowUp moves to prev (when `orientation='vertical'`).
- **Accessibility:** tablist has `role="tablist"` + `aria-orientation`. Tabs have `role="tab"`. Panels have `role="tabpanel"`. Active tab has `aria-selected=true` + `tabIndex=0`. Inactive tabs have `aria-selected=false` + `tabIndex=-1`. Tab has `id` + `aria-controls` pointing to panel. Panel has `id` + `aria-labelledby` pointing to tab. Only active panel is visible.
- **Registration:** getTabProps registers tabs for keyboard navigation.
