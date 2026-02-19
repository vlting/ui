# Component Contract — ModerationPanel

## 1. Public API

### Base Props

`ModerationPanel` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: A moderation queue page, a full-screen admin view, or a modal/drawer context.

May contain: Report header, content preview (read-only rendering of the reported content), report metadata section, action buttons, optional notes input, and optional action history.

---

## 2. Behavioral Guarantees

- Idle: Panel loaded with report details; actions available.
  - Loading: Skeleton placeholders while report data fetches.
  - Action in progress: The activated action button shows a loading state; other actions are disabled.
  - Confirmed action: Success state shown with the applied action outcome.
  - Error: Error message shown if an action fails.
- Controlled vs uncontrolled: All data and action callbacks are controlled by the parent.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Loading and transition states use brief animations (under 200ms). Reduced motion suppresses all animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: On open, focus moves to the first interactive element. Confirmation dialogs trap focus within their boundary. On dialog close, focus returns to the triggering action button.
- Contrast expectations: All text must meet 4.5:1. Destructive action button text must meet 4.5:1 against the danger background. Warning indicators must not rely on color alone.
- Reduced motion behavior: All transitions and animations are instant.

---

## 4. Styling Guarantees

- Required tokens: panel background, section divider, standard action button tokens, destructive action button tokens (error/danger variant), success state color, error state color, text primary, text secondary, focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Panel and section backgrounds shift to dark tokens. Destructive action buttons maintain clear visual distinction in dark mode.
- Layout rules:
- Responsive behavior: On wide viewports, content preview and report details may appear in a two-column layout. On narrow viewports, sections stack vertically.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ModerationPanel.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
