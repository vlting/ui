# Sidebar06 — Submenus as Dropdowns

## Description
A sidebar where items with children show their sub-navigation in dropdown menus instead of inline collapsible sections. Clicking a parent item opens a dropdown with the child items.

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
- Items without children render as standard menu items
- Items with children use `DropdownMenu` (trigger + content with child items)
- Dropdown appears below the parent item

## Accessibility
- Sidebar landmark: `role="complementary"`
- Dropdown trigger: `aria-haspopup="menu"`, `aria-expanded`
- Dropdown content: `role="menu"` with focusable items
