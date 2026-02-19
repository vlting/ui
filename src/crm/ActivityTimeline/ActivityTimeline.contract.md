# Component Contract — ActivityTimeline

## 1. Public API

### Base Props

`ActivityTimeline` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Placed in a CRM record detail view (contact, deal, or lead page) typically in a dedicated "Activity" tab or panel.

May contain: A list of timeline event nodes. Each node contains an activity icon, an event content block (title, description, optional expanded body), and a timestamp. May contain date group headings.

---

## 2. Behavioral Guarantees

- Idle: Displays the full list of activity events.
  - Empty: Displays an empty state message (e.g., "No activity recorded yet.").
  - Loading: Skeleton event rows with placeholder icon and content blocks.
  - Expandable event: Some event types (e.g., email body, call notes) may be collapsed by default and expand on interaction, managed by the parent.
  - Error: An error state message with optional retry action.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the event array, loading state, and any expand/collapse callbacks.
- Keyboard behavior: Tab moves through focusable elements (expandable events, action links within events). Enter/Space activates expandable events.
- Screen reader behavior: The timeline is a `<ul>` list. Each event is a `<li>` with a full description including the event type, description, and timestamp. Date group headings are announced as section headings.
- Motion rules: New events appended to the top animate with a subtle fade-in. Expand/collapse of event details animates with height transition. Reduced motion: instant changes.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Container is a `<ul>` with `role="list"` and `aria-label="Activity timeline"` or equivalent. Each event is a `<li>`. Expandable events use `aria-expanded` on the toggle. Date group headings use appropriate heading elements.
- Focus rules: Tab order follows DOM order (top to bottom, newest to oldest). Focus is not trapped. Expandable items are accessible via keyboard.
- Contrast expectations: All text (event title, description, timestamp, date headings) meets WCAG AA against the timeline background. Event type icon colors meet contrast requirements.
- Reduced motion behavior: Fade-in and expand/collapse animations are suppressed.

---

## 4. Styling Guarantees

- Required tokens: timeline spine color, spine width token, event icon background/color (per semantic activity type), event block background (optional), heading text color, body text color, muted/secondary text color, spacing tokens, border radius token for event blocks.
- Prohibited hardcoded values: No hardcoded colors, pixel sizes, or event type-specific hex values.
- Dark mode expectations: Timeline spine, event icons, and content blocks all adapt to dark theme tokens.

- Responsive behavior: Full-width column layout on all breakpoints. On narrow viewports, the icon may reduce in size using a smaller size token.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ActivityTimeline.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
