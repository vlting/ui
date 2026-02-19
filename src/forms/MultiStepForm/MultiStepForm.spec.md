# Component Spec — MultiStepForm

## 1. Purpose

Breaks a long or complex form into a sequence of discrete, manageable steps presented one at a time. Used when a form contains many fields that benefit from logical grouping, progressive disclosure, or a guided wizard-style flow (e.g., onboarding, checkout, account setup).

Do NOT use this component for simple single-screen forms, or when all fields must be visible simultaneously for comparison or review.

---

## 2. UX Intent

- Primary interaction goal: guide the user through a predefined sequence of form sections with clear orientation, progress feedback, and the ability to move forward and backward.
- Expected user mental model: a step-by-step wizard with a visible progress indicator showing where they are and how many steps remain.
- UX laws applied:
  - Hick's Law: presenting one step at a time reduces the number of simultaneous decisions, lowering cognitive load.
  - Miller's Law: step groupings should cluster related fields to keep each step within a manageable scope (approximately seven fields or fewer per step).
  - Tesler's Law: inherent complexity is preserved but distributed across steps; do not hide required information behind too many clicks.
  - Doherty Threshold: step transitions must complete within 400 ms, including any validation feedback that prevents forward navigation.
  - Zeigarnik Effect (implied by progress indicators): showing partial completion motivates users to continue.

---

## 3. Visual Behavior

- Layout: a vertical stack containing a step indicator (top), the active step content (middle), and a navigation control area (bottom: Back, Next/Submit buttons).
- Spacing: padding around step content and between navigation controls uses space tokens.
- Typography: step title uses a heading scale token; step description uses body text token; step count uses secondary/muted text token.
- Token usage: step indicator active/completed/inactive colors, button colors, content background, and divider colors must all use design tokens.
- Responsive behavior: layout remains single-column on small screens; navigation buttons stack vertically on very narrow viewports. Step indicator may condense to a compact progress bar on mobile.

---

## 4. Interaction Behavior

- States:
  - Idle (step active): current step content is visible; navigation controls are enabled.
  - Validating: on Next press, the active step validates; a loading or processing indicator may appear briefly.
  - Error (step invalid): validation errors surface inline within the step; Next navigation is blocked; errors announced to screen readers.
  - Completed step: step indicator marks prior steps as completed.
  - Final step: Next button label changes to Submit (or equivalent).
  - Disabled (navigation): Back is hidden or disabled on the first step; forward navigation is disabled until validation passes.
- Controlled vs uncontrolled: supports both patterns. In controlled mode, the parent manages the current step index and change callbacks. In uncontrolled mode, the component manages step progression internally.
- Keyboard behavior:
  - Tab navigates through focusable elements within the active step and the navigation controls.
  - Enter on Next/Submit triggers forward progression.
  - Enter on Back triggers backward progression.
  - No keyboard shortcut jumps directly to arbitrary steps (prevents accidental step skipping).
- Screen reader behavior:
  - Active step title is announced on step change via a live region or focus management.
  - Step indicator communicates current step number, total steps, and completion status of prior steps.
  - Validation errors are announced immediately via `aria-live="assertive"` or equivalent.
- Motion rules: step transition (entering/exiting content) uses a short directional slide or fade animation only when reduced motion is not preferred.

---

## 5. Accessibility Requirements

- ARIA: the step content region uses `role="group"` with an `aria-labelledby` pointing to the step title. The step indicator list uses appropriate list semantics. Navigation buttons have clear, descriptive labels.
- Focus rules: on step transition, focus moves to the step title or the first focusable element in the new step to orient screen reader users.
- Contrast: step indicator states (active, completed, inactive) must all meet WCAG AA contrast against their backgrounds using design tokens.
- Reduced motion: disable slide/fade transitions; switch step content immediately.

---

## 6. Theming Rules

- Required tokens: step indicator active color, completed color, inactive color, connector line color, content background, navigation button colors (primary, secondary), error color, disabled opacity, space (padding, gap), typography scale.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all indicator and background tokens must resolve to appropriate dark-mode values without manual overrides.

---

## 7. Composition Rules

- What can wrap it: page layouts, modal bodies, drawer panels, onboarding screens. Must be a descendant of the design system Provider.
- What it may contain: a step indicator sub-component, individual step panels (each containing form fields and optional step-level description), and a navigation control area.
- Anti-patterns:
  - Do not embed data-fetching or submission API calls within this component — delegate via callbacks.
  - Do not allow free arbitrary step jumping without explicit opt-in (prevents data integrity issues).
  - Do not nest MultiStepForm inside another MultiStepForm.

---

## 8. Performance Constraints

- Memoization: inactive step content should be unmounted (not just hidden) by default to prevent unnecessary rendering. If mount retention is needed for animation, it must be explicitly opt-in.
- Virtualization: not applicable; step count is expected to be low (typically 3–8 steps).
- Render boundaries: validation logic executes outside the component and is passed in via props or callbacks.

---

## 9. Test Requirements

- Rendering: renders correctly at step 1, mid-flow steps, and the final step.
- Forward navigation: Next advances to the next step when validation passes.
- Backward navigation: Back returns to the previous step without data loss.
- Validation blocking: Next does not advance when the current step has validation errors; errors are visible.
- Final step: Submit action is triggered on the last step.
- Controlled mode: current step index and callbacks from parent are respected.
- Keyboard navigation: Tab, Enter on navigation buttons behave as specified.
- Focus management: focus moves to the new step's title or first field on step transition.
- Accessibility: step group labels, live region announcements for step change and errors.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: step transitions are immediate when motion is reduced.
