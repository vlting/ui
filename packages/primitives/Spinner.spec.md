# Component Spec — Spinner

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Animated loading indicator for indefinite wait states.
- Use when content is loading, a form is submitting, or an action is in progress with unknown duration.
- Do NOT use for determinate progress (use a progress bar). Do NOT use for content placeholder loading (use Skeleton).

---

## 2. UX Intent

- **Doherty Threshold** — immediate visual feedback that the system is working, preventing users from assuming the interface is frozen.
- Continuous rotation animation signals ongoing activity.

---

## 3. Anatomy

Function component rendering 8 dots arranged in a circle with progressive opacity, wrapped in a rotating container. Injects a CSS `@keyframes` animation via inline `<style>`.

- `size`: `'sm'` (16px) | `'md'` (20px) | `'lg'` (28px). Default: `md`.
- `color`: optional string — dot color. Defaults to `$color` token.

> **TypeScript is the source of truth for props.** See `SpinnerProps` in `Spinner.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive. Spinner is a passive loading indicator that runs continuously.

### Keyboard Interaction

None — Spinner is not focusable.

### Motion

- CSS animation: `vlting-spinner 1s linear infinite` (continuous rotation).
- 8 dots with progressive opacity (0.15 to 1.0) create a trailing effect.
- **Reduced motion:** The CSS animation should be disabled when `prefers-reduced-motion: reduce` is active. Currently uses inline animation — consumer should wrap in a media query or the component should add a `@media (prefers-reduced-motion: reduce)` rule.

---

## 5. Accessibility

- **Semantic element:** Container has `role="status"` — announces loading state to screen readers.
- **ARIA attributes:** `aria-label="Loading"` provides an accessible name.
- **Screen reader announcements:** "Loading" is announced when the Spinner appears in the DOM (via `role="status"` live region semantics).
- **Important:** If the loading context is more specific (e.g., "Saving form"), the consumer should provide a custom `aria-label`.

---

## 6. Styling

- **Design tokens used:**
  - Dot color: `color ?? '$color'`
  - Dot sizes: 4px (sm), 5px (md), 6px (lg)
  - Container sizes: 16px (sm), 20px (md), 28px (lg)
- **Cross-platform note:** Uses CSS animation and `dangerouslySetInnerHTML` for keyframes — web-only. A React Native implementation would need `Animated` API.
- **Dark mode:** `$color` token resolves automatically.

---

## 7. Composition

- **What can contain this component:** Buttons (inline loading), cards, page sections, overlays, form submission areas.
- **What this component can contain:** Nothing — Spinner is a self-contained animation.
- **Anti-patterns:** Do not use multiple spinners in close proximity. Do not use Spinner for content that has a known progress percentage.

---

## 8. Breaking Change Criteria

- Changing the number of dots or animation style.
- Changing size dimension values.
- Removing `role="status"` or `aria-label`.
- Changing default size from `md`.

---

## 9. Test Requirements

- **Behavioral tests:** Verify each size variant renders correct container and dot dimensions. Verify default size is `md`. Verify custom `color` prop is applied to dots. Verify 8 dots are rendered. Verify keyframe animation is injected.
- **Accessibility tests:** Verify `role="status"` is in the DOM. Verify `aria-label="Loading"` is present. Verify not focusable.
- **Visual regression:** All three sizes, custom color.
