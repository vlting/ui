# Component Spec — Spacer

## 1. Purpose

- Provides controlled whitespace between elements within flex containers, either as a flexible expander or as a fixed-size gap.
- Should be used to push elements apart in a flex layout (e.g., pushing a button to the far end of a toolbar) or to insert consistent, token-based spacing between siblings.
- Should NOT be used as a general-purpose margin/padding mechanism; prefer spacing props on the container or `gap` when uniform spacing is needed.
- Should NOT be used to create vertical spacing between block-level sections (prefer margin tokens on the sections themselves or a layout component with `gap`).

---

## 2. UX Intent

- Primary interaction goal: create predictable, consistent whitespace that reinforces visual hierarchy and grouping.
- Expected user mental model: an invisible element that "pushes" siblings apart. Without a `size` prop, it expands to fill available space. With a `size` prop, it creates a fixed gap.
- **Gestalt Principles (2.4):** Spacer enforces the principle of proximity by controlling the distance between elements, helping users perceive which items are grouped and which are separate.
- **Aesthetic-Usability Effect (2.8):** Consistent spacing contributes to a polished visual appearance, which users perceive as more usable and trustworthy.

---

## 3. Visual Behavior

- Layout rules:
  - Default (no `size`): `flex: 1` causes the spacer to expand and fill remaining space in the flex container. Direction depends on the parent's flex direction.
  - With `size`: `flex: 0` with explicit `width` and `height` set to the same space token, creating a fixed square gap.
- Spacing expectations: the spacer itself IS the spacing. No additional margin or padding.
- Typography rules: not applicable (Spacer does not render text or visible content).
- Token usage: size variants map to space tokens (`$0.5`, `$1`, `$2`, `$4`, `$6`). No hardcoded pixel values.
- Responsive behavior: supports Tamagui responsive and media-query props. Consumers can change the `size` variant at different breakpoints.

---

## 4. Interaction Behavior

- States: Spacer is non-interactive. It has no hover, focus, active, disabled, loading, or error states.
- Controlled vs uncontrolled: not applicable (stateless).
- Keyboard behavior: not focusable. Must never appear in the tab order.
- Screen reader behavior: invisible to assistive technology. Spacer is purely presentational and must not be announced.
- Motion rules: no motion. Spacers must not animate.

---

## 5. Accessibility Requirements

- ARIA requirements: no role is set. Spacer is a presentational element and must remain invisible to the accessibility tree.
- Focus rules: must never receive focus.
- Contrast expectations: not applicable (no visible rendering).
- Reduced motion behavior: not applicable (no animation).

---

## 6. Theming Rules

- Required tokens: space tokens (`$0.5`, `$1`, `$2`, `$4`, `$6`) for the size variants.
- Prohibited hardcoded values: no raw pixel dimensions for spacing.
- Dark mode expectations: not applicable (Spacer has no color). No visual change between themes.

---

## 7. Composition Rules

- What can wrap it: any flex container (HStack, VStack, Stack, Box with flex layout).
- What it may contain: nothing. Spacer is a leaf element and must not accept or render children.
- Anti-patterns:
  - Do not use Spacer outside a flex container; the flexible behavior and fixed dimensions only make sense within flexbox.
  - Do not chain multiple Spacers when a single Spacer with the correct `size` or a container `gap` would suffice.
  - Do not use Spacer for visual decoration (e.g., colored blocks); it must remain invisible.

---

## 8. Performance Constraints

- Memoization rules: do not memoize. Spacer is a trivial styled view with no internal logic.
- Virtualization: not applicable.
- Render boundaries: Spacer does not establish a React error boundary or Suspense boundary.

---

## 9. Test Requirements

- What must be tested:
  - Default behavior (no `size`): renders with `flex: 1`.
  - Each size variant (`xs`, `sm`, `md`, `lg`, `xl`) renders with `flex: 0` and the correct width/height token values.
  - Does not render any visible content or children.
  - Inherits and forwards Tamagui View style props.
- Interaction cases: not applicable (non-interactive).
- Accessibility checks:
  - No role is set.
  - Not focusable.
  - Invisible to screen readers.
