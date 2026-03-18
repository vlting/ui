<!-- auto-queue -->
<!-- depends-on: 001, 002 -->
<!-- target-branch: feat/chart-system/integration-polish -->
# Verification: Accessibility Audit, Tree-Shaking & Test Updates

Run accessibility audits, verify tree-shaking, update tests for new accessibility features, and verify cross-platform readiness.

## Scope
- `packages/components/Chart/Chart.test.tsx` (modify — add tests for data table and reducedMotion)
- `packages/components/Chart/index.ts` (modify — ensure ChartDataTable export)
- `packages/components/index.ts` (modify — ensure ChartDataTable re-exported if needed)
- `src/index.ts` (modify — ensure ChartDataTable re-exported if needed)

## Context
- After segments 001 and 002 complete, the Chart system will have:
  - `reducedMotion` in ChartContext (from 001)
  - Hidden ChartDataTable component (from 001)
  - api-mapping.json documentation (from 002)
- Existing tests: `Chart.test.tsx` (foundation), `CoreCharts.test.tsx` (area/bar/line), `SpecializedCharts.test.tsx` (pie/radar/radial)
- Feature flag: `chart_system`

## Instructions

### 1. Update Chart.test.tsx with accessibility tests

Add tests to `packages/components/Chart/Chart.test.tsx`:

```tsx
describe('ChartDataTable (accessibility)', () => {
  const mockConfig = {
    revenue: { label: 'Revenue', color: '$blue8' },
    expenses: { label: 'Expenses', color: '$red8' },
  }

  const mockData = [
    { month: 'Jan', revenue: 100, expenses: 80 },
    { month: 'Feb', revenue: 200, expenses: 120 },
  ]

  it('renders hidden data table when data prop is provided', () => {
    const { getByRole } = render(
      <Chart config={mockConfig} accessibilityLabel="Revenue chart" data={mockData} xAxisKey="month">
        <div>chart content</div>
      </Chart>
    )
    const table = getByRole('table')
    expect(table).toBeTruthy()
  })

  it('does not render data table when data prop is omitted', () => {
    const { queryByRole } = render(
      <Chart config={mockConfig} accessibilityLabel="Revenue chart">
        <div>chart content</div>
      </Chart>
    )
    expect(queryByRole('table')).toBeNull()
  })

  it('renders correct column headers from config labels', () => {
    const { getAllByRole } = render(
      <Chart config={mockConfig} accessibilityLabel="Revenue chart" data={mockData} xAxisKey="month">
        <div>chart content</div>
      </Chart>
    )
    const headers = getAllByRole('columnheader')
    expect(headers.length).toBe(3) // month + revenue + expenses
    expect(headers[0].textContent).toBe('month')
    expect(headers[1].textContent).toBe('Revenue')
    expect(headers[2].textContent).toBe('Expenses')
  })

  it('renders correct data rows', () => {
    const { getAllByRole } = render(
      <Chart config={mockConfig} accessibilityLabel="Revenue chart" data={mockData} xAxisKey="month">
        <div>chart content</div>
      </Chart>
    )
    const rows = getAllByRole('row')
    // 1 header row + 2 data rows
    expect(rows.length).toBe(3)
  })
})

describe('reducedMotion context', () => {
  it('provides reducedMotion via context', () => {
    // This test verifies the context shape includes reducedMotion
    // The actual value depends on the matchMedia mock
    let contextValue: any = null
    function ContextReader() {
      contextValue = useChartContext()
      return null
    }
    render(
      <Chart config={{ a: { label: 'A', color: '$blue8' } }} accessibilityLabel="test" width={400}>
        <ContextReader />
      </Chart>
    )
    expect(contextValue).not.toBeNull()
    expect(typeof contextValue.reducedMotion).toBe('boolean')
  })
})
```

Make sure to import `useChartContext` from `./Chart` at the top of the test file.

### 2. Verify barrel exports include ChartDataTable

Check that `packages/components/Chart/index.ts` exports `ChartDataTable`. If segment 001 already added it, verify it's there. If not, add:
```tsx
export { ChartDataTable } from './ChartDataTable'
```

Also check `packages/components/index.ts` and `src/index.ts` — `ChartDataTable` should be accessible from the root. If it's already exported via the Chart barrel re-export (`export * from './Chart'` pattern), no additional changes are needed.

### 3. Run full test suite

```bash
yarn test -- --testPathPattern="Chart"
```

Ensure all tests pass including the new accessibility tests.

### 4. Run TypeScript check

```bash
yarn tsc --noEmit
```

### 5. Verify tree-shaking

Check that individual chart types can be imported directly:
- `import { AreaChart } from '@vlting/ui'` should only pull in AreaChart + Chart (container) + types
- `import { PieChart } from '@vlting/ui'` should not pull in BarChart, LineChart, etc.

To verify, check that no chart component file imports from other chart component files (they should only import from `./Chart`, `./types`, `./theme`, `./utils`). Run:
```bash
grep -r "from './AreaChart'" packages/components/Chart/ --include="*.tsx" --include="*.ts" | grep -v "index.ts" | grep -v "test.tsx" | grep -v "spec.md"
grep -r "from './BarChart'" packages/components/Chart/ --include="*.tsx" --include="*.ts" | grep -v "index.ts" | grep -v "test.tsx" | grep -v "spec.md"
grep -r "from './LineChart'" packages/components/Chart/ --include="*.tsx" --include="*.ts" | grep -v "index.ts" | grep -v "test.tsx" | grep -v "spec.md"
grep -r "from './PieChart'" packages/components/Chart/ --include="*.tsx" --include="*.ts" | grep -v "index.ts" | grep -v "test.tsx" | grep -v "spec.md"
grep -r "from './RadarChart'" packages/components/Chart/ --include="*.tsx" --include="*.ts" | grep -v "index.ts" | grep -v "test.tsx" | grep -v "spec.md"
grep -r "from './RadialChart'" packages/components/Chart/ --include="*.tsx" --include="*.ts" | grep -v "index.ts" | grep -v "test.tsx" | grep -v "spec.md"
```

If any chart imports another chart (not via index.ts), that's a tree-shaking issue to fix.

### 6. Cross-platform notes

Victory Native is designed to work on both web and React Native. The custom SVG charts (PieChart, RadarChart, RadialChart) use `react-native-svg` which also works on web via `react-native-web`. No additional verification code is needed — the architecture inherently supports both platforms. Add a brief comment in `Chart.tsx` if not already present:

```tsx
// Cross-platform: Victory Native renders on web + React Native.
// Custom SVG charts use react-native-svg (web-compatible via react-native-web).
```

## Verification
- All `yarn test -- --testPathPattern="Chart"` tests pass (including new a11y tests)
- `yarn tsc --noEmit` passes
- No circular imports between chart component files
- Each chart type is independently importable (tree-shakeable)

## Task Progress
<!-- lat: 2026-03-02T07:08:00Z -->
<!-- agent-pid: 36295 -->
<!-- worktree: .worktrees/q-003 -->
<!-- branch: q/003 -->

### Checklist
- [ ] **ACTIVE** → Create worktree
- [ ] Add accessibility tests to Chart.test.tsx
- [ ] Verify barrel exports include ChartDataTable
- [ ] Run full chart test suite
- [ ] TypeScript check
- [ ] Verify tree-shaking (no cross-chart imports)
- [ ] Commit, rebase, merge

### Handoff Context
- Task 001 added ChartDataTable and reducedMotion to Chart
- Task 002 added api-mapping.json
