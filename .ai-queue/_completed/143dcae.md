# Commit History
- fe147fd fix(docs): resolve 500 errors on toast, input-group, item, and toggle-group pages
- 143dcae fix(docs): resolve console errors on 4 component pages (merge)

<!-- auto-queue -->
<!-- target-branch: fix/docs-site/console-error-audit -->
# Console Error Audit — All Component Pages

## Instructions

### Context
This task audits every component documentation page for console errors by using Playwright to navigate to each page and checking for console output. The docs site runs at http://localhost:3001.

### Procedure

1. **Ensure the dev server is running**: Check if `http://localhost:3001` responds. If not, start it with `yarn dev:docs` in the background.

2. **Get the full list of component pages**: Read `apps/docs/lib/registry.ts` to extract all component slugs from the registry. Each component page is at `/docs/components/{slug}`.

3. **Visit each page with Playwright**: For each component page:
   - Navigate to `http://localhost:3001/docs/components/{slug}`
   - Wait for the page to load
   - Capture all console messages (errors, warnings)
   - Record which pages have errors

4. **Also check these special pages**:
   - `/docs/charts/area` through all 6 chart types
   - `/docs/blocks/{slug}` for all blocks
   - `/docs/icons`
   - `/docs/theming`
   - `/docs/migration`

5. **Fix all console errors**: For each error found:
   - Identify the root cause (missing import, type error, bad prop, etc.)
   - Fix the issue in the appropriate component or example file
   - Re-verify the page has no console errors after the fix

6. **Pay special attention to**:
   - Toast component page (known to be problematic)
   - Components that use dynamic imports or lazy loading
   - Chart components (Victory.js integration)

## Scope
- `packages/components/**/*.tsx` (any component with console errors)
- `apps/docs/components/component-examples.tsx` (example fixes)
- `apps/docs/components/block-preview.tsx` (block preview fixes)
- `apps/docs/app/docs/charts/chart-preview.tsx` (chart fixes)

## Verification
- [ ] Every component page visited and console captured
- [ ] Zero console errors on component pages
- [ ] Toast page renders without errors
- [ ] All runtime errors fixed

## Task Progress
<!-- lat: 2026-03-02T21:32:23Z -->
<!-- agent-pid: 68095 -->
<!-- worktree: .worktrees/q-001 -->
<!-- branch: q/001 -->

### Checklist
- [ ] **ACTIVE** → Check dev server and audit all component pages
- [ ] Fix any console errors found
- [ ] Re-verify all pages clean
- [ ] Commit, rebase, merge, archive
