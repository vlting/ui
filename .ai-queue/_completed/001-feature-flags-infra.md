<!-- auto-queue -->
# Commit History

- Skill files created (outside repo): `~/.claude/skills/epic/config/flags.json`, `~/.claude/skills/epic/references/feature-flags.md`

---

# Feature Flags Infrastructure for the Epic Skill

## Context

The `epic` skill at `~/.claude/skills/epic/` needs a feature flagging system so that new capabilities can be introduced incrementally and toggled on/off. This is the foundation for gating future behavior changes (e.g., branch prefix routing).

**IMPORTANT:** These are skill configuration files in `~/.claude/skills/epic/`, NOT files in the current git repo. No worktree is needed. Edit the skill files directly. For the queue lifecycle, just archive this task file to `_completed/` with a descriptive commit message when done.

## Requirements

### 1. Create `config/flags.json`

Create `~/.claude/skills/epic/config/flags.json` with the following schema:

```json
{
  "branch_prefix_routing": {
    "enabled": true,
    "description": "Route epic branches to feat/, fix/, chore/, or docs/ prefixes based on goal classification",
    "added": "2026-02-24"
  }
}
```

**Schema rules:**
- Top-level keys are flag names (snake_case)
- Each flag has exactly three properties:
  - `"enabled"`: boolean — whether the feature is active
  - `"description"`: string — brief, AI-generated description of the feature (1 sentence max)
  - `"added"`: string — human-legible date in `YYYY-MM-DD` format
- **Sort order:** newest flags at the top of the file (most recent `added` date first)
- The file should be valid, pretty-printed JSON (2-space indent)

**Initial flag to include:**
- `branch_prefix_routing` — enabled: `true`, added: `2026-02-24`
  - Description: "Route epic branches to feat/, fix/, chore/, or docs/ prefixes based on goal classification"

### 2. Create `references/feature-flags.md`

Create `~/.claude/skills/epic/references/feature-flags.md` documenting the feature flag system:

1. **Purpose** — Why feature flags exist (incremental rollout of new epic capabilities)
2. **File location** — `config/flags.json` relative to the skill root
3. **Schema** — Document the three-property schema (enabled, description, added)
4. **Sort order** — Newest flags at the top
5. **How to check a flag** — Provide a code/pseudocode pattern for reading flags.json and checking if a flag is enabled. Since this is a skill (markdown instructions for an AI agent), the "code" is really procedural instructions like:
   - Read `~/.claude/skills/epic/config/flags.json`
   - Parse the JSON
   - Check if `flags[flag_name].enabled` is `true`
   - If true, use the new behavior; if false, use the legacy behavior
6. **How to add a new flag** — Instructions for adding a flag:
   - Add a new entry at the TOP of the JSON object
   - Set `added` to today's date
   - Set `enabled` to `false` initially (unless the feature is ready for immediate use)
   - Write a brief description
7. **How to retire a flag** — When a flag has been enabled long enough and the legacy path is no longer needed, remove the flag entry and hardcode the new behavior

### 3. Verify the JSON is valid

After creating `config/flags.json`, validate it's parseable JSON (e.g., `python3 -c "import json; json.load(open('...'))"` or `node -e "JSON.parse(...)"`).

## Scope

- `~/.claude/skills/epic/config/flags.json` — NEW
- `~/.claude/skills/epic/references/feature-flags.md` — NEW
