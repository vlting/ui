# Component Contract — UpgradeModal

## 1. Public API

### Base Props

`UpgradeModal` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: any page or feature gate that triggers an upgrade. The trigger (button/link) lives outside the modal.

May contain: SubscriptionSelector (step 1), BillingCycleToggle, SavedPaymentMethodsList or PaymentMethodForm (step 3), a plan/price summary section, action buttons (Back, Next, Upgrade).

---

## 2. Behavioral Guarantees

- Loading: skeleton content while step data loads.
  - Error: inline error or banner for server/validation errors.
  - Submitting (final step): primary CTA shows loading; all controls disabled.
  - Success: dialog shows confirmation message or closes automatically.
- Controlled vs uncontrolled: `open` / `onOpenChange` controlled by parent. Step navigation is internal. Final `onUpgradeConfirm` callback provided by parent.
- Keyboard behavior:
- Screen reader behavior: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the current step's title. Step changes announced via `aria-live="polite"`. Errors via `aria-live="assertive"`.
- Motion rules: step transitions use a short horizontal slide or crossfade. Dialog entrance/exit uses scale and fade. All suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`. Step title updates as the dialog advances. Step change announced via `aria-live="polite"`. Error messages via `aria-live="assertive"`. Primary CTA has a descriptive label (e.g., "Upgrade to Pro - $29/month").
- Focus rules: focus trapped within the dialog. On step advance, focus moves to the first interactive element in the new step. On close, focus returns to the trigger element.
- Contrast expectations: all text, price figures, CTA button labels, and error messages meet WCAG AA.
- Reduced motion behavior: all step transitions and dialog entrance/exit animations are instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: dialog surface, scrim, shadow, primary text, secondary text, border, primary accent, destructive/error, space tokens (dialog padding, step content gap), radius tokens, shadow tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based widths or paddings, no hardcoded font sizes.
- Dark mode expectations: dialog surface must be clearly distinguished from the page in dark mode. CTA button and price summary must be prominent in both modes.

- Responsive behavior: full-screen dialog on mobile. Centered fixed-width dialog on wider viewports. On mobile, step content may scroll within the dialog body.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `UpgradeModal.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
