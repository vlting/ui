# Component Contract — PlanComparisonTable

## 1. Public API

### Base Props

`PlanComparisonTable` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

| Category | Examples |
|----------|---------|
| Layout | `width`, `height`, `minWidth`, `maxWidth`, `flex`, `flexDirection` |
| Spacing | `padding`, `paddingHorizontal`, `margin`, `gap` (space tokens) |
| Visual | `backgroundColor`, `borderColor`, `borderRadius`, `opacity` |
| Theme | `theme`, `themeInverse` |
| Animation | `animation`, `enterStyle`, `exitStyle` |
| Accessibility | `accessible`, `accessibilityLabel`, `accessibilityRole`, `aria-*` |
| Events | `onPress`, `onHoverIn`, `onHoverOut`, `onFocus`, `onBlur` |

### Component-Specific Props

No additional props are defined in the current stub implementation. Props specific to the component's behavior (e.g., data, state, callbacks) are to be defined when behavioral logic is implemented per the `.spec.md`.

### Composition Context

Intended to be wrapped by: pricing pages, UpgradeModal, SubscriptionSelector flows.

May contain: a plan header row (name, price, period, badge, CTA), feature group header rows, and feature rows with per-plan indicators. Optionally a footer with usage limits or footnotes.

---

## 2. Behavioral Guarantees

- Default: all plan columns displayed equally.
  - Recommended/highlighted: one plan column is visually elevated.
  - Current plan: the user's current plan is labeled.
  - CTA per plan: each plan column has a "Choose plan" or "Upgrade" button.
  - Loading: skeleton columns while plan data loads.
- Controlled vs uncontrolled: display-only. The component receives plan data and feature rows as props. CTA button callbacks (`onSelectPlan(planId)`) are provided by the parent.
- Keyboard behavior:
- Screen reader behavior: the table uses `<table>` semantics with `<th scope="col">` for plan headers and `<th scope="row">` for feature rows. Included/excluded indicators convey their meaning via text (not icon alone). The recommended plan is labeled via an accessible badge text.
- Motion rules: no animations in the static table. CTA button hover uses a subtle background transition from motion tokens. Suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: table has an accessible label (e.g., "Plan comparison"). Plan column headers use `scope="col"`. Feature row headers use `scope="row"`. Included/excluded indicators use text alternatives (not icon-only). The recommended plan badge is readable by screen readers.
- Focus rules: only the CTA buttons are focusable. Tab order progresses left-to-right through CTA buttons.
- Contrast expectations: all feature labels, plan names, prices, and indicators meet WCAG AA contrast. Included indicator (checkmark) and excluded indicator (X or dash) must meet non-text contrast requirements (3:1) for their icons.
- Reduced motion behavior: CTA button transitions are instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: surface, surface-raised, primary text, secondary text, accent (for recommended plan), positive/success, muted/secondary foreground, border, space tokens, radius tokens, shadow tokens (for recommended column elevation).
- Prohibited hardcoded values: no raw hex colors, no pixel-based column widths, no hardcoded font sizes.
- Dark mode expectations: the recommended plan column must remain visually elevated in dark mode. Feature indicators must maintain their semantic meaning and contrast. Plan headers must be clearly readable.

- Responsive behavior: on narrow viewports, show two columns maximum (current and one alternative). Provide horizontal scrolling for the full table. Sticky feature name column remains fixed. On mobile, consider a "Compare" accordion pattern.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PlanComparisonTable.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
