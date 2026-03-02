> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — RadialChart

## 1. Purpose

Renders radial bar/progress chart visualizations within a `<Chart>` container. Displays data as partial arcs around a center point, similar to circular progress bars or gauges. Supports 6 variants: default, grid, label, stacked, text, and shape.

**When to use:** Showing progress toward a goal, comparing a few metrics as circular gauges, or displaying completion percentages.
**When NOT to use:** Comparing many categories (use BarChart), showing trends (use LineChart), or displaying precise values (use data tables).

## 2. UX Intent

- **Primary goal:** Communicate progress or relative magnitude through arc length.
- **Mental model:** Users interpret arc length as completion — a full circle = 100%.
- **UX laws applied:**
  - **Gestalt (common fate):** Arcs sharing the same center are perceived as related.
  - **Miller's Law:** Limit to ~5 concentric arcs for readability.
  - **Aesthetic-usability effect:** Clean circular forms feel polished and modern.

## 3. Anatomy

- `RadialChart` — Renders inside a `<Chart>` container
  - Background track arcs (grid variant)
  - Colored data arcs for each series
  - Optional value labels at arc endpoints
  - Optional center text (text variant)
  - Optional `<ChartLegend>`

**Required:** `data` prop

## 4. Behavior

### Variants

| Variant | Description |
|---------|-------------|
| `default` | Concentric arcs showing progress for each series |
| `grid` | Background track arcs visible behind data arcs |
| `label` | Value labels at the end of each arc |
| `stacked` | Arcs stacked end-to-end in a single ring |
| `text` | Center text showing total or primary value |
| `shape` | Custom end caps on arcs (rounded) |

### States
- **Default:** All arcs rendered at proportional lengths
- **Empty:** Zero-length arcs (grid background still visible)
- **Full:** Arcs extend to full circle when value equals maxValue

## 5. Accessibility

- Renders inside `<Chart>` container which provides `role="img"` and `aria-label`
- Legend uses semantic `<ul>/<li>`
- Color contrast meets WCAG AA

## 6. Styling

- **Colors:** From `resolvedColors` (Tamagui token resolution)
- **Arc width:** Configurable via `barWidth` prop
- **Arc gap:** Configurable via `barGap` prop
- **Responsive:** Sizes to container dimensions
- **Reduced motion:** Disables arc animations with `prefers-reduced-motion`
- **Dark mode:** Adapts via Tamagui theme tokens

## 7. Composition

Must be used as a child of `<Chart>`. Pairs with `<ChartLegend>`.

**Anti-patterns:**
- Using outside `<Chart>` wrapper
- More than ~5 concentric arcs (readability degrades)
- Using for categorical comparisons (use BarChart)

## 8. Breaking Change Criteria

- Removing a variant
- Changing arc angle calculation
- Changing the `data` prop format

## 9. Test Requirements

- Renders without crashing for all 6 variants
- Arcs render at correct proportions
- Grid variant shows background tracks
- Center text renders for text variant
- Stacked arcs connect end-to-end
- Colors match resolvedColors from context
