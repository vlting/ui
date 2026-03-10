/**
 * Intent-to-component matching rules.
 * Each rule maps UI intent keywords to component suggestions.
 */

export interface Suggestion {
  name: string
  reason: string
  example: string
}

interface Rule {
  keywords: string[]
  suggestions: Suggestion[]
}

const rules: Rule[] = [
  // Modals / Overlays
  {
    keywords: [
      'confirm',
      'confirmation',
      'are you sure',
      'delete confirmation',
      'destructive',
    ],
    suggestions: [
      {
        name: 'AlertDialog',
        reason: 'Blocks interaction and requires a yes/no response',
        example:
          '<AlertDialog.Root><AlertDialog.Trigger><Button>Delete</Button></AlertDialog.Trigger><AlertDialog.Content><AlertDialog.Title>Are you sure?</AlertDialog.Title><AlertDialog.Action><Button variant="destructive">Delete</Button></AlertDialog.Action><AlertDialog.Cancel><Button variant="outline">Cancel</Button></AlertDialog.Cancel></AlertDialog.Content></AlertDialog.Root>',
      },
    ],
  },
  {
    keywords: ['modal', 'dialog', 'popup', 'form modal', 'edit modal'],
    suggestions: [
      {
        name: 'Dialog',
        reason: 'Flexible modal for forms, detail views, multi-step flows',
        example:
          '<Dialog.Root><Dialog.Trigger><Button>Edit</Button></Dialog.Trigger><Dialog.Content><Dialog.Title>Edit Profile</Dialog.Title>{form}</Dialog.Content></Dialog.Root>',
      },
      {
        name: 'Sheet',
        reason: 'Side panel for detail views (alternative to Dialog)',
        example:
          '<Sheet.Root><Sheet.Trigger><Button>Details</Button></Sheet.Trigger><Sheet.Content side="right">{content}</Sheet.Content></Sheet.Root>',
      },
    ],
  },
  {
    keywords: ['side panel', 'side sheet', 'drawer right', 'detail panel'],
    suggestions: [
      {
        name: 'Sheet',
        reason: 'Slides from the side, good for detail views',
        example:
          '<Sheet.Root><Sheet.Content side="right">{content}</Sheet.Content></Sheet.Root>',
      },
    ],
  },
  {
    keywords: ['bottom sheet', 'mobile drawer', 'swipe', 'bottom panel'],
    suggestions: [
      {
        name: 'Drawer',
        reason: 'Bottom panel with swipe-to-dismiss, mobile-friendly',
        example: '<Drawer.Root><Drawer.Content>{content}</Drawer.Content></Drawer.Root>',
      },
    ],
  },
  // Forms
  {
    keywords: ['form', 'submit', 'input form', 'validation'],
    suggestions: [
      {
        name: 'Form',
        reason: 'Form container with field-level validation support',
        example:
          '<Form.Root onSubmit={handleSubmit}><Form.Field><Form.Label>Email</Form.Label><Input /><Form.ErrorMessage>{error}</Form.ErrorMessage></Form.Field><Button type="submit">Submit</Button></Form.Root>',
      },
    ],
  },
  {
    keywords: ['text input', 'input field', 'text field', 'enter text'],
    suggestions: [
      {
        name: 'Input',
        reason: 'Single-line text input',
        example: '<Input placeholder="Enter email" />',
      },
      {
        name: 'InputGroup',
        reason: 'Input with prefix/suffix elements',
        example:
          '<InputGroup.Root><InputGroup.Element><RiSearchLine /></InputGroup.Element><InputGroup.Input placeholder="Search..." /></InputGroup.Root>',
      },
    ],
  },
  {
    keywords: ['textarea', 'multiline', 'long text', 'message', 'comment'],
    suggestions: [
      {
        name: 'Textarea',
        reason: 'Multi-line text input',
        example: '<Textarea placeholder="Your message" rows={4} />',
      },
    ],
  },
  {
    keywords: ['select', 'dropdown', 'pick one', 'choose'],
    suggestions: [
      {
        name: 'Select',
        reason: 'Dropdown for selecting one option from many',
        example:
          '<Select.Root><Select.Trigger><Select.Value placeholder="Choose..." /></Select.Trigger><Select.Content><Select.Item value="a">A</Select.Item></Select.Content></Select.Root>',
      },
      {
        name: 'Combobox',
        reason: 'Searchable dropdown (if you need filtering)',
        example:
          '<Combobox.Root><Combobox.Input placeholder="Search..." /><Combobox.Content><Combobox.Item value="react">React</Combobox.Item></Combobox.Content></Combobox.Root>',
      },
    ],
  },
  {
    keywords: [
      'search select',
      'autocomplete',
      'searchable',
      'combobox',
      'filter options',
    ],
    suggestions: [
      {
        name: 'Combobox',
        reason: 'Searchable/filterable option list',
        example:
          '<Combobox.Root><Combobox.Input placeholder="Search frameworks..." /><Combobox.Content>{options}</Combobox.Content></Combobox.Root>',
      },
    ],
  },
  {
    keywords: ['checkbox', 'multi select', 'check', 'terms'],
    suggestions: [
      {
        name: 'Checkbox',
        reason: 'Boolean or multi-select checkboxes',
        example:
          '<Checkbox.Root checked={checked} onCheckedChange={setChecked}><Checkbox.Indicator /></Checkbox.Root>',
      },
    ],
  },
  {
    keywords: ['toggle', 'switch', 'on off', 'enable disable'],
    suggestions: [
      {
        name: 'Switch',
        reason: 'On/off toggle with immediate effect',
        example: '<Switch checked={on} onCheckedChange={setOn} />',
      },
    ],
  },
  {
    keywords: ['radio', 'single choice', 'option group', 'mutually exclusive'],
    suggestions: [
      {
        name: 'RadioGroup',
        reason: 'Mutually exclusive visible options',
        example:
          '<RadioGroup.Root value={value} onValueChange={setValue}><RadioGroup.Item value="a" /><RadioGroup.Item value="b" /></RadioGroup.Root>',
      },
    ],
  },
  {
    keywords: ['date', 'date picker', 'calendar', 'pick date'],
    suggestions: [
      {
        name: 'DatePicker',
        reason: 'Date selection popup',
        example: '<DatePicker value={date} onChange={setDate} />',
      },
      {
        name: 'DateRangePicker',
        reason: 'Select start and end dates',
        example: '<DateRangePicker value={range} onChange={setRange} />',
      },
      {
        name: 'Calendar',
        reason: 'Inline calendar (no popup)',
        example: '<Calendar.Root selected={date} onSelect={setDate} />',
      },
    ],
  },
  {
    keywords: ['otp', 'verification code', 'pin', '2fa'],
    suggestions: [
      {
        name: 'InputOTP',
        reason: 'Fixed-length code input',
        example:
          '<InputOTP.Root maxLength={6} value={otp} onChange={setOtp}>{slots}</InputOTP.Root>',
      },
    ],
  },
  // Navigation
  {
    keywords: ['tabs', 'tab', 'tab bar', 'switch views'],
    suggestions: [
      {
        name: 'Tabs',
        reason: 'Switch between related content sections',
        example:
          '<Tabs.Root defaultValue="tab1"><Tabs.List><Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger></Tabs.List><Tabs.Content value="tab1">{content}</Tabs.Content></Tabs.Root>',
      },
    ],
  },
  {
    keywords: ['sidebar', 'side nav', 'navigation sidebar'],
    suggestions: [
      {
        name: 'Sidebar',
        reason: 'App navigation sidebar component',
        example:
          '<Sidebar.Root><Sidebar.Group><Sidebar.MenuItem href="/">Home</Sidebar.MenuItem></Sidebar.Group></Sidebar.Root>',
      },
      {
        name: 'SidebarBlock',
        reason: 'Pre-composed sidebar with variants',
        example: '<SidebarBlock variant="with-groups" items={navItems} />',
      },
    ],
  },
  {
    keywords: ['breadcrumb', 'path', 'hierarchy'],
    suggestions: [
      {
        name: 'Breadcrumb',
        reason: 'Hierarchical path navigation',
        example:
          '<Breadcrumb items={[{label:"Home",href:"/"},{label:"Page",active:true}]} />',
      },
    ],
  },
  {
    keywords: ['pagination', 'page', 'next previous'],
    suggestions: [
      {
        name: 'Pagination',
        reason: 'Page navigation controls',
        example: '<Pagination page={1} totalPages={10} onPageChange={setPage} />',
      },
    ],
  },
  {
    keywords: ['command palette', 'command', 'spotlight', 'ctrl k', 'cmd k'],
    suggestions: [
      {
        name: 'Command',
        reason: 'Searchable command/action list',
        example:
          '<Command.Root><Command.Input placeholder="Type a command..." /><Command.List><Command.Group>{items}</Command.Group></Command.List></Command.Root>',
      },
    ],
  },
  // Data Display
  {
    keywords: ['table', 'data table', 'grid', 'sortable', 'rows columns'],
    suggestions: [
      {
        name: 'DataTable',
        reason: 'Interactive table with sorting, filtering, pagination',
        example: '<DataTable columns={columns} data={data} />',
      },
      {
        name: 'Table',
        reason: 'Simple static HTML table',
        example:
          '<Table.Root><Table.Header><Table.Row><Table.Head>Name</Table.Head></Table.Row></Table.Header><Table.Body>{rows}</Table.Body></Table.Root>',
      },
    ],
  },
  {
    keywords: ['chart', 'graph', 'visualization', 'analytics'],
    suggestions: [
      {
        name: 'BarChart',
        reason: 'Compare categories or discrete values',
        example:
          '<Chart config={config}><BarChart data={data} xKey="month" dataKeys={["value"]} /></Chart>',
      },
      {
        name: 'LineChart',
        reason: 'Show trends over time',
        example:
          '<Chart config={config}><LineChart data={data} xKey="month" dataKeys={["value"]} /></Chart>',
      },
      {
        name: 'AreaChart',
        reason: 'Show cumulative trends',
        example:
          '<Chart config={config}><AreaChart data={data} xKey="month" dataKeys={["value"]} /></Chart>',
      },
      {
        name: 'PieChart',
        reason: 'Show part-of-whole relationships',
        example:
          '<Chart config={config}><PieChart data={data} dataKey="value" nameKey="name" /></Chart>',
      },
    ],
  },
  // Feedback
  {
    keywords: ['toast', 'notification', 'snackbar', 'temporary message'],
    suggestions: [
      {
        name: 'Toast',
        reason: 'Temporary auto-dismiss notification',
        example: "toast.success('Saved!')",
      },
    ],
  },
  {
    keywords: ['alert', 'banner', 'notice', 'warning message', 'info message'],
    suggestions: [
      {
        name: 'Alert',
        reason: 'Static inline message',
        example:
          '<Alert variant="default"><Alert.Title>Info</Alert.Title><Alert.Description>Note something.</Alert.Description></Alert>',
      },
    ],
  },
  {
    keywords: ['tooltip', 'hint', 'hover info'],
    suggestions: [
      {
        name: 'Tooltip',
        reason: 'Brief text info on hover',
        example: '<Tooltip content="Save changes"><Button>Save</Button></Tooltip>',
      },
    ],
  },
  {
    keywords: ['popover', 'popup content', 'click popup'],
    suggestions: [
      {
        name: 'Popover',
        reason: 'Click-triggered popup with interactive content',
        example:
          '<Popover.Root><Popover.Trigger><Button>Open</Button></Popover.Trigger><Popover.Content>{content}</Popover.Content></Popover.Root>',
      },
    ],
  },
  {
    keywords: ['hover card', 'hover preview', 'link preview', 'user card'],
    suggestions: [
      {
        name: 'HoverCard',
        reason: 'Rich preview on hover',
        example:
          '<HoverCard.Root><HoverCard.Trigger><a>@user</a></HoverCard.Trigger><HoverCard.Content>{profile}</HoverCard.Content></HoverCard.Root>',
      },
    ],
  },
  {
    keywords: ['loading', 'spinner', 'skeleton', 'placeholder'],
    suggestions: [
      { name: 'Loader', reason: 'Full-area loading state', example: '<Loader />' },
      {
        name: 'Spinner',
        reason: 'Inline loading indicator',
        example: '<Spinner size="sm" />',
      },
      {
        name: 'Skeleton',
        reason: 'Content placeholder during load',
        example: '<Skeleton width={200} height={20} />',
      },
    ],
  },
  {
    keywords: ['empty', 'no data', 'no results', 'empty state'],
    suggestions: [
      {
        name: 'Empty',
        reason: 'No-content state with optional action',
        example:
          '<Empty.Root><Empty.Title>No items</Empty.Title><Empty.Action><Button>Create</Button></Empty.Action></Empty.Root>',
      },
      {
        name: 'EmptyStateBlock',
        reason: 'Pre-composed empty state with variants',
        example: '<EmptyStateBlock variant="with-action" title="No items" />',
      },
    ],
  },
  // Menus
  {
    keywords: ['dropdown menu', 'action menu', 'menu button', 'more options'],
    suggestions: [
      {
        name: 'DropdownMenu',
        reason: 'Button-triggered action menu',
        example:
          '<DropdownMenu.Root><DropdownMenu.Trigger><Button>⋯</Button></DropdownMenu.Trigger><DropdownMenu.Content><DropdownMenu.Item>Edit</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Root>',
      },
    ],
  },
  {
    keywords: ['right click', 'context menu'],
    suggestions: [
      {
        name: 'ContextMenu',
        reason: 'Right-click context actions (web only)',
        example:
          '<ContextMenu.Root><ContextMenu.Trigger>{content}</ContextMenu.Trigger><ContextMenu.Content><ContextMenu.Item>Copy</ContextMenu.Item></ContextMenu.Content></ContextMenu.Root>',
      },
    ],
  },
  // Layout
  {
    keywords: ['card', 'container', 'box with header'],
    suggestions: [
      {
        name: 'Card',
        reason: 'Grouped content with header/body/footer',
        example:
          '<Card><Card.Header><Card.Title>Title</Card.Title></Card.Header><Card.Content>{body}</Card.Content></Card>',
      },
    ],
  },
  {
    keywords: ['accordion', 'collapsible sections', 'faq', 'expand collapse'],
    suggestions: [
      {
        name: 'Accordion',
        reason: 'Multiple collapsible sections',
        example:
          '<Accordion.Root type="single" collapsible><Accordion.Item value="1"><Accordion.Trigger>Q1</Accordion.Trigger><Accordion.Content>A1</Accordion.Content></Accordion.Item></Accordion.Root>',
      },
      {
        name: 'Collapsible',
        reason: 'Single collapsible section',
        example:
          '<Collapsible.Root><Collapsible.Trigger>Toggle</Collapsible.Trigger><Collapsible.Content>{content}</Collapsible.Content></Collapsible.Root>',
      },
    ],
  },
  // Blocks
  {
    keywords: ['login', 'sign in', 'auth', 'authentication'],
    suggestions: [
      {
        name: 'AuthBlock',
        reason: 'Pre-composed auth form with variants',
        example: '<AuthBlock variant="login-card" onSubmit={handleLogin} />',
      },
    ],
  },
  {
    keywords: ['signup', 'register', 'sign up', 'create account'],
    suggestions: [
      {
        name: 'AuthBlock',
        reason: 'Pre-composed signup form',
        example: '<AuthBlock variant="signup-card" onSubmit={handleSignup} />',
      },
    ],
  },
  {
    keywords: ['dashboard', 'metrics', 'overview', 'kpi'],
    suggestions: [
      {
        name: 'DashboardBlock',
        reason: 'Pre-composed dashboard with metrics',
        example: '<DashboardBlock variant="metrics-grid" metrics={metrics} />',
      },
    ],
  },
  {
    keywords: ['pricing', 'plans', 'subscription', 'pricing table'],
    suggestions: [
      {
        name: 'PricingBlock',
        reason: 'Pre-composed pricing display',
        example: '<PricingBlock variant="cards" plans={plans} />',
      },
    ],
  },
  {
    keywords: ['settings', 'preferences', 'profile settings'],
    suggestions: [
      {
        name: 'SettingsBlock',
        reason: 'Pre-composed settings page',
        example: '<SettingsBlock variant="profile" onSave={handleSave} />',
      },
    ],
  },
  {
    keywords: ['hero', 'landing', 'above the fold', 'hero section'],
    suggestions: [
      {
        name: 'HeroBlock',
        reason: 'Landing page hero section',
        example:
          '<HeroBlock variant="centered" title="Title" subtitle="Subtitle" actions={actions} />',
      },
    ],
  },
  {
    keywords: ['feed', 'timeline', 'activity', 'activity feed'],
    suggestions: [
      {
        name: 'FeedBlock',
        reason: 'Activity feed with timeline/notification/comment variants',
        example: '<FeedBlock variant="timeline" events={events} />',
      },
    ],
  },
  {
    keywords: ['app shell', 'layout', 'page layout', 'app layout'],
    suggestions: [
      {
        name: 'AppShellBlock',
        reason: 'Complete app shell with sidebar/header',
        example:
          '<AppShellBlock variant="sidebar-header" sidebar={sidebar}>{content}</AppShellBlock>',
      },
    ],
  },
]

export function suggestComponents(intent: string): Suggestion[] {
  const lower = intent.toLowerCase()
  const scored: Array<Suggestion & { score: number }> = []

  for (const rule of rules) {
    const matchCount = rule.keywords.filter((kw) => lower.includes(kw)).length
    if (matchCount > 0) {
      for (const suggestion of rule.suggestions) {
        const existing = scored.find((s) => s.name === suggestion.name)
        if (existing) {
          existing.score += matchCount
        } else {
          scored.push({ ...suggestion, score: matchCount })
        }
      }
    }
  }

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 5).map(({ score: _, ...rest }) => rest)
}
