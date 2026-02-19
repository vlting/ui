# Component Spec — BlockUserModal

## 1. Purpose

Presents a confirmation dialog that allows a user to block another user in a dating context. The modal surfaces the consequence of blocking (the blocked user will no longer appear, and existing matches are removed) and requires an explicit confirmation action before the operation is committed.

Use when: a user triggers a "block" action from a profile, match card, or conversation.

Do NOT use for: reporting content, muting notifications, or any action that does not permanently block a user.

---

## 2. UX Intent

- Primary interaction goal: obtain a deliberate, informed confirmation before an irreversible social action is taken.
- Expected user mental model: the user expects a focused, interruptive dialog that demands attention before proceeding — consistent with destructive-action patterns seen across social and dating platforms (Jakob's Law).
- UX laws applied:
  - Tesler's Law: the system absorbs the complexity of "are you sure?" so the surrounding UI stays clean.
  - Hick's Law: present exactly two choices (confirm block / cancel) to minimize decision time.
  - Fitts's Law: destructive (confirm) and safe (cancel) actions must have adequate tap targets, with the cancel action equally or more reachable.

---

## 3. Visual Behavior

- Layout: vertically stacked content area — title, descriptive body text, and an action row at the bottom.
- The modal overlays the full screen with a backdrop that dims the content beneath it.
- Spacing: consistent internal padding using space tokens; action row separated from body text with a spacer or border.
- Typography: title uses a heading-level token; body text uses a body-level token; both inherit theme color tokens.
- The modal width is constrained on larger screens and expands to near full width on small screens.
- Responsive: on mobile it anchors toward the bottom of the viewport (sheet-style) or centers as a dialog on tablet/desktop.
- Token usage: background, border, shadow, and text colors sourced exclusively from theme tokens.

---

## 4. Interaction Behavior

- States: idle (waiting for user input), loading (confirm action in flight — show spinner, disable buttons), error (action failed — surface inline error message).
- The modal is dismissible via the cancel button, a backdrop tap, and the Escape key.
- Controlled: open/closed state is managed by the parent; the component surfaces `onConfirm` and `onCancel` callbacks.
- Keyboard behavior:
  - Focus is trapped inside the modal while open.
  - Tab cycles between cancel and confirm actions only.
  - Enter activates the focused action.
  - Escape dismisses the modal (equivalent to cancel).
- Screen reader behavior: modal role announced on open; focus moves to the modal title or first interactive element.
- Motion: entry/exit uses a short fade or slide transition. Respects `prefers-reduced-motion` by removing animation.

---

## 5. Accessibility Requirements

- ARIA role: `dialog` with `aria-modal="true"`.
- `aria-labelledby` points to the modal title element.
- `aria-describedby` points to the body text describing the consequences of blocking.
- Focus is trapped within the modal while open; focus returns to the triggering element on close.
- All interactive elements meet a minimum contrast ratio of 4.5:1 against their background.
- Reduced motion: skip all entrance/exit animations; show/hide immediately.

---

## 6. Theming Rules

- Required tokens: `background`, `borderColor`, `color` (for title and body text), `shadowColor`, semantic danger/destructive color token for the confirm action.
- Prohibited hardcoded values: no raw hex colors, no pixel-based padding or border-radius values outside the token scale.
- Dark mode: backdrop opacity, background surface, and text colors must all update via theme tokens automatically.

---

## 7. Composition Rules

- What can wrap it: a modal/portal host, a screen-level layout, or a sheet primitive.
- What it may contain: a title, a descriptive text block, and an action row with cancel and confirm buttons.
- Anti-patterns:
  - Do not nest another modal inside BlockUserModal.
  - Do not include navigation elements or unrelated actions inside the modal.
  - Do not use this component for non-blocking confirmation dialogs.

---

## 8. Performance Constraints

- The modal must not mount until it is opened (lazy mount).
- Unmount or hide the modal from the accessibility tree when closed, to avoid background screen reader traversal.
- No virtualization required.
- Memoize stable callback props to avoid unnecessary child re-renders during parent state changes.

---

## 9. Test Requirements

- Renders in closed state without displaying modal content.
- Renders in open state and displays title, body, cancel button, and confirm button.
- Pressing cancel calls `onCancel` and does not call `onConfirm`.
- Pressing confirm calls `onConfirm` and does not call `onCancel`.
- Pressing Escape key calls `onCancel`.
- Tapping the backdrop calls `onCancel`.
- Focus is trapped inside the modal while open.
- Focus returns to the trigger element when modal closes.
- ARIA attributes (`role`, `aria-modal`, `aria-labelledby`, `aria-describedby`) are correctly applied.
- Loading state disables both action buttons and shows a progress indicator.
- Error state surfaces an error message without closing the modal.
- Passes automated accessibility audit (axe or equivalent).
- No animation plays when `prefers-reduced-motion` is active.
