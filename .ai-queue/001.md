<!-- auto-queue -->
<!-- target-branch: test/library-buildout/hook-testing-spec-coverage -->
# Task: useControllableState Test Audit

**Issue:** #202
**Files:** `packages/headless/src/useControllableState.test.ts` (modify only)

## Context
The existing test file (100 lines) covers uncontrolled mode, controlled mode, onChange, and edge cases. But the spec (section 9) requires 3 scenarios that are NOT tested:
1. Updater function `setValue((prev) => next)` in both modes
2. Stale `onChange` prevention (rerender with new onChange, verify latest is called)
3. Switching from uncontrolled to controlled mid-lifecycle

## Implementation

Add these test cases to the existing file. Follow the existing describe structure.

### Tests to add

**In `describe('uncontrolled mode')`:**
```typescript
it('supports updater function in setValue', () => {
  const { result } = renderHook(() => useControllableState({ defaultProp: 5 }))
  act(() => {
    result.current[1]((prev) => (prev as number) + 1)
  })
  expect(result.current[0]).toBe(6)
})
```

**In `describe('controlled mode')`:**
```typescript
it('supports updater function in setValue', () => {
  const onChange = jest.fn()
  const { result } = renderHook(() =>
    useControllableState({ prop: 10, onChange }),
  )
  act(() => {
    result.current[1]((prev) => (prev as number) + 1)
  })
  // In controlled mode, updater receives the current prop value
  expect(onChange).toHaveBeenCalledWith(11)
})
```

**In `describe('edge cases')`:**
```typescript
it('uses latest onChange via ref (stale closure prevention)', () => {
  const onChange1 = jest.fn()
  const onChange2 = jest.fn()
  const { result, rerender } = renderHook(
    ({ onChange }) => useControllableState({ defaultProp: 'a', onChange }),
    { initialProps: { onChange: onChange1 } },
  )
  rerender({ onChange: onChange2 })
  act(() => {
    result.current[1]('b')
  })
  expect(onChange1).not.toHaveBeenCalled()
  expect(onChange2).toHaveBeenCalledWith('b')
})
```

## Acceptance Criteria
- [ ] Updater function test passes in uncontrolled mode
- [ ] Updater function test passes in controlled mode
- [ ] Stale onChange prevention test passes
- [ ] All existing tests still pass
- [ ] No changes to the spec file or implementation file
