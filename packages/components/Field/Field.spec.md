<!-- spec-version: 2 -->

# Field Specification

## Component Name
Field

---

## Purpose
Compound component for accessible form fields. Wires label, description, and error to any form control via context + `cloneElement`.

---

## Supported Platforms
- [x] React (web)
- [ ] React Native

---

## Component API

### Field.Root
| Prop | Type | Default | Description |
|---|---|---|---|
| `error` | `boolean` | — | Error state |
| `disabled` | `boolean` | — | Propagated to control |
| `required` | `boolean` | — | Shows asterisk, sets aria-required |

### Field.Label
Wraps `Label` primitive. Auto-reads `htmlFor` and `required` from context.

### Field.Control
Single child injection. Clones with `id`, `aria-invalid`, `aria-describedby`, `aria-required`, `disabled`.

### Field.Description
Helper text. Always visible (coexists with error).

### Field.Error
Error message. Conditional render — only when `error=true`. Has `role="alert"`.

---

## Composition Model
```tsx
<Field.Root error required>
  <Field.Label>Email</Field.Label>
  <Field.Control>
    <Input />
  </Field.Control>
  <Field.Description>Help text</Field.Description>
  <Field.Error>Error message</Field.Error>
</Field.Root>
```

---

## Layout Rules
Root: `flex`, `column`, `gap: $6`

---

## States
- **Default** — Label + control + description visible
- **Error** — Error shown with `role="alert"`, control gets `aria-invalid`
- **Disabled** — `disabled` passed to control
- **Required** — Asterisk on label, `aria-required` on control

---

## Accessibility
- `<label htmlFor>` linked to control `id` via `useId()`
- `aria-describedby` references description and/or error IDs
- `aria-invalid="true"` when error
- `aria-required="true"` when required
- `role="alert"` on error (live region)

---

## Test Requirements
- Label linked to control via htmlFor/id
- Error shown/hidden based on error prop
- aria-describedby includes description and error IDs
- aria-invalid on control when error
- required propagates to label asterisk and aria-required
- disabled propagates to control
- Throws on multiple children in Control
- Works with textarea, checkbox, Input component

---

## Change Log
- Initial implementation: compound component with Root, Label, Control, Description, Error
