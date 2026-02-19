# Component Contract — SubscriptionSelector

## 1. Public API

### Base Props

`SubscriptionSelector` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: UpgradeModal, onboarding plan selection steps, billing settings pages.

May contain: a BillingCycleToggle above the card grid, plan cards each containing plan name, price, feature summary, and CTA button.

---

## 2. Behavioral Guarantees

- Default: all plan cards are displayed; none may be pre-selected (for new users) or the current plan is pre-selected (for plan changes).
  - Selected: one card is highlighted as the active selection.
  - Hover: card shows a hover border or background shift.
  - Focus: card shows a visible focus ring.
  - Loading: skeleton cards while plan data loads.
  - Submitting: CTA button shows loading; card is non-interactive.
- Controlled vs uncontrolled: `value` and `onValueChange` for the selected plan ID (controlled or uncontrolled with `defaultValue`). `onSelectPlan(planId)` callback for CTA activation.
- Keyboard behavior:
- Screen reader behavior: the plan selector uses `role="radiogroup"` with an accessible label. Each plan card uses `role="radio"` with `aria-checked`. The card's accessible label includes plan name, price, and billing period. The recommended badge text is readable.
- Motion rules: card selection uses a brief border/background transition from motion tokens. Suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="radiogroup"` with `aria-label`. Each plan card uses `role="radio"` and `aria-checked`. CTA buttons within cards have descriptive labels (e.g., "Upgrade to Pro plan"). The recommended badge text is not `aria-hidden`.
- Focus rules: roving tabindex pattern within the radio group. Only one card is in the tab order at a time (the selected or focused one). Arrow keys move focus and selection between cards.
- Contrast expectations: plan names, prices, and feature text meet WCAG AA. The recommended badge meets WCAG AA. Selected card border/indicator meets non-text contrast (3:1).
- Reduced motion behavior: card selection transition is instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: surface, surface-elevated, hover state, selected/accent border, primary text, secondary text, accent (recommended badge, selected state), positive/success (current plan label), space tokens, radius tokens, shadow tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based card dimensions, no hardcoded font sizes.
- Dark mode expectations: card surfaces must be visually elevated in dark mode. Selected and recommended states must remain visually prominent against dark backgrounds.

- Responsive behavior: stacked vertically on narrow viewports with the recommended plan first. Cards expand to full-width in stacked layout.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `SubscriptionSelector.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
