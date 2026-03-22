<!-- spec-version: 2 -->

# ContextMenu Specification

## Component Name
ContextMenu

---

## Purpose
Right-click triggered context menu. Positions at mouse coordinates.

---

## Supported Platforms
- [x] React (web)
- [ ] React Native

---

## Compound Components
- `Root` — Context provider (open state, position)
- `Trigger` — Wraps children, listens for contextmenu event
- `Content` — Portal-rendered menu at cursor position
- `Item` — Menu option (role="menuitem")
- `CheckboxItem` — Toggle item (role="menuitemcheckbox")
- `Group` / `Label` — Visual grouping
- `Separator` — Divider
- `Shortcut` — Keyboard hint

---

## Interaction Model
- Right-click (contextmenu event) opens at cursor {x, y}
- Click outside (overlay) closes
- Click item: fires onSelect, closes
- Escape closes

---

## Accessibility
- `role="menu"` on Content
- `aria-haspopup="menu"` on Trigger span
- Standard menuitem/menuitemcheckbox roles

---

## Test Requirements
- Opens on contextmenu event
- Positions at mouse coordinates
- Overlay click closes
- onOpenChange callback fires
- ARIA roles on items
- Disabled items get aria-disabled
- Item click fires onSelect and closes
