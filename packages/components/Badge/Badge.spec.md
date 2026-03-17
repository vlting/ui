# Badge

Inline pill for status/category labeling. Informational only — not interactive or focusable.

## Semantic HTML
- `<span>` — inline element

## Variants
- **theme** (7): primary, secondary, neutral, success, warning, error, info
- **variant** (3): solid, subtle, outline
- **size** (3): sm, md, lg

## Color contract
- **solid**: `$<theme>9` bg + `$<theme>Text9` text (high-contrast pair)
- **subtle**: `$<theme>3` bg + `$<theme>Text3` text
- **outline**: transparent bg + `$<theme>` border + `$<theme>Text3` text

## Accessibility
- Not interactive, not focusable
- Decorative/informational — no role needed
