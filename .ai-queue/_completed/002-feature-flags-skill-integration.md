<!-- auto-queue -->
<!-- depends-on: 001 -->
# Commit History

- Skill files modified (outside repo): `~/.claude/skills/epic/SKILL.md`, `~/.claude/skills/epic/references/architecture.md`

---

# Feature Flags + Branching Strategy: SKILL.md & Architecture Integration

## Context

Task 001 created the feature flags documentation (`references/feature-flags.md`) and updated the init procedure (`references/init.md`). This task integrates feature flags into the actual epic workflow in SKILL.md and updates the architecture reference.

The core idea: every epic creates a project-level feature flag. New work is gated behind this flag (disabled in prod by default). This enables smaller, more incremental branches and safer merging. When the epic is done, the flag is flipped to `true` in prod.

**IMPORTANT:** These are skill configuration files in `~/.claude/skills/epic/`, NOT files in the current git repo. No worktree is needed. Edit the skill files directly. For the queue lifecycle, just archive this task file to `_completed/` with a descriptive commit message when done.

## Requirements

### 1. Update SKILL.md — Reference Documents section

Add to the reference documents list:

```markdown
- **Feature flags** → `references/feature-flags.md` (project-level flags, per-environment files, flag lifecycle)
```

### 2. Update SKILL.md — Phase 1: PLAN

#### Step 3: Generate slug + classify branch prefix

Rename step 3 from "Generate an epic slug" to "Generate an epic slug and classify the branch prefix."

After deriving the slug, classify the branch prefix based on the goal:

```markdown
3. **Generate an epic slug and classify the branch prefix.**
   - Derive a short, kebab-case slug from the goal (e.g., `kitchen-sink-a11y`, `auth-overhaul`)
   - Classify the branch prefix based on the nature of the goal:

     | Prefix | When to use | Examples |
     |--------|------------|---------|
     | `feat/` | New features, new capabilities (default) | "Add dark mode", "Build auth system" |
     | `fix/` | Bug fix initiatives | "Fix all a11y violations", "Resolve auth race conditions" |
     | `chore/` | Maintenance, refactoring, tooling | "Refactor auth module", "Update dependencies" |
     | `docs/` | Documentation-only | "Write API docs", "Update README" |

   - Default to `feat/` if the classification is ambiguous.
```

#### Step 4: Create a feature branch

Update from:
```bash
git checkout -b feat/<slug> main
git push -u origin feat/<slug>
```

To:
```bash
git checkout -b <prefix>/<slug> main
git push -u origin <prefix>/<slug>
```

Where `<prefix>` is the classified branch prefix from step 3.

#### New Step 4.5: Create the epic's feature flag

Add a new step between 4 and 5:

```markdown
4.5. **Create the epic's feature flag.**

   Read the `flags_dir` path from `.ai-queue/_docs/project-setup.md` (default: `config`).
   Derive the flag name from the slug: replace hyphens with underscores (e.g., `kitchen-sink-a11y` → `kitchen_sink_a11y`).

   Add the flag to all three environment files. The flag should be inserted as the **first entry** in each JSON object (newest first). Write a brief, one-sentence description of what the flag gates.

   | File | `enabled` value |
   |------|----------------|
   | `{flags_dir}/flags.dev.json` | `true` |
   | `{flags_dir}/flags.staging.json` | `true` |
   | `{flags_dir}/flags.prod.json` | `false` |

   Example entry:
   \```json
   {
     "kitchen_sink_a11y": {
       "enabled": true,
       "description": "Accessibility overhaul for kitchen-sink example app",
       "added": "2026-02-24"
     }
   }
   \```

   Commit the flag files on the epic branch:
   \```bash
   git add {flags_dir}/flags.*.json
   git commit -m "feat(<slug>): add feature flag for <slug> epic"
   git push
   \```

   See `references/feature-flags.md` for full schema details.
```

#### Step 5: Create roadmap file

Update the roadmap template to include the flag name and branch prefix:

Change:
```markdown
- **Feature branch:** feat/{slug}
```

To:
```markdown
- **Branch:** <prefix>/{slug}
- **Feature flag:** {flag_name}
```

#### Step 6: Create GitHub Issue

Update `feat/{slug}` references to `<prefix>/{slug}` in the issue body.

Add the feature flag to the issue body:

```markdown
**Feature flag:** `{flag_name}` (disabled in prod until epic completes)
```

### 3. Update SKILL.md — Phase 2: BREAKDOWN

In step 4 (Queue the stage via Q), update:
- `<!-- target-branch: feat/<slug> -->` → `<!-- target-branch: <prefix>/<slug> -->`
- Add a note that task instructions should mention the feature flag name so implementing agents know to gate new behavior behind it:

```markdown
4. **Queue the stage via Q:**
   \```
   q {Detailed stage description referencing the acceptance criteria.
   All segments should target the epic branch: <!-- target-branch: <prefix>/<slug> -->
   New behavior should be gated behind the feature flag: {flag_name}}
   \```
```

### 4. Update SKILL.md — Phase 7: PR

Update all `feat/<slug>` references to `<prefix>/<slug>`.

### 5. Update SKILL.md — Phase 8: COMPLETION

Add a new step for flipping the feature flag:

```markdown
After the human merges the PR(s):

1. **Flip the feature flag in prod.**
   Read the `flags_dir` from project-setup.md. Update `{flags_dir}/flags.prod.json`:
   set the epic's flag to `"enabled": true`.

   \```bash
   # On main, after PR merge
   git pull origin main
   # Edit flags.prod.json — set the epic's flag to enabled: true
   git add {flags_dir}/flags.prod.json
   git commit -m "chore(<slug>): enable {flag_name} in production"
   git push
   \```

2. **Update GitHub Project board** → "Done" ...
```

(Renumber existing steps 1-3 to 2-4.)

### 6. Update SKILL.md — `epic status`

Update `Branch: feat/{slug}` to `Branch: <prefix>/{slug}`.

Add the flag name:
```
Flag:   {flag_name} (dev: ✓ | staging: ✓ | prod: ✗)
```

Read the actual enabled state from the flag files if they exist.

### 7. Update SKILL.md — `epic abort`

Update `feat/{slug}` references to `<prefix>/<slug>`.

Add a note: "The feature flag remains in the flag files. If the flagged code was already merged to main, consider removing the flag and its code guards in a cleanup chore."

### 8. Update SKILL.md — Roadmap File Format

Update the template:
- `- **Feature branch:** feat/{slug}` → `- **Branch:** <prefix>/{slug}`
- Add `- **Feature flag:** {flag_name}`

### 9. Update SKILL.md — Error Handling

In the "Stage Fails Verification 5 Times" section, update `feat/{slug}` to `<prefix>/{slug}`.

### 10. Bump the version

Update YAML frontmatter version from `1.1.0` to `2.0.0`. This is a major version bump — the feature flag integration is a fundamental workflow change (every epic now creates a flag, and the branching strategy is expanded).

### 11. Update `references/architecture.md`

#### Section 6: Branch Strategy

Replace the branch diagram:

```
main
 └── <prefix>/<epic-slug>           (epic branch — prefix reflects goal type)
      ├── <prefix>/<epic-slug>/001  (segment worktree branch)
      ├── <prefix>/<epic-slug>/002  (segment worktree branch)
      └── <prefix>/<epic-slug>/003  (segment worktree branch)

Supported prefixes: feat/, fix/, chore/, docs/
```

Update bullets:
- "Feature branches isolate epic work from main" → "Epic branches isolate work from `main` — the prefix reflects the nature of the work (`feat/`, `fix/`, `chore/`, `docs/`)"
- Add: "Every epic creates a project-level feature flag. New behavior is gated behind this flag, allowing partial work to merge safely to `main` (the flag is disabled in prod)."
- Add: "Branch prefix is classified during PLAN phase. Segments and iteration branches inherit the epic's prefix."

#### Section 5: Human Auditability — add Feature Flag subsection

After "PR Size Limit" and before "Atomic Segments", add:

```markdown
### Feature Flag Safety Net

Every epic creates a feature flag that is disabled in production. This provides a safety net:
- **Partial work is safe to merge** — flagged code paths are inactive in prod
- **Incremental PRs** — instead of one large PR, work can be split across multiple smaller PRs that each merge to main
- **Controlled rollout** — flip the flag in staging first, then prod, allowing gradual verification
- **Easy rollback** — if a flagged feature causes issues after enablement, disable the flag without reverting code
```

#### Skill Topology table

Update the Git model row:
- Current: "Feature branch → segments merge in → PR to main"
- New: "Epic branch (`<prefix>/<slug>`) → segments merge in → PR to main. All work gated by a project-level feature flag."

## Scope

- `~/.claude/skills/epic/SKILL.md` — MODIFY
- `~/.claude/skills/epic/references/architecture.md` — MODIFY
