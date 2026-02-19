# Component Spec — SwipeCard

## 1. Purpose

Displays the primary interactive card shown to a user during the profile discovery (swiping) experience. It presents a single potential match's photo, basic info, and action buttons, and supports gesture-driven or button-driven like/pass/super-like decisions.

Use when: rendering a single profile in the swipe deck during discovery.

Do NOT use for: matched profiles (use MatchCard), profile previews in non-swipe contexts (use ProfilePreviewCard), or any non-discovery browsing.

---

## 2. UX Intent

- Primary interaction goal: enable fast, decisive, low-effort evaluation of profiles — one at a time.
- Expected user mental model: a physical card that can be flicked left (pass) or right (like), with action buttons as an alternative for users who prefer tapping (Jakob's Law, platform convention for dating apps).
- UX laws applied:
  - Fitts's Law: the like, pass, and super-like action buttons must have large, well-separated touch targets. The gesture area covers the full card.
  - Doherty Threshold: like/pass decisions must produce instant visual feedback — no perceptible delay before the card begins to animate away.
  - Gestalt (figure/ground): the profile photo dominates; text and actions are layered over the bottom of the photo or below it.

---

## 3. Visual Behavior

- Layout: a full-width, tall card composed of three sub-areas — `SwipeCard.Photo` (dominant), `SwipeCard.Info` (name, age, bio snippet, distance), and `SwipeCard.Actions` (like, pass, super like buttons).
- Photo fills the card top to a defined ratio; Info is overlaid at the bottom of the photo area or stacked below.
- Action buttons are centered horizontally below the photo/info area.
- During a swipe gesture, the card rotates slightly in the direction of movement; a like or pass overlay label fades in based on direction.
- Spacing: internal padding and gap between action buttons use space tokens.
- Typography: name/age uses a heading-small token; bio uses a body token; tokens are applied over a semi-transparent overlay for legibility over photos.
- Token usage: overlay gradient, action button backgrounds, text colors, and border from theme tokens.
- Responsive: card fills available width up to a max-width; height is proportional.

---

## 4. Interaction Behavior

- States: idle, swiping-right (like preview overlay visible), swiping-left (pass preview overlay visible), swiping-up (super like preview overlay visible), dismissed (card exits), loading (placeholder while next card loads).
- Gesture input (drag/swipe) triggers directional movement and visual feedback; release past a threshold commits the action; release before the threshold snaps the card back.
- Button input triggers the equivalent action without gesture animation.
- The component is controlled: the parent receives `onLike`, `onPass`, and `onSuperLike` callbacks.
- Keyboard behavior:
  - The card surface or action buttons are focusable.
  - Keyboard shortcuts (e.g., Left arrow = pass, Right arrow = like, Up arrow = super like) are supported when the card has focus.
  - Tab navigates between action buttons.
- Screen reader behavior: the card is announced with a label including the person's name and age. Action buttons have distinct accessible labels ("Like", "Pass", "Super Like").
- Motion: swipe animation, card exit, and overlay fade respect `prefers-reduced-motion` (instant state change, no positional animation).

---

## 5. Accessibility Requirements

- The card container has an accessible label including the person's name (e.g., "Profile of Alex, 27").
- `SwipeCard.Photo` image has a descriptive `alt` attribute.
- Each action button in `SwipeCard.Actions` has a clear `aria-label` ("Like [name]", "Pass on [name]", "Super Like [name]").
- Directional overlay labels ("LIKE", "NOPE") are `aria-hidden="true"` — the action buttons communicate the decision to screen readers.
- Keyboard swipe shortcuts are documented via `aria-keyshortcuts` or equivalent.
- Contrast: text over photo overlay meets 4.5:1; action button icons/labels meet contrast requirements.
- Focus ring visible on action buttons.
- Reduced motion: no card rotation, no overlay fade animation; actions take immediate effect.

---

## 6. Theming Rules

- Required tokens: `background`, overlay gradient tokens (semi-transparent), action button surface and icon tokens, semantic like/pass/super-like color tokens, `borderRadius` for card corners.
- Prohibited hardcoded values: no raw colors, no pixel-level animation values baked into style.
- Dark mode: overlay, action button surfaces, and text tokens must resolve correctly. Photo content is user-provided and must remain legible over the overlay in both modes.

---

## 7. Composition Rules

- What can wrap it: `SwipeDeck` (primary host), a discovery screen layout.
- What it may contain (via sub-components): `SwipeCard.Photo`, `SwipeCard.Info`, `SwipeCard.Actions`. May also host a `SuperLikeIndicator` overlay.
- Anti-patterns:
  - Do not use SwipeCard outside of a SwipeDeck unless explicitly building a single-card preview.
  - Do not embed navigation controls inside the card that compete with like/pass actions.
  - Do not render SwipeCard without at least a photo and a name.

---

## 8. Performance Constraints

- The next card in the SwipeDeck must be pre-rendered below the current card so it is visible instantly when the current card exits.
- Gesture tracking must not block the main thread — use native gesture handling where available.
- Photo must use a thumbnail placeholder until the full image loads.
- Memoize SwipeCard to prevent re-renders from sibling state changes in the deck.

---

## 9. Test Requirements

- Renders `SwipeCard.Photo`, `SwipeCard.Info`, and `SwipeCard.Actions` with provided data.
- Photo has a non-empty `alt` attribute.
- Each action button has a distinct, descriptive `aria-label`.
- Pressing Like button calls `onLike`.
- Pressing Pass button calls `onPass`.
- Pressing Super Like button calls `onSuperLike`.
- Keyboard: Right arrow calls `onLike`, Left arrow calls `onPass`, Up arrow calls `onSuperLike` when card is focused.
- Like overlay is visible during right swipe gesture; Pass overlay during left swipe.
- Overlays are `aria-hidden="true"`.
- No swipe animation when `prefers-reduced-motion` is active.
- Passes automated accessibility audit.
- Snapshot test for idle state.
