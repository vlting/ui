# Component Spec — Accordion

## 1. Purpose

Presents a vertically stacked set of disclosure panels, each with a header that toggles the visibility of its content section. Used to manage vertical space on content-heavy pages, FAQs, settings panels, and navigation menus where only a subset of content needs to be visible at a time.

Do NOT use this component for tabbed content (use a Tabs component), for a single collapsible section (use a Collapsible/Disclosure primitive), or for navigational tree structures (use a Tree or nested navigation component).

---

## 2. UX Intent

- Primary interaction goal: allow users to reveal and hide sections of content on demand, keeping the page organized and reducing visual noise.
- Expected user mental model: a stack of labeled "drawers" — clicking a header opens or closes that drawer's content, similar to native mobile expandable lists or FAQ accordions seen across the web.
- UX laws applied:
  - Hick's Law: showing only headers by default reduces the number of choices visible at once, guiding users to what they need.
  - Jakob's Law: chevron or plus/minus icons on headers match universal accordion conventions.
  - Fitts's Law: headers must be full-width touch targets with adequate height for comfortable tapping.
  - Gestalt (Continuity): the vertical stacking of items reads as a cohesive ordered list.
  - Progressive Disclosure: content hidden behind headers prevents overwhelming users with all information at once.

---

## 3. Visual Behavior

- Layout: a vertical list of accordion items. Each item consists of a full-width header row (trigger) and a collapsible content panel below it. Items are separated by dividers using border color tokens.
- Spacing: header padding (vertical and horizontal) uses space tokens. Content panel padding uses space tokens.
- Typography: header label uses a medium-weight body or subheading scale token. Content uses the default body text scale token.
- Token usage: header background, header text, content background, divider border, chevron icon color, hover background, focused ring color, and active/open header background must all use design tokens.
- Responsive behavior: the accordion spans the full width of its container at all breakpoints. Content panels grow to fit their content height naturally.

---

## 4. Interaction Behavior

- States:
  - Closed: content panel is hidden; chevron points downward (or in the open direction).
  - Open: content panel is visible; chevron rotates to indicate open state.
  - Hover (header): header background changes to hover token color.
  - Focus (header): visible focus ring on the header.
  - Disabled (item): header is non-interactive; reduced opacity applied to the item.
- Controlled vs uncontrolled: supports both patterns. In controlled mode, the parent manages which items are open via a value prop and onChange callback. In uncontrolled mode, the component manages open state internally. Supports single-open (exclusive) and multi-open modes as a configuration prop.
- Keyboard behavior:
  - Tab navigates to each accordion header in document order.
  - Enter or Space toggles the focused header's open/closed state.
  - Arrow Down/Up moves focus to the next/previous header within the accordion (without opening/closing).
  - Home/End move focus to the first/last header.
- Screen reader behavior:
  - Each header is a button with `aria-expanded` reflecting open/closed state.
  - The content panel is associated with its header button via `aria-controls` and has `id` matching the header's `aria-controls` value.
  - Content panel has `role="region"` and `aria-labelledby` pointing to its header.
- Motion rules: content panel opens and closes with a short height transition token. Chevron rotates with the same duration. Both are suppressed under reduced motion; panels show/hide immediately.

---

## 5. Accessibility Requirements

- ARIA: header buttons use `aria-expanded`. Content regions use `role="region"` with `aria-labelledby`. Disabled items use `aria-disabled="true"` on the header button.
- Focus rules: focus is always visible on the active header. Opening a panel does not move focus into the content automatically; the user navigates there with Tab.
- Contrast: header text, chevron icons, and content text must meet WCAG AA contrast against their respective backgrounds using design tokens.
- Reduced motion: suppress height animation and chevron rotation; apply open/close state instantaneously.

---

## 6. Theming Rules

- Required tokens: header background, header text, open header background (if distinct), hover background, focus ring color, divider border color, content background, content text, chevron icon color, disabled opacity, space tokens, radius token (for the outer container corners).
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; dividers and header/content backgrounds must remain visually distinct against dark page backgrounds.

---

## 7. Composition Rules

- What can wrap it: page content sections, sidebar panels, settings layouts, modal bodies. Must be a descendant of the design system Provider.
- What it may contain: individual accordion items, each with a header (trigger) and a content panel. Content panels may contain any valid content: text, lists, forms, media, or nested components.
- Anti-patterns:
  - Do not nest an Accordion inside an Accordion item's content unless there is a clear, justified information architecture reason — deeply nested accordions create significant cognitive complexity.
  - Do not use this for tab-like switching where only one panel's content is ever relevant (use Tabs instead).
  - Do not place critical content that must always be visible inside a collapsible panel.

---

## 8. Performance Constraints

- Memoization: individual accordion item headers and content panels should be memoized to prevent full-list re-renders when one item's open state changes.
- Virtualization: not applicable for typical accordion usage (low item count). If used with very large item counts (50+), consider a virtualized variant.
- Render boundaries: closed panel content should be unmounted by default to avoid unnecessary rendering. An option to keep content mounted (for preserving form state within panels) must be explicitly opt-in via a `keepMounted` or equivalent prop.

---

## 9. Test Requirements

- Rendering: renders with all items closed, one item open, and multiple items open (if multi-open mode is enabled).
- Toggle behavior: clicking a header opens a closed panel and closes an open panel.
- Single-open mode: opening one item closes the previously open item.
- Multi-open mode: multiple items can be open simultaneously.
- Controlled mode: open state is driven by parent value and onChange; no internal drift.
- Disabled item: disabled header is non-interactive.
- Keyboard navigation: Tab, Enter/Space, Arrow Up/Down, Home/End behave as specified.
- Accessibility: aria-expanded reflects state; role="region" and aria-labelledby on content panels; aria-controls on headers.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: no animation on open/close when motion is reduced.
