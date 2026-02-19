# Component Spec — RadiusSelector

## 1. Purpose

Provides a visual and interactive control for selecting a search radius around a geographic point on a map. It typically renders as a circular overlay on the map (centered on a point) combined with a slider or segmented control that lets users adjust the radius value. The selected radius is emitted as a numeric value for use in proximity-based filtering or search queries.

Use when: users need to define a geographic search area around a specific point by specifying a distance radius.

Do NOT use when: the search area is non-circular or defined by a drawn polygon — use a different area-selection control. Do not use for non-geographic distance inputs.

---

## 2. UX Intent

- Primary interaction goal: allow users to intuitively define a circular geographic search area and immediately see its extent on the map.
- Expected user mental model: dragging a ring outward to expand the search bubble on a map — direct manipulation of a visible circle with a matching numeric readout.
- UX laws applied:
  - Fitts's Law: the slider handle or drag handle must be large enough to grab accurately on touch devices.
  - Doherty Threshold: the circle overlay on the map must update in real time as the user drags the slider, within 400ms.
  - Gestalt (figure/ground): the radius circle is semi-transparent and visually distinct from the map but not opaque enough to obscure map content.
  - Tesler's Law: the complexity of converting slider position to geographic radius and rendering the map circle is absorbed by the component.

---

## 3. Visual Behavior

- Consists of two coordinated parts: a circular map overlay and a radius input control (slider, segmented button, or text input with unit label).
- The map overlay is a semi-transparent circle centered on the target coordinate; its fill uses a primary color token at low opacity; its border uses the primary color token at full opacity.
- The circle's visual size on the map updates in real time as the radius value changes.
- The input control displays the current radius as a human-readable value with a unit label (e.g., "5 km" or "3 mi").
- Min and max radius bounds are defined by props and communicated to the user via the slider track endpoints.
- The input control uses space tokens for padding and size tokens for dimensions; typography uses body/label scale tokens.

---

## 4. Interaction Behavior

- Controlled pattern: current radius is driven by a `value` prop with an `onValueChange` callback. Uncontrolled `defaultValue` is also supported.
- Slider drag updates the radius value continuously; the map circle updates in real time.
- Segmented control (if used) selects from preset radius values.
- Text input (if used) allows direct numeric entry; the value is clamped to min/max on blur.
- Unit toggle (km/mi) fires an `onUnitChange` callback and may trigger a unit conversion.
- Keyboard behavior:
  - If a slider is used: Arrow Left/Right (or Down/Up) changes radius by a step increment; Shift + Arrow changes by a larger step; Home/End snap to min/max.
  - If a segmented control is used: Arrow keys navigate between preset options.
- Screen reader behavior: the slider carries `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` (e.g., "5 kilometers"). The map circle overlay carries `aria-hidden="true"`.
- Motion: circle resize on slider drag is immediate (no animation). Circle appearance/disappearance may use a fade; reduced motion suppresses it.

---

## 5. Accessibility Requirements

- If a slider is the input control, it carries `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` expressing the radius in human-readable units.
- `aria-label` must describe the slider's purpose (e.g., "Search radius").
- The map circle overlay carries `aria-hidden="true"` — it is a visual complement to the slider, not a separate interactive element.
- Unit toggle buttons must carry `aria-pressed` or equivalent state indicator.
- All text contrast must meet WCAG AA.
- The slider handle must meet minimum touch target size requirements.

---

## 6. Theming Rules

- Required tokens: primary color token for circle border and fill (at opacity), opacity token for circle fill transparency, size tokens for slider track and thumb, space tokens for control padding, typography token for value label and unit label.
- Prohibited: no hardcoded hex colors, pixel dimensions for the slider, or raw opacity values.
- Dark mode: circle fill/border and control tokens must resolve correctly against dark map tile backgrounds.

---

## 7. Composition Rules

- RadiusSelector is composed inside or alongside MapContainer — the map circle overlay is positioned within the map layer; the input control may be overlaid on the map or placed in an adjacent panel.
- The circle overlay is not a standalone map element — it is coordinated with the input control.
- RadiusSelector does not perform the geographic search — it emits a radius value; the consumer performs the query.
- Anti-patterns:
  - Do not use RadiusSelector outside a map context.
  - Do not display RadiusSelector without a visible map — the circle overlay is meaningless without spatial reference.
  - Do not hardcode unit types — support both metric and imperial via props.

---

## 8. Performance Constraints

- The map circle overlay must update on each slider drag event without lag — use direct style mutation or a GPU-accelerated SVG/canvas update rather than React re-renders for the overlay geometry.
- The `onValueChange` callback should be throttled (not debounced) so the map updates continuously but does not overwhelm consumers.
- The slider track computation must be synchronous and fast.

---

## 9. Test Requirements

- Renders a slider (or segmented control) with the correct initial value.
- Renders the radius value with unit label.
- `onValueChange` fires with the correct value as the slider is dragged.
- Value is clamped to `min` and `max` bounds.
- Arrow key on focused slider changes value by the step increment.
- Shift + Arrow changes value by the large step increment.
- Home/End keys snap to min/max.
- Unit toggle fires `onUnitChange` with the correct unit.
- Slider carries `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-valuetext`.
- Map circle overlay has `aria-hidden="true"`.
- Reduced motion suppresses circle fade animation.
- Renders correctly in light and dark themes.
