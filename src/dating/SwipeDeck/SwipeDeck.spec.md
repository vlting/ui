# Component Spec — SwipeDeck

## 1. Purpose

Manages and presents a stacked collection of SwipeCard components, orchestrating the visual deck metaphor where one card is in focus on top while subsequent cards are visible behind it. It coordinates card transitions as users swipe or tap to like, pass, or super like.

Use when: the main discovery (swiping) experience needs to display a sequence of profiles one at a time with visual depth.

Do NOT use for: flat lists of profiles, match lists, or any context where the stacked-card metaphor is not appropriate.

---

## 2. UX Intent

- Primary interaction goal: maintain a continuous, engaging flow of profile decisions with zero perceptible lag between cards.
- Expected user mental model: a physical deck of cards where the top card is removed when acted upon and the next slides into view — a pervasive dating app convention (Jakob's Law).
- UX laws applied:
  - Doherty Threshold: the next card must be visible and ready before the current card finishes its exit animation.
  - Gestalt (depth/layering): cards beneath the active card are slightly scaled and offset to convey depth without visual clutter.
  - Hick's Law: only one card is in focus at a time; the user makes one decision before the next card arrives.

---

## 3. Visual Behavior

- Layout: a fixed-size container displaying 2–3 stacked SwipeCard components, with the top card fully visible and subsequent cards peeking behind it at reduced scale and slight vertical offset.
- The top card is interactive (gesture and button input).
- Background cards are non-interactive and slightly scaled down (e.g., each successive card is 95% the scale of the one in front).
- When the deck is empty, an empty state is displayed — a friendly prompt to revisit later or expand search radius.
- Spacing: card stack offset and scale are derived from a token or configurable prop, not hardcoded pixels.
- Token usage: background, empty state illustration tint, and any visible deck shadow from theme tokens.
- Responsive: the deck fills the available content area; card dimensions are proportional.

---

## 4. Interaction Behavior

- States: active (cards available), empty (no more cards), loading (fetching next batch — show a loading placeholder), error (fetch failed — show retry prompt).
- The deck is controlled: the parent supplies the card data array and receives action callbacks (`onLike`, `onPass`, `onSuperLike`, `onEmpty`) which it uses to manage the data set (e.g., appending new cards, removing acted-upon cards).
- When the active card exits (via swipe or button), the next card animates into the top position.
- Keyboard behavior:
  - Focus remains on the top card's actions; when a card is dismissed, focus moves to the new top card's first action.
  - The deck container itself does not intercept keyboard events unrelated to card navigation.
- Screen reader behavior: the deck announces how many profiles remain (e.g., "Profile 1 of 10") or that the deck is empty.
- Motion: card exit (swipe fly-off), card promotion (scale-up from background), and entrance of background cards all animate. Respects `prefers-reduced-motion` — all transitions are instant; no positional or scale animation.

---

## 5. Accessibility Requirements

- The deck container has an `aria-label` describing its purpose (e.g., "Profile discovery").
- A live region announces card transitions to screen reader users ("Next profile: [Name], [Age]").
- The empty state has a descriptive accessible label.
- Loading state skeleton has `aria-busy="true"` on the container or an appropriate `aria-label`.
- Focus management: when a card is dismissed, focus moves automatically to the primary action of the new top card.
- Reduced motion: no animation for card exit, card promotion, or background card scaling.

---

## 6. Theming Rules

- Required tokens: `background` (deck container), depth shadow tokens for card stack effect, empty state illustration tint, loading placeholder color.
- Prohibited hardcoded values: no raw color values, no pixel-based stack offsets or scale values outside the design token scale.
- Dark mode: deck background, shadow tones, and empty state must resolve via theme tokens.

---

## 7. Composition Rules

- What can wrap it: a discovery screen layout, a full-screen content area.
- What it may contain: SwipeCard components, an empty state view, and a loading state placeholder.
- Anti-patterns:
  - Do not embed data-fetching logic inside SwipeDeck — pass card data from the parent.
  - Do not use SwipeDeck with non-SwipeCard children.
  - Do not render SwipeDeck without defining `onEmpty` to handle deck exhaustion.

---

## 8. Performance Constraints

- Pre-render the next 2–3 cards below the top card so they are ready when needed.
- Card exit animation must complete within 300ms to maintain perceived flow (or be instant under reduced motion).
- Memoize SwipeCard children; the deck must not re-render non-top cards on every gesture event of the top card.
- Gesture tracking for the top card must not trigger re-renders of background cards.
- When the card supply runs low, signal the parent via a callback (e.g., `onNearEmpty`) to fetch additional profiles before the deck empties.

---

## 9. Test Requirements

- Renders the top card and at least one background card when multiple profiles are available.
- Calling `onLike`, `onPass`, or `onSuperLike` on the top card causes it to be removed and the next card to become active.
- Empty state is displayed when no cards remain.
- Loading state is displayed when `isLoading` is true.
- Error state with retry is shown when `isError` is true.
- Live region announces the new top card's name after a transition.
- Focus moves to the new top card's first action after a card is dismissed.
- Deck container has a descriptive `aria-label`.
- `onEmpty` callback is called when the last card is acted upon.
- `onNearEmpty` callback is called when the card supply drops below the configured threshold.
- No animation on card transitions when `prefers-reduced-motion` is active.
- Passes automated accessibility audit.
