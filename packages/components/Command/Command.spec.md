# Component Spec — Command

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Command palette / searchable command list for actions and navigation.
- Use for app-wide command menus (Cmd+K pattern), action search, and quick navigation.
- Do NOT use for simple dropdowns (use Select or Combobox). Do NOT use for form data entry.

---

## 2. UX Intent

- **Hick's Law** — search filtering reduces visible commands, enabling fast discovery.
- **Doherty Threshold** — instant search feedback as the user types.
- **Miller's Law** — grouping commands with headings organizes options into scannable chunks.

---

## 3. Anatomy

Compound component with context-based state:
- `Command` (Root) — search state management. Props: `filter` (custom search function).
- `Command.Input` — search input. Props: `placeholder`.
- `Command.List` — scrollable container for results (max-height: 300px).
- `Command.Empty` — shown when no results match.
- `Command.Group` — groups items under a heading. Props: `heading`.
- `Command.Item` — selectable command. Props: `value`, `onSelect`, `disabled`, `keywords`.
- `Command.Separator` — visual separator between groups.
- `Command.Loading` — loading indicator.

> **TypeScript is the source of truth for props.** See source files in `Command/` for the full typed API.

---

## 4. Behavior

### States

- **Empty** — shows Empty component when no items match search.
- **Filtered** — items filtered by search text (matches value, keywords).
- **Loading** — shows Loading component during async operations.

### Keyboard Interaction

- Typing in the Input filters items in real-time.
- Custom `filter` function can override default search behavior.

### Motion

None.

---

## 5. Accessibility

- **ARIA attributes:** `role="listbox"` on root, `role="option"` on items, `aria-disabled` on disabled items, `aria-label` on search input.
- **Screen reader announcements:** Items announce their value/label and disabled state.

---

## 6. Styling

- **Design tokens used:** `$background` for container, `$borderColor` for borders, `$color` for text, hover state with `$color3` background.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Dialogs (for Cmd+K pattern), popovers, standalone panels.
- **What this component can contain:** Input, List, Empty, Group, Item, Separator, Loading sub-components.
- **Anti-patterns:** Do not use without a search Input. Do not place too many ungrouped items (use Group with headings).

---

## 8. Breaking Change Criteria

- Removing sub-components.
- Removing search filtering.
- Changing the `onSelect` callback signature.
- Removing ARIA listbox semantics.

---

## 9. Test Requirements

- **Behavioral tests:** Verify search filters items by value. Verify `keywords` prop enables matching. Verify `onSelect` fires when item is selected. Verify disabled items are non-interactive. Verify Empty renders when no matches. Verify Group headings render.
- **Accessibility tests:** Verify `role="listbox"` on root. Verify `role="option"` on items. Verify `aria-disabled` on disabled items. Verify search input has `aria-label`.
