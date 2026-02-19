# Dashboards Playbook

## 1. Problem Space

Dashboards provide at-a-glance situational awareness for decision-makers. This pattern applies to: `analytics` (reporting dashboards), `productivity` (personal dashboards), `marketing` (campaign performance), `crm` (pipeline overview), `ecommerce` (sales overview), `hr` (workforce summaries), and any module where users need to monitor KPIs without drilling into detail pages.

---

## 2. UX Laws Applied

- **Miller's Law** — Surface no more than 7 top-level metrics. Group related metrics into sections. Cognitive overload on a dashboard defeats its purpose.
- **Gestalt Proximity** — Metrics and charts that are related must be visually grouped (same `Section` or `Card`). Users infer relationships from proximity.
- **Hick's Law** — Dashboards are read-heavy, action-light. Limit dashboard-level actions to filter controls and export. Avoid putting forms or workflows on dashboards.
- **Aesthetic-Usability Effect** — A well-composed dashboard with consistent spacing feels more trustworthy. Misaligned tiles or inconsistent chart sizes erode confidence in the data.
- **Doherty Threshold** — Metric tiles and charts must show skeleton loaders while loading. Never show a blank or partially-loaded dashboard.
- **Peak-End Rule** — Users return to dashboards regularly. Ensure that date range and filter preferences are persisted within the session (and ideally across sessions via URL params or saved state).

---

## 3. Standard Layout Pattern

### Page Structure
```
<AppShell>
  <PageHeader title="Dashboard" actions={<ExportDataButton />} />
  <Section>
    <DateRangeSelector />            {/* primary time filter */}
    <AnalyticsFilterBar />           {/* optional secondary filters */}
    <Stack flexDirection="row">
      <MetricCard />
      <MetricCard />
      <MetricCard />
    </Stack>
    <ChartWrapper title="...">
      <AreaChart /> {/* or LineChart, BarChart */}
    </ChartWrapper>
    <Stack flexDirection="row">
      <ChartWrapper><PieChart /></ChartWrapper>
      <StatCard />
    </Stack>
    <SavedReportList />              {/* if saved views are supported */}
  </Section>
</AppShell>
```

### Header Pattern
- `PageHeader` with the dashboard name and a subtitle (e.g., date of last refresh).
- `ExportDataButton` in the header actions slot.
- Do not put navigation in the dashboard header.

### Filters
- `DateRangeSelector` is the primary filter — always present at the top of a dashboard.
- `AnalyticsFilterBar` for secondary dimensions (e.g., region, product, team).
- `SavedReportList` allows users to recall previous filter configurations.
- Filters must apply to all metrics and charts on the page simultaneously.

### Primary CTA
- `ExportDataButton` — the only primary action on most dashboards.
- On personal dashboards (`productivity`), "Add Widget" or "Customize" may be offered.

### Secondary CTA
- "Refresh" button to force a data reload.
- "View Details" links on individual metric tiles that navigate to a detail page.

---

## 4. Component Mapping

| Need | Component |
|------|-----------|
| App page wrapper | `AppShell` |
| Dashboard title and actions | `PageHeader` |
| Page section container | `Section` |
| Single KPI / metric tile | `MetricCard` |
| Highlight stat with label | `StatCard` |
| Simple numeric display | `MetricTile` |
| Content grouping card | `Card` |
| Date range filter | `DateRangeSelector` |
| Multi-criteria filter bar | `AnalyticsFilterBar` |
| Export to CSV/PDF | `ExportDataButton` |
| Saved filter configurations | `SavedReportList` |
| Trend line chart | `LineChart` |
| Volume bar chart | `BarChart` |
| Cumulative area chart | `AreaChart` |
| Proportion/share chart | `PieChart` |
| Chart title + legend wrapper | `ChartWrapper` |

---

## 5. Accessibility Rules

- Each `MetricCard`, `StatCard`, and `MetricTile` must have a descriptive label that is visible and associated programmatically (not just a number floating in space).
- Trend indicators (arrows, color changes) must include `aria-label` text: "Revenue: $42,000, up 12% from last period".
- All charts must provide a text-based summary accessible to screen readers, either via `aria-describedby` pointing to a `<caption>` or a hidden summary element within `ChartWrapper`.
- `DateRangeSelector` must be keyboard-accessible with proper date picker conventions.
- `AnalyticsFilterBar` filter chips must be dismissible by keyboard (Delete/Backspace on focused chip).
- `SavedReportList` items must be reachable and activatable by keyboard.
- Dashboard sections must use proper heading hierarchy (`h1` for page title, `h2` for section titles).

---

## 6. Anti-Patterns

- **Too many metrics** — Do not show 15+ metric tiles at the top level. Promote 3–5 KPIs; put secondary metrics in expandable sections or sub-pages.
- **Charts without context** — A chart with no title, no axis labels, and no legend is uninterpretable. Always use `ChartWrapper` to provide this context.
- **Actions embedded in charts** — Do not put form elements or complex actions inside a chart. Keep charts read-only; route to a detail page for actions.
- **Unsynchronized filters** — All metrics and charts on a dashboard must respond to the same `DateRangeSelector` and `AnalyticsFilterBar`. Never have some tiles respond to filters and others ignore them.
- **No loading state** — Dashboards that appear blank while loading cause users to think the page is broken. Always use skeleton loaders for `MetricCard`, `StatCard`, and charts.
- **Hardcoded date ranges** — "Last 30 days" as a default is fine, but users must be able to change it via `DateRangeSelector`. Never hardcode a date range that can't be overridden.
- **Pie charts for many categories** — `PieChart` is appropriate for 2–5 segments. For 6+ categories, use `BarChart` instead.

---

## 7. Variants

### Density Increase
- Compact metric grid with smaller `MetricTile` components instead of `MetricCard` for power-user dashboards.
- Tabbed sections using `Tabs` to separate chart groups within a single dashboard page.
- `ResizablePanel` for drag-to-resize dashboard widgets in customizable dashboard products.

### Mobile Behavior
- Stack all metric tiles and charts vertically (single column).
- `ChartWrapper` renders charts at full screen width; horizontal scroll for wide bar charts.
- `DateRangeSelector` opens as a `Sheet` on mobile.
- `AnalyticsFilterBar` collapses to a "Filters" button that opens a `Sheet`.
- Prioritize: show the 3 most important `MetricCard`s first, then a single primary chart, then secondary metrics.

### Edge Cases
- **No data state**: Each chart and metric tile must handle the case where data returns empty — show a "No data for this period" state inside `ChartWrapper`, not an empty chart.
- **Single time period selected**: `AreaChart` and `LineChart` with a single data point should fall back to a `StatCard` display.
- **Real-time dashboards**: Add a live indicator badge and a "Last updated X seconds ago" label. Auto-refresh should be optional, not forced.
- **Personal vs. shared dashboards**: Personal dashboards (`ProductivityDashboard`) have user-configurable layouts; shared dashboards have a fixed layout managed by an admin. Distinguish these contexts clearly.
