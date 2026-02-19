# Component Spec — DatePicker

## 1. Purpose

Provides a controlled interface for selecting a single date from a calendar popover or inline calendar view, accompanied by a text input for manual date entry.

Use when: the user must select a specific date (e.g., a due date, a birth date, a scheduled event date).

Do NOT use when: a date range must be selected (use DateRangePicker), or when only the year or month matters (use a simpler month/year selector).

---

## 2. UX Intent

- Primary interaction goal: allow the user to select a precise date with minimal friction, via either calendar navigation or keyboard/text entry.
- Expected user mental model: a calendar popup attached to a date input field — universally recognized from booking forms, scheduling tools, and date of birth fields.
- UX laws applied:
  - Jakob's Law: calendar layout and navigation follow established date picker conventions.
  - Fitts's Law: calendar day cells are large enough to tap accurately on mobile.
  - Hick's Law: the calendar presents one month at a time, limiting the visible choice set.
  - Gestalt (Proximity): selected date, today's date, and disabled dates are distinguished by proximity and color without ambiguity.

---

## 3. Visual Behavior

- Layout: a text input with a calendar icon trigger; clicking/activating the trigger opens a calendar popover (or inline calendar on mobile).
- Calendar view: month grid with navigation arrows (previous/next month), a month/year header, day-of-week labels, and day cells.
- Day cells: uniform size driven by size tokens; today's date receives a distinct indicator; selected date receives a selected background token; disabled dates are de-emphasized.
- Typography: input text uses a body scale token; month/year header uses a label scale token; day-of-week labels use a caption scale token; day numbers use a body scale token.
- Spacing: cell padding and grid gap driven by space tokens.
- Token usage: input background/border, calendar background, header text, day cell (default, hover, selected, today, disabled), focus ring, and popover shadow all sourced from theme tokens.
- Responsive behavior: on narrow viewports, the calendar may open as a bottom sheet. Minimum touch target size for day cells is observed.

---

## 4. Interaction Behavior

- States:
  - Idle (closed): input shows selected date or placeholder.
  - Open: calendar popover is visible.
  - Day hover: hovered day cell receives a background token shift.
  - Day focused: keyboard-focused day receives a visible focus ring.
  - Day selected: selected day receives a selected background token.
  - Today: today's date receives a distinct indicator (border or dot).
  - Day disabled: disabled dates are non-interactive and visually muted.
  - Input error: input displays error border and error token when an invalid date is entered.
- Controlled vs uncontrolled: selected date value may be controlled (via prop) or uncontrolled (internal state).
- Keyboard behavior:
  - Space or Enter on the trigger input opens the calendar.
  - Arrow keys navigate between day cells.
  - Page Up/Down navigates between months.
  - Home/End navigate to the first/last day of the week.
  - Enter or Space on a day cell selects the date and closes the calendar.
  - Escape closes the calendar without selecting.
  - Tab closes the calendar and moves focus forward.
- Screen reader behavior:
  - Calendar uses `role="dialog"` or `role="grid"` pattern.
  - Day cells have accessible labels including the full date (e.g., "February 19, 2026").
  - Selected date is announced.
  - Month navigation buttons have accessible labels.
- Motion rules: calendar open/close animation respects reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: input has `role="combobox"` or equivalent; calendar uses `role="dialog"` with `aria-label` or `role="grid"`; day cells use `role="gridcell"` with `aria-selected` and `aria-disabled`; month navigation buttons have `aria-label`.
- Focus: focus moves into the calendar on open (to the selected date or today's date); focus returns to the trigger on close.
- Contrast: all day cell text, header text, and indicator colors meet WCAG AA contrast ratios.
- Reduced motion: calendar open/close animation is suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: input background, input border (default, focus, error), calendar background, calendar shadow, header text, day label text, day cell (default background, hover background, selected background, today indicator, disabled text), focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel sizes, or font sizes.
- Dark mode: all tokens must resolve to accessible, distinguishable values in dark mode; selected and today indicators must remain distinguishable.

---

## 7. Composition Rules

- What can wrap it: FieldWrapper, form sections, filter bars.
- What it may contain: a text input slot, a calendar icon trigger slot, a calendar popover slot (with month grid, navigation, and day cells).
- Anti-patterns:
  - Do not use DatePicker for date range selection (use DateRangePicker).
  - Do not use DatePicker without associating it with a Label.
  - Do not nest DatePicker inside another calendar popover.

---

## 8. Performance Constraints

- Memoization: the calendar grid should be memoized and only re-render when the displayed month or selected date changes.
- Virtualization: not applicable (single month view).
- Render boundaries: the calendar popover should be lazily rendered (only mounted when open).

---

## 9. Test Requirements

- Render: input renders with placeholder when no date is selected; renders the selected date when a value is present.
- Open/close: trigger opens the calendar; Escape and Tab close it; focus returns to the trigger.
- Navigation: Arrow keys navigate day cells; Page Up/Down change the month.
- Selection: pressing Enter/Space on a day cell selects the date and closes the calendar.
- Disabled dates: disabled dates are not selectable and are visually muted.
- Error state: invalid text input applies the error border and token.
- Accessibility: correct ARIA roles, states, and focus management are present; day cells have full date labels.
- Theming: token-based colors apply; no hardcoded values; dark mode tokens resolve correctly.
- Reduced motion: calendar animation is suppressed when reduced motion preference is active.
