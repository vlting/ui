<!-- auto-queue -->
# Commit History
- Skill file updated at `/Users/lucas/.claude/skills/q/SKILL.md` (v4.3.0 → v4.4.0)
- No repo commit — changes are to a user-level skill file outside the repository

# Task 012: Add context-clearing instructions to `q` skill after each QTM task

## Objective
Update the `q` skill file (`/Users/lucas/.claude/skills/q/skill.md`) so that when an agent in Queued Task Mode (QTM) finishes a task (step 3 — after archiving to `_completed`), it clears its conversation context before moving to the next task. This prevents token bloat from accumulating context across sequential queued tasks.

## Background
When an agent processes multiple queued tasks sequentially in QTM, the conversation context from earlier tasks carries over into later ones. This causes:
- Unnecessary context compaction (wasted tokens)
- Higher AI token costs per task
- No benefit — each queued task is independent and doesn't need prior task context

## Changes Required

### Modify: `/Users/lucas/.claude/skills/q/skill.md`

#### 1. Add a new subsection under `## q — Enter Queued Task Mode` called `### Context Clearing Between Tasks`

This subsection should instruct the agent to, **after completing step 3 (archiving)** and **before starting step 4 (next task)**:

1. **Print a brief summary** of what was accomplished in the just-completed task. This should be 2-4 lines max, visible to a human watching the terminal. Format:
   ```
   --- Task XXX completed ---
   Summary: <1-2 sentence description of what was done>
   Commit(s): <list of commit SHAs>
   ---
   ```

2. **Use the `/clear` command** (or equivalent context-clearing mechanism) to reset the conversation context. This drops all accumulated tool results, file contents, and intermediate reasoning from the completed task.

3. **After clearing**, the agent resumes QTM by checking for the next available task (step 4) with a fresh context window.

#### 2. Update step 3→4 transition in the existing numbered list

In the existing numbered list (steps 1-6), add a note between steps 3 and 4 that references the new subsection. Something like:

> **Between steps 3 and 4**: Follow the **Context Clearing Between Tasks** procedure below — print a task summary, then clear your conversation context before proceeding to the next task.

## Important Notes
- The `/clear` command is a built-in Claude Code CLI command that resets the conversation. It is NOT a skill — do NOT invoke it via the Skill tool. Just output `/clear` as a command or use whatever the correct mechanism is to clear context in the CLI.
- If `/clear` is not available or doesn't work as expected, the fallback is to simply instruct the agent to "minimize context carry-over by not referencing prior task details when starting the next task" — but `/clear` is preferred.
- Bump the skill version number (currently `4.3.0`) to `4.4.0`.
- This change only affects the QTM sequential flow. It does NOT affect `q add` or standalone `q action`.
