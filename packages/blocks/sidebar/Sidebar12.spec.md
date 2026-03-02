# Sidebar12 — Sidebar with Calendar

## Description
A sidebar that includes a calendar date picker alongside navigation items. Useful for date-based navigation in scheduling or event apps.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| groups | NavGroup[] | required | Navigation groups |
| header | ReactNode | - | Header content |
| footer | ReactNode | - | Footer content |
| selectedDate | Date | - | Currently selected date |
| onDateSelect | (date: Date) => void | - | Date selection callback |
| calendarPosition | 'top' \| 'bottom' | 'top' | Calendar position relative to navigation |

## Layout
- Calendar.Root with single date selection
- Navigation groups rendered via SidebarNavGroup
- Separator between calendar and navigation sections
- Calendar position is configurable (above or below nav)

## Accessibility
- `role="complementary"` on sidebar
- Calendar provides built-in keyboard navigation
- Navigation items are keyboard navigable menu items
