# Component Contract — EmojiPicker

## 1. Public API

### Base Props

`EmojiPicker` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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



---

## 2. Behavioral Guarantees

- In `idle` state: grid shows the default or "recently used" category.
- In `searching` state: search input filters the grid in real time.
- In `no results` state: a "No emoji found" message is displayed.
- In `hover/focus` state: hovered/focused emoji cell is highlighted.
- In `selected` state: fires `onEmojiSelect` callback and optionally dismisses the picker.

- Keyboard behavior: `Tab` / arrow keys navigate between emoji cells; `Enter` selects; `Escape` closes the picker; category tabs are navigable by Tab and arrow keys.
- Screen reader behavior: each emoji cell announces its emoji character and name (e.g., "Grinning Face"); the panel is a `dialog` or `listbox` with an accessible label.
- Motion rules: panel open/close transition respects `prefers-reduced-motion`.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus must be visible and never trapped.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: disable open/close animations; suppress hover transitions.

---

## 4. Styling Guarantees

- Required tokens: `background`, `backgroundHover`, `borderColor`, `color`, `colorMuted`, `backgroundSelected` (active tab), `focusStyle`, `space`, `size` (cell size).
- Prohibited hardcoded values: no literal color strings, pixel cell sizes, or panel dimensions.
- Dark mode: panel background, search input, and tab tokens must resolve correctly with sufficient contrast.

- Responsive behavior: on narrow viewports the panel may occupy more horizontal space; the grid adjusts column count to the panel width.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `EmojiPicker.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
