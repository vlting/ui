# Component Spec — FileUploader

## 1. Purpose

Provides a complete file upload interface that combines a drag-and-drop zone with a file browser button, a file list preview, and upload state feedback. It abstracts the full file selection, preview, and (presentation-side) upload progress experience.

Use when: the user must attach or upload one or more files to a form or workflow.

Do NOT use when: only a simple native file input is needed without preview or drag-and-drop (use a plain file input), or when only the drop zone surface is needed without the surrounding file management UI (use DragAndDropZone directly).

---

## 2. UX Intent

- Primary interaction goal: make file attachment feel simple, safe, and transparent — the user can see what they have selected and the state of each file before submitting.
- Expected user mental model: a file attachment panel — similar to email attachment areas, form upload fields in cloud storage, and document management tools.
- UX laws applied:
  - Tesler's Law: the FileUploader absorbs the complexity of drag-and-drop, file validation, and preview so the form does not need to.
  - Fitts's Law: the drop zone and browse button are generously sized for easy activation.
  - Jakob's Law: follows established multi-file upload UI patterns.
  - Doherty Threshold: file selection feedback (name, size, thumbnail) appears immediately after selection.

---

## 3. Visual Behavior

- Layout: vertical stack containing: a DragAndDropZone (or equivalent drop area), a file list below it showing selected/uploaded files.
- File list items: each item shows a file icon (by type), file name, file size, an optional progress indicator, and a remove button.
- Upload progress: if progress reporting is supported, a ProgressBar appears per file item.
- States reflected visually: idle, drag-over, file selected (list populates), uploading (per-file progress), upload complete, upload error (per-file error indicator).
- Typography: file name uses a body scale token; file size uses a caption scale token; error text uses a caption scale token.
- Spacing: list item height and internal padding driven by space and size tokens.
- Token usage: drop zone tokens (from DragAndDropZone), file item background, border, text, progress bar, error, and remove button colors — all from theme tokens.
- Responsive behavior: adapts to container width; file list items wrap or truncate long file names.

---

## 4. Interaction Behavior

- States:
  - Idle: drop zone and empty file list.
  - File selected: file list shows selected files.
  - Uploading: per-file progress indicators animate.
  - Upload complete: per-file success indicators appear.
  - Upload error: per-file error messages appear with error token styling.
  - Disabled: drop zone and browse button are non-interactive; file list is read-only.
- Controlled vs uncontrolled: file list state may be controlled (via props) or uncontrolled (internal).
- Keyboard behavior:
  - Tab moves focus to the browse button, then through file list remove buttons.
  - Enter or Space on the browse button opens the native file picker.
  - Enter or Space on a remove button removes the corresponding file.
- Screen reader behavior:
  - Drop zone has an accessible label (same as DragAndDropZone).
  - File list changes (additions, removals, status changes) are announced via live regions.
  - Each file item announces its name, size, and status.
  - Remove buttons have accessible labels (e.g., "Remove report.pdf").
- Motion rules: file list entry/exit animations and progress bar animations respect reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: drop zone has `aria-label`; file list is a list with `role="list"` and `role="listitem"` per file; live region announces file additions, removals, and status changes; remove buttons have `aria-label` naming the specific file.
- Focus: focus returns to the browse button or drop zone after a file is removed; remove button is keyboard-reachable.
- Contrast: file name, file size, error text, and remove button meet WCAG AA contrast ratios.
- Reduced motion: file list animations and progress bar animations are suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: all DragAndDropZone tokens; file item background, border, file name text, file size text, error text, remove button colors, progress bar tokens, success/complete indicator color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve to accessible, distinguishable values in dark mode.

---

## 7. Composition Rules

- What can wrap it: FieldWrapper, form sections, modal bodies.
- What it may contain: a DragAndDropZone slot, a file list slot with per-file items (icon, name, size, progress, remove button).
- Anti-patterns:
  - Do not use FileUploader without providing a keyboard-accessible browse button.
  - Do not omit the remove button from file list items; users must be able to deselect files.
  - Do not nest FileUploader inside another FileUploader.

---

## 8. Performance Constraints

- Memoization: file list items should be memoized to prevent re-renders when unrelated items change.
- Virtualization: for large file lists, virtualized rendering should be supported.
- Render boundaries: file list is its own render unit; drop zone state does not cause file list re-renders unless a file is added/removed.

---

## 9. Test Requirements

- Render: idle state renders drop zone and empty file list.
- File selection: selecting files via browse or drop populates the file list with name, size, and remove button.
- Remove: activating remove on a file item removes it from the list and announces the removal.
- Progress: per-file progress indicator renders and updates during upload.
- Error: per-file error state renders with the error token and error message.
- Keyboard: Tab reaches browse button and all remove buttons; Enter/Space activates them.
- Accessibility: file list uses correct roles; live region announces changes; remove buttons have accessible labels.
- Theming: token-based colors apply; no hardcoded values; dark mode tokens resolve correctly.
- Reduced motion: animations are suppressed when reduced motion preference is active.
