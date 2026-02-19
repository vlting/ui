# Component Contract — ThreadCard

## 1. Public API

### Base Props

`ThreadCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Placed inside a `ThreadList` as a list item. May be used in search results or featured thread sections.

May contain: A `VoteControl`, tag chip elements, an author avatar, engagement stat icons, and optional `ModeratorToolbar` (for moderators). Title is a link. Optional excerpt is truncated text.

---

## 2. Behavioral Guarantees

- Idle: Default appearance.
  - Hover: Subtle background color change or shadow elevation increase.
  - Focus: Visible focus ring on the card or the title link.
  - Visited: The title link may use a visited color token to indicate the user has already read this thread.
  - Pinned: A visual indicator (pin icon + distinct background or border) distinguishes pinned threads.
  - Locked: A lock icon indicates the thread is closed for new replies.
  - Loading: Skeleton card with placeholder blocks for title, meta, and stats.
- Controlled vs uncontrolled: Fully controlled. Parent supplies thread data and onPress/onClick callback.
- Keyboard behavior: The card or title is a single focusable element (link or button). Tab navigates to the card. Enter activates it. Secondary actions (VoteControl, bookmark) within the card are separately focusable.
- Screen reader behavior: The thread title is the primary accessible label. The card announces author, timestamp, vote count, and comment count as supplementary information. Pinned/locked status is announced.
- Motion rules: Hover state transitions animate subtly. Reduced motion: instant state change.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: The card acts as a list item (`role="listitem"` via its `<li>` parent). The thread title is a link (`<a>`) with a meaningful href. Vote and comment counts are announced with full labels (e.g., "42 votes, 15 comments"). Pin and lock status are communicated via accessible text or `aria-label`.
- Focus rules: The title link receives focus. Secondary interactive elements (VoteControl) are in natural tab order after the title.
- Contrast expectations: Title text, meta text, and all UI elements meet WCAG AA against the card background, in both default and hover states.
- Reduced motion behavior: Hover background transition is suppressed.

---

## 4. Styling Guarantees

- Required tokens: card background, card hover background, card border color, card shadow/elevation token, title text color, title visited text color, body/excerpt text color, muted/secondary text color, engagement icon color, pinned indicator color, spacing tokens, border radius token.
- Prohibited hardcoded values: No hardcoded colors, pixel shadows, or font sizes.
- Dark mode expectations: Card background uses a dark surface token. All text tokens adapt. Hover state uses a dark hover token.

- Responsive behavior: On mobile, the layout stacks vertically. On wider viewports, a horizontal layout may be used with vote control on the left. Card width is fluid, filling the list container.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ThreadCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
