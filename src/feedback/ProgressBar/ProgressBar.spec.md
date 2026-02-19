# Component Spec — ProgressBar

## 1. Purpose

Visualizes the progress of a deterministic operation — such as a file upload, a multi-step process, or a loading sequence — as a filled bar that grows from 0% to 100% along a track.

Use when: the completion percentage of an operation is known and can be communicated visually.

Do NOT use when: the duration or completion percentage of the operation is unknown (use Spinner or an indeterminate loading animation instead), or when communicating a stock level or threshold status (use StockLevelIndicator).

---

## 2. UX Intent

- Primary interaction goal: reduce anxiety and uncertainty during long-running operations by showing measurable progress.
- Expected user mental model: a loading bar — universally understood from file downloads, form submissions, and installation wizards.
- UX laws applied:
  - Doherty Threshold: progress updates must appear promptly and smoothly; a stalled bar erodes trust.
  - Gestalt (Continuity): the filled portion and the track form a single continuous visual unit.
  - Miller's Law: a single progress bar communicates one operation; multiple simultaneous bars should be used sparingly.

---

## 3. Visual Behavior

- Layout: full-width horizontal track within its container; height is fixed by a size token.
- Track: the background/empty portion of the bar; uses a muted/surface color token.
- Fill: the progress portion; uses a primary or semantic color token and grows from left to right (LTR) or right to left (RTL).
- Optional label: a percentage or step label positioned above, below, or beside the bar; uses a caption scale token.
- Corner radius: both track and fill share a radius token for consistent pill or squared style.
- Token usage: track background, fill color, label text color, and corner radius all sourced from theme tokens.
- Responsive behavior: bar fills the width of its container; label may be hidden on very narrow containers.
- Indeterminate variant: when progress is unknown, the fill animates continuously across the track (indeterminate pattern).

---

## 4. Interaction Behavior

- The ProgressBar is non-interactive (display only).
- States:
  - In progress (determinate): fill width reflects the current progress value (0–100).
  - Indeterminate: fill animates continuously; value is not displayed.
  - Complete: fill is at 100%; optional completion token (color change or icon) may be applied.
  - Error: fill uses an error/danger color token to indicate a failed operation.
- Motion rules:
  - The fill width transition uses a smooth animation token.
  - The indeterminate animation loops continuously.
  - Both animations respect reduced-motion preferences; when reduced motion is preferred, the fill snaps to the current value without animation, and the indeterminate variant shows a static partial fill.

---

## 5. Accessibility Requirements

- ARIA: `role="progressbar"` with `aria-valuenow`, `aria-valuemin` (0), and `aria-valuemax` (100). For indeterminate, omit `aria-valuenow`. `aria-label` or `aria-labelledby` describes the operation.
- Focus: the ProgressBar is not focusable (display only).
- Contrast: fill color must meet WCAG AA contrast ratios against the track color.
- Color alone: where possible, accompany the bar with a text label showing the percentage or step.
- Reduced motion: fill transition animation and indeterminate animation are suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: track background, fill color (default, complete, error), label text color, corner radius, fill transition duration/easing.
- Prohibited hardcoded values: no hardcoded hex colors, pixel heights, border radii, or font sizes.
- Dark mode: track and fill tokens must resolve to accessible, distinguishable values in dark mode.

---

## 7. Composition Rules

- What can wrap it: form sections, upload UIs, multi-step wizard headers, LoadingOverlay bodies, card bodies.
- What it may contain: a track (container) and a fill (value indicator); an optional label slot.
- Anti-patterns:
  - Do not use ProgressBar for unknown-duration loading (use Spinner).
  - Do not use ProgressBar to represent stock levels or thresholds (use StockLevelIndicator).
  - Do not stack multiple ProgressBars vertically for a single operation.

---

## 8. Performance Constraints

- Memoization: the component should only re-render when the progress value changes.
- Virtualization: not applicable.
- Render boundaries: leaf-level display component; no internal data subscriptions.

---

## 9. Test Requirements

- Render: bar renders with the correct fill width for a given progress value (e.g., 50% value = 50% fill width).
- Indeterminate: indeterminate variant renders the animation without a numeric value.
- Complete: 100% value applies the complete state styling.
- Error: error state applies the danger/error fill token.
- Accessibility: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label` are present and correct.
- Theming: token-based colors apply; no hardcoded values; dark mode tokens resolve correctly.
- Reduced motion: fill transition and indeterminate animation are suppressed when reduced motion preference is active.
