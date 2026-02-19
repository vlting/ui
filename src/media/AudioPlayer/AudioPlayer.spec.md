# Component Spec — AudioPlayer

## 1. Purpose

Renders a presentation-layer audio playback control surface including play/pause, scrubbing, volume, and time display for an audio track.

Use when: displaying inline audio playback controls for podcast episodes, music tracks, voice messages (standalone), or audio attachments.

Do NOT use when: playing video content (use `VideoPlayer`) or rendering a voice message in a chat thread (use `VoiceMessagePlayer`).

---

## 2. UX Intent

- Primary interaction goal: allow users to play, pause, and seek through audio content with minimal friction.
- Expected user mental model: a horizontal transport bar with a play/pause button, a scrubber, and time counters — consistent with native audio controls and streaming platform conventions.
- UX laws applied:
  - **Jakob's Law** — controls must match the layout and iconography conventions of well-known audio players.
  - **Fitts's Law** — play/pause button must be the largest target; scrubber must be wide enough for comfortable touch dragging.
  - **Doherty Threshold** — control responsiveness must be immediate; no perceptible delay between tap and state change.
  - **Gestalt (Proximity)** — play/pause and skip controls are grouped together; time display is grouped near the scrubber.

---

## 3. Visual Behavior

- Layout: horizontal row — play/pause button, scrubber/progress bar, elapsed time, total duration, optional volume control.
- Scrubber: a range slider showing playback progress; thumb is visually prominent and touch-friendly.
- Time display: formatted as MM:SS or HH:MM:SS depending on track duration.
- Spacing: all gaps and padding reference space tokens.
- Typography: time values use a monospaced or numeric token; track title (if shown) uses body token.
- Token usage: scrubber track, thumb, button icon, and background colors reference theme tokens only.
- Responsive behavior: on narrow viewports volume control may collapse to a mute toggle; scrubber remains visible and functional.

---

## 4. Interaction Behavior

- States:
  - **idle / paused**: play button visible; scrubber at current position.
  - **playing**: pause button visible; scrubber advances in real time.
  - **buffering**: visual buffering indicator on the scrubber or play button.
  - **error**: error message replaces playback controls or is shown inline.
  - **disabled**: all controls non-interactive; reduced opacity.
  - **muted**: volume icon reflects muted state.
- Controlled/uncontrolled: playback state (playing, currentTime, volume) may be controlled externally or managed internally via local state.
- Keyboard behavior: `Space` toggles play/pause; arrow keys adjust scrubber position; volume keys adjust volume level.
- Screen reader behavior: play/pause button has an accessible label reflecting current state ("Play" or "Pause"); scrubber has an `aria-label` and `aria-valuetext` with elapsed time.
- Motion rules: scrubber progress updates at a constant rate; no animation on play/pause toggle when `prefers-reduced-motion: reduce` is active.

---

## 5. Accessibility Requirements

- ARIA: play/pause button uses `role="button"` with dynamic `aria-label`; scrubber uses `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and `aria-valuetext`.
- Volume control uses `role="slider"` with appropriate labels.
- All icon-only buttons must have visible or screen-reader-accessible labels.
- Focus: focus ring is visible on all interactive controls.
- Contrast: all controls meet WCAG 2.1 AA (3:1 for UI components).
- Reduced motion: disable scrubber smooth-scroll animation; still update position on interaction.

---

## 6. Theming Rules

- Required tokens: `background`, `borderColor`, `color`, `colorMuted`, `colorPrimary` (scrubber fill), `backgroundHover`, `focusStyle`, `space`, `borderRadius`.
- Scrubber track and thumb must use theme tokens, not hardcoded colors.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or border-radius numbers.
- Dark mode: all tokens must resolve correctly; scrubber thumb must remain visible against the track in dark mode.

---

## 7. Composition Rules

- Stands alone as a self-contained playback control surface.
- Does not manage the audio element or audio API directly; it presents controls and fires callbacks (onPlay, onPause, onSeek, onVolumeChange).
- May be embedded inside a `MediaCard`, a playlist item, or a standalone page section.
- Anti-patterns:
  - Do not embed actual audio element management inside this component.
  - Do not hardcode track URLs, titles, or durations.
  - Do not nest another `AudioPlayer` inside this component.

---

## 8. Performance Constraints

- No internal audio API calls or network requests.
- Scrubber position updates must not cause full re-renders of the parent tree; throttle if needed.
- Memoize stable sub-components (volume control, time display) when their props are stable.

---

## 9. Test Requirements

- Renders play button in paused state; renders pause button in playing state.
- Play/pause callback fires when the button is pressed.
- Seek callback fires when the scrubber is moved.
- Volume callback fires when the volume control is adjusted.
- Error state renders a visible error message.
- Disabled state renders all controls as non-interactive.
- Keyboard: Space toggles play/pause; arrow keys move scrubber.
- Play/pause button `aria-label` updates to reflect current state.
- Scrubber announces elapsed time via `aria-valuetext`.
- Passes axe accessibility audit in idle, playing, and disabled states.
