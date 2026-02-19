# Component Contract — SavedPaymentMethodsList

## 1. Public API

### Base Props

`SavedPaymentMethodsList` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: billing settings pages, checkout payment step, UpgradeModal payment step.

May contain: a list of payment method items each containing brand icon, masked number, expiry, default badge (if applicable), and action controls. An "Add new payment method" trigger at the bottom of the list.

---

## 2. Behavioral Guarantees

- Idle: list shows all saved methods; the default is marked.
  - Selected: a method is highlighted as the active selection (for checkout flows).
  - Hover: item background shifts to hover token.
  - Focus: item or its controls show a visible focus ring.
  - Loading: skeleton items while data loads.
  - Empty: an "Add payment method" prompt is shown when no methods are saved.
  - Removing: the remove action shows a loading state on the item while deletion is in progress.
- Controlled vs uncontrolled: selection state (for checkout) is controlled via `value` and `onValueChange`. Management actions (`onSetDefault`, `onRemove`) are callbacks. Open/add-new is handled by the parent (triggers PaymentMethodForm).
- Keyboard behavior:
- Screen reader behavior: the list has `role="radiogroup"` in selection mode (or `role="list"` in management-only mode). Each item has an accessible label combining card brand, masked number, and expiry. The default badge is readable by screen readers. Remove buttons include the card name in their label.
- Motion rules: item hover and selection transitions use a subtle background color change from motion tokens. Suppressed under reduced motion. The remove loading state uses a brief spinner. Suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: in selection mode, use `role="radiogroup"` with `aria-label` and each item as `role="radio"` with `aria-checked`. Remove buttons use `aria-label` including the card name. Default badge is readable (not `aria-hidden`).
- Focus rules: in selection mode, only the selected item is in the tab order (roving tabindex). Arrow keys move selection within the list. Action buttons (remove, set default) remain Tab-reachable.
- Contrast expectations: all text (card number, expiry, badge labels) meets WCAG AA. Remove action text (destructive) meets contrast requirements.
- Reduced motion behavior: all transitions and spinner animations are instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: surface, list-item surface, hover state, selected state, border, primary text, secondary text, positive/success (default badge), destructive/error (remove action), space tokens, radius tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based dimensions, no hardcoded font sizes.
- Dark mode expectations: item surfaces, hover, and selected states must remain visually distinct in dark mode. Default and remove states must maintain their semantic clarity.

- Responsive behavior: full-width list at all breakpoints. Action controls may be in an overflow menu on narrow viewports to preserve item width.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `SavedPaymentMethodsList.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
