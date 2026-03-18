# Component Spec — NativeSelect

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Native HTML `<select>` element with design system styling.
- Use when native platform select behavior is required (mobile-optimized picker, accessibility guarantees).
- Do NOT use when a custom dropdown with search is needed (use Combobox). Do NOT use for complex multi-select (use a custom component).

---

## 2. UX Intent

- **Jakob's Law** — native select follows platform conventions perfectly (mobile picker, keyboard behavior).
- **Tesler's Law** — all select complexity (dropdown rendering, scrolling, search) is handled by the browser.

---

## 3. Anatomy

Two sub-components using `styledHtml()`:
- `NativeSelect` (Root) — renders native `<select>` element with custom styling. Props: `value`, `defaultValue`, `onValueChange`, `placeholder`, `disabled`, `size`, `name`, `aria-label`.
- `NativeSelect.Option` — renders native `<option>` element. Props: `value`, `disabled`.

Placeholder renders as a disabled `<option>` at the top.
Custom dropdown arrow via SVG background-image.

> **TypeScript is the source of truth for props.** See source files in `NativeSelect/` for the full typed API.

---

## 4. Behavior

### States

- **Default** — shows selected value or placeholder.
- **Open** — native dropdown picker (controlled by browser/OS).
- **Disabled** — non-interactive, reduced opacity.

### Keyboard Interaction

- All keyboard behavior is native: Arrow keys, Space to open, typing to search, Enter to select.

### Motion

None (native browser behavior).

---

## 5. Accessibility

- **Semantic element:** Native `<select>` and `<option>` — fully accessible by default.
- **ARIA attributes:** Optional `aria-label` for when a visible label is not present. All other semantics are native.
- **Screen reader announcements:** Fully handled by the browser — options, selected state, and navigation are announced natively.
- **Touch targets:** Size variants ensure minimum touch target size.

---

## 6. Styling

- **Design tokens used:** `$background`, `$borderColor`, `$color`, `$body` font. `$4` border radius.
- **Size variants:** `sm` (32px), `md` (36px), `lg` (40px) — affect height and padding.
- **Custom arrow:** SVG background-image positioned right of select.
- **Cross-platform note:** Uses `styledHtml('select')` — web-only.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Forms, filter bars, settings panels.
- **What this component can contain:** NativeSelect.Option children.
- **Anti-patterns:** Do not add ARIA roles (native `<select>` already has correct semantics). Do not use for more than ~50 options without search (use Combobox).

---

## 8. Breaking Change Criteria

- Changing from native `<select>` to a custom dropdown.
- Removing a size variant.
- Removing `placeholder` support.
- Changing the `onValueChange` signature.

---

## 9. Test Requirements

- **Behavioral tests:** Verify `<select>` element renders. Verify `<option>` elements render. Verify `onValueChange` fires on selection. Verify placeholder renders as disabled option. Verify each size variant. Verify disabled state.
- **Accessibility tests:** Verify native `<select>` semantics. Verify `aria-label` is forwarded. Verify keyboard-only operation.
