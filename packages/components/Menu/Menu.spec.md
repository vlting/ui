<!-- spec-version: 2 -->

# Menu Specification

## Component Name
Menu

---

## Purpose
Base menu primitive providing compound components for building dropdown menus, context menus, and menubars. Handles keyboard navigation, type-ahead search, focus management, and ARIA roles.

---

## Supported Platforms

- [x] React (web)
- [ ] React Native

---

## Composition Model

### Compound Components
- `Root` — Context provider (open state, trigger ref)
- `Trigger` — Button that toggles menu visibility
- `Content` — Portal-rendered menu panel (role="menu")
- `Item` — Pressable menu option (role="menuitem")
- `CheckboxItem` — Toggle item (role="menuitemcheckbox")
- `RadioGroup` / `RadioItem` — Exclusive selection (role="menuitemradio")
- `Group` / `Label` — Visual grouping with header
- `Separator` — Horizontal divider
- `Shortcut` — Trailing keyboard shortcut hint
- `Sub` / `SubTrigger` / `SubContent` — Nested submenu

---

## Interaction Model

### Keyboard
- ArrowDown/Up: navigate items (roving tabindex, wraps)
- Enter/Space: select focused item
- Escape: close menu, restore focus to trigger
- Home/End: jump to first/last item
- Type-ahead: character input searches items by label

### Mouse
- Click trigger: toggle open/close
- Click item: fires onSelect, closes menu
- Click outside: closes menu
- Hover submenu trigger: opens submenu
- Mouse leave submenu: closes submenu

---

## Accessibility
- `role="menu"` on Content
- `role="menuitem"` on Item
- `role="menuitemcheckbox"` on CheckboxItem
- `role="menuitemradio"` on RadioItem
- `aria-haspopup="menu"` on Trigger
- `aria-expanded` on Trigger
- `aria-disabled` on disabled items
- `aria-checked` on checkbox/radio items
- `data-state="open"|"closed"` on Trigger

---

## Styling (STL tokens)
- Content: `bg: '$surface1'`, `radius: '$4'`, `boxShadow: '$md'`, `border: '$neutralMin'`, `py: '$4'`, min-width 220px, zIndex 50
- Item: `px: '$8'`, `py: '$6'`, `radius: '$2'`, `:interact bg: '$neutral4'`, `:focus bg: '$neutral4'`
- Shortcut: `ml: 'auto'`, `fontSize: '$small'`, `color: '$neutral7'`, `fontFamily: '$code'`
- Label: `fontSize: '$small'`, `fontWeight: '$600'`, `color: '$neutral9'`
- Separator: `height: '1px'`, `bg: '$neutralAlpha5'`, `my: '$4'`
- Disabled: `opacity: '$disabledOpacity'`, `pointerEvents: 'none'`

---

## Test Requirements
- Renders trigger
- Opens/closes on click
- ARIA roles: menu, menuitem, menuitemcheckbox, menuitemradio
- Keyboard: ArrowDown opens, Escape closes, Enter selects
- Disabled items get aria-disabled
- Separator renders with role="separator"
- Shortcut renders inline text
- Groups/labels render correctly
