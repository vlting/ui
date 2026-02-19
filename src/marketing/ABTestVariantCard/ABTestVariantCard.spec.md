# Component Spec — ABTestVariantCard

## 1. Purpose

Displays a single variant within an A/B test experiment, surfacing its label, description, traffic allocation, and performance metrics in a scannable card format.

Use when: presenting A/B or multivariate test variants to marketers or product teams who need to compare experiment arms at a glance.

Do NOT use when: showing aggregate campaign-level data (use `CampaignCard`) or displaying a simple statistic in isolation (use `ConversionStatCard`).

---

## 2. UX Intent

- Primary interaction goal: allow users to quickly compare variant identity and results without needing to drill into a detail view.
- Expected user mental model: a "card" representing one branch of an experiment — users expect a label, a brief description, and at least one key metric.
- UX laws applied:
  - **Miller's Law** — surface only the most critical metric(s) per card; avoid overloading with data.
  - **Hick's Law** — limit in-card actions; comparison decisions happen at the list/grid level, not within a single card.
  - **Gestalt (Proximity)** — group label + description together, metrics together, and status/badge together so relationships are visually obvious.

---

## 3. Visual Behavior

- Layout: vertical stack. Variant label and identifier at top, optional description below, metrics section at bottom.
- An optional "winner" or "control" badge should be visually distinct but not rely on color alone (icon + label required for accessibility).
- Spacing: uses size/space tokens throughout; no hardcoded margins or padding.
- Typography: label uses a heading-weight token; metric values use a numeric/data-weight token; description uses body token.
- Token usage: background, border, text, and metric highlight colors must all reference theme tokens.
- Responsive behavior: on narrow viewports the card occupies full width; on wider viewports it may sit in a grid alongside peer variant cards.

---

## 4. Interaction Behavior

- States:
  - **idle**: card renders with all provided data.
  - **hover** (pointer devices): subtle background shift using a theme hover token; no layout change.
  - **focus**: visible focus ring using focus token color and 2 px minimum width.
  - **selected/active**: border or background highlight to indicate the chosen or highlighted variant; must not rely on color alone.
  - **disabled**: reduced opacity via token; non-interactive.
- The card itself is not an interactive control by default; it may be made pressable by a wrapping consumer.
- Controlled/uncontrolled: selection state is controlled externally; the card renders whichever state is passed.
- Keyboard behavior: if pressable, activates on `Enter` and `Space`.
- Screen reader behavior: the card container should expose its label and key metric values in reading order.
- Motion rules: hover/focus transitions use the system reduced-motion token; no animation when `prefers-reduced-motion: reduce` is active.

---

## 5. Accessibility Requirements

- ARIA: if the card is selectable, the root element should carry `role="radio"` or `role="option"` within an appropriate group; otherwise `role="article"`.
- The variant label must be reachable as the accessible name of the card.
- Focus: focus ring must be visible at all times when navigating by keyboard; must not be clipped.
- Contrast: all text/background pairings must meet WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text and UI components).
- Winner/control badge: must communicate meaning via text or icon label, not color alone.
- Reduced motion: suppress decorative transitions; retain instant state changes.

---

## 6. Theming Rules

- Required tokens: `background`, `borderColor`, `color` (text), `colorHover`, `backgroundHover`, `focusStyle`, `borderRadius`, `space` (padding).
- Prohibited hardcoded values: no literal color strings, pixel spacing, border-radius numbers, or font-size values.
- Dark mode: all tokens must resolve correctly in both light and dark themes; metric highlight tokens must maintain sufficient contrast in both modes.

---

## 7. Composition Rules

- May be wrapped by a pressable or anchor element provided by the consumer.
- May be placed inside a grid or flex container for multi-variant comparison layouts.
- Internal slots (label, metrics, badge, description) are composed by the consumer passing children or props; the card does not fetch or compute variant data.
- Anti-patterns:
  - Do not nest another `ABTestVariantCard` inside this component.
  - Do not place full data tables inside the card; link to a detail view instead.
  - Do not hardcode variant names or metric labels inside the component.

---

## 8. Performance Constraints

- The component should be memoized if rendered inside a frequently updating list or grid.
- No internal timers, subscriptions, or side effects.
- Virtualization is the responsibility of the parent list; this component only renders what is passed.

---

## 9. Test Requirements

- Renders label, description, and metric values from props.
- Renders a "winner" badge only when the appropriate prop is set.
- Applies selected visual state when the selected prop is true.
- Applies disabled visual state and suppresses interaction when disabled.
- Focus ring is visible when focused via keyboard.
- Badge communicates status without relying solely on color (text or icon present).
- No hardcoded color, spacing, or font-size values appear in rendered output.
- Passes an axe accessibility audit in both idle and selected states.
