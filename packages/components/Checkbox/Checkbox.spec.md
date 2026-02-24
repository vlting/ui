# Component Spec — Checkbox

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Binary or tri-state toggle for form selections.
- Use for boolean options, multi-select lists, and terms acceptance.
- Do NOT use for mutually exclusive choices (use RadioGroup). Do NOT use for on/off settings (use Switch).

---

## 2. UX Intent

- **Jakob's Law** — checkboxes are a universally recognized form control.
- **Fitts's Law** — label click area extends the target (native `<label>` wrapping).
- **WAI-ARIA pattern:** [Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)

---

## 3. Anatomy

Compound component wrapping Tamagui Checkbox with native `<label>`:
- `Checkbox` (Root) — native `<label>` wrapping Tamagui Checkbox. Props: `checked`, `defaultChecked`, `onCheckedChange`, `disabled`, `size`, `required`, `name`, `value`, `children`.
- `Checkbox.Indicator` — custom check icon (default: "✓" text).

Size variants: `sm` (`$3`), `md` (`$4`), `lg` (`$5`).

> **TypeScript is the source of truth for props.** See source files in `Checkbox/` for the full typed API.

---

## 4. Behavior

### States

- **Unchecked** — empty box.
- **Checked** — box with check indicator.
- **Indeterminate** — partial check (for "select all" patterns).
- **Disabled** — reduced opacity, non-interactive.
- **Focus** — 2px solid outline (custom focus style).

### Keyboard Interaction

- **Space** — toggles checked state (delegated to Tamagui).
- **Enter** — toggles checked state.
- **Tab** — moves focus to/from the checkbox.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** Tamagui Checkbox (renders checkbox semantics). Wrapped in native `<label>` for click association.
- **ARIA attributes:** Built-in via Tamagui — `role="checkbox"`, `aria-checked`.
- **Focus management:** Standard tab focus with visible focus indicator.
- **Screen reader announcements:** Announces label text, checkbox role, and checked state.

---

## 6. Styling

- **Design tokens used:** `$background` for unchecked, `$color6` for checked background, `$color1` for check icon. Focus: 2px solid `$outlineColor`. Disabled: `opacity: 0.5`.
- **Size variants:** Maps to Tamagui size tokens `$3`/`$4`/`$5`.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Form groups, settings panels, filter lists, table rows.
- **What this component can contain:** Indicator sub-component and label text as children.
- **Anti-patterns:** Do not use without a visible label. Do not use for mutually exclusive options.

---

## 8. Breaking Change Criteria

- Removing checked/unchecked/indeterminate states.
- Removing the `<label>` wrapper.
- Removing keyboard support (Space/Enter).
- Removing a size variant.

---

## 9. Test Requirements

- **Behavioral tests:** Verify toggle between checked and unchecked. Verify `onCheckedChange` callback fires. Verify disabled state prevents interaction. Verify each size variant. Verify indeterminate state.
- **Accessibility tests:** Verify `role="checkbox"` is present. Verify `aria-checked` toggles. Verify label click toggles checkbox. Verify keyboard activation (Space, Enter). Verify visible focus indicator.
