# Commit History
- `a46a374` fix(docs): add default preview data for sidebar blocks
- `c2a61bd` Merge branch 'q/001' into fix/docs-site/runtime-errors-layout

---

<!-- auto-queue -->
<!-- target-branch: fix/docs-site/runtime-errors-layout -->

# Segment 1: Sidebar block default preview data

## Objective
Fix the sidebar block previews that crash because `<BlockComponent />` is rendered with no props. All 16 sidebar blocks (Sidebar01–Sidebar16) require a `groups: NavGroup[]` prop, and rendering without it causes `Cannot read properties of undefined (reading 'map')`.

## Scope
- `examples/docs/components/block-preview.tsx`

## Instructions

1. **Import types from the sidebar shared module:**
   ```ts
   import type { NavGroup } from '../../../packages/blocks/sidebar/_shared'
   ```

2. **Create default sidebar preview data** (add above the `BlockPreview` component). The data should be a `NavGroup[]` with 2-3 groups and a few items each. Use simple inline SVG icons (small house, gear, user icons) since we can't rely on `@tamagui/lucide-icons` being available in the docs context. Example structure:
   ```ts
   const defaultSidebarGroups: NavGroup[] = [
     {
       label: 'Main',
       items: [
         { label: 'Home', icon: <HouseIcon />, href: '#', active: true },
         { label: 'Dashboard', icon: <LayoutIcon />, href: '#' },
         { label: 'Projects', icon: <FolderIcon />, href: '#' },
       ],
     },
     {
       label: 'Settings',
       items: [
         { label: 'General', icon: <GearIcon />, href: '#' },
         { label: 'Profile', icon: <UserIcon />, href: '#' },
       ],
     },
   ]
   ```
   Define small inline SVG icon components (e.g., `function HouseIcon() { return <svg ...>...</svg> }`) — keep them simple, ~16x16 viewBox, stroke-based.

3. **Pass default props when rendering sidebar blocks.** On line 169, change:
   ```tsx
   <BlockComponent />
   ```
   to conditionally pass props based on the slug:
   ```tsx
   {slug.startsWith('sidebar-') ? (
     <BlockComponent groups={defaultSidebarGroups} />
   ) : (
     <BlockComponent />
   )}
   ```

4. **Verify** that the block-preview still compiles with no TypeScript errors and that the pattern is clean.

## Verification
- No TypeScript errors in `block-preview.tsx`
- Sidebar block slugs (`sidebar-01` through `sidebar-16`) receive default `groups` data
- Non-sidebar blocks are unaffected (still rendered with no props)

## Task Progress
<!-- lat: 2026-03-02T17:39:45Z -->
<!-- agent-pid: 67492 -->
<!-- worktree: .worktrees/q-001 -->
<!-- branch: q/001 -->

### Checklist
- [x] Created worktree from target branch
- [x] Import NavGroup type and create default sidebar preview data
- [x] Pass default props for sidebar blocks in BlockPreview
- [x] Verified no TypeScript errors (all errors are pre-existing in other files)

### Handoff Context
- Target branch: fix/docs-site/runtime-errors-layout
- Only file to modify: examples/docs/components/block-preview.tsx
