# Component Contract — ThreadList

## 1. Public API

### Base Props

`ThreadList` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Placed below `CommunityHeader` and `TagFilterBar` within a community page layout.

May contain: A sequence of `ThreadCard` items (pinned first, then sorted list). May contain a section label divider between pinned and regular threads. A load-more trigger or infinite scroll sentinel at the bottom. An empty state or error state.

---

## 2. Behavioral Guarantees

- Idle with content: Displays thread cards.
  - Empty: Displays an empty state message (e.g., "No threads yet. Be the first to start a discussion.") with an optional call to action.
  - Loading (initial): Displays skeleton cards in place of content.
  - Loading more (pagination/infinite scroll): Displays a loading indicator at the bottom of the list.
  - Error: Displays an error state with a retry action.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the thread array, loading flags, and pagination callbacks.
- Keyboard behavior: Tab navigates through thread cards in DOM order. No special keyboard handling within the list itself — the cards handle their own keyboard interactions.
- Screen reader behavior: The list is a `<ul>` with `role="list"`. Each `ThreadCard` is a `<li>`. The list has an accessible label (e.g., "Community threads" or "Search results"). Empty and error states are announced via `aria-live`.
- Motion rules: New items loading in via infinite scroll fade in. Reduced motion: instant appearance.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Container is a `<ul>` with `role="list"` and `aria-label`. Each item is a `<li>`. The empty state and error state are announced via an `aria-live="polite"` region. The loading more indicator has an `aria-label`.
- Focus rules: Tab order follows DOM order. No focus trapping. The load-more trigger (if a button) is focusable and reachable.
- Contrast expectations: Section labels and any list-level UI meet WCAG AA. Individual card contrast is the responsibility of `ThreadCard`.
- Reduced motion behavior: Item fade-in animations are suppressed.

---

## 4. Styling Guarantees

- Required tokens: list background, section separator border color, section label text color, empty state text color, loading indicator color, error state text and action colors.
- Prohibited hardcoded values: No hardcoded colors or spacing.
- Dark mode expectations: List background and section separators adapt to dark theme tokens.

- Responsive behavior: Full-width on all breakpoints. Each `ThreadCard` adapts its own layout. The list does not impose a maximum width — that is the responsibility of the page layout.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ThreadList.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
