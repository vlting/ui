# Component Contract — KanbanColumn

## 1. Public API

### Base Props

`KanbanColumn` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Placed inside a `PipelineBoard` as a horizontal sequence of columns.

May contain: A column header (stage name, count, value), a scrollable `DealCard` list, an empty state, and optionally an "Add deal" action button in the header.

---

## 2. Behavioral Guarantees

- Idle: Standard column appearance with cards.
  - Empty: Column shows an empty state within the card list (e.g., "No deals in this stage") with optional drag-target affordance.
  - Loading: Skeleton cards in the card list area.
  - Drop target active: When a deal card is being dragged over this column, a highlight border or background tint indicates it is an active drop zone.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the stage data, card list, loading state, and drag-and-drop event callbacks.
- Keyboard behavior: The column itself is not a primary keyboard navigation target. Card list items within it are focusable. For keyboard-accessible drag-and-drop, the parent provides a separate keyboard move mechanism.
- Screen reader behavior: The column is a `role="group"` with an `aria-label` of the stage name. The card list is a `<ul>`. The header announces stage name, deal count, and aggregate value. Drop target state is communicated via `aria-dropeffect` or an equivalent live region announcement.
- Motion rules: Drop target highlight animates in/out. Reduced motion: instant highlight change.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Column container uses `role="group"` and `aria-label` with the stage name. Card list is a `<ul>` with `role="list"`. Drop target state uses `aria-dropeffect="move"` when drag is in progress. For full keyboard accessibility, each card should support a keyboard-triggered "Move to stage" menu as a complement to drag-and-drop.
- Focus rules: Tab enters the column and navigates through cards. The column header itself is not a focus stop unless it contains interactive controls (e.g., an "Add deal" button).
- Contrast expectations: Stage name, deal count, and aggregate value all meet WCAG AA. Drop target highlight meets contrast requirements against the column background.
- Reduced motion behavior: Drop target highlight transition is suppressed.

---

## 4. Styling Guarantees

- Required tokens: column background, column border color, header background, header border color, stage name text color, deal count text/badge color, aggregate value text color, drop target highlight background, spacing tokens, border radius token.
- Prohibited hardcoded values: No hardcoded colors, fixed pixel column widths, or stage-specific colors (stage colors are supplied by the parent via token-compatible values).
- Dark mode expectations: Column and header backgrounds use dark surface tokens. All text and border colors adapt.

- Responsive behavior: On narrow viewports, columns scroll horizontally within the `PipelineBoard`. Each column has a minimum width enforced via a size token. On very narrow (mobile) viewports, the board may switch to a single-column list view (managed by the parent).
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `KanbanColumn.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
