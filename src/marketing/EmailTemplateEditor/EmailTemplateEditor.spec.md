# Component Spec — EmailTemplateEditor

## 1. Purpose

Provides a structured editing surface for composing and previewing email marketing templates, including subject lines, body content areas, and variable placeholders.

Use when: allowing marketers or content authors to create or modify email templates within a campaign configuration workflow.

Do NOT use when: displaying a read-only preview of a sent email (use a read-only preview component) or editing arbitrary rich text outside the email context.

---

## 2. UX Intent

- Primary interaction goal: enable users to author email content confidently, with clear structure for subject, header, body, and footer sections.
- Expected user mental model: a structured form or WYSIWYG-style editor divided into named sections, familiar from email marketing platforms.
- UX laws applied:
  - **Tesler's Law** — the component absorbs the inherent complexity of multi-section email structure so the user edits in clearly labeled zones.
  - **Jakob's Law** — section labels and controls match conventions from known email editors (subject line at top, body below, footer last).
  - **Hick's Law** — toolbar or action options are minimal and contextually scoped to the active section.
  - **Doherty Threshold** — the editor surface must be immediately interactive on mount; no deferred rendering of editable zones.

---

## 3. Visual Behavior

- Layout: vertical stack of labeled sections — subject line, preheader, body, and footer — each clearly delineated.
- Each section has a visible label and an editable zone.
- A preview toggle or side-by-side panel may be composed alongside the editor by the consumer.
- Spacing: section gaps and internal padding reference space tokens.
- Typography: section labels use a label token; editable text within sections uses body tokens.
- Token usage: section borders, background, focus rings, and placeholder text colors reference theme tokens only.
- Responsive behavior: on narrow viewports the editor is single-column; on wider viewports it may support a split editor+preview layout.

---

## 4. Interaction Behavior

- States:
  - **idle**: sections rendered with existing or empty content.
  - **focused section**: the active section has a visible focus or active border.
  - **error**: a section with invalid content (e.g., empty subject) shows an inline error message.
  - **disabled**: the entire editor or individual sections can be disabled; non-interactive, reduced opacity.
  - **loading**: when template data is being fetched, a skeleton or placeholder occupies each section.
- Controlled/uncontrolled: content for each section is controlled externally; the component fires change callbacks per section.
- Keyboard behavior: `Tab` moves between sections and controls; within editable text zones, standard text editing shortcuts apply.
- Screen reader behavior: each section label is associated with its editable region via `aria-label` or `<label>` association.
- Motion rules: section focus transitions respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA: each editable section uses an appropriate ARIA role (`textbox`, `region`) with an accessible label.
- The subject line input must be a properly labelled form control.
- Error messages must be associated with their section via `aria-describedby`.
- Contrast: all text, placeholder, and label/background pairings meet WCAG 2.1 AA.
- Focus: focus must be visible in every editable zone; focus must not be trapped unintentionally.
- Reduced motion: suppress decorative section transitions.

---

## 6. Theming Rules

- Required tokens: `background`, `borderColor`, `borderColorFocus`, `color`, `colorMuted`, `colorError`, `backgroundError`, `space`, `borderRadius`, `focusStyle`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or font-size values.
- Dark mode: all tokens must resolve correctly in dark themes with sufficient contrast for editable zones.

---

## 7. Composition Rules

- May be composed inside a campaign configuration form or a modal.
- The consumer is responsible for providing initial content values and handling change/save events.
- A preview panel is a separate component composed alongside by the consumer; `EmailTemplateEditor` does not own preview rendering.
- Anti-patterns:
  - Do not implement send or save logic inside this component.
  - Do not hardcode section labels or placeholder text.
  - Do not fetch template data from an API inside this component.

---

## 8. Performance Constraints

- No internal data fetching or API calls.
- Large template content should not cause layout thrashing; the component should not measure DOM on every keystroke.
- Memoize stable sub-sections that do not depend on frequently changing state.

---

## 9. Test Requirements

- Renders all sections (subject, preheader, body, footer) from props.
- Fires a change callback with the updated value when a section is edited.
- Displays an error message for invalid sections.
- Disabled state renders all sections as non-interactive.
- Loading state renders visible placeholders.
- Each section label is correctly associated with its editable region.
- Focus is visible in every section when navigated by keyboard.
- Passes axe accessibility audit in idle, error, and disabled states.
