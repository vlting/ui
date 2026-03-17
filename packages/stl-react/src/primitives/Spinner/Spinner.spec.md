# Component Spec — Spinner

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Animated loading indicator for indefinite wait states.
- Use when content is loading, a form is submitting, or an action is in progress with unknown duration.
- Use for both inline (button) and section-level loading scenarios.
- Do NOT use for determinate progress (use a progress bar). Do NOT use for content placeholder loading (use Skeleton).

---

## 2. UX Intent

- **Doherty Threshold** — immediate visual feedback that the system is working, preventing users from assuming the interface is frozen.
- Continuous rotation animation signals ongoing activity.

---

## 3. Anatomy

SVG-based spinner with a full-opacity arc on a faded track circle, wrapped in a rotating container. Uses CSS `$spin` animation token.

- `size`: `'sm'` (16px) | `'md'` (20px) | `'lg'` (28px) | `'xl'` (40px). Default: `md`.
- `theme`: `'primary'` | `'secondary'` | `'neutralMin'` | `'neutralMax'` | `'min'` | `'max'`. Default: `neutralMax`.
  - `min` is an alias for `neutralMin` (`$min` — light on dark backgrounds).
  - `max` is an alias for `neutralMax` (`$color12` — dark on light backgrounds).

> **TypeScript is the source of truth for props.** See `SpinnerProps` in `Spinner.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive. Spinner is a passive loading indicator that runs continuously.

### Keyboard Interaction

None — Spinner is not focusable.

### Motion

- CSS animation: `$spin` token (continuous rotation).
- **Reduced motion:** Animation is disabled via `lowMotion` STL config when `prefers-reduced-motion: reduce` is active.

---

## 5. Accessibility

- **Semantic element:** Has `role="status"` — announces loading state to screen readers.
- **ARIA attributes:** `aria-label="Loading"` provides an accessible name.
- **Screen reader announcements:** "Loading" is announced when the Spinner appears in the DOM (via `role="status"` live region semantics).
- **Important:** If the loading context is more specific (e.g., "Saving form"), the consumer should provide a custom `aria-label`.

---

## 6. Styling

- **Design tokens used:**
  - Color: resolved via `theme` variant (`$primary9`, `$secondary9`, `$min`, `$color12`)
  - Container sizes: 16px (sm), 20px (md), 28px (lg), 40px (xl)
- **Cross-platform note:** Uses SVG + CSS animation — web-only. A React Native implementation would need `Animated` API.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Buttons (inline loading), cards, page sections, overlays, form submission areas, dialogs.
- **What this component can contain:** Nothing — Spinner is a self-contained animation.
- **Section-level usage:** For section/page-level loading, use Spinner directly with appropriate `size` (`lg` or `xl`) and `theme`. The deprecated `Loader` component is no longer needed.
- **Anti-patterns:** Do not use multiple spinners in close proximity. Do not use Spinner for content that has a known progress percentage.

---

## 8. Breaking Change Criteria

- Changing size dimension values.
- Removing `role="status"` or `aria-label`.
- Changing default size from `md`.
- Removing an existing `theme` variant.

---

## 9. Test Requirements

- **Behavioral tests:** Verify each size variant renders (`sm`, `md`, `lg`, `xl`). Verify default size is `md`. Verify `min` and `max` theme aliases work. Verify SVG is rendered.
- **Accessibility tests:** Verify `role="status"` is in the DOM. Verify `aria-label="Loading"` is present. Verify not focusable.
- **Visual regression:** All four sizes, all theme variants.
