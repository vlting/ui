# Sidebar03 — Submenus / Nested Navigation

## Description
A sidebar with nested navigation. NavItems that have `children` render as expandable sub-menus using `Collapsible`. Supports multi-level nesting.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| groups | `NavGroup[]` | required | Navigation groups with items (items may have children) |
| header | `ReactNode` | — | Custom header content |
| footer | `ReactNode` | — | Custom footer content |
| collapsible | `'offcanvas' \| 'icon' \| 'none'` | `'offcanvas'` | Sidebar collapse mode |
| side | `'left' \| 'right'` | `'left'` | Side placement |
| variant | `'sidebar' \| 'floating' \| 'inset'` | `'sidebar'` | Visual variant |
| defaultOpen | `boolean` | `true` | Initial open state |

## Layout
- `Sidebar.Root` → `Sidebar.Content` with groups
- Each group may have a label and items
- Items with `children` render as `Collapsible` sections with chevron indicator
- Child items are indented by depth level
- Items without `children` render as standard menu items

## Accessibility
- Sidebar landmark: `role="complementary"`
- Menu landmark: `role="menu"` for each group
- Menu items: `role="menuitem"` with active/disabled states
- Collapsible regions for nested content
