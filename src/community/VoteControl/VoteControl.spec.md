# Component Spec — VoteControl

## 1. Purpose

Provides an upvote/downvote (or upvote-only) control for community threads and comments, displaying the current score and allowing users to cast or retract their vote.

Use when: A community content item (thread, comment) supports user voting to surface quality or relevance.

Do NOT use when: Voting is not a feature of the content type, or the user is not permitted to vote (render a read-only score display instead).

---

## 2. UX Intent

- Primary interaction goal: Let users quickly signal agreement, quality, or relevance for a piece of content with a single tap, and see the aggregate community sentiment at a glance.
- Expected user mental model: Familiar from Reddit, Hacker News, and Stack Overflow — upvote and downvote arrows flanking a score count, with the active vote visually highlighted.
- UX laws applied:
  - Fitts's Law: Upvote and downvote buttons must be generously sized tap targets, especially on mobile.
  - Feedback (Doherty Threshold): Vote state must update optimistically on interaction, giving immediate visual feedback without waiting for server confirmation.
  - Proximity (Gestalt): Upvote, score, and downvote are tightly grouped as a single semantic unit.

---

## 3. Visual Behavior

- Layout: Vertical stack (upvote button → score → downvote button) for the standard forum column layout. May also support a horizontal layout variant for compact/inline use.
- Spacing: Tight, consistent spacing between the buttons and the score using spacing tokens. The score is centered between the two buttons.
- Typography: Score uses a bold, medium-sized text token. The text is center-aligned.
- Token usage: Button icon color (default, upvoted, downvoted), score text color, upvoted accent color, downvoted accent color — all from theme tokens. Upvoted state uses a positive/orange-ish accent token; downvoted uses a negative/blue-ish accent token (following the Reddit convention as a familiar reference).
- Responsive behavior: The control maintains its compact size across all breakpoints. The vertical variant is used in list contexts; horizontal variant may be used in compact card headers.

---

## 4. Interaction Behavior

- States:
  - Idle (no vote): Both buttons in default state; score shown neutrally.
  - Upvoted: Upvote button highlighted with the upvote accent color; score incremented.
  - Downvoted: Downvote button highlighted with the downvote accent color; score decremented.
  - Pending: After a vote interaction, the UI updates optimistically. A subtle loading indicator may appear if the server confirmation is delayed.
  - Disabled / read-only: Buttons are non-interactive; score is displayed without vote affordances.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the current vote state (`'up' | 'down' | null`), the score, and onVote callback.
- Keyboard behavior: Tab focuses the upvote button. Tab again focuses the downvote button (or skip if upvote-only). Enter/Space casts or retracts the focused vote.
- Screen reader behavior: Upvote button announces "Upvote. Current score: 42." or similar. The current user's vote state is communicated via `aria-pressed`. Score updates are announced via an `aria-live` region.
- Motion rules: Vote state change on the button animates with a quick scale pulse or color transition. Score count may animate (count-up/down). Reduced motion: instant state changes.

---

## 5. Accessibility Requirements

- ARIA requirements: Upvote and downvote are `<button>` elements with `aria-label` (e.g., "Upvote" / "Downvote") and `aria-pressed` reflecting the active vote state. Score is enclosed in an `aria-live="polite"` region to announce changes. If the control is read-only, buttons are replaced with non-interactive elements or given `aria-disabled`.
- Focus rules: The two buttons are in natural tab order. In vertical layout, upvote comes before downvote in DOM order. In disabled state, buttons are excluded from tab order.
- Contrast expectations: Default icon color, upvoted accent color, and downvoted accent color all meet WCAG AA against the component background.
- Reduced motion behavior: All animation on vote interaction is suppressed.

---

## 6. Theming Rules

- Required tokens: default icon color, upvote accent color (active state), downvote accent color (active state), score text color, button hover background, focus ring color, spacing tokens, button size token.
- Prohibited hardcoded values: No hardcoded colors, pixel sizes, or z-index values.
- Dark mode expectations: Default, upvoted, and downvoted color tokens have dark-mode variants. Score text adapts to dark text token.

---

## 7. Composition Rules

- What can wrap it: Used inside `ThreadCard`, `NestedCommentTree` comment nodes, and potentially in a thread detail header.
- What it may contain: An upvote button (icon), a score text element, and optionally a downvote button (icon).
- Anti-patterns:
  - Do not embed vote API calls inside this component.
  - Do not use this component to display non-numeric sentiment (e.g., emoji reactions) — it is specifically for numeric up/down voting.
  - Do not show the downvote button when the context only supports upvoting — the parent controls which buttons are rendered.

---

## 8. Performance Constraints

- Memoization rules: The component should be memoized and only re-render when the score or vote state changes.
- Virtualization: Not applicable.
- Render boundaries: No API calls inside this component. Optimistic updates are the parent's responsibility.

---

## 9. Test Requirements

- What must be tested:
  - Renders upvote button, score, and downvote button correctly.
  - Upvoted state: upvote button is highlighted, score reflects upvote.
  - Downvoted state: downvote button is highlighted, score reflects downvote.
  - No-vote state: both buttons are in default state.
  - Read-only/disabled state: buttons are non-interactive.
- Interaction cases:
  - Clicking the upvote button fires the onVote callback with "up".
  - Clicking an already-upvoted upvote button fires the onVote callback with null (retract).
  - Clicking the downvote button fires the onVote callback with "down".
  - Enter/Space on focused button activates the vote.
- Accessibility checks:
  - Both buttons have `aria-label` and `aria-pressed` set correctly.
  - Score is in an `aria-live` region and updates are announced.
  - Disabled state buttons are excluded from tab order.
  - Contrast passes for default, upvoted, and downvoted states.
  - Reduced motion: vote animations suppressed.
