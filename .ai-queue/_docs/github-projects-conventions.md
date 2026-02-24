# GitHub Projects Conventions

> How agents interact with GitHub Issues and Projects for the `@vlting/ui` workflow.

---

## Setup (One-Time)

### 1. Add Project Scope to GitHub CLI

The `gh` CLI needs the `project` scope to manage GitHub Projects:

```bash
gh auth refresh -s read:project -s project
```

### 2. Create the Project Board

```bash
gh project create --title "VLT-UI Roadmap" --owner vlting
```

Note the project number returned (e.g., `1`). You'll use it in subsequent commands.

### 3. Configure Board Columns

GitHub Projects v2 uses "Status" as a single-select field. The default statuses are "Todo", "In Progress", and "Done". Update them:

```bash
# List the project's fields to find the Status field ID
gh project field-list <PROJECT_NUMBER> --owner vlting --format json

# Update status options (this may need to be done in the GitHub UI)
# Target columns: Backlog, In Progress, In PR Review, Done
```

If the CLI doesn't support editing field options, configure the columns in the GitHub Projects web UI at `https://github.com/orgs/vlting/projects/<NUMBER>/settings`.

### 4. Create Labels

```bash
gh label create "epic" --description "Multi-stage initiative" --color "8B5CF6" --repo vlting/ui
gh label create "stage" --description "Individual stage within an epic" --color "3B82F6" --repo vlting/ui
gh label create "iteration" --description "Fix from ITERATE phase" --color "F59E0B" --repo vlting/ui
```

### 5. (Optional) Install GitHub MCP Server

For richer GitHub integration within Claude Code:

```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
```

This supplements `gh` CLI with MCP tool calls. Not required — `gh` CLI is sufficient for all operations.

---

## Agent Workflow

### When Starting an Epic

1. **Create a GitHub Issue:**
   ```bash
   gh issue create \
     --title "Epic: {title}" \
     --label "epic" \
     --body "$(cat <<'EOF'
   ## {Epic title}

   **Roadmap:** `.ai-queue/_roadmaps/YYYY-MM-DD-{slug}.md`
   **Feature branch:** `feat/{slug}`

   ### Stages
   - [ ] Stage 1: {title}
   - [ ] Stage 2: {title}

   ### Acceptance Criteria
   - [ ] All tests pass
   - [ ] Accessibility audits pass
   - [ ] PR(s) under 999 lines each
   EOF
   )" \
     --repo vlting/ui
   ```

2. **Add to project board** (in "Backlog"):
   ```bash
   gh project item-add <PROJECT_NUMBER> --owner vlting --url <ISSUE_URL>
   ```

### When Starting Work on a Stage

1. Move the epic issue to "In Progress" (via GitHub UI or API)
2. No separate issue needed for individual stages — update the epic issue checklist

### When Creating a PR

1. **Create the PR:**
   ```bash
   gh pr create \
     --title "{concise title}" \
     --body "$(cat <<'EOF'
   ## Summary
   - {bullet points}

   Closes #{EPIC_ISSUE_NUMBER}

   ## Test Plan
   - [ ] Tests pass
   - [ ] Accessibility audits pass

   Generated with [Claude Code](https://claude.com/claude-code)
   EOF
   )" \
     --repo vlting/ui
   ```

2. Move the epic issue to "In PR Review"
3. Link the PR to the issue (the `Closes #N` in the body does this automatically)

### When PR Is Merged

1. The issue auto-closes (from the `Closes #N` directive)
2. Move to "Done" in the project board (may auto-trigger if configured)
3. Archive the roadmap file to `.ai-queue/_completed/`

---

## Conventions

### Issue Titles

| Type | Format | Example |
|------|--------|---------|
| Epic | `Epic: {title}` | `Epic: Kitchen-sink demo app` |
| Stage | Update epic checklist | (no separate issue) |
| Iteration fix | `Fix: {description}` | `Fix: Button focus ring in dark mode` |

### PR Titles

Follow Conventional Commits:
- `feat(scope): description` — new feature
- `fix(scope): description` — bug fix
- `refactor(scope): description` — code restructuring
- `chore(scope): description` — maintenance

### PR Size Limit

Target: **< 999 lines added** per PR.

If an epic's total diff exceeds this:
1. Split into multiple PRs by stage
2. Each PR targets `main`
3. PRs merge in order (rebase before each merge)

### Linking PRs to Issues

Always include `Closes #N` or `Fixes #N` in the PR body to auto-link and auto-close.

---

## Notes

- **`gh` CLI is the primary interface.** Use it for all GitHub operations. The GitHub MCP server is optional.
- **Agents should NOT create issues for every segment.** Only epics get issues. Segments are tracked via Q's `.ai-queue/` system.
- **Project board updates are best-effort.** If the `project` scope isn't available, skip board updates and rely on issue state + PR state.
