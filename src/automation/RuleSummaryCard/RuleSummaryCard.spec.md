# Component Spec — RuleSummaryCard

## 1. Purpose

RuleSummaryCard displays a compact, scannable summary of a single automation rule, including its name, trigger description, condition count, action summary, and current status. It is used in lists or grids of automation rules.

Use it to represent one automation rule in a collection view where users browse, enable/disable, or navigate to detailed rule editing.

Do NOT use it for workflow step cards in a canvas (use a purpose-built node component), or for non-automation entities that happen to have a similar card shape.

---

## 2. UX Intent

- Primary interaction goal: allow users to quickly scan a list of rules, understand the purpose and status of each, and take a primary action (navigate to edit or toggle enabled state).
- Expected user mental model: a structured card with a title, status badge, and key metadata — familiar from CI/CD job cards, Zapier zap cards, or email rule lists (Jakob's Law).
- UX laws applied:
  - Gestalt (Similarity): consistent card structure across all rules reduces cognitive load.
  - Jakob's Law: card-based list views for automation rules are established patterns.
  - Hick's Law: card actions are limited to one primary (navigate/edit) and one secondary (enable/disable toggle); no more.
  - Fitts's Law: the primary interactive area (the card itself or an explicit edit button) must be large enough to tap comfortably.

---

## 3. Visual Behavior

- Layout: a rectangular card with:
  - A header row: rule name (prominent), status badge (AutomationStatusBadge).
  - A body: trigger description line, condition summary line ("2 conditions"), action summary line ("Send email, Notify Slack").
  - A footer (optional): last modified timestamp, owner avatar, quick-action buttons (edit, enable/disable, delete).
- Card has a defined max-width in grid contexts; expands to fill its column.
- Hover state (web): subtle background lift or border highlight.
- Disabled rule: card body is visually de-emphasized (reduced opacity on description lines).
- Error rule: status badge shows error; optionally an inline error hint appears in the body.
- Spacing between card regions uses space tokens; card padding uses space tokens.
- Typography: rule name uses heading-scale; metadata lines use body/caption scale.

---

## 4. Interaction Behavior

- States: idle, hover (web), focused, active (pressing), disabled (rule is disabled, not card).
- The entire card may be clickable (navigating to the rule detail/editor), or only an explicit "Edit" button.
- Enable/disable toggle is a separate interactive element within the card (does not trigger card navigation).
- Controlled: enabled state is driven by props; toggle fires a callback.
- Keyboard behavior:
  - If the card is fully clickable: `Enter` or `Space` on the card triggers navigation.
  - Individual action buttons within the card are separately focusable via `Tab`.
  - `Tab` / `Shift+Tab` visit the card (or its primary action) and then each individual action button.
- Screen reader behavior: the card announces the rule name, status, trigger summary, condition count, and action summary as a coherent unit. Individual action buttons have their own accessible labels.
- Motion: hover lift/border transition uses a short duration; card add/remove in a list uses a short animation; reduced motion suppresses these.

---

## 5. Accessibility Requirements

- If the card is a link/button, it has a descriptive accessible name (rule name + "automation rule").
- The enable/disable toggle has `aria-label="Enable [rule name]"` / `"Disable [rule name]"` and `aria-pressed` reflecting state.
- Delete button has `aria-label="Delete [rule name]"`.
- The status badge text is readable by screen readers; its icon is decorative.
- Rule name uses an appropriate heading element relative to the page context.
- Disabled rule cards: `aria-disabled` if the card interaction is suppressed; informational text still readable.
- All text meets WCAG AA contrast (4.5:1); interactive elements meet 3:1 for boundaries.
- Reduced motion: no hover animation when `prefers-reduced-motion: reduce` is active.

---

## 6. Theming Rules

- Required tokens: card background, card border, card hover background or shadow, rule name color, metadata text color, footer text color, action button color, divider color, disabled opacity token.
- Prohibited hardcoded values: no raw colors, no pixel font sizes or spacing, no hardcoded shadow values (use shadow tokens).
- Dark mode: card background, border, and metadata text all resolve correctly in dark theme.

---

## 7. Composition Rules

- May be wrapped by: automation list containers, grid layouts, virtualized lists.
- May contain: rule name, AutomationStatusBadge, trigger description, condition summary, action summary, timestamp, owner avatar, edit/delete/toggle action buttons.
- Anti-patterns:
  - Do not embed a full rule editor inside the card.
  - Do not show more than two quick-action buttons in the card footer to avoid clutter.
  - Do not use the card for non-automation entities.

---

## 8. Performance Constraints

- Cards in a list must be individually memoized to prevent re-rendering the entire list when one rule's enabled state changes.
- If the rule list can exceed 50 items, the list container (not this component) must virtualize.
- Avoid computing complex derived metadata inside the card; receive pre-computed strings as props.

---

## 9. Test Requirements

- Renders rule name, status badge, trigger description, condition summary, and action summary from props.
- Click/Enter/Space on the card fires the navigation callback.
- Enable/disable toggle fires the toggle callback with the new state; aria-pressed updates.
- Delete button fires the delete callback.
- Disabled rule state renders reduced-opacity body text.
- Error status renders the error badge and optional error hint.
- Keyboard: Tab visits the card and each action button; Enter/Space on the card triggers navigation.
- Action button accessible labels include the rule name.
- Accessibility: no axe violations; card has a meaningful accessible name; status badge is readable.
- Reduced motion: no hover animation when `prefers-reduced-motion` is active.
