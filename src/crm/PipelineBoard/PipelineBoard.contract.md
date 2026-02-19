# Component Contract — PipelineBoard

## 1. Public API

### Base Props

`PipelineBoard` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Placed on a dedicated pipeline or deals page, typically below a page header and filter/sort controls.

May contain: A horizontal sequence of `KanbanColumn` components. An optional board-level empty state. An optional global loading overlay (skeleton columns).

---

## 2. Behavioral Guarantees

- Idle: All columns rendered with their deal cards.
  - Loading: Skeleton columns and cards rendered while pipeline data is loading.
  - Empty pipeline: A full-board empty state shown when there are no stages or no deals at all.
  - Drag in progress: One card is being dragged; the source column shows a placeholder gap; the target column shows a drop zone highlight.
  - Error: An error state with retry action.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the pipeline stages array, deal data, loading state, and drag-and-drop event callbacks (onDragStart, onDrop, onDragEnd).
- Keyboard behavior: Tab navigates through the board column by column, then into cards within each column. A keyboard-accessible "Move deal" mechanism must be provided as a complement to mouse drag-and-drop (e.g., a context menu or keyboard shortcut to move a focused card to another stage).
- Screen reader behavior: The board is a `role="group"` with `aria-label="Pipeline board"` or equivalent. Each `KanbanColumn` is a named group within the board. Drag-and-drop state changes are announced via `aria-live` (e.g., "Moved Deal X to Proposal stage").
- Motion rules: Card drag animation follows pointer smoothly. Drop success animates card into place. Reduced motion: drag shadow and drop animation are suppressed; card position updates instantly.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Board container uses `role="group"` and `aria-label="Pipeline board"`. Drag-and-drop state uses appropriate `aria-grabbed` and `aria-dropeffect`. An `aria-live="polite"` region announces successful deal moves. A keyboard-accessible alternative to drag-and-drop must exist.
- Focus rules: Tab order follows columns left to right, then cards top to bottom within each column. Focus is not trapped within the board.
- Contrast expectations: Board background provides sufficient contrast against column backgrounds. All column and card text meets WCAG AA.
- Reduced motion behavior: Card drag animation and drop placement animation are fully suppressed.

---

## 4. Styling Guarantees

- Required tokens: board background color, column gap spacing token, board outer padding token, horizontal scrollbar color, empty state text color.
- Prohibited hardcoded values: No hardcoded colors, fixed pixel widths for the board, or column counts.
- Dark mode expectations: Board background uses a dark canvas token (darker than column surfaces). Column and card backgrounds adapt accordingly.

- Responsive behavior: On wide viewports, all columns may be visible simultaneously. On narrower viewports, the board scrolls horizontally. On mobile, the board may switch to a single-column swipeable view or a list view (parent-determined).
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PipelineBoard.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
