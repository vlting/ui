# Component Contract — PostComposer

## 1. Public API

### Base Props

`PostComposer` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: A dedicated compose page, a modal/dialog triggered by a compose button, or an inline widget in a feed header.

May contain: A text area, an optional @mention or hashtag suggestion list (as an overlay), media attachment thumbnails, a toolbar (attach, emoji, audience), a character count, and a submit button.

---

## 2. Behavioral Guarantees

- Empty: Text area shows placeholder; submit button is disabled.
  - Typing: Character count updates; submit button becomes enabled.
  - Over limit: Character count turns to an error token color; submit is disabled.
  - Media attached: Thumbnail previews appear; submit is enabled even if text is empty.
  - Submitting: Submit button shows a loading state; all inputs are disabled.
  - Success: Composer resets to empty state; optional success feedback shown.
  - Error: Error message appears; inputs are re-enabled for correction.
- Controlled vs uncontrolled: The composer value may be controlled or uncontrolled. The open/closed state (if modal) is controlled by the parent.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Composer open/close uses a brief fade or slide. Media thumbnail entrance uses a brief scale. Reduced motion suppresses all animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: On open, focus moves to the text area. On close, focus returns to the trigger. All toolbar controls are Tab-accessible.
- Contrast expectations: Placeholder text must meet 3:1. Body text must meet 4.5:1. Character count must meet 4.5:1 in both normal and over-limit states.
- Reduced motion behavior: All open/close and entrance animations are disabled.

---

## 4. Styling Guarantees

- Required tokens: composer background, border (idle, focused), text primary, text placeholder, character count text, over-limit error color, toolbar icon color, submit button tokens, focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded hex colors, spacing, or font sizes.
- Dark mode expectations: Composer background and border shift to dark tokens. Text, placeholder, and icon tokens resolve to dark-mode values. Over-limit error color remains clearly visible in dark mode.
- Layout rules:
- Responsive behavior: The composer fills its container width. On narrow viewports, the toolbar may collapse less-used controls into an overflow menu. The submit button remains always visible.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PostComposer.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
