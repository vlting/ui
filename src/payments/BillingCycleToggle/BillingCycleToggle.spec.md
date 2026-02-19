# Component Spec — BillingCycleToggle

## 1. Purpose

Allows a user to switch between billing cycle options — typically "Monthly" and "Annually" — and visually communicates any associated savings or pricing difference between the options.

Use it on pricing pages, plan selection flows, and subscription management pages where the billing interval can be changed.

Do NOT use it for selections with more than two or three options (use a RadioGroup or Select instead), for non-billing toggle use cases, or where the billing cycle cannot actually be changed.

---

## 2. UX Intent

- Primary interaction goal: selection with incentive — the user toggles between billing periods and is nudged toward the option with greater value (typically annual billing showing a savings callout).
- Expected user mental model: a segmented control or toggle switch that mirrors familiar pricing page patterns found in SaaS products (e.g., Stripe, Notion, Linear billing pages).
- UX laws applied:
  - Hick's Law: exactly two options keeps the decision simple and fast.
  - Fitts's Law: both options must be large enough to tap comfortably on mobile.
  - Von Restorff Effect: the recommended or discounted option (e.g., "Annually – Save 20%") should be visually distinct with a subtle badge or highlight.
  - Doherty Threshold: price updates driven by the toggle change must appear within 400ms.

---

## 3. Visual Behavior

- Layout: a horizontally oriented segmented control or pill toggle containing two (or three) labeled options. A savings badge or label may appear adjacent to or within the discounted option.
- Spacing: option labels have equal padding from space tokens. The entire control has a defined minimum height from size tokens.
- Typography: option labels use a body or label scale. A savings callout uses a smaller caption or badge scale with a semantic positive/success color.
- Token usage:
  - Active option background: accent or primary token.
  - Active option text: on-accent foreground token.
  - Inactive option background: transparent or muted surface token.
  - Inactive option text: primary or secondary foreground token.
  - Container border: border token.
  - Container border-radius: rounded pill or medium radius token.
  - Savings badge: semantic positive/success background and text tokens.
- Responsive behavior: full-width on narrow viewports; content-width on wider viewports.

---

## 4. Interaction Behavior

- States:
  - Idle: one option is active (highlighted), the other is inactive.
  - Hover: inactive option shows hover background token.
  - Focus: focused option shows a visible focus ring.
  - Active (pressing): brief press state.
  - Disabled: entire toggle is non-interactive; both options are visually muted.
- Controlled vs uncontrolled: supports both. In controlled mode, the active option is set via `value` and `onValueChange` props. In uncontrolled mode, initial selection is set via `defaultValue`.
- Keyboard behavior:
  - Tab focuses the control (or the active option within it).
  - Arrow keys (Left/Right) switch between options.
  - Enter or Space confirms the focused option.
- Screen reader behavior: the component uses `role="radiogroup"` with each option as `role="radio"`. The active option has `aria-checked="true"`. The group has an accessible label (e.g., "Billing cycle").
- Motion rules: the active indicator slides between options using a short translate transition from motion tokens. Suppressed under reduced motion (instant switch).

---

## 5. Accessibility Requirements

- ARIA requirements: `role="radiogroup"` with `aria-label` or `aria-labelledby`. Each option has `role="radio"` and `aria-checked`. The savings callout must be readable by screen readers (not hidden with `aria-hidden`).
- Focus rules: the group receives focus as a unit. Arrow keys move between options within the group. Only the active option is in the tab order (roving tabindex pattern).
- Contrast expectations: active option label against active background, and inactive label against the container background, must both meet WCAG AA.
- Reduced motion behavior: the sliding indicator animation is disabled; options switch state instantly under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: active background (accent), on-accent text, inactive background (muted or transparent), primary text, border, radius, space tokens, positive/success tokens (for savings badge).
- Prohibited hardcoded values: no raw hex colors, no pixel-based sizes, no hardcoded font sizes.
- Dark mode expectations: active and inactive states must remain visually distinct in dark mode. Savings badge tokens must resolve to legible dark-mode values.

---

## 7. Composition Rules

- What can wrap it: pricing page sections, SubscriptionSelector, UpgradeModal, plan settings pages.
- What it may contain: two or three option labels; optionally a savings badge or annotation on the preferred option. No other interactive elements inside the toggle.
- Anti-patterns:
  - Do not use BillingCycleToggle for non-billing toggle use cases.
  - Do not use it when there are four or more options.
  - Do not place the toggle inside a form field row that already has a label — the toggle's own label group is sufficient.

---

## 8. Performance Constraints

- Memoization rules: memoize the component; it is lightweight and primarily used on high-traffic pricing surfaces.
- Virtualization: not applicable.
- Render boundaries: pure render from props. No data fetching or side effects.

---

## 9. Test Requirements

- What must be tested:
  - Renders both billing cycle options.
  - The correct option is visually active on initial render (controlled and uncontrolled).
  - Clicking an inactive option calls `onValueChange` with the new value.
  - Savings badge renders when the relevant prop is provided.
  - Disabled state prevents interaction.
- Interaction cases:
  - Arrow key navigation switches between options.
  - Enter/Space selects the focused option.
  - Tab focuses the active option in the group.
- Accessibility checks:
  - `role="radiogroup"` and `aria-label` are present.
  - Each option has `role="radio"` and correct `aria-checked`.
  - Active indicator animation is suppressed under reduced motion.
  - Contrast passes for both active and inactive states in both themes.
