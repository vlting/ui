# Component Spec — Stack (VStack, HStack)

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Directional flex layout containers: `VStack` (vertical/column), `HStack` (horizontal/row), `Stack` (alias for VStack).
- Use as the primary layout primitives for arranging children in a single direction.
- Do NOT use when a non-flex layout is needed (use Box or a custom layout). Do NOT use for grid-like layouts.

---

## 2. UX Intent

- **Gestalt Principles** — enforces proximity and alignment, ensuring related items are grouped through consistent direction and spacing.
- **Jakob's Law** — vertical stacking for lists/forms and horizontal stacking for toolbars/navigation follow established conventions.

---

## 3. Anatomy

Three exports, no custom variants or base styles beyond Tamagui defaults:
- `VStack` — `styled(YStack)` with `flexDirection: 'column'`
- `HStack` — `styled(XStack)` with `flexDirection: 'row'`
- `Stack` — direct reference to VStack (not a wrapper)

> **TypeScript is the source of truth for props.** See `Stack.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive. No hover, focus, active, or disabled states.

### Keyboard Interaction

None — not focusable by default.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** Renders `<div>` (Tamagui default). Consumers must set `accessibilityRole` when the stack serves a semantic purpose (`navigation`, `toolbar`, `list`, `group`).
- **ARIA attributes:** None by default. Consumer-provided roles and labels are forwarded.

---

## 6. Styling

- **Design tokens used:** Inherits all Tamagui stack style props. All spacing and sizing must use tokens.
- **Responsive behavior:** Supports all Tamagui responsive and media-query props.
- **Dark mode:** Fully compatible — no default colors applied.

---

## 7. Composition

- **What can contain this component:** Any layout component (Box, another Stack, ScrollView, Card, Section).
- **What this component can contain:** Any combination of components. General-purpose layout containers.
- **Anti-patterns:** Do not nest VStack > VStack > VStack when a single VStack with `gap` suffices. Do not use Stack (the alias) when explicit direction matters for code clarity.

---

## 8. Breaking Change Criteria

- Removing `VStack`, `HStack`, or `Stack` exports.
- Changing `Stack` from aliasing `VStack`.
- Adding default styles that override consumer expectations (e.g., default padding).

---

## 9. Test Requirements

- **Behavioral tests:** Verify VStack renders with `flexDirection: 'column'`. Verify HStack renders with `flexDirection: 'row'`. Verify Stack is the same reference as VStack. Verify `gap`/`padding`/`alignItems` props are forwarded.
- **Accessibility tests:** Verify no role is set by default. Verify consumer-applied `accessibilityRole` and `accessibilityLabel` are forwarded.
