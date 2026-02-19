# Component Spec — VideoPlayer

## 1. Purpose

Renders a presentation-layer video playback control surface including play/pause, scrubbing, volume, fullscreen toggle, and time display for a video asset.

Use when: embedding video playback controls inline on a page, within a `MediaViewerModal`, or alongside a `Playlist`.

Do NOT use when: playing audio-only content (use `AudioPlayer`) or displaying a static video thumbnail (use `MediaCard`).

---

## 2. UX Intent

- Primary interaction goal: allow users to play, pause, seek, and control volume for a video with familiar, intuitive controls.
- Expected user mental model: a video player control bar overlaid on or below a video surface — consistent with streaming platform and browser native video conventions.
- UX laws applied:
  - **Jakob's Law** — control layout (play/pause, scrubber, time, volume, fullscreen) must match conventions from well-known video players.
  - **Fitts's Law** — play/pause is the largest and most central control; scrubber spans the full width for precise seeking.
  - **Gestalt (Proximity)** — playback controls are grouped at the bottom; time is adjacent to the scrubber.
  - **Doherty Threshold** — control interactions must respond immediately; buffering state is communicated promptly.

---

## 3. Visual Behavior

- Layout: video surface area (managed by the consumer or a video element slot) above a control bar; control bar contains play/pause, scrubber, elapsed/total time, volume control, and fullscreen toggle.
- Control bar overlays or sits below the video area; it auto-hides on inactivity when in overlay mode.
- Scrubber: wide range slider with a visible thumb; buffered range shown as a secondary fill.
- Thumbnails on scrub hover (if provided by consumer) appear above the scrubber.
- Spacing: all control bar padding and icon gaps reference space tokens.
- Typography: time values use a monospaced or numeric token.
- Token usage: scrubber fill, volume fill, button icons, control bar background, and text colors reference theme tokens only.
- Responsive behavior: on narrow viewports the control bar may hide secondary controls (playback speed, settings); core controls (play/pause, scrubber, fullscreen) always remain.

---

## 4. Interaction Behavior

- States:
  - **idle / paused**: play button visible.
  - **playing**: pause button visible; scrubber advances; control bar may auto-hide.
  - **buffering**: spinner on the video surface; scrubber shows buffered range.
  - **error**: error message displayed in the video area.
  - **fullscreen**: control bar repositions to bottom of full screen.
  - **muted**: volume icon reflects muted state.
  - **disabled**: all controls non-interactive; reduced opacity.
- Controlled/uncontrolled: playback state (playing, currentTime, volume, muted) may be controlled externally or managed internally.
- Keyboard behavior: `Space` toggles play/pause; left/right arrow keys seek backward/forward; up/down arrow keys adjust volume; `F` toggles fullscreen; `M` toggles mute.
- Screen reader behavior: play/pause button has a dynamic `aria-label`; scrubber has `aria-label` and `aria-valuetext` with elapsed time; control bar does not auto-hide when keyboard focus is inside it.
- Motion rules: control bar auto-hide fade respects `prefers-reduced-motion`; instant show/hide when reduced motion is active.

---

## 5. Accessibility Requirements

- ARIA: play/pause uses `role="button"` with dynamic `aria-label`; scrubber uses `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`; volume uses `role="slider"`.
- All icon-only controls have visible or screen-reader-accessible labels.
- Control bar must not auto-hide while keyboard focus is within it.
- Contrast: all controls meet WCAG 2.1 AA (3:1 for UI components) against the control bar background.
- Focus: focus ring is visible on all interactive controls.
- Reduced motion: disable auto-hide fade; suppress buffering spinner animation if it causes distraction.

---

## 6. Theming Rules

- Required tokens: `background` (control bar), `color`, `colorMuted`, `colorPrimary` (scrubber/volume fill), `backgroundHover`, `focusStyle`, `space`, `borderRadius`.
- Control bar background may use a semi-transparent token to allow video to show through.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or opacity values.
- Dark mode: control bar and icon tokens must resolve with sufficient contrast.

---

## 7. Composition Rules

- The video surface (native video element or streaming embed) is provided by the consumer as a child or slot.
- The component renders the control surface and fires callbacks (onPlay, onPause, onSeek, onVolumeChange, onFullscreenToggle).
- May be composed inside `MediaViewerModal` or a standalone media page.
- Anti-patterns:
  - Do not manage the video element or media API inside this component.
  - Do not hardcode video URLs, aspect ratios, or durations.
  - Do not nest another `VideoPlayer` inside this component.

---

## 8. Performance Constraints

- No internal video API calls or network requests.
- Scrubber and time updates must not cause full parent re-renders; throttle if needed.
- Memoize stable sub-components (volume control, fullscreen button) when their props are stable.

---

## 9. Test Requirements

- Renders play button in paused state; renders pause button in playing state.
- Play/pause callback fires when the button is pressed.
- Seek callback fires when the scrubber is moved.
- Volume callback fires when the volume control is adjusted.
- Mute callback fires when the mute button is pressed.
- Fullscreen callback fires when the fullscreen button is pressed.
- Error state renders a visible error message.
- Disabled state renders all controls as non-interactive.
- Keyboard: Space toggles play/pause; arrows seek and adjust volume.
- Play/pause button `aria-label` updates to reflect current state.
- Control bar does not auto-hide when keyboard focus is within it.
- Passes axe accessibility audit in idle, playing, and disabled states.
