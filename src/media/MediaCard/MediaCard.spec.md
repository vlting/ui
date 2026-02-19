# Component Spec — MediaCard

## 1. Purpose

Displays a summary of a media asset — image, video, audio, or document — including a thumbnail, title, and metadata in a card format suitable for grids and lists.

Use when: rendering media assets in a library grid, search results, or content picker.

Do NOT use when: displaying a media asset in full detail (use `MediaViewerModal`) or embedding a playable audio/video inline (use `AudioPlayer` or `VideoPlayer`).

---

## 2. UX Intent

- Primary interaction goal: allow users to identify and select media assets by scanning thumbnails, titles, and key metadata quickly.
- Expected user mental model: a content card analogous to a file browser tile — thumbnail above, title and metadata below.
- UX laws applied:
  - **Gestalt (Figure/Ground, Proximity)** — thumbnail is the dominant element; title and metadata are visually grouped below.
  - **Fitts's Law** — the card's entire hit area should be pressable, not just the title text.
  - **Miller's Law** — limit visible metadata fields to 2–3 (e.g., type, duration/size, date).
  - **Jakob's Law** — follows file browser and media library card conventions.

---

## 3. Visual Behavior

- Layout: composed via `MediaCard.Thumbnail`, `MediaCard.Title`, and `MediaCard.Meta` sub-components within the `MediaCard` root.
- Thumbnail slot: occupies the top portion of the card; maintains a consistent aspect ratio (e.g., 16:9 or 1:1 depending on consumer configuration); renders a placeholder when no thumbnail is available.
- Title slot: single line with ellipsis overflow; positioned below the thumbnail.
- Meta slot: secondary text line(s) showing type, duration, file size, or date.
- Spacing: all padding and gap values reference space tokens.
- Typography: title uses body-medium token; meta uses caption/muted token.
- Token usage: background, border, thumbnail overlay, and text colors reference theme tokens only.
- Responsive behavior: card width is determined by its grid or list container; internal layout does not change.

---

## 4. Interaction Behavior

- States:
  - **idle**: renders thumbnail, title, and meta.
  - **hover**: subtle background or elevation shift; an optional overlay action (e.g., play icon) may appear on the thumbnail.
  - **focus**: visible focus ring on the card root.
  - **selected**: border highlight and/or checkmark overlay on the thumbnail.
  - **disabled**: reduced opacity; non-interactive.
  - **loading**: skeleton placeholder for thumbnail, title, and meta.
- The card is pressable; pressing it fires an `onPress` callback; selection state is controlled externally.
- Controlled/uncontrolled: selection state is controlled externally.
- Keyboard behavior: `Enter` and `Space` activate the card when focused.
- Screen reader behavior: card announces the media title and type as its accessible name; selected state is communicated.
- Motion rules: hover overlay and selection transitions respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA: `role="button"` or `role="option"` (within a listbox) depending on context; selected state via `aria-selected` or `aria-pressed`.
- Thumbnail placeholder must have an `alt` text or `aria-label`.
- Focus: focus ring is visible and never clipped.
- Contrast: title and meta text meet WCAG 2.1 AA against the card background.
- Selected/hover states must not rely on color alone; a border, checkmark, or outline accompanies color changes.
- Reduced motion: suppress hover overlay transitions and selection animations.

---

## 6. Theming Rules

- Required tokens: `background`, `backgroundHover`, `backgroundSelected`, `borderColor`, `borderColorSelected`, `color`, `colorMuted`, `focusStyle`, `space`, `borderRadius`.
- Thumbnail placeholder background uses a token, not a hardcoded color.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or aspect-ratio numbers.
- Dark mode: all tokens must resolve correctly; thumbnail placeholder must remain visible in dark mode.

---

## 7. Composition Rules

- Composed using `MediaCard`, `MediaCard.Thumbnail`, `MediaCard.Title`, `MediaCard.Meta`.
- May be placed inside `MediaLibraryGrid` or a generic list/grid container.
- Anti-patterns:
  - Do not embed a full `AudioPlayer` or `VideoPlayer` inside a `MediaCard`; use thumbnail overlays and navigate to a detail view or modal.
  - Do not hardcode media types, titles, or metadata labels.
  - Do not nest another `MediaCard` inside this component.

---

## 8. Performance Constraints

- Thumbnail images are lazy-loaded by the consumer; the component must not block rendering waiting for an image.
- Memoize when rendered inside a large `MediaLibraryGrid`.
- No internal data fetching or subscriptions.

---

## 9. Test Requirements

- Renders thumbnail, title, and meta from props.
- Renders a placeholder when no thumbnail is provided.
- Title truncates with ellipsis when the text overflows.
- Fires `onPress` when the card is activated.
- Selected state renders a visible checkmark or border change.
- Disabled state renders as non-interactive.
- Loading state renders skeleton placeholders.
- Focus ring is visible when focused via keyboard.
- Screen reader announces the media title and selected state.
- Passes axe accessibility audit in idle, selected, and loading states.
