# Component Contract — PaymentMethodForm

## 1. Public API

### Base Props

`PaymentMethodForm` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: billing settings pages, UpgradeModal, add payment method dialogs/sheets.

May contain: labeled Input primitives for card fields, a billing address section (country Select, postal code Input), and a submit button. An optional saved card selector may appear above the form.

---

## 2. Behavioral Guarantees

- Empty: all fields empty, submit disabled (or enabled with validation on submit).
  - Focused: the focused field shows an accent border.
  - Filled: field contains a valid value.
  - Invalid: field shows an error border and inline error message.
  - Submitting: all fields disabled, submit button shows loading state.
  - Success: form is reset or replaced by a success message (parent controls this).
  - Error (server): a banner or top-level error message displayed above the form.
- Controlled vs uncontrolled: the form may be uncontrolled (internal state) with an `onSubmit(values)` callback, or fully controlled via value/onChange props on each field. Validation is performed within the component for format rules (card number length, expiry format) with business validation left to the parent.
- Keyboard behavior: Tab progresses through each field in reading order. Shift+Tab reverses. Enter on the submit button submits the form.
- Screen reader behavior: each field has a visible and programmatic label. Error messages are associated with their field via `aria-describedby`. A global error (server error) is announced via `aria-live="assertive"`.
- Motion rules: field focus border transition uses a short color transition. Error message appearance uses a short fade-in. Suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: each input has an associated `<label>`. Error messages use `aria-describedby` on their input. The form has an accessible name via `aria-label` or a heading. Submit button has a descriptive label. Global error uses `aria-live="assertive"`.
- Focus rules: on mount, focus moves to the first empty required field (or remains on the trigger). On error, focus moves to the first invalid field.
- Contrast expectations: all labels, placeholder text, error text, and input text meet WCAG AA. Placeholder text meets a minimum contrast ratio (3:1 per WCAG 1.4.3 non-text contrast for UI components).
- Reduced motion behavior: all transitions on field focus and error appearance are instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: input surface, input border (default, focus, error), primary text, secondary text, destructive/error, primary accent (for submit button), space tokens (field gap, label-to-input spacing, padding), radius tokens (input border-radius).
- Prohibited hardcoded values: no raw hex colors, no pixel-based dimensions, no hardcoded font sizes.
- Dark mode expectations: input surfaces must be distinguishable from the form background in dark mode. Error and focus states must remain visually clear in dark mode.

- Responsive behavior: on narrow viewports, all fields stack full-width. On wider viewports, card number/expiry/CVC may be in a multi-column row.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PaymentMethodForm.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
