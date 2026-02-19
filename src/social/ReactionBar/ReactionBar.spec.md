# Component Spec — ReactionBar

## 1. Purpose

Displays a horizontal bar of reaction controls allowing users to express an emotional response to a post, comment, or content item. Each reaction corresponds to a distinct emoji or icon and may show an aggregate count. The user can toggle their own reaction on or off.

Use when: social content (posts, comments, items) supports emoji reaction interactions. The ReactionBar is typically placed within PostCard.Actions or at the bottom of a comment item.

Do NOT use when: only a binary like/unlike interaction is needed (use a LikeButton primitive), or when reactions are informational-only and non-interactive (use a reaction count display component).

---

## 2. UX Intent

- Primary interaction goal: Allow users to quickly express a nuanced emotional response to content with a single tap, choosing from a small set of predefined reactions.
- Expected user mental model: Users expect the reaction bar to behave like Facebook/Messenger reactions or Slack emoji reactions — hovering or long-pressing reveals a picker, clicking the active button adds or toggles a reaction (Jakob's Law).
- UX laws applied:
  - Jakob's Law: Follow the emoji reaction pattern from major social platforms.
  - Hick's Law: Limit the number of available reactions to a small, curated set (typically 5–7). Too many reactions create decision paralysis.
  - Fitts's Law: Each reaction button must be a large enough target for reliable touch interaction (minimum 44x44pt).
  - Gestalt (Similarity and Proximity): Reaction buttons form a visually coherent group with consistent sizing and spacing.

---

## 3. Visual Behavior

- Layout rules:
  - A horizontal row (XStack) of reaction buttons.
  - Each reaction button displays an emoji/icon and optionally an aggregate count.
  - The user's active reaction is visually highlighted (accent background or animated bounce state).
  - On web, hovering the bar or a "+" button may reveal a reaction picker with the full reaction set.
  - Reaction counts update immediately upon toggle (optimistic update).
- Spacing expectations: Gap between reaction buttons uses a small space token. Internal button padding uses a small space token.
- Typography rules: Reaction count uses a caption token at regular weight.
- Token usage: Active reaction background, active reaction text/icon color, idle button background, idle button text/icon, hover state, focus ring must all use design tokens.
- Responsive behavior: On narrow viewports, reaction buttons may reduce their label size or hide counts until tapped. The row must not overflow its container; it may truncate or scroll if the reaction set is very large.

---

## 4. Interaction Behavior

- States:
  - Idle: All reaction buttons visible; none active.
  - Active (user reacted): The selected reaction button shows the active state (accent color, optional animation).
  - Hover (web, over a button): Button shows hover state; active button may show "remove reaction" affordance.
  - Focus: Visible focus ring on the focused reaction button.
  - Picker open: A reaction picker popover is visible above the bar.
  - Disabled: All buttons are non-interactive and de-emphasized.
- Controlled vs uncontrolled: The active reaction and counts are controlled props. The parent manages state; ReactionBar fires a callback when a reaction is toggled.
- Keyboard behavior:
  - Tab moves focus through the reaction bar as a group or through individual buttons.
  - Arrow Left/Right navigate between reaction buttons within the bar.
  - Enter or Space toggles the focused reaction.
  - If a picker is available, it opens with Enter/Space on the picker trigger and closes with Escape.
- Screen reader behavior:
  - The bar uses `role="group"` with `aria-label` (e.g., "React to this post").
  - Each button has `aria-label` (e.g., "Like, 24 reactions") and `aria-pressed` reflecting the active state.
  - Reaction count changes are announced via a polite live region.
- Motion rules: Toggling a reaction may trigger a brief bounce or scale animation on the button. Reduced motion suppresses the animation; the toggle is instant.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - Bar: `role="group"` with `aria-label`.
  - Each reaction button: `role="button"` (or native `<button>`), `aria-label` including reaction name and count, `aria-pressed` reflecting active state.
  - Reaction count live region: `aria-live="polite"` and `aria-atomic="true"` on the count element.
  - Picker trigger: `aria-expanded`, `aria-haspopup="dialog"` or `aria-haspopup="listbox"`.
- Focus rules: The reaction bar is a single Tab stop when treated as a toolbar; arrow keys navigate between buttons. Alternatively, each button is a Tab stop — the chosen model must be consistent. Focus ring must be clearly visible.
- Contrast expectations: Reaction emoji/icon must be distinguishable. Reaction count text must meet 4.5:1. Active state text must meet 4.5:1 against the active background. Reaction meaning must not rely solely on emoji color.
- Reduced motion behavior: Toggle animation is instant.

---

## 6. Theming Rules

- Required tokens: bar background (if any), idle button background, idle button text/icon, active button background (accent), active button text/icon, hover background, focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded hex colors, spacing, or font sizes.
- Dark mode expectations: Idle and active button backgrounds resolve to dark-mode values. Active accent must remain clearly distinguishable on dark surfaces.

---

## 7. Composition Rules

- What can wrap it: PostCard.Actions, a CommentItem.Actions area, or any content surface that supports emoji reactions.
- What it may contain: A horizontal group of individual reaction buttons, each with an emoji/icon and an optional count. An optional "+"/more button that opens the reaction picker.
- Anti-patterns:
  - Do not show more than 7 reaction options in the inline bar without a picker.
  - Do not convey the meaning of a reaction through color alone — use the emoji/icon and label.
  - Do not nest ReactionBar inside another ReactionBar.

---

## 8. Performance Constraints

- Memoization rules: ReactionBar must be memoized. Count updates for one reaction must not re-render the entire bar or other reaction buttons.
- Virtualization: Not applicable — the bar always has a small, fixed number of items.
- Render boundaries: Each reaction button is an independent render boundary. Count changes are isolated.

---

## 9. Test Requirements

- What must be tested:
  - All configured reaction buttons render from the supplied reaction list.
  - The active reaction button reflects the active state visually and via `aria-pressed="true"`.
  - Toggling a reaction fires the callback with the correct reaction type.
  - Reaction count increments optimistically on toggle.
  - Disabled state prevents all interactions.
- Interaction cases:
  - Tab moves focus to the bar; arrow keys navigate between buttons.
  - Enter/Space toggles the focused reaction.
  - Picker opens and closes correctly (if picker is implemented).
- Accessibility checks:
  - Bar has `role="group"` with accessible label.
  - Each button has `aria-label` with name and count, and `aria-pressed`.
  - Count live region is `aria-live="polite"`.
  - Focus ring is visible on all buttons.
  - Active contrast passes 4.5:1.
  - Reduced motion suppresses toggle animation.
