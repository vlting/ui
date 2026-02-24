# Component Spec — VisuallyHidden

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Hides content visually while keeping it accessible to screen readers.
- Use for providing screen reader text that has no visual counterpart, such as accessible labels for icon-only buttons, loading announcements, or descriptive text for complex visuals.
- Do NOT use to hide decorative content (use `aria-hidden="true"` instead). Do NOT use as `display: none` — VisuallyHidden must remain in the accessibility tree.

---

## 2. UX Intent

- Bridges the gap between visual design and accessibility by providing content that only screen reader users perceive.
- Follows the established "sr-only" pattern used across the web accessibility community.

---

## 3. Anatomy

Function component wrapping a `styled(View)` frame with the sr-only CSS technique.

Two layers of hidden styles:
- Tamagui styled props: `position: absolute`, `width: 1`, `height: 1`, `padding: 0`, `margin: -1`, `overflow: hidden`, `borderWidth: 0`.
- Inline CSS styles: `clip: rect(0, 0, 0, 0)`, `clipPath: inset(50%)`, `whiteSpace: nowrap`.

> **TypeScript is the source of truth for props.** See `VisuallyHiddenProps` in `VisuallyHidden.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive. No visual states — the component is invisible by design.

### Keyboard Interaction

None — VisuallyHidden is not focusable. If a focusable element is placed inside (not recommended), it would receive focus but remain invisible, which breaks usability.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** Renders `<div>` positioned off-screen. Content remains in the accessibility tree.
- **ARIA attributes:** None added by VisuallyHidden itself — the content inside is what screen readers announce.
- **Screen reader announcements:** All text/element children are announced normally.
- **Important:** VisuallyHidden is the opposite of `aria-hidden` — content is screen-reader-visible but visually hidden.

---

## 6. Styling

- **Technique:** Standard sr-only: absolute positioning, 1x1px, clipped, overflow hidden.
- **Design tokens used:** None — uses fixed values that must be exact for the technique to work.
- **Responsive behavior:** Not applicable — always hidden regardless of viewport.
- **Dark mode:** Not applicable — no visual appearance.

---

## 7. Composition

- **What can contain this component:** Any component that needs to provide screen reader text — buttons, icons, form groups, loading states.
- **What this component can contain:** Text content, Text components, or live region announcements.
- **Anti-patterns:** Do not place focusable elements inside VisuallyHidden (invisible focus trap). Do not use for content that should be hidden from everyone (`aria-hidden="true"` or conditional rendering instead). Do not use for large blocks of content.

---

## 8. Breaking Change Criteria

- Changing the sr-only technique (could make content visible or remove it from the accessibility tree).
- Adding `aria-hidden` (would defeat the purpose).
- Changing the rendered element in a way that affects screen reader behavior.

---

## 9. Test Requirements

- **Behavioral tests:** Verify rendered element has all sr-only CSS properties applied (position, width, height, clip, clipPath, overflow, margin). Verify children render as descendants in the DOM.
- **Accessibility tests:** Verify content is NOT visible visually (element dimensions effectively 0). Verify content IS present in the accessibility tree (not `aria-hidden`). Verify screen reader can access the text content.
