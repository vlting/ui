<!-- spec-version: 2 -->
<!-- AI note: replaces archived NativeSelect.spec.bak.md -->

# NativeSelect

## Purpose
Browser-native dropdown select for forms. Compound component: `NativeSelect.Root` + `NativeSelect.Option`. Presentation-only.

---

## Supported Platforms
- [x] React (web)
- [ ] React Native

---

## Design System Constraints
All tokens verified. No additions required.

---

## Component API
See `NativeSelectRootProps` and `NativeSelectOptionProps` in `NativeSelect.tsx`.

**Root props** (beyond native `<select>`):
- `size`: `'sm' | 'md' | 'lg'` (default `'md'`)
- `error`: `boolean` — error styling + `aria-invalid`
- `disabled`: `boolean` — reduced opacity, non-interactive
- `onValueChange`: `(value: string) => void` — convenience callback
- `placeholder`: `string` — renders as disabled hidden first option

**Option**: passes through all native `<option>` props.

---

## Composition Model
```tsx
<NativeSelect.Root placeholder="Choose...">
  <NativeSelect.Option value="a">Option A</NativeSelect.Option>
  <NativeSelect.Option value="b">Option B</NativeSelect.Option>
</NativeSelect.Root>
```

---

## Layout Rules
- `width: '100%'`, `appearance: 'none'`
- Custom chevron-down SVG via `backgroundImage`
- Extra `paddingRight` per size for arrow clearance

---

## Variants

### size
| Size | Height | px | paddingRight | fontSize |
|------|--------|----|-------------|----------|
| sm | $28 | $8 | $28 | $buttonSmall |
| md | $32 | $12 | $36 | $button |
| lg | $40 | $16 | $40 | $button |

### error
- `border: '$error9'`, focus outline `$error`

### disabled
- `opacity: '0.5'`, `cursor: 'not-allowed'`, `pointerEvents: 'none'`

---

## Accessibility
- Semantic `<select>` + `<option>` elements
- `aria-invalid="true"` when `error` is set
- `disabled` forwarded to DOM
- Placeholder rendered as `<option value="" disabled hidden>`

---

## Test Requirements
- Root renders `<select>`, Option renders `<option>`
- Placeholder as disabled first option
- Each size variant
- `onValueChange` fires with selected value
- `error` sets `aria-invalid="true"`
- `disabled` prevents interaction
- Forwards ref on Root
