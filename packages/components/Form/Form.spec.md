<!-- spec-version: 2 -->

# Form Specification

## Component Name
Form

---

## Purpose
Thin styled `<form>` wrapper with `preventDefault` built in. Field-level concerns are handled by `Field`, not Form.

---

## Supported Platforms
- [x] React (web)
- [ ] React Native

---

## Component API

### Form.Root
| Prop | Type | Default | Description |
|---|---|---|---|
| `onSubmit` | `(e: FormEvent) => void` | — | Called after `preventDefault` |
| `noValidate` | `boolean` | — | Disables browser validation |

No sub-components. Use `<Field.Root>` inside `<Form.Root>` for field-level concerns.

---

## Composition Model
```tsx
<Form.Root onSubmit={handleSubmit}>
  <Field.Root>
    <Field.Label>Email</Field.Label>
    <Field.Control><Input /></Field.Control>
  </Field.Root>
  <Button type="submit">Submit</Button>
</Form.Root>
```

---

## Layout Rules
Root: `flex`, `column`, `gap: $16`

---

## Test Requirements
- Renders as `<form>` element
- `onSubmit` called with `preventDefault`
- Children render inside form
- `noValidate` forwarded
- Composes with Field.Root

---

## Change Log
- Initial implementation: thin form wrapper, no sub-components
