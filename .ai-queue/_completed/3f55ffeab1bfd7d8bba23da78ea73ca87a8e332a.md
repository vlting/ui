<!-- auto-queue -->
<!-- target-branch: fix/quality-audit -->

# Stage 2, Segment 1: DatePicker & DateRangePicker — Fix tag="button" Bug + Native Buttons

## Context

These two components have the **critical `tag="button"` bug** — `styled(XStack, { tag: 'button' })` renders `<div tag="button">`, NOT `<button>`, in Tamagui v2 RC. They also have nav buttons and day cells that use styled `XStack` with `onPress` instead of native `<button>` elements.

**Epic branch:** `fix/quality-audit`
**Feature flag:** `quality_audit`
**Parent issue:** #3 (Epic), #5 (Stage 2)
**Audit report:** `.ai-epics/docs/audit-report.md`

## Scope

- `packages/components/DatePicker/DatePicker.tsx`
- `packages/components/DatePicker/DateRangePicker.tsx`

## Instructions

### Read First
- `AI_CONSTITUTION.md` — especially §2.8 (Semantic HTML & DOM Structure)
- `packages/FRONTEND_QUALITY.contract.md` — §1 (Rendered Markup), §2 (Accessibility)
- The existing `Toggle` component (`packages/components/Toggle/Toggle.tsx`) as a reference for `styledHtml('button')` usage
- The existing `Button` component (`packages/components/Button/Button.tsx`) as a gold-standard reference

### Changes Required

#### DatePicker.tsx

1. **Fix TriggerFrame** — Replace `styled(XStack, { tag: 'button', ... })` with either:
   - `styledHtml('button', { ... })` — preferred approach, matches Toggle pattern
   - Or wrap the trigger content in a native `<button>` element with Tamagui styled components inside for visual styling
   - The trigger MUST render as a native `<button>` element in the DOM
   - Apply `type="button"` to prevent form submission
   - Ensure `focusVisibleStyle` is present (standard pattern from FRONTEND_QUALITY.contract.md)

2. **Fix NavButton (prev/next month arrows)** — Replace the `ViewJsx` / styled `XStack` with `onPress` pattern:
   - Use `styledHtml('button')` for the nav arrow containers
   - Add `type="button"`, `aria-label="Previous month"` / `aria-label="Next month"`
   - Add `focusVisibleStyle`

3. **Fix DayCell** — Replace `ViewJsx` / styled `XStack` with `onPress` for day cells:
   - Use `styledHtml('button')` for each day cell
   - Add `type="button"`
   - Add `aria-label` with the full date (e.g., "February 26, 2026")
   - Add `aria-pressed="true"` or `aria-selected="true"` for the selected day
   - Add `focusVisibleStyle`

4. **Keyboard operability** — Ensure all replaced elements are:
   - Focusable via Tab
   - Activatable via Enter and Space (native `<button>` provides this)

#### DateRangePicker.tsx

Apply the same changes as DatePicker.tsx:

1. **Fix TriggerFrame** — Same `tag="button"` fix
2. **Fix NavButton** — Same native button replacement
3. **Fix DayCell** — Same native button replacement with appropriate ARIA for range selection (`aria-selected`)

### Important Constraints

- Do NOT change the visual appearance — only the underlying HTML element
- Do NOT refactor or extract shared utilities — keep changes minimal and focused
- Do NOT fix token discipline issues (hardcoded pixels) — that's Stage 4
- Do NOT add reduced motion support — that's Stage 5
- Use `styledHtml('button')` from `tamagui` — it correctly sets `Component: tag` in `staticConfig`
- When using `styledHtml('button')`, the API is different from `styled()` — it takes an HTML tag string as first arg
- Remember the `as any` pattern for styled options if needed for Tamagui v2 RC type bugs
- All new `<button>` elements need `type="button"` to prevent accidental form submission

## Verification

- [ ] `npx tsc --noEmit` — 0 errors
- [ ] `yarn lint` — no new errors introduced
- [ ] DatePicker trigger renders as `<button>` in DOM (not `<div tag="button">`)
- [ ] DateRangePicker trigger renders as `<button>` in DOM
- [ ] All nav arrows and day cells are keyboard-focusable (Tab)
- [ ] All nav arrows and day cells are activatable (Enter/Space)

## Task Progress
<!-- lat: 2026-02-26T01:15:00Z -->
<!-- agent-pid: 67429 -->
<!-- worktree: .worktrees/q-001 -->
<!-- branch: q/001 -->

### Checklist
- [x] Create worktree from fix/quality-audit
- [x] Read DatePicker.tsx and DateRangePicker.tsx source
- [x] Read Toggle.tsx as styledHtml('button') reference
- [x] Fix DatePicker.tsx — TriggerFrame, NavButton, DayCell
- [x] Fix DateRangePicker.tsx — TriggerFrame, NavButton, DayCell
- [x] Run tsc --noEmit and yarn lint
- [ ] **ACTIVE** → Commit, rebase, merge

### Handoff Context
- Target branch: fix/quality-audit
- Critical bug: tag="button" in styled() doesn't work in Tamagui v2 RC
- Use styledHtml('button') pattern from Toggle component
