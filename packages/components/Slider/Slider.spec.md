<!-- spec-version: 2 -->

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Slider Specification

## Component Name
Slider

---

## Purpose
Draggable slider for selecting a single numeric value within a range. Use for continuous value selection (volume, brightness, price filters). Do NOT use for discrete choices — use RadioGroup or Select.

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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Controlled value |
| `defaultValue` | `number` | `min` | Uncontrolled initial value |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `onValueChange` | `(value: number) => void` | — | Fires on value change |
| `disabled` | `boolean` | — | Disables interaction |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Track height and thumb size |
| `theme` | `'primary' \| 'secondary' \| 'neutral'` | `'primary'` | Fill color theme |
| `aria-label` | `string` | — | Accessible label |

> **TypeScript is the source of truth for props.** See `SliderProps` in `Slider.tsx` for the full typed API.

---

## Composition Model
Single-component API. Track, fill, and thumb are internal — not exposed as sub-components.

---

## Layout Rules
- Full-width by default (`width: 100%`)
- Track is horizontally centered with thumb positioned at value percentage

---

## Variants

| Variant | Values | Purpose |
|---------|--------|---------|
| `size` | `sm`, `md`, `lg` | Controls track height and thumb dimensions |
| `theme` | `primary`, `secondary`, `neutral` | Controls fill color via `$color9` tokens |

---

## Size Options

| Size | Track Height | Thumb Size |
|------|-------------|------------|
| `sm` | `$4` | `$16` |
| `md` | `$6` | `$20` |
| `lg` | `$8` | `$24` |

All sizes maintain ≥44px touch target via padding on the thumb.

---

## States
- **Idle** — Thumb at current value position; track partially filled.
- **Focus** — Focus ring on track via `outline: '$neutral'`.
- **Dragging** — Thumb follows pointer; value updates continuously.
- **Disabled** — 50% opacity, `cursor: not-allowed`, no pointer events.

---

## Interaction Model

### Pointer
- Click anywhere on track to set value
- Drag thumb with pointer capture for continuous adjustment
- Value resolves from pointer X relative to track bounding rect

### Keyboard
- **ArrowRight / ArrowUp** — Increase by `step`
- **ArrowLeft / ArrowDown** — Decrease by `step`
- **Home** — Set to `min`
- **End** — Set to `max`

---

## Accessibility
- `role="slider"` on track
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` reflect current state
- `aria-disabled` when disabled
- `aria-label` passed through from props
- `tabIndex={0}` (or `-1` when disabled)
- Follows [WAI-ARIA Slider pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/)

---

## Platform Implementation Notes

### React (Web)
- Uses `useControllableState` for controlled/uncontrolled value management
- Pointer capture via `setPointerCapture` for drag reliability
- `forwardRef` on root track element

### React Native
Not yet implemented.

---

## Theming Behavior
- Track background: `$maxAlpha4`
- Fill uses theme map: `$primary9`, `$secondary9`, `$neutral9`
- Thumb: `$neutral1` with `$maxAlpha4` box shadow
- All tokens resolve automatically in dark mode

---

## Edge Cases
- `min >= max` — fill percentage clamps to 0%
- `step` larger than range — value snaps to nearest valid step
- `value` outside `[min, max]` — clamped to range

---

## Stories / Preview Cases
- Default (50%), min, max, mid-range
- Each size variant
- Each theme variant
- Disabled state
- Custom step (e.g., step=10)

---

## Test Requirements
- Renders without crashing (default, explicit value, each size)
- `role="slider"` present
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` correct
- `aria-label` forwarded
- Focusable (`tabIndex=0`), not focusable when disabled (`tabIndex=-1`)
- Disabled renders without error

---

## Implementation Constraints
- Single-thumb only — no multi-thumb range support
- No vertical orientation (horizontal only)
- No marks or tick labels

---

## Open Questions
None.

---

## Change Log
- 2026-03-20: Initial implementation — single-thumb slider with keyboard, pointer drag, theme axis, size variants.
