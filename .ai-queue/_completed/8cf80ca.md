<!-- auto-queue -->
<!-- target-branch: feat/chart-system/integration-polish -->
# API Mapping Documentation (Recharts → Victory Native)

Create the api-mapping.json file documenting how shadcn's Recharts-based chart components map to vlting's Victory Native-based chart system.

## Scope
- `packages/components/Chart/api-mapping.json` (new)

## Context
- shadcn/ui uses Recharts for charts (web DOM-based, only renders in browser)
- vlting/ui uses Victory Native for charts (SVG-based, renders on web + React Native)
- The existing api-mapping.json format is exemplified by `packages/components/NavigationMenu/api-mapping.json`
- All 6 chart types are: AreaChart, BarChart, LineChart, PieChart, RadarChart, RadialChart
- Supporting components: Chart (ChartContainer), ChartTooltip, ChartLegend
- shadcn uses CSS variables for chart colors; vlting uses Tamagui design tokens

## Instructions

### 1. Create `packages/components/Chart/api-mapping.json`

Follow the established pattern from NavigationMenu's api-mapping.json. The file should cover all chart types and supporting components in a single JSON file.

Structure:
```json
{
  "component": "Chart",
  "shadcn": {
    "import": "import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'",
    "chartLibrary": "recharts",
    "chartImport": "import { AreaChart, BarChart, LineChart, PieChart, RadarChart, RadialBarChart, Area, Bar, Line, Pie, Radar, RadialBar, XAxis, YAxis, CartesianGrid, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'",
    "props": {
      "ChartContainer": {
        "config": { "type": "ChartConfig", "description": "Record<string, { label: string; color: string; icon?: ComponentType }>" },
        "children": { "type": "ReactNode" },
        "className": { "type": "string" }
      },
      "ChartTooltip": {
        "content": { "type": "ReactNode", "description": "Typically <ChartTooltipContent />" },
        "cursor": { "type": "boolean" }
      },
      "ChartLegend": {
        "content": { "type": "ReactNode", "description": "Typically <ChartLegendContent />" }
      }
    }
  },
  "vlting": {
    "import": "import { Chart, ChartTooltip, ChartLegend, AreaChart, BarChart, LineChart, PieChart, RadarChart, RadialChart } from '@vlting/ui'",
    "chartLibrary": "victory-native + react-native-svg",
    "props": {
      "Chart": {
        "config": { "type": "ChartConfig", "description": "Record<string, { label: string; color: string; icon?: ComponentType }>" },
        "children": { "type": "ReactNode" },
        "accessibilityLabel": { "type": "string", "description": "Required ARIA label for the chart" },
        "data": { "type": "Record<string, unknown>[]", "description": "Optional data for hidden accessibility table" },
        "width": { "type": "number", "description": "Explicit width (overrides responsive)" },
        "height": { "type": "number", "description": "Explicit height (default: 350)" }
      },
      "ChartTooltip": {
        "variant": { "type": "TooltipVariant", "description": "9 variants: default, cursor, dot, line, label, custom, advanced, icons, formatter" },
        "position": { "type": "{ x: number; y: number }" },
        "activePoint": { "type": "string" },
        "children": { "type": "ReactNode" }
      },
      "ChartLegend": {
        "layout": { "type": "'horizontal' | 'vertical'", "description": "Default: horizontal" }
      },
      "AreaChart": {
        "data": { "type": "ChartDataPoint[]" },
        "variant": { "type": "AreaChartVariant", "description": "10 variants" },
        "config": { "type": "ChartConfig" },
        "xAxisKey": { "type": "string" }
      },
      "BarChart": {
        "data": { "type": "ChartDataPoint[]" },
        "variant": { "type": "BarChartVariant", "description": "10 variants" },
        "config": { "type": "ChartConfig" },
        "xAxisKey": { "type": "string" }
      },
      "LineChart": {
        "data": { "type": "ChartDataPoint[]" },
        "variant": { "type": "LineChartVariant", "description": "10 variants" },
        "config": { "type": "ChartConfig" },
        "xAxisKey": { "type": "string" }
      },
      "PieChart": {
        "data": { "type": "ChartDataPoint[]" },
        "variant": { "type": "PieChartVariant", "description": "11 variants" },
        "config": { "type": "ChartConfig" }
      },
      "RadarChart": {
        "data": { "type": "ChartDataPoint[]" },
        "variant": { "type": "RadarChartVariant", "description": "14 variants" },
        "xAxisKey": { "type": "string" }
      },
      "RadialChart": {
        "data": { "type": "ChartDataPoint[]" },
        "variant": { "type": "RadialChartVariant", "description": "6 variants" }
      }
    }
  },
  "notes": [
    "shadcn uses Recharts (web DOM-based); vlting uses Victory Native (SVG, cross-platform web + React Native).",
    "shadcn ChartContainer wraps Recharts ResponsiveContainer; vlting Chart uses ResizeObserver for responsive sizing.",
    "shadcn uses CSS custom properties (--color-{key}) for chart colors; vlting resolves Tamagui design tokens to hex colors via ChartContext.",
    "vlting Chart provides useChartContext() hook giving child components access to config, resolvedColors, victoryTheme, dimensions, and reducedMotion.",
    "vlting uses a variant prop pattern: instead of composing Recharts primitives (Area, Bar, Line etc.), each chart type accepts a variant prop that configures the rendering mode.",
    "shadcn composes Recharts primitives inside ChartContainer (<BarChart><Bar /><XAxis /></BarChart>); vlting provides pre-composed chart components with variant-driven configuration.",
    "vlting PieChart, RadarChart, and RadialChart use custom SVG rendering via react-native-svg rather than Victory's built-in polar chart components, for full cross-platform control.",
    "vlting Chart has a required accessibilityLabel prop and optional data prop for hidden screen reader data table — no equivalent in shadcn.",
    "vlting includes prefers-reduced-motion support via useChartContext().reducedMotion — no equivalent in shadcn.",
    "All 69 shadcn chart demo variants (10 area + 10 bar + 10 line + 11 pie + 14 radar + 6 radial + 8 tooltip) have vlting equivalents."
  ],
  "breaking": [
    { "shadcn": "<ChartContainer config={...}>", "vlting": "<Chart config={...} accessibilityLabel='...'>", "reason": "Renamed component; accessibilityLabel is required for ARIA compliance" },
    { "shadcn": "<BarChart data={data}><Bar dataKey='revenue' /></BarChart>", "vlting": "<BarChart data={data} config={config} />", "reason": "vlting uses config object instead of individual child primitives" },
    { "shadcn": "CSS variable colors: --color-revenue", "vlting": "Tamagui token colors: '$blue8' in ChartConfig", "reason": "Cross-platform design token system" },
    { "shadcn": "<ChartTooltip content={<ChartTooltipContent />} />", "vlting": "<ChartTooltip variant='default' />", "reason": "Variant-based API instead of render prop composition" },
    { "shadcn": "<ChartLegend content={<ChartLegendContent />} />", "vlting": "<ChartLegend />", "reason": "Self-contained component, config comes from ChartContext" },
    { "shadcn": "import { RadialBarChart } from 'recharts'", "vlting": "import { RadialChart } from '@vlting/ui'", "reason": "Renamed from RadialBarChart to RadialChart" },
    { "shadcn": "className for styling", "vlting": "Tamagui style props", "reason": "Cross-platform compatibility; no className support in React Native" },
    { "shadcn": "Recharts CartesianGrid, PolarGrid", "vlting": "Built-in via showGrid prop", "reason": "Simplified API — grid rendering is a boolean prop, not a separate component" }
  ]
}
```

Adjust details based on the actual implementation. Check the real prop names by reading the component files if needed.

## Verification
- File is valid JSON (parseable)
- All 6 chart types + Chart + ChartTooltip + ChartLegend are documented
- Both shadcn and vlting import paths are correct
- Notes accurately describe the architectural differences
- Breaking changes list all key API differences

## Task Progress
<!-- lat: 2026-03-02T07:05:00Z -->
<!-- agent-pid: 36295 -->
<!-- worktree: .worktrees/q-002 -->
<!-- branch: q/002 -->

### Checklist
- [ ] **ACTIVE** → Create worktree
- [ ] Write api-mapping.json
- [ ] Verify valid JSON
- [ ] Commit, rebase, merge

### Handoff Context
- Follow pattern from NavigationMenu/api-mapping.json
- Cover all 6 chart types + Chart + ChartTooltip + ChartLegend
