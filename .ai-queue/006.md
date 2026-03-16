<!-- auto-queue -->
<!-- target-branch: test/library-buildout/hook-testing-spec-coverage -->
# Task: usePopoverPosition Spec + Test

**Issue:** #202
**Files:**
- `packages/headless/src/usePopoverPosition.spec.md` (new)
- `packages/headless/src/usePopoverPosition.test.tsx` (new)

## Context
usePopoverPosition calculates absolute positioning for floating content relative to a trigger element. Supports 8 placements with automatic viewport flipping. Pure positioning utility — no ARIA responsibility.

**Current API (from usePopoverPosition.ts):**
- Props: `{ placement? = 'bottom', offset? = 8, triggerRef, contentRef, isOpen }`
- Returns: `{ position: {top, left}, actualPlacement, update }`
- Internal: `computePosition()` (pure math), `flip()` (placement inversion), `isInViewport()` (boundary check)
- Calls `update()` automatically when `isOpen` becomes true
- Uses `getBoundingClientRect()` on both trigger and content refs

## Implementation

### 1. Spec (usePopoverPosition.spec.md)
Follow reference format (sections 1/2/4/7/8/9). SKIP section 5 (no a11y surface — add one-line note: "No a11y responsibility; focus management is handled by consuming components"). Include:
- Section 1: Purpose — positioning for popovers, tooltips, dropdowns, hover cards
- Section 4: Behavior — 8 placements (top/bottom/left/right × start/end), offset controls gap, auto-flip when out of viewport, update() recalculates manually, auto-updates when isOpen changes
- Section 7: Composition — used by Popover, Tooltip, HoverCard, DropdownMenu. No external deps.
- Section 8: Breaking changes — return type shape, placement string values, flip behavior
- Section 9: Test requirements — note "viewport-flip logic has limited jsdom coverage; test basic placement + hook lifecycle"

### 2. Test (usePopoverPosition.test.tsx)
Use render with fixture component. Mock `getBoundingClientRect` on elements.

**Mock pattern:**
```tsx
function mockRect(element: HTMLElement, rect: Partial<DOMRect>) {
  jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0, x: 0, y: 0,
    toJSON: () => {},
    ...rect,
  } as DOMRect)
}
```

**Fixture pattern:**
```tsx
function PopoverFixture({ isOpen = false, ...props }: Partial<UsePopoverPositionProps> & { isOpen?: boolean }) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { position, actualPlacement, update } = usePopoverPosition({
    triggerRef: triggerRef as RefObject<HTMLElement>,
    contentRef: contentRef as RefObject<HTMLElement>,
    isOpen,
    ...props,
  })
  return (
    <div>
      <button ref={triggerRef} data-testid="trigger">Trigger</button>
      <div ref={contentRef} data-testid="content" style={{ position: 'absolute', top: position.top, left: position.left }}>
        Content
      </div>
      <span data-testid="placement">{actualPlacement}</span>
      <button data-testid="update" onClick={update}>Update</button>
    </div>
  )
}
```

**Test sections:**
- **lifecycle:** calls update when isOpen becomes true, does not call update when isOpen is false, manual update() recalculates
- **return shape:** returns position {top, left}, returns actualPlacement string, returns update function
- **basic placement:** bottom placement positions below trigger (with mocked rects), top placement positions above trigger
- **offset:** offset adds gap between trigger and content
- **defaults:** default placement is 'bottom', default offset is 8

**NOTE:** Skip viewport-flip tests in jsdom. Document in spec as "Requires browser test for full verification."

## Acceptance Criteria
- [ ] usePopoverPosition.spec.md follows reference format
- [ ] usePopoverPosition.test.tsx covers hook lifecycle and basic placement
- [ ] Viewport-flip documented as spec-only (not test-covered in jsdom)
- [ ] All tests pass
- [ ] No changes to implementation file
