# Navigation Playbook

## 1. Problem Space

Navigation patterns apply to every module in `vlt-ui`. This playbook covers how users move between sections, how the overall application shell is structured, and how context-switching (organization, role, module) is handled. Key modules that drive navigation complexity: `organization` (org switching), `layout` (all nav primitives), `productivity` (calendar/notes sidebar), and any multi-section product (CRM, ERP, project-management, analytics).

---

## 2. UX Laws Applied

- **Jakob's Law** — Use familiar navigation conventions: top nav for global actions, sidebar for section nav, tabs for same-level alternatives, breadcrumbs for hierarchy.
- **Hick's Law** — Limit top-level navigation items to 5–7. Group related destinations. Avoid mega-menus.
- **Miller's Law** — Sidebar sections should not exceed 7 items before grouping or collapsing.
- **Fitts's Law** — Navigation targets (menu items, tabs) must be large enough for easy clicking/tapping. Bottom tabs on mobile must meet minimum 44px touch targets.
- **Gestalt Proximity** — Group related navigation items. Separate primary navigation from secondary/utility navigation (e.g., settings, profile).
- **Peak-End Rule** — Navigation failures (broken links, lost state on back) are strongly remembered. Ensure navigating back preserves scroll and filter state within a session.

---

## 3. Standard Layout Pattern

### Page Structure (Desktop)
```
<AppShell
  topNav={<TopNav />}
  sidebar={<Sidebar />}
>
  <PageHeader title="..." breadcrumbs={<Breadcrumbs />} />
  <Section>
    {/* page content */}
  </Section>
</AppShell>
```

### Page Structure (Mobile)
```
<AppShell
  topNav={<TopNav />}
  bottomTabs={<BottomTabs />}
>
  <PageHeader title="..." />
  <Section>
    {/* page content */}
  </Section>
</AppShell>
```

### Header Pattern
- `TopNav` contains: logo/brand, global search (via `CommandPalette` trigger), user avatar, notifications.
- `TopNav` does NOT contain section-level navigation items — those belong in `Sidebar`.
- `OrgSwitcher` belongs in `Sidebar` header or `TopNav` left area for multi-org products.

### Filters
- Navigation does not itself contain filters.
- Page-level filters (`AnalyticsFilterBar`, `DateRangeSelector`) live within the page content area, below `PageHeader`.

### Primary CTA
- Global actions (e.g., "New Record", "Create Project") may live in `TopNav` right slot or in the `PageHeader` actions slot.
- Never place primary content CTAs inside `Sidebar`.

### Secondary CTA
- Settings, help, and profile links belong in the `Sidebar` footer or `TopNav` right slot.
- `CommandPalette` acts as a power-user navigation accelerator — always keyboard-accessible via `Cmd+K`.

---

## 4. Component Mapping

| Need | Component |
|------|-----------|
| Global app shell | `AppShell` |
| Top-of-screen navigation bar | `TopNav` |
| Vertical section navigation | `Sidebar` |
| Mobile bottom navigation | `BottomTabs` |
| Hierarchical location indicator | `Breadcrumbs` |
| Same-level section tabs | `Tabs` |
| Power-user command navigation | `CommandPalette` |
| Slide-in panel navigation | `Drawer` |
| Expandable section groups | `Accordion` |
| Modal overlay navigation | `Dialog` (primitives) |
| Bottom sheet navigation | `Sheet` (primitives) |
| Multi-organization switching | `OrgSwitcher` |
| Organization avatar/identity | `OrgAvatar` |
| Split-pane view navigation | `SplitView` |
| Resizable panel layout | `ResizablePanel` |

---

## 5. Accessibility Rules

- `TopNav` must have `role="banner"` and a skip-to-content link as its first child.
- `Sidebar` must use `role="navigation"` with an `aria-label` (e.g., "Main navigation").
- `BottomTabs` must use `role="tablist"` with each tab as `role="tab"` and `aria-selected`.
- `Tabs` must follow ARIA Tabs pattern: `role="tablist"`, `role="tab"`, `role="tabpanel"`, with keyboard navigation (arrow keys between tabs, Enter/Space to activate).
- `Breadcrumbs` must use `<nav aria-label="Breadcrumb">` with `aria-current="page"` on the last item.
- `CommandPalette` must trap focus when open and restore focus to the trigger when closed.
- `Drawer` must trap focus when open and have a visible close control.
- `OrgSwitcher` must announce the currently selected org via `aria-label` or `aria-current`.
- All navigation items must be reachable by keyboard (Tab/Shift+Tab) and activatable by Enter/Space.
- Active navigation state must not be communicated by color alone (use `aria-current="page"` and a visual indicator like a border or icon).

---

## 6. Anti-Patterns

- **Sidebar as primary content area** — The `Sidebar` is for navigation only. Do not embed forms, data tables, or charts directly in the sidebar.
- **Bottom tabs on desktop** — `BottomTabs` is a mobile-only pattern. Never render it on wide screens.
- **Tabs for different content types** — `Tabs` are for switching between views of the same content type (e.g., "Details" vs "Activity"). Do not use tabs to navigate between unrelated sections.
- **More than 7 top-level nav items** — Group excess items into sub-menus or sections using `Accordion` within `Sidebar`.
- **Breadcrumbs on top-level pages** — Only show `Breadcrumbs` when the user is 2+ levels deep in a hierarchy. Home-level pages do not need breadcrumbs.
- **`Drawer` instead of `Sidebar`** — Do not use `Drawer` as a permanent navigation element. `Drawer` is for transient overlays (mobile sidebar equivalent, contextual panels). Permanent navigation uses `Sidebar`.
- **Unlabeled icon-only navigation** — Icon-only navigation items (collapsed sidebar) must have `title` attributes and `aria-label`s. Always show labels on first use.
- **`CommandPalette` without keyboard shortcut** — The command palette is useless if users don't know it exists. Always bind `Cmd+K` and mention it in the UI.

---

## 7. Variants

### Density Increase
- `Sidebar` in collapsed/icon-only mode for dense desktop layouts.
- `Accordion` sections within `Sidebar` for products with many sub-sections.
- `ResizablePanel` for advanced users who want to control sidebar width.

### Mobile Behavior
- `Sidebar` is replaced by `BottomTabs` (4–5 primary sections) on mobile.
- Secondary sections accessible via a "More" tab that opens a `Sheet`.
- `TopNav` on mobile: logo + hamburger (opens full-screen `Drawer` for navigation).
- `Breadcrumbs` collapse to show only the immediate parent on mobile (not the full path).
- `CommandPalette` on mobile: accessible via a search icon in `TopNav`, not keyboard shortcut.

### Edge Cases
- **Single-module products**: Omit `Sidebar`; use `Tabs` or `TopNav` items directly.
- **Unauthenticated pages**: Simplified `TopNav` with no sidebar; show login/signup CTAs.
- **Org switching mid-session**: `OrgSwitcher` selection must trigger a full context reset — navigate to the new org's home, clear cached data, update all nav labels.
- **Deep nesting**: If content is 4+ levels deep, reconsider the information architecture. The UI should not support 4-level breadcrumbs as a standard pattern.
