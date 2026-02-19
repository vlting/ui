# Component Contract — OrderSummaryCard

## 1. Public API

### Base Props

`OrderSummaryCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a checkout review layout, an order confirmation screen, a modal or sheet.

May contain: `OrderSummaryCard.Items`, `OrderSummaryCard.Subtotal`, `OrderSummaryCard.Total`.

---

## 2. Behavioral Guarantees

states beyond what is reflected by the data props.

- Keyboard behavior: not focusable; no interactive role.
- Screen reader behavior: the card's content is read sequentially; the total is identified by its label.


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
- reduced motion requirements — no animation.

---

## 4. Styling Guarantees

- Required tokens: `background` (card surface), `borderColor`, shadow token, `color` (all text), divider border token, emphasis type token for Total row.
- Prohibited hardcoded values: no raw colors, no hardcoded font weights or pixel sizes outside the token scale.
- Dark mode: card background, border, dividers, and all text must resolve via theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `OrderSummaryCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
