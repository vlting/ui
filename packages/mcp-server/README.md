# @vlting/ui-mcp

MCP server for `@vlting/ui` design system intelligence. Works with Claude Code, Cursor, and any MCP-compatible client.

## Tools

| Tool | Description |
|------|-------------|
| `list_components` | List all components, filter by category or layer |
| `get_component` | Get full metadata (props, variants, guidance, accessibility) |
| `suggest_component` | Given a UI intent, suggest the best component(s) |
| `generate_code` | Generate boilerplate for a component or composition |
| `validate_code` | Check code against design system rules |
| `get_migration_mapping` | Get shadcn → @vlting/ui API mapping |
| `search_icons` | Search 3229 Remix Icons by name or category |

## Setup

### Claude Code

Add to your Claude Code MCP config (`.claude/mcp.json` or project settings):

```json
{
  "mcpServers": {
    "vlting-ui": {
      "command": "npx",
      "args": ["@vlting/ui-mcp"]
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "vlting-ui": {
      "command": "npx",
      "args": ["@vlting/ui-mcp"]
    }
  }
}
```

### Local development

```bash
cd packages/mcp-server
npm install
npm run build
npm start
```

## Examples

### Suggest a component

```
Tool: suggest_component
Input: { "intent": "I need a confirmation dialog for deleting an item" }
Output: AlertDialog (ranked first), Dialog, Sheet
```

### Validate code

```
Tool: validate_code
Input: { "code": "<Box backgroundColor=\"#f5f5f5\" padding={16}><Input /></Box>" }
Output: Issues — hardcoded color, pixel spacing, missing label
```

### Search icons

```
Tool: search_icons
Input: { "query": "home", "style": "line" }
Output: RiHomeLine, RiHome2Line, RiHome3Line, ...
```

## License

MIT
