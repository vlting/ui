# Component Spec — LocationRadiusSelector

## 1. Purpose

Provides a UI control for selecting a geographic search radius (distance in miles or kilometers) used to filter potential matches in a dating context. It translates a numeric distance preference into a visual, interactive control.

Use when: a user is configuring their discovery preferences and needs to define how far away potential matches may be located.

Do NOT use for: selecting a precise location, entering an address, or configuring non-geographic filters.

---

## 2. UX Intent

- Primary interaction goal: let users intuitively set a maximum distance preference with immediate visual feedback on the chosen value.
- Expected user mental model: a slider with a numeric readout — a common control pattern for range selection (Jakob's Law). Users expect to drag or step the value and immediately see the chosen radius.
- UX laws applied:
  - Fitts's Law: the slider thumb must have a large enough touch target for comfortable use on mobile.
  - Hick's Law: a continuous or stepped slider reduces choice complexity versus a dropdown with many discrete values.
  - Doherty Threshold: the radius value display must update instantly as the slider is moved — no debounce delay in the displayed label.

---

## 3. Visual Behavior

- Layout: a labeled slider track with a value readout displayed above or adjacent to the thumb.
- The label (e.g., "Distance") is shown above the slider; the current value (e.g., "25 km" or "15 mi") is displayed prominently, updating in real time.
- Min and max boundary labels may optionally appear at each end of the track.
- The filled portion of the track (from min to current value) uses an accent color token; the unfilled portion uses a muted track token.
- The thumb uses a surface/background token with a border or shadow to elevate it visually.
- Typography: value readout uses a numeric-emphasis type token; label uses a small body token; boundary labels use a smaller token.
- Token usage: all colors, spacing, and radius from design tokens.
- Responsive: the slider expands to fill available horizontal width; minimum track width enforced to ensure usability.

---

## 4. Interaction Behavior

- States: idle, focused (thumb highlighted), dragging, disabled.
- The selector is controlled: the parent owns the value and receives an `onChange` callback.
- The value may be continuous or snapped to defined steps (e.g., every 5 km).
- A unit toggle (mi / km) may be presented as an adjacent control, with its own `onUnitChange` callback.
- Keyboard behavior:
  - Tab focuses the slider thumb.
  - Arrow left/down decreases the value by one step; Arrow right/up increases by one step.
  - Home moves to minimum; End moves to maximum.
- Screen reader behavior: slider uses `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` providing a human-readable description (e.g., "25 kilometers").
- Motion: thumb and track fill animate smoothly during drag. Respects `prefers-reduced-motion` by removing transition animations.

---

## 5. Accessibility Requirements

- Slider element has `role="slider"`.
- `aria-valuenow` reflects the current numeric value.
- `aria-valuemin` and `aria-valuemax` define the valid range.
- `aria-valuetext` provides a human-readable string including unit (e.g., "25 kilometers").
- `aria-label` or `aria-labelledby` associates the slider with its visible label.
- Disabled state: `aria-disabled="true"`; thumb is not focusable.
- Contrast: thumb, track, and value text meet 4.5:1 contrast against their backgrounds.
- Reduced motion: remove track fill and thumb position transition.

---

## 6. Theming Rules

- Required tokens: accent/primary token for filled track, muted token for unfilled track, surface token for thumb background, `borderColor`, `color` for labels and value readout, `borderRadius` from radius scale, shadow token for thumb elevation.
- Prohibited hardcoded values: no raw color values, no pixel-based track height or thumb size outside the token scale.
- Dark mode: track, thumb, and label colors must all resolve correctly from theme tokens.

---

## 7. Composition Rules

- What can wrap it: a discovery preferences section, a profile editor section, a filter sheet or drawer.
- What it may contain: a label, a numeric value display, the slider track and thumb, and optional boundary labels or unit toggle.
- Anti-patterns:
  - Do not use LocationRadiusSelector for non-distance numeric inputs (use a generic slider or input instead).
  - Do not embed map or geolocation request UI inside this component.
  - Do not present LocationRadiusSelector without a visible label.

---

## 8. Performance Constraints

- The value display and track fill must update synchronously on every pointer/touch move event — no debounced rendering.
- `onChange` may be throttled externally by the consumer for expensive operations (e.g., live search queries), but the visual update must remain immediate.
- Memoize the component to prevent re-renders when unrelated parent state changes.

---

## 9. Test Requirements

- Renders with initial value reflected in the thumb position and value readout.
- Dragging or keyboard-adjusting the slider calls `onChange` with the updated numeric value.
- Arrow key increments/decrements by the defined step.
- Home and End keys set value to min and max respectively.
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` are correctly set and update on change.
- Accessible label is associated with the slider.
- Value readout updates immediately (same render cycle) on input.
- Disabled state: slider is not interactive and has `aria-disabled="true"`.
- No animation on thumb/track when `prefers-reduced-motion` is active.
- Passes automated accessibility audit.
