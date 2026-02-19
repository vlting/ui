# Component Contract — BillingCycleToggle

## 1. Public API

### Base Props

`BillingCycleToggle` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: pricing page sections, SubscriptionSelector, UpgradeModal, plan settings pages.

May contain: two or three option labels; optionally a savings badge or annotation on the preferred option. No other interactive elements inside the toggle.

---

## 2. Behavioral Guarantees

- Idle: one option is active (highlighted), the other is inactive.
  - Hover: inactive option shows hover background token.
  - Focus: focused option shows a visible focus ring.
  - Active (pressing): brief press state.
  - Disabled: entire toggle is non-interactive; both options are visually muted.
- Controlled vs uncontrolled: supports both. In controlled mode, the active option is set via `value` and `onValueChange` props. In uncontrolled mode, initial selection is set via `defaultValue`.
- Keyboard behavior:
- Screen reader behavior: the component uses `role="radiogroup"` with each option as `role="radio"`. The active option has `aria-checked="true"`. The group has an accessible label (e.g., "Billing cycle").
- Motion rules: the active indicator slides between options using a short translate transition from motion tokens. Suppressed under reduced motion (instant switch).

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="radiogroup"` with `aria-label` or `aria-labelledby`. Each option has `role="radio"` and `aria-checked`. The savings callout must be readable by screen readers (not hidden with `aria-hidden`).
- Focus rules: the group receives focus as a unit. Arrow keys move between options within the group. Only the active option is in the tab order (roving tabindex pattern).
- Contrast expectations: active option label against active background, and inactive label against the container background, must both meet WCAG AA.
- Reduced motion behavior: the sliding indicator animation is disabled; options switch state instantly under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: active background (accent), on-accent text, inactive background (muted or transparent), primary text, border, radius, space tokens, positive/success tokens (for savings badge).
- Prohibited hardcoded values: no raw hex colors, no pixel-based sizes, no hardcoded font sizes.
- Dark mode expectations: active and inactive states must remain visually distinct in dark mode. Savings badge tokens must resolve to legible dark-mode values.

- Responsive behavior: full-width on narrow viewports; content-width on wider viewports.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `BillingCycleToggle.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
