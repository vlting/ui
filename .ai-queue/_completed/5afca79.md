<!-- auto-queue -->
<!-- target-branch: feat/chart-system/core-charts -->

# Fix: BarChart API mismatch + install victory + lint fixes

Fixes for Stage 2 (#42) iteration 1: BarChart imports from `victory-native` v41 Skia API which is not installed. The project dependency is `victory` v37 (SVG-based). Need to rewrite BarChart, install victory, fix tests, and fix lint errors.

## Scope
- `package.json` (verify `victory` dep is correct)
- `packages/components/Chart/BarChart.tsx` (rewrite — major)
- `packages/components/Chart/CoreCharts.test.tsx` (modify — update BarChart mocks)
- `packages/components/Chart/AreaChart.tsx` (modify — lint fixes only)
- `packages/components/Chart/LineChart.tsx` (modify — lint fixes only)

## Context
- Stage 2 of Chart System epic (#40, sub-issue #42), iteration 1
- Feature flag: `chart_system`
- **CRITICAL**: The `package.json` has `"victory": "^37.3.6"` but `yarn install` has NOT been run. Run `yarn install` FIRST.
- `victory-native` is still in `node_modules/` as a stale leftover — it will be removed by `yarn install`
- After install, `victory` v37 provides: `VictoryChart`, `VictoryBar`, `VictoryStack`, `VictoryGroup`, `VictoryAxis`, `VictoryVoronoiContainer`, `VictoryLabel`
- See `LineChart.tsx` for the correct pattern using `victory` package
- AreaChart uses raw `react-native-svg` (no victory) — that's fine, don't change its approach

## Instructions

### 1. Install dependencies
```bash
yarn install
```
This will install `victory` v37 and clean up stale `victory-native` from node_modules.

**If `victory` has no TypeScript types bundled**, check if `@types/victory` exists. If not, create a `packages/components/Chart/victory.d.ts` declaration file:
```typescript
declare module 'victory' {
  import type { ComponentType } from 'react'
  export const VictoryChart: ComponentType<any>
  export const VictoryBar: ComponentType<any>
  export const VictoryLine: ComponentType<any>
  export const VictoryScatter: ComponentType<any>
  export const VictoryStack: ComponentType<any>
  export const VictoryGroup: ComponentType<any>
  export const VictoryAxis: ComponentType<any>
  export const VictoryVoronoiContainer: ComponentType<any>
  export const VictoryLabel: ComponentType<any>
  export const VictoryPie: ComponentType<any>
}
```

### 2. Rewrite BarChart.tsx to use `victory` package

The current BarChart uses `victory-native` v41 Skia API (`CartesianChart`, `Bar`, `StackedBar`, `BarGroup`, `useChartPressState`). Rewrite it to use `victory` v37 SVG API.

**Replace all imports from `victory-native` with imports from `victory`:**
```tsx
import {
  VictoryChart,
  VictoryBar,
  VictoryStack,
  VictoryGroup,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryLabel,
} from 'victory'
```

**Rewrite the component to use Victory SVG pattern** (see LineChart.tsx for reference):
- Use `VictoryChart` as the container (not `CartesianChart`)
- Use `VictoryBar` instead of `Bar`
- Use `VictoryStack` instead of `StackedBar` — wrap multiple `VictoryBar` children
- Use `VictoryGroup` with `offset` prop for grouped variant — wrap multiple `VictoryBar` children
- Use `VictoryAxis` for axes
- Use `VictoryVoronoiContainer` for interactive variant
- Use `VictoryLabel` for labels
- Remove `useChartPressState` entirely (victory v37 doesn't have this)
- Get `dimensions` from `useChartContext()` (add it — currently only gets `resolvedColors` and `victoryTheme`)
- Pass `victoryTheme as any` to VictoryChart's `theme` prop
- For horizontal: use VictoryChart `horizontal` prop or swap x/y data
- For labels: use VictoryBar's `labels` prop: `labels={({ datum }) => datum.y}`
- For negative values: Victory handles negative bars automatically (axis at y=0)
- For active variant: use `style.data` with conditional opacity based on `activeBarIndex`

**Key pattern (from LineChart):**
```tsx
const { config, resolvedColors, victoryTheme, dimensions } = useChartContext()
const seriesKeys = Object.keys(config)

return (
  <>
    <VictoryChart
      width={dimensions.width}
      height={dimensions.height}
      theme={victoryTheme as any}
      containerComponent={isInteractive ? <VictoryVoronoiContainer /> : undefined}
      padding={victoryTheme.chart.padding}
    >
      {showXAxis && <VictoryAxis />}
      {showYAxis && <VictoryAxis dependentAxis />}
      {isStacked ? (
        <VictoryStack>
          {seriesKeys.map(key => (
            <VictoryBar key={key} data={data} x={xAxisKey} y={key}
              style={{ data: { fill: resolvedColors[key] } }}
              barWidth={barWidth}
              cornerRadius={cornerRadius ? { top: cornerRadius } : undefined}
            />
          ))}
        </VictoryStack>
      ) : isGrouped ? (
        <VictoryGroup offset={barWidth ? barWidth + 4 : 20}>
          {seriesKeys.map(key => (
            <VictoryBar key={key} data={data} x={xAxisKey} y={key}
              style={{ data: { fill: resolvedColors[key] } }}
              barWidth={barWidth}
            />
          ))}
        </VictoryGroup>
      ) : (
        seriesKeys.map(key => (
          <VictoryBar key={key} data={data} x={xAxisKey} y={key}
            style={{ data: { fill: resolvedColors[key] } }}
            barWidth={barWidth}
          />
        ))
      )}
    </VictoryChart>
    {hasLegend && <ChartLegend config={config} />}
  </>
)
```

**Preserve all 10 variants:** default, horizontal, stacked, grouped, negative, label, mixed, custom-label, active, interactive.

**Keep the existing `BarChartProps` interface and `BarChartVariant` type.**

### 3. Update CoreCharts.test.tsx

Replace the `victory-native` mock with a `victory` mock for BarChart:

```tsx
// Replace this:
jest.mock('victory-native', () => { ... })

// With: merge BarChart mocks into the existing `victory` mock
jest.mock('victory', () => {
  const R = require('react')
  return {
    VictoryChart: (p: any) => R.createElement('div', { 'data-testid': 'victory-chart' }, p.children),
    VictoryBar: () => R.createElement('div', { 'data-testid': 'victory-bar' }),
    VictoryLine: () => R.createElement('div', { 'data-testid': 'victory-line' }),
    VictoryScatter: () => R.createElement('div', { 'data-testid': 'victory-scatter' }),
    VictoryStack: (p: any) => R.createElement('div', { 'data-testid': 'victory-stack' }, p.children),
    VictoryGroup: (p: any) => R.createElement('div', { 'data-testid': 'victory-group' }, p.children),
    VictoryAxis: () => R.createElement('div', { 'data-testid': 'victory-axis' }),
    VictoryVoronoiContainer: () => R.createElement('div'),
    VictoryLabel: () => R.createElement('span'),
  }
}, { virtual: true })
```

**Also remove the `{ virtual: true }` if `victory` is now a real installed dependency.**

Update the BarChart test assertions to match the new Victory API output:
- `victory-chart` testid should still be present (VictoryChart mock)
- `victory-stack` testid for stacked variant (VictoryStack mock)
- `victory-group` testid for grouped variant (VictoryGroup mock)

### 4. Fix Biome lint errors

Run `npx biome check --fix packages/components/Chart/AreaChart.tsx packages/components/Chart/BarChart.tsx packages/components/Chart/LineChart.tsx packages/components/Chart/CoreCharts.test.tsx` and fix remaining errors.

Common issues to watch for:
- `any` types — use more specific types where possible, or add `// biome-ignore` comments with justification for necessary `any` usage (Victory's types require it)
- Unused variables — remove or prefix with `_`
- Prefer `for...of` over indexed loops where applicable

### 5. Verification

After all changes:
```bash
npx tsc --noEmit
yarn test -- --testPathPattern="(Chart|CoreChart)"
npx biome check packages/components/Chart/AreaChart.tsx packages/components/Chart/BarChart.tsx packages/components/Chart/LineChart.tsx packages/components/Chart/CoreCharts.test.tsx
```

All must pass cleanly.

## Task Progress
<!-- lat: 2026-03-02T06:30:00Z -->
<!-- agent-pid: 36295 -->
<!-- worktree: .worktrees/q-001 -->
<!-- branch: q/001 -->

### Checklist
- [ ] **ACTIVE** → Create worktree from feat/chart-system/core-charts
- [ ] Run yarn install to install victory package
- [ ] Handle victory TypeScript types
- [ ] Rewrite BarChart.tsx to use victory API
- [ ] Update CoreCharts.test.tsx mocks
- [ ] Fix lint errors
- [ ] Verify TypeScript + tests + lint pass
- [ ] Commit, rebase, merge

### Handoff Context
- BarChart currently uses victory-native v41 Skia API (CartesianChart, Bar, StackedBar, BarGroup, useChartPressState)
- Need to rewrite to use victory v37 SVG API (VictoryChart, VictoryBar, VictoryStack, VictoryGroup)
- LineChart.tsx is the reference for correct victory v37 usage pattern
- AreaChart.tsx uses react-native-svg directly — leave it as-is
