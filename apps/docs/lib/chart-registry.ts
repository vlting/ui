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

const pieData = `const data = [
  { browser: "Chrome", visitors: 275, fill: "$blue9" },
  { browser: "Safari", visitors: 200, fill: "$green9" },
  { browser: "Firefox", visitors: 187, fill: "$orange9" },
  { browser: "Edge", visitors: 173, fill: "$purple9" },
  { browser: "Other", visitors: 90, fill: "$gray9" },
]

const chartConfig = {
  Chrome: { label: "Chrome", color: "$blue9" },
  Safari: { label: "Safari", color: "$green9" },
  Firefox: { label: "Firefox", color: "$orange9" },
  Edge: { label: "Edge", color: "$purple9" },
  Other: { label: "Other", color: "$gray9" },
}`

const radarData = `const data = [
  { skill: "Design", desktop: 80, mobile: 65 },
  { skill: "Frontend", desktop: 95, mobile: 70 },
  { skill: "Backend", desktop: 70, mobile: 85 },
  { skill: "DevOps", desktop: 60, mobile: 75 },
  { skill: "Testing", desktop: 85, mobile: 60 },
]

const chartConfig = {
  desktop: { label: "Desktop Team", color: "$blue9" },
  mobile: { label: "Mobile Team", color: "$green9" },
}`

const radialData = `const data = [
  { name: "Progress", value: 75, fill: "$blue9" },
]

const chartConfig = {
  Progress: { label: "Progress", color: "$blue9" },
}`

const radialStackedData = `const data = [
  { name: "Chrome", value: 275, fill: "$blue9" },
  { name: "Safari", value: 200, fill: "$green9" },
  { name: "Firefox", value: 187, fill: "$orange9" },
]

const chartConfig = {
  Chrome: { label: "Chrome", color: "$blue9" },
  Safari: { label: "Safari", color: "$green9" },
  Firefox: { label: "Firefox", color: "$orange9" },
}`

const negativeData = `const data = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: -120 },
  { month: "Mar", value: 237 },
  { month: "Apr", value: -73 },
  { month: "May", value: 209 },
  { month: "Jun", value: -45 },
]

const chartConfig = {
  value: { label: "Revenue", color: "$blue9" },
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
      {
        name: 'Expanded',
        description: 'Normalized stacked area chart (100% stacked).',
        code: `${sampleData}

<Chart config={chartConfig}>
  <AreaChart
    data={data}
    variant="expanded"
    accessibilityLabel="Expanded (100% stacked) area chart"
  />
</Chart>`,
      },
      {
        name: 'Step',
        description: 'Step-line area chart with sharp transitions instead of smooth curves.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <AreaChart
    data={data}
    variant="step"
    accessibilityLabel="Step area chart"
  />
</Chart>`,
      },
      {
        name: 'Axes',
        description: 'Area chart with visible X and Y axes.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <AreaChart
    data={data}
    variant="axes"
    accessibilityLabel="Area chart with axes"
  />
</Chart>`,
      },
      {
        name: 'Interactive',
        description: 'Area chart with tooltip on hover/touch.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <AreaChart
    data={data}
    variant="interactive"
    accessibilityLabel="Interactive area chart"
  >
    <ChartTooltip />
  </AreaChart>
</Chart>`,
      },
      {
        name: 'Legend',
        description: 'Area chart with a chart legend.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <AreaChart
    data={data}
    variant="legend"
    accessibilityLabel="Area chart with legend"
  >
    <ChartLegend />
  </AreaChart>
</Chart>`,
      },
      {
        name: 'Linear',
        description: 'Area chart with linear interpolation (straight lines between points).',
        code: `${sampleData}

<Chart config={chartConfig}>
  <AreaChart
    data={data}
    variant="linear"
    accessibilityLabel="Linear area chart"
  />
</Chart>`,
      },
      {
        name: 'Icons',
        description: 'Area chart with icon markers at data points.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <AreaChart
    data={data}
    variant="icons"
    accessibilityLabel="Area chart with icons"
  />
</Chart>`,
      },
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
      {
        name: 'Grouped',
        description: 'Grouped bars side-by-side for each category.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <BarChart
    data={data}
    variant="grouped"
    accessibilityLabel="Grouped bar chart"
  />
</Chart>`,
      },
      {
        name: 'Negative',
        description: 'Bar chart supporting negative values with a baseline.',
        code: `${negativeData}

<Chart config={chartConfig}>
  <BarChart
    data={data}
    variant="negative"
    accessibilityLabel="Bar chart with negative values"
  />
</Chart>`,
      },
      {
        name: 'Label',
        description: 'Bar chart with value labels on each bar.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <BarChart
    data={data}
    variant="label"
    accessibilityLabel="Bar chart with labels"
  />
</Chart>`,
      },
      {
        name: 'Mixed',
        description: 'Mixed chart combining bars with a line overlay.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <BarChart
    data={data}
    variant="mixed"
    accessibilityLabel="Mixed bar and line chart"
  />
</Chart>`,
      },
      {
        name: 'Custom Label',
        description: 'Bar chart with custom label formatting.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <BarChart
    data={data}
    variant="custom-label"
    accessibilityLabel="Bar chart with custom labels"
  />
</Chart>`,
      },
      {
        name: 'Active',
        description: 'Bar chart with an active/highlighted bar on selection.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <BarChart
    data={data}
    variant="active"
    accessibilityLabel="Bar chart with active state"
  />
</Chart>`,
      },
      {
        name: 'Interactive',
        description: 'Bar chart with tooltip on hover/touch.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <BarChart
    data={data}
    variant="interactive"
    accessibilityLabel="Interactive bar chart"
  >
    <ChartTooltip />
  </BarChart>
</Chart>`,
      },
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
      {
        name: 'Labels',
        description: 'Line chart with value labels at data points.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <LineChart
    data={data}
    variant="labels"
    accessibilityLabel="Line chart with labels"
  />
</Chart>`,
      },
      {
        name: 'Stepped',
        description: 'Step-line chart with sharp transitions.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <LineChart
    data={data}
    variant="stepped"
    accessibilityLabel="Stepped line chart"
  />
</Chart>`,
      },
      {
        name: 'Custom Dots',
        description: 'Line chart with custom-styled dot markers.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <LineChart
    data={data}
    variant="custom-dots"
    accessibilityLabel="Line chart with custom dots"
  />
</Chart>`,
      },
      {
        name: 'Interactive',
        description: 'Line chart with tooltip on hover/touch.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <LineChart
    data={data}
    variant="interactive"
    accessibilityLabel="Interactive line chart"
  >
    <ChartTooltip />
  </LineChart>
</Chart>`,
      },
      {
        name: 'Linear',
        description: 'Line chart with linear interpolation.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <LineChart
    data={data}
    variant="linear"
    accessibilityLabel="Linear line chart"
  />
</Chart>`,
      },
      {
        name: 'Legend',
        description: 'Line chart with a legend.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <LineChart
    data={data}
    variant="legend"
    accessibilityLabel="Line chart with legend"
  >
    <ChartLegend />
  </LineChart>
</Chart>`,
      },
      {
        name: 'Icons',
        description: 'Line chart with icon markers at data points.',
        code: `${sampleData}

<Chart config={chartConfig}>
  <LineChart
    data={data}
    variant="icons"
    accessibilityLabel="Line chart with icons"
  />
</Chart>`,
      },
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
        code: `${pieData}

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
        code: `${pieData}

<Chart config={chartConfig}>
  <PieChart
    data={data}
    variant="donut"
    accessibilityLabel="Browser share donut chart"
  />
</Chart>`,
      },
      {
        name: 'Donut with Text',
        description: 'Donut chart with a total or label displayed in the center.',
        code: `${pieData}

<Chart config={chartConfig}>
  <PieChart
    data={data}
    variant="donut-text"
    accessibilityLabel="Donut chart with center total"
  />
</Chart>`,
      },
      {
        name: 'Donut Active',
        description: 'Donut chart with an active/expanded segment on selection.',
        code: `${pieData}

<Chart config={chartConfig}>
  <PieChart
    data={data}
    variant="donut-active"
    accessibilityLabel="Interactive donut chart"
  />
</Chart>`,
      },
      {
        name: 'Label',
        description: 'Pie chart with labels on each segment.',
        code: `${pieData}

<Chart config={chartConfig}>
  <PieChart
    data={data}
    variant="label"
    accessibilityLabel="Pie chart with labels"
  />
</Chart>`,
      },
      {
        name: 'Custom Label',
        description: 'Pie chart with custom label formatting.',
        code: `${pieData}

<Chart config={chartConfig}>
  <PieChart
    data={data}
    variant="custom-label"
    accessibilityLabel="Pie chart with custom labels"
  />
</Chart>`,
      },
      {
        name: 'Label List',
        description: 'Pie chart with an external label list.',
        code: `${pieData}

<Chart config={chartConfig}>
  <PieChart
    data={data}
    variant="label-list"
    accessibilityLabel="Pie chart with label list"
  />
</Chart>`,
      },
      {
        name: 'Legend',
        description: 'Pie chart with a legend.',
        code: `${pieData}

<Chart config={chartConfig}>
  <PieChart
    data={data}
    variant="legend"
    accessibilityLabel="Pie chart with legend"
  >
    <ChartLegend />
  </PieChart>
</Chart>`,
      },
      {
        name: 'Separator',
        description: 'Pie chart with visible separators between segments.',
        code: `${pieData}

<Chart config={chartConfig}>
  <PieChart
    data={data}
    variant="separator"
    accessibilityLabel="Pie chart with separators"
  />
</Chart>`,
      },
      {
        name: 'Interactive',
        description: 'Pie chart with tooltip on hover/touch.',
        code: `${pieData}

<Chart config={chartConfig}>
  <PieChart
    data={data}
    variant="interactive"
    accessibilityLabel="Interactive pie chart"
  >
    <ChartTooltip />
  </PieChart>
</Chart>`,
      },
      {
        name: 'Stacked',
        description: 'Concentric rings showing nested proportions.',
        code: `${pieData}

<Chart config={chartConfig}>
  <PieChart
    data={data}
    variant="stacked"
    accessibilityLabel="Stacked pie chart"
  />
</Chart>`,
      },
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
        code: `${radarData}

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
        code: `${radarData}

<Chart config={chartConfig}>
  <RadarChart
    data={data}
    variant="dots"
    accessibilityLabel="Radar chart with dots"
  />
</Chart>`,
      },
      {
        name: 'Multiple',
        description: 'Multiple overlapping radar polygons for comparison.',
        code: `${radarData}

<Chart config={chartConfig}>
  <RadarChart
    data={data}
    variant="multiple"
    accessibilityLabel="Multi-series radar chart"
  />
</Chart>`,
      },
      {
        name: 'Lines',
        description: 'Radar chart with lines only (no fill).',
        code: `${radarData}

<Chart config={chartConfig}>
  <RadarChart
    data={data}
    variant="lines"
    accessibilityLabel="Radar chart with lines only"
  />
</Chart>`,
      },
      {
        name: 'Custom',
        description: 'Radar chart with custom styling.',
        code: `${radarData}

<Chart config={chartConfig}>
  <RadarChart
    data={data}
    variant="custom"
    accessibilityLabel="Custom styled radar chart"
  />
</Chart>`,
      },
      {
        name: 'Grid Circle',
        description: 'Radar chart with circular grid lines.',
        code: `${radarData}

<Chart config={chartConfig}>
  <RadarChart
    data={data}
    variant="grid-circle"
    accessibilityLabel="Radar chart with circular grid"
  />
</Chart>`,
      },
      {
        name: 'Grid Filled',
        description: 'Radar chart with filled grid bands.',
        code: `${radarData}

<Chart config={chartConfig}>
  <RadarChart
    data={data}
    variant="grid-filled"
    accessibilityLabel="Radar chart with filled grid"
  />
</Chart>`,
      },
      {
        name: 'Grid None',
        description: 'Radar chart with no grid lines.',
        code: `${radarData}

<Chart config={chartConfig}>
  <RadarChart
    data={data}
    variant="grid-none"
    accessibilityLabel="Radar chart without grid"
  />
</Chart>`,
      },
      {
        name: 'Legend',
        description: 'Radar chart with a legend.',
        code: `${radarData}

<Chart config={chartConfig}>
  <RadarChart
    data={data}
    variant="legend"
    accessibilityLabel="Radar chart with legend"
  >
    <ChartLegend />
  </RadarChart>
</Chart>`,
      },
      {
        name: 'Icons',
        description: 'Radar chart with icon markers at vertices.',
        code: `${radarData}

<Chart config={chartConfig}>
  <RadarChart
    data={data}
    variant="icons"
    accessibilityLabel="Radar chart with icons"
  />
</Chart>`,
      },
      {
        name: 'Radius Axis',
        description: 'Radar chart with a visible radius axis.',
        code: `${radarData}

<Chart config={chartConfig}>
  <RadarChart
    data={data}
    variant="radius-axis"
    accessibilityLabel="Radar chart with radius axis"
  />
</Chart>`,
      },
      {
        name: 'Label',
        description: 'Radar chart with labels at each vertex.',
        code: `${radarData}

<Chart config={chartConfig}>
  <RadarChart
    data={data}
    variant="label"
    accessibilityLabel="Radar chart with labels"
  />
</Chart>`,
      },
      {
        name: 'Custom Shape',
        description: 'Radar chart with a custom polygon shape.',
        code: `${radarData}

<Chart config={chartConfig}>
  <RadarChart
    data={data}
    variant="custom-shape"
    accessibilityLabel="Radar chart with custom shape"
  />
</Chart>`,
      },
      {
        name: 'Interactive',
        description: 'Radar chart with tooltip on hover/touch.',
        code: `${radarData}

<Chart config={chartConfig}>
  <RadarChart
    data={data}
    variant="interactive"
    accessibilityLabel="Interactive radar chart"
  >
    <ChartTooltip />
  </RadarChart>
</Chart>`,
      },
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
        code: `${radialData}

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
        code: `${radialData}

<Chart config={chartConfig}>
  <RadialChart
    data={data}
    variant="grid"
    accessibilityLabel="Radial chart with grid"
  />
</Chart>`,
      },
      {
        name: 'Label',
        description: 'Radial chart with value labels.',
        code: `${radialData}

<Chart config={chartConfig}>
  <RadialChart
    data={data}
    variant="label"
    accessibilityLabel="Radial chart with labels"
  />
</Chart>`,
      },
      {
        name: 'Stacked',
        description: 'Multiple concentric arcs stacked together.',
        code: `${radialStackedData}

<Chart config={chartConfig}>
  <RadialChart
    data={data}
    variant="stacked"
    accessibilityLabel="Stacked radial chart"
  />
</Chart>`,
      },
      {
        name: 'Text',
        description: 'Radial chart with a central text label.',
        code: `${radialData}

<Chart config={chartConfig}>
  <RadialChart
    data={data}
    variant="text"
    accessibilityLabel="Radial chart with center text"
  />
</Chart>`,
      },
      {
        name: 'Shape',
        description: 'Radial chart with custom arc shapes.',
        code: `${radialData}

<Chart config={chartConfig}>
  <RadialChart
    data={data}
    variant="shape"
    accessibilityLabel="Radial chart with custom shape"
  />
</Chart>`,
      },
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
