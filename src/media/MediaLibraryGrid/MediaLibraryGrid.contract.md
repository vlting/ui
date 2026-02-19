# Component Contract — MediaLibraryGrid

## 1. Public API

### Base Props

`MediaLibraryGrid` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `idle` state: grid renders all provided media cards.
- In `loading` state: skeleton cards fill the grid.
- In `empty` state: a meaningful empty state message is displayed.
- In `error` state: an error state communicates that media could not be loaded.
- Selection of individual items is managed by child `MediaCard` components; the grid passes selection state and callbacks down.

- Keyboard behavior: focus moves through cards in reading order; arrow keys may navigate the grid in two dimensions if implemented.
- Screen reader behavior: the grid is announced as a list or grid with item count; each card is individually focusable.
- Motion rules: loading skeleton transitions and entrance animations respect `prefers-reduced-motion`.

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
- Reduced motion: suppress grid entrance animations and skeleton shimmer.

---

## 4. Styling Guarantees

- Required tokens: `background`, `space` (gutter), `color` (empty state text), `colorMuted`.
- Prohibited hardcoded values: no literal column counts, pixel gutters, or color strings.
- Dark mode: empty state and background tokens must resolve correctly in dark themes.

- Responsive behavior: 2 columns on narrow viewports, scaling up to 4+ columns on wider viewports; column count is configurable via props.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `MediaLibraryGrid.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
