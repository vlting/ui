# Commit History

- `n/a` — Changes made to `/Users/lucas/.claude/skills/q/SKILL.md` (outside repo)

---

# Task: Add `-a` (Auto-Queue) Flag to `q add` Command

## Completed

All items from the implementation checklist are done:

- [x] Parse `-a` flag from `q add` arguments (position-independent)
- [x] When `-a` is present, insert `<!-- auto-queue -->` as the first line of the instruction file
- [x] When `-a` is present, skip the "Ready to queue?" confirmation and immediately rename `-wip` → pending
- [x] When `-a` is absent, behavior is identical to today (no changes)
- [x] Update the `q add` documentation section in SKILL.md
- [x] Update the version number to `4.3.0`
- [x] Ensure no conflicts with `-wip`, `-active`, or `_completed` conventions
