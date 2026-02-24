> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — RadioGroup

## 1. Purpose

- Presents a set of mutually exclusive options where exactly one can be selected.
- Use when the user must choose one option from a small, visible set (2–7 items).
- Do NOT use for binary choices (use Switch or Checkbox). Do NOT use for large option sets (use Select).

---

## 2. UX Intent

- **Primary interaction goal:** Select one option from a group.
- **Expected user mental model:** A group of radio buttons where clicking one deselects the previous selection.
- **UX laws applied:**
  - **Hick's Law** — all options visible at once for quick scanning.
  - **Fitts's Law** — label click area extends hit target beyond the small radio circle.
  - **Gestalt Proximity** — items grouped visually by orientation (vertical stack or horizontal row).

---

## 3. Anatomy

- **RadioGroup** (Root) — Container with `role="radiogroup"`, manages selection state.
- **RadioGroup.Item** — Individual radio option wrapping Tamagui RadioGroup.Item + Indicator, with a native `<label>`.

> **TypeScript is the source of truth for props.** See `RadioGroupProps` in `RadioGroup.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Unselected** — Circular border, empty interior.
- **Selected** — Circular border with filled indicator dot.
- **Hover** — Subtle background change on item row.
- **Focus** — Blue outline ring on the radio circle (focus-visible).
- **Disabled** — Reduced opacity, no interaction.

### Keyboard Interaction

- **Arrow Up/Down** (vertical) or **Arrow Left/Right** (horizontal) — Moves selection to adjacent radio item (roving tabindex via Tamagui).
- **Tab** — Moves focus into/out of the radio group (only the selected or first item is tabbable).
- **Space** — Selects the focused radio item.
- Follows the [WAI-ARIA Radio Group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/).

### Motion

- No animations defined.

---

## 5. Accessibility

- **Semantic element:** Tamagui RadioGroup provides `role="radiogroup"` on root and `role="radio"` on items.
- **ARIA attributes:** `aria-label` on root; `aria-checked` on each item; `aria-disabled` when disabled.
- **Focus management:** Roving tabindex — only one item tabbable at a time; arrow keys move focus and selection.
- **Screen reader announcements:** Group label, item label, and checked state announced.

---

## 6. Styling

- **Design tokens used:** Size variant controls radio circle and indicator dimensions (`sm`/`md`/`lg`); `$borderColor` for radio border; `$color` for selected indicator; `$outlineColor` for focus ring; gap via `$2`.
- **Responsive behavior:** Orientation prop switches between vertical (YStack) and horizontal (XStack) layout.
- **Dark mode:** Token-based; resolves automatically.

---

## 7. Composition

- **What can contain this component:** Forms, settings panels, filter controls.
- **What this component can contain:** RadioGroup.Item children only. Each Item accepts a text label as children.
- **Anti-patterns:** Do not mix RadioGroup.Item with non-RadioGroup children. Do not use without a visible group label.

---

## 8. Breaking Change Criteria

- Removing RadioGroup.Item sub-component.
- Removing `value`, `onValueChange`, `orientation`, or `size` props.
- Changing keyboard navigation from roving tabindex to a different pattern.
- Removing the ARIA radiogroup/radio roles.
- Changing the indicator from a filled circle to a different visual.

---

## 9. Test Requirements

- **Behavioral tests:** Selecting an item deselects others; `onValueChange` fires with correct value; controlled and uncontrolled modes work; disabled items cannot be selected.
- **Accessibility tests:** `role="radiogroup"` on root; `role="radio"` on items; `aria-checked` toggles correctly; arrow keys move selection; Tab enters/leaves group.
- **Visual regression:** Unselected, selected, disabled, horizontal orientation, each size.
