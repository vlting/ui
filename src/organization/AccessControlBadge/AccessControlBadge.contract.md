# Component Contract — AccessControlBadge

## 1. Public API

### Base Props

`AccessControlBadge` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: table cells, list items, card headers, detail view rows, tooltips.

May contain: a single short text label; optionally a small icon to the left of the label.

---

## 2. Behavioral Guarantees

- Idle: displays the access level label with the appropriate semantic color.
  - Disabled: not applicable (non-interactive).
  - Loading: not applicable (static display only).
  - Error: not applicable at the badge level; parent component handles error state.
- Controlled vs uncontrolled: display-only; no internal state.
- Keyboard behavior: not focusable unless placed inside a focusable parent.
- Screen reader behavior: the label text is the accessible name; no additional role is needed beyond the rendered text.
- Motion rules: no animations. No reduced-motion considerations required for static badges.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: no special ARIA role required. If the badge conveys meaning through color alone, an accessible text label must always be present (color is supplementary, not the only indicator).
- Focus rules: not in the tab order by default; must not receive focus independently.
- Contrast expectations: text-to-background contrast must meet WCAG AA (4.5:1 minimum for small text).
- Reduced motion behavior: no motion present; no change needed.

---

## 4. Styling Guarantees

- Required tokens: background color, foreground/text color, border-radius, horizontal and vertical padding (space tokens), font-size (type scale token).
- Prohibited hardcoded values: no raw hex colors, no pixel-based spacing literals, no hardcoded font sizes.
- Dark mode expectations: semantic color tokens must resolve to appropriate dark-mode equivalents automatically through the theme system. Contrast ratios must hold in both light and dark modes.

- Responsive behavior: size remains constant across breakpoints; it is not expected to reflow or resize.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `AccessControlBadge.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
