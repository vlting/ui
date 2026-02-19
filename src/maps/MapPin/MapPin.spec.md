# Component Spec — MapPin

## 1. Purpose

Displays a single geographic point marker on a map canvas. It visually represents a specific location, point of interest, or data point and provides an interactive affordance for the user to activate and view more detail about that location.

Use when: a specific, individual location must be marked on a map and optionally made interactive.

Do NOT use when: many overlapping points need aggregation — use ClusterMarker. Do not use for area or route representations — use polygon or polyline overlays.

---

## 2. UX Intent

- Primary interaction goal: mark a precise location on the map and allow the user to tap/click to learn more about it.
- Expected user mental model: the classic map pin or teardrop marker seen in every mapping application — a pointed bottom anchored to the geographic coordinate, a rounded top containing an icon or label.
- UX laws applied:
  - Fitts's Law: the pin tap target must be large enough to activate accurately on touch devices; the visual shape should not reduce the interactive area.
  - Jakob's Law: the teardrop pin shape is the universal convention for a map location marker.
  - Gestalt (figure/ground): the pin must stand out clearly from the map tile background at all zoom levels.

---

## 3. Visual Behavior

- Renders as a teardrop / pin shape anchored at its geographic coordinate via its bottom tip.
- The pin body uses a primary or category color token; the tip is a pointed extension of the same color.
- An optional icon or label is rendered inside the pin head.
- Pin size is defined by a size token (small, medium, large variants).
- In selected/active state, the pin scales up or changes color using a primary/accent token; a shadow deepens.
- In idle state, a subtle drop shadow token separates the pin from the map.
- Pins do not overlap — z-index stacking is managed by the map layer; the selected pin renders above others.
- If a label is displayed below the pin, it uses a caption typography token with a contrasting background pill.

---

## 4. Interaction Behavior

- Primary interaction: press/click fires an `onPress` callback with the pin's identifier or data.
- States: idle, hover, focus, active (pressed), selected.
- Selected state is driven by an `selected` prop.
- Keyboard behavior: the pin is focusable (Tab-reachable) in an accessible map context; Enter/Space fires `onPress`.
- Screen reader behavior: the pin announces its label or place name and its actionable state (e.g., "Coffee Shop, San Francisco. Press to view details.").
- Motion: hover/focus scale effect animates using a transform. Selected state transition animates with scale + color change. Both respect `prefers-reduced-motion` and are suppressed when preferred.

---

## 5. Accessibility Requirements

- Each MapPin must have a unique accessible label via `aria-label` (place name or data point name).
- The pin is a focusable, activatable element — it carries `role="button"` or is rendered as a native button.
- Selected state carries `aria-pressed="true"` or equivalent.
- The icon inside the pin (if decorative) carries `aria-hidden="true"`.
- Pin tap target must meet WCAG 2.5.5 (minimum 44x44 px or equivalent touch area) even if the visual pin is smaller.
- Color contrast of the pin against the map background must meet 3:1 (UI component contrast).
- Do not communicate pin state (selected, category) through color alone — also use shape, icon, or label.

---

## 6. Theming Rules

- Required tokens: primary/category color token for pin fill, shadow token for elevation, size tokens for pin dimensions (small/medium/large), typography token for optional label, contrasting text color token for icon or label inside the pin.
- Prohibited: no hardcoded hex colors, pixel sizes for pin dimensions, or raw box-shadow values.
- Dark mode: pin fill and shadow tokens must resolve correctly against dark map tile backgrounds.

---

## 7. Composition Rules

- MapPin is positioned by the parent map rendering layer using geographic coordinates — it does not manage its own position on screen.
- It is a child of MapContainer, rendered in the marker layer.
- When a MapPin is activated, it typically opens a MapInfoCard — that relationship is managed by the consumer, not by MapPin itself.
- Multiple MapPin components may coexist; they cluster into ClusterMarker at low zoom levels (managed by MapContainer).
- Anti-patterns:
  - Do not embed full detail content inside MapPin — use MapInfoCard.
  - Do not use MapPin outside a MapContainer context.
  - Do not use MapPin for aggregated/clustered data — use ClusterMarker.

---

## 8. Performance Constraints

- MapPin must be lightweight — hundreds may be rendered simultaneously on a large dataset.
- State changes (hover, selected) must not trigger re-renders of sibling MapPin components.
- Animation must use GPU-accelerated properties only (transform, opacity).
- Pin assets (icons) must be lightweight SVGs or icon font glyphs — no raster images inside pins.

---

## 9. Test Requirements

- Renders with the correct size variant (small, medium, large).
- Renders optional icon or label inside the pin.
- `onPress` fires when the pin is clicked or activated via keyboard.
- Applies selected visual state when `selected` is true.
- Accessible label accurately describes the location.
- `role="button"` or native button element is present.
- `aria-pressed` is correct for selected state.
- Icon inside pin has `aria-hidden="true"` when decorative.
- Hover/active animation is suppressed under `prefers-reduced-motion`.
- Renders correctly in light and dark map themes.
