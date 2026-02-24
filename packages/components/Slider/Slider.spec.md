> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Slider

## 1. Purpose

- Provides a draggable slider for selecting a numeric value within a range.
- Use for continuous value selection (volume, brightness, price range filters).
- Do NOT use for discrete choices — use RadioGroup or Select instead.

---

## 2. UX Intent

- **Primary interaction goal:** Adjust a numeric value by dragging a thumb along a track.
- **Expected user mental model:** A horizontal bar with a draggable handle; position corresponds to value.
- **UX laws applied:**
  - **Fitts's Law** — thumb is a circular target with adequate size per size variant.
  - **Doherty Threshold** — value updates in real time during drag.

---

## 3. Anatomy

- **Slider** (Root) — Single-component API wrapping Tamagui Slider internals.
  - Tamagui Slider.Track — Background track.
  - Tamagui Slider.TrackActive — Filled portion of the track.
  - Tamagui Slider.Thumb — Draggable circular handle.

Single-prop API; Tamagui sub-components are used internally but not exposed.

> **TypeScript is the source of truth for props.** See `SliderProps` in `Slider.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Idle** — Thumb at current value position; track partially filled.
- **Hover** — Thumb may show hover indicator.
- **Dragging** — Thumb follows pointer; value updates continuously.
- **Focus** — Focus ring on thumb.
- **Disabled** — Reduced opacity; no drag or keyboard interaction.

### Keyboard Interaction

- **Arrow Left/Down** — Decrease value by `step`.
- **Arrow Right/Up** — Increase value by `step`.
- **Home** — Set to `min`.
- **End** — Set to `max`.
- Follows the [WAI-ARIA Slider pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/).

### Motion

- No transition animations; thumb position updates immediately.

---

## 5. Accessibility

- **Semantic element:** Tamagui Slider provides `role="slider"` semantics.
- **ARIA attributes:** `aria-valuenow`, `aria-valuemin`, `aria-valuemax` on thumb; `aria-label` (consumer-provided).
- **Focus management:** Thumb is focusable; keyboard adjusts value.
- **Screen reader announcements:** Current value, min, max announced.

---

## 6. Styling

- **Design tokens used:** Track uses `$borderColor` background; active track uses `$color`. Thumb is circular with `$background` fill and `$borderColor` border. Size variant (`sm`/`md`/`lg`) controls track height and thumb dimensions.
- **Responsive behavior:** Full-width by default.
- **Dark mode:** Token-based; resolves automatically.

---

## 7. Composition

- **What can contain this component:** Forms, settings panels, filter controls.
- **What this component can contain:** No children.
- **Anti-patterns:** Do not use without a visible label or `aria-label`. Do not use for multi-thumb range selection (current API supports single value only).

---

## 8. Breaking Change Criteria

- Removing `value`, `onValueChange`, `min`, `max`, `step`, or `size` props.
- Changing the ARIA slider role.
- Removing keyboard interaction.
- Changing the value-to-array conversion (internal Tamagui API bridge).

---

## 9. Test Requirements

- **Behavioral tests:** Value updates on drag; `onValueChange` fires; `min`/`max`/`step` constraints enforced; controlled and uncontrolled modes; disabled prevents interaction.
- **Accessibility tests:** `role="slider"` present; `aria-valuenow`/`aria-valuemin`/`aria-valuemax` correct; keyboard arrows adjust value; Home/End set extremes.
- **Visual regression:** Default, disabled, each size variant, value at min/mid/max.
