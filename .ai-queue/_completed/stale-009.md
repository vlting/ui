<!-- auto-queue -->
<!-- target-branch: test/library-buildout/hook-testing-spec-coverage -->
# Task: useToastQueue Spec + Test

**Issue:** #202
**Files:**
- `packages/headless/src/useToastQueue.spec.md` (new)
- `packages/headless/src/useToastQueue.test.ts` (new)

## Context
useToastQueue manages a toast notification queue using `useSyncExternalStore` with per-instance stores. Supports auto-dismiss with configurable durations. Module-level counter for ID generation means IDs are non-deterministic across test runs.

**Current API (from useToastQueue.ts):**
- No props
- Returns: `{ toasts: Toast[], add, remove, removeAll }`
- Toast: `{ id: string, message: string, duration?: number, [key]: unknown }`
- `add(toast)` returns the generated ID
- Auto-dismiss: default 5000ms, configurable per toast
- Store: created per hook instance via `useRef` (NOT a singleton)
- ID: `toast-${++counter}-${Date.now()}` — module-level counter
- Timer cleanup on unmount

## Implementation

### 1. Spec (useToastQueue.spec.md)
Follow reference format (sections 1/2/4/5/7/8/9). Include:
- Section 1: Purpose — toast notification queue management. When to use: any component needing queued, auto-dismissing notifications.
- Section 4: Behavior — add returns generated ID, toasts array reflects current queue, remove by ID, removeAll clears queue, auto-dismiss after duration (default 5000ms), custom duration per toast, timer cleanup on unmount, store is per-instance (not shared between components)
- Section 5: Accessibility — "Planned: aria-live region support will be added via useLiveRegion (Stage 5.3). The consuming Toast/Toaster component is responsible for wrapping the queue in an aria-live region."
- Section 7: Composition — uses `useSyncExternalStore` for store subscription. Used by Toast/Toaster components. Independent of react-aria.
- Section 8: Breaking changes — Toast interface shape, return type, auto-dismiss behavior
- Section 9: Test requirements — note non-deterministic IDs

### 2. Test (useToastQueue.test.ts)
Use `renderHook` + `jest.useFakeTimers()`. Assert ID patterns, not exact values.

**Test sections:**
- **adding toasts:** add() returns an ID matching /^toast-/, toast appears in toasts array, multiple toasts queue in order, custom properties preserved on toast
- **removing toasts:** remove(id) removes specific toast, removeAll clears all toasts, removing non-existent ID is a no-op
- **auto-dismiss:** toast auto-removed after default 5000ms, custom duration respected, timer cleared if manually removed before expiry
- **timer management:** timers cleaned up on unmount, multiple toasts each have independent timers
- **store isolation:** two hook instances have separate queues (verify with renderHook called twice)
- **aria-live (planned):** `it.todo('wraps queue in aria-live region — see useLiveRegion Stage 5.3')`

**Timer testing pattern:**
```typescript
jest.useFakeTimers()

it('auto-removes toast after default duration', () => {
  const { result } = renderHook(() => useToastQueue())
  act(() => {
    result.current.add({ message: 'Hello' })
  })
  expect(result.current.toasts).toHaveLength(1)

  act(() => {
    jest.advanceTimersByTime(5000)
  })
  expect(result.current.toasts).toHaveLength(0)
})
```

**ID assertion pattern:**
```typescript
expect(id).toMatch(/^toast-/)
// NOT: expect(id).toBe('toast-1-...')
```

Remember to call `jest.useRealTimers()` in afterEach.

## Acceptance Criteria
- [ ] useToastQueue.spec.md follows reference format
- [ ] useToastQueue.test.ts covers all spec section 9 requirements
- [ ] ID assertions use pattern matching, not exact values
- [ ] Fake timers used for auto-dismiss tests
- [ ] it.todo for aria-live included
- [ ] All tests pass
- [ ] No changes to implementation file
