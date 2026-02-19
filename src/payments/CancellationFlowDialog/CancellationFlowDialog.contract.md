# Component Contract — CancellationFlowDialog

## 1. Public API

### Base Props

`CancellationFlowDialog` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: billing settings pages, account settings pages. Triggered by a "Cancel subscription" button.

May contain: step-specific content areas that may include RadioGroup (for reason selection), Text (for retention messaging), a summary list of what will be lost, and action buttons. Each step's content is distinct.

---

## 2. Behavioral Guarantees

- Step 1 (reason selection): user selects a cancellation reason from a list or radio group.
  - Step 2 (optional retention): user is shown a retention offer; they can accept or decline.
  - Step 3 (confirmation): user reads a summary and confirms the destructive action.
  - Submitting: the confirm button shows a loading state; all inputs are disabled.
  - Success: the dialog shows a success/completion state or closes automatically.
  - Error: an error message is shown inline if cancellation fails.
- Controlled vs uncontrolled: `open` / `onOpenChange` are controlled by the parent. Step navigation is managed internally. The final `onConfirmCancellation` and `onRetentionAccepted` callbacks are provided by the parent.
- Keyboard behavior:
- Screen reader behavior: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the current step's title. Step changes announce the new step title via `aria-live="polite"`. Error messages use `aria-live="assertive"`.
- Motion rules: step transitions use a short horizontal slide or fade. Dialog entrance/exit uses a scale and fade. All suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`. Step progress announced via `aria-live="polite"`. Error messages via `aria-live="assertive"`. The final destructive button must have `aria-label` that clearly states the consequence (e.g., "Confirm cancellation").
- Focus rules: focus is trapped. On step advance, focus moves to the first interactive element on the new step. On dialog open, focus moves to the first interactive element of step 1. On close, focus returns to the trigger.
- Contrast expectations: all text, error messages, and the destructive action button meet WCAG AA.
- Reduced motion behavior: all step and dialog animations are instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: dialog surface, scrim/overlay, shadow, primary text, secondary text, border, destructive semantic tokens, positive/success tokens, space tokens, radius tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based widths or paddings, no hardcoded font sizes.
- Dark mode expectations: dialog surface must be distinguishable from the page in both modes. Destructive button must remain clearly destructive-looking in dark mode.

- Responsive behavior: full-screen dialog on mobile. Centered fixed-width dialog on wider viewports (width from size tokens).
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `CancellationFlowDialog.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
