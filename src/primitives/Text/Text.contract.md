# Component Contract — Text

## 1. Public API

### Base Props

`Text` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Stack, card bodies, form field labels, button labels, list items, any container component.

May contain: text string content, inline spans (via nested Text with different styling), or icon elements (when used in an inline icon+text pattern, ensure the icon is not inside Text but adjacent in a Stack row).

---

## 2. Behavioral Guarantees

none. Text is static display content.
- Controlled vs uncontrolled: not applicable.
- Keyboard behavior: not focusable by default. If Text wraps or is inside a pressable element, the parent manages focus.
- Screen reader behavior: Text renders as readable text content. It must map to appropriate semantic HTML elements (`<p>`, `<h1>`–`<h6>`, `<span>`, `<label>`, `<caption>`) based on its variant and context, or accept an `as` prop for semantic override.
- Motion rules: Text itself has no animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Text should render as the appropriate semantic element for its context. Heading variants should map to `<h1>`–`<h6>`. Body and caption variants map to `<p>` or `<span>`. An `as` prop allows the consumer to override the rendered element for correct semantics. Do not use `aria-label` on generic Text — if a label is needed for an element, use a proper associated label.
- Focus rules: not focusable. If text is selectable (e.g., `selectable` prop), it remains non-focusable via keyboard but is accessible to pointer selection.
- Contrast expectations: the default primary foreground color token must meet WCAG AA (4.5:1) against the default background in both light and dark themes. All color token variants used with Text must be validated for contrast in their expected contexts.
- Reduced motion behavior: not applicable.

---

## 4. Styling Guarantees

- Required tokens: type scale tokens (font size, line height, font weight, letter spacing) for each variant; foreground color tokens for each `color` prop value.
- Prohibited hardcoded values: no raw pixel font sizes, no hardcoded hex colors, no raw font weight numbers (use token-mapped weight names), no raw line height values.
- Dark mode expectations: all foreground color tokens must have appropriate dark-mode values. The primary foreground token must remain legible against dark backgrounds. Muted and secondary foreground tokens must maintain their relative hierarchy in dark mode.

- Responsive behavior: Text itself does not change variant at breakpoints. The parent controls which Text variant to render at each breakpoint if needed.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Text.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
