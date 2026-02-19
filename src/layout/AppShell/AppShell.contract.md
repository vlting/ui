# Component Contract — AppShell

## 1. Public API

### Base Props

`AppShell` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: nothing — AppShell is the outermost layout wrapper for application screens. It is placed at the route/page level.

May contain: - `AppShell.Header` — application bar, logo, global actions.

---

## 2. Behavioral Guarantees

- Default: header, sidebar, and content are all visible (on supported viewport sizes).
  - Sidebar collapsed (mobile): sidebar is hidden; content occupies full width.
  - Sidebar open (mobile): sidebar is rendered as an overlay or drawer above the content.
  - Sidebar toggling: controlled by a prop or internal toggle state; the parent or AppShell manages open/closed state.
- Controlled vs uncontrolled: sidebar open/closed state supports both patterns. Controlled mode accepts a `sidebarOpen` prop and `onSidebarChange` callback. Uncontrolled mode manages it internally.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: sidebar open/close uses a short slide transition token, suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: when the sidebar overlay opens, focus moves to the first interactive element within it. When closed, focus returns to the toggle button.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress sidebar slide animation; show/hide the sidebar immediately.

---

## 4. Styling Guarantees

- Required tokens: header background, sidebar background, content background, footer background, region divider/border color, sidebar shadow (overlay mode), space tokens.
- Prohibited hardcoded values: no hardcoded colors, dimensions for sidebar width, or spacing values.
- Dark mode: all region backgrounds and dividers must resolve correctly in dark mode; each region must remain visually distinct from adjacent regions.

- Responsive behavior: on small screens, the sidebar collapses to a hidden drawer (toggled by a hamburger/menu button in the header). The `AppShell.Content` expands to full width. On medium screens, the sidebar may show an icon-only rail. On large screens, the full-width labeled sidebar is visible.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `AppShell.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
