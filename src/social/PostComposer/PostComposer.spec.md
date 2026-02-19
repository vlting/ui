# Component Spec — PostComposer

## 1. Purpose

Provides a structured input surface for creating and publishing a new social post. The composer handles text input, optional media attachment, audience selection, and submission — acting as the primary content creation entry point for a social platform.

Use when: a user intends to create a new post, update, or status message on a social platform, whether from a dedicated compose page, a modal, or an inline feed widget.

Do NOT use when: the user is editing an existing post (use a post edit variant), composing a direct message (use a messaging composer), or writing a comment (use the comment compose area within CommentThread or PMCommentSidebar).

---

## 2. UX Intent

- Primary interaction goal: Minimize the friction of creating and submitting a post. The composer should feel open, inviting, and immediate — making the user want to write.
- Expected user mental model: Users expect the composer to behave like the tweet/post box on Twitter/X, Facebook, or LinkedIn (Jakob's Law) — a large, inviting text area with a post button and media/attachment affordances.
- UX laws applied:
  - Jakob's Law: Match the compose box pattern from established social platforms.
  - Hick's Law: Surface only the most essential actions (attach media, audience selector, post button). Reveal advanced options progressively.
  - Fitts's Law: The post/submit button must be large and easily reachable. The text area fills the available space for easy targeting.
  - Tesler's Law: Complexity (character counting, image compression, audience selection) should be handled by the system, not exposed unnecessarily.
  - Doherty Threshold: The composer must be input-ready within 400ms of opening. Submission feedback must appear within 400ms.

---

## 3. Visual Behavior

- Layout rules:
  - A container with a large, auto-expanding text area as the primary input.
  - Below the text area: a toolbar with attach-media, emoji, and audience-selector controls on the left, and a character counter + post button on the right.
  - Attached media previews appear above the toolbar (as thumbnails with remove controls).
  - An optional audience selector shows the current visibility (Public, Friends, etc.) as a labeled control.
  - The post/submit button is disabled when the text area is empty and no media is attached.
- Spacing expectations: Internal padding uses a medium space token. Gap between toolbar elements uses a small space token. Media preview thumbnails use a small gap.
- Typography rules: Composer text uses a body token. Placeholder text uses a body token in a secondary/muted color. Character count uses a caption token.
- Token usage: Composer background, border, text, placeholder, toolbar icon colors, character count, and submit button must use design tokens.
- Responsive behavior: The composer fills its container width. On narrow viewports, the toolbar may collapse less-used controls into an overflow menu. The submit button remains always visible.

---

## 4. Interaction Behavior

- States:
  - Empty: Text area shows placeholder; submit button is disabled.
  - Typing: Character count updates; submit button becomes enabled.
  - Over limit: Character count turns to an error token color; submit is disabled.
  - Media attached: Thumbnail previews appear; submit is enabled even if text is empty.
  - Submitting: Submit button shows a loading state; all inputs are disabled.
  - Success: Composer resets to empty state; optional success feedback shown.
  - Error: Error message appears; inputs are re-enabled for correction.
- Controlled vs uncontrolled: The composer value may be controlled or uncontrolled. The open/closed state (if modal) is controlled by the parent.
- Keyboard behavior:
  - The text area receives focus on composer open.
  - Ctrl/Cmd+Enter submits the post.
  - Tab cycles through toolbar controls and the submit button.
  - Escape dismisses the composer if it is in a modal context.
- Screen reader behavior:
  - The composer uses `role="form"` or `role="dialog"` (if modal) with an accessible label.
  - The text area has an accessible label (e.g., "What's on your mind?").
  - Character count is announced as it changes (via a polite live region).
  - Error and success states are announced via live regions.
- Motion rules: Composer open/close uses a brief fade or slide. Media thumbnail entrance uses a brief scale. Reduced motion suppresses all animations.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - Composer: `role="form"` with `aria-label` or `role="dialog"` with `aria-modal` if shown as a modal.
  - Text area: `aria-label` and `aria-multiline="true"`.
  - Character count: `aria-live="polite"` and `aria-atomic="true"`.
  - Over-limit: Character count uses `aria-live="assertive"` and the error color is supplemented by text.
  - Submit button: `aria-disabled="true"` when not submittable.
  - Error: `role="alert"`.
- Focus rules: On open, focus moves to the text area. On close, focus returns to the trigger. All toolbar controls are Tab-accessible.
- Contrast expectations: Placeholder text must meet 3:1. Body text must meet 4.5:1. Character count must meet 4.5:1 in both normal and over-limit states.
- Reduced motion behavior: All open/close and entrance animations are disabled.

---

## 6. Theming Rules

- Required tokens: composer background, border (idle, focused), text primary, text placeholder, character count text, over-limit error color, toolbar icon color, submit button tokens, focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded hex colors, spacing, or font sizes.
- Dark mode expectations: Composer background and border shift to dark tokens. Text, placeholder, and icon tokens resolve to dark-mode values. Over-limit error color remains clearly visible in dark mode.

---

## 7. Composition Rules

- What can wrap it: A dedicated compose page, a modal/dialog triggered by a compose button, or an inline widget in a feed header.
- What it may contain: A text area, an optional @mention or hashtag suggestion list (as an overlay), media attachment thumbnails, a toolbar (attach, emoji, audience), a character count, and a submit button.
- Anti-patterns:
  - Do not use PostComposer for comment composition — use the comment compose area in CommentThread.
  - Do not require media attachment to post — text-only posts must always be supported.
  - Do not embed PostComposer inside a PostCard.

---

## 8. Performance Constraints

- Memoization rules: Toolbar controls must be memoized. Typing in the text area must not re-render toolbar buttons. Media thumbnail previews must not re-render the text area.
- Virtualization: Not applicable.
- Render boundaries: The text area, toolbar, and media previews are independent render boundaries.

---

## 9. Test Requirements

- What must be tested:
  - Text area renders with placeholder when empty.
  - Character count updates as the user types.
  - Submit button is disabled when text is empty and no media is attached.
  - Submit button is enabled when text is present or media is attached.
  - Over-limit state disables submit and shows error treatment on character count.
  - Submitting state shows loading on the submit button and disables inputs.
  - Success state resets the composer.
  - Error state shows the error message and re-enables inputs.
- Interaction cases:
  - Ctrl/Cmd+Enter submits the post.
  - Tab cycles through toolbar controls and submit button.
  - Escape dismisses the composer in modal context and returns focus to trigger.
  - Focus moves to text area on open.
- Accessibility checks:
  - Composer has appropriate role and accessible label.
  - Text area has `aria-label`.
  - Character count is `aria-live="polite"`.
  - Over-limit announces via `aria-live="assertive"`.
  - Submit has `aria-disabled` when not submittable.
  - Error uses `role="alert"`.
  - Focus moves to text area on open; returns to trigger on close.
  - Contrast ratios pass in both themes.
  - Reduced motion suppresses all animations.
