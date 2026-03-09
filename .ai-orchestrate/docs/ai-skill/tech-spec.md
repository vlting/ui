# Tech Spec: AI Skill + Portable Docs

## Overview
Create machine-readable documentation that teaches AI agents how to use `@vlting/ui` correctly and efficiently.

## Deliverables

### 1. SKILL.md (Claude Code Skill)
Location: `docs/ai/SKILL.md` (shipped with package)

**Sections:**
- **Library overview** — what it is, architecture, packages
- **Component selection heuristics** — decision trees for "I need a modal" → Dialog vs Sheet vs Drawer vs AlertDialog
- **Composition rules** — how components combine (Form.Field + Input + Label, Card + CardHeader + CardContent, etc.)
- **Layout conventions** — Stack vs Box, spacing tokens, responsive patterns
- **Token enforcement** — never hardcode colors/spacing/radii, always use tokens, how theming works
- **Anti-patterns** — common mistakes (wrong component choice, hardcoded values, missing a11y, web-only APIs on RN)
- **Brand awareness** — how to write brand-agnostic code, brand switching
- **Cross-platform** — what works on both web + RN, what's web-only
- **Accessibility defaults** — required ARIA, keyboard expectations

**Source data:** API mapping JSONs (52 files), .spec.md files, component source code

### 2. Component Registry JSON
Location: `docs/ai/registry.json`

**Structure per component:**
```json
{
  "name": "Button",
  "category": "interactive",
  "import": "@vlting/ui",
  "subpath": "@vlting/ui/components",
  "props": { ... },
  "variants": { ... },
  "examples": [ ... ],
  "whenToUse": "...",
  "whenNotToUse": "...",
  "relatedComponents": ["ButtonGroup", "IconButton"],
  "accessibility": { "role": "button", "keyboard": ["Enter", "Space"] },
  "platforms": ["web", "native"]
}
```

Covers: all 52 components, 20 primitives, 10 blocks, 8 chart types

### 3. llms.txt + llms-full.txt
Location: `docs/ai/llms.txt`, `docs/ai/llms-full.txt`

**llms.txt** — concise overview (~2-3KB):
- Library name, purpose, install
- Component categories with names
- Key concepts (tokens, brands, cross-platform)
- Links to full docs

**llms-full.txt** — comprehensive (~50-100KB):
- Full component reference with props
- Usage examples for every component
- Decision trees
- Anti-patterns
- Migration from shadcn

## Implementation Notes
- Auto-generate registry from existing API mapping JSONs where possible
- SKILL.md should be human-readable but optimized for AI context windows
- llms.txt follows https://llmstxt.org convention
