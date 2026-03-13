# Plan: App Build Verification Guardrail

## Context

Apps in `apps/` keep breaking on first page load and nothing catches it. The CI pipeline (`quality.yml`) runs lint, typecheck, unit tests, token validation, and showcase-web e2e — but **never builds or loads the docs app**. There's no rule requiring AI agents to verify apps after changes either. Two gaps, two fixes.

## Status: BLOCKED

The CI job will fail immediately due to pre-existing build errors:
- docs: `'use client'` directive issues in server components importing hooks
- showcase-web: TS errors in `ComponentsPage.tsx` and `FormsPage.tsx` (`.Root` not found on components)

**Must fix existing breakage first**, then add the CI job as blocking from day one.

---

## Approach: Two-Layer Guardrail

### Layer 1 — CI: `build-and-smoke` job in `quality.yml`

Add a single job that builds both web apps and smoke-tests docs.

**Modify:** `.github/workflows/quality.yml`

```yaml
build-and-smoke:
  name: Build Apps & Smoke Test
  runs-on: ubuntu-latest
  needs: [lint, typecheck]
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: yarn
    - run: yarn install --frozen-lockfile
    - run: yarn build:stl
    - name: Build showcase-web
      working-directory: apps/showcase-web
      run: yarn build
    - name: Build docs
      run: yarn build:docs
    - run: npx playwright install --with-deps chromium
    - name: Smoke test docs
      working-directory: apps/docs
      run: npx playwright test
    - uses: actions/upload-artifact@v4
      if: failure()
      with:
        name: docs-smoke-results
        path: apps/docs/test-results/
        retention-days: 7
```

### Layer 2 — AI Constitution: Section 9

**Modify:** `AI_CONSTITUTION.md` — add:

```markdown
# 9. App Build Verification

Any change to `packages/`, `src/`, or shared config MUST be verified against consuming apps before committing.

## Required

After modifying any package or shared source:
1. `yarn build:stl` — must exit 0
2. `yarn build:docs` — must exit 0

After modifying `apps/docs/` or `apps/showcase-web/`:
1. Build the changed app
2. Load it in a browser or run its smoke tests

If a build fails, fix the root cause. Do not skip.
```

---

## New Files

### `apps/docs/e2e/smoke.spec.ts`

```typescript
import { expect, test } from '@playwright/test'

test('homepage loads without errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (err) => errors.push(err.message))

  await page.goto('/')
  await page.waitForLoadState('networkidle')

  await expect(page.locator('h1')).toBeVisible()
  expect(errors).toEqual([])
})

test('docs section loads without errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (err) => errors.push(err.message))

  await page.goto('/docs')
  await page.waitForLoadState('networkidle')

  await expect(page.locator('main')).toBeVisible()
  expect(errors).toEqual([])
})
```

### `apps/docs/playwright.config.ts`

Chromium only, `webServer` builds+serves on :3000.

---

## Files Summary

| File | Action |
|---|---|
| `.github/workflows/quality.yml` | Add `build-and-smoke` job |
| `apps/docs/e2e/smoke.spec.ts` | Create (2 smoke tests) |
| `apps/docs/playwright.config.ts` | Create |
| `apps/docs/package.json` | Add `@playwright/test`, `test:e2e` script |
| `package.json` (root) | Add `test:e2e:docs` script |
| `AI_CONSTITUTION.md` | Add section 9 |

## Prerequisite Work

Before this plan can land:
1. Fix docs build errors (`'use client'` directives on server component pages)
2. Fix showcase-web TS errors (`.Root` compound component references)
3. Add missing `import '@vlting/stl/styles'` in both apps
4. Verify both `yarn build:docs` and `cd apps/showcase-web && yarn build` exit 0

## Verification

1. `yarn build:docs` exits 0
2. `npx playwright test` in `apps/docs/` passes
3. Push to branch, verify CI `build-and-smoke` job passes
