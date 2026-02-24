# Field

> **Baseline:** All requirements in `packages/QUALITY_BASELINE.md` apply. This spec only lists component-specific details.

---

## 1. Purpose

Composable form field wrapper that provides label, description, and error message patterns without requiring a `<Form>` parent. Use when a form control needs accessible labeling and error handling outside a full form context.

**When to use:** Standalone inputs, filter controls, settings toggles, inline edits.
**When NOT to use:** Use `Form` with `Form.Field` when you need full form submission, validation, and field grouping.

---

## 2. UX Intent

- **Primary goal:** Connect a label, description, and error message to a form control with proper ARIA relationships.
- **Mental model:** A labeled input with optional help text and error feedback — the same pattern as `<label>` + `<input>` + `<p>` but with automatic ID wiring.
- **UX laws:** Gestalt proximity (group related elements), Tesler's Law (absorb complexity of ID generation and ARIA linking).

---

## 3. Anatomy

- `Field.Root` — Context provider, accepts `error` and `disabled` props, auto-generates IDs via `useId()`.
- `Field.Label` — Renders `<label>` with `htmlFor` linked to the control.
- `Field.Control` — Slot for the input; clones children with `id`, `aria-describedby`, `aria-invalid`, and `disabled` props.
- `Field.Description` — Helper text below the control; hidden when `error=true`.
- `Field.Error` — Error message; shown only when `error=true`, has `role="alert"`.

**TypeScript is the source of truth for props.** See `FieldRootProps`, `FieldLabelProps`, `FieldControlProps`, `FieldDescriptionProps`, `FieldErrorProps` in source.

---

## 4. Behavior

### States

- **Default** — Label + control + description visible.
- **Error** — Description hidden, error message shown with `role="alert"`. Control gets `aria-invalid="true"`.
- **Disabled** — `disabled` prop passed through to control.

### Keyboard Interaction

No keyboard handling in Field itself — keyboard behavior is delegated to the child control.

### Motion

None.

---

## 5. Accessibility

- **Semantic elements:** `<label>` for label text.
- **ARIA attributes:** `aria-describedby` on control points to description or error ID. `aria-invalid="true"` when `error=true`. `role="alert"` on error message.
- **Focus management:** Field does not manage focus; the child control handles its own focus.
- **Screen reader:** Label announced when control is focused. Description or error announced via `aria-describedby`.
- **Contrast:** Inherits from design tokens.

---

## 6. Styling

- **Design tokens used:** `$body` font family, `$color` for label, `$colorSubtitle` for description, `$red10` for error text.
- **Responsive behavior:** Full-width by default.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Any layout container — Card, Dialog, Sidebar, standalone page.
- **What this component can contain:** Any form control (Input, Textarea, Select, Checkbox, Switch, etc.) inside `Field.Control`.
- **Anti-patterns:** Do not nest Field inside Form.Field. Do not use multiple controls inside one Field.Control.

---

## 8. Breaking Change Criteria

- Removing sub-components (Label, Control, Description, Error).
- Changing the auto-generated ID strategy.
- Removing `aria-describedby` or `aria-invalid` injection.
- Removing `role="alert"` from Error.

---

## 9. Test Requirements

- **Behavioral tests:** Verify label, description, and error text render. Verify error shown only when `error=true`. Verify description hidden when `error=true`. Verify disabled propagates.
- **Accessibility tests:** Verify `<label>` has `htmlFor` matching control `id`. Verify `aria-describedby` links to description/error. Verify error has `role="alert"`. Verify `aria-invalid` set when error.
