# Component Spec — Text

## 1. Purpose

- Provides the primary body text primitive with a semantic size scale, tonal color variants, and weight control, all mapped to design tokens.
- Should be used for all body copy, labels, descriptions, captions, and inline text content.
- Should NOT be used for headings or titles (use Heading instead).
- Should NOT be used for single-character icon-like glyphs (use Icon instead).

---

## 2. UX Intent

- Primary interaction goal: render readable, accessible text that adapts to theme, size, and semantic tone requirements.
- Expected user mental model: a `<span>` or `<p>` (web) / `Text` (native) element whose visual treatment is controlled through simple, composable variant props rather than raw style values.
- **Clarity over Cleverness (3.1):** Text variants (size, tone, weight) use descriptive names (`muted`, `danger`, `semibold`) rather than numeric or coded values, making intent immediately readable.
- **Miller's Law (2.5):** The five-step size scale (xs-xl) and six tone options provide enough variety without overwhelming developers with choices.
- **Hick's Law (2.2):** Variant props reduce decision-making at the usage site; developers pick from a constrained set of meaningful options rather than specifying raw token values.

---

## 3. Visual Behavior

- Layout rules: renders inline as a Tamagui Text element. Does not impose block-level layout.
- Spacing expectations: no default margin or padding. Spacing around text must be managed by the parent layout or by the consumer applying style props directly.
- Typography rules:
  - Font family: always `$body` token.
  - Default size: `md` (fontSize `$4`, lineHeight `$4`).
  - Font weights are specified as string literals for cross-platform compatibility (`'300'` through `'700'`).
  - Size and weight variants are independent and composable (e.g., `size="lg" weight="bold"`).
- Token usage:
  - Font family: `$body`.
  - Text color: `$color` (base), `$colorSubtitle` (muted), `$color10` (primary), `$green10` (success), `$orange10` (warning), `$red10` (danger).
  - Font size/line height: `$1`, `$2`, `$4`, `$6`, `$8`.
- Responsive behavior: supports all Tamagui responsive and media-query props. Consumers can change `size`, `tone`, and `weight` at different breakpoints.

---

## 4. Interaction Behavior

- States: Text is non-interactive by default. No hover, focus, active, disabled, loading, or error states.
- Controlled vs uncontrolled: not applicable (stateless).
- Keyboard behavior: not focusable by default. If text is wrapped in a link or pressable element, the parent handles focus.
- Screen reader behavior: read as static text content. No special announcements. The `tone` variant does not convey semantic meaning to screen readers; consumers must communicate status (success, warning, danger) through additional context (e.g., adjacent labels or `aria-live` regions).
- Motion rules: no motion. Text must not animate unless the consumer explicitly applies animation that respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA requirements: no role is set by default. Text is treated as static content.
  - When `tone` conveys status meaning (success, warning, danger), the consumer must ensure the meaning is communicated non-visually (not through color alone, per WCAG 1.4.1).
- Focus rules: not in the tab order.
- Contrast expectations:
  - All tone color tokens must meet WCAG AA contrast ratio (4.5:1 for text at sizes xs-md; 3:1 for large text at lg-xl) against their intended background.
  - The `muted` tone (`$colorSubtitle`) must still meet minimum contrast requirements.
  - Contrast compliance is a theme-level responsibility but must be verified.
- Reduced motion behavior: not applicable (no inherent animation).

---

## 6. Theming Rules

- Required tokens: `$body` (font family), `$color` (base text color), `$colorSubtitle`, `$color10`, `$green10`, `$orange10`, `$red10` (tone colors), font size tokens (`$1`, `$2`, `$4`, `$6`, `$8`).
- Prohibited hardcoded values: no raw hex colors, pixel font sizes, numeric font weights (use the `weight` variant), or font family strings.
- Dark mode expectations: all color tokens must resolve to appropriate values in dark themes. The `$color`, `$colorSubtitle`, and semantic color tokens (`$green10`, `$orange10`, `$red10`) must maintain readability and contrast in both light and dark modes.

---

## 7. Composition Rules

- What can wrap it: any layout container (VStack, HStack, Box, Card, Section) or inline container (another Text for nested styling, a link component).
- What it may contain: plain text content, nested Text elements for inline style variations, or Icon for inline icon-text combinations.
- Anti-patterns:
  - Do not use Text for heading content; use Heading to get proper heading semantics and the heading font family.
  - Do not override `fontFamily` to `$heading` on Text; use the Heading component instead.
  - Do not use the `danger` tone as the sole indicator of an error; always pair with a text label or icon that communicates the error non-visually.
  - Do not deeply nest Text within Text; keep nesting to one level for inline style variations.

---

## 8. Performance Constraints

- Memoization rules: do not memoize by default. Text is a lightweight styled component. In lists with many text elements, consumers should rely on list-level virtualization rather than memoizing individual Text instances.
- Virtualization: when Text appears as part of list items, the parent list should be virtualized for large datasets.
- Render boundaries: Text does not establish a React error boundary or Suspense boundary.

---

## 9. Test Requirements

- What must be tested:
  - Default size is `md` when no `size` prop is provided.
  - Each size variant (xs, sm, md, lg, xl) applies the correct fontSize and lineHeight tokens.
  - Each tone variant (neutral, muted, primary, success, warning, danger) applies the correct color token.
  - Each weight variant (light, normal, medium, semibold, bold) applies the correct fontWeight string.
  - Base styles always include `fontFamily: '$body'` and `color: '$color'`.
  - Variants compose correctly (e.g., `size="lg" tone="danger" weight="bold"` applies all three).
  - When `tone` is not set, the base `$color` applies.
  - When `weight` is not set, the font family default weight applies.
- Interaction cases: not applicable (non-interactive).
- Accessibility checks:
  - No role is set by default.
  - Text content is readable by screen readers.
  - Tone colors meet contrast requirements against standard backgrounds (theme-level verification).
