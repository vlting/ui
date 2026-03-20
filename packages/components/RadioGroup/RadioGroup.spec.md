<!-- spec-version: 2 -->
<!-- AI: Fill this spec when this component is actively worked on. See RadioGroup.spec.bak.md for prior design intent. -->

# RadioGroup Specification

## Component Name
RadioGroup

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

- **Prop**: `error: boolean` on `RadioGroup.Root` (optional, default `false`)
- Propagates to `RadioGroup.Item` children via context
- Visual + ARIA only — does not affect selection behavior
- When `error` is `true`:
  - Each radio circle indicator border: `borderColor: '$error9'` (NEVER use `border` shorthand — it expands to 12 sub-properties and breaks with color tokens)
  - Focus ring on each item: `outlineColor` changes from `$neutral` to `$error`
- `mapProps` on Root sets `aria-invalid="true"` when `error` is `true`

**Implementation notes:**
- Use `borderColor`, NOT `border` shorthand. The STL `border` shorthand expands to `borderColor` + `borderStyle` + `borderWidth` (x4 sides = 12 properties). Applying a color token to `borderStyle`/`borderWidth` produces invalid CSS.
- Error state is purely presentational — the group remains fully functional for selection.
- Error propagation: Root owns the `error` prop and passes it down via context so each Item can apply error styling independently.

---

## Size Options

---

## States

- **Default**: Standard circle border on items, no error indication
- **Error**: `borderColor: '$error9'` on each item circle, focus ring uses `$error` outline, `aria-invalid="true"` on Root
- **Selected**: Indicator dot visible on selected item (error styling persists if `error` is `true`)
- **Unselected**: No indicator dot (error styling persists if `error` is `true`)
- **Disabled**: Standard disabled styling (error styling should be visually muted)

---

## Interaction Model

---

## Accessibility

- When `error` is `true`, `mapProps` on Root must set `aria-invalid="true"` on the root `radiogroup` element
- Error state must not interfere with keyboard operability (Arrow keys to navigate, Space to select)
- Error border color `$error9` must meet WCAG 1.4.11 (3:1 contrast for UI components)
- Error context propagation ensures all items within the group reflect the error state consistently

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

- 2026-03-19: Added error variant specification (boolean `error` prop on Root, context propagation to Items, `borderColor: '$error9'`, `aria-invalid`, focus ring override)
