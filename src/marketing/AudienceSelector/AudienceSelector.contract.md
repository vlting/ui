# Component Contract — AudienceSelector

## 1. Public API

### Base Props

`AudienceSelector` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `idle` state: segments listed with unselected state.
- In `hover` state: row or chip highlights using a background hover token.
- In `focus` state: visible focus ring on each selectable row.
- In `selected` state: row or chip shows active selection via background, border, and/or checkmark.
- In `disabled` state: a segment may be individually disabled (e.g., insufficient permissions); renders at reduced opacity and is non-interactive.
- In `loading` state: an optional loading state for async segment lists; spinner or skeleton visible.
- In `empty` state: communicates clearly when no segments match the current filter.

- Keyboard behavior: `Tab` moves focus between rows; `Space` or `Enter` toggles selection; arrow keys navigate within the list.
- Screen reader behavior: each row announces its name, member count if provided, and current selection state.
- Motion rules: selection transitions respect `prefers-reduced-motion`; no animation when reduced motion is active.

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
- Reduced motion: suppress animated transitions; instant visual state changes only.

---

## 4. Styling Guarantees

- Required tokens: `background`, `backgroundHover`, `backgroundSelected`, `borderColor`, `borderColorSelected`, `color`, `colorMuted`, `focusStyle`, `space`, `borderRadius`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or border-radius numbers.
- Dark mode: all tokens must resolve correctly in both light and dark themes with sufficient contrast.

- Responsive behavior: on narrow viewports the selector occupies full width; on wider viewports it may be presented as a constrained panel.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `AudienceSelector.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
