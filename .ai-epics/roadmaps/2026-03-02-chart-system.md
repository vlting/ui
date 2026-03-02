# Epic: Chart System (Victory Native)

- **Branch:** epic/chart-system
- **Feature flag:** chart_system
- **GitHub Issue:** #40
- **Epic PR:** #45
- **Created:** 2026-03-02
- **Status:** in-progress
- **Saga:** `.ai-sagas/roadmaps/shadcn-parity.md`
- **Tech Spec:** `.ai-epics/docs/chart-system/tech-spec.md`
- **Project Node ID:** PVT_kwDODxaco84BP_ab
- **Project Item ID:** PVTI_lADODxaco84BP_abzgmb24M
- **Status Field ID:** PVTSSF_lADODxaco84BP_abzg-PVjU
- **Status Options:** Planning=1ab91906, Todo=7dbd5883, In Progress=bf105a86, In Review=7e73f574, Done=e0bcb0e8

## Stage 1: Chart Foundation
**Objective:** Install Victory Native, build ChartContainer (responsive sizing + accessibility), Victory theme factory (tokens → Victory theme), ChartConfig type system, ChartTooltip (9 variants), ChartLegend, and color resolution utilities. Write Chart.spec.md and tests.
**Estimated scope:** ~12 files, ~800 lines
**GitHub Sub-Issue:** #41
**Stage Branch:** feat/chart-system/chart-foundation
**Stage PR:** #46
**Board Item ID:** PVTI_lADODxaco84BP_abzgmb26g
**Acceptance criteria:**
- [x] victory-native installed as dependency
- [x] ChartContainer renders with responsive sizing (ResizeObserver web / onLayout RN)
- [x] ChartContainer provides ARIA role="img" and aria-label
- [x] Victory theme factory resolves Tamagui tokens to Victory theme object
- [x] ChartConfig type defined with label, color (token ref), optional icon
- [x] ChartTooltip implements 9 variants (default, cursor, dot, line, label, custom, advanced, icons, formatter)
- [x] ChartLegend renders horizontal/vertical with token colors
- [x] Chart.spec.md written following component spec template
- [x] Tests pass for ChartContainer, ChartTooltip, ChartLegend
**Status:** complete
**Iterations:** 0

## Stage 2: Core Charts (Area, Bar, Line)
**Objective:** Implement AreaChart (10 variants), BarChart (10 variants), and LineChart (10 variants). Each chart type supports stacking, grouping, interactivity, and integrates with ChartContainer/ChartTooltip/ChartLegend.
**Estimated scope:** ~9 files, ~900 lines
**GitHub Sub-Issue:** #42
**Stage Branch:** feat/chart-system/core-charts
**Stage PR:** (pending)
**Board Item ID:** PVTI_lADODxaco84BP_abzgmb27A
**Acceptance criteria:**
- [ ] AreaChart with 10 variants (default, gradient, stacked, expanded, step, axes, interactive, legend, linear, icons)
- [ ] BarChart with 10 variants (default, horizontal, stacked, grouped, negative, label, mixed, custom-label, active, interactive)
- [ ] LineChart with 10 variants (default, dots, multiple, labels, stepped, custom-dots, interactive, linear, legend, icons)
- [ ] All charts render inside ChartContainer with proper theming
- [ ] Charts respond to brand switching (token colors update)
- [ ] Spec.md written for each chart type
- [ ] Tests pass for all chart types and key variants
**Status:** executing
**Iterations:** 0

## Stage 3: Specialized Charts (Pie, Radar, Radial)
**Objective:** Implement PieChart (11 variants including donut), RadarChart (14 variants using polar coordinates), and RadialChart (6 variants using partial arc). These are the more complex chart types requiring Victory's polar/pie APIs.
**Estimated scope:** ~9 files, ~900 lines
**GitHub Sub-Issue:** #43
**Stage Branch:** (pending)
**Stage PR:** (pending)
**Board Item ID:** PVTI_lADODxaco84BP_abzgmb27Q
**Acceptance criteria:**
- [ ] PieChart with 11 variants (default, donut, donut-text, donut-active, label, custom-label, label-list, legend, separator, interactive, stacked)
- [ ] RadarChart with 14 variants (default, dots, lines, custom, multiple, grid-circle, grid-filled, grid-none, legend, icons, radius-axis, label, custom-shape, interactive)
- [ ] RadialChart with 6 variants (default, grid, label, stacked, text, shape)
- [ ] Polar coordinate system works correctly for radar charts
- [ ] Partial arc rendering works for radial charts
- [ ] Spec.md written for each chart type
- [ ] Tests pass for all chart types and key variants
**Status:** pending
**Iterations:** 0

## Stage 4: Integration, Polish & API Mapping
**Objective:** Complete barrel exports and tree-shaking verification, write comprehensive API mapping documentation (shadcn Recharts → vlting Victory Native), run accessibility audits, verify cross-platform rendering, and ensure bundle size targets are met.
**Estimated scope:** ~8 files, ~500 lines
**GitHub Sub-Issue:** #44
**Stage Branch:** (pending)
**Stage PR:** (pending)
**Board Item ID:** PVTI_lADODxaco84BP_abzgmb274
**Acceptance criteria:**
- [ ] All chart components exported from packages/components/Chart/index.ts
- [ ] Root index.ts exports all chart components
- [ ] api-mapping.json complete (Recharts → Victory Native mapping for all 6 chart types)
- [ ] Accessibility audit passes (AccessLint: ARIA, contrast, screen reader data table)
- [ ] Hidden data table renders for screen readers with chart data
- [ ] prefers-reduced-motion disables chart animations
- [ ] Tree-shakeable imports verified (individual chart types importable)
- [ ] Cross-platform rendering verified (web + React Native)
**Status:** pending
**Iterations:** 0
