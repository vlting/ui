<!-- spec-version: 2 -->

# Tooltip Specification

## Component Name
Tooltip

---

## Purpose
Lightweight floating label that appears on hover/focus to describe a UI element. Non-interactive — for supplementary text only. Supports both a simple wrapper API and compound API.

Constraints:
- Must align with the existing design system.
- Must use existing theme tokens.
- Must not introduce arbitrary spacing, colors, typography, or radii.

---

## Supported Platforms

- [x] React (web)
- [ ] React Native

---

## Design System Constraints

Tokens consumed:
- `$neutral12` (background — dark tooltip)
- `$neutralText12` (text — light on dark)
- `$2` (radius)
- `$8` / `$4` (px / py)
- `$small` (font size)
- `$sm` (box shadow)

Required Token Additions: none

---

## Component API

### Simple API
```tsx
<Tooltip content="Help text" placement="top">
  <Button>Hover me</Button>
</Tooltip>
```

### Compound API
```tsx
<Tooltip.Root placement="top" showDelay={200} hideDelay={100}>
  <Tooltip.Trigger><Button>Hover</Button></Tooltip.Trigger>
  <Tooltip.Content>Help text</Tooltip.Content>
</Tooltip.Root>
```

Defaults:
```
placement: 'top'
offset: 8
showDelay: 200
hideDelay: 100
```

---

## Composition Model

Two patterns supported:
1. **Simple:** `<Tooltip content="...">` wrapping trigger child
2. **Compound:** `Tooltip.Root` > `Tooltip.Trigger` + `Tooltip.Content`

Trigger uses `cloneElement` to attach hover/focus handlers to the child.

---

## Layout Rules

- Content rendered in Portal
- Positioned via `usePopoverPosition`
- Max width: 240px
- `pointerEvents: 'none'` — not interactive
- zIndex: 50

---

## Variants

None. Single visual treatment (dark background, light text).

---

## Size Options

None.

---

## States

- `closed` — not rendered
- `open` — visible after delay
- `data-state="open"` on content when visible

---

## Interaction Model

- **Show:** mouseenter or focus on trigger, after `showDelay` ms
- **Hide:** mouseleave or blur on trigger, after `hideDelay` ms
- **Cancel:** Moving mouse back before delay elapses cancels hide
- **No focus trap** — tooltips are non-interactive

---

## Accessibility

- Content: `role="tooltip"`
- Trigger: `aria-describedby` pointing to tooltip `id` (set only when open)
- No focus management inside tooltip
- Tooltip text available to screen readers via aria-describedby

---

## Platform Implementation Notes

### React (Web)
- Portal to document.body
- Timer-based show/hide via useRef
- cloneElement for trigger augmentation

### React Native
Not yet implemented.

---

## Theming Behavior

Uses neutral scale tokens. Dark bg (`$neutral12`) with contrasting text (`$neutralText12`).

---

## Edge Cases

- Rapid hover in/out: timers cancel properly
- Trigger unmounts while tooltip showing: cleanup via useEffect
- Long tooltip text: wraps within maxWidth

---

## Stories / Preview Cases

```
Tooltip / Default
Tooltip / Placements
Tooltip / On Various Elements
Tooltip / Custom Delays
Tooltip / Compound API
```

---

## Test Requirements

- Trigger renders
- Tooltip hidden by default
- Hover shows after delay
- Mouseleave hides after delay
- Focus shows, blur hides
- role="tooltip"
- aria-describedby on trigger when open
- Compound API works
- Custom delay values

---

## Implementation Constraints

- All styling via `styled()` — no inline styles
- Token-only colors and spacing
- `forwardRef` on sub-components
- `Object.assign` export pattern (simple + compound)

---

## Open Questions

None.

---

## Change Log

```
v1.0 — Initial implementation replacing stub
```
