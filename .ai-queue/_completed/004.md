<!-- auto-queue -->
<!-- target-branch: feat/library-buildout/react-aria-integration -->
<!-- depends-on: 001 -->
# Task: useRovingTabIndex — DOM focus management with prop-getters

**Issue:** #204
**Files:**
- `packages/headless/src/useRovingTabIndex.ts` (new)
- `packages/headless/src/useRovingTabIndex.spec.md` (new)
- `packages/headless/src/useRovingTabIndex.test.tsx` (new)

## Context
useRovingTabIndex manages DOM focus and tabIndex for composite widgets (tablists, toolbars, menus). Only the active item has `tabIndex=0`; all others have `tabIndex=-1`. Arrow keys move DOM focus. This is the shared primitive that useTabs' keyboard nav should eventually compose.

Uses `@react-aria/focus` via the adapter module (`_adapters/react-aria.ts`). Depends on Task 1 completing first (infra setup).

**NOTE:** Import from adapter, NOT directly from @react-aria:
```typescript
import { FocusScope } from '../_adapters/react-aria'
```

Actually — after reviewing react-aria/focus, `FocusScope` is a React component for focus containment (used by useFocusScope), NOT for roving tabindex. useRovingTabIndex should be built from scratch using DOM focus management. Do NOT use react-aria for this hook.

## Implementation

### 1. useRovingTabIndex.ts

```typescript
import { useCallback, useRef } from 'react'

export interface UseRovingTabIndexProps {
  /** Number of items or array of item IDs */
  count: number
  /** Currently active/focused index */
  activeIndex: number
  /** Callback when active index changes */
  onActiveIndexChange: (index: number) => void
  /** Navigation axis */
  orientation?: 'horizontal' | 'vertical' | 'both'
  /** Wrap around at boundaries */
  loop?: boolean
}

export interface UseRovingTabIndexReturn {
  getContainerProps: () => {
    role: 'toolbar' | undefined
    onKeyDown: (e: React.KeyboardEvent) => void
  }
  getItemProps: (index: number) => {
    tabIndex: 0 | -1
    onFocus: () => void
  }
}
```

**Core logic:**
- `getContainerProps()` returns `{ onKeyDown }` — handles ArrowUp/Down/Left/Right based on orientation, plus Home/End
- `getItemProps(index)` returns `{ tabIndex: index === activeIndex ? 0 : -1, onFocus: () => onActiveIndexChange(index) }`
- On arrow key: calculate next index, call `onActiveIndexChange`, then focus the DOM element
- To focus DOM element after index change: use a ref array or query the container for `[tabindex="0"]` after state update
- `loop` (default `true`): wraps from last to first and vice versa
- `orientation` (default `'vertical'`): determines which arrow keys are active

**Focus management — use a container ref + querySelectorAll approach:**
```typescript
const containerRef = useRef<HTMLElement>(null)

// After computing nextIndex, focus the item:
const focusItem = useCallback((index: number) => {
  if (!containerRef.current) return
  const items = containerRef.current.querySelectorAll<HTMLElement>('[data-roving-item]')
  items[index]?.focus()
}, [])
```

Add `data-roving-item: ''` to getItemProps return and `ref: containerRef` to getContainerProps return.

**Updated return types:**
```typescript
getContainerProps: () => ({
  ref: containerRef,
  onKeyDown,
})
getItemProps: (index: number) => ({
  tabIndex: index === activeIndex ? 0 : -1,
  onFocus: () => onActiveIndexChange(index),
  'data-roving-item': '',
})
```

**Do NOT include `role` in getContainerProps** — the consumer decides the role (tablist, toolbar, menu, etc.).

### 2. useRovingTabIndex.spec.md
Follow reference format (sections 1/2/4/5/7/8/9):
- Section 1: Purpose — roving tabindex for composite widgets (tablists, toolbars, menus)
- Section 4: Behavior — only active item has tabIndex=0, arrow keys move focus, Home/End, loop wrapping, orientation-aware
- Section 5: Accessibility — WCAG 2.1.1 Keyboard, WAI-ARIA composite widget pattern. Note: "Consumer sets appropriate role (tablist, toolbar, menu) — this hook manages focus, not semantics."
- Section 7: Composition — shared primitive for useTabs, useListState (future). Replaces baked-in keyboard nav in those hooks. Note: "useKeyboardNavigation should be deprecated in favor of this hook."
- Section 8: Breaking changes — getContainerProps shape, getItemProps shape, onActiveIndexChange signature
- Section 9: Test requirements

### 3. useRovingTabIndex.test.tsx
Use render with fixture component.

**Fixture:**
```tsx
function RovingFixture({ count = 4, ...props }: Partial<UseRovingTabIndexProps>) {
  const [activeIndex, setActiveIndex] = useState(0)
  const { getContainerProps, getItemProps } = useRovingTabIndex({
    count,
    activeIndex,
    onActiveIndexChange: setActiveIndex,
    ...props,
  })
  return (
    <div {...getContainerProps()} data-testid="container">
      {Array.from({ length: count }, (_, i) => (
        <button key={i} {...getItemProps(i)} data-testid={`item-${i}`}>
          Item {i}
        </button>
      ))}
    </div>
  )
}
```

**Test sections:**
- **tabIndex management:** active item has tabIndex=0, all others have tabIndex=-1, changing activeIndex updates tabIndex
- **keyboard navigation (vertical):** ArrowDown moves focus to next item, ArrowUp moves to previous, Home to first, End to last
- **keyboard navigation (horizontal):** ArrowRight moves next, ArrowLeft moves previous (when orientation='horizontal')
- **loop behavior:** loop=true wraps from last to first and first to last, loop=false clamps at boundaries
- **focus management:** arrow key focuses the target item (DOM focus moves), onFocus on item updates activeIndex
- **prop-getters:** getContainerProps returns ref + onKeyDown, getItemProps returns tabIndex + onFocus + data-roving-item

## Acceptance Criteria
- [ ] useRovingTabIndex.ts implements roving tabindex with DOM focus management
- [ ] Returns getContainerProps() + getItemProps(index) prop-getters
- [ ] useRovingTabIndex.spec.md follows reference format
- [ ] useRovingTabIndex.test.tsx covers all spec section 9 requirements
- [ ] All tests pass
- [ ] Built from scratch (no react-aria for this hook)
