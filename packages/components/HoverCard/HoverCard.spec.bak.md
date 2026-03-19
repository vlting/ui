# Component Spec — HoverCard

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Content popover that appears on hover or focus of a trigger element.
- Use for user profile previews, link previews, and supplementary information on hover.
- Do NOT use for critical content that users must see. Do NOT use on mobile (hover is unreliable).

---

## 2. UX Intent

- **Doherty Threshold** — configurable delay prevents accidental triggers while keeping response fast.
- **Tesler's Law** — manages open/close timing and positioning internally.

---

## 3. Anatomy

Compound component with timer-based state management:
- `HoverCard` (Root) — manages open state with delays. Props: `openDelay` (700ms default), `closeDelay` (300ms default).
- `HoverCard.Trigger` — element that triggers on hover/focus.
- `HoverCard.Content` — positioned popover panel. Props: `side` (`'top'`/`'bottom'`), `align` (`'start'`/`'center'`/`'end'`).

> **TypeScript is the source of truth for props.** See source files in `HoverCard/` for the full typed API.

---

## 4. Behavior

### States

- **Closed** — content hidden.
- **Open** — content visible at configured position.
- Hovering over content extends visibility (prevents close on mouse transition).

### Keyboard Interaction

- Focus trigger to show content (keyboard accessible).
- Future enhancement: Escape to dismiss.

### Motion

None.

---

## 5. Accessibility

- **ARIA attributes:** `role="tooltip"` on content.
- **Focus management:** Content appears on trigger focus (keyboard accessible).
- **Screen reader announcements:** Content announced via tooltip role.

---

## 6. Styling

- **Design tokens used:** `$background`, `$borderColor`, `$shadowMdColor`. Shadow with offset and radius for depth.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Any element where supplementary info on hover is useful — links, avatars, usernames.
- **What this component can contain:** Any content in the popover panel.
- **Anti-patterns:** Do not put interactive controls inside HoverCard (use Popover instead). Do not rely on HoverCard for essential information.

---

## 8. Breaking Change Criteria

- Removing timer-based open/close behavior.
- Removing side/align positioning.
- Removing `role="tooltip"`.
- Changing default delays.

---

## 9. Test Requirements

- **Behavioral tests:** Verify content appears after `openDelay` on hover. Verify content hides after `closeDelay` on mouse leave. Verify hovering over content prevents close. Verify `side` and `align` position correctly.
- **Accessibility tests:** Verify `role="tooltip"` on content. Verify content appears on trigger focus (keyboard). Verify content is accessible to screen readers.
