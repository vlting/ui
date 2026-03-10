# Component Gap Analysis vs shadcn/ui

## Present in both

- Accordion
- Alert
- AlertDialog
- AspectRatio
- Avatar
- Badge
- Breadcrumb
- Button
- Calendar
- Card
- Carousel
- Chart
- Checkbox
- Collapsible
- Combobox
- Command
- ContextMenu
- DataTable
- DatePicker
- Dialog
- Drawer
- DropdownMenu
- Form
- HoverCard
- Input
- InputOTP
- Label
- Menubar
- NavigationMenu
- Pagination
- Popover
- Progress
- RadioGroup
- Resizable (ResizablePanel in shadcn)
- ScrollArea
- Select
- Separator
- Sheet
- Sidebar
- Skeleton
- Slider
- Switch
- Table
- Tabs
- Textarea
- Toast (shadcn uses Sonner)
- Toggle
- ToggleGroup
- Tooltip

## Present only in @vlting/ui

- **ButtonGroup** — groups related buttons with shared border radius
- **DateRangePicker** — dual-date selection (shadcn uses separate Calendar)
- **Direction / DirectionProvider** — RTL/LTR context
- **Empty** — empty state pattern (icon + title + description + action)
- **Field** — form field wrapper (label + control + description + error)
- **InputGroup** — input with prefix/suffix addons
- **Item** — versatile list item (leading + content + trailing)
- **Kbd** — keyboard shortcut badge
- **Loader** — full-page / section loading indicator
- **NativeSelect** — native `<select>` fallback
- **Spinner** — inline loading spinner
- **Typography** — full typography scale (H1–H6, P, Lead, Large, Small, Muted, Blockquote, InlineCode, List)

## Present only in shadcn/ui (gaps)

No component gaps — @vlting/ui has full parity with the shadcn/ui catalog and extends it with additional components listed above.

## Hooks

### Existing
- `useControllableState` — controlled/uncontrolled state management
- `useFocusTrap` — trap focus within a container
- `useKeyboardNavigation` — arrow key navigation for lists
- `useReducedMotion` — detect prefers-reduced-motion

### New (added in this task)
- `useMediaQuery` — subscribe to any CSS media query
- `useDebounce` — debounce a changing value
- `useIntersectionObserver` — observe element viewport visibility
- `useClipboard` — copy to clipboard with success state
