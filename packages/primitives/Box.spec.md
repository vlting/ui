# Component Spec — Box

## 1. Purpose

- Provides a generic container primitive for grouping and positioning child elements.
- Should be used as the foundational building block when no semantic layout component (Stack, HStack, VStack) is more appropriate.
- Should NOT be used when a flex-direction-specific container (VStack/HStack) better communicates layout intent.
- Should NOT be used to wrap text content directly; use Text or Heading instead.

---

## 2. UX Intent

- Primary interaction goal: provide a transparent, zero-opinion container that inherits all Tamagui View capabilities without adding behavioral overhead.
- Expected user mental model: a `div` (web) or `View` (native) that can optionally center its content in one declaration.
- **Gestalt Principles (2.4):** Box enables proximity and grouping by allowing consumers to visually cluster related elements within a bounded container.
- **Tesler's Law (2.6):** The `centered` shorthand absorbs the complexity of remembering to set both alignment axes, reducing consumer-side boilerplate.

---

## 3. Visual Behavior

- Layout rules: renders as a block-level flex container per Tamagui View defaults. Does not impose any flex direction, size, or alignment unless the consumer specifies it.
- Spacing expectations: no default padding or margin. All spacing is consumer-controlled via Tamagui space tokens.
- Typography rules: not applicable (Box does not render text).
- Token usage: all style props must resolve through the Tamagui token system. No hardcoded values are present or permitted.
- Responsive behavior: supports all Tamagui media-query and responsive props. Layout adapts to breakpoints only when the consumer configures them.

---

## 4. Interaction Behavior

- States: Box is non-interactive by default. It has no idle, hover, focus, active, disabled, loading, or error states of its own. If the consumer adds `onPress` or similar handlers, Tamagui's built-in press/hover states apply.
- Controlled vs uncontrolled: not applicable (stateless).
- Keyboard behavior: not focusable by default. Focusability is inherited from underlying View when consumers add interactive props.
- Screen reader behavior: invisible to assistive technology unless the consumer sets `accessibilityRole`.
- Motion rules: no motion is applied. Any animation must be added by the consumer and must respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA requirements: no default role. Consumers must set `accessibilityRole` when the Box serves a semantic purpose (e.g., `region`, `group`, `banner`).
- Focus rules: not part of the tab order unless the consumer explicitly makes it interactive.
- Contrast expectations: not applicable for Box itself (no visual rendering by default). Children within the Box must meet WCAG contrast ratios.
- Reduced motion behavior: not applicable (no inherent animation).

---

## 6. Theming Rules

- Required tokens: none by default. All consumer-applied styles must use Tamagui tokens (`$color`, `$space`, `$size`, `$radius`).
- Prohibited hardcoded values: no raw hex colors, pixel spacing, or pixel font sizes may be applied to Box directly.
- Dark mode expectations: fully compatible. Since Box applies no color by default, dark/light mode behavior is determined entirely by its children and any consumer-applied theme tokens.

---

## 7. Composition Rules

- What can wrap it: any layout component (Stack, VStack, HStack, ScrollView, another Box).
- What it may contain: any combination of primitives, composed components, or raw content. Box places no restriction on children.
- Anti-patterns:
  - Do not nest Box within Box purely for centering when a single `centered` Box would suffice.
  - Do not use Box as a semantic replacement for components that have their own roles (e.g., do not use Box where a Card, Section, or Header is more appropriate).

---

## 8. Performance Constraints

- Memoization rules: do not memoize by default. Box is a thin styled wrapper and memoization would add overhead without benefit in most cases. Consumers may memoize at the usage site if profiling shows unnecessary re-renders.
- Virtualization: not applicable.
- Render boundaries: Box does not establish a React error boundary or Suspense boundary. It renders inline within the parent tree.

---

## 9. Test Requirements

- What must be tested:
  - Renders children correctly.
  - The `centered` variant applies both `alignItems: 'center'` and `justifyContent: 'center'`.
  - Without `centered`, no alignment styles are imposed.
  - Accepts and forwards all Tamagui View style props.
- Interaction cases: not applicable (non-interactive by default).
- Accessibility checks:
  - Does not set any role by default (verify no unexpected ARIA attributes).
  - Consumer-applied `accessibilityRole` and `accessibilityLabel` are forwarded.
