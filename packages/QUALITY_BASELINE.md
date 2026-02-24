# Quality Baseline

Universal quality requirements that every UI component in `@vlting/ui` must meet. Individual component specs (`*.spec.md`) reference this document as their baseline.

---

## Semantic HTML

- **Interactive components** (`Button`, `Input`, `Select`, `Checkbox`, etc.) must render the correct native HTML element (`<button>`, `<input>`, `<select>`, etc.) — not a `<div>` with ARIA role patching.
- **In Tamagui:** use `styledHtml()` for semantic elements, NOT `styled(View, { tag: 'button' })`. The `tag` prop does not change the rendered HTML element in Tamagui v2 RC.
- **Container components** should use appropriate sectioning/landmark elements where applicable (`<dialog>`, `<section>`, `<article>`, `<details>`).
- **Text components** must use the correct element for their purpose (`<p>`, `<h1>`–`<h6>`, `<span>`, `<label>`, `<code>`, `<blockquote>`).
- **List-based components** must render `<ul>`/`<ol>`/`<li>` structures.
- **Navigation components** must use `<nav>` landmarks.
- **Form components** must use `<form>`, `<fieldset>`, `<legend>`, and `<label>` where structurally appropriate.

---

## DOM Structure

- **Maximum 3 levels of nesting** within a component's rendered output (excluding consumer-passed children). If more levels are needed, justify why.
- **No styling-only elements:** No element may exist solely to apply a single CSS property. That property must be moved to an existing parent or child element.
- **Sub-components** (e.g., `Button.Text`, `Button.Icon`) must not introduce wrapper elements beyond the styled element itself.

---

## Accessibility (WCAG 2.2 AA)

All components must meet these requirements without consumer opt-in:

| Requirement | Standard | Detail |
|---|---|---|
| Keyboard operability | WCAG 2.1.1 | Tab, Enter, Space, Escape, Arrow keys as appropriate for the widget role |
| Visible focus indicator | WCAG 2.4.7 / 2.4.11 | 2px solid outline, 2px offset, `$outlineColor` token, 3:1 contrast against adjacent colors |
| Text contrast | WCAG 1.4.3 | 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold) |
| Non-text contrast | WCAG 1.4.11 | 3:1 for UI component boundaries and states |
| Touch target size | WCAG 2.5.8 | Minimum 24x24 CSS px; recommended 44x44 CSS px for primary actions |
| Name / Role / Value | WCAG 4.1.2 | Correct ARIA role (prefer native semantics), accessible name, current value |
| Error identification | WCAG 3.3.1 | `aria-invalid="true"`, visible error text, `aria-describedby` linking |
| Labels | WCAG 1.3.1 / 3.3.2 | Every form control has a visible, associated `<label>` (via `htmlFor`/`id`) |
| Reduced motion | WCAG 2.3.3 | Respect `prefers-reduced-motion`; animations enhance, never required |

### Standard Focus Style

```
focusVisibleStyle: {
  outlineWidth: 2,
  outlineOffset: 2,
  outlineColor: '$outlineColor',
  outlineStyle: 'solid',
}
```

### ARIA Rules

- Prefer native HTML semantics over ARIA (`<button>` over `<div role="button">`)
- When ARIA is needed, follow the WAI-ARIA Authoring Practices Guide (APG) pattern exactly
- Partial ARIA is worse than none — the role promises behavior the element must deliver
- ARIA states must update dynamically (e.g., `aria-expanded` toggles)

---

## Token Discipline

- **Colors:** All color values through design tokens — no hex, rgb, or hsl literals
- **Spacing:** All padding, margin, gap values from the space token scale (`$0.5` through `$10`)
- **Typography:** All font sizes from the font size token scale; font families from `$heading` or `$body`
- **Border radius:** All radii from the radius token scale
- **Interaction styles:** Press/hover use token-based colors; animations use named tokens (e.g., `'fast'`)

---

## Cross-Platform

- Components must work on web and React Native (Tamagui handles this, but authors must not introduce web-only APIs without fallbacks)
- Use Tamagui style props for layout — not raw CSS (`className`, `style={{}}`)
- `styledHtml()` elements are web-only by nature — document as such or provide RN alternatives

---

## Verification Protocol

After creating or modifying ANY component:

1. **Static audit:** Run AccessLint `audit_html` on representative rendered HTML
2. **Contrast check:** If colors changed, verify with AccessLint `analyze_color_pair`
3. **DOM inspection:** Count nesting levels — flag if >3 within the component
4. **Keyboard test:** Tab, Enter/Space activation, Escape dismissal (where applicable)
5. **Screen reader:** Verify accessible name, role, and state announcements
6. **Regression check:** Use AccessLint `diff_html` when fixing issues
