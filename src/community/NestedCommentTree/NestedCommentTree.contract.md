# Component Contract — NestedCommentTree

## 1. Public API

### Base Props

`NestedCommentTree` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Placed within a `ThreadCard` detail view or a full thread page. May include a `VoteControl` per comment node and a `ModeratorToolbar` for moderators.

May contain: Comment node elements (author, body, metadata, actions). Each node may contain a `VoteControl`, a reply button, a collapse toggle, and optionally a `ModeratorToolbar`. Child nodes recurse into another level of the tree.

---

## 2. Behavioral Guarantees

- Expanded: All loaded children are visible.
  - Collapsed: Child branch is hidden; a "N replies" affordance is shown to expand.
  - Loading more: A "Load more replies" trigger is shown at the end of a partial branch; clicking it fires a parent callback.
  - Deleted comment: A placeholder is shown (e.g., "[deleted]") rather than the original content.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the comment tree data, collapsed state per node, and callbacks for expand/collapse, load-more, reply, and vote.
- Keyboard behavior: Tab navigates through comment nodes and their action buttons. Enter/Space activates collapse toggles and action buttons. The collapse toggle is reachable before the comment body.
- Screen reader behavior: Each comment is announced as a list item within a nested list structure. The depth level and parent author context should be communicated (e.g., "Reply to [Author Name], level 2 of 4"). Collapse state is communicated via `aria-expanded`.
- Motion rules: Collapse/expand branches animate with a height transition. Reduced motion: instant show/hide.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: The tree is rendered as a nested `<ul>` / `<li>` structure. Each comment node contains author, body, and action controls. Collapse toggles use `aria-expanded` and `aria-controls`. The "Load more" trigger is a button with a descriptive label.
- Focus rules: After collapsing a branch, focus returns to the collapse toggle. After expanding, focus remains on the toggle. Reply composer focus is managed by the parent.
- Contrast expectations: Comment text, metadata, and all interactive controls meet WCAG AA against the comment background.
- Reduced motion behavior: Collapse/expand height animations are suppressed; branches appear and disappear instantly.

---

## 4. Styling Guarantees

- Required tokens: comment body background (optional), indent line color, indent line width, indent spacing offset token, author name text color, body text color, metadata muted text color, action button colors, hover background color, border radius for comment containers, spacing tokens.
- Prohibited hardcoded values: No hardcoded depth pixel values, colors, or indent offsets.
- Dark mode expectations: Indent lines, text colors, and any comment container backgrounds adapt to dark theme tokens.

- Responsive behavior: On narrow viewports, maximum indent depth is reduced to prevent extreme narrowing of comment text. Beyond a maximum depth, additional replies are rendered without further indentation but with a visual cue (border accent).
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `NestedCommentTree.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
