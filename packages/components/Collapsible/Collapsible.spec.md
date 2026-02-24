# Component Spec — Collapsible

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Single collapsible section with a trigger and expandable content.
- Use for show/hide patterns, expandable details, and content that should be hidden by default.
- Do NOT use when multiple sections need coordinated expand/collapse behavior (use Accordion).

---

## 2. UX Intent

- **Hick's Law** — hides secondary content to reduce initial visual complexity.
- **Tesler's Law** — manages open/close state internally.

---

## 3. Anatomy

Compound component wrapping Tamagui Collapsible primitives:
- `Collapsible` (Root) — state management. Props: `open`, `defaultOpen`, `onOpenChange`.
- `Collapsible.Trigger` — clickable element that toggles content (unstyled pass-through).
- `Collapsible.Content` — expandable content panel. Width constrained to 100%.

> **TypeScript is the source of truth for props.** See source files in `Collapsible/` for the full typed API.

---

## 4. Behavior

### States

- **Collapsed** — content hidden.
- **Expanded** — content visible.

### Keyboard Interaction

- **Space/Enter** — toggle the collapsible (delegated to Tamagui).

### Motion

Tamagui handles expand/collapse animation. Must respect `prefers-reduced-motion`.

---

## 5. Accessibility

- **ARIA attributes:** `role="region"` on content (delegated to Tamagui), `aria-expanded` on trigger.
- **Focus management:** Trigger is focusable. Content enters the tab order when expanded.

---

## 6. Styling

- **Design tokens used:** Minimal — resets Tamagui defaults. Content width: 100%.
- **Dark mode:** Inherits from parent context.

---

## 7. Composition

- **What can contain this component:** Settings panels, FAQ items, detail sections.
- **What this component can contain:** Trigger and Content sub-components.
- **Anti-patterns:** Do not use for multiple coordinated sections (use Accordion). Do not place critical content in collapsed state without clear indication it's expandable.

---

## 8. Breaking Change Criteria

- Removing sub-components (Trigger, Content).
- Removing controlled mode (`open`/`onOpenChange`).
- Removing keyboard support.

---

## 9. Test Requirements

- **Behavioral tests:** Verify toggle between collapsed and expanded. Verify `defaultOpen` renders expanded initially. Verify controlled mode (`open` prop). Verify `onOpenChange` callback fires.
- **Accessibility tests:** Verify `aria-expanded` toggles on trigger. Verify content is hidden when collapsed. Verify keyboard activation (Space/Enter).
