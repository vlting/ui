> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Chart

## 1. Purpose

Chart provides a themed, accessible wrapper for data visualization. It integrates Victory Native charts with the design token system, ensuring all chart colors, typography, and spacing come from the brand config rather than hardcoded values.

**When to use:** Any data visualization — area, bar, line, pie, radar, or radial charts.
**When NOT to use:** Simple numeric displays (use Text or Badge), progress indicators (use Progress), or decorative graphics (use Icon or SVG directly).

## 2. UX Intent

- **Primary goal:** Make quantitative data comprehensible at a glance.
- **Mental model:** Users expect charts to behave like images with optional interactivity — hovering reveals details, legends explain colors.
- **UX laws applied:**
  - **Gestalt (proximity/similarity):** Related data series share visual encoding (color, shape).
  - **Miller's Law:** Charts reduce cognitive load by visualizing data instead of presenting raw numbers.
  - **Doherty Threshold:** Tooltip interactions must feel instant (<100ms).
  - **Aesthetic-Usability Effect:** Well-themed charts increase perceived data quality.

## 3. Anatomy

- `Chart` — Container that provides responsive sizing, theming, and accessibility wrapper
  - `ChartTooltip` — Themed tooltip for data point hover/focus (9 variants)
  - `ChartLegend` — Series legend with color indicators and labels
  - Chart type children (AreaChart, BarChart, LineChart, PieChart, RadarChart, RadialChart)

**Required:** `Chart` wrapper, at least one chart type child
**Optional:** `ChartTooltip`, `ChartLegend`

> **TypeScript is the source of truth for props.** See `ChartContainerProps` in `Chart.tsx`, `ChartTooltipProps` in `ChartTooltip.tsx`, and `ChartLegendProps` in `ChartLegend.tsx` for the full typed API. Do not duplicate prop tables here.

## 4. Behavior

### States
- **Idle:** Chart renders with static data
- **Hover:** Tooltip appears on data point hover (web) / tap (mobile)
- **Focus:** Keyboard focus on data points reveals tooltip
- **Loading:** Not applicable (Chart is presentation-only; consumers handle loading states)
- **Error:** Not applicable (consumers validate data before passing to Chart)

### Keyboard Interaction
- Tab into chart focuses the first data point
- Arrow keys navigate between data points
- Tooltip content announced by screen reader on focus

### Motion
- Chart entry animations (fade/scale) when first rendered
- `prefers-reduced-motion`: All animations disabled, chart renders instantly

## 5. Accessibility

- Container element: native `<div>` with `role="img"` and `aria-label`
- Hidden data table (`<table>` with `sr-only` styling) provides screen reader access to chart data
- Color is not the only means of data identification — tooltips and legends provide text labels
- Minimum 3:1 contrast for chart elements against background (WCAG 1.4.11)
- Focus indicators on interactive chart elements (outline per QUALITY_BASELINE)
- Legend uses semantic `<ul>`/`<li>` markup
- Color indicators are `aria-hidden="true"`

## 6. Styling

- **Color:** All series colors from `ChartConfig` token references, resolved via theme
- **Spacing:** Chart padding from space tokens ($3 = 20px, $4 = 28px)
- **Typography:** Axis labels and tooltip text use body font from theme
- **Radius:** Tooltip border-radius from $radius.3 (7px)
- **Responsive:** Container fills parent width by default; height configurable (default 350px)
- **Dark mode:** Theme factory resolves light/dark token values automatically

## 7. Composition

- Chart wraps individual chart type components (AreaChart, BarChart, etc.)
- ChartTooltip and ChartLegend are optional sub-components
- Chart MUST be the outermost wrapper — chart types MUST be direct or nested children
- Anti-pattern: Using chart type components without a Chart wrapper (will throw)

## 8. Breaking Change Criteria

- Removing or renaming `config`, `accessibilityLabel`, `children` props
- Changing `ChartConfig` type structure
- Removing `useChartContext` hook
- Changing the container element from `<div>` to something else
- Removing `role="img"` or `aria-label`

## 9. Test Requirements

### Behavioral
- Renders without crashing with valid config
- Applies role="img" and aria-label to container
- Accepts explicit width/height
- useChartContext throws outside Chart
- ChartTooltip returns null when inactive
- ChartLegend renders all config entries

### Accessibility
- Container has role="img" and aria-label
- Legend uses semantic list markup (`<ul>`/`<li>`)
- Color indicators are aria-hidden

### Visual Regression
- Chart container renders at correct dimensions
- Tooltip renders with correct theme colors
- Legend renders in horizontal and vertical layouts
