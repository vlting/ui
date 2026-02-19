# Component Spec — MediaViewerModal

## 1. Purpose

Presents a single media asset — image, video, or audio — in a full-screen or large modal overlay for detailed viewing or playback.

Use when: a user selects a media asset from a grid or list and needs to view, play, or inspect it in detail without leaving the current page.

Do NOT use when: inline preview within a card (use `MediaCard`) or embedding a persistent player on a page (use `VideoPlayer` or `AudioPlayer` directly).

---

## 2. UX Intent

- Primary interaction goal: allow the user to focus entirely on a single media asset without navigating away, and to dismiss the view easily when done.
- Expected user mental model: a lightbox/modal overlay — darkened background, centered content, a close button — consistent with image gallery and video modal conventions.
- UX laws applied:
  - **Jakob's Law** — matches the lightbox modal convention used by photo, video, and document viewing apps.
  - **Fitts's Law** — close button is large and positioned in a predictable corner; navigation arrows (previous/next) are large and positioned at screen edges.
  - **Gestalt (Figure/Ground)** — the backdrop darkens the background to focus attention on the media.
  - **Doherty Threshold** — the modal must open within 400 ms of the trigger; media begins loading immediately.

---

## 3. Visual Behavior

- Layout: full-screen or near-full-screen overlay; media asset is centered; close button in the top-right corner; optional previous/next navigation at edges.
- Background: a semi-transparent scrim covers the page content behind the modal.
- Media content: images fill available space while maintaining aspect ratio; video/audio embeds their respective players centered in the modal.
- Optional caption or title bar at bottom of the modal.
- Spacing: internal padding and control spacing reference space tokens.
- Typography: caption/title uses body or label token; media metadata uses caption/muted token.
- Token usage: scrim opacity, modal background, close button icon, and caption text reference theme tokens only.
- Responsive behavior: on narrow viewports the modal takes full screen width and height; on wider viewports it may be constrained to a max-width with a visible backdrop.

---

## 4. Interaction Behavior

- States:
  - **opening**: modal enters with a transition (fade or slide); respects reduced motion.
  - **idle/open**: media is displayed; close and navigation controls are visible.
  - **loading**: media is still loading; a spinner or skeleton is shown in the media area.
  - **error**: media failed to load; an error message is displayed.
  - **closing**: modal exits with a transition; focus returns to the trigger element.
- Controlled: open/closed state is controlled externally; the component fires an `onClose` callback.
- Keyboard behavior: `Escape` closes the modal; `Tab` is trapped within the modal while open; previous/next navigation via arrow keys if applicable.
- Screen reader behavior: modal uses `role="dialog"` with an `aria-modal` attribute and a descriptive `aria-label` or `aria-labelledby`.
- Swipe gesture (mobile): swiping down or dismissing via back gesture closes the modal.
- Motion rules: open/close transitions use the reduced-motion token; no transition when `prefers-reduced-motion: reduce` is active.

---

## 5. Accessibility Requirements

- ARIA: `role="dialog"`, `aria-modal="true"`, `aria-label` or `aria-labelledby` referencing the media title.
- Focus: on open, focus moves to the modal container or close button; on close, focus returns to the trigger element.
- Focus trap: keyboard focus must not escape the modal while it is open.
- Close button must have an accessible label.
- Contrast: all UI controls (close, navigation) meet WCAG 2.1 AA against the modal background.
- Reduced motion: disable open/close animations; modal appears/disappears instantly.

---

## 6. Theming Rules

- Required tokens: `background` (modal), `backgroundOverlay` (scrim), `color`, `colorMuted`, `borderRadius`, `space`, `focusStyle`.
- Scrim opacity is a token value, not a hardcoded alpha.
- Prohibited hardcoded values: no literal color strings, pixel dimensions, or opacity values.
- Dark mode: modal background and scrim tokens must resolve correctly; controls must maintain contrast.

---

## 7. Composition Rules

- Wraps `VideoPlayer`, `AudioPlayer`, or an image element depending on the media type prop.
- May include a caption, navigation controls, and a metadata footer as composed children or slots.
- The consumer triggers open/close state; the modal does not self-open.
- Anti-patterns:
  - Do not implement media downloading or deletion inside this component.
  - Do not hardcode media types or URLs.
  - Do not use a non-modal overlay (e.g., a tooltip) for full media viewing.

---

## 8. Performance Constraints

- Media content should start loading when the modal opens, not before (lazy loading).
- Previous/next prefetching is the consumer's responsibility.
- The modal DOM should be unmounted or hidden when closed to avoid background media playback.

---

## 9. Test Requirements

- Opens when the controlled open prop is true.
- Closes when the `onClose` callback is invoked (Escape key, close button, backdrop click).
- Focus moves to the modal on open and returns to the trigger on close.
- Focus is trapped within the modal while open.
- Loading state renders a visible spinner.
- Error state renders an error message.
- Escape key closes the modal.
- Screen reader announces `role="dialog"` with a correct label.
- Passes axe accessibility audit in open and loading states.
