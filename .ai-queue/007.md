<!-- auto-queue -->
<!-- target-branch: feat/library-buildout/react-aria-integration -->
<!-- depends-on: 002,003,004,005,006 -->
# Task: Barrel update + deprecate useKeyboardNavigation

**Issue:** #204
**Files:**
- `packages/headless/src/index.ts` (modify)
- `packages/headless/src/useKeyboardNavigation.ts` (modify — add @deprecated)

## Context
After Tasks 2-6 complete, the barrel (index.ts) needs 4 new hook exports and useKeyboardNavigation needs a deprecation notice.

## Implementation

### 1. Update index.ts
Add exports for the 4 new hooks. Keep alphabetical order. Do NOT export the `_adapters` module (internal).

Add these export lines in alphabetical position:

```typescript
// After useFocusTrap:
export type { UseFocusScopeProps, UseFocusScopeReturn } from './useFocusScope'
export { useFocusScope } from './useFocusScope'

// After useKeyboardNavigation:
export type { UseLiveRegionProps, UseLiveRegionReturn } from './useLiveRegion'
export { useLiveRegion } from './useLiveRegion'

// After useListState:
export type { UsePopoverPositionProps, UsePopoverPositionReturn } from './usePopoverPosition'
// (usePopoverPosition already exported)

// After usePopoverPosition:
export type { UseRovingTabIndexProps, UseRovingTabIndexReturn } from './useRovingTabIndex'
export { useRovingTabIndex } from './useRovingTabIndex'

// After useSearch:
export type { UseTypeaheadProps, UseTypeaheadReturn } from './useTypeahead'
export { useTypeahead } from './useTypeahead'
```

**Full updated index.ts should look like:**
```typescript
export type { UseAutoplayProps, UseAutoplayReturn } from './useAutoplay'
export { useAutoplay } from './useAutoplay'
export type { UseContextMenuProps, UseContextMenuReturn } from './useContextMenu'
export { useContextMenu } from './useContextMenu'
export { useControllableState } from './useControllableState'
export type { UseDisclosureProps, UseDisclosureReturn } from './useDisclosure'
export { useDisclosure } from './useDisclosure'
export { useFocusTrap } from './useFocusTrap'
export type { UseFocusScopeProps, UseFocusScopeReturn } from './useFocusScope'
export { useFocusScope } from './useFocusScope'
export { useKeyboardNavigation } from './useKeyboardNavigation'
export type { UseListStateProps, UseListStateReturn } from './useListState'
export { useListState } from './useListState'
export type { UseLiveRegionProps, UseLiveRegionReturn } from './useLiveRegion'
export { useLiveRegion } from './useLiveRegion'
export type { UsePopoverPositionProps, UsePopoverPositionReturn } from './usePopoverPosition'
export { usePopoverPosition } from './usePopoverPosition'
export type { UseRovingTabIndexProps, UseRovingTabIndexReturn } from './useRovingTabIndex'
export { useRovingTabIndex } from './useRovingTabIndex'
export type { UseSearchProps, UseSearchReturn } from './useSearch'
export { useSearch } from './useSearch'
export type { UseTabsProps, UseTabsReturn } from './useTabs'
export { useTabs } from './useTabs'
export type { UseTypeaheadProps, UseTypeaheadReturn } from './useTypeahead'
export { useTypeahead } from './useTypeahead'
export type { Toast, UseToastQueueReturn } from './useToastQueue'
export { useToastQueue } from './useToastQueue'
```

### 2. Deprecate useKeyboardNavigation.ts
Add `@deprecated` JSDoc to the export. Do NOT delete the file or remove the export — backwards compat.

Change the existing JSDoc comment:
```typescript
/**
 * @deprecated Use useRovingTabIndex for composite widget keyboard navigation.
 * This hook will be removed in a future version.
 *
 * Keyboard navigation handler for lists/grids.
 * Returns a keyDown handler to attach to the container.
 */
```

### 3. Delete old queue files
Remove `.ai-queue/008.md` and `.ai-queue/009.md` if they exist (leftover from Stage 5.2).

## Acceptance Criteria
- [ ] index.ts exports useFocusScope, useTypeahead, useRovingTabIndex, useLiveRegion with types
- [ ] Exports are in alphabetical order
- [ ] _adapters module is NOT exported
- [ ] useKeyboardNavigation has @deprecated JSDoc
- [ ] useFocusTrap export preserved (already @deprecated)
- [ ] No leftover Stage 5.2 queue files
- [ ] TypeScript compiles without errors
