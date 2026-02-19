# Component Contract — QuickAddPanel

## 1. Public API

### Base Props

`QuickAddPanel` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: A trigger button (FAB, toolbar button, or keyboard shortcut handler) that controls the panel's visibility. The panel may be embedded in a PersonalDashboard or appear globally.

May contain: A primary text input, optional secondary controls (type tag, date, priority), a submit button, and a dismiss button.

---

## 2. Behavioral Guarantees

- Idle/Empty: Panel is open with an empty input and a visible placeholder.
  - Typing: Input contains text; submit becomes enabled.
  - Submitting: Brief loading state while the item is processed (spinner or disabled button).
  - Success: Panel closes or resets; optional success feedback.
  - Error: Inline error message appears; panel remains open for correction.
  - Dismissed: Panel closes without creating an item.
- Controlled vs uncontrolled: The panel's open/closed state is controlled by the parent. The input value may be controlled or uncontrolled.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: The panel opens with a brief fade or slide-up animation (under 200ms). It closes with a corresponding fade or slide-down. All motion is suppressed under reduced motion preference.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: On open, focus moves immediately to the primary text input. On close, focus returns to the triggering element.
- Contrast expectations: Input text and placeholder must meet contrast requirements (4.5:1 and 3:1 respectively). Button labels must meet 4.5:1.
- Reduced motion behavior: Open/close animations are disabled. The panel appears and disappears instantly.

---

## 4. Styling Guarantees

- Required tokens: panel background, panel border/shadow, input background, input border (idle and focused), text primary, text placeholder, text error, button primary background, focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Panel surface and input backgrounds shift to dark tokens. Error and success states remain distinguishable in dark mode.
- Layout rules:
- Responsive behavior: On mobile, the panel anchors to the bottom of the screen above the keyboard. On desktop, it may appear as a centered modal or an inline widget. Width is constrained to a readable maximum.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `QuickAddPanel.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
