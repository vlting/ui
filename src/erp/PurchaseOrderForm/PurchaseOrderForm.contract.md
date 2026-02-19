# Component Contract — PurchaseOrderForm

## 1. Public API

### Base Props

`PurchaseOrderForm` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: page layout containers, modal/sheet bodies, multi-step wizard steps.

May contain: FieldWrapper, Label, InlineError, HelperText, form input components, line item sub-tables, action buttons (via FormContainer.Actions or equivalent slot).

---

## 2. Behavioral Guarantees

- Idle: form displays with default field and label styling.
  - Focus: focused field receives a visible focus ring and active border color token.
  - Error: fields with validation errors display an inline error message and error border color token.
  - Disabled: disabled fields are visually de-emphasized with muted color tokens and are not interactive.
  - Loading/Submitting: the form enters a non-interactive state during submission; a loading indicator appears on or near the submit action.
  - Success: optional success feedback communicates that the order was submitted.
- Controlled vs uncontrolled: the form layout is presentation-only; field value management is handled by the consuming context.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: any transition on field focus or error state appearance respects reduced-motion preferences.

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
- Reduced motion: suppress any animated transitions on field state changes when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: form background, section background, border (default, focus, error), label text, input text, placeholder text, error text, action button colors.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve correctly in both light and dark themes; error and focus states must remain distinguishable in dark mode.

- Responsive behavior: on narrow viewports, multi-column field rows collapse to single-column stacks. Touch targets for all interactive elements meet minimum size requirements.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PurchaseOrderForm.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
