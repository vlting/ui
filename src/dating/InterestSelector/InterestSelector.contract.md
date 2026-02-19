# Component Contract — InterestSelector

## 1. Public API

### Base Props

`InterestSelector` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a profile editor section, a preference settings page, or an onboarding step.

May contain: chip/tag elements and optional category heading labels.

---

## 2. Behavioral Guarantees

unselected (idle), unselected (hover/focus), selected, disabled (limit reached and chip is not selected).
- The selector is controlled: the parent owns the selected values array and receives an `onChange` callback.
- Toggling a chip adds or removes it from the selection.
- When the maximum limit is reached, unselected chips become non-interactive and visually indicate they cannot be selected.

- Keyboard behavior:
- Screen reader behavior: each chip has a role of `checkbox` or `option` with `aria-checked`/`aria-selected` reflecting selection state. Group labels are announced.


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
- Reduced motion: disable chip toggle animation.

---

## 4. Styling Guarantees

- Required tokens: `background` (chip default), `color` (chip label), accent/primary token for selected chip fill, `borderColor`, `borderRadius` from radius scale, muted/disabled token for limit-reached state.
- Prohibited hardcoded values: no raw colors, no hardcoded pixel font sizes or padding.
- Dark mode: selected and unselected chip surfaces must both resolve correctly via theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `InterestSelector.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
