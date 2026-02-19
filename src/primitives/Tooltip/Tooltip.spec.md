# Component Spec — Tooltip

## 1. Purpose

Provides a short, contextual text label that appears near a UI element on hover or focus to clarify its purpose, provide additional context, or explain an abbreviated or icon-only control.

Use it for icon buttons without visible labels, abbreviated text that may be unclear in isolation, and disabled controls that need a reason explaining why they are disabled.

Do NOT use it as a primary labeling mechanism (labels must always be visible for important controls), for long explanatory content (use a Popover), for interactive content (Tooltips must not contain interactive elements), or as the sole accessibility label for a control.

---

## 2. UX Intent

- Primary interaction goal: clarification on demand — the user hovers over or focuses an element and receives a brief explanation without cluttering the primary UI.
- Expected user mental model: a "hint" or "title" bubble. Familiar from native OS tooltips, web `title` attributes, and design systems across the industry.
- UX laws applied:
  - Jakob's Law: follow the established tooltip pattern — appears on hover/focus, disappears on blur/mouse leave, brief text only.
  - Hick's Law: tooltip content must be one short phrase or sentence. Never present choices or lengthy explanations.
  - Fitts's Law: the tooltip is not interactive. The trigger element must meet minimum touch/click target size independently.
  - Doherty Threshold: the tooltip must appear within 400ms of hover start. A brief intentional delay (300–500ms) prevents accidental tooltip flashes during fast mouse movement.

---

## 3. Visual Behavior

- Layout: a small floating label positioned near the trigger element. Default placement is above the trigger; placement adapts to viewport edges (auto-flip to below, left, or right as needed).
- Spacing: internal padding from space tokens. Tooltip stays a consistent offset distance from the trigger (using a space token for the gap).
- Typography: tooltip text uses a caption or small label scale. Single line preferred; two lines maximum. Never wraps to three or more lines.
- Token usage:
  - Background: a high-contrast surface token (typically inverted — dark in light mode, light in dark mode) or a neutral elevation token.
  - Text: a contrasting foreground token against the tooltip background.
  - Border radius: small/medium radius token.
  - Shadow: optional subtle shadow token for elevation.
  - Arrow: a small directional indicator using the same background token.
- Responsive behavior: on touch devices, tooltips do not appear on hover (touch has no hover). Focus-triggered tooltips do appear on touch (e.g., via keyboard navigation). Touch-specific patterns (long-press tooltips) are opt-in.

---

## 4. Interaction Behavior

- States:
  - Hidden: tooltip is not in the DOM or not visible.
  - Delay (hover): hover has started; tooltip will appear after the delay threshold.
  - Visible: tooltip is shown near the trigger.
  - Dismissing: tooltip fades out after mouse leaves or focus moves away.
- Controlled vs uncontrolled: primarily uncontrolled (show/hide managed internally by hover/focus detection). A `open` prop allows controlled usage for programmatic display.
- Keyboard behavior:
  - When the trigger element receives focus via keyboard, the tooltip appears immediately (no delay).
  - When focus moves away from the trigger, the tooltip disappears.
  - The tooltip itself is not focusable and cannot receive keyboard focus.
  - Escape key hides the tooltip.
- Screen reader behavior: the tooltip content is associated with the trigger via `aria-describedby` (pointing to the tooltip element's ID) or `aria-label` (if used as the sole label for an icon button). The tooltip element has `role="tooltip"`. Screen readers announce the tooltip content when the trigger is focused.
- Motion rules: tooltip appearance uses a short fade-in from motion tokens. Disappearance uses a short fade-out. Suppressed under reduced motion (instant appear/disappear).

---

## 5. Accessibility Requirements

- ARIA requirements: the tooltip has `role="tooltip"` and a unique ID. The trigger element has `aria-describedby` pointing to the tooltip ID (when tooltip is supplementary to an existing label) or `aria-label` (when tooltip is the sole label). The tooltip must not be hidden with `display:none` when visible — it must be in the accessibility tree.
- Focus rules: the tooltip itself is not focusable. Only the trigger element is in the tab order. When the trigger is focused, the tooltip is announced by screen readers.
- Contrast expectations: tooltip text against tooltip background must meet WCAG AA (4.5:1). The inverted surface pattern typically achieves high contrast naturally.
- Reduced motion behavior: fade-in/fade-out animations are instant (or omitted) under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: tooltip surface (high-contrast or inverted background), tooltip foreground (contrasting text), border-radius, shadow (optional), space tokens (internal padding, offset from trigger), type scale (caption/small).
- Prohibited hardcoded values: no raw hex colors, no pixel-based dimensions, no hardcoded z-index values (use z-index tokens), no hardcoded animation durations.
- Dark mode expectations: the tooltip surface should remain visually distinct from the background in both modes. The inverted pattern (dark in light mode, light in dark mode) is preferred. If a neutral elevation pattern is used instead, it must meet contrast requirements in both modes.

---

## 7. Composition Rules

- What can wrap it: any trigger element — icon buttons, abbreviated labels, disabled form controls, truncated text. The Tooltip wraps or is associated with the trigger, not the other way around.
- What it may contain: a single short string of text. No interactive elements (links, buttons). No images. No more than two lines of text.
- Anti-patterns:
  - Do not use Tooltip as the primary label for an important interactive control — visible labels are always required.
  - Do not put interactive content (buttons, links) inside the Tooltip.
  - Do not use Tooltip to reveal essential information that cannot be accessed on touch devices.
  - Do not use Tooltip for long explanatory text — use Popover.
  - Do not display a Tooltip without any delay on hover (prevents accidental flashing during fast mouse movement).

---

## 8. Performance Constraints

- Memoization rules: memoize when many Tooltip instances are rendered in a list (e.g., icon-only toolbar with 20 buttons). The tooltip content itself is lightweight.
- Virtualization: not applicable.
- Render boundaries: the tooltip renders in a portal to avoid z-index and overflow clipping issues. The tooltip content only mounts when visible (or just before appearing).

---

## 9. Test Requirements

- What must be tested:
  - Tooltip content is not visible initially.
  - Hovering the trigger after the delay threshold shows the tooltip.
  - Moving the mouse away hides the tooltip.
  - Focusing the trigger via keyboard shows the tooltip immediately (no delay).
  - Moving focus away from the trigger hides the tooltip.
  - Escape key hides the tooltip.
  - Tooltip placement adapts to viewport edges (flips when near an edge).
  - Controlled mode: tooltip visibility is driven by the `open` prop.
- Interaction cases:
  - Tooltip does not appear on touch devices from hover (only from focus).
  - Trigger element is reachable via keyboard.
- Accessibility checks:
  - Tooltip has `role="tooltip"`.
  - Trigger has `aria-describedby` or `aria-label` referencing the tooltip.
  - Tooltip text is readable by screen readers when the trigger is focused.
  - Tooltip is not in the tab order.
  - Contrast meets WCAG AA in both themes.
  - Fade animations are suppressed under reduced motion.
