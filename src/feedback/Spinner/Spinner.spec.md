# Component Spec — Spinner

## 1. Purpose

Displays an indeterminate loading animation to communicate that the system is working on an operation whose duration or completion percentage is unknown.

Use when: an operation is in progress and progress cannot be quantified (e.g., waiting for an API response, an initial page load, or a background sync).

Do NOT use when: progress percentage is known (use ProgressBar), content shape can be approximated (use SkeletonLoader), or an entire region must be blocked (use LoadingOverlay).

---

## 2. UX Intent

- Primary interaction goal: reassure the user that the system is active and not frozen while they wait.
- Expected user mental model: a spinning indicator — universally understood as "working" or "loading."
- UX laws applied:
  - Doherty Threshold: the spinner must appear promptly when an operation begins; delayed appearance makes users think the UI is unresponsive.
  - Gestalt (Figure/Ground): the spinner is visually distinct from its surrounding content; sized and colored to draw appropriate (but not excessive) attention.

---

## 3. Visual Behavior

- Layout: compact, circular animated element. May be displayed inline (within a button or next to text) or centered within a container.
- Sizes: small, medium, large — driven by size tokens.
- Animation: circular spin or arc animation indicating indeterminate activity.
- Token usage: spinner color (stroke/fill) sourced from theme color tokens; size derived from size tokens.
- Responsive behavior: size does not change with viewport; it reflects the size prop token.

---

## 4. Interaction Behavior

- The Spinner is entirely non-interactive; it does not respond to hover, focus, or keyboard events.
- Screen reader behavior:
  - The spinner has `role="status"` or `role="progressbar"` (indeterminate) with an `aria-label` describing the operation (e.g., "Loading").
  - If placed inline within a button, the button manages accessibility; the spinner itself is `aria-hidden="true"`.
- Motion rules:
  - The spin animation is continuous while the spinner is mounted.
  - When reduced motion is preferred, the animation is replaced with a static icon or pulsing opacity (no rotation).

---

## 5. Accessibility Requirements

- ARIA: standalone spinner uses `role="status"` with `aria-label` (e.g., "Loading"). When embedded in a button, it is `aria-hidden="true"` and the button manages the accessible state.
- Focus: the spinner is not focusable.
- Contrast: spinner stroke/fill must meet WCAG AA contrast ratios against its background.
- Reduced motion: spinning animation is replaced with a static or pulsing indicator when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: spinner color (primary, muted/inverse variants), size tokens for small/medium/large.
- Prohibited hardcoded values: no hardcoded hex colors, pixel sizes, or animation durations.
- Dark mode: spinner color token must resolve to a visible value against dark backgrounds.

---

## 7. Composition Rules

- What can wrap it: buttons (inline loading state), cards, page content areas, LoadingOverlay, list items.
- What it may contain: only the animated indicator itself; it is a leaf component.
- Anti-patterns:
  - Do not use Spinner when the progress percentage is known (use ProgressBar).
  - Do not use Spinner to fill an entire content region when SkeletonLoader would better preserve layout (use SkeletonLoader).
  - Do not nest Spinner inside Spinner.

---

## 8. Performance Constraints

- Memoization: the spinner is a leaf component with no props-driven re-renders during animation.
- Virtualization: not applicable.
- Render boundaries: no internal data subscriptions; mount/unmount is controlled by the parent.

---

## 9. Test Requirements

- Render: spinner renders with the correct size and color tokens for each size variant.
- Accessibility: standalone spinner has `role="status"` and `aria-label`; inline spinner is `aria-hidden`.
- Theming: color and size tokens apply; no hardcoded values; dark mode tokens resolve correctly.
- Reduced motion: spinning animation is replaced with a static or pulsing indicator when reduced motion preference is active.
