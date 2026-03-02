> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — LineChart

## 1. Purpose

Renders line chart visualizations within a `<Chart>` container. Supports 10 display variants: default, dots, multiple, labels, stepped, custom-dots, interactive, linear, legend, and icons.

**When to use:** Showing trends over time, comparing multiple series trajectories, or highlighting data point values.
**When NOT to use:** Comparing discrete categories (use BarChart), showing cumulative volumes (use AreaChart), or proportions (use PieChart).

## 2. UX Intent

- **Primary goal:** Reveal trends, patterns, and rate of change across a continuous axis.
- **Mental model:** Users follow line direction — upward means increase, downward means decrease.
- **UX laws applied:**
  - **Gestalt (continuity):** Lines create a natural reading path left-to-right.
  - **Gestalt (similarity):** Same-colored lines group related series.
  - **Miller's Law:** Charts reduce cognitive load vs raw data tables.
  - **Doherty Threshold:** Tooltip interactions must feel instant (<100ms).

## 3. Anatomy

- `LineChart` — Renders inside a `<Chart>` container
  - Line paths for each data series
  - Optional scatter dots at data points (dots variant)
  - Optional data labels (labels variant)
  - Optional `<ChartLegend>` (legend variant)
  - Optional interactive container (interactive variant)

**Required:** `data`, `config` props
**Optional:** `variant`, axis visibility, interactivity, dot customization

> **TypeScript is the source of truth for props.** See `LineChartProps` in `LineChart.tsx` for the full typed API.

## 4. Behavior

### Variants
- **default** — Smooth lines with natural curve interpolation
- **dots** — Lines with scatter dots at each data point
- **multiple** — Multi-series line rendering
- **labels** — Data point value labels on chart
- **stepped** — Step interpolation between points
- **custom-dots** — Custom dot component at data points
- **interactive** — Hover/touch reveals data point tooltip
- **linear** — Linear (straight-line) interpolation
- **legend** — Shows ChartLegend below chart
- **icons** — Passes config icons to tooltip/legend

### States
- **Idle** — Static line rendering
- **Hover/Touch** — Tooltip at nearest data point (interactive variant)

### Motion
- `prefers-reduced-motion`: All animations disabled, chart renders instantly

## 5. Accessibility

- Inherits `role="img"` and `aria-label` from parent `<Chart>` container
- Color is not the only differentiator — legend and dots provide shape cues
- Legend uses semantic `<ul>`/`<li>` markup

## 6. Styling

- Series colors resolved from `ChartConfig` token references via theme
- Line stroke width from theme defaults
- Responsive: fills parent Chart container dimensions
- Victory theme applied for consistent axis/tooltip styling

## 7. Composition

- **Must be used inside:** `<Chart>` container (requires `useChartContext()`)
- **Can be paired with:** `<ChartTooltip>`, `<ChartLegend>`
- **Anti-pattern:** Using LineChart outside `<Chart>` (will throw)

## 8. Breaking Change Criteria

- Removing or renaming exported `LineChart`, `LineChartProps`, or `LineChartVariant`
- Changing `data` or `config` prop types
- Removing variant support

## 9. Test Requirements

### Behavioral
- Renders without crashing inside Chart container
- Renders with dots variant
- Renders multiple series
- Renders with legend

### Accessibility
- Inherits container role="img" and aria-label
- Legend uses semantic list markup

### Visual Regression
- Default line rendering
- Dots at data points
- Multi-series differentiation
