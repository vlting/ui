# Component Contract — ShippingAddressForm

## 1. Public API

### Base Props

`ShippingAddressForm` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: CheckoutForm, an address management modal/screen, a registration flow.

May contain: text input fields (name, address lines, city, postal code), country select, state/region select or input, and optional helper text elements.

---

## 2. Behavioral Guarantees

idle, focused, filled, invalid (inline error shown on blur), disabled.
- Overall form state: idle, submitting (disabled, loading), error (submission or validation failure).
- The form is controlled: the parent owns all field values and receives `onChange` and `onSubmit` callbacks.
- Inline validation on blur; form-level validation on submit.
- Country change may cause other fields to update labels, ordering, or validation rules.

- Keyboard behavior:
- Screen reader behavior: each field has a programmatically associated label; errors are announced via `aria-live="assertive"`.


### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus must be visible and never trapped.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: no animated field effects.

---

## 4. Styling Guarantees

- Required tokens: `background` (input surface), `borderColor` (input border), `color` (label and value text), `placeholderColor`, semantic error token, focus ring token, body-small type token for helper/error text.
- Prohibited hardcoded values: no raw colors, no hardcoded pixel-based field heights or spacing outside the token scale.
- Dark mode: all input surfaces, labels, borders, and error states must resolve via theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ShippingAddressForm.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
