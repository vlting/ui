# Component Spec — ProgressTracker

## 1. Purpose

Displays a multi-step progress indicator showing the user's position within a sequential flow such as an onboarding journey, course completion, or multi-step media upload process.

Use when: communicating progress through a defined series of steps where the user needs to understand how many steps remain.

Do NOT use when: showing a single linear progress bar for a loading or upload operation (use `UploadProgressItem`) or for continuous playback progress (use an audio/video scrubber).

---

## 2. UX Intent

- Primary interaction goal: orient the user within a multi-step process and reduce anxiety about how much effort remains.
- Expected user mental model: a step indicator — numbered circles or icons connected by lines — that shows completed, current, and remaining steps.
- UX laws applied:
  - **Miller's Law** — keep step count to 7 or fewer for a single progress tracker; break longer flows into phases.
  - **Gestalt (Continuity)** — connector lines between steps visually imply sequence and flow.
  - **Tesler's Law** — the tracker absorbs complexity by showing only "done / current / remaining" without requiring users to count manually.
  - **Doherty Threshold** — step state updates must reflect immediately on user action.

---

## 3. Visual Behavior

- Layout: horizontal sequence of step nodes connected by lines; on narrow viewports may collapse to a condensed form (e.g., "Step 2 of 5").
- Each step node: a circle (or icon) with a label below; completed steps show a checkmark; the current step is highlighted; future steps are muted.
- Connector lines: thin horizontal lines between nodes; filled/colored for completed segments, muted for remaining.
- Spacing: node size, connector width, and label margins reference space and size tokens.
- Typography: step labels use caption/label token; condensed mobile format uses body token.
- Token usage: completed color, current color, remaining/muted color, and connector colors reference theme tokens only.
- Responsive behavior: on narrow viewports switches to a condensed textual format ("Step N of M") or a single-row scrollable tracker.

---

## 4. Interaction Behavior

- States:
  - **idle**: all steps rendered in their current completion state.
  - **step completed**: a step transitions from "current" to "completed" when the user advances.
  - **navigable steps**: completed steps may be pressable to navigate back (controlled externally).
  - **disabled**: non-interactive; shows progress but does not respond to interaction.
- Controlled/uncontrolled: current step index is controlled externally; if steps are navigable, the consumer handles `onStepPress`.
- Keyboard behavior: if steps are navigable, `Tab` moves focus between step nodes; `Enter` or `Space` activates a navigable step.
- Screen reader behavior: the tracker announces the current step label and position (e.g., "Step 2 of 5: Account details — current").
- Motion rules: step completion transitions (e.g., checkmark reveal, line fill) respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- ARIA: the tracker uses `role="list"` (or `role="navigation"` if steps are navigable) with `role="listitem"` per step; current step has `aria-current="step"`.
- Completed steps communicate their state via `aria-label` (e.g., "Step 1: Personal info — completed").
- Connector lines are decorative and hidden from the accessibility tree.
- Contrast: completed and current step icons/text meet WCAG 2.1 AA.
- Reduced motion: suppress step transition animations.

---

## 6. Theming Rules

- Required tokens: `colorCompleted`, `colorCurrent`, `colorRemaining`, `colorMuted`, `background` (node background), `borderColor`, `space`, `size` (node diameter).
- Prohibited hardcoded values: no literal color strings, pixel sizes, or transition durations.
- Dark mode: completed, current, and remaining states must all maintain sufficient contrast in dark themes.

---

## 7. Composition Rules

- Accepts a steps array (label, optional icon, status) and a currentStep index as props.
- May be placed at the top of a form, modal, or page to indicate progress.
- Does not own navigation logic; step navigation is handled externally.
- Anti-patterns:
  - Do not hardcode step labels or counts.
  - Do not implement form submission or navigation logic inside this component.
  - Do not use color alone to distinguish completed/current/remaining states.

---

## 8. Performance Constraints

- No internal data fetching or subscriptions.
- Memoize the step list when the steps array prop is stable.
- Step transitions should be CSS-driven, not JavaScript-animated, to minimize jank.

---

## 9. Test Requirements

- Renders the correct number of step nodes from props.
- Completed steps show a checkmark and are announced as completed.
- Current step is visually highlighted and has `aria-current="step"`.
- Remaining steps are muted and do not show a checkmark.
- Navigable completed steps fire `onStepPress` when activated.
- Keyboard navigation (Tab, Enter, Space) works when steps are navigable.
- Condensed mobile format renders "Step N of M" text.
- No hardcoded color, spacing, or size values appear in rendered output.
- Passes axe accessibility audit in idle and multi-step-completed states.
