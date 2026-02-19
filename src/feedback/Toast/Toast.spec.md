# Component Spec — Toast

## 1. Purpose

Displays a brief, transient notification message that appears temporarily to acknowledge a completed action, surface a non-critical system event, or provide lightweight feedback — then auto-dismisses without requiring user interaction.

Use when: confirming an action (e.g., "Saved successfully"), delivering a non-blocking notification, or surfacing a minor warning that does not require the user to stop what they are doing.

Do NOT use when: the message requires the user's attention and deliberate response (use Alert or ConfirmDialog), the message is persistent (use Banner or Alert), or the message is critical and must not be missed.

---

## 2. UX Intent

- Primary interaction goal: provide immediate, low-friction feedback on completed actions without interrupting the user's workflow.
- Expected user mental model: a temporary notification bubble that appears, delivers its message, and disappears — familiar from mobile OS notifications and web app toasts.
- UX laws applied:
  - Doherty Threshold: toasts appear within ~100ms of the triggering action to maintain tight feedback loops.
  - Gestalt (Figure/Ground): the toast floats above the page content with a shadow, creating clear visual layering.
  - Fitts's Law: the dismiss control (if present) and any action link are sized and placed for easy activation.
  - Jakob's Law: follows familiar toast/snackbar patterns from Material Design and mobile OS conventions.

---

## 3. Visual Behavior

- Layout: fixed position, typically in a corner of the viewport (bottom-right or bottom-center on web; bottom-center on mobile). Stacks vertically when multiple toasts are queued.
- Contains: an optional icon, a message text, an optional action link, and an optional dismiss button.
- Variants: info, success, warning, error — each with a distinct semantic color token set.
- Typography: message text uses a body or caption scale token; action text uses a label scale token.
- Spacing: internal padding driven by space tokens.
- Token usage: background, border, icon, text, action, and shadow colors sourced from semantic variant tokens.
- Auto-dismiss: disappears after a configurable duration (driven by a timing token or prop); duration should be long enough for the message to be read (minimum ~3 seconds for short messages).
- Responsive behavior: on narrow viewports, toasts span full width or near-full width at the bottom.

---

## 4. Interaction Behavior

- States:
  - Entering: toast animates in (slide up or fade in).
  - Visible: toast is displayed and the auto-dismiss timer is running.
  - Paused: auto-dismiss timer pauses on hover or focus.
  - Exiting: toast animates out before removal.
  - Dismissed: toast is removed from the DOM.
- Keyboard behavior:
  - Tab moves focus to the action link and dismiss button (if present).
  - Enter or Space activates the focused element.
  - Escape dismisses the focused toast.
- Screen reader behavior:
  - Uses `role="status"` for info/success toasts (polite announcement).
  - Uses `role="alert"` for warning/error toasts (assertive announcement).
  - Auto-dismissal does not cause a screen reader announcement (only appearance does).
- Motion rules:
  - Enter and exit animations respect reduced-motion preferences.
  - When reduced motion is preferred, toasts appear and disappear without animation (instant swap).

---

## 5. Accessibility Requirements

- ARIA: `role="status"` for info/success; `role="alert"` for warning/error. `aria-live="polite"` or `aria-live="assertive"` matches the variant. Dismiss button has `aria-label`. Action link has a descriptive label.
- Focus: when a toast appears, focus is not forcibly moved to it; it is a non-modal notification. Action and dismiss controls are keyboard-reachable via Tab.
- Contrast: all text and icons meet WCAG AA contrast ratios against the toast background token.
- Reduced motion: enter/exit animations suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: background (per variant), border (if used), icon color, message text, action text, shadow, focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, animation durations, or font sizes.
- Dark mode: all variant tokens must resolve to accessible, distinguishable values in dark mode.

---

## 7. Composition Rules

- What can wrap it: a Toast provider or portal that manages the toast queue and positioning.
- What it may contain: an icon slot, a message text slot, an action slot (optional), a dismiss slot (optional).
- Anti-patterns:
  - Do not use Toast for messages that require user acknowledgment (use ConfirmDialog or Alert).
  - Do not use Toast for persistent, page-level notices (use Banner).
  - Do not stack more than 3–5 toasts simultaneously; queue and replace older toasts.

---

## 8. Performance Constraints

- Memoization: individual toast items should be memoized to prevent unnecessary re-renders during queue updates.
- Virtualization: not applicable.
- Render boundaries: toasts are rendered in a portal at the document root; individual toast components are leaf display elements.

---

## 9. Test Requirements

- Render: toast renders with message, icon, and action slot for each variant.
- Auto-dismiss: toast removes itself after the configured duration.
- Pause on hover/focus: auto-dismiss timer pauses when the toast is hovered or focused.
- Manual dismiss: dismiss button removes the toast immediately.
- Keyboard: Tab reaches action and dismiss elements; Enter/Space activates them; Escape dismisses the focused toast.
- Accessibility: correct ARIA role and live region for each variant; dismiss button has accessible label; text meets contrast requirements.
- Theming: semantic tokens apply; no hardcoded colors; dark mode tokens resolve correctly.
- Reduced motion: enter/exit animations are suppressed when reduced motion preference is active.
