# Component Spec — CalendarView

## 1. Purpose

Displays a structured calendar grid for visualizing scheduled events and time-based data across days, weeks, or months. Provides a temporal overview that allows users to understand scheduling density and navigate between time periods.

Use when: the user needs to browse or review events organized by date, select date ranges, or understand schedule context at a glance.

Do NOT use when: only a single date picker input is needed (use a DatePicker primitive instead), or when a linear list of upcoming events is sufficient.

---

## 2. UX Intent

- Primary interaction goal: Allow users to understand their schedule at a glance and navigate to specific time periods or events.
- Expected user mental model: Users approach a calendar with a deeply ingrained mental model from physical calendars and OS/app calendars (Jakob's Law). The grid layout of days and weeks must be instantly recognizable.
- UX laws applied:
  - Jakob's Law: Follow established calendar grid conventions (7-column week grid, month/week/day views).
  - Gestalt (Proximity and Similarity): Events on the same day or overlapping days must be visually grouped. Days in the same week belong to a row.
  - Hick's Law: Limit visible controls to view-switching and navigation arrows; avoid overwhelming the toolbar.
  - Fitts's Law: Navigation arrows and day cells must have sufficient tap/click target size (minimum 44x44pt on mobile).
  - Doherty Threshold: View transitions and date navigation must render within 400ms to feel responsive.

---

## 3. Visual Behavior

- Layout rules:
  - Displays a grid of day cells organized by week rows. The number of rows depends on the month.
  - A header row shows abbreviated weekday labels (Su, Mo, Tu, ...).
  - A navigation bar above the grid shows the current month/year and previous/next controls.
  - In week view, columns represent individual days; in month view, each cell represents one day.
  - Today's date cell is visually distinguished from other cells.
  - Days outside the current month (leading/trailing) are visually de-emphasized.
- Spacing expectations: Consistent gap between cells using space tokens. The grid fills its container width; cells flex equally.
- Typography rules: Day numbers use a body-size token. Weekday header labels use a smaller, secondary label size token.
- Token usage: All background colors, text colors, border colors, and radii must use design tokens. No hardcoded hex values.
- Responsive behavior: On narrow viewports, day cells compress but maintain minimum touch target size. In very narrow contexts the component may switch to a week-strip view.

---

## 4. Interaction Behavior

- States:
  - Idle: Full grid visible, today highlighted.
  - Hover (web): Day cell shows a subtle background highlight on hover.
  - Focus: Focused day cell shows a clearly visible focus ring (keyboard navigation).
  - Active/Selected: Selected day or range is highlighted with the primary accent token.
  - Disabled: Days outside the allowed selectable range appear de-emphasized and are not interactive.
  - Loading: If event data is loading, event indicators within cells show a placeholder/skeleton state.
- Controlled vs uncontrolled: Supports both. In uncontrolled mode, internal state manages the visible month and selected date. In controlled mode, the parent supplies the current month and selected date.
- Keyboard behavior:
  - Arrow keys navigate between day cells.
  - Enter or Space selects the focused day.
  - Page Up / Page Down navigate between months.
  - Home / End navigate to the first / last day of the visible week.
- Screen reader behavior:
  - The grid is announced as a grid or table with row and column headers.
  - Each day cell has an accessible label including the full date (e.g., "Monday, March 10, 2025").
  - Today is identified with an additional label (e.g., "Today, Monday, March 10, 2025").
  - Selected day is announced as selected.
  - Navigation controls have descriptive labels ("Previous month", "Next month").
- Motion rules: Month-to-month transitions may animate with a horizontal slide. This animation must be suppressed when the user has enabled reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - The day grid uses `role="grid"` with `role="row"` and `role="gridcell"` for rows and cells.
  - The current month/year heading uses an appropriate heading level or `aria-label`.
  - Navigation buttons use `aria-label` ("Previous month", "Next month").
  - Today's cell includes `aria-current="date"`.
  - Selected cell includes `aria-selected="true"`.
- Focus rules: Focus is managed within the grid. When the month changes via keyboard, focus moves to the equivalent day in the new month. Focus must not escape the grid unintentionally.
- Contrast expectations: Day number text must meet a minimum 4.5:1 contrast ratio against the cell background. De-emphasized (out-of-month) text must meet at least 3:1.
- Reduced motion behavior: Slide transitions between months are disabled. Month changes are instant.

---

## 6. Theming Rules

- Required tokens: background color, surface color, primary accent (for selected state), text primary, text secondary (for out-of-month days and weekday headers), border color, focus ring color, radius.
- Prohibited hardcoded values: No hardcoded hex colors, pixel spacing values, or font sizes. All values must reference design tokens.
- Dark mode expectations: All surface and text tokens must resolve to appropriate dark-mode values automatically when the dark theme is active. Today and selected states must remain clearly distinguishable in dark mode.

---

## 7. Composition Rules

- What can wrap it: Page-level layout containers, modal/drawer surfaces, or a panel alongside a detail view.
- What it may contain: Day cells may contain small event indicator dots or short event label chips to communicate scheduling density.
- Anti-patterns:
  - Do not embed full event cards inside day cells — cells are indicators only; use an EventCard list in an adjacent panel.
  - Do not hardcode month or locale strings; all date formatting must respect the active locale.
  - Do not nest CalendarView inside another CalendarView.

---

## 8. Performance Constraints

- Memoization rules: Day cell rendering should be memoized to avoid re-rendering the entire grid when only the selected date changes. Event indicators per cell should be derived from stable, memoized data.
- Virtualization: Month view does not require virtualization. Week/day views with large numbers of time-slot rows may require windowed rendering.
- Render boundaries: The calendar grid is an isolated render boundary. Navigation changes must not trigger rerenders of sibling or parent components unless explicitly propagated via callbacks.

---

## 9. Test Requirements

- What must be tested:
  - Correct number of day cells rendered for a given month (28, 29, 30, or 31 days).
  - Leading and trailing days from adjacent months are rendered and de-emphasized.
  - Today's date cell receives `aria-current="date"`.
  - Navigating to the next/previous month renders the correct month.
  - Selecting a day fires the appropriate callback and marks the cell as selected.
- Interaction cases:
  - Keyboard arrow navigation moves focus correctly across rows and columns.
  - Page Up/Down moves to the previous/next month without losing focus.
  - Enter selects the focused day.
  - Clicking/tapping a day cell triggers selection.
- Accessibility checks:
  - Grid, row, and gridcell roles are present.
  - All navigation buttons have accessible labels.
  - Focus ring is visible on the focused cell.
  - No contrast failures on day numbers in light or dark theme.
  - Reduced motion preference disables transition animations.
