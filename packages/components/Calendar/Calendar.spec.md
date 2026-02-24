# Component Spec — Calendar

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Month-view date grid for selecting single dates, date ranges, or multiple dates.
- Use as a standalone date picker surface or embedded within DatePicker/DateRangePicker.
- Do NOT use for scheduling/agenda views (use a dedicated calendar component).

---

## 2. UX Intent

- **Fitts's Law** — date cells are sized for easy targeting.
- **Jakob's Law** — month grid layout matches ubiquitous calendar patterns.
- **Miller's Law** — one month at a time reduces cognitive load vs. showing many months.

---

## 3. Anatomy

Single component with internal structure:
- Month/year header with previous/next navigation arrows.
- Day-of-week header row (Su–Sa).
- 6 rows x 7 columns grid of date cells.

Props: `selected`, `onSelect`, `month`, `onMonthChange`, `disabled`, `minDate`, `maxDate`, `mode` (`'single'`/`'range'`/`'multiple'`).

> **TypeScript is the source of truth for props.** See `Calendar.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Default** — normal date cell.
- **Selected** — highlighted with primary color.
- **Today** — subtle border indicator.
- **Disabled** — reduced opacity, non-interactive (outside min/max range or in `disabled` array).
- **In-range** — highlighted background for dates between range start and end.

### Keyboard Interaction

Currently click-based navigation only. Future enhancement: Arrow key grid navigation per WAI-ARIA grid pattern.

### Motion

None.

---

## 5. Accessibility

- **ARIA attributes:** `role="button"` on navigation arrows with `aria-label`. `role="gridcell"` on date cells with `aria-label`, `aria-selected`, `aria-disabled`.
- **Screen reader announcements:** Date cells announce the full date, selection state, and disabled state.
- **Contrast:** Selected state and today indicator must meet 3:1 non-text contrast.
- **Note:** Navigation arrow buttons use `role="button"` on `<div>` — should use native `<button>` per QUALITY_BASELINE.

---

## 6. Styling

- **Design tokens used:** `$color` for text, `$background` for cells, `$color6`/`$color10` for selected states, `$borderColor` for today indicator.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** DatePicker, DateRangePicker, standalone page sections, dialogs.
- **What this component can contain:** Nothing — fully self-contained.
- **Anti-patterns:** Do not use without `onSelect` callback. Do not display calendars for date ranges beyond a single month view (use DateRangePicker with dual calendars).

---

## 8. Breaking Change Criteria

- Removing `mode` prop or a mode value.
- Changing date cell ARIA attributes.
- Removing navigation controls.
- Changing the grid structure.

---

## 9. Test Requirements

- **Behavioral tests:** Verify single mode selects one date. Verify range mode tracks start/end. Verify multiple mode accumulates selections. Verify disabled dates are non-interactive. Verify month navigation. Verify `minDate`/`maxDate` constraints.
- **Accessibility tests:** Verify `aria-selected` toggles on date cells. Verify `aria-disabled` on constrained dates. Verify navigation arrows have `aria-label`.
