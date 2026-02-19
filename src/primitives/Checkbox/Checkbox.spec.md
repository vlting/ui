# Component Spec — Checkbox

## 1. Purpose

Provides a binary or tri-state (checked, unchecked, indeterminate) selection control for individual boolean options or for "select all" group controls within lists, forms, and tables.

Use it for independent boolean options in forms, for multi-select list items, and for select-all / partial-select group controls.

Do NOT use it for mutually exclusive options (use RadioGroup), for yes/no settings that take effect immediately without a form submit (use Switch), or for navigation.

---

## 2. UX Intent

- Primary interaction goal: selection — the user checks or unchecks an option as part of a form or multi-select interaction.
- Expected user mental model: a standard form checkbox. Clicking the checkbox or its label toggles the state. The indeterminate state signals a partial selection in a group.
- UX laws applied:
  - Jakob's Law: use the established square checkbox visual. Deviation creates confusion.
  - Fitts's Law: the touch target for the checkbox must include the label text (the entire row is tappable), meeting the 44pt minimum on mobile.
  - Gestalt Law of Proximity: the checkbox and its label are tightly coupled visually and functionally.

---

## 3. Visual Behavior

- Layout: a horizontally aligned pair of the checkbox control and a label text. The label appears to the right of the checkbox (or left in RTL).
- Spacing: gap between checkbox and label from space tokens. The overall row has a minimum height from size tokens for touch accessibility.
- Typography: label text uses a body or label scale. Helper/description text (if supported) uses a caption scale below the label.
- Token usage:
  - Unchecked border: border token.
  - Checked background: primary accent token.
  - Checked icon: on-accent foreground token (checkmark).
  - Indeterminate background: primary accent token with a dash icon.
  - Focus ring: outline token.
  - Disabled: muted background and muted text tokens.
  - Error state: destructive/error border token.
- Responsive behavior: the checkbox size (control square) remains consistent across breakpoints. Label text may wrap on narrow viewports.

---

## 4. Interaction Behavior

- States:
  - Unchecked idle: empty square with border.
  - Unchecked hover: border or background shifts to hover token.
  - Checked idle: filled with checkmark icon.
  - Checked hover: slightly darker or lighter fill.
  - Indeterminate: filled with a dash/minus icon.
  - Focus (any state): focus ring visible around the control.
  - Disabled (any state): muted appearance; not interactive.
  - Error: error border; error message below.
- Controlled vs uncontrolled: supports both. Controlled via `checked` / `onCheckedChange`. Uncontrolled via `defaultChecked`. Indeterminate is always externally controlled (`indeterminate` prop).
- Keyboard behavior:
  - Tab focuses the checkbox.
  - Space toggles the checked state.
  - Enter does not toggle (checkbox convention).
- Screen reader behavior: the control has `role="checkbox"` (or is a native `<input type="checkbox">`), `aria-checked` reflecting the current state (true / false / mixed for indeterminate), and an accessible name via the associated label.
- Motion rules: the checkmark/dash icon appearance uses a short scale-in or draw-in animation from motion tokens. Suppressed under reduced motion (instant appearance).

---

## 5. Accessibility Requirements

- ARIA requirements: `role="checkbox"` with `aria-checked` (true / false / mixed). Associated label via `<label>` element or `aria-labelledby`. If there is a description, use `aria-describedby`. Error messages use `aria-describedby`.
- Focus rules: the checkbox control is in the tab order. Focus ring is clearly visible. Clicking the label also triggers the checkbox (label association).
- Contrast expectations: unchecked border must meet non-text contrast (3:1) against background. Checked fill must meet non-text contrast. Checkmark icon against checked fill must meet text contrast (4.5:1 or 3:1 for large icons per WCAG).
- Reduced motion behavior: checkmark animation is instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: border token (unchecked), accent/primary (checked fill), on-accent (checkmark color), focus ring token, disabled muted tokens, error/destructive token, space tokens (gap, min-height), radius token (slight rounding of the checkbox square), type scale (label).
- Prohibited hardcoded values: no raw hex colors, no pixel-based control sizes, no hardcoded font sizes.
- Dark mode expectations: unchecked border must be visible against dark backgrounds. Checked state must remain clearly different from unchecked. Disabled state must be distinguishable from enabled without relying on color alone.

---

## 7. Composition Rules

- What can wrap it: forms, filter panels, TeamMemberTable rows (multi-select), PermissionMatrix cells (if used as a cell toggle), settings lists.
- What it may contain: the control square and a label text; optionally a description text below the label. No other interactive elements as siblings within the same Checkbox unit.
- Anti-patterns:
  - Do not use Checkbox for mutually exclusive options — use RadioGroup.
  - Do not use Checkbox without a visible or programmatic label.
  - Do not use Checkbox for immediate on/off settings — use Switch.
  - Do not nest Checkboxes inside each other.

---

## 8. Performance Constraints

- Memoization rules: memoize when rendered in large lists (e.g., 50+ checkboxes in a multi-select list). Each Checkbox instance is independent.
- Virtualization: the parent list handles virtualization.
- Render boundaries: pure render from props. No side effects.

---

## 9. Test Requirements

- What must be tested:
  - Renders in unchecked, checked, and indeterminate states.
  - Clicking the checkbox toggles the state and calls `onCheckedChange`.
  - Clicking the label also toggles the state.
  - Disabled checkbox does not respond to clicks.
  - Controlled mode: checked state is driven by the `checked` prop.
  - Uncontrolled mode: internal state toggling works with `defaultChecked`.
- Interaction cases:
  - Space key toggles the state when focused.
  - Tab focuses the checkbox in document order.
- Accessibility checks:
  - `aria-checked` reflects the current state (true / false / mixed).
  - Accessible name is present via label.
  - Description is associated via `aria-describedby` when provided.
  - Error message is associated via `aria-describedby`.
  - Focus ring is visible when focused.
  - Non-text contrast passes for unchecked border and checked fill.
  - Checkmark animation is suppressed under reduced motion.
