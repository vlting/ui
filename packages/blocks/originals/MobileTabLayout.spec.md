# MobileTabLayout — Tab Bar Navigation (Mobile-First)

## Description
Mobile-first layout with a tab bar at the bottom for primary navigation. Tabs switch between content panels.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| tabs | TabItem[] | required | Tab definitions (value, label, icon, content) |
| defaultTab | string | first tab | Default active tab value |
| activeTab | string | - | Controlled active tab |
| onTabChange | (value: string) => void | - | Tab change callback |
| children | ReactNode | - | Additional content |

## TabItem
| Field | Type | Description |
|-------|------|-------------|
| value | string | Unique tab identifier |
| label | string | Tab display label |
| icon | ReactNode | Optional tab icon |
| content | ReactNode | Tab panel content |

## Layout
- Column container with flex={1}
- Content area (flex={1}) with Tabs.Content for each tab
- Bottom tab bar via Tabs.List with Tabs.Trigger for each tab
- Tab triggers show icon above label

## Accessibility
- Uses Tabs component with built-in ARIA tablist/tab/tabpanel semantics
- Keyboard navigable between tabs (arrow keys)
