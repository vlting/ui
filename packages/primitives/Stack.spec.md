# Component Spec — Stack

## 1. Purpose

- Provides directional flex layout containers: VStack (vertical), HStack (horizontal), and Stack (alias for VStack).
- Should be used as the primary layout primitives for arranging children in a single direction with consistent spacing and alignment.
- Should NOT be used when a non-flex layout is needed (use Box or a custom layout).
- Should NOT be used when the layout direction is unknown at compile time; consider conditional rendering of VStack/HStack instead.

---

## 2. UX Intent

- Primary interaction goal: establish predictable, direction-aware layout that communicates visual structure to the user.
- Expected user mental model: VStack stacks children top-to-bottom; HStack stacks children left-to-right. Stack defaults to vertical. These map directly to CSS flexbox `column` and `row` directions.
- **Gestalt Principles (2.4):** Stack components enforce proximity and alignment, ensuring related items are grouped and visually connected through consistent direction and spacing.
- **Jakob's Law (2.1):** Vertical stacking for lists/forms and horizontal stacking for toolbars/navigation follow established conventions that users expect.
- **Predictability (3.4):** The naming convention (VStack = vertical, HStack = horizontal) removes ambiguity and ensures consistent usage across the codebase.

---

## 3. Visual Behavior

- Layout rules:
  - VStack / Stack: `flexDirection: 'column'` (Tamagui YStack default).
  - HStack: `flexDirection: 'row'` (Tamagui XStack default).
  - No additional base styles are applied. Layout behavior is pure Tamagui YStack/XStack.
- Spacing expectations: no default gap, padding, or margin. Consumers control spacing via `gap`, `padding`, `margin`, and other Tamagui space-token props.
- Typography rules: not applicable (layout containers).
- Token usage: all spacing and sizing must use Tamagui tokens. No hardcoded values.
- Responsive behavior: supports all Tamagui responsive and media-query props. Consumers can change alignment, gap, padding, and other layout properties at different breakpoints.

---

## 4. Interaction Behavior

- States: Stack components are non-interactive by default. They have no hover, focus, active, disabled, loading, or error states.
- Controlled vs uncontrolled: not applicable (stateless).
- Keyboard behavior: not focusable by default. If the consumer adds interactive props, Tamagui's built-in states apply.
- Screen reader behavior: invisible to assistive technology unless the consumer sets `accessibilityRole` (e.g., `navigation`, `toolbar`, `list`).
- Motion rules: no motion. Any layout animations must be added by the consumer and must respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA requirements: no default role. Consumers must set `accessibilityRole` when the stack serves a semantic purpose:
  - `navigation` for nav bars.
  - `toolbar` for action bars.
  - `list` for semantic lists (paired with `listitem` on children).
  - `group` for generic grouping.
- Focus rules: not in the tab order unless the consumer explicitly makes it interactive.
- Contrast expectations: not applicable for the container itself. Children must meet contrast requirements.
- Reduced motion behavior: not applicable (no inherent animation).

---

## 6. Theming Rules

- Required tokens: none by default. Consumer-applied styles must use Tamagui tokens.
- Prohibited hardcoded values: no raw hex colors, pixel spacing, or pixel sizing.
- Dark mode expectations: fully compatible. Stack components apply no color by default; theme adaptation is handled by children and consumer-applied tokens.

---

## 7. Composition Rules

- What can wrap it: any layout component (Box, another Stack, ScrollView, Card, Section).
- What it may contain: any combination of components. Stack components are general-purpose layout containers.
- Anti-patterns:
  - Do not use VStack when HStack is needed (and vice versa). Choose the correct direction explicitly.
  - Do not nest deeply (e.g., VStack > VStack > VStack) when a single VStack with `gap` would achieve the same layout.
  - Do not use Stack (the alias) if the direction matters for code clarity; prefer the explicit VStack or HStack.
  - Do not rely on Stack for grid-like layouts; use a dedicated grid component or CSS grid approach.

---

## 8. Performance Constraints

- Memoization rules: do not memoize by default. Stack components are thin styled wrappers with no internal logic.
- Virtualization: Stack itself is not virtualized. For long lists of children, consumers should use a virtualized list component rather than rendering all items inside a Stack.
- Render boundaries: Stack does not establish a React error boundary or Suspense boundary.

---

## 9. Test Requirements

- What must be tested:
  - VStack renders with `flexDirection: 'column'`.
  - HStack renders with `flexDirection: 'row'`.
  - Stack is the same reference as VStack (identity check).
  - No default styles beyond the flex direction are applied.
  - Consumer-applied `gap`, `padding`, `alignItems`, and other layout props are forwarded correctly.
- Interaction cases: not applicable (non-interactive).
- Accessibility checks:
  - No role is set by default.
  - Consumer-applied `accessibilityRole` and `accessibilityLabel` are forwarded.
  - VStack, HStack, and Stack are not focusable by default.
