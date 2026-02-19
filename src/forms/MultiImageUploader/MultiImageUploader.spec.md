# Component Spec — MultiImageUploader

## 1. Purpose

Allows users to select and preview multiple images before submission. Used in profile setup, media galleries, listing creation, or any flow requiring bulk image attachment.

Do NOT use this component for single-image selection (use a dedicated single image picker), document file uploads (use a general file input), or video/audio uploads.

---

## 2. UX Intent

- Primary interaction goal: let users add, preview, and remove multiple images in a single control without navigating away from the current form context.
- Expected user mental model: a collection of image "slots" that can be filled via tap/click or drag-and-drop, each independently removable.
- UX laws applied:
  - Fitts's Law: touch/click targets for add and remove actions must be large enough to activate comfortably on mobile.
  - Gestalt (Proximity & Similarity): image thumbnails should be grouped uniformly so users perceive them as a related set.
  - Miller's Law: consider surfacing a maximum count badge when a slot limit exists, to set expectations early.
  - Doherty Threshold: upload progress feedback (per-image) must appear within 400 ms of a file being selected.

---

## 3. Visual Behavior

- Layout: wrapping grid of image thumbnails. Each slot has a consistent fixed aspect ratio (square preferred). A dedicated "add" slot appears when the maximum count has not been reached.
- Spacing: gaps between thumbnail slots use space tokens. Outer padding uses space tokens.
- Typography: optional helper text below the grid (e.g., count remaining, format hints) uses the smallest body text scale token.
- Token usage: background, border color, border radius, and icon color must use design tokens only. No hardcoded hex values.
- Responsive behavior: the grid adapts column count across breakpoints. On small screens, two columns are appropriate; wider viewports may show three or more. Column count should be token-driven or controlled via props.

---

## 4. Interaction Behavior

- States:
  - Idle: grid shows filled thumbnails and an empty add slot (if limit not reached).
  - Hover (add slot): add slot visually elevates or changes border style to invite interaction.
  - Focus (add slot): focus ring rendered around add slot.
  - Active (add slot): brief press/active visual on the slot.
  - Uploading (per-slot): individual slot shows a progress indicator overlay.
  - Error (per-slot): individual slot shows an error state with a retry affordance.
  - Disabled: all slots non-interactive; reduced opacity applied via token.
  - Full: add slot hidden or replaced with a count-limit message when maximum images are reached.
- Controlled vs uncontrolled: supports both patterns. In controlled mode, parent manages the image list and change callbacks. In uncontrolled mode, component manages internal list state.
- Keyboard behavior:
  - Tab moves focus through thumbnails and the add slot in document order.
  - Enter or Space on the add slot opens the file picker.
  - Delete or Backspace on a focused thumbnail removes that image (with confirmation where destructive actions are warranted).
- Screen reader behavior:
  - Each thumbnail announces its position (e.g., "Image 2 of 4") and offers a labeled remove action.
  - Add slot announces as an interactive button with an accessible label such as "Add image."
  - Upload progress is announced via a live region.
- Motion rules: thumbnail appearance and removal animate only if the user has not requested reduced motion. Transitions use duration tokens.

---

## 5. Accessibility Requirements

- ARIA: the add slot renders as a `button` or equivalent role. Each thumbnail remove control is a `button` with a descriptive label including image position. Upload progress uses `role="status"` or `aria-live="polite"`.
- Focus rules: focus is trapped or managed to avoid loss when a thumbnail is removed. If the removed image was the last in the list, focus moves to the add slot.
- Contrast: all icon and text elements within slots must meet WCAG AA contrast against their backgrounds using design tokens.
- Reduced motion: disable entrance/exit animations; show and hide thumbnails immediately when `prefers-reduced-motion` is active.

---

## 6. Theming Rules

- Required tokens: background color, border color, border radius, icon color, error color, disabled opacity, space (gap, padding), size (slot dimensions).
- Prohibited hardcoded values: no hardcoded colors, pixel dimensions for spacing, border-radius values, or font sizes.
- Dark mode: slot backgrounds, borders, and overlay states must all reference theme-aware tokens so they invert correctly in dark mode without any manual color overrides.

---

## 7. Composition Rules

- What can wrap it: form containers, modal bodies, page sections. Must be a descendant of a Provider that supplies the design token context.
- What it may contain: image thumbnail slots, an add slot, optional helper/error text beneath the grid. Individual slots may contain preview images, progress overlays, and remove buttons.
- Anti-patterns:
  - Do not nest MultiImageUploader inside another MultiImageUploader.
  - Do not use this component to render non-image media (video, PDF, audio).
  - Do not embed business logic (upload API calls) inside this component — delegate to parent via callbacks.

---

## 8. Performance Constraints

- Memoization: individual thumbnail slot components should be memoized so that adding or removing one image does not re-render unaffected slots.
- Virtualization: if the image list can exceed approximately 20 items, consider virtualizing the thumbnail grid to avoid layout thrashing.
- Render boundaries: image preview data (object URLs or base64) must not be generated inside the component — accept resolved preview URLs as props to keep render cycles predictable.

---

## 9. Test Requirements

- Rendering: component renders without error in both empty and populated states.
- Add interaction: activating the add slot triggers the file selection callback.
- Remove interaction: activating a remove control removes the correct image from the collection.
- Maximum limit: add slot is hidden or disabled once the declared maximum is reached.
- Keyboard navigation: Tab, Enter/Space, Delete/Backspace behave as specified.
- Accessibility: all interactive elements have accessible labels; live regions announce upload progress.
- Disabled state: no interactive controls respond to input when disabled.
- Theming: component renders correctly in both light and dark token contexts.
- Controlled mode: parent-supplied value and onChange are respected without internal state drift.
