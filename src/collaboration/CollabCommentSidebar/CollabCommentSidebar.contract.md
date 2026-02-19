# Component Contract — CollabCommentSidebar

## 1. Public API

### Base Props

`CollabCommentSidebar` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Intended to be placed adjacent to a `DocumentEditor` or similar content editing surface within a split-panel layout.

May contain: Comment thread groups, each containing one or more comment items, a reply composer, and resolve/action controls. May contain an `ActivityFeed` as an optional activity tab.

---

## 2. Behavioral Guarantees

- Idle: Displays list of comment threads anchored to document.
  - Empty: Displays a message indicating no comments exist yet.
  - Loading: Accepts a loading prop; renders placeholder skeletons for comment threads.
  - Focused thread: The thread corresponding to the active document selection is visually highlighted.
  - Resolved: Resolved threads are visually distinguished (e.g., muted appearance) and may be hidden or collapsed by default.
- Controlled vs uncontrolled: Fully controlled. Parent supplies comment threads, selected anchor, and callbacks.
- Keyboard behavior: Tab moves between threads and within threads. Enter/Space activates reply inputs. Escape closes an open reply composer.
- Screen reader behavior: The sidebar has a landmark region label (e.g., "Document comments"). Each thread is announced as a group. Comment count is communicated.
- Motion rules: Opening/closing the sidebar animates with a slide. Reduced motion: instant show/hide instead.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Sidebar container uses `role="complementary"` with an `aria-label` of "Document comments" or equivalent. Each thread uses `role="group"` with a label. Reply buttons have descriptive labels.
- Focus rules: When the sidebar opens, focus moves to the first active thread or the sidebar container. Closing the sidebar returns focus to the trigger element.
- Contrast expectations: All comment text and UI controls meet WCAG AA contrast against the sidebar background.
- Reduced motion behavior: Slide animations are suppressed; sidebar appears/disappears instantly.

---

## 4. Styling Guarantees

- Required tokens: panel background color, surface elevation color, border color, primary text, secondary/muted text, accent color for active/highlighted thread, interactive state colors (hover, focus ring), spacing scale, radius tokens for thread containers.
- Prohibited hardcoded values: No hardcoded colors, spacing, border widths, or font sizes.
- Dark mode expectations: Panel background adjusts to dark surface token. Comment bubbles, borders, and text adapt via theme tokens.

- Responsive behavior: On narrow viewports, the sidebar collapses into a drawer or bottom sheet. Width is constrained with a minimum and maximum using size tokens.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `CollabCommentSidebar.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
