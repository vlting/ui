> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Select

## 1. Purpose

- Provides a styled dropdown for selecting a single value from a list of options.
- Use when the option list is too long for radio buttons (>7 items) or when vertical space is limited.
- Do NOT use when the user needs to type to filter — use Combobox. For native behavior, use NativeSelect.

---

## 2. UX Intent

- **Primary interaction goal:** Choose one option from a dropdown list.
- **Expected user mental model:** Click to open a dropdown, see options, click one to select.
- **UX laws applied:**
  - **Hick's Law** — options presented in a scrollable list; groups and separators aid scanning.
  - **Fitts's Law** — full-width trigger; adequate padding on items.
  - **Jakob's Law** — behaves like a native `<select>` with enhanced styling.

---

## 3. Anatomy

- **Select** (Root) — State container managing open/close and selection.
- **Select.Item** — Individual option with a value.
- **Select.Value** — Displays the selected value text in the trigger.
- **Select.Group** — Groups related items with an optional label.
- **Select.Label** — Label for a group of items.
- **Select.Separator** — Visual divider between items/groups.

Trigger is rendered internally with a chevron icon.

> **TypeScript is the source of truth for props.** See `SelectProps` in `Select.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Closed** — Trigger displays selected value or placeholder.
- **Open** — Dropdown list visible with items; keyboard-navigable.
- **Hover** — Items highlight on hover.
- **Focus** — Focus ring on trigger; highlighted item in dropdown.
- **Disabled** — Reduced opacity, no interaction.

### Keyboard Interaction

- **Enter/Space** on trigger — Opens dropdown.
- **Arrow Up/Down** — Navigates items in the dropdown.
- **Enter** — Selects highlighted item.
- **Escape** — Closes dropdown without changing selection.
- Items receive `_index` for proper keyboard focus ordering (injected by the component).
- Follows the [WAI-ARIA Listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/).

### Motion

- Tamagui Select open/close animations.
- Should respect `prefers-reduced-motion`.

---

## 5. Accessibility

- **Semantic element:** Tamagui Select provides listbox semantics.
- **ARIA attributes:** Trigger gets `aria-expanded`, `aria-haspopup="listbox"`; items get `role="option"` (Tamagui-managed).
- **Focus management:** Focus moves to dropdown on open; returns to trigger on close.
- **Screen reader announcements:** Selected value announced; options announced when navigating.

---

## 6. Styling

- **Design tokens used:** Size variant maps padding and border radius (`sm`/`md`/`lg`). `$background` trigger background; `$borderColor` border; `$4` border radius default. Focus ring uses `$outlineColor`.
- **Responsive behavior:** Full-width by default; adapts to container width.
- **Dark mode:** Token-based; resolves automatically.

---

## 7. Composition

- **What can contain this component:** Forms, filters, settings panels.
- **What this component can contain:** Select.Item, Select.Group, Select.Label, Select.Separator as children.
- **Anti-patterns:** Do not put interactive elements inside Select.Item. Do not use for multi-select (no built-in support).

---

## 8. Breaking Change Criteria

- Removing any sub-component (Item, Value, Group, Label, Separator).
- Removing `value`, `onValueChange`, `size`, or `disabled` props.
- Changing keyboard navigation behavior.
- Removing the `_index` injection for keyboard focus ordering.

---

## 9. Test Requirements

- **Behavioral tests:** Opens on trigger click; selects item and closes; `onValueChange` fires; controlled mode works; disabled prevents opening; placeholder shows when no value.
- **Accessibility tests:** Trigger has `aria-expanded`; items navigable with arrow keys; Escape closes; focus returns to trigger on close.
- **Visual regression:** Closed with placeholder, closed with value, open dropdown, disabled, each size variant.
