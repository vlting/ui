# Component Contract — AutomationStatusBadge

## 1. Public API

### Base Props

`AutomationStatusBadge` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

states required).
- If wrapped in an interactive context (e.g., a clickable row), the badge itself does not intercept pointer events.
- No controlled/uncontrolled state; it is purely presentational and driven by the `status` prop.


- Screen reader behavior: the badge text is readable; the icon is decorative (`aria-hidden="true"`) since the label conveys the full meaning.


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
- Reduced motion: no transition animations on status change.

---

## 4. Styling Guarantees

- Required tokens: one background + text token pair per status variant (success, warning, error, neutral, info), icon color token per variant, optional border color token for the outlined variant.
- Prohibited hardcoded values: no raw hex/rgb colors, no hardcoded font sizes, no pixel-based border-radius (use radius tokens).
- Dark mode: all status color tokens must provide sufficient contrast in both light and dark themes; the same status must be visually distinguishable in dark mode.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `AutomationStatusBadge.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
