# Component Spec — Icon

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Standardized wrapper for rendering icon components with consistent size and color props.
- Use whenever an icon needs to be rendered alongside text, inside buttons, or in any context requiring a uniform icon interface.
- Do NOT use for large illustrative graphics or images. Do NOT use as a standalone interactive element — wrap in Button or Pressable for interactivity.

---

## 2. UX Intent

- **Fitts's Law** — when placed inside interactive elements, the icon contributes to the touch target's visual affordance.
- Icons must be universally recognizable. The wrapper does not modify icon behavior — the icon renders exactly as its source component intends.

---

## 3. Anatomy

Plain React function component (NOT a Tamagui styled component). Renders the passed `icon` component directly with forwarded `size` and `color` props. No wrapping container element.

- `icon`: component conforming to `IconFC` (`ComponentType<{ size?: number; color?: string }>`).
- `size`: number (default: 20).
- `color`: optional string.

> **TypeScript is the source of truth for props.** See `Icon.tsx` and the `IconFC` type for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive. No hover, focus, active, or disabled states.

### Keyboard Interaction

None — Icon must never appear in the tab order.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** Renders whatever the icon component renders (typically `<svg>`).
- **ARIA attributes:** Decorative by default. When the icon conveys meaning without accompanying text, the consumer must add `aria-label` to the parent interactive element.
- **Contrast:** Icon `color` must meet WCAG 3:1 for non-text graphical elements. This is a consumer and theme-level responsibility.

---

## 6. Styling

- **Design tokens used:** None directly — Icon is a plain component. Color and size are passed through to the icon component.
- **Default size:** 20 (unitless, interpreted as pixels by icon libraries).
- **Responsive behavior:** Does not support Tamagui media-query props. Consumers manage responsive sizing at the usage site.
- **Dark mode:** Consumer passes appropriate theme-resolved color.

---

## 7. Composition

- **What can contain this component:** Button, Pressable, HStack, VStack, Box, or any layout container.
- **What this component can contain:** Nothing — renders a single icon component as a leaf.
- **Anti-patterns:** Do not use Icon as a clickable element on its own. Do not pass complex components as the `icon` prop — it must conform to `IconFC`. Do not rely on the icon alone to convey critical information.

---

## 8. Breaking Change Criteria

- Changing the `IconFC` type signature.
- Changing the default `size` from 20.
- Wrapping the icon in additional DOM elements.
- Switching to Tamagui `styled()` (would change type API and rendering behavior).

---

## 9. Test Requirements

- **Behavioral tests:** Verify icon component receives `size` and `color` props. Verify default size is 20. Verify renders without error when `color` is omitted. Verify no wrapping container element.
- **Accessibility tests:** Verify no implicit accessible name. Verify decorative treatment by default.
