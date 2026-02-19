# Component Spec — AttachmentPreview

## 1. Purpose

Displays a compact visual preview of a file or media attachment within a message composition area or message thread, showing filename, file type icon, size, and a remove/download action.

Use when: rendering attached files in a message input staging area before send, or displaying received attachments within a message bubble.

Do NOT use when: rendering a full media viewer (use `MediaViewerModal`) or an upload progress bar (use `UploadProgressItem`).

---

## 2. UX Intent

- Primary interaction goal: give users confidence about what they are sending or receiving by clearly identifying the attachment type, name, and size; allow them to remove attachments before sending.
- Expected user mental model: a file chip or mini-card — thumbnail or type icon, filename, size, and a close/remove button — consistent with chat and email attachment previews.
- UX laws applied:
  - **Jakob's Law** — attachment chip design matches conventions from iMessage, Slack, and email clients.
  - **Fitts's Law** — the remove button must be large enough to tap without accidentally triggering the preview.
  - **Gestalt (Proximity)** — icon/thumbnail, filename, and size are tightly grouped; the remove button is visually offset.

---

## 3. Visual Behavior

- Layout: horizontal row — file type icon or image thumbnail on the left, filename and file size in the center, remove/download button on the right.
- Image attachments show a small thumbnail; non-image files show a file type icon.
- Filename truncates with ellipsis when it overflows.
- Size is formatted in human-readable units (KB, MB).
- Spacing: chip padding and icon size reference size and space tokens.
- Typography: filename uses body token; file size uses caption/muted token.
- Token usage: chip background, border, icon, and text colors reference theme tokens only.
- Responsive behavior: chip adapts to its container width; minimum dimensions maintain touch-friendly tap targets.

---

## 4. Interaction Behavior

- States:
  - **idle (outgoing)**: chip shown in composition area; remove button visible.
  - **idle (incoming/sent)**: chip shown in message thread; download button visible (if applicable).
  - **hover**: subtle background shift; remove/download button becomes more prominent.
  - **focus**: visible focus ring on the chip or its action button.
  - **loading**: while the attachment is being staged or thumbnailed, a spinner is shown in the icon area.
  - **error**: if the attachment failed to process, an error state is shown with a clear visual indicator.
- Controlled: remove and download callbacks are fired to the consumer; the chip does not self-remove.
- Keyboard behavior: `Tab` focuses the chip; `Enter` opens a preview (if applicable); remove/download button is separately focusable and activates on `Enter`/`Space`.
- Screen reader behavior: chip announces filename, file type, and size; remove button announces "Remove attachment: [filename]".
- Motion rules: chip entrance (in composition area) respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA: chip container uses `role="listitem"` when inside an attachment list; remove button uses `role="button"` with an `aria-label` that includes the filename.
- Image thumbnails must have a descriptive `alt` attribute.
- Non-image type icons are decorative and aria-hidden.
- Contrast: filename, size, and icon meet WCAG 2.1 AA.
- Focus: focus ring is visible on all interactive elements.
- Reduced motion: suppress chip entrance animations.

---

## 6. Theming Rules

- Required tokens: `background`, `backgroundHover`, `borderColor`, `color`, `colorMuted`, `focusStyle`, `space`, `borderRadius`, `size` (icon/thumbnail dimensions).
- Prohibited hardcoded values: no literal color strings, pixel spacing, or thumbnail dimensions.
- Dark mode: chip background and border tokens must resolve correctly in dark themes.

---

## 7. Composition Rules

- Multiple `AttachmentPreview` instances are rendered in a horizontal scroll row or wrapping flex container by the parent (e.g., `MessageInput` or `MessageBubble`).
- Does not manage the file object itself; receives filename, size, type, and optional thumbnail URL as props.
- Anti-patterns:
  - Do not implement file reading or upload logic inside this component.
  - Do not hardcode file type icons or file size thresholds.
  - Do not nest another `AttachmentPreview` inside this component.

---

## 8. Performance Constraints

- Thumbnail images are lazy-loaded; the chip must render immediately without waiting for the thumbnail.
- No internal data fetching or file reading.
- Memoize when rendered in a list of multiple attachments.

---

## 9. Test Requirements

- Renders filename, file type icon, and size from props.
- Image attachments render a thumbnail; non-image attachments render a type icon.
- Remove button fires `onRemove` callback with the correct attachment identifier.
- Download button fires `onDownload` callback (if present).
- Loading state renders a spinner in the icon area.
- Error state renders a visible error indicator.
- Remove button `aria-label` includes the filename.
- Focus ring is visible on the chip and action buttons.
- Passes axe accessibility audit in idle and error states.
