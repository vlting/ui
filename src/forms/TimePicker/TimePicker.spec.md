# Component Spec — TimePicker

## 1. Purpose

Provides a structured control for selecting a specific time of day (hours, minutes, and optionally seconds or AM/PM). Used in scheduling, event creation, availability setting, and any form field that requires a time value.

Do NOT use this component for date selection (use a DatePicker), for duration or elapsed time entry (use a separate DurationInput), or for free-form time strings that may include timezone or relative offsets.

---

## 2. UX Intent

- Primary interaction goal: allow users to specify an exact time value with precision and without ambiguity, using either direct keyboard entry into segmented fields or a scroll/drum-roll picker interaction.
- Expected user mental model: either a set of labeled number inputs (HH:MM) with optional AM/PM toggle, or a spinning drum-roll wheel common in native mobile time pickers. The web pattern should favor the segmented input approach for precision; mobile may offer the drum-roll.
- UX laws applied:
  - Jakob's Law: HH:MM format is universally understood; deviating from it increases friction.
  - Fitts's Law: increment/decrement controls (if present) and AM/PM toggle must meet minimum touch target size.
  - Gestalt (Proximity): hour, minute, and AM/PM segments must be visually grouped to read as a single time value.
  - Hick's Law: exposing seconds only when required reduces unnecessary decision complexity.

---

## 3. Visual Behavior

- Layout: a horizontal row of time segments (HH, MM, optionally SS) separated by colon delimiters, with an optional AM/PM toggle at the end. Each segment is a narrow input box sized to fit two digits.
- Spacing: gap between segments and delimiters uses space tokens. Outer container padding uses space tokens.
- Typography: segment values use a tabular/monospaced font variant to ensure consistent digit width. Font size uses a body text scale token.
- Token usage: segment border, background, focused border, delimiter text color, AM/PM toggle background and text, error border, and disabled colors must all use design tokens.
- Responsive behavior: the control maintains its compact horizontal layout on all screen sizes. On mobile, tapping a segment may open a native time picker overlay (platform-appropriate behavior) while preserving the same visual container on screen.

---

## 4. Interaction Behavior

- States:
  - Idle: segments display current value or placeholder (e.g., "--").
  - Focused (segment): active segment has a visible focus ring; selected digits are highlighted.
  - Editing: user types directly into the focused segment; the value updates in real time.
  - AM/PM toggle active: the selected period is visually active.
  - Error: segment borders take error token color; error message appears below.
  - Disabled: all segments and toggle non-interactive; reduced opacity.
- Controlled vs uncontrolled: supports both patterns. Controlled mode accepts a time value string and onChange callback. Uncontrolled mode manages internal time state.
- Keyboard behavior:
  - Typing a digit fills the focused segment; entering a valid two-digit value auto-advances to the next segment.
  - Arrow Up/Down increments or decrements the value in the focused segment, wrapping at boundaries (e.g., 59→0 for minutes).
  - Arrow Left/Right navigates focus between segments.
  - A/P keys switch between AM and PM when the AM/PM toggle is focused.
  - Backspace clears the current segment value.
  - Tab advances focus to the next segment, then out of the control.
- Screen reader behavior:
  - Each segment is announced with its role and current value (e.g., "Hour, 2").
  - AM/PM toggle is announced as a button with its current state.
  - Value changes within a segment are announced via a live region.
- Motion rules: no animation required. AM/PM toggle state change may use a brief background transition suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA: each time segment is a `spinbutton` with `aria-label` (e.g., "Hour"), `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`. The AM/PM toggle is a `button` with `aria-pressed`. The group is wrapped with `role="group"` and `aria-label` matching the field label.
- Focus rules: Tab enters at the first segment and cycles through segments and the AM/PM toggle before exiting. Arrow keys navigate within the control.
- Contrast: segment text, delimiter, and AM/PM toggle text must meet WCAG AA contrast using design tokens.
- Reduced motion: suppress any transition on toggle state change.

---

## 6. Theming Rules

- Required tokens: segment border, focused border, error border, segment background, delimiter text color, AM/PM toggle background, AM/PM toggle text, disabled opacity, space tokens, typography scale token.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; segment backgrounds and borders must remain legible against dark surfaces.

---

## 7. Composition Rules

- What can wrap it: form field wrappers, scheduling forms, modal date-time pickers, filter panels. Must be a descendant of the design system Provider.
- What it may contain: individual time segment inputs, colon delimiters, and an optional AM/PM toggle. May be paired externally with a DatePicker for a combined DateTime entry experience.
- Anti-patterns:
  - Do not combine date and time selection within this single component — compose DatePicker + TimePicker externally.
  - Do not hardcode 12-hour vs 24-hour format — accept it as a prop.
  - Do not embed timezone conversion logic inside the component.

---

## 8. Performance Constraints

- Memoization: the component should be memoized; re-renders occur only when the value or disabled state changes.
- Virtualization: not applicable.
- Render boundaries: time formatting and parsing logic must be handled outside the component and passed via controlled props or a utility function.

---

## 9. Test Requirements

- Rendering: renders correctly with no value, a valid time value, and an error state.
- Digit entry: typing fills the focused segment and auto-advances on two-digit completion.
- Arrow key increment/decrement: values increment and decrement correctly with wrapping.
- AM/PM toggle: switching AM/PM updates the value and announces the change.
- Keyboard navigation: Arrow Left/Right and Tab move between segments as specified.
- Controlled mode: value and onChange from parent are respected.
- Disabled state: no interaction is accepted.
- Accessibility: spinbutton roles, aria-valuenow, group role, and live region are present.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: no transition animation occurs when motion is reduced.
