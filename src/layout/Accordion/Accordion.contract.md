# Component Contract — Accordion

## 1. Public API

### Base Props

`Accordion` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: page content sections, sidebar panels, settings layouts, modal bodies. Must be a descendant of the design system Provider.

May contain: individual accordion items, each with a header (trigger) and a content panel. Content panels may contain any valid content: text, lists, forms, media, or nested components.

---

## 2. Behavioral Guarantees

- Closed: content panel is hidden; chevron points downward (or in the open direction).
  - Open: content panel is visible; chevron rotates to indicate open state.
  - Hover (header): header background changes to hover token color.
  - Focus (header): visible focus ring on the header.
  - Disabled (item): header is non-interactive; reduced opacity applied to the item.
- Controlled vs uncontrolled: supports both patterns. In controlled mode, the parent manages which items are open via a value prop and onChange callback. In uncontrolled mode, the component manages open state internally. Supports single-open (exclusive) and multi-open modes as a configuration prop.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: content panel opens and closes with a short height transition token. Chevron rotates with the same duration. Both are suppressed under reduced motion; panels show/hide immediately.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: focus is always visible on the active header. Opening a panel does not move focus into the content automatically; the user navigates there with Tab.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress height animation and chevron rotation; apply open/close state instantaneously.

---

## 4. Styling Guarantees

- Required tokens: header background, header text, open header background (if distinct), hover background, focus ring color, divider border color, content background, content text, chevron icon color, disabled opacity, space tokens, radius token (for the outer container corners).
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; dividers and header/content backgrounds must remain visually distinct against dark page backgrounds.

- Responsive behavior: the accordion spans the full width of its container at all breakpoints. Content panels grow to fit their content height naturally.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Accordion.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
