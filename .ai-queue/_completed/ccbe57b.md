<!-- auto-queue -->
# Commit History
- 5d92b48 — docs(queue): add iterative AI workflow architecture and GH Projects conventions
- ccbe57b — merge commit to main

# Design Iterative AI Workflow Architecture & Set Up PM Tooling

## Objective

Two deliverables:
1. **Architecture design document** for a multi-stage iterative AI workflow system
2. **GitHub Projects + MCP setup** for tracking planned work, in-progress, PR review, and completed items

## Scope

- `.ai-queue/_docs/iterative-workflow-architecture.md` (new file — design document)
- MCP configuration via `claude mcp add` commands (global Claude config, not repo files)

## Part 1: Iterative Workflow Architecture Design

Write a detailed architecture document at `.ai-queue/_docs/iterative-workflow-architecture.md` that describes how to build an AI workflow system for large, complex tasks. The design should address the following:

### Core Workflow Loop

The system should implement this multi-stage process:

1. **Plan** — Given a large task, create a multi-stage roadmap with clear milestones
2. **Break down** — In separate agentic contexts, create detailed, well-researched instructions for each stage
3. **For each stage, iterate:**
   a. Segment it into manageably small instruction segments (using Q's segment mode)
   b. Execute the instructions (via Q's action/worktree system)
   c. Test the segment and fix issues
   d. Plan post-test enhancements
   e. Iterate until confident it's production-ready
4. **PR & Review** — Create a PR for human review (target: under 999 lines added per PR)

### Context Isolation

Address how to keep agents focused on only the context they need:

- **No cross-task context bleed**: Agents should NOT receive context from unrelated tasks just because they're processing them sequentially. The existing Q skill already handles this via context clearing between tasks (`/clear`). Document how this works and any improvements needed.
- **Scoped context loading**: Each task instruction file should be self-contained — listing the files to read, the patterns to follow, and the acceptance criteria. An agent should need nothing beyond the instruction file + the codebase itself.
- **Hierarchical context**: A "planning agent" might need broad codebase awareness, while an "implementation agent" only needs its segment's scope. Document when to use which.

### Context Storage (Local Database?)

Evaluate whether a local database is needed, or if the filesystem is sufficient:

- **Current approach**: Markdown files in `.ai-queue/` + git history. This is simple, auditable, and version-controlled.
- **When a DB might help**: If you need fast querying across many tasks, structured metadata (status, tags, dependencies), or cross-session state that isn't well-served by flat files.
- **Recommendation**: The filesystem + git approach is likely sufficient for this scale. The `.ai-queue/_completed/` archive already provides history. If structured querying becomes necessary, a SQLite database at `.ai-queue/tasks.db` could supplement (not replace) the markdown files. But don't build this until the need is proven.
- **Memory files**: Claude Code's auto-memory system (`~/.claude/projects/.../memory/`) already provides cross-session persistent context. Document how this interacts with the workflow.

### Human Auditability & Reversibility

Design for easy human auditing and AI rework/revert:

- **Every unit of work is a PR**: Feature branches (with sub-branches or worktrees as needed), merged via PRs for human review.
- **PR size limit**: Target under 999 lines added per PR. If a stage exceeds this, split it into multiple PRs.
- **Atomic segments**: Each segment produces a single commit (or small set of commits) that can be independently reverted with `git revert`.
- **Instruction files as audit trail**: The `.ai-queue/_completed/` archive preserves what was planned vs. what was done (instruction file + commit hash).

### Engineering Best Practices

- **Feature branches**: Each major task gets a feature branch off `main`
- **Sub-branches/worktrees**: Each segment within a task uses a worktree branched off the feature branch
- **Rebase-before-merge**: Already in Q skill — segments rebase onto the feature branch before merging
- **PR workflow**: After all segments merge into the feature branch, create a PR to `main` for human review
- **CI gates**: Tests must pass before PR merge

### Existing Tools & MCPs to Leverage

Document which existing tools the system should use:

- **Q skill** (existing) — Task queuing, segment mode, worktree execution, context clearing
- **worktree-manager skill** (existing) — Git worktree lifecycle management
- **GitHub MCP server** — Issue/project tracking (see Part 2)
- **GitHub CLI (`gh`)** — PR creation, issue management, already available in Claude Code
- **Figma MCP** (existing) — Design-to-code workflow for UI tasks
- **AccessLint MCP** (to be installed in segment 003) — Accessibility verification in the coding loop

### What NOT to Build

- Don't build a custom orchestrator or database until the file-based system proves insufficient
- Don't build custom MCP servers — use existing ones
- Don't over-engineer the planning stage — a markdown file with a numbered list is a perfectly good roadmap

## Part 2: GitHub Projects + MCP Setup

### Why GitHub Projects

Research conclusion: GitHub Projects is the best option for this project because:
- **Free** — unlimited projects, 50,000 items per project, no per-user cost
- **Zero friction** — already using GitHub, no new accounts needed
- **Best Claude Code integration** — official GitHub MCP server + native `gh` CLI
- **Native PR linking** — issues auto-link to PRs, commits, and branches
- **No artificial limits** — unlike Linear (250 active issues) or Trello (10 boards)

Other options evaluated: Linear (excellent DX but 250-issue free cap), Notion ($10/mo, good for knowledge base but no native GitHub integration), Trello (no official MCP), Jira (overkill).

### Setup Instructions

1. **Install the GitHub MCP server:**
   ```bash
   claude mcp add --transport http github https://api.githubcopilot.com/mcp/
   ```
   Note: Projects toolset may need explicit enablement. Check GitHub MCP docs for configuration.

2. **Alternative (if the HTTP transport MCP doesn't work well):** Use `gh` CLI directly — Claude Code already has access. Key commands:
   ```bash
   gh project create --title "VLT-UI Roadmap" --owner @me
   gh project item-add <project-number> --owner @me --url <issue-url>
   gh issue create --title "..." --body "..." --label "..."
   gh issue list --state open --label "in-progress"
   ```

3. **Create a GitHub Project board** with these columns:
   - **Backlog** — planned work not yet started
   - **In Progress** — actively being worked by an agent
   - **In PR Review** — PR created, awaiting human review
   - **Done** — merged to main

4. **Document the workflow** in the architecture doc: how agents create issues when starting work, update status as they progress, and link PRs when complete.

### CCPM (Optional Enhancement)

The [CCPM tool](https://github.com/automazeio/ccpm) is a purpose-built project management system for Claude Code using GitHub Issues + git worktrees. Evaluate whether it complements or replaces parts of the Q skill workflow. If it's a good fit, document how to integrate it.

---

## Part 3: Architectural Decision — Skill Topology

### The Question

Should we rebuild Q from scratch, create one new skill, or create a set of skills?

### Decision: Evolve Q v6 + One New `epic` Skill

**Q stays as the execution engine.** It handles what it already handles well: task file management, QTM, file-disjoint safety, worktree execution, parallel safety, context clearing. These are mechanical execution concerns. Segment 001 already covers the Q v6 evolution (simplified CLI, watch loop fix).

**A new `epic` skill handles strategic orchestration.** It takes a large goal, breaks it into stages, manages the plan→execute→test→iterate loop, enforces PR size limits, and creates PRs for human review. These are strategic planning concerns that don't belong in Q.

**No separate PM skill.** GitHub Projects integration is done via `gh` CLI calls baked into the `epic` skill's workflow conventions. No wrapper needed — `gh` is already available.

### Why Not a Single Monolith?

Q is already 274 lines of dense operational logic (QTM claiming, parallel safety, file naming, watch loops, merge lifecycle). Adding strategic planning, iteration loops, quality gates, and PR management would push it past 500+ lines and mix two very different concerns:

| Concern | Q (execution) | epic (orchestration) |
|---------|--------------|---------------------|
| Granularity | Single task / segment | Multi-stage initiative |
| Context | Narrow (one instruction file) | Broad (roadmap + stage awareness) |
| Duration | Minutes (one worktree session) | Hours/days (full feature lifecycle) |
| Git model | Worktree branch → merge to target | Feature branch → segments merge in → PR to main |
| Decision-making | None (follow instructions) | Evaluates quality, decides to iterate or advance |

These are fundamentally different scopes. Keeping them separate means:
- Q can be tested and evolved independently
- `epic` can be replaced or upgraded without risking the execution engine
- An agent running `q` doesn't need to load orchestration logic into its context

### Why Not Three+ Skills?

- A separate PM skill (for GitHub Projects) would just be a thin wrapper around `gh` CLI — not enough substance to justify a skill file
- A separate "testing" skill would be premature — testing is an action within the `epic` iteration loop, not a standalone workflow
- A separate "planning" skill would fragment the orchestration logic — planning and iteration are tightly coupled

### The Interface Between Q and Epic

```
epic                              q
┌─────────────────────┐          ┌──────────────────────┐
│ 1. Take high-level  │          │                      │
│    goal             │          │                      │
│ 2. Create roadmap   │          │                      │
│ 3. For each stage:  │──uses──▶│ q {stage description} │
│    a. Queue segments│          │ (creates segment     │
│    b. Wait for      │◀─done───│  files, agents        │
│       completion    │          │  execute them)        │
│    c. Run tests     │          │                      │
│    d. Evaluate      │          │                      │
│    e. If not ready: │──uses──▶│ q {fix description}   │
│       queue fixes   │          │ (iteration tasks)    │
│    f. If ready:     │          │                      │
│       advance       │          │                      │
│ 4. Create PR        │          │                      │
│ 5. Track in GH      │          │                      │
└─────────────────────┘          └──────────────────────┘
```

Key integration points:
- `epic` calls `q {description}` to queue work (Q handles segmentation, file creation, worktree execution)
- `epic` monitors `.ai-queue/` and `.ai-queue/_completed/` to know when work finishes
- `epic` uses `gh` CLI directly for GitHub Issues/Projects (no intermediary)
- `epic` creates and manages the **feature branch** that Q's worktrees branch off of

### The `epic` Skill — Core Specification

**Name:** `epic`
**Location:** `~/.claude/skills/epic/SKILL.md`
**Invocation:** `/epic {goal description}`

**Lifecycle:**

```
/epic Build a fully accessible kitchen-sink demo app

1. PLAN PHASE
   - Research the codebase (broad context)
   - Create a multi-stage roadmap (.ai-queue/_roadmaps/YYYY-MM-DD-slug.md)
   - Each stage: title, objective, estimated scope, acceptance criteria
   - Create a GitHub Issue for the epic
   - Create a GitHub Project board entry
   - Create a feature branch: feat/<slug>

2. BREAKDOWN PHASE (per stage)
   - In a FRESH agentic context (to avoid prior-stage bleed):
     - Read the roadmap file (scoped context — only this stage's section)
     - Deep-research the relevant codebase areas
     - Write detailed implementation instructions
     - Queue via: q {stage instructions}
       (Q handles segmentation into file-disjoint segments)

3. EXECUTION PHASE (per stage)
   - Enter QTM: q (agents claim and execute segments)
   - Each segment runs in its own worktree off the feature branch
   - Segments merge back to feature branch (not main)

4. VERIFY PHASE (per stage)
   - Run the project's test suite against the feature branch
   - Run accessibility audits (via AccessLint MCP if installed)
   - Run linting (via ESLint MCP if installed)
   - Evaluate: are all acceptance criteria met?

5. ITERATE PHASE (per stage)
   - If tests fail or quality is insufficient:
     - Analyze failures
     - Queue fix/enhancement tasks: q {fix description}
     - Return to EXECUTION PHASE
   - If quality is sufficient:
     - Advance to next stage (return to BREAKDOWN PHASE)

6. PR PHASE (per epic, or per stage if epic is large)
   - Check PR size: git diff --stat main...feat/<slug>
   - If > 999 lines added:
     - Split into multiple PRs (by stage or by logical grouping)
     - Each PR targets main, includes only its stage's commits
   - If <= 999 lines:
     - Single PR from feat/<slug> to main
   - Create PR via: gh pr create --title "..." --body "..."
   - Update GitHub Project board status → "In PR Review"
   - Update GitHub Issue with PR link

7. COMPLETION
   - After PR is merged (by human):
     - Update GitHub Project board → "Done"
     - Close GitHub Issue
     - Archive roadmap file to _completed
```

**Context Isolation Rules:**
- PLAN phase: broad codebase context (reads widely)
- BREAKDOWN phase: fresh context per stage (only reads roadmap + relevant code)
- EXECUTION phase: Q handles context clearing between segments (existing behavior)
- VERIFY phase: fresh context, only reads test output + acceptance criteria
- ITERATE phase: fresh context, only reads failure analysis + relevant code

**Roadmap File Format:**
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

**PR Size Management:**
- After all stages complete, measure total diff: `git diff --stat main...feat/<slug>`
- If lines added > 999, split the feature branch into sequential PRs
- Strategy: cherry-pick stage commits into separate PR branches
- Each PR should be reviewable independently
- PRs merge in order (PR 1 first, then PR 2 rebased on updated main, etc.)

---

## Part 4: Action Plan — Concrete Deliverables

The following deliverables implement the full iterative AI workflow system. They should be queued as follow-up Q tasks AFTER segments 001-003 complete.

### Deliverable A: Create the `epic` Skill (SKILL.md)

**What:** Author `~/.claude/skills/epic/SKILL.md` with the full specification above, written in the same operational style as Q's SKILL.md — precise instructions an agent can follow mechanically.

**Sections to include:**
1. Frontmatter (name, version, author, description)
2. Invocation syntax (`/epic {goal}`, `epic status`, `epic abort`)
3. PLAN phase — roadmap creation, GH issue, feature branch
4. BREAKDOWN phase — fresh context, deep research, queue via Q
5. EXECUTION phase — QTM delegation, worktree-to-feature-branch merging
6. VERIFY phase — test suite, a11y audits, linting, acceptance criteria evaluation
7. ITERATE phase — failure analysis, fix queuing, loop-back logic
8. PR phase — size check, split strategy, `gh pr create`, GH project update
9. COMPLETION phase — post-merge cleanup
10. Context isolation rules (which phases get fresh context)
11. Roadmap file format specification
12. Error handling (what to do when tests can't pass, when iterations exceed a limit, etc.)

**Scope:** `~/.claude/skills/epic/SKILL.md` (new file)

**Estimated size:** ~300-400 lines (comparable to Q)

### Deliverable B: Add Feature Branch Support to Q v6

**What:** Q currently merges worktrees directly to the branch they were created from (typically `main`). The `epic` skill needs Q to merge worktrees to a **feature branch** (e.g., `feat/kitchen-sink`), not directly to main.

**Changes needed:**
- Q's `q action` merge lifecycle should support a configurable target branch
- When a Q instruction file includes a `<!-- target-branch: feat/kitchen-sink -->` directive, the worktree should branch off that target and merge back to it
- Default behavior (no directive) remains unchanged: merge to whatever branch was current when the worktree was created

**Scope:** `~/.claude/skills/q/SKILL.md` (additive change to segment 001's work)

**Estimated size:** ~20-30 lines added to Q's merge lifecycle section

### Deliverable C: GitHub Projects Setup + Convention Doc

**What:** Create the actual GitHub Project board and document the conventions for how agents interact with it.

**Deliverables:**
1. Run `gh project create` to create the VLT-UI Roadmap board
2. Configure columns: Backlog, In Progress, In PR Review, Done
3. Create labels: `epic`, `stage`, `segment`, `iteration`
4. Write a conventions doc (`.ai-queue/_docs/github-projects-conventions.md`) specifying:
   - When to create issues (epic start, stage start)
   - When to update status (on claim, on PR, on merge)
   - Issue title/body templates
   - How to link PRs to issues (`Closes #N` in PR body)

**Scope:** GitHub API calls via `gh` CLI + `.ai-queue/_docs/github-projects-conventions.md` (new file)

### Deliverable D: Architecture Design Document

**What:** The architecture doc specified in Part 1 above, now incorporating the decisions from Part 3.

**Scope:** `.ai-queue/_docs/iterative-workflow-architecture.md` (new file)

**This is the core deliverable of this segment.** The doc should be a comprehensive reference that future agents (and humans) can consult to understand the system design.

### Deliverable E: Integration Test — Dry Run

**What:** After deliverables A-D are complete, do a dry run of the full workflow using a small, low-risk task (e.g., "add a focus ring to 3 button variants"). This validates that:
- `/epic` creates a roadmap, GH issue, feature branch
- `q` segments and executes correctly against the feature branch
- Tests run in the verify phase
- A PR is created with < 999 lines
- GH project board is updated

**Scope:** Real code changes (small), but the purpose is validating the workflow, not the code.

### Execution Order

```
Segment 001 (Q v6 CLI revamp)        ─┐
Segment 002 (this segment)            ─┼─ can run in parallel
Segment 003 (a11y/UI tooling install) ─┘
                                        │
                                        ▼
Deliverable A (create epic skill)      ─┐
Deliverable B (Q feature branch)       ─┼─ these depend on 001-003 completing
Deliverable C (GH Projects setup)      ─┘
                                        │
                                        ▼
Deliverable D (architecture doc)       ── depends on A-C (references their outputs)
                                        │
                                        ▼
Deliverable E (integration dry run)    ── depends on everything above
```

Note: Deliverables A-C are file-disjoint and can run in parallel. D depends on all three. E is the final validation.

### How to Queue These Deliverables

After segments 001-003 are complete, queue the follow-up work:

```
q Deliverable A: Create the epic skill at ~/.claude/skills/epic/SKILL.md per the spec in .ai-queue/_docs/iterative-workflow-architecture.md
q Deliverable B: Add feature branch support (target-branch directive) to Q v6 skill
q Deliverable C: Set up GitHub Projects board and write conventions doc
q --no-segment Deliverable D: Write the architecture design document at .ai-queue/_docs/iterative-workflow-architecture.md
q --no-segment Deliverable E: Integration dry run of the epic workflow using a small test task
```

---

## Acceptance Criteria

- [ ] Architecture document exists at `.ai-queue/_docs/iterative-workflow-architecture.md`
- [ ] Document covers all sections above (workflow loop, context isolation, storage, auditability, best practices)
- [ ] Document includes the skill topology decision (Q v6 + epic skill) with rationale
- [ ] Document includes the `epic` skill specification (lifecycle, phases, context rules, roadmap format)
- [ ] GitHub MCP server is configured (or `gh` CLI workflow is documented as alternative)
- [ ] GitHub Project board is created with the 4-column workflow
- [ ] Architecture document references the PM tooling and how agents should use it
- [ ] Action plan for deliverables A-E is included with execution order and dependencies
- [ ] Follow-up Q tasks are queued for deliverables A-E after this segment completes
