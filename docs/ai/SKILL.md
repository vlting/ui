# @vlting/ui — AI Skill

Cross-platform design system (web + React Native) built on @vlting/stl (STL). Multi-brand theming, 16 primitives, 52 components, 10 blocks, 8 chart types, 3229 icons.

## Quick Start

```tsx
import { Provider, Button, Card, Input } from '@vlting/ui'
import { defaultBrand, createBrandConfig } from '@vlting/ui'

const config = createBrandConfig(defaultBrand)

function App() {
  return (
    <Provider config={config}>
      <Card>
        <Card.Header>
          <Card.Title>Title</Card.Title>
        </Card.Header>
        <Card.Content>
          <Input placeholder="Enter text" />
          <Button variant="default" size="lg">Submit</Button>
        </Card.Content>
      </Card>
    </Provider>
  )
}
```

## Architecture

```
Layer 0 — Design Tokens    (size, space, radius, color, zIndex, borderWidth)
Layer 1 — Primitives        (Box, Stack, Text, Heading, Icon, Badge, Label, etc.)
Layer 2 — Components        (Button, Dialog, Form, DataTable, Chart, etc.)
Layer 3 — Blocks            (AuthBlock, DashboardBlock, SidebarBlock, etc.)
```

**Import paths:**
- `@vlting/ui` — everything (tree-shakeable)
- `@vlting/ui/primitives` — Layer 1 only
- `@vlting/ui/components` — Layer 2 only
- `@vlting/ui/blocks` — Layer 3 only
- `@vlting/ui/icons` — Remix Icon set
- `@vlting/ui/icons/categories` — Icon category data

## Component Selection

### "I need a modal/overlay"

| Intent | Component | Why |
|--------|-----------|-----|
| Confirmation (yes/no) | `AlertDialog` | Blocks interaction, requires response |
| Complex form/content | `Dialog` | Scrollable, closeable, flexible |
| Side panel | `Sheet` | Slides from edge, good for detail views |
| Bottom panel (mobile) | `Drawer` | Slides from bottom, swipe-to-dismiss |
| Preview on hover | `HoverCard` | Shows on hover, no click needed |
| Small info popup | `Popover` | Anchored to trigger, click-toggled |
| Quick info | `Tooltip` | Hover-only, text-only, no interaction |

### "I need user input"

| Intent | Component | Why |
|--------|-----------|-----|
| Short text | `Input` | Single line |
| Long text | `Textarea` | Multi-line |
| Input with prefix/suffix | `InputGroup` | Wraps Input with addons |
| On/off toggle | `Switch` | Boolean, immediate effect |
| Check one or many | `Checkbox` | Multiple selection |
| Pick one from few | `RadioGroup` | Mutually exclusive, visible options |
| Pick one from many | `Select` | Dropdown, saves space |
| Pick with search | `Combobox` | Filterable dropdown |
| Pick a date | `DatePicker` | Calendar popup |
| Pick date range | `DateRangePicker` | Two-date calendar popup |
| Numeric range | `Slider` | Continuous value |
| OTP/PIN | `InputOTP` | Fixed-length code |

### "I need navigation"

| Intent | Component | Why |
|--------|-----------|-----|
| Top-level site nav | `NavigationMenu` | Horizontal with dropdowns |
| Sidebar nav | `Sidebar` | Collapsible side navigation |
| Breadcrumb trail | `Breadcrumb` | Hierarchical path |
| Page sections | `Tabs` | Switch between views |
| Paginated list | `Pagination` | Page navigation controls |
| App menu bar | `Menubar` | Desktop-style menu bar |

### "I need to display data"

| Intent | Component | Why |
|--------|-----------|-----|
| Structured rows/columns | `Table` | Static HTML table |
| Interactive table | `DataTable` | Sorting, filtering, pagination |
| Key-value list | `Item` | Generic list items with leading/trailing |
| Charts | `AreaChart`, `BarChart`, `LineChart`, `PieChart`, `RadarChart`, `RadialChart` | Visualization |
| Progress indicator | `Progress` | Determinate progress bar |
| Loading state | `Loader` / `Spinner` | Indeterminate loading |
| Empty state | `Empty` | No-content placeholder |

### "I need feedback"

| Intent | Component | Why |
|--------|-----------|-----|
| Inline message | `Alert` | Static, dismissible notice |
| Temporary notification | `toast()` | Imperative, auto-dismiss |
| Status indicator | `Badge` | Inline label/count |

### "I need a menu"

| Intent | Component | Why |
|--------|-----------|-----|
| Button menu | `DropdownMenu` | Click trigger |
| Right-click menu | `ContextMenu` | Context trigger |
| Command palette | `Command` | Searchable action list |

## Compound Components

Most components use the `Component.Sub` pattern:

```tsx
// Card
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Subtitle</Card.Description>
  </Card.Header>
  <Card.Content>{children}</Card.Content>
  <Card.Footer>{actions}</Card.Footer>
</Card>

// Dialog
<Dialog.Root>
  <Dialog.Trigger><Button>Open</Button></Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Title>Title</Dialog.Title>
    <Dialog.Description>Body</Dialog.Description>
    <Dialog.Close><Button variant="ghost">Close</Button></Dialog.Close>
  </Dialog.Content>
</Dialog.Root>

// Table
<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
      <Table.Head>Value</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>A</Table.Cell>
      <Table.Cell>1</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>

// Accordion
<Accordion.Root type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>Content 1</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>

// Form with Field
<Form.Root onSubmit={handleSubmit}>
  <Form.Field error={hasError}>
    <Form.Label htmlFor="email">Email</Form.Label>
    <Input id="email" />
    <Form.Description>Your work email</Form.Description>
    <Form.ErrorMessage>Invalid email</Form.ErrorMessage>
  </Form.Field>
</Form.Root>

// Tabs
<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs.Root>

// Select
<Select.Root value={value} onValueChange={setValue}>
  <Select.Trigger>
    <Select.Value placeholder="Choose..." />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="a">Option A</Select.Item>
    <Select.Item value="b">Option B</Select.Item>
  </Select.Content>
</Select.Root>

// Sidebar
<Sidebar.Root>
  <Sidebar.Group>
    <Sidebar.GroupLabel>Section</Sidebar.GroupLabel>
    <Sidebar.Menu>
      <Sidebar.MenuItem href="/page">Page</Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Group>
</Sidebar.Root>
```

### Button special pattern

Button uses `withStaticProperties` (not object literal):
```tsx
<Button variant="default" size="lg" tone="primary">
  <Button.Icon><IconComponent /></Button.Icon>
  <Button.Text>Label</Button.Text>
</Button>
```

**Button variants:** `default` | `solid` | `secondary` | `destructive` | `outline` | `ghost` | `link`
**Button sizes:** `xs` | `sm` | `md` | `lg` | `icon`
**Button tones:** `neutral` | `primary` | `success` | `warning` | `danger`

### Toast (imperative)

```tsx
import { toast } from '@vlting/ui'

// Simple
toast('Saved successfully')

// With options
toast.success('Profile updated')
toast.error('Something went wrong')
toast.promise(asyncFn, {
  loading: 'Saving...',
  success: 'Done!',
  error: 'Failed',
})
```

Requires `<ImperativeToastViewport />` in your layout.

## Layout

### Primitives

| Component | Use for |
|-----------|---------|
| `Box` | Generic container (like `div`) |
| `VStack` | Vertical stack with gap |
| `HStack` | Horizontal stack with gap |
| `Stack` | Configurable direction stack |
| `Spacer` | Flexible space between items |
| `Divider` | Horizontal/vertical line |
| `Separator` | Semantic separator (same visual as Divider) |

### Spacing

Use token values, never pixel values:
```tsx
// Good
<VStack gap="$4" padding="$3">

// Bad
<VStack gap={16} padding={12}>
<div style={{ gap: '16px' }}>
```

**Space scale:** `$0` (0) → `$1` (4px) → `$2` (8px) → `$3` (12px) → `$4` (16px) → `$5` (20px) → `$6` (24px) → `$8` (32px) → `$10` (40px) → `$12` (48px) → `$16` (64px)

### Responsive

```tsx
<VStack
  gap="$3"
  $gtMd={{ gap: '$4', flexDirection: 'row' }}
  $gtLg={{ gap: '$6' }}
>
```

**Breakpoints:** `xxs` (0) → `xs` (400) → `sm` (640) → `md` (768) → `lg` (1024) → `xl` (1280) → `xxl` (1536)
**Greater-than variants:** `$gtXxs`, `$gtXs`, `$gtSm`, `$gtMd`, `$gtLg`, `$gtXl`

## Tokens

### RULE: Never hardcode visual values

```tsx
// WRONG — hardcoded
<Text color="#666" fontSize={14}>
<Box borderRadius={8} backgroundColor="white">

// RIGHT — tokens
<Text color="$colorSubtitle" fontSize="$3">
<Box borderRadius="$4" backgroundColor="$min">
```

### Semantic colors

| Token | Usage |
|-------|-------|
| `$colorSubtitle` | Secondary text |
| `$placeholderColor` | Input placeholder |
| `$outlineColor` | Focus outline |
| `$shadowColor` | Box shadow |

### Size tokens

| Token | Value | Common use |
|-------|-------|------------|
| `$1` | 4px | Tiny gap |
| `$2` | 8px | Small gap, icon size |
| `$3` | 12px | Component padding |
| `$4` | 16px | Standard gap |
| `$5` | 20px | Medium gap |
| `$6` | 24px | Section gap |
| `$8` | 32px | Large gap |

### Radius tokens

| Token | Value | Use |
|-------|-------|-----|
| `$2` | 4px | Subtle rounding |
| `$3` | 6px | Input, small elements |
| `$4` | 8px | Cards, buttons |
| `$6` | 12px | Large cards |
| `$full` | 9999px | Pill/circle |

## Brands & Theming

### Built-in brands

| Brand | Style | Accent |
|-------|-------|--------|
| `defaultBrand` | Clean, trustworthy | YInMn Blue |
| `shadcnBrand` | shadcn/ui match | Neutral |
| `funBrand` | Playful, vibrant | Bright colors |
| `poshBrand` | Luxe, sophisticated | Gold/warm |

### Using brands

```tsx
import { Provider, createBrandConfig, defaultBrand } from '@vlting/ui'

const config = createBrandConfig(defaultBrand)

<Provider config={config}>
  {children}
</Provider>
```

### Brand-agnostic code

- Use palette tokens (`$neutral12`, `$min`, `$neutral4`), not hardcoded colors
- Use component variants, not custom colors
- Test with at least `defaultBrand` and `shadcnBrand`

## Charts

Built on Victory Native (not Recharts). Cross-platform (web + React Native).

```tsx
import { Chart, BarChart } from '@vlting/ui'
import type { ChartConfig } from '@vlting/ui'

const config: ChartConfig = {
  revenue: { label: 'Revenue', color: '$aqua9' },
  expenses: { label: 'Expenses', color: '$tomato9' },
}

const data = [
  { month: 'Jan', revenue: 100, expenses: 80 },
  { month: 'Feb', revenue: 120, expenses: 90 },
]

<Chart config={config} aria-label="Revenue vs Expenses">
  <BarChart
    data={data}
    variant="grouped"
    xKey="month"
    dataKeys={['revenue', 'expenses']}
  />
  <ChartTooltip variant="default" />
  <ChartLegend layout="horizontal" />
</Chart>
```

**Chart types and variants:**
- `AreaChart` — default, stacked, percent, step, gradient, sparkline, interactive, multiple, legend, axes (10)
- `BarChart` — default, horizontal, stacked, percent, grouped, mixed, negative, interactive, label, custom (10)
- `LineChart` — default, multiple, dots, step, custom, label, linear, interactive, legend, sparkline (10)
- `PieChart` — default, donut, interactive, label, custom, stacked, legend, separator, half, nested, active (11)
- `RadarChart` — default, dots, multiple, lines, label, custom, radius, grid, circle, filled, icons, legend, stacked, interactive (14)
- `RadialChart` — default, label, grid, text, shape, stacked (6)

## Blocks

Pre-composed layouts using `@vlting/ui` components. Each has a `variant` prop.

```tsx
import { AuthBlock, DashboardBlock } from '@vlting/ui'

// Login form
<AuthBlock variant="login-split" onSubmit={handleLogin} />

// Dashboard
<DashboardBlock
  variant="metrics-grid"
  metrics={[
    { title: 'Users', value: 1234, change: 12 },
  ]}
/>
```

| Block | Variants | Use case |
|-------|----------|----------|
| `AuthBlock` | login-card, login-split, signup-card, signup-split, signup-social | Authentication flows |
| `SidebarBlock` | simple, with-groups, with-icons, collapsible, with-footer, with-search, with-file-tree, with-nested | App navigation |
| `DashboardBlock` | metrics-grid, metrics-chart | Overview dashboards |
| `DataTableBlock` | default, with-filters, with-toolbar | Data presentation |
| `SettingsBlock` | profile, notifications, appearance | Settings pages |
| `PricingBlock` | cards, table, comparison | Pricing display |
| `HeroBlock` | centered, split, gradient, minimal | Landing sections |
| `FeedBlock` | timeline, notifications, comments | Activity feeds |
| `AppShellBlock` | sidebar-header, sidebar-only, header-only, dashboard | App shells |
| `EmptyStateBlock` | simple, with-action, illustration, search, error | Empty states |

## Icons

3229 Remix Icons with tree-shakeable imports.

```tsx
// Direct import (recommended — tree-shakeable)
import { RiHomeLine } from '@vlting/ui/icons'

// Dynamic import (when icon name is runtime)
import { DynamicIcon } from '@vlting/ui'
<DynamicIcon name="ri-home-line" size={20} color="$neutral12" />
```

**Naming:** `Ri` + PascalCase name + `Line` (outline) or `Fill` (filled)
Examples: `RiHomeLine`, `RiHomeFill`, `RiSearchLine`, `RiSettingsLine`

## Anti-Patterns

### Wrong component choice

```tsx
// WRONG — Button for navigation
<Button onPress={() => router.push('/about')}>About</Button>

// RIGHT — use an anchor/link
<a href="/about">About</a>

// WRONG — Dialog for confirmation
<Dialog.Root>...</Dialog.Root>

// RIGHT — AlertDialog for confirmation
<AlertDialog.Root>...</AlertDialog.Root>

// WRONG — Select for 2-3 options
<Select.Root>...</Select.Root>

// RIGHT — RadioGroup for few visible options
<RadioGroup.Root>...</RadioGroup.Root>
```

### Hardcoded values

```tsx
// WRONG
<Box backgroundColor="#f5f5f5" padding={16} borderRadius={8}>
<Text color="gray" fontSize={14}>

// RIGHT
<Box backgroundColor="$min" padding="$4" borderRadius="$4">
<Text color="$colorSubtitle" fontSize="$3">
```

### Missing accessibility

```tsx
// WRONG — no label
<Input />
<Switch />

// RIGHT
<Field.Root>
  <Field.Label>Email</Field.Label>
  <Input id="email" />
</Field.Root>

<HStack alignItems="center" gap="$2">
  <Label htmlFor="notifications">Notifications</Label>
  <Switch id="notifications" />
</HStack>
```

### Web-only APIs on cross-platform code

```tsx
// WRONG — DOM events on cross-platform code
<Box onClick={handler}>
<Input onChange={handler}>

// RIGHT — STL/RN events
<Box onPress={handler}>
<Input onChangeText={handler}>
```

### Incorrect compound usage

```tsx
// WRONG — bare children in Dialog
<Dialog.Root>
  <button>Open</button>  // must be Dialog.Trigger
  <div>Content</div>     // must be Dialog.Content
</Dialog.Root>

// RIGHT
<Dialog.Root>
  <Dialog.Trigger><Button>Open</Button></Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Title>Title</Dialog.Title>
    {content}
  </Dialog.Content>
</Dialog.Root>
```

### Creating custom styled components unnecessarily

```tsx
// WRONG — custom styled wrapper
const MyCard = styled(YStack, {
  padding: '$4',
  borderRadius: '$4',
  bg: '$min',
  borderWidth: 1,
  borderColor: '$neutral4',
})

// RIGHT — use the Card component
<Card>
  <Card.Content>{children}</Card.Content>
</Card>
```

## Cross-Platform

### Works on web + React Native
- All primitives (Box, Stack, Text, Heading, etc.)
- All form components (Input, Checkbox, Switch, Select, etc.)
- All feedback components (Alert, Toast, Badge)
- Charts (Victory Native)
- Auth blocks, empty state blocks

### Web-only
- `NavigationMenu` (CSS hover menus)
- `Menubar` (desktop-style menus)
- `ContextMenu` (right-click)
- `Resizable` (drag handles)
- `DataTable` (HTML table)
- Sidebar blocks (complex CSS layout)
- Dashboard blocks (CSS grid)

### Platform-specific props
```tsx
// Conditional platform styling
<Box
  $platform-web={{ cursor: 'pointer' }}
  $platform-native={{ hitSlop: 8 }}
>
```

## Accessibility

### Required patterns

1. **All inputs must have labels** — use `Field.Label` or `Label` with `htmlFor`
2. **All images must have alt text** — use `alt` prop or `aria-label`
3. **Modals must have titles** — `Dialog.Title`, `AlertDialog.Title`, `Sheet` with `aria-label`
4. **Charts must have descriptions** — `aria-label` on `Chart` container, `ChartDataTable` for screen readers
5. **Interactive elements must be keyboard accessible** — components handle this by default
6. **Color alone must not convey meaning** — use icons/text alongside color indicators

### Focus management

Components handle focus automatically:
- Dialog/AlertDialog: traps focus, returns on close
- Popover/HoverCard: manages focus ring
- DropdownMenu/Select: arrow key navigation
- Tabs: arrow key between triggers

## Utilities

```tsx
import { cn, mergeRefs, composeEventHandlers } from '@vlting/ui'

// cn — conditional class merging (like clsx + twMerge)
cn('base', condition && 'extra')

// mergeRefs — combine multiple refs
<Input ref={mergeRefs(localRef, forwardedRef)} />

// composeEventHandlers — chain event handlers
<Button onPress={composeEventHandlers(props.onPress, localHandler)} />
```

## Hooks

```tsx
import {
  useControllableState,  // Controlled/uncontrolled state pattern
  useFocusTrap,           // Trap keyboard focus in a container
  useKeyboardNavigation,  // Arrow key / tab navigation
} from '@vlting/ui'
```

## Font System

```tsx
import { FontLoader, createBrandConfig } from '@vlting/ui'

const brand = {
  ...defaultBrand,
  fontConfig: {
    heading: { family: 'Playfair Display', weights: { heavy: 700, light: 400 } },
    body: { family: 'Inter', weight: 400 },
    mono: { family: 'Fira Code', weight: 400 },
  },
}

// Web: FontLoader adds Google Fonts <link> tag
<FontLoader config={createBrandConfig(brand)} />

// React Native: use useFontLoader with expo-font
const loaded = useFontLoader(config)
```

**Font slots:** `heading`, `body`, `mono`, `quote`
**Heading weight alternation:** H1 heavy, H2 light, H3 heavy, H4 light, H5 heavy, H6 light
