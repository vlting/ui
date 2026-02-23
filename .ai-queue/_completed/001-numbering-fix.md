<!-- auto-queue -->
# Commit History
- Skill file updated at `/Users/lucas/.claude/skills/q/SKILL.md` (v4.4.0 → v4.5.0)
- No repo commit — changes are to a user-level skill file outside the repository

# Task 001: Fix `q add` numbering when queue is empty

## Problem
When the `ai-queue/` folder has no `.md` files directly in it (all prior tasks have been archived to `_completed/`), `q add` should assign number `001`. Instead, agents have been scanning `_completed/` or relying on conversation context from prior tasks to pick up where old numbering left off (e.g., `012`, `013`).

The root cause is **not in the skill file itself** — the skill clearly says:

> "list all `.md` files directly in `./ai-queue/` (excluding subfolders), read the first 3 characters of each filename as its number, find the largest, and add 1."

This is correct. The problem is that agents interpret "find the largest, and add 1" ambiguously when there are **zero** files — the instruction doesn't explicitly state what happens when no files exist. Agents then "helpfully" look at `_completed/` or use prior conversation context to avoid number collisions, which is wrong.

## Fix Required

### Modify: `/Users/lucas/.claude/skills/q/skill.md`

In the `q add` section, step 1, make the zero-file case explicit. Change the current text:

```
1. Determine the next available number: list all `.md` files directly in `./ai-queue/` (excluding subfolders), read the **first 3 characters** of each filename as its number, find the largest, and add 1. For instance, if the folder contains `003-active.md`, `004.md`, and `005-wip.md`, the numbers in use are `003`, `004`, and `005`, so the next file should be `006-wip.md`.
```

To something like:

```
1. Determine the next available number: list all `.md` files directly in `./ai-queue/` (excluding subfolders — do NOT look inside `_completed/` or any other subfolder, and do NOT use prior conversation context or memory to infer past task numbers). Read the **first 3 characters** of each filename as its number. If there are no `.md` files, the next number is `001`. Otherwise, find the largest number and add 1. For instance, if the folder contains `003-active.md`, `004.md`, and `005-wip.md`, the numbers in use are `003`, `004`, and `005`, so the next file should be `006-wip.md`. If the folder is empty (all tasks completed/archived), the next file should be `001-wip.md`.
```

Key additions:
- Explicit "do NOT look inside `_completed/`" prohibition
- Explicit "do NOT use prior conversation context" prohibition
- Explicit fallback: "If there are no `.md` files, the next number is `001`"
- A second example covering the empty-queue case

### Also update the File Naming Convention section

Add a note near the top of the file naming convention section:

> **Numbering resets when the queue is empty.** Numbers are only determined by files currently in `./ai-queue/` (not in subfolders). Once all tasks are archived to `_completed/`, the next task starts at `001` again. This is intentional — completed task files are renamed to commit hashes, so the original numbers are not preserved and cannot collide.

## Bump version
Bump the skill version from its current value to the next minor (e.g., `4.4.0` → `4.5.0`, or whatever the current version is + 0.1.0).

## Verification
After making the change, confirm by reading back step 1 and verifying the zero-file case is explicitly handled.
