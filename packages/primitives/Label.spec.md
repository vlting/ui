# Component Spec — Label

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Accessible form label that associates descriptive text with a form control via `htmlFor`.
- Use for every form input, select, textarea, and checkbox that needs a visible label.
- Do NOT use for non-form contexts (use Text instead). Do NOT omit `htmlFor` — every label must be associated with a control.

---

## 2. UX Intent

- **Jakob's Law** — form labels follow established web conventions; clicking the label focuses/activates the associated control.
- **WCAG compliance** — labels are the primary mechanism for providing accessible names to form controls (WCAG 1.3.1, 3.3.2).
- **Fitts's Law** — the label increases the interactive target area for its associated control.

---

## 3. Anatomy

Function component wrapping `@tamagui/label`. Two rendered elements:
- The Tamagui Label component (renders `<label>` on web).
- Optional required indicator: `<Text color="$red10"> *</Text>` when `required` is true.

- `htmlFor`: string — the `id` of the associated form control.
- `size`: `'sm'` | `'md'` | `'lg'` (default: `md`). Mapped to Tamagui size tokens (`$2`, `$3`, `$4`).
- `required`: boolean — shows a red asterisk indicator.

> **TypeScript is the source of truth for props.** See `LabelProps` in `Label.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive in the traditional sense, but clicking a label focuses its associated control (native browser behavior via `<label>` + `htmlFor`).

### Keyboard Interaction

None directly — Label is not focusable. Clicking triggers native label-to-control association.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** Renders `<label>` via `@tamagui/label`. This is a critical accessibility primitive.
- **ARIA attributes:** None needed — `<label>` with `htmlFor` provides the accessible name for the associated control natively.
- **Required indicator:** The `*` asterisk is visual-only. For screen readers, the associated input should have `aria-required="true"`.
- **Contrast:** Text must meet 4.5:1. The red asterisk (`$red10`) must meet 3:1 against background.

---

## 6. Styling

- **Design tokens used:**
  - Size mapping: `sm` → `$2`, `md` → `$3`, `lg` → `$4` (Tamagui size tokens)
  - Required indicator: `color: '$red10'`
- **Responsive behavior:** Inherits Tamagui responsive props via the underlying Label component.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Form groups, VStack/HStack layouts adjacent to inputs.
- **What this component can contain:** Text content, and optionally the required indicator (rendered automatically).
- **Anti-patterns:** Do not use Label without `htmlFor` — a disconnected label provides no accessibility benefit. Do not use Label for non-form descriptive text.

---

## 8. Breaking Change Criteria

- Changing the rendered element from `<label>`.
- Removing `htmlFor` prop.
- Removing `required` indicator behavior.
- Changing the size-to-token mapping.
- Changing default size from `md`.

---

## 9. Test Requirements

- **Behavioral tests:** Verify renders `<label>` element. Verify `htmlFor` is forwarded as the `for` attribute. Verify each size maps to correct Tamagui size token. Verify required indicator renders red asterisk when `required` is true. Verify no asterisk when `required` is false/omitted.
- **Accessibility tests:** Verify `<label>` element is in the DOM. Verify `for` attribute matches the associated input `id`. Verify clicking the label focuses the associated control.
