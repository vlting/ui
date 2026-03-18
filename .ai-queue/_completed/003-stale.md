<!-- auto-queue -->
<!-- depends-on: 001, 002 -->
<!-- target-branch: feat/docs-site/block-chart-pages -->
# Integration — Navigation Update + Build Verification

Update navigation to include all blocks individually and verify the full build.

## Context
- Segment 001 built: block-registry.ts, blocks/[name] route, block-preview.tsx
- Segment 002 built: chart-registry.ts, charts/[type] route, chart-variant-list.tsx
- Navigation currently has 15 block entries (sidebar-01 represents all 16 sidebars as one entry)
- Need to expand to include all 30 individual block entries
- Need to verify the full Next.js build completes with all new routes

## Instructions

### 1. Update `examples/docs/lib/navigation.ts`
Expand the Blocks section to include ALL 30 blocks as individual entries:
- Login 01 through Login 05 (5 entries)
- Signup 01 through Signup 05 (5 entries)
- Sidebar 01 through Sidebar 16 (16 individual entries, replacing "Sidebar 01–16")
- Dashboard 01 (1 entry)
- Mobile Tab Layout (1 entry)
- Master Detail (1 entry)
- App Shell Responsive (1 entry)

Keep the existing Charts section as-is (6 entries — already correct).

### 2. Run Full Build Verification
```bash
cd examples/docs
npx next build
```
Verify that:
- All component pages generate (57 paths)
- All block pages generate (30 paths)
- All chart pages generate (6 paths)
- Plus landing page, docs index, not-found = should be ~95+ pages total
- No build errors

### 3. TypeScript Check
```bash
npx tsc --noEmit
```

## Scope
- `examples/docs/lib/navigation.ts` (modify — expand Blocks section)

## Verification
- `npx next build` completes successfully
- `npx tsc --noEmit` passes
- Total static pages >= 95
- No broken routes or missing pages
