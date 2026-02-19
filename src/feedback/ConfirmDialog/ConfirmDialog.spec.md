# Component Spec — ConfirmDialog

## 1. Purpose

Presents a modal dialog requiring explicit user confirmation before a potentially destructive or irreversible action is executed. It blocks interaction with the underlying content until the user confirms or cancels.

Use when: an action has significant consequences that the user should consciously approve (e.g., deleting a record, submitting an irreversible order, overwriting data).

Do NOT use when: the action is low-stakes or easily reversible (use a simpler inline confirmation or Toast undo), or when providing information only without requiring a decision (use Alert or Banner).

---

## 2. UX Intent

- Primary interaction goal: ensure the user makes a deliberate, informed choice before a high-stakes action proceeds.
- Expected user mental model: a system dialog prompt — familiar from OS-level confirmations and web app delete confirmations.
- UX laws applied:
  - Hick's Law: present exactly two choices (confirm and cancel); avoid additional options that increase decision complexity.
  - Tesler's Law: the dialog manages the complexity of irreversibility so the operator does not need to think about undo.
  - Fitts's Law: the destructive action button (confirm) and the safe exit (cancel) are both large, clearly labeled, and easily reachable.
  - Jakob's Law: destructive action is conventionally placed so that the cancel option is the default safe choice.

---

## 3. Visual Behavior

- Layout: centered modal panel with a backdrop overlay. Fixed position relative to the viewport.
- Contains: a title, a descriptive body message, and an actions row with confirm and cancel buttons.
- Typography: title uses a heading scale token; body uses a body scale token; button labels use a label scale token.
- Backdrop: semi-transparent overlay using an overlay/scrim color token.
- Spacing: internal padding driven by space tokens; actions row is right-aligned or split per design convention.
- Token usage: dialog background, border, shadow, title text, body text, button colors, and backdrop all sourced from theme tokens.
- Responsive behavior: on narrow viewports, the dialog expands to near-full width; button stack may become vertical.

---

## 4. Interaction Behavior

- States:
  - Open: dialog is visible and focused; backdrop prevents interaction with underlying content.
  - Closed: dialog is not rendered or is hidden.
  - Loading: confirm action is in progress; confirm button is disabled and shows a loading indicator; cancel is also disabled.
- Controlled vs uncontrolled: open/closed state is controlled externally; the dialog does not manage its own open state.
- Keyboard behavior:
  - Focus is trapped within the dialog while it is open.
  - Tab cycles through dialog controls (cancel, confirm, dismiss if present).
  - Enter activates the focused button.
  - Escape closes the dialog and invokes the cancel/dismiss callback.
- Screen reader behavior:
  - Dialog uses `role="dialog"` with `aria-modal="true"` and an `aria-labelledby` referencing the title.
  - Focus is moved to the dialog (or its title/first control) when it opens.
  - Focus returns to the trigger element when the dialog closes.
- Motion rules: dialog open/close animation (fade, scale) respects reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the dialog title, `aria-describedby` pointing to the body message.
- Focus trap: all Tab key presses remain within the dialog while it is open.
- Focus restoration: focus returns to the element that triggered the dialog when it closes.
- Contrast: all text, buttons, and icons meet WCAG AA contrast ratios.
- Reduced motion: open/close animations are suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: dialog background, dialog border, dialog shadow, backdrop/overlay color, title text, body text, confirm button (background, text, hover), cancel button (background, text, hover), focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, border radii, or font sizes.
- Dark mode: all tokens must resolve to accessible, distinguishable values in dark mode; backdrop must still provide sufficient contrast against dark page backgrounds.

---

## 7. Composition Rules

- What can wrap it: app root, portal/overlay layer.
- What it may contain: a title slot, a body/description slot, an actions slot (confirm and cancel buttons).
- Anti-patterns:
  - Do not use ConfirmDialog for non-destructive, low-stakes confirmations.
  - Do not nest ConfirmDialog inside another modal dialog.
  - Do not place complex forms or multi-step content inside a ConfirmDialog (use a dedicated modal or sheet instead).

---

## 8. Performance Constraints

- Memoization: dialog content should not re-render while closed.
- Virtualization: not applicable.
- Render boundaries: dialog is typically rendered in a portal at the document root; content is lazily mounted only when open.

---

## 9. Test Requirements

- Render: dialog renders with title, body, confirm, and cancel controls when open.
- Close: Escape key and cancel button close the dialog; focus returns to the trigger.
- Confirm: confirm button triggers the confirm callback; loading state disables both buttons.
- Focus trap: Tab key cycles only within dialog controls while open.
- Accessibility: `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby` are present; focus moves to the dialog on open.
- Theming: token-based colors apply; no hardcoded values; dark mode tokens resolve correctly.
- Reduced motion: open/close animations are suppressed when reduced motion preference is active.
