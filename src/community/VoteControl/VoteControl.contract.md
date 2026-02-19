# Component Contract — VoteControl

## 1. Public API

### Base Props

`VoteControl` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Used inside `ThreadCard`, `NestedCommentTree` comment nodes, and potentially in a thread detail header.

May contain: An upvote button (icon), a score text element, and optionally a downvote button (icon).

---

## 2. Behavioral Guarantees

- Idle (no vote): Both buttons in default state; score shown neutrally.
  - Upvoted: Upvote button highlighted with the upvote accent color; score incremented.
  - Downvoted: Downvote button highlighted with the downvote accent color; score decremented.
  - Pending: After a vote interaction, the UI updates optimistically. A subtle loading indicator may appear if the server confirmation is delayed.
  - Disabled / read-only: Buttons are non-interactive; score is displayed without vote affordances.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the current vote state (`'up' | 'down' | null`), the score, and onVote callback.
- Keyboard behavior: Tab focuses the upvote button. Tab again focuses the downvote button (or skip if upvote-only). Enter/Space casts or retracts the focused vote.
- Screen reader behavior: Upvote button announces "Upvote. Current score: 42." or similar. The current user's vote state is communicated via `aria-pressed`. Score updates are announced via an `aria-live` region.
- Motion rules: Vote state change on the button animates with a quick scale pulse or color transition. Score count may animate (count-up/down). Reduced motion: instant state changes.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Upvote and downvote are `<button>` elements with `aria-label` (e.g., "Upvote" / "Downvote") and `aria-pressed` reflecting the active vote state. Score is enclosed in an `aria-live="polite"` region to announce changes. If the control is read-only, buttons are replaced with non-interactive elements or given `aria-disabled`.
- Focus rules: The two buttons are in natural tab order. In vertical layout, upvote comes before downvote in DOM order. In disabled state, buttons are excluded from tab order.
- Contrast expectations: Default icon color, upvoted accent color, and downvoted accent color all meet WCAG AA against the component background.
- Reduced motion behavior: All animation on vote interaction is suppressed.

---

## 4. Styling Guarantees

- Required tokens: default icon color, upvote accent color (active state), downvote accent color (active state), score text color, button hover background, focus ring color, spacing tokens, button size token.
- Prohibited hardcoded values: No hardcoded colors, pixel sizes, or z-index values.
- Dark mode expectations: Default, upvoted, and downvoted color tokens have dark-mode variants. Score text adapts to dark text token.

- Responsive behavior: The control maintains its compact size across all breakpoints. The vertical variant is used in list contexts; horizontal variant may be used in compact card headers.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `VoteControl.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
