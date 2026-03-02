> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — AreaChart

## 1. Purpose

Renders area chart visualizations within a `<Chart>` container. Supports 10 display variants for different data storytelling needs: default, gradient, stacked, expanded, step, axes, interactive, legend, linear, and icons.

**When to use:** Showing trends over time, comparing cumulative values, or visualizing part-to-whole relationships.
**When NOT to use:** Comparing discrete categories (use BarChart), showing exact values (use Table), or showing proportions of a whole (use PieChart).

## 2. UX Intent

- **Primary goal:** Communicate trends and relative magnitudes over a continuous axis.
- **Mental model:** Users see filled areas as accumulated quantities — height represents magnitude, fill implies volume.
- **UX laws applied:**
  - **Gestalt (similarity/proximity):** Same-colored fills group related data series.
  - **Miller's Law:** Charts reduce cognitive load vs raw data tables.
  - **Doherty Threshold:** Tooltip interactions must feel instant (<100ms).

## 3. Anatomy

- `AreaChart` — Renders inside a `<Chart>` container
  - SVG paths for each data series area fill
  - Optional gradient definitions (gradient variant)
  - Optional axes (axes variant)
  - Optional `<ChartLegend>` (legend variant)
  - Optional `<ChartTooltip>` (interactive variant)

**Required:** `data`, `config` props
**Optional:** `variant`, axis visibility, interactivity, legend, tooltip configuration

> **TypeScript is the source of truth for props.** See `AreaChartProps` in `AreaChart.tsx` for the full typed API.

## 4. Behavior

### Variants
- **default** — Simple filled areas with natural curve interpolation
- **gradient** — SVG linear gradient fill from series color to transparent
- **stacked** — Areas stacked on top of each other (cumulative)
- **expanded** — Stacked areas normalized to 100%
- **step** — Step interpolation (stepAfter)
- **axes** — Explicit X and Y axis display
- **interactive** — Touch/hover reveals data point values
- **legend** — Shows ChartLegend below chart
- **linear** — Linear interpolation between points
- **icons** — Passes config icons to tooltip/legend

### States
- **Idle** — Static area rendering
- **Hover/Touch** — Tooltip appears at nearest data point (interactive variant)

### Motion
- `prefers-reduced-motion`: All animations disabled, chart renders instantly

## 5. Accessibility

- Inherits `role="img"` and `aria-label` from parent `<Chart>` container
- Color is not the only differentiator — legend provides text labels per series
- SVG elements are decorative (`aria-hidden`)
- Legend uses semantic `<ul>`/`<li>` markup

## 6. Styling

- Series colors resolved from `ChartConfig` token references via theme
- Gradient fills use SVG `<LinearGradient>` with theme-resolved colors
- Default fill opacity: 0.4 (standard), 1.0 (gradient)
- Responsive: fills parent Chart container width

## 7. Composition

- **Must be used inside:** `<Chart>` container (requires `useChartContext()`)
- **Can be paired with:** `<ChartTooltip>`, `<ChartLegend>`
- **Anti-pattern:** Using AreaChart outside `<Chart>` (will throw)

## 8. Breaking Change Criteria

- Removing or renaming exported `AreaChart`, `AreaChartProps`, or `AreaChartVariant`
- Changing `data` or `config` prop types
- Removing variant support

## 9. Test Requirements

### Behavioral
- Renders without crashing inside Chart container
- Renders stacked variant
- Renders with axes visible
- Renders with legend

### Accessibility
- Inherits container role="img" and aria-label
- Legend uses semantic list markup

### Visual Regression
- Default area fill rendering
- Gradient fill rendering
- Stacked areas alignment
