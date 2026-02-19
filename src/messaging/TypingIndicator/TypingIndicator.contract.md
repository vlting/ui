# Component Contract — TypingIndicator

## 1. Public API

### Base Props

`TypingIndicator` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `visible` state: indicator is shown when at least one participant is typing.
- In `hidden` state: indicator is not rendered when no one is typing.
- In `multiple typers` state: label adapts to reflect multiple participants.
- The indicator is purely presentational; it does not respond to user interaction.

- Keyboard behavior: the indicator is not interactive and is not focusable.
- Screen reader behavior: the indicator is announced as a polite live region update (e.g., "Alice is typing") when it appears; it should not be announced repeatedly on every animation frame.
- Motion rules: the dot animation must respect `prefers-reduced-motion`; when reduced motion is active, the dots are static and only the label communicates the typing state.

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
- Reduced motion: dots are static; label alone communicates state.

---

## 4. Styling Guarantees

- Required tokens: `color` (dot fill), `colorMuted` (label text), `space` (gap between dots), `size` (dot diameter).
- Prohibited hardcoded values: no literal color strings, pixel sizes, or animation durations.
- Dark mode: dot and label tokens must maintain sufficient contrast in dark themes.

- Responsive behavior: the indicator is inline with the message thread; it does not take up significant vertical space.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `TypingIndicator.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
