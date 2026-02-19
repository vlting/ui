# Component Contract — CartDrawer

## 1. Public API

### Base Props

`CartDrawer` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a root layout portal or modal host at the application level.

May contain: a header row, a scrollable CartItemRow list, an empty state view, and a sticky footer with total and checkout button.

---

## 2. Behavioral Guarantees

closed (not mounted or hidden), open (visible), empty (open but no cart items), loading (cart data loading — skeleton rows shown).

- Keyboard behavior:
- Screen reader behavior: drawer is announced as a dialog; title is announced on open; focus moves to the first interactive element or the drawer title on open.


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
- Reduced motion: no slide or fade animation.

---

## 4. Styling Guarantees

- Required tokens: `background` (drawer panel), backdrop overlay token (semi-transparent surface), `borderColor`, `color` (all text), shadow token for panel elevation, heading and label type tokens, semantic button tokens for checkout CTA.
- Prohibited hardcoded values: no raw colors, no hardcoded panel widths outside the token/breakpoint system.
- Dark mode: panel, backdrop, text, and border colors must all resolve via theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `CartDrawer.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
