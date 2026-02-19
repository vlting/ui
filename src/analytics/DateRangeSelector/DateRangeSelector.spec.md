# Component Spec — DateRangeSelector

## 1. Purpose

Provides a control that allows users to select a start date and end date, defining the time range for an analytics query or report. Supports preset ranges (e.g., "Last 7 days", "Last 30 days", "This quarter") as well as custom date entry.

Use when: users need to specify a time window for analytics data, chart filtering, or report generation.

Do NOT use when: only a single date is needed — use a date picker component instead. Do NOT use when the date range is fixed and non-interactive — render a read-only period label instead.

---

## 2. UX Intent

- Primary interaction goal: let users define or change the time window for their analytics view with the fewest interactions possible, defaulting to common presets.
- Expected user mental model: users expect a compact trigger (button or inline control) that reveals a panel with preset options and a calendar-based custom range picker; the currently active range is always visible in the trigger.
- UX laws applied:
  - **Hick's Law** — preset options reduce the number of decisions; most users will use a preset rather than entering custom dates.
  - **Fitts's Law** — preset options must have large enough tap targets; the confirm action in the custom picker must be prominent.
  - **Jakob's Law** — date range pickers follow established patterns (calendar grid, left = start, right = end, shaded range between).
  - **Doherty Threshold** — the popover/sheet must open within 400 ms of user interaction.

---

## 3. Visual Behavior

- Layout rules: the trigger is an inline-flex element displaying the current range label and a calendar icon; the popover/sheet presents preset options in a list on one side and a calendar grid on the other (or stacked vertically on mobile).
- Spacing expectations: preset option list item padding uses space tokens; calendar day cells have consistent size token-based padding to meet tap target minimums; gap between preset list and calendar uses a space token.
- Typography rules: the trigger label uses the body or label type style token; preset option labels use the body token; calendar day numbers use the caption token; month/year heading uses the label token.
- Token usage: trigger background, border, and text use design tokens; selected date range uses the selection color token; hovered date uses the hover token; today's date uses a distinct marker token.
- Responsive behavior: on mobile, the picker opens in a full-screen sheet with stacked layout; on desktop, it appears as a popover beneath the trigger.

---

## 4. Interaction Behavior

- States:
  - **idle / closed**: trigger displays the current range label.
  - **open**: popover/sheet is visible with preset list and calendar.
  - **preset selected**: the corresponding preset is highlighted; calendar updates to reflect the range.
  - **custom range — start selected**: first date highlighted; user can now select the end date.
  - **custom range — range selected**: the range between start and end is shaded in the calendar.
  - **disabled**: trigger is non-interactive and visually dimmed.
- Controlled vs uncontrolled: selected range value is always controlled externally via props; open/closed state may be uncontrolled internally or controlled via props.
- Keyboard behavior: Enter or Space opens the popover; within the popover, arrow keys navigate calendar days; Enter selects a date; Escape closes the popover and returns focus to the trigger; Tab moves through the preset list and calendar controls.
- Screen reader behavior: trigger announces the current range; calendar grid has `aria-label` for the month; each day cell has `aria-label` with the full date; selected dates have `aria-selected="true"`; the range between start and end cells has `aria-selected="true"` and descriptive labels.
- Motion rules: popover open/close uses `duration.fast`; calendar month transitions use `duration.fast`; reduced motion disables all animations.

---

## 5. Accessibility Requirements

- ARIA requirements: trigger has `aria-haspopup="dialog"` and `aria-expanded`; the popover has `role="dialog"` with `aria-label`; calendar grid has `role="grid"`; day cells have `role="gridcell"` with `aria-label` and `aria-selected`.
- Focus rules: on open, focus moves to the first focusable element inside the popover; on close, focus returns to the trigger; focus must be trapped within the popover while it is open.
- Contrast expectations: selected range background meets WCAG AA 3:1 non-text contrast against the calendar background; day number text meets AA (4.5:1) in all states.
- Reduced motion behavior: popover open/close and calendar transitions are disabled; state changes are reflected immediately.

---

## 6. Theming Rules

- Required tokens: trigger background, trigger border, trigger text color, popover background, popover border, popover shadow, calendar day hover token, calendar selection fill token, today marker token, preset list item hover token, confirm action button tokens.
- Prohibited hardcoded values: no raw hex codes, pixel dimensions for day cells, or font sizes.
- Dark mode expectations: calendar selection and hover states must remain distinguishable against the dark popover background; today marker must remain visible.

---

## 7. Composition Rules

- What can wrap it: `AnalyticsFilterBar`, a chart header actions slot, a report configuration panel.
- What it may contain: a trigger element, a popover/sheet container, a preset options list, a calendar grid (or two for dual-month range selection), and a confirm/cancel action row.
- Anti-patterns:
  - Do not embed data fetching or range application logic inside this component.
  - Do not allow the calendar to navigate to dates outside the permissible range without visual indication.
  - Do not use native `<input type="date">` as the primary interface — it must be a design-system-consistent calendar widget.

---

## 8. Performance Constraints

- Memoization rules: calendar day rendering is inherently inexpensive; no special memoization required beyond standard React patterns.
- Virtualization: not applicable.
- Render boundaries: no internal error boundary required; the feature-level boundary handles errors.

---

## 9. Test Requirements

- What must be tested:
  - Trigger displays the current range label from props.
  - Popover opens on trigger activation and closes on Escape or confirm.
  - Selecting a preset updates the displayed range and calls the change callback.
  - Selecting a custom start and end date correctly defines the range and calls the change callback.
  - Disabled state prevents opening the popover.
- Interaction cases:
  - Keyboard navigation moves through calendar days with arrow keys.
  - Enter selects a day; Escape closes the popover.
  - Focus returns to the trigger after the popover closes.
- Accessibility checks:
  - Trigger has `aria-haspopup` and `aria-expanded`.
  - Popover has `role="dialog"` with an `aria-label`.
  - Calendar days have `aria-label` with the full date.
  - Selected days have `aria-selected="true"`.
  - No contrast violations on day cells or selection fill in light and dark themes.
