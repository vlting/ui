# Forms Playbook

## 1. Problem Space

Forms are the primary mechanism for collecting structured user input. This playbook covers modules that rely heavily on data entry: `auth` (login, registration, profile), `ecommerce` (checkout, shipping address), `hr` (time entry, leave requests), `crm` (contact forms), `erp` (purchase orders), `accounting` (expense entry), and any module requiring user-submitted data.

---

## 2. UX Laws Applied

- **Hick's Law** — Reduce visible fields. Show only what's needed at each step; use progressive disclosure for optional fields.
- **Tesler's Law** — Forms are inherently complex. Push complexity into the system (validation, formatting) rather than onto the user.
- **Fitts's Law** — Primary submit actions must be large, clearly labeled, and reachable at the bottom of the form or fixed in a footer.
- **Gestalt Proximity** — Group related fields visually. Billing fields belong together; shipping fields belong together.
- **Peak-End Rule** — Validation errors are pain points. Recovery must be fast, clear, and non-punishing. Completion states should be satisfying.
- **Doherty Threshold** — Inline validation feedback must appear promptly (< 400ms after blur or submission attempt).

---

## 3. Standard Layout Pattern

### Page Structure
```
<AppShell>
  <PageHeader title="..." />
  <Section>
    <FormContainer>
      <FieldWrapper> ... </FieldWrapper>
      ...
      <Button variant="primary">Submit</Button>
    </FormContainer>
  </Section>
</AppShell>
```

### Header Pattern
- Use `PageHeader` with a concise title and optional description.
- Avoid breadcrumbs on isolated form pages (e.g., checkout); use them on embedded forms within broader flows.

### Filters
- Not applicable to most form flows.
- For record-editing forms within list views, use `AnalyticsFilterBar` or search on the parent list, not within the form.

### Primary CTA
- A single `Button` with `variant="primary"` at the bottom of the form.
- Label clearly: "Save", "Submit", "Checkout", "Create Account" — never "OK" or "Yes".
- Use `disabled` state while form is invalid or submitting.

### Secondary CTA
- "Cancel" or "Back" as a secondary `Button` (`variant="secondary"` or `variant="ghost"`).
- Place to the left of or below the primary action.
- Multi-step forms use `MultiStepForm` with back/next navigation — never expose step skipping.

### Multi-Step Forms
- Use `MultiStepForm` for flows with 4+ fields across logical groupings (e.g., checkout, onboarding).
- Each step should be completable independently.
- Show step progress using the built-in step indicator.

---

## 4. Component Mapping

| Need | Component |
|------|-----------|
| Form container with consistent spacing | `FormContainer` |
| Field label + input + error grouping | `FieldWrapper` |
| Text label for field | `Label` |
| Single-line text input | `Input` |
| Multi-line text input | `TextArea` |
| Dropdown single selection | `Select` |
| Dropdown multi-selection | `MultiSelect` |
| Searchable dropdown | `Combobox` |
| Boolean toggle | `Switch` or `Checkbox` |
| Exclusive single selection | `RadioGroup` |
| Date input | `DatePicker` |
| Date range input | `DateRangePicker` |
| Time input | `TimePicker` |
| OTP / verification code | `OTPInput` |
| Tag/chip input | `TagInput` |
| Rich text editing | `RichTextEditor` |
| File/document upload | `FileUploader` |
| Drag-and-drop file zone | `DragAndDropZone` |
| Multiple image upload | `MultiImageUploader` |
| Password complexity feedback | `PasswordStrengthMeter` |
| Inline field error message | `InlineError` |
| Validation summary / tooltip | `ValidationMessage` |
| Helper text below field | `HelperText` |
| Multi-step form flow | `MultiStepForm` |
| Form submit / action | `Button` (primitives) |

---

## 5. Accessibility Rules

- Every `Input`, `Select`, `Checkbox`, `RadioGroup`, and `Switch` **must** be wrapped in `FieldWrapper`, which ensures the `Label` is programmatically associated via `htmlFor`/`id`.
- `InlineError` must use `role="alert"` so screen readers announce it immediately on validation failure.
- `HelperText` must be linked to the input via `aria-describedby`.
- `MultiStepForm` step indicators must communicate current step via `aria-current="step"`.
- `FileUploader` and `DragAndDropZone` must provide keyboard-accessible upload alternatives (a visible button that triggers the file picker).
- `OTPInput` must announce digit entry and completion state to screen readers.
- All form actions must be reachable and operable via keyboard without a mouse.
- Error states must never rely on color alone — always include an icon or text label alongside the color change.

---

## 6. Anti-Patterns

- **Placeholder as label** — Never use `placeholder` as a substitute for `Label`. Placeholders disappear on input and are not reliably read by assistive tech.
- **Walls of fields** — Do not present 10+ fields on a single screen. Use `MultiStepForm` or collapsible sections.
- **Disabled submit without explanation** — If the submit `Button` is `disabled`, explain why (e.g., highlight required empty fields).
- **Clearing on error** — Never clear user-entered values when a validation error occurs.
- **Ambiguous labels** — Labels like "Name" are ambiguous. Use "Full Name", "Company Name", etc.
- **Misusing `Switch` vs `Checkbox`** — Use `Switch` for immediate effect toggles (settings). Use `Checkbox` for options that take effect on submit.
- **Inline form submission** — Avoid forms that submit on every keystroke. Validate on blur; submit on explicit action.
- **Missing `PasswordStrengthMeter`** — All password creation fields must include `PasswordStrengthMeter`.

---

## 7. Variants

### Density Increase
- In dense admin contexts (e.g., `erp`, `hr`), reduce vertical spacing within `FieldWrapper` using compact spacing tokens.
- Consider two-column layouts for address/profile forms on wider screens using `Stack` with `flexDirection="row"`.

### Mobile Behavior
- Single-column layout always on mobile.
- `DatePicker` and `TimePicker` should trigger native pickers on mobile where supported.
- Bottom-sheet `Sheet` can be used for `Select`/`MultiSelect` on mobile for better touch targets.
- Submit `Button` should be full-width on mobile.

### Edge Cases
- **Empty required field on submit**: Immediately scroll to and focus the first invalid field.
- **Server-side errors**: Display using `ValidationMessage` at the top of the form, not just inline.
- **Autofill**: Ensure `Input` fields use correct `autoComplete` attributes so browser autofill works.
- **Long option lists in `Select`/`Combobox`**: Use search/filter within `Combobox` when the list exceeds ~10 items.
