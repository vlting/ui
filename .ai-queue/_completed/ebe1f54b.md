<!-- LAT: 2026-03-11T03:29:23Z -->
<!-- PID: 77812 -->
<!-- auto-queue -->
<!-- target-branch: feat/theme-overhaul/docs-tailwind-removal -->
# Task: Convert docs content pages from Tailwind to STL

## Context
Replacing Tailwind utility classes with STL styling in all docs page files. These are Next.js page components that display documentation content.

## Available STL Tools
- `styled('div', { display: 'flex', gap: '$4' })` from `@vlting/stl-react`
- Token refs: `'$4'` → space, `'$primary9'` → color, `'$background'` → semantic
- Conditions: `{ dark: {...} }`, `{ md: {...} }`, `{ ':hover': {...} }`

## Files to convert

### 1. `apps/docs/app/page.tsx` (~15 className occurrences)
Homepage with hero section, feature grid, quick links.

### 2. `apps/docs/app/docs/page.tsx` (~7 className occurrences)
Docs index page.

### 3. `apps/docs/app/docs/components/[name]/page.tsx` (~34 className occurrences)
Component detail page with tabs, variant showcase, prop tables, examples. This is the most complex page.

### 4. `apps/docs/app/docs/hooks/page.tsx` (~8 className occurrences)
Hooks index page.

### 5. `apps/docs/app/docs/hooks/[name]/page.tsx` (~30 className occurrences)
Hook detail page with code examples, API table.

### 6. `apps/docs/app/docs/utilities/page.tsx` (~10 className occurrences)
Utilities index with card grid.

### 7. `apps/docs/app/docs/utilities/[name]/page.tsx` (~24 className occurrences)
Utility detail page.

### 8. `apps/docs/app/docs/blocks/[name]/page.tsx` (~10 className occurrences)
Block detail page.

### 9. `apps/docs/app/docs/charts/[type]/page.tsx` (~17 className occurrences)
Chart detail page with variant grid.

### 10. `apps/docs/app/docs/migration/page.tsx` (~4 className occurrences)
Migration guide page.

### 11. `apps/docs/app/docs/dark-mode/page.tsx` (if it has Tailwind classes)
Dark mode documentation page. Also: update any references to `next-themes` in the documentation content since we removed it.

## Approach
For each file:
1. Read the file to understand current Tailwind usage
2. Create page-level styled components using `styled()` from `@vlting/stl-react`
3. Replace all `className="..."` patterns
4. Common patterns to reuse:
   - Page container: `styled('main', { maxWidth: '$960', mx: 'auto', py: '$6' })`
   - Section heading: `styled('h2', { fontSize: '$h3', fontWeight: '$600', mb: '$3' })`
   - Card grid: `styled('div', { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '$4' })`
   - Link card: `styled('a', { display: 'block', padding: '$4', borderRadius: '$4', border: '1px solid var(--stl-borderColor)', ':hover': { background: '$surface1' } })`

## Rules
- NO inline styles for token-expressible values
- NO Tailwind utility classes remaining
- ALL colors → STL tokens, ALL spacing → STL tokens
- Shared styled components across pages should be defined at the top of each file (don't create shared files — keep it simple)
- If dark-mode docs reference `next-themes`, update the documentation to reference `useColorMode()` from `@vlting/stl-react`

## Acceptance criteria
- Zero Tailwind utility classes in all page files
- All pages render with proper layout and spacing
- Responsive behavior preserved (grids collapse on mobile)
- Dark mode documentation updated to reference STL color mode API
- No visual regressions on content layout