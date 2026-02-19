# Component Spec — WarehouseSelector

## 1. Purpose

Provides a selection interface for choosing one or more warehouses from a set of available locations within an ERP context. It enables operators to scope inventory views, purchase orders, and stock operations to a specific warehouse or set of warehouses.

Use when: an operator must select a warehouse to scope a data view or operation.

Do NOT use when: only a single warehouse exists and selection is irrelevant, or when the selection requires complex multi-step filtering (use a dedicated filter panel instead).

---

## 2. UX Intent

- Primary interaction goal: allow operators to quickly identify and select the relevant warehouse(s) with minimal friction.
- Expected user mental model: a dropdown or list selector analogous to a location or branch selector in enterprise software.
- UX laws applied:
  - Hick's Law: if the warehouse list is long, provide search/filter within the selector to reduce decision time.
  - Fitts's Law: the selector trigger is large and easy to activate on both touch and pointer.
  - Jakob's Law: follows familiar dropdown or segmented selector conventions.
  - Miller's Law: if there are more than ~7 warehouses, group them or enable search to keep the choice set manageable.

---

## 3. Visual Behavior

- Layout: inline form control width; expands to a dropdown or popover panel when activated.
- Trigger: displays the currently selected warehouse name (or a placeholder when none is selected) with a visual affordance (chevron or caret) indicating it is interactive.
- Dropdown/popover: scrollable list of warehouse options. Each option shows warehouse name and optional location metadata.
- Typography: trigger text uses a body scale token; option text uses a body or label scale token; group labels (if grouped) use a caption or label scale token.
- Spacing: internal padding and option height driven by space and size tokens.
- Token usage: trigger background, border, option background (default, hover, selected), text, and focus ring colors sourced from theme tokens.
- Responsive behavior: on narrow viewports, the selector may expand to a full-screen or sheet-based picker. Touch targets for options meet minimum size requirements.

---

## 4. Interaction Behavior

- States:
  - Idle (closed): trigger shows selected value or placeholder.
  - Open: dropdown/popover is visible; first option or selected option is focused.
  - Hover: hovered option receives a background color shift via tokens.
  - Focus: keyboard-focused option receives a visible focus ring.
  - Selected: selected option receives a selected background and/or check indicator.
  - Disabled: disabled trigger is non-interactive and visually de-emphasized.
  - Loading: if warehouse options are fetched asynchronously, a loading indicator appears within the dropdown.
  - Empty: if no warehouses are available, an empty state message appears within the dropdown.
- Controlled vs uncontrolled: selection state may be controlled (via value/onChange props) or uncontrolled (internal state).
- Keyboard behavior:
  - Space or Enter on the trigger opens the dropdown.
  - Arrow Up/Down navigate between options.
  - Enter or Space selects the focused option.
  - Escape closes the dropdown without changing selection.
  - Tab closes the dropdown and moves focus to the next element.
- Screen reader behavior:
  - Trigger announces its role (combobox or listbox pattern), current value, and expanded/collapsed state.
  - Options are announced with their names when focused.
  - Selection change is announced.
- Motion rules: dropdown open/close animation respects reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: trigger uses `role="combobox"` or `role="button"` with `aria-haspopup="listbox"` and `aria-expanded`. Options list uses `role="listbox"` with `role="option"` children. Selected option has `aria-selected="true"`.
- Focus: focus is moved to the dropdown/popover on open; focus returns to the trigger on close.
- Contrast: trigger text, option text, and placeholder text meet WCAG AA contrast ratios.
- Reduced motion: open/close animations are suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: trigger background, trigger border (default, focus, open), trigger text, placeholder text, dropdown background, option background (default, hover, selected), option text, selected indicator color, focus ring color, loading indicator color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve to accessible, distinguishable values in dark mode.

---

## 7. Composition Rules

- What can wrap it: form sections, filter bars, page headers, FieldWrapper.
- What it may contain: a trigger slot, a dropdown/popover slot containing a list of warehouse option items, an optional search input, an optional loading slot, an optional empty state slot.
- Anti-patterns:
  - Do not nest WarehouseSelector inside another WarehouseSelector.
  - Do not use WarehouseSelector for non-warehouse entity selection; use Combobox or a generic Select component.
  - Do not hardcode warehouse options; options must be passed as props.

---

## 8. Performance Constraints

- Memoization: option list items should be memoized to prevent re-renders on unrelated state changes.
- Virtualization: if the warehouse list is large (50+ items), the option list should support virtualized rendering.
- Render boundaries: the dropdown content should be lazily rendered (only mounted when open).

---

## 9. Test Requirements

- Render: selector renders trigger with placeholder when no value is selected; renders selected warehouse name when a value is selected.
- Open/close: trigger click/Enter opens dropdown; Escape closes it; focus returns to trigger on close.
- Selection: selecting an option updates the value in controlled and uncontrolled modes.
- Keyboard navigation: Arrow Up/Down navigate options; Enter selects focused option.
- Loading state: loading indicator renders when options are loading.
- Empty state: empty state message renders when no options are available.
- Accessibility: correct ARIA roles and states are present; focus management is correct; all text meets contrast requirements.
- Theming: token-based colors apply; no hardcoded values; dark mode tokens resolve correctly.
- Reduced motion: open/close animations are suppressed when reduced motion preference is active.
