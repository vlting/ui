export interface ComponentExample {
  name: string
  code: string
  description?: string
}

export interface ComponentEntry {
  name: string
  slug: string
  category: 'primitives' | 'components'
  description: string
  importPath: string
  examples: ComponentExample[]
  apiMappingPath?: string
  whenToUse?: string[]
  whenNotToUse?: string[]
  a11yNotes?: string[]
}

const registry: ComponentEntry[] = [
  {
    name: 'Accordion',
    slug: 'accordion',
    category: 'components',
    description:
      'A vertically stacked set of interactive headings that each reveal a section of content.',
    importPath: "import { Accordion } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Accordion/api-mapping.json',
    examples: [
      {
        name: 'Basic',
        description: 'A single-item collapsible accordion.',
        code: `<Accordion.Root type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>
      Yes. It adheres to the WAI-ARIA design pattern.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Is it styled?</Accordion.Trigger>
    <Accordion.Content>
      Yes. It uses design tokens for consistent theming.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-3">
    <Accordion.Trigger>Is it animated?</Accordion.Trigger>
    <Accordion.Content>
      Yes. Smooth expand/collapse with Tamagui animations.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`,
      },
    ],
  },
  {
    name: 'Alert',
    slug: 'alert',
    category: 'components',
    description: 'Displays a callout for important information with contextual styling.',
    importPath: "import { Alert } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Alert/api-mapping.json',
    examples: [],
  },
  {
    name: 'Alert Dialog',
    slug: 'alert-dialog',
    category: 'components',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
    importPath: "import { AlertDialog } from '@vlting/ui'",
    apiMappingPath: 'packages/components/AlertDialog/api-mapping.json',
    examples: [],
  },
  {
    name: 'Aspect Ratio',
    slug: 'aspect-ratio',
    category: 'primitives',
    description: 'Displays content within a desired ratio.',
    importPath: "import { AspectRatio } from '@vlting/ui'",
    examples: [],
  },
  {
    name: 'Avatar',
    slug: 'avatar',
    category: 'components',
    description: 'An image element with a fallback for representing the user.',
    importPath: "import { Avatar } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Avatar/api-mapping.json',
    examples: [],
  },
  {
    name: 'Badge',
    slug: 'badge',
    category: 'components',
    description: 'A small status descriptor for UI elements.',
    importPath: "import { Badge } from '@vlting/ui'",
    examples: [],
  },
  {
    name: 'Breadcrumb',
    slug: 'breadcrumb',
    category: 'components',
    description: 'Displays the path to the current page using a hierarchy of links.',
    importPath: "import { Breadcrumb } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Breadcrumb/api-mapping.json',
    examples: [],
  },
  {
    name: 'Button',
    slug: 'button',
    category: 'components',
    description: 'An interactive element that triggers an action when pressed.',
    importPath: "import { Button } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Button/api-mapping.json',
    examples: [
      {
        name: 'Basic',
        description: 'A simple button with text.',
        code: `<Button>
  <Button.Text>Click me</Button.Text>
</Button>`,
      },
      {
        name: 'Variants',
        description: 'Button in all available variants.',
        code: `<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
  <Button variant="default"><Button.Text>Default</Button.Text></Button>
  <Button variant="secondary"><Button.Text>Secondary</Button.Text></Button>
  <Button variant="destructive"><Button.Text>Destructive</Button.Text></Button>
  <Button variant="outline"><Button.Text>Outline</Button.Text></Button>
  <Button variant="ghost"><Button.Text>Ghost</Button.Text></Button>
  <Button variant="link"><Button.Text>Link</Button.Text></Button>
</div>`,
      },
      {
        name: 'Sizes',
        description: 'Button in all available sizes.',
        code: `<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <Button size="xs"><Button.Text>Extra Small</Button.Text></Button>
  <Button size="sm"><Button.Text>Small</Button.Text></Button>
  <Button size="md"><Button.Text>Medium</Button.Text></Button>
  <Button size="lg"><Button.Text>Large</Button.Text></Button>
</div>`,
      },
      {
        name: 'Loading',
        description: 'Button with loading state.',
        code: `<Button loading>
  <Button.Text>Loading</Button.Text>
</Button>`,
      },
    ],
    whenToUse: [
      'Triggering an action or event',
      'Submitting a form',
      'Navigating to another page (with asChild and an anchor)',
    ],
    whenNotToUse: [
      'For navigation — use a link instead',
      'For toggling state — use Switch or Toggle',
    ],
    a11yNotes: [
      'Uses native button semantics via styledHtml',
      'Supports focus-visible outline styles',
      'Loading state sets aria-busy and disables interaction',
    ],
  },
  {
    name: 'Button Group',
    slug: 'button-group',
    category: 'components',
    description: 'Groups related buttons together with consistent spacing.',
    importPath: "import { ButtonGroup } from '@vlting/ui'",
    apiMappingPath: 'packages/components/ButtonGroup/api-mapping.json',
    examples: [],
  },
  {
    name: 'Calendar',
    slug: 'calendar',
    category: 'components',
    description: 'A date picker calendar component for selecting dates.',
    importPath: "import { Calendar } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Calendar/api-mapping.json',
    examples: [],
  },
  {
    name: 'Card',
    slug: 'card',
    category: 'components',
    description: 'A container for grouping related content and actions.',
    importPath: "import { Card } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Card/api-mapping.json',
    examples: [
      {
        name: 'Basic',
        description: 'A card with header, content, and footer.',
        code: `<Card>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description goes here.</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Card content with details about the item.</p>
  </Card.Content>
  <Card.Footer>
    <Button variant="outline"><Button.Text>Cancel</Button.Text></Button>
    <Button><Button.Text>Save</Button.Text></Button>
  </Card.Footer>
</Card>`,
      },
    ],
  },
  {
    name: 'Carousel',
    slug: 'carousel',
    category: 'components',
    description: 'A slideshow component for cycling through elements.',
    importPath: "import { Carousel } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Carousel/api-mapping.json',
    examples: [],
  },
  {
    name: 'Checkbox',
    slug: 'checkbox',
    category: 'components',
    description: 'A control that allows the user to toggle between checked and unchecked.',
    importPath: "import { Checkbox } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Checkbox/api-mapping.json',
    examples: [],
  },
  {
    name: 'Collapsible',
    slug: 'collapsible',
    category: 'components',
    description: 'An interactive component which expands and collapses a panel.',
    importPath: "import { Collapsible } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Collapsible/api-mapping.json',
    examples: [],
  },
  {
    name: 'Combobox',
    slug: 'combobox',
    category: 'components',
    description: 'An autocomplete input with a filterable dropdown list.',
    importPath: "import { Combobox } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Combobox/api-mapping.json',
    examples: [],
  },
  {
    name: 'Command',
    slug: 'command',
    category: 'components',
    description: 'A command palette for searching and executing actions.',
    importPath: "import { Command } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Command/api-mapping.json',
    examples: [],
  },
  {
    name: 'Context Menu',
    slug: 'context-menu',
    category: 'components',
    description: 'A menu that appears on right-click with contextual actions.',
    importPath: "import { ContextMenu } from '@vlting/ui'",
    apiMappingPath: 'packages/components/ContextMenu/api-mapping.json',
    examples: [],
  },
  {
    name: 'Data Table',
    slug: 'data-table',
    category: 'components',
    description:
      'A powerful table component with sorting, filtering, and pagination.',
    importPath: "import { DataTable } from '@vlting/ui'",
    apiMappingPath: 'packages/components/DataTable/api-mapping.json',
    examples: [],
  },
  {
    name: 'Date Picker',
    slug: 'date-picker',
    category: 'components',
    description: 'A date selection component with calendar popover.',
    importPath: "import { DatePicker } from '@vlting/ui'",
    apiMappingPath: 'packages/components/DatePicker/api-mapping.json',
    examples: [],
  },
  {
    name: 'Dialog',
    slug: 'dialog',
    category: 'components',
    description: 'A modal window that overlays the main content and requires user interaction.',
    importPath: "import { Dialog } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Dialog/api-mapping.json',
    examples: [
      {
        name: 'Basic',
        description: 'A simple dialog with trigger and content.',
        code: `<Dialog.Root>
  <Dialog.Trigger>
    <Button><Button.Text>Open Dialog</Button.Text></Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.Description>
        This is a dialog description.
      </Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer>
      <Dialog.Close>
        <Button variant="outline"><Button.Text>Cancel</Button.Text></Button>
      </Dialog.Close>
      <Button><Button.Text>Confirm</Button.Text></Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`,
      },
    ],
  },
  {
    name: 'Drawer',
    slug: 'drawer',
    category: 'components',
    description: 'A panel that slides in from the edge of the screen.',
    importPath: "import { Drawer } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Drawer/api-mapping.json',
    examples: [],
  },
  {
    name: 'Dropdown Menu',
    slug: 'dropdown-menu',
    category: 'components',
    description: 'A menu that appears when triggered, typically by a button click.',
    importPath: "import { DropdownMenu } from '@vlting/ui'",
    apiMappingPath: 'packages/components/DropdownMenu/api-mapping.json',
    examples: [],
  },
  {
    name: 'Empty',
    slug: 'empty',
    category: 'components',
    description: 'A placeholder component for empty states with icon, title, and action.',
    importPath: "import { Empty } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Empty/api-mapping.json',
    examples: [],
  },
  {
    name: 'Field',
    slug: 'field',
    category: 'components',
    description:
      'A form field wrapper with label, description, and error message slots.',
    importPath: "import { Field } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Field/api-mapping.json',
    examples: [],
  },
  {
    name: 'Form',
    slug: 'form',
    category: 'components',
    description: 'A form container with built-in validation and error handling.',
    importPath: "import { Form } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Form/api-mapping.json',
    examples: [
      {
        name: 'Basic',
        description: 'A simple form with fields and submit button.',
        code: `<Form.Root onSubmit={() => alert('Submitted!')}>
  <Form.Field name="email">
    <Form.Label>Email</Form.Label>
    <Input placeholder="you@example.com" />
    <Form.Description>Enter your email address.</Form.Description>
    <Form.ErrorMessage>Please enter a valid email.</Form.ErrorMessage>
  </Form.Field>
  <Button type="submit">
    <Button.Text>Submit</Button.Text>
  </Button>
</Form.Root>`,
      },
    ],
  },
  {
    name: 'Hover Card',
    slug: 'hover-card',
    category: 'components',
    description: 'A card that appears on hover for previewing content.',
    importPath: "import { HoverCard } from '@vlting/ui'",
    apiMappingPath: 'packages/components/HoverCard/api-mapping.json',
    examples: [],
  },
  {
    name: 'Input',
    slug: 'input',
    category: 'components',
    description: 'A text input field for capturing user input.',
    importPath: "import { Input } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Input/api-mapping.json',
    examples: [
      {
        name: 'Basic',
        description: 'A simple text input.',
        code: `<Input placeholder="Type something..." />`,
      },
      {
        name: 'With Field',
        description: 'Input wrapped in a Field with label and description.',
        code: `<Field.Root>
  <Field.Label>Email</Field.Label>
  <Field.Control>
    <Input placeholder="you@example.com" />
  </Field.Control>
  <Field.Description>We will never share your email.</Field.Description>
</Field.Root>`,
      },
      {
        name: 'Disabled',
        description: 'A disabled input.',
        code: `<Input placeholder="Disabled" disabled />`,
      },
    ],
    whenToUse: [
      'Capturing single-line text input from users',
      'Email, password, search, or URL fields',
    ],
    whenNotToUse: [
      'Multi-line text — use Textarea instead',
      'Selection from predefined options — use Select or Combobox',
    ],
  },
  {
    name: 'Input Group',
    slug: 'input-group',
    category: 'components',
    description: 'Groups an input with addons like buttons or icons.',
    importPath: "import { InputGroup } from '@vlting/ui'",
    apiMappingPath: 'packages/components/InputGroup/api-mapping.json',
    examples: [],
  },
  {
    name: 'Input OTP',
    slug: 'input-otp',
    category: 'components',
    description: 'A one-time password input with individual digit fields.',
    importPath: "import { InputOTP } from '@vlting/ui'",
    apiMappingPath: 'packages/components/InputOTP/api-mapping.json',
    examples: [],
  },
  {
    name: 'Item',
    slug: 'item',
    category: 'components',
    description: 'A versatile list item component for menus, lists, and navigation.',
    importPath: "import { Item } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Item/api-mapping.json',
    examples: [],
  },
  {
    name: 'Kbd',
    slug: 'kbd',
    category: 'primitives',
    description: 'Displays keyboard shortcut indicators.',
    importPath: "import { Kbd } from '@vlting/ui'",
    examples: [],
  },
  {
    name: 'Label',
    slug: 'label',
    category: 'primitives',
    description: 'A text label associated with a form control.',
    importPath: "import { Label } from '@vlting/ui'",
    examples: [],
  },
  {
    name: 'Loader',
    slug: 'loader',
    category: 'components',
    description: 'An animated loading indicator.',
    importPath: "import { Loader } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Loader/api-mapping.json',
    examples: [],
  },
  {
    name: 'Menubar',
    slug: 'menubar',
    category: 'components',
    description:
      'A horizontal menu bar with dropdown menus, commonly used for application toolbars.',
    importPath: "import { Menubar } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Menubar/api-mapping.json',
    examples: [],
  },
  {
    name: 'Navigation Menu',
    slug: 'navigation-menu',
    category: 'components',
    description: 'A navigation component with links and dropdown menus.',
    importPath: "import { NavigationMenu } from '@vlting/ui'",
    apiMappingPath: 'packages/components/NavigationMenu/api-mapping.json',
    examples: [],
  },
  {
    name: 'Native Select',
    slug: 'native-select',
    category: 'components',
    description: 'A styled native HTML select element for simple dropdowns.',
    importPath: "import { NativeSelect } from '@vlting/ui'",
    apiMappingPath: 'packages/components/NativeSelect/api-mapping.json',
    examples: [],
  },
  {
    name: 'Pagination',
    slug: 'pagination',
    category: 'components',
    description: 'Navigation controls for paginated content.',
    importPath: "import { Pagination } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Pagination/api-mapping.json',
    examples: [],
  },
  {
    name: 'Popover',
    slug: 'popover',
    category: 'components',
    description: 'A floating panel anchored to a trigger element.',
    importPath: "import { Popover } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Popover/api-mapping.json',
    examples: [],
  },
  {
    name: 'Progress',
    slug: 'progress',
    category: 'components',
    description: 'A progress bar that indicates task completion.',
    importPath: "import { Progress } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Progress/api-mapping.json',
    examples: [],
  },
  {
    name: 'Radio Group',
    slug: 'radio-group',
    category: 'components',
    description: 'A set of mutually exclusive options where only one can be selected.',
    importPath: "import { RadioGroup } from '@vlting/ui'",
    apiMappingPath: 'packages/components/RadioGroup/api-mapping.json',
    examples: [],
  },
  {
    name: 'Resizable',
    slug: 'resizable',
    category: 'components',
    description: 'A layout with resizable panels separated by drag handles.',
    importPath: "import { Resizable } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Resizable/api-mapping.json',
    examples: [],
  },
  {
    name: 'Scroll Area',
    slug: 'scroll-area',
    category: 'components',
    description: 'A scrollable container with custom-styled scrollbars.',
    importPath: "import { ScrollArea } from '@vlting/ui'",
    apiMappingPath: 'packages/components/ScrollArea/api-mapping.json',
    examples: [],
  },
  {
    name: 'Select',
    slug: 'select',
    category: 'components',
    description: 'A dropdown component for selecting a single option from a list.',
    importPath: "import { Select } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Select/api-mapping.json',
    examples: [
      {
        name: 'Basic',
        description: 'A simple select with options.',
        code: `<Select placeholder="Select a fruit">
  <Select.Item value="apple">Apple</Select.Item>
  <Select.Item value="banana">Banana</Select.Item>
  <Select.Item value="cherry">Cherry</Select.Item>
  <Select.Item value="grape">Grape</Select.Item>
</Select>`,
      },
    ],
  },
  {
    name: 'Separator',
    slug: 'separator',
    category: 'primitives',
    description: 'A visual divider between content sections.',
    importPath: "import { Separator } from '@vlting/ui'",
    examples: [],
  },
  {
    name: 'Sheet',
    slug: 'sheet',
    category: 'components',
    description: 'A slide-over panel anchored to an edge of the viewport.',
    importPath: "import { Sheet } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Sheet/api-mapping.json',
    examples: [],
  },
  {
    name: 'Sidebar',
    slug: 'sidebar',
    category: 'components',
    description: 'A navigation sidebar component with collapsible sections.',
    importPath: "import { Sidebar } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Sidebar/api-mapping.json',
    examples: [],
  },
  {
    name: 'Skeleton',
    slug: 'skeleton',
    category: 'primitives',
    description: 'A placeholder loading animation for content that is loading.',
    importPath: "import { Skeleton } from '@vlting/ui'",
    examples: [],
  },
  {
    name: 'Slider',
    slug: 'slider',
    category: 'components',
    description: 'A range input for selecting a numeric value within a range.',
    importPath: "import { Slider } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Slider/api-mapping.json',
    examples: [],
  },
  {
    name: 'Spinner',
    slug: 'spinner',
    category: 'primitives',
    description: 'An animated spinning indicator for loading states.',
    importPath: "import { Spinner } from '@vlting/ui'",
    examples: [],
  },
  {
    name: 'Switch',
    slug: 'switch',
    category: 'components',
    description: 'A toggle control for switching between on and off states.',
    importPath: "import { Switch } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Switch/api-mapping.json',
    examples: [],
  },
  {
    name: 'Table',
    slug: 'table',
    category: 'components',
    description: 'A structured data display component with rows and columns.',
    importPath: "import { Table } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Table/api-mapping.json',
    examples: [
      {
        name: 'Basic',
        description: 'A simple table with header and body.',
        code: `<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
      <Table.Head>Email</Table.Head>
      <Table.Head>Role</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Alice Johnson</Table.Cell>
      <Table.Cell>alice@example.com</Table.Cell>
      <Table.Cell>Admin</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Bob Smith</Table.Cell>
      <Table.Cell>bob@example.com</Table.Cell>
      <Table.Cell>Editor</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Carol White</Table.Cell>
      <Table.Cell>carol@example.com</Table.Cell>
      <Table.Cell>Viewer</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>`,
      },
    ],
  },
  {
    name: 'Tabs',
    slug: 'tabs',
    category: 'components',
    description:
      'A set of layered content sections shown one at a time, navigated by tab triggers.',
    importPath: "import { Tabs } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Tabs/api-mapping.json',
    examples: [
      {
        name: 'Basic',
        description: 'Tabs with three panels.',
        code: `<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Password</Tabs.Trigger>
    <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">
    <p>Manage your account settings.</p>
  </Tabs.Content>
  <Tabs.Content value="tab2">
    <p>Change your password here.</p>
  </Tabs.Content>
  <Tabs.Content value="tab3">
    <p>Configure your preferences.</p>
  </Tabs.Content>
</Tabs.Root>`,
      },
    ],
  },
  {
    name: 'Textarea',
    slug: 'textarea',
    category: 'components',
    description: 'A multi-line text input for longer form content.',
    importPath: "import { Textarea } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Textarea/api-mapping.json',
    examples: [],
  },
  {
    name: 'Toast',
    slug: 'toast',
    category: 'components',
    description: 'A brief notification that appears temporarily at the edge of the screen.',
    importPath: "import { Toast } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Toast/api-mapping.json',
    examples: [],
  },
  {
    name: 'Toggle',
    slug: 'toggle',
    category: 'components',
    description: 'A two-state button that can be toggled on or off.',
    importPath: "import { Toggle } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Toggle/api-mapping.json',
    examples: [],
  },
  {
    name: 'Toggle Group',
    slug: 'toggle-group',
    category: 'components',
    description: 'A group of toggle buttons where one or multiple can be active.',
    importPath: "import { ToggleGroup } from '@vlting/ui'",
    examples: [],
  },
  {
    name: 'Tooltip',
    slug: 'tooltip',
    category: 'components',
    description: 'A popup that displays additional information when hovering over an element.',
    importPath: "import { Tooltip } from '@vlting/ui'",
    apiMappingPath: 'packages/components/Tooltip/api-mapping.json',
    examples: [
      {
        name: 'Basic',
        description: 'A simple tooltip on a button.',
        code: `<Tooltip content="This is a tooltip">
  <Button>
    <Button.Text>Hover me</Button.Text>
  </Button>
</Tooltip>`,
      },
      {
        name: 'Positions',
        description: 'Tooltips positioned on different sides.',
        code: `<div style={{ display: 'flex', gap: 16 }}>
  <Tooltip content="Top" side="top">
    <Button variant="outline"><Button.Text>Top</Button.Text></Button>
  </Tooltip>
  <Tooltip content="Right" side="right">
    <Button variant="outline"><Button.Text>Right</Button.Text></Button>
  </Tooltip>
  <Tooltip content="Bottom" side="bottom">
    <Button variant="outline"><Button.Text>Bottom</Button.Text></Button>
  </Tooltip>
  <Tooltip content="Left" side="left">
    <Button variant="outline"><Button.Text>Left</Button.Text></Button>
  </Tooltip>
</div>`,
      },
    ],
  },
]

const slugMap = new Map(registry.map((entry) => [entry.slug, entry]))

export function getComponent(slug: string): ComponentEntry | undefined {
  return slugMap.get(slug)
}

export function getAllComponents(): ComponentEntry[] {
  return registry
}

export { registry }
