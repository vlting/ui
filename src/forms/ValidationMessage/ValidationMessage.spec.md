# Component Spec — ValidationMessage

## 1. Purpose

Displays a contextual inline validation message (error, warning, success, or informational) associated with a form field. Used immediately below or adjacent to form inputs to communicate the result of field-level validation to the user.

Do NOT use this component for global form-level error summaries (use an AlertBanner or ErrorSummary), for non-field-related status messages (use a Toast or Alert), or for hints that are always visible regardless of validation state (use a HelperText component).

---

## 2. UX Intent

- Primary interaction goal: communicate field validation status clearly, immediately, and without ambiguity so users can correct errors before attempting form submission.
- Expected user mental model: a small text label below the input field that appears when validation fails (or passes), styled by severity with a matching icon.
- UX laws applied:
  - Doherty Threshold: validation messages must appear within 400 ms of the triggering event (blur, submit attempt) to feel responsive.
  - Gestalt (Proximity): the message must be visually adjacent to its associated input so users immediately understand which field it refers to.
  - Aesthetic-Usability Effect: a clear, concise, and well-styled message is more likely to be read and acted upon than an unstyled or verbose one.

---

## 3. Visual Behavior

- Layout: a single horizontal row of an optional icon (leading) followed by message text. Stacks vertically below the associated input field.
- Spacing: margin above the message (gap from input) uses space tokens. Icon-to-text gap uses space tokens.
- Typography: message text uses the smallest body/caption scale token. Text should be concise (one to two sentences maximum).
- Token usage: text color, icon color, and optional background (if badge-style) must all use semantic token aliases: error, warning, success, and info color tokens.
- Responsive behavior: message text wraps on narrow screens. Icon remains fixed-size. No horizontal overflow.

---

## 4. Interaction Behavior

- States:
  - Error: red/danger semantic token color for text and icon; message describes the validation failure.
  - Warning: amber/warning semantic token color; message describes a non-blocking concern.
  - Success: green/success semantic token color; message confirms valid input.
  - Info: neutral/info semantic token color; message provides contextual guidance.
  - Hidden: component is not rendered (or rendered with display:none/visibility:hidden) when there is no validation state to communicate.
- Controlled vs uncontrolled: this is a pure display component. It renders based on the `message` and `variant` (or `intent`) props provided. No internal state.
- Keyboard behavior: none — this is a non-interactive presentational element. It must not receive focus.
- Screen reader behavior: the message is surfaced via an `aria-live` region so that it is announced to screen readers immediately when it appears or changes. For error messages, `aria-live="assertive"` is appropriate; for success and info, `aria-live="polite"`.
- Motion rules: appearance may use a short fade-in token animation suppressed under reduced motion preference. No exit animation is required.

---

## 5. Accessibility Requirements

- ARIA: the element uses `aria-live` appropriate to its severity. Error messages should also be associated with their form field via `aria-describedby` on the input element (managed by the parent field wrapper).
- Focus rules: the element must not be focusable and must not interfere with Tab navigation.
- Contrast: text and icon colors at each severity level must meet WCAG AA contrast against the surface background using design tokens.
- Reduced motion: suppress fade-in animation; display message immediately.

---

## 6. Theming Rules

- Required tokens: error text/icon color, warning text/icon color, success text/icon color, info text/icon color, typography scale token for message text, space tokens for margin and gap.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all semantic token aliases must resolve to accessible values in dark mode without manual color overrides.

---

## 7. Composition Rules

- What can wrap it: form field wrappers, inline form field layouts. Must be a descendant of the design system Provider. Typically placed as a sibling immediately below an input element.
- What it may contain: an optional leading icon and message text only. No interactive elements, no nested inputs.
- Anti-patterns:
  - Do not use this for persistent hint text visible before any interaction — use a HelperText component.
  - Do not render multiple ValidationMessages stacked inside a single field wrapper for multiple errors; prefer a single composed message or a bulleted list within one instance.
  - Do not make this element focusable or interactive.

---

## 8. Performance Constraints

- Memoization: the component should be memoized; it re-renders only when `message` or `variant` props change.
- Virtualization: not applicable.
- Render boundaries: when `message` is empty or null, the component should not render any DOM node to avoid empty space in the layout.

---

## 9. Test Requirements

- Rendering: renders correctly for each variant (error, warning, success, info).
- Hidden state: renders nothing (or is visually hidden) when no message is provided.
- Icon presence: correct semantic icon is shown for each variant.
- Text display: the provided message string is rendered accurately.
- ARIA live region: the message is announced by screen readers on appearance and change.
- No focus: the element does not appear in Tab order.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: no fade-in animation occurs when motion is reduced.
- Contrast: text and icon colors meet AA contrast at each severity level.
