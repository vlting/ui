# Component Spec — ApprovalWorkflowPanel

## 1. Purpose

Displays the current state of a multi-stage approval workflow (e.g., leave request, purchase order, hire approval) and exposes approve/reject action controls to authorized reviewers. Used in HR, finance, and operational back-office contexts where a record must pass through one or more named approvers in sequence or in parallel.

Do NOT use this component for simple binary confirm/cancel dialogs (use a ConfirmDialog), for displaying workflow history only with no action (use a Timeline or ActivityFeed), or for workflow configuration/setup (use a dedicated form).

---

## 2. UX Intent

- Primary interaction goal: allow an authorized reviewer to understand the full approval chain at a glance, see who has already acted, and take their own action (approve or reject) with a single clear gesture.
- Expected user mental model: a vertical or horizontal chain of approver "stages," each showing the approver's identity and their status, with the current stage highlighted and actionable.
- UX laws applied:
  - Jakob's Law: approval chain visuals match familiar HR platform conventions (linear stage indicators, status badges).
  - Gestalt (Order): stages should read as a clear sequence from first to last, either left-to-right or top-to-bottom.
  - Fitts's Law: approve and reject buttons must have generous touch targets.
  - Hick's Law: the primary actions (Approve, Reject) should be presented prominently without competing with secondary information.
  - Doherty Threshold: action feedback (optimistic update or loading state) must appear within 400 ms of the button press.

---

## 3. Visual Behavior

- Layout: a panel with a header (workflow title, record summary), a staged approval chain visualization, and an action footer (if the current user is the pending approver).
- Spacing: stage connector lines, approver block padding, and action footer padding all use space tokens.
- Typography: stage approver name uses a medium-weight body token; status label uses caption scale token; workflow title uses a heading scale token.
- Token usage: stage status colors (pending, approved, rejected, skipped) use semantic token aliases. Connector lines use border color tokens. Action button colors use primary and danger semantic tokens.
- Responsive behavior: on narrow screens, the approval chain stacks vertically. On wide screens, a horizontal layout may be used. Actions are always in a fixed-position footer or at the bottom of the panel.

---

## 4. Interaction Behavior

- States:
  - Pending (viewer is the current approver): Approve and Reject buttons are active.
  - Pending (viewer is not the current approver): action area is hidden or shows "Awaiting [Name]'s review."
  - Approved (all stages complete): panel shows a completed/approved status badge; no action controls.
  - Rejected: panel shows a rejected status badge; optionally shows the rejecting approver's comment.
  - Submitting: action buttons enter a loading state while the action is being processed.
  - Error: error message appears near the action area; buttons return to their active state.
- Controlled vs uncontrolled: this is a display + event-emitting component. It accepts workflow state as props and emits onApprove/onReject callbacks. It does not manage workflow state internally.
- Keyboard behavior:
  - Tab navigates through the action buttons and any interactive stage elements.
  - Enter or Space activates the focused button.
  - Approval and rejection actions may require a confirmation step (handled externally via a dialog).
- Screen reader behavior:
  - The approval chain is announced as a list of stages with their approver name and status.
  - The current pending stage is indicated with an appropriate label (e.g., "Awaiting your approval").
  - Action buttons have descriptive labels including the action type and subject (e.g., "Approve leave request").
  - Loading and error states are announced via live regions.
- Motion rules: stage status changes (e.g., pending to approved) may animate with a brief token transition suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA: the approval chain list uses `role="list"` and `role="listitem"`. Status badges use `aria-label` to communicate the status textually alongside any icon. Action buttons have descriptive `aria-label` values. Loading state uses `aria-busy="true"` on the action area.
- Focus rules: after a successful action, focus moves to the panel's status region or a confirmation message.
- Contrast: status badge colors, connector lines, and button text must all meet WCAG AA contrast using design tokens.
- Reduced motion: suppress stage status transition animations.

---

## 6. Theming Rules

- Required tokens: stage status semantic colors (pending, approved, rejected), connector line color, panel background, header background, action button colors (primary, danger), disabled opacity, space tokens, typography scale tokens.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all semantic status token aliases must resolve to accessible values against dark backgrounds.

---

## 7. Composition Rules

- What can wrap it: drawer panels, modal dialogs, full-page record detail views, side-panel layouts. Must be a descendant of the design system Provider.
- What it may contain: a workflow header, an approval chain visualization (list of stage items), an optional comment/notes area, and an action footer. Individual stage items display approver identity, status, and timestamp.
- Anti-patterns:
  - Do not embed API calls for approve/reject inside this component — delegate to parent via callbacks.
  - Do not mix workflow configuration UI (adding/removing approvers) with the action panel — use a separate editor.
  - Do not display more than one independent workflow within a single panel instance.

---

## 8. Performance Constraints

- Memoization: stage items should be memoized; the action area should only re-render when action state (loading, error) changes.
- Virtualization: not applicable; approval chains are expected to have a low stage count (typically 2–10).
- Render boundaries: optimistic UI updates for action state must be managed by the parent; the component only reflects the props it receives.

---

## 9. Test Requirements

- Rendering: renders correctly for pending (viewer is approver), pending (viewer is not approver), approved, and rejected states.
- Action buttons: Approve and Reject buttons are visible and active only when the current user is the pending approver.
- Callbacks: onApprove and onReject fire when the corresponding button is activated.
- Loading state: action buttons enter loading state when a submitted action is in flight.
- Error state: error message appears after a failed action; buttons are re-enabled.
- Keyboard navigation: Tab moves through buttons; Enter/Space activates them.
- Accessibility: list semantics for stages, descriptive button labels, live region for loading and error states.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: no transition animation on stage status changes.
