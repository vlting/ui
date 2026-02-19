# Component Spec — SubscriptionSelector

## 1. Purpose

Enables a user to browse, compare, and select a subscription plan from a set of available options, serving as the primary plan-picking interface in upgrade, onboarding, and plan-change flows.

Use it in upgrade flows, initial plan selection during onboarding, and billing settings plan-change screens.

Do NOT use it for read-only plan display (use PlanComparisonTable in display mode), for single-plan contexts where no choice exists, or as a persistent widget on a dashboard.

---

## 2. UX Intent

- Primary interaction goal: plan selection — the user evaluates available plans and commits to one, proceeding to payment.
- Expected user mental model: a plan picker step in a checkout or settings flow, similar to plan selection in Notion, GitHub, or Vercel. The user expects to see plan names, key features, and prices clearly before making a commitment.
- UX laws applied:
  - Hick's Law: limit visible plans to three or four. More than four options significantly slows decision-making.
  - Von Restorff Effect: the recommended plan is visually distinguished to guide users toward the preferred option without hiding alternatives.
  - Fitts's Law: plan selection cards must be large enough for comfortable touch; the entire card should be the tap target.
  - Doherty Threshold: any price or feature update triggered by the BillingCycleToggle must update within 400ms.
  - Anchoring Effect: placing the recommended plan in the center or with a prominent highlight anchors user evaluation around it.

---

## 3. Visual Behavior

- Layout: a horizontal row of plan cards on wide viewports; a vertical stack on narrow viewports. Each card contains plan name, price, billing period, a short feature summary, and a CTA button.
- Spacing: equal gap between cards using space tokens. Generous internal card padding from space tokens.
- Typography: plan name uses a heading scale. Price uses a display/heading scale. Feature list uses a body or caption scale. CTA button text uses a button label scale.
- Token usage:
  - Card surface: elevated surface token with shadow.
  - Selected/active card: accent border or accent background overlay.
  - Recommended card: accent border, optional "Most Popular" badge using accent tokens.
  - Current plan card: labeled "Current Plan" using a muted/secondary token.
  - CTA button: primary (recommended plan), secondary (others).
- Responsive behavior: stacked vertically on narrow viewports with the recommended plan first. Cards expand to full-width in stacked layout.

---

## 4. Interaction Behavior

- States:
  - Default: all plan cards are displayed; none may be pre-selected (for new users) or the current plan is pre-selected (for plan changes).
  - Selected: one card is highlighted as the active selection.
  - Hover: card shows a hover border or background shift.
  - Focus: card shows a visible focus ring.
  - Loading: skeleton cards while plan data loads.
  - Submitting: CTA button shows loading; card is non-interactive.
- Controlled vs uncontrolled: `value` and `onValueChange` for the selected plan ID (controlled or uncontrolled with `defaultValue`). `onSelectPlan(planId)` callback for CTA activation.
- Keyboard behavior:
  - Tab navigates between plan cards (or their CTA buttons).
  - Arrow keys (Left/Right or Up/Down) cycle between plan options.
  - Enter or Space selects the focused plan.
- Screen reader behavior: the plan selector uses `role="radiogroup"` with an accessible label. Each plan card uses `role="radio"` with `aria-checked`. The card's accessible label includes plan name, price, and billing period. The recommended badge text is readable.
- Motion rules: card selection uses a brief border/background transition from motion tokens. Suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: `role="radiogroup"` with `aria-label`. Each plan card uses `role="radio"` and `aria-checked`. CTA buttons within cards have descriptive labels (e.g., "Upgrade to Pro plan"). The recommended badge text is not `aria-hidden`.
- Focus rules: roving tabindex pattern within the radio group. Only one card is in the tab order at a time (the selected or focused one). Arrow keys move focus and selection between cards.
- Contrast expectations: plan names, prices, and feature text meet WCAG AA. The recommended badge meets WCAG AA. Selected card border/indicator meets non-text contrast (3:1).
- Reduced motion behavior: card selection transition is instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: surface, surface-elevated, hover state, selected/accent border, primary text, secondary text, accent (recommended badge, selected state), positive/success (current plan label), space tokens, radius tokens, shadow tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based card dimensions, no hardcoded font sizes.
- Dark mode expectations: card surfaces must be visually elevated in dark mode. Selected and recommended states must remain visually prominent against dark backgrounds.

---

## 7. Composition Rules

- What can wrap it: UpgradeModal, onboarding plan selection steps, billing settings pages.
- What it may contain: a BillingCycleToggle above the card grid, plan cards each containing plan name, price, feature summary, and CTA button.
- Anti-patterns:
  - Do not embed SubscriptionSelector inside another card or container that already has a selection state.
  - Do not use it for displaying more than four plans without restructuring the layout.
  - Do not use it as a read-only display component — use PlanComparisonTable for that.

---

## 8. Performance Constraints

- Memoization rules: memoize the component and individual plan card subcomponents. Plan data should be stable references.
- Virtualization: not applicable for three to four plan cards.
- Render boundaries: the component does not fetch plan data. All data comes from props.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct number of plan cards.
  - Each card displays name, price, and features.
  - The recommended plan has the appropriate badge.
  - The current plan is labeled correctly.
  - Selecting a card calls `onValueChange` with the correct plan ID.
  - CTA button calls `onSelectPlan` with the correct plan ID.
  - Loading skeleton renders when loading is true.
  - BillingCycleToggle (if integrated) updates displayed prices.
- Interaction cases:
  - Arrow key navigation cycles between plan cards.
  - Enter/Space selects the focused card.
  - Tab reaches CTA buttons.
- Accessibility checks:
  - `role="radiogroup"` and `role="radio"` with `aria-checked` are correct.
  - Recommended badge text is readable by screen readers.
  - Contrast passes for all states in both themes.
  - Focus ring is visible on focused cards.
  - Transitions suppressed under reduced motion.
