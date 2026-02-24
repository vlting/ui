# Frontend Quality Contract

This contract defines the baseline quality standards that **every UI component** in `@vlting/ui` must meet. Individual component contracts (e.g., `Button.contract.md`) define component-specific behavior on top of this shared baseline.

---

## 1. Rendered Markup Quality

### Semantic Element Requirements

Every component must produce semantically correct HTML:

- **Interactive components** (`Button`, `Input`, `Select`, `Checkbox`, `Switch`, `RadioGroup`, etc.) must render the correct native HTML element (`<button>`, `<input>`, `<select>`, etc.) — not a `<div>` with ARIA role patching.
- **Container components** (`Card`, `Dialog`, `Sheet`, `Accordion`, etc.) must use appropriate landmark or sectioning elements where applicable (`<dialog>`, `<section>`, `<article>`, `<details>`).
- **Text components** must use the correct element for their purpose (`<p>`, `<h1>`–`<h6>`, `<span>`, `<label>`, `<code>`, `<blockquote>`, etc.).
- **List-based components** must render `<ul>`/`<ol>`/`<li>` structures.
- **Navigation components** must use `<nav>` landmarks.
- **Form components** must use `<form>`, `<fieldset>`, `<legend>`, and `<label>` where structurally appropriate.

### DOM Structure Requirements

- **Maximum 3 levels of nesting** within a single component's rendered output (excluding children passed by consumers). If more levels are needed, justify why.
- **No styling-only elements**: No element may exist solely to apply a single CSS property. That property must be moved to an existing parent or child element.
- **Compound sub-components** (e.g., `Button.Text`, `Button.Icon`) should not introduce wrapper elements beyond the styled element itself.
- **Tamagui `tag` prop caveat**: The `tag` prop in `styled()` does NOT change the rendered HTML element in Tamagui v2 RC. Use `styledHtml()` or wrap native HTML elements with Tamagui styled components for visual styling.

---

## 2. Accessibility Baseline (WCAG 2.2 AA)

All components must meet these requirements **without consumer opt-in**:

| Requirement | Standard | Detail |
|---|---|---|
| Keyboard operability | WCAG 2.1.1 | Tab, Enter, Space, Escape, Arrow keys as appropriate for the widget role |
| Visible focus indicator | WCAG 2.4.7 / 2.4.11 | 2px solid outline, 2px offset, 3:1 contrast ratio against adjacent colors |
| Text contrast | WCAG 1.4.3 | 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold) — enforced via design tokens |
| Non-text contrast | WCAG 1.4.11 | 3:1 for UI component boundaries and states |
| Touch target size | WCAG 2.5.8 | Minimum 24x24 CSS px; recommended 44x44 CSS px for primary actions |
| Name / Role / Value | WCAG 4.1.2 | Correct ARIA role (prefer native semantics), accessible name, current value |
| Error identification | WCAG 3.3.1 | `aria-invalid="true"`, visible error text, `aria-describedby` linking error to control |
| Labels | WCAG 1.3.1 / 3.3.2 | Every form control has a visible, associated `<label>` (via `htmlFor`/`id`) |
| Reduced motion | WCAG 2.3.3 | Respect `prefers-reduced-motion`; animations enhance comprehension, never required for operation |

### Focus Style Standard

All focusable components must use this focus style pattern:

```
focusVisibleStyle: {
  outlineWidth: 2,
  outlineOffset: 2,
  outlineColor: '$outlineColor',
  outlineStyle: 'solid',
}
```

### ARIA Usage Rules

- Prefer native HTML semantics over ARIA (a `<button>` over `<div role="button">`)
- When ARIA is needed, follow the WAI-ARIA Authoring Practices Guide (APG) pattern exactly
- Partial ARIA is worse than no ARIA — the role promises behavior the element must deliver
- ARIA states must update dynamically (e.g., `aria-expanded` toggles on open/close)

---

## 3. Styling & Token Discipline

### Color

- All color values must resolve through design tokens — no hex, rgb, or hsl literals in component code
- Token pairs used together (text on background) must meet the contrast ratios in §2

### Spacing

- All spacing values (padding, margin, gap) must use the space token scale (`$0.5` through `$10`)
- No hardcoded pixel values for spacing

### Typography

- All font sizes must use the font size token scale (`$1` through `$10`)
- Font families must use the `$heading` or `$body` tokens
- Font weights must use the weight token scale (`$1` through `$5`)

### Border Radius

- All border radii must use the radius token scale (`$0` through `$16`)

### Interaction Styles

- Press/hover styles must use token-based colors
- Animations must use the `animation: 'fast'` (or other named) animation token
- All animations must degrade gracefully with `prefers-reduced-motion`

---

## 4. Cross-Platform Considerations

- Components must work on web and React Native (Tamagui handles this, but component authors must not introduce web-only APIs without fallbacks)
- Use Tamagui style props for layout — not raw CSS (`className`, `style={{}}`, etc.)
- `styledHtml()` elements are web-only by nature. They should have React Native alternatives or be clearly documented as web-only
- Do not use browser-specific APIs (e.g., `document.querySelector`, `window.addEventListener`) directly in components — use Tamagui or React abstractions

---

## 5. Verification Protocol

After creating or modifying ANY component, run these checks:

### Static Audit

1. Run **AccessLint `audit_html`** on the component's representative rendered HTML
2. If colors were changed, use **AccessLint `analyze_color_pair`** to verify contrast ratios
3. If unsure about a WCAG requirement, use **WCAG MCP `get-criterion`** for the exact specification

### DOM Inspection

4. Count nesting levels in rendered output — flag if >3 levels within the component
5. Verify no element exists solely for a single CSS property

### Interaction Testing

6. **Keyboard**: Tab to the component, activate with Enter/Space, dismiss with Escape (where applicable)
7. **Screen reader**: Verify accessible name, role, and state announcements
8. **Touch targets**: Verify interactive elements meet 24x24 CSS px minimum

### Regression Check

9. When fixing an issue, use **AccessLint `diff_html`** with before/after markup to verify no regressions
