# Sidebar13 — Sidebar in a Dialog

## Description
Navigation accessed through a Dialog (modal). Good for mobile patterns where navigation takes over the screen.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| groups | NavGroup[] | required | Navigation groups |
| header | ReactNode | - | Header content inside dialog |
| footer | ReactNode | - | Footer content inside dialog |
| triggerLabel | string | "Menu" | Label for the trigger button |
| dialogTitle | string | "Navigation" | Dialog title text |
| dialogOpen | boolean | - | Controlled open state |
| onDialogOpenChange | (open: boolean) => void | - | Open state callback |

## Layout
- Dialog.Root wrapping trigger and content
- Dialog.Trigger: Button with triggerLabel
- Dialog.Content: Dialog.Header with title, then `<nav>` element with groups
- Groups rendered via SidebarNavGroup helper

## Accessibility
- `<nav>` landmark with `aria-label` inside dialog
- Dialog provides built-in focus trapping
- `role="menuitem"` on navigation items
