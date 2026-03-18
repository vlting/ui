<!-- auto-queue -->
<!-- depends-on: 001, 002, 003 -->
<!-- target-branch: feat/chart-system/chart-foundation -->

# Commit History
- `10cd983` feat(chart): add spec, tests, barrel exports, and victory-native dependency
- `cbba69b` merge into feat/chart-system/chart-foundation

# Segment 4: Spec, Tests, Index & Barrel Exports

Stage 1 of Chart System epic (#40, sub-issue #41). Feature flag: `chart_system`.

**This segment depends on segments 001, 002, 003.** It integrates all Chart foundation files with the package export system and adds the spec document and tests.

## Scope

- `packages/components/Chart/Chart.spec.md` (CREATE)
- `packages/components/Chart/Chart.test.tsx` (CREATE)
- `packages/components/Chart/index.ts` (CREATE)
- `packages/components/index.ts` (MODIFY — add Chart exports)
- `src/index.ts` (MODIFY — add Chart to Layer 2 exports)
- `package.json` (MODIFY — add victory-native dependency)

## Instructions

### 1. Install Victory Native

Add `victory-native` to `package.json` dependencies:

```bash
cd /Users/lucas/Sites/vlt-ui
# Add to dependencies (not devDependencies — it's a runtime dep for consumers)
# Edit package.json to add "victory-native": "^42.0.0" to dependencies
yarn install --ignore-engines
```

**IMPORTANT:** Add `"victory-native": "^42.0.0"` to the `"dependencies"` section of the root `package.json`. Victory Native is a runtime dependency that consumers will need.

### 2. `packages/components/Chart/Chart.spec.md`

Follow the template at `packages/_templates/component.spec.template.md`. Write a complete spec:

```markdown
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
- Legend uses semantic list markup (<ul>/<li>)
- Color indicators are aria-hidden

### Visual Regression
- Chart container renders at correct dimensions
- Tooltip renders with correct theme colors
- Legend renders in horizontal and vertical layouts
```

### 3. `packages/components/Chart/Chart.test.tsx`

Use the custom render from `src/__test-utils__/render.tsx`:

```tsx
import { render, screen } from '../../../src/__test-utils__/render'
import { Chart, useChartContext } from './Chart'
import { ChartTooltip } from './ChartTooltip'
import { ChartLegend } from './ChartLegend'
import type { ChartConfig } from './types'

const mockConfig: ChartConfig = {
  revenue: { label: 'Revenue', color: '$blue8' },
  expenses: { label: 'Expenses', color: '$red8' },
}
```

**Test cases to implement:**

**Chart (ChartContainer):**
- `renders without crashing` — `render(<Chart config={mockConfig} accessibilityLabel="Test chart"><div>chart content</div></Chart>)` should not throw
- `applies role="img" with aria-label` — `screen.getByRole('img')` should have `aria-label="Test chart"`
- `accepts explicit width and height` — render with `width={400} height={300}`, verify the container element has those dimensions in its style
- `useChartContext throws outside Chart` — render a component that calls `useChartContext()` without a `<Chart>` wrapper, expect it to throw

**ChartTooltip:**
- `returns null when not active` — render `<Chart ...><ChartTooltip active={false} /></Chart>`, verify nothing renders
- `returns null with empty payload` — render with `active={true} payload={[]}`, verify nothing renders
- `renders payload items` — render with `active={true}`, `label="January"`, `payload={[{ name: 'Revenue', value: 1000, color: '#3b8fdb' }]}`, verify "Revenue" and "1000" appear in the document
- `supports label variant` — render with `variant="label"`, verify label appears but no payload items

**ChartLegend:**
- `renders legend items from config` — render `<ChartLegend config={mockConfig} />` inside a `<Chart>`, verify "Revenue" and "Expenses" text appears
- `uses semantic list markup` — verify `<ul>` and `<li>` elements are present
- `renders in horizontal layout by default` — verify the list has flex-direction row styles
- `renders in vertical layout` — render with `layout="vertical"`, verify flex-direction column

**IMPORTANT:** Import `render` and `screen` from `../../../src/__test-utils__/render` (NOT from `@testing-library/react` directly). The custom render wraps in TamaguiProvider.

After writing the test file, run:
```bash
yarn test -- --testPathPattern=Chart
```

Fix any failures before proceeding.

### 4. `packages/components/Chart/index.ts`

Barrel export:

```typescript
export { Chart, useChartContext } from './Chart'
export type { ChartContainerProps } from './Chart'
export { ChartTooltip } from './ChartTooltip'
export type { ChartTooltipProps } from './ChartTooltip'
export { ChartLegend } from './ChartLegend'
export type { ChartLegendProps } from './ChartLegend'
export type {
  ChartConfig,
  ChartConfigEntry,
  ChartDataPoint,
  TooltipVariant,
  TooltipIndicator,
  LegendLayout,
} from './types'
```

### 5. Update `packages/components/index.ts`

Add Chart exports in alphabetical order among existing component exports:

```typescript
// Find the alphabetical position and add:
export { Chart, useChartContext, ChartTooltip, ChartLegend } from './Chart'
export type {
  ChartContainerProps,
  ChartTooltipProps,
  ChartLegendProps,
  ChartConfig,
  ChartConfigEntry,
  ChartDataPoint,
  TooltipVariant,
  TooltipIndicator,
  LegendLayout,
} from './Chart'
```

### 6. Update `src/index.ts`

Add Chart to the Layer 2 (Styled Components) section. Find the alphabetical position and add:

```typescript
// In the component exports section:
export {
  Chart,
  useChartContext,
  ChartTooltip,
  ChartLegend,
} from '../packages/components'

export type {
  ChartContainerProps,
  ChartTooltipProps,
  ChartLegendProps,
  ChartConfig,
  ChartConfigEntry,
  ChartDataPoint,
  TooltipVariant,
  TooltipIndicator,
  LegendLayout,
} from '../packages/components'
```

## Verification

- `yarn install --ignore-engines` succeeds with victory-native added
- `packages/components/Chart/index.ts` exports all components and types
- `packages/components/index.ts` includes Chart exports
- `src/index.ts` includes Chart in Layer 2 exports
- `Chart.spec.md` references QUALITY_BASELINE.md and covers all 9 sections
- `yarn test -- --testPathPattern=Chart` passes all tests
- No TypeScript compilation errors across the project

## Task Progress
<!-- lat: 2026-03-02T05:49:20Z -->
<!-- agent-pid: 22715 -->
<!-- worktree: .worktrees/q-004 -->
<!-- branch: q/004 -->

### Checklist
- [x] Create worktree from feat/chart-system/chart-foundation
- [x] Add victory-native dependency
- [x] Create Chart.spec.md
- [x] Create Chart.test.tsx
- [x] Create Chart/index.ts barrel export
- [x] Update packages/components/index.ts
- [x] Update src/index.ts
- [x] Run tests
- [ ] **ACTIVE** → Merge back to target branch

### Handoff Context
- Integration segment — depends on 001, 002, 003 being complete
- Target branch: feat/chart-system/chart-foundation
