# Component Contract -- Tabs (Headless)

## 1. Public API

### Context

`TabsContext` provides:
```ts
{
  value: string | undefined
  onValueChange: (value: string) => void
  orientation: 'horizontal' | 'vertical'
  tabIds: string[]
  registerTab: (id: string) => void
}
```

Calling `useTabsContext()` outside of `Tabs.Root` throws:
`"Tabs compound components must be used within Tabs.Root"`

Tab registration: each `Tabs.Trigger` calls `registerTab(value)` on mount. The `tabIds` array preserves insertion order and is used by `Tabs.List` for keyboard navigation indexing.

### Tabs.Root

Renders a `<div>` wrapper element with `data-orientation`.

#### Props (`TabsRootProps`)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Compound children (List, Trigger, Content) |
| value | `string` | No | -- | Controlled active tab value. When provided, component is controlled |
| defaultValue | `string` | No | -- | Initial active tab value for uncontrolled usage |
| onValueChange | `(value: string) => void` | No | -- | Called when the active tab changes (both controlled and uncontrolled) |
| orientation | `'horizontal' \| 'vertical'` | No | `'horizontal'` | Determines arrow key navigation direction and `aria-orientation` |

### Tabs.List

Renders a `<div>` with `role="tablist"`. Manages keyboard navigation via `useKeyboardNavigation`.

#### Props (`TabsListProps`)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | `Tabs.Trigger` elements |
| className | `string` | No | -- | Passed through to the div element |

Additional props are spread onto the `<div>` element via rest props.

### Tabs.Trigger

Renders a `<button>` element with `role="tab"`. Registers itself with the context on mount.

#### Props (`TabsTriggerProps`)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Tab label content |
| value | `string` | Yes | -- | Unique value identifying this tab. Used for selection and panel association |
| disabled | `boolean` | No | -- | Prevents selection on click; sets native `disabled` attribute |
| className | `string` | No | -- | Passed through to the button element |

Additional props are spread onto the `<button>` element via rest props.

### Tabs.Content

Renders a `<div>` with `role="tabpanel"` only when its `value` matches the active tab. Returns `null` otherwise.

#### Props (`TabsContentProps`)

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | `React.ReactNode` | Yes | -- | Panel content |
| value | `string` | Yes | -- | Must match a corresponding `Tabs.Trigger` value |
| className | `string` | No | -- | Passed through to the div element |

Additional props are spread onto the `<div>` element via rest props.

---

## 2. Behavioral Guarantees

- Supports controlled mode (via `value` prop) and uncontrolled mode (via `defaultValue` prop) using `useControllableState`.
- Only one tab panel is rendered at a time. Non-active `Tabs.Content` components return `null`.
- `Tabs.Trigger` registers its `value` string into the context's `tabIds` array on mount. Duplicate values are ignored (checked via `includes`).
- `Tabs.List` syncs its internal `activeIdx` when `value` changes externally (e.g., controlled mode update).
- Clicking a non-disabled `Tabs.Trigger` calls `onValueChange` with the trigger's `value`.
- Keyboard navigation in `Tabs.List` uses looping (`loop: true`) by default -- navigating past the last tab wraps to the first, and vice versa.
- Keyboard navigation both moves focus and selects the tab (automatic activation, not manual).
- `onValueChange` is called for every state change regardless of controlled/uncontrolled mode.
- This component will never fetch data, manage global state, or contain business logic.

---

## 3. Accessibility Guarantees

### Keyboard support (within Tabs.List)
- **ArrowRight** (horizontal) / **ArrowDown** (vertical): Move to next tab (loops).
- **ArrowLeft** (horizontal) / **ArrowUp** (vertical): Move to previous tab (loops).
- **Home**: Move to first tab.
- **End**: Move to last tab.
- **Enter / Space**: Select the currently focused tab.
- All arrow/Home/End/Enter/Space keys call `preventDefault`.

### Screen reader support
- `Tabs.List` renders `<div role="tablist" aria-orientation={orientation}>`.
- `Tabs.Trigger` renders `<button role="tab">` with:
  - `aria-selected`: `true` when active, `false` otherwise.
  - `aria-controls`: `"tabpanel-{value}"` linking to the associated panel.
  - `id`: `"tab-{value}"` for panel back-reference.
- `Tabs.Content` renders `<div role="tabpanel">` with:
  - `id`: `"tabpanel-{value}"`.
  - `aria-labelledby`: `"tab-{value}"` linking back to the trigger.

### Focus management
- Active trigger has `tabIndex={0}`; inactive triggers have `tabIndex={-1}` (roving tabindex pattern).
- `Tabs.Content` has `tabIndex={0}` so the panel is focusable for screen readers.

### Data attributes
- `data-orientation`: set on Root's `<div>` to the orientation value.
- `data-state`: `'active'` | `'inactive'` on each Trigger.
- `data-state`: `'active'` on Content (only rendered when active).

---

## 4. Styling Guarantees

- Headless component: renders plain HTML (`<div>`, `<button>`).
- No design tokens, no built-in styles, no theme dependency.
- Consumers style via `className`, rest props, or `data-state`/`data-orientation` attribute selectors.
- No responsive behavior built in; layout is the consumer's responsibility.

---

## 5. Breaking Change Criteria

The following constitute breaking changes:

- Removing any prop from any sub-component's props interface.
- Changing `onValueChange` callback signature.
- Changing the rendered element types (e.g., List's `<div>`, Trigger's `<button>`, Content's `<div>`).
- Changing `role="tablist"`, `role="tab"`, or `role="tabpanel"` assignments.
- Removing or changing `aria-selected`, `aria-controls`, or `aria-labelledby` linkage.
- Changing the roving tabindex pattern (active=0, inactive=-1).
- Changing keyboard navigation keys or removing looping behavior.
- Changing the tab registration mechanism or `tabIds` ordering semantics.
- Changing the ID format (`tab-{value}`, `tabpanel-{value}`).
- Changing `data-state` or `data-orientation` value semantics or attribute names.
- Removing the single-panel rendering guarantee (rendering inactive panels to DOM).
- Changing the context error message or removing the context boundary check.
