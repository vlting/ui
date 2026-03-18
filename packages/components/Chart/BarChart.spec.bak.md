> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — BarChart

## 1. Purpose

Renders bar chart visualizations within a `<Chart>` container. Supports 10 display variants: default, horizontal, stacked, grouped, negative, label, mixed, custom-label, active, and interactive.

**When to use:** Comparing discrete categories, showing rankings, or displaying positive/negative values.
**When NOT to use:** Showing trends over time (use AreaChart or LineChart), or proportions of a whole (use PieChart).

## 2. UX Intent

- **Primary goal:** Enable quick comparison of discrete values across categories.
- **Mental model:** Users compare bar lengths — longer bars mean larger values.
- **UX laws applied:**
  - **Gestalt (proximity):** Grouped/stacked bars cluster related series.
  - **Fitts's Law:** Interactive bar targets are large enough for reliable selection.
  - **Miller's Law:** Charts reduce cognitive load vs raw data tables.
  - **Doherty Threshold:** Tooltip interactions must feel instant (<100ms).

## 3. Anatomy

- `BarChart` — Renders inside a `<Chart>` container using victory-native v41
  - `CartesianChart` wrapper for layout, axes, and data binding
  - `Bar` / `StackedBar` / `BarGroup` for bar rendering per variant
  - Optional `<ChartLegend>` (legend display)
  - Optional interactive press state (interactive variant)

**Required:** `data`, `config` props
**Optional:** `variant`, axis visibility, bar sizing, corner radius, interactivity

> **TypeScript is the source of truth for props.** See `BarChartProps` in `BarChart.tsx` for the full typed API.

## 4. Behavior

### Variants
- **default** — Simple vertical bars per series
- **horizontal** — Horizontal bar orientation
- **stacked** — Bars stacked on top of each other
- **grouped** — Bars placed side-by-side per category
- **negative** — Handles negative y-values with axis at zero
- **label** — Shows data value labels on bars
- **mixed** — Colors bars by sign (positive vs negative)
- **custom-label** — Custom label component for bars
- **active** — Highlights a specific bar index, dims others
- **interactive** — Touch/hover reveals data via press state

### States
- **Idle** — Static bar rendering
- **Hover/Touch** — Data revealed via press state (interactive variant)
- **Active** — Specific bar highlighted (active variant)

### Motion
- `prefers-reduced-motion`: All animations disabled, chart renders instantly

## 5. Accessibility

- Inherits `role="img"` and `aria-label` from parent `<Chart>` container
- Color is not the only differentiator — legend and labels provide text
- Legend uses semantic `<ul>`/`<li>` markup

## 6. Styling

- Series colors resolved from `ChartConfig` token references via theme
- Bar width auto-sized by default, configurable via `barWidth` prop
- Corner radius configurable via `cornerRadius` prop
- Chart padding from theme factory
- Responsive: fills parent Chart container dimensions

## 7. Composition

- **Must be used inside:** `<Chart>` container (requires `useChartContext()`)
- **Can be paired with:** `<ChartTooltip>`, `<ChartLegend>`
- **Anti-pattern:** Using BarChart outside `<Chart>` (will throw)

## 8. Breaking Change Criteria

- Removing or renaming exported `BarChart`, `BarChartProps`, or `BarChartVariant`
- Changing `data` or `config` prop types
- Removing variant support

## 9. Test Requirements

### Behavioral
- Renders without crashing inside Chart container
- Renders stacked variant
- Renders grouped variant
- Renders with labels

### Accessibility
- Inherits container role="img" and aria-label
- Legend uses semantic list markup

### Visual Regression
- Default bar rendering
- Stacked bar alignment
- Grouped bar spacing
