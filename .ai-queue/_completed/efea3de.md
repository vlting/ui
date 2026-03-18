# Commit History
- efea3de — fix(docs): migrate sidebar, TOC, and search dialog (#003)

<!-- auto-queue -->
<!-- depends-on: 001 -->
<!-- target-branch: fix/docs-site/color-contrast-a11y -->

# Segment 3: Migrate Sidebar + Table of Contents + Search Dialog

## Objective
Migrate hardcoded Tailwind color classes to semantic theme tokens in the navigation and search components.

## Context
Segment 1 established semantic CSS custom properties. This segment migrates the sidebar, table of contents, and search dialog.

Current state:
- `components/docs-sidebar.tsx` — `text-gray-900 dark:text-gray-100`, `text-gray-600 dark:text-gray-400`, `bg-gray-100 dark:bg-gray-800`, `hover:bg-gray-50 dark:hover:bg-gray-800/50`
- `components/table-of-contents.tsx` — `text-gray-900 dark:text-gray-100`, `text-gray-500 dark:text-gray-400` (CONTRAST ISSUE: gray-500 on white is ~4.6:1, borderline), `text-blue-600 dark:text-blue-400`, `hover:text-gray-900 dark:hover:text-gray-200`
- `components/search-dialog.tsx` — Multiple colored badges (`bg-blue-100 text-blue-700`, `bg-purple-100 text-purple-700`, etc.), `text-gray-400`, `text-gray-500`, `border-gray-200 dark:border-gray-700`

## Instructions

### Migration Pattern (same as Segment 2)

| Old pattern | New pattern |
|------------|-------------|
| `text-gray-900 dark:text-gray-100` | `text-foreground` |
| `text-gray-600 dark:text-gray-400` | `text-foreground-secondary` |
| `text-gray-500 dark:text-gray-400` | `text-muted-foreground` |
| `border-gray-200 dark:border-gray-700` | `border-border` |
| `bg-gray-100 dark:bg-gray-800` | `bg-accent` |
| `hover:bg-gray-50 dark:hover:bg-gray-800/50` | `hover:bg-accent` |
| `bg-white dark:bg-gray-900` | `bg-background` |
| `text-blue-600 dark:text-blue-400` | `text-primary` |

### Contrast Fixes

1. **table-of-contents.tsx**: `text-gray-500` on white is borderline (~4.6:1). Migrate to `text-muted-foreground` which maps to gray-600 (#4b5563) achieving ~5.7:1 — safely passes WCAG AA.

2. **search-dialog.tsx**: The colored badges (blue, purple, green, orange) need to maintain contrast. These category badges can keep their specific colors since they serve a semantic purpose (categorizing search results). However, ensure:
   - Light mode: `text-blue-700` on `bg-blue-100` achieves good contrast (~5:1) — OK
   - Dark mode: `text-blue-300` on `bg-blue-900` — check contrast
   - Same for purple, green, orange variants
   - These colored badges are acceptable as hardcoded values since they're semantic (search result categories), not structural UI colors

3. **search-dialog.tsx**: Plain `text-gray-400` without dark variant — replace with `text-muted-foreground`
4. **search-dialog.tsx**: Plain `text-gray-500` without dark variant — replace with `text-muted-foreground`

### Files to Modify

1. **`examples/docs/components/docs-sidebar.tsx`** — Replace all gray Tailwind classes
2. **`examples/docs/components/table-of-contents.tsx`** — Replace gray classes, fix contrast
3. **`examples/docs/components/search-dialog.tsx`** — Replace structural gray classes. Keep colored category badges but ensure they have proper dark variants

## Scope
- `examples/docs/components/docs-sidebar.tsx`
- `examples/docs/components/table-of-contents.tsx`
- `examples/docs/components/search-dialog.tsx`

## Verification
- [ ] Sidebar section headings have sufficient contrast in light mode (was listed as acceptance criterion)
- [ ] Table of contents inactive links use `text-muted-foreground` (not gray-500)
- [ ] Search dialog structural colors use semantic tokens
- [ ] All text meets WCAG AA contrast in both light and dark mode
- [ ] No broken dark mode styles

## Task Progress
<!-- lat: 2026-03-02T09:35:00Z -->
<!-- agent-pid: 22715 -->
<!-- worktree: .worktrees/q-003 -->
<!-- branch: q/003 -->

### Checklist
- [ ] **ACTIVE** → Migrate docs-sidebar.tsx
- [ ] Migrate table-of-contents.tsx
- [ ] Migrate search-dialog.tsx
- [ ] Verify all files render correctly
