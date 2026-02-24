# Component Spec — Loader

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Full-page or section-level loading indicator with color variants.
- Use as a higher-level wrapper around Spinner with semantic color presets.
- Do NOT use for inline loading within buttons (use Spinner directly).

---

## 2. UX Intent

- **Doherty Threshold** — immediate visual feedback that loading is in progress.

---

## 3. Anatomy

Thin wrapper around the `Spinner` primitive. Maps `variant` to color tokens.

- `size`: `'sm'` | `'md'` | `'lg'` (passed to Spinner).
- `variant`: `'primary'` (`$color10`) | `'light'` (`$color4`) | `'dark'` (`$color11`).

> **TypeScript is the source of truth for props.** See `Loader.tsx` for the full typed API.

---

## 4. Behavior

### States

Non-interactive. Passive loading indicator.

### Keyboard Interaction

None.

### Motion

Inherits Spinner's rotation animation. Must respect `prefers-reduced-motion`.

---

## 5. Accessibility

- Inherits Spinner's `role="status"` and `aria-label="Loading"`.
- Consumer should provide context-specific `aria-label` if the loading context is more specific.

---

## 6. Styling

- **Design tokens used:** `$color10` (primary), `$color4` (light), `$color11` (dark).
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Page sections, card bodies, dialog contents.
- **What this component can contain:** Nothing — delegates to Spinner.
- **Anti-patterns:** Do not use without an accompanying screen reader loading announcement if Spinner's default is insufficient.

---

## 8. Breaking Change Criteria

- Removing a variant.
- Removing a size option.
- Removing delegation to Spinner (changing the rendered output).

---

## 9. Test Requirements

- **Behavioral tests:** Verify each variant maps to correct color token. Verify each size is forwarded to Spinner. Verify Spinner is rendered.
- **Accessibility tests:** Verify `role="status"` and `aria-label` are present (inherited from Spinner).
