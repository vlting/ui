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
- Trigger padding: `py: '$8'`, `px: '$12'`, `radius: '$button'`
- Content renders as `div` with `role="region"`, padding: `py: '$8'`, `px: '$12'`, `fontSize: '$p'`, `color: '$neutralText4'`
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

### Interactive States (Trigger)
| State | Tokens |
|-------|--------|
| `:interact` (hover/focus) | `bg: '$neutral3'` |
| `:focus` | `outline: '$neutral'`, `outlineOffset: '$offsetDefault'` |
| `:pressed` | `transform: '$pressScale'` |
| Disabled | `opacity: '$disabledOpacity'`, `cursor: 'not-allowed'`, `pointerEvents: 'none'` |
| `lowMotion` | `':pressed': { transform: 'none' }` |

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
- Content: `role="region"`, `aria-labelledby` → trigger id, `hidden` when closed
- Trigger renders as `<button type="button">`

---

## Platform Implementation Notes

### React (Web)
- Uses `useDisclosure` hook for controlled/uncontrolled state
- `hidden` attribute for content visibility (no content height animation in v1; indicator rotation and lowMotion-gated transitions are allowed)
- `forwardRef` on all sub-components

### React Native
Not yet implemented.

---

## Theming Behavior
- Trigger: ghost-neutral base (transparent bg, neutral hover), follows Button ghost pattern
- Content: secondary text via `$neutralText4`
- All values overridable via `stl` prop

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
- Chevron indicator renders by default
- `indicator={false}` hides chevron
- Chevron `data-state` matches open state

---

## Implementation Constraints
- Must use `useDisclosure` from headless — no reinventing state management
- `forwardRef` on all sub-components
- No content height animation in v1; indicator rotation and lowMotion-gated transitions allowed

---

## Open Questions
None.

---

## Change Log
- v1: Initial implementation with useDisclosure, compound pattern, hidden attribute toggle
