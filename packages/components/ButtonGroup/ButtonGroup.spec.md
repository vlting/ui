# Component Spec — ButtonGroup

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Groups related buttons into a visually connected set with collapsed borders.
- Use for toggle groups, action sets, and segmented controls where buttons share context.
- Do NOT use for unrelated buttons (use individual Buttons with spacing).

---

## 2. UX Intent

- **Gestalt Principles** — grouping buttons into a connected visual unit communicates that the actions are related.
- **Fitts's Law** — collapsed borders create a larger combined target area.

---

## 3. Anatomy

Single container component rendering a View with injected CSS:
- `ButtonGroup` (Root) — inline-flex container with `orientation` prop.
- Children: Button components (styling adjusted via injected CSS).

Props: `orientation` (`'horizontal'` | `'vertical'`).

CSS injection removes border-radius from middle buttons, collapses borders with -1px margin.

> **TypeScript is the source of truth for props.** See source files in `ButtonGroup/` for the full typed API.

---

## 4. Behavior

### States

ButtonGroup itself is non-interactive. Child Buttons handle their own states.

### Keyboard Interaction

Tab moves between child buttons. Each button handles its own activation (Enter/Space).

### Motion

None at the group level.

---

## 5. Accessibility

- **Semantic element:** Renders `<div>` with flex layout.
- **ARIA attributes:** Consumer should add `role="group"` and `aria-label` to describe the button set.
- **Focus management:** Standard tab navigation through child buttons.

---

## 6. Styling

- **Design tokens used:** Inherits Tamagui View tokens. CSS injection modifies child button border-radius and margins.
- **Orientation:** Horizontal (default) — buttons side by side. Vertical — buttons stacked.
- **Dark mode:** Inherits from child button tokens.

---

## 7. Composition

- **What can contain this component:** Toolbars, form actions, card footers.
- **What this component can contain:** Button components only.
- **Anti-patterns:** Do not mix different button variants within a group without design intent. Do not use for non-button children.

---

## 8. Breaking Change Criteria

- Removing orientation support.
- Changing the CSS injection approach (border collapsing behavior).
- Changing the container layout from inline-flex.

---

## 9. Test Requirements

- **Behavioral tests:** Verify horizontal layout renders buttons side by side. Verify vertical layout stacks buttons. Verify border-radius is removed from middle buttons. Verify border collapsing (-1px margin).
- **Accessibility tests:** Verify consumer `role="group"` and `aria-label` are forwarded. Verify tab navigation through child buttons.
