# Sidebar01 — Simple Navigation Grouped by Section

## Description
A straightforward sidebar with navigation items organized into labeled groups, separated by dividers. The simplest sidebar variant — no collapsible sections, no nested menus.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| groups | NavGroup[] | required | Navigation groups to render |
| header | ReactNode | — | Custom header content |
| footer | ReactNode | — | Custom footer content |
| title | string | — | Simple text title (used if no header) |
| collapsible | 'offcanvas' \| 'icon' \| 'none' | 'offcanvas' | Collapse behavior |
| side | 'left' \| 'right' | 'left' | Side placement |
| variant | 'sidebar' \| 'floating' \| 'inset' | 'sidebar' | Visual variant |
| defaultOpen | boolean | true | Initial open state |
| open | boolean | — | Controlled open state |
| onOpenChange | (open: boolean) => void | — | Open change callback |

## Layout
- Sidebar.Root → Sidebar.Header (optional) → Sidebar.Content → groups with separators → Sidebar.Footer (optional)
- Each group: Sidebar.Group → GroupLabel (if label) → GroupContent → Menu → MenuItems

## Accessibility
- Root has `role="complementary"` and `aria-label="Sidebar"`
- Menu has `role="menu"`
- Each item has `role="menuitem"`
- Active items have `aria-current="page"`
- Disabled items have `aria-disabled="true"`
