# Component Spec — PageHeader

## 1. Purpose

Provides a consistent top-of-page header region that communicates the current page title, optional breadcrumb or back navigation, and optional page-level actions (such as a primary CTA or menu). It anchors the user's sense of location within the application.

Use when: every primary route or view needs a labelled header that persists at the top of the content area.

Do NOT use when: the view is a modal, drawer, or sheet — use a dedicated header pattern scoped to that overlay instead. Do not use as a navigation bar (use TopNav).

---

## 2. UX Intent

- Primary interaction goal: orient the user immediately upon page load — they should know where they are and what actions are available without scanning.
- Expected user mental model: the title bar of a document or application — a stable, predictable region at the top of content.
- UX laws applied:
  - Jakob's Law: follows the widely established page-header pattern from web applications.
  - Gestalt (figure/ground): the header is visually distinct from the page body beneath it.
  - Tesler's Law: page-level context (title, breadcrumb, actions) is managed here so each page does not need to implement its own layout.

---

## 3. Visual Behavior

- Renders as a full-width horizontal container at the top of a content area.
- Supports a title (primary heading), optional subtitle, optional breadcrumb trail, and optional action slot (right-aligned).
- Title uses a heading typography token (not body text); subtitle uses a secondary/muted token.
- Vertical padding is governed by space tokens; horizontal padding aligns with the page content grid.
- On smaller breakpoints, the action slot may move below the title or collapse into an overflow menu.
- A bottom border or divider may separate the header from the content area, using a border color token.
- Does not scroll with page content by default (sticky behavior is opt-in and controlled by the parent layout).

---

## 4. Interaction Behavior

- Primarily a static display region; action slots may contain interactive elements (buttons, menus).
- No controlled/uncontrolled state — the component is purely presentational.
- Breadcrumb links inside the header are individually focusable and activatable.
- Keyboard behavior: Tab moves through any interactive children (breadcrumb links, action buttons) in document order.
- Screen reader behavior: the title element should be the page's primary `<h1>` equivalent; screen readers announce it as a heading.
- Motion: no animation on the header itself; action button transitions follow their own component specs.

---

## 5. Accessibility Requirements

- The title must render as a heading element with an appropriate level (typically `h1` for top-level pages).
- Breadcrumb region must be wrapped in a `<nav>` with `aria-label="Breadcrumb"`.
- Action slot contents (buttons, menus) must have accessible labels.
- Color contrast for title text must meet WCAG AA (4.5:1).
- Color contrast for subtitle/muted text must meet WCAG AA (4.5:1).
- The component must not rely solely on position or color to convey semantic meaning.

---

## 6. Theming Rules

- Required tokens: background color (page surface or transparent), text color for title, muted text color for subtitle, border color for optional divider, space tokens for padding, typography scale tokens for heading and subtitle.
- Prohibited: no hardcoded hex colors, raw pixel padding, or fixed font sizes.
- Dark mode: all text and background tokens must resolve correctly without consumer-side theme overrides.

---

## 7. Composition Rules

- Accepts children or named slots for: title, subtitle, breadcrumb, and actions.
- May contain Breadcrumb, Button, IconButton, or Menu components in the actions slot.
- Should appear once per page — never stacked or nested.
- Anti-patterns:
  - Do not use PageHeader inside a Drawer, Modal, or Sheet — those containers have their own header patterns.
  - Do not place body content or data tables inside the PageHeader.
  - Do not duplicate the page title in both PageHeader and the document `<title>` with mismatched text.

---

## 8. Performance Constraints

- Stateless and purely presentational — no memoization required by the component itself.
- Action slot contents are the responsibility of the consumer; heavy components in that slot (e.g., async dropdowns) should be deferred by the consumer.
- No virtualization applicable.

---

## 9. Test Requirements

- Renders the title text correctly.
- Renders the subtitle text when provided.
- Does not render the subtitle slot when omitted.
- Renders breadcrumb content when provided.
- Renders action slot content when provided.
- Title is announced as a heading by screen readers.
- Breadcrumb nav has correct `aria-label`.
- All tokens applied correctly in both light and dark themes.
- Does not throw when optional slots are omitted.
