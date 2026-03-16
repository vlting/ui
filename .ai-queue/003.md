<!-- auto-queue -->
<!-- target-branch: feat/library-buildout/react-aria-integration -->
# Task: useTypeahead — character buffer with prop-getter

**Issue:** #204
**Files:**
- `packages/headless/src/useTypeahead.ts` (new)
- `packages/headless/src/useTypeahead.spec.md` (new)
- `packages/headless/src/useTypeahead.test.tsx` (new)

## Context
useTypeahead provides type-to-select for lists. Buffers keystrokes, matches against items, fires onMatch. No react-aria dependency — built from scratch. Uses `getTypeaheadProps()` prop-getter.

## Implementation

### 1. useTypeahead.ts

```typescript
import { useCallback, useRef } from 'react'

export interface UseTypeaheadProps {
  /** Items to search through (strings or objects with label getter) */
  items: string[]
  /** Called when a match is found */
  onMatch: (index: number) => void
  /** Timeout before buffer clears (ms) */
  timeout?: number
}

export interface UseTypeaheadReturn {
  getTypeaheadProps: () => {
    onKeyDown: (e: React.KeyboardEvent) => void
  }
  /** Imperatively clear the buffer */
  clearBuffer: () => void
}
```

**Core logic:**
- Keystroke buffer accumulates printable characters (single char, not modifier keys)
- Buffer clears after `timeout` (default 500ms) of no typing
- On each keystroke: append to buffer, search items for prefix match (case-insensitive)
- First match calls `onMatch(index)`
- Ignore non-printable keys (arrows, Enter, Escape, Tab, etc.) — check `e.key.length === 1`
- Timer uses `useRef` for cleanup; clear previous timer on each keystroke
- `clearBuffer()` imperatively clears buffer and timer

**Buffer matching:**
```typescript
const search = bufferRef.current.toLowerCase()
const matchIndex = items.findIndex(item =>
  item.toLowerCase().startsWith(search)
)
if (matchIndex !== -1) {
  onMatch(matchIndex)
}
```

**Ignore modifier keys:**
```typescript
if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return
```

### 2. useTypeahead.spec.md
Follow reference format (sections 1/2/4/7/8/9). Skip section 5 (no direct a11y surface — note: "Typeahead is a DX/UX convenience. Consumer is responsible for ARIA on the list."). Include:
- Section 1: Purpose — type-to-select for listboxes, menus, selects
- Section 4: Behavior — buffer accumulation, prefix matching (case-insensitive), timeout reset, clearBuffer imperative method
- Section 7: Composition — used by useListState, Select, Menu. Composes via spreading getTypeaheadProps onto the list container alongside getListProps.
- Section 8: Breaking changes — getTypeaheadProps shape, timeout default, match algorithm
- Section 9: Test requirements

### 3. useTypeahead.test.tsx
Use render with fixture + `jest.useFakeTimers()`.

**Fixture:**
```tsx
function TypeaheadFixture(props: Partial<UseTypeaheadProps>) {
  const items = props.items ?? ['Apple', 'Banana', 'Cherry', 'Date']
  const onMatch = props.onMatch ?? jest.fn()
  const { getTypeaheadProps, clearBuffer } = useTypeahead({ items, onMatch, ...props })
  return (
    <div {...getTypeaheadProps()} data-testid="container" tabIndex={0}>
      {items.map((item, i) => (
        <div key={i} data-testid={`item-${i}`}>{item}</div>
      ))}
      <button data-testid="clear" onClick={clearBuffer}>Clear</button>
    </div>
  )
}
```

**Test sections:**
- **basic matching:** single char matches first item starting with that char, multiple chars accumulate and match prefix
- **case insensitive:** lowercase input matches uppercase items and vice versa
- **buffer timeout:** buffer clears after timeout (default 500ms), new typing after timeout starts fresh buffer
- **custom timeout:** respects custom timeout value
- **no match:** no onMatch call when nothing matches
- **modifier keys:** Ctrl+key, Meta+key, Alt+key are ignored, non-printable keys (Enter, Escape, ArrowDown) are ignored
- **clearBuffer:** imperatively clears buffer, subsequent typing starts fresh
- **prop-getter:** getTypeaheadProps returns onKeyDown

Remember `jest.useFakeTimers()` and `jest.useRealTimers()` in afterEach.

## Acceptance Criteria
- [ ] useTypeahead.ts implements buffer + prefix matching + timeout
- [ ] Returns getTypeaheadProps() prop-getter
- [ ] useTypeahead.spec.md follows reference format
- [ ] useTypeahead.test.tsx covers all spec section 9 requirements
- [ ] All tests pass
- [ ] No dependency on react-aria (built from scratch)
