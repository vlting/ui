# Component Contract — ConditionBuilder

## 1. Public API

### Base Props

`ConditionBuilder` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

idle, focused (any element in row), error (invalid or incomplete), disabled.

- Keyboard behavior:
- Screen reader behavior: each row is announced as "Condition [n] of [total]". Selectors announce their current value. Remove button announces "Remove condition [n]". Adding a condition announces "Condition added".


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
- Reduced motion: no add/remove animation when `prefers-reduced-motion: reduce` is active.

---

## 4. Styling Guarantees

- Required tokens: row background, row border, row hover background, selector background, selector border, selector focused border, value input background, value input border, remove button color, remove button hover color, AND/OR connector label color, add button color, error border color, error text color, surface background.
- Prohibited hardcoded values: no raw colors, no pixel font sizes or spacing, no hardcoded border-radius.
- Dark mode: all token references resolve correctly; row backgrounds, selectors, and error states remain distinct in dark theme.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ConditionBuilder.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
