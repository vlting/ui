# Component Spec — Combobox

## 1. Purpose

Combines a text input with a filterable dropdown list, allowing users to either type to narrow down options or select from a presented list. It is suited for large option sets where selection-only dropdowns become unwieldy.

Use when: the option set is large enough that filtering by typing is helpful, or when the user may need to enter a value that is not in the predefined list (free-text variant).

Do NOT use when: the option set is small and fixed (use a standard Select or radio group), or when multi-select with tagging is needed (use a multi-select or tag input component).

---

## 2. UX Intent

- Primary interaction goal: allow users to quickly find and select an option from a potentially large set with minimal keystrokes.
- Expected user mental model: a searchable dropdown — familiar from address autocomplete, country selectors, and search-suggest interfaces.
- UX laws applied:
  - Hick's Law: filtering reduces the visible option set to a manageable number, lowering decision time.
  - Fitts's Law: the trigger input and each option item meet minimum touch target sizes.
  - Jakob's Law: follows established combobox/autocomplete patterns from browser autofill and search inputs.
  - Doherty Threshold: filtered results appear within ~100ms of typing to feel instantaneous.

---

## 3. Visual Behavior

- Layout: an input field with an optional trailing indicator (chevron/caret or clear button); opens a dropdown/popover below (or above, if space is constrained).
- Input: displays typed text or the selected option's label.
- Dropdown: scrollable, filterable list of matching options. Each option shows a label and optional secondary text or icon.
- Typography: input text uses a body scale token; option labels use a body scale token; secondary text uses a caption scale token; no-results message uses a caption scale token.
- Spacing: input padding and option height driven by space and size tokens.
- Token usage: input background, border (default, focus, error), option background (default, hover, selected), text, and focus ring colors sourced from theme tokens.
- Responsive behavior: on narrow viewports, the dropdown may expand to full-screen or sheet-based picker. Touch targets meet minimum size.

---

## 4. Interaction Behavior

- States:
  - Idle (closed): input shows selected value or placeholder.
  - Open: dropdown is visible; options are filtered by the current input value.
  - Typing: input value changes; option list filters in real time.
  - Option highlighted: keyboard or pointer-highlighted option receives a distinct background token.
  - Option selected: selected option is highlighted in the list and its label appears in the input.
  - No results: when filtering yields no matches, a "No results" message occupies the dropdown.
  - Disabled: input is non-interactive and visually de-emphasized.
  - Error: input displays an error border and error token styling.
  - Loading: if options are fetched asynchronously, a loading indicator appears in the dropdown.
- Controlled vs uncontrolled: value and open state may be controlled (via props) or uncontrolled (internal state).
- Keyboard behavior:
  - Arrow Down opens the dropdown and moves highlight to the first option (or next option).
  - Arrow Up moves highlight to the previous option.
  - Enter selects the highlighted option.
  - Escape closes the dropdown without selecting.
  - Backspace clears the current selection (if a value is selected and the input is refocused).
  - Tab closes the dropdown and moves focus forward; selected value is committed.
- Screen reader behavior:
  - Input has `role="combobox"` with `aria-expanded`, `aria-autocomplete`, and `aria-controls` pointing to the listbox.
  - Listbox options have `role="option"` with `aria-selected`.
  - Active option is referenced via `aria-activedescendant`.
  - Announcements: option count, current selection, and "no results" are communicated via live regions or ARIA.
- Motion rules: dropdown open/close animation respects reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: `role="combobox"` on the input; `aria-expanded`; `aria-controls` pointing to the listbox; `aria-autocomplete="list"` or `"both"`; `aria-activedescendant` tracking the highlighted option. Listbox uses `role="listbox"`; options use `role="option"` with `aria-selected`.
- Focus: focus remains on the input while the dropdown is open. Dropdown closes and focus returns to input on Escape.
- Contrast: input text, placeholder, option text, and secondary text all meet WCAG AA contrast ratios.
- Reduced motion: dropdown animation is suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: input background, input border (default, focus, error), input text, placeholder text, dropdown background, option background (default, hover, selected), option text, secondary text, no-results text, loading indicator color, focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve to accessible, distinguishable values in dark mode.

---

## 7. Composition Rules

- What can wrap it: FieldWrapper, form sections, filter bars, page headers.
- What it may contain: an input slot, a trailing icon slot (clear, chevron), a dropdown/popover slot with a listbox of option items, a no-results slot, a loading slot.
- Anti-patterns:
  - Do not use Combobox for small, static option sets (use Select or RadioGroup).
  - Do not nest Combobox inside another Combobox.
  - Do not use Combobox without associating it with a Label.

---

## 8. Performance Constraints

- Memoization: option list items should be memoized; filtering logic should not cause full re-renders of the option list on each keystroke.
- Virtualization: for large option sets (100+ items), the dropdown list should support virtualized rendering.
- Render boundaries: dropdown content should be lazily rendered (only mounted when open).

---

## 9. Test Requirements

- Render: input renders with placeholder when no value is selected; renders selected value when an option is chosen.
- Filtering: typing in the input filters the option list in real time.
- Keyboard navigation: Arrow Up/Down navigate options; Enter selects; Escape closes without selecting.
- Selection: selecting an option updates the input value and closes the dropdown.
- No results: "No results" message renders when filtering yields no matches.
- Loading: loading indicator renders while options are loading.
- Accessibility: correct ARIA roles, states, and `aria-activedescendant` are present; live region announces option count and selection.
- Theming: token-based colors apply; no hardcoded values; dark mode tokens resolve correctly.
- Reduced motion: dropdown animation is suppressed when reduced motion preference is active.
