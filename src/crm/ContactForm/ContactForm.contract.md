# Component Contract — ContactForm

## 1. Public API

### Base Props

`ContactForm` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Placed on a dedicated "New Contact" or "Edit Contact" page, or within a modal/drawer triggered from a `ContactCard` action.

May contain: Grouped labeled inputs for name, company, email, phone, title, and additional custom fields. An action row with Save and Cancel buttons.

---

## 2. Behavioral Guarantees

- Create mode: All fields empty; submit button labeled "Add Contact" or equivalent.
  - Edit mode: Fields pre-populated with existing contact data; submit button labeled "Save Changes" or equivalent.
  - Validation error: Invalid or missing required fields show inline error messages.
  - Submitting: All fields disabled; submit button shows a loading indicator.
  - Submit success: Handled by the parent (navigation or toast); the form does not manage its own success state.
- Controlled vs uncontrolled: May support both patterns. Uncontrolled by default; controlled mode available for edit scenarios where the parent manages field values.
- Keyboard behavior: Tab moves through fields and buttons in logical order (top to bottom, left to right in multi-column layouts). Enter in single-line fields moves to the next field. Enter in the submit button submits the form.
- Screen reader behavior: Each field has an explicit label. Required fields are communicated via `aria-required`. Error messages are linked to their fields via `aria-describedby` and announced via `aria-live`.
- Motion rules: Error messages fade in on validation. Reduced motion: instant appearance.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Each input has an explicit `<label>`. Required fields use `aria-required="true"`. Error messages are linked via `aria-describedby` and enclosed in an `aria-live="polite"` region. The submit button communicates its disabled/pending state via `aria-disabled`.
- Focus rules: On mount (create mode), focus is placed on the first field. On validation error after submit attempt, focus moves to the first invalid field. On successful save, focus management is delegated to the parent.
- Contrast expectations: Labels, input text, placeholder text, and error messages all meet WCAG AA contrast against the form background.
- Reduced motion behavior: Error message fade-in animations are suppressed.

---

## 4. Styling Guarantees

- Required tokens: input background, input border color, input focus border color (accent), error color token, label text color, placeholder text color, section heading color, submit button primary colors, cancel button colors, spacing tokens, border radius token for inputs.
- Prohibited hardcoded values: No hardcoded colors, pixel sizes, or font sizes.
- Dark mode expectations: Input backgrounds use dark surface tokens. Focus and error color tokens adapt to dark mode variants.

- Responsive behavior: Two-column field layout collapses to single-column on narrow viewports. Form fills the available container width.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ContactForm.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
