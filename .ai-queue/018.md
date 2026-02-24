<!-- auto-queue -->
# Export Sheet and Popover as Public Components

## Objective

Sheet and Popover are fully implemented internally (used by other components) but not exported publicly. Export them from `src/index.ts` so consumers can use them directly.

## Instructions

### 1. Export Popover

In `src/index.ts`, add:
```typescript
export { Popover } from './packages/components/Popover/Popover'
```

Also export the Popover props type if one exists, or create a minimal one.

### 2. Export Sheet

In `src/index.ts`, add:
```typescript
export { Sheet } from './packages/components/Sheet/Sheet'
```

Also export the Sheet props type if one exists, or create a minimal one.

### 3. Write Spec Files

Create `packages/components/Popover/Popover.spec.md` and `packages/components/Sheet/Sheet.spec.md` following the unified spec template. These specs already exist as drafts from task 013 — verify they are present and complete; if not, create them.

### 4. Verify

- Run `npx tsc --noEmit` to verify no type errors
- Verify the exports are accessible: check that `import { Popover, Sheet } from '@vlting/ui'` would resolve

## Scope

- **Modifies**: `src/index.ts`
- **May create**: `packages/components/Popover/Popover.spec.md`, `packages/components/Sheet/Sheet.spec.md` (if missing)
- **Does NOT modify**: any component source code
