# Component Spec — ExportReportButton

## 1. Purpose

Provides a button control that initiates the export of an accounting report to an external format (e.g., PDF, CSV, XLSX). It communicates the availability and current state of the export action to the user.

Use when: the user needs a single, clearly labeled entry point to trigger a report export within an accounting or financial reporting context.

Do NOT use when: displaying a general-purpose export action outside of the accounting/reporting domain — prefer a generic action button component for non-accounting contexts. Do NOT embed the actual export logic inside this component.

---

## 2. UX Intent

- Primary interaction goal: give users a clear, confident action to extract accounting data in a portable format without ambiguity about what will be exported.
- Expected user mental model: users expect a button — possibly with a dropdown for format selection — that immediately begins or queues an export, providing feedback during the operation.
- UX laws applied:
  - **Fitts's Law** — the button must have a sufficiently large tap/click target (minimum 44x44 pt on mobile).
  - **Jakob's Law** — an icon associated with export (e.g., arrow-down-tray or similar) reinforces familiar download affordances.
  - **Doherty Threshold** — if the export takes longer than 400 ms, a loading state must be shown immediately on press.

---

## 3. Visual Behavior

- Layout rules: renders as an inline-flex element; width is content-driven by default but may accept a full-width prop; includes a leading or trailing icon slot for the export/download icon.
- Spacing expectations: internal padding uses space tokens from the medium/large button scale to meet minimum tap target requirements.
- Typography rules: label text uses the button type style token; text is single-line and does not wrap.
- Token usage: button background, text, border, and icon colors all reference design tokens; different visual variants (primary, secondary, ghost) map to distinct token sets.
- Responsive behavior: on mobile, the button may expand to full width within its container; icon and label remain horizontally aligned.

---

## 4. Interaction Behavior

- States:
  - **idle**: button is fully interactive and displays the export label.
  - **hover**: background shifts to the hover variant token.
  - **focus**: visible focus ring using the focus color token.
  - **active / pressed**: visual press feedback using the active variant token.
  - **loading**: label is replaced or supplemented by a loading indicator; the button is non-interactive; `aria-busy="true"` is set.
  - **disabled**: button is visually dimmed using the disabled token; pointer events are removed; `aria-disabled="true"` is set.
  - **success**: optionally displays a transient success indicator (checkmark or brief label change) before returning to idle.
  - **error**: optionally displays a transient error indicator before returning to idle.
- Controlled vs uncontrolled: loading and disabled states are always controlled externally via props.
- Keyboard behavior: activatable with Enter or Space; when a format-selection dropdown is present, pressing Enter or Space opens it.
- Screen reader behavior: button has a descriptive accessible name combining the action and the report context (e.g., "Export Q1 Report as CSV"); `aria-busy` is set during loading.
- Motion rules: loading spinner entrance and success/error feedback transitions use `duration.fast` tokens; reduced motion disables all transitions and shows static states only.

---

## 5. Accessibility Requirements

- ARIA requirements: the button element has a non-empty `aria-label` or visible text label; `aria-disabled="true"` is used instead of the HTML `disabled` attribute when the button must remain in the tab order; `aria-busy="true"` is set during loading.
- Focus rules: focus ring is always visible on keyboard navigation; focus must not be lost after the export action resolves.
- Contrast expectations: button label and icon meet WCAG AA (4.5:1 for text, 3:1 for the button boundary against the surface) in all states and in both light and dark themes.
- Reduced motion behavior: loading spinner and state-transition animations are disabled; status changes are communicated via text changes or `aria-live` announcements only.

---

## 6. Theming Rules

- Required tokens: button background (idle, hover, active, disabled), button text color (idle, disabled), button border color (if outlined variant), focus ring color, loading indicator color, icon color.
- Prohibited hardcoded values: no raw hex codes, pixel padding, or font sizes.
- Dark mode expectations: all button state tokens must have dark-mode variants; the loading indicator must remain visible against both light and dark button backgrounds.

---

## 7. Composition Rules

- What can wrap it: a toolbar, action bar, report header, or card footer.
- What it may contain: a text label slot, a leading or trailing icon slot, and a loading/status indicator slot.
- Anti-patterns:
  - Do not place export logic (file generation, API calls) inside this component.
  - Do not use this component as a navigation link — use a link component for navigation.
  - Do not render multiple export format options as sibling buttons; use a dropdown or menu attached to this button instead.

---

## 8. Performance Constraints

- Memoization rules: the button is stateless with respect to export logic; memo wrapping is only warranted if the parent renders at high frequency.
- Virtualization: not applicable.
- Render boundaries: no error boundary needed at this level; the feature-level boundary handles export errors.

---

## 9. Test Requirements

- What must be tested:
  - Renders with the correct label text and icon in the idle state.
  - Enters the loading state (non-interactive, `aria-busy="true"`) when the loading prop is set.
  - Renders as disabled (`aria-disabled="true"`) when the disabled prop is set.
  - Calls the provided callback when activated in the idle state.
  - Does not call the callback when disabled or loading.
- Interaction cases:
  - Activatable with Enter and Space.
  - Does not respond to click or keyboard activation when disabled.
- Accessibility checks:
  - Non-empty accessible name in all states.
  - `aria-busy` present during loading.
  - Focus ring visible on keyboard focus.
  - No contrast violations in idle, hover, focus, disabled, and dark-mode states.
