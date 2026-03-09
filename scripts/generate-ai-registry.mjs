#!/usr/bin/env node
/**
 * Generates docs/ai/registry.json from api-mappings.json + block/chart metadata.
 */
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const mappings = JSON.parse(readFileSync(resolve(root, 'api-mappings.json'), 'utf8'))

// Category assignments
const categories = {
  // Primitives
  Box: 'layout', Stack: 'layout', Text: 'typography', Heading: 'typography',
  Icon: 'media', Divider: 'layout', Spacer: 'layout', Portal: 'utility',
  Label: 'forms', VisuallyHidden: 'accessibility', Badge: 'data-display',
  Skeleton: 'feedback', Separator: 'layout', AspectRatio: 'layout',
  Spinner: 'feedback', Kbd: 'typography',
  // Components
  Button: 'interactive', Input: 'forms', InputGroup: 'forms', Card: 'layout',
  Dialog: 'overlay', Tabs: 'navigation', Checkbox: 'forms', Switch: 'forms',
  RadioGroup: 'forms', Alert: 'feedback', Textarea: 'forms', Avatar: 'data-display',
  Progress: 'feedback', Slider: 'forms', Toggle: 'interactive', ToggleGroup: 'interactive',
  Tooltip: 'overlay', TooltipProvider: 'utility', Select: 'forms',
  Accordion: 'disclosure', Collapsible: 'disclosure', AlertDialog: 'overlay',
  Table: 'data-display', DataTable: 'data-display', Breadcrumb: 'navigation',
  Form: 'forms', Pagination: 'navigation', DatePicker: 'forms',
  DateRangePicker: 'forms', ScrollArea: 'layout', HoverCard: 'overlay',
  NativeSelect: 'forms', InputOTP: 'forms', Item: 'data-display',
  ButtonGroup: 'interactive', Drawer: 'overlay', Calendar: 'forms',
  Combobox: 'forms', Command: 'interactive', ContextMenu: 'overlay',
  DropdownMenu: 'overlay', Menubar: 'navigation', NavigationMenu: 'navigation',
  Carousel: 'interactive', Resizable: 'layout', Sidebar: 'navigation',
  Loader: 'feedback', Popover: 'overlay', Sheet: 'overlay', Field: 'forms',
  Empty: 'feedback', Toast: 'feedback', Direction: 'utility',
  DirectionProvider: 'utility',
  // Typography
  H1: 'typography', H2: 'typography', H3: 'typography', H4: 'typography',
  H5: 'typography', H6: 'typography', P: 'typography', Lead: 'typography',
  Large: 'typography', Small: 'typography', Muted: 'typography',
  Blockquote: 'typography', InlineCode: 'typography', List: 'typography',
  ListItem: 'typography',
}

// Platform support
const webOnly = new Set([
  'NavigationMenu', 'Menubar', 'ContextMenu', 'Resizable', 'DataTable',
  'Table', 'Carousel',
])

// When to use / when not to use
const guidance = {
  Button: { whenToUse: 'Triggering actions (submit, toggle, navigate)', whenNotToUse: 'Navigation-only links — use <a> or Link instead' },
  Input: { whenToUse: 'Single-line text input', whenNotToUse: 'Multi-line text — use Textarea' },
  Dialog: { whenToUse: 'Complex forms, detail views, multi-step flows', whenNotToUse: 'Simple yes/no — use AlertDialog' },
  AlertDialog: { whenToUse: 'Destructive confirmations, important decisions', whenNotToUse: 'Complex content — use Dialog' },
  Sheet: { whenToUse: 'Side panels, detail views, mobile navigation', whenNotToUse: 'Small confirmations — use AlertDialog' },
  Drawer: { whenToUse: 'Bottom panels on mobile, swipe-to-dismiss', whenNotToUse: 'Desktop side panels — use Sheet' },
  Select: { whenToUse: 'Picking one from many options (5+)', whenNotToUse: 'Few options (2-4) — use RadioGroup' },
  Combobox: { whenToUse: 'Searchable/filterable option list', whenNotToUse: 'Small fixed list — use Select' },
  RadioGroup: { whenToUse: 'Mutually exclusive options (2-5 visible)', whenNotToUse: 'Many options — use Select or Combobox' },
  Checkbox: { whenToUse: 'Boolean or multi-select options', whenNotToUse: 'Single toggle — use Switch' },
  Switch: { whenToUse: 'On/off toggle with immediate effect', whenNotToUse: 'Form submission boolean — use Checkbox' },
  Tabs: { whenToUse: 'Switching between related views/sections', whenNotToUse: 'Multi-step wizard — use Stepper pattern' },
  Accordion: { whenToUse: 'Collapsible content sections, FAQ', whenNotToUse: 'Tab-like switching — use Tabs' },
  Table: { whenToUse: 'Static tabular data', whenNotToUse: 'Interactive features needed — use DataTable' },
  DataTable: { whenToUse: 'Tables with sorting, filtering, pagination', whenNotToUse: 'Simple static data — use Table' },
  Tooltip: { whenToUse: 'Brief supplementary info on hover', whenNotToUse: 'Interactive content — use Popover' },
  Popover: { whenToUse: 'Click-triggered popup with interactive content', whenNotToUse: 'Simple hover info — use Tooltip' },
  HoverCard: { whenToUse: 'Rich preview on hover (user profile, link preview)', whenNotToUse: 'Click interaction — use Popover' },
  Alert: { whenToUse: 'Static inline message (info, warning, error)', whenNotToUse: 'Temporary notification — use toast()' },
  Toast: { whenToUse: 'Temporary notifications, action confirmations', whenNotToUse: 'Persistent messages — use Alert' },
  Badge: { whenToUse: 'Status indicators, counts, labels', whenNotToUse: 'Clickable labels — use Button variant="ghost"' },
  Card: { whenToUse: 'Grouped content with header/body/footer', whenNotToUse: 'Simple container — use Box or VStack' },
  Form: { whenToUse: 'Form submission with validation', whenNotToUse: 'Single input without submit — use Input directly' },
  Field: { whenToUse: 'Wrapping form inputs with label, description, error', whenNotToUse: 'Standalone labels — use Label directly' },
  Sidebar: { whenToUse: 'App navigation sidebar', whenNotToUse: 'Simple nav list — use VStack + links' },
  NavigationMenu: { whenToUse: 'Top-level horizontal site navigation', whenNotToUse: 'Mobile nav — use Sheet or Drawer' },
  Breadcrumb: { whenToUse: 'Hierarchical path navigation', whenNotToUse: 'Linear step flow — use custom stepper' },
  Pagination: { whenToUse: 'Navigating paginated data', whenNotToUse: 'Infinite scroll — use IntersectionObserver' },
  Command: { whenToUse: 'Command palette, searchable action list', whenNotToUse: 'Simple dropdown — use DropdownMenu' },
  DropdownMenu: { whenToUse: 'Action menu triggered by button click', whenNotToUse: 'Form selection — use Select' },
  ContextMenu: { whenToUse: 'Right-click context actions', whenNotToUse: 'Mobile — no right-click; use DropdownMenu' },
  Calendar: { whenToUse: 'Inline date selection', whenNotToUse: 'Popup date selection — use DatePicker' },
  DatePicker: { whenToUse: 'Date selection in a popup', whenNotToUse: 'Date range — use DateRangePicker' },
  DateRangePicker: { whenToUse: 'Selecting start and end dates', whenNotToUse: 'Single date — use DatePicker' },
  Empty: { whenToUse: 'No-content states with message and optional action', whenNotToUse: 'Loading states — use Loader or Skeleton' },
  Loader: { whenToUse: 'Full-area loading state', whenNotToUse: 'Inline loading — use Spinner' },
  Spinner: { whenToUse: 'Inline loading indicator', whenNotToUse: 'Content placeholder — use Skeleton' },
  Skeleton: { whenToUse: 'Content placeholder during loading', whenNotToUse: 'Action indicator — use Spinner' },
  InputOTP: { whenToUse: 'OTP/PIN/verification code input', whenNotToUse: 'Regular text — use Input' },
  InputGroup: { whenToUse: 'Input with prefix/suffix elements (icons, buttons, addons)', whenNotToUse: 'Simple input — use Input' },
  Carousel: { whenToUse: 'Sliding through images or cards', whenNotToUse: 'Tabs-like content — use Tabs' },
  Resizable: { whenToUse: 'Adjustable panel layouts', whenNotToUse: 'Fixed layouts — use flex/grid' },
  ScrollArea: { whenToUse: 'Custom scrollbar styling for overflow content', whenNotToUse: 'Simple overflow — use native scroll' },
  Item: { whenToUse: 'List items with leading/trailing content', whenNotToUse: 'Simple text list — use List + ListItem' },
  ButtonGroup: { whenToUse: 'Grouping related buttons together', whenNotToUse: 'Toggle between options — use ToggleGroup' },
  Toggle: { whenToUse: 'Single on/off button (bold, italic)', whenNotToUse: 'Form boolean — use Checkbox or Switch' },
  ToggleGroup: { whenToUse: 'Mutually exclusive button selection (view mode)', whenNotToUse: 'Form radio — use RadioGroup' },
  Collapsible: { whenToUse: 'Single collapsible section', whenNotToUse: 'Multiple sections — use Accordion' },
}

// Accessibility info
const a11y = {
  Button: { role: 'button', keyboard: ['Enter', 'Space'] },
  Input: { role: 'textbox', keyboard: ['Tab'] },
  Checkbox: { role: 'checkbox', keyboard: ['Space'] },
  Switch: { role: 'switch', keyboard: ['Space'] },
  RadioGroup: { role: 'radiogroup', keyboard: ['Arrow keys'] },
  Select: { role: 'listbox', keyboard: ['Arrow keys', 'Enter', 'Escape'] },
  Dialog: { role: 'dialog', keyboard: ['Escape', 'Tab (trapped)'] },
  AlertDialog: { role: 'alertdialog', keyboard: ['Escape', 'Tab (trapped)'] },
  Tabs: { role: 'tablist', keyboard: ['Arrow keys'] },
  Accordion: { role: 'region', keyboard: ['Enter', 'Space', 'Arrow keys'] },
  Table: { role: 'table', keyboard: ['Tab'] },
  Tooltip: { role: 'tooltip', keyboard: ['Escape'] },
  DropdownMenu: { role: 'menu', keyboard: ['Arrow keys', 'Enter', 'Escape'] },
  ContextMenu: { role: 'menu', keyboard: ['Arrow keys', 'Enter', 'Escape'] },
  Command: { role: 'listbox', keyboard: ['Arrow keys', 'Enter', 'Escape'] },
  Combobox: { role: 'combobox', keyboard: ['Arrow keys', 'Enter', 'Escape'] },
  Slider: { role: 'slider', keyboard: ['Arrow keys'] },
  Toggle: { role: 'button', keyboard: ['Enter', 'Space'] },
  ToggleGroup: { role: 'group', keyboard: ['Arrow keys'] },
  Pagination: { role: 'navigation', keyboard: ['Tab'] },
  Breadcrumb: { role: 'navigation', keyboard: ['Tab'] },
  NavigationMenu: { role: 'navigation', keyboard: ['Arrow keys', 'Tab'] },
  Sidebar: { role: 'navigation', keyboard: ['Arrow keys', 'Tab'] },
  Menubar: { role: 'menubar', keyboard: ['Arrow keys', 'Enter', 'Escape'] },
}

function transformEntry(name, entry, layer) {
  const vlting = entry.vlting || {}
  const props = {}

  if (vlting.props) {
    for (const [propName, propDef] of Object.entries(vlting.props)) {
      if (propName === 'children' || propName === 'style' || propName === 'className') continue
      props[propName] = {
        type: propDef.type,
        ...(propDef.values?.length ? { values: propDef.values } : {}),
      }
    }
  }

  const result = {
    name,
    layer,
    category: categories[name] || 'other',
    import: vlting.import || `import { ${name} } from '@vlting/ui'`,
    platforms: webOnly.has(name) ? ['web'] : ['web', 'native'],
  }

  if (Object.keys(props).length) result.props = props

  const g = guidance[name]
  if (g) {
    result.whenToUse = g.whenToUse
    result.whenNotToUse = g.whenNotToUse
  }

  const acc = a11y[name]
  if (acc) result.accessibility = acc

  if (entry.notes?.length) {
    result.notes = entry.notes
  }

  if (entry.breaking?.length) {
    result.migration = entry.breaking.map(b => ({
      from: b.shadcn,
      to: b.vlting,
      reason: b.reason,
    }))
  }

  return result
}

// Build registry
const registry = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  version: '1.0.0',
  generated: new Date().toISOString().split('T')[0],
  library: '@vlting/ui',
  description: 'Cross-platform design system built on Tamagui v2. Multi-brand theming, tree-shakeable imports.',
  install: 'npm install @vlting/ui',
  components: [],
}

// Process primitives
for (const [name, entry] of Object.entries(mappings.primitives)) {
  registry.components.push(transformEntry(name, entry, 'primitive'))
}

// Process components
for (const [name, entry] of Object.entries(mappings.components)) {
  registry.components.push(transformEntry(name, entry, 'component'))
}

// Add chart entries
const chartTypes = [
  { name: 'Chart', layer: 'component', category: 'data-display', import: "import { Chart } from '@vlting/ui'", platforms: ['web', 'native'], whenToUse: 'Container for all chart types', props: { config: { type: 'ChartConfig' }, 'aria-label': { type: 'string' } }, accessibility: { role: 'img', keyboard: [] } },
  { name: 'AreaChart', layer: 'component', category: 'data-display', import: "import { AreaChart } from '@vlting/ui'", platforms: ['web', 'native'], whenToUse: 'Trends over time, cumulative data', whenNotToUse: 'Comparing categories — use BarChart', props: { data: { type: 'ChartDataPoint[]' }, variant: { type: 'AreaChartVariant', values: ['default','stacked','percent','step','gradient','sparkline','interactive','multiple','legend','axes'] }, xKey: { type: 'string' }, dataKeys: { type: 'string[]' } } },
  { name: 'BarChart', layer: 'component', category: 'data-display', import: "import { BarChart } from '@vlting/ui'", platforms: ['web', 'native'], whenToUse: 'Comparing categories, discrete values', whenNotToUse: 'Continuous trends — use LineChart', props: { data: { type: 'ChartDataPoint[]' }, variant: { type: 'BarChartVariant', values: ['default','horizontal','stacked','percent','grouped','mixed','negative','interactive','label','custom'] }, xKey: { type: 'string' }, dataKeys: { type: 'string[]' } } },
  { name: 'LineChart', layer: 'component', category: 'data-display', import: "import { LineChart } from '@vlting/ui'", platforms: ['web', 'native'], whenToUse: 'Trends, time series, comparisons', whenNotToUse: 'Part-of-whole — use PieChart', props: { data: { type: 'ChartDataPoint[]' }, variant: { type: 'LineChartVariant', values: ['default','multiple','dots','step','custom','label','linear','interactive','legend','sparkline'] }, xKey: { type: 'string' }, dataKeys: { type: 'string[]' } } },
  { name: 'PieChart', layer: 'component', category: 'data-display', import: "import { PieChart } from '@vlting/ui'", platforms: ['web', 'native'], whenToUse: 'Part-of-whole relationships, distributions', whenNotToUse: 'Many categories — use BarChart', props: { data: { type: 'ChartDataPoint[]' }, variant: { type: 'PieChartVariant', values: ['default','donut','interactive','label','custom','stacked','legend','separator','half','nested','active'] }, dataKey: { type: 'string' }, nameKey: { type: 'string' } } },
  { name: 'RadarChart', layer: 'component', category: 'data-display', import: "import { RadarChart } from '@vlting/ui'", platforms: ['web', 'native'], whenToUse: 'Multi-dimensional comparisons, skill charts', whenNotToUse: 'Simple comparisons — use BarChart', props: { data: { type: 'ChartDataPoint[]' }, variant: { type: 'RadarChartVariant', values: ['default','dots','multiple','lines','label','custom','radius','grid','circle','filled','icons','legend','stacked','interactive'] }, dataKeys: { type: 'string[]' } } },
  { name: 'RadialChart', layer: 'component', category: 'data-display', import: "import { RadialChart } from '@vlting/ui'", platforms: ['web', 'native'], whenToUse: 'Gauge-like displays, progress circles', whenNotToUse: 'Full pie — use PieChart', props: { data: { type: 'ChartDataPoint[]' }, variant: { type: 'RadialChartVariant', values: ['default','label','grid','text','shape','stacked'] }, dataKey: { type: 'string' } } },
  { name: 'ChartTooltip', layer: 'component', category: 'data-display', import: "import { ChartTooltip } from '@vlting/ui'", platforms: ['web', 'native'], whenToUse: 'Interactive data point details on hover', props: { variant: { type: 'TooltipVariant', values: ['default','label','custom','grid','minimal','dashed','indicator-dot','indicator-line','no-indicator'] } } },
  { name: 'ChartLegend', layer: 'component', category: 'data-display', import: "import { ChartLegend } from '@vlting/ui'", platforms: ['web', 'native'], whenToUse: 'Identifying chart data series', props: { layout: { type: 'LegendLayout', values: ['horizontal','vertical'] } } },
  { name: 'ChartDataTable', layer: 'component', category: 'data-display', import: "import { ChartDataTable } from '@vlting/ui'", platforms: ['web', 'native'], whenToUse: 'Screen reader accessible chart data (hidden visually)', props: {} },
]

for (const chart of chartTypes) {
  registry.components.push(chart)
}

// Add block entries
const blocks = [
  { name: 'AuthBlock', layer: 'block', category: 'composition', import: "import { AuthBlock } from '@vlting/ui'", platforms: ['web', 'native'], whenToUse: 'Login and signup forms', whenNotToUse: 'Custom auth flow — compose from Form + Input + Button', props: { variant: { type: 'AuthBlockVariant', values: ['login-card','login-split','signup-card','signup-split','signup-social'] }, onSubmit: { type: '(data) => void' } } },
  { name: 'SidebarBlock', layer: 'block', category: 'composition', import: "import { SidebarBlock } from '@vlting/ui'", platforms: ['web'], whenToUse: 'App navigation sidebar with pre-built layouts', whenNotToUse: 'Simple nav — use Sidebar component directly', props: { variant: { type: 'SidebarBlockVariant', values: ['simple','with-groups','with-icons','collapsible','with-footer','with-search','with-file-tree','with-nested'] }, items: { type: 'NavItem[]' } } },
  { name: 'DashboardBlock', layer: 'block', category: 'composition', import: "import { DashboardBlock } from '@vlting/ui'", platforms: ['web'], whenToUse: 'Overview dashboards with metrics', props: { variant: { type: 'DashboardBlockVariant', values: ['metrics-grid','metrics-chart'] }, metrics: { type: 'MetricCard[]' } } },
  { name: 'DataTableBlock', layer: 'block', category: 'composition', import: "import { DataTableBlock } from '@vlting/ui'", platforms: ['web'], whenToUse: 'Pre-composed data table layouts', whenNotToUse: 'Custom table — use DataTable directly', props: { variant: { type: 'DataTableBlockVariant', values: ['default','with-filters','with-toolbar'] } } },
  { name: 'SettingsBlock', layer: 'block', category: 'composition', import: "import { SettingsBlock } from '@vlting/ui'", platforms: ['web'], whenToUse: 'Settings pages with form sections', props: { variant: { type: 'SettingsBlockVariant', values: ['profile','notifications','appearance'] } } },
  { name: 'PricingBlock', layer: 'block', category: 'composition', import: "import { PricingBlock } from '@vlting/ui'", platforms: ['web'], whenToUse: 'Pricing display pages', props: { variant: { type: 'PricingBlockVariant', values: ['cards','table','comparison'] } } },
  { name: 'HeroBlock', layer: 'block', category: 'composition', import: "import { HeroBlock } from '@vlting/ui'", platforms: ['web'], whenToUse: 'Landing page hero sections', props: { variant: { type: 'HeroBlockVariant', values: ['centered','split','gradient','minimal'] }, title: { type: 'string' }, subtitle: { type: 'string' }, actions: { type: 'HeroAction[]' } } },
  { name: 'FeedBlock', layer: 'block', category: 'composition', import: "import { FeedBlock } from '@vlting/ui'", platforms: ['web'], whenToUse: 'Activity feeds, timelines, notifications', props: { variant: { type: 'FeedBlockVariant', values: ['timeline','notifications','comments'] } } },
  { name: 'AppShellBlock', layer: 'block', category: 'composition', import: "import { AppShellBlock } from '@vlting/ui'", platforms: ['web'], whenToUse: 'Complete app shell with sidebar/header', props: { variant: { type: 'AppShellBlockVariant', values: ['sidebar-header','sidebar-only','header-only','dashboard'] } } },
  { name: 'EmptyStateBlock', layer: 'block', category: 'composition', import: "import { EmptyStateBlock } from '@vlting/ui'", platforms: ['web', 'native'], whenToUse: 'Empty state pages with illustration and action', props: { variant: { type: 'EmptyStateBlockVariant', values: ['simple','with-action','illustration','search','error'] } } },
]

for (const block of blocks) {
  registry.components.push(block)
}

// Sort by layer then name
const layerOrder = { primitive: 0, component: 1, block: 2 }
registry.components.sort((a, b) =>
  (layerOrder[a.layer] ?? 9) - (layerOrder[b.layer] ?? 9) || a.name.localeCompare(b.name)
)

registry.totalCount = registry.components.length

writeFileSync(
  resolve(root, 'docs/ai/registry.json'),
  JSON.stringify(registry, null, 2) + '\n'
)

console.log(`Generated registry with ${registry.totalCount} entries`)
console.log(`  Primitives: ${registry.components.filter(c => c.layer === 'primitive').length}`)
console.log(`  Components: ${registry.components.filter(c => c.layer === 'component').length}`)
console.log(`  Blocks: ${registry.components.filter(c => c.layer === 'block').length}`)
