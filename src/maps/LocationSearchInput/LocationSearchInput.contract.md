# Component Contract — LocationSearchInput

## 1. Public API

### Base Props

`LocationSearchInput` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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



---

## 2. Behavioral Guarantees

- Renders without error when valid props are supplied.

- Keyboard behavior:
- Screen reader behavior: the input has `role="combobox"` with `aria-expanded`, `aria-controls`, and `aria-autocomplete="list"`. The suggestions list has `role="listbox"` with `role="option"` per item. The focused suggestion is indicated via `aria-activedescendant`.


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
- Reduced motion: dropdown appears/disappears instantly without animation.

---

## 4. Styling Guarantees

- Required tokens: input background token, border color token (idle, focus, error states), primary/accent token for focused border and text highlight, icon color token, surface token for dropdown, shadow token for dropdown elevation, muted text token for secondary suggestion descriptor, space tokens for input padding and suggestion row padding.
- No hardcoded color, spacing, or font-size values.
- Dark mode: input background, border, dropdown surface, and text tokens must resolve correctly in dark themes.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `LocationSearchInput.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
