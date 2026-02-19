# Component Spec — TopNav

## 1. Purpose

Provides a persistent horizontal navigation bar anchored to the top of the application viewport. It houses the application logo, primary navigation links or tabs, global actions (search, notifications, user menu), and optional breadcrumbs.

Use when: the application needs a universal top-level navigation region that persists across all routes.

Do NOT use when: navigation is vertical and better suited to a Sidebar, or when a page-specific header is needed — use PageHeader for that.

---

## 2. UX Intent

- Primary interaction goal: provide immediate, persistent access to global navigation and app-level actions from any location in the application.
- Expected user mental model: the application menu bar or navigation strip found at the top of virtually every web application — its presence and position are expected.
- UX laws applied:
  - Jakob's Law: horizontal top navigation is the most universally recognized global navigation pattern.
  - Fitts's Law: navigation items and action buttons must have sufficient height and tap area for reliable activation on touch devices.
  - Gestalt (figure/ground): the TopNav is visually distinct from the page content beneath it through background color or shadow.

---

## 3. Visual Behavior

- Renders as a full-width horizontal strip fixed or sticky to the top of the viewport.
- Height is defined by a size token; it does not shrink or grow based on content.
- The left region contains the application logo or brand mark.
- The center region (optional) contains primary navigation links or a tab bar.
- The right region contains global action items: search, notifications, user avatar/menu.
- All internal spacing uses space tokens; item alignment is achieved via flex layout with token-based gaps.
- A bottom border or drop shadow token separates the TopNav from page content.
- On small viewports, the center navigation may collapse into a hamburger/menu button that opens a Drawer.
- Background uses a surface/navbar background token.

---

## 4. Interaction Behavior

- Navigation links in the TopNav are interactive; the active link is indicated via an active state (color or underline token).
- Action buttons (search, notifications) trigger overlays, panels, or navigation.
- Active navigation item is driven by a prop (`activeItem`) matched to item identifiers; no internal state management.
- Keyboard behavior:
  - Tab moves through all focusable items in the TopNav left-to-right.
  - Enter/Space activates the focused item.
  - Arrow keys may be used within a navigation group (if implemented as a menubar).
- Screen reader behavior: the TopNav is wrapped in a `<header>` or `<nav>` element with `aria-label="Main navigation"`. The active link carries `aria-current="page"`.
- Motion: no animation on the TopNav frame. Overlay/drawer triggered from the mobile menu follows its own animation rules.

---

## 5. Accessibility Requirements

- The root renders as a `<header>` landmark containing a `<nav>` with `aria-label="Main navigation"` (or equivalent).
- The active navigation link carries `aria-current="page"`.
- Icon-only action buttons must have `aria-label` (e.g., "Open notifications", "Open user menu").
- The mobile menu trigger button must have `aria-label` and `aria-expanded` reflecting the Drawer state.
- All text and icon contrast must meet WCAG AA.
- Focus indicator must be visible on all interactive items.
- The TopNav must not trap focus.

---

## 6. Theming Rules

- Required tokens: navbar background color token, border/shadow token for bottom separation, primary/accent token for active navigation indicator, muted text token for inactive links, space tokens for padding and item gap, size token for navbar height.
- Prohibited: no hardcoded hex colors, pixel heights, or raw font-size values.
- Dark mode: background, border, active indicator, and text tokens must resolve correctly in dark themes without consumer overrides.

---

## 7. Composition Rules

- TopNav accepts slotted children for logo, navigation items, and action items.
- Navigation items within TopNav are links or buttons; they are not nested layout containers.
- TopNav is a sibling of the page content area in the application shell — it is not nested inside pages.
- Anti-patterns:
  - Do not nest TopNav inside another TopNav.
  - Do not place forms, tables, or data-heavy content inside TopNav.
  - Do not use TopNav for page-specific headers — use PageHeader.

---

## 8. Performance Constraints

- The TopNav is a persistent, always-mounted shell element — it must not re-render on route changes unless active item state changes.
- Navigation links should not cause unnecessary re-renders in the rest of the application.
- Logo and icon assets should be optimized SVGs or icon font glyphs.
- No virtualization applicable.

---

## 9. Test Requirements

- Renders logo, navigation links, and action items in the correct regions.
- Marks the active navigation link with `aria-current="page"`.
- Navigation links activate on click/press.
- Icon-only action buttons have accessible labels.
- Mobile menu trigger toggles `aria-expanded` correctly.
- Header/nav landmark has correct `aria-label`.
- Tab key navigates through all focusable items in document order.
- Renders correctly in light and dark themes.
- Navigation collapses to a menu button on small viewports.
