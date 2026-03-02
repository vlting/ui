# Migrating from shadcn/ui to @vlting/ui

## Quick Start

```bash
npm install @vlting/ui
```

All components are exported from a single package — no per-component installs.

```diff
- import { Button } from '@/components/ui/button'
- import { Dialog, DialogContent } from '@/components/ui/dialog'
+ import { Button, Dialog } from '@vlting/ui'
```

## Universal Changes

These apply to **every** component and should be addressed first.

### className → Tamagui Style Props

shadcn uses Tailwind CSS utility classes. @vlting/ui uses Tamagui style props for cross-platform support (web + React Native).

```diff
- <Button className="bg-red-500 p-4 rounded-lg">Click</Button>
+ <Button backgroundColor="$red10" padding="$4" borderRadius="$3">Click</Button>
```

Token values (prefixed with `$`) reference the design system's token scales.

### Compound Component Dot-Notation

shadcn exports flat named components. @vlting/ui uses dot-notation compound components.

```diff
- import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
- <Dialog>
-   <DialogContent>
-     <DialogTitle>Title</DialogTitle>
-     <DialogDescription>Desc</DialogDescription>
-   </DialogContent>
- </Dialog>

+ import { Dialog } from '@vlting/ui'
+ <Dialog.Root>
+   <Dialog.Content>
+     <Dialog.Title>Title</Dialog.Title>
+     <Dialog.Description>Desc</Dialog.Description>
+   </Dialog.Content>
+ </Dialog.Root>
```

This pattern applies to: Accordion, Alert, AlertDialog, Avatar, Breadcrumb, Carousel, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Form, HoverCard, InputOTP, Menubar, NavigationMenu, Popover, RadioGroup, Resizable, ScrollArea, Select, Sheet, Tabs, Toast, Toggle.

### onClick → onPress

React Native uses `onPress` instead of `onClick`. @vlting/ui standardizes on `onPress` for cross-platform compatibility.

```diff
- <Button onClick={() => doSomething()}>Click</Button>
+ <Button onPress={() => doSomething()}>Click</Button>
```

### No asChild

shadcn uses Radix's `asChild` prop for component composition. @vlting/ui does not depend on Radix and does not support `asChild`. Pass children directly instead.

```diff
- <Dialog.Trigger asChild>
-   <Button>Open</Button>
- </Dialog.Trigger>
+ <Dialog.Trigger>
+   <Button>Open</Button>
+ </Dialog.Trigger>
```

### Size Naming

shadcn uses `'default'` as its default size name. @vlting/ui uses `'md'`.

```diff
- <Button size="default">Click</Button>
+ <Button size="md">Click</Button>
```

Available sizes are typically `'sm' | 'md' | 'lg'`.

## Import Path Changes

| shadcn | @vlting/ui |
|--------|-----------|
| `import { Button } from '@/components/ui/button'` | `import { Button } from '@vlting/ui'` |
| `import { Dialog, DialogContent, ... } from '@/components/ui/dialog'` | `import { Dialog } from '@vlting/ui'` |
| `import { Input } from '@/components/ui/input'` | `import { Input } from '@vlting/ui'` |
| `import { Badge } from '@/components/ui/badge'` | `import { Badge } from '@vlting/ui'` |
| `import { Label } from '@/components/ui/label'` | `import { Label } from '@vlting/ui'` |
| `import { Separator } from '@/components/ui/separator'` | `import { Separator } from '@vlting/ui'` |
| `import { Skeleton } from '@/components/ui/skeleton'` | `import { Skeleton } from '@vlting/ui'` |
| `import { Tooltip, TooltipContent, ... } from '@/components/ui/tooltip'` | `import { Tooltip } from '@vlting/ui'` |

## Prop Renames

| Component | shadcn | @vlting/ui | Notes |
|-----------|--------|-----------|-------|
| Button | `onClick` | `onPress` | Cross-platform |
| Button | `size="default"` | `size="md"` | Named sizing |
| Input | `onChange={(e) => e.target.value}` | `onChangeText={(text) => text}` | Direct string callback |
| Textarea | `onChange={(e) => ...}` | `onChangeText={(text) => ...}` | Direct string callback |
| NativeSelect | `onChange` | `onValueChange` | Value directly, not event |
| Slider | `value={[50]}` | `value={50}` | Single number, not array |
| Slider | `defaultValue={[50]}` | `defaultValue={50}` | Single number, not array |
| Toast | `variant="destructive"` | `variant="error"` | Also supports `"success"`, `"warning"` |
| Toggle | `size="default"` | `size="md"` | Named sizing |
| Tooltip | `delayDuration={200}` | `delay={200}` | Shorter prop name |
| Popover | `side` on Content | `placement` on Root | Configured at Root level |
| Popover | `sideOffset` on Content | `offset` on Root | Configured at Root level |
| Form | `<FormMessage>` | `<Form.ErrorMessage>` | Different naming |

## Behavioral Differences

### Form Inputs

@vlting/ui form inputs have built-in `label`, `error`, `errorMessage`, and `helperText` props. No need for separate `<Label>` and error display components.

```diff
- <div>
-   <Label htmlFor="email">Email</Label>
-   <Input id="email" onChange={(e) => setEmail(e.target.value)} />
-   {error && <p className="text-red-500 text-sm">{error}</p>}
- </div>

+ <Input
+   label="Email"
+   onChangeText={setEmail}
+   error={!!error}
+   errorMessage={error}
+ />
```

This applies to: Input, Textarea, NativeSelect, Checkbox (label as children), RadioGroup.Item (label as children).

### Form Handling

shadcn uses `react-hook-form` with `FormProvider`. @vlting/ui is library-agnostic.

```diff
- <FormField control={form.control} name="username" render={({ field }) => (
-   <FormItem>
-     <FormLabel>Username</FormLabel>
-     <FormControl><Input {...field} /></FormControl>
-     <FormMessage />
-   </FormItem>
- )} />

+ <Form.Field error={errors.username}>
+   <Input label="Username" value={username} onChangeText={setUsername} />
+   <Form.ErrorMessage>{errors.username}</Form.ErrorMessage>
+ </Form.Field>
```

### Toast / Notifications

shadcn's toast is a custom hook. @vlting/ui provides a Sonner-style imperative API.

```diff
- import { useToast } from '@/components/ui/use-toast'
- const { toast } = useToast()
- toast({ title: 'Success', description: 'Item saved' })

+ import { toast } from '@vlting/ui'
+ toast.success('Item saved')
```

Setup requires wrapping your app:

```tsx
import { Toast } from '@vlting/ui'

function App() {
  return (
    <Toast.Provider>
      {children}
      <Toast.Viewport />
      <Toast.ImperativeViewport />
    </Toast.Provider>
  )
}
```

Additional imperative methods: `toast()`, `toast.success()`, `toast.error()`, `toast.warning()`, `toast.promise()`, `toast.dismiss()`.

### Tooltip

shadcn uses a multi-component composition. @vlting/ui simplifies to a single component.

```diff
- <TooltipProvider>
-   <Tooltip>
-     <TooltipTrigger>Hover me</TooltipTrigger>
-     <TooltipContent side="top">Tooltip text</TooltipContent>
-   </Tooltip>
- </TooltipProvider>

+ <Tooltip content="Tooltip text" side="top">
+   <Button>Hover me</Button>
+ </Tooltip>
```

### Select

@vlting/ui simplifies the Select API — trigger and content are handled by the Root.

```diff
- <Select>
-   <SelectTrigger>
-     <SelectValue placeholder="Choose..." />
-   </SelectTrigger>
-   <SelectContent>
-     <SelectItem value="a">Option A</SelectItem>
-   </SelectContent>
- </Select>

+ <Select placeholder="Choose...">
+   <Select.Item value="a">Option A</Select.Item>
+ </Select>
```

### DataTable

shadcn requires manual `useReactTable` setup. @vlting/ui wraps it in a single component.

```diff
- const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), ... })
- <Table>
-   <TableHeader>{...render headers...}</TableHeader>
-   <TableBody>{...render rows...}</TableBody>
- </Table>

+ <DataTable
+   data={data}
+   columns={columns}
+   enableSorting
+   enablePagination
+ />
```

Requires `@tanstack/react-table` as a peer dependency: `npm install @tanstack/react-table`.

### Combobox

shadcn requires manually composing Command + Popover. @vlting/ui provides a single component.

```diff
- <Popover>
-   <PopoverTrigger><Button>Select framework...</Button></PopoverTrigger>
-   <PopoverContent>
-     <Command>
-       <CommandInput placeholder="Search..." />
-       <CommandList>
-         {frameworks.map(f => <CommandItem key={f.value}>{f.label}</CommandItem>)}
-       </CommandList>
-     </Command>
-   </PopoverContent>
- </Popover>

+ <Combobox.Root
+   options={frameworks}
+   placeholder="Select framework..."
+   onValueChange={setSelected}
+ />
```

## Cross-Platform Considerations

@vlting/ui components work on both web and React Native. Some features are web-only:

| Feature | Web | React Native |
|---------|-----|-------------|
| DataTable | Full support | Not available (uses HTML tables) |
| CSS border-radius collapsing (InputGroup, ButtonGroup) | Full support | Graceful degradation |
| NavigationMenu | Full support | Simplified (no hover-based dropdowns) |
| Sheet snap points | Full support | Native sheet behavior |
| Resizable panels | Full support | Not available |

## New Components (not in shadcn)

| Component | Description |
|-----------|------------|
| `Direction` | RTL/LTR context provider (`DirectionProvider` + `useDirection` hook) |
| `Item` | Generic list-item compound component (Root, Leading, Content, Title, Description, Trailing) |
| `InputGroup` | Input with prefix/suffix addons and border-radius collapsing |
| `toast()` imperative API | Sonner-style `toast()`, `toast.success()`, `toast.error()`, `toast.warning()`, `toast.promise()` |
| `DataTable` | Single-component wrapper around `@tanstack/react-table` + Table |
| `Loader` | Loading indicator with multiple variants |
| `Empty` | Empty state placeholder component |
| `NativeSelect` | Native HTML `<select>` with consistent styling |
| `Spinner` | Animated spinner (cross-platform) |
| `Kbd` | Keyboard shortcut display |

## Machine-Readable API Mappings

Every component has an `api-mapping.json` file documenting the exact prop-level differences between shadcn and @vlting/ui. The root `api-mappings.json` aggregates all mappings for tooling and AI-assisted migration.

```bash
# View a specific component's mapping
cat packages/components/Button/api-mapping.json

# View all mappings
cat api-mappings.json
```
