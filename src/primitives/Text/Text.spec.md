# Component Spec — Text

## 1. Purpose

Provides a foundational typography primitive for rendering all text content — paragraphs, labels, headings, captions, and any inline text — with consistent, token-based typographic styling.

Use it as the single text rendering component across the design system. All text content must be rendered through Text (or a component that extends it) rather than bare platform text elements.

Do NOT use it as a block layout container (use Stack), for interactive text (use Button or a Link component with appropriate affordances), or for rich/formatted text content (use a dedicated RichText component).

---

## 2. UX Intent

- Primary interaction goal: none — Text is a display primitive. Users read it; they do not interact with it.
- Expected user mental model: text content. Users expect predictable reading behavior — correct size, weight, line height, and color for context.
- UX laws applied:
  - Gestalt Law of Similarity: consistent typographic scales across the design system ensure that heading text, body text, and caption text are immediately distinguishable by their visual weight and size.
  - Tesler's Law: Text absorbs the complexity of cross-platform typography (native vs web rendering, font loading, scale mapping) so consumers specify semantic size variants rather than raw font values.

---

## 3. Visual Behavior

- Layout: inline or block depending on the rendering context and variant. Text does not introduce its own layout constraints beyond its content dimensions.
- Spacing: line height is defined by the type scale token for each variant. No external margin — spacing is the responsibility of the parent layout (Stack).
- Typography:
  - Variants: `display`, `heading`, `subheading`, `body`, `label`, `caption`, `overline`. Each variant maps to a type scale token (font size, line height, font weight, letter spacing).
  - `weight` prop: overrides font weight using weight tokens (regular, medium, semibold, bold).
  - `color` prop: applies a foreground color token. Defaults to the primary foreground token.
  - `align` prop: text alignment (start, center, end, justify).
  - `numberOfLines` prop: truncates text to N lines with an ellipsis.
  - `italic` prop: applies italic styling.
- Token usage:
  - Font size: type scale size tokens.
  - Line height: type scale line height tokens.
  - Font weight: type scale weight tokens.
  - Color: foreground color tokens (primary, secondary, muted, destructive, accent, on-accent, etc.).
  - Letter spacing: type scale tracking tokens.
- Responsive behavior: Text itself does not change variant at breakpoints. The parent controls which Text variant to render at each breakpoint if needed.

---

## 4. Interaction Behavior

- States: none. Text is static display content.
- Controlled vs uncontrolled: not applicable.
- Keyboard behavior: not focusable by default. If Text wraps or is inside a pressable element, the parent manages focus.
- Screen reader behavior: Text renders as readable text content. It must map to appropriate semantic HTML elements (`<p>`, `<h1>`–`<h6>`, `<span>`, `<label>`, `<caption>`) based on its variant and context, or accept an `as` prop for semantic override.
- Motion rules: Text itself has no animations.

---

## 5. Accessibility Requirements

- ARIA requirements: Text should render as the appropriate semantic element for its context. Heading variants should map to `<h1>`–`<h6>`. Body and caption variants map to `<p>` or `<span>`. An `as` prop allows the consumer to override the rendered element for correct semantics. Do not use `aria-label` on generic Text — if a label is needed for an element, use a proper associated label.
- Focus rules: not focusable. If text is selectable (e.g., `selectable` prop), it remains non-focusable via keyboard but is accessible to pointer selection.
- Contrast expectations: the default primary foreground color token must meet WCAG AA (4.5:1) against the default background in both light and dark themes. All color token variants used with Text must be validated for contrast in their expected contexts.
- Reduced motion behavior: not applicable.

---

## 6. Theming Rules

- Required tokens: type scale tokens (font size, line height, font weight, letter spacing) for each variant; foreground color tokens for each `color` prop value.
- Prohibited hardcoded values: no raw pixel font sizes, no hardcoded hex colors, no raw font weight numbers (use token-mapped weight names), no raw line height values.
- Dark mode expectations: all foreground color tokens must have appropriate dark-mode values. The primary foreground token must remain legible against dark backgrounds. Muted and secondary foreground tokens must maintain their relative hierarchy in dark mode.

---

## 7. Composition Rules

- What can wrap it: Stack, card bodies, form field labels, button labels, list items, any container component.
- What it may contain: text string content, inline spans (via nested Text with different styling), or icon elements (when used in an inline icon+text pattern, ensure the icon is not inside Text but adjacent in a Stack row).
- Anti-patterns:
  - Do not use Text as a layout container — it must not contain block-level elements.
  - Do not apply arbitrary inline styles to override tokens — use the provided variant and color props.
  - Do not use Text for interactive content without appropriate interactive wrapping (use Button or a Link component).
  - Do not render bare platform text without using Text — always go through the Text primitive.

---

## 8. Performance Constraints

- Memoization rules: memoize Text instances in long lists where the text content is stable and the parent renders frequently.
- Virtualization: not applicable at the Text level.
- Render boundaries: pure display primitive. No state or side effects.

---

## 9. Test Requirements

- What must be tested:
  - Renders the provided text content.
  - Renders the correct variant-based typographic styles (font size, weight, line height) as token-mapped values.
  - The `color` prop applies the correct foreground color token.
  - The `weight` prop overrides font weight with the correct token.
  - The `align` prop applies text alignment.
  - The `numberOfLines` prop truncates text and adds an ellipsis.
  - The `italic` prop applies italic styling.
  - The `as` prop renders the correct HTML element.
- Interaction cases: none.
- Accessibility checks:
  - Heading variants render as `<h1>`–`<h6>` elements (or have the appropriate ARIA role).
  - Text content is readable by screen readers in source order.
  - Primary foreground color token meets WCAG AA in both themes.
  - Text does not receive focus.
