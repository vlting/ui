# Component Contract — PresenceIndicator

## 1. Public API

### Base Props

`PresenceIndicator` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Typically placed in a document toolbar, page header, or collaborative surface header. May be used inside `CommunityHeader` or document top bars.

May contain: A set of avatar elements and an optional overflow count badge. May include status dots on each avatar.

---

## 2. Behavioral Guarantees

- Idle: Displays current participants.
  - Empty / no peers: Component is hidden or renders nothing when only the current user is present (determined by parent).
  - Hover on avatar: Tooltip displays the participant's name.
  - Overflow badge hover: Tooltip or popover lists all additional participants.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the array of participant objects.
- Keyboard behavior: If the indicator is interactive (tap to expand), it must be keyboard operable via Tab and Enter/Space. Tooltips must be triggered on focus as well as hover.
- Screen reader behavior: The group of avatars must have an accessible label summarizing the participants (e.g., "3 people are viewing: Alice, Bob, and Charlie"). Individual avatar images must have appropriate `alt` text.
- Motion rules: When participants join or leave, avatars animate in/out with a subtle scale or fade. Reduced motion: changes are instant.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Container uses `role="group"` with an `aria-label` describing current participants. Individual avatars use `role="img"` with `alt` text set to the participant's name. Overflow badge announces total count.
- Focus rules: If the component is interactive, it is a single focusable element or a button that opens a participant list. Avoid making each avatar a separate focus stop unless necessary.
- Contrast expectations: Avatar border must contrast against the page background. Overflow badge text must meet WCAG AA against its badge background.
- Reduced motion behavior: Join/leave animations are suppressed; changes appear instantly.

---

## 4. Styling Guarantees

- Required tokens: avatar size token, avatar border color, avatar border width, overflow badge background, overflow badge text color, status indicator colors (online green, away yellow, offline muted), spacing token for overlap offset, border radius (circle).
- Prohibited hardcoded values: No hardcoded colors, pixel sizes, or z-index values.
- Dark mode expectations: Avatar borders and overflow badge adapt to dark theme tokens. Status dot colors remain semantically meaningful in dark mode.

- Responsive behavior: The indicator remains compact at all breakpoints. On very narrow contexts, it may reduce the number of visible avatars further.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PresenceIndicator.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
