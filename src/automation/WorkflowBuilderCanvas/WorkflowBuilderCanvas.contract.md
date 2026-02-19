# Component Contract — WorkflowBuilderCanvas

## 1. Public API

### Base Props

`WorkflowBuilderCanvas` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

idle, hovered, selected, connecting (being dragged as a source), error (misconfigured), disabled.
- States per edge: idle, hovered, selected, invalid (broken connection).
- Canvas-level states: empty, has-content, read-only.

- Keyboard behavior:
- Screen reader behavior: the canvas is wrapped in a `role="application"` region with an accessible name. A separate accessible node list (visually hidden or in a sidebar) allows screen readers to navigate workflow steps as a list. Each node in the list announces step type, label, and connection info. Changes (add, remove, connect) are announced via a live region.


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
- Reduced motion: zoom transitions and node move animations are instant when `prefers-reduced-motion: reduce` is active.

---

## 4. Styling Guarantees

- Required tokens: canvas background, canvas grid color, node background, node border, node selected border, node header background, node label color, node error border, edge color, edge selected color, edge invalid color, handle color, add-step button color, zoom control background, zoom control icon color, minimap background.
- Prohibited hardcoded values: no raw colors, no pixel font sizes, no hardcoded z-index values (use zIndex tokens).
- Dark mode: canvas background, grid, node surfaces, and edge colors all resolve correctly in dark theme; selected and error states remain visually distinct.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `WorkflowBuilderCanvas.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
