# Component Contract — Breadcrumbs

## 1. Public API

### Base Props

`Breadcrumbs` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: page headers, content area tops, admin page layouts, detail page headers. Must be a descendant of the design system Provider. Placed above the page title.

May contain: breadcrumb link items (label + href), a separator element between items (rendered automatically), the current page text item, and an optional ellipsis item for truncated hierarchies.

---

## 2. Behavioral Guarantees

- Default: all ancestor items are links; the current page item is plain text.
  - Hover (link): link text changes to hover token color; underline may appear.
  - Focus (link): visible focus ring around the link.
  - Active/Pressed (link): brief active token feedback.
  - Truncated: an ellipsis "..." item appears between the root and the current page; clicking/pressing the ellipsis expands the hidden items.
  - Expanded (from truncated): all hidden items become visible inline.
- Controlled vs uncontrolled: the breadcrumb items are purely driven by the `items` prop (an ordered array of label + href pairs). The truncated/expanded state of the ellipsis may be internally managed or controlled by the parent.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: no animation required for standard breadcrumb rendering. Ellipsis expansion may use a very brief fade token animation suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: focus is visible on every interactive link and the ellipsis button. Tab order follows the left-to-right item order.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress ellipsis expansion animation; expand items immediately.

---

## 4. Styling Guarantees

- Required tokens: link text color, link hover color, link active color, current page text color, separator color, focus ring color, space tokens (item gap, link padding).
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: link colors and separator colors must resolve correctly in dark mode and remain legible against dark page backgrounds.

- Responsive behavior: on very narrow screens, deeply nested breadcrumbs truncate middle items behind an expandable ellipsis control. The first item (root) and the last item (current) are always visible.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Breadcrumbs.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
