# Component Spec — TagInput

## 1. Purpose

Allows users to create, display, and remove a collection of free-form or predefined text tags within a single input control. Used in labeling, categorization, keyword entry, and recipient fields where users build a set of short text values.

Do NOT use this component for selecting from a bounded list of options (use MultiSelect), for numeric or structured data entry, or for single-value text input.

---

## 2. UX Intent

- Primary interaction goal: let users build a set of text tags by typing and confirming each one, while also being able to review and remove existing tags in the same surface.
- Expected user mental model: a text field that accumulates confirmed entries as inline chips to the left of the cursor, like an email recipient field or a tag field on a blog post editor.
- UX laws applied:
  - Jakob's Law: the chip-within-field pattern is widely established in email clients and tag pickers, making it immediately familiar.
  - Fitts's Law: chip remove buttons must be sized for easy tap on mobile.
  - Gestalt (Proximity): chips are grouped inline with the text cursor to read as a single collection field.
  - Miller's Law: when the tag count grows large, the component may visually collapse older tags with a "+N more" indicator.

---

## 3. Visual Behavior

- Layout: a bordered container that holds chips (confirmed tags) inline before a text input cursor. The container wraps across multiple lines as tags accumulate.
- Spacing: gap between chips, and between chips and the text cursor, uses space tokens. Padding inside the container uses space tokens.
- Typography: tag label text uses a small body text scale token. Input placeholder uses muted text color token.
- Token usage: container border, background, chip background, chip text, chip remove icon, focused border, error border, and disabled colors must all use design tokens.
- Responsive behavior: the container grows vertically as tags wrap; it does not overflow horizontally. On small screens the same inline-wrap behavior is maintained with appropriately sized chips and touch targets.

---

## 4. Interaction Behavior

- States:
  - Idle (unfocused with tags): chips are visible; container is at rest.
  - Idle (empty): placeholder text is visible.
  - Focused: container border changes to focused token color; cursor is active in the text input.
  - Typing: the text input cursor reflects the current in-progress tag text.
  - Tag confirmed: pressing Enter or the configured delimiter (e.g., comma, Tab) creates a new chip from the current input text and clears the input.
  - Error (invalid tag): if the entered tag fails validation (e.g., duplicate, too long), the input shakes or an inline error appears; the tag is not added.
  - Disabled: all interactions disabled; reduced opacity.
  - Error (field-level): container border takes error token color; field-level error message is rendered below.
- Controlled vs uncontrolled: supports both patterns. Controlled mode accepts a tags array and onChange callback. Uncontrolled mode manages the tag list internally.
- Keyboard behavior:
  - Enter or the delimiter key confirms the current input as a new tag.
  - Backspace on an empty input removes the last tag.
  - Backspace on a focused chip removes that chip.
  - Arrow Left/Right navigate focus between chips when the input is empty.
  - Tab moves focus out of the control (optionally also confirming the current in-progress text as a tag).
- Screen reader behavior:
  - The control announces as a labeled group. Each chip is announced with its text and a remove button labeled "Remove [tag text]."
  - New tag additions and removals are announced via a live region.
- Motion rules: chip entry may use a brief fade-in token animation suppressed under reduced motion. Chip removal may use a brief fade-out.

---

## 5. Accessibility Requirements

- ARIA: the container has `role="group"` with an `aria-label` matching the field label. Each chip remove button has `aria-label="Remove [tag text]"`. The text input has `aria-label` or is associated with the field label via `aria-labelledby`.
- Focus rules: Tab enters the text input by default. Arrow keys navigate between chips. Removing a chip moves focus to the adjacent chip or back to the text input.
- Contrast: chip text, chip background, and remove icon must meet WCAG AA contrast using design tokens.
- Reduced motion: suppress chip entry and exit animations; show/hide chips immediately.

---

## 6. Theming Rules

- Required tokens: container border, focused border, error border, container background, chip background, chip text color, chip remove icon color, disabled opacity, space tokens (gap, padding), typography scale token.
- Prohibited hardcoded values: no hardcoded colors, spacing values, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; chip backgrounds and borders must remain legible against dark surfaces.

---

## 7. Composition Rules

- What can wrap it: form field wrappers, filter bars, settings pages. Must be a descendant of the design system Provider.
- What it may contain: inline chip elements and the text input cursor. Optionally a dropdown of suggested completions (if autocomplete is supported) rendered below the container.
- Anti-patterns:
  - Do not embed tag validation or persistence logic inside the component — delegate via onAdd/onRemove callbacks.
  - Do not use for selecting from a predefined exhaustive list — use MultiSelect for that purpose.
  - Do not nest inside another TagInput.

---

## 8. Performance Constraints

- Memoization: individual chip components should be memoized to prevent full-list re-render on each new tag addition.
- Virtualization: if the tag count can exceed approximately 30 items, consider virtualizing the chip list.
- Render boundaries: autocomplete suggestion fetching must not be performed inside the component — accept suggestions as a prop.

---

## 9. Test Requirements

- Rendering: renders with no tags, with several tags, and with a max-tag count reached.
- Tag creation: pressing Enter or the delimiter key creates a chip from the input text.
- Backspace removal: Backspace on empty input removes the last tag; Backspace on a focused chip removes that chip.
- Keyboard navigation: Arrow keys navigate between chips; Tab exits the control.
- Duplicate/validation: invalid tags are rejected with an error state; valid tags are added.
- Controlled mode: tags array and onChange from parent are respected.
- Disabled state: no interaction is accepted.
- Accessibility: group role, chip remove button labels, live region announcements are all present.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: no animation on chip add or remove.
