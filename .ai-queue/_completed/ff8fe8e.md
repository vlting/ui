# Commit History
- `ff8fe8e` feat(datepicker): add DatePicker and DateRangePicker components

---

<!-- auto-queue -->
# Create DatePicker and DateRangePicker Components

## Result
- Created `DatePicker` component: Input-like trigger opens a calendar popover with month navigation, day cells, min/max constraints
- Created `DateRangePicker` component: Two-month side-by-side calendar, first click = start, second click = end, highlights range
- Pure presentation — no external date libraries, uses native `Date` + `Intl.DateTimeFormat` for locale support
- Calendar utilities: `getDaysInMonth`, `getFirstDayOfWeek`, `isSameDay`, `isDateDisabled`, `getWeekdayNames`, `getMonthName`
- Styled primitives: `TriggerFrame`, `CalendarDropdown`, `DayCell`, `NavButton` — all using Tamagui tokens
- Active day: `$color10` bg, `$color1` text (WCAG contrast). Today: subtle border. Range: `$color4` fill
- Controlled/uncontrolled modes, label, helperText, error/errorMessage, disabled, sm/md/lg sizes
- Close on Escape key and click-outside
- Barrel exports added in `packages/components/index.ts` and `src/index.ts`
- Kitchen-sink demos: DatePicker (default, label+helper, error, disabled), DateRangePicker (default, with label)
- Build verified clean (963 modules, 514KB gzip 160KB)
