# Component Spec — InputOTP

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Multi-digit OTP (one-time password) input with individual character slots.
- Use for verification codes, 2FA inputs, and PIN entry.
- Do NOT use for regular text input. Do NOT use for passwords (use a password input).

---

## 2. UX Intent

- **Doherty Threshold** — auto-advance and paste support provide immediate feedback.
- **Tesler's Law** — manages focus between slots automatically; paste fills all fields at once.
- **Fitts's Law** — large individual slots are easy to target.

---

## 3. Anatomy

Compound component with hidden input technique:
- `InputOTP` (Root) — hidden `<input>` with visible slot display. Props: `maxLength` (default 6), `value`, `onChange`, `onComplete`, `pattern`, `disabled`.
- `InputOTP.Group` — flex row container for slots.
- `InputOTP.Slot` — individual digit display box. Shows active state with focus outline.
- `InputOTP.Separator` — visual dot separator between groups.

Hidden input: `<input type="text">` with `inputMode="numeric"`, `autoComplete="one-time-code"`.

> **TypeScript is the source of truth for props.** See source files in `InputOTP/` for the full typed API.

---

## 4. Behavior

### States

- **Empty** — all slots show placeholders.
- **Filling** — active slot highlighted, previous slots show entered digits.
- **Complete** — all slots filled, `onComplete` fires.
- **Disabled** — all slots non-interactive.

### Keyboard Interaction

- Typing fills the current slot and auto-advances to next.
- Backspace clears the current slot and moves back.
- Paste fills all slots from clipboard content.
- Tab moves focus to/from the hidden input.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** Hidden `<input>` captures keyboard events.
- **ARIA attributes:** `aria-label="Enter N-digit code"` on the hidden input.
- **Auto-complete:** `autoComplete="one-time-code"` enables browser/OS OTP autofill.
- **Input mode:** `inputMode="numeric"` shows numeric keyboard on mobile.

---

## 6. Styling

- **Design tokens used:** `$background`, `$borderColor`, `$color`, `$outlineColor` (focus), `$color6` (separator). Slots: 40x44px, `$4` border radius, `$body` font at 20px.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Verification forms, 2FA dialogs, login flows.
- **What this component can contain:** Group, Slot, Separator sub-components.
- **Anti-patterns:** Do not use without `onComplete`. Do not set `maxLength` greater than ~8 (UX degradation).

---

## 8. Breaking Change Criteria

- Removing `autoComplete="one-time-code"`.
- Removing paste support.
- Removing the hidden input technique.
- Changing slot dimensions.

---

## 9. Test Requirements

- **Behavioral tests:** Verify digits fill slots sequentially. Verify backspace clears and moves back. Verify paste fills all slots. Verify `onComplete` fires when all slots filled. Verify `pattern` filtering rejects non-matching input. Verify disabled state.
- **Accessibility tests:** Verify `aria-label` on hidden input. Verify `autoComplete="one-time-code"`. Verify `inputMode="numeric"`. Verify keyboard-only operation.
