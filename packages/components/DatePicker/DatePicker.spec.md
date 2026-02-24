# Component Spec — DatePicker

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Form control for selecting a single date or date range via an inline calendar dropdown.
- Use for date inputs in forms, booking systems, and scheduling interfaces.
- Do NOT use for date display only (use formatted text). Do NOT use for time selection (use TimePicker).

---

## 2. UX Intent

- **Doherty Threshold** — calendar dropdown appears immediately on trigger click.
- **Fitts's Law** — trigger button and calendar cells are appropriately sized for targeting.
- **Tesler's Law** — complex date parsing and validation is handled internally.

---

## 3. Anatomy

Two components: `DatePicker` (single date) and `DateRangePicker` (date range).

**DatePicker:**
- Trigger button displaying formatted date or placeholder.
- Calendar dropdown (single month view).
- Optional label, helper text, and error message.

**DateRangePicker:**
- Trigger button displaying "start – end" or placeholder.
- Dual side-by-side calendar dropdowns (two months).
- Two-click selection: first click sets start, second sets end (auto-swaps if needed).

Shared props: `value`/`defaultValue`, `onValueChange`, `placeholder`, `label`, `helperText`, `error`/`errorMessage`, `disabled`, `size` (`'sm'`/`'md'`/`'lg'`), `minDate`, `maxDate`, `locale`.

> **TypeScript is the source of truth for props.** See `DatePicker.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Idle** — trigger shows placeholder or formatted date.
- **Open** — calendar dropdown visible.
- **Selected** — trigger shows formatted date(s).
- **Error** — red border and error message visible.
- **Disabled** — trigger non-interactive.

### Keyboard Interaction

- **Escape** — closes the calendar dropdown.
- Click-outside closes the dropdown.
- Calendar cell navigation is click-based (Arrow key grid navigation is a future enhancement).

### Motion

None.

---

## 5. Accessibility

- **ARIA attributes:** `aria-label`, `aria-expanded` on trigger. `role="button"`, `aria-label` on calendar navigation. `role="button"`, `aria-label`, `aria-selected`, `aria-disabled` on date cells.
- **Focus management:** Focus moves to calendar when opened.
- **Error identification:** `aria-invalid` and `aria-describedby` linking to error message (when error prop is set).
- **Date formatting:** Uses `Intl.DateTimeFormat` for locale-aware display.
- **Note:** Trigger uses `role="button"` on `<div>` — should use native `<button>` per QUALITY_BASELINE.

---

## 6. Styling

- **Design tokens used:** `$background` for trigger and dropdown, `$borderColor` for borders, `$color` for text, `$red10` for error state, `$color6`/`$color10` for selected dates, shadow for dropdown depth.
- **Size variants:** `sm`, `md`, `lg` — affect trigger dimensions and font size.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Forms, filter panels, booking interfaces.
- **What this component can contain:** Self-contained — uses internal Calendar component.
- **Anti-patterns:** Do not use without `onValueChange`. Do not use DatePicker for date ranges (use DateRangePicker). Do not disable all dates.

---

## 8. Breaking Change Criteria

- Removing DateRangePicker export.
- Removing `locale` support.
- Changing the `value`/`onValueChange` contract (Date object shape).
- Removing size variants.
- Removing error state support.

---

## 9. Test Requirements

- **Behavioral tests:** Verify calendar opens on trigger click. Verify date selection updates value. Verify formatted display (locale-aware). Verify `minDate`/`maxDate` constraints. Verify error state renders error message. Verify disabled state. Verify DateRangePicker two-click selection with auto-swap.
- **Accessibility tests:** Verify `aria-expanded` toggles on trigger. Verify `aria-selected` on date cells. Verify error state sets `aria-invalid`. Verify Escape closes dropdown.
