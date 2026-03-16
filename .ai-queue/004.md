<!-- auto-queue -->
<!-- target-branch: test/library-buildout/hook-testing-spec-coverage -->
# Task: useContextMenu Spec + Test + ARIA Fix

**Issue:** #202
**Files:**
- `packages/headless/src/useContextMenu.spec.md` (new)
- `packages/headless/src/useContextMenu.test.tsx` (new)
- `packages/headless/src/useContextMenu.ts` (modify — add aria-haspopup)

## Context
useContextMenu handles right-click context menu positioning and lifecycle. Registers document-level listeners for click-to-close and Escape-to-close when open. Currently missing `aria-haspopup: 'menu'` on getTargetProps return.

**Current API (from useContextMenu.ts):**
- Props: `{ onOpenChange? }`
- Returns: `{ isOpen, position: {x, y}, close, getTargetProps }`
- getTargetProps returns: `{ onContextMenu }` — MISSING `aria-haspopup`
- Document-level listeners: click → close, Escape → close (only when open)
- Position from `e.clientX, e.clientY` (viewport coords)
- Prevents default context menu via `e.preventDefault()`

## Implementation

### 1. Spec (useContextMenu.spec.md)
Follow reference format (sections 1/2/4/5/7/8/9). Include:
- Section 4: Behavior — right-click opens at cursor position, Escape closes, click-outside closes, onOpenChange callback, document listener lifecycle
- Section 5: Accessibility — `aria-haspopup="menu"` on trigger (WCAG 4.1.2), menu content should have `role="menu"` (responsibility of consuming component, not this hook)
- Section 7: Composition — used by ContextMenu component. Document listeners clean up on unmount.
- Section 9: Test requirements

### 2. Implementation Fix (useContextMenu.ts)
Add `'aria-haspopup': 'menu' as const` to the getTargetProps return object. Update `UseContextMenuReturn` interface accordingly.

### 3. Test (useContextMenu.test.tsx)
Use render with fixture component + fireEvent for context menu and keyboard events.

**Fixture pattern:**
```tsx
function ContextMenuFixture(props: UseContextMenuProps) {
  const { isOpen, position, close, getTargetProps } = useContextMenu(props)
  return (
    <div>
      <div {...getTargetProps()} data-testid="target">Right-click me</div>
      {isOpen && (
        <div data-testid="menu" style={{ position: 'fixed', top: position.y, left: position.x }}>
          Menu content
        </div>
      )}
    </div>
  )
}
```

**Test sections:**
- **opening:** right-click opens menu, position matches clientX/clientY, onOpenChange(true) called, default context menu prevented
- **closing:** click anywhere closes menu, Escape key closes menu, onOpenChange(false) called on close, close() function works
- **accessibility:** getTargetProps includes aria-haspopup="menu"
- **lifecycle:** document listeners added only when open, document listeners removed on close, document listeners removed on unmount
- **edge cases:** multiple right-clicks update position, right-click while open updates position

## Acceptance Criteria
- [ ] useContextMenu.spec.md follows reference format
- [ ] useContextMenu.test.tsx covers all spec section 9 requirements
- [ ] aria-haspopup added to getTargetProps return
- [ ] All tests pass
