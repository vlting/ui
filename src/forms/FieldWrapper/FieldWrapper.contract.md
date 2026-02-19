# Component Contract — FieldWrapper

## 1. Public API

### Base Props

`FieldWrapper` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: form section containers, FormContainer, modal bodies, page form regions.

May contain: - `FieldWrapper.Label` — the field label.

---

## 2. Behavioral Guarantees

- Renders without error when valid props are supplied.
- Controlled vs uncontrolled: the wrapper is always presentational; input value state is managed by the child input component.

- Screen reader behavior: the wrapper itself adds no ARIA roles. The Label sub-component must be associated with the input via `htmlFor`/`id` or `aria-labelledby`. The Error sub-component is associated with the input via `aria-describedby`.
- Motion rules: error slot appearance (e.g., slide-in or fade-in) respects reduced-motion preferences.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus must be visible and never trapped.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: any animation on Error slot entry is suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: vertical spacing tokens for the gap between slots. No color tokens are required on the wrapper itself.
- Prohibited hardcoded values: no hardcoded pixel spacing, margin, or padding values.
- Dark mode: the wrapper is transparent; dark mode is handled by each sub-component.

- Responsive behavior: the wrapper stacks vertically on all viewport sizes. On wide viewports, a horizontal layout variant (label inline with input) may be supported.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `FieldWrapper.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
