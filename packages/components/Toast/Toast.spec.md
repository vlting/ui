> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Toast

## 1. Purpose

- Displays temporary notification messages that appear and auto-dismiss.
- Use for non-critical feedback (success confirmations, status updates, warnings).
- Do NOT use for critical errors requiring user action — use AlertDialog. Do NOT use for persistent messages — use Alert.

---

## 2. UX Intent

- **Primary interaction goal:** Inform the user of an event outcome without blocking their workflow.
- **Expected user mental model:** A brief message that slides in, stays briefly, then disappears.
- **UX laws applied:**
  - **Doherty Threshold** — immediate feedback after an action.
  - **Peak-End Rule** — success/error variants provide clear completion signals.
  - **Hick's Law** — minimal content (title + optional description + optional action).

---

## 3. Anatomy

- **Toast** (Root) — Notification container with variant-based styling.
- **Toast.Title** — Bold heading text.
- **Toast.Description** — Supporting description text.
- **Toast.Action** — Optional action button within the toast.
- **Toast.Close** — Dismiss button.
- **Toast.Viewport** — Positioned container where toasts render (typically fixed to viewport edge).
- **Toast.Provider** — Context provider wrapping the application; configures `swipeDirection` and `duration`.

Also exports `useToastController` (to programmatically show toasts) and `useToastState` (to read current toast state).

> **TypeScript is the source of truth for props.** See the exported types in `Toast.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Hidden** — No toast visible.
- **Visible** — Toast shown with enter animation.
- **Hover** — Auto-dismiss timer paused (WCAG 2.2.1 compliance).
- **Focus** — Auto-dismiss timer paused; focus ring on interactive elements.
- **Dismissing** — Exit animation playing before removal.

### Keyboard Interaction

- **Tab** — Focus moves to action/close buttons within the toast.
- **Escape** — Dismisses the toast.
- Hotkey support via Viewport `hotkey` prop.
- Swipe gesture support via Provider `swipeDirection`.

### Motion

- Enter animation (slide + opacity).
- Exit animation (slide + opacity).
- Should respect `prefers-reduced-motion`.

---

## 5. Accessibility

- **Semantic element:** Tamagui Toast manages live region semantics.
- **ARIA attributes:** Live region (`role="status"` or `aria-live="polite"`) for screen reader announcement (Tamagui-managed).
- **Focus management:** Toast does not steal focus. Action/close buttons are keyboard-reachable.
- **Screen reader announcements:** Title and description announced when toast appears.
- **Important:** Auto-dismiss must pause on hover and focus (WCAG 2.2.1 — Timing Adjustable).

---

## 6. Styling

- **Design tokens used:** Variant maps: `default` = `$gray2`/`$borderColor`, `success` = `$green2`/`$green8`, `error` = `$red2`/`$red8`, `warning` = `$yellow2`/`$yellow8`. `$4` border radius, `$4` padding. Title uses `$heading` font.
- **Responsive behavior:** Viewport positioned fixed; typically bottom-right on desktop, bottom-center on mobile.
- **Dark mode:** Token-based; variant colors resolve from theme.

---

## 7. Composition

- **What can contain this component:** Toast.Provider must wrap the application. Toast.Viewport must be rendered once in the layout.
- **What this component can contain:** Title, Description, Action, Close as direct children.
- **Anti-patterns:** Do not use without a Provider. Do not put complex forms inside a toast. Do not rely solely on toasts for error reporting.

---

## 8. Breaking Change Criteria

- Removing any sub-component (Title, Description, Action, Close, Viewport, Provider).
- Removing `variant`, `duration`, or `swipeDirection` props.
- Removing the `useToastController` or `useToastState` hooks.
- Removing auto-dismiss pause on hover/focus.
- Changing the live region semantics.

---

## 9. Test Requirements

- **Behavioral tests:** Toast appears via controller; auto-dismisses after duration; swipe dismisses; action button fires callback; close button dismisses.
- **Accessibility tests:** Live region announces toast; auto-dismiss pauses on hover and focus; action/close buttons keyboard-reachable; Escape dismisses.
- **Visual regression:** Each variant (default, success, error, warning), with action button, with close button.
