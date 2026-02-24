# Component Spec — Portal

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Renders children outside the normal component tree, typically at the document root on web or an equivalent overlay layer on native.
- Use for modals, tooltips, popovers, dropdowns, toast notifications, and any content that must visually escape its parent's overflow or stacking context.
- Do NOT use for standard in-flow content. Do NOT use as a general-purpose wrapper.

---

## 2. UX Intent

- **Tesler's Law** — Portal absorbs the complexity of managing mount targets and z-index stacking so consumers do not need to reason about overflow clipping or stacking contexts.
- Content placed in a Portal "teleports" to the top of the visual stack while remaining logically part of the owning component.

---

## 3. Anatomy

Thin wrapper around Tamagui's `Portal` component. No additional elements, styling, or behavior. Accepts `children: React.ReactNode` only.

> **TypeScript is the source of truth for props.** See `Portal.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive. No states — Portal is a structural utility, not a visual component.

### Keyboard Interaction

None. Focus management is the responsibility of the portaled content (e.g., Dialog, Popover).

### Motion

None at the Portal level. Children may animate and must respect `prefers-reduced-motion`.

---

## 5. Accessibility

- **Semantic element:** No element rendered by Portal itself — children render directly into the portal target.
- **ARIA attributes:** None. Consumers must manage ARIA on the portaled content (`role="dialog"`, `aria-modal`, etc.).
- **Focus management:** Portal does not trap or manage focus. Consuming components are responsible for focus trapping and return focus on dismissal.

---

## 6. Styling

Portal applies no styling. All styling is the responsibility of children. Theme context is preserved for portaled children.

---

## 7. Composition

- **What can contain this component:** Any component that needs to render content outside the DOM tree.
- **What this component can contain:** Any React node — typically overlay components (Modal, Tooltip, Popover, Toast).
- **Anti-patterns:** Do not use for in-flow content. Do not nest Portal within Portal unless there is a specific layering need. Do not assume portal content will inherit layout styles from the parent DOM position.

---

## 8. Breaking Change Criteria

- Adding wrapper elements around children.
- Changing the portal target behavior (where content is appended).
- Adding styling that affects children layout.

---

## 9. Test Requirements

- **Behavioral tests:** Verify children render outside the parent component's DOM subtree. Verify no wrapper element is added. Verify multiple Portals can coexist.
- **Accessibility tests:** Verify no unexpected ARIA roles or attributes are added. Verify theme context is preserved for portaled children.
