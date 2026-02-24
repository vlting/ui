> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — ScrollArea

## 1. Purpose

- Provides a styled scrollable container with custom scrollbar appearance.
- Use when native scrollbar styling is insufficient and a consistent cross-browser scrollbar is needed.
- Do NOT use for infinite scroll — combine with a virtualization library instead.

---

## 2. UX Intent

- **Primary interaction goal:** Scroll through content that exceeds the container's visible area.
- **Expected user mental model:** Standard scroll behavior with a visually refined scrollbar.
- **UX laws applied:**
  - **Jakob's Law** — scrolling behavior matches native OS conventions.
  - **Tesler's Law** — custom scrollbar styling is handled internally; consumers just wrap content.

---

## 3. Anatomy

- **ScrollArea** (Root) — Outer container with `position: relative` and `overflow: hidden`.
- **ScrollArea.Viewport** — Inner scrollable area with `overflow` set by `orientation` prop.
- **ScrollArea.Scrollbar** — No-op component for API compatibility (returns `null`).
- **ScrollArea.Thumb** — No-op component for API compatibility (returns `null`).
- **ScrollArea.Corner** — No-op component for API compatibility (returns `null`).

Scrollbar, Thumb, and Corner are intentional no-ops provided for API compatibility with Radix ScrollArea patterns. ScrollArea uses CSS-based scrollbar styling (webkit-scrollbar + scrollbar-width) injected in Root rather than custom scrollbar track/thumb elements.

> **TypeScript is the source of truth for props.** See the exported types in `ScrollArea.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Idle** — Scrollbar visible or hidden based on overflow.
- **Scrolling** — Native scroll behavior; scrollbar thumb position reflects scroll offset.
- **Hover** (scrollbar) — Scrollbar thumb opacity increases on hover (via CSS).

### Keyboard Interaction

- Native browser keyboard scrolling (Arrow keys, Page Up/Down, Home/End, Space).

### Motion

- No custom animations; relies on native scroll.

---

## 5. Accessibility

- **Semantic element:** Viewport is a `<div>` with overflow — native scrolling semantics.
- **ARIA attributes:** None required; native scrollable regions are automatically accessible.
- **Focus management:** Viewport is focusable when scrollable (browser default).
- **Screen reader announcements:** Native scrollable region behavior.

---

## 6. Styling

- **Design tokens used:** Scrollbar width via CSS custom properties; thumb uses `rgba(0,0,0,0.3)` (hardcoded — should migrate to tokens). Root uses `$background` (if set).
- **Responsive behavior:** Viewport `orientation` prop controls scroll direction (vertical, horizontal, both).
- **Dark mode:** Scrollbar thumb opacity is theme-neutral; container background resolves from tokens.
- **Known gap:** Scrollbar thumb color is hardcoded `rgba` — should use a design token.

---

## 7. Composition

- **What can contain this component:** Any layout needing a scrollable region — sidebars, modals, code blocks.
- **What this component can contain:** Any content as children of Viewport.
- **Anti-patterns:** Do not nest ScrollAreas. Do not set fixed height without `overflow: hidden` on the root.

---

## 8. Breaking Change Criteria

- Removing the Root or Viewport sub-components.
- Changing the `orientation` prop values.
- Removing the custom scrollbar CSS injection.
- Changing the Viewport overflow behavior.

---

## 9. Test Requirements

- **Behavioral tests:** Content scrolls within Viewport; `orientation` controls scroll direction; Scrollbar/Thumb/Corner exist as exports (even if null).
- **Accessibility tests:** Viewport is keyboard-scrollable; no ARIA violations.
- **Visual regression:** Vertical scroll, horizontal scroll, both-directions scroll, custom scrollbar appearance.
