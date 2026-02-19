# Component Spec — FunnelVisualization

## 1. Purpose

Renders a visual representation of a marketing or conversion funnel, showing the sequential stages users pass through and the drop-off at each step.

Use when: communicating funnel-stage conversion rates on analytics dashboards or campaign performance reports.

Do NOT use when: displaying a single metric (use `ConversionStatCard`) or a linear progress bar without stage breakdown (use a progress component).

---

## 2. UX Intent

- Primary interaction goal: help users identify which funnel stages have the highest drop-off so they can prioritize optimization efforts.
- Expected user mental model: a funnel shape or stepped bar chart where each stage is narrower than the previous, representing fewer users at each step.
- UX laws applied:
  - **Gestalt (Continuity, Similarity)** — stages flow visually from top to bottom (or left to right), implying progression.
  - **Doherty Threshold** — funnel stages must render immediately; perceived loading must be under 400 ms.
  - **Miller's Law** — limit funnel stages to a number that can be visually parsed without scrolling (typically 4–7).
  - **Fitts's Law** — interactive stage elements (if tappable for drill-down) must have large enough touch targets.

---

## 3. Visual Behavior

- Layout: a vertically or horizontally stacked series of stage blocks, each labeled with the stage name, user count or percentage, and conversion rate from the previous stage.
- Each stage block is proportionally sized relative to the total entry volume; visual width or height encodes the volume.
- Drop-off between stages is shown either as a gap, a percentage label, or a visual indicator.
- Spacing: stage gaps and internal padding reference space tokens.
- Typography: stage name uses label token; percentage and count values use a numeric/data token.
- Token usage: stage fill colors, drop-off indicators, and text colors reference theme tokens only.
- Responsive behavior: on narrow viewports the funnel switches to a vertical orientation; on wider viewports it may render horizontally.

---

## 4. Interaction Behavior

- States:
  - **idle**: all stages rendered with provided data.
  - **hover**: hovering a stage highlights it and may surface a tooltip with additional detail.
  - **focus**: focused stage shows a visible focus ring.
  - **loading**: skeleton or placeholder while data is being provided.
  - **empty**: a meaningful empty state when no funnel data is provided.
- The funnel is primarily presentational; stage selection or drill-down is optional and controlled externally.
- Controlled/uncontrolled: stage highlight state is controlled externally if interactive.
- Keyboard behavior: if stages are interactive, arrow keys navigate between stages; `Enter` or `Space` activates.
- Screen reader behavior: the funnel communicates as a structured list of stages, each announcing its name, volume, and conversion rate.
- Motion rules: entrance animations and hover transitions respect `prefers-reduced-motion`; no animation when reduced motion is active.

---

## 5. Accessibility Requirements

- ARIA: the funnel container uses `role="img"` with an `aria-label` summarizing the funnel when purely decorative, or `role="list"` with `role="listitem"` per stage when structured content is intended.
- Each stage must be accessible via keyboard if interactive.
- Stage volumes and conversion rates must be communicated as text, not only as visual width/height.
- Contrast: stage fill colors and text must meet WCAG 2.1 AA.
- Reduced motion: suppress entrance animations and hover transitions.

---

## 6. Theming Rules

- Required tokens: stage fill tokens (supporting multiple distinct stages), `color` (text), `colorMuted`, `background`, `borderColor`, `space`, `borderRadius`.
- Stage colors must be distinct without relying solely on hue; use pattern or icon differentiation for color-blind users.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or dimension values.
- Dark mode: all tokens must resolve with sufficient contrast in dark themes.

---

## 7. Composition Rules

- Accepts an array of stage data as props; does not compute funnel data internally.
- May be placed inside a dashboard card or analytics panel.
- Tooltip content (if any) is a separate component composed by the consumer.
- Anti-patterns:
  - Do not hardcode stage names, volumes, or colors.
  - Do not fetch funnel data from an API inside this component.
  - Do not embed business logic for funnel calculation inside this component.

---

## 8. Performance Constraints

- No internal data fetching or subscriptions.
- If the stage count is high, the component must not cause layout thrashing by measuring DOM dimensions on every render.
- Memoize the stage list rendering when the data prop is stable.

---

## 9. Test Requirements

- Renders the correct number of stage blocks from props.
- Each stage displays its name, volume, and conversion rate.
- Stage blocks are proportionally sized relative to the total volume.
- Empty state renders a meaningful message when no data is provided.
- Loading state renders visible placeholders.
- Keyboard navigation works when stages are interactive.
- Screen reader announces each stage name and its conversion rate.
- No hardcoded color, spacing, or dimension values appear in rendered output.
- Passes axe accessibility audit in idle and loading states.
