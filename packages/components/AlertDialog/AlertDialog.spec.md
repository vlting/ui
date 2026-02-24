# Component Spec — AlertDialog

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Modal dialog for confirming destructive or irreversible actions.
- Use for delete confirmations, unsaved changes warnings, and critical decision points.
- Do NOT use for informational messages (use Dialog or Alert). Do NOT use for non-blocking notifications (use Toast).

---

## 2. UX Intent

- **Peak-End Rule** — clear confirmation prevents accidental destructive actions, protecting the user's work.
- **Doherty Threshold** — dialog appears immediately on trigger, providing instant feedback.
- **WAI-ARIA pattern:** [Alert and Message Dialogs](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)

---

## 3. Anatomy

Compound component wrapping Tamagui AlertDialog primitives with Portal:
- `AlertDialog` (Root) — state management. Props: `open`, `defaultOpen`, `onOpenChange`.
- `AlertDialog.Trigger` — opens the dialog.
- `AlertDialog.Overlay` — backdrop overlay with opacity animation.
- `AlertDialog.Content` — centered modal container with shadow and animation.
- `AlertDialog.Title` — dialog heading.
- `AlertDialog.Description` — explanatory text.
- `AlertDialog.Footer` — action button container.
- `AlertDialog.Cancel` — dismissal action.
- `AlertDialog.Action` — confirmation/destructive action.

> **TypeScript is the source of truth for props.** See source files in `AlertDialog/` for the full typed API.

---

## 4. Behavior

### States

- **Closed** — dialog and overlay hidden.
- **Open** — overlay visible, content centered, focus trapped.

### Keyboard Interaction

- **Escape** — closes the dialog (delegated to Tamagui).
- **Tab/Shift+Tab** — cycles focus within the dialog (focus trap).
- **Enter/Space** — activates focused button (Cancel or Action).

### Motion

- Enter: opacity 0→1, scale 0.95→1 (content). Overlay fades in.
- Exit: opacity 1→0, scale 1→0.95.
- Must respect `prefers-reduced-motion`.

---

## 5. Accessibility

- **Semantic element:** Tamagui AlertDialog provides `role="alertdialog"`.
- **ARIA attributes:** `aria-modal="true"`, `aria-labelledby` (Title), `aria-describedby` (Description).
- **Focus management:** Focus is trapped within the dialog. On close, focus returns to the trigger element.

---

## 6. Styling

- **Design tokens used:** `$background` for content, `$borderColor` for border, shadow for depth, `$backgroundOverlay` for overlay. Z-index applied to overlay and content.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Any component that needs a confirmation step before a destructive action.
- **What this component can contain:** Title, Description, Footer with Cancel and Action buttons.
- **Anti-patterns:** Do not use without both Cancel and Action buttons. Do not use for non-critical confirmations. Do not nest dialogs.

---

## 8. Breaking Change Criteria

- Removing sub-components (Trigger, Overlay, Content, Title, Description, Footer, Cancel, Action).
- Removing focus trapping.
- Removing Escape key dismissal.
- Removing `role="alertdialog"`.

---

## 9. Test Requirements

- **Behavioral tests:** Verify dialog opens on trigger click. Verify Escape closes. Verify Cancel closes. Verify Action fires callback and closes. Verify overlay renders. Verify enter/exit animations.
- **Accessibility tests:** Verify `role="alertdialog"`. Verify focus is trapped. Verify focus returns to trigger on close. Verify `aria-labelledby` and `aria-describedby`.
