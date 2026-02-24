# Component Spec — AspectRatio

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Constrains children to a specific aspect ratio using the padding-bottom technique.
- Use when embedding media (images, videos, maps) that must maintain proportions regardless of container width.
- Do NOT use for fixed-size elements. Do NOT use when the native aspect-ratio CSS property is sufficient and browser support permits.

---

## 2. UX Intent

- **Gestalt Principles** — maintains consistent visual proportions across varying viewport widths, preventing layout shift.
- Pure layout utility — no direct user interaction.

---

## 3. Anatomy

Plain React function component (not a Tamagui styled component). Renders two native `<div>` elements:
- Outer div: `position: relative`, `width: 100%`, `paddingBottom` calculated from ratio.
- Inner div: `position: absolute`, inset 0, contains children.

- `ratio`: number (default: 1). Width-to-height ratio (e.g., 16/9 = 1.778).
- `style`: optional `CSSProperties` applied to the outer div.

> **TypeScript is the source of truth for props.** See `AspectRatioProps` in `AspectRatio.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive. No hover, focus, active, or disabled states.

### Keyboard Interaction

None.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** Renders `<div>`. Purely presentational.
- **ARIA attributes:** None. Consumer must add roles/labels if children are meaningful (e.g., an image with `alt` text).
- **Screen reader announcements:** None from AspectRatio itself.

---

## 6. Styling

- **Design tokens used:** None — uses inline CSS styles, not Tamagui tokens. This is intentional: the padding-bottom technique requires percentage values that don't map to the token scale.
- **Responsive behavior:** Width follows container (100%). Aspect ratio is constant unless `ratio` prop changes.
- **Dark mode:** Not applicable — no visual appearance beyond children.
- **Cross-platform note:** Uses native HTML `<div>` and CSS — web-only. A React Native alternative would need a different implementation.

---

## 7. Composition

- **What can contain this component:** Any layout container.
- **What this component can contain:** Typically a single child (image, video, iframe, map) that fills the ratio container.
- **Anti-patterns:** Do not nest AspectRatio within AspectRatio. Do not use for non-media content that should flow naturally.

---

## 8. Breaking Change Criteria

- Changing the default ratio from 1.
- Changing the rendered element structure (two-div technique).
- Adding Tamagui styled system dependency (would change prop API).

---

## 9. Test Requirements

- **Behavioral tests:** Verify default ratio produces a square (paddingBottom: 100%). Verify custom ratios (16/9, 4/3) produce correct paddingBottom. Verify children render inside the inner absolute container. Verify consumer `style` prop is applied to outer div.
- **Accessibility tests:** Verify no implicit ARIA attributes are added.
