# Component Contract — MultiStepForm

## 1. Public API

### Base Props

`MultiStepForm` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

| Category | Examples |
|----------|---------|
| Layout | `width`, `height`, `minWidth`, `maxWidth`, `flex`, `flexDirection` |
| Spacing | `padding`, `paddingHorizontal`, `margin`, `gap` (space tokens) |
| Visual | `backgroundColor`, `borderColor`, `borderRadius`, `opacity` |
| Theme | `theme`, `themeInverse` |
| Animation | `animation`, `enterStyle`, `exitStyle` |
| Accessibility | `accessible`, `accessibilityLabel`, `accessibilityRole`, `aria-*` |
| Events | `onPress`, `onHoverIn`, `onHoverOut`, `onFocus`, `onBlur` |

### Component-Specific Props

No additional props are defined in the current stub implementation. Props specific to the component's behavior (e.g., data, state, callbacks) are to be defined when behavioral logic is implemented per the `.spec.md`.

### Composition Context

Intended to be wrapped by: page layouts, modal bodies, drawer panels, onboarding screens. Must be a descendant of the design system Provider.

May contain: a step indicator sub-component, individual step panels (each containing form fields and optional step-level description), and a navigation control area.

---

## 2. Behavioral Guarantees

- Idle (step active): current step content is visible; navigation controls are enabled.
  - Validating: on Next press, the active step validates; a loading or processing indicator may appear briefly.
  - Error (step invalid): validation errors surface inline within the step; Next navigation is blocked; errors announced to screen readers.
  - Completed step: step indicator marks prior steps as completed.
  - Final step: Next button label changes to Submit (or equivalent).
  - Disabled (navigation): Back is hidden or disabled on the first step; forward navigation is disabled until validation passes.
- Controlled vs uncontrolled: supports both patterns. In controlled mode, the parent manages the current step index and change callbacks. In uncontrolled mode, the component manages step progression internally.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: step transition (entering/exiting content) uses a short directional slide or fade animation only when reduced motion is not preferred.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: on step transition, focus moves to the step title or the first focusable element in the new step to orient screen reader users.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: disable slide/fade transitions; switch step content immediately.

---

## 4. Styling Guarantees

- Required tokens: step indicator active color, completed color, inactive color, connector line color, content background, navigation button colors (primary, secondary), error color, disabled opacity, space (padding, gap), typography scale.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all indicator and background tokens must resolve to appropriate dark-mode values without manual overrides.

- Responsive behavior: layout remains single-column on small screens; navigation buttons stack vertically on very narrow viewports. Step indicator may condense to a compact progress bar on mobile.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `MultiStepForm.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
