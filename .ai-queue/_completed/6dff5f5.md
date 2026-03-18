# Commit History
- `d2e5004` — fix(date-picker): add closeOnSelect prop, show range picker in docs
- `6dff5f5` — merge commit to fix/docs-site/component-bug-fixes

<!-- auto-queue -->
<!-- target-branch: fix/docs-site/component-bug-fixes -->
# Fix DatePicker close behavior and add range selection support in docs

## Instructions

### Problem 1: DatePicker closes immediately on date selection
The DatePicker currently calls `setOpen(false)` immediately when a date is selected (line 510 in DatePicker.tsx). The user expects the calendar to stay open after selecting a date, closing only on click-away, Escape, or clicking the trigger again.

**Fix**: Add a `closeOnSelect` prop (default: `false`) to DatePicker that controls whether the calendar closes after date selection. Remove or conditionally gate the `setOpen(false)` call in the `handleSelect` function.

In `packages/components/DatePicker/DatePicker.tsx`:
1. Add `closeOnSelect?: boolean` to the props interface (default `false`)
2. In the `handleSelect` function (around line 510), only call `setOpen(false)` if `closeOnSelect` is `true`
3. The click-outside handler (lines 521-530) and Escape key handler (lines 533-540) should still close the picker regardless

### Problem 2: Docs don't show date range selection
A `DateRangePicker` component already exists at `packages/components/DatePicker/DateRangePicker.tsx`. The docs need to show both single date and date range examples.

**Fix**: Update the DatePicker docs example in `apps/docs/components/component-examples.tsx` (around line 910-911) to:
1. Show a basic DatePicker example (single date, stays open until click-away)
2. Show a DateRangePicker example below it
3. Ensure both are properly imported

### Steps
1. Add `closeOnSelect` prop to DatePicker component with default `false`
2. Update DatePicker `handleSelect` to conditionally close based on `closeOnSelect`
3. Update the DatePicker docs example to show both single and range selection
4. Import DateRangePicker in the component-examples file if not already imported
5. Verify both pickers work correctly in the docs preview

## Scope
- `packages/components/DatePicker/DatePicker.tsx` (closeOnSelect prop)
- `apps/docs/components/component-examples.tsx` (DatePicker + DateRangePicker examples — only the DatePicker section around lines 910-911)

## Verification
- [ ] DatePicker stays open when a date is clicked
- [ ] DatePicker closes on click-away
- [ ] DatePicker closes on Escape
- [ ] DateRangePicker example shows in docs
- [ ] DateRangePicker supports two-click range selection

## Task Progress
<!-- lat: 2026-03-02T21:09:00Z -->
<!-- agent-pid: 68095 -->
<!-- worktree: .worktrees/q-003 -->
<!-- branch: q/003 -->

### Checklist
- [ ] **ACTIVE** → Add closeOnSelect prop to DatePicker
- [ ] Update DatePicker docs example with range picker
- [ ] Commit, rebase, merge, archive

### Handoff Context
- DatePicker.tsx line 510: setOpen(false) in handleSelect needs to be conditional
- DateRangePicker already exists as separate component
- Docs example at component-examples.tsx ~line 910
