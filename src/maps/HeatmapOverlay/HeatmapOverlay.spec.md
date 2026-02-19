# Component Spec — HeatmapOverlay

## 1. Purpose

Renders a color-coded density visualization overlay on top of a map canvas, communicating the geographic concentration or intensity of a dataset (e.g., population density, incident frequency, signal strength). It is a purely visual layer — it does not handle interaction or point-level detail.

Use when: the goal is to communicate the overall spatial distribution and relative intensity of a dataset across a geographic area, not individual data points.

Do NOT use when: users need to identify or interact with individual data points — use MapPin or ClusterMarker. Do not use when the dataset is too sparse for a meaningful density gradient.

---

## 2. UX Intent

- Primary interaction goal: allow users to visually comprehend geographic density patterns at a glance without processing individual data points.
- Expected user mental model: a weather radar or population density map — continuous color gradients communicate "more here, less there."
- UX laws applied:
  - Gestalt (similarity): similar color regions are perceived as one continuous zone of intensity.
  - Gestalt (continuity): the gradient flows naturally to guide the eye across density gradients.
  - Doherty Threshold: the overlay must render or update within 400ms of data change to avoid the perception of lag.

---

## 3. Visual Behavior

- Renders as a transparent overlay layer above the base map, below interactive markers.
- Color gradient encodes intensity: low density uses cool/neutral color tokens; high density uses warm/accent color tokens. The specific gradient colors are token-driven.
- Opacity of the overlay is configurable via a prop, defaulting to a mid-range value (e.g., 0.6) defined by a design token.
- The overlay updates smoothly when data changes; a fade transition reflects data updates.
- The overlay has no visible border or box — it blends into the map.
- The gradient scale (legend) may be optionally displayed as a separate companion component; it is not embedded in HeatmapOverlay itself.
- On zoom, the heatmap recomputes or scales relative to the new zoom level.

---

## 4. Interaction Behavior

- HeatmapOverlay is non-interactive — it does not respond to tap, click, hover, or keyboard events.
- It passes all pointer events through to layers beneath it (map panning, marker interaction).
- No controlled/uncontrolled state — the overlay is fully driven by data and configuration props.
- Screen reader behavior: the overlay is decorative and must be hidden from the accessibility tree (`aria-hidden="true"`).
- Motion: data-change transitions (fade/blend) respect `prefers-reduced-motion` — the overlay updates immediately without transition when preferred.

---

## 5. Accessibility Requirements

- The overlay element carries `aria-hidden="true"` — it is a purely visual, decorative layer.
- It must not interfere with keyboard or screen reader navigation of the map or markers beneath it.
- Color alone must not be the only means of communicating heatmap intensity — if the heatmap data is critical, a companion legend with text labels must be provided.
- The overlay must not block pointer events to interactive map elements below it.
- The heatmap gradient must be distinguishable for common forms of color vision deficiency; accessible palette tokens should be used by default.

---

## 6. Theming Rules

- Required tokens: color tokens for the low-density and high-density ends of the gradient, opacity token for overlay transparency, transition duration token for data updates.
- Prohibited: no hardcoded hex colors for gradient stops, no raw opacity values.
- Dark mode: gradient color tokens must be defined for dark map themes; lighter gradients may be appropriate on dark map tiles.

---

## 7. Composition Rules

- HeatmapOverlay is a child of MapContainer, rendered in the overlay layer slot — it does not stand alone.
- It is siblings with other overlay layers (route lines, radius circles, marker layers) within the map stack.
- Only one HeatmapOverlay instance should be active per map at a time; stacking multiple overlays is an anti-pattern.
- Anti-patterns:
  - Do not use HeatmapOverlay for displaying categorical or discrete zone data — use polygon overlays for that.
  - Do not embed interactive controls inside HeatmapOverlay.
  - Do not apply HeatmapOverlay outside of a MapContainer context.

---

## 8. Performance Constraints

- Heatmap rendering is computationally intensive — data updates must be debounced or throttled to avoid re-rendering on every data change.
- The overlay must not block the main thread during recalculation; expensive computation should be offloaded if possible.
- Rendering is GPU-accelerated where supported by the underlying map engine.
- The overlay must not cause frame drops during map panning or zooming.

---

## 9. Test Requirements

- Renders on top of the map canvas without visible borders.
- Is not present in the accessibility tree (`aria-hidden="true"`).
- Does not block pointer events to the map or markers beneath.
- Updates when data prop changes.
- Applies the correct gradient tokens for low and high density regions.
- Fade transition is suppressed under `prefers-reduced-motion`.
- Opacity is configurable via prop.
- Renders correctly in light and dark map themes.
