# Component Spec — AppShell

## 1. Purpose

Provides the top-level structural scaffold for an application screen, organizing the primary layout regions — header, sidebar, main content area, and footer — into a cohesive, predictable frame. Used as the outermost layout wrapper for authenticated application pages.

Do NOT use this component inside another AppShell, inside a modal or drawer (use simpler layout primitives there), or for marketing/landing pages that require a distinct non-app layout structure.

---

## 2. UX Intent

- Primary interaction goal: establish a consistent, stable frame that orients users spatially within the application, so that navigational chrome (header, sidebar) is always in the same location and main content is the variable region.
- Expected user mental model: a shell familiar from desktop and web applications — a persistent top bar, a persistent side navigation rail, and a central content area that changes with the route.
- UX laws applied:
  - Jakob's Law: header-top, sidebar-left (or right in RTL), and content-center matches the globally established convention for web application layouts.
  - Gestalt (Figure-Ground): clear visual separation between chrome regions (header, sidebar) and the main content area.
  - Cognitive Load Theory: stable navigational elements reduce the mental overhead required to find controls, allowing users to focus on main content.
  - Fitts's Law: sidebar navigation items and header controls must be easily targetable at their standard positions.

---

## 3. Visual Behavior

- Layout: a full-viewport-height container. `AppShell.Header` spans the full width at the top. `AppShell.Sidebar` occupies a fixed-width column on the left (or right in RTL). `AppShell.Content` fills the remaining space as the scrollable main area. `AppShell.Footer` spans the full width (or content-area width) at the bottom.
- Sub-components (compound pattern): `AppShell.Header`, `AppShell.Sidebar`, `AppShell.Content`, `AppShell.Footer` are each independently composable and may be omitted if a region is not needed.
- Spacing: padding inside `AppShell.Content` uses space tokens. No hardcoded padding on the shell frame itself — regions define their own inner padding.
- Typography: the AppShell itself carries no typography; type styling is defined by content within each region.
- Token usage: background colors for each region (header, sidebar, content, footer), border/divider colors between regions, and shadow (if header or sidebar are elevated) must all use design tokens.
- Responsive behavior: on small screens, the sidebar collapses to a hidden drawer (toggled by a hamburger/menu button in the header). The `AppShell.Content` expands to full width. On medium screens, the sidebar may show an icon-only rail. On large screens, the full-width labeled sidebar is visible.

---

## 4. Interaction Behavior

- States:
  - Default: header, sidebar, and content are all visible (on supported viewport sizes).
  - Sidebar collapsed (mobile): sidebar is hidden; content occupies full width.
  - Sidebar open (mobile): sidebar is rendered as an overlay or drawer above the content.
  - Sidebar toggling: controlled by a prop or internal toggle state; the parent or AppShell manages open/closed state.
- Controlled vs uncontrolled: sidebar open/closed state supports both patterns. Controlled mode accepts a `sidebarOpen` prop and `onSidebarChange` callback. Uncontrolled mode manages it internally.
- Keyboard behavior:
  - Tab navigates through the header, sidebar, and content regions in document order.
  - When the sidebar is open as an overlay, focus is trapped within the sidebar until it is closed (Escape or close button).
  - Escape closes an open overlay sidebar.
- Screen reader behavior:
  - `AppShell.Header` is wrapped in `<header>` or `role="banner"`.
  - `AppShell.Sidebar` is wrapped in `<nav>` or `role="navigation"` with an `aria-label`.
  - `AppShell.Content` is wrapped in `<main>` or `role="main"`.
  - `AppShell.Footer` is wrapped in `<footer>` or `role="contentinfo"`.
  - When sidebar opens as an overlay, a live region announces the change.
- Motion rules: sidebar open/close uses a short slide transition token, suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA: each region uses its appropriate landmark role. The sidebar has an `aria-label` identifying it as the application navigation. When acting as an overlay, the sidebar has `aria-modal="true"` and focus is trapped.
- Focus rules: when the sidebar overlay opens, focus moves to the first interactive element within it. When closed, focus returns to the toggle button.
- Contrast: background colors for all shell regions must produce sufficient contrast for text rendered within them, using design tokens.
- Reduced motion: suppress sidebar slide animation; show/hide the sidebar immediately.

---

## 6. Theming Rules

- Required tokens: header background, sidebar background, content background, footer background, region divider/border color, sidebar shadow (overlay mode), space tokens.
- Prohibited hardcoded values: no hardcoded colors, dimensions for sidebar width, or spacing values.
- Dark mode: all region backgrounds and dividers must resolve correctly in dark mode; each region must remain visually distinct from adjacent regions.

---

## 7. Composition Rules

- What can wrap it: nothing — AppShell is the outermost layout wrapper for application screens. It is placed at the route/page level.
- What it may contain:
  - `AppShell.Header` — application bar, logo, global actions.
  - `AppShell.Sidebar` — primary navigation links, account controls.
  - `AppShell.Content` — page-level content, rendered by the active route.
  - `AppShell.Footer` — global footer links, legal text, or status bar.
- Anti-patterns:
  - Do not nest AppShell inside another AppShell.
  - Do not place routing logic inside the component — it is a purely structural layout.
  - Do not hardcode sidebar width or header height — use token-driven size props.

---

## 8. Performance Constraints

- Memoization: each shell region (`Header`, `Sidebar`, `Content`, `Footer`) should be independently memoized to prevent the header from re-rendering when only the main content changes.
- Virtualization: not applicable to the shell frame itself.
- Render boundaries: `AppShell.Content` should be an independent render boundary (React Suspense boundary or equivalent) so that content loading does not affect the shell chrome.

---

## 9. Test Requirements

- Rendering: renders with all four regions present; renders with each region individually omitted.
- Sidebar collapse: sidebar is hidden on small viewports; content expands to full width.
- Sidebar toggle (mobile): sidebar opens and closes correctly; focus management on open/close.
- Controlled sidebar: sidebarOpen prop and onSidebarChange callback are honored.
- Keyboard navigation: Tab moves through regions in order; Escape closes overlay sidebar.
- Focus trap: when sidebar is an overlay, focus is contained within it until closed.
- Accessibility: landmark roles (banner, navigation, main, contentinfo) are present; sidebar aria-label is set; overlay sidebar has aria-modal.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: sidebar open/close is immediate when motion is reduced.
