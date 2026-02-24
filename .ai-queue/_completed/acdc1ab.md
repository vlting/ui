# Commit History

- `55bc5fa` — docs(queue): compile front-of-frontend research guide for AI agents
- `acdc1ab` — merge commit into main

---

<!-- auto-queue -->
# Compile Front-of-Frontend Research Document

## Objective

Create a comprehensive research document at `.ai-queue/_docs/front-of-frontend-guide.md` that serves as a reference for working with Claude to generate high-quality "front of frontend" UI code.

## Context

"Front of the frontend" (coined by Brad Frost, 2019) distinguishes the browser-facing discipline — semantic HTML, CSS, accessibility, design systems, performance, DOM structure — from the application logic discipline (state management, data fetching, build tooling). This project (`@vlting/ui`) is entirely a "front of frontend" concern.

## Deliverable

A single document covering:

### 1. What "Front of Frontend" Means
- Brad Frost's original distinction (reference: bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/)
- Chris Coyier's "The Great Divide" (CSS-Tricks, 2019)
- Why this matters for AI-assisted development (AI tends to focus on "back of frontend" concerns and neglect markup quality)

### 2. Prompting Strategies for High-Quality UI Output
- Reference the CodeA11y study (CHI 2025): explicit prompting required, manual steps overlooked, verification gap
- Practical prompt templates that produce semantic, accessible, well-structured markup
- Anti-patterns to avoid (asking for "a component" without specifying accessibility, keyboard behavior, or semantic element choices)
- The principle: "always request accessibility explicitly — even with constitution files"

### 3. Key Quality Dimensions
For each dimension, explain what it means, why it matters, and how to verify it:
- **Semantic HTML**: correct element choices, landmark elements, heading hierarchy, form structure
- **Accessibility (WCAG 2.2 AA)**: keyboard operability, focus management, ARIA usage, contrast, screen reader testing
- **DOM Optimization**: minimize nesting, no redundant wrapper elements, inspect rendered output not just source
- **CSS/Token Discipline**: design tokens as single source of truth, responsive design, reduced-motion support
- **Touch Targets & Sizing**: WCAG 2.5.8 (24x24 minimum, 44x44 ideal)
- **Performance**: DOM size impact, CSS efficiency, layout stability (CLS)

### 4. Available Tooling in This Project
Document the MCP servers and when to use each:
- AccessLint MCP (static HTML auditing, diff verification)
- WCAG MCP (criterion lookup, technique search)
- ESLint MCP (JS/TS linting)
- Playwright MCP (live interaction, accessibility snapshots)
- a11y-mcp (axe-core live audits)
- Lighthouse MCP (full audits)
- Biome (built-in a11y rules)

### 5. Reference Resources
- WAI-ARIA Authoring Practices Guide (APG)
- The A11Y Project
- Inclusive Components (Heydon Pickering)
- GOV.UK Design System (gold standard for accessible components)
- Open UI (standard component behaviors)
- Radix UI / React Aria (headless accessible primitives)

### 6. Tamagui-Specific Gotchas
- The `tag` prop does NOT change rendered HTML element — use `styledHtml()` or native HTML elements
- `GetProps<>` index signature bugs — define props from scratch
- JSX token prop resolution issues — use `_jsx-compat.ts` pattern

## Scope
- **Creates**: `.ai-queue/_docs/front-of-frontend-guide.md`
- **Modifies**: nothing

## Quality Criteria
- Document should be actionable, not just theoretical
- Include code examples where helpful
- Keep it concise but comprehensive (target ~500-800 lines)
- Written for an AI agent audience (instructions that Claude can follow)
