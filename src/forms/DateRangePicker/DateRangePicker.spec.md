# Component Spec — DateRangePicker

## 1. Purpose

Provides a controlled interface for selecting a contiguous date range (start date and end date) from a calendar view, suited for scenarios where a duration or interval must be specified.

Use when: the user must select a start and end date for a report, booking, filter, or scheduling operation.

Do NOT use when: only a single date is needed (use DatePicker), or when an open-ended start or end date is the expected input (use separate DatePicker inputs instead).

---

## 2. UX Intent

- Primary interaction goal: allow the user to define a date range with a single, coherent interaction — minimizing the friction of selecting two separate dates.
- Expected user mental model: a calendar where you click the start date and then the end date, with the range highlighted between them — familiar from flight booking, hotel reservation, and analytics dashboards.
- UX laws applied:
  - Jakob's Law: calendar range selection pattern follows industry-established conventions.
  - Fitts's Law: day cells are large enough to activate accurately on touch.
  - Gestalt (Continuity): the in-range highlight creates a visual band connecting the start and end dates.
  - Hick's Law: dual-month or single-month views limit the visible date set to a manageable range.

---

## 3. Visual Behavior

- Layout: two date input fields (start and end) with a calendar trigger; the calendar may show one or two months simultaneously.
- Calendar view: same structural elements as DatePicker, plus range-specific visuals:
  - Start date: receives a selected/filled start-cap style.
  - End date: receives a selected/filled end-cap style.
  - In-range dates: receive a distinct range-fill background token between start and end.
  - Hover preview: as the user hovers over potential end dates, the range preview highlights.
- Typography: same scale tokens as DatePicker.
- Spacing: same space tokens as DatePicker; range highlight fills the full cell width to create a continuous band.
- Token usage: start/end cap color, range fill color, hover preview color, today indicator, disabled date tokens — all from theme tokens.
- Responsive behavior: on narrow viewports, a single-month calendar is used; navigation allows moving between months. Bottom-sheet presentation on mobile.

---

## 4. Interaction Behavior

- States:
  - Idle (closed): start and end inputs show selected dates or placeholders.
  - Open (selecting start): calendar is open; user selects the start date.
  - Open (selecting end): start is committed; user hovers/navigates to select the end date; range preview highlights.
  - Range committed: both dates are selected; range is highlighted.
  - Day hover (end selection phase): preview range highlights from start to hovered date.
  - Day disabled: dates outside allowed range are non-interactive and muted.
  - Input error: invalid date entry triggers error state on the affected input.
- Controlled vs uncontrolled: start and end date values may be controlled (via props) or uncontrolled (internal state).
- Keyboard behavior:
  - Same base calendar keyboard behavior as DatePicker.
  - After selecting the start date, the calendar remains open for end date selection.
  - Tab moves between start and end inputs; opening either input opens the calendar in the appropriate selection phase.
  - Escape closes the calendar; if only start is selected and escape is pressed, the selection is cleared.
- Screen reader behavior:
  - Calendar indicates whether the user is selecting a start or end date via an accessible label or live region.
  - Each day cell announces its date and whether it is the start, end, in-range, or disabled.
  - Range summary is announced after both dates are selected.
- Motion rules: range highlight extension and calendar open/close animations respect reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: same base requirements as DatePicker. In addition, `aria-label` on the calendar communicates the current selection phase ("Select start date" / "Select end date"). In-range cells have `aria-selected="true"`. Start and end cap cells have `aria-selected="true"` and distinguishable accessible labels.
- Focus: focus management mirrors DatePicker; after start date selection, focus moves naturally to allow end date selection within the same calendar session.
- Contrast: range fill, start/end cap, and hover preview tokens all meet WCAG AA contrast ratios.
- Reduced motion: range highlight preview animation and calendar animation are suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: all DatePicker tokens, plus: range fill background, start cap background, end cap background, hover preview background.
- Prohibited hardcoded values: no hardcoded hex colors, pixel sizes, or font sizes.
- Dark mode: range highlight tokens must remain visually distinct and accessible in dark mode.

---

## 7. Composition Rules

- What can wrap it: FieldWrapper, form sections, analytics filter bars, dashboard toolbars.
- What it may contain: a start date input slot, an end date input slot, a calendar trigger, a calendar popover with a dual-month or single-month grid.
- Anti-patterns:
  - Do not use DateRangePicker for single-date selection (use DatePicker).
  - Do not allow end date to be earlier than start date; validate and surface an error.
  - Do not nest DateRangePicker inside another calendar popover.

---

## 8. Performance Constraints

- Memoization: the calendar grid(s) should be memoized and only re-render when the displayed month(s), selected range, or hover state changes.
- Virtualization: not applicable.
- Render boundaries: calendar popovers are lazily rendered (only mounted when open).

---

## 9. Test Requirements

- Render: start and end inputs render with placeholders when no range is selected; render selected dates when a range is committed.
- Selection flow: selecting start date keeps calendar open; selecting end date commits the range and closes.
- Range highlight: in-range dates receive the range fill token; start and end caps receive their respective tokens.
- Hover preview: hovering over potential end dates shows the range preview highlight.
- Disabled dates: dates outside the allowed range are not selectable.
- Keyboard: Arrow keys navigate; Enter/Space selects; Escape clears and closes; Tab moves between inputs.
- Accessibility: correct ARIA roles, selection phase announcement, and day cell labels are present; focus management is correct.
- Theming: token-based colors apply; no hardcoded values; dark mode tokens resolve correctly.
- Reduced motion: animations are suppressed when reduced motion preference is active.
