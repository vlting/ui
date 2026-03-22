<!-- spec-version: 2 -->

# Menubar Specification

## Component Name
Menubar

---

## Purpose
Horizontal bar of menu triggers (File, Edit, View pattern). Opening one menu while hovering another switches between them.

---

## Supported Platforms
- [x] React (web)
- [ ] React Native

---

## Compound Components
- `Root` — Horizontal flex bar (role="menubar")
- `Menu` — Individual menu context within the bar
- `Trigger` — Button for each menu (role="menuitem")
- `Content` — Portal-rendered dropdown (role="menu")
- `Item` — Menu option (role="menuitem")
- `CheckboxItem` — Toggle item
- `Group` / `Label` — Visual grouping
- `Separator` — Divider
- `Shortcut` — Keyboard hint

---

## Interaction Model
- Click trigger: toggles that menu
- Hover trigger while another menu is open: switches
- ArrowRight/Left on trigger: navigate between menus
- ArrowDown on trigger: open menu
- ArrowRight/Left inside content: switch to adjacent menu
- Escape: close current menu, focus trigger

---

## Styling
- Root: `bg: '$surface1'`, `radius: '$4'`, `border: '$neutralMin'`, `p: '$4'`, flex row, gap $4
- Trigger: `px: '$8'`, `py: '$4'`, active variant highlights

---

## Test Requirements
- Renders multiple menu triggers
- role="menubar" on Root
- Triggers have aria-haspopup/aria-expanded
- Click opens content with role="menu"
- Re-click closes
- Item click fires onSelect and closes
- Disabled items get aria-disabled
