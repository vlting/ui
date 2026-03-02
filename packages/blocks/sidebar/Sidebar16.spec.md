# Sidebar16 — Sidebar with Sticky Site Header

## Description
Standard sidebar combined with a sticky site header bar at the top. The header stays fixed while sidebar content scrolls.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| groups | NavGroup[] | required | Navigation groups |
| header | ReactNode | - | Sidebar header content |
| footer | ReactNode | - | Sidebar footer content |
| siteTitle | string | - | Title text in site header |
| siteLogo | ReactNode | - | Logo element in site header |
| headerActions | ReactNode | - | Actions on right side of site header |
| children | ReactNode | - | Main content area beside sidebar |

## Layout
- Outer column container (flex={1})
- Sticky `<header>` element at top: logo/title left, actions right
- Below header: row with Sidebar.Root (left) and content area (flex={1})
- Groups separated by Separator

## Accessibility
- Semantic `<header>` element for site header
- `role="complementary"` on sidebar
- `role="menuitem"` on navigation items
- Keyboard navigable
