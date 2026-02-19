# Component Spec — AvatarUploader

## 1. Purpose

AvatarUploader provides a presentation surface for displaying a user's current avatar image and offering an affordance to replace it. It shows the current image (or a placeholder when none exists), a trigger to initiate file selection, and upload progress or error feedback.

Use it within profile editing forms or account setup flows where the user needs to set or change their avatar.

Do NOT use it for general-purpose image uploads, gallery selection, or any upload outside the avatar/profile photo context.

---

## 2. UX Intent

- Primary interaction goal: let the user quickly understand their current avatar and replace it with minimal steps.
- Expected user mental model: a circular or rounded image preview with an overlaid or adjacent camera/edit icon — a convention well established in mobile apps and web profile pages (Jakob's Law).
- UX laws applied:
  - Jakob's Law: circular avatar with an edit-icon overlay is the established pattern; do not deviate without strong reason.
  - Fitts's Law: the upload trigger must be large enough for comfortable tap/click (minimum 44x44pt); the entire avatar area may act as the trigger.
  - Doherty Threshold: upload progress feedback must appear within 400ms of initiating upload.
  - Gestalt (Figure/Ground): the edit affordance must be visually distinct from the avatar image itself.

---

## 3. Visual Behavior

- Layout: a circular (or rounded-square) avatar image with a fixed size, centered within its container.
- When no image exists, a placeholder is shown (initials or a generic icon) with a background using a color token.
- An edit/camera icon affordance overlays the avatar or is positioned adjacent to it.
- Upload progress is shown as an overlay (semi-transparent with a progress indicator) on top of the existing avatar.
- Error state shows the previous avatar with an error badge or inline message below.
- Avatar size variants (small, medium, large) are driven by size tokens.
- The component does not stretch to fill its container — it maintains a fixed aspect ratio of 1:1.

---

## 4. Interaction Behavior

- States: idle, hover (web), focused, uploading, error, disabled.
- Idle: shows current avatar or placeholder with the edit affordance.
- Hover (web): the edit affordance becomes more prominent (increased opacity or scale).
- Focused: a visible focus ring wraps the entire interactive area.
- Uploading: progress overlay is shown; the trigger is non-interactive during upload.
- Error: previous avatar is restored; error message is visible.
- Disabled: no edit affordance shown; component is non-interactive.
- Controlled via `value` (current image URL) and `onSelect` (called with a selected file object); the component itself does not perform the upload.
- Keyboard behavior:
  - `Enter` or `Space` on the avatar trigger opens the file picker.
  - No additional keyboard navigation inside the component.
- Screen reader behavior: the trigger announces "Change avatar" (or equivalent). Upload progress announces percentage or indeterminate state. Errors are announced via a live region.
- Motion: the edit-icon hover reveal and upload progress overlay use short transitions; reduced motion suppresses them.

---

## 5. Accessibility Requirements

- The interactive trigger has `role="button"` with an accessible label (e.g., "Upload avatar" or "Change avatar").
- If showing the current avatar as an image, it has `alt` text (e.g., the user's name or "Current avatar").
- The placeholder (no image) has `aria-label` or `alt` that conveys the absence of an avatar.
- Upload progress is communicated via `aria-live="polite"` and `aria-busy="true"` during upload.
- Errors are announced via `aria-live="assertive"` or `role="alert"`.
- Meets 3:1 contrast for the edit icon against the avatar background.
- Reduced motion: no transition on hover reveal or progress overlay when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- Required tokens: avatar background (placeholder), placeholder text/icon color, focus ring color, overlay background (upload state), progress indicator color, error indicator color, edit icon color.
- Prohibited hardcoded values: no raw colors, no pixel-based border-radius (use radius tokens), no hardcoded sizes.
- Dark mode: all tokens resolve correctly in dark theme; placeholder background and icon remain distinct.

---

## 7. Composition Rules

- May be wrapped by: AuthProfileEditor, profile setup steps, any settings surface requiring avatar editing.
- May contain: an image element or placeholder, an edit/camera icon, an upload progress indicator, an error message slot.
- Anti-patterns:
  - Do not perform file upload or network requests inside this component.
  - Do not use this for non-avatar image uploads.
  - Do not allow multiple avatars to be selected simultaneously.

---

## 8. Performance Constraints

- Image preview (if generating a local object URL from the selected file) must be revoked on unmount to avoid memory leaks; this is the responsibility of the parent.
- The component must not load or process image data itself.
- Memoize the component to prevent re-renders when unrelated parent state changes.

---

## 9. Test Requirements

- Renders the provided avatar URL as an image.
- Renders a placeholder when no avatar URL is provided.
- Fires `onSelect` with the selected file when the user activates the trigger.
- Shows an uploading state when the `uploading` prop is true; trigger is not interactive.
- Renders an error message when the error state is provided.
- Disabled state hides the edit affordance and prevents trigger activation.
- Keyboard: Enter and Space on the trigger invoke the selection flow.
- Accessibility: no axe violations; trigger has an accessible label; progress is announced; errors are announced.
- Reduced motion: no animation on hover or progress when `prefers-reduced-motion` is active.
