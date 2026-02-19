# Component Contract — SkeletonLoader

## 1. Public API

### Base Props

`SkeletonLoader` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: list containers, card bodies, table rows (as a loading row), page content areas.

May contain: individual skeleton shape primitives (line, circle, rectangle) composed to match the target content layout.

---

## 2. Behavioral Guarantees

- Renders without error when valid props are supplied.


- Screen reader behavior: the skeleton container uses `aria-busy="true"` on its parent region, and skeleton shapes are hidden from screen readers (`aria-hidden="true"`) to prevent noise. A single accessible live region communicates the loading state.
- Motion rules:

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
- Reduced motion: shimmer/pulse animation is suppressed when reduced motion is preferred; a static appearance is used instead.

---

## 4. Styling Guarantees

- Required tokens: skeleton base background color, shimmer highlight color, border radius (if shaped elements use rounding).
- Prohibited hardcoded values: no hardcoded hex colors, pixel sizes, or animation durations.
- Dark mode: skeleton base and shimmer tokens must resolve to perceptible values in dark mode (avoid blending into dark backgrounds).

- Responsive behavior: skeleton elements scale with the container, matching the responsive behavior of the target content.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `SkeletonLoader.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
