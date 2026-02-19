# Component Spec — AuthProfileEditor

## 1. Purpose

AuthProfileEditor presents a form-like UI for viewing and editing the authenticated user's core identity fields — such as display name, username, email address, and profile photo reference. It is the presentation surface for account identity management within an authentication context.

Use it on profile settings pages, onboarding flows, or account management screens where identity fields need to be modified.

Do NOT use it for editing non-identity user preferences (use domain-specific settings panels instead), nor for editing other users' profiles.

---

## 2. UX Intent

- Primary interaction goal: allow the user to review and update their identity information with clear field labels, inline validation feedback, and an explicit save action.
- Expected user mental model: a standard settings form — predictable label-above-field layout, familiar to users of any account settings screen (Jakob's Law).
- UX laws applied:
  - Jakob's Law: mirror common profile editing conventions (name field, email field, avatar at the top).
  - Tesler's Law: complexity of validation (uniqueness checks, format rules) is handled by the system, not exposed as user burden.
  - Doherty Threshold: feedback on field validity should appear within 400ms of input.
  - Fitts's Law: save and cancel actions must be large, clearly labeled, and reachable without scrolling on common viewport sizes.

---

## 3. Visual Behavior

- Layout: single-column vertical stack with labeled fields; avatar/photo area appears above identity fields.
- Field labels sit above their inputs (not inline placeholder-only labels).
- Inline error and hint messages appear below each field using caption-scale typography.
- Save and cancel actions are grouped at the bottom (or top on mobile) of the form.
- Spacing between field groups uses space tokens.
- On wide viewports, the layout may adopt a two-column arrangement for certain field pairs (e.g., first name / last name).
- Component width is constrained to a readable max-width; it does not stretch to fill ultra-wide containers.

---

## 4. Interaction Behavior

- States per field: idle, focused, filled, error, disabled, read-only.
- Form-level states: pristine (no changes), dirty (unsaved changes), submitting, error, success.
- Controlled and uncontrolled field values both supported via prop interface.
- Keyboard behavior:
  - `Tab` / `Shift+Tab` move focus through fields in document order.
  - `Enter` in a single-line field submits the form if no other field has focus.
  - `Escape` reverts unsaved changes to the last saved state (with confirmation if significantly dirty).
- Screen reader behavior: each field announces its label, current value, and any error message when focused. Form-level errors are announced via a live region.
- Motion: field focus transitions (border color, shadow) are instant or use a very short duration; respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- Each input has an associated `<label>` (or `aria-label` / `aria-labelledby`) and is linked to any error message via `aria-describedby`.
- Required fields are marked with `aria-required="true"`.
- Error messages use `role="alert"` or are associated via `aria-describedby` so screen readers announce them on focus.
- Form submit button is a native button element (or has `role="button"`).
- All interactive elements meet WCAG AA contrast requirements (4.5:1 for text, 3:1 for UI components).
- Focus order matches visual reading order.
- Reduced motion: no animated transitions on validation state changes.

---

## 6. Theming Rules

- Required tokens: input background, input border, input border-focused, input border-error, label text color, placeholder text color, error text color, hint text color, button background, button text, surface background.
- Prohibited hardcoded values: no raw color hex/rgb, no pixel font sizes, no hardcoded padding values.
- Dark mode: all token references resolve under the active theme; error and success states remain distinct in both light and dark contexts.

---

## 7. Composition Rules

- May be wrapped by: page containers, modal dialogs, settings panels, onboarding step wrappers.
- May contain: text input fields, email input, avatar uploader slot (accepts AvatarUploader as a child or sub-component), action buttons (save, cancel), section dividers.
- Anti-patterns:
  - Do not embed API calls or auth logic inside this component.
  - Do not use this component for non-identity settings (e.g., notification preferences).
  - Do not nest AuthProfileEditor inside another AuthProfileEditor.

---

## 8. Performance Constraints

- Individual field components should be memoized to prevent full-form re-renders on single-field changes.
- Validation callbacks should be debounced (minimum 300ms) for async checks (e.g., username availability).
- The component must not perform any network requests itself.

---

## 9. Test Requirements

- Renders all provided field values correctly.
- Dirty state is detected when any field value differs from the initial value.
- Save action fires with the current field values as the payload.
- Cancel action reverts fields to initial values.
- Field-level error messages render and are linked to their inputs.
- Required field validation fires on blur and on form submission attempt.
- Disabled state prevents all input interaction and disables the save button.
- Keyboard navigation visits all fields and action buttons in order.
- Accessibility: no axe violations; all inputs have accessible labels; error messages are announced.
- Reduced motion: no animation on state transitions when `prefers-reduced-motion` is active.
