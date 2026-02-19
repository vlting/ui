# Component Spec — CancellationFlowDialog

## 1. Purpose

Guides a user through a structured multi-step flow for cancelling a subscription, collecting a cancellation reason, optionally presenting retention offers, and confirming the final cancellation action.

Use it when a user initiates subscription cancellation from billing or account settings.

Do NOT use it for other destructive confirmations (use a standard Dialog), for account deletion (a separate flow), or as an inline page section.

---

## 2. UX Intent

- Primary interaction goal: structured task completion — the user completes the cancellation flow by providing a reason and confirming, or exits the flow by accepting a retention offer or dismissing the dialog.
- Expected user mental model: a focused, multi-step modal dialog similar to cancellation flows in services like Stripe Billing, Intercom, or Spotify. The user expects a moment of reflection before a destructive action is finalized.
- UX laws applied:
  - Tesler's Law: cancellation is inherently complex (reason capture, retention offers, legal confirmations); the component absorbs this complexity into a guided step sequence.
  - Hick's Law: each step presents one clear choice to minimize cognitive load.
  - Doherty Threshold: step transitions and submission feedback must complete within 400ms.
  - Loss Aversion (behavioral): the flow may present what the user will lose (features, data) before the final confirmation — this is an intentional UX pattern, not dark UX, and must be presented neutrally and honestly.

---

## 3. Visual Behavior

- Layout: a centered modal dialog with a header (step title + step indicator), a body (step-specific content), and a footer (primary and secondary actions). A step indicator (e.g., dots or "Step 2 of 3") is visible at the top.
- Spacing: generous internal padding using space tokens. Step content areas use vertical stack layout with gap tokens.
- Typography: step title uses a heading scale. Body text uses a body scale. Captions and helper text use a caption scale.
- Token usage:
  - Dialog surface: elevated surface/modal token with shadow.
  - Scrim: semi-transparent overlay token.
  - Destructive action (final confirm): destructive/error semantic token for the final confirm button.
  - Retention offer highlight: positive/success semantic token or accent token.
  - Text: primary and secondary foreground tokens.
- Responsive behavior: full-screen dialog on mobile. Centered fixed-width dialog on wider viewports (width from size tokens).

---

## 4. Interaction Behavior

- States:
  - Step 1 (reason selection): user selects a cancellation reason from a list or radio group.
  - Step 2 (optional retention): user is shown a retention offer; they can accept or decline.
  - Step 3 (confirmation): user reads a summary and confirms the destructive action.
  - Submitting: the confirm button shows a loading state; all inputs are disabled.
  - Success: the dialog shows a success/completion state or closes automatically.
  - Error: an error message is shown inline if cancellation fails.
- Controlled vs uncontrolled: `open` / `onOpenChange` are controlled by the parent. Step navigation is managed internally. The final `onConfirmCancellation` and `onRetentionAccepted` callbacks are provided by the parent.
- Keyboard behavior:
  - Focus is trapped inside the dialog.
  - Tab navigates through all interactive controls on the current step.
  - Escape dismisses the dialog (with a confirmation if mid-flow).
  - Enter activates the focused primary action.
- Screen reader behavior: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the current step's title. Step changes announce the new step title via `aria-live="polite"`. Error messages use `aria-live="assertive"`.
- Motion rules: step transitions use a short horizontal slide or fade. Dialog entrance/exit uses a scale and fade. All suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`. Step progress announced via `aria-live="polite"`. Error messages via `aria-live="assertive"`. The final destructive button must have `aria-label` that clearly states the consequence (e.g., "Confirm cancellation").
- Focus rules: focus is trapped. On step advance, focus moves to the first interactive element on the new step. On dialog open, focus moves to the first interactive element of step 1. On close, focus returns to the trigger.
- Contrast expectations: all text, error messages, and the destructive action button meet WCAG AA.
- Reduced motion behavior: all step and dialog animations are instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: dialog surface, scrim/overlay, shadow, primary text, secondary text, border, destructive semantic tokens, positive/success tokens, space tokens, radius tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based widths or paddings, no hardcoded font sizes.
- Dark mode expectations: dialog surface must be distinguishable from the page in both modes. Destructive button must remain clearly destructive-looking in dark mode.

---

## 7. Composition Rules

- What can wrap it: billing settings pages, account settings pages. Triggered by a "Cancel subscription" button.
- What it may contain: step-specific content areas that may include RadioGroup (for reason selection), Text (for retention messaging), a summary list of what will be lost, and action buttons. Each step's content is distinct.
- Anti-patterns:
  - Do not use this component for simple one-step destructive confirmations — use Dialog.
  - Do not use this component for account deletion or data export flows.
  - Do not allow the user to skip the reason step without providing a value.
  - Do not present misleading or manipulative retention copy (dark patterns).

---

## 8. Performance Constraints

- Memoization rules: render only when open. Each step's content may be conditionally rendered to avoid mounting all steps simultaneously.
- Virtualization: not applicable.
- Render boundaries: the component does not perform data fetching. The cancellation API call is handled by the `onConfirmCancellation` callback in the parent.

---

## 9. Test Requirements

- What must be tested:
  - Dialog renders when `open` is true.
  - Step 1 displays reason selection options.
  - Selecting a reason enables the "Next" button.
  - Advancing to step 2 shows retention content (if provided).
  - Advancing to step 3 shows the confirmation summary.
  - Confirming on step 3 calls `onConfirmCancellation`.
  - Accepting a retention offer calls `onRetentionAccepted`.
  - Escape closes the dialog.
  - Error state renders when an error prop is provided.
- Interaction cases:
  - Tab navigation within each step reaches all controls in order.
  - Focus moves to the first element on each step transition.
  - Focus returns to the trigger on close.
- Accessibility checks:
  - `role="dialog"`, `aria-modal`, `aria-labelledby` are correct.
  - Step changes announced via live region.
  - Error messages announced via assertive live region.
  - Focus trap is active throughout the flow.
  - Contrast passes for all states in both themes.
  - Animations are suppressed under reduced motion.
