# Maps Playbook

## 1. Problem Space

Maps patterns cover any module that renders geographic data or location-based interactions. Primary module: `maps` (map rendering, pins, clusters, search, directions, heatmaps). Secondary: `dating` (location radius selector for match preferences), `ecommerce` (shipping address lookup), `crm` (geographic lead/territory views), and any module requiring location input or spatial data visualization.

---

## 2. UX Laws Applied

- **Jakob's Law** — Map interactions must follow universal conventions: scroll to zoom, click/tap to select a pin, drag to pan. Do not override native map interaction patterns.
- **Gestalt Proximity** — Map info cards and tooltips must appear adjacent to (and visually connected to) the pin or area they describe. Do not show info in a disconnected sidebar by default.
- **Hick's Law** — `PlaceAutocompleteDropdown` must reduce typing to a minimum. Show relevant suggestions within 2–3 characters of input. Keep the suggestion list to 5 items max.
- **Fitts's Law** — `MapPin` tap targets must be larger than their visual footprint on mobile. Use an invisible expanded tap area around each pin.
- **Doherty Threshold** — Map tiles must load progressively. Location search results must appear within 400ms of query. Show a spinner within `LocationSearchInput` during lookup.
- **Aesthetic-Usability Effect** — Map style (light, dark, satellite) should match the app's theme. A stark white map in a dark-mode app breaks the visual experience.

---

## 3. Standard Layout Pattern

### Location Explorer Page
```
<AppShell>
  <PageHeader title="Map" />
  <Section>
    <LocationSearchInput />        {/* search bar above or overlaid on map */}
    <MapContainer>
      <MapPin />                   {/* individual pins */}
      <ClusterMarker />            {/* clustered pins */}
      <HeatmapOverlay />           {/* density visualization */}
    </MapContainer>
    <MapInfoCard />                {/* appears on pin selection */}
  </Section>
</AppShell>
```

### Location + List Split View
```
<AppShell>
  <SplitView>
    <MapContainer>
      <MapPin />
      <ClusterMarker />
    </MapContainer>
    <VirtualizedList
      renderItem={(item) => <Card />}    {/* list synced with map */}
    />
  </SplitView>
</AppShell>
```

### Directions / Route View
```
<MapContainer>
  <MapPin />   {/* origin */}
  <MapPin />   {/* destination */}
</MapContainer>
<DirectionsPanel />              {/* turn-by-turn or route summary */}
```

### Location Radius Selector (Embedded)
```
<FieldWrapper>
  <Label>Search Radius</Label>
  <RadiusSelector />             {/* or LocationRadiusSelector from dating */}
</FieldWrapper>
```

### Header Pattern
- `PageHeader` with section title.
- Search (`LocationSearchInput` or `PlaceAutocompleteDropdown`) overlaid on the map or immediately above it — not in the `TopNav`.

### Filters
- Radius-based filtering via `RadiusSelector` in a sidebar or settings panel.
- Category or type filters in an overlay panel or `AnalyticsFilterBar` above the map.

### Primary CTA
- "Search this area" button that re-queries based on the current map viewport.
- "Get Directions" from `MapInfoCard` when a destination is selected.

### Secondary CTA
- "Reset view" to return to the default map center/zoom.
- "List view" toggle to switch from map to `VirtualizedList` on mobile.

---

## 4. Component Mapping

| Need | Component |
|------|-----------|
| Map rendering container | `MapContainer` |
| Individual location pin | `MapPin` |
| Clustered pin group | `ClusterMarker` |
| Density visualization overlay | `HeatmapOverlay` |
| Info popup for selected pin | `MapInfoCard` |
| Text search for a location | `LocationSearchInput` |
| Autocomplete place search | `PlaceAutocompleteDropdown` |
| Turn-by-turn / route panel | `DirectionsPanel` |
| Distance radius selector | `RadiusSelector` |
| Match distance preference | `LocationRadiusSelector` (dating) |

**Flagged missing components:**
- No `MapLegend` component — consuming apps must build their own if heatmaps or color-coded pins require a legend.
- No `GeofenceOverlay` for territory/boundary drawing — if required, flag as a future addition to the `maps` module.

---

## 5. Accessibility Rules

- `MapContainer` must have `role="application"` and an `aria-label` describing its purpose (e.g., "Interactive location map").
- A skip link must allow keyboard users to bypass the map and reach the content below it.
- `MapPin` must be keyboard-focusable (Tab to each pin) and activatable (Enter/Space to open `MapInfoCard`).
- `MapInfoCard` must be reachable by keyboard from the focused `MapPin` and closable via Escape.
- `ClusterMarker` must announce its count: `aria-label="12 locations in this area. Press Enter to zoom in."`.
- `LocationSearchInput` and `PlaceAutocompleteDropdown` must follow standard combobox ARIA patterns (`role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`).
- `DirectionsPanel` steps must be presented as an ordered list (`<ol>`) for screen readers.
- `RadiusSelector` and `LocationRadiusSelector` (if slider-based) must use `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and announce the value in human units ("10 miles").
- `HeatmapOverlay` is purely visual — provide a data table or text summary of the underlying density data as an accessible alternative.

---

## 6. Anti-Patterns

- **Map without a text-based alternative** — Never make location data exclusively accessible via the map. Always provide a list view or search option.
- **`HeatmapOverlay` as the only data representation** — Heatmaps are color-based visualizations. Without a legend and an accessible data alternative, they are meaningless to colorblind users and screen reader users.
- **Blocking scrolling on mobile** — `MapContainer` on mobile must not capture page scroll gestures unless the user explicitly interacts with the map. Use a "tap to activate map" overlay pattern.
- **Too many `MapPin`s without clustering** — Rendering 50+ individual `MapPin` components without `ClusterMarker` causes performance issues and visual clutter. Use `ClusterMarker` from the start.
- **Auto-centering to user's exact location without permission** — Never geolocate the user without requesting permission and providing a clear fallback when permission is denied.
- **`DirectionsPanel` without a "clear route" option** — Users must be able to cancel a route and return to the browse state. Always provide a close/clear control.
- **`PlaceAutocompleteDropdown` submitting on every keystroke** — Debounce search queries (300ms minimum). Do not make a network call for every character typed.
- **Losing map state on back navigation** — Map zoom, center, and selected pin must be restored when the user navigates back from a detail page.

---

## 7. Variants

### Density Increase
- `MapContainer` with multiple `HeatmapOverlay` layers for analytics-heavy maps.
- `SplitView` with resizable map/list panels using `ResizablePanel`.
- `ClusterMarker` configured with tighter clustering thresholds for high-density data.

### Mobile Behavior
- Full-screen `MapContainer` on mobile by default; list view available via a toggle at the bottom.
- `LocationSearchInput` sticks to the top of the viewport above the map.
- `MapInfoCard` appears as a bottom `Sheet` (not a floating overlay) on mobile for larger touch targets.
- `DirectionsPanel` opens as a `Sheet` from the bottom on mobile.
- `RadiusSelector` uses a visible slider with large thumb on mobile.
- Map tiles must use a simplified style on mobile to reduce data usage.

### Edge Cases
- **No results in map viewport**: Show a "No results in this area" overlay with a "Search nearby areas" option.
- **Location permission denied**: Fall back to a default city-level map center; show a non-blocking prompt to enable location services.
- **Offline**: `MapContainer` must degrade gracefully — show cached tiles if available, or a friendly "Map unavailable offline" message.
- **Very high zoom**: At street level, `ClusterMarker` must dissolve into individual `MapPin` components.
- **Single result**: Skip the map listing view and go directly to the `MapInfoCard` detail when only one result exists.
