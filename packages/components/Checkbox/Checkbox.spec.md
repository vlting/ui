<!-- spec-version: 2 -->
<!-- AI: Fill this spec when this component is actively worked on. See Checkbox.spec.bak.md for prior design intent. -->

# Checkbox Specification

## Component Name
Checkbox

---

## Purpose

---

## Supported Platforms

- [ ] React (web)
- [ ] React Native

---

## Design System Constraints

---

## Component API

---

## Composition Model

---

## Layout Rules

---

## Variants

### Error Variant

- **Prop**: `error: boolean` (optional, default `false`)
- Visual + ARIA only — does not affect checked/unchecked behavior
- When `error` is `true`:
  - Checkbox box border: `borderColor: '$error9'` (NEVER use `border` shorthand — it expands to 12 sub-properties and breaks with color tokens)
  - Focus ring: `outlineColor` changes from `$neutral` to `$error`
- `mapProps` sets `aria-invalid="true"` when `error` is `true`

**Implementation notes:**
- Use `borderColor`, NOT `border` shorthand. The STL `border` shorthand expands to `borderColor` + `borderStyle` + `borderWidth` (x4 sides = 12 properties). Applying a color token to `borderStyle`/`borderWidth` produces invalid CSS.
- Error state is purely presentational — the component remains fully functional for toggling checked/unchecked.

---

## Size Options

---

## States

- **Default**: Standard border, no error indication
- **Error**: `borderColor: '$error9'`, focus ring uses `$error` outline, `aria-invalid="true"`
- **Checked**: Indicator visible (error styling persists if `error` is `true`)
- **Unchecked**: Indicator hidden (error styling persists if `error` is `true`)
- **Disabled**: Standard disabled styling (error styling should be visually muted)

---

## Interaction Model

---

## Accessibility

- When `error` is `true`, `mapProps` must set `aria-invalid="true"` on the root element
- Error state must not interfere with keyboard operability (Space to toggle)
- Error border color `$error9` must meet WCAG 1.4.11 (3:1 contrast for UI components)

---

## Platform Implementation Notes

### React (Web)

### React Native

---

## Theming Behavior

---

## Edge Cases

---

## Stories / Preview Cases

---

## Test Requirements

---

## Implementation Constraints

---

## Open Questions

---

## Change Log

- 2026-03-19: Added error variant specification (boolean `error` prop, `borderColor: '$error9'`, `aria-invalid`, focus ring override)
