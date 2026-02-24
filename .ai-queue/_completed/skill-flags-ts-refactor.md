# Commit History

- Files modified outside repo (user-level skill):
  - `~/.claude/skills/epic/references/feature-flags.md` — complete rewrite
  - `~/.claude/skills/epic/SKILL.md` — updated all flag references
  - `~/.claude/skills/epic/references/init.md` — updated seed step and summary

---

<!-- auto-queue -->
# Refactor Feature Flags: JSON → TypeScript Module

## Goal

Replace the 3 separate JSON files (`flags.dev.json`, `flags.staging.json`, `flags.prod.json`) with a single TypeScript module (`config/flags.ts`) that serves as the single source of truth for all feature flag definitions. Update the epic skill's documentation and behavior to match.

## Why

The current 3-file JSON approach has:
- **No single source of truth** — flag name, description, and `added` date are duplicated 3×
- **Drift risk** — an AI agent could add a flag to dev but miss staging, or typo a description
- **No type safety** — consuming code has no autocomplete or compile-time checks on flag names
- **No logic** — can't express "default to base value unless overridden"

## Scope

Files to **modify**:
- `~/.claude/skills/epic/references/feature-flags.md` — complete rewrite of flag format, schema, code patterns, lifecycle
- `~/.claude/skills/epic/SKILL.md` — update all references from 3 JSON files to single TS module

Files to **NOT modify** (no project code exists yet — the TS module is created at `epic init` time):
- No `config/flags.*.json` files exist in the repo to delete
- No `config/flags.ts` exists to create — the skill docs just describe what gets created

## Design: The New `config/flags.ts`

The epic skill should create this file during PLAN phase (step 4.5). Here is the exact template:

```ts
// config/flags.ts — Feature flag registry (managed by epic skill)
// Do not edit flag entries manually — use /epic to create and manage flags.

type Environment = 'dev' | 'staging' | 'prod';

interface FlagDefinition {
  description: string;
  added: string; // YYYY-MM-DD
  default: boolean;
  overrides?: Partial<Record<Environment, boolean>>;
}

const flagRegistry = {
  // ← new flags are inserted here (newest first)
} as const satisfies Record<string, FlagDefinition>;

// -- Derived types ----------------------------------------------------------

export type FlagName = keyof typeof flagRegistry;

// -- Runtime helper ----------------------------------------------------------

const ENV: Environment =
  (process.env.APP_ENV as Environment) ??
  (process.env.NODE_ENV === 'production' ? 'prod' : 'dev');

export function getFlag(name: FlagName, env: Environment = ENV): boolean {
  const flag = flagRegistry[name];
  return flag.overrides?.[env] ?? flag.default;
}

// -- Full registry export (for tooling / status commands) --------------------

export { flagRegistry };
```

### How a flag entry looks once added:

```ts
const flagRegistry = {
  kitchen_sink_a11y: {
    description: 'Accessibility overhaul for kitchen-sink example app',
    added: '2026-02-24',
    default: false, // prod default
    overrides: { dev: true, staging: true },
  },
} as const satisfies Record<string, FlagDefinition>;
```

### Conventions:
- `default` is the **prod** value (typically `false` for new flags)
- `overrides` only lists environments that differ from `default`
- New epic flags always get `default: false, overrides: { dev: true, staging: true }`
- When completing with `--keep-flag`, just change `default: true` and remove `overrides`
- When removing a flag, delete the entire entry from the registry object
- Newest flags first (highest in the object)

### How consuming code uses it:

```ts
import { getFlag } from '../config/flags';

if (getFlag('kitchen_sink_a11y')) {
  // new code path
} else {
  // legacy code path
}
```

Autocomplete works on the flag name. Typos are compile errors.

## Instructions

### Part 1: Rewrite `references/feature-flags.md`

Read the current file at `~/.claude/skills/epic/references/feature-flags.md` and rewrite it to document the new TS-based approach. Preserve the same section structure but update all content:

1. **Purpose** — same messaging, just note it's a single TS file now
2. **Flag File** — replace the 3-file table with a single `config/flags.ts` description. Include the full template from the Design section above.
3. **Flag Schema** — document the `FlagDefinition` interface, `FlagName` type, `getFlag()` helper. Explain `default` + `overrides` pattern.
4. **Flag Lifecycle** — update the table:
   - PLAN: add entry to `flagRegistry` with `default: false, overrides: { dev: true, staging: true }`
   - EXECUTE → PR: no change
   - COMPLETION (default): remove the entry + remove code guards
   - COMPLETION (--keep-flag): change to `default: true`, remove `overrides`
5. **How to Check a Flag in Code** — show `getFlag('flag_name')` pattern, note autocomplete
6. **How the Epic Skill Uses Flags** — update PLAN/BREAKDOWN/COMPLETION to reference single file
7. **Branching Strategy** — unchanged

### Part 2: Update `SKILL.md`

Read the current file at `~/.claude/skills/epic/SKILL.md` and make these targeted edits:

1. **Architecture > Feature Flags section** (around line 50-55):
   - Change `config/flags.{dev,staging,prod}.json` → `config/flags.ts`
   - Update description to mention single TS module with typed registry

2. **Phase 1: PLAN > Step 4.5** (around line 94-114):
   - Replace "Add the flag to all three environment files" with "Add the flag entry to the `flagRegistry` object in `config/flags.ts`"
   - Replace the 3-file table with: entry gets `default: false, overrides: { dev: true, staging: true }`
   - Update the git add/commit commands: `git add {flags_dir}/flags.ts` instead of `git add {flags_dir}/flags.*.json`
   - If `config/flags.ts` doesn't exist yet (first epic in the repo), create it from the template first, then add the flag entry

3. **Phase 8: COMPLETION > Step 1** (around line 397-428):
   - **Default (remove flag):** "Remove the epic's flag entry from the `flagRegistry` object in `config/flags.ts`" (not 3 files)
   - **With --keep-flag:** "Change the entry to `default: true` and remove the `overrides` property"
   - Update git add commands accordingly

4. **`epic status` output** (around line 458):
   - Change `Flag: {flag_name} (dev: ✓ | staging: ✓ | prod: ✗)` — keep this format, but the agent should read the values from the single TS file's entry (parse `default` and `overrides`)

5. **`epic abort` note** (around line 484):
   - Change "remove the flag entry from all env files" → "remove the flag entry from `config/flags.ts`"

### Validation

After making both edits, verify:
- No remaining references to `flags.dev.json`, `flags.staging.json`, or `flags.prod.json` in either file
- No remaining references to "three environment files" or "all three env files"
- All references to the flag file point to `config/flags.ts`
- The `references/feature-flags.md` template matches the Design section exactly
