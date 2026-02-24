---
name: frontend-quality
description: Front-of-frontend quality checklist for building and modifying UI components. Activates when creating, editing, or reviewing components in @vlting/ui.
---

# Frontend Quality Skill

Actionable checklist for producing high-quality "front of frontend" UI code in `@vlting/ui`. Run through these checks when creating, modifying, or reviewing any component.

**Governing documents:** Always read `AI_CONSTITUTION.md` and `DESIGN_CONSTITUTION.md` before making changes. Check for a `.spec.md` file for the component — if one exists, follow it strictly.

---

## Semantic HTML Checklist

- [ ] Use `<button>` for actions — never `<div onClick>`
- [ ] Use `<a>` for navigation — never `<span onClick>` or `<div>` with a click handler
- [ ] Use heading hierarchy in logical order (`<h1>` > `<h2>` > `<h3>`) — never skip levels
- [ ] Use `<ul>`/`<ol>` for lists, `<table>` for tabular data
- [ ] Use `<form>`, `<fieldset>`, `<legend>`, `<label>` for form structure
- [ ] Use landmark elements: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`
- [ ] Use `<dialog>` for modals (provides native focus trapping, Escape handling, backdrop)
- [ ] Use `<details>`/`<summary>` for simple disclosure widgets

### Tamagui Semantic HTML Rules

The `tag` prop in Tamagui's `styled()` does NOT change the rendered HTML element. `styled(XStack, { tag: 'button' })` renders `<div tag="button">`, not `<button>`.

**Correct pattern:** Use native HTML elements for semantics, wrap Tamagui styled components inside for visual styling:

```tsx
// CORRECT — renders actual <button>
const ButtonFrame = styled(XStack, { /* visual styles only */ })

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <button ref={ref} {...buttonProps}>
    <ButtonFrame>{props.children}</ButtonFrame>
  </button>
))
```

**Alternative:** `styledHtml('button', { ... })` correctly sets the HTML element but loses Tamagui layout primitive features.

**Verify:** Always inspect the rendered DOM to confirm the correct HTML element appears.

---

## DOM Optimization Checklist

- [ ] No block element nested inside an interactive element just for styling — put padding/spacing on the interactive element itself
- [ ] No unnecessary wrapper `<div>`s — audit **rendered output**, not just source JSX
- [ ] Compound components do not add extra DOM nodes beyond what is semantically needed
- [ ] Prefer component styling props over wrapper elements for spacing and padding
- [ ] Question every `<div>` — does it serve a semantic or layout purpose?

### Verification

Inspect rendered DOM using Playwright MCP:

```
browser_snapshot   → accessibility tree (structure)
browser_evaluate   → document.querySelectorAll('*').length (element count)
```

Target: components should produce the minimum DOM nodes needed for their semantic and layout purpose.

---

## Accessibility Checklist

### Keyboard

- [ ] All interactive elements are reachable via Tab
- [ ] Tab order follows logical reading order (DOM order, not visual order)
- [ ] Standard key bindings:
  - Enter / Space → activate buttons, links, checkboxes
  - Escape → dismiss modals, popovers, dropdowns
  - Arrow keys → navigate within composite widgets (tabs, menus, radio groups, listboxes)
- [ ] Focus is visible: 2px solid outline, `$outlineColor` token, 2px offset, meeting 3:1 contrast against adjacent colors
- [ ] Focus is managed: moves to opened content, returns to trigger on close

### ARIA

- [ ] Prefer native HTML semantics over ARIA (`<button>` over `<div role="button">`)
- [ ] When ARIA is needed, follow the WAI-ARIA Authoring Practices Guide (APG) pattern exactly
- [ ] ARIA states update dynamically (e.g., `aria-expanded` toggles on open/close)
- [ ] Loading states use `aria-busy="true"`
- [ ] Error states use `aria-invalid="true"` and `aria-describedby` pointing to the error message
- [ ] Disabled states use `aria-disabled="true"` (prefer over the `disabled` HTML attribute when you want the element to remain focusable)

### Contrast

- [ ] Normal text: 4.5:1 minimum ratio (WCAG 1.4.3)
- [ ] Large text (18px+ or 14px bold): 3:1 minimum ratio
- [ ] UI components and graphical objects: 3:1 against adjacent colors (WCAG 1.4.11)
- [ ] All color values come from design tokens — verify token pairs meet contrast requirements

### Touch Targets

- [ ] All interactive elements: minimum 24x24 CSS px (WCAG 2.5.8)
- [ ] Primary actions (submit, main CTAs): 44x44 CSS px preferred
- [ ] If visual element is smaller than 24px, extend hit area with padding
- [ ] At least 8px spacing between adjacent interactive targets

### Screen Readers

- [ ] Content announced in logical reading order
- [ ] Dynamic changes are announced (via focus movement or live regions)
- [ ] Decorative elements hidden: `aria-hidden="true"` or empty `alt=""`
- [ ] Images have descriptive `alt` text (or `alt=""` if decorative)
- [ ] Form inputs have associated `<label>` elements (via `htmlFor`/`id` pairing)

### Motion

- [ ] All animation respects `prefers-reduced-motion`
- [ ] Animation supports comprehension (state changes, transitions) — not decoration
- [ ] No animation on layout-triggering properties (use `transform`, `opacity` instead)

---

## Spacing & Layout Checklist

- [ ] All spacing uses design tokens — no magic numbers or hardcoded `px` values
- [ ] Consistent use of the spacing scale (`$0.5` through `$10`)
- [ ] Alignment follows Gestalt proximity principles (related elements grouped, unrelated elements separated)
- [ ] Responsive: mobile-first approach, respect breakpoints (`$sm`, `$md`, `$lg`, `$xl`)
- [ ] No hardcoded colors, font sizes, or border radii — all from tokens
- [ ] Supports light and dark themes via token resolution

---

## Verification Steps

After creating or modifying a component, run these checks:

### 1. Static Markup Audit

Use **AccessLint MCP** `audit_html` on the component's rendered markup:
- Pass the HTML output of the component (not the JSX source)
- Fix all violations before proceeding

### 2. WCAG Compliance Check

If unsure about a specific pattern, use **WCAG MCP**:
- `get-criterion <id>` — full details on a success criterion
- `get-techniques-for-criterion <id>` — implementation techniques
- `search-wcag <keywords>` — find relevant criteria by topic

### 3. DOM Structure Inspection

Use **Playwright MCP** to verify rendered output:
- `browser_snapshot` — inspect the accessibility tree for correct roles and names
- `browser_evaluate` with `document.querySelectorAll('*').length` — check DOM size
- `browser_press_key` with Tab, Enter, Escape, Arrow keys — verify keyboard behavior

### 4. Live Accessibility Audit

Use **a11y-mcp** `audit_webpage` for axe-core audit on the running page.

### 5. Regression Check

When fixing an accessibility issue, use **AccessLint MCP** `diff_html` with before/after markup to verify the fix introduces no regressions.

---

## Quick Reference: Tool Selection

| Task | Tool |
|---|---|
| Audit component markup | AccessLint `audit_html` |
| Verify a11y fix (no regressions) | AccessLint `diff_html` |
| Check color contrast | AccessLint `analyze_color_pair` |
| Look up WCAG criterion | WCAG MCP `get-criterion` |
| Find WCAG techniques | WCAG MCP `get-techniques-for-criterion` |
| Inspect accessibility tree | Playwright `browser_snapshot` |
| Test keyboard navigation | Playwright `browser_press_key` |
| Measure element dimensions | Playwright `browser_evaluate` |
| Full page a11y audit | a11y-mcp `audit_webpage` |
| Full page performance audit | Lighthouse `run_audit` |

---

## Common Mistakes to Avoid

1. **Using `styled(View, { tag: 'button' })` for semantic elements** — the `tag` prop does not change the rendered HTML element in Tamagui v2 RC. Use native HTML elements.

2. **Adding ARIA without the interaction** — `role="button"` on a `<div>` without keyboard handling is worse than no ARIA. The role promises behavior the element doesn't deliver.

3. **Wrapping for styling instead of styling the element** — `<button><div className="p-4">Text</div></button>` adds unnecessary DOM. Put the padding on the `<button>`.

4. **Using `aria-label` when visible text exists** — prefer visible text labels. `aria-label` overrides visible text for screen readers, creating a disconnect.

5. **Hardcoding visual values** — every color, spacing value, radius, font size, and font weight must come from design tokens. No hex codes, no `px` values, no numeric font weights.

6. **Skipping verification** — always inspect the rendered DOM, not just the JSX source. Tamagui adds wrapper elements that may break semantic structure.

7. **Omitting `prefers-reduced-motion` support** — all animation must degrade gracefully. Test with the media query forced on.

8. **Using `GetProps<>` from Tamagui** — the index signature bug causes all props to resolve as `undefined`. Define component props from scratch.
