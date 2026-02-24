<!-- auto-queue -->
# Commit History

- Added `.claude/settings.json` with deny rules for lock files and archived queue tasks
- Updated `.gitignore` to un-ignore `.claude/settings.json`

---

# Add AI Ignore Rules to Reduce Token Cost

## Context

The project needs a way to tell AI agents to ignore certain files/directories that add token cost and complexity. Claude Code's native mechanism for this is **permission deny rules** in `.claude/settings.json`.

Currently:
- `.gitignore` already excludes `node_modules/`, `dist/`, `.tamagui/`, `coverage/` — Claude respects `.gitignore` by default, so these are already handled
- `.claude/` is listed in `.gitignore`, which means `.claude/settings.json` is NOT committed/shared
- `.claude/settings.local.json` exists with personal allow rules but no deny rules

## Requirements

### 1. Un-ignore `.claude/settings.json` in `.gitignore`

Add an exception to `.gitignore` so the project-level settings file is committed and shared, while keeping everything else in `.claude/` gitignored:

```
.claude/
!.claude/settings.json
```

The `!` prefix un-ignores a specific file. This keeps `.claude/settings.local.json`, `.claude/worktrees/`, and other local files gitignored.

### 2. Create `.claude/settings.json` with deny rules

Create a committed `.claude/settings.json` with deny rules for paths that are costly and rarely useful. **Do NOT include allow rules** — those belong in `.claude/settings.local.json` (personal, gitignored).

Suggested deny patterns (adapt based on what actually exists in the repo):

```json
{
  "permissions": {
    "deny": [
      "Read(yarn.lock)",
      "Read(package-lock.json)",
      "Read(pnpm-lock.yaml)",
      "Read(bun.lock)",
      "Read(.ai-queue/_completed/**)"
    ]
  }
}
```

**Rationale for each:**

| Pattern | Why ignore |
|---------|-----------|
| `yarn.lock` / `package-lock.json` / `pnpm-lock.yaml` / `bun.lock` | Massive files (thousands of lines), almost never useful for AI tasks. If dependency resolution is needed, the agent can read `package.json` instead. |
| `.ai-queue/_completed/**` | Archived task files — dozens/hundreds of old instruction files that add noise. The agent only needs active queue files. |

**Patterns NOT included (already in .gitignore):**
- `node_modules/` — already gitignored, Claude skips it
- `dist/` — already gitignored
- `.tamagui/` — already gitignored
- `coverage/` — already gitignored
- `.env` / `.env.*` — already gitignored

**Patterns to consider but may not apply — check before adding:**
- `Read(.history/**)` — if this directory exists and is large
- `Read(**/*.min.js)` — minified files, if any exist outside `dist/`
- `Read(**/*.map)` — source maps, if any exist outside `dist/`

### 3. Verify both settings files work together

Claude Code merges project settings (`settings.json`) with local settings (`settings.local.json`). Confirm that the allow rules in `.local` and the deny rules in the committed file don't conflict. Deny rules take precedence over allow rules, so there shouldn't be an issue — but verify by checking `Read(*)` in allow doesn't override specific `Read(...)` deny patterns.

### 4. Add a note in CLAUDE.md

If `CLAUDE.md` exists at the repo root, add a brief note explaining the ignore setup so future contributors understand:

```markdown
## AI File Ignore Rules

Permission deny rules in `.claude/settings.json` prevent AI from reading high-cost, low-value files (lock files, archived queue tasks). These work alongside `.gitignore` — Claude already skips gitignored paths by default.

To add personal allow/deny rules, use `.claude/settings.local.json` (gitignored).
```

If `CLAUDE.md` does not exist, skip this step.

## Scope

- `.gitignore` — MODIFY (add `!.claude/settings.json` exception)
- `.claude/settings.json` — NEW (committed deny rules)
- `CLAUDE.md` — MODIFY (if it exists; add brief note)
