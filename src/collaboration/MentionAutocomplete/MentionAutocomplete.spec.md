# Component Spec — MentionAutocomplete

## 1. Purpose

Presents a floating list of suggested users or entities when a mention trigger character (e.g., `@`) is typed within a text input or rich text editor. The user can select a suggestion to insert a mention reference into the content.

Use when: An input surface supports `@mention` functionality and needs to surface contextually relevant suggestions as the user types.

Do NOT use when: The input does not support structured mentions, or suggestions are for a purpose other than inserting entity references (use a general autocomplete/combobox component for those cases).

---

## 2. UX Intent

- Primary interaction goal: Reduce friction in referencing collaborators or entities by name — the user begins typing a name and selects from a short, filtered list rather than having to know exact identifiers.
- Expected user mental model: A familiar suggestion popover, identical in feel to `@mention` in Slack, Notion, or GitHub comments. The list appears immediately and narrows as the user types.
- UX laws applied:
  - Hick's Law: The suggestion list should be short (5-8 items maximum visible at once) to minimize decision time.
  - Fitts's Law: Suggestion items must have sufficient tap/click target height for comfortable selection on touch devices.
  - Doherty Threshold: The popover must appear within 400ms of the trigger character being typed to feel responsive.
  - Miller's Law: Limit visible items to roughly 7; additional results are accessible via scroll within the list.

---

## 3. Visual Behavior

- Layout: A floating popover anchored below the cursor insertion point (or below the trigger input). Contains a vertical list of suggestion items. Each item displays an avatar or icon, a primary label (name), and an optional secondary label (username, role, or entity type).
- Spacing: Items have consistent padding using spacing tokens. The popover has a shadow and border to visually separate it from the underlying content.
- Typography: Primary label in default body weight; secondary label in a muted/secondary style using a smaller size token.
- Token usage: Popover background, border, shadow, item hover/focus background, text colors, avatar placeholder colors — all from theme tokens.
- Responsive behavior: The popover must not overflow the viewport. If space below the cursor is insufficient, it should flip to appear above. On narrow viewports, the popover may expand to near-full width.

---

## 4. Interaction Behavior

- States:
  - Visible with results: Displays a filtered list of suggestions.
  - Loading: Displays a spinner or skeleton while suggestions are being resolved (for async sources).
  - No results: Displays an empty message such as "No matching users found."
  - Item highlighted: The currently focused item is visually highlighted.
- Controlled vs uncontrolled: Fully controlled. The parent provides the suggestion list, loading state, query string, and selection callback.
- Keyboard behavior:
  - Arrow Down / Arrow Up: Move highlight through the list.
  - Enter: Selects the highlighted item.
  - Escape: Dismisses the popover without selection.
  - Tab: Dismisses the popover (focus returns to the trigger input).
- Screen reader behavior: The popover is a live `role="listbox"` with `aria-label`. Each suggestion is `role="option"`. The currently highlighted option is indicated via `aria-activedescendant` on the trigger input.
- Motion rules: Popover appears with a subtle fade-in and slight upward scale. Reduced motion: appears instantly.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - Popover container: `role="listbox"`, `aria-label="Mention suggestions"` or equivalent.
  - Each item: `role="option"`, `aria-selected` reflecting highlight state.
  - Trigger input: `aria-autocomplete="list"`, `aria-controls` pointing to listbox, `aria-activedescendant` tracking highlighted item.
- Focus rules: Focus remains in the trigger input while the popover is open. The popover is navigated via keyboard without removing focus from the input.
- Contrast expectations: All text in the popover meets WCAG AA. Highlighted item background must provide sufficient contrast with item text.
- Reduced motion behavior: Fade and scale animations are suppressed.

---

## 6. Theming Rules

- Required tokens: popover background, popover border color, popover shadow, item default background, item hover/focus background, primary text, secondary/muted text, avatar placeholder background, focus ring color, spacing tokens for item padding, border radius token for popover and items.
- Prohibited hardcoded values: No hardcoded colors, px offsets, or z-index values.
- Dark mode expectations: Popover background uses a dark elevated surface token. Highlight state uses a dark-appropriate accent token.

---

## 7. Composition Rules

- What can wrap it: Must be rendered as a child of a positioning context (portal or popover layer) so it floats correctly over document content. Typically composed inside a `DocumentEditor` or rich text input context.
- What it may contain: A list of suggestion items. Each item contains an avatar/icon slot, a primary label, and an optional secondary label. May contain a loading indicator or an empty state message.
- Anti-patterns:
  - Do not embed user search/API logic inside this component.
  - Do not use this component for general autocomplete (hashtags, commands) — it is specifically for entity mentions.
  - Do not allow the popover to cover important content without an escape mechanism.

---

## 8. Performance Constraints

- Memoization rules: Suggestion items should be memoized. Re-renders should only occur when the suggestion list, loading state, or highlighted index changes.
- Virtualization: If the suggestion list can be very long (e.g., large organization), the parent should supply a pre-filtered short list. The component does not need to virtualize internally for the standard case.
- Render boundaries: No filtering, searching, or data-fetching logic inside this component.

---

## 9. Test Requirements

- What must be tested:
  - Renders the suggestion list correctly with provided items.
  - Renders a loading state indicator.
  - Renders an empty/no-results state.
  - Highlights the correct item on keyboard navigation.
  - Calls the selection callback when Enter is pressed on a highlighted item.
  - Calls the dismiss callback on Escape.
- Interaction cases:
  - Arrow Up/Down navigates through items, wrapping correctly at boundaries.
  - Enter selects the highlighted item.
  - Escape closes without selection.
  - Click on an item triggers selection.
- Accessibility checks:
  - `role="listbox"` and `role="option"` present and correct.
  - `aria-activedescendant` updates on navigation.
  - Focus remains in trigger input throughout.
  - Reduced motion: animations suppressed.
