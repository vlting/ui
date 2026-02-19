# Component Contract — Stack

## 1. Public API

### Base Props

`Stack` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: any layout context — pages, cards, dialogs, form sections, list items.

May contain: any combination of design system components or primitive elements. Children are agnostic to the Stack container.

---

## 2. Behavioral Guarantees

none. Stack is a non-interactive layout container.
- Controlled vs uncontrolled: not applicable.
- Keyboard behavior: not focusable. Tab order is determined by the order of children and the standard DOM/native order.
- Screen reader behavior: Stack renders as a generic container (equivalent to a `<div>` or `<View>`). It does not introduce any semantic roles. Screen readers traverse children in source order.
- Motion rules: Stack itself has no animations. Children manage their own animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: none. Stack must not add any ARIA roles or attributes. If the content requires semantic grouping, the consumer provides an appropriate semantic wrapper (e.g., `<section>`, `<nav>`, `<ul>`).
- Focus rules: Stack is not focusable. Tab order follows DOM/native child order.
- Contrast expectations: Stack has no visual surface or text. No contrast requirements at the container level.
- Reduced motion behavior: not applicable.

---

## 4. Styling Guarantees

- Required tokens: space tokens (for `gap`, `padding`, `margin` props).
- Prohibited hardcoded values: no raw pixel values for spacing. No hardcoded flex values that bypass token-based sizing.
- Dark mode expectations: Stack itself is transparent/no-background. It has no theme-dependent appearance.

- Responsive behavior: Stack supports responsive prop values for `direction`, `gap`, `align`, and `justify` at defined breakpoints (using the design system's media query token keys).
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Stack.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
