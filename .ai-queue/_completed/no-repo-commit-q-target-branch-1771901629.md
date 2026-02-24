<!-- auto-queue -->
# Commit History
- No repo commit (file edited is `~/.claude/skills/q/SKILL.md`, outside this repo)
- Q v6.0.0 → v6.1.0: Added target-branch directive, Queue File Directives section, Target Branch Resolution in task execution

# Add Feature Branch Support to Q v6

## Objective

Extend Q v6's merge lifecycle to support merging worktrees to a configurable **feature branch** (not just the current branch). This is needed for the `epic` skill, where segments merge to `feat/<slug>` rather than `main`.

## Scope

- `~/.claude/skills/q/SKILL.md` (additive change)

> **NOTE:** This file is outside the repo (global Claude skill). Do NOT use a worktree for this task. Edit the file directly and commit the queue instruction file archival to the repo only.

## Changes Required

### 1. Target Branch Directive

Add support for a `<!-- target-branch: feat/kitchen-sink -->` directive in queue instruction files. When present:

- The worktree should be branched off the target branch (not the current branch)
- After work is complete, the worktree merges back to the target branch (not main)
- The rebase-before-merge step rebases onto the target branch

### 2. Update the Internal Task Execution Section

In the "Internal: Task Execution in Worker Tree" section, update the merge lifecycle:

**Before step 1 (creating the worktree):**
- Check if the instruction file contains `<!-- target-branch: <branch> -->`
- If present, use `<branch>` as the base for `git worktree add` and as the merge target
- If absent, use the current branch (existing behavior)

**Update the rebase step:**
```bash
# If target-branch directive exists:
git rebase origin/<target-branch>
# Otherwise (default):
git rebase origin/main
```

**Update the merge step:**
```bash
# If target-branch directive exists:
git checkout <target-branch>
git merge <worktree-branch> --no-ff
# Otherwise (default):
git checkout main
git merge <worktree-branch> --no-ff
```

### 3. Document the Directive

Add a brief section explaining the `target-branch` directive near the file naming convention section, since it's a queue file feature.

## Acceptance Criteria

- [ ] `<!-- target-branch: feat/... -->` directive documented
- [ ] Merge lifecycle updated to respect the directive
- [ ] Default behavior (no directive) unchanged
- [ ] ~20-30 lines added to SKILL.md
