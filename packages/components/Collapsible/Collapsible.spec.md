<!-- spec-version: 2 -->

# Collapsible Specification

## Component Name
Collapsible

---

## Purpose
A disclosure widget that toggles the visibility of its content. Provides a trigger button and a collapsible content region following WAI-ARIA disclosure pattern.

---

## Supported Platforms

- [x] React (web)
- [ ] React Native

---

## Design System Constraints
- All styling via `styled()` — no inline styles
- Zero hardcoded colors; tokens only
- Uses `useDisclosure` from `@vlting/headless` for state management

---

## Component API

### Collapsible.Root
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | — | Callback when open state changes |
| `disabled` | `boolean` | `false` | Prevents toggle interaction |
| `children` | `ReactNode` | — | Trigger + Content |

### Collapsible.Trigger
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Button label |
| `indicator` | `boolean` | `true` | Show built-in chevron indicator |

### Collapsible.Content
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Collapsible content |

---

## Composition Model
Compound component: `Collapsible.Root` > `Collapsible.Trigger` + `Collapsible.Content`

Context provides: `isOpen`, `toggle`, `disabled`, `contentId`, `triggerId`

---

## Layout Rules
- Root is a flex column container (`display: 'flex'`, `flexDirection: 'column'`)
- Trigger renders as `button`, full-width flex with `justifyContent: 'space-between'`, `alignItems: 'center'`
- Trigger padding: `py: '$8'`, `px: '$12'` — no radius (full-bleed rows, Item-inspired)
- Content renders as `div` with `role="region"`, padding: `pt: '$0'`, `pb: '$12'`, `px: '$16'`, `fontSize: '$p'`, `color: '$neutralText4'`
- Content wrapped in CSS grid container for smooth height animation (`gtRows: '0fr' → '1fr'`)
- No default border (standalone widget, not stacked list)
- Built-in chevron indicator (inline SVG) positioned trailing, rotates 180deg when `data-state="open"`

---

## Variants
None in v1.

---

## Size Options
None in v1.

---

## States
| State | Attribute | Values |
|-------|-----------|--------|
| Open/Closed | `data-state` | `"open"` / `"closed"` |
| Disabled | `disabled` | on Trigger |

### Interactive States (Trigger — Item-inspired, not Button-inspired)
| State | Tokens |
|-------|--------|
| `:interact` (hover/focus) | `bg: '$neutral4'` (Item-aligned) |
| `:focus` | `outline: '$neutral'`, `outlineOffset: '$offsetDefault'` |
| `:pressed` | `bg: '$neutral5'` (subtle bg shift, no transform) |
| Disabled | `opacity: '$disabledOpacity'`, `cursor: 'not-allowed'`, `pointerEvents: 'none'` |

### Chevron Indicator
- Inline SVG chevron-down, `aria-hidden="true"`
- Rotation: `transform: 'rotate(180deg)'` when `data-state="open"`
- Transition: `transitionDuration: '$fastDuration'`, `transitionTimingFunction: 'ease'`
- `lowMotion: { transitionDuration: '0.01s' }`
- Controlled by `indicator` prop on Trigger (default `true`)

---

## Interaction Model
- Click trigger → toggles content visibility
- Disabled → trigger is disabled, click has no effect

---

## Accessibility
- Trigger: `aria-expanded`, `aria-controls` → content id
- Content: `role="region"`, `aria-labelledby` → trigger id, grid-based visual hiding (`aria-hidden` when collapsed)
- Trigger renders as `<button type="button">`

---

## Platform Implementation Notes

### React (Web)
- Uses `useDisclosure` hook for controlled/uncontrolled state
- CSS grid height animation (`gtRows: '0fr' → '1fr'`) with `$fastDuration` transition and `lowMotion` gate
- `hidden` attribute replaced with grid-based visual hiding + `aria-hidden`
- `forwardRef` on all sub-components

### React Native
Not yet implemented.

---

## Theming Behavior
- Trigger: Item-inspired interactive pattern (transparent bg, `$neutral4` hover, `$neutral5` pressed, no radius)
- Content: secondary text via `$neutralText4`
- All values overridable via `stl` prop

---

## Edge Cases
- Content always in DOM (uses CSS grid for visual hiding, not `hidden` attribute)
- Compound components throw if used outside Root

---

## Stories / Preview Cases
- Default (closed)
- Default open
- Controlled
- Disabled

---

## Test Requirements
- Renders trigger and content
- Content hidden by default
- Content visible when `defaultOpen`
- Click toggle
- `aria-expanded` reflects state
- `aria-controls` links trigger to content
- Controlled mode
- Disabled prevents toggle
- `data-state` updates
- Chevron indicator renders by default
- `indicator={false}` hides chevron
- Chevron `data-state` matches open state

---

## Implementation Constraints
- Must use `useDisclosure` from headless — no reinventing state management
- `forwardRef` on all sub-components
- CSS grid height animation via `gtRows: '0fr' → '1fr'`, gated by `lowMotion`

---

## Open Questions
None.

---

## Change Log
- v1: Initial implementation with useDisclosure, compound pattern, hidden attribute toggle
- v1.1: UI overhaul — ghost-neutral trigger styling, chevron indicator, interactive states, content padding
- v2: Item-inspired redesign — remove button-like styling, CSS grid height animation, content visual subordination, no default border
