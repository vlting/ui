# Component Contract — KanbanBoard

## 1. Public API

### Base Props

`KanbanBoard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: A project workspace view, a sprint board page, or a full-screen layout.

May contain: Column containers, each containing TaskCard components, an optional column header with controls, and an "Add card" affordance.

---

## 2. Behavioral Guarantees

- Idle: All columns and cards displayed.
  - Dragging: A card is being dragged; a ghost placeholder shows the target position; the card's source position shows an empty slot.
  - Hover over drop zone: The target column or position highlights to indicate a valid drop target.
  - Loading: Skeleton column and card placeholders are displayed.
  - Empty board: An empty state with guidance text is displayed.
  - Empty column: A visual placeholder or "No items" label is shown within the column body.
- Controlled vs uncontrolled: Column order and card assignment are controlled props. The parent manages state; the board fires callbacks on card move and column reorder.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Card drag animation is smooth. Drop confirmation may include a brief settle animation. All motion is suppressed under reduced motion preference.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: Tab moves between all interactive elements in DOM order. Keyboard card movement must not trap focus. After a card move, focus remains on the moved card in its new position.
- Contrast expectations: Column headers must meet 4.5:1. Card content must meet 4.5:1. Drop zone highlights must be perceivable without relying on color alone.
- Reduced motion behavior: Drag animations and settle effects are disabled. Card moves are instant position changes.

---

## 4. Styling Guarantees

- Required tokens: board background, column background, column header background, card background, drag ghost background, drop target highlight color, text primary, text secondary (count badge), space, radius.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Board, column, and card backgrounds shift to dark tokens. Drag ghost and drop target highlights remain distinguishable on dark surfaces.
- Layout rules:
- Responsive behavior: On narrow viewports, columns stack vertically (single-column mode) or the board scrolls horizontally. The interaction mode may switch from drag-and-drop to a context menu or move action on mobile.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `KanbanBoard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
