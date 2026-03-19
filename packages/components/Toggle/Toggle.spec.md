<!-- spec-version: 2 -->
<!-- AI: Filled from Toggle.spec.bak.md and aligned to current implementation. -->

# Toggle Specification

## Component Name
Toggle

---

## Purpose

Renders a button that maintains a pressed/unpressed state. Use for toggling view modes, formatting options, or feature flags. Do NOT use for on/off settings (use Switch). Do NOT use for selecting from a group (use ToggleGroup).

---

## Supported Platforms

- [x] React (web)
- [ ] React Native

---

## Design System Constraints

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

- Built on top of `Button` component — inherits all Button styling
- Uses `useToggleState` from `packages/headless` for state management
- `ToggleGroup` wraps `ButtonGroup` with toggle/exclusive modes

---

## Component API

> **TypeScript is the source of truth for props.** See `ToggleProps` and `ToggleGroupProps` in `Toggle.tsx`.

---

## Composition Model

- **Toggle** — Standalone toggle button wrapping `Button` with `useToggleState`
- **ToggleGroup** — Container for multiple `Toggle` children (wraps `ButtonGroup` with `mode`)
  - `type="exclusive"` — single selection (radio-like)
  - `type="toggle"` — multiple selection

---

## Layout Rules

- Toggle: inherits Button layout (inline-flex)
- ToggleGroup: inherits ButtonGroup layout with `attached` mode

---

## Variants

Inherits Button variants: `variant` (solid/outline/ghost/subtle), `size`, `pill`, `square`

---

## Size Options

Inherits Button sizes: `sm`, `md`, `lg`

---

## States

- **Unpressed** — Default appearance; `aria-pressed="false"`
- **Pressed** — Active appearance via Button `pressed` prop; `aria-pressed="true"`
- **Hover** — Inherited from Button hover styles
- **Focus** — Focus ring via Button focus styles
- **Disabled** — Inherited from Button disabled state

---

## Interaction Model

- **Click** — Toggles pressed state
- **Enter/Space** — Toggles pressed state (native `<button>` behavior)
- **ToggleGroup:** Arrow keys navigate between items (roving tabindex via `useToggleGroup`)

---

## Accessibility

- **Semantic element:** native `<button>` via Button component
- **ARIA:** `aria-pressed` (true/false), `type="button"` to prevent form submission
- **Focus management:** standard tab order; ToggleGroup uses roving tabindex
- **Screen reader:** announces button role, pressed state, and label

---

## Platform Implementation Notes

### React (Web)

- Toggle wraps Button + `useToggleState` hook
- `forwardRef` targeting the `<button>` element
- ToggleGroup wraps ButtonGroup with `mode` mapped from `type` prop

### React Native

- Not yet implemented

---

## Theming Behavior

- Inherits all Button theming
- Pressed state styling handled by Button's `pressed` variant
- Dark mode: token resolution handles automatically

---

## Edge Cases

- ToggleGroup `exclusive` mode: at least one item should be selected (enforced by consumer)
- ToggleGroup children must be `Toggle` components with `value` prop

---

## Stories / Preview Cases

- Unpressed / Pressed
- Each size (sm, md, lg)
- Each variant (solid, outline, ghost, subtle)
- Disabled
- ToggleGroup exclusive mode
- ToggleGroup multi-select mode

---

## Test Requirements

- Renders native `<button>` element
- `aria-pressed` toggles correctly (true/false)
- Controlled mode: `pressed` prop overrides internal state
- `onPressedChange` fires with new value
- Keyboard: Enter/Space toggle (native button behavior)
- Disabled: does not toggle, does not fire callback
- `type="button"` prevents form submission
- ToggleGroup renders children
- ToggleGroup exclusive vs toggle modes

---

## Implementation Constraints

- Do NOT duplicate Button styling — delegate to Button component
- Toggle is a thin wrapper over Button + useToggleState

---

## Open Questions

None.

---

## Change Log

- 2026-03-19: Filled spec from `.spec.bak.md`, aligned to current implementation
