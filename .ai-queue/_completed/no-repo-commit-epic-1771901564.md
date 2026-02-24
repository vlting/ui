<!-- auto-queue -->
# Commit History
- No repo commit (file created at `~/.claude/skills/epic/SKILL.md`, outside this repo)
- Epic skill v1.0.0: 423 lines, all 12 sections, full lifecycle spec

# Create the `epic` Skill

## Objective

Author `~/.claude/skills/epic/SKILL.md` — a new Claude Code skill that orchestrates multi-stage development initiatives through the plan-execute-verify-iterate loop described in `.ai-queue/_docs/iterative-workflow-architecture.md`.

## Scope

- `~/.claude/skills/epic/SKILL.md` (new file)

> **NOTE:** This file is outside the repo (global Claude skill). Do NOT use a worktree for this task. Edit the file directly and commit the queue instruction file archival to the repo only.

## Reference

Read `.ai-queue/_docs/iterative-workflow-architecture.md` sections 7-8 for the full spec. The skill should follow the same operational style as Q's SKILL.md — precise instructions an agent can follow mechanically.

## Sections to Include

1. **Frontmatter** — name: `epic`, version: `1.0.0`, author, description
2. **Invocation syntax** — `/epic {goal}`, `epic status`, `epic abort`
3. **PLAN phase** — roadmap creation at `.ai-queue/_roadmaps/YYYY-MM-DD-<slug>.md`, GitHub Issue creation, feature branch creation (`feat/<slug>`)
4. **BREAKDOWN phase** — fresh context per stage, deep codebase research, queue instructions via `q {stage description}`
5. **EXECUTE phase** — QTM delegation, worktrees branch off feature branch (not main), segments merge back to feature branch
6. **VERIFY phase** — run test suite, a11y audits (AccessLint MCP), linting (Biome), evaluate acceptance criteria
7. **ITERATE phase** — failure analysis, queue fix tasks via `q {fix description}`, loop back to EXECUTE, max 5 iterations per stage
8. **PR phase** — size check (`git diff --stat main...feat/<slug>`), split strategy if > 999 lines, `gh pr create`, GitHub Project board update
9. **COMPLETION phase** — post-merge cleanup, close GH issue, archive roadmap
10. **Context isolation rules** — which phases get fresh context (all except EXECUTE which Q handles)
11. **Roadmap file format** — as specified in architecture doc
12. **Error handling** — what to do when tests can't pass (after 5 iterations: halt + escalate), max 20 total iterations per epic

## Acceptance Criteria

- [ ] `~/.claude/skills/epic/SKILL.md` exists with all 12 sections above
- [ ] Skill invocation (`/epic {goal}`) is documented
- [ ] All phases reference Q v6 correctly (using new syntax: `q {description}`)
- [ ] Context isolation rules are explicit for each phase
- [ ] Iteration limits documented (5 per stage, 20 per epic)
- [ ] PR size management documented (< 999 lines threshold)
- [ ] Roadmap file format matches architecture doc
- [ ] Estimated size: ~300-400 lines
