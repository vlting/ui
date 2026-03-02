export interface ChartVariant {
  name: string
  description: string
  code: string
}

export interface ChartEntry {
  name: string
  slug: string
  description: string
  importPath: string
  variants: ChartVariant[]
  whenToUse?: string[]
  whenNotToUse?: string[]
}

const sampleData = `const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "$blue9" },
  mobile: { label: "Mobile", color: "$green9" },
}`

const registry: ChartEntry[] = [
  {
    name: 'Area Chart',
    slug: 'area',
    description:
      'Renders area chart visualizations for showing trends over time, comparing cumulative values, or visualizing part-to-whole relationships.',
    importPath: "import { Chart, AreaChart } from '@vlting/ui'",
    whenToUse: [
      'Showing trends over time',
      'Comparing cumulative values',
      'Visualizing part-to-whole relationships',
    ],
    whenNotToUse: [
      'Comparing discrete categories — use BarChart',
      'Showing exact values — use Table',
      'Showing proportions of a whole — use PieChart',
    ],
    variants: [
      {
        name: 'Default',
        description: 'Basic area chart with filled regions under each data series.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <AreaChart
    data={data}
    variant="default"
    accessibilityLabel="Monthly trend area chart"
  />
</Chart>`,
      },
      {
        name: 'Gradient',
        description: 'Area chart with gradient fills that fade from the series color to transparent.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <AreaChart
    data={data}
    variant="gradient"
    accessibilityLabel="Gradient area chart"
  />
</Chart>`,
      },
      {
        name: 'Stacked',
        description: 'Stacked area chart where series are layered on top of each other to show totals.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <AreaChart
    data={data}
    variant="stacked"
    accessibilityLabel="Stacked area chart"
  />
</Chart>`,
      },
      { name: 'Expanded', description: 'Normalized stacked area chart (100% stacked).', code: `<AreaChart data={data} variant="expanded" />` },
      { name: 'Step', description: 'Step-line area chart with sharp transitions instead of smooth curves.', code: `<AreaChart data={data} variant="step" />` },
      { name: 'Axes', description: 'Area chart with visible X and Y axes.', code: `<AreaChart data={data} variant="axes" />` },
      { name: 'Interactive', description: 'Area chart with tooltip on hover/touch.', code: `<AreaChart data={data} variant="interactive" />` },
      { name: 'Legend', description: 'Area chart with a chart legend.', code: `<AreaChart data={data} variant="legend" />` },
      { name: 'Linear', description: 'Area chart with linear interpolation (straight lines between points).', code: `<AreaChart data={data} variant="linear" />` },
      { name: 'Icons', description: 'Area chart with icon markers at data points.', code: `<AreaChart data={data} variant="icons" />` },
    ],
  },
  {
    name: 'Bar Chart',
    slug: 'bar',
    description:
      'Renders bar chart visualizations for comparing discrete categories, showing distributions, or highlighting differences between groups.',
    importPath: "import { Chart, BarChart } from '@vlting/ui'",
    whenToUse: [
      'Comparing values across categories',
      'Showing distributions',
      'Highlighting differences between groups',
    ],
    whenNotToUse: [
      'Showing trends over time — use LineChart or AreaChart',
      'Showing proportions — use PieChart',
    ],
    variants: [
      {
        name: 'Default',
        description: 'Standard vertical bar chart with bars for each category.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <BarChart
    data={data}
    variant="default"
    accessibilityLabel="Monthly comparison bar chart"
  />
</Chart>`,
      },
      {
        name: 'Horizontal',
        description: 'Horizontal bar chart with bars extending left to right.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <BarChart
    data={data}
    variant="horizontal"
    accessibilityLabel="Horizontal bar chart"
  />
</Chart>`,
      },
      {
        name: 'Stacked',
        description: 'Stacked bar chart with multiple series stacked within each bar.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <BarChart
    data={data}
    variant="stacked"
    accessibilityLabel="Stacked bar chart"
  />
</Chart>`,
      },
      { name: 'Grouped', description: 'Grouped bars side-by-side for each category.', code: `<BarChart data={data} variant="grouped" />` },
      { name: 'Negative', description: 'Bar chart supporting negative values with a baseline.', code: `<BarChart data={data} variant="negative" />` },
      { name: 'Label', description: 'Bar chart with value labels on each bar.', code: `<BarChart data={data} variant="label" />` },
      { name: 'Mixed', description: 'Mixed chart combining bars with a line overlay.', code: `<BarChart data={data} variant="mixed" />` },
      { name: 'Custom Label', description: 'Bar chart with custom label formatting.', code: `<BarChart data={data} variant="custom-label" />` },
      { name: 'Active', description: 'Bar chart with an active/highlighted bar on selection.', code: `<BarChart data={data} variant="active" />` },
      { name: 'Interactive', description: 'Bar chart with tooltip on hover/touch.', code: `<BarChart data={data} variant="interactive" />` },
    ],
  },
  {
    name: 'Line Chart',
    slug: 'line',
    description:
      'Renders line chart visualizations for showing trends, comparing multiple data series, or tracking changes over a continuous axis.',
    importPath: "import { Chart, LineChart } from '@vlting/ui'",
    whenToUse: [
      'Showing trends over continuous data',
      'Comparing multiple data series',
      'Tracking changes over time',
    ],
    whenNotToUse: [
      'Comparing discrete categories — use BarChart',
      'Showing cumulative values — use AreaChart',
    ],
    variants: [
      {
        name: 'Default',
        description: 'Basic line chart with smooth curves connecting data points.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <LineChart
    data={data}
    variant="default"
    accessibilityLabel="Monthly trend line chart"
  />
</Chart>`,
      },
      {
        name: 'Dots',
        description: 'Line chart with visible dot markers at each data point.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <LineChart
    data={data}
    variant="dots"
    accessibilityLabel="Line chart with dots"
  />
</Chart>`,
      },
      {
        name: 'Multiple',
        description: 'Multiple line series on the same chart for comparison.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <LineChart
    data={data}
    variant="multiple"
    accessibilityLabel="Multi-series line chart"
  />
</Chart>`,
      },
      { name: 'Labels', description: 'Line chart with value labels at data points.', code: `<LineChart data={data} variant="labels" />` },
      { name: 'Stepped', description: 'Step-line chart with sharp transitions.', code: `<LineChart data={data} variant="stepped" />` },
      { name: 'Custom Dots', description: 'Line chart with custom-styled dot markers.', code: `<LineChart data={data} variant="custom-dots" />` },
      { name: 'Interactive', description: 'Line chart with tooltip on hover/touch.', code: `<LineChart data={data} variant="interactive" />` },
      { name: 'Linear', description: 'Line chart with linear interpolation.', code: `<LineChart data={data} variant="linear" />` },
      { name: 'Legend', description: 'Line chart with a legend.', code: `<LineChart data={data} variant="legend" />` },
      { name: 'Icons', description: 'Line chart with icon markers at data points.', code: `<LineChart data={data} variant="icons" />` },
    ],
  },
  {
    name: 'Pie Chart',
    slug: 'pie',
    description:
      'Renders pie and donut chart visualizations for showing proportions, composition, and part-to-whole relationships.',
    importPath: "import { Chart, PieChart } from '@vlting/ui'",
    whenToUse: [
      'Showing proportions of a whole',
      'Comparing relative sizes of categories',
      'Displaying composition data',
    ],
    whenNotToUse: [
      'Comparing many categories (>6) — use BarChart',
      'Showing trends — use LineChart',
    ],
    variants: [
      {
        name: 'Default',
        description: 'Standard pie chart with colored segments.',
        code: `const data = [
  { browser: "Chrome", visitors: 275, fill: "$blue9" },
  { browser: "Safari", visitors: 200, fill: "$green9" },
  { browser: "Firefox", visitors: 187, fill: "$orange9" },
  { browser: "Edge", visitors: 173, fill: "$purple9" },
  { browser: "Other", visitors: 90, fill: "$gray9" },
]

<Chart config={chartConfig}>
  <PieChart
    data={data}
    variant="default"
    accessibilityLabel="Browser market share"
  />
</Chart>`,
      },
      {
        name: 'Donut',
        description: 'Donut chart with a hollow center.',
        code: `<PieChart data={data} variant="donut" accessibilityLabel="Donut chart" />`,
      },
      {
        name: 'Donut with Text',
        description: 'Donut chart with a total or label displayed in the center.',
        code: `<PieChart data={data} variant="donut-text" accessibilityLabel="Donut chart with total" />`,
      },
      { name: 'Donut Active', description: 'Donut chart with an active/expanded segment on selection.', code: `<PieChart data={data} variant="donut-active" />` },
      { name: 'Label', description: 'Pie chart with labels on each segment.', code: `<PieChart data={data} variant="label" />` },
      { name: 'Custom Label', description: 'Pie chart with custom label formatting.', code: `<PieChart data={data} variant="custom-label" />` },
      { name: 'Label List', description: 'Pie chart with an external label list.', code: `<PieChart data={data} variant="label-list" />` },
      { name: 'Legend', description: 'Pie chart with a legend.', code: `<PieChart data={data} variant="legend" />` },
      { name: 'Separator', description: 'Pie chart with visible separators between segments.', code: `<PieChart data={data} variant="separator" />` },
      { name: 'Interactive', description: 'Pie chart with tooltip on hover/touch.', code: `<PieChart data={data} variant="interactive" />` },
      { name: 'Stacked', description: 'Concentric rings showing nested proportions.', code: `<PieChart data={data} variant="stacked" />` },
    ],
  },
  {
    name: 'Radar Chart',
    slug: 'radar',
    description:
      'Renders radar (spider) chart visualizations for multi-variable comparison, skill assessments, or showing data across multiple dimensions.',
    importPath: "import { Chart, RadarChart } from '@vlting/ui'",
    whenToUse: [
      'Comparing multiple variables at once',
      'Skill or capability assessments',
      'Showing balance across dimensions',
    ],
    whenNotToUse: [
      'More than 8 variables — becomes hard to read',
      'Exact value comparison — use BarChart',
    ],
    variants: [
      {
        name: 'Default',
        description: 'Basic radar chart with a filled polygon.',
        code: `const data = [
  { skill: "Design", value: 80 },
  { skill: "Frontend", value: 95 },
  { skill: "Backend", value: 70 },
  { skill: "DevOps", value: 60 },
  { skill: "Testing", value: 85 },
]

<Chart config={chartConfig}>
  <RadarChart
    data={data}
    variant="default"
    accessibilityLabel="Skills radar chart"
  />
</Chart>`,
      },
      {
        name: 'Dots',
        description: 'Radar chart with dot markers at each vertex.',
        code: `<RadarChart data={data} variant="dots" accessibilityLabel="Radar chart with dots" />`,
      },
      {
        name: 'Multiple',
        description: 'Multiple overlapping radar polygons for comparison.',
        code: `<RadarChart data={data} variant="multiple" accessibilityLabel="Multi-series radar" />`,
      },
      { name: 'Lines', description: 'Radar chart with lines only (no fill).', code: `<RadarChart data={data} variant="lines" />` },
      { name: 'Custom', description: 'Radar chart with custom styling.', code: `<RadarChart data={data} variant="custom" />` },
      { name: 'Grid Circle', description: 'Radar chart with circular grid lines.', code: `<RadarChart data={data} variant="grid-circle" />` },
      { name: 'Grid Filled', description: 'Radar chart with filled grid bands.', code: `<RadarChart data={data} variant="grid-filled" />` },
      { name: 'Grid None', description: 'Radar chart with no grid lines.', code: `<RadarChart data={data} variant="grid-none" />` },
      { name: 'Legend', description: 'Radar chart with a legend.', code: `<RadarChart data={data} variant="legend" />` },
      { name: 'Icons', description: 'Radar chart with icon markers at vertices.', code: `<RadarChart data={data} variant="icons" />` },
      { name: 'Radius Axis', description: 'Radar chart with a visible radius axis.', code: `<RadarChart data={data} variant="radius-axis" />` },
      { name: 'Label', description: 'Radar chart with labels at each vertex.', code: `<RadarChart data={data} variant="label" />` },
      { name: 'Custom Shape', description: 'Radar chart with a custom polygon shape.', code: `<RadarChart data={data} variant="custom-shape" />` },
      { name: 'Interactive', description: 'Radar chart with tooltip on hover/touch.', code: `<RadarChart data={data} variant="interactive" />` },
    ],
  },
  {
    name: 'Radial Chart',
    slug: 'radial',
    description:
      'Renders radial (circular) chart visualizations for progress indicators, gauges, and circular data displays.',
    importPath: "import { Chart, RadialChart } from '@vlting/ui'",
    whenToUse: [
      'Progress indicators and completion gauges',
      'Circular data displays',
      'Compact visualizations in cards or dashboards',
    ],
    whenNotToUse: [
      'Comparing many items — use BarChart',
      'Showing trends — use LineChart',
    ],
    variants: [
      {
        name: 'Default',
        description: 'Basic radial chart with concentric arcs.',
        code: `const data = [
  { name: "Progress", value: 75, fill: "$blue9" },
]

<Chart config={chartConfig}>
  <RadialChart
    data={data}
    variant="default"
    accessibilityLabel="Progress radial chart"
  />
</Chart>`,
      },
      {
        name: 'Grid',
        description: 'Radial chart with background grid circles.',
        code: `<RadialChart data={data} variant="grid" accessibilityLabel="Radial chart with grid" />`,
      },
      {
        name: 'Label',
        description: 'Radial chart with value labels.',
        code: `<RadialChart data={data} variant="label" accessibilityLabel="Radial chart with labels" />`,
      },
      { name: 'Stacked', description: 'Multiple concentric arcs stacked together.', code: `<RadialChart data={data} variant="stacked" />` },
      { name: 'Text', description: 'Radial chart with a central text label.', code: `<RadialChart data={data} variant="text" />` },
      { name: 'Shape', description: 'Radial chart with custom arc shapes.', code: `<RadialChart data={data} variant="shape" />` },
    ],
  },
]

const slugMap = new Map(registry.map((entry) => [entry.slug, entry]))

export function getChart(slug: string): ChartEntry | undefined {
  return slugMap.get(slug)
}

export function getAllCharts(): ChartEntry[] {
  return registry
}

export { registry as chartRegistry }
