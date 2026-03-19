<!-- spec-version: 2 -->
<!-- AI: Filled from Checkbox.spec.bak.md and aligned to current STL tokens. -->

# Checkbox Specification

## Component Name
Checkbox

---

## Purpose

Binary or tri-state toggle for form selections. Use for boolean options, multi-select lists, and terms acceptance. Do NOT use for mutually exclusive choices (use RadioGroup) or on/off settings (use Switch).

---

## Supported Platforms

- [x] React (web)
- [ ] React Native

---

## Design System Constraints

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

- All styling via `styled()` — no inline styles
- All tokens from STL scales
- `$primary9`/`$primaryText9` for checked state (no theme-axis compoundVariants)
- `$neutral7` border for unchecked state

---

## Component API

> **TypeScript is the source of truth for props.** See `CheckboxRootProps` in `Checkbox.tsx`.

---

## Composition Model

Compound component: `Checkbox.Root` + `Checkbox.Indicator`

- **Root** — `<label>` wrapping a visually-hidden `<input type="checkbox">` + styled indicator box
- **Indicator** — Passthrough sub-component for compound API compatibility

---

## Layout Rules

- Root is `inline-flex` with `align-items: center` and `gap: $8`
- Indicator box is fixed-size per variant, `flex-shrink: 0`
- Label text flows naturally after the indicator

---

## Variants

None beyond size. Primary palette only for checked state.

---

## Size Options

| Size | Indicator Box |
|------|--------------|
| `sm` | `$16` × `$16` |
| `md` | `$20` × `$20` |
| `lg` | `$24` × `$24` |

Default: `md`

---

## States

- **Unchecked** — empty box with `$neutral7` border
- **Checked** — `$primary9` background with check icon in `$primaryText9`
- **Indeterminate** — `$primary9` background with minus icon (for "select all" patterns)
- **Disabled** — `opacity: 0.5`, `cursor: not-allowed`, non-interactive
- **Error** — focus ring uses `$error` outline instead of `$neutral`
- **Focus** — outline `$neutral` (normal) / `$error` (error state) via `:focus-within`

---

## Interaction Model

- **Click** — toggles checked state (native `<input>` handles this)
- **Space** — toggles checked state (native checkbox behavior)
- **Tab** — moves focus to/from the checkbox
- **Label click** — extends target area via native `<label>` wrapping (Fitts's Law)
- Indeterminate → click → always transitions to checked

---

## Accessibility

- **Semantic element:** native `<input type="checkbox">` (visually hidden)
- **Label association:** native `<label>` wrapping
- **ARIA:** `aria-invalid` when `error` is true
- **Indeterminate:** set via `ref.indeterminate` property (no HTML attribute)
- **Focus management:** standard tab focus with visible focus indicator
- **Screen reader:** announces label text, checkbox role, checked state

---

## Platform Implementation Notes

### React (Web)

- Uses `useControllableState` from `packages/headless` for controlled/uncontrolled
- `forwardRef` targeting the hidden `<input>` element
- Indeterminate synced via `useEffect` on `ref.indeterminate`

### React Native

- See `Checkbox.native.tsx` — uses `Pressable` with `accessibilityRole="checkbox"`

---

## Theming Behavior

- Checked: `$primary9` background, `$primaryText9` icon color
- Unchecked: transparent background, `$neutral7` border
- Focus: `$neutral` outline (normal), `$error` outline (error state)
- Dark mode: token resolution handles automatically

---

## Edge Cases

- Indeterminate + click → always becomes checked (not toggled off)
- Controlled indeterminate: parent must manage the `checked="indeterminate"` state
- Disabled checkbox: native `<input disabled>` prevents all interaction

---

## Stories / Preview Cases

- Default unchecked
- Checked
- Indeterminate
- Each size (sm, md, lg)
- Disabled (unchecked + checked)
- Error state
- With label text

---

## Test Requirements

- Toggle between checked/unchecked
- `onCheckedChange` callback fires correctly
- Disabled state prevents interaction
- Each size variant renders
- Indeterminate state sets `ref.indeterminate`
- Indeterminate click → checked
- `role="checkbox"` present
- `aria-invalid` when error
- Label click toggles checkbox
- Focus via tab
- `name`, `value`, `required` props pass through
- `defaultChecked` for uncontrolled mode

---

## Implementation Constraints

- No theme-axis compoundVariants — primary palette only
- All styling via `styled()` or `stl` prop
- STL shorthands: `bg`, `radius`, `border`, etc.

---

## Open Questions

None.

---

## Change Log

- 2026-03-19: Filled spec from `.spec.bak.md`, aligned to current STL tokens
