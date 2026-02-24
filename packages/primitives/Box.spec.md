# Component Spec — Box

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Generic non-interactive container for grouping and positioning child elements.
- Use as the foundational building block when no semantic layout component (Stack, HStack, VStack) is more appropriate.
- Do NOT use when a flex-direction-specific container (VStack/HStack) better communicates layout intent.
- Do NOT use to wrap text content directly — use Text or Heading instead.

---

## 2. UX Intent

- **Gestalt Principles** — enables proximity and grouping by clustering related elements within a bounded container.
- **Tesler's Law** — the `centered` shorthand absorbs the complexity of setting both alignment axes.

---

## 3. Anatomy

Single element — `styled(View)` with no sub-components.

- `centered` variant applies `alignItems: 'center'` and `justifyContent: 'center'` together.

> **TypeScript is the source of truth for props.** See `Box.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive. No hover, focus, active, or disabled states.

### Keyboard Interaction

None — Box does not receive focus.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** Renders `<div>` (Tamagui View default). Appropriate for generic grouping.
- **ARIA attributes:** None by default. Consumers must set `accessibilityRole` when the Box serves a semantic purpose (e.g., `region`, `group`).
- **Focus management:** Not in the tab order unless the consumer explicitly makes it interactive.

---

## 6. Styling

- **Design tokens used:** Inherits all Tamagui View style props. All consumer-applied styles must use tokens (`$color`, `$space`, `$size`, `$radius`).
- **Responsive behavior:** Standard Tamagui responsive props via media queries.
- **Dark mode:** Fully compatible — no default colors applied; dark/light behavior determined by children and consumer-applied tokens.

---

## 7. Composition

- **What can contain this component:** Any layout component (Stack, VStack, HStack, ScrollView, another Box).
- **What this component can contain:** Any combination of primitives, composed components, or raw content.
- **Anti-patterns:** Do not nest Box within Box purely for centering when a single `centered` Box would suffice. Do not use Box as a semantic replacement for Card, Section, or Header.

---

## 8. Breaking Change Criteria

- Removing the `centered` variant.
- Changing the rendered element from `<div>`.
- Removing inherited Tamagui View props.

---

## 9. Test Requirements

- **Behavioral tests:** Verify `centered` variant applies both `alignItems: 'center'` and `justifyContent: 'center'`. Verify without `centered`, no alignment styles are imposed. Verify children render correctly.
- **Accessibility tests:** Verify no role is set by default. Verify consumer-applied `accessibilityRole` and `accessibilityLabel` are forwarded.
