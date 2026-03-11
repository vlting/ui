import { CodeBlock } from '../../../components/code-block'

export const metadata = {
  title: 'Migration from shadcn — @vlting/ui',
  description: 'Step-by-step guide for migrating from shadcn/ui to @vlting/ui.',
}

export default function MigrationPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          Migrating from shadcn/ui
        </h1>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 16,
            lineHeight: 1.6,
          }}
        >
          A comprehensive guide to migrating your application from shadcn/ui to
          @vlting/ui. All components are available from a single package with
          cross-platform support.
        </p>
      </div>

      {/* Installation */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Installation</h2>
        <CodeBlock code={`npm install @vlting/ui`} language="bash" />
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          All components are exported from a single package — no per-component installs or
          copy-paste setup. Wrap your app in the Provider:
        </p>
        <CodeBlock
          code={`import { Provider } from '@vlting/ui'

function App({ children }) {
  return (
    <Provider defaultTheme="light">
      {children}
    </Provider>
  )
}`}
          language="tsx"
        />
      </section>

      {/* Universal Changes */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Universal Changes</h2>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          These changes apply to <strong>every</strong> component and should be addressed
          first.
        </p>

        {/* Import paths */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Import Paths</h3>
          <p
            style={{
              color: 'var(--color-muted-foreground)',
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            Replace per-component file imports with a single package import.
          </p>
          <CodeBlock
            code={`// Before (shadcn)
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

// After (@vlting/ui)
import { Button, Dialog } from '@vlting/ui'`}
            language="tsx"
          />
        </div>

        {/* className → style props */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>className → STL Style Props</h3>
          <p
            style={{
              color: 'var(--color-muted-foreground)',
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            Tailwind CSS utility classes are replaced with STL style props using design
            tokens (CSS custom properties). This enables cross-platform support (web +
            React Native).
          </p>
          <CodeBlock
            code={`// Before (shadcn + Tailwind)
<Button className="bg-red-500 p-4 rounded-lg">Click</Button>

// After (@vlting/ui + STL tokens)
<Button backgroundColor="$red10" padding="$4" borderRadius="$3">Click</Button>`}
            language="tsx"
          />
        </div>

        {/* Compound components */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>
            Compound Component Dot-Notation
          </h3>
          <p
            style={{
              color: 'var(--color-muted-foreground)',
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            shadcn exports flat named components. @vlting/ui uses dot-notation compound
            components.
          </p>
          <CodeBlock
            code={`// Before (shadcn)
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
<Dialog>
  <DialogContent>
    <DialogTitle>Title</DialogTitle>
  </DialogContent>
</Dialog>

// After (@vlting/ui)
import { Dialog } from '@vlting/ui'
<Dialog.Root>
  <Dialog.Content>
    <Dialog.Title>Title</Dialog.Title>
  </Dialog.Content>
</Dialog.Root>`}
            language="tsx"
          />
          <p
            style={{
              color: 'var(--color-muted-foreground)',
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            This pattern applies to: Accordion, Alert, AlertDialog, Avatar, Breadcrumb,
            Carousel, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer,
            DropdownMenu, Form, HoverCard, InputOTP, Menubar, NavigationMenu, Popover,
            RadioGroup, Resizable, ScrollArea, Select, Sheet, Tabs, Toast, and Toggle.
          </p>
        </div>

        {/* onClick → onPress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>onClick → onPress</h3>
          <p
            style={{
              color: 'var(--color-muted-foreground)',
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            React Native uses <code>onPress</code> instead of <code>onClick</code>.
            @vlting/ui standardizes on <code>onPress</code> for cross-platform
            compatibility.
          </p>
          <CodeBlock
            code={`// Before
<Button onClick={() => doSomething()}>Click</Button>

// After
<Button onPress={() => doSomething()}>Click</Button>`}
            language="tsx"
          />
        </div>

        {/* No asChild */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>No asChild</h3>
          <p
            style={{
              color: 'var(--color-muted-foreground)',
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            shadcn uses Radix&apos;s <code>asChild</code> prop for component composition.
            @vlting/ui does not support <code>asChild</code>. Pass children directly
            instead.
          </p>
        </div>

        {/* Size naming */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Size Naming</h3>
          <p
            style={{
              color: 'var(--color-muted-foreground)',
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            shadcn uses <code>&quot;default&quot;</code> as its default size. @vlting/ui
            uses <code>&quot;md&quot;</code>. Available sizes are typically{' '}
            <code>&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</code>.
          </p>
          <CodeBlock
            code={`// Before
<Button size="default">Click</Button>

// After
<Button size="md">Click</Button>`}
            language="tsx"
          />
        </div>
      </section>

      {/* Prop Renames Table */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Prop Renames</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Component</th>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>shadcn</th>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>@vlting/ui</th>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Button', 'onClick', 'onPress', 'Cross-platform'],
                ['Button', 'size="default"', 'size="md"', 'Named sizing'],
                [
                  'Input',
                  'onChange={(e) => e.target.value}',
                  'onChangeText={(text) => text}',
                  'Direct string callback',
                ],
                [
                  'Textarea',
                  'onChange={(e) => ...}',
                  'onChangeText={(text) => ...}',
                  'Direct string callback',
                ],
                [
                  'NativeSelect',
                  'onChange',
                  'onValueChange',
                  'Value directly, not event',
                ],
                ['Slider', 'value={[50]}', 'value={50}', 'Single number, not array'],
                [
                  'Toast',
                  'variant="destructive"',
                  'variant="error"',
                  'Also "success", "warning"',
                ],
                ['Toggle', 'size="default"', 'size="md"', 'Named sizing'],
                ['Tooltip', 'delayDuration={200}', 'delay={200}', 'Shorter prop name'],
                [
                  'Popover',
                  'side on Content',
                  'placement on Root',
                  'Configured at Root level',
                ],
                ['Form', '<FormMessage>', '<Form.ErrorMessage>', 'Different naming'],
              ].map(([comp, shadcn, vlting, notes], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '6px 12px' }}>
                    <code>{comp}</code>
                  </td>
                  <td style={{ padding: '6px 12px' }}>
                    <code style={{ fontSize: 12 }}>{shadcn}</code>
                  </td>
                  <td style={{ padding: '6px 12px' }}>
                    <code style={{ fontSize: 12 }}>{vlting}</code>
                  </td>
                  <td
                    style={{
                      padding: '6px 12px',
                      color: 'var(--color-muted-foreground)',
                    }}
                  >
                    {notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Behavioral Differences */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Component-Specific Changes</h2>

        {/* Form Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Form Inputs</h3>
          <p
            style={{
              color: 'var(--color-muted-foreground)',
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            @vlting/ui form inputs have built-in <code>label</code>, <code>error</code>,{' '}
            <code>errorMessage</code>, and <code>helperText</code> props. No need for
            separate Label and error display components.
          </p>
          <CodeBlock
            code={`// Before (shadcn)
<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" onChange={(e) => setEmail(e.target.value)} />
  {error && <p className="text-red-500 text-sm">{error}</p>}
</div>

// After (@vlting/ui)
<Input
  label="Email"
  onChangeText={setEmail}
  error={!!error}
  errorMessage={error}
/>`}
            language="tsx"
          />
        </div>

        {/* Form Handling */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Form Handling</h3>
          <p
            style={{
              color: 'var(--color-muted-foreground)',
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            shadcn uses <code>react-hook-form</code> with <code>FormProvider</code>.
            @vlting/ui is library-agnostic — use any form library or plain state.
          </p>
          <CodeBlock
            code={`// Before (shadcn + react-hook-form)
<FormField control={form.control} name="username" render={({ field }) => (
  <FormItem>
    <FormLabel>Username</FormLabel>
    <FormControl><Input {...field} /></FormControl>
    <FormMessage />
  </FormItem>
)} />

// After (@vlting/ui)
<Form.Field error={errors.username}>
  <Input label="Username" value={username} onChangeText={setUsername} />
  <Form.ErrorMessage>{errors.username}</Form.ErrorMessage>
</Form.Field>`}
            language="tsx"
          />
        </div>

        {/* Toast */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Toast / Notifications</h3>
          <p
            style={{
              color: 'var(--color-muted-foreground)',
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            @vlting/ui provides a Sonner-style imperative API instead of shadcn&apos;s
            hook-based approach.
          </p>
          <CodeBlock
            code={`// Before (shadcn)
import { useToast } from '@/components/ui/use-toast'
const { toast } = useToast()
toast({ title: 'Success', description: 'Item saved' })

// After (@vlting/ui)
import { toast } from '@vlting/ui'
toast.success('Item saved')

// Available methods:
toast('Message')            // default
toast.success('Saved!')     // success variant
toast.error('Failed!')      // error variant
toast.warning('Caution!')   // warning variant
toast.promise(asyncFn)      // promise tracking
toast.dismiss()             // dismiss all`}
            language="tsx"
          />
        </div>

        {/* Tooltip */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Tooltip</h3>
          <p
            style={{
              color: 'var(--color-muted-foreground)',
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            Simplified from a multi-component composition to a single wrapper component.
          </p>
          <CodeBlock
            code={`// Before (shadcn)
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent side="top">Tooltip text</TooltipContent>
  </Tooltip>
</TooltipProvider>

// After (@vlting/ui)
<Tooltip content="Tooltip text" side="top">
  <Button>Hover me</Button>
</Tooltip>`}
            language="tsx"
          />
        </div>

        {/* Select */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Select</h3>
          <p
            style={{
              color: 'var(--color-muted-foreground)',
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            Simplified API — trigger and content are handled by the Root.
          </p>
          <CodeBlock
            code={`// Before (shadcn)
<Select>
  <SelectTrigger><SelectValue placeholder="Choose..." /></SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
  </SelectContent>
</Select>

// After (@vlting/ui)
<Select placeholder="Choose...">
  <Select.Item value="a">Option A</Select.Item>
</Select>`}
            language="tsx"
          />
        </div>

        {/* DataTable */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>DataTable</h3>
          <p
            style={{
              color: 'var(--color-muted-foreground)',
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            Wraps <code>@tanstack/react-table</code> in a single component with built-in
            sorting, filtering, and pagination.
          </p>
          <CodeBlock
            code={`// Before (shadcn — manual setup)
const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })
<Table><TableHeader>{...}</TableHeader><TableBody>{...}</TableBody></Table>

// After (@vlting/ui)
<DataTable data={data} columns={columns} enableSorting enablePagination />`}
            language="tsx"
          />
        </div>

        {/* Combobox */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Combobox</h3>
          <p
            style={{
              color: 'var(--color-muted-foreground)',
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            Single component instead of manually composing Popover + Command.
          </p>
          <CodeBlock
            code={`// Before (shadcn — Popover + Command composition)
<Popover>
  <PopoverTrigger><Button>Select framework...</Button></PopoverTrigger>
  <PopoverContent>
    <Command>
      <CommandInput placeholder="Search..." />
      <CommandList>
        {items.map(item => <CommandItem key={item.value}>{item.label}</CommandItem>)}
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>

// After (@vlting/ui)
<Combobox.Root
  options={items}
  placeholder="Select framework..."
  onValueChange={setSelected}
/>`}
            language="tsx"
          />
        </div>
      </section>

      {/* New Components */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>New Components</h2>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          Components available in @vlting/ui that don&apos;t exist in shadcn:
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Component</th>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  'Direction',
                  'RTL/LTR context provider (DirectionProvider + useDirection hook)',
                ],
                [
                  'Item',
                  'Generic list-item compound component (Root, Leading, Content, Title, Description, Trailing)',
                ],
                [
                  'InputGroup',
                  'Input with prefix/suffix addons and border-radius collapsing',
                ],
                [
                  'toast() API',
                  'Sonner-style imperative toast: toast(), toast.success(), toast.error(), toast.warning(), toast.promise()',
                ],
                [
                  'DataTable',
                  'Single-component wrapper around @tanstack/react-table + Table',
                ],
                ['Loader', 'Loading indicator with multiple variants'],
                ['Empty', 'Empty state placeholder component'],
                ['NativeSelect', 'Native HTML <select> with consistent styling'],
                ['Spinner', 'Animated spinner (cross-platform)'],
                ['Kbd', 'Keyboard shortcut display'],
              ].map(([name, desc]) => (
                <tr key={name} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '6px 12px' }}>
                    <code>{name}</code>
                  </td>
                  <td
                    style={{
                      padding: '6px 12px',
                      color: 'var(--color-muted-foreground)',
                    }}
                  >
                    {desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cross-Platform */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Cross-Platform Notes</h2>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          @vlting/ui components work on both web and React Native. Some features are
          web-specific:
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Feature</th>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>Web</th>
                <th style={{ textAlign: 'left', padding: '8px 12px' }}>React Native</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['DataTable', 'Full support', 'Not available (uses HTML tables)'],
                [
                  'InputGroup / ButtonGroup border collapsing',
                  'Full support',
                  'Graceful degradation',
                ],
                ['NavigationMenu', 'Full support', 'Simplified (no hover dropdowns)'],
                ['Sheet snap points', 'Full support', 'Native sheet behavior'],
                ['Resizable panels', 'Full support', 'Not available'],
              ].map(([feature, web, native]) => (
                <tr
                  key={feature}
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <td style={{ padding: '6px 12px' }}>{feature}</td>
                  <td
                    style={{
                      padding: '6px 12px',
                      color: 'var(--color-muted-foreground)',
                    }}
                  >
                    {web}
                  </td>
                  <td
                    style={{
                      padding: '6px 12px',
                      color: 'var(--color-muted-foreground)',
                    }}
                  >
                    {native}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* API Mappings */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>API Mapping Reference</h2>
        <p
          style={{
            color: 'var(--color-muted-foreground)',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          Every component has a machine-readable <code>api-mapping.json</code> file
          documenting the exact prop-level differences between shadcn and @vlting/ui.
          Visit any component&apos;s documentation page to see its detailed API table with
          prop mappings, breaking changes, and migration notes.
        </p>
      </section>
    </div>
  )
}
