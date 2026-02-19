# Component Contract — ReportContentModal

## 1. Public API

### Base Props

`ReportContentModal` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: A modal portal at the application root. Triggered from PostCard overflow menu, CommentItem.Actions, or any content item's "Report" control.

May contain: A modal header with title and close button, a radio group of report categories, an optional textarea for additional detail, and a footer with Cancel and Submit buttons.

---

## 2. Behavioral Guarantees

- Idle: Category list visible; no selection; Submit disabled.
  - Category selected: Selecting a category enables Submit.
  - With additional details: Optional textarea is filled.
  - Submitting: Submit button shows loading state; all inputs are disabled.
  - Success: Form is replaced with a confirmation message.
  - Error: Inline error message; inputs re-enabled for retry.
- Controlled vs uncontrolled: The modal's open/closed state is controlled by the parent. The selected category and textarea value may be uncontrolled internally.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Modal open/close uses a brief fade or scale animation. Reduced motion makes this instant.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: On open, focus moves to the dialog title or first interactive element. Focus is trapped within the modal. On close, focus returns to the triggering element (e.g., the "Report" overflow menu item).
- Contrast expectations: Category label text must meet 4.5:1. Selected category indicator must meet 3:1 against the background. Submit button text must meet 4.5:1.
- Reduced motion behavior: Modal open/close animation is instant.

---

## 4. Styling Guarantees

- Required tokens: modal background, scrim/overlay color (semi-transparent), category row idle and selected backgrounds, selection indicator color, submit button tokens, cancel button tokens, text primary, text secondary (textarea placeholder), error color, focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded hex colors, spacing, or font sizes.
- Dark mode expectations: Modal background and category rows shift to dark tokens. Selection indicator and submit button remain distinguishable in dark mode.
- Layout rules:
- Responsive behavior: On narrow viewports, the modal expands to full screen or a bottom sheet. On wide viewports, the modal is centered with a max width constraint.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ReportContentModal.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
