# Component Spec — Breadcrumbs

## 1. Purpose

Displays a hierarchical path of links representing the user's current location within the application's navigation structure. Used on pages that are more than one level deep in a content hierarchy to help users understand where they are and navigate to parent sections.

Do NOT use this component on top-level or root-level pages (where the breadcrumb would have only one item), for representing progress through a wizard (use a step indicator), or for primary navigation (use Sidebar or BottomTabs).

---

## 2. UX Intent

- Primary interaction goal: allow users to understand their current location in the site hierarchy and navigate upward with a single click/tap to any ancestor level.
- Expected user mental model: a left-to-right trail of linked labels separated by dividers (e.g., "/", ">", or a chevron), with the current page as the last non-linked item.
- UX laws applied:
  - Jakob's Law: breadcrumb appearance (horizontal, left-to-right, separator between items, last item non-linked) matches universal web conventions.
  - Gestalt (Continuity): the separator characters reinforce the directional path reading.
  - Fitts's Law: each breadcrumb link must have sufficient padding for comfortable tapping on mobile.
  - Hick's Law: breadcrumb depth should not exceed approximately five levels; deeper hierarchies should be truncated with an ellipsis item.

---

## 3. Visual Behavior

- Layout: a horizontal row of breadcrumb items and separators. The last item (current page) is rendered as plain text, not a link. Items flow inline with wrapping permitted on very narrow screens.
- Spacing: gap between items (including separators) uses space tokens. No vertical padding on the row itself unless consumed within a container that provides it.
- Typography: breadcrumb link labels and the current page label use a small body or caption scale token. The current page may use a slightly bolder weight or distinct color token to indicate it is the active location.
- Token usage: link text color, link hover color, separator color, current page text color, and focus ring color must all use design tokens.
- Responsive behavior: on very narrow screens, deeply nested breadcrumbs truncate middle items behind an expandable ellipsis control. The first item (root) and the last item (current) are always visible.

---

## 4. Interaction Behavior

- States:
  - Default: all ancestor items are links; the current page item is plain text.
  - Hover (link): link text changes to hover token color; underline may appear.
  - Focus (link): visible focus ring around the link.
  - Active/Pressed (link): brief active token feedback.
  - Truncated: an ellipsis "..." item appears between the root and the current page; clicking/pressing the ellipsis expands the hidden items.
  - Expanded (from truncated): all hidden items become visible inline.
- Controlled vs uncontrolled: the breadcrumb items are purely driven by the `items` prop (an ordered array of label + href pairs). The truncated/expanded state of the ellipsis may be internally managed or controlled by the parent.
- Keyboard behavior:
  - Tab navigates through each breadcrumb link in document order.
  - Enter or Space activates the focused link.
  - If an ellipsis item is present, it is focusable and activated by Enter/Space to expand hidden items.
- Screen reader behavior:
  - The breadcrumb is wrapped in a `<nav>` landmark with `aria-label="Breadcrumb"`.
  - The list of items uses an ordered list (`<ol>`).
  - The current page item has `aria-current="page"`.
  - The ellipsis item (if present) is a button with an accessible label such as "Show hidden breadcrumb items."
- Motion rules: no animation required for standard breadcrumb rendering. Ellipsis expansion may use a very brief fade token animation suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA: the container is a `<nav>` with `aria-label="Breadcrumb"`. Items are in an `<ol>`. The active/current item has `aria-current="page"`. Links use standard anchor semantics.
- Focus rules: focus is visible on every interactive link and the ellipsis button. Tab order follows the left-to-right item order.
- Contrast: link text and current page text must meet WCAG AA contrast against the page/container background using design tokens.
- Reduced motion: suppress ellipsis expansion animation; expand items immediately.

---

## 6. Theming Rules

- Required tokens: link text color, link hover color, link active color, current page text color, separator color, focus ring color, space tokens (item gap, link padding).
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: link colors and separator colors must resolve correctly in dark mode and remain legible against dark page backgrounds.

---

## 7. Composition Rules

- What can wrap it: page headers, content area tops, admin page layouts, detail page headers. Must be a descendant of the design system Provider. Placed above the page title.
- What it may contain: breadcrumb link items (label + href), a separator element between items (rendered automatically), the current page text item, and an optional ellipsis item for truncated hierarchies.
- Anti-patterns:
  - Do not use breadcrumbs on root-level pages.
  - Do not use breadcrumbs for wizard step tracking — use a step indicator for linear progressions.
  - Do not embed navigation logic inside the component — use standard href links or an onItemPress callback.

---

## 8. Performance Constraints

- Memoization: the component should be memoized; it re-renders only when the items array reference changes.
- Virtualization: not applicable; breadcrumb depth is always low (maximum approximately five to eight items).
- Render boundaries: no lazy rendering needed; the breadcrumb is always immediately visible and lightweight.

---

## 9. Test Requirements

- Rendering: renders correctly with two items (root + current), three or more items, and a truncated hierarchy.
- Link activation: clicking/pressing ancestor items fires the correct navigation callback or follows the href.
- Current page: the last item is not a link; it has aria-current="page."
- Ellipsis: truncated breadcrumbs show the ellipsis; activating it expands all hidden items.
- Keyboard navigation: Tab through items; Enter/Space on links and ellipsis button behave correctly.
- Accessibility: nav landmark with aria-label, ordered list, aria-current on current page item.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: ellipsis expansion is immediate when motion is reduced.
