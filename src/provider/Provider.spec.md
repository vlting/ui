# Component Spec — Provider

## 1. Purpose

Provides the design system's theme, configuration, and global context to all descendant components. Must wrap the root of any application or screen that uses components from this design system.

Use when: bootstrapping a consumer application, a story environment, or a test render that uses design system components. All design system components require this Provider to resolve tokens and themes.

Do NOT use when: rendering design system components in isolation without the need for token resolution (in that narrow case, ensure that a test utility wrapper covers this responsibility).

---

## 2. UX Intent

- Primary interaction goal: This is a non-visual infrastructure component. It has no direct user interaction.
- Expected user mental model: No end-user mental model applies. The Provider is an integration boundary for developers — it enables the design system to function correctly.
- UX laws applied: Not applicable (infrastructure component). However, from a developer experience perspective:
  - Tesler's Law: Configuration complexity should be absorbed by sane defaults so that most consumers can use `<Provider>` with no props and get a working result.

---

## 3. Visual Behavior

- Layout rules: The Provider renders no visible UI surface. It passes children through without adding wrapper elements that affect layout.
- Spacing expectations: Not applicable.
- Typography rules: The Provider does not render text. It establishes the font and type scale that all descendant components inherit.
- Token usage: All design tokens (color, size, space, radius, zIndex) are made available to descendants through the Provider. The Provider does not apply tokens directly to itself.
- Responsive behavior: The Provider establishes the media query breakpoints available to all descendant components. It does not apply responsive styles to itself.

---

## 4. Interaction Behavior

- States: The Provider has no interactive states.
- Controlled vs uncontrolled: The `defaultTheme` prop is effectively a controlled initialization value. The active theme may be toggled by a theme-switching mechanism within the descendant tree.
- Keyboard behavior: Not applicable. The Provider does not intercept keyboard events.
- Screen reader behavior: Not applicable. The Provider adds no ARIA attributes or announcements.
- Motion rules: Not applicable. The Provider does not render animations.

---

## 5. Accessibility Requirements

- ARIA requirements: None. The Provider renders no ARIA attributes.
- Focus rules: The Provider does not affect focus behavior.
- Contrast expectations: The Provider establishes the color tokens that all descendant components use to meet contrast requirements, but it does not enforce contrast itself.
- Reduced motion behavior: The Provider may propagate a reduced motion configuration to the design system's animation layer if the system supports it.

---

## 6. Theming Rules

- Required tokens: The Provider receives the full design system token configuration (color, size, space, radius, zIndex) via the `config` prop. The `defaultTheme` prop establishes the initial active theme (`light` or `dark`).
- Prohibited hardcoded values: The Provider must never hardcode theme or token values. All configuration flows through the `config` prop.
- Dark mode expectations: When `defaultTheme="dark"` is set, all descendant components must resolve their tokens to dark-mode values automatically. Theme switching after initial render must be supported by re-rendering the Provider with a new `defaultTheme` value or by a theme-override mechanism in the descendant tree.

---

## 7. Composition Rules

- What can wrap it: The Provider should sit at the root of an application or at the root of an isolated rendering context (e.g., a Storybook decorator or test utility). Nothing from the design system should wrap Provider.
- What it may contain: Any tree of design system components or arbitrary application content. All design system components are valid descendants.
- Anti-patterns:
  - Do not nest multiple Providers without explicit intent (e.g., theme overrides). Nested Providers can conflict.
  - Do not omit the Provider — design system components will fail to resolve tokens without it.
  - Do not pass runtime-computed values to `config` on every render — the config object should be stable and created once outside the component tree.

---

## 8. Performance Constraints

- Memoization rules: The `config` prop should reference a stable, module-level constant (not created inline on each render) to prevent unnecessary descendant re-renders triggered by config reference changes.
- Virtualization: Not applicable.
- Render boundaries: The Provider is the outermost render boundary for the design system context. Theme changes will propagate to all descendants — this is by design. Theme toggling should be implemented carefully to avoid full-tree re-renders when possible.

---

## 9. Test Requirements

- What must be tested:
  - Descendants render correctly when wrapped in Provider with the default config.
  - Descendants render correctly when `defaultTheme="dark"` is supplied.
  - A custom `config` prop is accepted and applied without errors.
  - The Provider renders its children without wrapping them in an additional visible DOM element.
- Interaction cases:
  - Not applicable (non-interactive).
- Accessibility checks:
  - The Provider adds no unexpected ARIA roles or attributes to the rendered output.
  - The document tree produced by the Provider and its children passes automated accessibility checks (all contrast and role requirements are met by descendant components, not by Provider).
