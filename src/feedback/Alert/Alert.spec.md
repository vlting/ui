# Component Spec — Alert

## 1. Purpose

Communicates an important message to the user in context — such as a success confirmation, informational notice, warning, or error — without interrupting the primary workflow. Alerts are inline, persistent (until dismissed or resolved), and scoped to the content region they relate to.

Use when: a condition or outcome needs to be communicated clearly within the page or component context (e.g., after a form action, on a validation result, or when a background condition changes).

Do NOT use when: the message requires immediate, modal-level attention (use ConfirmDialog), when it is transient and auto-dismissing (use Toast), or when it is a full-page condition (use EmptyState or NotFoundState).

---

## 2. UX Intent

- Primary interaction goal: ensure the user reads and understands the alert message; optionally act on it.
- Expected user mental model: a notification strip or callout box — contextually placed, clearly categorized by severity.
- UX laws applied:
  - Gestalt (Figure/Ground): the alert's background token distinguishes it visually from surrounding content.
  - Pre-attentive processing: severity icon and color communicate urgency before the message is read.
  - Doherty Threshold: the alert appears promptly when the triggering condition occurs to maintain trust and feedback loops.
  - Fitts's Law: any action affordance (dismiss, link) is a comfortable touch/click target.

---

## 3. Visual Behavior

- Layout: full-width within its container; horizontally arranged icon, message, and optional action/dismiss.
- Variants: info, success, warning, error — each with a distinct semantic color token set.
- Typography: message text uses a body scale token; title (if present) uses a label or heading scale token; action text uses a label scale token.
- Icon: a semantic icon corresponding to the variant is displayed to the left of the message.
- Spacing: internal padding driven by space tokens; vertical rhythm consistent with surrounding form/content layout.
- Token usage: background, border, icon, title text, body text, and action color all sourced from semantic variant tokens.
- Responsive behavior: on narrow viewports, action may stack below the message. Minimum touch target sizes respected.

---

## 4. Interaction Behavior

- States:
  - Visible: default display state.
  - Dismissed: alert is removed or hidden when dismissed (if dismissal is supported).
  - Hover (dismiss/action): interactive elements receive hover state via tokens.
  - Focus: focused interactive elements receive a visible focus ring.
- Controlled vs uncontrolled: visibility may be controlled externally or managed with internal dismiss state.
- Keyboard behavior:
  - Tab reaches the dismiss button and any action links.
  - Enter or Space activates the focused interactive element.
  - Escape may dismiss the alert if it is dismissible.
- Screen reader behavior:
  - Error and warning alerts use `role="alert"` so they are announced immediately on appearance.
  - Info and success alerts use `role="status"` for a less intrusive announcement.
  - Dismiss button has an accessible label.
- Motion rules: entrance animation (if any) and dismiss animation respect reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: `role="alert"` for error/warning variants; `role="status"` for info/success variants. Dismiss button has `aria-label`. Icon is decorative (`aria-hidden="true"`) when accompanied by text.
- Focus: focus is not forcibly moved to the alert (non-modal); dismiss and action controls are keyboard reachable.
- Contrast: all text and icons meet WCAG AA contrast ratios against the variant background token.
- Color alone: severity must not be communicated by color alone; the icon and/or text label must also indicate severity.
- Reduced motion: entrance/exit animations are suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: info/success/warning/error background, border, icon color, title text, body text, action text, focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all semantic variant tokens must resolve to accessible, distinguishable values in dark mode.

---

## 7. Composition Rules

- What can wrap it: form sections, page content areas, modal bodies, card bodies.
- What it may contain: an icon slot, a title slot (optional), a message text slot, an action slot (optional), a dismiss slot (optional).
- Anti-patterns:
  - Do not nest Alert inside another Alert.
  - Do not use Alert for transient auto-dismissing messages (use Toast).
  - Do not use Alert for full-page error conditions (use ErrorBoundary or NotFoundState).

---

## 8. Performance Constraints

- Memoization: the component should not re-render unless its props (variant, message, visibility) change.
- Virtualization: not applicable.
- Render boundaries: the alert is a leaf display component; no internal data subscriptions.

---

## 9. Test Requirements

- Render: each variant (info, success, warning, error) renders with the correct semantic tokens and icon.
- Dismiss: dismissing the alert hides it and calls the dismiss callback.
- Action: action slot renders and is activatable.
- Announcement: `role="alert"` is present for error/warning; `role="status"` for info/success.
- Keyboard: dismiss and action controls are reachable via Tab and activatable via Enter/Space.
- Accessibility: icon is decorative; dismiss button has accessible label; text meets contrast requirements.
- Theming: semantic tokens apply; no hardcoded colors; dark mode tokens resolve correctly.
- Reduced motion: animations are suppressed when reduced motion preference is active.
