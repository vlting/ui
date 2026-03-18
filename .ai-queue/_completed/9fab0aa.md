<!-- auto-queue -->
<!-- depends-on: 001, 002 -->
<!-- target-branch: feat/icon-system/dynamic-icon-exports -->

# Integration: Package Exports & Main Barrel

Wire icons into the package exports map and main barrel export. Verify tree-shaking.

## Scope
- `package.json` (modify — exports map only)
- `src/index.ts` (modify — add icons section)

## Instructions

### Part 1: Add `./icons` export to package.json

Add a new export entry to the `exports` map in `package.json`:

```json
"./icons": {
  "types": "./packages/icons/index.ts",
  "import": "./packages/icons/index.ts"
},
"./icons/categories": {
  "types": "./packages/icons/categories/index.ts",
  "import": "./packages/icons/categories/index.ts"
},
"./icons/dynamic": {
  "types": "./packages/icons/Icon.tsx",
  "import": "./packages/icons/Icon.tsx"
}
```

Place these entries after the existing `"./utils"` entry.

### Part 2: Wire into `src/index.ts`

Add an icons section to `src/index.ts`. Add it after the Utils section at the bottom:

```ts
// Icons (Remix Icon)
export { DynamicIcon } from '../packages/icons/Icon'
export type { DynamicIconProps } from '../packages/icons/Icon'
export { createIcon } from '../packages/icons/createIcon'
export type { IconFC as RemixIconFC } from '../packages/icons/createIcon'
```

**NOTE:** Do NOT re-export all 3229 individual icons from `src/index.ts` — that would defeat tree-shaking. Only export the DynamicIcon and createIcon utility. Users who want individual static imports should use `@vlting/ui/icons` directly.

### Part 3: Verify tree-shaking

Create a temporary test script to verify tree-shaking works:

```bash
# Check that a single icon import resolves to a small, isolated file
node -e "
const fs = require('fs');
const content = fs.readFileSync('packages/icons/generated/RiArrowRightLine.tsx', 'utf8');
console.log('Single icon file size:', Buffer.byteLength(content), 'bytes');
console.log('Content:', content);
"
```

A single icon file should be very small (< 500 bytes). The key insight: because each generated icon file imports only from `../createIcon` and has no other dependencies, bundlers can tree-shake all other icons when only one is imported.

Also verify the barrel export doesn't eagerly pull in all icons — `packages/icons/index.ts` uses `export { X } from './generated/X'` re-exports which are statically analyzable and tree-shakeable by modern bundlers (webpack, esbuild, rollup).

## Verification
- `package.json` has `./icons`, `./icons/categories`, and `./icons/dynamic` export entries
- `src/index.ts` exports `DynamicIcon`, `DynamicIconProps`, `createIcon`, `RemixIconFC`
- Single icon file is < 500 bytes (confirms tree-shaking potential)
- TypeScript compiles without errors for the new exports

## Task Progress
<!-- lat: 2026-03-01T23:55:00Z -->
<!-- agent-pid: $PPID -->
<!-- worktree: .worktrees/q-003 -->
<!-- branch: q/003 -->

### Checklist
- [ ] **ACTIVE** → Add ./icons exports to package.json
- [ ] Wire DynamicIcon into src/index.ts
- [ ] Verify tree-shaking (single icon < 500 bytes)
- [ ] Verify TypeScript compiles

### Handoff Context
- Task 001 created DynamicIcon at packages/icons/Icon.tsx
- Task 002 created category barrels in packages/icons/categories/
- Both already merged to feat/icon-system/dynamic-icon-exports
