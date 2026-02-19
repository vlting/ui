# Component Spec — PasswordStrengthMeter

## 1. Purpose

Provides real-time visual feedback on the strength of a password as the user types, helping them understand whether their chosen password meets security expectations. Used adjacent to password input fields during account creation or password change flows.

Do NOT use this component in login forms (where strength feedback is irrelevant), standalone without a password input, or as a primary form validation mechanism.

---

## 2. UX Intent

- Primary interaction goal: give users immediate, non-blocking feedback on password quality so they can improve it before submission without guessing at the rules.
- Expected user mental model: a segmented progress bar or series of indicator segments whose fill and color change as password complexity increases, paired with a brief textual strength label.
- UX laws applied:
  - Doherty Threshold: strength feedback must update within 400 ms of each keystroke to feel responsive.
  - Aesthetic-Usability Effect: a clean, well-proportioned meter encourages users to engage with it and improve their password rather than ignoring it.
  - Gestalt (Continuity): segmented bar reads as a single continuous spectrum from weak to strong.
  - Jakob's Law: weak/fair/strong labeling matches familiar patterns from popular registration flows.

---

## 3. Visual Behavior

- Layout: a horizontal segmented bar beneath or beside the password input, accompanied by a short strength label (e.g., "Weak," "Fair," "Strong," "Very Strong"). The number of segments corresponds to the number of strength levels (typically 4).
- Spacing: the meter is separated from the password input by a consistent space token gap. Label text sits to the right of or below the bar.
- Typography: strength label uses the smallest body/caption text scale token. No bold text unless the "Very Strong" state warrants emphasis.
- Token usage: segment fill colors for each strength level use semantic token aliases (e.g., error, warning, success color tokens) to convey meaning without hardcoded values. Unfilled segment background uses a muted/surface token.
- Responsive behavior: the bar scales to fill the width of its container. On small screens, label text wraps if necessary.

---

## 4. Interaction Behavior

- States:
  - Empty: all segments unfilled; no label or a neutral placeholder label.
  - Weak: first segment fills with error/danger token color; label reads "Weak."
  - Fair: two segments fill with warning token color; label reads "Fair."
  - Strong: three segments fill with a positive/success-adjacent token color; label reads "Strong."
  - Very Strong: all segments fill with success token color; label reads "Very Strong."
- Controlled vs uncontrolled: this is a display-only component. It accepts a strength level (numeric or enum) or a raw password value as input and renders the corresponding visual state. It does not manage password state itself.
- Keyboard behavior: none — this is a presentational indicator. It does not receive keyboard focus.
- Screen reader behavior: the meter communicates strength level via an `aria-live` region so that each update as the user types is announced (e.g., "Password strength: Fair").
- Motion rules: segment fill transitions with a short duration token when strength level changes. Suppress transitions under reduced motion preference.

---

## 5. Accessibility Requirements

- ARIA: the meter element uses `role="meter"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` attributes reflecting the current strength on a numeric scale. An `aria-label` or `aria-labelledby` identifies it as "Password strength."
- Focus rules: the meter is not focusable. It must not intercept Tab navigation.
- Contrast: segment fill colors and the label text must meet WCAG AA contrast against the surrounding surface using design tokens.
- Reduced motion: suppress fill transitions; apply segment state changes immediately.

---

## 6. Theming Rules

- Required tokens: segment fill colors per strength level (mapping to semantic error, warning, success token aliases), unfilled segment background, label text color, space tokens (gap, margin), typography scale token for label.
- Prohibited hardcoded values: no hardcoded colors (including strength-level specific hex values), spacing, or font sizes.
- Dark mode: all token references must resolve appropriately in dark mode; semantic color tokens for error, warning, and success must remain legible and meaningful against dark surfaces.

---

## 7. Composition Rules

- What can wrap it: form field wrappers, password input sub-sections, account creation forms. Must be a descendant of the design system Provider.
- What it may contain: only the segmented bar and the strength label text. No interactive elements.
- Anti-patterns:
  - Do not use this component as the sole form of password validation feedback — it supplements, not replaces, explicit validation messages.
  - Do not embed password-scoring business logic inside the component — accept a computed strength level as a prop.
  - Do not make the meter focusable or keyboard-interactive.

---

## 8. Performance Constraints

- Memoization: the component should be memoized; re-renders should only occur when the strength level prop changes.
- Virtualization: not applicable.
- Render boundaries: strength computation (e.g., entropy calculation, rule checking) must happen outside the component and be passed in as a prop value.

---

## 9. Test Requirements

- Rendering: renders correctly for each strength level (empty, weak, fair, strong, very strong).
- Segment fill: correct number of segments are filled for each strength level.
- Color tokens: segment colors correspond to the correct semantic token alias at each level.
- Label text: correct textual label is displayed for each strength level.
- ARIA: `role="meter"` is present; `aria-valuenow` reflects the current level; `aria-label` is set.
- Live region: strength label updates are announced to screen readers on change.
- No focus: the meter does not appear in Tab order.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: no transition animation occurs when motion is reduced.
