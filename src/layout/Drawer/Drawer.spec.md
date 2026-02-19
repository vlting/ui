# Component Spec — Drawer

## 1. Purpose

Provides a panel that slides in from an edge of the viewport (typically left or right) to reveal supplementary content, navigation, or actions without fully navigating away from the current page.

Use when: secondary navigation, filters, detail views, or contextual toolbars need to be accessible without displacing primary content.

Do NOT use when: the content requires full user attention and should block all interaction (use a Modal instead), or when the content is always visible on larger breakpoints and should be inlined.

---

## 2. UX Intent

- Primary interaction goal: allow users to access supplementary content on demand without losing context of the main page.
- Expected user mental model: a physical drawer sliding out from the side of the screen — content is hidden at rest and revealed on demand.
- UX laws applied:
  - Jakob's Law: follows native drawer/sheet patterns users already know from mobile OS and web apps.
  - Fitts's Law: the trigger target and close affordance must be large enough to tap on touch devices.
  - Tesler's Law: complexity of hiding/showing content is absorbed by the component, not delegated to the consumer.

---

## 3. Visual Behavior

- Renders as a vertical stack panel anchored to a viewport edge.
- Default placement is on the left or right edge; top/bottom placements may be supported for sheet-style usage.
- Width (or height for top/bottom) is constrained by a size token — never a raw pixel value.
- An overlay/scrim covers the rest of the viewport when the drawer is open; scrim opacity uses a color token.
- Drawer panel background uses the surface/card background token; it must visually separate from page content via elevation or border tokens.
- Spacing inside the drawer is governed exclusively by space tokens.
- On larger breakpoints the drawer may transition to a persistent sidebar layout (no overlay).

---

## 4. Interaction Behavior

- States: closed (hidden off-screen), open (visible, overlaying content), transitioning (animating between states).
- Controlled pattern: open state is driven by a prop (`open`) with an `onOpenChange` callback. An uncontrolled default-open mode may be supported via `defaultOpen`.
- Closing triggers: pressing the scrim/overlay, pressing Escape, activating a close button within the drawer, or a programmatic prop change.
- Swipe-to-close gesture is supported on touch devices.
- Keyboard behavior:
  - Focus is trapped inside the drawer while open.
  - Escape key closes the drawer.
  - Tab cycles through focusable elements inside the drawer.
  - When closed, focus returns to the element that triggered the drawer.
- Screen reader behavior: the panel is announced as a dialog region; its open/close state is communicated via ARIA attributes.
- Motion rules: open/close transitions use a slide animation. Motion is suppressed or replaced with an instant show/hide when `prefers-reduced-motion` is active.

---

## 5. Accessibility Requirements

- Root element carries `role="dialog"` and `aria-modal="true"` when open.
- A visible or visually-hidden label must be associated via `aria-label` or `aria-labelledby`.
- Focus is trapped within the drawer while open; focus is restored to the trigger on close.
- The scrim must not be focusable but must be keyboard-dismissible via Escape.
- Color contrast of all text and interactive elements inside the drawer must meet WCAG AA (4.5:1 for text, 3:1 for UI components).
- Reduced motion: the slide animation is disabled; the drawer appears/disappears immediately.

---

## 6. Theming Rules

- Required tokens: background color (surface), overlay/scrim color with opacity, border color, shadow/elevation, size tokens for width/height, space tokens for inner padding.
- Prohibited: no hardcoded color values, pixel dimensions for padding/gap, or font sizes.
- Dark mode: background, border, and scrim tokens must all resolve correctly in both light and dark themes without additional overrides from the consumer.

---

## 7. Composition Rules

- May wrap any child content: navigation lists, forms, filters, detail panels.
- Typically triggered by a Button or IconButton outside the Drawer; the trigger is not part of the Drawer itself.
- May be composed with a TopNav or Sidebar trigger affordance.
- Anti-patterns:
  - Do not nest a Drawer inside another Drawer.
  - Do not place full-page workflows inside a Drawer — use a dedicated route or Modal instead.
  - Do not use raw pixel values for width inside a Drawer.

---

## 8. Performance Constraints

- Drawer content should be conditionally rendered or portaled — it must not occupy the DOM layout tree when closed.
- Children should not re-render when the drawer is closed.
- Heavy content inside the drawer (lists, images) should be deferred until the first open.
- No virtualization is required by this component itself; consumers embedding long lists must provide their own.

---

## 9. Test Requirements

- Renders closed by default without visible DOM content.
- Opens when `open` prop is set to `true`.
- Closes when the scrim is pressed/clicked.
- Closes when the Escape key is pressed.
- Focus is trapped inside while open.
- Focus returns to the trigger element after closing.
- `onOpenChange` callback fires with `false` on close.
- `aria-modal` and `role="dialog"` are present when open.
- Animation is suppressed under `prefers-reduced-motion`.
- Renders correctly in both light and dark themes.
