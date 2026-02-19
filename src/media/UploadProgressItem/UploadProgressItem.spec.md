# Component Spec — UploadProgressItem

## 1. Purpose

Displays the upload status and progress for a single file being uploaded, including filename, file type icon, progress percentage, and a cancel action.

Use when: showing individual file upload progress within an upload queue or file uploader component.

Do NOT use when: showing multi-step task progress (use `ProgressTracker`) or media playback progress (use an audio/video scrubber).

---

## 2. UX Intent

- Primary interaction goal: give the user real-time feedback on a file's upload progress and allow them to cancel if needed.
- Expected user mental model: a file row with a progress bar beneath — consistent with OS download managers, cloud storage upload queues, and file transfer UIs.
- UX laws applied:
  - **Doherty Threshold** — progress must update in real time (or near real time); visual stagnation above 400 ms causes anxiety.
  - **Gestalt (Proximity)** — filename, progress bar, and percentage are tightly grouped; cancel button is offset.
  - **Fitts's Law** — cancel button is large enough to tap on mobile without accidentally touching the row.

---

## 3. Visual Behavior

- Layout: horizontal row — file type icon on the left, filename and progress bar in the center, percentage and cancel button on the right.
- Progress bar: a linear bar filling from left to right as upload progresses; fill color uses a primary/accent token.
- Filename: truncated with ellipsis when it overflows.
- Status label: optional text below the progress bar indicating state (e.g., "Uploading…", "Complete", "Failed").
- Spacing: row padding, icon size, and progress bar height reference size and space tokens.
- Typography: filename uses body token; percentage and status label use caption/muted token.
- Token usage: progress bar fill, track, icon, and text colors reference theme tokens only.
- Responsive behavior: row adapts to its container width; minimum row height is touch-friendly.

---

## 4. Interaction Behavior

- States:
  - **uploading**: progress bar animates; percentage increments; cancel button visible.
  - **complete**: progress bar full; success icon replaces cancel button; status reads "Complete".
  - **error/failed**: progress bar stops; error icon and message visible; a retry button may be shown.
  - **cancelled**: row dims or is removed; consumer handles removal.
  - **paused**: progress bar static; optional resume button.
- Controlled: progress value (0–100) and status are controlled externally; cancel and retry fire callbacks.
- Keyboard behavior: cancel and retry buttons are focusable and activate on `Enter` and `Space`.
- Screen reader behavior: file name and current progress percentage are announced; status changes are announced via a live region.
- Motion rules: progress bar fill animation respects `prefers-reduced-motion`; when reduced motion is active, the bar jumps to the current value without transition.

---

## 5. Accessibility Requirements

- ARIA: progress bar uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, and `aria-label` referencing the filename.
- Status changes (complete, error, cancelled) are announced via an `aria-live="polite"` region.
- Cancel button must have an accessible label that includes the filename (e.g., "Cancel upload of report.pdf").
- Contrast: progress bar fill, filename, and status text meet WCAG 2.1 AA.
- Reduced motion: suppress progress bar animation; display static progress value.

---

## 6. Theming Rules

- Required tokens: `colorPrimary` (progress fill), `colorMuted` (track), `color` (filename), `colorSuccess`, `colorError`, `background`, `space`, `borderRadius`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or progress bar height.
- Dark mode: progress fill and track tokens must maintain sufficient contrast in dark themes.

---

## 7. Composition Rules

- Stands alone as a single-file progress row.
- Multiple `UploadProgressItem` instances are stacked vertically by a parent upload queue component.
- Does not manage the upload request itself; progress value and status are provided externally.
- Anti-patterns:
  - Do not hardcode filenames, types, or progress values.
  - Do not implement file upload API calls inside this component.
  - Do not nest another `UploadProgressItem` inside this component.

---

## 8. Performance Constraints

- Progress updates may arrive frequently (e.g., every 100 ms); the component must not trigger full re-renders of parent components on each update.
- Memoize stable parts of the row (icon, filename) when the progress value alone changes.
- No internal timers or subscriptions; the consumer pushes progress updates as props.

---

## 9. Test Requirements

- Renders filename, progress bar, and percentage from props.
- Progress bar `aria-valuenow` matches the progress prop.
- Cancel button fires `onCancel` callback with the correct file identifier.
- Complete state renders a success icon and hides the cancel button.
- Error state renders an error message and a retry button.
- Retry button fires `onRetry` callback.
- Status changes are announced via a live region.
- Keyboard: cancel and retry buttons activate on Enter and Space.
- No hardcoded color, spacing, or progress bar height values in rendered output.
- Passes axe accessibility audit in uploading, complete, and error states.
