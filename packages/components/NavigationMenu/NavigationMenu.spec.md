# Component Spec — NavigationMenu

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Site-level navigation with dropdown content panels for link groups.
- Use for primary site navigation with categorized link sections.
- Do NOT use for application-level action menus (use Menubar). Do NOT use for simple link lists (use a `<nav>` with links).

---

## 2. UX Intent

- **Hick's Law** — organizes many navigation links into categorized groups behind triggers.
- **Jakob's Law** — mega-menu navigation is a well-established pattern for content-heavy sites.
- **WAI-ARIA pattern:** [Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

---

## 3. Anatomy

Compound component with custom implementation:
- `NavigationMenu` (Root) — `role="navigation"`, `aria-label="Main"`. Backdrop for click-outside.
- `NavigationMenu.List` — flex row of nav items.
- `NavigationMenu.Item` — wrapper providing item context.
- `NavigationMenu.Trigger` — button with chevron indicator. `role="button"`, `aria-expanded`.
- `NavigationMenu.Content` — dropdown panel for links (absolute positioned, min-width 400px).
- `NavigationMenu.Link` — navigation link. `role="link"`. Props: `href`, `active`, `onSelect`.
- `NavigationMenu.Indicator` — decorative underline accent.
- `NavigationMenu.Viewport` — optional viewport container.

> **TypeScript is the source of truth for props.** See source files in `NavigationMenu/` for the full typed API.

---

## 4. Behavior

### States

- **Idle** — all content panels closed.
- **Open** — one item's content panel visible.
- **Active link** — current page link visually highlighted.

### Keyboard Interaction

- Click to open/close content panels.
- Click-outside closes.
- **List**: ArrowLeft / ArrowRight moves focus between triggers (loops). Home / End jumps to first / last trigger.
- **Trigger**: Enter / Space / ArrowDown opens dropdown.
- **Content**: ArrowDown / ArrowUp moves focus between links (loops). Home / End jumps to first / last link.
- **Escape**: Closes open submenu and returns focus to trigger.
- **Tab**: Closes content and returns focus to trigger.

### Motion

None.

---

## 5. Accessibility

- **Semantic elements:** `role="navigation"` on root with `aria-label="Main"`.
- **ARIA attributes:** `role="button"`, `aria-expanded` on triggers. `role="link"` on links.
- **Focus management:** Triggers are focusable via tabIndex. Arrow keys navigate between triggers and within content. Escape closes and returns focus to trigger. Click-outside closes via backdrop.

---

## 6. Styling

- **Design tokens used:** `$background`, `$borderColor`, `$color2` (hover/active), `$color10` (indicator), `$color`, `$colorSubtitle`. `$3` trigger radius, `$5` content radius. 36px item height.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Site headers, page tops.
- **What this component can contain:** List, Item, Trigger, Content, Link, Indicator, Viewport sub-components.
- **Anti-patterns:** Do not use for actions (use Menubar). Do not put non-link content in Content panels. Do not use without `aria-label` on root.

---

## 8. Breaking Change Criteria

- Removing `role="navigation"`.
- Removing sub-components.
- Removing `active` prop on Link.
- Changing click-outside behavior.

---

## 9. Test Requirements

- **Behavioral tests:** Verify click opens content panel. Verify click-outside closes. Verify `active` link styling. Verify chevron indicator toggles. Verify `onSelect` fires on link click.
- **Accessibility tests:** Verify `role="navigation"` with `aria-label`. Verify `aria-expanded` on triggers. Verify `role="link"` on links.
