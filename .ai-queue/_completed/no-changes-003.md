<!-- LAT: 2026-03-10T04:46:16Z -->
<!-- PID: 28592 -->
<!-- auto-queue -->
<!-- target-branch: feat/component-quality/visual-polish -->
# Task: Update Playwright baselines for polished components

## Goal
Capture updated Playwright screenshot baselines after visual polish changes.

## Instructions

1. Wait for tasks 001 and 002 to merge first (check the branch for their commits).

2. Build STL:
   ```bash
   cd packages/stl && npx vite build
   ```

3. Run the showcase-web dev server and update Playwright snapshots:
   ```bash
   cd apps/showcase-web
   npx playwright test --update-snapshots
   ```

4. If tests fail due to missing pages or broken routes, skip those tests and capture what works.

5. Commit the updated baseline screenshots.

6. Verify dark mode baselines are also captured (the tests should cover both modes).

## Dependencies
This task depends on 001 and 002 completing first. Check `git log` on the target branch for their merge commits before starting.

## Key files
- `apps/showcase-web/e2e/*.spec.ts`
- `apps/showcase-web/e2e/*.spec.ts-snapshots/`
