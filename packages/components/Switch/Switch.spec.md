<!-- spec-version: 2 -->
<!-- AI: Prior design intent preserved in Switch.spec.bak.md -->

# Switch Specification

## Component Name
Switch

---

## Purpose
Renders a toggle switch for binary on/off settings. Use for immediate-effect settings (enable notifications, dark mode). Do NOT use for form submissions requiring confirmation — use Checkbox instead.

---

## Supported Platforms

- [x] React (web)
- [ ] React Native

---

## Design System Constraints

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

- All styling via `styled()`. No plain `style={}`.
- All spacing/sizing via STL tokens.
- Must support light/dark themes via token resolution.

---

## Component API

> See `SwitchProps` in `Switch.tsx` for the full typed API.

Key props: `checked`, `defaultChecked`, `onCheckedChange`, `disabled`, `size`, `name`.

---

## Composition Model

- **Single component**: `<button role="switch">` containing a hidden `<input>` (for form name) and a styled thumb `<span>`.
- Internal `SwitchThumb` is not exposed.

---

## Layout Rules

- Fixed size per variant; does not stretch.
- Track is the button itself with `inline-flex` + `alignItems: center`.
- Thumb slides via `translateX`.

---

## Variants

- `size`: sm, md, lg
- `checked`: true, false (visual variant on track bg)
- `disabled`: true (opacity 0.5, no interaction)

---

## Size Options

| Size | Track W×H | Thumb | Translate |
|------|-----------|-------|-----------|
| sm   | 36×20     | 16×16 | 16rem     |
| md   | 44×24     | 20×20 | 20rem     |
| lg   | 52×28     | 24×24 | 24rem     |

---

## States

- **Off** — Thumb left; track `$neutral5`.
- **On** — Thumb right; track `$primary9`.
- **Focus** — Outline ring via `$neutral` (focus-visible).
- **Disabled** — 50% opacity; no interaction.

---

## Interaction Model

- **Click/tap** — Toggles the switch.
- **Space/Enter** — Toggles (native button behavior).
- Follows [WAI-ARIA Switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/).

---

## Accessibility

- Semantic: `<button role="switch">`.
- `aria-checked` reflects state.
- `aria-disabled` when disabled.
- Focus management: standard tab order, outline on focus-visible.
- Screen readers: role, checked state, and label announced.

---

## Platform Implementation Notes

### React (Web)

- Uses `useControllableState` for controlled/uncontrolled.
- Thumb transition via STL `$fastDuration` + `transitionProperty: transform`.
- `lowMotion` condition suppresses transition (thumb snaps).
- Hidden `<input type="hidden">` for form `name` support.

### React Native

Not yet implemented.

---

## Theming Behavior

- Checked track: `$primary9`. Unchecked: `$neutral5`.
- Thumb: `$neutral1`.
- Focus ring: `$neutral` outline.
- Dark mode: token-based, resolves automatically.

---

## Edge Cases

- No label: must provide `aria-label` or `aria-labelledby`.
- Rapid toggling: state updates are synchronous via `useControllableState`.

---

## Stories / Preview Cases

- Default (unchecked, md)
- Checked
- Each size (sm, md, lg)
- Disabled (checked and unchecked)

---

## Test Requirements

- **Behavioral**: toggles on click; `onCheckedChange` fires with correct value; controlled and uncontrolled modes; disabled prevents toggle; `name` prop for form submission.
- **Accessibility**: `role="switch"` present; `aria-checked` toggles; Space/Enter toggle; focus ring visible.
- **Visual regression**: off, on, disabled-off, disabled-on, each size variant.

---

## Implementation Constraints

- Thumb transition MUST use STL animation tokens, not inline values.
- `lowMotion` condition suppresses transition.
- No theme-axis compoundVariants — primary palette only.

---

## Open Questions

None.

---

## Change Log

- 2026-03-19: Initial implementation — web only.
