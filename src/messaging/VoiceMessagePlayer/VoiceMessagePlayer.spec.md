# Component Spec — VoiceMessagePlayer

## 1. Purpose

Renders a compact playback control for a voice message within a message bubble, including a play/pause button, a waveform or progress bar visualization, and message duration.

Use when: displaying a recorded voice message in a chat thread inside a `MessageBubble`.

Do NOT use when: playing a long-form audio track or podcast (use `AudioPlayer`) or video content (use `VideoPlayer`).

---

## 2. UX Intent

- Primary interaction goal: allow users to play and pause a short voice message inline within the conversation, without leaving the thread.
- Expected user mental model: a compact audio player row within a message bubble — play button, waveform, elapsed/total time — consistent with WhatsApp and Telegram voice messages.
- UX laws applied:
  - **Jakob's Law** — layout follows WhatsApp/Telegram voice message player conventions (play + waveform + time).
  - **Fitts's Law** — play/pause button is the largest element; waveform or progress bar is tappable along its full length for seeking.
  - **Gestalt (Proximity)** — play button and waveform are tightly coupled; time display is adjacent to the waveform.
  - **Doherty Threshold** — playback must start within 400 ms of pressing play.

---

## 3. Visual Behavior

- Layout: horizontal row — play/pause button on the leading edge, waveform visualization or linear progress bar in the center, elapsed/total time on the trailing edge.
- Waveform: a series of vertical bars or a smooth path representing audio amplitude; played portion is filled; unplayed portion is muted.
- If a waveform asset is unavailable, a linear progress bar is used as a fallback.
- Elapsed time and total duration are displayed; format is MM:SS.
- Spacing: button size, waveform height, and row padding reference size and space tokens.
- Typography: time display uses a monospaced or numeric caption token.
- Token usage: waveform fill (played), waveform muted (unplayed), button icon, and text colors reference theme tokens only; colors adapt for outgoing vs. incoming bubble context.
- Responsive behavior: the player fills the bubble's content width; waveform scales to available space.

---

## 4. Interaction Behavior

- States:
  - **idle / paused**: play button visible; waveform at current position (or start).
  - **playing**: pause button visible; waveform fill advances in real time.
  - **buffering**: spinner replaces the play button while audio loads.
  - **completed**: play button returns; waveform fully filled (or resets to start).
  - **error**: error indicator replaces the play button; an accessible error message is present.
- Controlled/uncontrolled: playback state (playing, currentTime) may be controlled externally or managed internally.
- Keyboard behavior: `Space` toggles play/pause when the player is focused; left/right arrow keys seek backward/forward.
- Screen reader behavior: play/pause button has a dynamic `aria-label`; the waveform/scrubber has `role="slider"` with `aria-valuetext` showing elapsed time; duration is announced on mount.
- Motion rules: waveform fill animation respects `prefers-reduced-motion`; when reduced motion is active, the fill jumps to the current position without transition.

---

## 5. Accessibility Requirements

- ARIA: play/pause uses `role="button"` with a dynamic `aria-label` ("Play voice message" / "Pause voice message"); waveform/scrubber uses `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`.
- Decorative waveform bars are `aria-hidden="true"`; the slider communicates progress.
- Duration is announced via a visually present text element, not hidden.
- Contrast: play/pause icon and time text meet WCAG 2.1 AA against both incoming and outgoing bubble backgrounds.
- Reduced motion: waveform fill does not animate; position updates are instant.

---

## 6. Theming Rules

- Required tokens: `colorPlayed` (waveform fill — outgoing), `colorPlayedIncoming` (waveform fill — incoming), `colorUnplayed` (muted waveform), `color` (time text), `backgroundButton`, `focusStyle`, `space`, `size` (button diameter, waveform height).
- The player must visually adapt when rendered inside an outgoing vs. incoming `MessageBubble`.
- Prohibited hardcoded values: no literal color strings, pixel dimensions, or animation durations.
- Dark mode: played and unplayed waveform tokens must maintain sufficient contrast in dark themes against both bubble colors.

---

## 7. Composition Rules

- Rendered inside `MessageBubble.Content` as a child.
- Does not manage audio element or media API; receives playback state and fires callbacks (onPlay, onPause, onSeek).
- Does not fetch the audio file; receives the URL or waveform data as props.
- Anti-patterns:
  - Do not embed a full `AudioPlayer` (with volume and fullscreen controls) inside a voice message bubble.
  - Do not hardcode waveform shape or duration values.
  - Do not nest another `VoiceMessagePlayer` inside this component.

---

## 8. Performance Constraints

- No internal audio API calls or network requests.
- Waveform bar rendering (if many bars) must not cause layout thrashing; memoize bar calculations.
- Scrubber updates must not trigger full re-renders of the containing `MessageBubble`.

---

## 9. Test Requirements

- Renders play button in paused state; renders pause button in playing state.
- Play/pause callback fires when the button is pressed.
- Seek callback fires when the waveform scrubber is interacted with.
- Elapsed time updates correctly during playback.
- Completed state resets the waveform to the start.
- Error state renders a visible error indicator with an accessible label.
- Keyboard: Space toggles play/pause; arrow keys seek.
- Play/pause button `aria-label` updates to reflect current state.
- Scrubber announces elapsed time via `aria-valuetext`.
- Waveform bars are `aria-hidden="true"`.
- Passes axe accessibility audit in idle, playing, and error states.
