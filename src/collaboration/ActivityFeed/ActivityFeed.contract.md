# Component Contract — ActivityFeed

## 1. Public API

### Base Props

`ActivityFeed` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: May be placed inside a sidebar panel, a drawer, or a full-page layout container. Should work inside `CollabCommentSidebar` or `VersionHistoryPanel` as a content region.

May contain: A list of activity item child components. May optionally contain a load-more trigger or pagination control at the bottom.

---

## 2. Behavioral Guarantees

- Idle: Displays list of activity items.
  - Empty: Displays an empty state message indicating no activity yet.
  - Loading: Displays a skeleton or spinner placeholder while items are being fetched by the parent.
  - Error: Accepts an error state prop; renders an error message provided by the parent.
- Controlled vs uncontrolled: Fully controlled — the parent supplies the list of activity items as props. The component does not manage its own data.
- Keyboard behavior: The feed is scrollable via keyboard (arrow keys, Page Up/Down). Individual items that are interactive must be reachable via Tab.
- Screen reader behavior: The feed container should be announced as a list. Each item should be a list item with a meaningful accessible label summarizing the event.
- Motion rules: New items appearing in the feed should animate in subtly (fade or slide). Animation must be disabled or reduced when the user has enabled reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Container should use `role="feed"` or `role="list"`. Each activity item should use `role="article"` or `role="listitem"`. Timestamps should be rendered using a `<time>` element with a machine-readable `datetime` attribute.
- Focus rules: Focus should not be trapped within the feed. If items contain interactive controls (e.g., reply buttons), those must be focusable in DOM order.
- Contrast expectations: All text must meet WCAG AA contrast ratios against the feed background. Subdued timestamp text must still pass at its smaller size.
- Reduced motion behavior: Entry animations must be suppressed or replaced with an instant appearance when `prefers-reduced-motion` is active.

---

## 4. Styling Guarantees

- Required tokens: background color, surface/card color, primary text color, secondary/muted text color, border/divider color, spacing scale, typography scale.
- Prohibited hardcoded values: No hardcoded hex colors, pixel spacing, or font size values.
- Dark mode expectations: All background and text colors must invert appropriately via theme tokens. No manual dark mode overrides allowed.

- Responsive behavior: Full width on mobile. On wider viewports, may be constrained to a sidebar width. Should not overflow horizontally.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ActivityFeed.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
