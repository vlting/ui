# Spec — useContextMenu

> This is a non-visual utility hook. The rendering requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md) do not apply. The behavioral and test requirements below govern this hook.

## 1. Purpose

- Manages right-click context menu positioning and open/close lifecycle.
- Handles document-level listeners for click-outside-to-close and Escape-to-close.
- Use when building custom context menus triggered by right-click.
- Do NOT use for dropdown menus triggered by left-click (use useDisclosure or a dropdown pattern instead).

---

## 2. UX Intent

Provides a context menu primitive that opens at the cursor position on right-click, prevents the native browser context menu, and closes on click-away or Escape — matching standard OS context menu behavior.

---

## 4. Behavior

- Right-click (`onContextMenu`) opens the menu at `e.clientX, e.clientY` (viewport coordinates).
- `e.preventDefault()` suppresses the native browser context menu.
- When `isOpen` is `true`, document-level listeners are registered: click → close, keydown Escape → close.
- When `isOpen` is `false`, document listeners are cleaned up.
- `onOpenChange` callback is invoked with `true` on open and `false` on close.
- Multiple right-clicks while open update the position and keep the menu open.
- `close()` can be called imperatively.

> **TypeScript is the source of truth for the API.** See `useContextMenu.ts` for the full typed signature.

---

## 5. Accessibility

- `getTargetProps()` returns `aria-haspopup="menu"` on the trigger element (WCAG 4.1.2 — Name, Role, Value).
- The consuming component is responsible for adding `role="menu"` to the menu content and `role="menuitem"` to items.
- Escape key closes the menu (keyboard operability — WCAG 2.1.1).

---

## 7. Composition

- Used by ContextMenu component.
- Dependencies: React (`useState`, `useEffect`, `useCallback`). No external dependencies.
- Document listeners are registered only when open and cleaned up on close or unmount.
- **Naming exception:** `onContextMenu` is retained (not renamed to `onPress`) — it's inherently web-specific (right-click has no React Native equivalent).
- **Anti-patterns:** Do not nest context menus. Do not use for non-context-menu patterns.

---

## 8. Breaking Change Criteria

- Changing the return type shape (`{ isOpen, position, close, getTargetProps }`).
- Removing `aria-haspopup` from getTargetProps return.
- Removing Escape or click-outside close behavior.
- Changing position from viewport coordinates.
- Removing `onOpenChange` callback.

---

## 9. Test Requirements

- **Opening:** Right-click opens menu. Position matches clientX/clientY. `onOpenChange(true)` called. Default context menu prevented.
- **Closing:** Click anywhere closes menu. Escape key closes menu. `onOpenChange(false)` called on close. `close()` function works.
- **Accessibility:** getTargetProps includes `aria-haspopup="menu"`.
- **Lifecycle:** Document listeners added only when open. Document listeners removed on close. Document listeners removed on unmount.
- **Edge cases:** Multiple right-clicks update position. Right-click while open updates position.
