# Component Spec — Section

## 1. Purpose

Provides a semantic grouping container for a cohesive block of related page content, such as a form section, a content region, or a thematic group within a longer page. It establishes consistent vertical rhythm and optional labelling between grouped elements.

Use when: a page contains multiple distinct content blocks that benefit from visual and semantic separation.

Do NOT use when: a simple spacer or divider is sufficient, or when the content group has no meaningful semantic distinction from surrounding content.

---

## 2. UX Intent

- Primary interaction goal: guide the user's eye through a page by chunking related content into clearly delineated regions.
- Expected user mental model: a labeled chapter or section of a document — each section has a clear beginning and identity.
- UX laws applied:
  - Gestalt (proximity): content within a Section is perceived as related.
  - Gestalt (common region): the Section boundary creates a distinct visual group.
  - Miller's Law: breaking long pages into Sections reduces cognitive load by chunking information.

---

## 3. Visual Behavior

- Renders as a full-width vertical stack container.
- Consistent vertical padding (space tokens) separates the Section from adjacent sections.
- An optional section heading or label is rendered at the top of the Section using a heading typography token.
- An optional divider may separate sections, using a border color token.
- The Section background is transparent by default; a surface background token may be applied for elevated or card-style sections.
- The Section does not constrain the width of its children — that is the responsibility of the page layout or grid.
- Responsive: padding scales with breakpoints using responsive space tokens; layout within the section is dictated by children.

---

## 4. Interaction Behavior

- Purely presentational — no interactive behavior by default.
- If an optional heading is collapsible (accordion pattern), that behavior is driven by a sub-component or prop, not baked into Section itself.
- Keyboard behavior: no special keyboard handling; Tab moves through focusable children in document order.
- Screen reader behavior: if a heading is present, it establishes a landmark and creates a navigable section for screen reader users.
- Motion: no animation on the Section frame itself.

---

## 5. Accessibility Requirements

- If a visible heading is provided, it must render as a semantic heading element at an appropriate heading level (`h2`–`h6` depending on page hierarchy).
- If no visible heading is provided but the Section groups meaningful content, `aria-label` or `aria-labelledby` should be applied to give the region a name.
- The Section may carry `role="region"` when it contains a named, meaningful content block.
- Color contrast of any Section-level text (heading, label) must meet WCAG AA.
- Do not rely on the Section boundary color alone to communicate grouping — semantic structure is required.

---

## 6. Theming Rules

- Required tokens: space tokens for vertical padding, border color token for optional divider, optional surface background token, typography token for section heading.
- Prohibited: no hardcoded colors, pixel padding values, or raw font-size values.
- Dark mode: background, border, and text tokens must resolve correctly in dark themes without consumer overrides.

---

## 7. Composition Rules

- Section accepts any child layout or content components.
- Sections are stacked vertically within a page layout; they are siblings, not nested (avoid deep Section nesting).
- May contain forms, cards, tables, text blocks, or any other layout primitives.
- Anti-patterns:
  - Do not nest Section inside Section for styling purposes — use padding/spacing adjustments instead.
  - Do not use Section as a navigational container — use Sidebar or TopNav.
  - Do not omit semantic structure (heading or aria-label) when the Section contains a distinct content group.

---

## 8. Performance Constraints

- Stateless presentational wrapper — no memoization required by the component.
- The Section shell imposes no additional render cost beyond its children.
- No virtualization applicable.

---

## 9. Test Requirements

- Renders children correctly within the Section container.
- Renders a heading element at the correct semantic level when a heading prop/child is provided.
- Does not render a heading element when none is provided.
- Applies correct space token padding in both compact and comfortable density variants (if supported).
- Divider is present when enabled and absent when disabled.
- Section heading is announced as a heading by screen readers.
- `role="region"` and `aria-label` are applied when a named section is required.
- Renders correctly in light and dark themes.
