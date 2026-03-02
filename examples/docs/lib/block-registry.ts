export interface BlockEntry {
  name: string
  slug: string
  category: 'login' | 'signup' | 'sidebar' | 'dashboard' | 'originals'
  description: string
  code: string
}

const registry: BlockEntry[] = [
  // Login blocks
  {
    name: 'Login 01',
    slug: 'login-01',
    category: 'login',
    description:
      'Simple centered login form for standard email/password authentication. Best for standalone login pages and minimal auth UIs.',
    code: `import { Login01 } from '@vlting/ui/blocks'

<Login01
  onSubmit={(data) => console.log(data)}
  socialProviders={['google', 'github']}
  title="Welcome back"
  description="Enter your credentials to sign in"
/>`,
  },
  {
    name: 'Login 02',
    slug: 'login-02',
    category: 'login',
    description:
      'Email verification login with OTP code input. Sends a verification code to the user\'s email for passwordless authentication.',
    code: `import { Login02 } from '@vlting/ui/blocks'

<Login02
  onSubmit={(data) => console.log(data)}
  onResendCode={() => console.log('Resend')}
  title="Verify your email"
/>`,
  },
  {
    name: 'Login 03',
    slug: 'login-03',
    category: 'login',
    description:
      'Magic link login with email-only input. Sends a sign-in link to the user\'s email — no password required.',
    code: `import { Login03 } from '@vlting/ui/blocks'

<Login03
  onSubmit={(data) => console.log(data)}
  title="Sign in with magic link"
/>`,
  },
  {
    name: 'Login 04',
    slug: 'login-04',
    category: 'login',
    description:
      'Biometric/passwordless login supporting fingerprint, face recognition, and passkeys.',
    code: `import { Login04 } from '@vlting/ui/blocks'

<Login04
  onSubmit={(data) => console.log(data)}
  onBiometricAuth={() => console.log('Biometric')}
  title="Sign in"
/>`,
  },
  {
    name: 'Login 05',
    slug: 'login-05',
    category: 'login',
    description:
      'OAuth-only login with social provider buttons. No email/password form — authentication exclusively through third-party providers.',
    code: `import { Login05 } from '@vlting/ui/blocks'

<Login05
  socialProviders={['google', 'github', 'apple']}
  onSocialLogin={(provider) => console.log(provider)}
  title="Sign in"
/>`,
  },

  // Signup blocks
  {
    name: 'Signup 01',
    slug: 'signup-01',
    category: 'signup',
    description:
      'Standard centered signup card with name, email, and password fields plus terms checkbox.',
    code: `import { Signup01 } from '@vlting/ui/blocks'

<Signup01
  onSubmit={(data) => console.log(data)}
  socialProviders={['google', 'github']}
  title="Create an account"
/>`,
  },
  {
    name: 'Signup 02',
    slug: 'signup-02',
    category: 'signup',
    description:
      'Multi-step signup form that walks users through personal info, then account setup in separate screens.',
    code: `import { Signup02 } from '@vlting/ui/blocks'

<Signup02
  onSubmit={(data) => console.log(data)}
  steps={['Personal Info', 'Account Setup']}
  title="Get started"
/>`,
  },
  {
    name: 'Signup 03',
    slug: 'signup-03',
    category: 'signup',
    description:
      'Signup form with profile picture upload. Includes avatar preview and drag-and-drop image input.',
    code: `import { Signup03 } from '@vlting/ui/blocks'

<Signup03
  onSubmit={(data) => console.log(data)}
  onImageUpload={(file) => console.log(file)}
  title="Create your profile"
/>`,
  },
  {
    name: 'Signup 04',
    slug: 'signup-04',
    category: 'signup',
    description:
      'Invite-based signup with pre-filled email from invitation token. Used for team onboarding flows.',
    code: `import { Signup04 } from '@vlting/ui/blocks'

<Signup04
  onSubmit={(data) => console.log(data)}
  invitedEmail="invited@example.com"
  teamName="Acme Corp"
  title="Join your team"
/>`,
  },
  {
    name: 'Signup 05',
    slug: 'signup-05',
    category: 'signup',
    description:
      'Social-first signup with OAuth provider buttons prominently displayed, plus optional email/password fallback.',
    code: `import { Signup05 } from '@vlting/ui/blocks'

<Signup05
  socialProviders={['google', 'github', 'apple']}
  onSocialSignup={(provider) => console.log(provider)}
  title="Sign up"
/>`,
  },

  // Sidebar blocks
  {
    name: 'Sidebar 01',
    slug: 'sidebar-01',
    category: 'sidebar',
    description:
      'Simple navigation sidebar with grouped sections. Flat list of links — no collapsible or nested items.',
    code: `import { Sidebar01 } from '@vlting/ui/blocks'

<Sidebar01
  items={[
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    { label: 'Settings', href: '/settings', icon: Settings },
  ]}
/>`,
  },
  {
    name: 'Sidebar 02',
    slug: 'sidebar-02',
    category: 'sidebar',
    description:
      'Sidebar with collapsible sections. Group labels can expand/collapse to show or hide their child items.',
    code: `import { Sidebar02 } from '@vlting/ui/blocks'

<Sidebar02
  groups={[
    { label: 'Main', items: [...], collapsible: true },
    { label: 'Settings', items: [...], collapsible: true },
  ]}
/>`,
  },
  {
    name: 'Sidebar 03',
    slug: 'sidebar-03',
    category: 'sidebar',
    description:
      'Sidebar with submenus and nested navigation. Supports multi-level tree structure for complex apps.',
    code: `import { Sidebar03 } from '@vlting/ui/blocks'

<Sidebar03
  items={[
    { label: 'Products', children: [
      { label: 'All Products', href: '/products' },
      { label: 'Categories', href: '/categories' },
    ]},
  ]}
/>`,
  },
  {
    name: 'Sidebar 04',
    slug: 'sidebar-04',
    category: 'sidebar',
    description:
      'Floating variant with elevated shadow, search input, and submenu support. Appears to hover over content.',
    code: `import { Sidebar04 } from '@vlting/ui/blocks'

<Sidebar04 items={[...]} searchable />`,
  },
  {
    name: 'Sidebar 05',
    slug: 'sidebar-05',
    category: 'sidebar',
    description:
      'Collapsible submenus with tree line indicators showing the hierarchy relationship between items.',
    code: `import { Sidebar05 } from '@vlting/ui/blocks'

<Sidebar05 items={[...]} showTreeLines />`,
  },
  {
    name: 'Sidebar 06',
    slug: 'sidebar-06',
    category: 'sidebar',
    description:
      'Tabs-based navigation sidebar. Uses horizontal tab groups to organize navigation into switchable categories.',
    code: `import { Sidebar06 } from '@vlting/ui/blocks'

<Sidebar06
  tabs={[
    { label: 'Main', items: [...] },
    { label: 'Settings', items: [...] },
  ]}
/>`,
  },
  {
    name: 'Sidebar 07',
    slug: 'sidebar-07',
    category: 'sidebar',
    description:
      'Icon-only compact sidebar that shows labels on hover. Takes minimal horizontal space.',
    code: `import { Sidebar07 } from '@vlting/ui/blocks'

<Sidebar07
  items={[
    { icon: Home, label: 'Home', href: '/' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]}
/>`,
  },
  {
    name: 'Sidebar 08',
    slug: 'sidebar-08',
    category: 'sidebar',
    description:
      'Inset sidebar variant that is embedded within the page content area rather than spanning full height.',
    code: `import { Sidebar08 } from '@vlting/ui/blocks'

<Sidebar08 items={[...]} variant="inset" />`,
  },
  {
    name: 'Sidebar 09',
    slug: 'sidebar-09',
    category: 'sidebar',
    description:
      'Collapsible nested navigation with expandable tree items. Deeper nesting support than Sidebar 03.',
    code: `import { Sidebar09 } from '@vlting/ui/blocks'

<Sidebar09 items={[...]} defaultExpanded={['section-1']} />`,
  },
  {
    name: 'Sidebar 10',
    slug: 'sidebar-10',
    category: 'sidebar',
    description:
      'Popover-triggered navigation menu. Click an icon to open a dropdown with navigation options.',
    code: `import { Sidebar10 } from '@vlting/ui/blocks'

<Sidebar10 items={[...]} />`,
  },
  {
    name: 'Sidebar 11',
    slug: 'sidebar-11',
    category: 'sidebar',
    description:
      'File tree navigation sidebar. Renders folder/file structure with expandable directories — ideal for code editors and file managers.',
    code: `import { Sidebar11 } from '@vlting/ui/blocks'

<Sidebar11
  tree={[
    { name: 'src', type: 'folder', children: [
      { name: 'index.ts', type: 'file' },
    ]},
  ]}
/>`,
  },
  {
    name: 'Sidebar 12',
    slug: 'sidebar-12',
    category: 'sidebar',
    description:
      'Calendar sidebar with date picker and event list. Shows upcoming events alongside a mini calendar.',
    code: `import { Sidebar12 } from '@vlting/ui/blocks'

<Sidebar12
  events={[
    { date: '2026-03-02', title: 'Team standup' },
  ]}
/>`,
  },
  {
    name: 'Sidebar 13',
    slug: 'sidebar-13',
    category: 'sidebar',
    description:
      'Dialog-triggered sidebar. On mobile: opens as an offcanvas overlay. On desktop: displays as a full sidebar.',
    code: `import { Sidebar13 } from '@vlting/ui/blocks'

<Sidebar13 items={[...]} mobileBreakpoint="md" />`,
  },
  {
    name: 'Sidebar 14',
    slug: 'sidebar-14',
    category: 'sidebar',
    description:
      'Right-side sidebar with mirror layout. Placed on the right edge instead of the left.',
    code: `import { Sidebar14 } from '@vlting/ui/blocks'

<Sidebar14 items={[...]} side="right" />`,
  },
  {
    name: 'Sidebar 15',
    slug: 'sidebar-15',
    category: 'sidebar',
    description:
      'Dual sidebars layout with a primary navigation sidebar on the left and a secondary sidebar on the right.',
    code: `import { Sidebar15 } from '@vlting/ui/blocks'

<Sidebar15
  primaryItems={[...]}
  secondaryItems={[...]}
/>`,
  },
  {
    name: 'Sidebar 16',
    slug: 'sidebar-16',
    category: 'sidebar',
    description:
      'Sticky header sidebar where the header section remains visible while the navigation content scrolls.',
    code: `import { Sidebar16 } from '@vlting/ui/blocks'

<Sidebar16 items={[...]} headerContent={<Logo />} />`,
  },

  // Dashboard blocks
  {
    name: 'Dashboard 01',
    slug: 'dashboard-01',
    category: 'dashboard',
    description:
      'Analytics dashboard with metrics cards, charts, and sidebar layout. Combines multiple chart types with summary statistics.',
    code: `import { Dashboard01 } from '@vlting/ui/blocks'

<Dashboard01
  metrics={[
    { label: 'Total Revenue', value: '$45,231', change: '+20.1%' },
    { label: 'Subscriptions', value: '2,350', change: '+180.1%' },
  ]}
/>`,
  },

  // Original cross-platform blocks
  {
    name: 'Mobile Tab Layout',
    slug: 'mobile-tab-layout',
    category: 'originals',
    description:
      'Mobile bottom-tab navigation layout. Works on both web and React Native with platform-adaptive styling.',
    code: `import { MobileTabLayout } from '@vlting/ui/blocks'

<MobileTabLayout
  tabs={[
    { label: 'Home', icon: Home, screen: HomeScreen },
    { label: 'Search', icon: Search, screen: SearchScreen },
    { label: 'Profile', icon: User, screen: ProfileScreen },
  ]}
/>`,
  },
  {
    name: 'Master Detail',
    slug: 'master-detail',
    category: 'originals',
    description:
      'Two-pane responsive layout with a list on the left and detail view on the right. Collapses to single pane on mobile.',
    code: `import { MasterDetail } from '@vlting/ui/blocks'

<MasterDetail
  masterContent={<ItemList />}
  detailContent={<ItemDetail />}
  breakpoint="md"
/>`,
  },
  {
    name: 'App Shell Responsive',
    slug: 'app-shell-responsive',
    category: 'originals',
    description:
      'Full responsive app shell with header, sidebar, and main content area. Desktop shows full sidebar; mobile uses a drawer.',
    code: `import { AppShellResponsive } from '@vlting/ui/blocks'

<AppShellResponsive
  header={<AppHeader />}
  sidebar={<AppSidebar />}
>
  {children}
</AppShellResponsive>`,
  },
]

const slugMap = new Map(registry.map((entry) => [entry.slug, entry]))

export function getBlock(slug: string): BlockEntry | undefined {
  return slugMap.get(slug)
}

export function getAllBlocks(): BlockEntry[] {
  return registry
}

export function getBlocksByCategory(
  category: BlockEntry['category'],
): BlockEntry[] {
  return registry.filter((entry) => entry.category === category)
}

export { registry as blockRegistry }
