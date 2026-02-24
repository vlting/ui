# Component Spec — Menu

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Full-featured menu system with items, checkboxes, radio groups, and nested submenus.
- Use for complex action menus with grouping, selection state, and hierarchical organization.
- Do NOT use for simple dropdown lists (use DropdownMenu). Do NOT use for form selection (use Select).

---

## 2. UX Intent

- **Hick's Law** — groups and separators organize items into scannable chunks.
- **WAI-ARIA pattern:** [Menu](https://www.w3.org/WAI/ARIA/apg/patterns/menu/)

---

## 3. Anatomy

Compound component wrapping `@tamagui/menu` with extensive sub-components:
- `Menu` (Root) — state management. Props: `open`, `defaultOpen`, `onOpenChange`.
- `Menu.Trigger` — opens the menu.
- `Menu.Portal` — portal container.
- `Menu.Content` — menu panel with animation (scale + translate).
- `Menu.Group` / `Menu.Label` — grouping with headings.
- `Menu.Item` — selectable action with `ItemTitle`, `ItemSubtitle`, `ItemIcon`.
- `Menu.CheckboxItem` — toggleable item with `ItemIndicator`.
- `Menu.RadioGroup` / `Menu.RadioItem` — mutually exclusive selection.
- `Menu.Separator` — visual divider.
- `Menu.Arrow` — popover arrow pointer.
- `Menu.Sub` / `Menu.SubTrigger` / `Menu.SubContent` — nested submenus.

> **TypeScript is the source of truth for props.** See source files in `Menu/` for the full typed API.

---

## 4. Behavior

### States

- **Closed** — menu hidden.
- **Open** — menu visible with enter animation (scale 0.95→1, translate).

### Keyboard Interaction

- Arrow keys navigate items (delegated to Tamagui).
- Enter/Space activates items.
- Escape closes menu.
- Submenu opens on hover/arrow key.

### Motion

- Enter/exit animations via Tamagui `animation: 'medium'`.
- Must respect `prefers-reduced-motion`.

---

## 5. Accessibility

- **ARIA attributes:** Inherited from `@tamagui/menu` — `role="menu"`, `role="menuitem"`, `role="menuitemcheckbox"`, `role="menuitemradio"`.
- **Focus management:** Arrow key navigation within menu. Escape returns focus to trigger.

---

## 6. Styling

- **Design tokens used:** `$background`, `$borderColor`, `$color4` (hover/focus), `$colorSubtitle`. `$4` radius on content, `$2` on items. `elevation: '$4'`.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Toolbars, navigation bars, page actions.
- **What this component can contain:** All sub-components including nested Sub menus.
- **Anti-patterns:** Do not nest more than 2 levels of submenus. Do not mix CheckboxItem and RadioItem in the same group.

---

## 8. Breaking Change Criteria

- Removing sub-components.
- Removing keyboard navigation.
- Removing animation.
- Removing checkbox/radio selection support.

---

## 9. Test Requirements

- **Behavioral tests:** Verify menu opens and closes. Verify Item `onSelect` fires. Verify CheckboxItem toggles. Verify RadioGroup selection is mutually exclusive. Verify Separator renders. Verify submenu opens.
- **Accessibility tests:** Verify ARIA menu roles. Verify keyboard navigation. Verify Escape closes. Verify focus returns to trigger.
