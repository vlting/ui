# Component Contract — ShareModal

## 1. Public API

### Base Props

`ShareModal` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: A modal portal at the application root. Triggered from PostCard.Actions share button, a content detail share button, or any shareable item.

May contain: A modal header, a copy-link section, a share destination list or grid, and an optional direct message section.

---

## 2. Behavioral Guarantees

- Idle: Share options visible; copy button ready.
  - Copied: Copy button shows a brief "Copied!" confirmation state; the URL is highlighted.
  - Sharing (destination selected): A brief loading or confirmation feedback after selecting a destination.
- Controlled vs uncontrolled: The modal's open/closed state is controlled by the parent. The copy action's success state may be managed internally.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Modal open/close uses a brief fade or scale animation. The "Copied!" confirmation transitions briefly. Reduced motion suppresses all animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: On open, focus moves to the modal title or first interactive element. Focus is trapped within the modal while it is open. On close, focus returns to the triggering share button on the content item.
- Contrast expectations: Modal title must meet 4.5:1. Share destination labels must meet 4.5:1. Copy button text must meet 4.5:1. The URL text in the copy section must meet 4.5:1.
- Reduced motion behavior: Modal open/close animation and "Copied!" confirmation transition are instant.

---

## 4. Styling Guarantees

- Required tokens: modal background, scrim/overlay color, copy section background and border, URL text color, copy button tokens, share destination icon color, share destination label color, hover state for destination items, focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded hex colors, spacing, or font sizes.
- Dark mode expectations: Modal background and copy section resolve to dark-mode tokens. Share destination icons and labels maintain contrast in dark mode.
- Layout rules:
- Responsive behavior: On narrow viewports, the modal expands to full screen or a bottom sheet. Destination options reflow from a grid to a vertical list on narrow widths.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ShareModal.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
