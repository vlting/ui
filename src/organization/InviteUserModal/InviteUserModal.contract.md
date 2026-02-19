# Component Contract — InviteUserModal

## 1. Public API

### Base Props

`InviteUserModal` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: page-level layout, settings pages, member management views. The trigger (button) lives outside the modal.

May contain: a form with an email input, a role selector (Select primitive), optional helper text, error messages, and a footer with Cancel and Submit buttons.

---

## 2. Behavioral Guarantees

- Idle/open: form is empty and ready for input.
  - Filled: user has entered values; primary action becomes enabled.
  - Submitting: primary button shows a loading indicator; form fields are disabled.
  - Success: success message or the dialog dismisses automatically.
  - Error: validation or server error displayed inline near the relevant field or as a banner at the top of the form.
  - Closed: dialog is not mounted or is hidden.
- Controlled vs uncontrolled: open/closed state is controlled by the parent via an `open` prop and an `onOpenChange` callback.
- Keyboard behavior:
- Screen reader behavior: dialog has `role="dialog"` and `aria-modal="true"`. Dialog title is the accessible label via `aria-labelledby`. Error messages are announced via `aria-live="assertive"`.
- Motion rules: dialog entrance uses a short scale-up and fade-in transition (timing and easing from motion tokens). Exit is a fade-out. Both suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the dialog title. Each form field must have a `<label>` or `aria-label`. Error messages must use `aria-describedby` or be in an `aria-live` region.
- Focus rules: focus is trapped within the dialog. On open, focus moves to the first input. On close, focus returns to the triggering element.
- Contrast expectations: all text, labels, and error messages must meet WCAG AA. The scrim must not obscure focus indicators on dialog content.
- Reduced motion behavior: entrance/exit animations are disabled; dialog appears/disappears instantly under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: dialog surface, scrim/overlay, primary text, secondary text, border, semantic error/destructive, primary accent (for CTA button), space tokens (padding, gap), radius tokens (dialog corners), shadow tokens (dialog elevation).
- Prohibited hardcoded values: no raw hex colors, no pixel-based padding or widths, no hardcoded font sizes.
- Dark mode expectations: dialog surface must be visually distinct from the page in both light and dark modes. Scrim opacity token must work in both modes.

- Responsive behavior: on narrow viewports the dialog expands to full-screen or bottom sheet. On wider viewports it is a fixed-width centered dialog (width from size tokens).
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `InviteUserModal.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
