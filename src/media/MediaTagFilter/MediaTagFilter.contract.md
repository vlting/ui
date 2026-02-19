# Component Contract — MediaTagFilter

## 1. Public API

### Base Props

`MediaTagFilter` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `inactive` state: chip in unselected state.
- In `active/selected` state: chip visually highlighted.
- In `hover` state: subtle background shift on hover.
- In `focus` state: visible focus ring on the chip.
- In `disabled` state: a tag may be individually disabled; reduced opacity, non-interactive.
- Supports single-select or multi-select mode depending on props.

- Keyboard behavior: `Tab` moves focus between chips; `Space` or `Enter` toggles a chip.
- Screen reader behavior: each chip announces its label, count, and current selected/unselected state.
- Motion rules: toggle transitions respect `prefers-reduced-motion`.

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
- Reduced motion: suppress toggle animations.

---

## 4. Styling Guarantees

- Required tokens: `background` (inactive chip), `backgroundSelected` (active chip), `borderColor`, `borderColorSelected`, `color`, `colorSelected`, `colorMuted`, `focusStyle`, `space`, `borderRadius`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or border-radius numbers.
- Dark mode: active and inactive chip states must maintain sufficient contrast in dark themes.

- Responsive behavior: on narrow viewports the chip row scrolls horizontally; on wider viewports all chips may be visible without scrolling.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `MediaTagFilter.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
