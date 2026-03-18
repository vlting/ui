# Component Spec — Breadcrumb

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Navigation trail showing the user's position within a site hierarchy.
- Use for multi-level page hierarchies where users need to navigate back to ancestor pages.
- Do NOT use for step-by-step wizards (use Stepper). Do NOT use for fewer than 2 levels.

---

## 2. UX Intent

- **Jakob's Law** — breadcrumbs are a universally understood web navigation pattern.
- **Tesler's Law** — reduces navigation complexity by showing the full path and allowing direct jumps.
- **WAI-ARIA pattern:** [Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

---

## 3. Anatomy

Compound component using semantic HTML elements:
- `Breadcrumb` (Root) — renders `<nav aria-label="Breadcrumb">`.
- `Breadcrumb.Item` — renders `<li>` within the ordered list.
- `Breadcrumb.Link` — renders `<a>` for navigable ancestors. Props: `href`, `onPress`.
- `Breadcrumb.Page` — renders `<span aria-current="page">` for the current page.
- `Breadcrumb.Separator` — renders `<li role="presentation">` with separator character (default: "/").

Full structure: `<nav> → <ol> → <li>(<a>|<span>) + <li role="presentation">(separator)`.

> **TypeScript is the source of truth for props.** See source files in `Breadcrumb/` for the full typed API.

---

## 4. Behavior

### States

- **Link** — standard anchor behavior (hover, focus).
- **Current page** — non-interactive, visually distinct.

### Keyboard Interaction

- **Tab** — moves focus between breadcrumb links (native anchor focus).
- Links have visible focus indicators (injected CSS).

### Motion

None.

---

## 5. Accessibility

- **Semantic elements:** Native `<nav>`, `<ol>`, `<li>`, `<a>`, `<span>`.
- **ARIA attributes:** `aria-label="Breadcrumb"` on nav, `aria-current="page"` on current page, `role="presentation"` on separator list items.
- **Focus management:** Standard tab navigation through links.
- **Screen reader announcements:** Reads as a navigation landmark with ordered list structure.

---

## 6. Styling

- **Design tokens used:** `$color` for links, `$colorMuted` for current page and separator. Focus outline injected via CSS.
- **Dark mode:** Token resolution handles automatically.

---

## 7. Composition

- **What can contain this component:** Page headers, content area tops, navigation bars.
- **What this component can contain:** Item children containing either Link or Page, with Separator between items.
- **Anti-patterns:** Do not omit `aria-current="page"` on the current page. Do not use more than ~5 levels (consider truncation).

---

## 8. Breaking Change Criteria

- Removing sub-components (Item, Link, Page, Separator).
- Removing semantic HTML elements (`<nav>`, `<ol>`, `<li>`).
- Removing `aria-current="page"` from Page.
- Removing `aria-label` from nav.

---

## 9. Test Requirements

- **Behavioral tests:** Verify `<nav>` with `<ol>` structure renders. Verify links are clickable. Verify separators render between items. Verify `onPress` callback fires.
- **Accessibility tests:** Verify `aria-label="Breadcrumb"` on nav. Verify `aria-current="page"` on current page. Verify `role="presentation"` on separators. Verify tab navigation through links.
