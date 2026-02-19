# Component Spec — CampaignCard

## 1. Purpose

Displays a summary of a single marketing campaign including its title, current status, and key performance metrics in a scannable card format.

Use when: rendering a list or grid of campaigns for overview dashboards or campaign management screens.

Do NOT use when: showing detailed campaign analytics (link to a detail view) or displaying a single isolated metric (use `ConversionStatCard`).

---

## 2. UX Intent

- Primary interaction goal: allow users to assess campaign health and status at a glance without opening a detail view.
- Expected user mental model: a familiar content card — title, status badge, and a small set of metrics — consistent with dashboard card patterns in marketing tools.
- UX laws applied:
  - **Gestalt (Figure/Ground, Proximity)** — group title + status together; keep metrics visually separated.
  - **Miller's Law** — limit visible metrics to 3–5 per card to avoid cognitive overload.
  - **Jakob's Law** — match the card layout to common marketing dashboard conventions.
  - **Doherty Threshold** — status and metric rendering must be immediate; no deferred painting of critical content.

---

## 3. Visual Behavior

- Layout: composed via `CampaignCard.Title`, `CampaignCard.Status`, and `CampaignCard.Metrics` sub-components within the `CampaignCard` root.
- Title slot: renders the campaign name; truncates with ellipsis when it overflows a single line.
- Status slot: renders a badge or label indicating the campaign lifecycle state (e.g., draft, active, paused, completed).
- Metrics slot: renders a horizontal or grid arrangement of key metric pairs (label + value).
- Spacing: all padding and gap values reference space tokens.
- Typography: campaign name uses heading token; status uses label token; metric values use a data/numeric token.
- Token usage: background, border, status badge color, and text colors reference theme tokens only.
- Responsive behavior: full width on narrow viewports; fixed or fluid width within a grid on wider viewports.

---

## 4. Interaction Behavior

- States:
  - **idle**: card displays all passed data.
  - **hover** (pointer devices): subtle background or elevation shift using theme tokens.
  - **focus**: visible focus ring on the card root when pressable.
  - **disabled**: reduced opacity; non-interactive.
- The card is not interactive by default; it becomes pressable when wrapped by the consumer.
- Controlled/uncontrolled: no internal selection state; any selected/active state is controlled externally.
- Keyboard behavior: if pressable, activates on `Enter` and `Space`.
- Screen reader behavior: card root announces the campaign title as its accessible name; sub-components are read in document order.
- Motion rules: hover/focus transitions use the system reduced-motion token; no animation when `prefers-reduced-motion: reduce` is active.

---

## 5. Accessibility Requirements

- ARIA: `role="article"` on the root frame when used in a list context; if selectable, use `role="option"` within a `listbox`.
- The campaign title must be reachable as the accessible name.
- Status badge must convey its meaning via text or a labelled icon, not color alone.
- Contrast: all text/background pairings meet WCAG 2.1 AA.
- Focus ring must be clearly visible and never clipped.
- Reduced motion: suppress decorative transitions; retain instant state changes.

---

## 6. Theming Rules

- Required tokens: `background`, `backgroundHover`, `borderColor`, `color`, `colorMuted`, `focusStyle`, `space`, `borderRadius`.
- Status badge tokens: each status variant (active, paused, draft, completed) maps to a semantic color token, not a hardcoded color.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or border-radius numbers.
- Dark mode: all tokens must resolve correctly in both light and dark themes.

---

## 7. Composition Rules

- Composed using `CampaignCard`, `CampaignCard.Title`, `CampaignCard.Status`, `CampaignCard.Metrics`.
- May be wrapped in a pressable or anchor element by the consumer.
- May be placed inside a grid or list container for multi-campaign views.
- Anti-patterns:
  - Do not nest another `CampaignCard` inside this component.
  - Do not place full analytics tables inside the card; link to a detail view instead.
  - Do not hardcode campaign names, status strings, or metric labels.

---

## 8. Performance Constraints

- Memoize when rendered inside a long list or frequently updating dashboard.
- No internal data fetching, subscriptions, or timers.
- Virtualization is the responsibility of the parent list.

---

## 9. Test Requirements

- Renders campaign title, status, and metrics from props.
- `CampaignCard.Title` truncates long names with ellipsis.
- `CampaignCard.Status` renders the correct status label and does not rely solely on color.
- `CampaignCard.Metrics` renders all provided metric pairs.
- Hover state applies a background change using a theme token.
- Focus ring is visible when the card is focused via keyboard.
- No hardcoded color, spacing, or font-size values appear in rendered output.
- Passes axe accessibility audit.
