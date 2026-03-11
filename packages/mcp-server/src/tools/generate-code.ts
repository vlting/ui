import { type RegistryComponent, findComponent } from '../data/registry.js'

interface GenerateArgs {
  component: string
  props?: Record<string, unknown>
  children?: string
}

export function handleGenerateCode(args: GenerateArgs) {
  const comp = findComponent(args.component)
  if (!comp) {
    return { error: `Component "${args.component}" not found` }
  }

  const imports = [comp.import]
  const code = buildCode(comp, args.props, args.children)

  return { code, imports }
}

function buildCode(
  comp: RegistryComponent,
  props?: Record<string, unknown>,
  children?: string,
): string {
  const name = comp.name
  const propsStr = buildPropsString(props)

  // Compound components with known sub-components
  const compounds: Record<string, string> = {
    Card: `<Card${propsStr}>\n  <Card.Header>\n    <Card.Title>Title</Card.Title>\n    <Card.Description>Description</Card.Description>\n  </Card.Header>\n  <Card.Content>${children || '{children}'}</Card.Content>\n  <Card.Footer>{actions}</Card.Footer>\n</Card>`,
    Dialog: `<Dialog.Root>\n  <Dialog.Trigger><Button>Open</Button></Dialog.Trigger>\n  <Dialog.Content>\n    <Dialog.Title>Title</Dialog.Title>\n    <Dialog.Description>Description</Dialog.Description>\n    ${children || '{content}'}\n    <Dialog.Close><Button variant="ghost">Close</Button></Dialog.Close>\n  </Dialog.Content>\n</Dialog.Root>`,
    AlertDialog: `<AlertDialog.Root>\n  <AlertDialog.Trigger><Button variant="destructive">Delete</Button></AlertDialog.Trigger>\n  <AlertDialog.Content>\n    <AlertDialog.Title>Are you sure?</AlertDialog.Title>\n    <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>\n    <AlertDialog.Cancel><Button variant="outline">Cancel</Button></AlertDialog.Cancel>\n    <AlertDialog.Action><Button variant="destructive">Delete</Button></AlertDialog.Action>\n  </AlertDialog.Content>\n</AlertDialog.Root>`,
    Tabs: `<Tabs.Root defaultValue="tab1">\n  <Tabs.List>\n    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>\n    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>\n  </Tabs.List>\n  <Tabs.Content value="tab1">${children || '{content1}'}</Tabs.Content>\n  <Tabs.Content value="tab2">{content2}</Tabs.Content>\n</Tabs.Root>`,
    Accordion: `<Accordion.Root type="single" collapsible>\n  <Accordion.Item value="item-1">\n    <Accordion.Trigger>Section 1</Accordion.Trigger>\n    <Accordion.Content>${children || '{content}'}</Accordion.Content>\n  </Accordion.Item>\n</Accordion.Root>`,
    Select: `<Select.Root value={value} onValueChange={setValue}>\n  <Select.Trigger>\n    <Select.Value placeholder="Choose..." />\n  </Select.Trigger>\n  <Select.Content>\n    <Select.Item value="a">Option A</Select.Item>\n    <Select.Item value="b">Option B</Select.Item>\n  </Select.Content>\n</Select.Root>`,
    Table:
      '<Table.Root>\n  <Table.Header>\n    <Table.Row>\n      <Table.Head>Name</Table.Head>\n      <Table.Head>Value</Table.Head>\n    </Table.Row>\n  </Table.Header>\n  <Table.Body>\n    <Table.Row>\n      <Table.Cell>Item</Table.Cell>\n      <Table.Cell>100</Table.Cell>\n    </Table.Row>\n  </Table.Body>\n</Table.Root>',
    Form: `<Form.Root onSubmit={handleSubmit}>\n  <Form.Field>\n    <Form.Label htmlFor="field">Label</Form.Label>\n    <Input id="field" />\n    <Form.Description>Help text</Form.Description>\n    <Form.ErrorMessage>{error}</Form.ErrorMessage>\n  </Form.Field>\n  <Button type="submit">Submit</Button>\n</Form.Root>`,
    DropdownMenu: `<DropdownMenu.Root>\n  <DropdownMenu.Trigger><Button variant="ghost">⋯</Button></DropdownMenu.Trigger>\n  <DropdownMenu.Content>\n    <DropdownMenu.Item>Edit</DropdownMenu.Item>\n    <DropdownMenu.Item>Duplicate</DropdownMenu.Item>\n    <DropdownMenu.Separator />\n    <DropdownMenu.Item>Delete</DropdownMenu.Item>\n  </DropdownMenu.Content>\n</DropdownMenu.Root>`,
    Sheet: `<Sheet.Root>\n  <Sheet.Trigger><Button>Open</Button></Sheet.Trigger>\n  <Sheet.Content side="right">\n    <Sheet.Header>\n      <Sheet.Title>Title</Sheet.Title>\n    </Sheet.Header>\n    ${children || '{content}'}\n  </Sheet.Content>\n</Sheet.Root>`,
    Popover: `<Popover.Root>\n  <Popover.Trigger><Button>Open</Button></Popover.Trigger>\n  <Popover.Content>\n    ${children || '{content}'}\n  </Popover.Content>\n</Popover.Root>`,
    Empty:
      '<Empty.Root>\n  <Empty.Title>No items</Empty.Title>\n  <Empty.Description>Get started by creating your first item.</Empty.Description>\n  <Empty.Action><Button>Create</Button></Empty.Action>\n</Empty.Root>',
    Item: '<Item>\n  <Item.Leading>{icon}</Item.Leading>\n  <Item.Content>\n    <Item.Title>Title</Item.Title>\n    <Item.Description>Description</Item.Description>\n  </Item.Content>\n  <Item.Trailing>{badge}</Item.Trailing>\n</Item>',
  }

  if (compounds[name]) {
    return compounds[name]
  }

  // Simple self-closing or wrapping
  if (children) {
    return `<${name}${propsStr}>${children}</${name}>`
  }

  // Use component props to generate reasonable defaults
  if (comp.props) {
    const defaultProps: string[] = []
    for (const [propName, propDef] of Object.entries(comp.props)) {
      if (propDef.values?.length && !props?.[propName]) {
        defaultProps.push(`${propName}="${propDef.values[0]}"`)
      }
    }
    if (defaultProps.length) {
      return `<${name} ${defaultProps.join(' ')} />`
    }
  }

  return `<${name}${propsStr} />`
}

function buildPropsString(props?: Record<string, unknown>): string {
  if (!props || Object.keys(props).length === 0) return ''
  const parts = Object.entries(props)
    .map(([key, value]) => {
      if (typeof value === 'string') return `${key}="${value}"`
      if (typeof value === 'boolean') return value ? key : ''
      return `${key}={${JSON.stringify(value)}}`
    })
    .filter(Boolean)
  return parts.length ? ` ${parts.join(' ')}` : ''
}
