# AI Constitution

This document governs all AI-assisted changes in this repository.

`vlt-ui` is a cross-platform design system and component library built on Tamagui.
It must remain stable, predictable, accessible, and framework-agnostic.

This repository contains **no business logic**.

---

# 1. Core Purpose

`vlt-ui` exists to provide:

- A consistent cross-platform design system
- Accessible, composable UI components
- Strong prop contracts
- Predictable layout primitives
- Theme and token infrastructure

It must:

- Never contain business rules
- Never contain feature logic
- Never contain direct data access
- Never depend on Supabase
- Never depend on Jotai
- Never contain module-specific behavior

---

# 2. Non-Negotiable Rules

## 2.1 No Business Logic

Components must not:

- Fetch data
- Call APIs
- Import feature modules
- Enforce RBAC
- Contain domain logic
- Assume app context

All components must be presentation-only.

---

## 2.2 Strict Separation of Concerns

`vlt-ui` may include:

- Primitives
- Composed UI components
- Layout systems
- Theming
- Tokens
- Accessibility utilities

It must not include:

- Feature-specific flows
- Supabase calls
- Auth logic
- Multi-tenancy logic
- App routing logic

---

## 2.3 Composability Over Configuration

Prefer:

- Small, composable components
- Clear prop contracts
- Predictable composition patterns

Avoid:

- Overly configurable mega-components
- Excessive boolean prop combinations
- Implicit magic behavior

---

## 2.4 No Over-Engineering

- Do not create abstraction layers unless duplication is clear.
- Do not introduce internal plugin systems.
- Do not invent patterns beyond common industry practice.
- Prefer conventional component architecture.

Familiar > clever.

---

## 2.5 Accessibility Is Mandatory

All components must:

- Be keyboard accessible
- Use semantic HTML where possible
- Provide ARIA roles only when needed
- Preserve focus management
- Expose necessary accessibility props
- Maintain color contrast
- Support reduced motion

Accessibility must be testable.

---

## 2.6 Theming Discipline

- All styling must use design tokens.
- No hardcoded colors.
- No hardcoded spacing values outside tokens.
- No arbitrary font sizes.
- Must support light/dark themes.
- Must support extension without breaking contracts.

---

## 2.7 Stability Over Novelty

Components must:

- Follow widely understood UX conventions.
- Avoid novelty for its own sake.
- Avoid “design experiments.”
- Match familiar patterns (e.g., standard modal behavior, standard form layouts).

---

## 2.8 Semantic HTML & DOM Structure

AI-generated code commonly substitutes generic `<div>` elements for semantic HTML and adds unnecessary wrapper elements. These rules prevent that.

### Semantic Element Rules

- **Interactive elements**: Use `<button>` for actions, `<a>` for navigation. NEVER use `<div>`, `<span>`, or Tamagui `View`/`XStack`/`YStack` with `onPress`/`onClick` as a substitute.
- **Headings**: Use `<h1>`–`<h6>` in logical order. Never skip heading levels. In Tamagui, use the `Heading` component with the `level` prop (renders native heading elements via `styledHtml()`).
- **Forms**: Every `<input>` must have an associated `<label>` via `htmlFor`/`id`. Use `<form>`, `<fieldset>`, and `<legend>` for form structure. Use `<select>` for native dropdowns.
- **Lists**: Use `<ul>`/`<ol>` for lists of items, not a stack of `<div>`s.
- **Tables**: Use `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` for tabular data.
- **Landmarks**: Use `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` for page structure.

### DOM Optimization Rules

- **No styling-only wrappers**: Never add a `<div>` or `<View>` solely for padding, margin, or alignment when those styles can be applied directly to the parent or child element. This reduces DOM size, improves accessibility tree clarity, and avoids unnecessary layout recalculations.
- **Minimal nesting**: Components must produce the minimum DOM nodes necessary. Audit rendered output (not just source) to verify.
- **Compound component wrappers**: Sub-components (e.g., `Button.Text`, `Button.Icon`) should use `styled()` on existing elements, not wrap in additional containers.
- **Tamagui-specific**: The `tag` prop in `styled()` does NOT change the rendered HTML element in Tamagui v2 RC. Use `styledHtml('button')` or native HTML elements with Tamagui styling wrappers inside.

### Rendered Output Verification

After creating or modifying a component, verify the rendered DOM to ensure:

1. Correct semantic elements are used (not `<div>` with ARIA role as a substitute)
2. No unnecessary wrapper elements exist
3. ARIA attributes are present where needed and absent where native semantics suffice

---

# 3. Component Design Standards

## 3.1 Prop Contracts

Every component must:

- Have strictly typed props.
- Avoid `any`.
- Support controlled and uncontrolled variants where appropriate.
- Avoid prop explosion.
- Document required vs optional props clearly.

If a component becomes overly complex:
- Split it.

---

## 3.2 State in Components

Allowed:
- Local UI state (e.g., open/closed state).
- Controlled state via props.

Not allowed:
- Cross-component shared state.
- App-level global state.

---

## 3.3 Layout System Rules

- AppShell must be layout-only.
- Sidebar must not assume auth state.
- Navigation components must be structure-only.
- No hardcoded routes.

---

## 3.4 Performance

- Avoid unnecessary re-renders.
- Memoize only when justified.
- Use virtualization for large lists.
- Avoid premature optimization.

---

# 4. Testing Standards

All components must:

- Use React Testing Library.
- Test behavior, not implementation.
- Test accessibility basics.
- Test keyboard interaction.
- Test controlled/uncontrolled modes.

Avoid:

- Snapshot-only testing.
- Testing internal DOM structure unnecessarily.

---

# 5. Documentation Requirements

Every component must include:

- Description
- Intended use cases
- Prop table
- Accessibility notes
- Example usage

Documentation must reflect real-world usage patterns.

---

# 6. Versioning & Stability

- Breaking changes require explicit version bumps.
- Do not change prop contracts silently.
- Deprecate before removing.

---

# 7. Example App Standards

## 7.1 Workspace Integration

This repo uses **yarn workspaces** (`"workspaces": ["examples/*"]`). All example apps live in `examples/` and are workspace members.

When creating a new example app:

1. **Package name**: Use `@vlting/examples-<name>` (e.g., `@vlting/examples-kitchen-sink`)
2. **Depend on `@vlting/ui` via `"*"`** — yarn workspaces resolve this to the local root package (the root is listed as `"."` in the workspaces array)
3. **Do NOT duplicate shared dependencies** (`react`, `react-dom`, `tamagui`, `react-native-web`, `react-native-svg-web`, `prop-types`, `typescript`, `@types/react`, etc.) in the example's `package.json` — these are hoisted from the root
4. **Only list deps unique to the example** (e.g., `react-router-dom`, `@vitejs/plugin-react`, `vite`)
5. **Add a root-level dev script**: Add `"dev:<name>": "yarn workspace @vlting/examples-<name> dev"` to the root `package.json` scripts
6. **Vite aliases**: The example's `vite.config.ts` must include these aliases:
   ```ts
   import path from 'path'
   // ...
   define: {
     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
   },
   resolve: {
     alias: {
       'react-native-svg': 'react-native-svg-web',
       'react-native': 'react-native-web',
       '@vlting/ui': path.resolve(__dirname, '../../src'),
     },
   },
   ```
   - The `define` is required because Tamagui references `process.env.NODE_ENV` which doesn't exist in the browser
   - The `react-native-svg` alias is required because `@tamagui/lucide-icons` imports it, and the native version has codegen that doesn't work on web
7. **TypeScript paths**: The example's `tsconfig.json` must map `@vlting/ui` and `@vlting/ui/*` to the source:
   ```json
   "paths": {
     "@vlting/ui": ["../../src/index.ts"],
     "@vlting/ui/*": ["../../src/*/index.ts"]
   }
   ```

## 7.2 Running Example Apps

From the repo root:
- `yarn dev:kitchen-sink` — Run the kitchen-sink example
- Or: `cd examples/<name> && yarn dev`

Always run `yarn` (install) from the **repo root** before running any example.

---

# 8. AI Operating Rules for vlt-ui

If:

- A request includes business logic
- A request includes Supabase integration
- A request includes RBAC or domain logic

You must respond:

> This belongs in `vlt-app`, not `vlt-ui`.

If unsure:
- Ask.

Never guess.
