<!-- spec-version: 2 -->

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# InputGroup Specification

## Component Name
InputGroup

---

## Purpose
Group an input with addons (text labels, icons, buttons) into a visually connected unit with border-radius collapsing. Use for URL inputs with protocol addon, search with icon, inputs with action buttons, phone number with country code. Do NOT use for simple label + input (use Input) or multiple unrelated inputs (use a form layout).

---

## Supported Platforms
- [x] React (web)
- [ ] React Native

---

## Design System Constraints
- All styling via `styled()` — no inline `style={}`
- All colors from STL tokens — zero hardcoded values
- Dark mode resolves automatically via tokens

---

## Component API

### InputGroup (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size context for children |
| `aria-label` | `string` | — | Accessible group label |
| `children` | `ReactNode` | — | Sub-components |

### InputGroup.Addon

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Static text, icons, or labels |

### InputGroup.Element

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'left' \| 'right'` | `'right'` | Position of overlay |
| `children` | `ReactNode` | — | Overlay content |

### InputGroup.Input

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Input component (size injected from context) |

> **TypeScript is the source of truth for props.** See exported types in `InputGroup.tsx`.

---

## Composition Model
Compound component: `InputGroup` root with `.Addon`, `.Element`, and `.Input` sub-components. Size context propagates from root to all children via React context.

---

## Layout Rules
- Root uses flexbox (`row` or `column` based on orientation)
- Border-radius collapsing: first child loses trailing radii, last child loses leading radii, middle children lose all radii
- `InputGroup.Input` fills available space (`flex: 1`)
- `InputGroup.Element` is absolutely positioned within its Input wrapper

---

## Variants

| Variant | Values | Purpose |
|---------|--------|---------|
| `orientation` | `horizontal`, `vertical` | Layout direction |
| `size` | `sm`, `md`, `lg` | Controls addon padding, font size, border radius |

---

## Size Options

| Size | Addon Padding | Border Radius | Font Size |
|------|--------------|---------------|-----------|
| `sm` | `$8` | `$2` | `$buttonSmall` |
| `md` | `$12` | `$3` | `$button` |
| `lg` | `$16` | `$4` | `$button` |

---

## States
- **Default** — children rendered with border-radius collapsing
- **Orientation** — horizontal (row) or vertical (column) layout

---

## Interaction Model
InputGroup itself is not interactive. Children (Input, buttons) handle their own keyboard and pointer behavior.

---

## Accessibility
- Root renders `role="group"`
- Accepts `aria-label` for screen reader context
- Addon is `aria-hidden="true"` (visual-only)
- Focus management handled by child components
- Group label announced when focus enters the group

---

## Platform Implementation Notes

### React (Web)
- Uses `React.createContext` for size propagation
- `Object.assign` compound component pattern
- `forwardRef` on root element
- `cloneElement` injects `size` into Input children

### React Native
Not yet implemented.

---

## Theming Behavior
- Addon background: `$surface2`
- Addon border: `$neutralMin`
- Addon text: `$neutralText2`
- All tokens resolve automatically in dark mode

---

## Edge Cases
- Addon without Input — renders as standalone group item
- Multiple Addons — border-radius collapsing handles any number of children
- Sub-component used outside InputGroup — throws descriptive error

---

## Stories / Preview Cases
- Addon + Input (URL with protocol)
- Element overlay + Input (search icon)
- Addon on both sides
- Each size variant
- Vertical orientation

---

## Test Requirements
- Root renders children
- Addon + Input combination renders
- Element overlay renders
- Size variants propagate
- Horizontal and vertical orientations render
- Optional sub-components can be omitted
- `role="group"` present with `aria-label`

---

## Implementation Constraints
- No nested InputGroups
- Element uses inline `style` for pointer-events passthrough on inner wrapper (acceptable exception for event delegation)

---

## Open Questions
None.

---

## Change Log
- 2026-03-20: Initial implementation — compound component with size context, border-radius collapsing, orientation variants.
