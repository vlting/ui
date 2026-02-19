# Component Spec — Sidebar

## 1. Purpose

Provides a persistent vertical navigation or utility panel anchored to the left or right edge of the application shell. It houses primary navigation links, section groups, or contextual utility content that persists across page changes.

Use when: an application has multiple primary navigation destinations or persistent contextual tools that should remain visible on medium and large viewports.

Do NOT use when: the navigation is minimal (3 or fewer items that fit in a TopNav), or on small viewports where it should collapse into a Drawer or bottom navigation.

---

## 2. UX Intent

- Primary interaction goal: give users immediate, persistent access to primary navigation and application sections without requiring a menu-open gesture.
- Expected user mental model: the fixed left-rail navigation found in most web and desktop applications (e.g., file explorers, dashboards, IDEs).
- UX laws applied:
  - Jakob's Law: the left sidebar navigation pattern is deeply familiar across modern apps.
  - Fitts's Law: navigation items in the sidebar must have sufficient height to be clicked or tapped accurately.
  - Hick's Law: navigation items should be grouped and ordered to minimize scanning time.

---

## 3. Visual Behavior

- Renders as a fixed-height vertical container with a defined width (size token).
- Background uses a surface/sidebar background token, visually distinct from the main content area.
- A right-side border or shadow token separates the sidebar from the content region.
- Navigation items stack vertically with consistent spacing (space token).
- The sidebar may display an optional header region (logo, app name) and an optional footer region (user profile, settings).
- Active/selected navigation item uses a primary color token for background or text highlight.
- On small viewports, the sidebar is hidden and replaced by a Drawer or bottom navigation pattern.
- Collapsed state (icon-only rail) may be supported: width shrinks to an icon size token; labels are hidden.

---

## 4. Interaction Behavior

- Navigation items are interactive — each triggers a navigation action via an `onPress` / `href` prop.
- Selected state is controlled via an `activeItem` or equivalent prop matched to item identifiers.
- Collapsed/expanded toggle state may be controlled or uncontrolled (`collapsed` / `defaultCollapsed` with `onCollapsedChange`).
- Keyboard behavior:
  - Tab moves through all focusable navigation items in document order.
  - Enter/Space activates the focused item.
  - Arrow keys (Up/Down) may move focus within a navigation group.
- Screen reader behavior: the sidebar is wrapped in a `<nav>` element with `aria-label`. The active item carries `aria-current="page"`.
- Motion: collapse/expand animation respects `prefers-reduced-motion` — it uses an instant show/hide when reduced motion is preferred.

---

## 5. Accessibility Requirements

- The root element carries `role="navigation"` (via `<nav>`) with `aria-label` (e.g., "Primary navigation").
- The active navigation item carries `aria-current="page"`.
- All navigation items must have accessible text labels; icon-only items in collapsed state must retain a visible tooltip or `aria-label`.
- Focus indicator must be visible on all interactive items and meet WCAG AA contrast.
- Collapsed toggle button carries an accessible label indicating "Collapse sidebar" or "Expand sidebar".
- Do not trap focus inside the sidebar.

---

## 6. Theming Rules

- Required tokens: sidebar background color token, border/shadow token for separation, primary/accent token for active state, muted text token for inactive labels, icon color token, size token for sidebar width (full and collapsed), space tokens for item padding and gap.
- Prohibited: no hardcoded hex colors, pixel widths, or raw font-size values.
- Dark mode: background, border, active highlight, and text tokens must resolve correctly in dark themes.

---

## 7. Composition Rules

- The Sidebar is a layout shell — it accepts navigation item components, group headings, and optional header/footer slots as children.
- Navigation items within the Sidebar must be semantic links or buttons; anchor tags are preferred for primary navigation.
- Sidebar is typically a sibling of the main content area within the application shell layout.
- Anti-patterns:
  - Do not nest a Sidebar inside a Sidebar.
  - Do not place data tables or forms inside the Sidebar — it is for navigation and utility actions.
  - Do not use Sidebar for temporary/contextual content — use a Drawer instead.

---

## 8. Performance Constraints

- The Sidebar is a persistent shell element — it should never unmount during navigation changes within the same app shell.
- Navigation item list should avoid re-rendering on unrelated state changes; active item updates should be surgical.
- Icon assets should be SVG or icon font to prevent image load delays.
- No virtualization required — navigation item counts are expected to be small (under 30 items).

---

## 9. Test Requirements

- Renders all provided navigation items.
- Marks the active item with `aria-current="page"`.
- Triggers `onPress`/navigation handler when an item is activated.
- Collapse/expand toggle changes the sidebar width and hides/shows labels.
- Collapsed items retain accessible labels (tooltip or `aria-label`).
- Nav element has correct `aria-label`.
- All items are keyboard-navigable via Tab and Enter/Space.
- `prefers-reduced-motion` suppresses the collapse animation.
- Renders correctly in light and dark themes.
- Hidden on small viewports (below the defined breakpoint).
