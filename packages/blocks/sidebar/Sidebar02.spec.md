# Sidebar02 — Collapsible Sections

## Description
A sidebar with collapsible group sections. Each group with a label can be expanded or collapsed via a trigger. Groups without labels are always visible.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| groups | NavGroup[] | required | Navigation groups with optional collapsible behavior |
| header | ReactNode | — | Custom header content |
| footer | ReactNode | — | Custom footer content |
| collapsible | 'offcanvas' \| 'icon' \| 'none' | 'offcanvas' | Sidebar collapse behavior |
| side | 'left' \| 'right' | 'left' | Side placement |
| variant | 'sidebar' \| 'floating' \| 'inset' | 'sidebar' | Visual variant |
| defaultOpen | boolean | true | Initial sidebar open state |

## Layout
- Sidebar.Root → Header (optional) → Content → CollapsibleGroups → Footer (optional)
- Each labeled group: Collapsible.Root → Trigger (label + chevron) → Content (Menu items)
- Groups without labels render as plain groups (no collapsible trigger)

## NavGroup.defaultOpen
- Controls whether the collapsible group starts expanded (default: true)
- If `defaultOpen: false`, the group starts collapsed

## Accessibility
- Collapsible sections use `Collapsible.Content` with `role="region"`
- Group labels are clickable triggers for expand/collapse
- All standard sidebar landmarks and roles preserved
