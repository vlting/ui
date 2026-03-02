# Component Spec — InputGroup

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Group an input with addons (text labels, icons, buttons) into a visually connected unit with border-radius collapsing
- When to use: URL inputs with protocol addon, search with icon, inputs with action buttons, phone number with country code
- When NOT to use: Simple label + input (use Input), multiple unrelated inputs (use a form layout)

---

## 2. UX Intent

- **Primary interaction goal:** Present related input elements as a single cohesive unit
- **Expected user mental model:** A single field with attached decorations
- **UX laws applied:**
  - **Jakob's Law** — follows familiar input group patterns from Bootstrap, Material UI, and similar systems
  - **Gestalt Principles** — proximity and common region group the elements visually
  - **Fitts's Law** — addons extend the visual target area of the input

---

## 3. Anatomy

- `InputGroup` (Root) — wrapper with CSS border-radius collapsing and size context
- `InputGroup.Addon` — bordered slot for static text, icons, or labels
- `InputGroup.Element` — absolutely positioned overlay element inside the input (e.g., search icon)
- `InputGroup.Input` — thin wrapper for the input component, forwards size context

> **TypeScript is the source of truth for props.** See `InputGroupProps`, `InputGroupAddonProps`, `InputGroupElementProps`, `InputGroupInputProps` in `InputGroup.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Default** — children rendered with border-radius collapsing applied via CSS
- **Orientation** — horizontal (row) or vertical (column) layout

### Keyboard Interaction

N/A — InputGroup itself is not interactive. Children (Input, buttons) handle their own keyboard behavior.

### Motion

N/A — no animations.

---

## 5. Accessibility

- **Semantic element:** Root renders a `role="group"` container
- **ARIA attributes:** Accepts `aria-label` on Root for screen reader context
- **Focus management:** Handled by child components (Input, buttons)
- **Screen reader announcements:** Group label announced when focus enters the group
- **Contrast:** Addon background uses `$color3` token — must meet WCAG 1.4.11 for non-text contrast (3:1)

---

## 6. Styling

- **Design tokens used:** `$color3` (addon background), `$borderColor`, `$3`/`$4`/`$5` (border-radius per size)
- **Responsive behavior:** Adapts via orientation prop; width follows content
- **Reduced motion:** N/A (no animations)
- **Dark mode:** Fully token-driven, adapts automatically

---

## 7. Composition

- **What can contain this component:** Form layouts, Field components, any container
- **What this component can contain:** InputGroup.Addon, InputGroup.Element, InputGroup.Input, Input, Button, or other form elements
- **Anti-patterns:** Nesting InputGroups, using without any Input child

---

## 8. Breaking Change Criteria

- Removing or renaming a sub-component (Addon, Element, Input)
- Changing the size context API
- Changing the border-radius collapsing CSS class names
- Removing `role="group"` from Root

---

## 9. Test Requirements

- **Behavioral tests:**
  - Root renders children without crash
  - Addon + Input combination renders
  - Element overlay renders
  - Size context propagates (sm, md, lg)
  - Horizontal and vertical orientations render
  - Optional sub-components can be omitted
- **Accessibility tests:** Root has `role="group"`, accepts `aria-label`
- **Visual regression:** N/A (CSS injection tested in browser)
