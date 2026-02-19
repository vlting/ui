# Component Spec — Select

## 1. Purpose

Provides a compact dropdown control for selecting one option from a list, used when there are too many options (typically 4+) for RadioGroup to display inline, or when the options list is dynamic.

Use it for filtering, form fields with many predefined values (country, timezone, category), and any selection from a list of 4 or more options.

Do NOT use it for 2–3 mutually exclusive options (use RadioGroup for better visibility), for multiple selection (use a multi-select variant or Checkbox list), or for navigation.

---

## 2. UX Intent

- Primary interaction goal: selection from a list — the user opens the dropdown, scans the options, and picks one.
- Expected user mental model: a standard dropdown/combobox. The trigger shows the current value. Activating it reveals a scrollable list of options.
- UX laws applied:
  - Hick's Law: if the option list is long (20+), provide search/filter inside the dropdown to avoid decision paralysis.
  - Fitts's Law: the trigger must meet minimum touch target height (44pt). Option items in the dropdown must also have adequate minimum height.
  - Jakob's Law: the trigger shows the selected value; a chevron icon indicates it opens a dropdown. This is the established convention.
  - Serial Position Effect: place the most likely selections at the top of the list.

---

## 3. Visual Behavior

- Layout: a full-width or content-width trigger button. The dropdown panel opens below (or above if near viewport bottom) the trigger, matching or exceeding the trigger width.
- Spacing: trigger padding from space tokens. Dropdown option item padding from space tokens. Minimum option item height from size tokens.
- Typography: trigger text and option text use a body or label scale. Group header labels in the dropdown use a label/overline scale. Placeholder text uses a secondary/muted color.
- Token usage:
  - Trigger border: border token (default), accent token (focus).
  - Trigger background: input-surface or surface token.
  - Dropdown panel background: elevated surface/popover token with shadow.
  - Option hover background: hover-state token.
  - Option selected background: selected/accent-muted token.
  - Option selected text: accent or primary foreground token.
  - Disabled option: muted text, not interactive.
- Responsive behavior: trigger is full-width or content-width based on layout. On mobile, the dropdown may be replaced by a native picker or a bottom sheet.

---

## 4. Interaction Behavior

- States:
  - Closed/idle: trigger shows selected value or placeholder.
  - Focused (trigger): accent border/ring on trigger.
  - Open: dropdown panel visible; trigger remains visible.
  - Option hover: option background shifts to hover token.
  - Option focused: keyboard-focused option has focus indicator.
  - Option selected: checkmark or highlighted background.
  - Disabled option: muted appearance; not interactive.
  - Disabled trigger: muted trigger; not interactive.
  - Error: error border on trigger; error message below.
- Controlled vs uncontrolled: controlled via `value` / `onValueChange`. Uncontrolled via `defaultValue`.
- Keyboard behavior:
  - Tab focuses the trigger.
  - Enter or Space opens the dropdown.
  - Arrow keys navigate options when open.
  - Enter selects the focused option and closes the dropdown.
  - Escape closes the dropdown without changing selection.
  - Home/End jump to first/last option.
  - Typing a character jumps to the first option matching that character.
- Screen reader behavior: trigger has `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`. Dropdown has `role="listbox"` with an accessible label. Each option has `role="option"`, `aria-selected`, and an accessible name. Disabled options have `aria-disabled="true"`.
- Motion rules: dropdown open/close uses a short fade and slide from motion tokens. Suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: `role="combobox"` on trigger, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls` pointing to the listbox. `role="listbox"` on the dropdown panel with `aria-label`. Each option `role="option"` with `aria-selected`. Error message associated via `aria-describedby` on the trigger.
- Focus rules: Tab focuses the trigger. On open, focus moves to the selected option (or first option if none selected). Escape returns focus to the trigger without selection change. On selection, focus returns to the trigger.
- Contrast expectations: trigger text and border meet WCAG AA. Option text meets WCAG AA. Selected option indicator meets non-text contrast (3:1). Placeholder text meets 3:1 minimum.
- Reduced motion behavior: dropdown transition is instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: input surface (trigger), border (default, focus, error), accent (focus border, selected option), hover-state (option hover), selected-state (option selected background), elevated surface (dropdown panel), shadow, primary text, muted text (placeholder, disabled), space tokens, radius tokens, type scale.
- Prohibited hardcoded values: no raw hex colors, no pixel-based trigger height or dropdown width, no hardcoded font sizes.
- Dark mode expectations: trigger surface must be distinguishable from the page. Dropdown panel must appear elevated in dark mode. Selected option must remain visually distinct.

---

## 7. Composition Rules

- What can wrap it: forms, filter bars, settings sections, InviteUserModal (role selector), PaymentMethodForm (country selector).
- What it may contain: a trigger element (shows current value/placeholder) and a dropdown panel containing grouped or flat option items. Options may include an icon, label, and optional description.
- Anti-patterns:
  - Do not use Select for 2–3 options — use RadioGroup.
  - Do not use Select without a label (visible or programmatic).
  - Do not nest interactive controls inside option items.
  - Do not use Select as a navigation menu — use a Menu or NavigationMenu component.

---

## 8. Performance Constraints

- Memoization rules: memoize when used in large forms. Option list items should be derived from stable data to avoid full dropdown re-renders.
- Virtualization: for option lists exceeding 100 items, the dropdown should virtualize its list. This may be handled internally or via a parent-provided render function.
- Render boundaries: the dropdown panel should only mount when open. Unmount on close to avoid keeping a large option list in the DOM.

---

## 9. Test Requirements

- What must be tested:
  - Trigger displays the selected value or placeholder.
  - Clicking the trigger opens the dropdown.
  - All provided options render in the dropdown.
  - Selecting an option closes the dropdown and calls `onValueChange` with the correct value.
  - The selected option is visually marked (`aria-selected="true"`).
  - Disabled option is not selectable.
  - Disabled trigger cannot be opened.
  - Error state renders error message and error border.
- Interaction cases:
  - Arrow key navigation through options.
  - Enter selects the focused option.
  - Escape closes without selection change.
  - Tab focuses the trigger and then exits the component.
  - Character key jumps to matching option.
- Accessibility checks:
  - `role="combobox"`, `aria-haspopup`, `aria-expanded` are correct.
  - `role="listbox"` and `role="option"` with `aria-selected` are correct.
  - Error message associated via `aria-describedby`.
  - Focus moves to first/selected option on open.
  - Focus returns to trigger on close.
  - Contrast passes for all states in both themes.
  - Dropdown transition is suppressed under reduced motion.
