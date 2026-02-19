# Component Contract — ProductCard

## 1. Public API

### Base Props

`ProductCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: ProductGallery, a search results grid, a recommendations carousel, or any grid/list layout.

May contain: `ProductCard.Image`, `ProductCard.Title`, `ProductCard.Price`, `ProductCard.Actions`. May also host InventoryStatusBadge and SuperLikeIndicator-equivalent "Featured" badges.

---

## 2. Behavioral Guarantees

idle, hovered/focused (elevated shadow, actions revealed), active/pressed (brief press feedback), out-of-stock (Add to Cart disabled, status badge shown), loading (image placeholder).
- The card itself may be pressable (navigates to product detail) with individual action buttons as secondary targets.
- `ProductCard.Actions` buttons emit `onAddToCart(productId)` and `onWishlist(productId)` callbacks.

- Keyboard behavior:
- Screen reader behavior: the card has an accessible label including the product name. Actions have labels including the product name (e.g., "Add Blue T-Shirt to cart").


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
- Reduced motion: no hover elevation animation.

---

## 4. Styling Guarantees

- Required tokens: `background` (card surface), `borderColor`, shadow token (default and hover states), `color` (title, price), primary/CTA button tokens for Add to Cart, accent token for wishlist, radius token for card corners.
- Prohibited hardcoded values: no raw colors, no hardcoded image dimensions or pixel padding.
- Dark mode: card surface, border, shadow, text, and button states must resolve via theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ProductCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
