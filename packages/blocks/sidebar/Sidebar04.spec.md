# Sidebar04 — Floating Variant with Submenus

## Description
A floating sidebar with nested navigation. Uses `variant="floating"` for elevated appearance with shadow and rounded corners. Same nested submenu pattern as Sidebar03, with an optional search input.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| groups | `NavGroup[]` | required | Navigation groups with items (items may have children) |
| header | `ReactNode` | — | Custom header content |
| footer | `ReactNode` | — | Custom footer content |
| searchPlaceholder | `string` | — | Placeholder text for optional search input |
| onSearchChange | `(value: string) => void` | — | Callback when search input changes |
| collapsible | `'offcanvas' \| 'icon' \| 'none'` | `'offcanvas'` | Sidebar collapse mode |
| side | `'left' \| 'right'` | `'left'` | Side placement |
| defaultOpen | `boolean` | `true` | Initial open state |

## Layout
- `Sidebar.Root variant="floating"` for elevated appearance
- Optional search input below header
- Same nested navigation as Sidebar03 (Collapsible for items with children)

## Accessibility
- Sidebar landmark: `role="complementary"`
- Menu landmark: `role="menu"` for each group
- Menu items: `role="menuitem"` with active/disabled states
- Search input is labeled via placeholder
