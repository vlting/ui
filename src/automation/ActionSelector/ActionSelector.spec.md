# Component Spec — ActionSelector

## 1. Purpose

ActionSelector presents a UI for choosing one or more actions to be executed as part of an automation rule or workflow. It surfaces a searchable or browsable list of available action types, each with a label, icon, and optional description, allowing the user to select an action to configure.

Use it within automation rule builders or workflow editors where the user needs to define what happens when a trigger or condition is met.

Do NOT use it for trigger selection (use TriggerSelector), general navigation menus, or action confirmation dialogs.

---

## 2. UX Intent

- Primary interaction goal: allow the user to quickly find and select the correct action type from a potentially large set of options.
- Expected user mental model: a searchable dropdown or panel listing available actions — familiar from automation tools like Zapier, Make, or GitHub Actions (Jakob's Law).
- UX laws applied:
  - Hick's Law: group actions into categories; provide search to reduce scanning load.
  - Fitts's Law: action items are large enough to tap; the search input is prominently placed.
  - Miller's Law: categories limit the visible set of choices to digestible groups.
  - Doherty Threshold: search results update within 400ms of each keystroke.

---

## 3. Visual Behavior

- Layout: a trigger button showing the selected action (or placeholder text), opening a panel or popover.
- Panel contains: a search input at the top, a categorized list of action items below.
- Each action item: icon, label, optional short description.
- Selected action is highlighted in the list.
- Empty search results show a "No actions found" state.
- Categories have group headings separating them visually.
- Panel has a defined max-height with internal scroll.
- Spacing uses space tokens; typography follows body and caption scales.

---

## 4. Interaction Behavior

- States: idle (closed), open (browsing/searching), selected, disabled.
- Controlled via `value` (selected action ID) and `onChange` callback.
- Search is uncontrolled internally but the filtered result set is derived from the `options` prop.
- Keyboard behavior:
  - `Enter` or `Space` on the trigger opens the panel.
  - Search input receives focus automatically on open.
  - `ArrowDown` / `ArrowUp` navigate through visible action items.
  - `Enter` selects the focused action and closes the panel.
  - `Escape` closes the panel and returns focus to the trigger.
- Screen reader behavior: trigger announces selected action or "Select an action". Panel has `role="listbox"`. Action items have `role="option"` with `aria-selected`. Category headings use `role="group"` with a label.
- Motion: panel open/close uses a short fade or slide; reduced motion suppresses it.

---

## 5. Accessibility Requirements

- Trigger has `role="combobox"` (or `role="button"` with `aria-haspopup="listbox"`) and `aria-expanded`.
- Panel has `role="listbox"` with `aria-label` or `aria-labelledby`.
- Each action option has `role="option"` and `aria-selected`.
- Category groups have `role="group"` with `aria-label`.
- Search input has `aria-label` and `aria-controls` pointing to the listbox.
- Empty state is announced via a live region or visible text within the listbox.
- All elements meet WCAG AA contrast.
- Reduced motion: no animated panel transitions when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- Required tokens: trigger background, trigger border, panel background, item hover/selected background, item label color, item description color, search input background, search input border, category heading color, empty state text color, icon color, focus ring color.
- Prohibited hardcoded values: no raw colors, no pixel spacing or font sizes.
- Dark mode: selected and hover states remain visually distinct in dark theme.

---

## 7. Composition Rules

- May be wrapped by: workflow editor panels, automation rule builder rows, modal configuration sheets.
- May contain: trigger button, search input, category group headings, action option items (icon + label + description).
- Anti-patterns:
  - Do not fetch available actions from an API inside this component.
  - Do not use this component as a general-purpose command palette or navigation menu.
  - Do not allow multi-selection unless the design explicitly supports it; default to single selection.

---

## 8. Performance Constraints

- Action list filtering must be synchronous and operate on the `options` prop; no async search.
- If the option list exceeds 100 items, virtualize the list inside the panel.
- Memoize option items to prevent re-renders during search typing.

---

## 9. Test Requirements

- Renders trigger with selected action label or placeholder.
- Opens panel on trigger activation (click, Enter, Space).
- Search input filters visible action items in real time.
- Selecting an action fires `onChange` with the action ID and closes the panel.
- Keyboard navigation moves through action items; Enter selects.
- Escape closes the panel and returns focus to the trigger.
- Disabled state prevents opening.
- Empty search result state renders the empty message.
- `aria-expanded` toggles correctly; `aria-selected` is set on the current selection.
- Accessibility: no axe violations; all roles and labels are correct.
- Reduced motion: no panel animation when `prefers-reduced-motion` is active.
