# Media Playbook

## 1. Problem Space

Media patterns cover browsing, playing, uploading, and organizing rich media assets. Primary module: `media` (video, audio, images, playlists, media library). Secondary: `social` (`PostMediaGallery` for media within posts), `dating` (`PhotoGalleryUploader` for profile photos), `collaboration` (`AttachmentPreview` for file previews), `messaging` (`VoiceMessagePlayer` for in-chat audio).

---

## 2. UX Laws Applied

- **Jakob's Law** — Media player controls must follow universal conventions: play/pause in center, timeline scrubber below, volume on the right, fullscreen in the far right corner. Do not reinvent player UI.
- **Doherty Threshold** — Media should begin loading immediately. Use skeleton loaders for `MediaCard` grids. Video and audio must show a loading state while buffering.
- **Fitts's Law** — Play/pause button must be the largest control in the player. Touch targets for scrubber and volume must be at least 44px.
- **Gestalt Proximity** — Playlist items belong visually adjacent to the active player. Media metadata (title, author, duration) must be grouped together, not scattered.
- **Peak-End Rule** — Successful upload is a memorable moment. `UploadProgressItem` must show a clear completion state. Failed upload must clearly communicate what went wrong and offer retry.
- **Aesthetic-Usability Effect** — Media-heavy UIs must be visually calm. Use consistent aspect ratios for `MediaCard` thumbnails. Do not mix portrait and landscape thumbnails without intentional masonry layouts.

---

## 3. Standard Layout Pattern

### Media Library Page
```
<AppShell>
  <PageHeader title="Media Library" actions={<Button>Upload</Button>} />
  <Section>
    <MediaTagFilter />
    <MediaLibraryGrid
      renderItem={(item) => <MediaCard />}
    />
  </Section>
</AppShell>
```

### Media Detail / Player Page
```
<AppShell>
  <PageHeader breadcrumbs={<Breadcrumbs />} />
  <Section>
    <VideoPlayer />              {/* or AudioPlayer */}
    <Stack>
      {/* title, description, metadata */}
    </Stack>
    <MonetizedContentLock />    {/* if content is gated */}
    <Playlist />                {/* related / next up */}
  </Section>
</AppShell>
```

### Upload Flow
```
<Dialog>                        {/* or Sheet on mobile */}
  <DragAndDropZone />           {/* or MultiImageUploader for images */}
  <UploadProgressItem />        {/* one per uploading file */}
</Dialog>
```

### Header Pattern
- `PageHeader` with the library or channel name.
- "Upload" `Button` in the header actions slot.
- `MediaTagFilter` below the header for tag-based content filtering.

### Filters
- `MediaTagFilter` for filtering by content type, tag, or category.
- Date range filtering (use `DateRangeSelector` from analytics) for recently added content.

### Primary CTA
- "Upload" `Button` — opens upload flow.
- "Play" — the play button within `VideoPlayer` / `AudioPlayer` is the primary interaction.

### Secondary CTA
- "Add to Playlist" from `MediaCard` overflow menu.
- "Download" from `MediaCard` or player controls (if permitted).
- "Share" via `ShareModal` (social module).

---

## 4. Component Mapping

| Need | Component |
|------|-----------|
| Video playback | `VideoPlayer` |
| Audio playback | `AudioPlayer` |
| Voice message in chat | `VoiceMessagePlayer` (messaging) |
| Media item thumbnail card | `MediaCard` |
| Grid of media library items | `MediaLibraryGrid` |
| Filter by tag/type | `MediaTagFilter` |
| Full-screen media viewer | `MediaViewerModal` |
| Ordered list of media items | `Playlist` |
| Upload file progress tracker | `UploadProgressItem` |
| Upload overall tracker | `ProgressTracker` |
| Gated / paywalled content | `MonetizedContentLock` |
| Multi-image upload (profile) | `MultiImageUploader` (forms) |
| File drag-and-drop upload | `DragAndDropZone` (forms) |
| File attachment preview | `AttachmentPreview` (collaboration) |
| Media within a social post | `PostMediaGallery` (social) |
| Profile photo upload | `PhotoGalleryUploader` (dating) |

---

## 5. Accessibility Rules

- `VideoPlayer` must support keyboard controls: Space (play/pause), arrow keys (seek 5s), M (mute), F (fullscreen).
- `VideoPlayer` must support closed captions; the CC toggle must be keyboard-accessible.
- `AudioPlayer` must have the same keyboard controls as `VideoPlayer` (minus fullscreen).
- `VoiceMessagePlayer` must provide a text transcript option for accessibility.
- `MediaCard` in a grid must be keyboard-navigable (Tab between cards, Enter/Space to activate).
- `MediaLibraryGrid` with selection must announce selection state via `aria-checked` or `aria-selected`.
- `MediaViewerModal` must trap focus and restore focus to the triggering `MediaCard` on close.
- `DragAndDropZone` and `MultiImageUploader` must provide a button fallback for keyboard users who cannot drag.
- `UploadProgressItem` progress must be communicated via `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
- `MonetizedContentLock` must communicate why content is locked and provide a clear action to unlock, accessible via keyboard.
- `Playlist` items must be keyboard-navigable and indicate the currently playing item via `aria-current="true"`.

---

## 6. Anti-Patterns

- **Autoplay video with sound** — `VideoPlayer` must never autoplay with audio. Muted autoplay (for preview purposes) is acceptable with a clear unmute control.
- **No buffering state** — Never show a paused player with no indication of whether it is loading or paused. The player must distinguish between "paused" and "buffering".
- **`MediaLibraryGrid` without pagination or virtual scroll** — Large media libraries must use pagination or `VirtualizedList` equivalent. Loading 500 thumbnails into the DOM degrades performance severely.
- **`MonetizedContentLock` with no preview** — Gated content must show enough preview (thumbnail, title, short description) to motivate the user to unlock it. A black box with a lock icon is not sufficient.
- **Upload without progress feedback** — Never start a file upload without immediately showing `UploadProgressItem`. Users must not be left wondering if the upload started.
- **Playlist autoadvance without notification** — When `Playlist` autoadvances to the next item, announce it (brief toast or player title update). Do not silently switch content.
- **Mixing aspect ratios in `MediaLibraryGrid`** — Use consistent aspect ratio constraints in `MediaCard` thumbnails. Mixed ratios create a chaotic grid. Use object-fit cover within a fixed aspect ratio container.
- **`MediaViewerModal` without navigation** — When viewing a single item from a `MediaLibraryGrid`, the modal should support previous/next navigation without closing and reopening.

---

## 7. Variants

### Density Increase
- `MediaLibraryGrid` compact mode: smaller thumbnails, more columns, minimal metadata overlay.
- `Playlist` list mode: compact row per item (thumbnail + title + duration), no description.
- `AudioPlayer` mini mode: collapsed to a bottom bar (similar to Spotify mini player) for background listening while browsing.

### Mobile Behavior
- `VideoPlayer` goes fullscreen on orientation change to landscape.
- `MediaLibraryGrid` uses 2-column grid on mobile (from 3–4 on desktop).
- `AudioPlayer` becomes a persistent bottom bar on mobile when media is playing.
- `Playlist` on mobile: opens as a `Sheet` from the player page.
- Upload (`DragAndDropZone`) on mobile: always shows the "tap to browse" button, as drag is not available.
- `MediaViewerModal` on mobile: full-screen, swipe left/right to navigate between items.

### Edge Cases
- **Upload failure**: `UploadProgressItem` must show a failed state with the error reason and a "Retry" button. Failed items must remain in the list until dismissed or retried.
- **Unsupported file type**: Validate before upload begins. Show an `InlineError` with supported formats listed.
- **Very long playlists**: `Playlist` must virtualize items beyond 50 entries.
- **Slow network / buffering**: `VideoPlayer` and `AudioPlayer` must show a spinner overlay during buffering and degrade gracefully (lower quality) rather than stalling.
- **`MonetizedContentLock` for non-subscribers**: The lock overlay must not be dismissible without fulfilling the unlock requirement (e.g., subscription upgrade). Ensure the unlock flow routes to the correct `SubscriptionSelector` or `UpgradeModal`.
