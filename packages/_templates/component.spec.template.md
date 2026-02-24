# Component Spec — {ComponentName}

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- What this component is for
- When to use it (expected use cases)
- When NOT to use it (anti-patterns, wrong tool for the job)

---

## 2. UX Intent

- **Primary interaction goal:** What the user is trying to accomplish
- **Expected user mental model:** How the user thinks about this element
- **UX laws applied:** Cite only those relevant to this component
  - **Jakob's Law** — follows familiar patterns from similar products
  - **Fitts's Law** — interactive targets are appropriately sized
  - **Hick's Law** — choices are clear and limited
  - **Gestalt Principles** — grouping, proximity, alignment
  - **Miller's Law** — chunked information within working memory limits
  - **Tesler's Law** — complexity is managed by the component, not the user
  - **Doherty Threshold** — feedback appears within 400ms
  - **Peak-End Rule** — completion and error states are handled well

---

## 3. Anatomy

- Sub-components and their roles (e.g., `Button.Text`, `Button.Icon`)
- Required vs optional parts
- Relationship between sub-components

> **TypeScript is the source of truth for props.** See `{ComponentName}Props` in `{ComponentName}.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

List all states the component can be in and describe the visual + functional behavior for each:

- **Idle** — default appearance
- **Hover** — visual feedback on mouse over
- **Focus** — visible focus indicator (see QUALITY_BASELINE.md for standard)
- **Active (press)** — feedback during activation
- **Disabled** — non-interactive appearance and behavior
- **Loading** — in-progress state (if applicable)
- **Error** — invalid or failed state (if applicable)

### Keyboard Interaction

- Which keys do what (Tab, Enter, Space, Escape, Arrow keys)
- Reference WAI-ARIA APG pattern if applicable: https://www.w3.org/WAI/ARIA/apg/patterns/
- Controlled vs uncontrolled behavior (if applicable)

### Motion

- What animates and why (state transitions, micro-interactions)
- `prefers-reduced-motion` behavior

---

## 5. Accessibility

- **Semantic element:** Which HTML element is rendered and why
- **ARIA attributes:** Required attributes with rationale (only when native semantics are insufficient)
- **Focus management:** Where focus goes on open/close/error, return focus behavior
- **Screen reader announcements:** What is announced, in what order
- **Contrast:** Reference QUALITY_BASELINE.md for standard ratios; note any component-specific contrast considerations

---

## 6. Styling

- **Design tokens used:** Which token categories and specific tokens (color, space, radius, font)
- **Responsive behavior:** How the component adapts across breakpoints
- **Reduced motion:** How animations degrade with `prefers-reduced-motion`
- **Dark mode:** Any dark-mode-specific considerations beyond standard token resolution

---

## 7. Composition

- **What can contain this component:** Parent contexts where this component is valid
- **What this component can contain:** Valid children and nested elements
- **Anti-patterns:** Invalid or discouraged compositions

---

## 8. Breaking Change Criteria

What constitutes a breaking change for this component:

- Removing or renaming a prop
- Changing a prop's type signature
- Changing the rendered HTML element
- Removing keyboard interaction
- Changing ARIA semantics
- Removing a sub-component

---

## 9. Test Requirements

- **Behavioral tests:** What to assert about rendering, state changes, and callbacks
- **Accessibility tests:** ARIA attributes, keyboard interaction, focus management
- **Visual regression:** Key states to capture (if applicable)
