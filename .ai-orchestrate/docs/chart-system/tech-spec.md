---
epic: chart-system
saga: shadcn-parity
prd: ../.ai-sagas/docs/shadcn-parity/prd.md
created: 2026-03-02
---

# Tech Spec: Chart System (Victory Native)

## Context

This epic addresses **FR-3 (Chart System)** from the shadcn-parity PRD. It delivers a complete chart system with 6 chart types and 69 variants, using Victory Native for cross-platform rendering (web + React Native). Charts integrate with the existing brand/theme/token system so that all colors, typography, and spacing come from design tokens.

**Prior epics established:**
- Epic 1: Clean token layer (12-step color palettes, size/space/radius scales, font system)
- Epic 2: Component parity + API mapping infrastructure (api-mapping.json pattern)
- Epic 3: Icon system (createIcon factory, react-native-svg integration)

The chart system builds on the token foundation (Epic 1) and follows the API mapping pattern (Epic 2). It does NOT depend on the icon system (Epic 3).

## Architecture

### Library Choice: Victory Native

Victory Native (`victory-native`) provides cross-platform charting with a single API for web and React Native. It uses `react-native-svg` under the hood (already a project dependency via the icon system).

**Key Victory Native features used:**
- `VictoryChart`, `VictoryArea`, `VictoryBar`, `VictoryLine`, `VictoryPie`, `VictoryAxis`
- `VictoryVoronoiContainer` for interactive tooltips
- `VictoryTheme` for token-based theming
- `VictoryGroup`, `VictoryStack` for composed chart layouts
- `VictoryPolarAxis` for radar charts

**Package:** `victory-native@^42` (latest stable with RN + web support)

### Component Structure

```
packages/components/Chart/
├── Chart.tsx                  # ChartContainer — wrapper for all chart types
├── Chart.spec.md              # Component spec
├── Chart.test.tsx             # Tests
├── api-mapping.json           # shadcn → vlting API mapping
├── index.ts                   # Barrel export
├── types.ts                   # Shared types (ChartConfig, ChartData, etc.)
├── theme.ts                   # Victory theme factory (tokens → Victory theme)
├── utils.ts                   # Color resolution, data formatting helpers
├── ChartTooltip.tsx           # Themed tooltip component
├── ChartLegend.tsx            # Themed legend component
├── AreaChart.tsx              # Area chart + variants
├── BarChart.tsx               # Bar chart + variants
├── LineChart.tsx              # Line chart + variants
├── PieChart.tsx               # Pie/donut chart + variants
├── RadarChart.tsx             # Radar chart + variants
├── RadialChart.tsx            # Radial/gauge chart + variants
```

### Core Components

#### `ChartContainer` (Chart.tsx)
The wrapper component that provides:
- Responsive sizing (measures parent, passes dimensions to Victory)
- Theme integration (resolves brand tokens → Victory theme)
- Accessibility (ARIA role="img", aria-label, optional data table fallback)
- Consistent padding/margin from space tokens

```typescript
interface ChartContainerProps {
  config: ChartConfig
  children: React.ReactNode
  accessibilityLabel: string
  width?: number
  height?: number
}
```

#### `ChartConfig` (types.ts)
The configuration object that maps data series to token colors:

```typescript
interface ChartConfig {
  [key: string]: {
    label: string
    color: string  // Token reference: "$blue8", "$color9", etc.
    icon?: React.ComponentType
  }
}
```

This mirrors shadcn's `chartConfig` pattern but resolves via Tamagui tokens instead of CSS variables.

#### `ChartTooltip` (ChartTooltip.tsx)
Themed tooltip with 9 variants matching shadcn:
- default, cursor, dot, line, label, custom, advanced, icons, formatter

Uses Tamagui `Popover` or a lightweight positioned overlay. Receives data from Victory's Voronoi container events.

#### `ChartLegend` (ChartLegend.tsx)
Themed legend component:
- Horizontal/vertical layout
- Color indicators from ChartConfig
- Uses Tamagui `XStack`/`YStack` + `Text` for layout

### Chart Types & Variant Mapping

| Chart Type | Variants | Victory Components |
|------------|----------|--------------------|
| **Area** (10) | default, gradient, stacked, expanded, step, axes, interactive, legend, linear, icons | `VictoryArea`, `VictoryStack`, `VictoryGroup` |
| **Bar** (10) | default, horizontal, stacked, grouped, negative, label, mixed, custom-label, active, interactive | `VictoryBar`, `VictoryStack`, `VictoryGroup` |
| **Line** (10) | default, dots, multiple, labels, stepped, custom-dots, interactive, linear, legend, icons | `VictoryLine`, `VictoryScatter` |
| **Pie** (11) | default, donut, donut-text, donut-active, label, custom-label, label-list, legend, separator, interactive, stacked | `VictoryPie` |
| **Radar** (14) | default, dots, lines, custom, multiple, grid-circle, grid-filled, grid-none, legend, icons, radius-axis, label, custom-shape, interactive | `VictoryChart` (polar), `VictoryArea`/`VictoryLine`, `VictoryPolarAxis` |
| **Radial** (6) | default, grid, label, stacked, text, shape | `VictoryPie` (partial arc) with custom startAngle/endAngle |

**Total: 61 variants** (some shadcn variants are tooltip/legend variations applied to the same base chart — those are handled by `ChartTooltip`/`ChartLegend` props, bringing the effective total to 69 when counting tooltip variants).

### Token Integration

#### Color Mapping Strategy

Charts use the existing accent palette system (12-step palettes for blue, red, green, orange, purple, pink, yellow):

```typescript
// theme.ts — Victory theme factory
function createChartTheme(tamaguiTheme: TamaguiTheme): VictoryThemeDefinition {
  return {
    axis: {
      style: {
        axis: { stroke: tamaguiTheme.borderColor },
        grid: { stroke: tamaguiTheme.borderColor, opacity: 0.3 },
        tickLabels: { fill: tamaguiTheme.colorSubtitle, fontSize: 12 },
      },
    },
    // ... map all Victory theme properties to Tamagui tokens
  }
}
```

The `ChartConfig` object maps data series keys to token colors. Each brand can define its own chart color palette via the existing `BrandDefinition` type — no new token infrastructure needed.

#### Spacing & Typography

- Chart padding: `$3` / `$4` (from space tokens)
- Axis labels: body font, `$colorSubtitle` for secondary text
- Tooltip: `$background`, `$color`, `$borderColor`, `$radius.3`
- Legend text: body font, `$color` for labels

### Cross-Platform Considerations

- Victory Native renders via `react-native-svg` on both web and RN (already in deps)
- Responsive sizing: Use `onLayout` (RN) / ResizeObserver (web) to measure container
- Touch interactions: Victory supports both mouse and touch events natively
- No web-only APIs (no Canvas, no D3 DOM manipulation)

### Accessibility

Per DESIGN_CONSTITUTION.md and WCAG requirements:

- `role="img"` on chart container with `aria-label` describing the chart
- Hidden data table (`<table>` with `aria-hidden="false"` but visually hidden) for screen readers
- Color alone must not convey meaning — patterns/shapes as supplementary indicators
- Tooltips must be keyboard-accessible (tab through data points)
- Minimum 3:1 contrast for chart elements against background (WCAG 1.4.11)
- `prefers-reduced-motion`: disable animations when set

## Implementation Approach

### Stage Breakdown

**Stage 1: Foundation — ChartContainer, theme factory, ChartConfig, ChartTooltip, ChartLegend**
- Install `victory-native`
- Build `ChartContainer` with responsive sizing and accessibility
- Build Victory theme factory (tokens → Victory theme)
- Build `ChartTooltip` (9 variants) and `ChartLegend`
- Define `ChartConfig` type and color resolution utilities
- Write spec.md, tests, api-mapping.json

**Stage 2: Core Charts — Area, Bar, Line**
- Implement `AreaChart` with 10 variants
- Implement `BarChart` with 10 variants
- Implement `LineChart` with 10 variants
- Each with spec.md, tests, demo data

**Stage 3: Specialized Charts — Pie, Radar, Radial**
- Implement `PieChart` with 11 variants (including donut)
- Implement `RadarChart` with 14 variants (polar coordinate system)
- Implement `RadialChart` with 6 variants (partial arc pies)
- Each with spec.md, tests, demo data

**Stage 4: Integration, Polish & API Mapping**
- API mapping documentation (shadcn Recharts → vlting Victory Native)
- Cross-platform verification (web + RN rendering)
- Accessibility audit (AccessLint + WCAG verification)
- Export integration (barrel exports, tree-shaking verification)
- Bundle size verification (<5KB per chart type when tree-shaken)

### Patterns & Conventions

Follow established codebase patterns:
- **Compound components** via `withStaticProperties` for Chart sub-components
- **`@ts-expect-error Tamagui v2 RC`** before styled() calls with token defaults
- **Cast sub-components** as `ComponentType<Record<string,unknown>>` for JSX compat
- **Native HTML elements** where semantic (e.g., `<table>` for accessibility data table)
- **Spec-first development** — write `.spec.md` before implementation

### Victory Native vs. Recharts (shadcn uses Recharts)

shadcn uses Recharts (web-only, DOM-based). We use Victory Native (cross-platform, SVG-based). Key API differences:

| shadcn (Recharts) | vlting (Victory Native) |
|--------------------|------------------------|
| `<ResponsiveContainer>` | `<ChartContainer>` (custom, with token theming) |
| `<AreaChart data={data}>` | `<VictoryChart><VictoryArea data={data} /></VictoryChart>` |
| `<Tooltip content={...}>` | `<ChartTooltip>` + Victory Voronoi container |
| CSS variables for colors | Tamagui token references in ChartConfig |
| `<Legend>` | `<ChartLegend>` (Tamagui-styled) |

The API mapping documentation will cover these differences comprehensively.

## Dependencies

### New packages to install:
- `victory-native@^42` — Core charting library (cross-platform)

### Existing dependencies used:
- `react-native-svg` / `react-native-svg-web` — SVG rendering (already installed)
- `tamagui` — Styled components, tokens, themes (already installed)

### No new peer dependencies required.

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Victory Native radar chart limitations | Some shadcn radar variants may not map cleanly to Victory's polar API | Spike during Stage 3; simplify variants that can't be replicated exactly |
| Radial chart (partial arc) complexity | Victory doesn't have a native "radial bar" — must use VictoryPie with startAngle/endAngle | Prototype early in Stage 3; if infeasible, document as known limitation |
| Bundle size with Victory | Victory can be heavy (~150KB minified) | Tree-shaking: import only specific chart components, not the full `victory` bundle |
| Tamagui v2 RC token resolution in Victory | Victory doesn't consume Tamagui tokens natively | Theme factory converts resolved token values to Victory theme at render time |
| Touch interaction on RN | Victory's touch handlers may behave differently on RN vs web | Test on both platforms during each stage; use Victory's built-in touch support |

## Acceptance Criteria

From PRD FR-3:

- [ ] All 6 chart types implemented with Victory Native
- [ ] All 69 shadcn chart variants have equivalents (or documented alternatives)
- [ ] Charts respect brand theming (colors from tokens, not hardcoded)
- [ ] Charts render on both web and React Native
- [ ] Chart tooltip variants (9) are implemented
- [ ] ChartContainer handles responsive sizing
- [ ] Accessibility: ARIA labels, hidden data tables, keyboard navigation
- [ ] API mapping documentation (Recharts → Victory Native)
- [ ] Tree-shakeable imports (import individual chart types)
- [ ] Bundle size < 5KB per individual chart component (excluding Victory runtime)
