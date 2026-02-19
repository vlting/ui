# Component Spec — MultiSelect

## 1. Purpose

Enables users to select zero or more options from a predefined list within a form context. Used when a field allows multiple simultaneous values, such as assigning tags, roles, categories, or filters.

Do NOT use this component when only a single value is permitted (use a Select or RadioGroup instead), or when the option set is extremely large and requires server-side search without a list (use a dedicated async combobox).

---

## 2. UX Intent

- Primary interaction goal: let users build a set of chosen values from a bounded option list with clear visual confirmation of what is selected.
- Expected user mental model: a dropdown or popover containing a list of checkable options, with selected values summarized in the trigger area as chips or a count badge.
- UX laws applied:
  - Hick's Law: limit visible options per scroll viewport; group or categorize long lists to reduce decision time.
  - Jakob's Law: trigger appearance should resemble familiar select/combobox patterns (bordered field, chevron icon).
  - Fitts's Law: individual option rows and chip remove targets must meet minimum touch target size.
  - Miller's Law: when more than approximately seven items are selected, show a count badge rather than all chips inline to prevent the trigger area from overflowing.

---

## 3. Visual Behavior

- Layout: a trigger control (showing selected chips or count badge) and a dropdown/popover panel containing the option list. The option list renders as a scrollable vertical stack when item count exceeds the visible area.
- Spacing: inner padding for the trigger and option rows uses space tokens. Gap between chips uses space tokens.
- Typography: option labels use the body text scale. Selected chip labels may use a slightly smaller scale token. Placeholder text uses muted color token.
- Token usage: trigger border, background, chip background, chip text, option hover background, checkmark color, and disabled colors must all use design tokens.
- Responsive behavior: on small screens the option list may render as a bottom sheet or modal instead of an inline popover, preserving usability on narrow viewports.

---

## 4. Interaction Behavior

- States:
  - Idle (closed): trigger shows current selection summary or placeholder.
  - Open: option panel is visible; options are individually checkable.
  - Hover (option): option row highlights using token-based hover color.
  - Focus (trigger or option): visible focus ring.
  - Active (option): brief press feedback on selection toggle.
  - Disabled (entire control): non-interactive, reduced opacity.
  - Disabled (individual option): option row non-interactive, visually muted.
  - Error: trigger border changes to error token color; error message rendered below.
- Controlled vs uncontrolled: supports both patterns. Controlled mode accepts a value array and onChange callback. Uncontrolled mode manages internal selection state.
- Keyboard behavior:
  - Enter or Space on trigger opens/closes the panel.
  - Arrow keys navigate options within the open panel.
  - Space or Enter toggles the focused option.
  - Escape closes the panel and returns focus to the trigger.
  - Backspace on the trigger (when input is empty) removes the last selected chip.
  - Tab from the trigger moves to the next focusable element; pressing Tab while the panel is open closes it.
- Screen reader behavior:
  - Trigger announces current selection count and control label.
  - Option list has `role="listbox"` with `aria-multiselectable="true"`. Each option has `role="option"` and `aria-selected`.
  - Chip remove buttons have descriptive labels (e.g., "Remove Marketing").
- Motion rules: panel open/close animates with a short fade or slide only when reduced motion is not preferred.

---

## 5. Accessibility Requirements

- ARIA: trigger maps to `role="combobox"` with `aria-expanded` and `aria-haspopup="listbox"`. Option panel is `role="listbox"` with `aria-multiselectable="true"`.
- Focus rules: opening the panel moves focus to the first option or the search input if present. Closing returns focus to the trigger.
- Contrast: option text, chip text, and placeholder text must meet WCAG AA contrast ratios using design tokens.
- Reduced motion: suppress all entrance/exit animations; show/hide panel immediately.

---

## 6. Theming Rules

- Required tokens: trigger background, trigger border, trigger text, placeholder text color, option hover background, selected option background, chip background, chip text, chip remove icon color, error border color, disabled opacity.
- Prohibited hardcoded values: no hardcoded colors, spacing values, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; chip and option highlight colors must remain legible against dark backgrounds.

---

## 7. Composition Rules

- What can wrap it: form field wrappers, filter bars, modal bodies, page-level filter panels. Must be a descendant of the design system Provider.
- What it may contain: a trigger area (chips + placeholder + chevron), an option panel (option rows with checkmarks), and an optional search/filter input within the panel.
- Anti-patterns:
  - Do not nest MultiSelect inside another MultiSelect.
  - Do not render async data-fetching logic inside the component — supply options as props.
  - Do not use this for navigation or command dispatch; it is strictly a form input.

---

## 8. Performance Constraints

- Memoization: option rows should be memoized to prevent re-renders when unrelated state changes occur.
- Virtualization: option lists exceeding approximately 50 items should be virtualized to maintain scroll performance.
- Render boundaries: option panel content should be lazily rendered (unmounted when closed) unless retain-mount is explicitly required for animation.

---

## 9. Test Requirements

- Rendering: renders correctly with no selection, partial selection, and full selection.
- Open/close: trigger opens and closes the panel on activation; Escape closes correctly.
- Selection toggle: selecting an option adds it; selecting again removes it.
- Controlled mode: parent value and onChange are honored without internal drift.
- Keyboard navigation: arrow keys, Space/Enter, Escape, Backspace all behave as specified.
- Disabled state: no interactions register when the control is disabled; individual option disabling is respected.
- Accessibility: listbox and option roles present; aria-selected reflects selection state; chip remove labels are descriptive.
- Theming: renders correctly in light and dark token contexts.
- Error state: error border and message appear when an error is surfaced.
