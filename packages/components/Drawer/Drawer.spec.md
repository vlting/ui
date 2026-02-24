# Component Spec — Drawer

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Panel that slides in from a screen edge for secondary content or actions.
- Use for mobile navigation, settings panels, detail views, and form inputs that benefit from overlay presentation.
- Do NOT use for critical content that must be visible at all times. Do NOT use as a replacement for in-page navigation on desktop.

---

## 2. UX Intent

- **Tesler's Law** — manages slide animation, overlay, and focus trapping internally.
- **Doherty Threshold** — smooth directional animation provides immediate feedback on open/close.

---

## 3. Anatomy

Compound component wrapping `@tamagui/dialog` with directional positioning:
- `Drawer` (Root) — state management with direction context. Props: `direction` (`'bottom'`/`'top'`/`'left'`/`'right'`), `open`, `onOpenChange`.
- `Drawer.Trigger` — opens the drawer.
- `Drawer.Content` — slide-in panel with max dimensions (90vw/90vh), direction-specific border radius.
- `Drawer.Header` — padded container for title and close button.
- `Drawer.Footer` — action button container.
- `Drawer.Title` / `Drawer.Description` — semantic dialog title and description.
- `Drawer.Close` — closes the drawer.
- Optional touch handle bar for vertical drawers (auto-shown on touch devices when `showHandle`).

> **TypeScript is the source of truth for props.** See source files in `Drawer/` for the full typed API.

---

## 4. Behavior

### States

- **Closed** — drawer and overlay hidden.
- **Open** — overlay visible, drawer slides in from specified edge.

### Keyboard Interaction

- **Escape** — closes the drawer (inherited from Dialog).
- **Tab/Shift+Tab** — focus trapped within the drawer.

### Motion

- Directional slide animation based on `direction` prop.
- Overlay fade in/out.
- Must respect `prefers-reduced-motion`.

---

## 5. Accessibility

- **Semantic element:** Built on Tamagui Dialog — provides `role="dialog"`.
- **ARIA attributes:** `aria-modal="true"`, `aria-labelledby` (Title), `aria-describedby` (Description).
- **Focus management:** Focus trapped within drawer. Returns to trigger on close.

---

## 6. Styling

- **Design tokens used:** `$background` for content, `$overlayBackground` for overlay, `$borderColor`, `$color6` for handle, shadow tokens for depth.
- **Direction-specific radius:** corners rounded opposite to the slide edge.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Any page or layout that needs an overlay panel.
- **What this component can contain:** Header, Footer, Title, Description, Close, and any content.
- **Anti-patterns:** Do not nest drawers. Do not use `bottom` direction for wide desktop content (use `left`/`right`).

---

## 8. Breaking Change Criteria

- Removing a direction value.
- Removing sub-components.
- Removing focus trapping or Escape dismissal.
- Changing max dimensions (90vw/90vh).

---

## 9. Test Requirements

- **Behavioral tests:** Verify each direction slides from the correct edge. Verify Escape closes. Verify overlay renders. Verify `onOpenChange` fires. Verify handle bar renders for vertical drawers.
- **Accessibility tests:** Verify `role="dialog"`. Verify focus is trapped. Verify focus returns to trigger on close.
