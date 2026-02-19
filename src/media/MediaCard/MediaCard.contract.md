# Component Contract — MediaCard

## 1. Public API

### Base Props

`MediaCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `idle` state: renders thumbnail, title, and meta.
- In `hover` state: subtle background or elevation shift; an optional overlay action (e.g., play icon) may appear on the thumbnail.
- In `focus` state: visible focus ring on the card root.
- In `selected` state: border highlight and/or checkmark overlay on the thumbnail.
- In `disabled` state: reduced opacity; non-interactive.
- In `loading` state: skeleton placeholder for thumbnail, title, and meta.
- The card is pressable; pressing it fires an `onPress` callback; selection state is controlled externally.

- Keyboard behavior: `Enter` and `Space` activate the card when focused.
- Screen reader behavior: card announces the media title and type as its accessible name; selected state is communicated.
- Motion rules: hover overlay and selection transitions respect `prefers-reduced-motion`.

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
- Reduced motion: suppress hover overlay transitions and selection animations.

---

## 4. Styling Guarantees

- Required tokens: `background`, `backgroundHover`, `backgroundSelected`, `borderColor`, `borderColorSelected`, `color`, `colorMuted`, `focusStyle`, `space`, `borderRadius`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or aspect-ratio numbers.
- Dark mode: all tokens must resolve correctly; thumbnail placeholder must remain visible in dark mode.

- Responsive behavior: card width is determined by its grid or list container; internal layout does not change.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `MediaCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
