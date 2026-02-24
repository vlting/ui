# Component Spec — Menubar

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Horizontal menu bar with multiple dropdown menus, similar to desktop application menu bars.
- Use for application-level menus (File, Edit, View pattern) and complex toolbar actions.
- Do NOT use for simple navigation (use NavigationMenu). Do NOT use for single dropdown (use DropdownMenu).

---

## 2. UX Intent

- **Jakob's Law** — horizontal menu bars follow desktop OS conventions.
- **WAI-ARIA pattern:** [Menu Bar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)

---

## 3. Anatomy

Compound component with custom implementation:
- `Menubar` (Root) — horizontal bar container with backdrop. `role="menubar"`.
- `Menubar.Menu` — individual menu section.
- `Menubar.Trigger` — menu heading button. `role="menuitem"`, `aria-haspopup="menu"`, `aria-expanded`.
- `Menubar.Content` — dropdown menu panel. `role="menu"`.
- `Menubar.Item` — menu action. `role="menuitem"`. Props: `onSelect`, `disabled`, `shortcut`.
- `Menubar.Separator` — visual divider.
- `Menubar.Label` — section heading.

> **TypeScript is the source of truth for props.** See source files in `Menubar/` for the full typed API.

---

## 4. Behavior

### States

- **Idle** — all menus closed.
- **Menu open** — one menu's dropdown visible.
- **Hover navigation** — when any menu is open, hovering other triggers opens their menus (keyboard-style navigation).

### Keyboard Interaction

- Click opens/closes menus.
- Hover-to-navigate when `anyOpen` is true (hover triggers auto-open adjacent menus).
- Click-outside closes all.

### Motion

None.

---

## 5. Accessibility

- **ARIA attributes:** `role="menubar"` on root. `role="menuitem"`, `aria-haspopup="menu"`, `aria-expanded` on triggers. `role="menu"` on content. `role="menuitem"`, `aria-disabled` on items.
- **Future enhancement:** Left/Right arrow keys to navigate between menu triggers, Up/Down within menu items.

---

## 6. Styling

- **Design tokens used:** `$background`, `$borderColor`, `$color2` (hover/active), `$color`, `$colorSubtitle` (shortcut). `$4` bar radius, `$2` trigger/item radius. 40px bar height.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** App headers, toolbar regions.
- **What this component can contain:** Menu sections containing Trigger, Content, Item, Separator, Label.
- **Anti-patterns:** Do not use for more than ~7 top-level menus. Do not nest Menubar within Menubar.

---

## 8. Breaking Change Criteria

- Removing `role="menubar"`.
- Removing hover navigation behavior.
- Removing sub-components.
- Changing ARIA attributes on triggers.

---

## 9. Test Requirements

- **Behavioral tests:** Verify click opens menu dropdown. Verify hover-navigation when a menu is open. Verify click-outside closes all. Verify Item `onSelect` fires. Verify disabled items are non-interactive.
- **Accessibility tests:** Verify `role="menubar"` on root. Verify `role="menuitem"` and `aria-haspopup` on triggers. Verify `role="menu"` on content.
