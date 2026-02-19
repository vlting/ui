# Component Spec — OTPInput

## 1. Purpose

Provides a segmented input control for entering one-time passcodes (OTPs) or verification codes of a fixed length. Used in authentication flows, two-factor verification, and email/phone confirmation steps.

Do NOT use this component for free-form text input, variable-length codes, or general PIN entry where the number of digits is unknown.

---

## 2. UX Intent

- Primary interaction goal: allow users to enter a short numeric or alphanumeric code quickly, with automatic focus advancement between segments after each character is entered.
- Expected user mental model: a row of individual character boxes, each accepting exactly one character, with cursor automatically moving to the next box so users can type the code in a single uninterrupted motion.
- UX laws applied:
  - Fitts's Law: each segment box must be large enough to tap accurately on mobile.
  - Jakob's Law: the segmented box layout matches the familiar pattern used by major authentication flows (Google, Apple, bank apps), reducing learning curve.
  - Doherty Threshold: auto-advance between segments must be imperceptible (<400 ms) to maintain typing flow.
  - Gestalt (Proximity): segment boxes are grouped closely to read as a single unified input field.

---

## 3. Visual Behavior

- Layout: a horizontal row of equally sized input segment boxes, one per expected code character. Boxes are evenly spaced with a consistent gap token.
- Spacing: gap between segment boxes uses space tokens. Overall row padding uses space tokens.
- Typography: character inside each segment uses a monospaced or tabular-numeral font size token for alignment. Placeholder characters (dots, dashes) use muted color token.
- Token usage: box border, box background, focused box border, filled box background or text, error box border, and disabled colors must all use design tokens.
- Responsive behavior: segment boxes scale with available space; minimum touch target size must be met on all screen sizes. On very small screens, segment count and box size must not overflow horizontally.

---

## 4. Interaction Behavior

- States:
  - Idle: all boxes show placeholder or are empty; first box may receive autofocus.
  - Focused (segment): active segment has a distinct focus ring or highlighted border using token-based focus color.
  - Filled: each segment transitions to a filled visual state as characters are entered.
  - Complete: all segments are filled; may trigger an onChange or onComplete callback automatically.
  - Error: all boxes take error border color; error message rendered below the row.
  - Disabled: no interaction permitted; reduced opacity applied.
- Controlled vs uncontrolled: supports both patterns. Controlled mode accepts a value string and onChange callback. Uncontrolled mode manages the entered value internally.
- Keyboard behavior:
  - Typing a valid character fills the current segment and advances focus to the next.
  - Backspace clears the current segment and moves focus to the previous segment.
  - Arrow left/right navigate focus between segments without clearing content.
  - Paste of a full code string populates all segments in order.
  - Tab/Shift-Tab move focus out of the control to the next/previous focusable element.
- Screen reader behavior:
  - The control is announced as a single labeled input group (not as individual separate inputs to avoid verbosity).
  - Filled/empty states of segments are communicated via a live region after changes.
  - Error messages are announced via `aria-live="assertive"`.
- Motion rules: no animation required for segment fill; subtle focus ring transition is acceptable but must be suppressed under reduced motion preference.

---

## 5. Accessibility Requirements

- ARIA: the group of segments is wrapped in an element with `role="group"` and an `aria-label` matching the field label (e.g., "Verification code"). Individual segments have `aria-label` indicating position (e.g., "Digit 1 of 6").
- Focus rules: focus starts on the first empty segment. After pasting a full code, focus moves to the last segment. After clearing with Backspace, focus moves back one position.
- Contrast: segment box borders and filled character text must meet WCAG AA contrast using design tokens.
- Reduced motion: no transitions or animations on character entry.

---

## 6. Theming Rules

- Required tokens: segment border color, focused border color, error border color, filled background or text color, disabled opacity, box size, gap, font size token.
- Prohibited hardcoded values: no hardcoded colors, dimensions, or font sizes.
- Dark mode: box backgrounds and border colors must resolve correctly in dark mode via token references.

---

## 7. Composition Rules

- What can wrap it: form fields, authentication screens, verification dialogs. Must be a descendant of the design system Provider.
- What it may contain: individual character segment inputs and an optional hidden aggregated input for form submission compatibility.
- Anti-patterns:
  - Do not use this for free-form text fields.
  - Do not render an arbitrary number of segments based on dynamic unknown length without a defined maximum.
  - Do not submit or trigger navigation inside the component — delegate to parent via onComplete callback.

---

## 8. Performance Constraints

- Memoization: each segment should be memoized to prevent full row re-render on single character changes.
- Virtualization: not applicable; segment count is fixed and low (typically 4–8).
- Render boundaries: auto-submit or post-entry side effects must be handled by the parent via callbacks, not inside this component.

---

## 9. Test Requirements

- Rendering: renders the correct number of segment boxes for the given length prop.
- Character entry: typing fills the focused segment and advances focus to the next.
- Backspace: clears the current segment and moves focus to the previous.
- Paste: pasting a full-length string populates all segments correctly.
- Completion callback: onComplete fires when all segments are filled.
- Keyboard navigation: arrow keys navigate between segments; Tab exits the control.
- Controlled mode: value and onChange from parent are respected without internal drift.
- Error state: error border and message appear when an error is provided.
- Disabled state: no input is accepted when disabled.
- Accessibility: group role and aria-labels are present; live region announces completion and errors.
- Theming: renders correctly in light and dark token contexts.
