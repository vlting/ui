# Component Contract — ModeratorToolbar

## 1. Public API

### Base Props

`ModeratorToolbar` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Placed within a `ThreadCard`, `NestedCommentTree` item, or post header — visible only when the parent determines the user is a moderator.

May contain: A set of icon/labeled action buttons, an optional separator, and an overflow "More" menu button for secondary actions.

---

## 2. Behavioral Guarantees

- Idle: All actions available for the current content item.
  - Action pending: While a moderation action is processing, the triggering button shows a loading state and the toolbar is partially disabled.
  - Pinned: The pin action reflects the current pinned state (toggle).
  - Locked: The lock action reflects the current locked state (toggle).
- Controlled vs uncontrolled: Fully controlled. Parent supplies action callbacks, current content state flags (isPinned, isLocked), and pending state.
- Keyboard behavior: Tab navigates through toolbar buttons left to right. Enter/Space activates a button. Arrow Left/Right may also navigate within the toolbar (toolbar roving tabindex pattern).
- Screen reader behavior: The toolbar has `role="toolbar"` with an accessible label (e.g., "Moderation actions"). Each button has a descriptive label that includes the content context (e.g., "Pin this thread").
- Motion rules: Confirmation dialogs for destructive actions animate in. Reduced motion: no animation.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Container has `role="toolbar"` and `aria-label="Moderation actions"`. Each button has a visible or screen-reader-accessible label. Toggle buttons (pin, lock) use `aria-pressed` to reflect state.
- Focus rules: The toolbar participates in the page tab order. Internally, roving tabindex is used so only one button in the toolbar is in the tab stop at a time.
- Contrast expectations: Toolbar buttons meet WCAG AA contrast against the toolbar background. Destructive action buttons use a color token that still meets contrast requirements.
- Reduced motion behavior: Any action confirmation animations are suppressed.

---

## 4. Styling Guarantees

- Required tokens: toolbar background, button default background, button hover background, button active background, destructive action color token, icon color, label text color, border/divider color, spacing tokens, border radius for buttons.
- Prohibited hardcoded values: No hardcoded colors, pixel spacings, or display logic tied to user roles (role checks belong to the parent).
- Dark mode expectations: Toolbar background and button colors adapt to dark surface tokens. Destructive color token remains semantically visible in dark mode.

- Responsive behavior: On narrow viewports, labels may be hidden leaving only icons, or actions collapse into a single overflow menu button.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ModeratorToolbar.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
