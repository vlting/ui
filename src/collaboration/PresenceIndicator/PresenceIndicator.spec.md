# Component Spec — PresenceIndicator

## 1. Purpose

Displays the set of users currently active in a shared document, workspace, or session. Typically rendered as a horizontal row of avatars with an optional overflow count.

Use when: A collaborative surface has multiple simultaneous participants whose presence should be surfaced to all other participants.

Do NOT use when: The context is single-user only, or when presence data is irrelevant to the surface (e.g., a solo settings page).

---

## 2. UX Intent

- Primary interaction goal: Provide at-a-glance awareness of who else is currently viewing or editing the same context, building collaborative confidence.
- Expected user mental model: Overlapping avatar circles similar to Google Docs or Figma — a compact, familiar pattern that communicates "others are here with you."
- UX laws applied:
  - Miller's Law: Show a maximum of 4-5 avatars before collapsing to an overflow count (e.g., "+3 more") to avoid overwhelming the indicator.
  - Proximity (Gestalt): Avatars overlap or sit in close proximity to signal they are part of the same group.
  - Fitts's Law: The presence indicator should be large enough to interact with (e.g., tap to see a full list of participants) without requiring precision.

---

## 3. Visual Behavior

- Layout: Horizontal row of avatar circles. Avatars slightly overlap using a negative margin. An overflow badge appears at the end when participant count exceeds the visible limit.
- Spacing: Avatars have a consistent size (using a size token). Overlap amount is a defined fraction of avatar size, derived from a spacing or size token.
- Typography: Overflow count badge uses a small, bold text token. Avatar initials (fallback) use a legible token-sized font.
- Token usage: Avatar border color, overflow badge background, overflow count text color, status dot colors (online/away/offline) — all from theme tokens.
- Responsive behavior: The indicator remains compact at all breakpoints. On very narrow contexts, it may reduce the number of visible avatars further.

---

## 4. Interaction Behavior

- States:
  - Idle: Displays current participants.
  - Empty / no peers: Component is hidden or renders nothing when only the current user is present (determined by parent).
  - Hover on avatar: Tooltip displays the participant's name.
  - Overflow badge hover: Tooltip or popover lists all additional participants.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the array of participant objects.
- Keyboard behavior: If the indicator is interactive (tap to expand), it must be keyboard operable via Tab and Enter/Space. Tooltips must be triggered on focus as well as hover.
- Screen reader behavior: The group of avatars must have an accessible label summarizing the participants (e.g., "3 people are viewing: Alice, Bob, and Charlie"). Individual avatar images must have appropriate `alt` text.
- Motion rules: When participants join or leave, avatars animate in/out with a subtle scale or fade. Reduced motion: changes are instant.

---

## 5. Accessibility Requirements

- ARIA requirements: Container uses `role="group"` with an `aria-label` describing current participants. Individual avatars use `role="img"` with `alt` text set to the participant's name. Overflow badge announces total count.
- Focus rules: If the component is interactive, it is a single focusable element or a button that opens a participant list. Avoid making each avatar a separate focus stop unless necessary.
- Contrast expectations: Avatar border must contrast against the page background. Overflow badge text must meet WCAG AA against its badge background.
- Reduced motion behavior: Join/leave animations are suppressed; changes appear instantly.

---

## 6. Theming Rules

- Required tokens: avatar size token, avatar border color, avatar border width, overflow badge background, overflow badge text color, status indicator colors (online green, away yellow, offline muted), spacing token for overlap offset, border radius (circle).
- Prohibited hardcoded values: No hardcoded colors, pixel sizes, or z-index values.
- Dark mode expectations: Avatar borders and overflow badge adapt to dark theme tokens. Status dot colors remain semantically meaningful in dark mode.

---

## 7. Composition Rules

- What can wrap it: Typically placed in a document toolbar, page header, or collaborative surface header. May be used inside `CommunityHeader` or document top bars.
- What it may contain: A set of avatar elements and an optional overflow count badge. May include status dots on each avatar.
- Anti-patterns:
  - Do not embed presence state management or WebSocket logic inside this component.
  - Do not render more than 5-6 avatars directly; always collapse to an overflow count.
  - Do not use this component to display a general user list — it is specifically for live presence.

---

## 8. Performance Constraints

- Memoization rules: The component should be memoized and only re-render when the participants array reference changes. Avatar items should be individually memoized.
- Virtualization: Not applicable — the visible list is intentionally capped at a small number.
- Render boundaries: No network calls or presence subscriptions inside this component.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct number of avatar elements for the given participants array.
  - Collapses to an overflow badge when participant count exceeds the visible limit.
  - Renders nothing (or is hidden) when only one participant is present.
  - Tooltip on avatar displays the participant name.
- Interaction cases:
  - Hover/focus on avatar reveals name tooltip.
  - Hover/focus on overflow badge reveals full participant list.
  - Keyboard access to the indicator if it is interactive.
- Accessibility checks:
  - `role="group"` with accurate `aria-label` on container.
  - Individual avatars have descriptive `alt` text.
  - Overflow count is announced to screen readers.
  - Reduced motion: join/leave animations suppressed.
