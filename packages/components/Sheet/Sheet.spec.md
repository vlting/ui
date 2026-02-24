> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Sheet

## 1. Purpose

- Renders a bottom sheet overlay that slides up from the bottom of the screen.
- Use for mobile-friendly modals, action sheets, or supplementary content.
- Do NOT use on desktop where a Dialog or Drawer would be more appropriate.

---

## 2. UX Intent

- **Primary interaction goal:** Present secondary content or actions in a dismissible panel.
- **Expected user mental model:** A panel that slides up from the bottom, can be swiped to different snap points or dismissed.
- **UX laws applied:**
  - **Fitts's Law** — drag handle provides a large touch target for swipe gestures.
  - **Tesler's Law** — snap point management, overlay behavior, and dismiss logic handled internally.

---

## 3. Anatomy

- **Sheet** (Root) — State container managing open/close and snap position.
- **Sheet.Overlay** — Semi-transparent backdrop; dismisses sheet on press (when `dismissOnOverlayPress` is true).
- **Sheet.Handle** — Drag handle indicator at the top of the sheet.
- **Sheet.Frame** — Content container with rounded top corners.
- **Sheet.ScrollView** — Scrollable content area within the frame.

> **TypeScript is the source of truth for props.** See the props in `Sheet.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Closed** — Sheet hidden below viewport.
- **Open** — Sheet visible at current snap point position.
- **Dragging** — User dragging the handle to change snap position.
- **Snapped** — Sheet rests at one of the defined `snapPoints`.

### Keyboard Interaction

- **Escape** — Closes the sheet (Tamagui built-in).
- **Tab** — Cycles focus within sheet content when modal.

### Motion

- Slide-up animation on open; slide-down on close.
- Snap-to-point animation during drag release.
- Should respect `prefers-reduced-motion`.

---

## 5. Accessibility

- **Semantic element:** Tamagui Sheet manages ARIA structure.
- **ARIA attributes:** Modal sheet gets dialog semantics (Tamagui-managed).
- **Focus management:** When `modal` is true, focus is trapped within the sheet.
- **Screen reader announcements:** Sheet open/close state communicated.
- **Important:** Drag-to-dismiss must not be the only dismiss method — Overlay press and Escape key must also work.

---

## 6. Styling

- **Design tokens used:** Overlay uses `$shadow` with 0.5 opacity. Frame uses `$background`, `$4` top border radius, `$4` padding. Handle uses `$gray8` background with pill shape.
- **Responsive behavior:** Full-width by default; snap points control height.
- **Dark mode:** Token-based; resolves automatically.

---

## 7. Composition

- **What can contain this component:** Any screen-level layout.
- **What this component can contain:** Frame accepts arbitrary children; ScrollView for long content.
- **Anti-patterns:** Do not nest Sheets. Do not use without at least one non-gesture dismiss method.

---

## 8. Breaking Change Criteria

- Removing any sub-component (Overlay, Handle, Frame, ScrollView).
- Removing `open`, `onOpenChange`, `snapPoints`, or `modal` props.
- Removing Escape-to-close behavior.
- Changing the slide direction.

---

## 9. Test Requirements

- **Behavioral tests:** Opens and closes via `open` prop; overlay press dismisses (when enabled); `snapPoints` respected; `onOpenChange` fires.
- **Accessibility tests:** Escape closes; focus trapped when modal; non-gesture dismiss method available.
- **Visual regression:** Open at different snap points, with handle, with overlay.
