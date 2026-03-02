# Sidebar11 — Collapsible File Tree

## Description
A sidebar showing a file/folder tree structure with expand/collapse for directories.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| tree | FileTreeItem[] | required | File tree data |
| header | ReactNode | - | Header content |
| footer | ReactNode | - | Footer content |
| collapsible | 'offcanvas' \| 'icon' \| 'none' | 'offcanvas' | Collapse mode |
| side | 'left' \| 'right' | 'left' | Side position |
| variant | 'sidebar' \| 'floating' \| 'inset' | 'sidebar' | Visual variant |
| defaultOpen | boolean | true | Default sidebar open state |

## Layout
- Folders render with Collapsible (expand/collapse with arrow indicator)
- Files are leaf MenuItem nodes
- Depth-based indentation for hierarchy visualization
- Default icons: 📁 for folders, 📄 for files (overridable via icon prop)

## Accessibility
- `role="complementary"` on sidebar
- `role="menuitem"` on file items
- Keyboard navigable tree structure via Collapsible triggers
