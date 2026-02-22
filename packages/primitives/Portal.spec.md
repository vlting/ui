# Component Spec — Portal

## 1. Purpose

- Renders children outside the normal component tree, typically at the document root on web or an equivalent overlay layer on native.
- Should be used for modals, tooltips, popovers, dropdowns, toast notifications, and any content that must visually escape its parent's overflow or stacking context.
- Should NOT be used for standard in-flow content that belongs within its parent layout.
- Should NOT be used as a general-purpose wrapper; it introduces a separate DOM mount point and must be used intentionally.

---

## 2. UX Intent

- Primary interaction goal: allow overlay content to render above all other content without being clipped by ancestor overflow or z-index constraints.
- Expected user mental model: content placed in a Portal "teleports" to the top of the visual stack, appearing in front of everything else while remaining logically part of the component that owns it.
- **Predictability (3.4):** Portal content must behave consistently regardless of where it is invoked in the component tree. The user's mental model of "this content floats above the page" must hold true.
- **Tesler's Law (2.6):** Portal absorbs the complexity of managing mount targets and z-index stacking so that consumers do not need to reason about overflow clipping or stacking contexts.

---

## 3. Visual Behavior

- Layout rules: Portal itself adds no wrapper element and applies no layout styles. The visual behavior of portal content is entirely determined by its children.
- Spacing expectations: none. Portal does not affect spacing.
- Typography rules: not applicable.
- Token usage: not applicable. Portal does not apply any styles.
- Responsive behavior: not applicable at the Portal level. Children rendered through the Portal retain their own responsive behavior.

---

## 4. Interaction Behavior

- States: Portal has no interactive states. It is a structural utility, not a visual component.
- Controlled vs uncontrolled: not applicable (stateless pass-through).
- Keyboard behavior: Portal itself does not manage focus. Consumers are responsible for focus trapping (e.g., in modals) and focus restoration when portal content is dismissed.
- Screen reader behavior: portal content is part of the DOM and will be read by screen readers in document order. Consumers must manage focus and `aria-live` announcements to ensure portaled content is discovered by assistive technology at the appropriate time.
- Motion rules: not applicable at the Portal level. Children may animate, and those animations must respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA requirements: Portal does not set any ARIA attributes. Consumers must:
  - Set appropriate roles on portal content (e.g., `role="dialog"` for modals, `role="tooltip"` for tooltips).
  - Manage `aria-modal`, `aria-labelledby`, `aria-describedby` as needed.
- Focus rules:
  - Portal does not trap or manage focus. Focus trapping for modal-like content is the consumer's responsibility.
  - When portal content is dismissed, focus must be returned to the triggering element (consumer responsibility).
- Contrast expectations: not applicable at the Portal level; contrast requirements apply to the children.
- Reduced motion behavior: not applicable at the Portal level.

---

## 6. Theming Rules

- Required tokens: none. Portal does not render any styled element.
- Prohibited hardcoded values: not applicable.
- Dark mode expectations: portal content inherits the active Tamagui theme context. Theme switching must work correctly for portaled content.

---

## 7. Composition Rules

- What can wrap it: any component. Portal can be placed anywhere in the component tree; its children will render at the mount target regardless.
- What it may contain: any React node. Typically contains overlay components (Modal, Tooltip, Popover, DropdownMenu, Toast).
- Anti-patterns:
  - Do not use Portal for in-flow content that does not need to escape its parent's stacking context.
  - Do not nest Portal within Portal unless there is a specific layering need (each Portal creates a separate mount point).
  - Do not assume portal content will inherit layout styles from the parent (it will not, since it is mounted elsewhere in the DOM).

---

## 8. Performance Constraints

- Memoization rules: do not memoize Portal. It is a trivial wrapper. Memoize the children if they are expensive to render.
- Virtualization: not applicable.
- Render boundaries: Portal does not establish a React error boundary. However, portal content is mounted in a separate DOM subtree, which can affect React event bubbling on web.

---

## 9. Test Requirements

- What must be tested:
  - Children are rendered outside the parent component's DOM subtree (on web, verify the mount target).
  - No wrapper element is added around children.
  - Portal does not apply any styles or accessibility attributes.
  - Multiple Portals can coexist without interference.
- Interaction cases:
  - Focus management must be verified at the consumer level (not in Portal itself, but in components that use Portal such as Modal or Tooltip).
- Accessibility checks:
  - Portal does not add any unexpected ARIA roles or attributes.
  - Screen reader order is correct for portaled content.
  - Theme context is preserved for portaled children.
