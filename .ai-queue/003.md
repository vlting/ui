<!-- auto-queue -->
<!-- target-branch: test/library-buildout/hook-testing-spec-coverage -->
# Task: useAutoplay Spec + Test

**Issue:** #202
**Files:**
- `packages/headless/src/useAutoplay.spec.md` (new)
- `packages/headless/src/useAutoplay.test.ts` (new)

## Context
useAutoplay manages play/pause state with interval-based ticking. Has an internal `usePrefersReducedMotion` hook that queries `window.matchMedia('(prefers-reduced-motion: reduce)')`. `isPlaying` is derived: `enabled && !manualPause && !reducedMotion`.

**Current API (from useAutoplay.ts):**
- Props: `{ interval? = 5000, enabled? = true, onTick: () => void }`
- Returns: `{ isPlaying, play, pause, toggle }`
- Internal: `usePrefersReducedMotion()` — uses `window.matchMedia` (mocked in jest.setup.js)
- Uses `useRef` for `onTick` to avoid stale closure
- Interval set via `setInterval`, cleaned up on unmount/change

## Implementation

### 1. Spec (useAutoplay.spec.md)
Follow useControllableState.spec.md format (sections 1/2/4/7/8/9). Skip section 5 (no ARIA surface). Include:
- Section 1: Purpose — autoplay for carousels, slideshows. Note: respects prefers-reduced-motion.
- Section 4: Behavior — isPlaying is DERIVED (not direct state). Document: `isPlaying = enabled && !manualPause && !reducedMotion`. play/pause/toggle only control manualPause. Interval ticks only when isPlaying. onTick uses ref (no stale closure).
- Section 7: Composition — used by Carousel. No dependencies beyond React.
- Section 8: Breaking changes — return type shape, isPlaying derivation logic
- Section 9: Test requirements

### 2. Test (useAutoplay.test.ts)
Use `renderHook` + `jest.useFakeTimers()`. The matchMedia mock exists in jest.setup.js.

**Test sections:**
- **basic behavior:** starts playing when enabled (default), calls onTick at interval, stops when enabled=false
- **manual control:** pause() stops ticking, play() resumes, toggle() flips pause state
- **reduced motion:** isPlaying is false when matchMedia matches (mock `window.matchMedia` to return `matches: true`), resumes when preference changes
- **interval management:** changing interval clears and restarts timer, unmount clears timer
- **onTick ref:** changing onTick callback between renders uses latest version (no stale closure)
- **isPlaying derivation:** false when enabled=false regardless of pause state, false when reducedMotion regardless of enabled/pause

**Timer testing pattern:**
```typescript
jest.useFakeTimers()
// ... render hook
jest.advanceTimersByTime(5000)
expect(onTick).toHaveBeenCalledTimes(1)
jest.advanceTimersByTime(5000)
expect(onTick).toHaveBeenCalledTimes(2)
```

**matchMedia mock pattern:**
```typescript
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  })
}
```

Remember to call `jest.useRealTimers()` in afterEach.

## Acceptance Criteria
- [ ] useAutoplay.spec.md follows reference format
- [ ] useAutoplay.test.ts covers all spec section 9 requirements
- [ ] All tests pass with fake timers
- [ ] No changes to implementation file
