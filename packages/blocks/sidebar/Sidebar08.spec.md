# Sidebar08 — Inset with Secondary Navigation

## Description
An inset sidebar (`variant="inset"`) with a two-level navigation pattern. The top section shows group names as clickable items. Selecting a group displays its items in a secondary section below a separator.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| groups | `NavGroup[]` | required | Navigation groups (group labels become top-level nav items) |
| header | `ReactNode` | — | Custom header content |
| footer | `ReactNode` | — | Custom footer content |
| secondaryContent | `ReactNode` | — | Optional content below the secondary navigation |
| onGroupSelect | `(groupIndex: number) => void` | — | Callback when a group is selected |
| collapsible | `'offcanvas' \| 'icon' \| 'none'` | `'offcanvas'` | Sidebar collapse mode |
| side | `'left' \| 'right'` | `'left'` | Side placement |
| defaultOpen | `boolean` | `true` | Initial open state |

## Layout
- `Sidebar.Root variant="inset"` for inset appearance
- Top section: group names as selectable menu items
- Separator divides group navigation from sub-items
- Bottom section: items from the currently selected group
- Optional secondary content area below navigation

## Accessibility
- Sidebar landmark: `role="complementary"`
- Menu landmarks: `role="menu"` for both sections
- Active state on selected group item
