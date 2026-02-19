# Component Spec — PhotoGalleryUploader

## 1. Purpose

Provides the UI for a user to manage their profile photo gallery — adding, reordering, and removing photos. It is a critical profile-setup component that directly influences match quality and user trust.

Use when: a user is creating or editing their dating profile and needs to curate their photo collection.

Do NOT use for: single-photo avatar pickers, image attachment in messaging, or media browsing of other users' photos.

---

## 2. UX Intent

- Primary interaction goal: let users easily add photos, establish their photo order, and remove unwanted photos — all within a tactile, visual grid interface.
- Expected user mental model: a photo grid similar to the one found in mainstream dating and social apps, where photos can be pressed to change or dragged to reorder (Jakob's Law).
- UX laws applied:
  - Fitts's Law: add-photo slots and remove controls must have generous touch targets.
  - Gestalt (proximity + common region): slots are displayed in a grid with clear boundaries; filled vs. empty slots are visually distinct.
  - Hick's Law: options per photo (change, remove) are limited to two or three actions, surfaced on demand via a press interaction.
  - Doherty Threshold: upload progress is communicated immediately after a file is selected.

---

## 3. Visual Behavior

- Layout: a fixed-slot grid (commonly 6 slots arranged in 3x2 or 2x3) where each slot either shows a photo thumbnail or an "Add Photo" placeholder.
- The primary (first) photo slot is larger than the others to signal its importance.
- Filled slots show the photo thumbnail with an overlay containing a remove button.
- Empty slots show an icon (camera or plus) and optional helper text.
- A reorder affordance (drag handle or numbered indicator) is visible on filled slots when reordering is enabled.
- Upload progress is shown as an overlay on the slot being filled (e.g., a progress ring or bar).
- Typography: "Add photo" hint text uses a small body token.
- Token usage: slot background, border, overlay, and icon colors from theme tokens.
- Responsive: grid adapts to available width; slot proportions are maintained via aspect ratio.

---

## 4. Interaction Behavior

- States per slot: empty (idle), empty (hover/focus), filled (idle), filled (hover/focus — shows remove overlay), uploading (progress indicator), error (upload failed — error overlay with retry).
- The component is controlled: the parent owns the photos array and receives `onAdd`, `onRemove`, and `onReorder` callbacks.
- Pressing an empty slot triggers the file/media selection flow (delegated to the parent via `onAdd`).
- Pressing a filled slot may open a context menu or action sheet with "Change Photo" and "Remove" options.
- Dragging a filled slot to another position triggers `onReorder` with the new index order.
- Keyboard behavior:
  - Tab moves focus through each slot.
  - Enter or Space on an empty slot triggers add.
  - Enter or Space on a filled slot opens the slot action menu.
  - Within the action menu, arrow keys navigate options; Enter selects; Escape closes.
- Screen reader behavior: each slot announces its index, status (empty or filled with photo name/index), and available actions.
- Motion: drag-reorder uses a smooth position transition. Upload progress animates the progress indicator. All animations respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- Each slot is focusable and has an `aria-label` describing its state (e.g., "Photo slot 1, empty. Press to add a photo." or "Photo slot 2, filled. Press to edit.").
- Remove button within a filled slot has an `aria-label` including the slot index or photo identifier.
- Upload progress has `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
- Error state is announced via an `aria-live` region.
- Drag-to-reorder must have a keyboard-accessible alternative (e.g., move up/move down buttons or a reorder menu).
- Contrast: slot borders, icon fills, and overlay buttons meet 4.5:1.
- Reduced motion: no drag animation, no progress animation — use static/instant updates.

---

## 6. Theming Rules

- Required tokens: `background` (slot), `borderColor` (slot border), accent token for primary photo slot indicator, overlay background token (semi-transparent surface), icon color token, error token for failed slot, progress color token.
- Prohibited hardcoded values: no raw colors, no hardcoded pixel dimensions for slots.
- Dark mode: slot backgrounds, overlays, icons, and error states must all resolve via theme tokens.

---

## 7. Composition Rules

- What can wrap it: the DatingProfileEditor, a standalone photo management screen, or an onboarding step.
- What it may contain: photo thumbnail images, slot icons, remove buttons, progress indicators, and an action menu/sheet.
- Anti-patterns:
  - Do not embed file system access or camera API calls inside the component — delegate to `onAdd` callback.
  - Do not use PhotoGalleryUploader for single-image selection.
  - Do not allow more slots than the defined maximum without a prop override.

---

## 8. Performance Constraints

- Photo thumbnails must use appropriately sized/resized images — do not render full-resolution images in the grid.
- Memoize slot components to prevent full-grid re-renders when a single slot changes.
- Upload progress updates must not block the UI thread; progress state is driven by the parent.
- No virtualization needed for a fixed-slot grid.

---

## 9. Test Requirements

- Renders the correct number of slots (filled + empty) based on the photos prop.
- Pressing an empty slot calls `onAdd`.
- Pressing "Remove" on a filled slot calls `onRemove` with the correct photo index.
- Pressing "Change" on a filled slot calls `onAdd` with the slot index.
- Reordering via keyboard alternative calls `onReorder` with the updated order.
- Each slot has a correct `aria-label` for its state.
- Upload progress slot has `role="progressbar"` with correct `aria-value*` attributes.
- Error state has an accessible error announcement.
- No drag or progress animation when `prefers-reduced-motion` is active.
- Passes automated accessibility audit.
- Snapshot test for empty gallery and partially-filled gallery states.
