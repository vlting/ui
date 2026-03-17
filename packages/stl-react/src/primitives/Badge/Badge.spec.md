# Component Spec — Badge

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../QUALITY_BASELINE.md).

## 1. Purpose

- Small status label for categorization, counts, or status indicators.
- Use for tags, status chips, notification counts, and inline metadata labels.
- Do NOT use as an interactive element (button or link). Do NOT use for long-form text.

---

## 2. UX Intent

- **Gestalt Principles** — visual differentiation through color and shape distinguishes badges from surrounding content, drawing attention to status or category.
- **Fitts's Law** — non-interactive; badge size is for readability, not targeting.

---

## 3. Anatomy

Single element — `styled('span')` with theme, variant, and size variant groups.

- `theme` (15): `primary` | `secondary` | `neutral` | `success` | `warning` | `error` | `info` | `tomato` | `amber` | `grass` | `forest` | `aqua` | `indigo` | `plum` | `magenta`. Default: `neutral`.
- `variant` (3): `solid` | `subtle` | `outline`. Default: `solid`.
- `size` (3): `sm` | `md` | `lg`. Default: `md`.

> **TypeScript is the source of truth for props.** See `BadgeProps` in `Badge.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

Non-interactive. No hover, focus, active, or disabled states.

### Keyboard Interaction

None — Badge does not receive focus.

### Motion

None.

---

## 5. Accessibility

- **Semantic element:** Renders as `<span>` on web.
- **ARIA attributes:** None by default. If the badge conveys status meaning, the consumer should ensure the status is also communicated through text context or `aria-label` on a parent.
- **Contrast:** Each variant's foreground/background combination must meet WCAG 4.5:1 for text contrast. The `$<theme>9` / `$<theme>Text9` pairing (solid) guarantees this via the color-gen contrast algorithm. Verify `$tomato10` on `$color1` in both themes.

---

## 6. Styling

- **Design tokens used:**
  - Text: `fontFamily: '$body'`, `fontWeight: '$500'`
  - fontSize by size: `sm` → `$buttonTiny`, `md` → `$buttonSmall`, `lg` → `$button`
  - Colors: compound variants map `theme × variant` to `$<theme>` scale steps (see Color contract)
  - Spacing: `sm` → px=$8/py=$4, `md` → px=$12/py=$4, `lg` → px=$16/py=$6
  - Shape: `radius: '$full'` (pill shape)
  - Layout: `display: 'inline-flex'`, `flexShrink: '0'`
- **Color contract:**
  - `solid`: `$<theme>9` bg + `$<theme>Text9` text
  - `subtle`: `$<theme>3` bg + `$<theme>Text3` text
  - `outline`: transparent bg + `$<theme>9` border + `$<theme>Text3` text
- **Responsive behavior:** Inherits STL responsive props.
- **Dark mode:** Color tokens resolve automatically.

---

## 7. Composition

- **What can contain this component:** Any layout context — cards, list items, table cells, headings, navigation.
- **What this component can contain:** Short text content only. No nested interactive elements.
- **Anti-patterns:** Do not wrap Badge in a button to make it clickable — use a proper Button with badge styling.

---

## 8. Breaking Change Criteria

- Removing a theme or variant value.
- Changing default theme from `neutral`.
- Changing default variant from `solid`.
- Changing default size from `md`.
- Changing the pill shape (`radius: '$full'`).

---

## 9. Test Requirements

- **Behavioral tests:** Verify each theme × variant applies correct compound styles. Verify each size applies correct fontSize and padding. Verify default theme, variant, and size.
- **Accessibility tests:** Verify no implicit role. Verify text contrast for all variants in both light and dark themes.
