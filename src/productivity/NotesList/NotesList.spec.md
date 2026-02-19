# Component Spec — NotesList

## 1. Purpose

Displays an ordered collection of notes as a scrollable list of entries. Each entry communicates enough summary information for the user to identify and navigate to a specific note without opening it.

Use when: presenting multiple notes for browsing, selection, or search-result display within a notes-taking workflow.

Do NOT use when: only a single note is being displayed (render the note content directly), or when a different data type such as tasks or events is being listed.

---

## 2. UX Intent

- Primary interaction goal: Allow users to quickly scan, identify, and select a note from their collection.
- Expected user mental model: Users expect a notes list to behave like a sidebar or inbox — a scannable column of items with titles and previews (Jakob's Law from apps like Apple Notes, Notion, Bear).
- UX laws applied:
  - Jakob's Law: Match the sidebar-list pattern familiar from popular note-taking applications.
  - Gestalt (Similarity and Proximity): Each note entry is a visually consistent unit. Entries are evenly spaced to imply a flat, same-level hierarchy.
  - Miller's Law: Show only the most essential metadata per entry (title, timestamp, preview snippet) to avoid overloading the user.
  - Hick's Law: If a large number of notes exists, filtering or search must be available to reduce decision time.
  - Fitts's Law: Each note entry must have a large enough tap target on mobile (minimum 44pt height).

---

## 3. Visual Behavior

- Layout rules:
  - Vertical stack of note entries, each entry occupying a full-width row.
  - Entries are separated by a divider or consistent gap token.
  - An empty state is rendered when no notes exist.
  - An optional header area may house a search input or filter controls above the list.
  - The selected note entry is visually distinguished from unselected entries.
- Spacing expectations: Internal entry padding and inter-entry gap use space tokens. The list itself has no additional horizontal padding beyond its container.
- Typography rules: Note title uses a body/label token at medium weight. Preview snippet uses a caption token. Timestamp uses a small caption token in secondary color.
- Token usage: All colors for background, text, dividers, and selected state must use design tokens.
- Responsive behavior: On narrow viewports the list fills the full width. On wider layouts it typically occupies a fixed-width sidebar column.

---

## 4. Interaction Behavior

- States:
  - Idle: List visible, no item selected (or previously selected item highlighted).
  - Hover (web): Hovered entry shows a subtle background highlight.
  - Focus: Focused entry shows a visible focus ring.
  - Selected: The active note entry is highlighted with an accent background token.
  - Empty: An empty state message and optional call-to-action are displayed.
  - Loading: Skeleton placeholder entries are displayed while data loads.
- Controlled vs uncontrolled: The selected note ID is a controlled prop. The parent manages selection state.
- Keyboard behavior:
  - Arrow Up / Arrow Down navigate between entries.
  - Enter or Space opens/selects the focused entry.
  - Home / End move focus to the first / last entry.
  - The list container is a single Tab stop; internal navigation uses arrow keys.
- Screen reader behavior:
  - The list uses `role="listbox"` or `role="list"` with each entry as `role="option"` or `role="listitem"`.
  - The selected entry is announced with `aria-selected="true"`.
  - Entry accessible labels include the note title and timestamp.
  - The count of notes is available as a live region or through the list's accessible description.
- Motion rules: Selection highlight transitions are brief (under 150ms). List entrance animations are suppressed under reduced motion preference.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - `role="listbox"` with `aria-label` ("Notes") for an interactive selection list.
  - Each entry has `role="option"` with `aria-selected`.
  - Empty state is announced via `aria-live` or is a visible, accessible message.
- Focus rules: The list is a single Tab stop. Arrow keys move focus between entries. When the list gains focus, the previously selected entry or the first entry receives focus.
- Contrast expectations: Title text must meet 4.5:1. Preview and timestamp text must meet 3:1. Selected state background must preserve text contrast.
- Reduced motion behavior: All transition animations on selection or entry entrance are disabled.

---

## 6. Theming Rules

- Required tokens: list background, entry background (idle, hover, selected), text primary (title), text secondary (preview, timestamp), divider color, focus ring color, radius (for entry), space.
- Prohibited hardcoded values: No hardcoded hex values, pixel spacing, or font sizes.
- Dark mode expectations: Entry backgrounds and text tokens shift to dark-mode values. Selected state remains clearly distinct in dark mode.

---

## 7. Composition Rules

- What can wrap it: A split-pane layout container where NotesList occupies the sidebar and NotesEditor occupies the main panel.
- What it may contain: Individual note entry items (title, timestamp, preview), an empty state, a loading skeleton, and optionally a header with search/filter.
- Anti-patterns:
  - Do not embed the full note content within a NotesList entry — entries are summaries only.
  - Do not use NotesList for non-note data types (tasks, events).
  - Do not nest NotesList inside another NotesList.

---

## 8. Performance Constraints

- Memoization rules: Individual note entries must be memoized to prevent full-list re-renders when only the selection changes.
- Virtualization: For collections exceeding approximately 50 items, the list must use a virtualized scroll container to maintain performance.
- Render boundaries: Selecting a note must not trigger re-renders of the NotesEditor or any sibling component other than the NotesList itself.

---

## 9. Test Requirements

- What must be tested:
  - Correct number of note entries renders from the supplied data.
  - Empty state renders when the data array is empty.
  - The selected entry receives the selected visual treatment and `aria-selected="true"`.
  - Loading skeleton renders when the loading state is active.
- Interaction cases:
  - Clicking/tapping an entry fires the selection callback with the correct note ID.
  - Arrow key navigation moves focus between entries.
  - Enter/Space on a focused entry triggers selection.
  - Home/End move focus to the first/last entry.
- Accessibility checks:
  - `role="listbox"` and `role="option"` are present.
  - Selected entry has `aria-selected="true"`.
  - List has an accessible label.
  - Focus ring is visible on the focused entry.
  - Contrast ratios pass for title, preview, and timestamp in both themes.
  - Reduced motion suppresses transition animations.
