# Sidebar07 — Collapses to Icons

## Description
A sidebar that uses `collapsible="icon"` mode. When collapsed, only icons are visible (48px width). When expanded, full labels appear. Items without icons are hidden in collapsed mode. Tooltips show labels when hovering icons in collapsed state.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| groups | `NavGroup[]` | required | Navigation groups (items should have icons) |
| header | `ReactNode` | — | Custom header content |
| footer | `ReactNode` | — | Custom footer content |
| showTrigger | `boolean` | `true` | Show the collapse/expand trigger button |
| side | `'left' \| 'right'` | `'left'` | Side placement |
| variant | `'sidebar' \| 'floating' \| 'inset'` | `'sidebar'` | Visual variant |
| defaultOpen | `boolean` | `true` | Initial open state |

## Layout
- `Sidebar.Root collapsible="icon"` with `Sidebar.Trigger` for toggling
- Expanded: icon + label for each item, group labels visible
- Collapsed: icons only, group labels auto-hidden, tooltips show item labels
- Items without icons are not rendered (icon-only mode requires icons)

## Accessibility
- Sidebar landmark: `role="complementary"`
- Trigger button for toggling collapse state
- Tooltips on collapsed icons for label context
