# Component Contract — TimeEntryForm

## 1. Public API

### Base Props

`TimeEntryForm` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: timesheet management pages, modal dialogs, drawer panels, and dashboard widgets. Must be a descendant of the design system Provider.

May contain: date field, start/end time fields or duration field, category/project selector, notes textarea, and a submit button. Each field uses the appropriate specialized input sub-component (DatePicker, TimePicker, Select, TextArea).

---

## 2. Behavioral Guarantees

- Idle: all fields empty or pre-populated with defaults (e.g., today's date).
  - Focused (field): focused field has a visible focus ring.
  - Filled: fields show entered values.
  - Validating: on submit, fields validate; errors surface immediately below the offending field.
  - Submitting: submit button enters loading state; form fields may be disabled during submission.
  - Success: form may reset or show a success message (behavior determined by parent callback).
  - Error (field-level): ValidationMessage appears below the offending field.
  - Error (form-level): a top-level error message appears above the submit button.
  - Disabled: all fields and button non-interactive; reduced opacity.
- Controlled vs uncontrolled: supports both patterns. Controlled mode accepts field values and change callbacks from the parent. Uncontrolled mode manages field state internally and reports the complete entry on submit.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: no animation required for form interactions. Optional success animation suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: form receives focus on mount (or the first field receives focus). After submission error, focus moves to the first field with an error.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress any success/completion animation.

---

## 4. Styling Guarantees

- Required tokens: field background, field border, focused border, error border, label text, input text, placeholder text, button primary color, button disabled color, error text color, space tokens, typography scale tokens, radius token.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; form fields must remain legible and clearly bounded against dark surfaces.

- Responsive behavior: form remains single-column on small screens. On wider screens, date and time fields may align horizontally in a row. The submit button is full-width on mobile.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `TimeEntryForm.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
