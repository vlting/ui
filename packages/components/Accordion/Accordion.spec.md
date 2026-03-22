<!-- spec-version: 2 -->

# Accordion Specification

## Component Name
Accordion

---

## Purpose
A vertically stacked set of interactive headings that each reveal an associated section of content. Supports single (one-at-a-time) and multiple (independent) expansion modes.

---

## Supported Platforms

- [x] React (web)
- [ ] React Native

---

## Design System Constraints
- All styling via `styled()` — no inline styles
- Zero hardcoded colors; tokens only
- Uses `useAccordion` from `@vlting/headless` for all behavioral logic

---

## Component API

### Accordion.Root
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'single' \| 'multiple'` | required | Expansion mode |
| `value` | `string[]` | — | Controlled expanded items |
| `defaultValue` | `string[]` | `[]` | Initial expanded items |
| `onValueChange` | `(value: string[]) => void` | — | Callback on change |
| `disabled` | `boolean` | `false` | Disables all items |
| `collapsible` | `boolean` | `true` | Single mode: allow closing last item |

### Accordion.Item
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Unique item identifier |
| `disabled` | `boolean` | `false` | Disables this item |

### Accordion.Trigger
Renders as `<button>`. Receives aria props from hook.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `indicator` | `boolean` | `true` | Show built-in chevron indicator |

### Accordion.Content
Renders as `<div>` with `role="region"`. Hidden via `hidden` attribute.

---

## Composition Model
`Accordion.Root` > `Accordion.Item` > (`Accordion.Trigger` + `Accordion.Content`)

Two context layers:
- AccordionContext (root-level): hook return value
- AccordionItemContext (item-level): value, disabled, isOpen, index

---

## Layout Rules
- Root is a vertical stack (`fontFamily: '$body'`)
- Items have bottom border (`borderBottom: '$neutralMin'`)
- Trigger is full-width flex with `justifyContent: 'space-between'`, `alignItems: 'center'`
- Trigger padding: `py: '$8'`, `px: '$12'` — no radius (full-bleed rows, Item-inspired)
- Content padding: `pt: '$0'`, `pb: '$12'`, `px: '$16'`, `fontSize: '$p'`, `color: '$neutralText4'`
- Content wrapped in CSS grid container for smooth height animation (`gtRows: '0fr' → '1fr'`)
- Built-in chevron indicator (inline SVG) positioned trailing, rotates 180deg when `data-state="open"`

---

## Variants
- `type: 'single'` — one item at a time
- `type: 'multiple'` — independent toggling

---

## Size Options
None in v1.

---

## States
| State | Attribute | Values |
|-------|-----------|--------|
| Open/Closed | `data-state` | `"open"` / `"closed"` (on Item, Trigger, Content) |
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
- Click trigger toggles item
- Single mode: opening one closes others
- `collapsible=false`: cannot close the last open item
- Arrow keys move focus between triggers (roving tabindex)

---

## Accessibility
- Trigger: `aria-expanded`, `aria-controls`, roving `tabIndex`
- Content: `role="region"`, `aria-labelledby`, grid-based visual hiding (`aria-hidden` when collapsed)
- Keyboard: ArrowUp/Down between triggers, Home/End, Enter/Space toggle

---

## Platform Implementation Notes

### React (Web)
- Uses `useAccordion` hook from headless
- `registerItem`/`unregisterItem` for dynamic item tracking
- CSS grid height animation (`gtRows: '0fr' → '1fr'`) with `$fastDuration` transition and `lowMotion` gate
- Content wrapped in grid container; inner content has `overflow: hidden`, `minHeight: 0`
- `hidden` attribute replaced with grid-based visual hiding + `aria-hidden`
- `forwardRef` on all sub-components

### React Native
Not yet implemented.

---

## Theming Behavior
- Item border: `borderBottom: '$neutralMin'`
- Trigger: Item-inspired interactive pattern (transparent bg, `$neutral4` hover, `$neutral5` pressed, no radius)
- Content: secondary text via `$neutralText4`
- All values overridable via `stl` prop

---

## Edge Cases
- Content always in DOM (uses CSS grid for visual hiding, not `hidden` attribute)
- Compound components throw if used outside parent
- `value` is always `string[]`, even for single mode

---

## Stories / Preview Cases
- Single mode (default)
- Single mode non-collapsible
- Multiple mode
- With defaultValue
- Disabled

---

## Test Requirements
- Renders items with triggers and content
- Single mode: one at a time
- Multiple mode: independent
- collapsible=false prevents closing
- ARIA attributes correct
- data-state updates
- Disabled prevents toggle
- Keyboard navigation
- Chevron indicator renders by default
- `indicator={false}` hides chevron
- Chevron `data-state` matches item state

---

## Implementation Constraints
- All logic in `useAccordion` hook — component is structure + styled only
- `forwardRef` on all sub-components
- CSS grid height animation via `gtRows: '0fr' → '1fr'`, gated by `lowMotion`
- Ref merging via `mergeRefs` utility (not manual ref callbacks)

---

## Open Questions
None.

---

## Change Log
- v1: Initial implementation with useAccordion, compound pattern, single/multiple modes
- v1.1: UI overhaul — ghost-neutral trigger styling, chevron indicator, interactive states, content padding
- v2: Item-inspired redesign — remove button-like styling, CSS grid height animation, keyboard nav fix, content visual subordination
