# Component Spec — ModeratorToolbar

## 1. Purpose

Provides a horizontal toolbar of moderation actions (e.g., pin, lock, remove, approve, ban user) that is contextually shown to users with moderator or admin privileges in a community context.

Use when: A moderator or admin is viewing community content and needs quick access to moderation controls without leaving the current view.

Do NOT use when: The current user does not have moderation privileges (the toolbar must not be rendered at all for non-moderators), or the context is not community-moderated content.

---

## 2. UX Intent

- Primary interaction goal: Give moderators efficient, contextual access to the most common moderation actions without disrupting the community experience for regular members.
- Expected user mental model: A compact action bar or toolbar similar to admin controls seen in Reddit, Discord, or Discourse — visually distinct from the regular member UI to signal elevated privilege.
- UX laws applied:
  - Hick's Law: Limit visible actions to the most frequently used (pin, lock, remove). Secondary/destructive actions (ban, delete) should be behind a "More" overflow menu.
  - Fitts's Law: Toolbar buttons must have adequate touch target size.
  - Proximity (Gestalt): Destructive actions (remove, ban) should be visually separated from non-destructive ones (pin, lock) within the toolbar.

---

## 3. Visual Behavior

- Layout: Horizontal row of icon buttons or labeled buttons. May include a separator between non-destructive and destructive action groups. Fixed or sticky positioning within the content it moderates.
- Spacing: Consistent gap between buttons using a spacing token. Horizontal padding matches surrounding content padding.
- Typography: If buttons include labels, use a small body text token. Icon-only buttons include visible tooltips.
- Token usage: Toolbar background (may be subtly distinct from page background), button default/hover/active colors, destructive action accent color — all from theme tokens.
- Responsive behavior: On narrow viewports, labels may be hidden leaving only icons, or actions collapse into a single overflow menu button.

---

## 4. Interaction Behavior

- States:
  - Idle: All actions available for the current content item.
  - Action pending: While a moderation action is processing, the triggering button shows a loading state and the toolbar is partially disabled.
  - Pinned: The pin action reflects the current pinned state (toggle).
  - Locked: The lock action reflects the current locked state (toggle).
- Controlled vs uncontrolled: Fully controlled. Parent supplies action callbacks, current content state flags (isPinned, isLocked), and pending state.
- Keyboard behavior: Tab navigates through toolbar buttons left to right. Enter/Space activates a button. Arrow Left/Right may also navigate within the toolbar (toolbar roving tabindex pattern).
- Screen reader behavior: The toolbar has `role="toolbar"` with an accessible label (e.g., "Moderation actions"). Each button has a descriptive label that includes the content context (e.g., "Pin this thread").
- Motion rules: Confirmation dialogs for destructive actions animate in. Reduced motion: no animation.

---

## 5. Accessibility Requirements

- ARIA requirements: Container has `role="toolbar"` and `aria-label="Moderation actions"`. Each button has a visible or screen-reader-accessible label. Toggle buttons (pin, lock) use `aria-pressed` to reflect state.
- Focus rules: The toolbar participates in the page tab order. Internally, roving tabindex is used so only one button in the toolbar is in the tab stop at a time.
- Contrast expectations: Toolbar buttons meet WCAG AA contrast against the toolbar background. Destructive action buttons use a color token that still meets contrast requirements.
- Reduced motion behavior: Any action confirmation animations are suppressed.

---

## 6. Theming Rules

- Required tokens: toolbar background, button default background, button hover background, button active background, destructive action color token, icon color, label text color, border/divider color, spacing tokens, border radius for buttons.
- Prohibited hardcoded values: No hardcoded colors, pixel spacings, or display logic tied to user roles (role checks belong to the parent).
- Dark mode expectations: Toolbar background and button colors adapt to dark surface tokens. Destructive color token remains semantically visible in dark mode.

---

## 7. Composition Rules

- What can wrap it: Placed within a `ThreadCard`, `NestedCommentTree` item, or post header — visible only when the parent determines the user is a moderator.
- What it may contain: A set of icon/labeled action buttons, an optional separator, and an overflow "More" menu button for secondary actions.
- Anti-patterns:
  - Do not embed permission checks inside this component — visibility is controlled entirely by the parent.
  - Do not place navigation links inside the moderation toolbar.
  - Do not execute destructive actions without a confirmation pattern provided by the parent.

---

## 8. Performance Constraints

- Memoization rules: The toolbar should be memoized and only re-render when action state (isPinned, isLocked, pending) changes.
- Virtualization: Not applicable.
- Render boundaries: No permission logic or API calls inside this component.

---

## 9. Test Requirements

- What must be tested:
  - Renders all expected action buttons.
  - Reflects the correct pinned/locked toggle state via `aria-pressed`.
  - Shows a pending/loading state on the triggering button during an action.
  - Renders correctly with labels hidden (icon-only mode).
- Interaction cases:
  - Each action button fires the correct callback on click and Enter/Space.
  - Roving tabindex pattern works correctly within the toolbar.
  - Destructive action button click triggers a confirmation flow (parent-driven).
- Accessibility checks:
  - `role="toolbar"` and `aria-label` present.
  - All buttons have accessible labels.
  - Toggle buttons use `aria-pressed` correctly.
  - Contrast requirements met for all button states.
  - Reduced motion: confirmation animations suppressed.
