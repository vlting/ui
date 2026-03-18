# Component Spec — Separator

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Visual divider between content sections.
- Re-exports the stl-react Separator primitive.

---

## 2. Anatomy

Single `<hr>` element with orientation variant (horizontal/vertical).

> **TypeScript is the source of truth for props.** See `SeparatorProps` in `stl-react/src/primitives/Separator/Separator.tsx`.

---

## 3. Accessibility

- `role="separator"` by default. `role="none"` when `decorative` is true.
- `aria-orientation` set to match orientation prop when not decorative.

---

## 4. Test Requirements

- Renders `<hr>` element.
- Has `role="separator"` by default, `role="none"` when decorative.
- Accepts orientation prop.
