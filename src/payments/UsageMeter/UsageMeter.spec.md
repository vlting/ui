# Component Spec — UsageMeter

## 1. Purpose

Visualizes the current usage of a metered resource (API calls, storage, seats, bandwidth) relative to a plan limit, communicating remaining capacity and proximity to the limit.

Use it on billing dashboards, account settings overviews, and feature usage pages where a user needs to understand how much of a quota they have consumed.

Do NOT use it for non-metered, binary feature flags (use a badge or boolean indicator), for progress toward a goal unrelated to a limit (use a general progress bar), or for real-time streaming metrics (use a chart).

---

## 2. UX Intent

- Primary interaction goal: awareness — the user glances at the meter and immediately understands their consumption level and how much headroom remains before hitting the limit.
- Expected user mental model: a fuel gauge or storage progress bar, similar to those in Google Drive, GitHub Actions minutes, or AWS usage dashboards. A high usage level signals urgency.
- UX laws applied:
  - Gestalt Law of Continuity: the filled portion of the meter bar flows continuously from left to right, intuitively representing progress toward a limit.
  - Von Restorff Effect: when usage is high (e.g., above 80%), the meter changes color (warning → danger) to make the critical state visually distinctive.
  - Doherty Threshold: usage value updates must render within 400ms when the component receives new data.
  - Fitts's Law: if the meter has an associated upgrade CTA, the CTA button must have an adequate minimum tap size.

---

## 3. Visual Behavior

- Layout: a labeled container with a resource name label, a filled progress bar, and usage text below (e.g., "7,500 / 10,000 API calls"). Optionally an upgrade CTA link or button when near or at the limit.
- Spacing: the label is above the bar with a small gap. Usage text is below the bar with a small gap. External margin is the responsibility of the parent. Internal spacing from space tokens.
- Typography: resource name uses a label scale. Usage figures use a caption or body scale with tabular numbers. An "Upgrade" link uses a label/action scale.
- Token usage:
  - Bar track (unfilled): muted surface or border token.
  - Bar fill (low usage, < 70%): primary or brand accent token.
  - Bar fill (warning, 70–89%): semantic warning token.
  - Bar fill (critical, >= 90%): semantic destructive/error token.
  - Bar fill (at limit/over, >= 100%): semantic destructive token (fully filled bar).
  - Label text: primary foreground.
  - Usage figures: secondary foreground.
  - Track border-radius: pill radius token.
- Responsive behavior: the bar fills the full width of its container. On narrow viewports, the usage text may wrap to a second line.

---

## 4. Interaction Behavior

- States:
  - Normal (< 70%): bar fills in the default accent color.
  - Warning (70–89%): bar changes to warning semantic color; optionally a warning icon or text appears.
  - Critical (>= 90%): bar changes to destructive color; optionally a "Limit approaching" label and upgrade CTA appear.
  - At limit (100%): bar is fully filled in destructive color; "Limit reached" label and upgrade CTA are prominent.
  - Over limit (> 100%): bar is capped at 100% visually; a distinct "Over limit" indicator (badge or text) appears.
  - Loading: a skeleton bar replaces the meter while data loads.
- Controlled vs uncontrolled: display-only. Accepts `current`, `limit`, `unit`, and `label` as props. No internal state.
- Keyboard behavior: non-interactive display component. If an upgrade CTA is present, it is keyboard-reachable via Tab.
- Screen reader behavior: the usage information must be conveyed as text (e.g., "API calls: 7,500 of 10,000 used, 75%"). The progress bar uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label`. The semantic state (warning, critical) must be conveyed via text, not color alone.
- Motion rules: changes to the bar fill amount use a short width transition from motion tokens. Color changes (state transitions) use a short color transition. Both suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: the bar uses `role="progressbar"` with `aria-valuenow` (current numeric value), `aria-valuemin` (0), `aria-valuemax` (limit), and `aria-label` or `aria-labelledby` describing the resource. The usage text below the bar provides a human-readable description visible to screen readers.
- Focus rules: the meter itself is not focusable. If an upgrade CTA is present, it is in the tab order.
- Contrast expectations: all bar fill colors (accent, warning, destructive) must meet non-text contrast requirements (3:1) against the track background. All text labels meet WCAG AA.
- Reduced motion behavior: the bar fill width and color transitions are instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: primary/accent (normal fill), warning semantic, destructive/error semantic, muted surface (track background), primary text, secondary text, radius tokens (bar track), space tokens (label-to-bar gap, bar height).
- Prohibited hardcoded values: no raw hex colors, no pixel-based heights or widths, no hardcoded percentage thresholds (thresholds should be configurable via props or a default config).
- Dark mode expectations: bar track and fill colors must remain distinguishable and semantically correct in dark mode. Warning and critical states must be clearly different from the normal state in dark mode.

---

## 7. Composition Rules

- What can wrap it: billing dashboards, account overview cards, feature usage sections, sidebar status widgets.
- What it may contain: a resource name label, a progress bar element, usage text, and an optional upgrade CTA.
- Anti-patterns:
  - Do not use UsageMeter for binary on/off features.
  - Do not use it for general progress indicators unrelated to a quota.
  - Do not show multiple nested UsageMeters inside a single UsageMeter.
  - Do not omit the text representation of usage — color alone is insufficient.

---

## 8. Performance Constraints

- Memoization rules: memoize when rendered in a list of multiple meters (e.g., a dashboard showing 5 resource meters). Avoid re-renders when unrelated parent state changes.
- Virtualization: not applicable.
- Render boundaries: the component is purely presentational. It does not fetch usage data.

---

## 9. Test Requirements

- What must be tested:
  - Renders with the correct label, current value, limit, and unit.
  - Bar fill width correctly represents `current / limit` as a percentage.
  - Bar fill color matches the expected semantic state for given `current`/`limit` values (normal, warning, critical, at limit).
  - Usage text displays the correct human-readable figures.
  - Upgrade CTA renders when `current` >= 90% of `limit` (or as configured).
  - Loading skeleton renders when loading is true.
  - Over-limit state renders the appropriate indicator.
- Interaction cases:
  - Upgrade CTA is keyboard-reachable via Tab.
- Accessibility checks:
  - `role="progressbar"` is present with correct `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
  - `aria-label` or `aria-labelledby` describes the resource.
  - State (warning, critical) is conveyed via visible text, not color alone.
  - Bar fill colors meet non-text contrast requirements in both themes.
  - All text labels meet WCAG AA contrast.
  - Transitions are suppressed under reduced motion.
