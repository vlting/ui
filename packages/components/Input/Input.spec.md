<!-- spec-version: 2 -->
<!-- AI note: replaces archived Input.spec.bak.md -->

# Input

## Purpose
Single-line text input for forms and data entry. Presentation-only — no business logic.

---

## Supported Platforms
- [x] React (web)
- [ ] React Native

---

## Design System Constraints
All tokens verified against scale files. No additions required.

---

## Component API
See `InputProps` in `Input.tsx`.

Key props beyond native `<input>` attributes:
- `size`: `'sm' | 'md' | 'lg'` (default `'md'`)
- `error`: `boolean` — error state styling + `aria-invalid`
- `disabled`: `boolean` — reduced opacity, `cursor: not-allowed`
- `onChangeText`: `(text: string) => void` — convenience callback

---

## Composition Model
Single styled `<input>` element. No compound pattern.

```tsx
<Input placeholder="Email" size="md" />
<Input error onChangeText={(v) => console.log(v)} />
```

---

## Layout Rules
- `width: '100%'` — fills container
- Height determined by size variant: sm=$28, md=$32, lg=$40
- Horizontal padding scales with size

---

## Variants

### size
| Size | Height | px | fontSize |
|------|--------|----|----------|
| sm | $28 | $8 | $buttonSmall |
| md | $32 | $12 | $button |
| lg | $40 | $16 | $button |

### error
- `border: '$error9'`
- Focus outline: `$error`

### disabled
- `opacity: '0.5'`, `cursor: 'not-allowed'`

---

## States
- **default**: neutral border, neutral bg
- **focus**: outline ring via `outline: '$neutral'` (or `'$error'` when error)
- **disabled**: reduced opacity, not interactive
- **error**: error border color, error focus ring

---

## Accessibility
- Semantic `<input>` element
- `aria-invalid="true"` when `error` is set (via `mapProps`)
- `disabled` forwarded to DOM natively
- Placeholder via native attribute
- Labels must be provided by consuming code (via `<label htmlFor>`)

---

## Theming Behavior
Tokens consumed: `$neutral2`, `$neutral7`, `$neutral8`, `$neutralText3`, `$error9`, `$field` (radius/fontSize), `$button`/`$buttonSmall` (fontSize), `$offsetDefault`.

---

## Test Requirements
- Renders with placeholder
- Each size variant renders
- `onChangeText` fires with text value
- `error` sets `aria-invalid="true"`
- `disabled` prevents interaction
- Forwards ref
- Spreads native input attributes
