# Data Display Playbook

## 1. Problem Space

Data display covers any module that renders lists, tables, charts, or metrics: `analytics` (charts, reports), `layout` (data tables, grids), `ecommerce` (order history, inventory), `crm` (contact lists, pipeline views), `hr` (employee directory), `erp` (inventory tables), `accounting` (ledger, financial summaries), `project-management` (task lists), and any module where structured records are presented to users.

---

## 2. UX Laws Applied

- **Miller's Law** — Chunk data. Tables should paginate or virtualize beyond 50 rows. Dashboards should surface the 5–7 most important metrics, not all available data.
- **Gestalt Proximity & Similarity** — Use consistent row/column patterns. Group related columns. Use alternating row shading only if it aids scanning (not decoratively).
- **Hick's Law** — Limit the number of actions available per row. One primary action per row; additional actions in an overflow menu.
- **Fitts's Law** — Row actions and sort controls must have adequate touch/click targets.
- **Aesthetic-Usability Effect** — Clean, well-spaced tables feel easier to use. Avoid visual noise (excessive borders, dense column packing).
- **Doherty Threshold** — Tables should show a loading skeleton immediately; charts should show a loader while data fetches.

---

## 3. Standard Layout Pattern

### Page Structure
```
<AppShell>
  <PageHeader title="..." actions={<Button>Export</Button>} />
  <Section>
    <AnalyticsFilterBar />   {/* optional, for filterable views */}
    <DataTable />            {/* or DataGrid for editable/complex cases */}
    <Pagination />           {/* below the table */}
  </Section>
</AppShell>
```

For chart-heavy pages:
```
<AppShell>
  <PageHeader title="..." />
  <Section>
    <DateRangeSelector />
    <ChartWrapper>
      <LineChart /> {/* or BarChart, AreaChart, PieChart */}
    </ChartWrapper>
  </Section>
</AppShell>
```

### Header Pattern
- `PageHeader` with a title and optional subtitle.
- Export action using `ExportDataButton` placed in the header action slot.
- Filter controls (`AnalyticsFilterBar`, `DateRangeSelector`) immediately below the header, above the data.

### Filters
- Use `AnalyticsFilterBar` for multi-criteria filtering across data views.
- Use `DateRangeSelector` when date range is the primary filter dimension.
- Filters must apply instantly (or on "Apply" for complex multi-filter combinations).
- Always show an active filter summary so users know what's filtered.

### Primary CTA
- `ExportDataButton` for read-only data views.
- "New Record" `Button` for views where records can be created (positioned in `PageHeader`).

### Secondary CTA
- `SavedReportList` for analytics views where users can save filter configurations.
- Row-level actions as icon `Button`s (edit, delete, view detail).

---

## 4. Component Mapping

| Need | Component |
|------|-----------|
| Read-only tabular data | `DataTable` |
| Editable or complex grid data | `DataGrid` |
| Large lists (virtual rendering) | `VirtualizedList` |
| Table/list pagination | `Pagination` |
| Single metric tile | `MetricTile` |
| Analytics metric with trend | `MetricCard` |
| Stat highlight card | `StatCard` |
| Content container | `Card` |
| Filter bar for data views | `AnalyticsFilterBar` |
| Date range filter | `DateRangeSelector` |
| Export data to file | `ExportDataButton` |
| Saved filter configurations | `SavedReportList` |
| Line trend chart | `LineChart` |
| Bar comparison chart | `BarChart` |
| Area cumulative chart | `AreaChart` |
| Part-of-whole chart | `PieChart` |
| Chart container with title/legend | `ChartWrapper` |

---

## 5. Accessibility Rules

- `DataTable` and `DataGrid` must use proper `<table>` semantics with `<th>` for column headers and `scope="col"` or `scope="row"` as appropriate.
- Sortable columns must have `aria-sort` attributes that update on sort.
- `Pagination` must announce current page and total pages via `aria-label`.
- `VirtualizedList` must maintain focus on scroll — keyboard navigation must not break when new rows are loaded.
- Charts (`LineChart`, `BarChart`, `AreaChart`, `PieChart`) must provide a text alternative (data table or `aria-label` summary) for screen reader users. Never rely solely on the visual chart to convey information.
- `ChartWrapper` should accept an `accessibleSummary` prop that describes the chart's key insight.
- Color-coded data (e.g., status columns, chart series) must also use shape or text to distinguish categories — not color alone.
- `MetricCard` and `MetricTile` trend indicators (up/down arrows) must have `aria-label` ("Increase by X%" / "Decrease by X%").

---

## 6. Anti-Patterns

- **Unpaginated large datasets** — Never render 100+ rows without `Pagination` or `VirtualizedList`. The DOM cost and user scanning cost are both prohibitive.
- **Column overload** — Do not show all available fields by default. Start with the 5–7 most useful columns; allow column toggling if needed.
- **Stale data without indicators** — If data is cached or has a known refresh time, display a "Last updated X ago" label. Never show stale data silently.
- **Filter state not persisted** — Filter state should survive navigation within the same module session. Users should not lose their filters on row click + back.
- **Charts without legends** — All multi-series charts must have a legend. `ChartWrapper` should always include one.
- **Using `DataGrid` for read-only data** — `DataGrid` is for editable scenarios. For read-only tabular data, use `DataTable` (lighter weight, simpler semantics).
- **Action overload per row** — More than 2 visible actions per row causes cognitive overload. Use an overflow menu for additional actions.
- **Missing empty state** — Tables and lists must have an explicit empty state (illustration or message) when no data matches the current filters.

---

## 7. Variants

### Density Increase
- Compact `DataTable` rows (reduced vertical padding) for admin/power-user contexts.
- `DataGrid` supports inline editing; use compact mode when showing many columns.
- Use `VirtualizedList` instead of `DataTable` for extremely long lists where column structure is less critical.

### Mobile Behavior
- `DataTable` collapses to a card-based layout on mobile — each row becomes a `Card`.
- `DataGrid` is desktop-only; do not render it on small screens.
- `Pagination` switches to a simple "Previous / Next" pattern on mobile; hide page number buttons.
- Charts render at full width; horizontal scrolling is acceptable for bar charts with many categories.
- `AnalyticsFilterBar` collapses into a filter button that opens a `Sheet` on mobile.

### Edge Cases
- **Zero results**: Show a helpful empty state with context ("No orders match your filters") and a clear action ("Clear filters" or "Create your first order").
- **Single metric**: `MetricTile` or `StatCard` alone (not inside a chart wrapper) is appropriate when only one number matters.
- **Real-time data**: Charts and metric tiles in real-time contexts should update with a subtle animation, not a full re-render flash.
- **Large numbers**: Format large numbers (10k+, 1M+) with SI suffixes. Never wrap numbers to a new line within a metric tile.
