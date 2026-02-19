# Component Contract — SwipeCard

## 1. Public API

### Base Props

`SwipeCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: `SwipeDeck` (primary host), a discovery screen layout.

May contain: `SwipeCard.Photo`, `SwipeCard.Info`, `SwipeCard.Actions`. May also host a `SuperLikeIndicator` overlay.

---

## 2. Behavioral Guarantees

idle, swiping-right (like preview overlay visible), swiping-left (pass preview overlay visible), swiping-up (super like preview overlay visible), dismissed (card exits), loading (placeholder while next card loads).
- Gesture input (drag/swipe) triggers directional movement and visual feedback; release past a threshold commits the action; release before the threshold snaps the card back.
- Button input triggers the equivalent action without gesture animation.
- The component is controlled: the parent receives `onLike`, `onPass`, and `onSuperLike` callbacks.

- Keyboard behavior:
- Screen reader behavior: the card is announced with a label including the person's name and age. Action buttons have distinct accessible labels ("Like", "Pass", "Super Like").


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
- Reduced motion: no card rotation, no overlay fade animation; actions take immediate effect.

---

## 4. Styling Guarantees

- Required tokens: `background`, overlay gradient tokens (semi-transparent), action button surface and icon tokens, semantic like/pass/super-like color tokens, `borderRadius` for card corners.
- Prohibited hardcoded values: no raw colors, no pixel-level animation values baked into style.
- Dark mode: overlay, action button surfaces, and text tokens must resolve correctly. Photo content is user-provided and must remain legible over the overlay in both modes.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `SwipeCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
