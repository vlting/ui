# Component Contract — RuleSummaryCard

## 1. Public API

### Base Props

`RuleSummaryCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

idle, hover (web), focused, active (pressing), disabled (rule is disabled, not card).
- The entire card may be clickable (navigating to the rule detail/editor), or only an explicit "Edit" button.
- Enable/disable toggle is a separate interactive element within the card (does not trigger card navigation).

- Keyboard behavior:
- Screen reader behavior: the card announces the rule name, status, trigger summary, condition count, and action summary as a coherent unit. Individual action buttons have their own accessible labels.


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
- Reduced motion: no hover animation when `prefers-reduced-motion: reduce` is active.

---

## 4. Styling Guarantees

- Required tokens: card background, card border, card hover background or shadow, rule name color, metadata text color, footer text color, action button color, divider color, disabled opacity token.
- Prohibited hardcoded values: no raw colors, no pixel font sizes or spacing, no hardcoded shadow values (use shadow tokens).
- Dark mode: card background, border, and metadata text all resolve correctly in dark theme.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `RuleSummaryCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
