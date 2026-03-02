# Sidebar15 — Left and Right Sidebars

## Description
Dual sidebar layout with independent left and right sidebars. Left for primary navigation, right for contextual/secondary content.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| leftGroups | NavGroup[] | required | Left sidebar navigation groups |
| rightGroups | NavGroup[] | required | Right sidebar navigation groups |
| leftHeader | ReactNode | - | Left sidebar header |
| rightHeader | ReactNode | - | Right sidebar header |
| leftFooter | ReactNode | - | Left sidebar footer |
| rightFooter | ReactNode | - | Right sidebar footer |
| children | ReactNode | - | Main content area between sidebars |
| leftDefaultOpen | boolean | true | Left sidebar default open state |
| rightDefaultOpen | boolean | true | Right sidebar default open state |
| leftCollapsible | 'offcanvas' \| 'icon' \| 'none' | 'offcanvas' | Left sidebar collapsible mode |
| rightCollapsible | 'offcanvas' \| 'icon' \| 'none' | 'offcanvas' | Right sidebar collapsible mode |
| leftWidth | number | - | Left sidebar width |
| rightWidth | number | - | Right sidebar width |

## Layout
- Row container with flex={1}
- Left Sidebar.Root (side="left") with leftGroups
- Center content area (flex={1})
- Right Sidebar.Root (side="right") with rightGroups
- Each sidebar independently collapsible

## Accessibility
- Two `role="complementary"` landmarks (one per sidebar)
- `role="menuitem"` on navigation items
- Keyboard navigable
