# AppShellResponsive — Responsive Sidebar with Sheet Drawer

## Description
Responsive app shell that uses a full Sidebar on desktop and a Sheet (bottom drawer) on mobile for navigation. The consumer controls which mode is active via a prop.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| groups | NavGroup[] | required | Navigation groups |
| header | ReactNode | - | Navigation header |
| footer | ReactNode | - | Navigation footer |
| children | ReactNode | - | Main content area |
| mode | 'sidebar' \| 'sheet' | 'sidebar' | Display mode |
| sheetOpen | boolean | - | Controlled Sheet open state |
| onSheetOpenChange | (open: boolean) => void | - | Sheet state callback |
| sidebarCollapsible | 'offcanvas' \| 'icon' \| 'none' | 'offcanvas' | Sidebar collapsible mode |
| sidebarWidth | number | - | Sidebar width |

## Layout
**Sidebar mode (desktop):**
- Row: Sidebar.Root (left) + main content (flex=1)
- Standard sidebar with SidebarNavGroup helpers

**Sheet mode (mobile):**
- Main content full width
- Sheet.Root at bottom with navigation in Sheet.Frame
- `<nav>` element wraps groups for landmark semantics
- Sheet.Overlay + Sheet.Handle for drawer UX

## Accessibility
- Sidebar mode: `role="complementary"` landmark
- Sheet mode: `<nav>` with `aria-label="Navigation"`
- `role="menuitem"` on navigation items
- Sheet provides built-in focus management
