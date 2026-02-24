<!-- auto-queue -->
<!-- depends-on: 001 -->
# Commit History

- Skill files modified (outside repo): `~/.claude/skills/epic/SKILL.md`, `~/.claude/skills/epic/references/architecture.md`
- Also updated `epic-cleanup.yml` and `init.md` workflow templates for multi-prefix support

---

# Branching Strategy + Feature Flag Integration in SKILL.md

## Context

The `epic` skill currently hardcodes `feat/` as the only branch prefix. All epic branches are named `feat/<slug>`. But not all epics are features — some are bug fixes, maintenance, documentation, etc. This task updates the branching strategy to support multiple prefixes and integrates the feature flag system (created in task 001) into SKILL.md.

**IMPORTANT:** These are skill configuration files in `~/.claude/skills/epic/`, NOT files in the current git repo. No worktree is needed. Edit the skill files directly. For the queue lifecycle, just archive this task file to `_completed/` with a descriptive commit message when done.

## Requirements

### 1. Update branching strategy in SKILL.md

#### Branch prefix classification

When the `branch_prefix_routing` flag is enabled (check `config/flags.json`), the epic should classify the goal and choose the appropriate branch prefix:

| Prefix | When to use | Examples |
|--------|------------|---------|
| `feat/` | New features, new capabilities, additions | "Add dark mode", "Build authentication system" |
| `fix/` | Bug fixes, corrections, patches | "Fix accessibility violations", "Resolve login race condition" |
| `chore/` | Maintenance, refactoring, tooling, dependencies, config | "Refactor auth module", "Update dependencies", "Add CI pipeline" |
| `docs/` | Documentation-only changes | "Write API docs", "Update README" |

**Default:** If classification is ambiguous, default to `feat/`.

**When the flag is disabled**, use `feat/` for everything (current behavior).

#### Where to apply this in SKILL.md

**Phase 1: PLAN — Step 3** (currently "Generate an epic slug"):
- Add a new sub-step: "Classify the goal" — determine the branch prefix (`feat`, `fix`, `chore`, or `docs`) based on the goal description
- The agent should read `config/flags.json` and check if `branch_prefix_routing` is enabled
- If enabled, classify and use the appropriate prefix
- If disabled, default to `feat/`

**Phase 1: PLAN — Step 4** (currently "Create a feature branch"):
- Change `git checkout -b feat/<slug> main` to `git checkout -b <prefix>/<slug> main`
- Update `git push -u origin feat/<slug>` to `git push -u origin <prefix>/<slug>`

**Phase 1: PLAN — Step 5** (roadmap file):
- Change `- **Feature branch:** feat/{slug}` to `- **Feature branch:** <prefix>/{slug}`

**Phase 1: PLAN — Step 6** (GitHub issue):
- Update feature branch reference in the issue body

**Phase 2: BREAKDOWN — Step 4** (Queue via Q):
- Change `<!-- target-branch: feat/<slug> -->` to `<!-- target-branch: <prefix>/<slug> -->`

**Phase 7: PR** and **Phase 8: COMPLETION**:
- Update all `feat/<slug>` references to `<prefix>/<slug>`

**`epic status`:**
- Update `Branch: feat/{slug}` to `Branch: <prefix>/{slug}`

**`epic abort`:**
- Update `feat/{slug}` references

**Roadmap File Format:**
- Update `feat/{slug}` references

#### Segment/worktree branch naming within an epic

Segment branches should inherit the epic's prefix:
- Current: `feat/<slug>/001`, `feat/<slug>/002`
- New: `<prefix>/<slug>/001`, `<prefix>/<slug>/002`

This means a `fix/a11y-audit` epic would have segments `fix/a11y-audit/001`, `fix/a11y-audit/002`, etc.

#### Iteration fixes within an epic

Iteration fix branches also inherit the epic's prefix. They are NOT separately classified — they follow the epic's branch prefix regardless of whether the iteration task is a "fix" within a "feat" epic. The prefix describes the epic's nature, not the individual segment's nature.

### 2. Add feature flag reference to SKILL.md

In the **Architecture** section (or a new section near the top of SKILL.md), add a brief note:

```markdown
### Feature Flags

The epic skill supports feature flags via `config/flags.json`. See `references/feature-flags.md` for the full schema and usage guide.

Before using a flagged feature, check if the flag is enabled:
1. Read `config/flags.json` (relative to the epic skill root: `~/.claude/skills/epic/`)
2. Check `flags[flag_name].enabled`
3. If `true`, use the new behavior; if `false`, use the legacy behavior
```

Also update the **Reference Documents** list to include:
```markdown
- **Feature flags** → `references/feature-flags.md` (flag schema, checking flags, adding/retiring flags)
```

### 3. Update `references/architecture.md`

In **Section 6: Engineering Best Practices → Branch Strategy**:

Update the branch diagram from:
```
main
 └── feat/<epic-slug>           (feature branch — epic owns this)
      ├── feat/<epic-slug>/001  (segment worktree branch)
      ├── feat/<epic-slug>/002  (segment worktree branch)
      └── feat/<epic-slug>/003  (segment worktree branch)
```

To:
```
main
 └── <prefix>/<epic-slug>           (epic branch — prefix reflects goal type)
      ├── <prefix>/<epic-slug>/001  (segment worktree branch)
      ├── <prefix>/<epic-slug>/002  (segment worktree branch)
      └── <prefix>/<epic-slug>/003  (segment worktree branch)

Supported prefixes: feat/, fix/, chore/, docs/
(Controlled by the branch_prefix_routing feature flag)
```

Update the bullet points below the diagram:
- "Feature branches isolate epic work from main" → "Epic branches isolate work from `main` — prefix reflects the nature of the work"
- Add a note: "Branch prefix is determined during PLAN phase and inherited by all segments and iteration branches"

Also in the **Skill Topology** table, update the Git model row:
- Current: "Feature branch → segments merge in → PR to main"
- New: "Epic branch (`<prefix>/<slug>`) → segments merge in → PR to main"

### 4. Update the GitHub Actions workflow reference

In **Phase 8: COMPLETION**, the `epic-cleanup.yml` workflow currently triggers on branches starting with `feat/`. Update the instruction to note that the workflow trigger should also cover `fix/`, `chore/`, and `docs/` prefixes. Add a note like:

```
Note: If the GitHub Actions cleanup workflow (`epic-cleanup.yml`) is installed,
ensure its trigger covers all branch prefixes: feat/, fix/, chore/, docs/.
The workflow's `head.ref` filter should use a pattern like:
  branches: ['feat/**', 'fix/**', 'chore/**', 'docs/**']
```

### 5. Bump the version

Update the YAML frontmatter version from `1.1.0` to `1.2.0` (minor version bump — new feature, no breaking changes since `feat/` remains the default when the flag is disabled).

## Scope

- `~/.claude/skills/epic/SKILL.md` — MODIFY
- `~/.claude/skills/epic/references/architecture.md` — MODIFY
