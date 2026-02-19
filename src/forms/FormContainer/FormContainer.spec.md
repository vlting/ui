# Component Spec — FormContainer

## 1. Purpose

Provides a standardized layout container for forms, organizing a form's title, description, field area, and action buttons (submit, cancel) into a consistent visual structure. It is a presentational shell that wraps form content without managing form state.

Use when: building a full-page, card, or modal form that requires a title, optional description, a body region for fields, and an actions region for primary and secondary buttons.

Do NOT use when: only a single field or minimal form content is needed without a titled section structure (use FieldWrapper directly), or when the form is embedded in a data table row (use inline editing patterns instead).

---

## 2. UX Intent

- Primary interaction goal: give every form a clear, readable structure so users immediately understand the form's purpose and how to complete and submit it.
- Expected user mental model: a labeled form panel with a clear heading, instructional text, form fields, and action buttons — analogous to a dialog form or a settings page section.
- UX laws applied:
  - Tesler's Law: FormContainer absorbs layout complexity (title, description, actions region) so individual forms remain focused on their fields.
  - Jakob's Law: follows the conventional form structure: title at top, fields in the middle, actions at the bottom.
  - Gestalt (Proximity): the title and description are grouped at the top; fields occupy the body; actions are separated at the bottom to signal finality.
  - Hick's Law: the actions region limits choices to primary and secondary actions.

---

## 3. Visual Behavior

- Layout: vertical stack with three regions: header (Title + Description), body (form fields), footer/actions (action buttons).
- Header: `FormContainer.Title` uses a heading scale token; `FormContainer.Description` uses a body scale token.
- Body: expands to fill available vertical space if needed; scrollable if content overflows the container.
- Actions (`FormContainer.Actions`): horizontally aligned buttons, right-aligned by default; stacks vertically on narrow viewports.
- Spacing: vertical gap between header, body, and actions driven by space tokens. Internal padding of the container driven by space tokens.
- Token usage: container background, border (if surfaced as a card), header text, description text, and action region styling sourced from theme tokens.
- Responsive behavior: actions stack vertically on narrow viewports; container width adapts to its parent.

---

## 4. Interaction Behavior

- The FormContainer itself is non-interactive.
- Focus management: Tab moves through all interactive field elements in the body, then through action buttons in the actions region, in document order.
- Controlled vs uncontrolled: FormContainer is purely presentational; all state is managed by child components.
- Screen reader behavior:
  - `FormContainer.Title` is rendered as a heading at the appropriate level, providing a landmark for the form section.
  - `FormContainer.Description` is read as body text.
  - The form region may use `role="form"` with `aria-labelledby` pointing to the Title.
- Motion rules: no inherent animations; any sub-component animations follow their own reduced-motion rules.

---

## 5. Accessibility Requirements

- ARIA: the outer container may use `role="form"` with `aria-labelledby` pointing to the `FormContainer.Title`. The title uses a semantically correct heading level. Description is associated with the form region.
- Focus: no focus trapping; Tab flows naturally through body fields and actions.
- Contrast: Title, Description, and all action button text meet WCAG AA contrast ratios.
- Reduced motion: no inherent animations in FormContainer; deferred to sub-components.

---

## 6. Theming Rules

- Required tokens: container background (if surfaced as a card), container border (if used), header text tokens, body text tokens, vertical and horizontal space tokens.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: container background and border tokens must resolve to accessible, distinguishable values in dark mode.

---

## 7. Composition Rules

- What can wrap it: page layout containers, modal/dialog bodies, card containers, multi-step wizard steps.
- What it may contain (via static properties):
  - `FormContainer.Title` — the form heading (required).
  - `FormContainer.Description` — optional descriptive text below the title.
  - Body children — FieldWrapper instances and form input components.
  - `FormContainer.Actions` — the row of submit/cancel action buttons.
- Anti-patterns:
  - Do not nest FormContainer inside another FormContainer.
  - Do not place FormContainer.Actions outside of FormContainer.
  - Do not use FormContainer for non-form content layouts (use a standard page section or card instead).

---

## 8. Performance Constraints

- Memoization: FormContainer is a layout shell; it should not re-render unless its structural props (title, description) change.
- Virtualization: not applicable at the container level; body field lists may implement virtualization independently.
- Render boundaries: body region content is the render unit; FormContainer header and actions should be stable across body re-renders.

---

## 9. Test Requirements

- Render: FormContainer renders Title, Description, body slot, and Actions in the correct structural order.
- Actions: FormContainer.Actions renders action buttons in the actions region; buttons are in the correct document order.
- Responsive: Actions stack vertically on narrow viewports.
- Focus order: Tab navigates through body fields then action buttons in document order.
- Accessibility: `role="form"` and `aria-labelledby` are present; Title is a semantic heading; Description is associated.
- Theming: token-based spacing and color apply; no hardcoded values; dark mode tokens resolve correctly.
