# Component Contract — CartItemRow

## 1. Public API

### Base Props

`CartItemRow` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: CartDrawer, a cart page list, an order review section.

May contain: a product image, product name and variant text, a quantity stepper (decrement button, quantity value, increment button), a line total price, and a remove button.

---

## 2. Behavioral Guarantees

idle, quantity-updating (stepper shows loading state briefly), remove-pending (confirm or immediate removal with undo toast), out-of-stock (quantity adjustment disabled, warning label shown).
- The row is controlled: `onQuantityChange(itemId, newQuantity)` and `onRemove(itemId)` are called by the parent.
- Decrementing to zero may trigger `onRemove` or show a confirmation; this behavior is controlled by a prop.
- Increment is disabled when the item is at maximum available quantity.

- Keyboard behavior:
- Screen reader behavior: each row announces the product name, variant, quantity, and line total. Buttons announce their action and the item they apply to (e.g., "Decrease quantity of Blue T-Shirt, Size M").


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
- Reduced motion: no collapse animation on removal.

---

## 4. Styling Guarantees

- Required tokens: `background`, `borderColor` (row separator), `color` (product name, variant, price), subdued/secondary token for variant text, semantic error/warning token for out-of-stock state, button tokens for stepper controls.
- Prohibited hardcoded values: no raw colors, no hardcoded pixel-based thumbnail size.
- Dark mode: all text, borders, and button states must resolve via theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `CartItemRow.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
