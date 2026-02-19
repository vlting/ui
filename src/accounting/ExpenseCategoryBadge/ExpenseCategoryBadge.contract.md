# Component Contract — ExpenseCategoryBadge

## 1. Public API

### Base Props

`ExpenseCategoryBadge` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: table cells, list item rows, card headers, inline text paragraphs.

May contain: a single text label; optionally a leading icon slot (icon must be decorative or have its own `aria-label`).

---

## 2. Behavioral Guarantees

- In `idle` state: displays category label in the category's assigned color.
- In `hover` state: subtle background lightening/darkening (token-driven) when the badge is interactive; no change when purely presentational.
- In `focus` state: visible focus ring using the focus color token when interactive.
- In `disabled` state: not applicable — the badge is a display element; interactivity is optional.
- Controlled vs uncontrolled: the badge is stateless; category and color assignment are always supplied via props.
- Keyboard behavior: if the badge is rendered as an interactive element (e.g., triggering a filter), it must be focusable and activatable with Enter or Space.
- Screen reader behavior: the label text is the accessible name; no additional ARIA is needed unless the badge is interactive, in which case it requires `role="button"` and an accessible name.
- Motion rules: no animation on the badge itself; transitions on hover/focus use `duration.fast` tokens.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: purely presentational badges need no special ARIA; interactive badges require `role="button"` or must be rendered as a native `<button>` element.
- Focus rules: focus ring must be visible on keyboard navigation; focus must not be trapped.
- Contrast expectations: the category label text must meet WCAG AA (4.5:1) against its background token in both light and dark themes.
- Reduced motion behavior: no animations are defined for this component; this requirement is inherently satisfied.

---

## 4. Styling Guarantees

- Required tokens: background color (per category or semantic), text color, border color (optional), border radius token, space token for padding.
- Prohibited hardcoded values: no raw hex codes, numeric padding, or font sizes.
- Dark mode expectations: category color tokens must have dark-mode variants that maintain sufficient contrast; the badge background must not disappear against a dark surface background.
- Layout rules: displays inline or inline-flex; does not break across lines; width is content-driven (label text + padding).
- Responsive behavior: the badge scales with the surrounding text; it does not reflow to a multi-line form at any viewport size.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ExpenseCategoryBadge.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
