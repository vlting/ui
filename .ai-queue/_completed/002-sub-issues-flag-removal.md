<!-- auto-queue -->
<!-- depends-on: 001 -->
# Commit History

- Skill files modified (outside repo): `~/.claude/skills/epic/SKILL.md`, `~/.claude/skills/epic/references/architecture.md`

---

# GitHub Sub-Issues + Flag Removal: SKILL.md & Architecture Integration

## Context

This task makes two integrated changes to SKILL.md:

1. **GitHub sub-issues:** The epic currently creates a single GitHub issue with a checklist of stages. This makes it hard to differentiate between individual tasks completing vs. the whole epic completing. We need to create **sub-issues** for each stage so they can be tracked, assigned, and closed independently.

2. **Feature flag removal on completion:** Task 001 updated the flag lifecycle documentation in `references/feature-flags.md`. This task updates SKILL.md's Phase 8 (COMPLETION) to implement that change — default to removing the flag + code guards, with a `--keep-flag` escape hatch.

**IMPORTANT:** These are skill configuration files in `~/.claude/skills/epic/`, NOT files in the current git repo. No worktree is needed. Edit the skill files directly. Archive this task file to `_completed/` with a descriptive commit message when done.

## Requirements

### 1. Update Phase 1 Step 6 — Create GitHub Issue + Sub-Issues

The current Step 6 creates a single epic issue. After creating the parent epic issue, create a sub-issue for each stage.

Replace the current Step 6 with:

```markdown
6. **Create the epic GitHub Issue and stage sub-issues.**

   First, create the **parent epic issue**:
   \```bash
   gh issue create \
     --title "Epic: {title}" \
     --label "epic" \
     --repo OWNER/REPO \
     --body "$(cat <<'EOF'
   ## {title}

   **Roadmap:** \`.ai-queue/_roadmaps/YYYY-MM-DD-{slug}.md\`
   **Branch:** \`<prefix>/{slug}\`
   **Feature flag:** \`{flag_name}\` (disabled in prod until epic completes)

   ### Stages
   - [ ] Stage 1: {title}
   - [ ] Stage 2: {title}
   ...

   ### Acceptance Criteria
   - [ ] All tests pass
   - [ ] Accessibility audits pass
   - [ ] PR(s) under 999 lines each
   EOF
   )"
   \```

   Capture the parent issue number: `EPIC_ISSUE_NUMBER`.

   Then, create a **sub-issue for each stage**:
   \```bash
   gh issue create \
     --title "Stage {N}: {stage title}" \
     --label "stage" \
     --repo OWNER/REPO \
     --body "$(cat <<'EOF'
   **Parent epic:** #{EPIC_ISSUE_NUMBER}
   **Branch:** \`<prefix>/{slug}\`
   **Feature flag:** \`{flag_name}\`

   ## Objective
   {stage objective from roadmap}

   ## Acceptance Criteria
   - [ ] {criterion 1}
   - [ ] {criterion 2}
   EOF
   )"
   \```

   After creating each sub-issue, set it as a sub-issue of the parent:
   \```bash
   gh issue edit <SUB_ISSUE_NUMBER> --add-parent EPIC_ISSUE_NUMBER --repo OWNER/REPO
   \```

   > **Note:** If `gh issue edit --add-parent` is not available (older gh version),
   > use the GitHub API: `gh api repos/OWNER/REPO/issues/SUB_ISSUE/sub_issues -f sub_issue_id=PARENT_ID`
   > or fall back to just adding "Parent: #EPIC_ISSUE_NUMBER" in the sub-issue body.

   Update the roadmap file with both the epic issue number and each stage's sub-issue number.
```

### 2. Update Phase 1 Step 5 — Roadmap File

Add sub-issue tracking to each stage in the roadmap template:

```markdown
## Stage 1: {title}
**Objective:** {what this stage accomplishes}
**Estimated scope:** ~N files, ~N lines
**GitHub Sub-Issue:** #{sub_issue_number}   ← filled after step 6
**Acceptance criteria:**
- [ ] {criterion 1}
- [ ] {criterion 2}
**Status:** pending
**Iterations:** 0
```

### 3. Update Phase 6: ADVANCE

When a stage is marked complete, close its sub-issue:

Add after step 1 ("Update the roadmap"):

```markdown
1.5. **Close the stage sub-issue.**
   \```bash
   gh issue close <STAGE_SUB_ISSUE_NUMBER> --repo OWNER/REPO \
     --comment "Stage completed. All acceptance criteria met."
   \```
```

### 4. Update Phase 5: ITERATE

When queuing fix tasks during iteration, the fix task instructions should reference the stage sub-issue for traceability.

In step 4 (Queue fix tasks), add a note:

```markdown
   Include the stage sub-issue number in the fix task description for traceability
   (e.g., "Fixes for Stage 2 (#42): ...").
```

### 5. Update Phase 8: COMPLETION — Flag Removal

Replace the current Step 1 ("Flip the feature flag in prod") with:

```markdown
1. **Remove or preserve the feature flag.**

   Read the `flags_dir` from project-setup.md.

   **Default (remove flag):** Remove the epic's flag entry from all three environment
   files (`flags.dev.json`, `flags.staging.json`, `flags.prod.json`). Then remove all
   code guards that check this flag — the "enabled" code path becomes the only code path.
   The "disabled" (legacy) code path is deleted.

   \```bash
   # On main, after PR merge
   git pull origin main
   # Remove the flag entry from all env files
   # Remove code guards (if/else blocks checking this flag) — keep only the "enabled" branch
   git add .
   git commit -m "chore(<slug>): remove {flag_name} feature flag — shipped to production"
   git push
   \```

   **With `--keep-flag`:** If the user explicitly requests to keep the flag (e.g., for
   client testing or gradual rollout), or if the roadmap file contains `keep-flag: true`,
   flip the flag instead of removing it:

   \```bash
   git pull origin main
   # Set the flag to enabled: true in flags.prod.json only
   git add {flags_dir}/flags.prod.json
   git commit -m "chore(<slug>): enable {flag_name} in production"
   git push
   \```

   See `references/feature-flags.md` for the full flag lifecycle.
```

### 6. Update Phase 8: COMPLETION — Close Sub-Issues

Add after the flag step:

```markdown
1.5. **Close any remaining open stage sub-issues.**
   If any stage sub-issues are still open (e.g., the final stage), close them:
   \```bash
   # For each open stage sub-issue
   gh issue close <SUB_ISSUE_NUMBER> --repo OWNER/REPO \
     --comment "Epic completed and merged to main."
   \```
```

### 7. Update `epic status`

Add sub-issue info to the status output:

```
Stages:
  1. {title} — {status} (N iterations) — #{sub_issue_number}
  2. {title} — {status} — #{sub_issue_number}
  ...
```

### 8. Update `epic abort`

Update the abort note about feature flags:

Replace:
> **Note:** The feature flag remains in the flag files. If flagged code was already merged to main, consider removing the flag and its code guards in a cleanup chore.

With:
> **Note:** The feature flag and any code guards remain in the codebase. If flagged code was already merged to main, queue a `chore/` task to remove the flag entry from all env files and strip the code guards (keeping only the legacy/disabled code path, since the feature is being abandoned).

Also close all stage sub-issues with an "Epic aborted" comment.

### 9. Update Roadmap File Format

Add `**GitHub Sub-Issue:**` to each stage template (as shown in requirement 2).

### 10. Update `references/architecture.md`

In **Section 5: Human Auditability**, add a subsection after "Feature Flag Safety Net" (or after "Instruction Files as Audit Trail"):

```markdown
### GitHub Issue Hierarchy

Each epic creates a hierarchy of GitHub issues for tracking:

\```
Epic Issue (#10) — "Epic: Dark Mode Support"  [label: epic]
├── Sub-Issue (#11) — "Stage 1: Theme tokens"  [label: stage]
├── Sub-Issue (#12) — "Stage 2: Component theming"  [label: stage]
└── Sub-Issue (#13) — "Stage 3: Toggle + persistence"  [label: stage]
\```

- The **epic issue** tracks the overall initiative and links to the roadmap file
- **Stage sub-issues** track individual stages and their acceptance criteria
- Sub-issues are closed as stages complete (Phase 6: ADVANCE)
- The epic issue auto-closes when the PR merges (via `Closes #N` in the PR body)
- Task-level tracking (segments within a stage) remains in `.ai-queue/` files — these are too granular for GitHub issues
```

### 11. Bump the version

Update YAML frontmatter version from `2.0.0` to `2.1.0` (minor version — new capabilities, no breaking changes).

## Scope

- `~/.claude/skills/epic/SKILL.md` — MODIFY
- `~/.claude/skills/epic/references/architecture.md` — MODIFY
