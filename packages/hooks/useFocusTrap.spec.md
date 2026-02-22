# Component Spec -- useFocusTrap

## 1. Purpose

- Traps keyboard focus within a container element, preventing focus from escaping via Tab or Shift+Tab.
- Should be used for modal dialogs, dropdown menus, drawer overlays, and any pattern where focus must remain within a bounded region per WAI-ARIA dialog guidelines.
- Should NOT be used for non-modal content where focus should flow naturally through the page. Should NOT be used when the container has no focusable elements.

---

## 2. UX Intent

- Ensures users who navigate via keyboard cannot accidentally leave a modal or overlay context.
- Provides a sense of enclosure: the user remains within the active context until they explicitly dismiss it.
- Auto-focuses the first focusable element when the trap activates, giving keyboard users an immediate interaction target without requiring manual focus management in the consuming component.

---

## 3. Visual Behavior

N/A -- hook with no visual output.

---

## 4. Interaction Behavior

- **Tab at last element**: Pressing `Tab` while the last focusable element in the container is focused moves focus to the first focusable element.
- **Shift+Tab at first element**: Pressing `Shift+Tab` while the first focusable element is focused moves focus to the last focusable element.
- **Tab within the container**: Normal Tab order between the first and last elements is unaffected; the hook only intervenes at the boundaries.
- **Auto-focus on activation**: When `active` transitions to `true`, the first focusable element inside the container receives focus automatically.
- **Deactivation**: When `active` is `false`, no keyboard interception occurs and focus flows normally.
- **Dynamic content**: Focusable elements are queried on each Tab keypress, so elements added to or removed from the container after mount are correctly included in or excluded from the cycle.
- **Focusable element scope**: Only elements matching `a[href]`, `button:not([disabled])`, `input:not([disabled])`, `select:not([disabled])`, `textarea:not([disabled])`, and `[tabindex]:not([tabindex="-1"])` are considered focusable.
- **Empty container**: If the container has zero focusable elements, Tab and Shift+Tab pass through without interception.

---

## 5. Accessibility Requirements

- **Focus containment**: Required by WCAG 2.4.3 (Focus Order) and WAI-ARIA dialog pattern -- focus must not escape a modal dialog while it is open.
- **Auto-focus**: The first focusable element must receive focus when the trap activates, per WAI-ARIA modal dialog authoring practices.
- **Disabled element exclusion**: Elements with `disabled` attribute and elements with `tabindex="-1"` must be excluded from the focus cycle to match user expectations and platform behavior.
- **No focus stealing when inactive**: When the trap is inactive, it must not interfere with the natural tab order of the page.

---

## 6. Theming Rules

N/A -- hook with no theming concerns.

---

## 7. Composition Rules

- Intended for use inside overlay components: `Dialog`, `Modal`, `Drawer`, `Popover`, `DropdownMenu`.
- The returned ref must be attached to the container element that bounds the focus trap.
- Dependencies: React (`useCallback`, `useEffect`, `useRef`). No external dependencies.
- Anti-patterns:
  - Do not nest multiple active focus traps simultaneously without coordinating which one is active. Only one trap should be active at a time.
  - Do not attach the ref to an element outside the visible viewport; focus would move to invisible elements.
  - Do not set `active` to `true` before the container is mounted and populated with focusable elements; the auto-focus will find nothing.

---

## 8. Performance Constraints

- The keydown handler is memoized via `useCallback` and only re-created when `active` changes.
- The document-level event listener is added and removed via `useEffect`, ensuring cleanup on deactivation or unmount.
- Focusable elements are queried via `querySelectorAll` on each Tab keypress rather than cached, trading a small DOM query cost for correctness with dynamic content.

---

## 9. Test Requirements

- **Focus wraps forward**: Verify that pressing Tab on the last focusable element moves focus to the first.
- **Focus wraps backward**: Verify that pressing Shift+Tab on the first focusable element moves focus to the last.
- **Auto-focus on activation**: Verify the first focusable element receives focus when the trap activates.
- **Inactive trap**: Verify no keyboard interception occurs when `active` is `false`.
- **Empty container**: Verify no errors or focus changes occur when the container has no focusable elements.
- **Dynamic elements**: Verify that elements added to the container after mount are included in the focus cycle.
- **Disabled elements excluded**: Verify that disabled buttons/inputs are not included in the focus cycle.
- **Cleanup on unmount**: Verify the keydown listener is removed when the component unmounts.
- **Cleanup on deactivation**: Verify the keydown listener is removed when `active` transitions from `true` to `false`.
