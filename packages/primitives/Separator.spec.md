# Component Spec — Separator

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Semantic separator between content sections with proper ARIA attributes.
- Use when content boundaries need to be communicated to both visual users and assistive technology.
- Do NOT use for purely decorative lines without semantic meaning — use Divider instead, or set `decorative` to true.

---

## 2. UX Intent

- **Gestalt Principles** — establishes explicit boundaries between content groups.
- **Jakob's Law** — horizontal/vertical separators follow standard web patterns for content division.

---

## 3. Anatomy

Single element — `styled(View)` with `role="separator"` built in. Includes orientation and decorative variants.

- `orientation`: `'horizontal'` (default) | `'vertical'`.
- `decorative`: `true` | `false` — when true, sets `accessibilityRole: 'none'` to hide from assistive technology.

> **TypeScript is the source of truth for props.** See `SeparatorProps` in `Separator.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive. No hover, focus, active, or disabled states.

### Keyboard Interaction

None — Separator is not focusable.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** Renders `<div>` with `role="separator"` (built into the component).
- **ARIA attributes:**
  - `role="separator"` applied by default.
  - `aria-orientation` set to match the `orientation` variant.
  - When `decorative` is true, `accessibilityRole: 'none'` overrides the separator role.
- **Screen reader announcements:** Announced as a separator with orientation, helping users understand content structure.

---

## 6. Styling

- **Design tokens used:**
  - `backgroundColor: '$borderColor'`
  - `flexShrink: 0`
  - Horizontal: `height: 1`, `width: '100%'`
  - Vertical: `width: 1`, `height: '100%'`
- **Dark mode:** `$borderColor` resolves automatically.

---

## 7. Composition

- **What can contain this component:** Any layout container (VStack, HStack, Box, Card).
- **What this component can contain:** Nothing — leaf element.
- **Anti-patterns:** Do not use semantic Separator for purely decorative lines when no assistive technology announcement is desired — use `decorative` prop or Divider.

---

## 8. Breaking Change Criteria

- Removing `role="separator"` default.
- Removing `decorative` variant.
- Changing default orientation from `horizontal`.
- Removing `aria-orientation` attribute.

---

## 9. Test Requirements

- **Behavioral tests:** Verify horizontal renders full-width 1px line. Verify vertical renders full-height 1px line. Verify default orientation is horizontal.
- **Accessibility tests:** Verify `role="separator"` is in the DOM. Verify `aria-orientation` matches the orientation prop. Verify `decorative` removes the separator role. Verify not focusable.
