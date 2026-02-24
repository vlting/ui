> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Typography

## 1. Purpose

- Provides a set of semantic text components for consistent typography across the application.
- Use for headings, paragraphs, lead text, small text, blockquotes, inline code, and lists.
- Do NOT use for single-purpose heading needs — use the Heading primitive. Do NOT use for plain body text — use the Text primitive.

---

## 2. UX Intent

- **Primary interaction goal:** Present text content with appropriate visual hierarchy and semantic meaning.
- **Expected user mental model:** A toolkit of text elements that look correct and render the right HTML.
- **UX laws applied:**
  - **Gestalt Hierarchy** — heading sizes create clear visual hierarchy (H1 > H2 > H3 > H4).
  - **Miller's Law** — Lead and Muted variants help chunk content into primary and secondary information.
  - **Jakob's Law** — standard typographic conventions (blockquote styling, code highlighting, list indentation).

---

## 3. Anatomy

All sub-components use `styledHtml()` to render native HTML elements:

- **Typography.H1** — `<h1>` heading.
- **Typography.H2** — `<h2>` heading.
- **Typography.H3** — `<h3>` heading.
- **Typography.H4** — `<h4>` heading.
- **Typography.P** — `<p>` paragraph.
- **Typography.Lead** — `<p>` with larger, muted styling for introductory text.
- **Typography.Large** — `<div>` with large, semi-bold text.
- **Typography.Small** — `<small>` element.
- **Typography.Muted** — `<p>` with muted color for secondary text.
- **Typography.Blockquote** — `<blockquote>` with left border.
- **Typography.InlineCode** — `<code>` with background highlight and monospace font.
- **Typography.List** — `<ul>` with standard list styling.
- **Typography.ListItem** — `<li>` list item.

> **TypeScript is the source of truth for props.** See the exported types in `Typography.tsx` for the full typed API.

---

## 4. Behavior

### States

- All components are non-interactive; no hover, focus, or active states.

### Keyboard Interaction

- None. These are presentational text elements.

### Motion

- No animations.

---

## 5. Accessibility

- **Semantic elements:** Each component renders the correct HTML element for its purpose (`<h1>`–`<h4>`, `<p>`, `<small>`, `<blockquote>`, `<code>`, `<ul>`, `<li>`).
- **ARIA attributes:** None required — native HTML semantics are sufficient.
- **Focus management:** Not applicable.
- **Screen reader announcements:** Heading levels, blockquote, list structure all communicated via native HTML semantics.
- **Important:** Uses `styledHtml()` to guarantee correct HTML element rendering (not Tamagui `styled()` with `tag`).

---

## 6. Styling

- **Design tokens used:** Headings use `$heading` font family with decreasing sizes (H1 `$10`/`$9` responsive, H2 `$8`, H3 `$6`, H4 `$5`). Body text uses `$body` font family with `$4` default size. Colors: `$color` for primary text, `$colorSubtitle` for Muted/Lead. Blockquote uses `$borderColor` left border. InlineCode uses `$gray4` background.
- **Responsive behavior:** H1 uses media queries for responsive font size. Other components have fixed sizes.
- **Dark mode:** Token-based; resolves automatically.
- **Note:** All components use `margin: 0` — consumers control spacing via layout.

---

## 7. Composition

- **What can contain this component:** Any content layout — pages, cards, articles, documentation.
- **What this component can contain:** Text content and inline elements. List contains ListItem children.
- **Anti-patterns:** Do not skip heading levels (H1 → H3). Do not use Lead inside a heading. Do not use Muted for error messages (too low contrast).

---

## 8. Breaking Change Criteria

- Removing any sub-component.
- Changing the rendered HTML element of any sub-component.
- Removing the `styledHtml()` base (would break semantic HTML).
- Changing font family tokens (`$heading`, `$body`).
- Changing the heading size scale.

---

## 9. Test Requirements

- **Behavioral tests:** Each component renders the correct HTML element; props passed through to native elements.
- **Accessibility tests:** Heading hierarchy correct; semantic elements verified (h1-h4, p, blockquote, code, ul, li, small).
- **Visual regression:** All components rendered together showing hierarchy; blockquote with border; inline code with background; list with bullets.
