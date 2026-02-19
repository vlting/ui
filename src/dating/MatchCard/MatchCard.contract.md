# Component Contract — MatchCard

## 1. Public API

### Base Props

`MatchCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: `MatchList`, a grid or list layout, a scroll container.

May contain: `MatchCard.Photo`, `MatchCard.Name`, `MatchCard.Age`, `MatchCard.Bio`.

---

## 2. Behavioral Guarantees

idle, hovered/pressed (visual press feedback), unread (new match indicator visible).
- The card is pressable; pressing it triggers the `onPress` callback to navigate to the match conversation or full profile.
- No internal interactive sub-controls — the card is a single press target.

- Keyboard behavior: the card is focusable; Enter or Space activates the `onPress` callback.
- Screen reader behavior: the card is announced as a button or link with an accessible label that includes the matched user's name (e.g., "Match with Alex, 28").


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
- Reduced motion: disable press animation.

---

## 4. Styling Guarantees

- Required tokens: `background`, `borderColor`, `color` (for all text), shadow token, radius token for card rounding, accent token for new-match indicator.
- Prohibited hardcoded values: no raw colors, no pixel-based border radius or shadow values.
- Dark mode: card surface, text, and indicator colors must all resolve via theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `MatchCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
