# Component Contract — PermissionMatrix

## 1. Public API

### Base Props

`PermissionMatrix` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: permission management pages, role configuration dialogs, settings sections. The component should be given adequate horizontal space.

May contain: a table of cells; each cell may contain an icon indicator or a toggle control. Row labels may include RoleBadge components. Column headers may include tooltips explaining each permission.

---

## 2. Behavioral Guarantees

- Read-only (display): cells show granted/denied/partial without interactivity.
  - Editable (if supported): cells are toggleable; clicking a cell cycles through allowed states. Edit mode is signaled by the parent via a prop.
  - Hover (editable): cell highlights with a hover token.
  - Focus (editable): cell receives a visible focus ring.
  - Disabled cell: a cell that cannot be toggled is visually muted and not focusable.
  - Loading: skeleton cells while data is loading.
- Controlled vs uncontrolled: the permission state for each cell is controlled by the parent. The component emits change events via `onPermissionChange(role, permission, newValue)`.
- Keyboard behavior (editable mode):
- Screen reader behavior: the matrix uses `<table>` semantics (or ARIA equivalents). Each cell has a computed accessible label combining the row label and column header. Granted/denied state is conveyed via text, not color alone.
- Motion rules: cell toggle transitions use a brief background/icon transition from motion tokens. Suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: table must have an accessible label. Column headers use `<th scope="col">`. Row headers use `<th scope="row">`. In editable mode, interactive cells use `role="checkbox"` or `role="switch"` with `aria-checked` and `aria-label` combining row and column names.
- Focus rules: in editable mode, cells are focusable via keyboard. Focus ring must be clearly visible. Arrow-key navigation within the matrix must not require Tab through every cell.
- Contrast expectations: granted (positive) and denied (destructive) indicators must meet WCAG AA contrast. Color must not be the only differentiator — icon shape (checkmark vs X) is required.
- Reduced motion behavior: cell state change animations are disabled under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: surface, surface-raised, header surface, hover state, positive/success semantic, destructive/error semantic, warning/neutral semantic, border, space tokens, radius tokens (for cell or matrix border).
- Prohibited hardcoded values: no raw hex colors, no pixel-based cell dimensions, no hardcoded icon sizes.
- Dark mode expectations: all surface, border, and semantic color tokens must have dark-mode equivalents. Contrast of granted/denied indicators must hold in both modes.

- Responsive behavior: on narrow viewports, the matrix must scroll horizontally. Row labels remain sticky on the left. Column headers remain sticky at the top. Do not collapse the matrix to a different layout on mobile.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PermissionMatrix.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
