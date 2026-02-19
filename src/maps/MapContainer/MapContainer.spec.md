# Component Spec — MapContainer

## 1. Purpose

Provides the root presentational shell for rendering an interactive map. It establishes the bounds, dimensions, and layer composition for all map content including base tiles, overlays, markers, and controls. All other map components (MapPin, ClusterMarker, HeatmapOverlay, etc.) are composed as children of MapContainer.

Use when: a geographic map visualization is required in any part of the application.

Do NOT use when: a static map image is sufficient (use an image element); or when no map interaction is required and a screenshot-style preview would serve better.

---

## 2. UX Intent

- Primary interaction goal: allow users to explore geographic data spatially — pan, zoom, and interact with markers and overlays.
- Expected user mental model: a familiar interactive map (Google Maps, Apple Maps) — tap/click to pan, pinch/scroll to zoom, press markers for detail.
- UX laws applied:
  - Jakob's Law: map interaction conventions (two-finger pinch to zoom, drag to pan) are deeply familiar.
  - Fitts's Law: map controls (zoom in/out buttons, locate-me button) must have adequate touch targets.
  - Doherty Threshold: the map must load and respond to pan/zoom within 400ms to maintain the feeling of direct manipulation.

---

## 3. Visual Behavior

- Renders as a bounded rectangular container filling its parent or a specified height/width.
- Height and width are defined by size tokens or explicit props; no minimum size below which rendering is attempted.
- A loading state (spinner overlay) is shown while map tiles are loading.
- An error state (placeholder with error message) is shown if the map fails to load.
- Map controls (zoom buttons, compass, locate-me) are positioned using space tokens relative to the container corners.
- Overlay layers (HeatmapOverlay, route lines) render above the base map tiles but below interactive markers.
- Interactive markers (MapPin, ClusterMarker) render in the topmost layer.
- A border or shadow token may frame the map container.

---

## 4. Interaction Behavior

- Pan: drag (mouse/touch) translates the map viewport.
- Zoom: scroll wheel (desktop) or pinch gesture (touch) changes the zoom level.
- Zoom buttons (if rendered): press increments/decrements zoom by one step.
- Map center and zoom are configurable as controlled props (`center`, `zoom`) with `onCenterChange` and `onZoomChange` callbacks. Uncontrolled `defaultCenter` and `defaultZoom` are also supported.
- Marker interaction is delegated to child marker components.
- Keyboard behavior:
  - Arrow keys pan the map when the container has focus.
  - `+` / `-` keys zoom in and out.
  - The map container is focusable (added to tab order).
- Screen reader behavior: the map container carries an `aria-label` describing its content. Interactive controls (zoom buttons) have accessible labels. Map content is not readable by screen reader — a non-visual alternative (list of markers, directions text) must be provided alongside the map.
- Motion: pan and zoom transitions use native map animation. `prefers-reduced-motion` suppresses animated transitions; pan and zoom still function but jump instantly.

---

## 5. Accessibility Requirements

- The map container carries `role="application"` or `role="img"` with an `aria-label` describing the map's purpose and content (e.g., "Map showing search results in San Francisco").
- If `role="application"` is used, keyboard instructions must be communicated to the user (e.g., via `aria-describedby`).
- All interactive controls rendered inside MapContainer (zoom buttons, locate-me) must have `aria-label` values.
- A non-visual equivalent of map content (list of nearby places, marker count) must be available for screen reader users, either as a visually hidden section or a linked accessible alternative.
- Zoom and pan controls must meet WCAG AA touch target size requirements.
- Color used in map overlays must not be the sole means of conveying information.

---

## 6. Theming Rules

- Required tokens: size tokens for container dimensions, border token for optional frame, shadow token for elevation, surface token for loading/error overlay backgrounds, space tokens for control positioning.
- Map tile style (light vs. dark) should switch based on theme, using a tile style URL that corresponds to the active theme.
- Prohibited: no hardcoded pixel widths/heights for the container, no hardcoded color values for overlays or controls.
- Dark mode: tile style, overlay colors, and control backgrounds must all resolve to dark-appropriate values.

---

## 7. Composition Rules

- MapContainer is the root of all map content; all map-specific components (MapPin, ClusterMarker, HeatmapOverlay, RadiusSelector, DirectionsPanel overlays) must be children of MapContainer.
- MapContainer does not dictate how child map elements are positioned — geographic coordinates determine position.
- DirectionsPanel is typically a sibling of MapContainer (in a SplitView), not a child.
- Anti-patterns:
  - Do not nest MapContainer inside another MapContainer.
  - Do not place non-map UI (forms, navigation) inside MapContainer.
  - Do not render MapContainer without a defined height — the container will collapse to zero height.

---

## 8. Performance Constraints

- Map tile loading is asynchronous — a loading state must be rendered while tiles load.
- Marker layer updates (add/remove pins) must not cause the entire map to re-render.
- Overlay layer updates (heatmap data change) must be isolated from marker layer re-renders.
- The map must not trigger re-renders of parent components during pan/zoom unless `onCenterChange` or `onZoomChange` callbacks fire.

---

## 9. Test Requirements

- Renders with the correct dimensions from size props/tokens.
- Displays a loading state while tiles are loading.
- Displays an error state when map initialization fails.
- Renders child components (markers, overlays) within the map layer.
- `onCenterChange` fires when the map is panned.
- `onZoomChange` fires when zoom level changes.
- Zoom buttons (if rendered) have accessible labels.
- Map container has `aria-label` describing content.
- Arrow key pan and +/- zoom work when the container is focused.
- `prefers-reduced-motion` suppresses animated transitions.
- Renders correctly in light and dark map tile themes.
