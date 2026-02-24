> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Sidebar

## 1. Purpose

- Provides a collapsible side navigation panel with structured menu content.
- Use as the primary navigation container in application layouts.
- Do NOT use for temporary overlays — use Drawer or Sheet instead.

---

## 2. UX Intent

- **Primary interaction goal:** Navigate between sections of an application via a persistent sidebar.
- **Expected user mental model:** A side panel with navigation links that can collapse to icons or hide entirely.
- **UX laws applied:**
  - **Jakob's Law** — follows standard left-sidebar navigation pattern.
  - **Fitts's Law** — full-width menu items are easy to target; rail mode keeps icons accessible.
  - **Hick's Law** — groups with labels organize navigation items into scannable sections.

---

## 3. Anatomy

- **Sidebar** (Root) — Outer container with `role="complementary"` and `aria-label="Sidebar"`.
- **Sidebar.Header** — Top section (logo, branding).
- **Sidebar.Content** — Scrollable main navigation area.
- **Sidebar.Footer** — Bottom section (user info, settings).
- **Sidebar.Group** — Logical grouping of menu items.
- **Sidebar.GroupLabel** — Heading for a group (`<h3>` via `styledHtml`).
- **Sidebar.GroupContent** — Container for items within a group.
- **Sidebar.Menu** — Navigation list with `role="menu"`.
- **Sidebar.MenuItem** — Individual navigation item with `role="menuitem"`.
- **Sidebar.MenuButton** — Variant of MenuItem for button actions.
- **Sidebar.Separator** — Visual divider.
- **Sidebar.Trigger** — Toggle button for collapsing/expanding.
- **Sidebar.Rail** — Narrow hover-trigger strip for collapsed sidebar.

> **TypeScript is the source of truth for props.** See `SidebarProps` in `Sidebar.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Expanded** — Full-width sidebar showing labels and icons.
- **Collapsed (icon mode)** — Narrow sidebar showing only icons (when `collapsible="icon"`).
- **Collapsed (offcanvas)** — Sidebar hidden off-screen (when `collapsible="offcanvas"`).
- **Hover** — Menu items show hover background.
- **Active** — Current page's menu item highlighted via `aria-current`.

### Keyboard Interaction

- **Tab** — Moves focus through interactive elements (trigger, menu items).
- **Enter/Space** — Activates menu items and trigger button.
- Trigger button has `aria-expanded` and `aria-label`.

### Motion

- Width transition animation on collapse/expand.
- Should respect `prefers-reduced-motion`.

---

## 5. Accessibility

- **Semantic element:** Root renders `role="complementary"` with `aria-label="Sidebar"`. GroupLabel renders `<h3>`.
- **ARIA attributes:** `role="menu"` on Menu; `role="menuitem"` on MenuItem; `aria-disabled` on disabled items; `aria-current` on active item; `aria-expanded` and `aria-label` on Trigger.
- **Focus management:** Standard tab order. Trigger toggle does not steal focus.
- **Screen reader announcements:** Sidebar landmark, menu structure, and expanded/collapsed state announced.

---

## 6. Styling

- **Design tokens used:** `$background` for sidebar background; `$borderColor` for border; `$backgroundHover` for item hover; `$color` for text. Width defaults to 256px expanded, 48px collapsed. Variant `floating` adds shadow and margin.
- **Responsive behavior:** `collapsible` modes control responsive collapse behavior. `side` prop controls left/right placement.
- **Dark mode:** Token-based; resolves automatically.

---

## 7. Composition

- **What can contain this component:** Application root layout, typically alongside a main content area.
- **What this component can contain:** Header, Content, Footer as direct children. Content contains Groups, Menus, and Separators.
- **Anti-patterns:** Do not nest Sidebars. Do not use MenuItem for non-navigation actions (use MenuButton instead).

---

## 8. Breaking Change Criteria

- Removing any sub-component.
- Removing `collapsible`, `side`, `variant`, `open`, or `onOpenChange` props.
- Changing the ARIA roles (complementary, menu, menuitem).
- Removing the collapse animation.
- Changing the default width values.

---

## 9. Test Requirements

- **Behavioral tests:** Trigger toggles collapsed state; `onOpenChange` fires; variant changes styling; side placement works; disabled items not activatable.
- **Accessibility tests:** `role="complementary"` on root; `role="menu"` / `role="menuitem"` structure; `aria-expanded` on trigger; `aria-current` on active item.
- **Visual regression:** Expanded, collapsed (icon), collapsed (offcanvas), floating variant, left/right side.
