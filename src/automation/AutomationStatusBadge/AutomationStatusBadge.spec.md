# Component Spec — AutomationStatusBadge

## 1. Purpose

AutomationStatusBadge displays the current operational status of an automation rule or workflow in a compact, at-a-glance format. It communicates states such as active, inactive, paused, error, or running through a combination of color, icon, and label.

Use it in lists of automations, rule summary cards, or detail headers where the user needs to immediately understand whether an automation is functioning.

Do NOT use it for general-purpose status indicators outside the automation context, or for progress indicators that communicate completion percentage (use a progress component instead).

---

## 2. UX Intent

- Primary interaction goal: allow the user to instantly assess the operational state of one or more automations without reading detail text.
- Expected user mental model: a small colored pill or chip with a status label — mirrors status badges in CI/CD dashboards, GitHub Actions, and similar tools (Jakob's Law).
- UX laws applied:
  - Pre-attentive processing (Gestalt): color and icon together communicate status before the user reads text.
  - Jakob's Law: use conventional color associations (green = active/success, red = error, yellow/orange = warning/paused, gray = inactive).
  - Hick's Law: the badge has no interactive choices; it is purely informational.

---

## 3. Visual Behavior

- Layout: an inline horizontal pill containing an optional leading icon and a short status label.
- Size variants: small (for dense lists), medium (default), large (for headers or prominent display).
- Status variants and their semantic color mapping:
  - Active / Running: success/green token
  - Inactive / Disabled: neutral/gray token
  - Paused: warning/amber token
  - Error / Failed: error/red token
  - Pending / Queued: info/blue token
- The icon (if shown) is the same color as the label text.
- Badge does not have a fixed width; it sizes to its content.
- Spacing between icon and label uses space tokens.
- No border by default; an optional outlined variant may add a border using a border token.

---

## 4. Interaction Behavior

- The badge is non-interactive by default (no click, hover, or focus states required).
- If wrapped in an interactive context (e.g., a clickable row), the badge itself does not intercept pointer events.
- No controlled/uncontrolled state; it is purely presentational and driven by the `status` prop.
- Screen reader behavior: the badge text is readable; the icon is decorative (`aria-hidden="true"`) since the label conveys the full meaning.
- Motion: no animations on the badge itself; if status changes, the transition is instant.

---

## 5. Accessibility Requirements

- The status label text is always visible (not icon-only) to ensure screen reader and low-vision accessibility.
- Icons are decorative and hidden from assistive technology (`aria-hidden="true"`).
- If the badge is used in a context where the surrounding element does not label it, an `aria-label` or `title` on the badge provides context (e.g., "Automation status: Error").
- Color alone is not the only differentiator — label text and icon together convey status.
- All text meets WCAG AA contrast (4.5:1 against the badge background).
- Reduced motion: no transition animations on status change.

---

## 6. Theming Rules

- Required tokens: one background + text token pair per status variant (success, warning, error, neutral, info), icon color token per variant, optional border color token for the outlined variant.
- Prohibited hardcoded values: no raw hex/rgb colors, no hardcoded font sizes, no pixel-based border-radius (use radius tokens).
- Dark mode: all status color tokens must provide sufficient contrast in both light and dark themes; the same status must be visually distinguishable in dark mode.

---

## 7. Composition Rules

- May be wrapped by: RuleSummaryCard, automation list rows, detail page headers, table cells.
- May contain: a leading icon (decorative), a status label string.
- Anti-patterns:
  - Do not use this badge to convey progress (e.g., "75% complete") — use a progress component.
  - Do not make the badge interactive (clickable, focusable) unless wrapping it in an explicit interactive element.
  - Do not use more than one badge per automation status context; use a single badge with the most critical status.

---

## 8. Performance Constraints

- The badge is a pure presentational component; memoize it with `React.memo` to prevent re-renders when unrelated parent state changes.
- No virtualization or async concerns.

---

## 9. Test Requirements

- Renders the correct label for each status variant (active, inactive, paused, error, pending).
- Applies the correct semantic color token class for each status variant.
- Renders an icon when provided; icon has `aria-hidden="true"`.
- Size variants (small, medium, large) render with the appropriate typographic and spacing scale.
- Outlined variant renders a border.
- The badge does not respond to click or focus events.
- Accessibility: no axe violations; status label is readable by screen readers; icons are decorative.
- Dark mode: all status color variants render with sufficient contrast.
