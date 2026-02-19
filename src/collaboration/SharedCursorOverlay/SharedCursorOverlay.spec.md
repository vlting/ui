# Component Spec — SharedCursorOverlay

## 1. Purpose

Renders a transparent overlay layer over a collaborative editing surface that displays the real-time cursor positions and text selections of other active participants. Each remote cursor is labeled with the participant's name and rendered in their assigned color.

Use when: A collaborative document or canvas surface needs to show live cursor positions of remote participants.

Do NOT use when: The surface is read-only for all users, real-time collaboration is not supported, or the context is single-user only.

---

## 2. UX Intent

- Primary interaction goal: Create a sense of shared presence and awareness — users can see exactly where their collaborators are working within the document in real time.
- Expected user mental model: Remote cursors similar to Google Docs or Figma multiplayer — blinking cursor lines with a colored name label that smoothly follow each remote user's position.
- UX laws applied:
  - Proximity (Gestalt): Each cursor label stays visually close to its cursor line to make it immediately clear whose cursor it belongs to.
  - Doherty Threshold: Cursor positions must update smoothly and quickly enough to feel live (within 400ms of a position change, with interpolation for smoother motion).
  - Tesler's Law: The overlay must not add complexity to the user's own editing experience — it sits below the user's own focus layer.

---

## 3. Visual Behavior

- Layout: An absolutely positioned, full-size overlay layer that matches the dimensions of the document editing area exactly. Renders on top of the document content but below any UI chrome or menus.
- Spacing: Cursor labels are offset from the cursor line tip to avoid obscuring surrounding text. Labels reposition if they would overflow the viewport edge.
- Typography: Cursor labels use a small, bold text token. Label text is always the participant's display name.
- Token usage: Cursor colors are participant-specific and assigned by the parent (not hardcoded). Label background uses the assigned color. Label text uses a high-contrast white or dark token against the assigned background. Overlay itself is fully transparent as a background.
- Responsive behavior: The overlay scales with the document surface at all viewport sizes. On touch devices, cursor positions may not be meaningful (remote cursors are still displayed for pointer-capable remote participants).

---

## 4. Interaction Behavior

- States:
  - Active: Displays one cursor element per remote participant with a current position.
  - Participant idle: Cursor may dim or hide after a period of inactivity, determined by parent.
  - Empty: No cursors rendered when no remote participants have active positions.
- Controlled vs uncontrolled: Fully controlled. Parent supplies an array of participant cursor objects (id, name, color, position coordinates, selection range if applicable).
- Keyboard behavior: The overlay itself is not keyboard interactive. It must not intercept keyboard events from the document editor beneath it.
- Screen reader behavior: Remote cursor positions are not announced to screen readers in real time (this would be disruptive). A separate summary of active participants is provided by `PresenceIndicator`.
- Motion rules: Cursor position changes animate with smooth interpolation (CSS transition or spring). Selection highlights fade in/out. Reduced motion: all position animations are instant; no interpolation.

---

## 5. Accessibility Requirements

- ARIA requirements: The overlay container must have `aria-hidden="true"` so screen readers ignore it entirely. Presence information is exposed through `PresenceIndicator` instead.
- Focus rules: The overlay must be non-focusable (`tabIndex={-1}` equivalent). No focus should ever land inside this component.
- Contrast expectations: Cursor name labels must be legible against their assigned color background. The label background color is participant-assigned; label text must be auto-selected (white or dark) to maintain WCAG AA contrast.
- Reduced motion behavior: Position transition animations are fully suppressed. Cursors teleport to new positions instantly.

---

## 6. Theming Rules

- Required tokens: label text color tokens (high-contrast light and dark), label border radius token, label padding spacing token, cursor line width token (fine, using a border/width token), overlay z-index token.
- Prohibited hardcoded values: No hardcoded participant colors (supplied by parent), no hardcoded z-index numbers, no hardcoded pixel offsets for label positioning.
- Dark mode expectations: Label text tokens switch between light and dark contexts automatically. The overlay itself remains transparent in all themes.

---

## 7. Composition Rules

- What can wrap it: Must be a direct child of the `DocumentEditor` or collaborative canvas component, rendered as an overlay sibling to the editable content.
- What it may contain: One cursor element per remote participant. Each cursor element contains a cursor line (blinking caret) and a name label. May contain selection highlight rectangles for remote text selections.
- Anti-patterns:
  - Do not embed WebSocket or CRDT logic inside this component.
  - Do not allow the overlay to capture pointer or keyboard events.
  - Do not render the current user's own cursor — only remote participants.
  - Do not use this component outside of a collaborative editing surface.

---

## 8. Performance Constraints

- Memoization rules: Each individual cursor element must be memoized by participant ID. Position updates should not cause the entire overlay to re-render — only the affected cursor element.
- Virtualization: Not applicable — the number of simultaneous cursors is inherently small (typically under 10 collaborators).
- Render boundaries: The overlay must not trigger layout recalculations in the document content below it. Use absolute/fixed positioning and pointer-events: none.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct number of cursor elements for the given participants array.
  - Renders nothing when the participants array is empty.
  - Each cursor element displays the correct participant name and is styled with the correct participant color.
  - The overlay does not intercept pointer events.
- Interaction cases:
  - Cursor position updates are reflected in the DOM without full overlay re-render.
  - Participant removal removes the corresponding cursor element.
- Accessibility checks:
  - `aria-hidden="true"` is set on the overlay container.
  - No focusable elements exist inside the overlay.
  - Reduced motion: position transition animations are suppressed.
