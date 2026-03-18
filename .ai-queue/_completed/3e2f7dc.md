<!-- auto-queue -->
<!-- target-branch: feat/docs-site/foundation -->

# Segment 1: Next.js App Scaffold + Package Config

Set up the Next.js 15 docs app in `examples/docs/`.

## Instructions

1. Create `examples/docs/package.json`:
   - Name: `@vlting/examples-docs`
   - Dependencies: `next` ^15, `react` 19.1.0, `react-dom` 19.1.0, `@vlting/ui` (workspace:*), `next-themes`, `react-native-web` ^0.21.2, `react-native-svg-web` ^1.0.9, `tamagui` 2.0.0-rc.14
   - DevDependencies: `typescript` ~5.9.2, `@types/react` ~19.1.0, `tailwindcss` ^4, `@tailwindcss/postcss` ^4
   - Scripts: `dev`, `build`, `start`

2. Create `examples/docs/next.config.mjs`:
   - Configure webpack aliases for `react-native` → `react-native-web`, `react-native-svg` → `react-native-svg-web`
   - Transpile `@vlting/ui` and `tamagui` packages
   - Enable MDX support if using `@next/mdx`

3. Create `examples/docs/tsconfig.json`:
   - Extend from a clean base, target ES2020
   - jsx: "react-jsx" (Next.js default with preserve)
   - Path aliases: `@vlting/ui` → `../../src`, `@/` → `./`
   - Include: `next-env.d.ts`, `**/*.ts`, `**/*.tsx`

4. Create `examples/docs/tailwind.config.ts`:
   - Content paths: `./app/**/*.{ts,tsx}`, `./components/**/*.{ts,tsx}`
   - Minimal config — Tailwind is only for docs-site layout/prose, not for component styling

5. Create `examples/docs/postcss.config.mjs`:
   - Standard PostCSS config for Tailwind v4

6. Add to root `package.json`:
   - Script: `"dev:docs": "yarn workspace @vlting/examples-docs dev"`

7. Create `examples/docs/app/globals.css`:
   - Import Tailwind base/components/utilities
   - Basic resets for the docs site

## Scope
- examples/docs/package.json
- examples/docs/next.config.mjs
- examples/docs/tsconfig.json
- examples/docs/tailwind.config.ts
- examples/docs/postcss.config.mjs
- examples/docs/app/globals.css
- package.json (root — add dev:docs script only)

## Verification
- `cd examples/docs && npx next build` should not error on config (may error on missing pages, that's fine)
- TypeScript config resolves `@vlting/ui` imports

## Task Progress
<!-- lat: 2026-03-02T09:10:00Z -->
<!-- agent-pid: 68359 -->
<!-- worktree: .worktrees/q-001 -->
<!-- branch: q/001 -->

### Checklist
- [ ] **ACTIVE** → Create worktree and set up examples/docs/ directory
- [ ] Create package.json for docs app
- [ ] Create next.config.mjs
- [ ] Create tsconfig.json
- [ ] Create tailwind.config.ts + postcss.config.mjs
- [ ] Create globals.css
- [ ] Add dev:docs script to root package.json
- [ ] Verify build works
- [ ] Commit, rebase, merge
