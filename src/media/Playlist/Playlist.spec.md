# Component Spec — Playlist

## 1. Purpose

Displays an ordered list of media tracks or items that can be browsed, selected, and reordered, typically used alongside an audio or video player.

Use when: presenting a queue or curated list of audio/video tracks for sequential or random playback.

Do NOT use when: displaying a grid of media assets for selection (use `MediaLibraryGrid`) or showing a single media item (use `MediaCard`).

---

## 2. UX Intent

- Primary interaction goal: allow users to see all tracks in a playlist, understand which track is currently playing, and jump to any track directly.
- Expected user mental model: a numbered or ordered list of tracks — consistent with music app and podcast app queue UIs.
- UX laws applied:
  - **Jakob's Law** — follows music/podcast playlist conventions (track number, title, duration, active indicator).
  - **Gestalt (Continuity, Proximity)** — tracks flow in a clear vertical sequence; the active track is visually prominent.
  - **Fitts's Law** — each track row is a large touch target; play/skip controls within rows are adequately sized.
  - **Miller's Law** — if the playlist is long, group tracks into sections or paginate rather than rendering an unbounded list.

---

## 3. Visual Behavior

- Layout: vertical list of track rows; each row shows position index (or drag handle), thumbnail (optional), track title, duration, and an active indicator for the currently playing track.
- Active track row is visually highlighted (background, border, or bold title) and must not rely on color alone.
- A scrollable container handles long playlists.
- Spacing: row height and internal padding reference space tokens.
- Typography: track title uses body token; duration and index use muted/caption token.
- Token usage: row background, active row highlight, drag handle, and text colors reference theme tokens only.
- Responsive behavior: on narrow viewports the playlist takes full width; optional columns (e.g., album art) may collapse.

---

## 4. Interaction Behavior

- States:
  - **idle**: tracks listed, no active track.
  - **playing**: active track highlighted; visual indicator (e.g., animation or icon) shows it is playing.
  - **paused**: active track still highlighted but the playing indicator is paused.
  - **hover**: row subtly highlights on hover.
  - **focus**: visible focus ring on focused row.
  - **disabled**: entire playlist or individual tracks may be disabled; non-interactive, reduced opacity.
- Controlled/uncontrolled: active track index is controlled externally; the component fires `onTrackSelect` when a row is activated.
- Optional drag-to-reorder: rows may be reordered by drag; consumer handles reorder callback.
- Keyboard behavior: arrow keys navigate between track rows; `Enter` or `Space` selects a track; drag reorder is keyboard-accessible via a grab-and-arrow pattern.
- Screen reader behavior: list uses `role="list"` with `role="listitem"` per track; active track announces "now playing"; track announces title, duration, and position.
- Motion rules: playing indicator animation respects `prefers-reduced-motion`; reorder drag transitions respect reduced motion.

---

## 5. Accessibility Requirements

- ARIA: `role="list"` on the container; `role="listitem"` per track; active track has `aria-current="true"` or an equivalent announcement.
- Drag handles (if present) must have an accessible label and keyboard drag support.
- Focus: focus ring is visible on all interactive rows.
- Contrast: active row highlight and track text must meet WCAG 2.1 AA.
- Active state must not rely on color alone; include an icon or text indicator.
- Reduced motion: suppress playing indicator animation and drag transition animations.

---

## 6. Theming Rules

- Required tokens: `background`, `backgroundHover`, `backgroundActive`, `borderColor`, `color`, `colorMuted`, `colorActive`, `focusStyle`, `space`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or row height values.
- Dark mode: active row highlight and track text must maintain sufficient contrast in dark themes.

---

## 7. Composition Rules

- Accepts a list of track objects (title, duration, optional thumbnail URL) and an active track index as props.
- May be composed alongside `AudioPlayer` or `VideoPlayer` to form a full media playback experience.
- Anti-patterns:
  - Do not embed playback logic inside the playlist component.
  - Do not hardcode track titles, durations, or thumbnails.
  - Do not implement shuffle or repeat logic inside the component; expose callbacks for these actions.

---

## 8. Performance Constraints

- Virtualize long playlists (50+ tracks) to avoid rendering off-screen rows.
- Memoize track rows when the track list prop is stable.
- No internal media API calls or data fetching.

---

## 9. Test Requirements

- Renders the correct number of track rows from props.
- Active track row is visually highlighted and announces "now playing" to screen readers.
- Pressing a track row fires `onTrackSelect` with the correct track index.
- Disabled tracks are non-interactive.
- Keyboard navigation (arrow keys, Enter, Space) works correctly.
- Focus ring is visible on focused rows.
- Drag reorder (if enabled) fires the reorder callback with updated order.
- Screen reader announces track title, duration, and position for each row.
- Passes axe accessibility audit in idle and playing states.
