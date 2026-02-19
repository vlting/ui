# Component Spec — ReorderAlertBanner

## 1. Purpose

Surfaces a persistent, contextual alert to inform operators that one or more inventory items have reached or fallen below their reorder threshold. It draws attention to an actionable inventory condition without interrupting the primary workflow.

Use when: one or more inventory items require reordering and the operator needs to be informed in the current view.

Do NOT use when: the alert condition does not relate to inventory reordering (use Alert or Banner instead), or when the message must block all interaction (use a modal/dialog instead).

---

## 2. UX Intent

- Primary interaction goal: make the reorder condition immediately noticeable so the operator can act before stock runs out.
- Expected user mental model: a warning strip or notification bar, similar to browser or app-level system alerts.
- UX laws applied:
  - Doherty Threshold: the banner renders promptly when the condition is detected; delayed rendering erodes trust.
  - Gestalt (Figure/Ground): the banner uses a distinct background token to contrast with surrounding content, making it immediately figure-prominent.
  - Fitts's Law: any action affordance (such as a link to the reorder workflow) is large enough to activate easily on touch and pointer.
  - Jakob's Law: follows familiar banner/alert strip patterns that operators recognize from other ERP and enterprise tools.

---

## 3. Visual Behavior

- Layout: full-width horizontal strip anchored at the top of its containing region or the page. Does not overlap content; pushes layout downward.
- Contains: an icon indicating alert severity (warning), a short descriptive message, and an optional action link or button.
- Typography: message text uses a body or caption scale token; action text uses a label or link scale token.
- Spacing: internal padding driven by space tokens; icon and text are vertically centered.
- Token usage: background uses a warning/caution semantic color token; border (if present) uses a warning border token; text uses a high-contrast token against the warning background.
- Responsive behavior: on narrow viewports, action link may stack below the message text. Touch targets meet minimum size requirements.

---

## 4. Interaction Behavior

- States:
  - Visible: default state when the reorder condition is active.
  - Dismissed: banner is removed or hidden after the operator dismisses it (if dismissal is supported).
  - Hover (action element): action link/button receives a hover state via token-based style.
  - Focus: focused action element receives a visible focus ring.
- Controlled vs uncontrolled: visibility may be controlled externally (via prop) or managed internally with a dismiss callback.
- Keyboard behavior:
  - Tab moves focus to the action element and dismiss button (if present).
  - Enter or Space activates the focused action.
- Screen reader behavior:
  - Banner is announced as an alert or status region (`role="alert"` or `role="status"`) so screen readers announce it on appearance.
  - Dismiss button has an accessible label.
- Motion rules: banner entrance animation (slide-down or fade-in) respects reduced-motion preferences; no animation when reduced motion is preferred.

---

## 5. Accessibility Requirements

- ARIA: `role="alert"` for urgent reorder conditions; `role="status"` for lower-urgency informational variants. Dismiss button has `aria-label`.
- Focus: when the banner appears, focus is not forcibly moved to it (it is non-modal); the dismiss control is keyboard reachable.
- Contrast: all text and icons meet WCAG AA contrast ratios against the warning background token.
- Reduced motion: entrance and exit animations are suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: warning background, warning border, warning text, icon color, action text/link color, focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: warning tokens must resolve to legible, accessible values in dark mode; do not assume a light background for the warning color.

---

## 7. Composition Rules

- What can wrap it: page layout containers, dashboard headers, inventory view headers.
- What it may contain: an icon slot, a message text slot, an optional action slot (link or button), an optional dismiss slot.
- Anti-patterns:
  - Do not use ReorderAlertBanner for non-reorder alerts; use Alert or Banner for generic messaging.
  - Do not stack multiple ReorderAlertBanners vertically; consolidate multiple reorder alerts into a single banner with a count or list.
  - Do not place ReorderAlertBanner inside scrollable content; it should remain visible at the top of the view.

---

## 8. Performance Constraints

- Memoization: the banner should not re-render unless its visibility state or message content changes.
- Virtualization: not applicable.
- Render boundaries: the banner is a leaf-level display component; avoid subscribing to global state directly within it.

---

## 9. Test Requirements

- Render: banner renders with message text and icon when condition is active.
- Dismiss: dismissing the banner hides it and triggers the dismiss callback.
- Action: action element is rendered and activatable when provided.
- Keyboard navigation: Tab reaches action and dismiss elements; Enter/Space activates them.
- Accessibility: `role="alert"` or `role="status"` is present; dismiss button has an accessible label; all text meets contrast requirements.
- Theming: warning tokens are applied; no hardcoded colors; dark mode tokens resolve correctly.
- Reduced motion: entrance/exit animations are suppressed when reduced motion preference is active.
