# Sidebar10 — Sidebar in a Popover

## Description
Navigation accessed through a Popover triggered by a button. Good for space-constrained layouts where a persistent sidebar is not practical.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| groups | NavGroup[] | required | Navigation groups |
| header | ReactNode | - | Header content inside popover |
| footer | ReactNode | - | Footer content inside popover |
| triggerLabel | string | "Navigation" | Label for the trigger button |
| placement | 'bottom' \| 'right' | 'bottom' | Popover placement |
| popoverOpen | boolean | - | Controlled open state |
| onPopoverOpenChange | (open: boolean) => void | - | Open state callback |

## Layout
- Trigger button opens a Popover
- Popover contains a `<nav>` element with navigation groups
- Groups separated by Separator
- Items are buttons with icon + label, styled with hover/focus states

## Accessibility
- `<nav>` landmark inside popover with `aria-label`
- Items have `role="menuitem"`
- Active item marked with `aria-current="page"`
- Focus visible styles on all interactive elements
- Keyboard navigable
