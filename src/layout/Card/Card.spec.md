# Component Spec — Card

## 1. Purpose

Provides a surface container that groups related content and actions into a visually distinct, bounded region. Used to present individual items, summary data, or actionable units in grids, lists, and dashboards where visual separation of content chunks aids scannability.

Do NOT use this component as a full-page layout container (use AppShell or page-level layout primitives), for modal/dialog surfaces (use a Dialog), or as a navigation chrome element (use Sidebar or Header primitives).

---

## 2. UX Intent

- Primary interaction goal: organize and visually isolate a discrete unit of content so users can scan multiple cards in a collection and identify relevant information quickly.
- Expected user mental model: a physical card or tile — a bounded white (or themed) surface with optional shadow, containing a title, body content, and optional actions.
- UX laws applied:
  - Gestalt (Figure-Ground): the card's background and shadow create clear separation from the page background, making the card's content stand out as a distinct object.
  - Gestalt (Proximity): content within the card is perceived as related because it shares the same bounded container.
  - Jakob's Law: card layout with Header-Content-Footer sections matches the universal pattern established across all major design systems.
  - Fitts's Law: if the card is interactive (tappable), the entire card surface acts as the touch target.

---

## 3. Visual Behavior

- Layout: a vertically stacked container with optional `Card.Header` at the top, `Card.Content` in the middle, and `Card.Footer` at the bottom. Each sub-component may be omitted independently.
- Sub-components (compound pattern): `Card.Header`, `Card.Content`, `Card.Footer` are individually composable.
- Spacing: internal padding for each sub-region uses space tokens. Gap between sub-regions may use dividers or space tokens.
- Typography: Card itself carries no typography; content within sub-regions defines its own type scale using design tokens.
- Token usage: card background, border, border-radius, shadow, hover background (interactive variant), focus ring, and sub-region divider colors must all use design tokens.
- Responsive behavior: card fills its container width by default. In a grid context, the parent grid controls card sizing. Card height is content-driven. No internal responsive logic.

---

## 4. Interaction Behavior

- States:
  - Default (non-interactive): purely presentational container.
  - Hoverable/Pressable (if interactive): card surface shows hover shadow or background token change; cursor becomes a pointer.
  - Focused (if interactive): visible focus ring rendered around the card boundary.
  - Active/Pressed (if interactive): brief depression or background token change.
  - Disabled (if interactive): reduced opacity; non-interactive.
  - Loading (skeleton): card frame is visible but sub-regions show skeleton placeholder blocks.
- Controlled vs uncontrolled: the card is a layout primitive with no state of its own. Interactive behavior is provided via press/hover event props. No value or controlled state pattern applies.
- Keyboard behavior: if interactive, the card is a focusable element activated by Enter or Space. Non-interactive cards are not in the Tab order.
- Screen reader behavior: a non-interactive card uses `role="article"` or is a generic container. An interactive card uses `role="button"` or wraps its content in an anchor. Sub-regions are read in document order.
- Motion rules: hover shadow/background transition uses a short duration token suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA: non-interactive cards use `role="article"` when they represent discrete content items. Interactive cards use `role="button"` or anchor semantics with a meaningful accessible label.
- Focus rules: interactive cards are focusable via Tab and activated by Enter/Space. Non-interactive cards are excluded from Tab order.
- Contrast: card background must provide sufficient contrast for content rendered within it; border/shadow must be visible against the page background using design tokens.
- Reduced motion: suppress hover shadow/background transition.

---

## 6. Theming Rules

- Required tokens: card background, card border color, card border-radius, card shadow (resting and hover), hover background (interactive), focus ring color, sub-region divider color, disabled opacity.
- Prohibited hardcoded values: no hardcoded colors, spacing, border-radius values, or shadow definitions.
- Dark mode: card background, shadow, and border must all resolve to appropriate dark-mode token values, maintaining visual separation from the dark page background.

---

## 7. Composition Rules

- What can wrap it: grid containers, list layouts, dashboard panels, feed components. Must be a descendant of the design system Provider.
- What it may contain (compound pattern):
  - `Card.Header` — title, subtitle, leading icon, or action menu trigger.
  - `Card.Content` — primary body content (text, images, data, embedded components).
  - `Card.Footer` — action buttons, metadata, or supplementary links.
- Anti-patterns:
  - Do not nest a Card inside a Card's `Content` for the purpose of sub-grouping — use interior layout primitives instead.
  - Do not use Card as a dialog or overlay surface.
  - Do not embed navigation routing logic inside the card component — delegate via onPress or href.

---

## 8. Performance Constraints

- Memoization: the card and its sub-components should be memoized; re-renders occur only when content props change.
- Virtualization: when rendering many cards in a list or grid (50+), the parent container must virtualize; cards themselves do not implement virtualization.
- Render boundaries: lazy-load images or heavy content within `Card.Content`; the card frame should render immediately.

---

## 9. Test Requirements

- Rendering: renders with all sub-components present; renders with each sub-component individually omitted.
- Sub-component composition: Header, Content, and Footer render independently and in all combinations.
- Interactive variant: card is focusable, shows hover state, and is activated by Enter/Space.
- Non-interactive variant: card is not in the Tab order.
- Disabled variant: reduced opacity; non-interactive.
- Loading/skeleton: skeleton placeholders appear within sub-regions when loading.
- Accessibility: article or button role as appropriate; interactive card has accessible label.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: no hover transition animation when motion is reduced.
