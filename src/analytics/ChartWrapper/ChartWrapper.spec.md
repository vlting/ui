# Component Spec — ChartWrapper

## 1. Purpose

Provides a consistent structural shell for all chart components, housing the chart title, optional subtitle, legend, action controls (e.g., export, time-range switcher), and the chart content area. Ensures visual and behavioral consistency across every chart in the analytics module.

Use when: any chart component needs a standardized container with title, legend, and action affordances.

Do NOT use when: embedding a chart inside a context where the title and action chrome are managed externally — in that case, use the chart component directly without this wrapper.

---

## 2. UX Intent

- Primary interaction goal: give users clear contextual information about what a chart shows (title, period), and provide easy access to chart-level actions (export, expand, time range change) without cluttering the data area.
- Expected user mental model: users expect chart cards with a header row (title + actions) and a body (the chart itself + legend); this matches the convention established in tools like Google Analytics, Tableau, and most BI dashboards.
- UX laws applied:
  - **Jakob's Law** — title-top, actions-top-right, legend-bottom or legend-right matches the established dashboard chart pattern.
  - **Gestalt Law of Proximity** — title and subtitle are grouped tightly; actions are grouped separately at the opposite end of the header row.
  - **Hick's Law** — limit the number of chart-level actions to three or fewer in the header to reduce decision overhead.

---

## 3. Visual Behavior

- Layout rules: vertical stack — header row (title + actions), chart content area, optional legend row; the chart content area expands to fill available height; the wrapper has a defined border radius and optional elevation (shadow token).
- Spacing expectations: padding inside the wrapper uses space tokens (medium scale); gap between the header and chart body uses a space token; legend is separated from the chart body by a consistent gap token.
- Typography rules: chart title uses the heading (small) type style token; subtitle/context label uses the caption type style token; legend labels use the caption or label type style token.
- Token usage: wrapper background, border, shadow, title text, subtitle text, action icon colors, and legend text all reference design tokens.
- Responsive behavior: on mobile, the header may stack title and actions vertically; the legend may collapse to a horizontal scroll row or be hidden behind a toggle.

---

## 4. Interaction Behavior

- States:
  - **idle**: fully rendered with chart content.
  - **loading**: the chart content area displays a skeleton; the header and legend remain visible.
  - **empty**: the chart content area shows the empty state; the header remains visible.
  - **error**: the chart content area shows the error state; the header remains visible.
  - **expanded** (optional): the wrapper fills a larger area (e.g., full-screen modal) when an expand action is triggered.
- Controlled vs uncontrolled: expansion state and active time-range are controlled externally; no internal state beyond layout.
- Keyboard behavior: Tab navigates through the header actions in order; the chart content area is entered via Tab and managed by the chart component itself.
- Screen reader behavior: the wrapper has `aria-label` or `aria-labelledby` pointing to the chart title element; the chart content region has `role="region"` with a label.
- Motion rules: expansion/collapse uses `duration.normal`; state transitions use `duration.fast`; reduced motion disables all animations.

---

## 5. Accessibility Requirements

- ARIA requirements: the wrapper root has `role="region"` and `aria-labelledby` pointing to the title element; header action buttons have descriptive `aria-label` values.
- Focus rules: focus order is title (if interactive) → header actions → chart content; focus must not be trapped within the wrapper.
- Contrast expectations: title and subtitle text meet WCAG AA (4.5:1) against the wrapper background; action icons meet 3:1 non-text contrast.
- Reduced motion behavior: expansion animation is disabled; the wrapper renders in its final expanded/collapsed state immediately.

---

## 6. Theming Rules

- Required tokens: wrapper background, wrapper border, wrapper shadow, title text color, subtitle text color, action icon color, legend text color, divider color (between header and body).
- Prohibited hardcoded values: no raw hex codes, pixel padding, or font sizes.
- Dark mode expectations: wrapper background must be distinguishable from the page background in dark mode; border and shadow tokens must remain visible.

---

## 7. Composition Rules

- What can wrap it: a dashboard grid cell, a page section, a modal or sheet.
- What it may contain: a title slot, a subtitle slot, an actions slot (header-right), the chart component slot (body), and a legend slot.
- Anti-patterns:
  - Do not embed chart data fetching or state management inside `ChartWrapper`.
  - Do not nest `ChartWrapper` inside another `ChartWrapper`.
  - Do not hard-code a fixed height on the chart body slot — allow the chart component to define its own height.

---

## 8. Performance Constraints

- Memoization rules: the wrapper itself is lightweight; memoization of the inner chart component is the caller's responsibility.
- Virtualization: not applicable.
- Render boundaries: the wrapper should be wrapped in a feature-level error boundary; the error state slot handles display of caught errors gracefully.

---

## 9. Test Requirements

- What must be tested:
  - Renders the title and subtitle from props.
  - Renders the actions slot content in the header.
  - Renders the chart content slot in the body.
  - Renders the legend slot when provided.
  - Passes loading and error states through to the appropriate slots.
- Interaction cases:
  - Header action buttons are reachable via Tab and activatable with Enter or Space.
  - Expand action (if present) transitions the wrapper to the expanded state.
- Accessibility checks:
  - `role="region"` and `aria-labelledby` present on the wrapper root.
  - Title element is the labelling target.
  - All header action buttons have non-empty `aria-label` values.
  - No contrast violations on title, subtitle, or action icons in light and dark themes.
