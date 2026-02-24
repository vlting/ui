<!-- auto-queue -->
# Commit History
- No repo commit (file edited is `~/.claude/skills/q/SKILL.md`, outside this repo)
- Changes: version 5.0.0→6.0.0, `q add` removed (default is now `q {desc}` with segment+auto-queue), `q action` reframed as internal, watch loop accumulation fix added

# Revamp Q Skill: Simplify CLI Defaults & Fix Watch Loop

## Objective

Overhaul the Q skill (`~/.claude/skills/q/SKILL.md`) to reduce verbosity, make the most common workflow the default, and fix a bug with accumulating background watch loops.

## Scope

- `~/.claude/skills/q/SKILL.md`

> **NOTE:** This file is outside the repo (global Claude skill). Do NOT use a worktree for this task. Edit the file directly and commit the queue instruction file archival to the repo only.

## Changes Required

### 1. Make `q action` internal-only

Currently `q action` is documented as a user-facing command. It should become an **internal implementation detail** — still used by QTM to execute tasks in worktrees, but not exposed in the syntax/examples section as something users invoke directly.

- Remove `q action` from the top-level command list / syntax overview
- Keep the `q action` section but reframe it as "Internal: Task Execution in Worker Tree" — an implementation detail that QTM uses, not a user command
- The behavior stays identical; only the documentation framing changes

### 2. Default to segment mode + auto-queue (`-s -a`)

The current default `q add {description}` requires explicit `-s -a` flags for the most common workflow. Invert this:

**New syntax:**
```
q {Task description}              → equivalent to old `q add -s -a` (segment + auto-queue)
q --no-segment {Task description} → disable segment mode (single file)
q --no-auto {Task description}    → disable auto-queue (require confirmation)
q --no-segment --no-auto {desc}   → old `q add` behavior (single file + confirmation)
```

**Implementation details:**
- Remove the `add` subcommand entirely — `q {description}` IS the add command when a description is provided
- `q` with no arguments still enters QTM (queued task mode) — this behavior is unchanged
- `-s` and `-a` flags are removed (they're now the default)
- New flags `--no-segment` and `--no-auto` opt OUT of the defaults
- Update all examples and documentation accordingly
- The `!! CRITICAL: DO NOT IMPLEMENT !!` warning stays — this is still purely administrative

**Disambiguation rule:** How to tell `q` (enter QTM) from `q {description}` (add a task):
- `q` alone (no further text) → enter QTM
- `q --no-segment ...` or `q --no-auto ...` → add mode (flags are unambiguous)
- `q {any other text}` → add mode (the text is the task description)
- `exit q` → exit QTM (unchanged)

### 3. Fix watch loop accumulation bug

When an agent is in QTM watch mode for a long time, the timeout-and-restart cycle can accumulate multiple background bash loops. Add explicit cleanup:

**Before starting a new watch loop**, the agent MUST kill any previously started watch loop. Update the "Watching for New Files" section:

Add this to the Step 1 instructions:
```
IMPORTANT: Before starting this background bash loop, if you have a saved task_id
from a previous watch loop iteration, kill it first using TaskStop with that task_id.
This prevents accumulating orphaned background processes during long QTM sessions.
```

Update the "Timeout expired" handler in Step 3:
```
- **Timeout expired**: Kill the current watch loop using TaskStop with the saved task_id,
  then go back to Step 1 to start a fresh watch loop. Do NOT leave the old loop running.
```

### 4. Minor cleanup

- Update the version in frontmatter from `5.0.0` to `6.0.0`
- Update the description to reflect the simplified syntax
- Ensure all examples throughout the file use the new syntax

## Acceptance Criteria

- [ ] `q {description}` defaults to segment + auto-queue behavior
- [ ] `--no-segment` and `--no-auto` flags work to opt out
- [ ] `q` with no args still enters QTM
- [ ] `q action` section exists but is marked as internal/implementation detail
- [ ] Watch loop section includes explicit cleanup of previous loops before starting new ones
- [ ] All examples updated to new syntax
- [ ] Version bumped to 6.0.0
