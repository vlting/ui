# Component Spec — Spacer

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Controlled whitespace between elements — either flexible (fills available space) or fixed (explicit size).
- Use to push elements apart in flex layouts or insert consistent, token-based spacing between siblings.
- Do NOT use as a general-purpose margin/padding mechanism — prefer spacing props on the container or `gap`.
- Do NOT use to create vertical spacing between block-level sections — prefer margin tokens on the sections themselves.

---

## 2. UX Intent

- **Gestalt Principles** — enforces the principle of proximity by controlling distance between elements, helping users perceive grouping.

---

## 3. Anatomy

Single element — `styled(View)` with size variants. No sub-components. Leaf element — must not accept children.

- Default (no size): `flex: 1` — expands to fill available space.
- Size variants set `flex: 0` with explicit width and height from space tokens.

> **TypeScript is the source of truth for props.** See `Spacer.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive. No hover, focus, active, or disabled states.

### Keyboard Interaction

None — must never appear in the tab order.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** Renders `<div>`. Purely presentational.
- **ARIA attributes:** None. Invisible to the accessibility tree.
- **Screen reader announcements:** None — Spacer should not be announced.

---

## 6. Styling

- **Design tokens used:**
  - `xs`: `$0.5` (width and height)
  - `sm`: `$1`
  - `md`: `$2`
  - `lg`: `$4`
  - `xl`: `$6`
- **Responsive behavior:** Flex spacer adapts with container. Fixed sizes are constant. Supports Tamagui responsive props.
- **Dark mode:** Not applicable — no visual appearance.

---

## 7. Composition

- **What can contain this component:** Any flex container (HStack, VStack, Stack, Box with flex layout).
- **What this component can contain:** Nothing — Spacer is a leaf element.
- **Anti-patterns:** Do not use outside a flex container. Do not chain multiple Spacers when a single Spacer with the correct `size` or a container `gap` would suffice.

---

## 8. Breaking Change Criteria

- Removing a size variant.
- Changing default behavior from `flex: 1`.
- Changing the token mapping for any size.

---

## 9. Test Requirements

- **Behavioral tests:** Verify default renders with `flex: 1`. Verify each size variant (`xs`–`xl`) renders with `flex: 0` and correct width/height token values. Verify no children are rendered.
- **Accessibility tests:** Verify no role is set. Verify not focusable. Verify invisible to screen readers.
