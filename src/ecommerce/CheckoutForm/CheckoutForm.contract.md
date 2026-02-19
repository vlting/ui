# Component Contract — CheckoutForm

## 1. Public API

### Base Props

`CheckoutForm` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a checkout screen layout; may sit alongside BillingSummary on wider breakpoints.

May contain: ShippingAddressForm (or equivalent fields), billing address fields, payment method selector, promo code input, and a submit action button. May embed BillingSummary on wide layouts.

---

## 2. Behavioral Guarantees

idle, focused, filled, invalid (with inline error), disabled.
- Overall form states: idle, submitting (Place Order button shows loading, form disabled), error (submission failed — surface a top-level error), success (navigates away or shows confirmation).
- The form is controlled: the parent owns all field values and receives change/submit callbacks.
- Inline field validation on blur; form-level validation on submit attempt.
- "Billing same as shipping" toggle prefills billing fields and hides them.

- Keyboard behavior:
- Screen reader behavior: each field has an associated label; errors are announced live via `aria-live="assertive"`. Success is announced after navigation or in a live region.


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
- Reduced motion: no animated section transitions or field entrance effects.

---

## 4. Styling Guarantees

- Required tokens: `background`, `borderColor`, `color`, `placeholderColor`, semantic error token, focus ring token, success token, all spacing and radius tokens for field and section layout, primary button tokens for Place Order CTA.
- Prohibited hardcoded values: no raw colors, no hardcoded font sizes or pixel spacing.
- Dark mode: all field surfaces, labels, errors, and buttons must resolve correctly via theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `CheckoutForm.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
