# Component Spec — InviteUserModal

## 1. Purpose

Provides a focused modal dialog for inviting one or more users to an organization by email, with an optional role or permission level assignment.

Use it when an administrator initiates an invitation flow from a team management or member settings page.

Do NOT use it for bulk imports (use a dedicated import flow), for editing existing members (use an edit dialog), or as an inline form embedded in a page.

---

## 2. UX Intent

- Primary interaction goal: task completion — the user enters an email address, optionally assigns a role, and submits the invitation with minimal friction.
- Expected user mental model: a focused, interruptive dialog that must be completed or dismissed before returning to the underlying page. Similar to invitation flows in tools like Slack, GitHub, or Notion.
- UX laws applied:
  - Hick's Law: keep the form fields minimal — email and role are the only required fields. Avoid optional fields unless there is a strong need.
  - Fitts's Law: the primary "Send Invite" button must be large and prominently placed. The dismiss/cancel action must also be reachable.
  - Tesler's Law: invitation complexity (email validation, role selection) is absorbed by the component so the user experiences a simple two-field form.
  - Doherty Threshold: submission feedback (success or error) must appear within 400ms of the user's action to maintain engagement.

---

## 3. Visual Behavior

- Layout: a centered modal dialog overlay. The dialog has a header (title + close button), a form body, and a footer with action buttons.
- Spacing: generous internal padding using space tokens. Form fields are vertically stacked with consistent gap tokens between them.
- Typography: dialog title uses a heading scale. Field labels use a label scale. Helper/error text uses a caption scale.
- Token usage:
  - Overlay: semi-transparent scrim using a color token with opacity.
  - Dialog surface: elevated surface token (distinct from page background).
  - Border: border token for input fields.
  - Destructive/error: semantic destructive color token for validation messages.
  - Primary action button: primary accent token.
- Responsive behavior: on narrow viewports the dialog expands to full-screen or bottom sheet. On wider viewports it is a fixed-width centered dialog (width from size tokens).

---

## 4. Interaction Behavior

- States:
  - Idle/open: form is empty and ready for input.
  - Filled: user has entered values; primary action becomes enabled.
  - Submitting: primary button shows a loading indicator; form fields are disabled.
  - Success: success message or the dialog dismisses automatically.
  - Error: validation or server error displayed inline near the relevant field or as a banner at the top of the form.
  - Closed: dialog is not mounted or is hidden.
- Controlled vs uncontrolled: open/closed state is controlled by the parent via an `open` prop and an `onOpenChange` callback.
- Keyboard behavior:
  - Focus is trapped inside the dialog while it is open.
  - Focus moves to the first form field (email input) when the dialog opens.
  - Tab cycles through fields and action buttons only.
  - Escape key closes the dialog and cancels the operation.
  - Enter on the primary button submits the form.
- Screen reader behavior: dialog has `role="dialog"` and `aria-modal="true"`. Dialog title is the accessible label via `aria-labelledby`. Error messages are announced via `aria-live="assertive"`.
- Motion rules: dialog entrance uses a short scale-up and fade-in transition (timing and easing from motion tokens). Exit is a fade-out. Both suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the dialog title. Each form field must have a `<label>` or `aria-label`. Error messages must use `aria-describedby` or be in an `aria-live` region.
- Focus rules: focus is trapped within the dialog. On open, focus moves to the first input. On close, focus returns to the triggering element.
- Contrast expectations: all text, labels, and error messages must meet WCAG AA. The scrim must not obscure focus indicators on dialog content.
- Reduced motion behavior: entrance/exit animations are disabled; dialog appears/disappears instantly under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: dialog surface, scrim/overlay, primary text, secondary text, border, semantic error/destructive, primary accent (for CTA button), space tokens (padding, gap), radius tokens (dialog corners), shadow tokens (dialog elevation).
- Prohibited hardcoded values: no raw hex colors, no pixel-based padding or widths, no hardcoded font sizes.
- Dark mode expectations: dialog surface must be visually distinct from the page in both light and dark modes. Scrim opacity token must work in both modes.

---

## 7. Composition Rules

- What can wrap it: page-level layout, settings pages, member management views. The trigger (button) lives outside the modal.
- What it may contain: a form with an email input, a role selector (Select primitive), optional helper text, error messages, and a footer with Cancel and Submit buttons.
- Anti-patterns:
  - Do not embed navigation or multi-step wizard content inside InviteUserModal; use a dedicated stepper dialog for complex flows.
  - Do not allow the modal to scroll internally for simple forms; the form must fit in the dialog without internal scroll.
  - Do not use InviteUserModal for non-invite actions (e.g., editing existing members).

---

## 8. Performance Constraints

- Memoization rules: the modal content should only render when open. Use conditional mounting or visibility patterns to avoid rendering the form when the dialog is closed.
- Virtualization: not applicable.
- Render boundaries: the component must not perform data fetching. Submission is handled by a callback prop (`onSubmit`) provided by the parent.

---

## 9. Test Requirements

- What must be tested:
  - Dialog renders when `open` is true and is absent from the DOM (or hidden) when `open` is false.
  - Email field accepts input and validates format.
  - Role selector displays available roles.
  - Submit button is disabled when required fields are empty.
  - Submit button triggers the `onSubmit` callback with the correct values.
  - Cancel button and Escape key trigger `onOpenChange(false)`.
  - Error message renders when an error prop is provided.
- Interaction cases:
  - Tab key cycles through all form fields and buttons in the correct order.
  - Escape closes the dialog.
  - Submitting with an invalid email shows an inline validation error.
- Accessibility checks:
  - `role="dialog"` and `aria-modal="true"` are present.
  - `aria-labelledby` matches the dialog title element.
  - Focus is trapped inside the dialog.
  - Focus returns to the trigger element on close.
  - Error messages are announced by screen readers.
  - Contrast passes for all text and interactive elements in both themes.
