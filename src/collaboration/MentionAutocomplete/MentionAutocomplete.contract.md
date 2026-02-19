# Component Contract — MentionAutocomplete

## 1. Public API

### Base Props

`MentionAutocomplete` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Must be rendered as a child of a positioning context (portal or popover layer) so it floats correctly over document content. Typically composed inside a `DocumentEditor` or rich text input context.

May contain: A list of suggestion items. Each item contains an avatar/icon slot, a primary label, and an optional secondary label. May contain a loading indicator or an empty state message.

---

## 2. Behavioral Guarantees

- Visible with results: Displays a filtered list of suggestions.
  - Loading: Displays a spinner or skeleton while suggestions are being resolved (for async sources).
  - No results: Displays an empty message such as "No matching users found."
  - Item highlighted: The currently focused item is visually highlighted.
- Controlled vs uncontrolled: Fully controlled. The parent provides the suggestion list, loading state, query string, and selection callback.
- Keyboard behavior:
- Screen reader behavior: The popover is a live `role="listbox"` with `aria-label`. Each suggestion is `role="option"`. The currently highlighted option is indicated via `aria-activedescendant` on the trigger input.
- Motion rules: Popover appears with a subtle fade-in and slight upward scale. Reduced motion: appears instantly.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: Focus remains in the trigger input while the popover is open. The popover is navigated via keyboard without removing focus from the input.
- Contrast expectations: All text in the popover meets WCAG AA. Highlighted item background must provide sufficient contrast with item text.
- Reduced motion behavior: Fade and scale animations are suppressed.

---

## 4. Styling Guarantees

- Required tokens: popover background, popover border color, popover shadow, item default background, item hover/focus background, primary text, secondary/muted text, avatar placeholder background, focus ring color, spacing tokens for item padding, border radius token for popover and items.
- Prohibited hardcoded values: No hardcoded colors, px offsets, or z-index values.
- Dark mode expectations: Popover background uses a dark elevated surface token. Highlight state uses a dark-appropriate accent token.

- Responsive behavior: The popover must not overflow the viewport. If space below the cursor is insufficient, it should flip to appear above. On narrow viewports, the popover may expand to near-full width.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `MentionAutocomplete.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
