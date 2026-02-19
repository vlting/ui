# Component Contract — RoleBadge

## 1. Public API

### Base Props

`RoleBadge` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: TeamMemberTable rows, user profile sections, OrgSwitcher items, InviteUserModal confirmations, AuditLogViewer rows.

May contain: a single text label. Optionally a small icon to the left of the label.

---

## 2. Behavioral Guarantees

- Idle: displays the role label with its associated semantic color.
  - No hover, focus, or active states (non-interactive).
  - Disabled: not applicable.
  - Loading: not applicable.
- Controlled vs uncontrolled: display-only. Accepts a `role` prop (string or enum value).
- Keyboard behavior: not focusable; does not participate in tab order.
- Screen reader behavior: the role label text is the accessible name. No additional ARIA role is required.
- Motion rules: no animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: no special ARIA role. The role label text must always be present as visible text (color is supplementary).
- Focus rules: not focusable.
- Contrast expectations: text-to-background contrast must meet WCAG AA (4.5:1 minimum) for all role variants in both light and dark themes.
- Reduced motion behavior: no motion; not applicable.

---

## 4. Styling Guarantees

- Required tokens: background color token (per role variant), foreground/text color token (per role variant), border-radius token, horizontal and vertical padding (space tokens), font-size (type scale token).
- Prohibited hardcoded values: no raw hex colors, no pixel-based padding, no hardcoded font sizes.
- Dark mode expectations: each role variant's background and text tokens must resolve to appropriate dark-mode values while maintaining required contrast ratios.

- Responsive behavior: size remains constant across breakpoints. The parent controls density adjustments.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `RoleBadge.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
