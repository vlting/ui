# Dashboard01 — Full Dashboard with Sidebar, Charts, Data Table

## Description
Complete dashboard layout combining a sidebar for navigation, chart visualizations, and a data table. Demonstrates composition of Sidebar, Chart, DataTable, and Card components.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| sidebarGroups | NavGroup[] | required | Sidebar navigation groups |
| sidebarHeader | ReactNode | - | Sidebar header content |
| sidebarFooter | ReactNode | - | Sidebar footer content |
| title | string | "Dashboard" | Page title |
| description | string | - | Page description |
| chartConfig | ChartConfig | - | Chart series configuration |
| chartData | Record[] | - | Chart data |
| chartXAxisKey | string | "month" | X-axis key for chart |
| tableData | Record[] | - | Table data rows |
| tableColumns | ColumnDef[] | - | Table column definitions |
| children | ReactNode | - | Extra content after table |

## Layout
- Row: Sidebar (left) + Main content (right, flex=1)
- Main content stacked vertically: title/description, chart card, data table card, children
- Chart and table sections only render when their data is provided
- Chart wrapped in Card with "Overview" title
- Table wrapped in Card with "Recent Data" title

## Accessibility
- Sidebar has `role="complementary"` landmark
- Chart has accessibility label
- DataTable renders semantic `<table>` with column headers
- Keyboard navigable throughout
