# Component Spec — AnalyticsFilterBar

## 1. Purpose

Provides a horizontal bar of filter controls (e.g., date range, dimension selectors, segment toggles) that allow users to narrow the data displayed in an analytics view. Acts as a presentation container for filter affordances — it does not own filter state or perform data queries.

Use when: multiple filter dimensions must be presented together at the top of an analytics dashboard or report view.

Do NOT use when: only a single filter control is needed — use that control directly. Do NOT use in non-analytics contexts — prefer module-specific filter patterns for other domains.

---

## 2. UX Intent

- Primary interaction goal: allow users to define the scope of data they want to analyze with minimal steps and clear visual feedback about which filters are active.
- Expected user mental model: users expect a persistent, always-visible row of controls near the top of the analytics view; active filters are visually distinct from inactive ones; resetting filters is always one action away.
- UX laws applied:
  - **Hick's Law** — present only the most commonly needed filters in the primary bar; surface advanced filters behind a "More filters" disclosure.
  - **Jakob's Law** — horizontal filter bars are a well-established pattern in analytics tools; follow this convention.
  - **Gestalt Law of Proximity** — related filter controls (e.g., start date and end date) are grouped with tighter spacing than unrelated controls.
  - **Fitts's Law** — filter controls and the reset action must meet minimum tap target sizes.

---

## 3. Visual Behavior

- Layout rules: horizontal flex row; controls are laid out left to right in order of conceptual importance; the "Reset" or "Clear all" action is pinned to the trailing end; the bar does not wrap to multiple lines on desktop — overflow is handled by horizontal scroll or a "More" affordance.
- Spacing expectations: gap between filter controls uses a space token from the medium scale; internal padding of each control is consistent with the design system's input sizing tokens.
- Typography rules: filter labels and selected values use the body or label type style token; placeholder text uses a muted color token.
- Token usage: bar background, border, control backgrounds, active filter highlight, and text colors all reference design tokens.
- Responsive behavior: on mobile, the bar collapses to a single "Filters" button that opens a sheet or modal containing the same controls in a vertical layout.

---

## 4. Interaction Behavior

- States:
  - **idle / no active filters**: all controls show their default/placeholder state.
  - **filter active**: the affected control is visually highlighted using the active filter token; the reset action becomes prominent.
  - **loading**: controls may show a subtle disabled state while data is loading in response to a filter change.
  - **disabled**: all controls are visually dimmed and non-interactive.
- Controlled vs uncontrolled: all filter values are controlled externally; this component renders the provided state and calls change callbacks.
- Keyboard behavior: Tab navigates through each control in order; individual controls handle their own internal keyboard interaction; the reset action is reachable via Tab and activatable with Enter or Space.
- Screen reader behavior: the filter bar has `aria-label="Filters"` or equivalent; each control has a descriptive label; active filter count is announced via an `aria-live` region when filters change.
- Motion rules: filter chip appearance/disappearance uses `duration.fast` tokens; the mobile sheet open/close uses `duration.normal`; reduced motion disables all animations.

---

## 5. Accessibility Requirements

- ARIA requirements: the filter bar container has `role="toolbar"` with `aria-label`; each control within the toolbar is labelled; the active filter count summary is in an `aria-live="polite"` region.
- Focus rules: focus order follows the left-to-right visual order; after applying a filter, focus must remain on or return to the control that was changed.
- Contrast expectations: control labels, selected values, and placeholder text meet WCAG AA (4.5:1 for text, 3:1 for control boundaries) against their backgrounds.
- Reduced motion behavior: all transitions are disabled; filter state changes are reflected immediately in the static visual state.

---

## 6. Theming Rules

- Required tokens: bar background, bar border, control background (idle, active, hover, focus, disabled), control text color, active indicator color, reset action color.
- Prohibited hardcoded values: no raw hex codes, pixel gap values, or font sizes.
- Dark mode expectations: active filter highlights and control borders must remain distinguishable against the bar background in dark mode.

---

## 7. Composition Rules

- What can wrap it: a dashboard header, a report page header, an analytics module layout.
- What it may contain: `DateRangeSelector`, dimension select controls, segment toggle groups, a filter chip list, and a reset/clear action.
- Anti-patterns:
  - Do not embed data fetching or filter application logic inside this component.
  - Do not use this component as a navigation bar — filter controls must not be used for routing.
  - Do not add more than five to seven controls in the default bar state; surface additional controls behind a "More" disclosure.

---

## 8. Performance Constraints

- Memoization rules: the bar itself is lightweight; individual filter controls should be memoized if they perform expensive renders.
- Virtualization: not applicable.
- Render boundaries: no internal error boundary required; the analytics page-level boundary handles errors.

---

## 9. Test Requirements

- What must be tested:
  - Renders all supplied filter controls in order.
  - Highlights the correct control when a filter is active.
  - Calls the reset callback when the reset action is activated.
  - Renders in the collapsed mobile state at narrow viewport widths.
- Interaction cases:
  - Tab order traverses all controls and the reset action.
  - Reset action is activatable with Enter and Space.
  - Active filter count is announced to screen readers when filters change.
- Accessibility checks:
  - `role="toolbar"` and `aria-label` present on the bar.
  - All controls have descriptive labels.
  - Active filter announcement in `aria-live` region.
  - No contrast violations in idle and active states in both light and dark themes.
