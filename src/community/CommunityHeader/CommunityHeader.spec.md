# Component Spec — CommunityHeader

## 1. Purpose

Displays the top-level header for a community space, including the community name, description, branding image (cover/banner or avatar), member count, and primary community actions (e.g., join, follow, create thread).

Use when: Rendering the top of a community landing page, forum section, or group space.

Do NOT use when: The context is an individual thread or post page (use a thread-level header), or when the community is not the primary subject of the current view.

---

## 2. UX Intent

- Primary interaction goal: Orient the user within the community space and provide immediate access to the most important community-level actions.
- Expected user mental model: A cover-photo-style header similar to Reddit's subreddit header, Discord's server header, or Facebook Groups — a visually grounding element that communicates the community's identity at a glance.
- UX laws applied:
  - Jakob's Law: Mirrors the widely familiar community/group header convention from major platforms.
  - Fitts's Law: The primary action button (Join/Follow) must be prominent and easily tappable.
  - Hierarchy (Gestalt): Community name must be the most visually dominant text element; secondary information (description, member count) is subdued.

---

## 3. Visual Behavior

- Layout: Vertical stack. Full-width banner/cover image at the top. Below the banner: community avatar, community name, description, stats row (member count, post count), and action buttons.
- Spacing: Community avatar overlaps the bottom edge of the banner image using a negative margin derived from a size token. Consistent padding around text content using spacing tokens.
- Typography: Community name uses a heading token (large, bold). Description uses body text. Stats use a secondary/muted text token at a smaller size.
- Token usage: Banner background fallback color, avatar border color, action button colors, stats text color — all from theme tokens.
- Responsive behavior: On mobile, the banner image height reduces. Avatar size scales with a size token. Description may be truncated with a "read more" expansion affordance on narrow viewports.

---

## 4. Interaction Behavior

- States:
  - Idle (non-member): Shows a "Join" or "Follow" primary action.
  - Member: Shows a "Joined" or "Member" state with secondary actions (invite, leave).
  - Loading: Skeleton for banner, avatar, name, and stats.
  - Error: Graceful fallback if banner image fails to load (uses background color token).
- Controlled vs uncontrolled: Fully controlled. Parent supplies community data and action callbacks.
- Keyboard behavior: Tab reaches the avatar (if interactive), the community name link (if applicable), and all action buttons in DOM order.
- Screen reader behavior: Banner image has a decorative `alt=""` if it is purely aesthetic, or a descriptive `alt` if it is meaningful. Community name is an `h1` or appropriate heading level. Member count is announced as a full label (e.g., "1,240 members").
- Motion rules: On initial load, a subtle fade-in on the banner. Reduced motion: no animation.

---

## 5. Accessibility Requirements

- ARIA requirements: Community name should be a heading (`h1` or appropriate level). Banner image uses `alt=""` if decorative. Action buttons have descriptive labels (e.g., "Join the Design community").
- Focus rules: First interactive element in the header (name link or Join button) is reachable via Tab without skipping.
- Contrast expectations: Community name text over the banner image must meet WCAG AA. A semi-transparent overlay behind text may be required when banner images have variable contrast.
- Reduced motion behavior: Banner fade-in is suppressed.

---

## 6. Theming Rules

- Required tokens: banner background fallback color, avatar border color, heading text color, body text color, secondary/muted text color, primary action button colors, spacing tokens, border radius token for avatar.
- Prohibited hardcoded values: No hardcoded hex colors, pixel heights for banner, or font sizes.
- Dark mode expectations: Banner fallback background uses a dark surface token. Text adapts via theme tokens. Avatar border adjusts to dark theme border token.

---

## 7. Composition Rules

- What can wrap it: Placed at the top of a community page layout, above `ThreadList`, `TagFilterBar`, or `ModeratorToolbar`.
- What it may contain: A banner image slot, an avatar slot, a name/description text block, a stats row, and an actions row. May optionally contain a `PresenceIndicator` for active members.
- Anti-patterns:
  - Do not embed community data-fetching inside this component.
  - Do not place the full thread list or navigation inside the header — keep it to identity and primary actions only.
  - Do not use this as a page-level layout wrapper.

---

## 8. Performance Constraints

- Memoization rules: The header should be memoized and not re-render on thread list updates that are unrelated to community metadata.
- Virtualization: Not applicable.
- Render boundaries: No data-fetching inside this component.

---

## 9. Test Requirements

- What must be tested:
  - Renders community name, description, banner, avatar, and stats correctly.
  - Renders the loading skeleton state.
  - Renders the banner image fallback when the image fails.
  - Displays the correct action button state (Join vs Joined).
- Interaction cases:
  - Join/Follow button fires the correct callback.
  - Tab navigation reaches all interactive elements.
- Accessibility checks:
  - Community name is rendered as a heading element.
  - Banner image `alt` attribute is correct.
  - Action buttons have descriptive accessible labels.
  - Contrast between community name text and banner background meets WCAG AA.
  - Reduced motion: banner fade-in suppressed.
