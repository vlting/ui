> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Popover

## 1. Purpose

- Displays floating content anchored to a trigger element.
- Use for interactive popovers containing forms, menus, or rich content.
- Do NOT use for simple text labels — use Tooltip instead. Do NOT use for confirmations — use AlertDialog.

---

## 2. UX Intent

- **Primary interaction goal:** Reveal contextual content without navigating away.
- **Expected user mental model:** Clicking a trigger opens a floating panel near the trigger; clicking outside or pressing Escape closes it.
- **UX laws applied:**
  - **Gestalt Proximity** — popover appears adjacent to its trigger, indicating association.
  - **Tesler's Law** — positioning, focus trapping, and dismiss behavior handled automatically.

---

## 3. Anatomy

- **Popover** (Root) — State container managing open/close.
- **Popover.Trigger** — Element that toggles the popover.
- **Popover.Anchor** — Optional alternative anchor point for positioning.
- **Popover.Content** — The floating panel with styled frame.
- **Popover.Arrow** — Optional arrow pointing to the trigger.
- **Popover.Close** — Button that closes the popover.

> **TypeScript is the source of truth for props.** See `PopoverProps` in `Popover.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Closed** — Content hidden; trigger in default state.
- **Open** — Content visible; positioned relative to trigger/anchor.
- **Hover** (when `hoverable` is true) — Opens on hover instead of click.

### Keyboard Interaction

- **Enter/Space** on trigger — Toggles popover.
- **Escape** — Closes the popover (Tamagui built-in).
- **Tab** — Focus cycles through content (Tamagui manages focus).
- Follows the non-modal dialog pattern.

### Motion

- Tamagui popover enter/exit animations (opacity, scale).
- Should respect `prefers-reduced-motion`.

---

## 5. Accessibility

- **Semantic element:** Tamagui Popover renders appropriate ARIA structure automatically.
- **ARIA attributes:** Trigger gets `aria-expanded`, `aria-haspopup`; Content gets `role="dialog"` (Tamagui-managed).
- **Focus management:** Focus moves into content on open; returns to trigger on close.
- **Screen reader announcements:** Popover content announced when opened.

---

## 6. Styling

- **Design tokens used:** `$background`, `$borderColor` on content frame; `$4` border radius; `$4` padding; arrow uses `$background` fill with `$borderColor` border.
- **Responsive behavior:** Placement adapts via Tamagui's floating positioning.
- **Dark mode:** Token-based; resolves automatically.

---

## 7. Composition

- **What can contain this component:** Any layout context.
- **What this component can contain:** Trigger accepts any single child; Content accepts arbitrary children including forms and interactive elements.
- **Anti-patterns:** Do not put another Popover inside a Popover. Do not use for non-interactive tooltip content.

---

## 8. Breaking Change Criteria

- Removing any sub-component (Trigger, Content, Arrow, Close, Anchor).
- Removing `open`, `onOpenChange`, or `placement` props.
- Changing the ARIA structure of the content panel.
- Removing Escape-to-close behavior.

---

## 9. Test Requirements

- **Behavioral tests:** Opens/closes on trigger click; `onOpenChange` callback fires; `hoverable` mode opens on hover; controlled mode respects `open` prop.
- **Accessibility tests:** `aria-expanded` toggles on trigger; Escape closes; focus moves to content on open and returns on close.
- **Visual regression:** Open state with arrow in each placement direction.
