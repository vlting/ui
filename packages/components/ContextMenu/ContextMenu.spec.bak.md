# Component Spec — ContextMenu

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Right-click context menu for contextual actions on an element.
- Use for file managers, canvas editors, table rows, and any element with secondary actions.
- Do NOT use for primary navigation (use DropdownMenu). Do NOT use on mobile without a long-press alternative.

---

## 2. UX Intent

- **Jakob's Law** — right-click context menus follow established desktop OS conventions.
- **Tesler's Law** — surfaces relevant actions without cluttering the primary UI.
- **WAI-ARIA pattern:** [Menu](https://www.w3.org/WAI/ARIA/apg/patterns/menu/)

---

## 3. Anatomy

Compound component with custom positioning:
- `ContextMenu` (Root) — manages open state. Props: `onOpenChange`.
- `ContextMenu.Trigger` — element that responds to right-click.
- `ContextMenu.Content` — menu container positioned at mouse coordinates (fixed positioning).
- `ContextMenu.Item` — selectable action. Props: `onSelect`, `disabled`, `shortcut` (display-only).
- `ContextMenu.CheckboxItem` — toggleable menu item. Props: `checked`, `onCheckedChange`, `disabled`.
- `ContextMenu.Separator` — visual divider between groups.
- `ContextMenu.Label` — non-interactive group heading.

> **TypeScript is the source of truth for props.** See source files in `ContextMenu/` for the full typed API.

---

## 4. Behavior

### States

- **Closed** — menu hidden.
- **Open** — menu visible at right-click position.

### Keyboard Interaction

Currently click-based only. Future enhancement: Arrow key navigation, Enter/Space selection per WAI-ARIA menu pattern.

### Motion

None — menu appears/disappears without animation.

---

## 5. Accessibility

- **ARIA attributes:** `role="menu"` on container, `role="menuitem"` on items, `role="menuitemcheckbox"` on checkbox items, `aria-disabled`, `aria-checked`.
- **Focus management:** Click-outside and Escape close the menu (Escape via future enhancement).
- **Note:** Keyboard navigation (Arrow keys, Enter/Space) is not yet implemented — required for WAI-ARIA menu compliance.

---

## 6. Styling

- **Design tokens used:** `$background` for menu, `$borderColor` for borders, `$color` for text, shadow for depth. Fixed z-index (50).
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Any element that needs contextual actions.
- **What this component can contain:** Item, CheckboxItem, Separator, Label sub-components within Content.
- **Anti-patterns:** Do not use as the only way to access important actions (provide toolbar or inline alternatives). Do not open context menu on left-click.

---

## 8. Breaking Change Criteria

- Removing sub-components.
- Removing right-click trigger behavior.
- Changing menu positioning from mouse coordinates.
- Removing ARIA menu semantics.

---

## 9. Test Requirements

- **Behavioral tests:** Verify right-click opens menu at mouse position. Verify click-outside closes. Verify Item `onSelect` fires. Verify CheckboxItem `onCheckedChange` fires. Verify disabled items are non-interactive. Verify Separator and Label render.
- **Accessibility tests:** Verify `role="menu"` on container. Verify `role="menuitem"` and `role="menuitemcheckbox"`. Verify `aria-disabled` and `aria-checked`.
