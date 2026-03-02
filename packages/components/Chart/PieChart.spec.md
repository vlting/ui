> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — PieChart

## 1. Purpose

Renders pie and donut chart visualizations within a `<Chart>` container. Supports 11 display variants for showing proportional data: default, donut, donut-text, donut-active, label, custom-label, label-list, legend, separator, interactive, and stacked.

**When to use:** Showing parts of a whole, comparing proportions, or displaying percentage breakdowns.
**When NOT to use:** Comparing trends over time (use LineChart/AreaChart), showing many categories (>7 slices become hard to read — use BarChart), or comparing absolute values.

## 2. UX Intent

- **Primary goal:** Communicate proportional relationships between categories.
- **Mental model:** Users see slices as portions of a whole — larger slices represent larger shares.
- **UX laws applied:**
  - **Gestalt (figure/ground):** Distinct colors separate slices from background.
  - **Miller's Law:** Limit to ~7 slices for readability.
  - **Fitts's Law:** Interactive variants use generous hit areas for slice selection.

## 3. Anatomy

- `PieChart` — Renders inside a `<Chart>` container
  - SVG circle/arc paths for each data slice
  - Optional center hole (donut variants)
  - Optional center text (donut-text variant)
  - Optional slice labels (label, custom-label, label-list variants)
  - Optional `<ChartLegend>` (legend variant)
  - Optional `<ChartTooltip>` (interactive variant)

**Required:** `data` prop (values from context config)

## 4. Behavior

### Variants

| Variant | Description |
|---------|-------------|
| `default` | Basic pie chart with colored slices |
| `donut` | Pie with center hole (innerRadius ~60% of outerRadius) |
| `donut-text` | Donut with center text showing total or custom label |
| `donut-active` | Donut with active slice that expands on selection |
| `label` | Pie with percentage/value labels on each slice |
| `custom-label` | Pie with custom label component for each slice |
| `label-list` | Labels positioned outside with connecting lines |
| `legend` | Pie with ChartLegend below |
| `separator` | Slices with visible gaps between them |
| `interactive` | Hover/press highlights a slice and shows tooltip |
| `stacked` | Nested pies (multiple concentric rings) |

### States
- **Default:** All slices rendered equally
- **Active (interactive/donut-active):** One slice highlighted (larger radius)
- **Empty:** No data — renders empty circle with muted border

### Keyboard Interaction
- Arrow keys cycle through slices in interactive mode
- Enter/Space activates the focused slice
- Escape deactivates any active slice

## 5. Accessibility

- Renders inside `<Chart>` container which provides `role="img"` and `aria-label`
- Legend items use semantic `<ul>/<li>` with color indicators marked `aria-hidden`
- Tooltip content is announced via `aria-live="polite"` region
- Color contrast ratio of slice colors meets WCAG AA (4.5:1 against background)

## 6. Styling

- **Colors:** From `resolvedColors` (Tamagui token resolution)
- **Responsive:** Automatically sizes to `dimensions` from ChartContainer
- **Reduced motion:** `prefers-reduced-motion` disables active slice animations
- **Dark mode:** Colors and text adapt via Tamagui theme tokens

## 7. Composition

Must be used as a child of `<Chart>` (provides ChartContext). Pairs with `<ChartLegend>` for legend display and `<ChartTooltip>` for interactive tooltips.

**Anti-patterns:**
- Using PieChart outside a `<Chart>` wrapper (will throw)
- More than 7-8 slices (readability degrades)
- Using for time-series data (use AreaChart/LineChart instead)

## 8. Breaking Change Criteria

- Removing a variant
- Changing the `data` prop format
- Changing the default variant behavior
- Removing SVG accessibility attributes

## 9. Test Requirements

- Renders without crashing for all 11 variants
- Donut variant renders center hole
- Center text renders for donut-text variant
- Legend renders config labels
- Interactive variant responds to active state
- Colors match resolvedColors from context
