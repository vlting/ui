> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Progress

## 1. Purpose

- Displays a horizontal bar indicating completion percentage.
- Use for determinate progress (file uploads, form completion, step indicators).
- Do NOT use for indeterminate loading — use Spinner or Loader instead.

---

## 2. UX Intent

- **Primary interaction goal:** Communicate how much of a task is complete.
- **Expected user mental model:** A filling bar that grows from left to right as progress increases.
- **UX laws applied:**
  - **Doherty Threshold** — provides continuous visual feedback during long operations.
  - **Gestalt Continuity** — the track-to-indicator relationship communicates a single value on a scale.

---

## 3. Anatomy

- **Progress** (Root) — Track container wrapping Tamagui's Progress primitive.
- **Progress.Indicator** — Internal fill bar (rendered by Tamagui, not directly exposed).

Single-component API; no compound sub-components are exposed.

> **TypeScript is the source of truth for props.** See `ProgressProps` in `Progress.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Empty** — `value` is 0; indicator has no visible width.
- **Partial** — Indicator fills proportionally to `value / max`.
- **Complete** — `value` equals `max`; indicator fills the full track.

### Keyboard Interaction

- None. Progress is a non-interactive visual indicator.

### Motion

- Tamagui Progress.Indicator may animate width changes.
- Should respect `prefers-reduced-motion`.

---

## 5. Accessibility

- **Semantic element:** Tamagui Progress renders with `role="progressbar"` semantics.
- **ARIA attributes:** `aria-valuenow` (current value), `aria-valuemin` (0), `aria-valuemax` (max), `aria-label` (consumer-provided).
- **Focus management:** Not focusable — purely informational.
- **Screen reader announcements:** Value communicated via ARIA value attributes.

---

## 6. Styling

- **Design tokens used:** Track uses `$borderColor` background; indicator uses `$color` (theme foreground). Size variant maps: `sm` = `$1`, `md` = `$2`, `lg` = `$3` height. Border radius `$10` (pill shape).
- **Responsive behavior:** Full-width by default; size can be changed per breakpoint.
- **Dark mode:** Token-based; resolves automatically.

---

## 7. Composition

- **What can contain this component:** Any layout — commonly inside cards, forms, or upload UIs.
- **What this component can contain:** No children.
- **Anti-patterns:** Do not use without an accessible label (either `aria-label` or a visible label element linked via `aria-labelledby`).

---

## 8. Breaking Change Criteria

- Removing `value`, `max`, or `size` props.
- Changing the ARIA role from `progressbar`.
- Removing the size variant scale.
- Changing the indicator fill direction.

---

## 9. Test Requirements

- **Behavioral tests:** Indicator width proportional to `value/max`; clamped at 0 and max; default max is 100.
- **Accessibility tests:** `role="progressbar"` present; `aria-valuenow`, `aria-valuemin`, `aria-valuemax` reflect props; `aria-label` passed through.
- **Visual regression:** Empty (0%), partial (50%), complete (100%) at each size.
