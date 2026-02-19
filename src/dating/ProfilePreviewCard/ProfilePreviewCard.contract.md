# Component Contract — ProfilePreviewCard

## 1. Public API

### Base Props

`ProfilePreviewCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a discovery feed, a "who liked you" list, a search results grid, or a sheet/modal surface.

May contain: `ProfilePreviewCard.Photo`, `ProfilePreviewCard.Name`, `ProfilePreviewCard.Bio`, `ProfilePreviewCard.Interests`.

---

## 2. Behavioral Guarantees

idle, hovered/pressed (subtle elevation change), loading (image placeholder visible).
- The card may be pressable to expand to a full profile view; pressing triggers an `onPress` callback.
- Sub-components are display-only and not individually interactive.

- Keyboard behavior: if the card is pressable, it is focusable via Tab; Enter or Space triggers `onPress`.
- Screen reader behavior: the card is announced as a button or a grouped region; the accessible label includes the person's name and age.


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
- Reduced motion: no press animation.

---

## 4. Styling Guarantees

- Required tokens: `background`, `borderColor`, shadow token, `color` (name and bio text), radius token for card shape, chip background and text tokens for interest tags.
- Prohibited hardcoded values: no raw colors, no hardcoded font sizes or pixel spacing.
- Dark mode: card surface, text, interest chips, and overlays must resolve correctly via theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ProfilePreviewCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
