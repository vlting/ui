# Component Spec — ExportDataButton

## 1. Purpose

Provides a button control that initiates the export of analytics data to an external format (e.g., CSV, JSON, XLSX). It communicates the export action, available formats, and the current state of the operation to the user.

Use when: users need a dedicated entry point to download or export the currently displayed analytics dataset from a chart, table, or dashboard view.

Do NOT use when: exporting accounting reports — use `ExportReportButton` in the accounting module for that purpose. Do NOT embed the export logic or file generation inside this component.

---

## 2. UX Intent

- Primary interaction goal: provide users with a clear, low-friction way to take analytics data out of the application for further analysis.
- Expected user mental model: users expect a button — potentially with a format selection dropdown — that immediately begins a file download or queues an export job, with visible feedback during the operation.
- UX laws applied:
  - **Fitts's Law** — the button must meet minimum tap target dimensions (44x44 pt on mobile).
  - **Jakob's Law** — an icon associated with download/export reinforces the familiar affordance.
  - **Doherty Threshold** — a loading state must appear within 400 ms if the export takes longer than that.

---

## 3. Visual Behavior

- Layout rules: renders as an inline-flex element; width is content-driven by default; may accept a full-width prop; includes a leading or trailing icon slot for the export/download icon.
- Spacing expectations: internal padding uses space tokens from the medium/large button scale to meet tap target minimums.
- Typography rules: label text uses the button type style token; text is single-line and does not wrap.
- Token usage: button background, text, border, icon color, and all state variants reference design tokens.
- Responsive behavior: on mobile, the button may expand to full width; icon and label remain horizontally aligned.

---

## 4. Interaction Behavior

- States:
  - **idle**: fully interactive, displays the export label and icon.
  - **hover**: background shifts to the hover variant token.
  - **focus**: visible focus ring using the focus color token.
  - **active / pressed**: visual press feedback using the active variant token.
  - **loading**: label is supplemented by a loading indicator; the button is non-interactive; `aria-busy="true"` is set.
  - **disabled**: visually dimmed; pointer events removed; `aria-disabled="true"` is set.
  - **success**: transient success indicator before returning to idle.
  - **error**: transient error indicator before returning to idle.
- Controlled vs uncontrolled: loading and disabled states are always controlled externally via props.
- Keyboard behavior: activatable with Enter or Space; if a format-selection menu is present, pressing Enter or Space opens it; Escape closes the menu.
- Screen reader behavior: button has a descriptive accessible name (e.g., "Export data as CSV"); `aria-busy="true"` is set during loading; success/error states are announced via `aria-live`.
- Motion rules: loading spinner and success/error transitions use `duration.fast`; reduced motion disables all animations and uses text-only status changes.

---

## 5. Accessibility Requirements

- ARIA requirements: the button has a non-empty `aria-label` or visible text; `aria-disabled="true"` is used in preference to the HTML `disabled` attribute to keep it in the tab order when needed; `aria-busy="true"` is set during loading; a status `aria-live` region announces export completion or failure.
- Focus rules: focus ring is always visible on keyboard navigation; focus is not lost after the export action resolves.
- Contrast expectations: button label and icon meet WCAG AA (4.5:1 for text, 3:1 for button boundary) in all states and in both light and dark themes.
- Reduced motion behavior: loading spinner and state-transition animations are disabled; status is communicated via text changes or `aria-live` only.

---

## 6. Theming Rules

- Required tokens: button background (idle, hover, active, disabled), button text color (idle, disabled), button border (if outlined variant), focus ring color, loading indicator color, icon color.
- Prohibited hardcoded values: no raw hex codes, pixel padding, or font sizes.
- Dark mode expectations: all button state tokens must have dark-mode variants; the loading indicator must remain visible against both light and dark button backgrounds.

---

## 7. Composition Rules

- What can wrap it: `ChartWrapper` actions slot, `AnalyticsFilterBar`, a dashboard toolbar, a data table header.
- What it may contain: a text label slot, a leading or trailing icon slot, a loading/status indicator slot, and an optional format-selection menu.
- Anti-patterns:
  - Do not place file generation or data serialization logic inside this component.
  - Do not use this component as a navigation link.
  - Do not render multiple format options as sibling buttons; use an attached dropdown menu instead.

---

## 8. Performance Constraints

- Memoization rules: the button is stateless regarding export logic; memoization is only warranted if the parent re-renders at high frequency.
- Virtualization: not applicable.
- Render boundaries: no internal error boundary; the feature-level boundary handles export errors.

---

## 9. Test Requirements

- What must be tested:
  - Renders with the correct label and icon in the idle state.
  - Enters the loading state when the loading prop is set (`aria-busy="true"`, non-interactive).
  - Renders as disabled (`aria-disabled="true"`) when the disabled prop is set.
  - Calls the export callback on activation in the idle state.
  - Does not call the callback when disabled or loading.
- Interaction cases:
  - Activatable with Enter and Space.
  - Does not respond to activation when disabled or loading.
  - Format menu opens on activation when a format list is provided.
- Accessibility checks:
  - Non-empty accessible name in all states.
  - `aria-busy` present during loading.
  - Focus ring visible on keyboard focus.
  - `aria-live` region announces export result.
  - No contrast violations in idle, hover, focus, disabled, and dark-mode states.
