# Component Spec — Heading

## 1. Purpose

- Provides a typographic heading primitive with a consistent type scale mapped to design tokens.
- Should be used for all section headings, page titles, and content hierarchy labels.
- Should NOT be used for body text, captions, or inline emphasis (use Text instead).
- Should NOT be used purely for visual sizing without heading semantics; the component renders a native `<h1>`–`<h6>` element based on the `level` prop.

---

## 2. UX Intent

- Primary interaction goal: establish a clear visual hierarchy that guides the user through content structure.
- Expected user mental model: headings function like HTML `h1`-`h6` elements, communicating relative importance via size and weight.
- **Miller's Law (2.5):** Headings break content into scannable chunks, reducing cognitive load and helping users hold fewer items in working memory at once.
- **Gestalt Principles (2.4):** Larger, bolder headings signal visual prominence and group the content beneath them via the principle of common fate and proximity.
- **Jakob's Law (2.1):** Users expect larger text at the top of a section to be the title. The six-level scale matches the familiar heading hierarchy across web and native platforms.

---

## 3. Visual Behavior

- Layout rules: renders a native HTML heading element (`<h1>`–`<h6>`) styled via `styledHtml()`. Default browser margin is reset to 0. Consumers must manage spacing around headings.
- Spacing expectations: no default margin or padding. Vertical rhythm between headings and body text must be managed by the parent layout container.
- Typography rules:
  - Font family: always `$heading` token.
  - Levels 1-2 use `fontWeight: $5` (heavier); levels 3-6 use `fontWeight: $4` (lighter).
  - Font size and line height are paired per level (see contract for token mapping).
- Token usage: `$heading` (font family), `$color` (text color), `$10`/`$8`/`$6`/`$5`/`$4`/`$3` (font size and line height per level), `$5`/`$4` (font weight).
- Responsive behavior: supports Tamagui media-query props. Consumers can change `level` at different breakpoints (e.g., `$sm={{ level: 3 }}`).

---

## 4. Interaction Behavior

- States: Heading is non-interactive by default. No hover, focus, active, disabled, loading, or error states.
- Controlled vs uncontrolled: not applicable (stateless).
- Keyboard behavior: not focusable by default. If wrapped in a link or button, the parent element handles focus.
- Screen reader behavior: announced as a heading because the rendered element is a native `<h1>`–`<h6>`. Screen reader users rely on headings for page navigation. The semantic level is communicated by the element tag itself; no `aria-level` is needed.
- Motion rules: no motion. Headings must not animate unless the consumer explicitly applies animation that respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - Renders a native `<h1>`–`<h6>` element, which inherently communicates heading semantics and level to assistive technology.
  - No `accessibilityRole` or `aria-level` is needed — the element tag itself is the semantic signal.
- Focus rules: not in the tab order unless the consumer wraps the heading in a focusable element.
- Contrast expectations: the `$color` token must meet WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text) against its background. Heading levels 1-2 typically qualify as large text.
- Reduced motion behavior: not applicable (no inherent animation).

---

## 6. Theming Rules

- Required tokens: `$heading` (font family), `$color` (text color), font size tokens (`$3`-`$10`), font weight tokens (`$4`, `$5`).
- Prohibited hardcoded values: no raw hex colors, pixel font sizes, numeric font weights, or font family strings.
- Dark mode expectations: text color switches via the `$color` token. The heading must remain legible with sufficient contrast in both light and dark themes.

---

## 7. Composition Rules

- What can wrap it: any layout container (VStack, HStack, Box, Card header, Section header). May also be wrapped in a link or pressable for navigational headings.
- What it may contain: plain text content, or inline elements such as Icon or styled Text spans. Must not contain block-level layout components.
- Anti-patterns:
  - Do not skip heading levels visually (e.g., level 1 followed by level 4) without a corresponding semantic structure.
  - Do not use Heading inside another Heading.
  - Do not use Heading for decorative large text that is not semantically a heading; use Text with a large `size` instead.

---

## 8. Performance Constraints

- Memoization rules: do not memoize by default. Heading is a thin styled wrapper with no internal logic.
- Virtualization: when used inside virtualized lists (e.g., section headers), Heading must render efficiently as a lightweight text element.
- Render boundaries: Heading does not establish a React error boundary or Suspense boundary.

---

## 9. Test Requirements

- What must be tested:
  - Each level (1-6) renders the correct HTML heading element (`<h1>`–`<h6>`).
  - Each level applies the correct font size, line height, and font weight tokens.
  - Default level is 2 (renders `<h2>`) when no `level` prop is provided.
  - Uses `$heading` font family and `$color` text color.
- Interaction cases: not applicable (non-interactive).
- Accessibility checks:
  - Each level renders the correct semantic heading element.
  - Text meets contrast requirements (theme-level verification).
