# Component Spec — FieldWrapper

## 1. Purpose

Provides a consistent structural container that groups a form field's Label, input control, error message, and helper text into a single, cohesive unit. It enforces layout and spacing conventions for all form fields across the design system.

Use when: wrapping any form field that requires a label, an input, and optional helper or error text.

Do NOT use when: only a standalone label or standalone error message is needed without an associated input (use Label, InlineError, or HelperText directly).

---

## 2. UX Intent

- Primary interaction goal: ensure every form field presents its label, input, error, and helper information in a predictable, consistent layout.
- Expected user mental model: a labeled form row — the universal pattern of label above (or beside) input, with helper text below and error text appearing when validation fails.
- UX laws applied:
  - Tesler's Law: FieldWrapper absorbs the complexity of field layout so each form does not need to reimplement it.
  - Jakob's Law: follows the established convention of label-input-error-helper vertical stacking.
  - Gestalt (Proximity): label, input, and supporting text are grouped tightly to communicate they belong together; fields are separated by space tokens.

---

## 3. Visual Behavior

- Layout: vertical stack (column) containing, in order: Label slot, Input slot, Error slot (conditional), Helper slot (conditional).
- Label and input are always adjacent; error appears below the input when present; helper text appears below error (or below input if no error).
- Spacing: vertical gap between each slot driven by space tokens. Horizontal padding is not added by the wrapper (the input handles its own padding).
- Token usage: the wrapper itself has no background or border; it is purely a structural layout container. Individual sub-components (Label, InlineError, HelperText) carry their own token-based styling.
- Responsive behavior: the wrapper stacks vertically on all viewport sizes. On wide viewports, a horizontal layout variant (label inline with input) may be supported.

---

## 4. Interaction Behavior

- The FieldWrapper itself is non-interactive.
- Focus management: Tab moves focus to the interactive input within the wrapper; the wrapper does not intercept or alter focus behavior.
- Sub-components:
  - `FieldWrapper.Label` renders the field label.
  - `FieldWrapper.Input` renders the input control slot (any form input).
  - `FieldWrapper.Error` renders the inline error message (conditionally).
  - `FieldWrapper.Helper` renders the helper text (conditionally).
- Controlled vs uncontrolled: the wrapper is always presentational; input value state is managed by the child input component.
- Screen reader behavior: the wrapper itself adds no ARIA roles. The Label sub-component must be associated with the input via `htmlFor`/`id` or `aria-labelledby`. The Error sub-component is associated with the input via `aria-describedby`.
- Motion rules: error slot appearance (e.g., slide-in or fade-in) respects reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: FieldWrapper has no required ARIA role. Label must be programmatically associated with the input. Error message must be linked to the input via `aria-describedby`. Helper text may be linked via `aria-describedby`.
- Focus: focus behavior is entirely delegated to the child input; FieldWrapper does not intercept Tab.
- Contrast: sub-components (Label, InlineError, HelperText) are responsible for their own contrast compliance.
- Reduced motion: any animation on Error slot entry is suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: vertical spacing tokens for the gap between slots. No color tokens are required on the wrapper itself.
- Prohibited hardcoded values: no hardcoded pixel spacing, margin, or padding values.
- Dark mode: the wrapper is transparent; dark mode is handled by each sub-component.

---

## 7. Composition Rules

- What can wrap it: form section containers, FormContainer, modal bodies, page form regions.
- What it may contain (via static properties):
  - `FieldWrapper.Label` — the field label.
  - `FieldWrapper.Input` — any input control (text input, select, combobox, date picker, etc.).
  - `FieldWrapper.Error` — the inline error message (zero or one per field).
  - `FieldWrapper.Helper` — helper/hint text (zero or one per field).
- Anti-patterns:
  - Do not nest FieldWrapper inside another FieldWrapper.
  - Do not place multiple input controls inside a single FieldWrapper (each input should have its own wrapper).
  - Do not use FieldWrapper for non-form contexts.

---

## 8. Performance Constraints

- Memoization: FieldWrapper is a structural layout container; it should not re-render unless its children or layout props change.
- Virtualization: not applicable.
- Render boundaries: FieldWrapper is transparent; individual sub-components are the render units.

---

## 9. Test Requirements

- Render: FieldWrapper renders its sub-components (Label, Input, Error, Helper) in the correct vertical order.
- Error visibility: FieldWrapper.Error renders when an error is present; does not render when no error is provided.
- Helper visibility: FieldWrapper.Helper renders when helper text is provided.
- Focus: Tab moves focus through the input inside the wrapper without interference from the wrapper itself.
- Accessibility: Label is associated with the input; Error is linked via `aria-describedby`; wrapper has no spurious ARIA roles.
- Theming: spacing tokens apply; no hardcoded spacing values.
- Reduced motion: Error slot entry animation is suppressed when reduced motion preference is active.
