> **Baseline**: This component must also satisfy all requirements in [`FRONTEND_QUALITY.contract.md`](../packages/FRONTEND_QUALITY.contract.md).

# Component Contract — provider

## 1. Public API

### Base Props

`provider` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: The Provider should sit at the root of an application or at the root of an isolated rendering context (e.g., a Storybook decorator or test utility). Nothing from the design system should wrap Provider.

May contain: Any tree of design system components or arbitrary application content. All design system components are valid descendants.

---

## 2. Behavioral Guarantees

The Provider has no interactive states.
- Controlled vs uncontrolled: The `defaultTheme` prop is effectively a controlled initialization value. The active theme may be toggled by a theme-switching mechanism within the descendant tree.
- Keyboard behavior: Not applicable. The Provider does not intercept keyboard events.
- Screen reader behavior: Not applicable. The Provider adds no ARIA attributes or announcements.
- Motion rules: Not applicable. The Provider does not render animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: None. The Provider renders no ARIA attributes.
- Focus rules: The Provider does not affect focus behavior.
- Contrast expectations: The Provider establishes the color tokens that all descendant components use to meet contrast requirements, but it does not enforce contrast itself.
- Reduced motion behavior: The Provider may propagate a reduced motion configuration to the design system's animation layer if the system supports it.

---

## 4. Styling Guarantees

- Required tokens: The Provider receives the full design system token configuration (color, size, space, radius, zIndex) via the `config` prop. The `defaultTheme` prop establishes the initial active theme (`light` or `dark`).
- Prohibited hardcoded values: The Provider must never hardcode theme or token values. All configuration flows through the `config` prop.
- Dark mode expectations: When `defaultTheme="dark"` is set, all descendant components must resolve their tokens to dark-mode values automatically. Theme switching after initial render must be supported by re-rendering the Provider with a new `defaultTheme` value or by a theme-override mechanism in the descendant tree.
- Layout rules: The Provider renders no visible UI surface. It passes children through without adding wrapper elements that affect layout.
- Responsive behavior: The Provider establishes the media query breakpoints available to all descendant components. It does not apply responsive styles to itself.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `provider.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
