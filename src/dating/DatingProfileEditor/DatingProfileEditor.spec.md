# Component Spec — DatingProfileEditor

## 1. Purpose

Provides the UI surface for a user to create or update their own dating profile. It assembles the fields needed to define a datable identity: photos, display name, age, bio, gender, pronouns, interests, and discovery preferences.

Use when: a user is in the profile-setup onboarding flow or is editing their existing dating profile from a settings or profile screen.

Do NOT use for: viewing another user's profile, displaying a read-only profile summary, or managing account/security settings.

---

## 2. UX Intent

- Primary interaction goal: allow users to express their identity and preferences in a way that improves match quality — with minimal friction.
- Expected user mental model: users expect a form-like editor that is sectioned, scrollable, and saves state gracefully — similar to profile editors in mainstream social apps (Jakob's Law).
- UX laws applied:
  - Tesler's Law: the component manages the inherent complexity of multi-field profile editing; consumers pass structured data and callbacks.
  - Miller's Law: fields are grouped into logical sections (photos, basics, about, preferences) so no single view exceeds the user's working memory.
  - Progressive disclosure: advanced options (discovery radius, age range filters) are surfaced in a secondary section.
  - Hick's Law: each section presents a bounded set of choices to reduce decision paralysis.

---

## 3. Visual Behavior

- Layout: a vertically scrollable single-column form, sectioned by category.
- Section headings use a label-scale type token; field labels use a body-scale token; input values use the same or slightly larger body token.
- Spacing between sections is larger than spacing between fields within a section, creating clear visual grouping (Gestalt proximity).
- Photo section appears at the top; biographical fields follow; preferences and discovery settings appear at the bottom.
- On wider screens (tablet/desktop), fields may use a two-column grid layout within each section.
- Token usage: all background, border, text, and input surface colors from theme tokens.
- Responsive: single column on mobile, optional multi-column on tablet and above.

---

## 4. Interaction Behavior

- States per field: idle, focused, filled, invalid, disabled.
- The editor is controlled: the parent owns all field values and receives change callbacks.
- Inline validation feedback appears after a field loses focus (not on every keystroke) to reduce noise.
- A save or "Done" action is surfaced at the top (sticky) or bottom of the editor; it reflects a loading state while the parent processes the save.
- Keyboard behavior:
  - Tab moves forward through fields in document order.
  - Shift+Tab moves backward.
  - Enter within a single-line text field advances focus to the next field.
  - Dropdowns, selectors, and toggles follow their own keyboard conventions.
- Screen reader behavior: each field has an associated visible or `aria-label` label; error messages are announced live via `aria-live`.
- Motion: section reveal transitions (if paginated) respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- Every input field has a programmatically associated label (`htmlFor` / `aria-labelledby`).
- Required fields are marked with `aria-required="true"` and a visible indicator.
- Validation errors are associated with their field via `aria-describedby` and announced in an `aria-live` region.
- Photo upload area is keyboard and screen reader accessible with an appropriate role and label.
- Contrast: all labels, input text, and placeholder text meet WCAG AA contrast ratios.
- Reduced motion: disable any animated transitions between sections or steps.

---

## 6. Theming Rules

- Required tokens: `background`, `borderColor`, `color`, `placeholderColor`, semantic error token, focus ring token, and all spacing/radius tokens for field and section layout.
- Prohibited hardcoded values: no raw color values, no pixel-based spacing or border radius outside the token scale.
- Dark mode: input surfaces, labels, placeholder text, and error states must all resolve correctly via theme tokens.

---

## 7. Composition Rules

- What can wrap it: a screen or page layout component, a modal sheet, or a step in a multi-step onboarding flow.
- What it may contain: text inputs, a photo gallery uploader (PhotoGalleryUploader), an interest selector (InterestSelector), a location radius selector (LocationRadiusSelector), toggle switches, and select/dropdown controls.
- Anti-patterns:
  - Do not embed data-fetching or API calls inside the component.
  - Do not duplicate profile editor fields in sibling components on the same screen.
  - Do not use DatingProfileEditor for reading/displaying another person's profile.

---

## 8. Performance Constraints

- Each section should be independently renderable; avoid re-rendering the entire editor when a single field changes.
- Memoize field-level components and stable callbacks passed as props.
- The photo section may lazy-render its uploader UI until the user scrolls to it or taps to expand.
- No virtualization required for the form itself; individual photo lists within the uploader follow PhotoGalleryUploader's own constraints.

---

## 9. Test Requirements

- Renders all expected field groups: photos, name, age, bio, gender, interests, preferences.
- Controlled: changing a field value calls the corresponding `onChange` callback with the new value.
- Inline validation error is displayed after a required field is blurred while empty.
- Validation error is associated with the correct field via `aria-describedby`.
- Save button shows loading state while save is in progress.
- Save button is disabled when the form has validation errors.
- Tab order follows the visual document order.
- All fields have programmatically associated labels.
- Passes automated accessibility audit.
- No animated transitions when `prefers-reduced-motion` is active.
- Snapshot test for idle state and error state.
