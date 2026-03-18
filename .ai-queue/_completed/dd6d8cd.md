<!-- LAT: 2026-03-09T05:54:52Z -->
<!-- PID: 54318 -->
<!-- worktree: .worktrees/q-004 -->
<!-- branch: q-004 -->
<!-- auto-queue -->
<!-- target-branch: feat/stl-foundation/token-scale-mapping -->
# Task: Extend stl numeric scales for vlt-ui token coverage

## What
Extend stl's size, space, radius, and zIndex scales to cover all token values currently used by vlt-ui. This ensures vlt-ui components can reference the same token keys after migration.

## Context
vlt-ui uses pixel-based tokens (defined in `packages/design-tokens/base.ts`). stl uses rem-based calc multipliers. We need to add vlt-ui-equivalent entries to stl's scales.

## Reference
Read these files first:
- `packages/design-tokens/base.ts` — current vlt-ui token definitions (size, space, radius, zIndex, borderWidth)
- `packages/stl/src/config/scales/size.ts` — stl size scale
- `packages/stl/src/config/scales/space.ts` — stl space scale
- `packages/stl/src/config/scales/radius.ts` — stl radius scale
- `packages/stl/src/config/scales/zIndex.ts` — stl zIndex scale
- `packages/stl/src/config/scales/scales.models.ts` — scale type definitions
- `packages/stl/src/config/scales/scales.utils.ts` — scale utility functions (createScaleEntry, etc.)

## Steps

### 1. Size scale (`packages/stl/src/config/scales/size.ts`)
- Add entries for vlt-ui's size tokens: 0, 0.25 (2px), 0.5 (4px), 0.75 (8px), 1 (20px), 2 (24px), 3 (28px), 4 (44px), etc.
- Use the existing `createScaleEntry` pattern with appropriate px/rem values
- Add semantic size entries: `sidebar` (260px), `sidebarCollapsed` (68px), `drawer` (380px), `dialogSm` (420px), `dialogMd` (540px), `dialogLg` (720px), `menuMin` (220px)
- Keep stl's existing entries too — they should coexist

### 2. Space scale (`packages/stl/src/config/scales/space.ts`)
- Add vlt-ui's space tokens: 0.25 (2px), 0.5 (4px), 0.75 (8px), 1 (10px), 1.5 (12px), 2 (16px), etc.
- Add negative space entries: -0.25 (-2px), -0.5 (-4px), -1 (-10px), -2 (-16px), etc.
- Use the existing createScaleEntry pattern

### 3. Radius scale (`packages/stl/src/config/scales/radius.ts`)
- Add vlt-ui's radius tokens: 1 (3px), 2 (5px), 3 (7px), 4 (9px), 5 (10px), 6 (16px), etc.
- Ensure `full` (9999px) maps to stl's `pill` (400rem) — add an alias if needed

### 4. ZIndex scale (`packages/stl/src/config/scales/zIndex.ts`)
- Extend to include vlt-ui's 7 (10000) — map to stl's `max` (9999) or add a new entry
- Ensure 0-6 map correctly: 0→0, 1→100, 2→200, 3→300, 4→400, 5→500, 6→1000

### 5. BorderWidth (`packages/stl/src/config/scales/border.ts`)
- Verify stl covers: none (0), thin (1px), medium (2px), thick (3px)
- Add entries if missing

## Files touched
- `packages/stl/src/config/scales/size.ts`
- `packages/stl/src/config/scales/space.ts`
- `packages/stl/src/config/scales/radius.ts`
- `packages/stl/src/config/scales/zIndex.ts`
- `packages/stl/src/config/scales/border.ts` (if needed)

## Acceptance criteria
- All vlt-ui token keys have corresponding stl scale entries
- Existing stl entries are preserved (additive changes only)
- No TypeScript errors in modified files
- Scale entry patterns follow existing conventions (createScaleEntry or equivalent)
