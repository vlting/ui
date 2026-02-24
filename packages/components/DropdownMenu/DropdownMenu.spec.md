# Component Spec — DropdownMenu

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Button-triggered dropdown menu for actions and options.
- Use for action menus, settings dropdowns, and contextual option lists.
- Do NOT use for navigation (use NavigationMenu). Do NOT use for form selection (use Select or Combobox).

---

## 2. UX Intent

- **Hick's Law** — groups related actions behind a single trigger, reducing visible UI complexity.
- **WAI-ARIA pattern:** [Menu Button](https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/)

---

## 3. Anatomy

Compound component with custom implementation:
- `DropdownMenu` (Root) — state management with optional backdrop. Props: `open`, `onOpenChange`, `modal`.
- `DropdownMenu.Trigger` — button that toggles menu.
- `DropdownMenu.Content` — positioned menu panel.
- `DropdownMenu.Item` — selectable action. Props: `onSelect`, `disabled`, `shortcut`.
- `DropdownMenu.CheckboxItem` — toggleable item. Props: `checked`, `onCheckedChange`, `disabled`.
- `DropdownMenu.Separator` — visual divider.
- `DropdownMenu.Label` — non-interactive section heading.

> **TypeScript is the source of truth for props.** See source files in `DropdownMenu/` for the full typed API.

---

## 4. Behavior

### States

- **Closed** — menu hidden, trigger shows default state.
- **Open** — menu visible below trigger, backdrop blocks interaction when `modal`.

### Keyboard Interaction

- Click outside (via backdrop) closes menu.
- **Trigger**: Enter / Space / ArrowDown opens menu.
- **Content**: ArrowDown / ArrowUp moves focus between items (loops). Home / End jumps to first / last item.
- **Items**: Enter / Space activates the focused item.
- **Escape**: Closes menu and returns focus to trigger.
- **Tab**: Closes menu and returns focus to trigger.

### Motion

None.

---

## 5. Accessibility

- **ARIA attributes:** `aria-haspopup="menu"`, `aria-expanded` on trigger. `role="menu"` on content. `role="menuitem"` on items. `role="menuitemcheckbox"`, `aria-checked` on checkbox items. `aria-disabled` on disabled items.
- **Focus management:** Focus moves to first item when menu opens. Escape / Tab closes menu and returns focus to trigger. Arrow keys navigate items. Click-outside closes. Modal mode renders backdrop.

---

## 6. Styling

- **Design tokens used:** `$background`, `$borderColor`, `$color2` (hover), `$color`, `$colorSubtitle` (shortcut text). `$4` border radius on content, `$2` on items.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Toolbars, card headers, table row actions, navigation bars.
- **What this component can contain:** Item, CheckboxItem, Separator, Label sub-components.
- **Anti-patterns:** Do not use for navigation links. Do not nest dropdown menus.

---

## 8. Breaking Change Criteria

- Removing sub-components.
- Removing `modal` prop.
- Removing ARIA menu semantics.
- Changing trigger ARIA attributes.

---

## 9. Test Requirements

- **Behavioral tests:** Verify menu opens on trigger click. Verify click-outside closes. Verify Item `onSelect` fires. Verify CheckboxItem toggles. Verify disabled items are non-interactive. Verify `shortcut` text renders.
- **Accessibility tests:** Verify `aria-haspopup="menu"` and `aria-expanded` on trigger. Verify `role="menu"` on content. Verify `role="menuitem"` and `role="menuitemcheckbox"`.
