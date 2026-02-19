# Component Contract — BottomTabs

## 1. Public API

### Base Props

`BottomTabs` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: the AppShell or a full-screen page layout on mobile. It must be placed at the bottom of the viewport. Must be a descendant of the design system Provider.

May contain: individual tab items, each with an icon and a label. Optional notification badge overlaid on the icon.

---

## 2. Behavioral Guarantees

- Active tab: distinctive icon and label color using active token; optional indicator (underline, filled background, or dot) using active token.
  - Inactive tab: subdued icon and label color using inactive token.
  - Hover (pointer devices): hover background token applied to the hovered tab item.
  - Focused tab item: visible focus ring around the tab item.
  - Pressed/Active: brief press feedback using active token.
  - Disabled tab: non-interactive, reduced opacity using disabled token.
  - Badge (notification count): an optional badge on a tab icon to signal unread items.
- Controlled vs uncontrolled: supports both patterns. Controlled mode accepts an active tab value and onChange callback. Uncontrolled mode manages the active tab internally.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: tab transition (label color, icon color, indicator) uses a very short duration token. Any indicator animation is suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: focus is visible on the active tab item. Arrow keys cycle focus within the tablist. Tab exits the tablist.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress all indicator and color transition animations.

---

## 4. Styling Guarantees

- Required tokens: bar background, bar border-top color, active icon/label color, inactive icon/label color, active indicator color, focus ring color, disabled opacity, badge background, badge text color, space tokens (padding, gap), typography scale token for labels.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: bar background and tab colors must resolve correctly in dark mode; active indicators must remain visually distinct against dark bar backgrounds.

- Responsive behavior: BottomTabs is a mobile-first component. On tablet-sized viewports and above, it should not be rendered; the parent layout is responsible for switching to a sidebar or top navigation. The component does not adapt its own layout for wide screens.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `BottomTabs.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
