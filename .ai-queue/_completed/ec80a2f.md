<!-- auto-queue -->
<!-- target-branch: feat/docs-site/content-completeness -->

# Segment 3: Complete Chart Variant Examples

## Objective
Complete all chart variant code examples in `examples/docs/lib/chart-registry.ts`. Currently most variants have minimal stub code. Replace stubs with complete, runnable code examples that include proper `sampleData` and `chartConfig`.

## Scope
- `examples/docs/lib/chart-registry.ts`

## Instructions

Edit `examples/docs/lib/chart-registry.ts` to provide complete code examples for all chart variants.

### Current State
- 6 chart types: Area, Bar, Line, Pie, Radar, Radial
- ~61 total variants
- Only ~10 variants have complete code with `sampleData` and `chartConfig`
- Most variants have minimal stubs like `<AreaChart data={data} variant="expanded" />`

### What Complete Examples Look Like
Look at the existing complete examples (e.g., Area Chart Default, Bar Chart Default) for the pattern. Each variant should have:

1. A `sampleData` array with realistic data points
2. A `chartConfig` object mapping data keys to labels and colors
3. The full JSX for the chart with all needed props
4. Proper imports shown in the code string

### Chart Component API (from @vlting/ui)
The chart components use a Victory-based API wrapped in a consistent interface:

```tsx
import { AreaChart, ChartContainer, ChartTooltip, ChartLegend } from '@vlting/ui'

const chartConfig = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", color: "#60a5fa" },
}

const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  // ...
]

<ChartContainer config={chartConfig}>
  <AreaChart data={data}>
    <ChartTooltip />
    <ChartLegend />
  </AreaChart>
</ChartContainer>
```

### Variants to Complete (per chart type)

**Area Chart** (~7 stubs): Expanded, Step, Axes, Interactive, Legend, Linear, Icons
**Bar Chart** (~7 stubs): Grouped, Negative, Label, Mixed, Custom Label, Active, Interactive
**Line Chart** (~7 stubs): Labels, Stepped, Custom Dots, Interactive, Linear, Legend, Icons
**Pie Chart** (~9 stubs): Donut with Text, Donut Active, Label, Custom Label, Label List, Legend, Separator, Interactive, Stacked
**Radar Chart** (~13 stubs): Dots, Multiple, Lines, Custom, Grid Circle, Grid Filled, Grid None, Legend, Icons, Radius Axis, Label, Custom Shape, Interactive
**Radial Chart** (~5 stubs): Grid, Label, Stacked, Text, Shape

### Guidelines
- Each variant should demonstrate the specific visual/behavioral difference from the Default
- Use varied but consistent sample data (months, categories, etc.)
- Include the `chartConfig` with descriptive labels and distinct colors
- Read the existing complete examples first to match the code style
- Check the actual chart component source in `src/` if you need to verify available props
- Code examples are strings — they don't need to actually compile, just look correct and instructive

## Verification
- No chart variant has stub-only code (one-liners like `<AreaChart data={data} />`)
- Every variant code example includes sampleData, chartConfig, and the full JSX
- Code strings are realistic and demonstrate the variant's specific feature

## Task Progress
<!-- lat: 2026-03-02T17:30:00Z -->
<!-- agent-pid: 22715 -->
<!-- worktree: .worktrees/q-003 -->
<!-- branch: q/003 -->

### Checklist
- [ ] **ACTIVE** → Create worktree and read chart-registry.ts
- [ ] Complete Area chart variant examples
- [ ] Complete Bar chart variant examples
- [ ] Complete Line chart variant examples
- [ ] Complete Pie chart variant examples
- [ ] Complete Radar chart variant examples
- [ ] Complete Radial chart variant examples
- [ ] Commit, rebase, merge, archive
