# Component Spec — MatchCard

## 1. Purpose

Displays a summary representation of a mutual match between two users in a dating context. It presents the matched user's photo, name, age, and a short bio snippet, allowing the current user to quickly identify and act on their matches.

Use when: rendering an individual match inside a match list, a matches inbox, or a recently-matched notification surface.

Do NOT use for: displaying a potential match before a mutual like (use SwipeCard or ProfilePreviewCard), or displaying the current user's own profile.

---

## 2. UX Intent

- Primary interaction goal: allow users to quickly scan their matches and decide which to engage with.
- Expected user mental model: a contact card or chat preview tile — tappable, clearly showing who the match is and prompting the next action (start a conversation) (Jakob's Law).
- UX laws applied:
  - Gestalt (figure/ground): the photo is the dominant element; text is layered or adjacent, creating a clear visual hierarchy.
  - Fitts's Law: the entire card is a pressable target; tap area is maximized.
  - Miller's Law: only the most salient details (photo, name, age, short bio) are shown; full profile is accessed by navigating into the match.

---

## 3. Visual Behavior

- Layout: a card container with a prominent photo area at the top (or left on wider layouts), followed by name, age, and bio text.
- Compound sub-components: `MatchCard.Photo`, `MatchCard.Name`, `MatchCard.Age`, `MatchCard.Bio`.
- Photo fills its slot fully; aspect ratio is fixed (e.g., 4:5 or 1:1 depending on context).
- Name and age appear on the same line or in close proximity; bio is truncated to 1–2 lines with ellipsis.
- A "new match" indicator (dot, badge, or highlight) may be overlaid or adjacent when the match has not yet been viewed.
- Spacing: internal padding and gap between elements use space tokens.
- Typography: name uses a heading-small or label-emphasis token; age uses a body token; bio uses a body-small token.
- Token usage: background, border, shadow, and text colors from theme tokens.
- Responsive: minimum card width on mobile fills the column; on larger screens cards may be displayed in a grid.

---

## 4. Interaction Behavior

- States: idle, hovered/pressed (visual press feedback), unread (new match indicator visible).
- The card is pressable; pressing it triggers the `onPress` callback to navigate to the match conversation or full profile.
- No internal interactive sub-controls — the card is a single press target.
- Keyboard behavior: the card is focusable; Enter or Space activates the `onPress` callback.
- Screen reader behavior: the card is announced as a button or link with an accessible label that includes the matched user's name (e.g., "Match with Alex, 28").
- Motion: a subtle press-scale or opacity reduction on press. Respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- The card container has `role="button"` or is rendered as a pressable with an `aria-label` that includes the match's name and age.
- `MatchCard.Photo` image has a descriptive `alt` text (e.g., the user's name).
- `MatchCard.Bio` text is not required for accessibility but must not be hidden from screen readers.
- New match indicator has an `aria-label` or visually-hidden text (e.g., "New match").
- Contrast: name, age, and bio text must meet 4.5:1 against the card background.
- Focus ring is visible and uses a focus token.
- Reduced motion: disable press animation.

---

## 6. Theming Rules

- Required tokens: `background`, `borderColor`, `color` (for all text), shadow token, radius token for card rounding, accent token for new-match indicator.
- Prohibited hardcoded values: no raw colors, no pixel-based border radius or shadow values.
- Dark mode: card surface, text, and indicator colors must all resolve via theme tokens.

---

## 7. Composition Rules

- What can wrap it: `MatchList`, a grid or list layout, a scroll container.
- What it may contain (via sub-components): `MatchCard.Photo`, `MatchCard.Name`, `MatchCard.Age`, `MatchCard.Bio`.
- Sub-components must be used in composition — they are not independently meaningful outside a `MatchCard` context.
- Anti-patterns:
  - Do not place interactive controls (buttons, links) inside the card that compete with the card-level press target.
  - Do not use MatchCard to display profiles the user has not yet mutually matched with.
  - Do not render MatchCard without at least a name and photo.

---

## 8. Performance Constraints

- Memoize MatchCard to prevent re-renders when sibling cards update in the list.
- Photo should use lazy loading or a placeholder thumbnail until the image resolves.
- No internal virtualization — MatchList is responsible for list-level virtualization.

---

## 9. Test Requirements

- Renders `MatchCard.Photo`, `MatchCard.Name`, `MatchCard.Age`, and `MatchCard.Bio` with provided prop values.
- Bio text is truncated at the specified line count.
- Pressing the card calls `onPress`.
- Enter key calls `onPress` when card is focused.
- Card has an accessible label including the match's name.
- Photo has a non-empty `alt` attribute.
- New match indicator is present and has an accessible label when `isNew` prop is true.
- No new match indicator when `isNew` is false.
- Passes automated accessibility audit.
- No press animation when `prefers-reduced-motion` is active.
- Snapshot test for idle and unread states.
