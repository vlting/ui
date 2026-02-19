# Component Spec — ProfilePreviewCard

## 1. Purpose

Displays a read-only summary of another user's dating profile, intended to give the current user enough context to make an informed like/pass decision. It surfaces the most compelling profile details — photo, name, bio, and interests — without exposing the full profile view.

Use when: presenting a profile within a discovery context, search results, or a "who liked you" list where the user must evaluate without navigating away.

Do NOT use for: displaying the current user's own profile, mutual match cards (use MatchCard), or full profile detail pages.

---

## 2. UX Intent

- Primary interaction goal: let users quickly evaluate whether a profile is interesting enough to act on.
- Expected user mental model: a "preview pane" or expanded profile thumbnail — more detailed than a swipe card but less than a full profile page (Jakob's Law).
- UX laws applied:
  - Miller's Law: surface the highest-signal details (photo, name, bio snippet, key interests) only; omit rarely-evaluated fields.
  - Gestalt (figure/ground): the photo is the dominant visual element; text content is layered below or adjacent.
  - Doherty Threshold: the card renders its content synchronously; image loading uses a placeholder to prevent layout shift.

---

## 3. Visual Behavior

- Layout: a card container with `ProfilePreviewCard.Photo` occupying the top or dominant portion, followed by `ProfilePreviewCard.Name`, `ProfilePreviewCard.Bio`, and `ProfilePreviewCard.Interests`.
- Photo uses a fixed aspect ratio (portrait or square); fills the slot without stretching.
- Name uses a heading-small type token; bio is truncated at 2–3 lines with ellipsis; interests render as compact chip/tag elements.
- If a "super like" or premium badge applies, it may be overlaid on the photo area.
- Spacing: internal padding and section gaps use space tokens.
- Token usage: all background, text, border, and chip colors from theme tokens.
- Responsive: card spans full width on mobile; constrained max-width on larger screens.

---

## 4. Interaction Behavior

- States: idle, hovered/pressed (subtle elevation change), loading (image placeholder visible).
- The card may be pressable to expand to a full profile view; pressing triggers an `onPress` callback.
- Sub-components are display-only and not individually interactive.
- Keyboard behavior: if the card is pressable, it is focusable via Tab; Enter or Space triggers `onPress`.
- Screen reader behavior: the card is announced as a button or a grouped region; the accessible label includes the person's name and age.
- Motion: press feedback uses a subtle scale or opacity change. Respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- If the card is pressable, it has `role="button"` and an `aria-label` including the person's name (e.g., "View profile of Alex, 27").
- `ProfilePreviewCard.Photo` image has a non-empty `alt` attribute (e.g., the person's name).
- `ProfilePreviewCard.Interests` chips are rendered as a visually labeled list but may be `aria-hidden="true"` if the label is already conveyed in the card-level accessible name to avoid redundancy.
- Bio text is not hidden from screen readers.
- Contrast: name, bio, and interest chip text meet 4.5:1 against their backgrounds.
- Reduced motion: no press animation.

---

## 6. Theming Rules

- Required tokens: `background`, `borderColor`, shadow token, `color` (name and bio text), radius token for card shape, chip background and text tokens for interest tags.
- Prohibited hardcoded values: no raw colors, no hardcoded font sizes or pixel spacing.
- Dark mode: card surface, text, interest chips, and overlays must resolve correctly via theme tokens.

---

## 7. Composition Rules

- What can wrap it: a discovery feed, a "who liked you" list, a search results grid, or a sheet/modal surface.
- What it may contain (via sub-components): `ProfilePreviewCard.Photo`, `ProfilePreviewCard.Name`, `ProfilePreviewCard.Bio`, `ProfilePreviewCard.Interests`.
- Sub-components are compositional; they do not carry meaning in isolation.
- Anti-patterns:
  - Do not use ProfilePreviewCard to display the current user's own profile.
  - Do not embed action buttons (like, pass, super like) inside the card — keep it read-only; place actions outside.
  - Do not render the card without at least a photo and a name.

---

## 8. Performance Constraints

- Photo must use a low-resolution placeholder until the full image loads; placeholder must match the slot dimensions to prevent layout shift.
- Memoize ProfilePreviewCard to avoid re-renders when sibling cards change in a list or grid.
- Interest chips are rendered inline; no virtualization needed for a small set (up to ~10 chips).

---

## 9. Test Requirements

- Renders `ProfilePreviewCard.Photo`, `ProfilePreviewCard.Name`, `ProfilePreviewCard.Bio`, and `ProfilePreviewCard.Interests` with provided prop values.
- Bio text truncates at the configured line count.
- Photo has a non-empty `alt` attribute.
- Card has an accessible label when pressable, including the person's name.
- Pressing the card calls `onPress`.
- Enter key calls `onPress` when card is focused.
- No press animation when `prefers-reduced-motion` is active.
- Passes automated accessibility audit.
- Snapshot test for idle state.
