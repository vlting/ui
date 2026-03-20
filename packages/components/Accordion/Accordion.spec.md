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
- Root is a vertical stack
- Items have bottom border
- Trigger is full-width flex with space-between

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

---

## Interaction Model
- Click trigger toggles item
- Single mode: opening one closes others
- `collapsible=false`: cannot close the last open item
- Arrow keys move focus between triggers (roving tabindex)

---

## Accessibility
- Trigger: `aria-expanded`, `aria-controls`, roving `tabIndex`
- Content: `role="region"`, `aria-labelledby`, `hidden`
- Keyboard: ArrowUp/Down between triggers, Home/End, Enter/Space toggle

---

## Platform Implementation Notes

### React (Web)
- Uses `useAccordion` hook from headless
- `registerItem`/`unregisterItem` for dynamic item tracking
- `hidden` attribute for content visibility (no animation in v1)
- `forwardRef` on all sub-components

### React Native
Not yet implemented.

---

## Theming Behavior
Item border uses `$neutralMin`. Trigger has transparent background. Consumers extend via `stl` prop.

---

## Edge Cases
- Content always in DOM (uses `hidden` attribute)
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

---

## Implementation Constraints
- All logic in `useAccordion` hook — component is structure + styled only
- `forwardRef` on all sub-components
- No animation in v1

---

## Open Questions
None.

---

## Change Log
- v1: Initial implementation with useAccordion, compound pattern, single/multiple modes
