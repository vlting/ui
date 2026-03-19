<!-- spec-version: 2 -->
<!-- AI note: replaces archived Textarea.spec.bak.md -->

# Textarea

## Purpose
Multi-line text input for forms. Presentation-only — no business logic.

---

## Supported Platforms
- [x] React (web)
- [ ] React Native

---

## Design System Constraints
Required token addition: `$72` in size scale (added for md minHeight).

---

## Component API
See `TextareaProps` in `Textarea.tsx`.

Key props beyond native `<textarea>` attributes:
- `size`: `'sm' | 'md' | 'lg'` (default `'md'`)
- `error`: `boolean` — error state styling + `aria-invalid`
- `disabled`: `boolean` — reduced opacity, no resize
- `onChangeText`: `(text: string) => void` — convenience callback
- `rows`: native textarea rows (forwarded)

---

## Composition Model
Single styled `<textarea>` element.

```tsx
<Textarea placeholder="Description" size="md" />
<Textarea error rows={5} />
```

---

## Layout Rules
- `width: '100%'` — fills container
- `resize: 'vertical'` default, `'none'` when disabled
- MinHeight by size: sm=$56, md=$72, lg=$96

---

## Variants

### size
| Size | minHeight | px | py | fontSize |
|------|-----------|----|----|----------|
| sm | $56 | $8 | $6 | $buttonSmall |
| md | $72 | $12 | $8 | $button |
| lg | $96 | $16 | $12 | $button |

### error
- `border: '$error9'`, focus outline `$error`

### disabled
- `opacity: '0.5'`, `cursor: 'not-allowed'`, `resize: 'none'`

---

## Accessibility
- Semantic `<textarea>` element
- `aria-invalid="true"` when `error` is set
- `disabled` forwarded to DOM natively

---

## Test Requirements
- Renders with placeholder
- Each size variant renders
- `onChangeText` fires with text value
- `error` sets `aria-invalid="true"`
- `disabled` prevents interaction and disables resize
- `rows` prop controls initial height
- Forwards ref
