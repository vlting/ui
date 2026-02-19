# Component Spec — Stack

## 1. Purpose

Provides a foundational layout primitive for arranging children in a single axis (vertical or horizontal) with consistent spacing, alignment, and wrapping behavior using design system tokens.

Use it as the primary building block for composing component layouts — replacing ad-hoc margin, padding, and flex rules with a consistent, tokenized layout abstraction.

Do NOT use it for grid/multi-column layouts (use a Grid primitive), for complex two-dimensional layouts, or as a semantic content container (Stack has no semantic role).

---

## 2. UX Intent

- Primary interaction goal: none — Stack is a layout primitive with no direct user interaction.
- Expected user mental model: invisible structural scaffolding. Users are unaware of Stack as a component; they see only the content it arranges.
- UX laws applied:
  - Gestalt Law of Proximity: Stack's consistent `gap` token creates predictable spatial grouping, helping users understand which elements belong together.
  - Gestalt Law of Continuity: a vertical or horizontal Stack creates a clear visual line that guides the eye through content.
  - Tesler's Law: Stack absorbs the complexity of cross-platform flex layout so that consumers write one layout declaration instead of managing platform-specific styles.

---

## 3. Visual Behavior

- Layout:
  - Default: vertical stack (equivalent to `flexDirection: column`).
  - Horizontal variant: `flexDirection: row`.
  - `gap`: spacing between children using a space token (e.g., `$2`, `$4`, `$8`). No margin on individual children.
  - `wrap`: whether children wrap to a new line (boolean or token-based).
  - `align`: cross-axis alignment (start, center, end, stretch) — from a defined set of values.
  - `justify`: main-axis alignment (start, center, end, space-between, space-around) — from a defined set of values.
- Spacing: padding and gap use design token values. No hardcoded pixel values.
- Typography: Stack has no typography of its own. Children define their typography.
- Token usage: `gap` / `padding` / `margin` values use space tokens. No semantic color tokens.
- Responsive behavior: Stack supports responsive prop values for `direction`, `gap`, `align`, and `justify` at defined breakpoints (using the design system's media query token keys).

---

## 4. Interaction Behavior

- States: none. Stack is a non-interactive layout container.
- Controlled vs uncontrolled: not applicable.
- Keyboard behavior: not focusable. Tab order is determined by the order of children and the standard DOM/native order.
- Screen reader behavior: Stack renders as a generic container (equivalent to a `<div>` or `<View>`). It does not introduce any semantic roles. Screen readers traverse children in source order.
- Motion rules: Stack itself has no animations. Children manage their own animations.

---

## 5. Accessibility Requirements

- ARIA requirements: none. Stack must not add any ARIA roles or attributes. If the content requires semantic grouping, the consumer provides an appropriate semantic wrapper (e.g., `<section>`, `<nav>`, `<ul>`).
- Focus rules: Stack is not focusable. Tab order follows DOM/native child order.
- Contrast expectations: Stack has no visual surface or text. No contrast requirements at the container level.
- Reduced motion behavior: not applicable.

---

## 6. Theming Rules

- Required tokens: space tokens (for `gap`, `padding`, `margin` props).
- Prohibited hardcoded values: no raw pixel values for spacing. No hardcoded flex values that bypass token-based sizing.
- Dark mode expectations: Stack itself is transparent/no-background. It has no theme-dependent appearance.

---

## 7. Composition Rules

- What can wrap it: any layout context — pages, cards, dialogs, form sections, list items.
- What it may contain: any combination of design system components or primitive elements. Children are agnostic to the Stack container.
- Anti-patterns:
  - Do not use Stack as a semantic container (it adds no meaning; use `<section>`, `<nav>`, etc. when semantics are needed).
  - Do not apply hardcoded margin to Stack children — use the `gap` prop on the Stack instead.
  - Do not use Stack for two-dimensional layouts — use a Grid primitive.
  - Do not nest Stacks unnecessarily deep when a single Stack with adjusted alignment can achieve the same layout.

---

## 8. Performance Constraints

- Memoization rules: Stack itself is lightweight and rarely needs memoization. Memoize the parent component that renders a Stack with many children, not the Stack itself.
- Virtualization: not applicable. Virtualization is handled by list primitives (e.g., FlatList, FlashList), not Stack.
- Render boundaries: Stack is a pure layout primitive with no state or side effects.

---

## 9. Test Requirements

- What must be tested:
  - Children are rendered in the correct order.
  - The `direction` prop produces the expected flex direction (vertical vs horizontal).
  - The `gap` prop applies the correct spacing token between children.
  - The `align` and `justify` props apply the expected alignment.
  - The `wrap` prop enables/disables child wrapping.
  - Responsive prop values apply at the correct breakpoints.
  - The `padding` prop applies the expected padding token.
- Interaction cases: none.
- Accessibility checks:
  - Stack does not introduce any ARIA roles or attributes.
  - Tab order of children matches DOM/native source order.
  - Component does not receive focus.
