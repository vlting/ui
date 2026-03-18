# Commit History
- `15f5ea9` — feat(docs): add chart documentation route with 6 types and 61 variants
- `f7ae6a9` — merge (002)

<!-- auto-queue -->
<!-- target-branch: feat/docs-site/block-chart-pages -->
# Chart Documentation Route + Registry

Build the chart documentation system with a registry, dynamic route, and example renderers.

## Context
- 6 chart types: area, bar, line, pie, radar, radial
- Charts ARE available from `@vlting/ui` (Epic 4 Chart System is complete and on main)
- Each chart type has multiple variants (area=10, bar=10, line=10, pie=11, radar=14, radial=6)
- Chart API mapping exists at `packages/components/Chart/api-mapping.json`
- Charts render inside a `<Chart>` container using Victory Native + react-native-svg
- The component registry pattern from `examples/docs/lib/registry.ts` should be followed
- Tamagui v2 RC GetFinalProps bug applies — use AnyFC cast pattern for all @vlting/ui imports

## Important: Tamagui v2 RC Compatibility
- Use `type AnyFC = ComponentType<any>` and cast all @vlting/ui chart imports
- Chart components may be plain objects or callable — check their export pattern
- If they're plain objects with `.Root`, cast as `{ Root: AnyFC; ... }`
- If callable (withStaticProperties), cast as `AnyFC & { ... }`

## Instructions

### 1. Create `examples/docs/lib/chart-registry.ts`
Define a `ChartEntry` interface and registry with metadata for all 6 chart types:

```typescript
export interface ChartVariant {
  name: string         // e.g. "Default", "Gradient", "Stacked"
  description: string
  code: string         // JSX code example for this variant
}

export interface ChartEntry {
  name: string         // e.g. "Area Chart"
  slug: string         // e.g. "area"
  description: string
  importPath: string
  variants: ChartVariant[]
  whenToUse?: string[]
  whenNotToUse?: string[]
}
```

Chart entries (use descriptions from spec files at `packages/components/Chart/*.spec.md`):
- **area**: Trends over time, cumulative values. Variants: default, gradient, stacked, expanded, step, axes, interactive, legend, linear, icons
- **bar**: Comparing discrete categories. Variants: default, horizontal, stacked, grouped, negative, label, mixed, custom-label, active, interactive
- **line**: Trends & comparing series. Variants: default, dots, multiple, labels, stepped, custom-dots, interactive, linear, legend, icons
- **pie**: Proportions of a whole. Variants: default, donut, donut-text, donut-active, label, custom-label, label-list, legend, separator, interactive, stacked
- **radar**: Multi-variable comparison. Variants: default, dots, lines, custom, multiple, grid-circle, grid-filled, grid-none, legend, icons, radius-axis, label, custom-shape, interactive
- **radial**: Progress/gauges, circular layouts. Variants: default, grid, label, stacked, text, shape

For each variant, write a representative JSX code string showing usage. Include sample data inline. Example:
```tsx
code: `<Chart config={chartConfig}>
  <AreaChart
    data={[
      { month: "Jan", value: 186 },
      { month: "Feb", value: 305 },
      { month: "Mar", value: 237 },
    ]}
    variant="default"
    accessibilityLabel="Monthly trend area chart"
  />
</Chart>`
```

For the first 2-3 variants of each chart type, write detailed code examples with sample data. For remaining variants, a simpler example is fine (just the variant prop change).

Export helpers: `getChart(slug)`, `getAllCharts()`

### 2. Create `examples/docs/app/docs/charts/[type]/page.tsx`
Dynamic server component route:
- `generateStaticParams()` returns all 6 chart type slugs
- `generateMetadata()` for page titles
- Page sections:
  - **Header**: Chart name, description
  - **When to use / When NOT to use**: From registry
  - **Variants**: For each variant, show a CodeBlock with the code example
  - **API Reference**: Load the chart api-mapping.json and use PropTable (or a simplified version)

Note: Do NOT attempt to render charts live in the docs for now. Charts use Victory Native which requires react-native-svg setup. Just show code examples via CodeBlock. If you want, you can add a placeholder "Live preview requires react-native-svg setup" similar to the blocks approach.

### 3. Create `examples/docs/components/chart-variant-list.tsx`
A simple component that renders a list of chart variants, each with:
- Variant name as heading
- Description
- CodeBlock with the code example
- This is a server component (uses async CodeBlock)

## Scope
- `examples/docs/lib/chart-registry.ts` (new)
- `examples/docs/app/docs/charts/[type]/page.tsx` (new)
- `examples/docs/components/chart-variant-list.tsx` (new)

## Verification
- `npx tsc --noEmit` passes
- All 6 chart slugs are in the registry
- `getChart('area')` returns correct entry with variants
- Each chart has at least 3 detailed variant examples

## Task Progress
<!-- lat: 2026-03-02T22:55:00Z -->
<!-- agent-pid: $PPID -->
<!-- worktree: .worktrees/q-002 -->
<!-- branch: q/002 -->

### Checklist
- [ ] **ACTIVE** → Create worktree and chart-registry.ts
- [ ] Create charts/[type]/page.tsx dynamic route
- [ ] Create chart-variant-list.tsx
- [ ] TypeScript check
- [ ] Commit, rebase, merge
