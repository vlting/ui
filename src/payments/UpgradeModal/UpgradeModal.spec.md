# Component Spec — UpgradeModal

## 1. Purpose

Presents a focused modal dialog that guides a user through upgrading their subscription plan, encompassing plan selection, billing cycle choice, payment method entry or selection, and confirmation.

Use it when a user initiates a plan upgrade from a feature gate, a settings page, or a pricing CTA.

Do NOT use it for downgrades (use a separate downgrade flow dialog), for initial plan selection during onboarding (use an inline SubscriptionSelector), or as a full-page replacement.

---

## 2. UX Intent

- Primary interaction goal: conversion — the user selects a plan, confirms billing details, and completes the upgrade with minimal friction.
- Expected user mental model: a focused multi-step checkout modal, similar to upgrade flows in Notion, Linear, or Vercel. The user expects to see what they're getting, what they'll pay, and to confirm with a clear CTA.
- UX laws applied:
  - Doherty Threshold: each step must load and respond within 400ms. Price calculations update immediately on plan or cycle change.
  - Hick's Law: each step presents one primary decision (plan, cycle, or payment). Steps are not shown simultaneously.
  - Tesler's Law: upgrade complexity (plan options, billing cycles, proration, payment method) is absorbed into the modal's step structure.
  - Fitts's Law: primary CTA ("Upgrade Now", "Next") must be large, prominent, and easy to reach.
  - Loss Aversion: the summary step should emphasize what the user gains, not what they pay.

---

## 3. Visual Behavior

- Layout: a centered modal dialog with a header (title, optional step indicator, close button), a body (step content), and a footer (primary CTA, secondary "Back" or "Cancel" action). Optionally a sidebar or summary panel on wider viewports.
- Spacing: generous dialog padding from space tokens. Step body uses vertical stacking with gap tokens.
- Typography: dialog title uses a heading scale. Step body content uses body scale. Price summary uses a heading or display scale for the amount. Legal/terms text uses a caption scale.
- Token usage:
  - Dialog surface: elevated modal surface token with shadow.
  - Scrim: semi-transparent overlay token.
  - Primary CTA: primary accent token.
  - Price highlight: heading or display scale with primary foreground.
  - Error messages: destructive/error semantic token.
- Responsive behavior: full-screen dialog on mobile. Centered fixed-width dialog on wider viewports. On mobile, step content may scroll within the dialog body.

---

## 4. Interaction Behavior

- Steps:
  1. Plan selection (SubscriptionSelector or summary of selected plan).
  2. Billing cycle (BillingCycleToggle, if not already selected).
  3. Payment method (SavedPaymentMethodsList or PaymentMethodForm).
  4. Confirmation/summary (plan, cycle, price, next billing date).
- States per step:
  - Loading: skeleton content while step data loads.
  - Error: inline error or banner for server/validation errors.
  - Submitting (final step): primary CTA shows loading; all controls disabled.
  - Success: dialog shows confirmation message or closes automatically.
- Controlled vs uncontrolled: `open` / `onOpenChange` controlled by parent. Step navigation is internal. Final `onUpgradeConfirm` callback provided by parent.
- Keyboard behavior:
  - Focus trapped inside the dialog throughout all steps.
  - Tab navigates through all interactive controls in the current step.
  - Escape closes the dialog (with optional confirmation if mid-flow).
  - Enter activates the primary CTA.
- Screen reader behavior: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the current step's title. Step changes announced via `aria-live="polite"`. Errors via `aria-live="assertive"`.
- Motion rules: step transitions use a short horizontal slide or crossfade. Dialog entrance/exit uses scale and fade. All suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`. Step title updates as the dialog advances. Step change announced via `aria-live="polite"`. Error messages via `aria-live="assertive"`. Primary CTA has a descriptive label (e.g., "Upgrade to Pro - $29/month").
- Focus rules: focus trapped within the dialog. On step advance, focus moves to the first interactive element in the new step. On close, focus returns to the trigger element.
- Contrast expectations: all text, price figures, CTA button labels, and error messages meet WCAG AA.
- Reduced motion behavior: all step transitions and dialog entrance/exit animations are instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: dialog surface, scrim, shadow, primary text, secondary text, border, primary accent, destructive/error, space tokens (dialog padding, step content gap), radius tokens, shadow tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based widths or paddings, no hardcoded font sizes.
- Dark mode expectations: dialog surface must be clearly distinguished from the page in dark mode. CTA button and price summary must be prominent in both modes.

---

## 7. Composition Rules

- What can wrap it: any page or feature gate that triggers an upgrade. The trigger (button/link) lives outside the modal.
- What it may contain: SubscriptionSelector (step 1), BillingCycleToggle, SavedPaymentMethodsList or PaymentMethodForm (step 3), a plan/price summary section, action buttons (Back, Next, Upgrade).
- Anti-patterns:
  - Do not use UpgradeModal for downgrades — use a dedicated downgrade dialog.
  - Do not place more than four steps in the flow; additional complexity should be moved to a full-page checkout.
  - Do not allow users to navigate away from the dialog without confirmation if they are mid-flow.

---

## 8. Performance Constraints

- Memoization rules: render only when open. Each step's content should only mount when that step is active.
- Virtualization: not applicable.
- Render boundaries: the component does not fetch plan or payment data. All data is passed via props. The upgrade API call is handled by `onUpgradeConfirm` in the parent.

---

## 9. Test Requirements

- What must be tested:
  - Dialog renders when `open` is true.
  - Each step renders the correct content.
  - "Next" button advances to the next step.
  - "Back" button returns to the previous step.
  - Escape closes the dialog.
  - Final step "Upgrade" button calls `onUpgradeConfirm` with selected plan, cycle, and payment method.
  - Loading state on the final step disables all controls.
  - Error message renders on the affected step.
  - Success state or automatic close occurs after successful upgrade.
- Interaction cases:
  - Tab order within each step is correct.
  - Focus moves to the first element on each step.
  - Focus returns to the trigger on close.
- Accessibility checks:
  - `role="dialog"`, `aria-modal`, `aria-labelledby` are correct.
  - Step changes are announced via live region.
  - Error messages are announced assertively.
  - Focus is trapped and restored correctly.
  - Contrast passes for all states in both themes.
  - All animations suppressed under reduced motion.
