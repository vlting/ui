# Commit History
- `c0ae97c` feat(icon-system): add DynamicIcon component for runtime icon selection
- `b13d9ba` feat(icon-system): merge DynamicIcon component (q/001)

<!-- auto-queue -->
<!-- target-branch: feat/icon-system/dynamic-icon-exports -->

# DynamicIcon Component

Build the `DynamicIcon` component at `packages/icons/Icon.tsx` for runtime name-based icon selection with lazy loading.

## Scope
- `packages/icons/Icon.tsx` (create)

## Instructions

Create `packages/icons/Icon.tsx` that exports a `DynamicIcon` component. This component accepts an icon name (string) and variant, and dynamically loads + renders the corresponding icon.

### Props
```tsx
interface DynamicIconProps {
  name: string        // e.g. "arrow-right"
  variant?: 'line' | 'fill'  // defaults to 'line'
  size?: number | string     // defaults to 24
  color?: string             // defaults to 'currentColor'
}
```

### Implementation approach

Use `React.lazy()` with dynamic `import()` for code-splitting. Each icon is already a separate file in `packages/icons/generated/`.

1. Convert the `name` + `variant` to a PascalCase component name with `Ri` prefix:
   - `name: "arrow-right", variant: "line"` → `RiArrowRightLine`
   - `name: "arrow-right", variant: "fill"` → `RiArrowRightFill`
   - If variant is omitted, default to `"line"`
2. Use `React.lazy(() => import('./generated/RiArrowRightLine'))` to dynamically load the icon
3. Wrap in `React.Suspense` with null fallback (icons are tiny, no loading state needed)
4. Cache the lazy components in a module-level `Map<string, LazyExoticComponent>` so repeated renders of the same icon don't re-create the lazy wrapper
5. Handle unknown icon names gracefully — if the dynamic import fails, render nothing (don't crash)

### Key details
- Import `React` from `react` (need `lazy`, `Suspense`, `memo`, `useMemo`)
- The generated files use **named exports** (e.g., `export const RiArrowRightLine = ...`), so the dynamic import needs to handle this. Since each file has exactly one export, use `import('./generated/X').then(m => ({ default: m[componentName] || Object.values(m)[0] }))`
- Export `DynamicIcon` as the default export and named export
- Export the `DynamicIconProps` type
- Re-export `IconFC` from `./createIcon` for convenience

### Name conversion helper
```tsx
function toComponentName(name: string, variant: string = 'line'): string {
  const base = name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
  const variantSuffix = variant === 'fill' ? 'Fill' : variant === 'line' ? 'Line' : ''
  return `Ri${base}${variantSuffix}`
}
```

Note: Some icons like `a-b` have a `default` variant (no `-line`/`-fill` suffix). When `variant` matches neither `line` nor `fill`, don't add a suffix. Check the manifest for these cases.

## Verification
- `DynamicIcon` renders an icon when given a valid name
- Unknown names don't crash the component
- Same name renders the same lazy component (caching works)
- TypeScript compiles without errors

## Task Progress
<!-- lat: 2026-03-02T04:48:22Z -->
<!-- agent-pid: 79481 -->
<!-- worktree: .worktrees/q-001 -->
<!-- branch: q/001 -->

### Checklist
- [x] Created worktree from feat/icon-system/dynamic-icon-exports
- [x] Create packages/icons/Icon.tsx with DynamicIcon component
- [ ] **ACTIVE** → Commit and merge

### Handoff Context
- Target branch: feat/icon-system/dynamic-icon-exports
- DynamicIcon uses React.lazy() for code-splitting
- Generated files use named exports, need special import handling
- Cache lazy components in module-level Map
