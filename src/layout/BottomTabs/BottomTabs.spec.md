# Component Spec — BottomTabs

## 1. Purpose

Provides a fixed bottom navigation bar containing a small number of primary destination tabs for mobile application screens. Used as the primary navigation pattern for mobile apps where four to five top-level destinations need to be reachable at all times without a sidebar.

Do NOT use this component on desktop/wide-screen layouts (use a sidebar or top navigation instead), for more than five tabs (use a different navigation pattern), or for secondary or contextual actions (use a BottomSheet or ActionSheet instead).

---

## 2. UX Intent

- Primary interaction goal: give mobile users persistent, thumb-reachable access to the app's top-level destinations so they can switch between sections without a back-navigation gesture.
- Expected user mental model: the standard mobile bottom tab bar found in native iOS and Android apps — labeled icon buttons at the bottom of the screen, with the active tab visually differentiated.
- UX laws applied:
  - Fitts's Law: tab items must have tall touch targets spanning the full bar height and equal widths, placing them comfortably in thumb reach.
  - Jakob's Law: bottom tab bar placement and icon+label structure match native mobile conventions established by iOS and Material Design.
  - Hick's Law: limit to five tabs maximum to minimize the cognitive cost of choosing a destination.
  - Gestalt (Similarity, Proximity): all tab items share the same size and structure, reinforcing their equivalence as navigation peers.

---

## 3. Visual Behavior

- Layout: a full-width horizontal bar pinned to the bottom of the viewport (or safe area on devices with a home indicator). Tab items are distributed evenly across the bar width, each containing an icon above a label.
- Spacing: icon-to-label gap, item padding (vertical and horizontal), and safe-area inset at the bottom use space and layout tokens.
- Typography: tab labels use the smallest body/caption scale token. Active tab label may use a slightly bolder weight token.
- Token usage: bar background, active tab icon color, active tab label color, active tab indicator (underline, dot, or background), inactive tab icon color, inactive tab label color, border-top separator color must all use design tokens.
- Responsive behavior: BottomTabs is a mobile-first component. On tablet-sized viewports and above, it should not be rendered; the parent layout is responsible for switching to a sidebar or top navigation. The component does not adapt its own layout for wide screens.

---

## 4. Interaction Behavior

- States:
  - Active tab: distinctive icon and label color using active token; optional indicator (underline, filled background, or dot) using active token.
  - Inactive tab: subdued icon and label color using inactive token.
  - Hover (pointer devices): hover background token applied to the hovered tab item.
  - Focused tab item: visible focus ring around the tab item.
  - Pressed/Active: brief press feedback using active token.
  - Disabled tab: non-interactive, reduced opacity using disabled token.
  - Badge (notification count): an optional badge on a tab icon to signal unread items.
- Controlled vs uncontrolled: supports both patterns. Controlled mode accepts an active tab value and onChange callback. Uncontrolled mode manages the active tab internally.
- Keyboard behavior:
  - Tab navigates to the BottomTabs bar; Arrow Left/Right navigates between tab items.
  - Enter or Space activates the focused tab.
  - Home/End move to the first/last tab item.
- Screen reader behavior:
  - The bar uses `role="tablist"`. Each tab item uses `role="tab"` with `aria-selected` reflecting active state. The bar has an `aria-label` (e.g., "Main navigation").
  - Active tab is announced when changed.
  - Badge counts are announced as part of the tab label (e.g., "Messages, 3 unread").
- Motion rules: tab transition (label color, icon color, indicator) uses a very short duration token. Any indicator animation is suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA: the container uses `role="tablist"`. Each tab item uses `role="tab"` with `aria-selected`. The tablist has `aria-label`. Disabled tabs use `aria-disabled="true"`.
- Focus rules: focus is visible on the active tab item. Arrow keys cycle focus within the tablist. Tab exits the tablist.
- Contrast: active and inactive icon/label colors must both meet WCAG AA contrast against the bar background using design tokens.
- Reduced motion: suppress all indicator and color transition animations.

---

## 6. Theming Rules

- Required tokens: bar background, bar border-top color, active icon/label color, inactive icon/label color, active indicator color, focus ring color, disabled opacity, badge background, badge text color, space tokens (padding, gap), typography scale token for labels.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: bar background and tab colors must resolve correctly in dark mode; active indicators must remain visually distinct against dark bar backgrounds.

---

## 7. Composition Rules

- What can wrap it: the AppShell or a full-screen page layout on mobile. It must be placed at the bottom of the viewport. Must be a descendant of the design system Provider.
- What it may contain: individual tab items, each with an icon and a label. Optional notification badge overlaid on the icon.
- Anti-patterns:
  - Do not use more than five tab items.
  - Do not render BottomTabs on desktop/wide layouts — use appropriate wide-screen navigation instead.
  - Do not embed navigational logic or routing inside the component — delegate via onTabChange callback.
  - Do not place interactive elements other than tab items inside the bar.

---

## 8. Performance Constraints

- Memoization: individual tab items should be memoized; only the active tab item should re-render on tab change.
- Virtualization: not applicable; tab count is fixed and low (maximum five).
- Render boundaries: the content area associated with the active tab is rendered by the parent; BottomTabs only manages the navigation bar itself.

---

## 9. Test Requirements

- Rendering: renders correctly with two, three, four, and five tab items.
- Active state: the active tab item shows the active token colors and indicator.
- Tab change: pressing an inactive tab fires the onChange callback with the correct tab value.
- Controlled mode: active tab and onChange from parent are respected.
- Disabled tab: disabled tab item is non-interactive and shows reduced opacity.
- Badge: badge count renders on the correct tab icon and is included in screen reader announcement.
- Keyboard navigation: Arrow Left/Right, Enter/Space, Home/End behave as specified.
- Accessibility: tablist role, tab roles, aria-selected, aria-disabled, aria-label are all present.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: no transition animation on tab change when motion is reduced.
