# Component Contract — DealCard

## 1. Public API

### Base Props

`DealCard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Placed inside a `KanbanColumn` as a list item. May appear in deal search results or a recent deals panel.

May contain: - `DealCard.Title` — the deal name, optionally as a link.

---

## 2. Behavioral Guarantees

- Idle: Default appearance.
  - Hover: Subtle shadow elevation or background change indicating the card is interactive.
  - Focus: Visible focus ring on the card or the title link.
  - Dragging: Visual feedback while the card is being dragged (managed by the parent drag layer; the card should accept a `isDragging` prop to adjust its visual state — reduced opacity or elevated shadow).
  - Loading: Skeleton for title, value, and stage.
- Controlled vs uncontrolled: Fully controlled. Parent supplies deal data, drag state, and action callbacks.
- Keyboard behavior: Tab focuses the card. Enter opens the deal detail. Arrow keys within the board are managed by the parent (`KanbanColumn`/`PipelineBoard`).
- Screen reader behavior: Deal title is the primary accessible label. Value and stage are announced as supplementary information. The card communicates its position in the pipeline (column/stage context) via its surrounding list structure.
- Motion rules: Hover shadow elevation transitions. Drag state transition (opacity change). Reduced motion: instant changes.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Card is a list item (`role="listitem"`) within its `KanbanColumn` list. Deal title is a link or button. The drag-and-drop handle (if separate) has an appropriate `aria-label` (e.g., "Drag deal: [Title]"). Value is announced with a currency label (e.g., "Value: $45,000").
- Focus rules: Tab focuses the card. Within the card, the title link/button is the first focusable element. Actions (if present) follow.
- Contrast expectations: Title text, value text, and meta text all meet WCAG AA against the card background.
- Reduced motion behavior: Shadow and opacity transitions are suppressed.

---

## 4. Styling Guarantees

- Required tokens: card background, card hover background, card border color, card shadow/elevation, title text color, value text color, meta/muted text color, spacing tokens, border radius token.
- Prohibited hardcoded values: No hardcoded colors, pixel dimensions, or currency symbols in the component (currency format is provided by the parent).
- Dark mode expectations: Card background uses a dark surface token. Value and title text adapt to dark text tokens.

- Responsive behavior: Card width is determined by the `KanbanColumn` container. Minimum width is enforced via a size token to prevent extreme narrowing.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `DealCard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
