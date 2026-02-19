# Component Contract — MatchList

## 1. Public API

### Base Props

`MatchList` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a tab screen, a drawer panel, or a full-screen layout.

May contain: MatchCard components, optional section header elements, empty state content, loading skeleton rows.

---

## 2. Behavioral Guarantees

loading (skeleton), empty (empty state illustration and CTA), populated (list of cards), error (error message and retry action).
- The list itself is a scroll container; individual items handle their own press interactions.
- Pull-to-refresh behavior is supported via an `onRefresh` callback when the platform supports it.

- Keyboard behavior:
- Screen reader behavior: the list is announced as a list; each MatchCard is a list item. Section headers are announced as group labels.


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
- Reduced motion: no shimmer animation on skeletons; no entrance animations on items.

---

## 4. Styling Guarantees

- Required tokens: `background` (list container), `color` (section headers), separator/border token, skeleton shimmer color token, empty-state illustration tint.
- Prohibited hardcoded values: no raw colors, no pixel gaps or padding outside the token scale.
- Dark mode: all surfaces, section headers, separators, and skeleton placeholders must resolve via theme tokens.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `MatchList.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
