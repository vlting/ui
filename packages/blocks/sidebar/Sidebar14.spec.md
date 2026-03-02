# Sidebar14 — Sidebar on the Right

## Description
Standard sidebar positioned on the right side. Demonstrates `side="right"` usage for secondary/contextual navigation.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| groups | NavGroup[] | required | Navigation groups |
| header | ReactNode | - | Header content |
| footer | ReactNode | - | Footer content |
| title | string | - | Simple title text (used if no header) |
| showTrigger | boolean | true | Show collapse trigger |

## Layout
- Identical to Sidebar01 structurally but with `side="right"`
- Groups separated by Separator
- Optional collapse trigger for responsive behavior

## Accessibility
- `role="complementary"` on sidebar
- `role="menuitem"` on navigation items
- Keyboard navigable
