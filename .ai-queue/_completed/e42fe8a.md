# Commit History
- e42fe8a — Merge branch 'q/002-s4' into docs/component-parity/api-mapping
- 5a60e80 — docs(component-parity): add api-mapping.json for components Item through Typography

---
<!-- auto-queue -->
<!-- target-branch: docs/component-parity/api-mapping -->

# API Mapping Files: Components Item through Typography

Create api-mapping.json files for all remaining components from Item through Typography.

## Scope

**Components (create api-mapping.json in each):**
- `packages/components/Item/api-mapping.json`
- `packages/components/Loader/api-mapping.json`
- `packages/components/Menu/api-mapping.json`
- `packages/components/Menubar/api-mapping.json`
- `packages/components/NativeSelect/api-mapping.json`
- `packages/components/NavigationMenu/api-mapping.json`
- `packages/components/Pagination/api-mapping.json`
- `packages/components/Popover/api-mapping.json`
- `packages/components/Progress/api-mapping.json`
- `packages/components/RadioGroup/api-mapping.json`
- `packages/components/Resizable/api-mapping.json`
- `packages/components/ScrollArea/api-mapping.json`
- `packages/components/Select/api-mapping.json`
- `packages/components/Sheet/api-mapping.json`
- `packages/components/Sidebar/api-mapping.json`
- `packages/components/Slider/api-mapping.json`
- `packages/components/Switch/api-mapping.json`
- `packages/components/Table/api-mapping.json`
- `packages/components/Tabs/api-mapping.json`
- `packages/components/Textarea/api-mapping.json`
- `packages/components/Toast/api-mapping.json`
- `packages/components/Toggle/api-mapping.json`
- `packages/components/Tooltip/api-mapping.json`
- `packages/components/Typography/api-mapping.json`

## Context

- **Tech spec schema:** See `.ai-epics/docs/component-parity/tech-spec.md` for the api-mapping.json schema.
- Read each component's `.tsx` file and `index.ts` to understand its actual props and API.
- For shadcn equivalents, use common knowledge of shadcn/ui components. If a component has no direct shadcn equivalent, set `shadcn` to `null` and add a note.
- **Feature flag:** `component_parity`

## Instructions

Same schema as Segment 001. For EACH component listed above, create an `api-mapping.json` file:

```json
{
  "component": "ComponentName",
  "shadcn": {
    "import": "import { Component } from '@/components/ui/component'",
    "props": {
      "propName": { "type": "string", "values": ["val1", "val2"] }
    }
  },
  "vlting": {
    "import": "import { Component } from '@vlting/ui'",
    "props": {
      "propName": { "type": "string", "values": ["val1", "val2"], "mapping": { "shadcnVal": "vltingVal" } }
    }
  },
  "notes": ["Behavioral differences or migration tips"],
  "breaking": [
    { "shadcn": "className='...'", "vlting": "Use Tamagui style props", "reason": "Cross-platform support" }
  ]
}
```

**Key rules:**
1. Read the actual TypeScript types from each component's source file.
2. For components without shadcn equivalents (e.g., Item, Loader, NativeSelect, Sidebar), set `"shadcn": null`.
3. For Toast, include BOTH the declarative API (Toast.Root etc.) AND the imperative API (toast(), toast.success(), etc.) in the vlting section.
4. Common breaking difference for ALL: `className` → Tamagui style props.
5. Keep JSON valid and consistently formatted.

## Verification

- All created files are valid JSON
- Each file follows the schema consistently
- No duplicate or missing components in this batch

## Task Progress
<!-- lat: 2026-03-02T02:12:17Z -->
<!-- agent-pid: 36295 -->
<!-- worktree: .worktrees/q-002s4 -->
<!-- branch: q/002-s4 -->

### Checklist
- [ ] **ACTIVE** → Create api-mapping.json for all components Item through Typography
- [ ] Verify all JSON files are valid
- [ ] Commit and merge

### Handoff Context
- 24 components to create api-mapping.json for
- Need to read each component's actual props from its .tsx file
