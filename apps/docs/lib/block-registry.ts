export type BlockCategory =
  | 'auth'
  | 'sidebar'
  | 'dashboard'
  | 'data-table'
  | 'settings'
  | 'pricing'
  | 'hero'
  | 'feed'
  | 'app-shell'
  | 'empty-state'

export interface BlockEntry {
  name: string
  slug: string
  category: BlockCategory
  description: string
  variants: string[]
  defaultVariant: string
  code: string
}

const registry: BlockEntry[] = [
  {
    name: 'Auth Block',
    slug: 'auth',
    category: 'auth',
    description:
      'Unified authentication forms for login and signup flows. Supports standard email/password, OTP, magic link, social-only, and registration variants.',
    variants: [
      'login-standard',
      'login-otp',
      'login-magic',
      'login-social',
      'signup-standard',
      'signup-social',
    ],
    defaultVariant: 'login-standard',
    code: `import { AuthBlock } from '@vlting/ui/blocks'

<AuthBlock
  variant="login-standard"
  onSubmit={(data) => console.log(data)}
  socialProviders={[
    { name: 'Google', icon: <GoogleIcon />, onPress: () => {} },
    { name: 'GitHub', icon: <GitHubIcon />, onPress: () => {} },
  ]}
/>`,
  },
  {
    name: 'Sidebar Block',
    slug: 'sidebar',
    category: 'sidebar',
    description:
      'Navigation sidebar with grouped, collapsible, nested, floating, icon-only, file-tree, and calendar variants.',
    variants: [
      'grouped',
      'collapsible',
      'nested',
      'floating',
      'icon-only',
      'file-tree',
      'calendar',
    ],
    defaultVariant: 'grouped',
    code: `import { SidebarBlock } from '@vlting/ui/blocks'

<SidebarBlock
  variant="grouped"
  groups={[
    { label: 'Main', items: [
      { label: 'Home', icon: <HomeIcon />, href: '/', active: true },
      { label: 'Settings', icon: <GearIcon />, href: '/settings' },
    ]},
  ]}
/>`,
  },
  {
    name: 'Dashboard Block',
    slug: 'dashboard',
    category: 'dashboard',
    description:
      'Analytics and overview dashboards with metrics cards, charts, and data tables.',
    variants: ['analytics', 'overview'],
    defaultVariant: 'analytics',
    code: `import { DashboardBlock } from '@vlting/ui/blocks'

<DashboardBlock
  variant="analytics"
  title="Analytics"
  metrics={[
    { title: 'Revenue', value: '$45,231', change: '+20.1%', trend: 'up' },
    { title: 'Users', value: '2,350', change: '+180', trend: 'up' },
  ]}
/>`,
  },
  {
    name: 'Data Table Block',
    slug: 'data-table',
    category: 'data-table',
    description:
      'Data tables with search, pagination, and sorting. Supports standard, compact, and expandable row variants.',
    variants: ['standard', 'compact', 'expandable'],
    defaultVariant: 'standard',
    code: `import { DataTableBlock } from '@vlting/ui/blocks'

<DataTableBlock
  variant="standard"
  title="Users"
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
  ]}
  data={[
    { name: 'Alice', email: 'alice@example.com' },
  ]}
/>`,
  },
  {
    name: 'Settings Block',
    slug: 'settings',
    category: 'settings',
    description:
      'Settings panels for profile editing, app preferences, and account management.',
    variants: ['profile', 'preferences', 'account'],
    defaultVariant: 'profile',
    code: `import { SettingsBlock } from '@vlting/ui/blocks'

<SettingsBlock
  variant="profile"
  user={{ name: 'Jane Doe', email: 'jane@example.com' }}
  onSave={(data) => console.log(data)}
/>`,
  },
  {
    name: 'Pricing Block',
    slug: 'pricing',
    category: 'pricing',
    description:
      'Pricing displays with card-based tiers, comparison tables, and simple single-plan layouts.',
    variants: ['cards', 'comparison', 'simple'],
    defaultVariant: 'cards',
    code: `import { PricingBlock } from '@vlting/ui/blocks'

<PricingBlock
  variant="cards"
  plans={[
    { name: 'Free', price: '$0', interval: 'month', features: ['1 project', '100MB storage'] },
    { name: 'Pro', price: '$19', interval: 'month', features: ['Unlimited projects', '10GB storage'], highlighted: true },
  ]}
/>`,
  },
  {
    name: 'Hero Block',
    slug: 'hero',
    category: 'hero',
    description:
      'Landing page hero sections with centered, split media, and image background variants.',
    variants: ['centered', 'split', 'image-bg'],
    defaultVariant: 'centered',
    code: `import { HeroBlock } from '@vlting/ui/blocks'

<HeroBlock
  variant="centered"
  title="Build faster with blocks"
  description="Pre-composed UI patterns for your next project."
  primaryAction={{ label: 'Get Started', onPress: () => {} }}
  secondaryAction={{ label: 'Learn More', onPress: () => {} }}
/>`,
  },
  {
    name: 'Feed Block',
    slug: 'feed',
    category: 'feed',
    description:
      'Activity feeds for timelines, notifications, and threaded comment systems.',
    variants: ['timeline', 'notifications', 'comments'],
    defaultVariant: 'timeline',
    code: `import { FeedBlock } from '@vlting/ui/blocks'

<FeedBlock
  variant="timeline"
  title="Activity"
  events={[
    { id: '1', title: 'Project created', date: 'Mar 1', status: 'completed' },
    { id: '2', title: 'First deploy', date: 'Mar 2', status: 'current' },
  ]}
/>`,
  },
  {
    name: 'App Shell Block',
    slug: 'app-shell',
    category: 'app-shell',
    description:
      'Full application layout shells with sidebar, bottom tab, and split-pane variants.',
    variants: ['sidebar-layout', 'tab-layout', 'split-pane'],
    defaultVariant: 'sidebar-layout',
    code: `import { AppShellBlock } from '@vlting/ui/blocks'

<AppShellBlock
  variant="sidebar-layout"
  sidebarGroups={[
    { label: 'Main', items: [
      { label: 'Home', href: '/' },
    ]},
  ]}
>
  {children}
</AppShellBlock>`,
  },
  {
    name: 'Empty State Block',
    slug: 'empty-state',
    category: 'empty-state',
    description: 'Placeholder states for empty data, errors, and coming-soon features.',
    variants: ['no-data', 'error', 'coming-soon'],
    defaultVariant: 'no-data',
    code: `import { EmptyStateBlock } from '@vlting/ui/blocks'

<EmptyStateBlock
  variant="no-data"
  title="No items yet"
  description="Get started by creating your first item."
  action={{ label: 'Create Item', onPress: () => {} }}
/>`,
  },
]

const slugMap = new Map(registry.map((entry) => [entry.slug, entry]))

export function getBlock(slug: string): BlockEntry | undefined {
  return slugMap.get(slug)
}

export function getAllBlocks(): BlockEntry[] {
  return registry
}

export function getBlocksByCategory(category: BlockCategory): BlockEntry[] {
  return registry.filter((entry) => entry.category === category)
}

export { registry as blockRegistry }
