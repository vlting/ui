# Constitution

`vlt-ui` is a presentation-only design system and component library. All business logic, data fetching, auth, routing, and domain concerns belong in `vlt-app`.

---

## §1 Hard Rules

### Semantic HTML & DOM Structure

AI-generated code commonly substitutes `<div>` for semantic HTML. These rules prevent that.

**Semantic elements:**
- `<button>` for actions, `<a>` for navigation — never `<div>`/`<span>` with click handlers
- `<h1>`–`<h6>` in logical order, never skip levels
- Every `<input>` needs an associated `<label>` via `htmlFor`/`id`
- `<ul>`/`<ol>` for lists, `<table>` for tabular data
- `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` for landmarks

**DOM optimization:**
- No styling-only wrappers — apply styles to the element that already exists
- Minimal nesting — audit rendered output, not just source
- No layout wrappers inside `<a>` or `<button>` — the interactive element owns its padding, gap, and alignment

**Bad** — unnecessary wrapper inside link:
```tsx
<a href="/page">
  <HStack style={{ padding: 'var(--space-2)', gap: 'var(--space-1)' }}>
    <Text>Label</Text>
  </HStack>
</a>
```

**Good** — styles on the interactive element:
```tsx
<a href="/page" style={{ display: 'flex', padding: 'var(--space-2)', gap: 'var(--space-1)' }}>
  <Text>Label</Text>
</a>
```

### Token Discipline

All colors, spacing, and typography must use design tokens. No hardcoded values. See `packages/QUALITY_BASELINE.md` for the full token contract.

### Spec Governance

- Every component must have a `*.spec.md` — the single source of behavioral truth
- Specs must NOT duplicate TypeScript types — reference source instead
- All specs reference `packages/QUALITY_BASELINE.md` as baseline
- v2 template: `packages/_templates/component.spec.template.md`
- Replacing old spec → archive as `{Name}.spec.bak.md` (use `git mv`)

### Playground Coverage

Every new component MUST ship with:

1. **Playground section** — added to the **top** of the components gallery (`SECTIONS` array in `App.tsx`) so it's immediately visible during review
2. **Demo scene usage** — integrated into an existing demo scene or a new one (whichever is more appropriate), demonstrating the component in a realistic, composed context — not just an isolated showcase

A component without both is not done.

### Component Boundaries

- Local UI state only (open/closed, hover, focus)
- No cross-component shared state
- No app-level global state assumptions
- No data fetching, API calls, auth, RBAC, or domain logic

---

## §2 Accessibility Tooling

MCP servers available for a11y verification during development:

| Scenario | Tool |
|----------|------|
| Creating/modifying markup | AccessLint `audit_html` |
| Fixing a11y issues (regression check) | AccessLint `diff_html` |
| Choosing colors | AccessLint `calculate_contrast_ratio`, `analyze_color_pair` |
| WCAG requirements lookup | WCAG MCP `get-criterion`, `search-wcag` |
| Full page-level audit | Lighthouse MCP |
| Interactive behavior verification | Playwright MCP |
| Targeted live a11y audit | a11y-mcp |

---

## §3 Example App Standards

This repo uses **yarn workspaces** (`"workspaces": ["examples/*"]`).

When creating a new example app:

1. Package name: `@vlting/examples-<name>`
2. Depend on `@vlting/ui` via `"*"` (resolves to local root)
3. Don't duplicate hoisted deps (`react`, `react-dom`, `typescript`, etc.)
4. Add root script: `"dev:<name>": "yarn workspace @vlting/examples-<name> dev"`
5. Vite aliases required:
   ```ts
   resolve: {
     alias: {
       'react-native-svg': 'react-native-svg-web',
       'react-native': 'react-native-web',
       '@vlting/ui': path.resolve(__dirname, '../../src'),
     },
   },
   ```
6. TypeScript paths required:
   ```json
   "paths": {
     "@vlting/ui": ["../../src/index.ts"],
     "@vlting/ui/*": ["../../src/*/index.ts"]
   }
   ```

---

## §4 Boundary Enforcement

If a request involves business logic, Supabase, auth, RBAC, routing, or domain logic:

> This belongs in `vlt-app`, not `vlt-ui`.

If unsure — ask. Never guess.
