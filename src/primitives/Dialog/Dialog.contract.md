# Component Contract — Dialog

## 1. Public API

### Base Props

`Dialog` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: any page or component that needs to trigger a modal interaction. The trigger element is always outside the Dialog.

May contain: a title element, an optional description, arbitrary body content (forms, text, images), and footer action buttons (Button primitives). Specialized dialogs (InviteUserModal, CancellationFlowDialog) are built on top of Dialog.

---

## 2. Behavioral Guarantees

- Open: dialog is visible and interactive; background is obscured by scrim.
  - Closed: dialog is not in the DOM or is hidden.
  - Loading (content): content slot may render a skeleton while content is loading.
- Controlled vs uncontrolled: `open` and `onOpenChange` are controlled by the parent. The close button and Escape key call `onOpenChange(false)`. A `dismissable` prop can disable Escape and scrim-click dismissal for critical flows.
- Keyboard behavior:
- Screen reader behavior: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the title element. If no visible title exists, an `aria-label` must be provided. The scrim is hidden from screen readers.
- Motion rules: entrance uses a short scale-up and fade-in. Exit uses a fade-out. Both use duration and easing from motion tokens. Suppressed under reduced motion (instant appearance/disappearance).

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (title element ID) or `aria-label`. Optionally `aria-describedby` if a description element is present.
- Focus rules: on open, focus moves to the first focusable element (first input, or the primary action button, or the close button). On close, focus returns to the triggering element. Focus must not escape the dialog while it is open.
- Contrast expectations: all text within the dialog meets WCAG AA. Close button icon meets non-text contrast (3:1). The scrim does not interfere with content contrast within the dialog.
- Reduced motion behavior: entrance/exit animations are instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: dialog surface, scrim, shadow, primary text, secondary text, border (dividers), close button icon color, space tokens (dialog padding, section gap), radius tokens (dialog corners), shadow tokens (dialog elevation).
- Prohibited hardcoded values: no raw hex colors, no pixel-based widths, no hardcoded z-index values (use z-index tokens).
- Dark mode expectations: dialog surface must be visually elevated above the page in dark mode. Scrim must effectively dim the background in both modes. Close button must be visible against the dialog surface.

- Responsive behavior: fixed max-width on wide viewports (from size tokens); full-width with small horizontal margin on narrow viewports. The dialog never overflows the viewport; body content scrolls internally if tall.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Dialog.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
