# Spec — useFocusTrap

> This is a non-visual utility hook. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this hook.

## 1. Purpose

- Traps keyboard focus within a container element, preventing focus from escaping via Tab or Shift+Tab.
- Use for modal dialogs, dropdown menus, drawer overlays, and any pattern where focus must remain within a bounded region per WAI-ARIA dialog guidelines.
- Do NOT use for non-modal content where focus should flow naturally. Do NOT use when the container has no focusable elements.

---

## 2. UX Intent

- Ensures keyboard-only users cannot accidentally leave a modal or overlay context.
- Provides a sense of enclosure within the active context until explicit dismissal.
- Auto-focuses the first focusable element on activation, giving keyboard users an immediate interaction target.

---

## 4. Behavior

- **Tab at last element:** Focus moves to the first focusable element in the container.
- **Shift+Tab at first element:** Focus moves to the last focusable element.
- **Tab within container:** Normal tab order between first and last elements is unaffected.
- **Auto-focus on activation:** When `active` transitions to `true`, the first focusable element receives focus.
- **Deactivation:** When `active` is `false`, no keyboard interception occurs.
- **Dynamic content:** Focusable elements are queried on each Tab keypress (not cached), so elements added or removed after mount are correctly handled.
- **Focusable selector:** `a[href]`, `button:not([disabled])`, `input:not([disabled])`, `select:not([disabled])`, `textarea:not([disabled])`, `[tabindex]:not([tabindex="-1"])`.
- **Empty container:** Tab and Shift+Tab pass through without interception.

> **TypeScript is the source of truth for the API.** See `useFocusTrap.ts` for the full typed signature. Do not duplicate type tables here.

---

## 5. Accessibility

- **Focus containment:** Required by WCAG 2.4.3 (Focus Order) and WAI-ARIA dialog pattern — focus must not escape a modal dialog while open.
- **Auto-focus:** First focusable element must receive focus on activation, per WAI-ARIA modal dialog practices.
- **Disabled element exclusion:** Elements with `disabled` attribute and `tabindex="-1"` are excluded from the focus cycle.
- **No focus stealing when inactive:** Must not interfere with natural tab order when trap is inactive.

---

## 7. Composition

- Intended for use inside overlay components: Dialog, Modal, Drawer, Popover, DropdownMenu.
- The returned ref must be attached to the container element that bounds the focus trap.
- Dependencies: React (`useCallback`, `useEffect`, `useRef`). No external dependencies.
- **Anti-patterns:** Do not nest multiple active focus traps simultaneously. Do not attach the ref to an element outside the visible viewport. Do not set `active` to `true` before the container is mounted.

---

## 8. Breaking Change Criteria

- Changing the focusable element selector.
- Removing auto-focus on activation behavior.
- Changing the return type from `RefObject<T>`.
- Removing the `active` parameter.

---

## 9. Test Requirements

- **Focus wraps forward:** Verify Tab on last element moves focus to first.
- **Focus wraps backward:** Verify Shift+Tab on first element moves focus to last.
- **Auto-focus on activation:** Verify first focusable element receives focus when trap activates.
- **Inactive trap:** Verify no keyboard interception when `active` is `false`.
- **Empty container:** Verify no errors when container has no focusable elements.
- **Dynamic elements:** Verify elements added after mount are included in the focus cycle.
- **Disabled elements excluded:** Verify disabled buttons/inputs are excluded.
- **Cleanup:** Verify keydown listener is removed on unmount and on deactivation.
