# Component Spec — Banner

## 1. Purpose

Delivers a prominent, full-width informational or promotional message across the top or bottom of a page or section. Banners communicate system-level or application-level notices that apply to the entire view, rather than a specific component or field.

Use when: a message applies to the entire page or application state (e.g., a maintenance window notice, a feature announcement, a cookie consent notice, a connectivity warning).

Do NOT use when: the message is scoped to a single component or form field (use Alert or InlineError), when it is transient (use Toast), or when it requires user confirmation to proceed (use ConfirmDialog).

---

## 2. UX Intent

- Primary interaction goal: ensure the user is aware of the system-level condition without blocking their workflow.
- Expected user mental model: a notification strip anchored to the edge of the viewport or section — recognizable from browser-level security warnings, cookie notices, and app update prompts.
- UX laws applied:
  - Jakob's Law: follows established conventions for top/bottom notification strips.
  - Gestalt (Figure/Ground): distinct background token separates the banner from page content.
  - Doherty Threshold: the banner renders promptly when the condition is triggered.
  - Fitts's Law: action and dismiss controls are sized and positioned for easy activation on both touch and pointer.

---

## 3. Visual Behavior

- Layout: full-width horizontal strip. Typically anchored at the top or bottom of the viewport or its containing region; does not overlap content.
- Contains: an optional icon, a message text slot, an optional action slot, and an optional dismiss slot.
- Typography: message text uses a body or caption scale token; action text uses a label scale token.
- Spacing: internal padding driven by space tokens; icon and text are vertically centered.
- Token usage: background, border (if present), icon, text, and action colors sourced from semantic variant tokens (info, warning, success, error) or a neutral/brand token.
- Responsive behavior: on narrow viewports, action may stack below the message text. Touch targets meet minimum size.

---

## 4. Interaction Behavior

- States:
  - Visible: default state when the condition is active.
  - Dismissed: banner is removed or hidden after dismissal.
  - Hover: action and dismiss elements receive hover state via tokens.
  - Focus: focused elements receive a visible focus ring.
- Controlled vs uncontrolled: visibility may be controlled externally or managed with an internal dismiss callback.
- Keyboard behavior:
  - Tab reaches the action element and dismiss button.
  - Enter or Space activates the focused element.
  - Escape may dismiss the banner if it is dismissible.
- Screen reader behavior:
  - Uses `role="banner"` (landmark) or `role="alert"`/`role="status"` depending on urgency.
  - Dismiss button has an accessible label.
  - Announced on appearance for alert-level urgency.
- Motion rules: entrance and exit animations respect reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: `role="alert"` for urgent banners; `role="status"` for informational; or a landmark region (`role="banner"`) for persistent notices. Dismiss button has `aria-label`.
- Focus: focus is not forcibly moved to the banner; action and dismiss controls are keyboard reachable.
- Contrast: all text and icons meet WCAG AA contrast ratios against the banner background token.
- Color alone: severity or type must not be communicated by color alone.
- Reduced motion: entrance/exit animations suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: background (per variant), border (if used), icon color, message text, action text, focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all variant tokens must resolve to accessible, distinguishable values in dark mode.

---

## 7. Composition Rules

- What can wrap it: page layout roots, app shell containers, section headers.
- What it may contain: an icon slot, a message text slot, an action slot, a dismiss slot.
- Anti-patterns:
  - Do not nest Banner inside another Banner.
  - Do not use Banner for field-level validation (use InlineError or Alert).
  - Do not use Banner for transient notifications (use Toast).
  - Do not place Banner inside a scrollable content area where it would scroll out of view.

---

## 8. Performance Constraints

- Memoization: the banner should not re-render unless its visibility state or message content changes.
- Virtualization: not applicable.
- Render boundaries: leaf-level display component; no internal data subscriptions.

---

## 9. Test Requirements

- Render: banner renders with message text, icon, and action slot when conditions are met.
- Dismiss: dismissing hides the banner and calls the dismiss callback.
- Variants: each variant (info, warning, success, error) applies the correct semantic tokens.
- Keyboard: Tab reaches action and dismiss elements; Enter/Space activates them.
- Accessibility: correct ARIA role is present; dismiss button has accessible label; text meets contrast requirements.
- Theming: semantic tokens apply; no hardcoded colors; dark mode tokens resolve correctly.
- Reduced motion: animations are suppressed when reduced motion preference is active.
