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
- Root is a plain `div` wrapper
- Trigger renders as `button`
- Content renders as `div` with `role="region"`

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

---

## Interaction Model
- Click trigger → toggles content visibility
- Disabled → trigger is disabled, click has no effect

---

## Accessibility
- Trigger: `aria-expanded`, `aria-controls` → content id
- Content: `role="region"`, `aria-labelledby` → trigger id, `hidden` when closed
- Trigger renders as `<button type="button">`

---

## Platform Implementation Notes

### React (Web)
- Uses `useDisclosure` hook for controlled/uncontrolled state
- `hidden` attribute for content visibility (no animation in v1)
- `forwardRef` on all sub-components

### React Native
Not yet implemented.

---

## Theming Behavior
Trigger and Content are unstyled `styled()` wrappers — consumers apply tokens via `stl` prop.

---

## Edge Cases
- Content always in DOM (uses `hidden` attribute, not conditional rendering)
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

---

## Implementation Constraints
- Must use `useDisclosure` from headless — no reinventing state management
- `forwardRef` on all sub-components
- No animation in v1

---

## Open Questions
None.

---

## Change Log
- v1: Initial implementation with useDisclosure, compound pattern, hidden attribute toggle
