# Sidebar09 — Collapsible Nested Sidebars

## Description
Two-level sidebar: a primary icon rail on the left and a secondary panel that opens when an item with children is selected.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| groups | NavGroup[] | required | Navigation groups |
| header | ReactNode | - | Header content for the primary rail |
| footer | ReactNode | - | Footer content for the primary rail |
| children | ReactNode | - | Main content area |
| side | 'left' \| 'right' | 'left' | Side of sidebar |
| defaultOpen | boolean | true | Secondary panel default open state |
| open | boolean | - | Controlled open state for secondary panel |
| onOpenChange | (open: boolean) => void | - | Callback for secondary panel open change |
| width | number | - | Width of secondary panel |
| collapsedWidth | number | 56 | Width of icon rail |

## Layout
- Primary icon rail: always visible, shows items with icons only
- Secondary panel: appears when an item with children is clicked
- Clicking the same item again closes the secondary panel
- Secondary panel header shows the selected item's label

## Accessibility
- `role="complementary"` on both sidebar panels
- Tooltip on each rail icon for screen reader context
- Keyboard navigable menu items in both panels
