# Component Spec — ConditionBuilder

## 1. Purpose

ConditionBuilder provides a UI for constructing logical condition expressions that determine when an automation rule should execute. Users compose one or more condition rows (field, operator, value) and optionally combine them with AND/OR logic operators.

Use it within automation rule editors or workflow builders where conditional filtering logic needs to be defined by the user.

Do NOT use it for action configuration (use ActionSelector), trigger definition (use TriggerSelector), or simple boolean toggles. Do not use it outside of automation/rule contexts.

---

## 2. UX Intent

- Primary interaction goal: allow non-technical users to construct meaningful logical conditions through a structured, guided interface without writing code.
- Expected user mental model: a visual query builder — rows of "When [field] [operator] [value]" statements joined by AND/OR — familiar from tools like Airtable filters, HubSpot workflows, or Notion filters (Jakob's Law).
- UX laws applied:
  - Hick's Law: each row presents a small number of choices at each step (field, then operator, then value type); choices are revealed progressively.
  - Gestalt (Proximity): condition rows within the same group are visually close; the AND/OR connector is visually distinct between rows.
  - Tesler's Law: logical complexity (operator compatibility, value type inference) is handled by the system; the user sees only valid options for their current selection.
  - Miller's Law: limit visible conditions to a manageable set; use scrolling for long lists rather than showing all at once.
  - Fitts's Law: add/remove row buttons are large enough and clearly positioned.

---

## 3. Visual Behavior

- Layout: a vertical stack of condition rows, each containing:
  - A field selector (dropdown).
  - An operator selector (dropdown, updated based on selected field type).
  - A value input (text, number, date, select, or multi-select — determined by field and operator type).
  - A remove button (trash/X icon).
- An AND/OR connector label appears between rows (switchable if the group logic is configurable).
- An "Add condition" button appears below the last row.
- Optional grouping: condition rows may be nested within logical groups with their own AND/OR connector.
- Spacing between rows and elements uses space tokens.
- The value input area width is proportional to the expected value type (wider for free text, narrower for numeric).
- Empty state (no conditions): a single prompt row with placeholder selectors.

---

## 4. Interaction Behavior

- States per row: idle, focused (any element in row), error (invalid or incomplete), disabled.
- Controlled via a `conditions` prop (array of condition objects) and an `onChange` callback.
- Field selection resets operator and value when the field type changes.
- Operator selection may reset value when the operator changes (e.g., switching from "equals" to "is empty").
- Adding a condition appends a new empty row; removing fires `onChange` with the row excluded.
- Keyboard behavior:
  - `Tab` navigates through all selectors and inputs within each row and the add button.
  - Dropdown selectors: `Space`/`Enter` to open, arrow keys to navigate, `Enter` to select, `Escape` to close.
  - Remove button: `Enter`/`Space` removes the row.
  - After removing a row, focus moves to the previous row's remove button or the add button.
- Screen reader behavior: each row is announced as "Condition [n] of [total]". Selectors announce their current value. Remove button announces "Remove condition [n]". Adding a condition announces "Condition added".
- Motion: row add/remove uses a short animation; reduced motion suppresses it.

---

## 5. Accessibility Requirements

- Each selector within a row has an associated label (visible or `aria-label`).
- Rows are wrapped in a `role="group"` with a label (e.g., "Condition 1").
- The remove button for each row has `aria-label="Remove condition [n]"`.
- Field errors within a row are linked via `aria-describedby`.
- The AND/OR connector is readable text (not icon-only).
- The "Add condition" button has a descriptive label.
- All interactive elements meet WCAG AA contrast.
- Focus management after add/remove: focus moves logically (to new row input or previous row).
- Reduced motion: no add/remove animation when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- Required tokens: row background, row border, row hover background, selector background, selector border, selector focused border, value input background, value input border, remove button color, remove button hover color, AND/OR connector label color, add button color, error border color, error text color, surface background.
- Prohibited hardcoded values: no raw colors, no pixel font sizes or spacing, no hardcoded border-radius.
- Dark mode: all token references resolve correctly; row backgrounds, selectors, and error states remain distinct in dark theme.

---

## 7. Composition Rules

- May be wrapped by: automation rule editor panels, workflow step configuration modals, filter configuration drawers.
- May contain: condition rows (each with field selector, operator selector, value input, remove button), AND/OR connector labels, "Add condition" button, optional group containers.
- Anti-patterns:
  - Do not fetch available fields or operators from an API inside this component; receive them as props.
  - Do not allow free-form expression entry (code or query strings) inside this component.
  - Do not use this for non-automation filtering contexts without explicit design approval.

---

## 8. Performance Constraints

- Each condition row should be memoized to prevent re-rendering all rows when one row changes.
- If the condition list can exceed 20 rows, virtualize the list.
- Operator and value input options are derived synchronously from props; no async fetching.

---

## 9. Test Requirements

- Renders all provided condition rows with correct field, operator, and value.
- Adding a condition appends a new empty row and fires `onChange`.
- Removing a condition removes the row and fires `onChange` without the removed condition.
- Changing a field resets operator and value inputs.
- Changing an operator resets the value input when types are incompatible.
- AND/OR connector is visible and toggling it fires `onChange` with updated logic.
- Keyboard: Tab navigates all selectors and inputs; dropdowns respond to arrow keys and Enter; remove buttons respond to Enter/Space.
- Focus moves correctly after adding or removing rows.
- Error state on an incomplete row shows an error indicator linked to the row group.
- Disabled state prevents all row interaction.
- Accessibility: no axe violations; row groups are labeled; remove buttons have accessible names; errors are linked.
- Reduced motion: no row add/remove animation when `prefers-reduced-motion` is active.
