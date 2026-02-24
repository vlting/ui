# Component Spec — Form

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Structured form container with field grouping, labels, descriptions, and error messages.
- Use for all multi-field forms where consistent field layout and validation display are needed.
- Do NOT use for single inline inputs. Do NOT use without native `<form>` semantics.

---

## 2. UX Intent

- **Tesler's Law** — absorbs form layout complexity (spacing, alignment, error placement).
- **Jakob's Law** — standard form patterns (label above input, error below) match user expectations.
- **WAI-ARIA practices:** [Forms](https://www.w3.org/WAI/ARIA/apg/practices/forms/)

---

## 3. Anatomy

Compound component wrapping `@tamagui/form`:
- `Form` (Root) — renders `<form>`. Props: `onSubmit`.
- `Form.Field` — field group with context for error/disabled state. Props: `error`, `disabled`.
- `Form.Label` — renders semantic `<label>` with `htmlFor` association.
- `Form.Description` — helper text below the label.
- `Form.ErrorMessage` — conditional error text with `role="alert"`. Only renders when `error` is true.

> **TypeScript is the source of truth for props.** See source files in `Form/` for the full typed API.

---

## 4. Behavior

### States

- **Default** — normal form display.
- **Error** — field shows error styling and error message.
- **Disabled** — field is non-interactive.

### Keyboard Interaction

- Standard form behavior (Tab between fields, Enter to submit).

### Motion

None.

---

## 5. Accessibility

- **Semantic elements:** Native `<form>`, `<label>` with `htmlFor`.
- **ARIA attributes:** `role="alert"` on ErrorMessage — ensures error is announced to screen readers.
- **Error identification:** WCAG 3.3.1 — errors are identified with visible text and `role="alert"`.
- **Labels:** WCAG 1.3.1 / 3.3.2 — every field has an associated `<label>`.

---

## 6. Styling

- **Design tokens used:** `$color` for labels, `$colorSubtitle` for descriptions, `$red10` for error messages. `fontFamily: '$heading'` for labels, `'$body'` for descriptions/errors. `$4` gap between fields, `$1.5` within fields.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Pages, dialogs, cards, settings panels.
- **What this component can contain:** Field groups containing Label, Description, ErrorMessage, and form controls (Input, Select, Checkbox, etc.).
- **Anti-patterns:** Do not use Form.Label without `htmlFor`. Do not use ErrorMessage without the `error` prop on Field.

---

## 8. Breaking Change Criteria

- Removing sub-components (Field, Label, Description, ErrorMessage).
- Removing native `<form>` element.
- Removing `role="alert"` from ErrorMessage.
- Changing the `onSubmit` signature.

---

## 9. Test Requirements

- **Behavioral tests:** Verify `<form>` element renders. Verify `onSubmit` fires on form submission. Verify ErrorMessage renders only when `error` is true. Verify disabled state propagates to children via context.
- **Accessibility tests:** Verify `<label>` has `for` attribute. Verify `role="alert"` on error messages. Verify Tab navigation between form fields.
