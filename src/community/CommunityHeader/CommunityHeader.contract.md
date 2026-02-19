# Component Contract — CommunityHeader

## 1. Public API

### Base Props

`CommunityHeader` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

| Category | Examples |
|----------|---------|
| Layout | `width`, `height`, `minWidth`, `maxWidth`, `flex`, `flexDirection` |
| Spacing | `padding`, `paddingHorizontal`, `margin`, `gap` (space tokens) |
| Visual | `backgroundColor`, `borderColor`, `borderRadius`, `opacity` |
| Theme | `theme`, `themeInverse` |
| Animation | `animation`, `enterStyle`, `exitStyle` |
| Accessibility | `accessible`, `accessibilityLabel`, `accessibilityRole`, `aria-*` |
| Events | `onPress`, `onHoverIn`, `onHoverOut`, `onFocus`, `onBlur` |

### Component-Specific Props

No additional props are defined in the current stub implementation. Props specific to the component's behavior (e.g., data, state, callbacks) are to be defined when behavioral logic is implemented per the `.spec.md`.

### Composition Context

Intended to be wrapped by: Placed at the top of a community page layout, above `ThreadList`, `TagFilterBar`, or `ModeratorToolbar`.

May contain: A banner image slot, an avatar slot, a name/description text block, a stats row, and an actions row. May optionally contain a `PresenceIndicator` for active members.

---

## 2. Behavioral Guarantees

- Idle (non-member): Shows a "Join" or "Follow" primary action.
  - Member: Shows a "Joined" or "Member" state with secondary actions (invite, leave).
  - Loading: Skeleton for banner, avatar, name, and stats.
  - Error: Graceful fallback if banner image fails to load (uses background color token).
- Controlled vs uncontrolled: Fully controlled. Parent supplies community data and action callbacks.
- Keyboard behavior: Tab reaches the avatar (if interactive), the community name link (if applicable), and all action buttons in DOM order.
- Screen reader behavior: Banner image has a decorative `alt=""` if it is purely aesthetic, or a descriptive `alt` if it is meaningful. Community name is an `h1` or appropriate heading level. Member count is announced as a full label (e.g., "1,240 members").
- Motion rules: On initial load, a subtle fade-in on the banner. Reduced motion: no animation.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Community name should be a heading (`h1` or appropriate level). Banner image uses `alt=""` if decorative. Action buttons have descriptive labels (e.g., "Join the Design community").
- Focus rules: First interactive element in the header (name link or Join button) is reachable via Tab without skipping.
- Contrast expectations: Community name text over the banner image must meet WCAG AA. A semi-transparent overlay behind text may be required when banner images have variable contrast.
- Reduced motion behavior: Banner fade-in is suppressed.

---

## 4. Styling Guarantees

- Required tokens: banner background fallback color, avatar border color, heading text color, body text color, secondary/muted text color, primary action button colors, spacing tokens, border radius token for avatar.
- Prohibited hardcoded values: No hardcoded hex colors, pixel heights for banner, or font sizes.
- Dark mode expectations: Banner fallback background uses a dark surface token. Text adapts via theme tokens. Avatar border adjusts to dark theme border token.

- Responsive behavior: On mobile, the banner image height reduces. Avatar size scales with a size token. Description may be truncated with a "read more" expansion affordance on narrow viewports.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `CommunityHeader.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
