#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { handleListComponents } from './tools/list-components.js'
import { handleGetComponent } from './tools/get-component.js'
import { handleGetMigration } from './tools/get-migration.js'
import { handleSearchIcons } from './tools/search-icons.js'
import { handleSuggestComponent } from './tools/suggest-component.js'
import { handleGenerateCode } from './tools/generate-code.js'
import { handleValidateCode } from './tools/validate-code.js'

const server = new McpServer({
  name: '@vlting/ui-mcp',
  version: '0.1.0',
})

server.tool(
  'list_components',
  'List all @vlting/ui components, optionally filtered by category or layer',
  {
    category: z.string().optional().describe(
      'Filter by category: layout, forms, interactive, overlay, feedback, data-display, navigation, typography, disclosure, utility, composition, media, accessibility'
    ),
    layer: z.string().optional().describe(
      'Filter by layer: primitive, component, block'
    ),
  },
  async (args) => ({
    content: [{ type: 'text' as const, text: JSON.stringify(handleListComponents(args), null, 2) }],
  })
)

server.tool(
  'get_component',
  'Get full metadata for a specific @vlting/ui component (props, variants, usage guidance, accessibility, migration)',
  {
    name: z.string().describe('Component name (e.g., "Button", "Card", "AuthBlock")'),
  },
  async (args) => ({
    content: [{ type: 'text' as const, text: JSON.stringify(handleGetComponent(args), null, 2) }],
  })
)

server.tool(
  'get_migration_mapping',
  'Get shadcn/ui → @vlting/ui API mapping for a component (props, imports, breaking changes)',
  {
    component: z.string().describe('Component name (e.g., "Button", "Dialog", "Select")'),
  },
  async (args) => ({
    content: [{ type: 'text' as const, text: JSON.stringify(handleGetMigration(args), null, 2) }],
  })
)

server.tool(
  'search_icons',
  'Search @vlting/ui Remix Icons by name or category (3229 icons available)',
  {
    query: z.string().optional().describe('Search term (e.g., "home", "arrow", "settings")'),
    category: z.string().optional().describe(
      'Icon category: arrows, buildings, business, communication, design, development, device, document, editor, finance, food, logos, map, media, others, system, user-and-faces, weather'
    ),
    style: z.enum(['line', 'fill']).optional().describe('Icon style: line (outline) or fill (solid)'),
    limit: z.number().optional().describe('Max results (default 20)'),
  },
  async (args) => ({
    content: [{ type: 'text' as const, text: JSON.stringify(handleSearchIcons(args), null, 2) }],
  })
)

server.tool(
  'suggest_component',
  'Given a UI intent description, suggest the best @vlting/ui component(s) to use',
  {
    intent: z.string().describe('UI intent description (e.g., "show a confirmation dialog", "date picker", "sidebar navigation")'),
  },
  async (args) => ({
    content: [{ type: 'text' as const, text: JSON.stringify(handleSuggestComponent(args), null, 2) }],
  })
)

server.tool(
  'generate_code',
  'Generate boilerplate code for a @vlting/ui component or composition',
  {
    component: z.string().describe('Component name (e.g., "Card", "Dialog", "AuthBlock")'),
    props: z.record(z.unknown()).optional().describe('Props to set on the component'),
    children: z.string().optional().describe('Children content string'),
  },
  async (args) => ({
    content: [{ type: 'text' as const, text: JSON.stringify(handleGenerateCode(args), null, 2) }],
  })
)

server.tool(
  'validate_code',
  'Validate code against @vlting/ui design system rules (tokens, accessibility, anti-patterns)',
  {
    code: z.string().describe('The code to validate'),
  },
  async (args) => ({
    content: [{ type: 'text' as const, text: JSON.stringify(handleValidateCode(args), null, 2) }],
  })
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((err) => {
  console.error('MCP server error:', err)
  process.exit(1)
})
