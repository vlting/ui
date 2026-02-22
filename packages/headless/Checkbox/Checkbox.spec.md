# Component Spec — Checkbox (Headless)

## 1. Purpose

- Provides a tri-state toggle control (checked, unchecked, indeterminate) with full accessibility and form integration.
- Use when a user needs to make a binary or indeterminate selection, such as agreeing to terms, toggling a setting, or selecting items in a list (with "select all" indeterminate support).
- Do NOT use for mutually exclusive choices (use a radio group instead) or for toggling an immediate action (use a switch instead).

---

## 2. UX Intent

- **Primary interaction goal**: Allow the user to toggle a binary state with a single click or keypress, with clear feedback on the current state.
- **Expected user mental model**: A standard checkbox that behaves identically to native HTML checkboxes, with the addition of a programmatic indeterminate state for "select all" scenarios.
- **UX laws applied**:
  - **Jakob's Law** -- Checkbox must behave like checkboxes in every other application. Click toggles, Space toggles, visual state is immediately obvious.
  - **Fitts's Law** -- The entire Root element is the click target; consumers should size it large enough for comfortable interaction.
  - **Hick's Law** -- A checkbox presents exactly one decision (on or off), minimizing decision time.

---

## 3. Visual Behavior

This is a headless component. It renders semantic HTML (`<button>`, `<span>`, `<input>`) with no built-in styles, design tokens, or theme dependencies. All visual behavior -- colors, sizes, icons, animations, and layout -- is the consumer's responsibility. Consumers style via `className`, rest props, or `data-state` / `data-disabled` attribute selectors.

---

## 4. Interaction Behavior

### States

| State | Condition | `data-state` | `data-disabled` |
|-------|-----------|--------------|-----------------|
| Unchecked | `checked` is `false` or `undefined` | `unchecked` | absent |
| Checked | `checked` is `true` | `checked` | absent |
| Indeterminate | `checked` is `'indeterminate'` | `indeterminate` | absent |
| Disabled | `disabled` is `true` | (reflects checked state) | present (`true`) |

- Hover, focus, and active visual states are not managed by this component; they are the consumer's responsibility via CSS.
- There is no loading or error state; this component is stateless beyond checked/disabled.

### Controlled vs Uncontrolled

- **Controlled**: Pass `checked` and `onCheckedChange`. The component reflects the `checked` prop and calls `onCheckedChange` on interaction.
- **Uncontrolled**: Pass `defaultChecked` (defaults to `false`). The component manages its own state internally and calls `onCheckedChange` on every change.
- The `'indeterminate'` state can only be set via the controlled `checked` prop. Clicking an indeterminate checkbox transitions it to `true`.

### Keyboard Behavior

| Key | Behavior |
|-----|----------|
| **Space** | Toggles checked state (calls `preventDefault` to avoid page scroll, then toggles). |

- No other keys produce behavior. Standard `<button>` focus behavior applies (Tab to focus, Shift+Tab to move away).

### Screen Reader Behavior

- Root is announced as a checkbox (`role="checkbox"`).
- Current state is announced via `aria-checked`: `true`, `false`, or `mixed`.
- When `required` is set, `aria-required="true"` is present.
- Indicator is not independently announced; it is a visual-only child of the Root button.

### Motion Rules

- No motion is built in. Consumer-applied transitions should respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

### ARIA Attributes

| Element | Attribute | Value |
|---------|-----------|-------|
| Root (`<button>`) | `role` | `"checkbox"` |
| Root (`<button>`) | `aria-checked` | `true`, `false`, or `"mixed"` |
| Root (`<button>`) | `aria-required` | `true` when `required` prop is set; absent otherwise |
| Root (`<button>`) | `type` | `"button"` |
| Root (`<button>`) | `disabled` | native disabled attribute when `disabled` is `true` |
| Hidden input | `aria-hidden` | `true` (always) |
| Hidden input | `tabIndex` | `-1` (never focusable) |

### Data Attributes

| Element | Attribute | Values |
|---------|-----------|--------|
| Root | `data-state` | `"checked"` / `"unchecked"` / `"indeterminate"` |
| Root | `data-disabled` | present (`true`) when disabled; absent otherwise |
| Indicator | `data-state` | `"checked"` / `"indeterminate"` (only rendered when visible) |

### Focus Rules

- Root is a native `<button>` and participates in the standard tab order.
- No focus trap is needed.
- No focus restoration is needed.
- No roving tabindex is needed.

### Contrast Expectations

N/A -- headless component. Consumer is responsible for meeting WCAG contrast ratios.

### Reduced Motion Behavior

N/A -- no built-in animations. Consumer-applied animations must respect `prefers-reduced-motion`.

---

## 6. Theming Rules

This is a headless component. It has no theming, no design tokens, and no built-in styles. Theming is entirely the consumer's responsibility.

---

## 7. Composition Rules

### What Can Wrap It

- Any layout container (form, fieldset, label wrapper, flex container).
- A `<label>` element wrapping `Checkbox.Root` provides click-to-toggle and accessible labeling.

### What It May Contain

- `Checkbox.Root` must contain `Checkbox.Indicator` (or custom children).
- `Checkbox.Indicator` may contain any React node (icon, SVG, text) representing the check/indeterminate visual.

### Anti-Patterns

- Do NOT use `Checkbox.Indicator` outside of `Checkbox.Root`. It will throw a context error.
- Do NOT nest multiple `Checkbox.Root` components. Each checkbox must be its own Root.
- Do NOT rely on the hidden `<input>` for user interaction; it exists solely for native form submission when `name` is provided.

### Context Boundaries

- All compound children (`Checkbox.Indicator`) must be rendered inside `Checkbox.Root`.
- Using any compound child outside of Root throws: `"Checkbox compound components must be used within Checkbox.Root"`.

---

## 8. Performance Constraints

### Memoization Rules

- `onCheckedChange` callback should be stable (memoized by the consumer) to avoid unnecessary re-renders.
- The internal context value object is created on every Root render; consumers rendering many checkboxes in a list should consider memoizing at the list-item level.

### Render Boundaries

- `Checkbox.Indicator` conditionally renders (returns `null` when unchecked), which prevents unnecessary DOM work.
- State changes in one checkbox do not affect sibling checkboxes (no shared state).

---

## 9. Test Requirements

### What Must Be Tested

- Renders in unchecked state by default.
- Renders in checked state when `defaultChecked` is `true`.
- Controlled mode reflects the `checked` prop and calls `onCheckedChange`.
- Uncontrolled mode toggles state on click and calls `onCheckedChange`.
- Indeterminate state renders `aria-checked="mixed"` and `data-state="indeterminate"`.
- Clicking an indeterminate checkbox transitions to checked (`true`).
- Disabled checkbox does not toggle on click or keypress.

### Interaction Cases

- **Mouse**: Click toggles between checked and unchecked.
- **Keyboard**: Space key toggles between checked and unchecked.
- **Disabled + Click**: No state change occurs.
- **Disabled + Space**: No state change occurs.

### Accessibility Checks

- `role="checkbox"` is present on Root.
- `aria-checked` reflects `true`, `false`, or `"mixed"`.
- `aria-required` is present when `required` is `true`.
- `data-state` attribute reflects `"checked"`, `"unchecked"`, or `"indeterminate"`.
- `data-disabled` is present when `disabled` is `true`.
- Hidden input has `aria-hidden="true"` and `tabIndex={-1}`.
- Hidden input is rendered only when `name` is provided.
- `Checkbox.Indicator` renders only when checked or indeterminate; returns `null` when unchecked.
- Using `Checkbox.Indicator` outside of `Checkbox.Root` throws the expected context error.
