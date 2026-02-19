# Component Contract — RichTextEditor

## 1. Public API

### Base Props

`RichTextEditor` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: form field wrappers, page content editors, modal or drawer panels. Must be a descendant of the design system Provider.

May contain: a formatting toolbar sub-component and the content editing surface. An optional footer with character count or action buttons may be placed outside below.

---

## 2. Behavioral Guarantees

- Idle (unfocused): renders with placeholder text if empty; toolbar buttons are visible but subdued.
  - Focused: content area has a visible focus ring; toolbar buttons are fully active.
  - Active (toolbar button): the button for the currently applied format is visually toggled on (pressed state).
  - Disabled: all toolbar buttons and the content area are non-interactive; reduced opacity.
  - Error: content area border changes to error token color; error message below.
  - Loading: optional loading indicator while content initializes (e.g., when value is fetched asynchronously).
- Controlled vs uncontrolled: supports both patterns. Controlled mode accepts a serialized content value (e.g., HTML string or structured document) and an onChange callback. Uncontrolled mode manages content state internally.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: no animation required in the content area. Toolbar dropdown/overflow menus may use a short fade token animation suppressed under reduced motion preference.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: Tab from outside the component enters the toolbar first, then the content area. Focus is clearly visible at all times. Toolbar focus cycling is managed within the toolbar row.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress all animation within the toolbar. No animation in the content area.

---

## 4. Styling Guarantees

- Required tokens: content area background, content area border, focus border color, toolbar background, toolbar button hover/active colors, error border color, placeholder text color, selection color, disabled opacity, space tokens, radius token, typography scale tokens.
- Prohibited hardcoded values: no hardcoded colors, spacing, font sizes, or border widths.
- Dark mode: all token references must resolve correctly in dark mode; editor content legibility must be maintained against dark backgrounds without custom overrides.

- Responsive behavior: the toolbar wraps or collapses into a compact overflow menu on small screens. The content area stretches to fill available vertical space up to a configurable maximum height, with internal scrolling thereafter.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `RichTextEditor.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
