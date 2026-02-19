# Component Contract — Label

## 1. Public API

### Base Props

`Label` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: FieldWrapper.Label slot, or placed directly above a form input.

May contain: the label text string; an optional required indicator slot; an optional tooltip trigger for additional context.

---

## 2. Behavioral Guarantees

- Renders without error when valid props are supplied.

- Keyboard behavior: Tab does not stop on the Label itself; it moves directly to the associated input.
- Screen reader behavior: the label text is announced when the associated input receives focus. The required state is communicated via `aria-required="true"` on the input (not solely via the asterisk).
- Motion rules: no animation.

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
- Reduced motion: no animation to suppress.

---

## 4. Styling Guarantees

- Required tokens: label text color (primary), required indicator color (danger/accent), optional indicator color (muted).
- Prohibited hardcoded values: no hardcoded hex colors, pixel font sizes, or margin values.
- Dark mode: label text and indicator tokens must resolve to accessible, legible values in dark mode.

- Responsive behavior: no layout changes based on viewport; adapts to container width.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Label.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
