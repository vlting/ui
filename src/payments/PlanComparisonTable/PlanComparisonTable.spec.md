# Component Spec — PlanComparisonTable

## 1. Purpose

Presents a side-by-side comparison of available subscription plans, showing features, limits, and pricing for each plan to help users choose the most appropriate tier.

Use it on pricing pages, upgrade flows, and plan selection screens.

Do NOT use it for comparing non-plan entities (use a generic comparison table), for displaying a single plan's features (use a feature list), or when there is only one available plan.

---

## 2. UX Intent

- Primary interaction goal: evaluation and selection — the user compares plans across features and price to make an informed upgrade or downgrade decision.
- Expected user mental model: a pricing comparison table familiar from SaaS products (Notion, Linear, GitHub, Stripe). Plans are columns; features are rows. The current plan and recommended plan are visually highlighted.
- UX laws applied:
  - Gestalt Law of Continuity: aligned rows allow users to scan a feature across all plans without losing their place.
  - Gestalt Law of Similarity: consistent check/X/dash indicators across cells reduce the cognitive load of reading each cell.
  - Von Restorff Effect: the recommended or current plan column is visually distinguished (highlighted border, badge) so it stands out from alternatives.
  - Hick's Law: limit the number of plans to three or four; more than four creates overwhelming choice.
  - Tesler's Law: the inherent complexity of plan feature differences is managed by the table structure; the component must not simplify it to the point of losing meaningful distinctions.

---

## 3. Visual Behavior

- Layout: a table where each column is a plan and each row is a feature. The first column is a sticky feature-name column. Plan columns have equal width. A header row shows plan name, price, and billing period.
- Spacing: row height and cell padding from space tokens. Section groupings (e.g., "Core Features", "Advanced Features") use group header rows with additional top padding.
- Typography: plan name in header uses a heading scale. Price uses a display/heading scale. Feature names use a body scale. Feature section headers use a label/overline scale. Check/X indicators are icon-scale.
- Token usage:
  - Recommended plan column border/header: accent/primary token.
  - Recommended badge: accent background and on-accent text tokens.
  - Current plan indicator: muted accent or positive token.
  - Included feature indicator: positive/success semantic token.
  - Excluded feature indicator: muted/secondary foreground token.
  - Feature group header background: surface-raised/muted token.
  - CTA button per column: primary (for recommended plan) or secondary (for others).
- Responsive behavior: on narrow viewports, show two columns maximum (current and one alternative). Provide horizontal scrolling for the full table. Sticky feature name column remains fixed. On mobile, consider a "Compare" accordion pattern.

---

## 4. Interaction Behavior

- States:
  - Default: all plan columns displayed equally.
  - Recommended/highlighted: one plan column is visually elevated.
  - Current plan: the user's current plan is labeled.
  - CTA per plan: each plan column has a "Choose plan" or "Upgrade" button.
  - Loading: skeleton columns while plan data loads.
- Controlled vs uncontrolled: display-only. The component receives plan data and feature rows as props. CTA button callbacks (`onSelectPlan(planId)`) are provided by the parent.
- Keyboard behavior:
  - Tab navigates through all CTA buttons in reading order.
  - The table itself is not keyboard-navigable cell-by-cell (it is display-only, not interactive at the cell level).
- Screen reader behavior: the table uses `<table>` semantics with `<th scope="col">` for plan headers and `<th scope="row">` for feature rows. Included/excluded indicators convey their meaning via text (not icon alone). The recommended plan is labeled via an accessible badge text.
- Motion rules: no animations in the static table. CTA button hover uses a subtle background transition from motion tokens. Suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: table has an accessible label (e.g., "Plan comparison"). Plan column headers use `scope="col"`. Feature row headers use `scope="row"`. Included/excluded indicators use text alternatives (not icon-only). The recommended plan badge is readable by screen readers.
- Focus rules: only the CTA buttons are focusable. Tab order progresses left-to-right through CTA buttons.
- Contrast expectations: all feature labels, plan names, prices, and indicators meet WCAG AA contrast. Included indicator (checkmark) and excluded indicator (X or dash) must meet non-text contrast requirements (3:1) for their icons.
- Reduced motion behavior: CTA button transitions are instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: surface, surface-raised, primary text, secondary text, accent (for recommended plan), positive/success, muted/secondary foreground, border, space tokens, radius tokens, shadow tokens (for recommended column elevation).
- Prohibited hardcoded values: no raw hex colors, no pixel-based column widths, no hardcoded font sizes.
- Dark mode expectations: the recommended plan column must remain visually elevated in dark mode. Feature indicators must maintain their semantic meaning and contrast. Plan headers must be clearly readable.

---

## 7. Composition Rules

- What can wrap it: pricing pages, UpgradeModal, SubscriptionSelector flows.
- What it may contain: a plan header row (name, price, period, badge, CTA), feature group header rows, and feature rows with per-plan indicators. Optionally a footer with usage limits or footnotes.
- Anti-patterns:
  - Do not use PlanComparisonTable for comparing non-plan entities.
  - Do not include more than four plan columns — reduce to the most relevant options.
  - Do not make feature cells editable.
  - Do not embed complex interactive controls inside feature cells.

---

## 8. Performance Constraints

- Memoization rules: memoize the component and individual row subcomponents.
- Virtualization: not typically needed for pricing tables (usually under 30 rows). For unusually long feature lists, the parent may supply grouped data to reduce visible rows.
- Render boundaries: the component does not fetch plan data. All data comes from props.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct number of plan columns.
  - Renders all feature rows with the correct included/excluded indicators per plan.
  - The recommended plan is visually marked and its badge text is present.
  - The current plan is labeled correctly.
  - CTA buttons render for each plan and call `onSelectPlan(planId)` with the correct ID.
  - Feature group headers render correctly.
  - Loading skeleton renders when loading is true.
- Interaction cases:
  - Tab navigation reaches all CTA buttons in order.
  - Clicking a CTA button calls the correct callback.
- Accessibility checks:
  - Table has an accessible label.
  - Column headers have `scope="col"`, row headers have `scope="row"`.
  - Included/excluded indicators have text alternatives.
  - Recommended plan badge is readable by screen readers.
  - Contrast passes in both themes for all indicators and text.
