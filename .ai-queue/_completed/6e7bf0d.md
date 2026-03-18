<!-- auto-queue -->
<!-- target-branch: feat/chart-system/integration-polish -->
# Accessibility Enhancements: Hidden Data Table & Reduced Motion

Add accessibility features to the Chart system: a hidden data table for screen readers and prefers-reduced-motion support.

## Scope
- `packages/components/Chart/Chart.tsx` (modify)
- `packages/components/Chart/ChartDataTable.tsx` (new)
- `packages/components/Chart/types.ts` (modify — add `reducedMotion` to context, add `ChartDataPoint` export if missing)

## Context
- The `Chart` component (`packages/components/Chart/Chart.tsx`) is the container/context provider for all chart types.
- `useReducedMotion` hook already exists at `packages/hooks/useReducedMotion.ts` — import and use it.
- `VisuallyHidden` primitive exists at `packages/primitives/VisuallyHidden.tsx` — use it for the hidden table wrapper.
- The `ChartConfig` type maps series keys to `{ label, color, icon? }`.
- The `ChartContext` currently provides: `config`, `resolvedColors`, `victoryTheme`, `dimensions`.
- Feature flag: `chart_system`

## Instructions

### 1. Add `reducedMotion` to ChartContext

In `Chart.tsx`:
- Import `useReducedMotion` from `../../hooks/useReducedMotion`
- Call the hook inside the `Chart` component
- Add `reducedMotion: boolean` to the `ChartContextValue` interface
- Pass `reducedMotion` into the context value

This allows any child chart component to check `const { reducedMotion } = useChartContext()` and skip animations when the user prefers reduced motion.

### 2. Add optional `data` prop to Chart

Add an optional `data` prop to `ChartContainerProps`:
```tsx
/** Raw chart data for screen reader accessibility table */
data?: Record<string, unknown>[]
```

When `data` is provided, render a `<ChartDataTable>` component inside the container (after the chart content).

### 3. Create `ChartDataTable.tsx`

Create a new component that renders a visually-hidden HTML `<table>` from chart data:

```tsx
import React from 'react'
import type { ChartConfig } from './types'

interface ChartDataTableProps {
  data: Record<string, unknown>[]
  config: ChartConfig
  xAxisKey?: string
}

export function ChartDataTable({ data, config, xAxisKey = 'x' }: ChartDataTableProps) {
  const seriesKeys = Object.keys(config)

  return (
    <div
      style={{
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: 0,
      }}
    >
      <table>
        <caption>Chart data</caption>
        <thead>
          <tr>
            <th scope="col">{xAxisKey}</th>
            {seriesKeys.map((key) => (
              <th key={key} scope="col">{config[key].label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{String(row[xAxisKey] ?? '')}</td>
              {seriesKeys.map((key) => (
                <td key={key}>{String(row[key] ?? '')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

Key points:
- Use inline styles for `sr-only` effect (same technique as VisuallyHidden primitive, but inline to avoid dependency on Tamagui styled components in a plain HTML element)
- The table has a `<caption>` and proper `scope="col"` on header cells
- The `xAxisKey` defaults to `'x'` — this determines which data field is the row label
- Each series from `config` becomes a column

### 4. Wire it up in Chart.tsx

In the `Chart` component's JSX:
- Import `ChartDataTable` from `./ChartDataTable`
- Add `data` and `xAxisKey` to destructured props (both optional)
- After `{finalWidth > 0 ? children : null}`, conditionally render:
  ```tsx
  {data && <ChartDataTable data={data} config={config} xAxisKey={xAxisKey} />}
  ```

### 5. Export `ChartDataTable`

Add to `packages/components/Chart/index.ts`:
```tsx
export { ChartDataTable } from './ChartDataTable'
export type { ChartDataTableProps } from './ChartDataTable'
```

## Verification
- `yarn tsc --noEmit` passes
- `yarn test -- --testPathPattern="Chart"` passes
- The `reducedMotion` value is accessible via `useChartContext()`
- The hidden data table renders in the DOM but is visually hidden

## Task Progress
<!-- lat: 2026-03-02T07:01:00Z -->
<!-- agent-pid: 36295 -->
<!-- worktree: .worktrees/q-001 -->
<!-- branch: q/001 -->

### Checklist
- [ ] **ACTIVE** → Create worktree from stage branch
- [ ] Add reducedMotion to ChartContext in Chart.tsx
- [ ] Add data/xAxisKey props to Chart
- [ ] Create ChartDataTable.tsx
- [ ] Wire ChartDataTable into Chart.tsx
- [ ] Export ChartDataTable from index.ts
- [ ] Verify TypeScript passes
- [ ] Commit, rebase, merge

### Handoff Context
- useReducedMotion hook at packages/hooks/useReducedMotion.ts
- Chart.tsx at packages/components/Chart/Chart.tsx
- Use inline sr-only styles for data table (not VisuallyHidden component)
