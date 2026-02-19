# Component Spec — TriggerSelector

## 1. Purpose

TriggerSelector presents a UI for selecting the event or condition that initiates an automation rule. It surfaces a categorized, searchable list of available trigger types (e.g., "Record created", "Webhook received", "Schedule") and allows the user to choose one.

Use it at the top of an automation rule editor to define the initiating event before conditions and actions are configured.

Do NOT use it for selecting actions (use ActionSelector), configuring trigger parameters (that belongs in a trigger-specific configuration panel following selection), or general navigation.

---

## 2. UX Intent

- Primary interaction goal: guide the user to select the appropriate trigger type quickly and confidently from a categorized list.
- Expected user mental model: a searchable dropdown or panel listing event types by category — mirrors Zapier's "Choose a trigger event" or GitHub Actions' "on:" event picker (Jakob's Law).
- UX laws applied:
  - Hick's Law: group trigger types into logical categories (e.g., "Records", "Schedule", "Webhooks") to reduce scanning effort.
  - Jakob's Law: follow established automation-tool trigger selection patterns.
  - Miller's Law: categories limit visible choices to digestible sets.
  - Fitts's Law: trigger option items are large enough to tap; search input is prominent.
  - Doherty Threshold: search results update within 400ms of each keystroke.

---

## 3. Visual Behavior

- Layout: a trigger button showing the selected trigger name (or placeholder), opening a panel or popover.
- Panel contains: a search input at the top, a categorized scrollable list of trigger type options.
- Each option: an icon, a label, and an optional short description.
- Selected trigger is highlighted in the list.
- Category headings visually separate groups of triggers.
- Empty search state shows a "No triggers found" message.
- Panel has a defined max-height with internal scrolling.
- Spacing uses space tokens; typography follows body and caption scales.

---

## 4. Interaction Behavior

- States: idle (closed), open (browsing/searching), selected, disabled.
- Controlled via `value` (selected trigger ID) and `onChange` callback.
- Search filters visible options synchronously from the `options` prop.
- Keyboard behavior:
  - `Enter` or `Space` on the trigger button opens the panel.
  - Search input receives focus on open.
  - `ArrowDown` / `ArrowUp` navigate visible trigger options.
  - `Enter` selects the focused option and closes the panel.
  - `Escape` closes the panel and returns focus to the trigger button.
- Screen reader behavior: trigger button announces selected trigger or "Select a trigger". Panel has `role="listbox"`. Options have `role="option"` and `aria-selected`. Category headings use `role="group"` with a label.
- Motion: panel open/close uses a short fade or slide; reduced motion suppresses it.

---

## 5. Accessibility Requirements

- Trigger button has `aria-haspopup="listbox"` and `aria-expanded` reflecting open state.
- Panel has `role="listbox"` with `aria-label` or `aria-labelledby`.
- Each trigger option has `role="option"` with `aria-selected`.
- Category groups have `role="group"` with `aria-label`.
- Search input has `aria-label` ("Search triggers") and `aria-controls` pointing to the listbox.
- Empty state message is within the listbox and readable by screen readers.
- All elements meet WCAG AA contrast.
- Reduced motion: no panel animation when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- Required tokens: trigger button background, trigger button border, panel background, option hover/selected background, option label color, option description color, category heading color, search input background, search input border, empty state text color, icon color, focus ring color.
- Prohibited hardcoded values: no raw colors, no pixel spacing or font sizes.
- Dark mode: selected and hover states remain visually distinct in dark theme.

---

## 7. Composition Rules

- May be wrapped by: automation rule editor panels, workflow step configuration modals, trigger setup wizards.
- May contain: trigger button, search input, category group headings, trigger option items (icon + label + description).
- Anti-patterns:
  - Do not fetch available triggers from an API inside this component; receive them as the `options` prop.
  - Do not combine trigger selection and trigger parameter configuration in the same component.
  - Do not use this as a general-purpose command palette or navigation menu.

---

## 8. Performance Constraints

- Option filtering is synchronous; no async search.
- If the option list exceeds 100 items, virtualize the list inside the panel.
- Memoize option items to prevent re-renders during search typing.

---

## 9. Test Requirements

- Renders trigger button with selected trigger label or placeholder.
- Opens panel on trigger button activation (click, Enter, Space).
- Search input filters visible trigger options in real time.
- Selecting an option fires `onChange` with the trigger ID and closes the panel.
- Arrow key navigation moves through visible options; Enter selects.
- Escape closes the panel and returns focus to the trigger button.
- Disabled state prevents opening.
- Empty search state renders the "No triggers found" message.
- `aria-expanded` toggles correctly; `aria-selected` is set on the current selection.
- Accessibility: no axe violations; all roles and labels are correct.
- Reduced motion: no panel animation when `prefers-reduced-motion` is active.
