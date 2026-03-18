<!-- auto-queue -->
<!-- depends-on: 001, 002, 003 -->
<!-- target-branch: feat/chart-system/specialized-charts -->

# Specs, Tests & Updated Barrel Exports for Specialized Charts

Create specs, tests, and update exports for PieChart, RadarChart, RadialChart.

## Scope
- `packages/components/Chart/PieChart.spec.md`
- `packages/components/Chart/RadarChart.spec.md`
- `packages/components/Chart/RadialChart.spec.md`
- `packages/components/Chart/SpecializedCharts.test.tsx`
- update `packages/components/Chart/types.ts`
- update `packages/components/Chart/index.ts`
- update `packages/components/index.ts`
- update `src/index.ts`

## Instructions

### 1. Spec Files

Create spec.md files for all 3 chart types. Follow the pattern established by `AreaChart.spec.md`, `BarChart.spec.md`, and `LineChart.spec.md`. Use the template at `packages/_templates/component.spec.template.md`.

Each spec should include these sections:
1. **Purpose** — When to use / not use this chart type
2. **UX Intent** — Primary goal, mental model
3. **Anatomy** — Sub-components, slots
4. **Behavior** — All variants listed with brief description, states, keyboard interaction
5. **Accessibility** — Semantic element, ARIA, focus, screen reader
6. **Styling** — Design tokens, responsive, reduced-motion, dark mode
7. **Composition** — Must be child of `<Chart>`, pairs with ChartLegend/ChartTooltip
8. **Breaking Change Criteria**
9. **Test Requirements**

**PieChart.spec.md:** 11 variants (default, donut, donut-text, donut-active, label, custom-label, label-list, legend, separator, interactive, stacked)

**RadarChart.spec.md:** 14 variants (default, dots, lines, custom, multiple, grid-circle, grid-filled, grid-none, legend, icons, radius-axis, label, custom-shape, interactive)

**RadialChart.spec.md:** 6 variants (default, grid, label, stacked, text, shape)

### 2. Test File

Create `SpecializedCharts.test.tsx` following the pattern in `CoreCharts.test.tsx`.

```tsx
import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Chart } from './Chart'
import { PieChart } from './PieChart'
import { RadarChart } from './RadarChart'
import { RadialChart } from './RadialChart'
import type { ChartConfig, ChartDataPoint } from './types'
```

**Mock react-native-svg** (same mock as CoreCharts.test.tsx uses):
```tsx
jest.mock('react-native-svg', () => {
  const R = require('react')
  return {
    __esModule: true,
    default: R.forwardRef((props: any, ref: any) =>
      R.createElement('svg', { ref, ...props }, props.children),
    ),
    Svg: R.forwardRef((props: any, ref: any) =>
      R.createElement('svg', { ref, ...props }, props.children),
    ),
    Path: (props: any) => R.createElement('path', { 'data-testid': 'svg-path', ...props }),
    G: (props: any) => R.createElement('g', null, props.children),
    Circle: (props: any) => R.createElement('circle', props),
    Line: (props: any) => R.createElement('line', props),
    Polygon: (props: any) => R.createElement('polygon', props),
    Text: (props: any) => R.createElement('text', null, props.children),
    Rect: (props: any) => R.createElement('rect', props),
    Defs: (props: any) => R.createElement('defs', null, props.children),
    LinearGradient: (props: any) => R.createElement('linearGradient', null, props.children),
    Stop: (props: any) => R.createElement('stop', props),
  }
})
```

**Test fixtures:**
```tsx
const mockConfig: ChartConfig = {
  revenue: { label: 'Revenue', color: '$blue8' },
  expenses: { label: 'Expenses', color: '$red8' },
  profit: { label: 'Profit', color: '$green8' },
}

const mockPieData: ChartDataPoint[] = [
  { x: 'Revenue', y: 400, revenue: 400 },
  { x: 'Expenses', y: 300, expenses: 300 },
  { x: 'Profit', y: 200, profit: 200 },
]

const mockRadarData: ChartDataPoint[] = [
  { x: 'Speed', y: 80, revenue: 80, expenses: 60 },
  { x: 'Power', y: 90, revenue: 90, expenses: 70 },
  { x: 'Range', y: 70, revenue: 70, expenses: 85 },
  { x: 'Efficiency', y: 60, revenue: 60, expenses: 90 },
  { x: 'Cost', y: 50, revenue: 50, expenses: 40 },
]

const mockRadialData: ChartDataPoint[] = [
  { x: 'Progress', y: 75, revenue: 75, expenses: 50 },
]
```

**Wrapper helper:**
```tsx
function chartWrapper(children: React.ReactNode) {
  return (
    <Chart config={mockConfig} accessibilityLabel="Test chart" width={400} height={300}>
      {children}
    </Chart>
  )
}
```

**Test structure:**
```tsx
describe('PieChart', () => {
  it('renders without crashing', () => { ... })
  it('renders donut variant', () => { ... })
  it('renders with legend', () => { ... })
  it('renders label variant with text elements', () => { ... })
})

describe('RadarChart', () => {
  it('renders without crashing', () => { ... })
  it('renders with dots variant', () => { ... })
  it('renders multiple series', () => { ... })
  it('renders circle grid variant', () => { ... })
})

describe('RadialChart', () => {
  it('renders without crashing', () => { ... })
  it('renders grid variant with background tracks', () => { ... })
  it('renders text variant with center text', () => { ... })
})
```

Each test should:
- Wrap the chart component in `chartWrapper()`
- Verify it renders without throwing
- Check for expected SVG elements via testid
- For legend variants, check that legend items render with config labels

### 3. Type Updates

Add to `packages/components/Chart/types.ts`:
```tsx
export type PieChartVariant = 'default' | 'donut' | 'donut-text' | 'donut-active' | 'label' | 'custom-label' | 'label-list' | 'legend' | 'separator' | 'interactive' | 'stacked'

export type RadarChartVariant = 'default' | 'dots' | 'lines' | 'custom' | 'multiple' | 'grid-circle' | 'grid-filled' | 'grid-none' | 'legend' | 'icons' | 'radius-axis' | 'label' | 'custom-shape' | 'interactive'

export type RadialChartVariant = 'default' | 'grid' | 'label' | 'stacked' | 'text' | 'shape'
```

### 4. Barrel Export Updates

**`packages/components/Chart/index.ts`** — Add:
```tsx
export { PieChart } from './PieChart'
export type { PieChartProps } from './PieChart'
export { RadarChart } from './RadarChart'
export type { RadarChartProps } from './RadarChart'
export { RadialChart } from './RadialChart'
export type { RadialChartProps } from './RadialChart'
```

Also export the new variant types from `./types`.

**`packages/components/index.ts`** — Add PieChart, RadarChart, RadialChart exports following the pattern used for AreaChart, BarChart, LineChart.

**`src/index.ts`** — Add PieChart, RadarChart, RadialChart to Layer 2 exports following the pattern used for AreaChart, BarChart, LineChart.

### 5. Run Tests

After writing everything, run:
```bash
yarn test -- --testPathPattern="(Chart|CoreChart|SpecializedChart)"
```

Fix any test failures before committing.

## Verification
- All spec.md files follow the component spec template
- Tests pass for all 3 chart types
- New variant types exported from types.ts
- All 3 chart components exported from Chart/index.ts
- Components exported from packages/components/index.ts
- Components exported from src/index.ts

## Task Progress
<!-- lat: 2026-03-02T06:48:58Z -->
<!-- agent-pid: 36295 -->
<!-- worktree: .worktrees/q-004 -->
<!-- branch: q/004 -->

### Checklist
- [ ] **ACTIVE** → Create worktree
- [ ] Add variant types to types.ts
- [ ] Write spec files for PieChart, RadarChart, RadialChart
- [ ] Write SpecializedCharts.test.tsx
- [ ] Update barrel exports (Chart/index.ts, components/index.ts, src/index.ts)
- [ ] Run tests and verify passing
- [ ] Commit and merge to target branch

### Handoff Context
- PieChart, RadarChart, RadialChart all merged to feat/chart-system/specialized-charts
- All use custom SVG via react-native-svg (not Victory)
- Variant types currently defined locally in each component file — need to centralize in types.ts
