<!-- auto-queue -->
# Commit History

- Skill files modified (outside repo): `~/.claude/skills/epic/references/feature-flags.md`, `~/.claude/skills/epic/references/init.md`

---

# Feature Flags: Documentation + Init Procedure

## Context

The `epic` skill needs to support **project-level feature flags** — flags that live in the project's git repo and gate new work so it can be shipped incrementally. Each epic creates a feature flag for its work. The flag is enabled in dev/staging but **disabled in prod** by default. When the epic is considered done, the flag is flipped to `true` in prod.

This enables a more flexible branching strategy: because new work is behind a flag, you can safely merge partial implementations to `main`, use smaller `fix/` and `chore/` branches for iteration, and ship incremental PRs — all without exposing half-finished features to production users.

**IMPORTANT:** These are skill configuration files in `~/.claude/skills/epic/`, NOT files in the current git repo. No worktree is needed. Edit the skill files directly. For the queue lifecycle, just archive this task file to `_completed/` with a descriptive commit message when done.

## Requirements

### 1. Create `references/feature-flags.md`

Create `~/.claude/skills/epic/references/feature-flags.md` documenting the project-level feature flag system:

#### 1a. Purpose

Feature flags allow the epic skill to ship work incrementally and safely. When an epic starts, a feature flag is created for that epic's work. All new behavior introduced by the epic is gated behind this flag. This means:

- **Partial implementations can merge to `main`** — the flag is off in prod, so users never see unfinished work
- **Smaller, more targeted branches** — instead of one massive feature branch, work can be split across multiple smaller PRs
- **Iteration branches (fix/, chore/) can merge independently** — fixes to flagged code are safe to ship because the code path is disabled in prod
- **Controlled rollout** — when the epic is complete, flip the flag in staging first, then prod

#### 1b. Flag Files — Per-Environment

Three JSON files in the project repo, one per environment:

| File | Environment | Default for new flags |
|------|------------|----------------------|
| `config/flags.dev.json` | Development | `enabled: true` |
| `config/flags.staging.json` | Staging | `enabled: true` |
| `config/flags.prod.json` | Production | `enabled: false` |

**Location convention:** `config/` directory at the project root. This path is configured during `epic init` and stored in `project-setup.md` (see init procedure).

#### 1c. Flag Schema

Each flag file is a JSON object. Keys are flag names (snake_case, derived from the epic slug). Each flag has exactly three properties:

```json
{
  "kitchen_sink_a11y": {
    "enabled": true,
    "description": "Accessibility overhaul for kitchen-sink example app",
    "added": "2026-02-24"
  },
  "auth_overhaul": {
    "enabled": false,
    "description": "Redesigned authentication flow with OAuth2 support",
    "added": "2026-02-20"
  }
}
```

**Rules:**
- `"enabled"`: boolean — whether the feature is active in this environment
- `"description"`: string — brief, human-readable description (1 sentence max). AI-generated during PLAN phase.
- `"added"`: string — date the flag was created, `YYYY-MM-DD` format
- **Sort order:** Newest flags at the top (most recent `added` date first)
- Flag names are `snake_case` versions of the epic slug (e.g., `kitchen-sink-a11y` → `kitchen_sink_a11y`)

#### 1d. Flag Lifecycle

| Phase | Action | dev | staging | prod |
|-------|--------|-----|---------|------|
| PLAN (epic starts) | Create flag | `true` | `true` | `false` |
| EXECUTE → PR | Merge work behind flag | — | — | — |
| COMPLETION (epic done) | Flip flag | — | — | `true` |
| Retirement (later) | Remove flag + code guards | Remove entry | Remove entry | Remove entry |

**Flag retirement** is a separate concern from the epic. Once a flag has been enabled in prod for long enough (weeks/months), the flag and its code guards should be removed in a cleanup task. The epic skill does NOT handle retirement — that's a manual `chore/` task.

#### 1e. How to Check a Flag in Code

Document that the specific pattern depends on the project's tech stack. Common patterns:

**TypeScript/JavaScript:**
```ts
import flags from '../config/flags.prod.json'
// or dynamically: import(`../config/flags.${process.env.APP_ENV}.json`)

if (flags.new_auth_flow?.enabled) {
  // new code path
} else {
  // legacy code path
}
```

**The epic skill does NOT generate code guards.** It only manages the flag files. Developers (or AI agents following task instructions) are responsible for wrapping new code in flag checks where appropriate. The task instruction files generated during BREAKDOWN should mention the flag name and remind the implementing agent to gate new behavior behind it.

#### 1f. How the Epic Skill Uses Flags

During **PLAN** phase:
1. Derive a flag name from the epic slug: `kebab-case` → `snake_case`
2. Add the flag to all three environment files (dev: true, staging: true, prod: false)
3. Record the flag name in the roadmap file

During **BREAKDOWN** phase:
- Include the flag name in task instructions so implementing agents know to gate new behavior behind it

During **COMPLETION** phase (after PR merge):
- Update `flags.prod.json` to set the epic's flag to `enabled: true`
- Commit and push this change

#### 1g. Branching Strategy Enabled by Flags

Because work is behind a feature flag, the epic can use a more flexible branching strategy:

| Prefix | When to use | Example |
|--------|------------|---------|
| `feat/` | New feature implementation (default for epics) | `feat/dark-mode` |
| `fix/` | Bug fixes — to flagged code or existing code | `fix/dark-mode-contrast` |
| `chore/` | Maintenance, refactoring, tooling, deps | `chore/dark-mode-cleanup` |
| `docs/` | Documentation-only changes | `docs/dark-mode-api` |

**Routing rules:**
- The **first branch** of an epic is typically `feat/<slug>` — it introduces the flag and initial implementation
- **Subsequent branches** may use any prefix depending on the nature of the work
- All branches can merge to `main` independently (safe because the flag is off in prod)
- The epic's segment worktree branches inherit the current branch prefix: `feat/<slug>/001`, `fix/<slug>-detail/001`, etc.

**This is the default behavior for all epics** — not conditional on any meta-flag. Every epic creates a feature flag.

### 2. Update `references/init.md`

Add a new step to the `epic init` procedure to set up flag files in the project.

#### Add Step 3.5: Create flag file directory and seed files

After step 3 (Create directory structure) and before step 4 (Create GitHub labels), add:

```markdown
### 3.5. Create feature flag files

Create the flag directory and seed empty flag files for each environment:

\```bash
mkdir -p config
echo '{}' > config/flags.dev.json
echo '{}' > config/flags.staging.json
echo '{}' > config/flags.prod.json
\```

If these files already exist (project already uses feature flags), skip this step.
```

#### Update Step 6: Add flag path to `project-setup.md`

Add a new field to the YAML frontmatter:

```yaml
---
owner: OWNER
repo: REPO
project_number: PROJECT_NUMBER
flags_dir: config
created: YYYY-MM-DD
---
```

The `flags_dir` field tells the epic skill where to find flag files. Default: `config`.

Also add to the markdown body:

```markdown
- **Feature flags:** config/flags.{dev,staging,prod}.json
```

#### Update Step 8: Print summary

Add flags info to the summary output:

```
Flags:   config/flags.{dev,staging,prod}.json
```

## Scope

- `~/.claude/skills/epic/references/feature-flags.md` — NEW
- `~/.claude/skills/epic/references/init.md` — MODIFY
