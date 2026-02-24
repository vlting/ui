# Iterative AI Workflow Architecture

> Design document for a multi-stage iterative AI workflow system for `@vlting/ui`.

---

## 1. Overview

This document describes the architecture of a system that takes large, complex development tasks and executes them through an iterative plan-execute-verify loop using AI agents. The system is built on two complementary skills:

- **Q** (v6) — The execution engine: task queuing, file-disjoint segmentation, worktree-based execution, parallel safety, and context clearing.
- **Epic** (new) — The orchestration layer: strategic planning, multi-stage roadmaps, quality gates, iteration loops, and PR management.

Together, they enable ambitious tasks (e.g., "build a fully accessible kitchen-sink demo") to be broken into reviewable, revertible, production-quality increments — each under 999 lines added per PR.

---

## 2. Core Workflow Loop

```
                    ┌─────────────────────────────────────┐
                    │         /epic {goal}                 │
                    │                                      │
                    │  1. PLAN ─── Create roadmap,         │
                    │              GH issue, feature branch │
                    │                                      │
                    │  2. BREAKDOWN ─── Per stage:         │
                    │     Research → Write instructions     │
                    │     → Queue via Q                     │
                    │                                      │
                    │  3. EXECUTE ─── Q segments work      │
                    │     in worktrees, merge to feature    │
                    │     branch                            │
                    │                                      │
                    │  4. VERIFY ─── Run tests, a11y       │
                    │     audits, lint, check criteria      │
                    │                     │                 │
                    │               pass? │                 │
                    │              ┌──────┴──────┐          │
                    │              │ NO          │ YES      │
                    │              ▼             ▼          │
                    │  5. ITERATE        6. ADVANCE         │
                    │     Analyze →         Next stage      │
                    │     Queue fixes →     or PR phase     │
                    │     Back to 3                         │
                    │                                      │
                    │  7. PR ─── Create PR(s) to main      │
                    │     (< 999 lines each)               │
                    │                                      │
                    │  8. COMPLETE ─── After human merge    │
                    └─────────────────────────────────────┘
```

### Phase Details

| Phase | Context Scope | Agent Type | Output |
|-------|--------------|------------|--------|
| PLAN | Broad codebase | Planning agent | Roadmap file, GH issue, feature branch |
| BREAKDOWN | Stage-scoped | Research agent (fresh context) | Q instruction files |
| EXECUTE | Segment-scoped | QTM agents (isolated per segment) | Commits on feature branch |
| VERIFY | Test output only | Evaluation agent (fresh context) | Pass/fail + analysis |
| ITERATE | Failure-scoped | Research agent (fresh context) | Fix instruction files |
| PR | Diff-scoped | PR agent | Pull request(s) |

---

## 3. Context Isolation

Context isolation is the most critical architectural concern. Without it, agents accumulate irrelevant context from prior tasks, leading to confused reasoning, wasted tokens, and incorrect decisions.

### Principles

1. **No cross-task context bleed.** Each task execution starts with a fresh context window. Q's `/clear` between tasks already enforces this. The `epic` skill extends this principle to phases — each phase (BREAKDOWN, VERIFY, ITERATE) starts fresh.

2. **Scoped context loading.** Each instruction file is self-contained: it lists the files to read, the patterns to follow, and the acceptance criteria. An agent needs nothing beyond the instruction file + the codebase itself.

3. **Hierarchical context depth:**

   | Agent Role | Context Needed |
   |-----------|---------------|
   | Epic planner | Broad: entire codebase structure, README, existing patterns |
   | Stage breakdown | Medium: roadmap stage section + relevant source directories |
   | Segment executor | Narrow: instruction file + files listed in `## Scope` |
   | Verifier | Narrow: test output + acceptance criteria |
   | Iterator | Medium: failure analysis + relevant source files |

4. **Context is loaded, not inherited.** A segment executor does NOT receive the planner's reasoning or the breakdown agent's research. It reads its instruction file cold. This is by design — the instruction file IS the interface between phases.

### How Context Clearing Works

- **Between QTM tasks:** Q's existing `/clear` mechanism drops the conversation context after each task is archived to `_completed/`. The next task starts with a clean slate.
- **Between epic phases:** The `epic` skill delegates each phase to a fresh agent context (via Task tool subagents or explicit `/clear`). The roadmap file and instruction files serve as the durable state that persists across context boundaries.
- **Within a segment:** No clearing needed. A single segment is small enough to fit in one context window.

---

## 4. Context Storage

### Current Approach: Filesystem + Git

The system uses markdown files and git history as the primary storage layer:

| Storage | Location | Purpose |
|---------|----------|---------|
| Pending tasks | `.ai-queue/XXX.md` | Work waiting to be claimed |
| Active tasks | `.ai-queue/XXX-active.md` | Work in progress |
| Completed tasks | `.ai-queue/_completed/` | Audit trail (instruction + commit hash) |
| Roadmaps | `.ai-queue/_roadmaps/` | Epic stage plans |
| Architecture docs | `.ai-queue/_docs/` | Design documents like this one |
| Agent memory | `~/.claude/projects/.../memory/` | Cross-session persistent learnings |

### Why This Is Sufficient

- **Auditable:** Every instruction and its outcome is in git history.
- **Version-controlled:** You can `git log` to see what was planned vs. what was done.
- **Simple:** No database to manage, back up, or migrate.
- **Parallel-safe:** File renames are atomic on POSIX; Q's claiming mechanism relies on this.

### When a Database Might Help

If structured querying becomes necessary (e.g., "show me all tasks tagged with `a11y` across the last 10 epics"), a SQLite database at `.ai-queue/tasks.db` could supplement (not replace) the markdown files. **Do not build this until the need is proven.**

### Auto-Memory Integration

Claude Code's auto-memory (`~/.claude/projects/.../memory/MEMORY.md`) stores stable patterns, architectural decisions, and debugging insights discovered across sessions. This complements the workflow system:

- **Memory** = what the agent has learned (stable, cross-session)
- **Instruction files** = what the agent should do (ephemeral, per-task)
- **Roadmaps** = what the project is building (durable, per-epic)

Agents should consult memory files at the start of each session but should NOT store task-specific state there.

---

## 5. Human Auditability & Reversibility

### Every Unit of Work Is a PR

All code reaches `main` through pull requests. This ensures:
- Human review before merge
- CI gates (tests, lint, a11y) must pass
- Clear audit trail in GitHub

### PR Size Limit: 999 Lines Added

Large PRs are hard to review and risky to merge. The system targets < 999 lines added per PR. If a stage or epic exceeds this:
- Split into multiple sequential PRs
- Each PR is independently reviewable and mergeable
- PRs merge in order (PR 1 first, then PR 2 rebased on updated main)

### Atomic Segments

Each segment produces a small set of commits that can be independently reverted:
```bash
git revert <segment-merge-commit>
```

Because segments are file-disjoint, reverting one segment won't conflict with others.

### Instruction Files as Audit Trail

The `.ai-queue/_completed/` archive preserves:
- **What was planned:** The original instruction file content
- **What was done:** The commit hash appended to the filename
- All completed instruction files include a `# Commit History` section

---

## 6. Engineering Best Practices

### Branch Strategy

```
main
 └── feat/<epic-slug>           (feature branch — epic owns this)
      ├── feat/<epic-slug>/001  (segment worktree branch)
      ├── feat/<epic-slug>/002  (segment worktree branch)
      └── feat/<epic-slug>/003  (segment worktree branch)
```

- **Feature branches** isolate epic work from `main`
- **Worktree branches** isolate segments from each other and from the feature branch
- Segments merge to the feature branch (not main)
- The feature branch merges to main via PR

### Rebase-Before-Merge

Already enforced by Q v6. Before merging a worktree branch:
1. `git fetch origin`
2. `git rebase origin/<target-branch>`
3. Resolve any conflicts
4. Merge with `--no-ff`

This ensures each merge is additive on top of all prior merges.

### CI Gates

Tests must pass before PR merge. The VERIFY phase in the epic workflow runs:
- Project test suite (`npm test`, `bun test`, etc.)
- Accessibility audits (via AccessLint MCP if installed)
- Linting (via ESLint, if configured)

---

## 7. Skill Topology

### Decision: Q v6 (Execution) + Epic (Orchestration)

Two skills with distinct responsibilities:

| Concern | Q (execution) | Epic (orchestration) |
|---------|--------------|---------------------|
| Granularity | Single task / segment | Multi-stage initiative |
| Context | Narrow (one instruction file) | Broad (roadmap + stage awareness) |
| Duration | Minutes (one worktree session) | Hours/days (full feature lifecycle) |
| Git model | Worktree branch → merge to target | Feature branch → segments merge in → PR to main |
| Decision-making | None (follow instructions) | Evaluates quality, decides to iterate or advance |

### Why Two Skills, Not One

Q is 270+ lines of dense operational logic (QTM claiming, parallel safety, file naming, watch loops, merge lifecycle). Adding strategic planning, iteration loops, quality gates, and PR management would push it past 500+ lines and mix execution concerns with orchestration concerns.

### Why Not Three+ Skills

- A PM skill would just wrap `gh` CLI — not enough to justify a skill
- A testing skill would fragment the iteration loop — testing is an action within epic's VERIFY phase
- A planning skill would split tightly coupled logic — planning and iteration are interleaved

### Interface Between Q and Epic

```
epic                              q
┌─────────────────────┐          ┌──────────────────────┐
│ 1. Take goal        │          │                      │
│ 2. Create roadmap   │          │                      │
│ 3. For each stage:  │──uses──> │ q {stage description} │
│    a. Queue segments│          │ (creates segment     │
│    b. Wait for      │<─done──  │  files, agents       │
│       completion    │          │  execute them)        │
│    c. Run tests     │          │                      │
│    d. Evaluate      │          │                      │
│    e. Iterate or    │──uses──> │ q {fix description}   │
│       advance       │          │                      │
│ 4. Create PR        │          │                      │
│ 5. Track in GH      │          │                      │
└─────────────────────┘          └──────────────────────┘
```

---

## 8. Epic Skill Specification

### Invocation

```
/epic {goal description}
epic status
epic abort
```

### Lifecycle

#### Phase 1: PLAN
- Research the codebase (broad context)
- Create a multi-stage roadmap at `.ai-queue/_roadmaps/YYYY-MM-DD-<slug>.md`
- Each stage: title, objective, estimated scope, acceptance criteria
- Create a GitHub Issue for the epic
- Create a feature branch: `feat/<slug>`

#### Phase 2: BREAKDOWN (per stage)
- Fresh agentic context (to avoid prior-stage bleed)
- Read the roadmap file (only this stage's section)
- Deep-research relevant codebase areas
- Write detailed implementation instructions
- Queue via: `q {stage instructions}`
  - Q handles segmentation into file-disjoint segments

#### Phase 3: EXECUTE (per stage)
- Enter QTM: agents claim and execute segments
- Each segment runs in its own worktree off the feature branch
- Segments merge back to feature branch (not main)

#### Phase 4: VERIFY (per stage)
- Run the project's test suite against the feature branch
- Run accessibility audits (if AccessLint MCP installed)
- Run linting (if configured)
- Evaluate: are all acceptance criteria met?

#### Phase 5: ITERATE (per stage)
- If tests fail or quality is insufficient:
  - Analyze failures
  - Queue fix/enhancement tasks: `q {fix description}`
  - Return to EXECUTE
- If quality is sufficient:
  - Advance to next stage (return to BREAKDOWN)

#### Phase 6: PR
- Check PR size: `git diff --stat main...feat/<slug>`
- If > 999 lines added: split into multiple PRs by stage
- If <= 999 lines: single PR from `feat/<slug>` to `main`
- Create PR via: `gh pr create --title "..." --body "..."`
- Update GitHub Project board status

#### Phase 7: COMPLETION
- After PR is merged by human:
  - Update GitHub Project board → "Done"
  - Close GitHub Issue
  - Archive roadmap to `_completed`

### Roadmap File Format

```markdown
# Epic: {title}

- **Feature branch:** feat/{slug}
- **GitHub Issue:** #{number}
- **Created:** YYYY-MM-DD
- **Status:** planning | in-progress | in-review | done

## Stage 1: {title}
**Objective:** ...
**Estimated scope:** ~N files, ~N lines
**Acceptance criteria:**
- [ ] ...
**Status:** pending | executing | verifying | iterating | complete

## Stage 2: {title}
...
```

### Context Isolation Rules

| Phase | Context |
|-------|---------|
| PLAN | Broad codebase (reads widely) |
| BREAKDOWN | Fresh per stage (roadmap + relevant code only) |
| EXECUTE | Q handles clearing between segments |
| VERIFY | Fresh (test output + acceptance criteria only) |
| ITERATE | Fresh (failure analysis + relevant code only) |

### Iteration Limits

- **Max iterations per stage:** 5. If a stage fails verification 5 times, halt and escalate to human with a summary of what's failing and why.
- **Max total iterations per epic:** 20. Safety valve to prevent runaway loops.

---

## 9. Existing Tools & MCPs

| Tool | Role in Workflow |
|------|-----------------|
| Q skill (v6) | Task queuing, segmentation, worktree execution, parallel safety |
| worktree-manager skill | Git worktree lifecycle (create, list, remove) |
| GitHub CLI (`gh`) | PR creation, issue management, project board updates |
| GitHub MCP server | Enhanced GitHub integration (optional, supplements `gh`) |
| Figma MCP | Design-to-code workflow for UI tasks |
| AccessLint MCP | Accessibility verification in the VERIFY phase |
| Claude auto-memory | Cross-session persistent learnings |

---

## 10. GitHub Projects Integration

### Board Structure

| Column | Meaning |
|--------|---------|
| Backlog | Planned work not yet started |
| In Progress | Actively being worked by agent(s) |
| In PR Review | PR created, awaiting human review |
| Done | Merged to main |

### Agent Conventions

1. **Epic start:** Create a GitHub Issue titled `Epic: {title}`, add to project board in "Backlog"
2. **Work begins:** Move issue to "In Progress"
3. **PR created:** Move to "In PR Review", link PR to issue
4. **PR merged:** Move to "Done", close issue

### Issue Templates

**Epic issue:**
```markdown
## {Epic title}

**Roadmap:** `.ai-queue/_roadmaps/YYYY-MM-DD-{slug}.md`
**Feature branch:** `feat/{slug}`

### Stages
- [ ] Stage 1: {title}
- [ ] Stage 2: {title}
- ...

### Acceptance Criteria
- [ ] All tests pass
- [ ] Accessibility audits pass
- [ ] PR(s) under 999 lines each
```

### Labels

| Label | Purpose |
|-------|---------|
| `epic` | Multi-stage initiative |
| `stage` | Individual stage within an epic |
| `iteration` | Fix/enhancement from ITERATE phase |

---

## 11. What NOT to Build

- **Custom orchestrator process:** The epic skill IS the orchestrator. Don't build a separate daemon or service.
- **Custom database:** The filesystem + git approach is sufficient. Only add SQLite if querying across many epics becomes painful.
- **Custom MCP servers:** Use existing ones (GitHub, Figma, AccessLint).
- **Complex planning UI:** A markdown roadmap file is a perfectly good roadmap.
- **Cross-epic dependency tracking:** Each epic is independent. If two epics conflict, that's a planning problem, not a tooling problem.

---

## 12. Action Plan — Concrete Deliverables

The following deliverables implement the full system. They should be queued as follow-up Q tasks.

### Deliverable A: Create the `epic` Skill
- **What:** Author `~/.claude/skills/epic/SKILL.md` per section 8 above
- **Scope:** `~/.claude/skills/epic/SKILL.md` (new file)
- **Size:** ~300-400 lines

### Deliverable B: Add Feature Branch Support to Q v6
- **What:** Q's merge lifecycle should support a `<!-- target-branch: feat/... -->` directive
- **Scope:** `~/.claude/skills/q/SKILL.md` (additive)
- **Size:** ~20-30 lines

### Deliverable C: GitHub Projects Setup + Conventions
- **What:** Create the project board, configure columns/labels, write conventions doc
- **Scope:** GitHub API + `.ai-queue/_docs/github-projects-conventions.md`

### Deliverable D: Integration Dry Run
- **What:** Validate the full workflow with a small task
- **Scope:** Real code changes (small)

### Execution Order

```
A (epic skill) ─────────┐
B (Q feature branch) ───┼─ can run in parallel
C (GH Projects setup) ──┘
                         │
                         ▼
D (dry run) ──────────── depends on A, B, C
```
