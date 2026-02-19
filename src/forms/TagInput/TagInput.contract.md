# Component Contract — TagInput

## 1. Public API

### Base Props

`TagInput` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: form field wrappers, filter bars, settings pages. Must be a descendant of the design system Provider.

May contain: inline chip elements and the text input cursor. Optionally a dropdown of suggested completions (if autocomplete is supported) rendered below the container.

---

## 2. Behavioral Guarantees

- Idle (unfocused with tags): chips are visible; container is at rest.
  - Idle (empty): placeholder text is visible.
  - Focused: container border changes to focused token color; cursor is active in the text input.
  - Typing: the text input cursor reflects the current in-progress tag text.
  - Tag confirmed: pressing Enter or the configured delimiter (e.g., comma, Tab) creates a new chip from the current input text and clears the input.
  - Error (invalid tag): if the entered tag fails validation (e.g., duplicate, too long), the input shakes or an inline error appears; the tag is not added.
  - Disabled: all interactions disabled; reduced opacity.
  - Error (field-level): container border takes error token color; field-level error message is rendered below.
- Controlled vs uncontrolled: supports both patterns. Controlled mode accepts a tags array and onChange callback. Uncontrolled mode manages the tag list internally.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: chip entry may use a brief fade-in token animation suppressed under reduced motion. Chip removal may use a brief fade-out.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: Tab enters the text input by default. Arrow keys navigate between chips. Removing a chip moves focus to the adjacent chip or back to the text input.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress chip entry and exit animations; show/hide chips immediately.

---

## 4. Styling Guarantees

- Required tokens: container border, focused border, error border, container background, chip background, chip text color, chip remove icon color, disabled opacity, space tokens (gap, padding), typography scale token.
- Prohibited hardcoded values: no hardcoded colors, spacing values, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; chip backgrounds and borders must remain legible against dark surfaces.

- Responsive behavior: the container grows vertically as tags wrap; it does not overflow horizontally. On small screens the same inline-wrap behavior is maintained with appropriately sized chips and touch targets.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `TagInput.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
