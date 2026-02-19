# Component Spec — Dialog

## 1. Purpose

Provides a generic, accessible modal dialog container for presenting focused content, confirmations, or forms that require the user's attention before returning to the underlying page.

Use it for confirmations, simple forms, alerts requiring acknowledgment, and any interaction that should block the background context temporarily.

Do NOT use it for non-blocking notifications (use Toast or Banner), for large multi-step flows that have their own specialized dialogs (e.g., InviteUserModal, UpgradeModal), or for content that should persist alongside the page (use a Drawer/Sheet).

---

## 2. UX Intent

- Primary interaction goal: task completion or decision — the user performs a focused action (confirm, fill a form, read an alert) and dismisses the dialog to return to the underlying context.
- Expected user mental model: a standard modal dialog. The background content is still visible but non-interactive. The dialog demands attention.
- UX laws applied:
  - Hick's Law: dialog content should be minimal. One primary action, one secondary. Do not present multiple unrelated choices.
  - Fitts's Law: primary and secondary action buttons must have adequate size and be placed in a consistent footer location.
  - Doherty Threshold: the dialog must open and become interactive within 400ms of the trigger action.
  - Tesler's Law: the dialog absorbs the complexity of focus trapping, scrim rendering, and accessible modal semantics so consumers do not need to re-implement these.

---

## 3. Visual Behavior

- Layout: a centered overlay container with a scrim behind it. The dialog itself has a header (title, optional description, close button), a body (content slot), and a footer (action buttons). All sections are optional but at least a title or description must be present.
- Spacing: internal padding from space tokens. Header, body, and footer are separated by dividers or consistent gap tokens.
- Typography: title uses a heading scale. Description uses a body scale. Action button labels use a button/label scale.
- Token usage:
  - Scrim: semi-transparent overlay token.
  - Dialog surface: elevated surface/modal token with shadow.
  - Header divider: optional border token.
  - Footer divider: optional border token.
  - Close button: icon button with secondary/ghost styling.
- Responsive behavior: fixed max-width on wide viewports (from size tokens); full-width with small horizontal margin on narrow viewports. The dialog never overflows the viewport; body content scrolls internally if tall.

---

## 4. Interaction Behavior

- States:
  - Open: dialog is visible and interactive; background is obscured by scrim.
  - Closed: dialog is not in the DOM or is hidden.
  - Loading (content): content slot may render a skeleton while content is loading.
- Controlled vs uncontrolled: `open` and `onOpenChange` are controlled by the parent. The close button and Escape key call `onOpenChange(false)`. A `dismissable` prop can disable Escape and scrim-click dismissal for critical flows.
- Keyboard behavior:
  - Focus is trapped within the dialog while open.
  - Escape closes the dialog (unless `dismissable={false}`).
  - Tab cycles through all focusable elements in the dialog.
  - Shift+Tab reverses the cycle.
- Screen reader behavior: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the title element. If no visible title exists, an `aria-label` must be provided. The scrim is hidden from screen readers.
- Motion rules: entrance uses a short scale-up and fade-in. Exit uses a fade-out. Both use duration and easing from motion tokens. Suppressed under reduced motion (instant appearance/disappearance).

---

## 5. Accessibility Requirements

- ARIA requirements: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (title element ID) or `aria-label`. Optionally `aria-describedby` if a description element is present.
- Focus rules: on open, focus moves to the first focusable element (first input, or the primary action button, or the close button). On close, focus returns to the triggering element. Focus must not escape the dialog while it is open.
- Contrast expectations: all text within the dialog meets WCAG AA. Close button icon meets non-text contrast (3:1). The scrim does not interfere with content contrast within the dialog.
- Reduced motion behavior: entrance/exit animations are instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: dialog surface, scrim, shadow, primary text, secondary text, border (dividers), close button icon color, space tokens (dialog padding, section gap), radius tokens (dialog corners), shadow tokens (dialog elevation).
- Prohibited hardcoded values: no raw hex colors, no pixel-based widths, no hardcoded z-index values (use z-index tokens).
- Dark mode expectations: dialog surface must be visually elevated above the page in dark mode. Scrim must effectively dim the background in both modes. Close button must be visible against the dialog surface.

---

## 7. Composition Rules

- What can wrap it: any page or component that needs to trigger a modal interaction. The trigger element is always outside the Dialog.
- What it may contain: a title element, an optional description, arbitrary body content (forms, text, images), and footer action buttons (Button primitives). Specialized dialogs (InviteUserModal, CancellationFlowDialog) are built on top of Dialog.
- Anti-patterns:
  - Do not use Dialog for non-blocking messages — use Toast or Banner.
  - Do not nest Dialog inside another Dialog.
  - Do not use Dialog for navigation flows — use a Sheet/Drawer for side-panel flows.
  - Do not render a Dialog without a title or `aria-label`.

---

## 8. Performance Constraints

- Memoization rules: dialog content should only render (mount) when the dialog is open. Unmount content on close to avoid keeping expensive subtrees in the DOM.
- Virtualization: not applicable.
- Render boundaries: the dialog renders a portal to the document root (or a designated portal target) to avoid z-index and overflow clipping issues. No data fetching within the component.

---

## 9. Test Requirements

- What must be tested:
  - Dialog is absent from DOM (or hidden) when `open` is false.
  - Dialog renders when `open` is true.
  - Title, description, and body content render in the correct slots.
  - Escape key calls `onOpenChange(false)`.
  - Close button calls `onOpenChange(false)`.
  - Clicking the scrim calls `onOpenChange(false)` (when `dismissable` is true).
  - Clicking the scrim does not close when `dismissable` is false.
  - Escape does not close when `dismissable` is false.
- Interaction cases:
  - Tab cycles through focusable elements without escaping the dialog.
  - Focus returns to the trigger element after close.
  - Focus moves to the first focusable element on open.
- Accessibility checks:
  - `role="dialog"`, `aria-modal="true"`, `aria-labelledby` or `aria-label` are present.
  - Focus is trapped while the dialog is open.
  - Contrast passes for all text and interactive elements in both themes.
  - Dialog entrance/exit animations are suppressed under reduced motion.
