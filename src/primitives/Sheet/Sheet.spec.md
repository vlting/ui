# Component Spec — Sheet

## 1. Purpose

Provides a slide-in panel anchored to an edge of the viewport (bottom on mobile, right or left on desktop) for presenting auxiliary content, forms, or multi-step flows without fully blocking the primary page context.

Use it for secondary actions, detail panels, navigation drawers, filter panels, and flows that benefit from a persistent visual connection to the triggering context.

Do NOT use it for critical blocking interactions that require full attention (use Dialog), for brief confirmations (use Dialog), or for content that should always be visible (use a sidebar layout).

---

## 2. UX Intent

- Primary interaction goal: auxiliary task completion — the user interacts with the sheet content (reads detail, adjusts filters, fills a form) and dismisses the sheet to return to the main content.
- Expected user mental model: a bottom drawer on mobile (familiar from iOS/Android native sheets) and a side panel on desktop. The underlying content is visible and, in some contexts, still reachable.
- UX laws applied:
  - Jakob's Law: bottom sheets on mobile and right-side drawers on desktop are established cross-platform conventions.
  - Fitts's Law: the sheet's drag handle (on mobile) must be a large enough touch target. The close button must also meet minimum touch target size.
  - Tesler's Law: the sheet absorbs the complexity of animation, snap points, and focus management so consumers need only manage open/closed state.
  - Doherty Threshold: the sheet must become interactive within 400ms of the trigger action.

---

## 3. Visual Behavior

- Layout:
  - Mobile: slides up from the bottom of the viewport. Has a drag handle at the top. Supports snap points (e.g., half-height, full-height).
  - Desktop: slides in from the right (default) or left edge. Full viewport height. Fixed width (from size tokens).
- Spacing: internal padding from space tokens. Content area is scrollable if content exceeds viewport height.
- Typography: no prescriptive typography at the container level — content defines its own type styles.
- Token usage:
  - Scrim: semi-transparent overlay token (may be none for modal-less/non-blocking sheets).
  - Sheet surface: elevated surface/panel token with shadow.
  - Drag handle: secondary/muted foreground token.
  - Border: border token on the exposed edge of the sheet.
- Responsive behavior: anchored to the bottom on mobile; to the right (or left) on tablet/desktop. The snap point behavior is only active on mobile.

---

## 4. Interaction Behavior

- States:
  - Closed: sheet is not in the DOM or off-screen.
  - Open: sheet is visible and interactive.
  - Snap points (mobile): sheet rests at defined snap positions; dragging adjusts position.
  - Dragging (mobile): sheet follows touch drag with momentum.
  - Modal vs non-modal: when modal (`modal={true}`), a scrim is present and background content is non-interactive. When non-modal (`modal={false}`), background content remains interactive.
- Controlled vs uncontrolled: `open` / `onOpenChange` controlled by parent. Drag-to-dismiss calls `onOpenChange(false)` when dragged past the dismiss threshold. Snap points are managed internally.
- Keyboard behavior:
  - In modal mode: focus is trapped within the sheet. Escape closes the sheet.
  - In non-modal mode: focus is not trapped. Escape still closes the sheet.
  - Tab cycles through focusable elements in the sheet.
- Screen reader behavior: in modal mode, `role="dialog"` with `aria-modal="true"` and `aria-labelledby` (if a title is present). In non-modal mode, `role="region"` with `aria-label`. The drag handle is not exposed to screen readers (it is a touch-only affordance).
- Motion rules: slide-in/slide-out uses a spring or ease-out animation from motion tokens. Drag follows touch position (no motion preference applies to the drag itself). Suppressed open/close animation under reduced motion (instant appear/disappear).

---

## 5. Accessibility Requirements

- ARIA requirements: modal sheet uses `role="dialog"`, `aria-modal="true"`, `aria-labelledby` or `aria-label`. Non-modal sheet uses `role="region"` with `aria-label`. The scrim is hidden from screen readers. Close button has a descriptive `aria-label`.
- Focus rules: modal mode — focus trapped, returns to trigger on close. Non-modal mode — focus not trapped, but the sheet's first focusable element receives focus on open. Escape closes the sheet.
- Contrast expectations: all content within the sheet meets WCAG AA. The drag handle color meets non-text contrast (3:1). Close button icon meets non-text contrast.
- Reduced motion behavior: open/close animation is instant under `prefers-reduced-motion: reduce`. Drag interaction retains touch following (not animated, so unaffected).

---

## 6. Theming Rules

- Required tokens: sheet surface, scrim (optional), shadow, border, drag handle color, space tokens (internal padding, content gap), radius tokens (top corners on mobile, left/right corners on desktop side panel), z-index tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based widths or heights, no hardcoded z-index values.
- Dark mode expectations: sheet surface must be visually elevated above the page in dark mode. Scrim must effectively dim the background. Drag handle must be visible against the sheet surface.

---

## 7. Composition Rules

- What can wrap it: any page that needs a slide-in auxiliary panel. The trigger element is outside the Sheet.
- What it may contain: arbitrary content — forms, filter controls, member detail views, navigation links, multi-step flows. A close button or drag handle is provided by the Sheet itself.
- Anti-patterns:
  - Do not use Sheet for critical, blocking confirmations — use Dialog.
  - Do not nest a Sheet inside another Sheet.
  - Do not use Sheet as the primary navigation structure — use a persistent layout sidebar.
  - Do not render Sheet without any way to close it (close button or Escape key must always be available).

---

## 8. Performance Constraints

- Memoization rules: render only when open. Content mounts on open and may optionally unmount on close (configurable via a `keepMounted` prop for performance-sensitive content).
- Virtualization: not applicable at the container level. Content inside the sheet manages its own virtualization.
- Render boundaries: the Sheet renders in a portal to avoid z-index and overflow issues. No data fetching.

---

## 9. Test Requirements

- What must be tested:
  - Sheet is absent from the DOM (or off-screen) when `open` is false.
  - Sheet renders and is visible when `open` is true.
  - Escape key calls `onOpenChange(false)`.
  - Close button calls `onOpenChange(false)`.
  - In modal mode: clicking the scrim calls `onOpenChange(false)`.
  - In modal mode: focus is trapped inside the sheet.
  - In non-modal mode: focus is not trapped; background content remains interactive.
  - Drag-to-dismiss calls `onOpenChange(false)` when dragged past threshold (mobile).
- Interaction cases:
  - Tab cycles through focusable elements in the sheet.
  - Escape closes the sheet from any focused element.
  - Focus returns to the trigger after close.
- Accessibility checks:
  - Modal: `role="dialog"`, `aria-modal`, `aria-labelledby` or `aria-label` are correct.
  - Non-modal: `role="region"` and `aria-label` are present.
  - Focus trap works in modal mode.
  - Focus restoration works on close.
  - All content contrast passes in both themes.
  - Open/close animation is suppressed under reduced motion.
