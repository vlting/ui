# Component Spec — RadioGroup

## 1. Purpose

Provides a group of mutually exclusive radio button options, allowing the user to select exactly one value from a defined set.

Use it when a user must choose exactly one option from a small, known set (2–7 options) and all options can be displayed simultaneously without overwhelming the interface.

Do NOT use it for independent binary options (use Checkbox), for more than 7 options where a Select/Dropdown is more space-efficient, for multiple-selection scenarios, or for on/off settings that take effect immediately (use Switch).

---

## 2. UX Intent

- Primary interaction goal: selection — the user reads all options and picks exactly one.
- Expected user mental model: a classic radio button group. Selecting one deselects the others automatically.
- UX laws applied:
  - Jakob's Law: use the established radio button pattern. A filled circle with a ring communicates "one of many" universally.
  - Hick's Law: limit options to 7 or fewer; beyond that, cognitive load increases significantly.
  - Fitts's Law: the touch target for each option must include the label (the full row is tappable), meeting the 44pt minimum on mobile.
  - Miller's Law: if more than 7 options are needed, use a Select component to reduce visible choice count.

---

## 3. Visual Behavior

- Layout: a vertical stack of radio items by default; supports horizontal layout via a prop. Each item is a row containing the radio control and its label.
- Spacing: consistent vertical gap between items using space tokens. Gap between control and label from space tokens. Minimum row height from size tokens.
- Typography: item labels use a body or label scale. Group label (legend) uses a label/overline scale. Helper/description text per item uses a caption scale.
- Token usage:
  - Unselected border: border token.
  - Selected fill/ring: primary accent token (filled inner circle).
  - Focus ring: outline/focus-ring token.
  - Disabled: muted background and text tokens.
  - Error: destructive/error border on the control; error message below the group.
- Responsive behavior: vertical layout is the default and works at all breakpoints. Horizontal layout may wrap on narrow viewports.

---

## 4. Interaction Behavior

- States:
  - Unselected idle: empty circle with border.
  - Unselected hover: border shifts to hover token.
  - Selected idle: filled inner circle with accent ring.
  - Selected hover: slightly darker or lighter fill.
  - Focus (any item): focus ring visible.
  - Disabled (group or item): muted appearance; not interactive.
  - Error (group): error-state styling on controls; error message below group.
- Controlled vs uncontrolled: supports both. Controlled via `value` / `onValueChange`. Uncontrolled via `defaultValue`.
- Keyboard behavior:
  - Tab focuses the selected item in the group (or the first item if none selected).
  - Arrow keys (Up/Down or Left/Right) move selection within the group (roving tabindex pattern — only one item in tab order at a time).
  - Space does not toggle (radio convention — arrow keys select).
  - Tab exits the group to the next focusable element.
- Screen reader behavior: the group uses `role="radiogroup"` with an accessible label (via `aria-labelledby` pointing to the group label or `aria-label`). Each option has `role="radio"` with `aria-checked` and an accessible name via its label. Error messages use `aria-describedby` on the group.
- Motion rules: selected state inner circle uses a short scale-in animation. Suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: `role="radiogroup"` with `aria-label` or `aria-labelledby`. Each option `role="radio"` with `aria-checked` (true/false). Roving tabindex pattern. Error message associated via `aria-describedby` on the group. Required state via `aria-required` on the group.
- Focus rules: only the selected (or first, if none selected) item is in the tab order. Arrow keys move focus/selection within the group. Tab exits the group.
- Contrast expectations: unselected border meets non-text contrast (3:1). Selected fill/ring meets non-text contrast. Label text meets WCAG AA.
- Reduced motion behavior: selected indicator animation is instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: border (unselected), accent/primary (selected fill and ring), focus-ring token, disabled muted tokens, error/destructive token, space tokens (item gap, control-to-label gap, min row height), radius token (circular control), type scale (label, group label, helper/caption).
- Prohibited hardcoded values: no raw hex colors, no pixel-based control sizes, no hardcoded font sizes.
- Dark mode expectations: unselected border visible on dark backgrounds. Selected state clearly distinct from unselected in dark mode. Error state retains destructive semantics in dark mode.

---

## 7. Composition Rules

- What can wrap it: forms, settings sections, wizard steps, filter panels, BillingCycleToggle (as an alternative pattern for two options).
- What it may contain: a group label element and a set of RadioItem subcomponents. Each RadioItem contains the radio control and a label (plus optional description).
- Anti-patterns:
  - Do not use RadioGroup for independent boolean options — use Checkbox.
  - Do not use RadioGroup for more than 7 options — use Select.
  - Do not mix Checkbox and RadioGroup controls in the same group.
  - Do not pre-select an option unless a sensible default exists; do not leave users unable to reset to "no selection" if that is a valid state.

---

## 8. Performance Constraints

- Memoization rules: memoize the group and individual item subcomponents when they appear in lists or are re-rendered frequently.
- Virtualization: not applicable for typical use (2–7 items).
- Render boundaries: pure render from props. No side effects.

---

## 9. Test Requirements

- What must be tested:
  - Renders all provided options with their labels.
  - The correct option is selected on initial render (controlled and uncontrolled).
  - Selecting an option calls `onValueChange` with the correct value.
  - Only one option is selected at a time.
  - Disabled group: no option is interactive.
  - Disabled item: that specific option is non-interactive; others remain interactive.
  - Error message renders when an error prop is provided.
- Interaction cases:
  - Arrow keys move selection between options.
  - Tab focuses the selected item; Tab again exits the group.
  - Mouse click on a label selects the corresponding radio.
- Accessibility checks:
  - `role="radiogroup"` and accessible label are present.
  - Each option has `role="radio"` and correct `aria-checked`.
  - Roving tabindex is implemented correctly.
  - Error message is associated via `aria-describedby`.
  - Non-text contrast passes for radio controls in both themes.
  - Selected indicator animation is suppressed under reduced motion.
