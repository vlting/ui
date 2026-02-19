# Component Contract — SwipeDeck

## 1. Public API

### Base Props

`SwipeDeck` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a discovery screen layout, a full-screen content area.

May contain: SwipeCard components, an empty state view, and a loading state placeholder.

---

## 2. Behavioral Guarantees

active (cards available), empty (no more cards), loading (fetching next batch — show a loading placeholder), error (fetch failed — show retry prompt).
- The deck is controlled: the parent supplies the card data array and receives action callbacks (`onLike`, `onPass`, `onSuperLike`, `onEmpty`) which it uses to manage the data set (e.g., appending new cards, removing acted-upon cards).
- When the active card exits (via swipe or button), the next card animates into the top position.

- Keyboard behavior:
- Screen reader behavior: the deck announces how many profiles remain (e.g., "Profile 1 of 10") or that the deck is empty.


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
- Reduced motion: no animation for card exit, card promotion, or background card scaling.

---

## 4. Styling Guarantees

- Required tokens: `background` (deck container), depth shadow tokens for card stack effect, empty state illustration tint, loading placeholder color.
- Prohibited hardcoded values: no raw color values, no pixel-based stack offsets or scale values outside the design token scale.
- Dark mode: deck background, shadow tones, and empty state must resolve via theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `SwipeDeck.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
