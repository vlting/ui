> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — RadarChart

## 1. Purpose

Renders radar/spider chart visualizations within a `<Chart>` container. Supports 14 display variants for comparing multiple quantitative variables: default, dots, lines, custom, multiple, grid-circle, grid-filled, grid-none, legend, icons, radius-axis, label, custom-shape, and interactive.

**When to use:** Comparing multiple variables across categories, showing skill/attribute profiles, or evaluating multi-dimensional data.
**When NOT to use:** Showing time series (use LineChart), comparing simple magnitudes (use BarChart), or with more than ~10 categories (becomes cluttered).

## 2. UX Intent

- **Primary goal:** Enable multi-variable comparison at a glance through radial layout.
- **Mental model:** Users see the shape's area as an overall "profile" — larger coverage = better performance.
- **UX laws applied:**
  - **Gestalt (closure):** The enclosed shape is perceived as a unified entity.
  - **Gestalt (similarity):** Same-colored fills group related data series.
  - **Doherty Threshold:** Tooltip interactions must feel instant (<100ms).

## 3. Anatomy

- `RadarChart` — Renders inside a `<Chart>` container
  - Grid lines (polygon or circle type)
  - Spoke lines from center to each vertex
  - Filled polygon/path for each data series
  - Optional dot markers at vertices
  - Optional category labels at vertices
  - Optional radius axis with value labels
  - Optional `<ChartLegend>` (legend variant)
  - Optional `<ChartTooltip>` (interactive variant)

**Required:** `data` prop

## 4. Behavior

### Variants

| Variant | Description |
|---------|-------------|
| `default` | Basic radar with polygon grid and filled area |
| `dots` | Radar with visible dot markers at each vertex |
| `lines` | Outline only (no area fill, just stroked path) |
| `custom` | Custom styling (adjusted opacity, stroke width) |
| `multiple` | Multiple overlapping data series |
| `grid-circle` | Circular grid lines instead of polygon |
| `grid-filled` | Alternating filled grid rings (zebra pattern) |
| `grid-none` | No grid lines, just the data shape |
| `legend` | Radar with ChartLegend |
| `icons` | Icons from config in tooltip/legend |
| `radius-axis` | Value labels along one radius axis |
| `label` | Category labels at each vertex |
| `custom-shape` | Custom component for vertex markers |
| `interactive` | Hover/press on vertex shows tooltip |

### States
- **Default:** All series rendered with fill opacity
- **Active (interactive):** Hovered vertex highlighted with enlarged dot
- **Multi-series:** Overlapping shapes with distinct colors and shared grid

### Keyboard Interaction
- Arrow keys cycle through vertices in interactive mode
- Enter/Space activates the focused vertex
- Escape deactivates

## 5. Accessibility

- Renders inside `<Chart>` container which provides `role="img"` and `aria-label`
- Legend uses semantic `<ul>/<li>`
- Tooltip content announced via `aria-live="polite"`
- Color contrast meets WCAG AA

## 6. Styling

- **Colors:** From `resolvedColors` (Tamagui token resolution)
- **Fill opacity:** Configurable (default 0.25) to allow overlapping series
- **Grid:** Polygon or circle type, configurable levels
- **Responsive:** Sizes to container dimensions
- **Reduced motion:** Disables hover animations with `prefers-reduced-motion`
- **Dark mode:** Adapts via Tamagui theme tokens

## 7. Composition

Must be used as a child of `<Chart>`. Pairs with `<ChartLegend>` and `<ChartTooltip>`.

**Anti-patterns:**
- Using outside `<Chart>` wrapper
- More than ~10 categories (radial layout becomes unreadable)
- Single category (needs at least 3 vertices for a meaningful shape)

## 8. Breaking Change Criteria

- Removing a variant
- Changing polar coordinate calculation
- Changing the `data` prop format
- Removing grid rendering options

## 9. Test Requirements

- Renders without crashing for all 14 variants
- Polygon grid renders equilateral shapes for N categories
- Circle grid renders concentric circles
- Multiple series renders distinct colored paths
- Labels appear at correct vertex positions
- Interactive variant responds to vertex selection
- Legend renders config labels
