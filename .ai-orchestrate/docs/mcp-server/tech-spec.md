# Tech Spec: MCP Server

## Overview
MCP server exposing @vlting/ui design system intelligence. Compatible with Claude Code, Cursor, and any MCP client.

## Package
Location: `packages/mcp-server/`
Published as: `@vlting/ui-mcp` (npm)
Runtime: Node.js, uses `@modelcontextprotocol/sdk`

## Tools

### list_components
List all components with categories and brief descriptions.
- Input: `{ category?: string, layer?: 'primitive' | 'component' | 'block' }`
- Output: Array of `{ name, category, layer, description, platforms }`
- Source: `docs/ai/registry.json`

### get_component
Get full component metadata.
- Input: `{ name: string }`
- Output: Full registry entry (props, variants, whenToUse, examples, accessibility, migration)
- Source: `docs/ai/registry.json`

### suggest_component
Given a UI intent, suggest best component(s).
- Input: `{ intent: string }` (e.g., "show a confirmation dialog")
- Output: Array of `{ name, reason, example }` ranked by fit
- Source: Decision trees from SKILL.md encoded as lookup rules

### generate_code
Generate boilerplate for a component or composition.
- Input: `{ component: string, props?: Record<string, any>, children?: string }`
- Output: `{ code: string, imports: string[] }`
- Source: Templates derived from registry examples

### validate_code
Check code against design system rules.
- Input: `{ code: string }`
- Output: `{ valid: boolean, issues: Array<{ rule, message, line?, suggestion }> }`
- Rules: hardcoded colors, missing ARIA, wrong component, non-token spacing, web-only in cross-platform, bare children in compound components

### get_migration_mapping
Get shadcn → vlting mapping.
- Input: `{ component: string }`
- Output: API mapping entry from `api-mappings.json`

### search_icons
Search Remix Icons by name or category.
- Input: `{ query: string, category?: string, style?: 'line' | 'fill', limit?: number }`
- Output: Array of `{ name, importName, category, style }`
- Source: Icon data from `packages/icons/`

## Architecture
```
packages/mcp-server/
  src/
    index.ts          — MCP server entry, tool registration
    tools/
      list-components.ts
      get-component.ts
      suggest-component.ts
      generate-code.ts
      validate-code.ts
      get-migration.ts
      search-icons.ts
    data/
      registry.ts     — loads registry.json
      mappings.ts     — loads api-mappings.json
      icons.ts        — loads icon index
      suggestions.ts  — decision tree rules
      validation.ts   — validation rules
  package.json
  tsconfig.json
```

## Stages

### Stage 1: Foundation + Read Tools
- Package scaffold, MCP SDK setup
- `list_components`, `get_component`, `get_migration_mapping`, `search_icons`
- These are pure lookups against existing data

### Stage 2: Intelligence Tools
- `suggest_component` — decision tree matching
- `generate_code` — template-based code generation
- `validate_code` — rule-based validation

### Stage 3: Package + Integration
- npm publish config
- README with setup instructions for Claude Code, Cursor
- Integration tests
