# Component Spec — MapInfoCard

## 1. Purpose

Displays a floating information card anchored to a specific point on the map, typically revealed when a user taps or clicks a MapPin or ClusterMarker. It presents summary details about a place, point of interest, or data point (title, description, image, actions) without navigating away from the map.

Use when: a user activates a map marker and needs to see a summary of that location's information before deciding to take a further action (e.g., get directions, view full detail).

Do NOT use when: the information requires a full-page detail view — use navigation to a detail page. Do not use for purely informational overlays with no association to a specific point — use a map legend or panel instead.

---

## 2. UX Intent

- Primary interaction goal: give users enough information about a selected location to decide their next action, without losing the map context.
- Expected user mental model: the info popup that appears when tapping a pin in Google Maps or Apple Maps — a floating card with key details and action buttons.
- UX laws applied:
  - Jakob's Law: the floating info card / callout popover is a well-established map UI pattern.
  - Hick's Law: limit actions in the card to 1–2 primary actions to avoid decision paralysis.
  - Gestalt (figure/ground): the card floats above the map with a shadow, clearly separate from the background.

---

## 3. Visual Behavior

- Renders as a floating card anchored to its associated map marker, typically above or below it.
- The card has a surface background token, rounded corners (radius token), and a drop shadow (shadow token) to elevate it above the map.
- A pointer/caret connects the card to the marker it describes.
- Card contents (in order, all optional except title): image or icon, title (primary heading), subtitle or address, body description, and an action row (buttons).
- Title uses a heading typography token; subtitle and body use body/caption tokens with muted color.
- The card has a fixed maximum width (size token); content wraps within it.
- A close button is present in the top-right corner.
- If multiple markers are selected or the card would overflow the map, it repositions to remain fully visible.

---

## 4. Interaction Behavior

- Open/close state is controlled by a prop (`open`) with an `onOpenChange` callback. An uncontrolled `defaultOpen` is also supported.
- Closing triggers: pressing the close button, pressing Escape, pressing the map background, or a programmatic prop change.
- Action buttons inside the card fire consumer-provided callbacks.
- Keyboard behavior:
  - On open, focus moves into the card (to the close button or the first focusable element).
  - Tab cycles through focusable elements inside the card.
  - Escape closes the card and returns focus to the triggering marker.
- Screen reader behavior: the card has `role="dialog"` or `role="tooltip"` depending on whether it has interactive elements. If interactive, it is a dialog with `aria-modal="false"` (non-modal). If purely informational, it is a tooltip/status region.
- Motion: card appears with a scale + fade-in; closes with a fade-out. Reduced motion suppresses scale and uses instant show/hide.

---

## 5. Accessibility Requirements

- If the card contains interactive elements (buttons, links), it carries `role="dialog"` with `aria-label` or `aria-labelledby` (the card title).
- If the card is purely informational (no interactive children), it carries `role="status"` or `role="tooltip"` and is `aria-live="polite"`.
- Focus moves into the card on open (for dialog mode); returns to the triggering marker on close.
- The close button carries `aria-label="Close"`.
- All text contrast must meet WCAG AA.
- The card must not trap focus — Tab must be able to leave the card (though Escape closes it).
- The caret/pointer is decorative and carries `aria-hidden="true"`.

---

## 6. Theming Rules

- Required tokens: surface/background token, shadow token for elevation, radius token for corners, border token (optional), primary text token for title, muted text token for subtitle/body, space tokens for padding and action row gap, size token for max-width.
- Prohibited: no hardcoded colors, pixel widths, or raw box-shadow values.
- Dark mode: card background, shadow, text, and border tokens must resolve correctly in dark themes.

---

## 7. Composition Rules

- MapInfoCard is triggered by and visually anchored to a MapPin or ClusterMarker; it is not a standalone floating element.
- It accepts slotted content: image, title, subtitle, body, and action slots.
- It is positioned by the map layer — geographic anchoring is the responsibility of MapContainer, not MapInfoCard.
- Anti-patterns:
  - Do not embed a full form or wizard inside MapInfoCard — keep it summary-level.
  - Do not use MapInfoCard outside of a map context.
  - Do not stack multiple open MapInfoCards simultaneously — at most one should be visible.

---

## 8. Performance Constraints

- MapInfoCard should not render its children until it is first opened (lazy render).
- Once opened, content remains mounted while open; it unmounts on close.
- Animation must use GPU-accelerated properties only (transform, opacity).
- The card must not trigger re-renders of other map layers when it opens or closes.

---

## 9. Test Requirements

- Renders when `open` is true and does not render when false.
- Displays title, subtitle, body, and action content when provided.
- Displays a close button.
- Closing via close button fires `onOpenChange(false)`.
- Closing via Escape fires `onOpenChange(false)`.
- Focus moves into the card on open (dialog mode).
- Focus returns to the trigger marker on close.
- `role="dialog"` and `aria-labelledby` are present when interactive.
- Close button has `aria-label="Close"`.
- Reduced motion suppresses open/close animation.
- Renders correctly in light and dark themes.
