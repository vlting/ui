# Component Contract — ExpenseForm

## 1. Public API

### Base Props

`ExpenseForm` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a modal, sheet, page section, or card.

May contain: field slot components (text inputs, select controls, date pickers, amount inputs), a field group or section divider, a form action row (submit and cancel buttons), and a form-level error/alert slot.

---

## 2. Behavioral Guarantees

- In `idle` state: all fields in their default unfilled state.
- In `focused` state: the active field shows a focus ring using the focus color token.
- In `filled` state: fields display the entered value with appropriate formatting.
- In `error` state: invalid fields display an error message below the input using the error color token.
- In `loading / submitting` state: action button enters a loading state; form fields become non-interactive to prevent duplicate submissions.
- In `disabled` state: the entire form may be disabled via a prop, rendering all fields and actions inert.
- Controlled vs uncontrolled: the form layout is uncontrolled — field values and validation state are managed externally and passed via props; this component renders the structure only.
- Keyboard behavior: Tab moves through fields in document order; Shift+Tab reverses; Enter within a single-line field should not submit unless the submit button is focused.
- Screen reader behavior: each field has a visible and programmatically associated label; error messages are announced via `aria-live` or linked via `aria-describedby`; the submit button has a descriptive accessible name.
- Motion rules: field-level error messages fade in using `duration.fast` tokens; form entrance animation (if any) uses `duration.normal` tokens; reduced motion disables all transitions.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: form element has `aria-labelledby` pointing to the form title; each input has an associated `<label>`; error states use `aria-invalid="true"` and `aria-describedby` linking to the error message element.
- Focus rules: on mount, focus is placed on the first field if the form is opened in a modal; focus order strictly follows the visual top-to-bottom layout.
- Contrast expectations: label text and helper text meet WCAG AA (4.5:1) against the form background; error message text meets AA contrast in both light and dark themes.
- Reduced motion behavior: all transitions (error message entrance, loading spinner) are disabled; the component renders in its final state immediately.

---

## 4. Styling Guarantees

- Required tokens: form background, input background, input border, input border (focus), label text color, error text color, disabled field background, action button tokens (background, text, border).
- Prohibited hardcoded values: no raw hex codes, pixel spacing, or font sizes anywhere in the form layout or field slots.
- Dark mode expectations: input backgrounds and borders must remain visually distinct from the form surface background in dark mode; error color tokens must maintain sufficient contrast.
- Layout rules: vertical stack layout; each field occupies its own row with a label above the input; the form container has a defined maximum width token to prevent excessively wide inputs on large screens.
- Responsive behavior: on mobile, the form occupies the full available width; on wider breakpoints, it respects the maximum width token and may be centered.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ExpenseForm.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
