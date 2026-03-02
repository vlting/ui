# Sidebar05 — Collapsible Submenus

## Description
A sidebar with collapsible submenus that include a visual tree line indicator. Items with children expand to show nested navigation with a left border connecting child items.

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
- `Sidebar.Root` with groups
- Items with children use `Collapsible` with chevron indicator (›)
- Expanded children have a left border line for visual hierarchy
- Multi-level nesting supported

## Accessibility
- Sidebar landmark: `role="complementary"`
- Menu landmarks: `role="menu"` for groups and nested lists
- Collapsible regions for nested content
