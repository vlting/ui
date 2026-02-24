# Component Spec — Combobox

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Searchable dropdown for selecting from a list of options.
- Use when the option list is long enough to benefit from search filtering.
- Do NOT use for short lists (use Select). Do NOT use for free-form text input (use Input).

---

## 2. UX Intent

- **Hick's Law** — search filtering reduces visible options, making selection faster.
- **Doherty Threshold** — instant filtering as the user types provides responsive feedback.
- **WAI-ARIA pattern:** [Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

---

## 3. Anatomy

Single component with internal structure:
- Trigger button displaying selected value or placeholder.
- Dropdown panel with search input and option list.
- Each option shows label and a checkmark when selected.

Props: `options` (array of `{value, label}`), `value`, `onValueChange`, `placeholder`, `searchPlaceholder`, `emptyMessage`, `disabled`.

Search input uses `styledHtml('input')`.

> **TypeScript is the source of truth for props.** See `Combobox.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Closed** — trigger shows selected value or placeholder.
- **Open** — dropdown visible with search input focused.
- **Filtering** — options filtered by search text (case-insensitive).
- **Highlighted** — keyboard-navigated option has visual highlight.
- **Disabled** — trigger non-interactive.

### Keyboard Interaction

- **ArrowDown/Up** — navigate through filtered options.
- **Enter** — select the highlighted option.
- **Escape** — close the dropdown.
- **Typing** — filters options in the search input.

### Motion

None — dropdown appears/disappears without animation.

---

## 5. Accessibility

- **ARIA attributes:** `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"` on trigger. `role="listbox"` on option container. `role="option"`, `aria-selected` on each option.
- **Focus management:** Focus moves to search input when dropdown opens. Arrow keys move highlight within options.
- **Screen reader announcements:** Options announce their label and selected state.

---

## 6. Styling

- **Design tokens used:** `$background` for dropdown, `$borderColor` for borders, `$color` for text, `$color4` for highlight background.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Forms, filter panels, settings, toolbars.
- **What this component can contain:** Self-contained — options are passed as data props.
- **Anti-patterns:** Do not use without `onValueChange` (uncontrolled mode is not supported). Do not pass more than ~100 options without virtualization.

---

## 8. Breaking Change Criteria

- Changing the `options` prop shape.
- Removing keyboard navigation (Arrow keys, Enter, Escape).
- Removing search filtering.
- Removing ARIA combobox semantics.

---

## 9. Test Requirements

- **Behavioral tests:** Verify dropdown opens on trigger click. Verify search filters options (case-insensitive). Verify Enter selects highlighted option. Verify Escape closes dropdown. Verify click-outside closes. Verify disabled state.
- **Accessibility tests:** Verify `role="combobox"` with `aria-expanded`. Verify `role="listbox"` on options. Verify `aria-selected` on selected option. Verify keyboard navigation (Arrow keys).
