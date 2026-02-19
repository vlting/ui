# Component Contract — OrgSwitcher

## 1. Public API

### Base Props

`OrgSwitcher` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: navigation sidebars, application headers, settings navigation panels.

May contain: an OrgAvatar, org name text, a chevron icon in the trigger; a scrollable list of org items (each containing OrgAvatar + name + optional active indicator) in the dropdown.

---

## 2. Behavioral Guarantees

- Idle/closed: trigger shows current org identity.
  - Open: dropdown is visible, focus moves into the list.
  - Hovered (trigger): trigger background shifts to hover token.
  - Active/selected org: the current org is visually marked in the list.
  - Loading: if the org list is being fetched, a loading indicator appears inside the dropdown.
- Controlled vs uncontrolled: open state may be controlled via `open` / `onOpenChange` props, or managed internally.
- Keyboard behavior:
- Screen reader behavior: trigger has an accessible name describing the current org and the expand/collapse state (`aria-expanded`). The dropdown list has `role="listbox"` or `role="menu"`. Each org option has the appropriate role (`role="option"` or `role="menuitem"`). The active org is marked `aria-selected="true"`.
- Motion rules: dropdown open/close uses a short fade and slide transition (from motion tokens). Suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: trigger button has `aria-haspopup="listbox"` (or `"menu"`) and `aria-expanded` reflecting open state. Dropdown list has an accessible label. Active org option has `aria-selected="true"` or `aria-checked="true"`.
- Focus rules: on open, focus moves to the first item in the dropdown (or the active org item). On close (Escape or selection), focus returns to the trigger.
- Contrast expectations: all org names, icons, and the active indicator must meet WCAG AA contrast against their backgrounds in both light and dark modes.
- Reduced motion behavior: open/close transitions are instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: surface, surface-elevated/popover, hover state, selected/active background, primary text, secondary text, border, shadow, space tokens (padding, item height), border-radius.
- Prohibited hardcoded values: no raw hex colors, no pixel-based dimensions, no hardcoded font sizes.
- Dark mode expectations: dropdown panel must be visually elevated above the page background in dark mode. Selected state must remain distinguishable. All text must remain legible.

- Responsive behavior: on mobile, the dropdown may be replaced by a bottom sheet. On desktop, it is an inline popover.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `OrgSwitcher.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
