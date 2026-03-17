# Badge

Inline pill for status/category labeling. Informational only — not interactive or focusable.

## Semantic HTML
- `<span>` — inline element

## Variants
- **theme** (15): primary, secondary, neutral, success, warning, error, info, tomato, amber, grass, forest, aqua, indigo, plum, magenta
- **variant** (3): solid, subtle, outline
- **size** (3): sm, md, lg

## Spacing
| Size | px | py | fontSize |
|------|----|----|----------|
| sm | `$8` | `$4` | `$buttonTiny` |
| md | `$12` | `$4` | `$buttonSmall` |
| lg | `$16` | `$6` | `$button` |

## Color contract
- **solid**: `$<theme>9` bg + `$<theme>Text9` text (high-contrast pair)
- **subtle**: `$<theme>3` bg + `$<theme>Text3` text
- **outline**: transparent bg + `$<theme>9` border + `$<theme>Text3` text

## Accessibility
- Not interactive, not focusable
- Decorative/informational — no role needed
