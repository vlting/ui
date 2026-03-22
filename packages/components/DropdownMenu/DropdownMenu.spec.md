<!-- spec-version: 2 -->

# DropdownMenu Specification

## Component Name
DropdownMenu

---

## Purpose
Click-triggered dropdown menu. Wraps Menu primitives with click-to-open trigger behavior.

---

## Supported Platforms
- [x] React (web)
- [ ] React Native

---

## Compound Components
- `Root` — Context provider
- `Trigger` — Click-activated button trigger
- `Content` — Portal-rendered menu (role="menu")
- `Item` — Menu option (role="menuitem")
- `CheckboxItem` — Toggle item (role="menuitemcheckbox")
- `RadioGroup` / `RadioItem` — Exclusive selection
- `Group` / `Label` — Visual grouping
- `Separator` — Divider
- `Shortcut` — Keyboard hint

---

## Keyboard
- ArrowDown/Enter/Space on trigger: opens menu
- ArrowDown/Up: navigate items (wraps)
- Home/End: first/last item
- Enter/Space: select item, close
- Escape: close, restore trigger focus
- Type-ahead search

---

## Accessibility
- `role="menu"` on Content, `role="menuitem"` on Items
- `aria-haspopup="menu"`, `aria-expanded` on Trigger
- `aria-disabled` on disabled items, `aria-checked` on checkbox/radio

---

## Test Requirements
- Opens on trigger click, closes on re-click
- Controlled `open` prop
- ARIA roles on all sub-components
- Keyboard open/close/navigate/select
- Disabled items skipped in navigation
- Focus returns to trigger on Escape
