# Component Spec — DragAndDropZone

## 1. Purpose

Provides a designated surface that accepts files or other draggable items via drag-and-drop gestures, offering a clear visual target and feedback during the drag interaction. It serves as a complement or alternative to traditional file input controls.

Use when: the user needs to upload or transfer one or more files by dragging from their desktop or file manager.

Do NOT use when: drag-and-drop is not supported by the target platform (always provide a fallback file input), or when only a single predefined option must be chosen (use a Select or RadioGroup instead).

---

## 2. UX Intent

- Primary interaction goal: make file or item submission feel effortless and direct by providing a large, clearly afforded drop target.
- Expected user mental model: a drop zone — a bordered, labeled area that says "drag your files here," analogous to email attachment areas and cloud storage upload UIs.
- UX laws applied:
  - Fitts's Law: the drop zone is generously sized to maximize the chance of a successful drop.
  - Jakob's Law: follows established drag-and-drop upload zone conventions from cloud storage and form builders.
  - Gestalt (Figure/Ground): a distinct border, background, and label clearly delineate the drop zone from surrounding content.
  - Doherty Threshold: drag-over feedback (visual state change) appears immediately on drag entry.

---

## 3. Visual Behavior

- Layout: a rectangular region with a dashed or solid border, centered label/icon, and optional secondary instructional text. Expands to fill its container width.
- Default state: dashed border and muted background, with an upload icon and instructional text.
- Drag-over state: border becomes solid and uses an accent/primary color token; background receives a tinted fill token to indicate acceptance.
- Rejected state (invalid file type/size): border and background shift to an error/danger token to indicate the item cannot be accepted.
- Accepted state: a brief success indication before transitioning to a file list or preview.
- Typography: primary instruction uses a label scale token; secondary text uses a caption scale token.
- Spacing: internal padding driven by space tokens; icon and text are vertically centered.
- Token usage: border, background (default, hover, drag-over, rejected), icon, and text colors sourced from theme tokens.
- Responsive behavior: adapts to the container width; on touch devices, falls back to presenting only the file browse button.

---

## 4. Interaction Behavior

- States:
  - Idle: default appearance; awaiting drag or click-to-browse action.
  - Drag over (valid): accepts the dragged item; applies drag-over visual state.
  - Drag over (invalid): rejects the dragged item; applies rejected visual state.
  - Drag leave: returns to idle state.
  - Drop: item is released; processing begins.
  - Disabled: zone is non-interactive; visually muted; does not accept drag or click events.
- Keyboard/pointer fallback: the zone must include a visible "browse files" button or link that opens the native file picker; this is the primary mechanism on touch devices and for keyboard users.
- Keyboard behavior:
  - Tab moves focus to the zone or its browse button.
  - Enter or Space on the zone or browse button opens the native file picker.
- Screen reader behavior:
  - The zone has an accessible label describing its purpose (e.g., "Upload files: drag and drop or browse").
  - Drag events are supplemented by the keyboard-accessible browse button.
  - State changes (drag-over, rejected) are announced via live regions.
- Motion rules: drag-over state transition respects reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: zone container has an `aria-label` describing its purpose. Browse button has an accessible label. A live region announces drag state changes and drop results.
- Focus: the zone or its browse button is focusable via Tab; focus ring is visible and meets contrast requirements.
- Contrast: all text, icons, and border states meet WCAG AA contrast ratios against their respective background tokens.
- Fallback: a keyboard-accessible alternative (browse button) must always be present; drag-and-drop cannot be the only interaction method.
- Reduced motion: drag-over state transition animation is suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: border (default, drag-over, rejected, disabled), background (default, drag-over, rejected, disabled), icon color, label text, secondary text, browse button colors, focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve to accessible, distinguishable values in dark mode; drag-over and rejected states must remain clearly distinguishable.

---

## 7. Composition Rules

- What can wrap it: form sections, FileUploader, FieldWrapper.
- What it may contain: an icon slot, a primary instruction text slot, a secondary instruction text slot, a browse button slot, an optional file preview/list slot.
- Anti-patterns:
  - Do not remove the keyboard-accessible browse button; drag-and-drop cannot be the sole input method.
  - Do not use DragAndDropZone for non-file drag interactions (use a dedicated sortable list component for reordering).
  - Do not nest DragAndDropZone inside another DragAndDropZone.

---

## 8. Performance Constraints

- Memoization: the zone should not re-render unless its drag state or disabled state changes.
- Virtualization: not applicable.
- Render boundaries: drag state is local to the component; file handling callbacks are passed as props.

---

## 9. Test Requirements

- Render: zone renders with default idle appearance including icon, instruction text, and browse button.
- Drag over (valid): drag-over state applies the correct visual tokens.
- Drag over (invalid): rejected state applies the error/danger tokens.
- Drag leave: idle state is restored after drag leaves.
- Drop: drop event triggers the onDrop callback with the dropped items.
- Browse: activating the browse button opens the native file picker.
- Keyboard: Tab reaches the browse button; Enter/Space activates it.
- Disabled: zone is non-interactive when disabled; visually muted.
- Accessibility: accessible label is present; live region announces state changes; browse button has accessible label.
- Theming: token-based colors apply; no hardcoded values; dark mode tokens resolve correctly.
- Reduced motion: drag-over transition animation is suppressed when reduced motion preference is active.
