# Component Spec — Switch

## 1. Purpose

Provides a toggle control for immediately enabling or disabling a single binary setting, where the effect takes place without requiring a form submit action.

Use it for settings that apply immediately on change — notifications on/off, dark mode, feature flags, privacy toggles.

Do NOT use it for options that require a form submit to take effect (use Checkbox), for mutually exclusive choices (use RadioGroup), or for non-binary multi-state controls.

---

## 2. UX Intent

- Primary interaction goal: immediate state change — the user toggles the switch and the effect takes place instantly, with visible feedback.
- Expected user mental model: a physical on/off switch or iOS-style toggle. "On" means active/enabled; "Off" means inactive/disabled. The visual state always reflects the real current state.
- UX laws applied:
  - Jakob's Law: use the pill-shaped toggle with a circular thumb. This is the universally recognized "toggle switch" pattern across iOS, Android, and web.
  - Fitts's Law: the entire switch track (and optionally the label) forms the tap target. Minimum tap target must meet 44pt on mobile.
  - Doherty Threshold: the switch thumb animation must complete within 200ms. Any dependent UI change (e.g., a settings section appearing) must occur within 400ms.

---

## 3. Visual Behavior

- Layout: a horizontal row with the switch control and an associated label. The switch may be on the left or right of the label depending on context; consistency within a settings group is required.
- Spacing: gap between control and label from space tokens. Minimum row height from size tokens.
- Typography: label uses a body or label scale. Optional description below the label uses a caption scale.
- Token usage:
  - Off track: muted surface or border token.
  - On track: primary accent token.
  - Thumb: white or on-accent foreground token.
  - Focus ring: outline/focus-ring token around the track.
  - Disabled off track: muted token (darker than off track without opacity overlay).
  - Disabled on track: muted accent token.
  - Disabled thumb: muted foreground token.
- Responsive behavior: the switch control size remains consistent across breakpoints. The `size` prop adjusts the control proportionally using size tokens.

---

## 4. Interaction Behavior

- States:
  - Off idle: muted track, thumb on the left.
  - On idle: accent track, thumb on the right.
  - Off hover: slight track background shift to hover token.
  - On hover: slight track darkening.
  - Focus (either state): focus ring visible around the track.
  - Disabled off: muted track and thumb; not interactive.
  - Disabled on: muted accent track and thumb; not interactive.
  - Loading: the switch may show a loading spinner on the thumb while the state change is processing; the control is non-interactive during loading.
- Controlled vs uncontrolled: controlled via `checked` / `onCheckedChange`. Uncontrolled via `defaultChecked`.
- Keyboard behavior:
  - Tab focuses the switch.
  - Space toggles the state.
  - Enter does not toggle (switch convention).
- Screen reader behavior: `role="switch"` with `aria-checked` (true/false). Accessible name via associated label. If loading, `aria-busy="true"` may be set. Description associated via `aria-describedby`.
- Motion rules: thumb slides from one end to the other using a short spring or ease-out transition from motion tokens. Track color changes simultaneously. Suppressed under reduced motion (instant state change, no animation).

---

## 5. Accessibility Requirements

- ARIA requirements: `role="switch"` with `aria-checked` (true/false). Associated label via `<label>` element or `aria-labelledby`. Optional description via `aria-describedby`. `aria-disabled="true"` when disabled (or native `disabled` attribute). `aria-busy="true"` when loading.
- Focus rules: in the tab order. Focus ring clearly visible around the track. Clicking the label also toggles the switch.
- Contrast expectations: off-state track must meet non-text contrast (3:1) against background. On-state track must meet non-text contrast. Thumb must meet non-text contrast against track in both states.
- Reduced motion behavior: the thumb slide animation and track color transition are instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: off-track (muted surface), on-track (primary accent), thumb (on-accent or neutral foreground), disabled muted tokens, focus-ring token, space tokens (control size, label gap, row min-height), border-radius (pill/capsule for track, circle for thumb).
- Prohibited hardcoded values: no raw hex colors, no pixel-based switch dimensions, no hardcoded animation durations.
- Dark mode expectations: off-track must be visible against dark backgrounds. On-track accent must remain clearly distinct from the off-track. Thumb must be visible against both track states in dark mode.

---

## 7. Composition Rules

- What can wrap it: settings pages, preference panels, onboarding option screens, permission toggles within lists.
- What it may contain: the switch track and thumb. Externally, a label element and an optional description.
- Anti-patterns:
  - Do not use Switch for options that require form submit to take effect — use Checkbox.
  - Do not use Switch for choosing between two named states (e.g., "Light" / "Dark") — use a segmented control or RadioGroup.
  - Do not use Switch without a visible or programmatic label.
  - Do not use Switch inside a form where only a submit button applies the changes.

---

## 8. Performance Constraints

- Memoization rules: memoize Switch when rendered in long settings lists. Each switch is independent.
- Virtualization: not applicable; handled by the parent list.
- Render boundaries: pure presentational primitive. Any async side effect (e.g., saving the setting to an API) is handled by the `onCheckedChange` callback in the parent.

---

## 9. Test Requirements

- What must be tested:
  - Renders in the off state by default (when no `checked` or `defaultChecked` is provided).
  - Renders in the correct state when `checked` or `defaultChecked` is provided.
  - Clicking the switch calls `onCheckedChange` with the toggled value.
  - Clicking the label calls `onCheckedChange`.
  - Disabled switch does not respond to clicks or key presses.
  - Loading state prevents interaction and sets `aria-busy`.
- Interaction cases:
  - Space key toggles the state when focused.
  - Tab focuses the switch.
- Accessibility checks:
  - `role="switch"` and `aria-checked` reflect the current state.
  - Accessible name is present via label.
  - Focus ring is visible when focused.
  - Non-text contrast passes for track and thumb in both states and both themes.
  - Thumb animation is suppressed under reduced motion.
