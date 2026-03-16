# Spec — useFocusScope

> This is a non-visual utility hook. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this hook.

## 1. Purpose

- Focus containment for modals, dialogs, popovers, and any overlay that must trap keyboard focus.
- Replaces the @deprecated `useFocusTrap` with a prop-getter API (`getScopeProps()`), focus restore, and scoped event handling.
- Do NOT use for non-modal surfaces where focus should flow naturally.

---

## 2. UX Intent

Prevents keyboard-only users from accidentally tabbing behind modal overlays. Automatically focuses the first interactive element on activation and restores focus to the previously focused element on deactivation — both critical for WCAG compliance.

---

## 4. Behavior

- **`contain`** (default `true`): When active, Tab/Shift+Tab cycles within the container's focusable elements. When `false`, focus is unconstrained.
- **`autoFocus`** (default `true`): When activated (contain becomes `true`), focuses the first focusable element inside the container.
- **`restoreFocus`** (default `true`): On deactivation (contain becomes `false` or unmount), restores focus to `document.activeElement` captured at activation time.
- Tab on last focusable element wraps to first. Shift+Tab on first wraps to last.
- Empty scope (no focusable children): Tab is a no-op, does not throw.
- Single focusable child: Tab keeps focus on that element.
- `onKeyDown` is scoped to the container element (via prop-getter), not document-level.

> **TypeScript is the source of truth for the API.** See `useFocusScope.ts` for the full typed signature.

---

## 5. Accessibility

- **WCAG 2.4.3 Focus Order:** Focus cycles in DOM order within the scope.
- **WCAG 2.1.2 No Keyboard Trap:** The scope must be deactivatable (set `contain=false`) — a permanent trap is a violation.
- Consumer must provide a mechanism to deactivate containment (e.g., Escape key to close dialog).
- `autoFocus` ensures modal content is immediately reachable without extra Tab presses.
- `restoreFocus` ensures the user's place in the page is preserved after dismissing the overlay.

---

## 7. Composition

- Replaces `@deprecated useFocusTrap`. Used by Dialog, Modal, Popover.
- Dependencies: React (`useCallback`, `useEffect`, `useRef`). No external deps.
- **Anti-patterns:** Do not use alongside `useFocusTrap` on the same container. Do not set `contain=true` permanently without an escape mechanism.

---

## 8. Breaking Change Criteria

- Changing `getScopeProps()` return shape (`ref`, `onKeyDown`).
- Changing default values for `contain`, `restoreFocus`, `autoFocus`.
- Removing focus restore or auto-focus behavior.
- Changing Tab/Shift+Tab wrapping behavior.
- Changing `FOCUSABLE_SELECTOR` elements.

---

## 9. Test Requirements

- **Focus containment:** Tab from last element moves to first. Shift+Tab from first moves to last. Tab cycles within scope.
- **Auto-focus:** First focusable element focused on mount (when `autoFocus=true`). No auto-focus when `autoFocus=false`.
- **Focus restore:** Previous element re-focused on unmount (when `restoreFocus=true`). No restore when `restoreFocus=false`.
- **Deactivation:** `contain=false` stops trapping, focus can leave scope.
- **Prop-getter:** `getScopeProps()` returns `ref` and `onKeyDown`. Props spread correctly onto container.
- **Edge cases:** Empty scope (no focusable children). Single focusable child.
