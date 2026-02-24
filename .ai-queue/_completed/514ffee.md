<!-- auto-queue -->
<!-- depends-on: 001, 002, 003 -->
# Commit History
- 514ffee — fix(examples): add focus-visible rings to kitchen-sink navigation
- PR #2: https://github.com/vlting/ui/pull/2
- GH Issue #1: https://github.com/vlting/ui/issues/1
- GH Project board: https://github.com/orgs/vlting/projects/1
- Feature branch: feat/focus-indicators (pushed to origin)

## Workflow Validation Results
- PLAN: Roadmap created, GH issue #1, feature branch, project board item added
- BREAKDOWN: Single stage identified (nav focus rings)
- EXECUTE: Worktree off feature branch, implemented, merged back to feature branch
- VERIFY: Tests (none exist yet), lint (pre-existing errors only, not from our change)
- PR: Created PR #2 (8 lines added, well under 999 limit)
- All phases executed successfully

# Integration Dry Run: Validate Epic Workflow

## Objective

Validate the full iterative AI workflow by running a small, low-risk epic end-to-end. This tests that all the pieces (epic skill, Q v6 with feature branch support, GitHub Projects) work together correctly.

## Scope

- Small code changes (e.g., add focus rings to 3 button variants, or improve a11y on a few components)
- `.ai-queue/_roadmaps/` (new roadmap file)
- GitHub Issue + PR
- Feature branch lifecycle

## Procedure

### 1. Invoke the Epic Skill

```
/epic Add visible focus indicators to all interactive components in the kitchen-sink example
```

This should trigger the full lifecycle:
- PLAN: creates roadmap, GH issue, feature branch
- BREAKDOWN: segments the work
- EXECUTE: Q runs segments in worktrees
- VERIFY: runs tests + a11y audits
- ITERATE: fixes any issues
- PR: creates PR to main (should be well under 999 lines)

### 2. Validate Each Phase

Check that:
- [ ] Roadmap file created at `.ai-queue/_roadmaps/YYYY-MM-DD-focus-indicators.md`
- [ ] GitHub Issue created with `epic` label
- [ ] Feature branch `feat/focus-indicators` created
- [ ] Q segmented the work correctly (file-disjoint segments)
- [ ] Each segment executed in its own worktree
- [ ] Segments merged to feature branch (not main)
- [ ] Tests pass on feature branch
- [ ] AccessLint MCP audit runs without regressions
- [ ] PR created targeting main
- [ ] PR is under 999 lines added
- [ ] GitHub Project board updated (if available)

### 3. Document Issues

If any phase fails or behaves unexpectedly:
1. Document the issue
2. Fix the relevant skill file (epic or Q)
3. Re-run that phase

The goal is not perfect code — it's validating the workflow pipeline.

## Acceptance Criteria

- [ ] Full epic lifecycle completed end-to-end
- [ ] PR created and reviewable
- [ ] Any skill bugs discovered are fixed
- [ ] Workflow validated as production-ready for larger epics
