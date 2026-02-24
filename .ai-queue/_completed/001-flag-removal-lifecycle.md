<!-- auto-queue -->
# Commit History

- Skill files modified (outside repo): `~/.claude/skills/epic/references/feature-flags.md`, `~/.claude/skills/epic/references/init.md`

---

# Feature Flag Removal Lifecycle + Init Label Update

## Context

The epic skill's `references/feature-flags.md` currently defines the COMPLETION phase as "flip flag to `true` in prod." The user wants the default to be **removing the flag entirely** (from all env files) plus removing code guards — to avoid dead code. The flag should only be kept if the user explicitly requests it (e.g., for client testing or gradual rollout).

Also, `references/init.md` should add a GitHub label for sub-issues (for task 002's sub-issue work).

**IMPORTANT:** These are skill configuration files in `~/.claude/skills/epic/`, NOT files in the current git repo. No worktree is needed. Edit the skill files directly. Archive this task file to `_completed/` with a descriptive commit message when done.

## Requirements

### 1. Update `references/feature-flags.md` — Flag Lifecycle table

Replace the current lifecycle table:

```
| Phase | Action | dev | staging | prod |
|-------|--------|-----|---------|------|
| PLAN (epic starts) | Create flag | true | true | false |
| EXECUTE → PR | Merge work behind flag | — | — | — |
| COMPLETION (epic done) | Flip flag | — | — | true |
| Retirement (later) | Remove flag + code guards | Remove entry | Remove entry | Remove entry |
```

With:

```
| Phase | Action | dev | staging | prod |
|-------|--------|-----|---------|------|
| PLAN (epic starts) | Create flag | `true` | `true` | `false` |
| EXECUTE → PR | Merge work behind flag | — | — | — |
| COMPLETION (default) | Remove flag + code guards | Remove entry | Remove entry | Remove entry |
| COMPLETION (--keep-flag) | Flip flag to true in prod | — | — | `true` |
```

### 2. Update `references/feature-flags.md` — Flag Retirement section

Replace the current "Flag retirement" paragraph:

> **Flag retirement** is a separate concern from the epic. Once a flag has been enabled in prod for long enough (weeks/months), the flag and its code guards should be removed in a cleanup task. The epic skill does NOT handle retirement — that's a manual `chore/` task.

With:

> **Default behavior (flag removal):** When an epic completes, the flag is **removed from all environment files** and all code guards (if/else branches checking the flag) are cleaned up in the same completion commit. This prevents dead code from accumulating. The code path that was behind the flag becomes the only code path.
>
> **Exception (`--keep-flag`):** If the user passes `--keep-flag` during completion (or the roadmap includes a `keep-flag: true` directive), the flag is **not removed**. Instead, it is flipped to `enabled: true` in `flags.prod.json`. This is useful when:
> - A client is actively testing the feature in a staged rollout
> - The feature needs a kill switch for safety (e.g., new payment flow)
> - The rollout is gradual (enable for some users, not all)
>
> When `--keep-flag` is used, flag retirement becomes a future `chore/` task once the flag is no longer needed.

### 3. Update `references/feature-flags.md` — How the Epic Skill Uses Flags

In the "During **COMPLETION** phase" section, replace:

> During **COMPLETION** phase (after PR merge):
> - Update `flags.prod.json` to set the epic's flag to `enabled: true`
> - Commit and push this change

With:

> During **COMPLETION** phase (after PR merge):
> - **Default:** Remove the flag entry from ALL three env files (`flags.dev.json`, `flags.staging.json`, `flags.prod.json`). Also remove all code guards (if/else branches) that check this flag — the "enabled" code path becomes the only path. Commit and push.
> - **With `--keep-flag`:** Instead of removing, set the flag to `enabled: true` in `flags.prod.json`. Leave the code guards in place. Commit and push.

### 4. Update `references/init.md` — Add `task` label

In Step 4 (Create GitHub labels), add a fourth label for sub-issues:

```bash
gh label create "task" --description "Sub-issue: atomic unit of work within a stage" --color "10B981" --repo OWNER/REPO --force
```

Also update Step 8 (Print summary) to include the new label:

```
Labels:  epic, stage, iteration, task
```

## Scope

- `~/.claude/skills/epic/references/feature-flags.md` — MODIFY
- `~/.claude/skills/epic/references/init.md` — MODIFY
