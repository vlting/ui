# Component Spec — PurchaseOrderForm

## 1. Purpose

Presents the structured form layout for creating or editing a purchase order in an ERP context. It organizes fields such as supplier selection, line items, quantities, pricing, and delivery details into a cohesive, guided form surface.

Use when: an operator needs to draft, review, or amend a purchase order.

Do NOT use when: displaying a read-only summary of an already-submitted order (use a detail/read view instead), or when only a single field needs to be edited in isolation.

---

## 2. UX Intent

- Primary interaction goal: guide the operator through all required purchase order fields with minimal friction and clear validation feedback.
- Expected user mental model: a structured paper form or ERP data-entry screen, with logical section groupings and a clear submission action.
- UX laws applied:
  - Tesler's Law: the form manages inherent complexity (line items, totals, supplier data) so the operator does not have to.
  - Hick's Law: group fields into logical sections (supplier, line items, delivery, notes) to reduce cognitive load per section.
  - Doherty Threshold: validation feedback appears promptly after field blur or submission attempt to maintain operator momentum.
  - Fitts's Law: primary action (submit/save) is large and positioned at a consistent, reachable location.

---

## 3. Visual Behavior

- Layout: vertical stack of labeled sections; each section groups semantically related fields.
- Section headings use a heading scale token; field labels use a label scale token; input values use a body scale token.
- Spacing: consistent vertical rhythm between sections and between fields within a section, driven by space tokens.
- Token usage: section background, border, label, input surface, and action button colors all sourced from theme tokens.
- Responsive behavior: on narrow viewports, multi-column field rows collapse to single-column stacks. Touch targets for all interactive elements meet minimum size requirements.

---

## 4. Interaction Behavior

- States:
  - Idle: form displays with default field and label styling.
  - Focus: focused field receives a visible focus ring and active border color token.
  - Error: fields with validation errors display an inline error message and error border color token.
  - Disabled: disabled fields are visually de-emphasized with muted color tokens and are not interactive.
  - Loading/Submitting: the form enters a non-interactive state during submission; a loading indicator appears on or near the submit action.
  - Success: optional success feedback communicates that the order was submitted.
- Controlled vs uncontrolled: the form layout is presentation-only; field value management is handled by the consuming context.
- Keyboard behavior:
  - Tab navigates forward through all interactive fields and actions in document order.
  - Shift+Tab navigates backward.
  - Enter within a text field does not submit the form unless that is the sole field.
  - Enter on the submit button triggers submission.
- Screen reader behavior:
  - Each field is associated with its label via accessible labeling.
  - Error messages are announced via live regions or `aria-describedby` associations.
  - Section groupings are communicated with appropriate landmark or group roles.
- Motion rules: any transition on field focus or error state appearance respects reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: form container uses `role="form"` or is a `<form>` equivalent. Each field group uses `role="group"` with an accessible name. Error messages are linked to their fields via `aria-describedby`.
- Focus: focus order follows visual reading order. No focus traps except within modal sub-components.
- Contrast: all labels, input text, placeholder text, and error messages meet WCAG AA contrast ratios.
- Reduced motion: suppress any animated transitions on field state changes when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: form background, section background, border (default, focus, error), label text, input text, placeholder text, error text, action button colors.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve correctly in both light and dark themes; error and focus states must remain distinguishable in dark mode.

---

## 7. Composition Rules

- What can wrap it: page layout containers, modal/sheet bodies, multi-step wizard steps.
- What it may contain: FieldWrapper, Label, InlineError, HelperText, form input components, line item sub-tables, action buttons (via FormContainer.Actions or equivalent slot).
- Anti-patterns:
  - Do not embed unrelated business logic or data fetching directly in the form layout.
  - Do not use PurchaseOrderForm for non-purchase-order contexts; use FormContainer for generic form layouts.
  - Do not nest PurchaseOrderForm inside another PurchaseOrderForm.

---

## 8. Performance Constraints

- Memoization: static sections and field groups should not re-render when unrelated fields change.
- Virtualization: line item lists exceeding a practical threshold should support virtualized rendering.
- Render boundaries: isolate line item list rendering from top-level form header re-renders.

---

## 9. Test Requirements

- Render: form renders all expected sections and fields.
- Validation display: error state shows inline error messages on affected fields; error tokens are applied.
- Disabled state: disabled fields are not interactive and are visually de-emphasized.
- Loading state: submit action shows loading indicator during submission; form is non-interactive.
- Keyboard navigation: Tab moves through all fields in order; submit button is reachable and activatable via keyboard.
- Accessibility: all fields have associated labels; error messages are linked via `aria-describedby`; section groups have accessible names.
- Theming: no hardcoded color values; dark mode tokens apply correctly.
- Reduced motion: field state transition animations are suppressed when reduced motion preference is active.
